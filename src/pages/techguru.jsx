import Head from 'next/head';
import Image from 'next/image';
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';

export default function TechGuru() {
    return (
        <div>
            <Head>
                <title>TechGuru - Your Tech Community</title>
            </Head>

            {/* Header Image */}
            <div className="relative h-64 w-full overflow-hidden">
                {/* Replace with your actual image URL */}
                <Image src="/your-image-url.jpg" layout="fill" objectFit="cover" alt="TechGuru Header" />
            </div>

            {/* Main Content */}
            <div className="bg-white shadow rounded-lg p-6 -mt-16 mx-auto max-w-4xl">
                {/* Community Title and Description */}
                <h1 className="text-3xl font-bold text-gray-800">TechGuru</h1>
                <p className="text-gray-500">The official community for TechGuru, your go-to tech space.</p>

                {/* Community Stats */}
                <div className="flex items-center justify-between my-4">
                    <div>
                        <span className="font-bold text-gray-800">14,006,086</span>
                        <span className="text-gray-500"> Online</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-800">18,665,934</span>
                        <span className="text-gray-500"> Members</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 my-4">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">Join Community</button>
                    <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg">Share Community</button>
                </div>

                {/* Categories and Social Links */}
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        {/* Dynamically generate categories from data */}
                        <h2 className="text-gray-800 font-semibold">Categories</h2>
                        <ul>
                            <li>Science & Tech</li>
                            <li>Entertainment</li>
                            <li>Creative Arts</li>
                            {/* ...other categories */}
                        </ul>
                    </div>
                    <div className="flex">
                        {/* Social Icons */}
                        <a href="#" className="text-blue-600"><FaTwitter size={24} /></a>
                        <a href="#" className="text-blue-600 ml-4"><FaFacebook size={24} /></a>
                        <a href="#" className="text-blue-600 ml-4"><FaInstagram size={24} /></a>
                        <a href="#" className="text-blue-600 ml-4"><FaDiscord size={24} /></a>
                    </div>
                </div>

                {/* About Section */}
                <div className="my-4">
                    <h2 className="text-gray-800 font-semibold">About</h2>
                    <p className="text-gray-500">TechGuru is a new emerging tech community...</p>
                </div>

                {/* Supported Languages */}
                <div className="my-4">
                    <h2 className="text-gray-800 font-semibold">Supported Languages</h2>
                    <p className="text-gray-500">English</p>
                    {/* ...other languages */}
                </div>
            </div>
        </div>
    );
}