import React, { useEffect, useState } from 'react';
import CreatorCard from '../components/CreatorCard';
import { fetchCreators, Creator } from '../services/creatorService';

const ShowCreators: React.FC = () => {
  // State to hold fetched creators data
  const [creators, setCreators] = useState<Creator[]>([]);
  // State to manage loading indicator
  const [loading, setLoading] = useState<boolean>(true);
  // State to manage error messages
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch creators data from the service
    const getCreators = async () => {
      try {
        const data = await fetchCreators();
        setCreators(
          data.filter((creator) => creator.id !== undefined) // Ensure only creators with ids are included
        );
      } catch (error) {
        console.error('Error fetching creators:', error);
        setError('Failed to fetch creators.');
      } finally {
        setLoading(false);
      }
    };

    getCreators();
  }, []);

  // Display loading, error, or creators data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='flex justify-center mx-auto p-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-screen-xl'>
        {creators.length ? (
          creators.map((creator) => (
            <CreatorCard key={creator.id} {...creator} />
          ))
        ) : (
          <p>No content creators found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowCreators;
