import './App.css'
import ProductList from './components/ProductList.jsx';
import NavBar from './components/NavBar.jsx';
import PaymentPage from './components/PaymentPage.jsx'
import { CartProvider } from './components/CartContext.jsx';
function App() {
  return (
    <div>
      <CartProvider>
        <NavBar/>
        <ProductList/>
        <PaymentPage/>
      </CartProvider>
    </div>
  );
}

export default App;
