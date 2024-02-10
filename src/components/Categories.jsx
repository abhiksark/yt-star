// components/Categories.jsx

import { categories } from '../data/siteMeta';


const Categories = ({ onSelectCategory }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 my-4">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelectCategory(category.slug)}
          className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
