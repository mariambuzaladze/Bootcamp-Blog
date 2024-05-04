export default function Label({
  htmlForValue,
  labelText,
}: {
  htmlForValue: string;
  labelText: string;
}) {
  return (
    <label
      htmlFor={htmlForValue}
      className="block text-base font-medium leading-tight text-gray-800"
    >
      {labelText}
    </label>
  );
}
