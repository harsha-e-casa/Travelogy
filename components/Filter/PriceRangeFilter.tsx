import React, { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ priceRange, onPriceChange }) => {
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);
  const min = 0;
  const max = 41087; // Match screenshot range

  useEffect(() => {
    setMinPrice(priceRange[0]);
    setMaxPrice(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, Math.min(Number(e.target.value), maxPrice - 1));
    setMinPrice(value);
    onPriceChange([value, maxPrice]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(max, Math.max(Number(e.target.value), minPrice + 1));
    setMaxPrice(value);
    onPriceChange([minPrice, value]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(min, Math.min(Number(e.target.value), maxPrice - 1));
    setMinPrice(value);
    onPriceChange([value, maxPrice]);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(max, Math.max(Number(e.target.value), minPrice + 1));
    setMaxPrice(value);
    onPriceChange([minPrice, value]);
  };

  return (
    <div className="box-collapse scrollFilter">
      {/* Dual Range Sliders */}
      <div className="relative mb-4">
        <input
          type="range"
          min={min}
          max={max}
          value={minPrice}
          onInput={handleMinChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none slider cursor-pointer z-10"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${((maxPrice - min) / (max - min)) * 100}%,`,
            zIndex: 1,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxPrice}
          onInput={handleMaxChange}
          className="absolute w-full h-2 bg-transparent rounded-lg appearance-none slider cursor-pointer z-20 pointer-events-none"
          style={{
            zIndex: 1,
          }}
        />
        {/* Thumbs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow"
            style={{ left: `calc(${((minPrice - min) / (max - min)) * 100}% - 0.5rem)` }}
          ></div>
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow"
            style={{ left: `calc(${((maxPrice - min) / (max - min)) * 100}% - 0.5rem)` }}
          ></div>
        </div>
      </div>
      {/* Current Price Labels under thumbs */}
      <div className="relative w-full h-6 mb-4 pointer-events-none">
        <span
          className="absolute text-xs text-gray-500 bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${((minPrice - min) / (max - min)) * 100}%` }}
        >
          ₹{minPrice.toLocaleString()}
        </span>
        <span
          className="absolute text-xs text-gray-500 bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          style={{ left: `${((maxPrice - min) / (max - min)) * 100}%` }}
        >
          ₹{maxPrice.toLocaleString()}
        </span>
      </div>
      {/* Input Fields */}
      <div className="flex space-x-2">
        <input
          type="number"
          className="flex-1 form-control border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          placeholder={min.toString()}
          value={minPrice}
          onChange={handleMinInputChange}
          min={min}
          max={maxPrice - 1}
        />
        <input
          type="number"
          className="flex-1 form-control border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          placeholder={max.toString()}
          value={maxPrice}
          onChange={handleMaxInputChange}
          min={minPrice + 1}
          max={max}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>Minimum Price</span>
        <span>Maximum Price</span>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
