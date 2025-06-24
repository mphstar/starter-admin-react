import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import MyAccessToken from "~/utils/access-token";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../organisms/app-sidebar";
import Header from "../organisms/header";
import { Outlet } from "react-router";
import CustomConfirmDialog from "../molecules/custom-confirm-dialog";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    const token = MyAccessToken.get();
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setChecking(false);
    }
  }, [navigate]);
  if (checking) return null;

  return (
    <SidebarProvider defaultOpen={true}>
      <CustomConfirmDialog />
      <AppSidebar />
      <SidebarInset className="overflow-x-hidden">
        <Header />
        {/* page main content */}
        <Outlet />
        {/* page main content ends */}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
