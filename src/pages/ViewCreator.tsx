import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  fetchCreatorById,
  deleteCreator,
  Creator,
} from '../services/creatorService';
import { FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';

const ViewCreator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCreator = async () => {
      try {
        const data = await fetchCreatorById(id!);
        setCreator(data);
      } catch (error) {
        console.error('Error fetching creator by id:', error);
        setError('Failed to fetch creator.');
      } finally {
        setLoading(false);
      }
    };

    getCreator();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator?')) {
      try {
        await deleteCreator(id!);
        alert('Creator deleted successfully.');
        navigate('/');
      } catch (error) {
        console.error('Error deleting creator:', error);
        alert('Failed to delete creator.');
      }
    }
  };

  const formatSocialLink = (url: string, platform: string) => {
    return url.startsWith('http') ? url : `https://${platform}.com/${url}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div className='max-w-4xl mx-auto my-10 p-6'>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className='w-full h-auto rounded-lg mb-6'
        />
      )}
      <div className='text-black dark:text-white'>
        <h1 className='text-4xl font-bold mb-4'>{creator.name}</h1>
        <p className='text-xl mb-6'>{creator.description}</p>

        <div className='flex flex-col space-y-3 mb-6'>
          {creator.youtube && (
            <a
              href={formatSocialLink(creator.youtube, 'youtube')}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 text-xl'
            >
              <FaYoutube
                size={30}
                className='text-red-600 hover:text-red-800 transition-colors'
              />
              <span>{creator.youtube}</span>
            </a>
          )}
          {creator.twitter && (
            <a
              href={formatSocialLink(creator.twitter, 'twitter')}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 text-xl'
            >
              <FaTwitter
                size={30}
                className='text-blue-500 hover:text-blue-700 transition-colors'
              />
              <span>{creator.twitter}</span>
            </a>
          )}
          {creator.instagram && (
            <a
              href={formatSocialLink(creator.instagram, 'instagram')}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center space-x-2 text-xl'
            >
              <FaInstagram
                size={30}
                className='text-pink-500 hover:text-pink-700 transition-colors'
              />
              <span>{creator.instagram}</span>
            </a>
          )}
        </div>

        <div className='flex justify-center space-x-4'>
          <button
            onClick={handleEdit}
            className='w-1/2 px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 hover:shadow-md hover:shadow-blue-300 transition-all duration-300 ease-in-out'
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className='w-1/2 px-8 py-3 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-400 hover:shadow-md hover:shadow-rose-300 transition-all duration-300 ease-in-out'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
