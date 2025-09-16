import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Users" value="1,250" />
      <Card title="Revenue" value="$12,300" />
      <Card title="Events" value="45" />
    </div>
  );
}
