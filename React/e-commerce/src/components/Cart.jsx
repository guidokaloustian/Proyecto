import { useContext } from "react";
import { CartContext } from "./CartContext";
import "../scss/Cart.scss";
import eliminar from "../img/eliminar.png";
import { serverTimestamp } from "firebase/firestore";

const Cart = () => {
    const { cartList, deleteItem, clear, totalPerItem, totalCost} = useContext(CartContext);
    
    const createOrder = () => {
        let order = {
            buyer: {
                name: "Guido Kaloustian",
                email: "guidokal@gmail.com",
                phone: "13512612"
            }, 
            date: serverTimestamp(),
            items: cartList.map(item => ({
                id: item.itemId,
                price: item.itemCost,
                title: item.itemName,
                qty: item.itemQty
            })),
            total: totalCost()            
        }
        console.log(order);
    }

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
                        <h6 className='tituloCart'>{item.itemName}</h6>                        
                        <div className="contenedorTexto">
                        <p className='textoCart'>{item.itemDesc}</p>
                        </div>
                        <h6 className='precioCart'><strong>$ {item.itemCost} c/u</strong></h6>
                        <h6 className='cantCart'>Cantidad: {item.itemQty}</h6>
                        <div id='btnCarrito'>
                        <button id='boton' className='btn btn-danger' onClick={() => {deleteItem(item.itemId)}}> <img src={eliminar} alt='...'/></button>
                        </div>
                    </div>
            ))

        }

        {
            cartList.length > 0 &&
            <h5 className="resumenText">Resumen de compra</h5>
        }
          
        {
            cartList.length > 0 &&  
            cartList.map(item => 
                <div className="contenedorTotal">
                    <div className="container text-center">
                        <div className="row">
                            <div className="col">
                                {item.itemName}
                            </div>
                            <div className="col">
                                x{item.itemQty}  
                            </div>
                            <div className="col">
                                ${totalPerItem(item.itemId)}
                            </div>
                        </div>
                    </div>
                </div>
            )
                
        }

        {
            cartList.length > 0 &&
            <p className="total"><strong><u>Total</u></strong>: ${totalCost()}</p>
        }

        {
            cartList.length > 0 &&
            <div id='btnDeleteAll'>
            <button className='btn btn-danger btns-comprafinal' onClick={() => {clear()}}> Vaciar carrito </button>
            <button className='btn btn-danger btns-comprafinal' onClick={() => {createOrder()}}> Crear orden </button>
            </div>
        }
    </>
    );
}

export default Cart;

