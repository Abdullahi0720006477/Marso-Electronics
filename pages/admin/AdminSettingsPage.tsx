import React, { useState } from 'react';
import { settings as initialSettings } from '../../data/settings';
import type { SiteSettings } from '../../data/settings';
import Button from '../../components/Button';

const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Settings saved successfully!');
    setTimeout(() => setStatus(''), 3000);
    // In a real app, you would make an API call here.
    console.log('Saving settings:', settings);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Settings</h1>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
            <input
              type="text"
              name="siteName"
              id="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
            <input
              type="text"
              name="tagline"
              id="tagline"
              value={settings.tagline}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              id="contactEmail"
              value={settings.contactEmail}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={settings.location}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
           <div>
            <label htmlFor="paymentNumber" className="block text-sm font-medium text-gray-700">Payment Number (M-Pesa)</label>
            <input
              type="text"
              name="paymentNumber"
              id="paymentNumber"
              value={settings.paymentNumber}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="maintenanceMode"
                name="maintenanceMode"
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={handleChange}
                className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="maintenanceMode" className="font-medium text-gray-700">Maintenance Mode</label>
              <p className="text-gray-500">When enabled, visitors will see a maintenance page.</p>
            </div>
          </div>
          <div className="flex justify-end items-center">
             {status && <p className="text-green-600 mr-4">{status}</p>}
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage;