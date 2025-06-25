import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import React, { useState } from 'react';
import { validateEmail } from "../../utils/helper";
import { LuTarget, LuUserPlus } from "react-icons/lu";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector"; // Make sure to import the ProfilePhotoSelector component
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");

    try{

      if(profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user} = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError (error.response.data.message);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    };

    // Here you can add your API request to handle user sign-up
    // Example:
    // const response = await signUpAPI({ fullName, email, password, profilePic });
    // if (response.success) {
    //   navigate("/dashboard"); // or wherever you want to redirect the user
    // }
  

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <LuUserPlus className="text-2xl text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold gradient-text mb-1">Create an Account</h3>
              <p className="text-gray-700 text-lg">
                Join us today by entering your details below.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSignUp}>

          {/* Profile photo selector */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />



          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
               value={fullName}
               onChange={({ target }) => setfullName(target.value)}
               label="Full Name"
               placeholder="John"
               type="text"
            />

            <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text" 
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password" 
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          
                    <button type="submit" className="btn-primary">
                    SIGNUP
                    </button>
          
                    <p className="text-[13px] text-slate-800 mt-3">
                      Already have an account?{" "}
                      <Link className="font-medium text-primary underline" to="/login">
                      Login
                      </Link>
                    </p>

        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
