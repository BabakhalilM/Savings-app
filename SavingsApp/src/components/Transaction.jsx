import React, { useEffect, useState } from 'react';
import '../styles/transaction.css';
import api from './api';

const DEBIT_TYPES = ['debited', 'transfer', 'sent','auto-deduction'];

export const Transaction = ({ history: historyProp }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ownHistory, setOwnHistory] = useState([]);

  // Only fetch own data when used as the standalone /history page (no prop passed)
  const isStandalone = historyProp === undefined;

  useEffect(() => {
    if (!isStandalone) return;
    const fetchUserdata = async () => {
      try {
        setLoading(true);
        const res = await api.get('/history');
        setOwnHistory(res.data.historydata);
      } catch (err) {
        setError(err);
        console.log("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserdata();
  }, [isStandalone]);

  const displayHistory = isStandalone ? ownHistory : (historyProp || []);

  const toggleHistory = () => setIsHistoryOpen((prev) => !prev);

  const groupByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(transaction);
      return groups;
    }, {});
  };

  const isDebit = (type) => DEBIT_TYPES.includes((type || '').toLowerCase());

  const groupedTransactions = groupByDate(displayHistory);

  return (
    <div>
      <div className="custom-transaction-icon-container">
        <i className="fa-solid fa-clock-rotate-left" onClick={toggleHistory}></i>
      </div>

      <div className={`custom-transaction-history-container ${isHistoryOpen ? 'open' : ''}`}>
        <div className="custom-transaction-close-btn-container">
          <i className="fa-solid fa-xmark" onClick={toggleHistory}></i>
        </div>

        {loading ? (
          <p>Loading transaction history...</p>
        ) : error ? (
          <p>Error loading history.</p>
        ) : (
          <div className="custom-transaction-list">
            <h3>Transactions</h3>
            {Object.keys(groupedTransactions).length > 0 ? (
              Object.keys(groupedTransactions).map((date, index) => (
                <div key={index} className="date-group">
                  <h4>{date}</h4>
                  {groupedTransactions[date].map((transaction, i) => (
                    <div key={i} className="custom-transaction-item-container">
                      <div className="custom-transaction-details-container">
                        <p>{transaction.type}</p>
                        <p>{new Date(transaction.date).toLocaleString()}</p>
                      </div>
                      <div>
                        <p>
                          <span>{transaction.from}</span> - to - <span>{transaction.to}</span>
                        </p>
                      </div>
                      <div className="custom-transaction-amount-container">
                        <p>{isDebit(transaction.type) ? '-' : '+'} ₹{transaction.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No Transactions</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
