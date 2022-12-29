import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'; 
const Signup = () => {

  const [show, setShow] = useState(false)
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPass, setConfirmPass] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show)

  const postDetails = (pics) => {
    setLoading(true)
    if(pics === undefined){
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();

      data.append("file",pics);
      data.append("upload_preset","chat-app");
      data.append("cloud_name","dz8xbh1el");

      fetch("https://api.cloudinary.com/v1_1/dz8xbh1el/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    // console.log(name, email, password, confirmPass, pic)
    setLoading(true);
    if(!name || !email || !password || !confirmPass) {
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
    if(password !== confirmPass) {
      toast({
        title: 'Passwords Do Not Match!',
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
        "/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false)
      navigate('/chats');
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

      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Enter Your Name' onChange={(e)=>setName(e.target.value)} />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter Your Email' onChange={(e)=>setEmail(e.target.value)} />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input type={show ? "text" : "password"} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)} />

        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input type={show ? "text" : "password"} placeholder='Enter Confirm Password' onChange={(e)=>setConfirmPass(e.target.value)} />

        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload Your Profile</FormLabel>
        <Input type="file" p={1.5} accept="image/*" onChange={(e)=>postDetails(e.target.files[0])} />
      </FormControl>

      <Button colorScheme="purple" width="100%" style={{marginTop: 15}} onClick={submitHandler} isLoading={loading}>
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup
