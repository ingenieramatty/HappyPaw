import React from "react";

function Logo({ path }: { path?: string }) {
  return (
    <img
      src={path ? path : ""}
      alt="Logo de la aplicación"
      className="w-full h-24 mx-auto object-cover pb-5"
      onError={(e) => {
        e.currentTarget.src = "/fallback-image.jpg";
      }}
    />
  );
}

export default Logo;
