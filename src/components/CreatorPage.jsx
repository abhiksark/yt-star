import Head from 'next/head';
import Image from 'next/image';

const ProfileHeader = ({ creator, countryFlagUrl, profilePictureUrl }) => (
    <div className="space-y-4 flex flex-col items-center text-center md:text-left">
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-600">
            <Image src={profilePictureUrl} alt={`${creator.name} Profile Picture`} layout="fill" objectFit="cover" />
        </div>
        <div className="flex items-center justify-center md:justify-start space-x-2">
            <div className="w-8 h-5">
                <Image src={countryFlagUrl} alt={`${creator.country} Flag`} layout="responsive" width={24} height={15} />
            </div>
            <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">{creator.language}</span>
        </div>
        {/* <h2 className="text-3xl md:text-4xl font-bold">{creator.name}</h2> */}
    </div>
);

const SocialIcons = ({ socials }) => (
    <div className="flex justify-center md:justify-start items-center space-x-4">
        {socials.map(({ platform, url }) => (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-xl hover:text-yellow-400 transition duration-200">
                <i className={`fab fa-${platform.toLowerCase()} hover:scale-110 transition-transform`}></i>
            </a>
        ))}
    </div>
);

const Tags = ({ tags }) => (
    <div className="flex flex-wrap justify-center md:justify-start gap-2">
        {tags.map(tag => (
            <span key={tag} className="bg-gradient-to-r from-purple-500 to-purple-800 text-xs md:text-sm py-1 px-3 rounded-full shadow-md">
                {tag}
            </span>
        ))}
    </div>
);

const CreatorStats = ({ subscribers, views }) => (
    <div className="flex justify-center md:justify-start items-center space-x-4 mt-4">
        <div className="flex items-center space-x-1">
            <i className="fas fa-users text-lg"></i> <span className="text-md font-medium">{subscribers} Subscribers</span>
        </div>
        <div className="flex items-center space-x-1">
            <i className="fas fa-eye text-lg"></i> <span className="text-md font-medium">{views} Views</span>
        </div>
    </div>
);


const CreatorProfile = ({ creator }) => {
    const countryFlagUrl = `https://flagcdn.com/w20/${creator.country.toLowerCase()}.png`;
    const profilePictureUrl = creator.logoUrl || '/path/to/default/image.png';

    return (
        <article className="bg-gray-900 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 ease-in-out mx-auto max-w-4xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <ProfileHeader creator={creator} countryFlagUrl={countryFlagUrl} profilePictureUrl={profilePictureUrl} />
            <div className="flex-1 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">{creator.name}</h2>

                <p className="text-sm md:text-base leading-relaxed">{creator.description}</p>
                <Tags tags={creator.tags} />
                <div className="flex justify-center md:justify-start items-center space-x-2 text-yellow-500 text-xl">
                    {'🌟'.repeat(Math.floor(creator.engagementRate))}
                </div>
                {/* Buttons and SocialIcons can be directly included here as needed */}
                <CreatorStats subscribers={creator.subscriberCount} views={creator.views} />
            </div>
        </article>
    );
};



// Reusable video card component
const VideoCard = () => (
    <div className="bg-gray-800 p-4 rounded-lg">
        <div className="mb-2">
            {/* Thumbnail image */}
            <div className="bg-gray-700 h-48 mb-2"></div>
            <h3 className="text-lg font-semibold">Video Title</h3>
            <p className="text-gray-400">X views • Y days ago</p>
        </div>
    </div>
);

// Reusable playlist card component
const PlaylistCard = () => (
    <div className="bg-gray-800 p-4 rounded-lg">
        <div className="mb-2">
            {/* Thumbnail image */}
            <div className="bg-gray-700 h-48 mb-2"></div>
            <h3 className="text-lg font-semibold">Playlist Title</h3>
            <p className="text-gray-400">X videos</p>
        </div>
    </div>
);