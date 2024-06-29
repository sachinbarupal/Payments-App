import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
export default function Dashboard() {
  return (
    <div>
      <AppBar />
      <Balance />
      <div className=" flex flex-col items-center">
        <Users />
      </div>
    </div>
  );
}
