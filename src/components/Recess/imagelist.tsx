import React, { useState,useEffect } from 'react';

interface ImageListProps {
  image: string| undefined,
  key: number
}

const ImageList = ({ image, key }: ImageListProps) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  const handleClick = () => {
    setIsEnlarged(!isEnlarged);
  };

  const handleClose = () => {
    setIsEnlarged(false);
  };

  const handleDocumentClick = (event: MouseEvent) => {
    const enlargedImage = document.querySelector('.enlarged');
    if (enlargedImage && !enlargedImage.contains(event.target as Node)) {
      setIsEnlarged(false);
    }
  };
  const handleScroll = () => {
    setIsEnlarged(false);
  };

useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`image-item ${isEnlarged ? 'enlarged' : ''}`} key={key} onClick={handleClick}>
        <img src={image} />
      </div>
      {isEnlarged && (
        <>
          <div className="enlarged-shadow" onClick={handleClose} />
          <div className="enlarged-image" onClick={handleClose}>
            <img src={image} />
          </div>
        </>
      )}
    </>
  );
};

export default ImageList;
