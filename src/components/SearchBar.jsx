import React, { useState, useEffect } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const host = 'https://taskly-backend.onrender.com';
  const [showSearch, setShowSearch] = useState(false);
  const [isToggled, setIsToggled] = useState(true);

  useEffect(() => {
    if (showResults) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`${host}/search?query=${query}`);
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchSearchResults();
    }
  }, [query, showResults]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setShowResults(true);
    setIsToggled((prevIsToggled) => !prevIsToggled);
    if (isToggled == true){
    setShowSearch(false);
    }
  };


  useEffect(() => {
    handleSearch(results); // Pass the search results to the handleSearch function in the parent component
  }, [results, handleSearch]);

  return (
    <div className='d-flex search-bar'>
      <input
        className={`${isToggled === true ? 'Search-Input-none' : 'Search-Input'}`}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search tasks..."
      />
      <button className="btn-search rounded-pill " onClick={handleSearchClick}><i className="bi bi-search"></i></button>
      {showResults && (
        <ul className={`${isToggled === true ? 'Search-Input-none' : 'search-ul'}`}>
          {results.map((todo) => (
            <li key={todo._id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
