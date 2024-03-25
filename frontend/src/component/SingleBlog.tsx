import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const SingleBlog = ({ blog }: { blog: Blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Appbar />
      <div className="">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl">
          <div className="col-span-8">
            <div className="p-10">
              <div className="text-3xl font-bold">{blog.title}</div>
              <div className="text-sm font-normal text-slate-500 pt-1">
                {" "}
                Posted on March 2024
              </div>
              <div className="pt-4">{blog.content}</div>
            </div>
          </div>
          <div className="col-span-4 p-10">
            <div className="text-slate-600">
              Author
            </div>
            <div className="flex">
              <div className="pr-2 flex flex-col justify-center">
                <Avatar name={blog?.author?.name || "Anonymous"} size="big" />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog?.author?.name || "Anonymous"}
                </div>

                <div className="pt-2 text-slate-500">Catch phrase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
