import React, { useEffect, useState } from "react";

const months = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

/*
const nextMonth = () => {
  hafta = [];
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
};*/

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const startDay = firstDay.getDay();
  const numDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const dateClickHAndler = (event) => {
    const date = event.currentTarget.dataset.date;
    console.log(date);
  };

  const updateCalendar = () => {
    const list = [];
    for (let i = startDay - 2; i >= 0; i--) {
      var tarih = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        -i
      ).getDate();
      list.push(
        <div class="flex items-center justify-center p-2  ">
          <p class="text-sm sm:text-sm lg:text-lg xl:text-xl  text-gray-300 dark:text-gray-500">
            {tarih}
          </p>
        </div>
      );
    }
    for (let i = 1; i <= numDays; i++) {
      var buttonDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      )
        .toLocaleDateString("tr-TR")
        .split(".")
        .join("-");
      list.push(
        <button
          onClick={dateClickHAndler}
          data-date={buttonDate}
          class="border-dotted border-0 rounded-3xl  transition duration-300 flex  flex-col items-center justify-between p-2  hover:bg-blue-100 dark:hover:bg-gray-600  cursor-pointer "
        >
          <p class="text-sm font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-white  ">
            {i}
          </p>
        </button>
      );
    }
    for (let i = 1; i <= 42 - numDays - startDay + 1; i++) {
      list.push(
        <div class="flex items-center p-2 justify-center ">
          <p class="text-sm sm:text-sm lg:text-lg xl:text-xl text-gray-300 dark:text-gray-500 ">
            {i}
          </p>
        </div>
      );
    }
    return list;
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToPrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div class="wrapper bg-white dark:bg-gray-700 rounded shadow w-full ">
      <div class="header flex justify-between border-b p-2">
        <span class="text-lg font-bold text-black dark:text-white  ">{`${
          months[currentDate.getMonth()]
        } ${currentDate.getFullYear()}`}</span>
        <div class="buttons">
          <button class="p-1" onClick={goToPrevMonth}>
            <svg
              width="1em"
              fill="gray"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-left-circle"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
              />
            </svg>
          </button>
          <button class="p-1" onClick={goToNextMonth}>
            <svg
              width="1em"
              fill="gray"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-arrow-right-circle"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="grid grid-cols-7 p-2 gap-1 bg-white dark:bg-gray-700">
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Pazartesi
          </p>
        </div>
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Salı
          </p>
        </div>
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Çarşamba
          </p>
        </div>
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Perşembe
          </p>
        </div>
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Cuma
          </p>
        </div>
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Cumartesi
          </p>
        </div>
        <div class="flex items-center justify-center p-2">
          <p class="text-xs font-medium sm:text-sm lg:text-lg xl:text-xl text-black dark:text-gray-100 ">
            Pazar
          </p>
        </div>
        {updateCalendar()}
      </div>
    </div>
  );
}

export default Calendar;
