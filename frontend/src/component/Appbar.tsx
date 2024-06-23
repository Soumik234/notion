import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";
export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4 cursor-pointer">
      <Link to={"/blogs"} className="flex flex-col justify-center text-3xl font-extrabold">
        Articulate
      </Link>

      <div>
        <Link to={"/publish"}>
        <button
          type="button"
          className="mr-10 text-white focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 text-center me-2 mb-2  bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Publish
        </button>
        </Link>
        <Avatar size="big" name="Soumik" />
      </div>
    </div>
  );
};
