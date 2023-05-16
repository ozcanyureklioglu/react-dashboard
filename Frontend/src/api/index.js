import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001/",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error.response.status) {
      window.location = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

export const getChatList = async (input) => {
  const { data } = await instance.post("api/v1/Chat/GetChatList", input);
  return data;
};

export const getGroupChatList = async (input) => {
  const { data } = await instance.post("api/v1/Chat/GetGroupChatList", input);
  return data;
};

export const getAnnouncementList = async () => {
  const { data } = await instance.get(
    "api/v1/Announcement/GetAnnouncementList"
  );
  return data;
};

export const getAnnouncement = async (id) => {
  const { data } = await instance.get(`api/v1/Announcement/${id}`);
  return data;
};

export const getEvents = async (id) => {
  const { data } = await instance.get("api/v1/Event/GetUserEvents");
  return data;
};
export const addEvent = async (input) => {
  const { data } = await instance.post("api/v1/Event", input);
  return data;
};
export const deleteEvent = async (id) => {
  const { data } = await instance.delete(`api/v1/Event/${id}`);
  return data;
};
