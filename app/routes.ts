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

  route("login", "pages/auth/login.tsx"),

  ...prefix("admin", [
    layout("components/layouts/admin-layout.tsx", [
      route("dashboard", "pages/admin/dashboard/index.tsx"),
      route("roles", "pages/admin/roles/index.tsx"),

      route("tahun-akademik", "pages/admin/master/tahun-akademik/index.tsx"),
      route("kelas", "pages/admin/master/kelas/index.tsx"),
      route("semester", "pages/admin/master/semester/index.tsx"),
      route("mata-pelajaran", "pages/admin/master/mata-pelajaran/index.tsx"),
      route("student", "pages/admin/master/student/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
