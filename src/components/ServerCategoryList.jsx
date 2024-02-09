// components/ServerCategoryList.js
const categories = ["GAMING", "COMMUNITY", "ANIME - MANGA", /* ... more categories */];

const ServerCategoryList = () => {
  return (
    <div className="bg-gray-800 p-4 text-white w-64">
      {categories.map((category) => (
        <div key={category} className="p-2 hover:bg-gray-700 cursor-pointer">
          {category}
        </div>
      ))}
    </div>
  );
};

export default ServerCategoryList;
