import { Box, Container, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  let navigate = useNavigate();

  const checkAdmin = () => {
    if (localStorage.getItem('chatAdmin') !== "true")
      navigate("/admin/login");
  }

  useEffect(() => {
    checkAdmin();
  }, []);

  return <Container maxW={'full'} centerContent>
    <Box
      d="flex"
      justifyContent="center"
      p={2}
      bg="white"
      w="100%"
      m="5px 0px 5px 0"
      borderRadius="lg"
      borderWidth="1px"
    >
      <center><Text fontSize="2xl" fontFamily="Work sans" >Admin Panel</Text></center>
    </Box>

    <Box
      
      bg="white"
      w="100%"
      m="5px 0px 5px 0"
      borderRadius="lg"
    >
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Pic</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td>hehe</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>No.</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Pic</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  </Container>
}

export default AdminHome
