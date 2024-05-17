import { Password } from "@mui/icons-material";
import axios from "axios";

export const makeAmoveUserServer = {
  getAllUsers: () =>
    axios
      .get(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users`)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to be caught by the caller}
      }),

  createUser: (data) =>
    axios
      .post(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users`, {
        ...data,
        isActive: true,
        // personal text
      })
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
      .post(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/Users/Login`, {
        email: data.email,
        firstName: "string",
        lastName: "string",
        password: data.password,
        gender: 0,
        image: ["string"],
        height: 0,
        birthday: "2024-05-17T08:24:11.516Z",
        phoneNumber: "string",
        isActive: true,
        city: "string",
        personalInterestsIds: ["string"],
        preferencesIds: ["string"],
        currentPlace: 0,
        persoalText: "s",
      })
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error login:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),
  setPreferences: (data) =>
    axios
      .patch(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/Users/preferences`,
        data
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error setPreferences:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),

  /**
   * check if the given key exist for the given value
   * @param  data key and value object @example {key:'userName', value:'yael'}
   * @returns boolean
   */
  checkExist: (data) =>
    axios
      .post(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/checkExist`,
        data
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error create user:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),

  changeImages: (images) =>
    axios
      .put(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/changeImages/"string11"`,
        images
      )
      .then((res) => res.images)
      .catch((error) => {
        console.error("Error change images:", error);
        throw error;
      }),
};
