import React from 'react';

export const formatMultiPrice = (amount, currency) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const Valuedata = ({ amount, currency }) => {
  const formattedAmount = formatMultiPrice(amount, currency);
  return <span className=''>{formattedAmount}</span>;
};

export default Valuedata;

