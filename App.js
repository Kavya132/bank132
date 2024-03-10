import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home.js';
import Login from './login.js';
import Register from './registerForm.js';
import AccountCreation from './create-account.js';
import Dashboard from './dashboard.js';
import Deposit from './deposit.js';
import Withdrawl from './withdrawl.js';
import Balance from './balance.js';
import Transactions from './transactions.js';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/login"  Component={Login} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/new-account" Component={AccountCreation} />
          <Route exact path="/dashboard" Component={Dashboard} />
          <Route exact path="/deposit" Component={Deposit} />
          <Route exact path="/withdrawl" Component={Withdrawl} />
          <Route exact path="/balance" Component={Balance} />
          <Route exact path="/transactions" Component={Transactions} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;