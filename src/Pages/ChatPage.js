import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatPage = () => {

  const [chat, setChats] = useState([])

  const fetchChats = async () => {
    const {data} = await axios.get("/api/chat")

    setChats(data)
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <div>
      <h2>Chat</h2>

      {
        chat.map((ele) => {
          return (
            <div key={ele._id}>
              {ele.chatName}
            </div>
          )
        })
      }
    </div>
  )
}

export default ChatPage
