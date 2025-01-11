import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Signup } from './pages/signup';
import { Signin } from './pages/signin';
import { SendMoney } from './pages/SendMoney';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hi</div>} />
        {/* Uncomment and use these as needed */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
