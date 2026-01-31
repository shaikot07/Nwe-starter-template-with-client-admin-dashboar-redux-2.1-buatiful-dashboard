import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      {/* navbar here  */}
      <main>
        <Outlet />
      </main>
      {/* footer here  */}
    </div>
  );
}
