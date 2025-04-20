import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
<div className="flex h-[80vh] w-full md:max-w-screen-md md:h-[550px] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 shadow-2xl relative border-[3px] border-white/20 backdrop-blur-md animate-gradient">

      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
