export default function Card({ title, value }) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
