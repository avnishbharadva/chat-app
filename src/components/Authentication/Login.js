import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState()

  const toast = useToast()
  const navigate = useNavigate();

  const handleClick = () => setShow(!show)

  const submitHandler = async () => {
    setLoading(true);
    if(!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
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
    <VStack spacing='5px'>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input type={show ? "text" : "password"} placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} />

        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      </FormControl>

      <Button colorScheme="purple" width="100%" style={{marginTop: 15}} onClick={submitHandler} isLoading={loading}>
        Login
      </Button>

      {/* <Button variant="solid" colorScheme="red" width="100%" onClick={() => {
        setEmail("guest@example.com")
        setPassword("123456")
      }}>
        Get Guest User Credentials
      </Button> */}

    </VStack>
  )
}

export default Login
