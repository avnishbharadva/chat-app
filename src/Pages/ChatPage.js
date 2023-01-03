import { Box, useColorMode } from "@chakra-ui/react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider"
import { useState } from "react";

const ChatPage = () => {


  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

 const {colorMode, toggleColorMode} = useColorMode();

  return (
    <div style={{ width: "100%" }}

    >
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        h="91.5vh"
        p="10px"
        
      >
        {user && (<MyChats fetchAgain={fetchAgain} />)}
        {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
      </Box>
    </div>
  )
}

export default ChatPage
