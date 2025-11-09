import React, { useState } from 'react';
import Button from '../components/Button';
import { settings } from '../data/settings';

const ContactPage: React.FC = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Thank you for your message! We will get back to you shortly.');
        const form = e.target as HTMLFormElement;
        form.reset();
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div>
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 mb-8">
          Have questions about our products, need assistance with an order, or just want to say hello?
          We'd love to hear from you. Fill out the form, and we'll get back to you as soon as possible.
        </p>
        <div className="space-y-4 text-gray-700">
            <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>{settings.location}</span>
            </div>
            <div className="flex items-center">
                <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span>{settings.contactEmail}</span>
            </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="name" id="name" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" name="email" id="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input type="text" name="subject" id="subject" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea name="message" id="message" rows={5} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"></textarea>
          </div>
          <div>
            <Button type="submit" className="w-full">Send Message</Button>
          </div>
          {status && <p className="text-center text-green-600">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;