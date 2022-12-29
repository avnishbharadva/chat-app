import React, { useEffect } from 'react'
import { Box, Container, Text,Tabs, TabList, TabPanels, Tab, TabPanel, Button, useMultiStyleConfig, useTab } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const CustomTab = React.forwardRef((props, ref) => {
    // 1. Reuse the `useTab` hook
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    // 2. Hook into the Tabs `size`, `variant`, props
    const styles = useMultiStyleConfig('Tabs', tabProps)

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as='span' mr='2'>
          {isSelected ? '😎' : '😐'}
        </Box>
        {tabProps.children}
      </Button>
    )
  })

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user){
      navigate('/chats');
    }
  }, [navigate])

  return <Container maxW='xl' centerContent>
    <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0px 15px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <center><Text fontSize="4xl" fontFamily="Work sans" color="black">AK-Chat</Text></center>
    </Box>

    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme="purple">
        <TabList mb="1em">
          {/* <Tab width="50%">Login</Tab>
          <Tab width="50%">Sign Up</Tab> */}
          <CustomTab width="50%">Login</CustomTab>
          <CustomTab width="50%">Sign Up</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>
}

export default HomePage
