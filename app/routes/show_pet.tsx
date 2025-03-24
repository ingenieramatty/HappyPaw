import ShowPetPage from "~/presentation/pages/show_pet_page";
import type { Route } from "./+types/show_pet"; // Define los tipos específicos para ShowPet

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Show Pet - Happy Paw" },
    { name: "description", content: "View your pet's image on Happy Paw!" },
  ];
}

export default function ShowPet() {
  return <ShowPetPage />;
}