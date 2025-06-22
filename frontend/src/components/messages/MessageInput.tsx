import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import useSendMessage from "../../hooks/useSendMessage";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
import toast from "react-hot-toast";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	const { selectedConversation } = useConversation();
	const { socket } = useSocketContext();

	useEffect(() => {
		if (!socket) {
			console.log("Socket not connected");
			return;
		}

		socket.on("connect", () => {
			console.log("Socket connected");
		});

		socket.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
			toast.error("Connection error. Please try again.");
		});

		return () => {
			socket.off("connect");
			socket.off("connect_error");
		};
	}, [socket]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!message.trim() || !selectedConversation) return;

		try {
			await sendMessage(message);
			setMessage("");
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const handleButtonClick = async () => {
		if (!message.trim() || !selectedConversation) return;

		try {
			await sendMessage(message);
			setMessage("");
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return (
		<form className='px-4 mb-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 bg-black border-black text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button
					type='button'
					className='absolute inset-y-0 end-0 flex items-center pe-3'
					onClick={handleButtonClick}
					disabled={loading || !message.trim() || !selectedConversation || !socket}
				>
					{loading ? <span className='loading loading-spinner' /> : <Send className='w-6 h-6 text-white' />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
