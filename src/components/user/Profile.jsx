import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { getStorage, ref, uploadBytes, UploadBytes } from "firebase/storage";
// import "./img/kit.jpg";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const [photo, setPhoto] = useState();

  const auth = getAuth();
  const uid = auth.currentUser ? auth.currentUser.uid : "guest";

  let metaData, filePath, filePhoto;

  const imageRef = useRef();
  const fileInput = (event) => {
    const fr = new FileReader();
    console.log(event);
    filePhoto = event.target.files[0];
    fr.readAsDataURL(filePhoto);
    fr.addEventListener("load", async () => {
      setPhoto(fr.result);
      // const imageData = new FormData();
      // imageData.append("image", filePhoto);

      filePath = `avatart/${Date.now()}-${filePhoto.name}`;
      metaData = { contentType: filePhoto.type };

      // console.log(filePath, filePhoto);
    });
  };
  // const fileUpload = async () => {
  //   const storage = getStorage();
  //   const fileRef = ref(storage, filePath);
  //   await uploadBytes(fileRef, filePhoto, metaData);
  // };

  return (
    <div className=" border-2 border-[#0e1921]">
      <div className="px-6 py-2 bg-[#0e1921] w-full max-w-64 text-center">
        Profile
      </div>
      <div className="text-xl text-center my-4">
        {auth.currentUser.displayName
          ? auth.currentUser.displayName
          : auth.currentUser.email}
      </div>
      <div className="flex justify-center h-36">
        {/* <div className="w-full bg-red-300"></div> */}
        {true && (
          <img
            src={photo ? photo : require("../../img/kit.jpg")}
            alt={"photo"}
            className="h-48 w-48 rounded-lg bg-cover border-4 border-[#747474] "
          />
        )}
      </div>
      <div className="p-4 mt-12 text-center">
        <label>
          <h4> Select image </h4>
          <input
            type="file"
            ref={imageRef}
            accept="image/png, image/jpeg"
            onChange={fileInput}
            className="w-32 h-8 bg-slate-700"
          />
        </label>
        {/* <button onClick={fileUpload}>Upload</button> */}
      </div>
      {/* <div className="text-center text-xl p-2">редактировать</div> */}
    </div>
  );
};

export default Profile;
