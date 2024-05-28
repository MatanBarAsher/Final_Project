import React, { useEffect, useState } from "react";
import FCHamburger from "../components/FCHamburger";
import locationPin from "../assets/images/locationPin1.png";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import WcIcon from "@mui/icons-material/Wc";
import { useNavigate } from "react-router-dom";
import { makeAmoveUserServer } from "../services";

export default function FCMap({ location }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentPlace = JSON.parse(localStorage.getItem("current-place"));

  useEffect(() => {
    const fetchUserDetails = async () => {
      let userEmail = localStorage.getItem("current-email");
      if (userEmail && userEmail.startsWith('"')) {
        userEmail = userEmail.replaceAll('"', "");
      }

      if (userEmail) {
        try {
          const userEmails = await makeAmoveUserServer.readUsersByPreference(
            userEmail
          );
          const userDetails = await Promise.all(
            Object.keys(userEmails).map(async (email) => {
              const user = await makeAmoveUserServer.GetUserByEmail(email);
              return { ...user, email };
            })
          );

          setUsers(renderIconsByGender(userDetails));
        } catch (error) {
          console.error("Error retrieving user details:", error);
        }
      } else {
        console.error("User email not found in localStorage");
      }
    };

    fetchUserDetails();
  }, []);

  const renderIconsByGender = (users) => {
    return users.map((user, index) => (
      <div
        key={user.email + index} // Ensure each icon has a unique key
        className="icon"
        style={{
          top: `${Math.random() * 80}%`,
          left: `${Math.random() * 80}%`,
        }}
        onClick={() => showUserDetails(user)}
      >
        {user.gender === 2 ? (
          <ManIcon style={{ color: "white", fontSize: "100px" }} />
        ) : user.gender === 1 ? (
          <WomanIcon style={{ color: "pink", fontSize: "100px" }} />
        ) : (
          <WcIcon style={{ color: "grey", fontSize: "100px" }} />
        )}
      </div>
    ));
  };

  const showUserDetails = (user) => {
    console.log("User details:", user);
    localStorage.setItem("user-to-show", JSON.stringify(user));
    navigate("/profile");
  };

  return (
    <>
      <div className="map-container">
        <FCHamburger />
        <div className="icon-container">{users}</div>
        <div className="map-footer">
          <img
            src={"." + locationPin}
            width={"32px"}
            height={"42.5px"}
            style={{ margin: 15 }}
            alt="Location Pin"
          />
          <h3>{location ? location : currentPlace.placeName}</h3>
        </div>
      </div>
    </>
  );
}

// import React, { useEffect, useState, useRef } from "react";
// import FCHamburger from "../components/FCHamburger";
// import locationPin from "../assets/images/locationPin1.png";
// import WomanIcon from "@mui/icons-material/Woman";
// import ManIcon from "@mui/icons-material/Man";
// import WcIcon from "@mui/icons-material/Wc";
// import { useNavigate } from "react-router-dom";

// export default function FCMap({ location }) {
//   const [usersOnMap, setUsersOnMap] = useState([]);
//   const [usedPositions, setUsedPositions] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const containerRef = useRef(null);

//   useEffect(() => {
//     // Your API call to fetch users from the server would typically go here
//     // For demonstration purposes, setting the users statically
//     const users = [
//       {
//         email: "@david",
//         firstName: "string",
//         lastName: "string",
//         password: "string",
//         gender: 1,
//         image: ["string"],
//         height: 170,
//         birthday: "1997-05-01T00:00:00",
//         phoneNumber: "string",
//         isActive: true,
//         city: "string",
//         personalInterestsIds: ["string"],
//         currentPlace: 0,
//         persoalText: "s",
//         preferencesDictionary: {
//           gender: "2",
//           minAge: "25",
//           maxAge: "31",
//           height: "170",
//         },
//       },
//       {
//         email: "@matan",
//         firstName: "string",
//         lastName: "string",
//         password: "string",
//         gender: 1,
//         image: ["string"],
//         height: 170,
//         birthday: "2024-05-18T00:00:00",
//         phoneNumber: "string",
//         isActive: true,
//         city: "string",
//         personalInterestsIds: ["string"],
//         currentPlace: 0,
//         persoalText: "s",
//         preferencesDictionary: {
//           gender: "2",
//           minAge: "25",
//           maxAge: "31",
//           height: "170",
//         },
//       },
//       {
//         email: "@neta",
//         firstName: "string",
//         lastName: "string",
//         password: "string",
//         gender: 1,
//         image: ["string"],
//         height: 160,
//         birthday: "1994-03-29T00:00:00",
//         phoneNumber: "string",
//         isActive: true,
//         city: "string",
//         personalInterestsIds: ["string"],
//         currentPlace: 0,
//         persoalText: "s",
//         preferencesDictionary: {
//           gender: "2",
//           age: "29",
//           height: "170",
//         },
//       },
//       {
//         email: "@rotem",
//         firstName: "string",
//         lastName: "string",
//         password: "string",
//         gender: 2,
//         image: ["string"],
//         height: 170,
//         birthday: "1998-05-18T00:00:00",
//         phoneNumber: "string",
//         isActive: true,
//         city: "string",
//         personalInterestsIds: ["string"],
//         currentPlace: 0,
//         persoalText: "s",
//         preferencesDictionary: {
//           gender: "1",
//           minAge: "25",
//           maxAge: "31",
//           height: "170",
//         },
//       },
//       {
//         email: "@yarin",
//         firstName: "string",
//         lastName: "string",
//         password: "string",
//         gender: 2,
//         image: ["string"],
//         height: 170,
//         birthday: "1994-12-05T00:00:00",
//         phoneNumber: "string",
//         isActive: true,
//         city: "string",
//         personalInterestsIds: ["string"],
//         currentPlace: 0,
//         persoalText: "s",
//         preferencesDictionary: {
//           age: "30",
//           gender: "1",
//           height: "160",
//         },
//       },
//       {
//         email: "asdasd@asdasd.c",
//         firstName: "asdasd",
//         lastName: "asdasdasd",
//         password: "adsasdasda",
//         gender: 1,
//         image: [""],
//         height: 150,
//         birthday: "2010-02-11T00:00:00",
//         phoneNumber: "134413414",
//         isActive: true,
//         city: "חדרה",
//         personalInterestsIds: ["", "ספורט"],
//         currentPlace: 0,
//         persoalText: "a",
//         preferencesDictionary: {},
//       },
//       {
//         email: "mail@gmail.com",
//         firstName: "a",
//         lastName: "a",
//         password: "a",
//         gender: 2,
//         image: [""],
//         height: 111,
//         birthday: "1996-02-22T00:00:00",
//         phoneNumber: "1",
//         isActive: true,
//         city: "חדרה",
//         personalInterestsIds: ["", "משחק"],
//         currentPlace: 0,
//         persoalText: "1",
//         preferencesDictionary: {},
//       },
//       {
//         email: "matan@gmail.com",
//         firstName: "string",
//         lastName: "string",
//         password: "111",
//         gender: 1,
//         image: ["string"],
//         height: 0,
//         birthday: "2024-05-19T00:00:00",
//         phoneNumber: "123",
//         isActive: true,
//         city: "string",
//         personalInterestsIds: ["string"],
//         currentPlace: 0,
//         persoalText: "s",
//         preferencesDictionary: {
//           additionalProp1: "string",
//           additionalProp2: "string",
//           additionalProp3: "string",
//         },
//       },
//       {
//         email: "Yael@gmail.com",
//         firstName: "yael",
//         lastName: "terner",
//         password: "123456",
//         gender: 1,
//         image: [""],
//         height: 165,
//         birthday: "2000-07-12T00:00:00",
//         phoneNumber: "0546662406",
//         isActive: true,
//         city: "חדרה",
//         personalInterestsIds: ["", "בישול", "לצאת למסעדות"],
//         currentPlace: 0,
//         persoalText: "",
//         preferencesDictionary: {},
//       },
//       // Your array of users goes here
//     ];
//     setUsersOnMap(users);
//     setUsedPositions(generateRandomPositions(users.length));
//   }, []);

//   const generateRandomPositions = (count) => {
//     const positions = [];
//     for (let i = 0; i < count; i++) {
//       let top, left;
//       do {
//         top = `${Math.random() * 90}%`;
//         left = `${Math.random() * 90}%`;
//       } while (
//         usedPositions.some(
//           (position) => position.top === top && position.left === left
//         )
//       );
//       positions.push({ top, left });
//     }
//     return positions;
//   };

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setOffset({
//       x: e.clientX - containerRef.current.offsetLeft,
//       y: e.clientY - containerRef.current.offsetTop,
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const x = e.clientX - offset.x;
//     const y = e.clientY - offset.y;
//     containerRef.current.style.left = `${x}px`;
//     containerRef.current.style.top = `${y}px`;
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const renderIconsByGender = (gender) => {
//     const icons = usersOnMap
//       .filter((user) => user.gender === gender)
//       .map((user, index) => {
//         <div
//           key={user.email + index}
//           className="icon"
//           style={{
//             top: usedPositions[index]?.top,
//             left: usedPositions[index]?.left,
//           }}
//           onClick={() => showUserDetails(user)}
//         >
//           {gender === 1 ? (
//             <ManIcon style={{ color: "white", fontSize: "100px" }} />
//           ) : gender === 2 ? (
//             <WomanIcon style={{ color: "pink", fontSize: "100px" }} />
//           ) : (
//             <WcIcon style={{ color: "grey", fontSize: "100px" }} />
//           )}
//         </div>;
//       });
//     return icons;
//   };

//   const showUserDetails = (user) => {
//     // Implement logic to display user details
//     console.log("User details:", user);
//   };

//   return (
//     <>
//       <div className="map-container">
//         <div
//           className="map"
//           ref={containerRef}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         >
//           <FCHamburger />
//           <div
//             id="icon-container"
//             // style={{
//             //   position: "absolute",
//             //   width: "100%",
//             //   height: "100%",
//             // }}
//           >
//             {renderIconsByGender(1)}
//             {renderIconsByGender(2)}
//             {renderIconsByGender(3)}
//           </div>
//           <div className="map-footer">
//             <img
//               src={locationPin}
//               width={"32px"}
//               height={"42.5"}
//               style={{ margin: 15 }}
//             />
//             <h3>{location}אני נמצא פה</h3>{" "}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
