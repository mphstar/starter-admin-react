import type { IconBaseProps } from "react-icons/lib";
import { TbArticle, TbCategory, TbCreditCard, TbHome, TbLogin, TbRuler, TbTag, TbUser } from "react-icons/tb";


export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: React.ComponentType<IconBaseProps>;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: TbHome,
    isActive: false,
    items: [], 
  },
  {
    title: "Roles & Permissions",
    url: "/admin/roles",
    icon: TbRuler,
    isActive: false,
    items: [], 
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: TbUser,
    isActive: false,
    items: [], 
  },
  // {
  //   title: "Category",
  //   url: "/admin/category",
  //   icon: TbCategory,
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: "Tags",
  //   url: "/admin/tag",
  //   icon: TbTag,
  //   isActive: false,
  //   items: [], // No child items
  // },
  // {
  //   title: "Article",
  //   url: "/admin/article",
  //   icon: TbArticle,
  //   isActive: false,
  //   items: [], // No child items
  // },
  {
    title: "Account",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: TbCreditCard,
    isActive: true,

    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: TbUser,
      },
      {
        title: "Login",
        url: "/",
        icon: TbLogin,
      },
    ],
  },
];
