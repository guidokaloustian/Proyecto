import Item from './Item';

const ItemList = ({ items }) => {

    return (
        <>
          <div id= 'contenedorProductos' className='row row-cols-2 row-cols-md-3 g-4'>
            {
            items.length > 0 && 
            items.map(item => (
              <Item 
              imagen= {item.imagen}
              nombre= {item.nombre}
              id= {item.id}
              key= {item.id}
              />
            ))
            }
            </div>
            {
            items.length === 0 &&
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }
        </>
        );

}

export default ItemList;