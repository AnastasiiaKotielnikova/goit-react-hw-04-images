import { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { BsZoomIn } from 'react-icons/bs';
import { SearchBarHeader, SearchForm, Button, Input } from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      Report.failure('Search Failure', 'Please enter seach query', 'Ok');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchBarHeader>
      <Formik>
        <SearchForm onSubmit={handleSubmit}>
          <Button type="submit">
            <BsZoomIn size={25} />
          </Button>

          <Input
            name="searchQuery"
            type="text"
            // autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleNameChange}
          />
        </SearchForm>
      </Formik>
    </SearchBarHeader>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
