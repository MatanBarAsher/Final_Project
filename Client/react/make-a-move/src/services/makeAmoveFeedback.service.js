import axios from "axios";

export const makeAmoveFeedbackServer = {
  createFeedback: (data) =>
    axios
      .post(`${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/feedback`, data)
      .then((res) => res.data) //returning data
      .catch((error) => {
        console.error("Error create match", error);
        throw error; // Rethrow the error to be caught by the caller
      }),
};
