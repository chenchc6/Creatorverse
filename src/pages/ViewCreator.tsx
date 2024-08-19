import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCreatorById, Creator } from '../services/creatorService';

const ViewCreator: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div className='max-w-md mx-auto my-10'>
      <h1 className='text-3xl font-bold mb-4'>{creator.name}</h1>
      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className='w-full mb-4'
        />
      )}
      <p className='text-gray-700'>{creator.description}</p>
      <a
        href={creator.url}
        target='_blank'
        rel='noopener noreferrer'
        className='text-indigo-500 hover:text-indigo-700'
      >
        Visit Page
      </a>
    </div>
  );
};

export default ViewCreator;
