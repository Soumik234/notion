import { Appbar } from "../component/Appbar";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();
  return (
    <>
      <Appbar />
      <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h1 className="text-3xl font-bold mb-4">Publish</h1>
    <div className="mb-4">
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
      <input
            type="text"
            id="title"
            name="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400"
            onChange={(e) => setTitle(e.target.value)}
          />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Description
      </label>
      <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400"                  defaultValue={''}
                  onChange={(e) => setContent(e.target.value)}
               />
      </div>
    </div>
    <div className="mb-6">
    <label htmlFor="content" className="mb-2">
            Content
          </label>
     <div className="mt-2">     
          <textarea
            id="content"
            name="content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400" 
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
    </div>      


    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>

</div>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* <h1 className="text-3xl font-bold mb-4">Publish</h1>
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border-2 border-gray-300 p-2 rounded-md mb-4"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div> */}
              {/* </div> */}
        <div className="col-span-full">
          <label htmlFor="content" className="mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2">
            Image
          </label>
          <input
            placeholder="Enter the image URL here"
            type="text"
            id="image"
            name="image"
            className="border-2 border-gray-300 p-2 rounded-md mb-4"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="tags" className="mb-2">
            Tags
          </label>
          <div className="border-2 border-gray-300 p-2 rounded-md mb-4 flex flex-wrap">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-blue-200 text-blue-700 rounded px-1 m-1 flex items-center"
              >
                <span>{tag}</span>
                <button
                  onClick={() => {
                    const newTags = [...tags];
                    newTags.splice(index, 1);
                    setTags(newTags);
                  }}
                  className="ml-2  hover:bg-blue-500 font-bold py-1 px-2 rounded"
                >
                  x
                </button>
              </div>
            ))}
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Press Enter after putting tags"
              className="flex-grow"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.currentTarget.value) {
                  setTags([...tags, e.currentTarget.value]);
                  e.currentTarget.value = "";
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <button
          onClick={async () => {
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog`,
              {
                title,
                content,
                image,
                tags,
              },
              {
                headers: {
                  Authorization: `${localStorage.getItem("token")}`,
                },
              }
            );
            navigate(`/blog/${response.data.id}`);
          }}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-10 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Publish
        </button>
      </div>
    </>
  );
};
