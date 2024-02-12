// components/ChannelsGrid.jsx

import Link from 'next/link';
import ChannelCard from './ChannelCard'; // Assumes ChannelCard is styled appropriately


const ChannelsGrid = ({ channels }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <Link key={channel.id} href={`/profile/${channel.slug}`}>
            <a className="block">
              <ChannelCard channel={channel} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChannelsGrid;
