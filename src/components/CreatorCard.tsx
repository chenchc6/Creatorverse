// This component will display the name, URL, description, and imageURL of a content creator.
import React from 'react';

interface CreatorCardProps {
  name: string;
  url: string;
  description: string;
  imageURL?: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  name,
  url,
  description,
  imageURL,
}) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      {imageURL && <img className='w-full' src={imageURL} alt={name} />}
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{name}</div>
        <p className='text-gray-700 text-base'>{description}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-indigo-500 hover:text-indigo-700'
        >
          Visit Page
        </a>
      </div>
    </div>
  );
};

export default CreatorCard;
