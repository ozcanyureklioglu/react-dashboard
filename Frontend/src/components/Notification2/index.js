import React, { useEffect, useRef, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { getAnnouncement, getAnnouncementList } from "../../api";
import { useQuery } from "react-query";
import { preventDefault } from "@fullcalendar/core/internal";

function Notification2({ notiList, toggle, isOpen }) {
  const connectionRef = useRef(null);
  const [notificationList, setNotificationList] = useState([]);
  const [announcementList, setAnnouncementList] = useState([]);
  const [notiOrAnnounc, setNotiOrAnnounc] = useState(false); //false:notification, true: announcement
  const [announcementDetail, setAnnouncementDetail] = useState(null);
  const [modalState, setModalState] = useState(false);

  const getData = async () => {
    const data = await getAnnouncementList();
    setAnnouncementList(data);
  };

  const handleAnnouncementClick = async (id) => {
    const data = await getAnnouncement(id);
    setAnnouncementDetail(data);
    handleModalToggle();
  };
  useEffect(() => {
    setNotificationList(notiList);
    getData();
  }, []);

  const list = notificationList.map((message) => {
    <div
      key={Date.now() * Math.random()}
      class="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full"
    >
      <div class=" inline-flex items-center justify-between w-full">
        <div class="inline-flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6863/6863272.png"
            alt="Form Icon"
            class="w-6 h-6 mr-3"
          />
          <h3 class="font-bold text-base text-gray-800">Forms</h3>
        </div>
        <p class="text-xs text-gray-500">12:47</p>
      </div>
      <p class="mt-1 text-sm">{message}</p>
    </div>;
  });
  const handleModalToggle = () => {
    setModalState(!modalState);
  };
  useEffect(() => {
    if (modalState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  });

  return (
    <>
      <div
        class={`${
          isOpen ? "" : "hidden"
        } z-[60] h-screen w-[600px] place-items-center fixed top-16`}
      >
        <div
          style={{
            maxHeight: "calc(100% - 5rem)",
            height: "calc(100% - 5rem)",
          }}
          class=" lg:w-4/5 sm:w-4/5 w-11/12  bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-8 shadow-sm"
        >
          <div class="h-full flex flex-col justify-between space-y-4">
            <div>
              <div class="inline-flex items-center justify-between w-full">
                <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                  <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2 cursor-pointer">
                      <a
                        onClick={() => {
                          setNotiOrAnnounc(false);
                        }}
                        class={`${
                          notiOrAnnounc
                            ? "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            : "active dark:text-blue-500 border-blue-500 text-blue-600 "
                        }   border-b-2 inline-block p-4  rounded-t-lg `}
                      >
                        Bildirim
                      </a>
                    </li>
                    <li class="mr-2 cursor-pointer">
                      <button
                        onClick={async (e) => {
                          setNotiOrAnnounc(true);
                          getData();
                        }}
                        class={`${
                          notiOrAnnounc
                            ? "active dark:text-blue-500 border-blue-500 text-blue-600 "
                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        } border-b-2 border-blue-600 inline-block p-4  rounded-t-lg `}
                        aria-current="page"
                      >
                        Duyuru
                      </button>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={toggle}
                  class="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium
shadow border focus:outline-none transform   hover:bg-blue-500
hover:text-white   dark:text-gray-800 dark:hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1 sm:mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Kapat
                </button>
              </div>
            </div>
            {/*Notification*/}
            <div
              class={` ${
                notiOrAnnounc ? "hidden" : ""
              } overflow-y-scroll h-full`}
            >
              <p class=" font-medium text-gray-500 dark:text-white text-xl dark:text-xl sm:text-base">
                Bildirimler
              </p>
              <div class=" p-2">
                <p class="mt-8 font-medium text-gray-500 dark:text-white text-sm sm:text-base">
                  Bugün
                </p>
                {notiList.map((message) => {
                  return (
                    <div
                      key={Date.now() * Math.random()}
                      class="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full"
                    >
                      <div class=" inline-flex items-center justify-between w-full">
                        <div class="inline-flex items-center">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/6863/6863272.png"
                            alt="Form Icon"
                            class="w-6 h-6 mr-3"
                          />
                          <h3 class="font-bold text-base text-gray-800">
                            Giriş Bildirimi
                          </h3>
                        </div>
                        <p class="text-xs text-gray-500">12:47</p>
                      </div>
                      <p class="mt-1 text-sm">{message}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/*Announcement*/}
            <div
              class={` ${
                notiOrAnnounc ? "" : "hidden"
              } overflow-y-scroll h-full `}
            >
              <p class=" font-medium text-gray-500 dark:text-white text-xl dark:text-xl sm:text-base">
                Duyurular
              </p>

              <div class=" p-2 ">
                <p class="mt-8 font-medium text-gray-500 dark:text-white text-sm sm:text-base">
                  Bugün
                </p>
                {announcementList.map((a) => {
                  return (
                    <a
                      data-modal-target="announcementModal"
                      data-modal-toggle="announcementModal"
                      onClick={() => {
                        handleAnnouncementClick(a.id);
                      }}
                      key={a.id}
                      class="cursor-pointer"
                    >
                      <div class="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
                        <div class=" inline-flex items-center justify-between w-full">
                          <div class="inline-flex items-center">
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/6863/6863272.png"
                              alt="Form Icon"
                              class="w-6 h-6 mr-3"
                            />
                            <h3 class="font-bold text-base text-gray-800">
                              {a.header}
                            </h3>
                          </div>
                          <p class="text-xs text-gray-500">
                            {new Date(a.expDate).toDateString()}
                          </p>
                        </div>
                        <p class="mt-1 text-sm">
                          {a.content?.length > 30
                            ? a.content.substring(0, 30) + "..."
                            : a.content}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            {/*Clear Notification*/}
            <div>
              <button
                class="inline-flex text-sm bg-white justify-center px-4 py-2 w-full text-red-500 items-center rounded font-medium
shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500
hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-2 sm:mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Clear all notifications
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*MODAL AREA*/}
      <div
        tabindex="-1"
        aria-hidden="true"
        class={`place-items-center fixed left-0 top-0 z-[70] ${
          modalState ? "flex" : "hidden"
        } bg-black/[.8] w-full h-full p-4 overflow-x-hidden overflow-y-auto inset-0  max-h-full`}
      >
        <div class="flex flex-col justify-center relative w-full max-w-2xl h-full max-h-full m-auto">
          <div
            style={{ maxHeight: "calc(100% - 3rem)" }}
            class="flex flex-col justify-between  relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <div class="flex items-start justify-between  p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {announcementDetail?.header}
              </h3>
              <button
                type="button"
                onClick={handleModalToggle}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="defaultModal"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="overflow-y-scroll p-6 space-y-6 ">
              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                {announcementDetail?.content}
              </p>
            </div>

            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Okudum Anladım
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Okudum Anlamadım
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification2;
