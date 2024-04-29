import { Link } from "react-router-dom";

interface BlogCardProps {
  author: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
  image?: string;
  tags: {
    name: string;
  }[];
}

export const BlogCard = ({
  id,
  // author,
  title,
  content,
  // publishedDate,
  image,
  tags,
}: BlogCardProps) => {
  // const colors ={
  //   [#6941C6,#F9F5FF],
  //   [#3538CD,#EEF4FF],
  //   [#C11574,#FDF2FA],
  //   [#027A48,#ECFDF3],
  //   [#026AA2,#F0F9FF]
  // }
  return (
    <Link to={`/blog/${id}`}>
      

<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl m-5">
        <img className="rounded-t-lg max-h-l pb-2 gap-5 w-full h-64 object-cover object-center" src={image} alt="blog" />
    <div className="p-5">
       
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{title}</h5>
        
        <p className="mb-3 font-normal text-gray-700 ">{content.slice(0, 100) + "..."}</p>
        <div className="flex items-center">
        <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
  
            {`${Math.ceil(content.length / 100)} minute(s) read`}
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </p>
        <p className="flex flex-wrap">
  {tags.map((tag, index) => (
    <button key={index} className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-2 rounded m-1">
      {tag}
    </button>
  ))}
</p>
</div>
    </div>
</div>

      {/* <div className="p-4  border-slate-200 pb-4 cursor-pointer">
        <div className="flex">
          <img
            src={image}
            alt="blog"
            className="max-h-l pb-2 mx-auto gap-5 w-auto h-64 object-cover object-center"
          />
          <Avatar name={author} />
          <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{author}</div>
          <div className="flex justify-center pl-2 flex-col">
              <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
              {publishedDate}
          </div>
        </div>
        <div className="text-2xl font-semibold mb-3.5 text-black">{title}</div>
        <div className="text-base font-regular mb-3.5 text-customColor">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="flex">
          <div className="text-green-600 text-sm font-thin pt-4 ">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
      </div> */}
    </Link>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-gray-600 dark:text-gray-300`}
      >
        {name[0]}
      </span>
    </div>
  );
}
