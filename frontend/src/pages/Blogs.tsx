import { BlogCard } from "../component/BlogCard";
import { Appbar } from "../component/Appbar";
import { useBlogs } from "../hooks";
import { Footer } from "../component/Footer";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  // Do skeleton loading here
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="grid xl:grid-cols-3  lg:grid-cols-2 mx-auto container h-full pl-10 pr-10">
      {blogs.map((blog) => (
        <BlogCard
       
          id={blog.id}
          author={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate="18 March 2024"
          image={blog?.PostPhoto?.[0]?.imageUrl || "https://source.unsplash.com/random/150x150"}
          tags={blog.tags ? blog.tags.map(tag => tag.name) : []}
        />
      ))}
      
      </div>
      <Footer/>
    </div>
  );
};
