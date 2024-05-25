// import React, { useState, useEffect } from "react";
// import FCCustomBtn from "../components/FCCustomBtn";
// import { makeAmoveUserServer } from "../services";
// import { useNavigate } from "react-router-dom";
// import FCImageInp from "../components/FCImageInp";

// export default function FCSetImages() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     // Call the function to fetch user data when component mounts
//     makeAmoveUserServer
//       .GetUserByEmail(JSON.parse(localStorage.getItem("current-email")))
//       .then((userData) => {
//         setUser(userData); // Set user state with retrieved data
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         // Handle error
//       });
//   }, []); // Empty dependency array ensures this effect runs only once when component mounts

//   // State to store selected images
//   const [images, setImages] = useState({
//     img1: null,
//     img2: null,
//     img3: null,
//     img4: null,
//   });

//   const handleImgInput = (e) => {
//     e.preventDefault();
//     console.log(user);
//     console.log(images);
//     const formData = new FormData();
//     formData.append(`file`, images["img1"]);
//     // for (const key in images) {
//     //   if (images[key]) {
//     //     console.log(`Key: ${key}, Value: ${images[key].name}`);
//     //     formData.append(`files`, images[key]);
//     //     console.log([...formData]);
//     //   }
//     // }
//     const currentEmail = JSON.parse(localStorage.getItem("current-email")); // need to change to the relevant mail
//     // makeAmoveUserServer
//     //   .changeImages({ currentEmail, formData })
//     //   .then((response) => {
//     //     console.log(formData.getAll(`files`));
//     //     if (response) {
//     //       console.log("success");
//     //       console.log(response);
//     //       navigate("/preferences");
//     //     } else {
//     //       console.log("failure");
//     //     }
//     //   });

//     makeAmoveUserServer.AddImage({ formData }).then((response) => {
//       console.log(formData.getAll(`file`));
//       if (response) {
//         console.log("success");
//         console.log(response);
//         // navigate("/preferences");
//       } else {
//         console.log("failure");
//       }
//     });
//   };
//   const handleImageChange = (name, file) => {
//     aa();

//     setImages((prevImages) => ({
//       ...prevImages,
//       [name]: file,
//     }));
//     console.log(images);
//   };

//   return (
//     <>
//       <h1>תמונות</h1>
//       <form onSubmit={handleImgInput}>
//         <div className="images-inp-container">
//           <FCImageInp name={"img1"} onChange={handleImageChange} />
//           <FCImageInp name={"img2"} onChange={handleImageChange} />
//           <FCImageInp name={"img3"} onChange={handleImageChange} />
//           <FCImageInp name={"img4"} onChange={handleImageChange} />
//         </div>
//         <FCCustomBtn title="סיום" type={"submit"} />
//       </form>
//       <img id="aaa" src="" alt="" />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCImageInp from "../components/FCImageInp";
import FCUpload from "../components/FCUpload";
import FCGetImage from "../components/FCGetImage";

export default function FCSetImages() {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Assuming you might need this for navigation

  useEffect(() => {
    const currentEmail = JSON.parse(localStorage.getItem("current-email"));
    if (currentEmail) {
      makeAmoveUserServer
        .GetUserByEmail(currentEmail)
        .then((userData) => {
          setUser(userData); // Set user state with retrieved data
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    }
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  const handleImgInput = (e) => {
    e.preventDefault();
    // Handle the form submission logic
  };

  return (
    <>
      <h1>תמונות</h1>
      <form onSubmit={handleImgInput}>
        <div className="images-inp-container">
          <FCUpload />
          {/* Render existing images */}
          {user.image && user.image.length > 0 ? (
            user.image.map((imageId) => (
              <FCGetImage key={imageId} imageId={imageId} />
            ))
          ) : (
            <p>אין תמונות להציג</p>
          )}
        </div>
        <FCCustomBtn title="סיום" type="submit" />
      </form>
    </>
  );
}
