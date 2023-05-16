import { Route, Router, Routes } from "react-router";
import "./App.css";
import "./index.css";
import Layout from "./pages/Layout";
import DarkMain from "./pages/DarkMain";
import Main from "./pages/Main";
import Scroll from "./pages/Scroll";
import Calendar from "./components/Calendar";
import { useEffect } from "react";
import RaCalendar from "./pages/RaCalendar";
import Chat1 from "./pages/Chat1";
import Chat2 from "./pages/Chat2";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Temp from "./pages/Temp";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/dark" element={<DarkMain />} />
          <Route path="/scroll" element={<Scroll />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/racalendar" element={<RaCalendar />} />
          <Route path="/chat1" element={<Chat1 />} />
          <Route path="/chat2" element={<Chat2 />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
