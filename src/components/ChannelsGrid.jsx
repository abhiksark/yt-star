import Link from 'next/link';
import ChannelCard from './ChannelCard'; // Ensuring ChannelCard adheres to our design principles

const ChannelsGrid = ({ channels }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Explore Channels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {channels.map((channel) => (
          <Link key={channel.id} href={`/profile/${channel.slug}`} passHref>
            <a className="block hover:scale-105 transition-transform duration-300 ease-in-out">
              <ChannelCard channel={channel} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelsGrid;
