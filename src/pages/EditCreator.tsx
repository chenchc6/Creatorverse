import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchCreatorById,
  updateCreator,
  deleteCreator,
} from '../services/creatorService';
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import Swal from 'sweetalert2';

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
        const creator = await fetchCreatorById(id!);
        if (creator) {
          setName(creator.name);
          setImageURL(creator.imageURL || '');
          setDescription(creator.description || '');
          setYouTube(creator.youtube || '');
          setTwitter(creator.twitter || '');
          setInstagram(creator.instagram || '');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Creator not found.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching creator:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch creator.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchCreator();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!youtube && !twitter && !instagram) {
        Swal.fire({
          title: 'Warning!',
          text: 'Please provide at least one social media link.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
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
      Swal.fire({
        title: 'Success!',
        text: 'Creator updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error updating creator:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update creator.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        await deleteCreator(id!);
        Swal.fire({
          title: 'Deleted!',
          text: 'Creator has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/');
        });
      }
    } catch (error) {
      console.error('Error deleting creator:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete creator.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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

      <div className='flex justify-between mt-4'>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-300 transition-all duration-300 ease-in-out mr-2'
        >
          Submit
        </button>
        <button
          type='button'
          onClick={handleDelete}
          className='w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-400 hover:shadow-lg hover:shadow-rose-300 transition-all duration-300 ease-in-out ml-2'
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default EditCreator;
