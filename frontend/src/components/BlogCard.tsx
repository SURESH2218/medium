interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="border-slate-400 p-4 w-screen max-w-4xl">
      <div>
        <div>
          <Avatar name={authorName} /> {authorName}* {publishedDate}
        </div>
      </div>
      <div className="font-bold text-xl">{title}</div>
      <div className="font-thin text-md">{content.slice(0, 100) + "..."}</div>
      <div className="text-slate-500">
        {`${Math.ceil(content.length / 100)} min`} read
      </div>
      <div className="bg-slate-200 h-1 w-full"></div>
    </div>
  );
};

export default BlogCard;

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 p-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {"A"}
      </span>
    </div>
  );
}
