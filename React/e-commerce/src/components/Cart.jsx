import { useContext } from "react";
import { CartContext } from "./CartContext";
import "../scss/Cart.scss";
import eliminar from "../img/eliminar.png";

const Cart = () => {
    const { cartList, deleteItem, clear, totalPerItem, totalCost} = useContext(CartContext);

    return (
    <>
        <h1 className="titulo">
            Carrito de compras
        </h1>
        {
            cartList.length === 0 ?
            <h3 className="subtitulo">
            Aún no has agregado productos.
            </h3>
            :
            cartList.map(item => (
                    <div className="contenedorCart">
                        <div className="contenedorImagen">
                        <img className='imgCart' src={item.itemImg} alt="..."/>
                        </div>
                        <h5 className='tituloCart'>{item.itemName}</h5>                        
                        <div className="contenedorTexto">
                        <p className='textCart'>{item.itemDesc}</p>
                        </div>
                        <p className='precioCart'><strong>$ {item.itemCost} c/u</strong></p>
                        <p className='cantCart'>Cantidad: {item.itemQty}</p>
                        <div id='btnCarrito'>
                        <button id='boton' className='btn btn-danger' onClick={() => {deleteItem(item.itemId)}}> <img src={eliminar} alt='...'/></button>
                        </div>
                    </div>
            ))

        }
          
        {
            cartList.length > 0 &&
            cartList.map(item => 
                <div className="contenedorTotal">
                    <p>{item.itemName}                 x{item.itemQty}      ${totalPerItem(item.itemId)}</p>
                    <p>Total: {totalCost()}</p>
                </div>
                )
            
        }

        {
            cartList.length > 0 &&
            <div id='btnDeleteAll'>
            <button id='boton' className='btn btn-danger' onClick={() => {clear()}}> Vaciar carrito </button>
            </div>
        }
    </>
    );
}

export default Cart;

