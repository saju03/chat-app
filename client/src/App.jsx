import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

import './App.css'


const socket = io('http://localhost:3000');
function App() {
  const [user,setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState('');

  

  useEffect(() => {

    if(!sessionStorage.getItem('user')){
      sessionStorage.setItem('user',JSON.stringify({name:crypto.randomUUID(),id:crypto.randomUUID()}))
    }
    setUser(()=>JSON.parse(sessionStorage.getItem('user')))
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
    socket.emit('reg',user.name)


    socket.on('newMessage', (data) => {
      
      setAllMessages((prev) => [...prev, data])
    })
  
    socket.on('privetMsg',(message)=>{
      setAllMessages(prev=>[...prev,message])
    })

  }, [])


  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('privetMsg', {recipientID:'saju',message:message}); // Emit the message to the server
    setMessage(''); // Clear the input field after sending
  };
  return (
    <>
      <div className='flex-1 min-h-72 bg-blue-200 '>
        {allMessages.map((item, index) => {
         return <div className='bg-slate-500 m-2' key={`message${index}`}>
            <span>
              {item.from} {item.message}
            </span>
          </div>
        })}


      </div>


      <>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css"
        />
        {/* This is an example component */}
        <div className="max-w-2xl mx-auto absolute left-1/2  -translate-x-1/2 bottom-4 ">
          <form className=''>
            <label htmlFor="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700 ">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <input
                id="chat"
                rows={1}
                className="block mx-4 p-2.5 w-full min-w-96 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
              />
              <button
                onClick={sendMessage}
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>

        </div>
      </>

    </>
  )
}

export default App
