import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from "../Context/ChatProvider";
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat } = ChatState();
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex"}}
      alignItems="center"
      flexDir="column"
      p={3}
      w={{ base: "100%", md: "68%"}}
      borderRadius="lg"
      borderWidth="1px"
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default ChatBox
