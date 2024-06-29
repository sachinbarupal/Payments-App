import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

export default function Signin() {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div className="rounded-lg bg-white w-1/3 p-2 text-center h-max px-4">
          <Heading text="Sign In" />
          <SubHeading text="Enter your credentials to login !!" />
          <InputBox label="Username" placeHolder="Enter Username" />
          <InputBox label="Password" placeHolder="Enter password" />
          <div className=" pt-4 w-1/2 mx-auto">
            <Button label="Sign In" />
          </div>

          <BottomWarning
            label="Don't have an Account?"
            buttonText="Sign Up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
}
