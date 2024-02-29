import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const BlogCard = ({ blog }) => {
  return (
    <Link to={`/blog/${blog.id}`}>
      <div className="w-72 flex flex-col rounded-lg bg-slate-50 cursor-pointer overflow-hidden space-y-3">
        <img
          src={blog.imageUrl}
          alt="card-img"
          className="object-cover bg-no-repeat bg-cover w-full h-52 rounded-b-lg"
        />
        <h3 className="text-left text-2xl font-semibold text-slate-900 text-wrap leading-6">
          {blog.title}
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: blog.description.substring(0, 50),
          }}
        />
        <div className="w-full block text-left">
          <span className="text-slate-900 font-semibold leading-3 font-serif">
            {blog.user} .{' '}
            {moment(blog?.createdAt?.toDate()).format('MMM Do YY')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
