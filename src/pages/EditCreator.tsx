import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchCreatorById,
  updateCreator,
  deleteCreator,
} from '../services/creatorService';
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

const EditCreator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [youtube, setYouTube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const creator = await fetchCreatorById(id!); // Use the correct method from the service
        if (creator) {
          setName(creator.name);
          setImageURL(creator.imageURL || '');
          setDescription(creator.description || '');
          setYouTube(creator.youtube || '');
          setTwitter(creator.twitter || '');
          setInstagram(creator.instagram || '');
        } else {
          alert('Creator not found.');
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching creator:', error);
        alert('Failed to fetch creator.');
      }
    };

    fetchCreator();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!youtube && !twitter && !instagram) {
        alert('Please provide at least one social media link.');
        return;
      }
      await updateCreator(id!, {
        name,
        imageURL,
        description,
        youtube,
        twitter,
        instagram,
      });
      alert('Creator updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating creator:', error);
      alert('Failed to update creator.');
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this creator?')) {
        await deleteCreator(id!);
        alert('Creator deleted successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error deleting creator:', error);
      alert('Failed to delete creator.');
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
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

      <h3 className='text-2xl font-semibold text-sky-700 text-left'>
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

      <div className='flex justify-between mt-4'>
        <button
          type='submit'
          className='w-full bg-sky-600 text-white px-4 py-2 rounded-md mr-2'
        >
          Submit
        </button>
        <button
          type='button'
          onClick={handleDelete}
          className='w-full bg-red-600 text-white px-4 py-2 rounded-md ml-2'
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default EditCreator;
