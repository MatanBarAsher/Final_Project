import React from "react";
import FCHamburger from "../components/FCHamburger";
import locationPin from "../assets/images/locationPin1.png";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import { useNavigate } from "react-router-dom";
import FCLocation from "./FCLocation";

export default function FCMap({ location }) {
  const male = <ManIcon />;
  const seenMale = <ManIcon color="white" />;
  const female = <WomanIcon />;
  const seenFemale = <WomanIcon color="white" />;

  async function fetchUsers() {
    try {
      const response = await fetch("https://localhost:7216/api/Users");
      const users = await response.json();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  }

  // Function to update icons on the screen with user data
  function updateIcons(users) {
    const iconContainer = document.getElementById("icon-container");
    // iconContainer.innerHTML = male; // Clear previous icons

    users.forEach((user) => {
      const icon = document.createElement("div");
      icon.className = "icon";
      icon.style.top = Math.random() * 90 + "%"; // Random position from top
      icon.style.left = Math.random() * 90 + "%"; // Random position from left
      icon.addEventListener("click", () => {
        showUserDetails(user);
      });
      iconContainer.appendChild(icon);
    });
  }

  // Function to display user details
  function showUserDetails(user) {
    // Here you can implement how you want to display user details on the screen
    console.log("User details:", user);
    // For example, you can show a modal with user details
    showModal(user);
  }

  // Function to show modal with user details
  function showModal(user) {
    // Implement your modal display logic here
    // You can use a library like Bootstrap or create your own modal component
    alert(
      `User details:\nName: ${user.name}\nEmail: ${user.email}\nAge: ${user.age}`
    );
  }

  // Fetch users from the server and update icons on the screen
  async function initialize() {
    const users = await fetchUsers();
    updateIcons(users);
  }

  // Call initialize function to start the process
  initialize();

  return <div id="icon-container"></div>;
}
