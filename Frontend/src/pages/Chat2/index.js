import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { getChatList, getGroupChatList } from "../../api";

import { toast } from "react-toastify";

function Chat2() {
  const [chat, setChat] = useState([]);
  const [groupChat, setGroupChat] = useState([]);
  const [chatBoxArea, setChatBoxArea] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [receiveChatMessage, setReceiveChatMessage] = useState(null);
  const [receiveGroupMessage, setReceiveGroupMessage] = useState(null);

  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [chatOrGroup, setChatOrGroup] = useState(0);
  const [isChangeChatOrGroup, setIsChangeChatOrGroup] = useState(false);
  const [groupId, setGroupId] = useState(0);
  const [chatId, setChatId] = useState(0);

  const connectionRef = useRef(null);
  const latestChat = useRef(null);
  const latestGroupChat = useRef(null);
  const messageListRef = useRef(null);
  const chatIdRef = useRef(chatId);
  const groupIdRef = useRef(groupId);
  const chatOrGroupRef = useRef(chatOrGroup);

  latestChat.current = chat;
  latestGroupChat.current = groupChat;

  useEffect(() => {
    chatIdRef.current = chatId;
    groupIdRef.current = groupId;
    chatOrGroupRef.current = chatOrGroup;
  }, [groupId, chatId, chatOrGroup]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userIdLocal = localStorage.getItem("user-id");
    setUserId(parseInt(userIdLocal));
    connectionRef.current = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/hubs/chat", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();
    connectionRef.current
      .start()
      .then((result) => {
        console.log("Connected!");
      })
      .catch((e) => console.log("Connection failed: ", e));

    connectionRef.current.on("ReceiveMessage", (message) => {
      /*console.log("chatId: " + chatIdRef.current);
        console.log("groupId: " + groupIdRef.current);
        console.log("chatorGroup: " + chatOrGroupRef.current);*/

      setReceiveChatMessage(message);
    });

    connectionRef.current.on("ReceiveGroupMessage", (message) => {
      setReceiveGroupMessage(message);
    });
    connectionRef.current.on("hubError", (errorCode, errorMessage) => {
      if ((errorCode = 401)) {
        window.location = "/login";
      }
    });
  }, []);

  useEffect(() => {
    if (receiveChatMessage != null) {
      if (
        receiveChatMessage.sendId == chatIdRef.current &&
        chatOrGroupRef.current == 1
      ) {
        setChat((prevMessages) => [...prevMessages, receiveChatMessage]);
        setTimeout(() => {
          messageListRef.current.scrollTo({
            top: messageListRef.current.scrollHeight,
          });
        }, 10);
      } else {
        toast.info(`Received a message from ${receiveChatMessage.sendId}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setReceiveChatMessage(null);
    }
  }, [receiveChatMessage]);

  useEffect(() => {
    if (receiveGroupMessage != null) {
      if (
        receiveGroupMessage.receiveId == groupIdRef.current &&
        chatOrGroupRef.current == 2
      ) {
        setGroupChat((prevGroupChat) => [
          ...prevGroupChat,
          receiveGroupMessage,
        ]);
        setTimeout(() => {
          messageListRef.current.scrollTo({
            top: messageListRef.current.scrollHeight,
          });
        }, 10);
      } else {
        if (receiveGroupMessage.sendId != userId) {
          toast.info(
            `Received a group message from ${receiveGroupMessage.sendUserName}`,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
      }
      setReceiveChatMessage(null);
    }
  }, [receiveGroupMessage]);

  const sendMessage = async () => {
    if (messageText != "" && messageText != null) {
      if (chatOrGroup == 1) {
        const now = new Date();
        const formattedDateTime = now.toLocaleString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        const chatMessage = {
          sendId: userId,
          receiveId: parseInt(chatId),
          message: messageText,
          time: formattedDateTime,
        };
        setMessageText("");
        connectionRef.current
          .invoke("SendMessageToUser", chatMessage)
          .catch((err) => console.error(err));

        const updatedChat = [...latestChat.current];
        updatedChat.push(chatMessage);
        setChat(updatedChat);
        setTimeout(() => {
          messageListRef.current.scrollTo({
            top: messageListRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 50);
      } else if (chatOrGroup == 2) {
        const chatMessage = {
          sendId: userId,
          receiveId: parseInt(groupId),
          message: messageText,
        };
        setMessageText("");
        connectionRef.current
          .invoke("SendMessageToGroup", chatMessage)
          .catch((err) => console.error(err));
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const chatList = chat.map((m) =>
    m.sendId === userId ? (
      <div class="chat-message" key={Date.now() * Math.random()}>
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div class="flex flex-col px-4 pt-2 pb-1 rounded-lg inline-block rounded-br-none bg-[#0284c7]">
              <span class=" text-white text-sm">{m.message}</span>
              <div class="flex flex-row justify-end w-full">
                <span class=" text-gray-300 text-[0.7rem]">{m.time}</span>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
    ) : (
      <div class="chat-message" key={Date.now() * Math.random()}>
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div class="flex flex-col px-4 pt-2 pb-1 rounded-lg inline-block rounded-br-none bg-gray-300">
              <span class=" text-gray-700 text-sm">{m.message}</span>
              <div class="flex flex-row justify-end w-full">
                <span class=" text-gray-500 text-[0.7rem]">{m.time}</span>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
    )
  );

  const groupChatList = groupChat.map((m) =>
    m.sendId === userId ? (
      <div class="chat-message" key={Date.now() * Math.random()}>
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div class="flex flex-col px-2 pb-1 pt-2 rounded-lg inline-block rounded-br-none  bg-[#0284c7] items-start">
              <span class=" text-white text-sm">{m.message}</span>
              <div class="flex flex-row justify-end w-full">
                <span class=" text-gray-300 text-[0.7rem]">{m.time}</span>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
    ) : (
      <div class="chat-message" key={Date.now() * Math.random()}>
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div class="flex flex-col px-2 pb-1 pt-2 rounded-lg inline-block rounded-bl-none bg-gray-300">
              <span class="font-semibold text-red-900 pb-1 text-sm">
                {m.sendUserName}
              </span>
              <span class=" text-gray-800 text-sm">{m.message}</span>
              <div class="flex flex-row  justify-end w-full">
                <span class=" text-gray-500 text-[0.7rem]">{m.time}</span>
              </div>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
    )
  );

  const onMessageUpdate = (e) => {
    setMessageText(e.target.value);
  };

  const chatClickHandler = (e) => {
    var chatDataId = e.currentTarget.getAttribute("data-id");
    var userName = e.currentTarget.getAttribute("data-name");
    setChatOrGroup(1);
    setChatId((prevChatId) => parseInt(chatDataId));
    setIsChangeChatOrGroup((prev) => !prev);
    setUserName(userName);

    setChat([]);
    var str = { receiveId: parseInt(chatDataId) };
    getChatList(JSON.stringify(str))
      .then((data) => {
        setChat(data);
      })
      .finally(() => {
        setTimeout(() => {
          messageListRef.current.scrollTo({
            top: messageListRef.current.scrollHeight,
          });
        }, 10);
      });
  };

  const groupClickHandler = (e) => {
    setChatOrGroup(2);
    var groupDataId = e.currentTarget.getAttribute("data-id");
    var grupName = e.currentTarget.getAttribute("data-name");
    setGroupId((prevChatId) => parseInt(groupDataId));
    setUserName(grupName);

    setGroupChat([]);
    var str = { receiveId: parseInt(groupDataId) };

    getGroupChatList(JSON.stringify(str)).then((data) => {
      setGroupChat(data);
      setTimeout(() => {
        messageListRef.current.scrollTo({
          top: messageListRef.current.scrollHeight,
        });
      }, 10);
    });
  };

  return (
    <div class="grid grid-cols-4 ">
      <div class="border-r border-gray-300 lg:col-span-1">
        <div class="mx-3 my-3">
          <div class="relative text-gray-600">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6 text-gray-300"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              type="search"
              class="block w-full py-2 pl-10 bg-gray-100 dark:bg-gray-600 text-gray-500 placeholder-gray-600 dark:placeholder-gray-400 focus:text-gray-800 dark:text-white  rounded outline-none"
              name="search"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <ul class="overflow-auto h-[35vh] p-2 mb-2">
          <h2 class="my-2 mb-2 ml-2 text-2xl text-gray-600 dark:text-white">
            Sohbet
          </h2>
          <li>
            <a
              data-id="1"
              data-name="Admin"
              onClick={chatClickHandler}
              class={`${
                chatOrGroup == 1 && chatId === "1"
                  ? "bg-gray-200 dark:bg-gray-800"
                  : ""
              }  flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b-[1px]  border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none `}
            >
              <img
                class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                alt="username"
              />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                    Admin
                  </span>
                  <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                    25 minutes
                  </span>
                </div>
                <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                  bye
                </span>
              </div>
            </a>
            <a
              data-id="2"
              data-name="Özcan"
              onClick={chatClickHandler}
              class={`${
                chatOrGroup == 1 && chatId === "2"
                  ? "bg-gray-200 dark:bg-gray-800"
                  : ""
              }  flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b-[1px]  border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none `}
            >
              <img
                class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                alt="username"
              />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                    Özcan
                  </span>
                  <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                    50 minutes
                  </span>
                </div>
                <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                  Good night
                </span>
              </div>
            </a>
          </li>
        </ul>
        <hr class="mb-2 border-gray-300" />
        <ul class="overflow-auto h-[35vh] p-2">
          <h2 class="my-2 mb-2 ml-2 text-2xl text-gray-600 dark:text-white">
            Grup
          </h2>
          <li>
            <a
              data-id="1"
              data-name="Grup 1"
              onClick={groupClickHandler}
              class={`${
                chatOrGroup == 2 && groupId === "1"
                  ? "bg-gray-200 dark:bg-gray-800"
                  : ""
              }  flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b-[1px]  border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none `}
            >
              <img
                class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                alt="username"
              />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                    Grup 1
                  </span>
                  <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                    25 minutes
                  </span>
                </div>
                <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                  bye
                </span>
              </div>
            </a>
            <a
              data-id="2"
              data-name="Grup 2"
              onClick={groupClickHandler}
              class={`${
                chatOrGroup == 2 && groupId === "2"
                  ? "bg-gray-200 dark:bg-gray-800"
                  : ""
              }  flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b-[1px]  border-gray-300 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none `}
            >
              <img
                class="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                alt="username"
              />
              <div class="w-full pb-2">
                <div class="flex justify-between">
                  <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                    Grup 2
                  </span>
                  <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                    50 minutes
                  </span>
                </div>
                <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                  Good night
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div
        class={`${
          chatOrGroup == 0 ? "blur-sm" : ""
        } col-span-3 flex-1  justify-between flex flex-col px-3`}
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <div class="flex sm:items-center justify-between mb-2 py-1 border-b border-gray-200 dark:border-gray-300">
          <div class="relative flex items-center space-x-4">
            <div class="relative">
              <span class="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt=""
                class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div class="flex flex-col leading-tight">
              <div class="text-2xl mt-1 flex items-center">
                <span class="text-gray-700 dark:text-gray-100 mr-3">
                  {userName}
                </span>
              </div>
              <span class="text-lg text-gray-600 dark:text-gray-100">
                Full Stack Developer
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={messageListRef}
          id="messages"
          class="flex flex-col space-y-4 h-full  p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {
            chatOrGroup == 1 ? chatList : groupChatList /*(() => {
            if (chatOrGroup == 1) {
              return chatList;
            } else if (chatOrGroup == 2) {
              return groupChatList;
            } else {
              return <></>;
            }
          })()*/
          }
        </div>
        <div class="border-t border-gray-200 dark:border-gray-300 mt-2 px-2 pt-2 mb-2 sm:mb-0">
          <div class="relative flex">
            <input
              type="text"
              id="message"
              name="message"
              value={messageText}
              onChange={onMessageUpdate}
              onKeyDown={handleKeyDown}
              placeholder="Write your message!"
              class="w-full focus:outline-none focus:placeholder-gray-400 placeholder-gray-600 bg-gray-100 dark:bg-gray-600 dark:placeholder-gray-400 text-gray-500 focus:text-gray-800 dark:text-white  bg-gray-200 rounded-2xl py-3"
            />
            <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-6 w-6 text-gray-600 dark:text-gray-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                onClick={sendMessage}
                class="mr-3 inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-7 w-7 ml-2 transform rotate-90 text-gray-600 dark:text-gray-300"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat2;
