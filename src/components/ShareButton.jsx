import React from 'react';
import '../Style/ShareButton.css';

const ShareButton = ({ weatherData }) => {
  const handleShare = () => {
    const url = `https://twitter.com/intent/tweet?text=Weather in ${weatherData.name}: ${weatherData.main.temp}°C, ${weatherData.weather[0].description}`;
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleShare} className="share-button">
      Share on Twitter
    </button>
  );
};

export default ShareButton;
