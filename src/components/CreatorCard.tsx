import React from 'react';
import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaEdit,
  FaInfoCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface CreatorCardProps {
  id: string;
  name: string;
  description: string;
  imageURL?: string;
  youtube?: string;
  twitter?: string;
  instagram?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  id,
  name,
  description,
  imageURL,
  youtube,
  twitter,
  instagram,
}) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/creator/${id}`);
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div
      className='w-full max-w-2xl rounded-lg overflow-hidden shadow-lg text-white relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-opacity-80'
      style={{
        backgroundImage: `url(${imageURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
      }}
    >
      <div className='absolute inset-0 bg-black bg-opacity-60 transition-colors duration-300 ease-in-out hover:bg-opacity-50'></div>
      <div className='absolute inset-0 p-6 flex flex-col'>
        <div className='flex justify-between items-center mt-20 mb-4'>
          <h2 className='font-bold text-2xl'>{name}</h2>
          <div className='flex space-x-3'>
            <button
              onClick={handleView}
              title='View Details'
              className='icon-button text-gray-300 hover:text-white transition-colors'
            >
              <FaInfoCircle size={24} />
            </button>
            <button
              onClick={handleEdit}
              title='Edit'
              className='icon-button text-gray-300 hover:text-white transition-colors'
            >
              <FaEdit size={24} />
            </button>
          </div>
        </div>
        <div className='flex space-x-4 mb-4'>
          {youtube && (
            <a
              href={`https://www.youtube.com/${youtube}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-red-500 hover:text-red-700 transition-colors'
              title='YouTube'
            >
              <FaYoutube size={30} />
            </a>
          )}
          {twitter && (
            <a
              href={`https://www.twitter.com/${twitter}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 hover:text-blue-700 transition-colors'
              title='Twitter'
            >
              <FaTwitter size={30} />
            </a>
          )}
          {instagram && (
            <a
              href={`https://www.instagram.com/${instagram}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-pink-500 hover:text-pink-700 transition-colors'
              title='Instagram'
            >
              <FaInstagram size={30} />
            </a>
          )}
        </div>
        <div className='overflow-y-auto flex-grow'>
          <p className='text-gray-200 text-base'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
