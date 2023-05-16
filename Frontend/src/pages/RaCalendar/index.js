import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import trLocale from "@fullcalendar/core/locales/tr";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { useTheme } from "../../contexts/ThemeContext";
import { addEvent, deleteEvent, getEvents } from "../../api";
import { toast } from "react-toastify";

export default function RaCalendar() {
  const { theme } = useTheme();

  const [events, setEvents] = useState(null); //Etkinlikler
  const [eventInfoModalState, setEventInfoModalState] = useState(false); //Etkinlik detayını gösteren modal toggle durumu
  const [eventDetail, setEventDetail] = useState(null); //Tıklanan etkinliğin detaylarını alan durum

  const [addEventModalState, setAddEventModalState] = useState(false); //Etkinlik ekleme modal toggle durumu
  const [deleteEventModalState, setDeleteEventModalState] = useState(false); //Etkinlik ekleme modal toggle durumu
  const [isSelectDate, setIsSelectDate] = useState(false); //Etkinlik ekle butonu toggle için tarih seçili/değil durumu
  const [selectDate, setSelectDate] = useState(null); //Seçili tarihin bilgilerini tutan durum
  const [selectDateContent, setSelectDateContent] = useState(""); //(Etkinlik eklemede)Seçili tarih için etkinlik detayını tutan durum

  const calRef = useRef(); //Calendar objesine ulaşmak için useRef

  const changeThemeCalendar = () => {
    const fcElements = document.querySelectorAll(".fc");
    if (theme === "light") {
      fcElements.forEach((element) => {
        element.style.color = "black";
      });
    } else {
      fcElements.forEach((element) => {
        element.style.color = "white";
      });
    }
  };

  const getData = async () => {
    setEvents(null);
    const data = await getEvents();
    setEvents(data);
  };

  useEffect(() => {
    changeThemeCalendar();
  }, [theme]);

  useEffect(() => {
    getData();
    changeThemeCalendar();
  }, []);
  useEffect(() => {
    changeThemeCalendar();
  }, [events]);

  const handleModalToggle = () => {
    setEventInfoModalState(!eventInfoModalState);
  };
  const handleAddEventModalToggle = () => {
    setAddEventModalState(!addEventModalState);
  };
  const handleAddEventButton = () => {
    setAddEventModalState(!addEventModalState);
  };
  const handleAddEventSubmitButton = async () => {
    if (selectDate != null && selectDateContent != "") {
      var sendObject = {
        start: selectDate.start,
        end: selectDate.end,
        title: selectDateContent,
      };
      try {
        const send = await addEvent(sendObject);
        getData();
        setAddEventModalState(false);
      } catch (error) {}
    }
  };
  const handleDeleteEventButton = async () => {
    setDeleteEventModalState(true);
  };
  const handleDeleteEventSubmitButton = async () => {
    if (eventDetail) {
      try {
        var data = await deleteEvent(eventDetail.id);
        toast.info(data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();
        setEventInfoModalState(false);
      } catch (error) {
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } finally {
        setDeleteEventModalState(false);
      }
    }
  };
  const handleChangeSelectEventDetail = (event) => {
    setSelectDateContent(event.target.value);
  };

  return (
    <>
      <div class="h-full">
        {events && (
          <FullCalendar
            ref={calRef}
            locale={trLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            selectable
            initialEvents={events}
            editable={true}
            selectMirror={true}
            dayMaxEvents={true}
            nowIndicator={true}
            height={"100%"}
            select={function (info) {
              setIsSelectDate(true);
              var selectDateObject = {
                start: info.startStr,
                end: info.endStr,
              };
              setSelectDate(selectDateObject);
            }}
            unselect={function () {
              setIsSelectDate(false);
            }}
            eventClick={function (info) {
              setEventInfoModalState(true);
              setEventDetail(info.event);
            }}
            eventsSet={function () {}} // called after events are initialized/added/changed/removed
            eventAdd={function () {}}
            eventChange={function () {}}
            eventRemove={function () {}}
            eventDrop={function (info) {
              alert(
                info.event.title +
                  " was dropped on " +
                  info.event.start.toISOString() +
                  " to " +
                  info.event.end.toDateString()
              );
            }}
          />
        )}
      </div>

      <button
        type="button"
        onClick={handleAddEventButton}
        class={`${
          isSelectDate ? "" : "hidden"
        } z-20 fixed bottom-1 right-1 md:bottom-2 md:right-2 lg:bottom-3 lg:right-3 xl:bottom-3 xl:right-3  p-2 md:p-3 lg:p-3 xl:p-3  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        <svg
          fill="none"
          class="w-6 h-6"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          ></path>
        </svg>
        <p class="hidden lg:block xl:block pl-1">Etkinlik Ekle</p>
      </button>

      {/*MODAL EVENT INFO*/}
      <div
        tabindex="-1"
        aria-hidden="true"
        class={`place-items-center fixed left-0 top-0 z-[70] ${
          eventInfoModalState ? "flex" : "hidden"
        } bg-black/[.8] w-full h-full p-4 overflow-x-hidden overflow-y-auto   max-h-full`}
      >
        <div class="flex flex-col justify-center relative w-full max-w-2xl h-full max-h-full m-auto">
          <div
            style={{ maxHeight: "calc(100% - 3rem)" }}
            class="flex flex-col justify-between  relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <div class="flex items-start justify-between  p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Etkinlik Detayı
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

            <div class="overflow-y-scroll p-6 space-y-3 ">
              <div class="grid grid-cols-5 gap-4 ">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Start:
                </p>
                <p class="col-span-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {` ${eventDetail?.start
                    .toLocaleDateString()
                    .split(".")
                    .join(".")} ${eventDetail?.start.toLocaleTimeString()}`}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  End:
                </p>
                <p class="col-span-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {` ${eventDetail?.end
                    .toLocaleDateString()
                    .split(".")
                    .join(".")} ${eventDetail?.end.toLocaleTimeString()}`}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Detail:
                </p>
                <p class="col-span-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {eventDetail?.title}
                </p>
              </div>
            </div>

            <div class="flex items-center p-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={handleDeleteEventButton}
                class="text-white bg-red-700 hover:bg-red-800   focus:outline-none  font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:bg-red-900 "
              >
                <svg
                  fill="none"
                  class="w-5 h-5 text-gray-200 mr-1 dark:text-gray-100 "
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*MODAL ADD EVENT*/}
      <div
        tabindex="-1"
        aria-hidden="true"
        class={`place-items-center fixed left-0 top-0 z-[70] ${
          addEventModalState ? "flex" : "hidden"
        } bg-black/[.8] w-full h-full p-4 overflow-x-hidden overflow-y-auto   max-h-full`}
      >
        <div class="flex flex-col justify-center relative w-full max-w-2xl h-full max-h-full m-auto">
          <div
            style={{ maxHeight: "calc(100% - 3rem)" }}
            class="flex flex-col justify-between  relative bg-white rounded-lg shadow dark:bg-gray-700"
          >
            <div class="flex flex-row items-start  p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Yeni Etkinlik
              </h3>
              <button
                type="button"
                onClick={handleAddEventModalToggle}
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

            <div class="p-6 space-y-3 ">
              <div class="grid grid-cols-6 gap-4 ">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Start:
                </p>
                <p class="col-span-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {` ${selectDate?.start}`}
                </p>
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  End:
                </p>
                <p class="col-span-5 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {` ${selectDate?.end}`}
                </p>
              </div>
              <textarea
                id="message"
                rows="4"
                onChange={handleChangeSelectEventDetail}
                style={{ maxHeight: "50vh" }}
                value={selectDateContent}
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Etkinlik detayını giriniz..."
              ></textarea>
            </div>

            <div class="flex flex-col items-end p-3 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                onClick={handleAddEventSubmitButton}
                class="text-white bg-blue-700 hover:bg-blue-800   focus:outline-none  font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:focus:bg-blue-800 "
              >
                <svg
                  fill="none"
                  class="w-5 h-5 text-gray-200 mr-1 dark:text-gray-100 "
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  ></path>
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*MODAL DELETE EVENT CONFIRM*/}
      <div
        tabindex="-1"
        class={`place-items-center fixed left-0 top-0 z-[75] ${
          deleteEventModalState ? "" : "hidden"
        } bg-black/[.8] w-full h-full p-4 overflow-x-hidden overflow-y-auto   max-h-full`}
      >
        <div class="relative w-full max-w-md max-h-full m-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => {
                setDeleteEventModalState(false);
              }}
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="popup-modal"
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
            <div class="p-6 text-center">
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                onClick={handleDeleteEventSubmitButton}
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => {
                  setDeleteEventModalState(false);
                }}
                class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
