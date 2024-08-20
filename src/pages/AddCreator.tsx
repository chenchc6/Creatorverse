import React, { useState } from 'react';
import { addCreator } from '../services/creatorService';

const AddCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCreator({ name, url, description, imageURL });
      alert('Creator added successfully!');
      setName('');
      setUrl('');
      setDescription('');
      setImageURL('');
    } catch (error) {
      console.error('Error adding creator:', error);
      alert('Failed to add creator.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-md mx-auto my-10 p-4 bg-white shadow-md rounded'
    >
      <h2 className='text-2xl font-bold mb-4'>Add a New Creator</h2>
      <div className='mb-4'>
        <label className='block text-gray-700'>Name</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>URL</label>
        <input
          type='url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-2'
          required
        />
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700'>Image URL (Optional)</label>
        <input
          type='url'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-2'
        />
      </div>
      <button
        type='submit'
        className='bg-indigo-500 text-white px-4 py-2 rounded'
      >
        Add Creator
      </button>
    </form>
  );
};

export default AddCreator;
