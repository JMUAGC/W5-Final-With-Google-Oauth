// JavaScript source code
import React, { useState } from 'react';
import './CreditCard.css';

function CreditCard() {
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState('');

    const validateCardNumber = (number) => {
        const regex = /^\d{4} \d{4} \d{4} \d{4}$/; // Format: 1234 5678 9012 3456
        return regex.test(number);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateCardNumber(cardNumber)) {
            localStorage.setItem('creditCard', cardNumber); // Save to localStorage
            alert('Credit card saved successfully!');
            setCardNumber('');
            setError('');
        } else {
            setError('Invalid card number format. Please use 1234 5678 9012 3456.');
        }
    };

    return (
        <div className="credit-card-container">
            <h2>Credit Card Information</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter card number (1234 5678 9012 3456)"
                />
                <button type="submit">Save Card</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default CreditCard;