export default function AlertError({ message }: { message: string }) {
  return (
    <div className="border-danger my-2 rounded-md border bg-red-100 px-4 py-2">
      <p className="text-red-800">{message}</p>
    </div>
  );
}
