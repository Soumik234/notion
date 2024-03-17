interface BlogCardProps {
  author: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  author,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div>
      <div className="font-extralight pl-2">
        {author} 
      </div>
      <div className="pl-2 font-thin">{publishedDate}</div>
      <div>{title}</div>
      <div>{content.slice(0, 100) + "..."}</div>
    </div>
  );
};
