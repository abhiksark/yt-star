// components/Creator.jsx
import Image from 'next/image';

const CreatorStats = ({ creator }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <CreatorProfile creator={creator} />
            <CreatorStatistics statistics={creator} />
            <CreatorActions />
        </div>
    );
};

const CreatorProfile = ({ creator }) => {
    return (
        <div className="flex items-center space-x-4">
            <Image
                className='w-16 h-16 rounded-full'
                src={creator.profilePicture || '/path/to/default/image.png'}
                alt="Channel Logo"
                width={64} // fixed width
                height={64} // fixed height
                objectFit="cover"
            />
            <div className="text-lg text-white">
                <h3 className="font-bold">{creator.name} (@{creator.username})</h3>
                <p className="text-gray-400">{creator.description}</p>
            </div>
        </div>
    );
};

const CreatorStatistics = ({ statistics }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center my-4">
            <StatisticItem label="Subscribers" value={statistics.subscribers} />
            <StatisticItem label="Views 30d" value={statistics.views} />
            <StatisticItem label="ER" value={statistics.engagementRate} />
            <StatisticItem label="Most Recent Video" value={statistics.mostRecentVideo} />
        </div>
    );
};

const StatisticItem = ({ label, value }) => (
    <div className="text-white">
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-gray-400 text-sm">{label}</p>
    </div>
);

const CreatorActions = () => {
    return (
        <div className="flex justify-center space-x-4 my-4">
            <ActionButton color="bg-red-600 hover:bg-red-700" text="Send Email" />
            <ActionButton color="bg-blue-600 hover:bg-blue-700" text="PDF" />
            <ActionButton color="bg-green-600 hover:bg-green-700" text="Add to Media Plan" />
            <ActionButton color="bg-yellow-600 hover:bg-yellow-700" text="Add to Campaign" />
        </div>
    );
};

const ActionButton = ({ color, text }) => (
    <button className={`${color} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}>
        {text}
    </button>
);

export default CreatorStats;
