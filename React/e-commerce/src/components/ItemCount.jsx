import '../scss/ItemCount.scss'
import { useState } from 'react';

const ItemCount = (props) => {

    const [cant, setCant] = useState(1);

    const sumProd = () => {
        if (cant < 10) {
        setCant(cant + 1);
        }
    }

    const substractProd = () => {
        if (cant > 1) {
        setCant(cant - 1);
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
                <div className='contenedorCantidad'>
                <button className="btn btn-outline-danger btn-sm" onClick={substractProd}>-</button> <p className='cantidad'> Cantidad= {cant} </p> <button className="btn btn-outline-danger btn-sm" onClick={sumProd}>+</button>
                </div>
                <div id='btnCarrito'>
                <button className='btn btn-danger'>Agregar al carrito</button>
                </div>
            </div>
        </span>
    </div>
    </>
    );
}

export default ItemCount;
