import React, { useState } from 'react';
import { posts as initialPosts } from '../../data/posts';
import type { Post } from '../../types';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const AdminPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);

  const openModal = (post: Partial<Post> | null = null) => {
    setEditingPost(post || {});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const handleSave = (postData: Post) => {
    if (postData.id) {
      setPosts(posts.map(p => p.id === postData.id ? postData : p));
    } else {
      const newPost = { 
        ...postData,
        id: Date.now(),
        slug: postData.title.toLowerCase().replace(/\s+/g, '-').slice(0, 50),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      setPosts([...posts, newPost]);
    }
    closeModal();
  };

  const handleDelete = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Posts</h1>
        <Button onClick={() => openModal()}>Add Post</Button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map(post => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => openModal(post)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDelete(post.id)} className="text-danger hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingPost && (
        <PostFormModal post={editingPost} onSave={handleSave} onClose={closeModal} />
      )}
    </div>
  );
};

interface PostFormModalProps {
    post: Partial<Post>;
    onSave: (post: Post) => void;
    onClose: () => void;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ post, onSave, onClose }) => {
    const [formData, setFormData] = useState(post);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Post);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={post.id ? 'Edit Post' : 'Add New Post'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField name="title" label="Post Title" value={formData.title || ''} onChange={handleChange} />
                <InputField name="author" label="Author" value={formData.author || ''} onChange={handleChange} />
                <InputField name="imageUrl" label="Image URL" value={formData.imageUrl || ''} onChange={handleChange} />
                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea name="excerpt" id="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows={3} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"></textarea>
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
                    <textarea name="content" id="content" value={formData.content || ''} onChange={handleChange} rows={10} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary font-mono text-sm"></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save Post</Button>
                </div>
            </form>
        </Modal>
    );
};

const InputField = ({ name, label, value, onChange, type = 'text' } : {name:string, label:string, value:string|number, onChange: any, type?:string}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type={type} name={name} id={name} value={value} onChange={onChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
    </div>
);

export default AdminPostsPage;
