import React from 'react';
import { products } from '../../data/products';
import { posts } from '../../data/posts';

// Fix: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: number; icon: React.ReactElement }> = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="bg-primary/10 text-primary p-4 rounded-full mr-4">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Products" 
          value={products.length} 
          icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>}
        />
        <StatCard 
          title="Total Posts" 
          value={posts.length} 
          icon={<svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 18V7.125c0-.621.504-1.125 1.125-1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V6Z" /></svg>}
        />
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">Welcome, Admin!</h3>
            <p className="text-gray-600 text-sm">You can manage all your website content from this dashboard. Use the sidebar to navigate between products and posts.</p>
            <p className="text-xs text-gray-400 mt-4">*This is a frontend demonstration. Data changes will not persist after reloading the page.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;