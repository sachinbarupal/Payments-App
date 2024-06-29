import Avatar from "./Avatar";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
export default function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex items-center text-lg gap-2">
        <Avatar letter={user.firstName[0]} />
        {`${user.firstName} ${user.lastName}`}
      </div>
      <div>
        <Button
          onClick={() =>
            navigate(
              `/send?username=${user.firstName + " " + user.lastName}&id=${
                user._id
              }`
            )
          }
          label="Send Money"
        />
      </div>
    </div>
  );
}
