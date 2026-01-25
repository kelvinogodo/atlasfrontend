import React, { useState } from 'react';
import './CopyModal.css';
import { IoMdClose } from "react-icons/io";

const CopyModal = ({ trader, onClose, onConfirm, balance }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        const numAmount = parseFloat(amount);
        if (!amount || isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }
        if (numAmount < trader.minimumcapital) {
            setError(`Minimum investment for this trader is $${trader.minimumcapital}`);
            return;
        }
        if (numAmount > balance) {
            setError('Insufficient funds.');
            return;
        }
        onConfirm(numAmount);
    };

    return (
        <div className="copy-modal-overlay">
            <div className="copy-modal-container">
                <div className="copy-modal-header">
                    <h3>Copy {trader.firstname} {trader.lastname}</h3>
                    <span onClick={onClose}><IoMdClose /></span>
                </div>
                <div className="copy-modal-body">
                    <p className="copy-modal-info">
                        Allocate funds to copy trades from this trader.
                        Profits will be proportional to your allocation.
                    </p>
                    <div className="copy-modal-balance">
                        <span>Available Balance:</span>
                        <span>${balance?.toLocaleString()}</span>
                    </div>

                    <div className="input-group">
                        <label>Amount to Invest ($)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setError('');
                            }}
                            placeholder={`Min: $${trader.minimumcapital}`}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}

                    <button className="confirm-copy-btn" onClick={handleSubmit}>
                        Confirm & Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CopyModal;
