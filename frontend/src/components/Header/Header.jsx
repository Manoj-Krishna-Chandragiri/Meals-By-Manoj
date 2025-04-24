import React, { useState, useEffect } from 'react'
import './Header.css'

const Header = () => {
  // Define the text that should appear
  const firstLine = 'Order your';
  const secondLine = 'favourite food here';
  
  const [displayFirstLine, setDisplayFirstLine] = useState('');
  const [displaySecondLine, setDisplaySecondLine] = useState('');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [ellipsisState, setEllipsisState] = useState(0);

  // More reliable animation with exact string handling
  useEffect(() => {
    let timeoutFirstLine;
    let timeoutSecondLine;
    let ellipsisInterval;
    
    // First line animation
    for (let i = 0; i <= firstLine.length; i++) {
      timeoutFirstLine = setTimeout(() => {
        setDisplayFirstLine(firstLine.substring(0, i));
        
        // When first line is complete, start second line
        if (i === firstLine.length) {
          // Start second line animation
          for (let j = 0; j <= secondLine.length; j++) {
            timeoutSecondLine = setTimeout(() => {
              setDisplaySecondLine(secondLine.substring(0, j));
              
              // When second line is complete, start ellipsis
              if (j === secondLine.length) {
                setAnimationComplete(true);
                
                // Start ellipsis animation
                ellipsisInterval = setInterval(() => {
                  setEllipsisState(prev => (prev + 1) % 4);
                }, 500);
              }
            }, j * 100);
          }
        }
      }, i * 100);
    }
    
    // Cleanup
    return () => {
      clearTimeout(timeoutFirstLine);
      clearTimeout(timeoutSecondLine);
      clearInterval(ellipsisInterval);
    };
  }, []);

  // Get current ellipsis
  const getEllipsis = () => {
    return ['', '.', '..', '...'][ellipsisState];
  };
  
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
        <div className="header-contents">
            <div className="animated-text-container">
                <h2 className="animated-text">{displayFirstLine}</h2>
                <h2 className="animated-text">{displaySecondLine}{animationComplete && getEllipsis()}</h2>
            </div>
            <p>Welcome to our food ordering platform! Browse our diverse menu, from tantalizing appetizers to mouthwatering entrees. Order your favorites with ease and convenience. Enjoy delicious meals delivered right to your doorstep!</p>
            <button onClick={scrollToMenu}>View Menu</button>
        </div>
    </div>
  )
}

export default Header