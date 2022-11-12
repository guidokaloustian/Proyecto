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
          id= {item.id}
          key= {item.id}
          />
          : <p className='loadingMsg'>Cargando...</p>
        } 
        </>
        );

}

export default ItemDetail;