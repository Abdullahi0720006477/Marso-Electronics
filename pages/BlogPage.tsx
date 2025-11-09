import React from 'react';
import { posts } from '../data/posts';
import PostCard from '../components/PostCard';

const BlogPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">From Our Blog</h1>
        <p className="text-lg text-gray-600 mt-2">News, guides, and updates from the Marso Electronic team.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
