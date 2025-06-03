import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashBoard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import {dark} from '@clerk/themes';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <div className='navbar'>
          <Link to="/">Dashboard</Link>
          <SignedIn>
            <UserButton showName appearance={{baseTheme:dark}} />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path='/'
            element={
              <FinancialRecordsProvider>
                {' '}
                <DashBoard />
              </FinancialRecordsProvider>
            }
          ></Route>
          <Route path='/auth' element={<Auth />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
