import carrito from '../img/carrito.png';

const CartWidget = () => {
    return (
      <>
        <div className="carrito-img">
          <img id="carrito" src={carrito} alt='...'/>
          <p className="badge">1</p>
        </div>   
      </>
    );
  }
  
  export default CartWidget;