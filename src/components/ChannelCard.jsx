import Image from 'next/image';

const ChannelCard = ({ channel }) => {
  return (
    <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Image component for optimized image loading */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={channel.logoUrl || '/path/to/default/image.png'} // Provide a default image path
            alt="Channel Logo"
            layout="fill" // This makes the image fully cover the container
            objectFit="cover" // Keeps the aspect ratio, and covers the area
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-3 text-center">{channel.name}</h2>
      <p className="text-sm mb-3">{channel.description}</p>
      <div className="flex justify-center mb-3">
        <span className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-xs text-white py-1 px-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-r hover:from-red-700 hover:to-red-900">
          {channel.category}
        </span>
      </div>
      <div className="flex justify-center gap-2 flex-wrap mb-3">
        {channel.tags.map(tag => (
          <span key={tag} className="inline-block bg-gradient-to-r from-red-300 to-red-500 text-red-900 text-xs font-semibold px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-center">
        <div className="flex justify-center items-center text-yellow-400 text-lg mb-2">
          {'★'.repeat(Math.floor(channel.rating))}{'☆'.repeat(5 - Math.floor(channel.rating))}
        </div>
        <span className="text-xs text-gray-400">{channel.reviewsCount} reviews</span>
      </div>
      <div className="mt-4 flex justify-center">
        <span className="text-xs font-semibold py-1 px-4 bg-gray-700 rounded-full">{channel.subscriberCount.toLocaleString()} Subscribers</span>
      </div>
    </div>
  );
};

export default ChannelCard;
