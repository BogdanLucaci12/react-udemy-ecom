import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './cart-dropdown.styles.scss';
import Button from '../../components/button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
const CardDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckoutHendler= ()=>{
    navigate('/checkout')
  }
  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button onClick={goToCheckoutHendler}>Go To Checkout</Button>
    </div>
  );
};

export default CardDropdown;
