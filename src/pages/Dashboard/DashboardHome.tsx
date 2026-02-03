import me from "@/assets/owner.png";

export default function DashboardHome() {
  return (
    <div>
      <h2 className="text-2xl text-green-700">Dashboard Home page bro</h2>
      <div className="text-amber-200 ">
        <img src={me} alt="" />
      </div>
    </div>
  );
}
