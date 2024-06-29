export default function Avatar({ letter }) {
  return (
    <div className="rounded-full h-9 w-9 bg-slate-200 flex justify-center items-center">
      <div className="flex flex-col justify-center h-full">{letter}</div>
    </div>
  );
}
