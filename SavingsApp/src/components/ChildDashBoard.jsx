import React, { useEffect, useState } from 'react'
import { Greeting } from './Greeting'
import { Balance } from './Balance';
import { SendMoney } from './SendMoney';
import { WithdrawMoney } from './WithdrawMoney';
import { SavingPlans } from './SavingPlans';
import api from './api';
import { DonutChart } from './DonutChart';
import '../App.css'
import { Transaction } from './Transaction';
import { DeActivated } from './DeActivated';
import { SaveButton } from './SaveButton';
import { Router, useNavigate } from 'react-router-dom';
import { SavePlanList } from './SavePlanList';

export const ChildDashBoard = ({data, setUser}) => {
    let {name,email, totalBalance, accountNumber, expDate} = data;
    const [currentBalance, setCurrentBalance] = useState(totalBalance);
    const [history, setHistory] = useState([]);
    const nav = useNavigate();

    const handleBalanceUpdate = (newBalance) => {
        setCurrentBalance(newBalance);
        console.log("Updated Balance:", newBalance);
      };

 const updateBalance = async (userId, currentBalance, amountToAddOrSubtract, isAddition) => {
  const moneyChange = parseInt(amountToAddOrSubtract, 10);
  if (!isNaN(moneyChange) && moneyChange > 0) {
    const newBalance = isAddition ? currentBalance + moneyChange : currentBalance - moneyChange;
    try {
      const res = await api.patch(`/user/${userId}/balance`, {
        balance: newBalance
      });
      setCurrentBalance(res.data.user.totalBalance);
      console.log(res.data.user);
      setUser(res.data.user);
      return res.data.user.totalBalance;
    } catch (error) {
      console.error('Error updating balance:', error);
      throw error; 
    }
  } else {
    throw new Error('Invalid amount provided');
  }
};

const fetchHistory = async () => {
  try {
    const res = await api.get('/history');
    setHistory(res.data.historydata);
  } catch (error) {
    console.log("error in history fetching", error);
  }
};

useEffect(() => {
  fetchHistory();
}, []);

const handleNav = () => {
  nav('/savingplan')
}


  return (
    <div className='main-container'>
      <div className='header-container'>
      <Greeting name={name} />
      <Transaction history={history} />
      </div>
      <div className='balance-donut-container'>
      <Balance totalBalance={totalBalance} onBalanceUpdate={handleBalanceUpdate} accNum={accountNumber} expDate={expDate} updateBalance={updateBalance} email={email} onHistoryChange={fetchHistory} />
      </div>
      <div className='button-action-container'>
        <SendMoney totalBalance={totalBalance} onBalanceUpdate={handleBalanceUpdate} updateBalance={updateBalance} onHistoryChange={fetchHistory} email={email} accountNum={name}/>
        <WithdrawMoney totalBalance={totalBalance} onBalanceUpdate={handleBalanceUpdate} updateBalance={updateBalance} email={email} onHistoryChange={fetchHistory}/>
        <div>
        <button className="action-buttons" onClick={handleNav}>
        <i className="fa-solid fa-piggy-bank"></i>{" "}
        <span className="button-text">Goals</span>
      </button>
      <p className="send-text">Goals</p>
        </div>
      </div>
        <div  style={{ display: 'none' }}>
          <SavingPlans totalBalance={totalBalance} onBalanceUpdate={handleBalanceUpdate} updateBalance={updateBalance}/>
         </div>

    </div>
  )
}
