import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <Link to={`/blog/${post.slug}`} className="block">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-gray-500 mb-2">{post.date} &bull; {post.author}</p>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{post.excerpt}</p>
        <div className="mt-auto">
          <Link to={`/blog/${post.slug}`} className="font-semibold text-primary hover:underline">
            Read More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
