import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { io } from "../socket/socket.js";

export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, members } = req.body;
        const creatorId = req.user.id;

        if (!name || !members || !Array.isArray(members)) {
            return res.status(400).json({ error: "Group name and members are required" });
        }

        const group = await prisma.group.create({
            data: {
                name,
                creatorId,
                members: {
                    connect: members.map((id: string) => ({ id })),
                },
            },
            include: {
                members: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
        });

        return res.status(201).json(group);
    } catch (error: any) {
        console.error("Error in createGroup: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getGroups = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const groups = await prisma.group.findMany({
            where: {
                members: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                members: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
        });

        return res.status(200).json(groups);
    } catch (error: any) {
        console.error("Error in getGroups: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const sendGroupMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { groupId } = req.params;
        const senderId = req.user.id;

        if (!message || !groupId) {
            return res.status(400).json({ error: "Message and group ID are required" });
        }

        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: { members: true },
        });

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (!group.members.some((member) => member.id === senderId)) {
            return res.status(403).json({ error: "You are not a member of this group" });
        }

        const newMessage = await prisma.groupMessage.create({
            data: {
                body: message,
                senderId,
                groupId,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
        });

        io.to(groupId).emit("newGroupMessage", newMessage);

        return res.status(201).json(newMessage);
    } catch (error: any) {
        console.error("Error in sendGroupMessage: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getGroupMessages = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = req.user.id;

        const group = await prisma.group.findUnique({
            where: { id: groupId },
            include: { members: true },
        });

        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        if (!group.members.some((member) => member.id === userId)) {
            return res.status(403).json({ error: "You are not a member of this group" });
        }

        const messages = await prisma.groupMessage.findMany({
            where: { groupId },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullName: true,
                        profilePic: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return res.status(200).json(messages);
    } catch (error: any) {
        console.error("Error in getGroupMessages: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}; 