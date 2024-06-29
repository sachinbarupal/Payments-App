import { useNavigate, useSearchParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import axios from "axios";
import { useState } from "react";

export default function Send() {
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");
  const id = searchParams.get("id");
  const username = searchParams.get("username");
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const handleTransfer = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/account/transfer",
        {
          to: id,
          amount,
        },
        { headers: { Authorization: token } }
      );

      alert("Transfer Successfull !!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className=" h-full flex flex-col justify-center">
        <div className="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-600">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className=" p-6">
            <div className="flex items-center space-x-4 mb-2">
              <Avatar letter={username[0]} />
              <h3 className="text-2xl font-semibold">{username}</h3>
            </div>

            <div className=" space-y-2">
              <div className=" space-y-3 mb-4">
                <label
                  className=" text-sm font-bold peer-disabled:cursor-not-allowed peer-aria-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in $)
                </label>
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  type="number"
                  id="amount"
                  placeholder="Enter Amount"
                  className="flex h-10 w-full rounded-md px-2 border"
                />
              </div>
              <button
                onClick={handleTransfer}
                className=" rounded-md text-lg w-full bg-green-300 hover:bg-green-400"
              >
                Send
              </button>
              <button
                onClick={() => navigate(-1)}
                className=" rounded-md text-lg w-full bg-red-300 hover:bg-red-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
