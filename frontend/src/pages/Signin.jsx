// Importing necessary components from the components directory
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"

// Definition of the Signin functional component
export const Signin = () => {
  // State variables
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");

  const navigate = useNavigate();

  // Component returns a div structure for the sign-in page
  return (
    // Main container with a slate background, taking full screen height, and centering its content
    <div className="bg-slate-300 h-screen flex justify-center">
      {/* Flex container to center the sign-in form vertically and horizontally */}
      <div className="flex flex-col justify-center">
        {/* Sign-in form container with a white background, rounded corners, and padding */}
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          {/* Heading component displaying "Sign in" */}
          <Heading label={"Sign in"} />
          {/* SubHeading component providing instructions */}
          <SubHeading label={"Enter your credentials to access your account"} />
          {/* InputBox component for the email input */}
          <InputBox onChange={
            (e)=>{
              setUsername(e.target.value)
            }
          } placeholder="harkirat@gmail.com" label={"Email"} />
          {/* InputBox component for the password input */}
          <InputBox onChange={
            (e)=>{
              setPassword(e.target.value)
            }
          } placeholder="123456" label={"Password"} />
          {/* Container for the sign-in button to add top padding */}
          <div className="pt-4">
            {/* Button component for submitting the sign-in form */}
            <Button onClick={
              async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  username,
                  password
                })
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("userid", response.data.userid);
                localStorage.setItem("username", response.data.firstName);
                navigate("/dashboard")
              }
            } label={"Sign in"} />
          </div>
          {/* BottomWarning component for navigation to the sign-up page */}
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  )
}
