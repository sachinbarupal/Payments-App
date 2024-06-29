import Avatar from "./Avatar";

export default function AppBar() {
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex items-center mr-2">
        <div className="flex flex-col justify-center h-full mr-2">Hello</div>
        <Avatar letter="U" />
      </div>
    </div>
  );
}
