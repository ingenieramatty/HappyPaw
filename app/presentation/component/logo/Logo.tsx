import React from "react";

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="Logo de la aplicación"
      className="h-auto mx-auto w-24"
      onError={(e) => {
        e.currentTarget.src = "/fallback-image.jpg";
      }}
    />
  );
}

export default Logo;
