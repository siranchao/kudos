'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/homePage.module.css'

export default function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to check if the user has scrolled enough to show the button
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setIsVisible(scrollTop > 300); // Adjust this value based on when you want the button to appear
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
	  className={isVisible ? styles.backToTopVisible : styles.backToTopHidden}
      onClick={scrollToTop}
    >
      Back to Top
    </button>
  );
};
