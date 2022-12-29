import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { Effect } from 'react-notification-badge'
import NotificationBadge from 'react-notification-badge'
import { useNavigate } from 'react-router-dom'
import { getSender } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'
import ChatLoading from '../ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import ProfileModal from './ProfileModal'

const SideDrawer = () => {

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();
  
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const handleSearch = async () => {
    if(!search){
      toast({
        title: "Please Enter Something In Search",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`/api/user?search=${search}`, config)

      if(data.length === 0){
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom-left",
        })
      } else {
      setLoading(false)
      setSearchResult(data)
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post('/api/chat', {userId}, config);

      // append selected chats with existing chats
      if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching The Chat",
        description: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
        <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{base:"none",md: "flex"}} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          AK-Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}

              {notification.map(notif => (
                <MenuItem key={notif._id} onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                }}>
                  {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : `New Message From ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
              <Avatar size='sm' cursor='pointer' name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>

            {loading ? (
              <ChatLoading/>
            ) : (
              searchResult?.map(user => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
          
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default SideDrawer