import React, { useState } from 'react';

const CustomTooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="custom-tooltip-wrapper" 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {isVisible && (
        <div className="custom-tooltip" 
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 5px)',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgb(52, 58, 64)',
            color: '#fff',
            padding: '4px 14px',
            borderRadius: '4px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            boxShadow: '0 0 3px rgba(0,0,0,0.2)'
          }}
        >
          {content}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            marginLeft: '-5px',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: 'rgb(52, 58, 64) transparent transparent transparent'
          }} />
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;