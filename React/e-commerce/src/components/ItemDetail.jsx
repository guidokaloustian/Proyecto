import ItemCount from './ItemCount';

const ItemDetail = ({ item }) => {

    return (
        <>
        {
          item && item.imagen ?
          <ItemCount 
          imagen= {item.imagen}
          nombre= {item.nombre}
          descripcion= {item.descripcion}
          precio= {item.precio}
          stock= {item.stock}
          qty = {item.qty}
          id= {item.id}
          key= {item.id}
          />
          : 
          <div className="d-flex justify-content-center">
              <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
          </div>
        } 
        </>
        );

}

export default ItemDetail;