import React from 'react';

const Banner: React.FC = () => {
  const backgroundImage =
    'https://static.vecteezy.com/system/resources/previews/024/388/059/large_2x/space-wallpaper-banner-background-stunning-view-of-a-cosmic-galaxy-with-planets-and-space-objects-elements-of-this-image-furnished-by-nasa-generate-ai-free-photo.jpg';

  return (
    <div
      className='w-screen h-[40vh] bg-cover bg-center flex flex-col items-center justify-center'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className='text-white text-6xl font-bold text-center'>
        CREATORVERSE
      </h1>
      <div className='flex space-x-4 mt-4'>
        <button
          onClick={() => (window.location.href = '/')}
          className='bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600'
        >
          VIEW ALL CREATORS
        </button>
        <button
          onClick={() => (window.location.href = '/add')}
          className='bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600'
        >
          ADD A CREATOR
        </button>
      </div>
    </div>
  );
};

export default Banner;
