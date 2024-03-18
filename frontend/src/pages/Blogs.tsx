import { BlogCard } from "../component/BlogCard";
import { Appbar } from "../component/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const {loading,blogs}=useBlogs();


  // Do skeleton loading here
  if(loading){
    return <div>Loading...</div>
  }
  return (
    <div>
      <Appbar />
      <BlogCard
        author="Soumik"
        title="I don't know what to write I am just yapping with It"
        content="Same shit I am yapping again then coping my title I don't know what to write"
        publishedDate="18 March 2024"
      />
    </div>
  );
};
