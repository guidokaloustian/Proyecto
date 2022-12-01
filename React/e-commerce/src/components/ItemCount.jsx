import '../scss/ItemCount.scss';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const ItemCount = (props) => {

    const [qty, setQty] = useState(0);

    const [itemCart, setItemCart] = useState(0);

    const {addToCart} = useContext(CartContext);


    const sumProd = () => {
        if (qty < props.stock) {
        setQty(qty + 1);
        }
    }

    const substractProd = () => {
        if (qty > 0) {
        setQty(qty - 1);
        }
    }

    const add = (items) => {
        if (qty > 0) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Los productos se han agregado correctamente',
            showConfirmButton: false,
            timer: 1200
          })

        setItemCart(items);
        addToCart(props, qty);

        }
    }

    return (
    <>
    <div className='contenedorPrincipal'>
        <span className='contenedorVista'>          
        <img className='imgVista' src={props.imagen} alt="..."/>
            <div>
                <h1 className='tituloVista'>{props.nombre}</h1>
                <p className='textDescripcion'>{props.descripcion}</p>
                <p className='precioVista'><strong>Precio:</strong> $ {props.precio}</p>
                <p className='stockVista'><strong>Stock disponible:</strong> {props.stock} unidades.</p>
                    {
                    itemCart === 0 ?
                    <>
                    <div className='contenedorCantidad'>
                    <button className="btn btn-outline-danger btn-sm" onClick={substractProd}>-</button> <p className='cantidad'> {qty} </p> <button className="btn btn-outline-danger btn-sm" onClick={sumProd}>+</button>
                    </div>
                    <div id='btnCarrito'>
                    <button id='boton' className='btn btn-danger' onClick={() => {add(qty)}}>Agregar al carrito</button>
                    </div>
                    </>
                    :
                    <div className='contenedorCantidad'> 
                    <button className='btn btn-danger'><Link className='linkBtn' to='/cart'>Ir al carrito</Link></button>
                    </div>
                    }
            </div>
        </span>
    </div>
    </>
    );
}

export default ItemCount;
