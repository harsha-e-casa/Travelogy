import React, { useEffect, useRef, useState } from 'react';

const ScrollTabs = () => {
  const [activeTab, setActiveTab] = useState('London');
  const sectionRefs = {
    London: useRef(null),
    Paris: useRef(null),
    Tokyo: useRef(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleTabClick = (sectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex">
      {/* Sidebar Tabs */}
      <div className="fixed top-24 left-0 w-1/4 bg-gray-100 border-r border-gray-300">
        {['London', 'Paris', 'Tokyo'].map((city) => (
          <button
            key={city}
            onClick={() => handleTabClick(city)}
            className={`block w-full px-6 py-4 text-left text-lg font-medium transition ${
              activeTab === city ? 'bg-gray-300' : 'hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="ml-[25%] w-3/4 space-y-10 px-6">
        <div ref={sectionRefs.London} id="London" className="min-h-screen pt-24">
          <h2 className="text-2xl font-bold mb-2">London</h2>
          <p>London is the capital city of England.</p>
        </div>
        <div ref={sectionRefs.Paris} id="Paris" className="min-h-screen pt-24">
          <h2 className="text-2xl font-bold mb-2">Paris</h2>
          <p>Paris is the capital of France.</p>
        </div>
        <div ref={sectionRefs.Tokyo} id="Tokyo" className="min-h-screen pt-24">
          <h2 className="text-2xl font-bold mb-2">Tokyo</h2>
          <p>Tokyo is the capital of Japan.</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollTabs;
