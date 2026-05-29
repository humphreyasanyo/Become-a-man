import React, { useState } from 'react';

export default function App() {
  const [paymentStatus, setPaymentStatus] = useState("");
  const appName = "Thousand Miles";
  const currency = "USD";

  const handlePayment = (amount) => {
    setPaymentStatus(`Redirecting to secure gateway... Processing $${amount} ${currency}`);
  };

  return (
    <div style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#ffffff',
      padding: '20px'
    }}>
      {/* Branding */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#4CAF50' }}>
        {appName}
      </h1>
      <p style={{ color: '#b3b3b3', marginBottom: '40px' }}>
        Global Payments & Support
      </p>

      {/* Secure Payment Card */}
      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        border: '1px solid #2d2d2d'
      }}>
        <p style={{ fontSize: '0.9rem', color: '#cccccc', marginBottom: '24px', lineHeight: '1.5' }}>
          Support our project safely. Your personal payment routing info is fully encrypted and hidden for maximum privacy.
        </p>

        {/* $2 Button */}
        <button 
          onClick={() => handlePayment(2)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          Send $2.00 {currency}
        </button>

        {/* $5 Button */}
        <button 
          onClick={() => handlePayment(5)}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: 'transparent',
            color: '#4CAF50',
            border: '2px solid #4CAF50',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Send $5.00 {currency}
        </button>

        {paymentStatus && (
          <p style={{ marginTop: '20px', color: '#81C784', fontSize: '0.9rem' }}>
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
}


