import React from "react";

function Chat1() {
  return (
    <div class="w-full ">
      <div class="relative z-10 xs:z-10 md:z-50 lg:z-50 xl:z-50 w-full bg-white dark:bg-gray-600">
        <div class="fixed top-[9rem] border-r border-gray-300 h-full">
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
                class="block w-full py-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-full outline-none text-gray-500 focus:text-gray-800 dark:text-white"
                name="search"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <ul class="overflow-auto h-[32rem]">
            <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600 dark:text-white">
              Chats
            </h2>
            <li>
              <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                <img
                  class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                  alt="username"
                />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                      Jhon Don
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
              <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-300 dark:bg-gray-800 border-b border-gray-300 cursor-pointer focus:outline-none">
                <img
                  class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                  alt="username"
                />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                      Same
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
              <a class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
                <img
                  class="object-cover w-10 h-10 rounded-full"
                  src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                  alt="username"
                />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600 dark:text-white">
                      Emma
                    </span>
                    <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                      6 hour
                    </span>
                  </div>
                  <span class="block ml-2 text-sm text-gray-600 dark:text-white">
                    Good Morning
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="relative z-10 xs:z-10 md:z-50 lg:z-50 xl:z-50 w-full bg-white dark:bg-gray-600">
        <div class="fixed top-[4.05rem] flex items-center w-[-webkit-fill-available] mr-4 bg-white dark:bg-gray-600 p-3 border-b border-gray-300">
          <img
            class="object-cover w-10 h-10 rounded-full"
            src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
            alt="username"
          />
          <span class="block ml-2 font-bold text-gray-600 dark:text-white">
            Emma
          </span>
          <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
        </div>
      </div>
      <div class="h-auto w-[-webkit-fill-available] ml-[19rem]  mb-20 mt-20">
        <ul class="space-y-2">
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
          <li class="flex justify-end">
            <div class="relative max-w-xl px-4 py-2  text-white bg-blue-600   rounded shadow">
              <span class="block">how are you?</span>
            </div>
          </li>
          <li class="flex justify-start">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-white dark:bg-gray-300 dark:text-gray-600 rounded shadow">
              <span class="block">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="relative z-10 xs:z-10 md:z-50 lg:z-50 xl:z-50 w-full">
        <div class="fixed bottom-0 bg-white dark:bg-gray-600 mr-4 flex items-center justify-between w-[-webkit-fill-available]  p-3 border-t border-gray-300">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>

          <input
            type="text"
            placeholder="Message"
            class="block w-full py-2 pl-4 mx-3 bg-gray-100 dark:bg-gray-700 rounded-full outline-none text-gray-500 focus:text-gray-800 dark:text-white"
            name="message"
            required
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          <button type="submit">
            <svg
              class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat1;
