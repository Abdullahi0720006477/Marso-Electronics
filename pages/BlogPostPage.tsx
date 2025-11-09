import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';
import NotFoundPage from './NotFoundPage';
import ReactMarkdown from 'react-markdown';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[400px] object-cover rounded-lg mb-8" />
      <nav className="text-sm mb-4" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/blog" className="text-gray-500 hover:text-primary">Blog</Link>
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
          </li>
          <li className="text-gray-700 font-medium">{post.title}</li>
        </ol>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date} by {post.author}</p>
      
      <div className="prose lg:prose-xl max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogPostPage;
