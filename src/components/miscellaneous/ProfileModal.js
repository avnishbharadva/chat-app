import { PhoneIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  Box,
} from '@chakra-ui/react'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileModal = ({ user, children }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const handleClick = () => {
    // console.log(Date.now().toString())
    const roomId = Date.now().toString()
    navigate(`/room/${roomId}`)
  }

  return (
    <>
      {
        children ? <span onClick={onOpen}>{children}</span> : (
          <Box display="flex">
            <IconButton icon={<PhoneIcon />} mx="2" onClick={handleClick}/>
            <IconButton icon={<ViewIcon />} onClick={onOpen} />
          </Box>
        )
      }
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontSize="40px" fontFamily="Work sans" display="flex" justifyContent="center" >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
            <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name} />
            <Text fontSize={{ base: "28px", md: "30px" }} fontFamily="Work sans">
              Email : {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' mr={3} onClick={onClose}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal
