import { categories } from '../data/siteMeta';

const Categories = ({ onSelectCategory }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 my-4">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelectCategory(category.slug)}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 transition duration-150 ease-in-out text-white hover:text-gray-200"
          style={{ boxShadow: '0 2px 4px 0 rgba(31, 38, 135, 0.37)' }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
