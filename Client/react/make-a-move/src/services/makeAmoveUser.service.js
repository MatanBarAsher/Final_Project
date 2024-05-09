import axios from "axios";

export const makeAmoveUserServer = {
  getAllUsers: () =>
    axios
      .get(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users`)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),

  createUser: (data) =>
    axios
      .post(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users`, data)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error create user:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),
  updateUser: (email, data) =>
    axios
      .put(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/${email}`,
        data
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error update user:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),
  login: (data) =>
    axios
      .post(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/login`, data)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error login:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),
};
