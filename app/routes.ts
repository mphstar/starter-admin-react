import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  layout("components/layout-example.tsx", [route("about", "pages/about.tsx")]),

  ...prefix("admin", [
    layout("components/layouts/admin-layout.tsx", [
      route("dashboard", "pages/admin/dashboard/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
