import { Box, Button, Container, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHome = () => {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const checkAdmin = () => {
    if (localStorage.getItem('chatAdmin') !== "true")
      navigate("/admin/login");
  }

  const fetchUsers = async () => {

    const {data} = await axios.get('/api/user/allusers');

    setUsers(data);
  }

  useEffect(() => {
    checkAdmin();
    fetchUsers();
  }, []);

  return <Container maxW={'full'} centerContent>
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      bg="white"
      w="100%"
      m="5px 0px 5px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Text fontSize="2xl" fontFamily="Work sans" >Admin Panel</Text>

      <Link to="/chats"><Button>Back To Chat App</Button></Link>
    </Box>

    <Box
      
      bg="white"
      w="100%"
      m="5px 0px 5px 0"
      borderRadius="lg"
    >
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>All Users Of Chat App</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Pic</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr>
                <Td>{user._id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.pic}</Td>
              </Tr>
            ))}
            
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  </Container>
}

export default AdminHome
