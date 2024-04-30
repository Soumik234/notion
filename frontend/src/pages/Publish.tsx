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
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl ">
          <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4 border border-gray-300">
            <h1 className="flex text-3xl font-extrabold mb-4 justify-center text-gray-900">Publish</h1>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 text-l font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-l font-bold mb-2">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400"
                  defaultValue={""}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block text-gray-700 text-l font-bold mb-2"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="tags" className="block text-gray-700 text-l font-bold mb-2">
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

            <div className="flex items-center justify-center">
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
                className="bg-blue-500 hover:bg-blue-700 w-52 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
