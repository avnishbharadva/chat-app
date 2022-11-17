import { Box } from "@chakra-ui/react";
import ChatBox from "../components/miscellaneous/ChatBox";
import MyChats from "../components/miscellaneous/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider"

const ChatPage = () => {

  const { user } = ChatState();

  return (
    <div style={{ width: "100%"}}>
      {user && <SideDrawer />}
      <Box>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>    
  )
}

export default ChatPage
