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
        setCreators(data); // Set creators state with fetched data
      } catch (error) {
        console.error('Error fetching creators:', error); // Log the error to the console
        setError('Failed to fetch creators.'); // Set error state
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    getCreators();
  }, []); // Run once when the component mounts

  // Display loading, error, or creators data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {creators.length ? (
        creators.map((creator) => <CreatorCard key={creator.id} {...creator} />)
      ) : (
        <p>No content creators found.</p> // Message when no creators exist
      )}
    </div>
  );
};

export default ShowCreators;
