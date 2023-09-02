import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Clients from "./pages/clients/Clients";
import Tickets from "./pages/tickets/Tickets";
import Chat from "./pages/client-customer-chat/Chat";
import Layout from "./Layout";
import Main from "./pages/login/Login";
import MyTickets from "./pages/mytickets/MyTickets";
import ProtectedRoutes from "./ProtectedRoutes";
// import { useSelector } from "react-redux";

function App() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/" element={<ProtectedRoutes><Layout /></ProtectedRoutes>}>
        <Route index element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/mytickets" element={<MyTickets />} />
        <Route path="/customer-chat/:_id" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
