import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Menu, MenuButton, MenuList, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'

const SideDrawer = () => {

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user } = ChatState();
  
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
        <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
          <Button variant="ghost">
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{base:"none",md: "flex"}} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} >
              <Avatar size='sm' cursor='pointer' />
            </MenuButton>
          </Menu>
        </div>
      </Box>
    </>
  )
}

export default SideDrawer
