import Image from 'next/image';

// Main ChannelCard component
const ChannelCard = ({ channel }) => {
  return (
    <div className="bg-gray-800 text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 max-w-sm mx-auto flex flex-col h-full justify-between">
      <div>
        <ChannelLogo logoUrl={channel.logoUrl} />
        <ChannelName name={channel.name} />
        <ChannelCategory category={channel.category} />
        <ChannelTags tags={channel.tags} />
      </div>
      <div>
        <ChannelStats subscriberCount={channel.subscriberCount} videoCount={channel.videoCount} />
        {/* <ChannelDescription description={channel.description} /> */}
        <ChannelRating rating={channel.Complexity} reviewsCount={channel.reviewsCount} />
      </div>
    </div>
  );
};

// Component for Channel Logo
const ChannelLogo = ({ logoUrl }) => (
  <div className="flex justify-center mb-4">
    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gray-700">
      <Image
        src={logoUrl || '/path/to/default/image.png'}
        alt="Channel Logo"
        layout="fill"
        objectFit="cover"
      />
    </div>
  </div>
);

// Component for Channel Name
const ChannelName = ({ name }) => (
  <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">{name}</h2>
);

// Component for Channel Stats (Subscribers and Videos)
const ChannelStats = ({ subscriberCount, videoCount }) => (
  <div className="mt-3">
    <SubscriberCount subscriberCount={subscriberCount} />
    <VideoCount videoCount={videoCount} />
  </div>
);

// Sub-components for Channel Stats
const SubscriberCount = ({ subscriberCount }) => (
  <div className="text-center mb-2">
    <span className="mr-2">👥</span>
    <span className="text-xs font-semibold">
      {`${subscriberCount.toLocaleString()} Subscribers`}
    </span>
  </div>
);

const VideoCount = ({ videoCount }) => (
  videoCount && (
    <div className="text-center">
      <span className="mr-2">📹</span>
      <span className="text-xs font-semibold">
        {`${videoCount} Videos`}
      </span>
    </div>
  )
);

// Component for Channel Category
const ChannelCategory = ({ category }) => (
  <div className="flex justify-center mb-2">
    <span className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-xs text-white py-1 px-3 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer hover:bg-gradient-to-l">
      {category}
    </span>
  </div>
);

// Component for Channel Tags
const ChannelTags = ({ tags }) => (
  <div className="flex justify-center gap-2 flex-wrap mb-3">
    {tags.map(tag => (
      <span key={tag} className="inline-block bg-gradient-to-r from-red-300 to-red-500 text-red-900 text-xs font-semibold px-2.5 py-0.5 rounded">
        {tag}
      </span>
    ))}
  </div>
);

// Component for Channel Description
const ChannelDescription = ({ description }) => (
  <p className="text-sm mb-3 text-center">{description}</p>
);

// Component for Channel Rating and Reviews Count
const ChannelRating = ({ rating, reviewsCount }) => (
  <div className="text-center mb-4">
    <div className="flex justify-center items-center text-yellow-400 text-lg">
      {'📚'.repeat(Math.floor(rating))}
    </div>
    {/* <span className="text-xs text-gray-400">{reviewsCount} reviews</span> */}
  </div>
);

export default ChannelCard;
