import InputBox from "./InputBox";
import User from "./User";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const token = localStorage.getItem("token");
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `http://localhost:4000/api/users/search?filter=${filter.toLowerCase()}`,
        {
          headers: { Authorization: token },
        }
      );

      setUsers(res.data.users);
    };

    fetchUsers();
  }, [filter]);

  return (
    <>
      <div className=" font-bold px-4 pt-2 text-2xl">Users</div>
      <div className=" w-11/12 ml-4">
        <InputBox
          placeHolder="Search For User..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className=" ml-4 mt-4 w-11/12">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
}
