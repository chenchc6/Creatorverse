import React, { useState } from 'react';
import { addCreator } from '../services/creatorService';
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

const AddCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [youtube, setYouTube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!youtube && !twitter && !instagram) {
        alert('Please provide at least one social media link.');
        return;
      }
      await addCreator({
        name,
        imageURL,
        description,
        youtube,
        twitter,
        instagram,
      });
      alert('Creator added successfully!');
      // Reset form fields
      setName('');
      setImageURL('');
      setDescription('');
      setYouTube('');
      setTwitter('');
      setInstagram('');
    } catch (error) {
      console.error('Error adding creator:', error);
      alert('Failed to add creator.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-3xl mx-auto my-10 p-12 bg-white shadow-md rounded-md'
    >
      <div className='mb-4 text-left'>
        <label className='block text-lg font-semibold text-gray-700'>
          Name
        </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded mt-2'
          required
        />
      </div>

      <div className='mb-4 text-left'>
        <label className='block text-lg font-semibold text-gray-700'>
          Image
        </label>
        <p className='text-sm text-gray-500 mb-2'>
          Provide a link to an image of your creator. Be sure to include the
          http://
        </p>
        <input
          type='url'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='mb-4 text-left'>
        <label className='block text-lg font-semibold text-gray-700'>
          Description
        </label>
        <p className='text-sm text-gray-500 mb-2'>
          Provide a description of the creator. Who are they? What makes them
          interesting?
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md'
          required
        />
      </div>

      <h3 className='text-2xl font-semibold text-gray-900 text-left'>
        Social Media Links
      </h3>
      <p className='text-sm text-gray-500 mb-4 text-left'>
        Provide at least one of the creator's social media links.
      </p>

      <div className='mb-4 text-left'>
        <label className='block text-lg font-semibold text-gray-700 flex items-center'>
          <FaYoutube className='mr-2 text-red-600' />
          YouTube
        </label>
        <p className='text-sm text-gray-500 mb-2'>
          The creator's YouTube handle (without the @)
        </p>
        <input
          type='text'
          value={youtube}
          onChange={(e) => setYouTube(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='mb-4 text-left'>
        <label className='block text-lg font-semibold text-gray-700 flex items-center'>
          <FaTwitter className='mr-2 text-blue-500' />
          Twitter
        </label>
        <p className='text-sm text-gray-500 mb-2'>
          The creator's Twitter handle (without the @)
        </p>
        <input
          type='text'
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      <div className='mb-4 text-left'>
        <label className='block text-lg font-semibold text-gray-700 flex items-center'>
          <FaInstagram className='mr-2 text-pink-500' />
          Instagram
        </label>
        <p className='text-sm text-gray-500 mb-2'>
          The creator's Instagram handle (without the @)
        </p>
        <input
          type='text'
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          className='w-full p-2 border border-gray-300 rounded-md'
        />
      </div>

      <button
        type='submit'
        className='w-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 ease-in-out px-4 py-2 mt-4'
      >
        Submit
      </button>
    </form>
  );
};

export default AddCreator;
