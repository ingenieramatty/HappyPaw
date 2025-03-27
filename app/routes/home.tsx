import type { Route } from "./+types/home";
import IndexPage from "~/presentation/pages/index_page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Happy Paw" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return  <IndexPage/>;
}
