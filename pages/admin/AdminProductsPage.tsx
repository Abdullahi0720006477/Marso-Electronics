import React, { useState } from 'react';
import { products as initialProducts } from '../../data/products';
import type { Product } from '../../types';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const openModal = (product: Partial<Product> | null = null) => {
    setEditingProduct(product || {});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleSave = (productData: Product) => {
    if (productData.id) {
      // Update
      setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else {
      // Create
      const newProduct = { ...productData, id: Date.now() };
      setProducts([...products, newProduct]);
    }
    closeModal();
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
        <Button onClick={() => openModal()}>Add Product</Button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button onClick={() => openModal(product)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handleDelete(product.id)} className="text-danger hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && editingProduct && (
        <ProductFormModal product={editingProduct} onSave={handleSave} onClose={closeModal} />
      )}
    </div>
  );
};

interface ProductFormModalProps {
    product: Partial<Product>;
    onSave: (product: Product) => void;
    onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Product);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={product.id ? 'Edit Product' : 'Add New Product'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField name="name" label="Product Name" value={formData.name || ''} onChange={handleChange} />
                    <InputField name="brand" label="Brand" value={formData.brand || ''} onChange={handleChange} />
                    <InputField name="category" label="Category" value={formData.category || ''} onChange={handleChange} />
                    <InputField name="price" label="Price" type="number" value={formData.price || ''} onChange={handleChange} />
                    <InputField name="stock" label="Stock" type="number" value={formData.stock || ''} onChange={handleChange} />
                    <InputField name="imageUrl" label="Image URL" value={formData.imageUrl || ''} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea name="shortDescription" id="shortDescription" value={formData.shortDescription || ''} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"></textarea>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Save Product</Button>
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

export default AdminProductsPage;
