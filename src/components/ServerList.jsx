// components/ServerList.js
import ServerCard from './ChannelCard';

const servers = [{ /* server data */ }, /* ... more servers */];

const ServerList = () => {
  return (
    <div className="flex flex-wrap justify-start items-start p-4">
      {servers.map((server) => (
        <ServerCard key={server.id} server={server} />
      ))}
    </div>
  );
};

export default ServerList;
