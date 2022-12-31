import { Box, Button, Container, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState()

    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show)

    const submitHandler = async () => {
        setLoading(true);
        if (!username || !password) {
            toast({
                title: 'Please Fill All The Fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        if (username !== "admin" || password !== "admin") {
            toast({
                title: 'Please Fill Correct Credentials!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
            return;
        }

        try {
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });

            localStorage.setItem("chatAdmin", JSON.stringify(true));
            setLoading(false);
            navigate('/admin');
            // setTimeout(() => {
            //   navigate('/chats');
            // }, 2000);
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            setLoading(false);
        }
    }

    return (
        <Container maxW='xl' centerContent>
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
                <center><Text fontSize="4xl" fontFamily="Work sans" color="black">Admin Login</Text></center>
            </Box>

            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <VStack spacing='5px'>

                    <FormControl id="username" isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input placeholder='Enter Your Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </FormControl>

                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={show ? "text" : "password"} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>

                    <Button colorScheme="purple" width="100%" style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading}>
                        Login
                    </Button>

                    {/* <Button variant="solid" colorScheme="red" width="100%" onClick={() => {
        setEmail("guest@example.com")
        setPassword("123456")
      }}>
        Get Guest User Credentials
      </Button> */}

                </VStack>
            </Box>
        </Container>
    )
}

export default AdminLogin