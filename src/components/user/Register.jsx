import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useRef, useState } from "react";
import Allert from "./Allert";

const Register = () => {
  const auth = getAuth();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    } else {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then(console.log("signIN"))
        .catch((error) => {
          const errorCode = error.code.split("/");
          const errorMessage = error.message;
          setError(errorCode[1].replace(/-/g, " "));
        });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="text"
          placeholder="Enter your name..."
          ref={nameRef}
        />
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="email"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="password"
          placeholder="Enter password..."
          ref={passwordRef}
        />
        <input
          className="px-2 py-1 text-white bg-gray-700 border-2 border-gray-900 rounded-lg"
          required
          type="password"
          placeholder="Enter confirm password..."
          ref={passwordConfirmRef}
        />
        <button
          type="submit"
          className="w-full bg-gray-600 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Register
        </button>
      </form>
      {error && <Allert error={error} />}
    </div>
  );
};

export default Register;
