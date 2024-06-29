import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = async () => {
    const res = await axios.post("http://localhost:4000/api/users/signup", {
      email,
      firstName,
      lastName,
      password,
    });

    localStorage.setItem("token", `Bearer ${res.data.token}`);
  };

  return (
    <div className=" bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="rounded-lg w-1/3 bg-white text-center p-2 h-max px-4">
          <Heading text="Sign Up" />
          <SubHeading text="Enter Your Information to register !!" />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            placeHolder="Enter First Name"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            placeHolder="Enter Last Name"
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeHolder="Enter Email"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeHolder="Enter password"
          />
          <div className=" pt-4 w-1/2 mx-auto">
            <Button onClick={handleRegister} label="Sign Up" />
          </div>

          <BottomWarning
            label="Already have an Account?"
            buttonText="Sign In"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
}
