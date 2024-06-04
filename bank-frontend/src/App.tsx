import React, { useState } from 'react';
import { createCustomer, deposit, withdraw, getCustomerBalance, getBankBalance } from './services/api';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<number | null>(null);
  const [bankBalance, setBankBalance] = useState<number | null>(null);

  const handleCreateCustomer = async () => {
    const response = await createCustomer(name);
    setCustomerId(response.data._id);
  };

  const handleDeposit = async () => {
    await deposit(customerId, amount);
  };

  const handleWithdraw = async () => {
    await withdraw(customerId, amount);
  };

  const handleGetCustomerBalance = async () => {
    const response = await getCustomerBalance(customerId);
    setBalance(response.data.balance);
  };

  const handleGetBankBalance = async () => {
    const response = await getBankBalance();
    setBankBalance(response.data.totalBalance);
  };

  return (
      <div>
        <h1>Bank App</h1>
        <div>
          <h2>Create Customer</h2>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer Name" />
          <button onClick={handleCreateCustomer}>Create</button>
        </div>
        <div>
          <h2>Customer ID: {customerId}</h2>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
          <button onClick={handleDeposit}>Deposit</button>
          <button onClick={handleWithdraw}>Withdraw</button>
        </div>
        <div>
          <button onClick={handleGetCustomerBalance}>Get Customer Balance</button>
          {balance !== null && <p>Balance: ${balance}</p>}
        </div>
        <div>
          <button onClick={handleGetBankBalance}>Get Bank Balance</button>
          {bankBalance !== null && <p>Bank Balance: ${bankBalance}</p>}
        </div>
      </div>
  );
};

export default App;
