import React from 'react';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import './styles.css';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function DepositProgress({ amount, className }) {
  const widthProgress = 100 * ((amount.balance - amount.holding) / 10000);
  const widthHolding = 100 * (amount.holding / 10000);

  return (
    <Container
      style={{
        borderRadius: '5px',
        overflow: 'visible',
        position: 'relative',
      }}
      className={`flex-fill mr-3 shadow ${className}`}
      backgroundColor="#3e78c0"
    >
      <Text
        className="my-2 py-1 pr-3"
        fontSize="0.875em"
        lineHeight={1.36}
        style={{
          color: '#ffffff', float: 'right', position: 'absolute', right: '5px',
        }}
      >
        ($)
        {' '}
        {numberWithCommas(parseFloat(amount.balance).toFixed(2))}
        {' '}
        / 10000
      </Text>
      <div
        className="progressSection"
        data-content={`$ ${numberWithCommas(amount.balance ? ((amount.balance - amount.holding).toFixed(2)) : 0)} available`}
        style={{
          borderRadius: '5px 0 0 5px',
          height: '100%',
          backgroundColor: '#1D385A',
          width: `${widthProgress}%`,
          float: 'left',
        }}
      />
      <div
        className="progressSection"
        data-content={`$ ${numberWithCommas(amount.holding ? parseFloat(amount.holding).toFixed(2) : 0)} in holdings`}
        style={{
          height: '100%',
          backgroundColor: 'rgb(35, 88, 154)',
          width: `${widthHolding}%`,
          float: 'left',
        }}
      />
    </Container>
  );
}

DepositProgress.defaultProps = {
  amount: 0,
};

export default DepositProgress;
