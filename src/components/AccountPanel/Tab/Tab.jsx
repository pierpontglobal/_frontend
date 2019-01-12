import React from 'react';
import RoundBadge from '../../RoundBadge/RoundBadge';
import Container from '../../styles/Container/Container';
import Span from '../../styles/Span/Span';
import './styles.css';
import { pointer } from 'popmotion';

function Tab({
  icon, name, selected, notification, onClick, className = '',
}) {
  const isSelected = selected === name;
  const handleClick = () => onClick(name);

  return (
    <Container
      className={`d-flex pl-4 pr-3 justify-content-between ${className}`}
      height="48px"
      backgroundColor={isSelected ? '#3a7abf' : 'transparent'}
      onClick={handleClick}
    >
      <Span
        style={{
          cursor: 'pointer',
        }}
        className="d-flex align-items-center"
        opacity={0.87}
        fontSize="0.875em"
        fontWeight={600}
        lineHeight={1.43}
        fontColor={isSelected ? '#ffffff' : '#000000'}
      >
        <i
          style={{
            color: '#3B444B',
            fontSize: '16px',
            width: '24px',
          }}
          className={`mr-4 pt-1 ${icon} tab-icon`}
          height="24px"
          width="24px"
          color={isSelected ? '#ffffff' : '#3B444B'}
        />
        {name}
      </Span>
      {
                (notification > 0 && !isSelected)
                    && (
                    <RoundBadge
                      className="align-self-center"
                      count={notification < 10 ? notification : '9+'}
                    />
                    )
            }
    </Container>
  );
}

export default Tab;
