import React from 'react';

interface FilterBarProps {
  searchTerm: string;
  selectedCategory: string;
  selectedDifficulty: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  categories: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  selectedCategory,
  selectedDifficulty,
  onSearchChange,
  onCategoryChange,
  onDifficultyChange,
  categories
}) => {
  return (
    <div className="filter-bar">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar recetas..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="main-input search-input"
        />
      </div>
      
      <div className="filters-container">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Todas las categorías</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="filter-select"
        >
          <option value="">Todas las dificultades</option>
          <option value="fácil">🟢 Fácil</option>
          <option value="medio">🟡 Medio</option>
          <option value="difícil">🔴 Difícil</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;