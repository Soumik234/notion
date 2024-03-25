import { BlogCard } from "../component/BlogCard";
import { Appbar } from "../component/Appbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  // Do skeleton loading here
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Appbar />
      {blogs.map((blog) => (
        <BlogCard
          id={blog.id}
          author={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate="18 March 2024"
        />
      ))}
    </div>
  );
};
