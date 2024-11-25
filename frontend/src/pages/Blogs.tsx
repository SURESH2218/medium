import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center p-4">
        <div className="">
          {blogs.map(({ title, id, content, author: { name } }) => (
            <BlogCard
              key={id}
              authorName={name}
              title={title}
              content={content}
              publishedDate="nov 22 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
