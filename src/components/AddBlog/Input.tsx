export default function Input({
  type,
  name,
  placeholder,
}: {
  type: string;
  name: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="border border-gray-300 rounded-lg p-3"
    />
  );
}
