export default function InputBox({ label, placeHolder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        onChange={onChange}
        placeholder={placeHolder}
        className="w-full px-2 py-1 border"
      />
    </div>
  );
}
