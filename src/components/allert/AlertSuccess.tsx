export default function AlertSuccess({ message }: { message: string }) {
  return (
    <div className="border-success mb-4 rounded-md border bg-green-100 px-4 py-2">
      <p className="text-green-800">{message}</p>
    </div>
  );
}
