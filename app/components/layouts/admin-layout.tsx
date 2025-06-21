
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./app-sidebar";
import Header from "./header";
import { Outlet } from "react-router";

const AdminLayout = () => {

  return (
    <SidebarProvider defaultOpen={true}>
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
