import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";

function App() {
	const { authUser } = useAuthContext();
	const [selectedConversation, setSelectedConversation] = useState(null);
	const [selectedGroup, setSelectedGroup] = useState(null);

	const handleSelectConversation = (conversation) => {
		setSelectedConversation(conversation);
		setSelectedGroup(null);
	};

	const handleSelectGroup = (group) => {
		setSelectedGroup(group);
		setSelectedConversation(null);
	};

	if (!authUser) {
		return (
			<div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image2.png')" }}>
				<div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="*" element={<Navigate to="/login" />} />
					</Routes>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image2.png')" }}>
			<div className="flex h-screen bg-black bg-opacity-50">
				<div className="w-80 border-r border-gray-700">
					<Sidebar
						onSelectConversation={handleSelectConversation}
						onSelectGroup={handleSelectGroup}
					/>
				</div>
				<div className="flex-1">
					<ChatContainer
						selectedConversation={selectedConversation}
						selectedGroup={selectedGroup}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
