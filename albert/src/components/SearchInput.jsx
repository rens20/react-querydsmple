import  { useState } from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for recipes..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

SearchInput.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchInput;


