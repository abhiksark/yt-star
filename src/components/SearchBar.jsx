// components/SearchBar.jsx

const SearchBar = ({ onSearch }) => {
    // Function to handle the form submission
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const query = formData.get('searchQuery'); // 'searchQuery' is the name of the input field
  
      // onSearch is a function passed as a prop that handles the search logic
      if (onSearch) {
        onSearch(query);
      }
    };
  
    return (
      <div className="my-6">
        <form className="flex justify-center" onSubmit={handleSubmit}>
          <input
            name="searchQuery"
            type="text"
            placeholder="Search YouTubers..."
            className="w-full max-w-lg rounded-l-lg p-2 text-black"
            aria-label="Search YouTubers"
          />
          <button
            type="submit"
            className="bg-red-600 rounded-r-lg px-4 py-2 text-white font-bold hover:bg-red-700 transition-colors"
            aria-label="Search"
          >
            Search
          </button>
        </form>
      </div>
    );
  };
  
  export default SearchBar;
  