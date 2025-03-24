import useQueryParams from "~/hooks/useQueryParams";
import HomePage from "~/presentation/pages/home_page";
import ShowPetPage from "~/presentation/pages/show_pet_page";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Happy Paw" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { getParam } = useQueryParams();
  const key = getParam("key");

  return  key ?<HomePage />:<ShowPetPage/>;
}
