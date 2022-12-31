import { Container } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  let navigate = useNavigate();

  const checkAdmin = () => {
    if(localStorage.getItem('chatAdmin')!=="true")
      navigate("/admin/login");
  }

  useEffect(() => { 
    checkAdmin();
  }, []);

  return (
    <>
      <Container>
        
      </Container>
    </>

  )
}

export default AdminHome
