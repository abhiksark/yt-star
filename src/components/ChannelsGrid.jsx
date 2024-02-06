// components/ChannelsGrid.jsx

import ChannelCard from './ChannelCard'; // Assumes ChannelCard is styled appropriately

const ChannelsGrid = ({ channels }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  );
};

export default ChannelsGrid;
