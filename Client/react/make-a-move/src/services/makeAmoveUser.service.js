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
        image: [],
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

  updateUser: (data) =>
    axios
      .put(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/update`, data)
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
      .post(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/Users/EditPreferences`,
        {
          email: data.email,
          firstName: "string",
          lastName: "string",
          password: "string",
          gender: 0,
          image: ["string"],
          height: 0,
          birthday: "2024-05-20T17:51:45.427Z",
          phoneNumber: "string",
          isActive: true,
          city: "string",
          personalInterestsIds: ["string"],
          currentPlace: 0,
          persoalText: "string",
          preferencesDictionary: {
            gender: data.preferedGender,
            minAge: `${data.ageRange[0]}`,
            maxAge: `${data.ageRange[1]}`,
            height: `${data.minHeight}`,
            maxDistance: `${data.maxDistance}`,
          },
        }
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error on setting Preferences:", error);
        throw error; // Rethrow the error to be caught by the caller
      }),

  setLocationValue: async (placeName, user) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/Users/UpdatePlace/${user}`,
        placeName,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Error on setting current place:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
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
  getAllUsersEmails: () =>
    axios
      .get(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/getEmails`)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to be caught by the caller}
      }),

  AddImage: async ({ formData }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/AddImages`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  },

  GetUserByEmail: (email) =>
    axios
      .get(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/GetUserByEmail/${email}`
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching user:", error);
        throw error; // Rethrow the error to be caught by the caller}
      }),

  GetUserNoPasswordByEmail: (email) =>
    axios
      .get(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/GetUserDetailsNoPasswordByEmail/${email}`
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching user:", error);
        throw error; // Rethrow the error to be caught by the caller}
      }),

  GetImagesByEmail: (email) =>
    axios
      .get(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/getImagesByEmail/${email}`
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching user images:", error);
        throw error; // Rethrow the error to be caught by the caller}
      }),

  getImageByID: async (imageId) =>
    await axios
      .get(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/GetImage?imageId=${imageId}`,
        {
          responseType: "blob",
        }
      )
      .then((res) => URL.createObjectURL(res.data))
      .catch((error) => {
        console.error("Error fetching image:", error);
        throw error; // Rethrow the error to be caught by the caller}
      }),

  readUsersByPreference: (email) => {
    return axios
      .get(
        `${
          import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
        }/users/ReadUsersByPreference?userEmail=${email}`
      )
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error fetching users:", error);
        throw error; // Rethrow the error to be caught by the caller}
      });
  },
};
