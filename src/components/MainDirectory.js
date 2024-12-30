import React, { useState, useEffect } from 'react';
import { searchBusinesses, filterByCategory } from '../services/directoryService';

const MainDirectory = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    const data = await searchBusinesses(searchTerm);
    setBusinesses(data);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = filterByCategory(businesses, category);
    setBusinesses(filtered);
  };

  return (
    <div className="main-directory">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search businesses..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="retail">Retail & Shopping</option>
          <option value="healthcare">Healthcare Services</option>
          <option value="professional">Professional Services</option>
          <option value="food">Food & Hospitality</option>
        </select>
      </div>
      <div className="business-list">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
};

const BusinessCard = ({ business }) => (
  <div className="business-card">
    <h3>{business.name}</h3>
    <p>{business.category}</p>
    <p>{business.address}</p>
    <p>{business.phone}</p>
    <a href={business.website} target="_blank" rel="noopener noreferrer">
      Visit Website
    </a>
  </div>
);

export default MainDirectory;