import Image from 'next/image';

const ChannelCard = ({ channel }) => {
  return (
    <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 max-w-sm mx-auto">
      {/* Container for image, ensuring it's at the top and centered */}
      <div className="flex justify-center mb-4">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-700">
          <Image
            src={channel.logoUrl || '/path/to/default/image.png'}
            alt="Channel Logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      {/* Subscriber and Video Count with icons and improved layout */}
      <div className="mt-3">
        <div className="text-center mb-2">
          {/* Replace <span> with the actual icon component, for example, <FaUsers /> */}
          <span className="mr-2">👥</span>
          <span className="text-xs font-semibold">
            {`${channel.subscriberCount.toLocaleString()} Subscribers`}
          </span>
        </div>
        {channel.videoCount && (
          <div className="text-center">
            {/* Replace <span> with the actual icon component, for example, <FaVideo /> */}
            <span className="mr-2">📹</span>
            <span className="text-xs font-semibold">
              {`${channel.videoCount} Videos`}
            </span>
          </div>
        )}
      </div>
      {/* Channel category with improved hover effect */}
      <div className="flex justify-center mb-2">
        <span className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-xs text-white py-1 px-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-l">
          {channel.category}
        </span>
      </div>

      {/* Tags section with responsive wrapping */}
      <div className="flex justify-center gap-2 flex-wrap mb-3">
        {channel.tags.map(tag => (
          <span key={tag} className="inline-block bg-gradient-to-r from-red-300 to-red-500 text-red-900 text-xs font-semibold px-2.5 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>


      {/* Channel name as the focal point */}
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">{channel.name}</h2>
      <p className="text-sm mb-3 text-center">{channel.description}</p>

      {/* Rating and review count */}
      <div className="text-center mb-4">
        <div className="flex justify-center items-center text-yellow-400 text-lg">
          {'★'.repeat(Math.floor(channel.rating))}{'☆'.repeat(5 - Math.floor(channel.rating))}
        </div>
        <span className="text-xs text-gray-400">{channel.reviewsCount} reviews</span>
      </div>


    </div>
  );
};

export default ChannelCard;
