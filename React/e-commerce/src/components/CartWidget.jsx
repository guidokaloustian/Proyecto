import carrito from '../img/carrito.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const CartWidget = () => {
  const context = useContext(CartContext);

    return (
      <>
        <div className="carrito-img">
          <Link className='link' to='/cart'>
          <img id="carrito" src={carrito} alt='...'/>
          {
            context.cartList.length > 0 &&
            <p className="badge">{context.totalQty()}</p>
          }
          </Link>
        </div>   
      </>
    );
  }
  
  export default CartWidget;