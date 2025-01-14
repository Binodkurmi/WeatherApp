import React from 'react';

const SearchHistory = ({ searchHistory }) => (
  <div className="search-history">
    <h3>Search History</h3>
    <ul>
      {searchHistory.map((city, index) => (
        <li key={index}>{city}</li>
      ))}
    </ul>
  </div>
);

export default SearchHistory;
