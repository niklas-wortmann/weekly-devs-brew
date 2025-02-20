import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement your newsletter signup logic here
    // This is a mock implementation
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 px-4 py-3 rounded-lg border border-secondary focus:outline-none focus:border-primary-accent dark:bg-white/90 dark:text-primary"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-primary-accent hover:bg-secondary-dark text-white font-bebas text-xl px-8 py-3 rounded-lg transition-colors duration-200"
        >
          {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
        </button>
      </div>
      
      {status === 'success' && (
        <p className="text-green-600 dark:text-green-400 mt-4 text-center">Thanks for subscribing! Check your email to confirm.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 dark:text-red-400 mt-4 text-center">Oops! Something went wrong. Please try again.</p>
      )}
    </form>
  );
};

export default NewsletterForm;