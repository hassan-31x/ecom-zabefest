"use client"
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScanner = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState(null);

  const handleResult = (result, error) => {
    if (result) {
      setData(result.text);
      const quantityInput = prompt('Enter quantity:');
      console.log(quantityInput);
    }

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div>
    <h2 className="flex justify-center text-3xl">Scan Product</h2>
      <QrReader
        onResult={handleResult}
        style={{ width: '100%' }}
      />
      {error? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default QrScanner;