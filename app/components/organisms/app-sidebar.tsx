import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar";

import { useMediaQuery } from "~/hooks/use-media-query";
import { navItems } from "~/constant/sidebar";
import { OrgSwitcher } from "../molecules/org-switcher";
import {
  TbChevronRight,
  TbCommand,
  TbDoorExit,
  TbPhotoUp,
} from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useEffect, useTransition } from "react";
import MyAccessToken from "~/utils/access-token";
import { toast } from "sonner";
import { useDialogStore } from "~/stores/useDialogStore";
export const company = {
  name: "Acme Inc",
  logo: TbPhotoUp,
  plan: "Enterprise",
};

const tenants = [
  { id: "1", name: "Acme Inc" },
  { id: "2", name: "Beta Corp" },
  { id: "3", name: "Gamma Ltd" },
];

export default function AppSidebar() {
  const { pathname } = useLocation();
  const router = useNavigate();

  const [loading, startTransition] = useTransition();

  const { isOpen } = useMediaQuery();

  const handleSwitchTenant = (_tenantId: string) => {
    // Tenant switching functionality would be implemented here
  };

  const activeTenant = tenants[0];

  const handleLogout = () => {
    toast.loading("Logging out...");
    startTransition(async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${MyAccessToken.get()}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        toast.error(`Logout failed: ${error.message}`);
        return;
      }

      // Successfully logged out
      toast.success("You have been logged out successfully.");
      toast.dismiss();

      // Clear authentication tokens or session data
      MyAccessToken.remove();

      // Redirect to login page
      router("/login");
    });
  };

  const dialog = useDialogStore();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <OrgSwitcher
          tenants={tenants}
          defaultTenant={activeTenant}
          onTenantSwitch={handleSwitchTenant}
        />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon ? item.icon : TbCommand;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={pathname === item.url}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <TbChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={pathname === subItem.url}
                            >
                              <Link
                                onClick={() => dialog.reset()}
                                to={subItem.url}
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                  >
                    <Link onClick={() => dialog.reset()} to={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout" isActive={false}>
              <div
                onClick={() => {
                  // Handle logout logic here
                  handleLogout();
                }}
              >
                <TbDoorExit />
                <span>Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
