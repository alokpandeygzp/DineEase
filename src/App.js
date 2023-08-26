import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {CartProvider} from './components/ContextReducer'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import MyOrder from './screens/MyOrder';
import AdminPanel from './screens/AdminPanel';
import AddProducts from './screens/AddProducts';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/createuser" element={<Signup/>} />
            <Route exact path="/myOrderData" element={<MyOrder/>} />
            <Route exact path="/admin" element={<AdminPanel/>} />
            <Route exact path="/addproduct" element={<AddProducts/>} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
  );
}

export default App;
