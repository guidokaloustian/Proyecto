import Item from './Item';

const ItemList = ({ items }) => {

    return (
        <>
        <div id= 'contenedorProductos' className='row row-cols-2 row-cols-md-3 g-4'>
        {
        items.length > 0 ? 
        items.map(item => (
          <Item 
          imagen= {item.imagen}
          nombre= {item.nombre}
          id= {item.id}
          key= {item.id}
          />
        )) 
        : <p className='loadingMsg'>Cargando...</p>
        }
        </div>
        </>
        );

}

export default ItemList;