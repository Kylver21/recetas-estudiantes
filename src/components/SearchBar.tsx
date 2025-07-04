import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  return (
    <div className="searchbar-container">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar-input"
          placeholder="Buscar receta por nombre..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="searchbar-btn"
          onClick={handleSubmit}
          disabled={!inputValue.trim()}
        >
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

