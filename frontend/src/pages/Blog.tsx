import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { SingleBlog } from "../component/SingleBlog";
import { Appbar } from "../component/Appbar";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading  || !blog) {
    <Appbar/>
    return <div>Loading...</div>;
  }

  return <div>
    <SingleBlog blog={blog}/>
  </div>;
};
