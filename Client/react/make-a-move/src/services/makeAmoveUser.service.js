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
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        gender: data.gender,
        image: data.image,
        height: data.height,
        birthday: data.birthday,
        phoneNumber: data.phoneNumber,
        isActive: true,
        city: data.city,
        personalInterestsIds: data.personalInterestsIds,
        preferencesIds: [""],
        currentPlace: 0,
        persoalText: data.description,
      })
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.log(data);
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
        console.error("Error on login:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),
  setPreferences: (data) =>
    axios
      .patch(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/preferences`, data)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error on setting Preferences:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),

  setLocationValue: (data) => {
    console.log(data);
    return axios
      .post(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/Users/UpdatePlace`,
        data
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error on setting current place:", error);
        throw error; // Rethrow the error to be caught by the caller
      });
  },

  /**
   * check if the given key exist for the given value
   * @param  data key and value object @example {key:'userName', value:'yael'}
   * @returns boolean
   */
  checkExist: (key, value) =>
    axios
      .post(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/checkExistingUserByKeyAndValue/${key}`,
        value
      )
      .then((res) => res.key) //returning data
      .catch((error) => {
        console.error("Error:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),

  changeImages: async ({ currentEmail, formData }) => {
    try {
      console.log(currentEmail);
      const response = await axios.post(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/Users/changeImages/${currentEmail}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Current-Email": currentEmail, // Assuming your server needs this header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      return null;
    }
  },
};
