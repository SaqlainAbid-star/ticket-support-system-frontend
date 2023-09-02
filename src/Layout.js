import { Outlet } from "react-router-dom";
import MenuBar from "./components/navbar/MenuBar";

export default function Layout() {
  return (
    <div>
      <MenuBar />
      <Outlet />
    </div>
  );
}
