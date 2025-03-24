import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
  route(":imageName", "routes/show_pet.tsx"),
] satisfies RouteConfig;
