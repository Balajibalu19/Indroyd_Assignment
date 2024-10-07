import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCodeComponent = ({ url, onScan }) => {
  const [isScanned, setIsScanned] = useState(false);

  // Function to handle when the QR code is scanned
  const handleQRCodeScanned = () => {
    setIsScanned(true); // Set state to hide the QR code after it's scanned
    if (onScan) {
      onScan(); // Call onScan function passed as a prop
    }
  };

  return (
    <div>
      {!isScanned ? (
        <>
          <h2>Scan the QR Code to Join</h2>
          {/* Use full URL including IP and port */}
          <QRCodeSVG
            value={url}
            size={256}
            onClick={handleQRCodeScanned} // Simulate scan with click for demo/testing
          />
        </>
      ) : (
        <p className="text-green-600">QR code scanned successfully! Please proceed.</p>
      )}
    </div>
  );
};

export default QRCodeComponent;
