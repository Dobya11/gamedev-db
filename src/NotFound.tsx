import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="pt-12 px-4 text-center w-full h-full flex-1 flex-col flex align-middle justify-center items-center">
      <img
        src="/src/assets/404.svg"
        alt="nothing found"
        className="w-96 pb-8"
      />
      <p className="mt-2 text-lg">Looks like nothing here...</p>
      <Link to="/" className="inline-block mt-4 text-indigo-500">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
