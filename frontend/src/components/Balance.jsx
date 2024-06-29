import axios from "axios";
import { useEffect, useState } from "react";

export default function Balance() {
  const [balance, setBalance] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchBal = async () => {
      const res = await axios.get("http://localhost:4000/api/account/balance", {
        headers: { Authorization: token },
      });
      setBalance(parseFloat(res.data.balance).toFixed(2));
    };
    fetchBal();
  }, []);

  return (
    <div className=" font-bold p-4 border">Your Balance : {balance} $ </div>
  );
}
