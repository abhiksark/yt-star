// components/ChannelsGrid.jsx

import ChannelCard from './ChannelCard'; // Assumes ChannelCard is styled appropriately

const ChannelsGrid = ({ channels }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {channels.map((channel) => (
          // Add 'flex' and 'flex-col' to make the items flex containers, ensuring uniformity
          // 'h-full' ensures each item stretches to the full height of its flex container
          <div key={channel.id} className="flex flex-col h-full">
            <ChannelCard channel={channel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelsGrid;
