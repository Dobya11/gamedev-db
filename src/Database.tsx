import { StrictMode } from "react";
import Catalog from "./components/layout/Catalog/Catalog";

import Boom1 from "./assets/boom1.svg";
import Boom2 from "./assets/boom2.svg";
function Database() {
  return (
    <StrictMode>
      <Catalog />
      <img
        src={Boom1}
        alt="Boom"
        className="w-96 absolute top-128 -right-16 -z-1 parallax will-change-transform pointer-events-none"
        data-speed="0.25"
      />
      <img
        src={Boom2}
        alt="Boom"
        className="w-96 absolute top-64 -left-16 -z-1 parallax will-change-transform pointer-events-none"
        data-speed="0.25"
      />
    </StrictMode>
  );
}
export default Database;
