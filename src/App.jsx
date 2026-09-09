import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import RouteProtegee from "./components/RouteProtegee.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProjectEdit from "./pages/AdminProjectEdit.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projets/:id" element={<ProjectDetail />} />
          <Route path="/admin/connexion" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RouteProtegee>
                <AdminDashboard />
              </RouteProtegee>
            }
          />
          <Route
            path="/admin/projets/:id"
            element={
              <RouteProtegee>
                <AdminProjectEdit />
              </RouteProtegee>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
