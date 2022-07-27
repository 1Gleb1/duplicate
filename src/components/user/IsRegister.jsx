import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import Login from "./Register";
import SignIn from "./SignIn";

const IsRegister = () => {
  const auth = getAuth();
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const handleLoginForm = () => {
    setIsRegisterForm(false);
  };
  const handleRegisterForm = () => {
    setIsRegisterForm(true);
  };
  const provider = new GoogleAuthProvider();
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => console.log("Yes"));
  };

  return (
    <div>
      {auth.currentUser == null && (
        <div>
          {isRegisterForm && (
            <div>
              <h3 className="text-center text-xl font-medium">Register</h3>
              <Login />
              <div className="mt-4 flex items-start justify-between">
                <button onClick={handleLoginForm}>Login</button>
                {
                  <button onClick={handleSignInWithGoogle}>
                    <AiFillGoogleCircle className="w-12 h-12" />
                  </button>
                }
              </div>
            </div>
          )}
          {!isRegisterForm && (
            <div>
              <h3 className="text-center text-xl font-medium">Login</h3>
              <SignIn />
              <div className="mt-4 flex items-start justify-between">
                <button onClick={handleRegisterForm}>Register</button>
                {
                  <button onClick={handleSignInWithGoogle}>
                    <AiFillGoogleCircle className="w-12 h-12" />
                  </button>
                }
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IsRegister;
