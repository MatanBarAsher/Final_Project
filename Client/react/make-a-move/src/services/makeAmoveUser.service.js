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
        preferencesIds: data.preferencesIds,
        currentPlace: data.currentPlace,
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
  login: ({ email, password }) =>
    axios
      .post(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/Users/Login`, {
        email: email,
        firstName: "string",
        lastName: "string",
        password: password,
        gender: 1,
        image: ["string"],
        height: 0,
        birthday: "2024-05-12T09:32:10.166Z",
        phoneNumber: "string",
        isActive: true,
        city: "string",
        personalInterestsIds: ["string"],
        preferencesIds: ["string"],
        currentPlace: 0,
        personlText: "string",
      })
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error login:", error);
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
