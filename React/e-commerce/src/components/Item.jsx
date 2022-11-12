import "../scss/Item.scss";
import { Link } from "react-router-dom";

const Item = (props) => {

    return (
    <>
    <div className="card text-center text-bg-dark mb-3">
        <img src={props.imagen} className="card-img-top" alt="..."/> 
        <div className="card-body">
            <h5 className="card-title">{props.nombre}</h5>
        <button className="btn btn-danger"><Link className='linkBtn' to={`/item/${props.id}`}>Ver detalle</Link></button>
        </div>
    </div>
    </>
    );
}

export default Item;
