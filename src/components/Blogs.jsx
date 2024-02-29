import React from 'react';
import BlogCard from './BlogCard';
import useFirestore from '../hooks/useFirestore';

const Blogs = () => {
  const { docs: blogs, isLoading } = useFirestore();

  if (isLoading) {
    return (
      <h1 className="text-2xl text-indigo-500 text-center font-black font-serif">
        Loading...
      </h1>
    );
  }

  return (
    <div className="flex flex-wrap gap-10 lg:justify-start justify-center">
      {blogs && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Blogs;
