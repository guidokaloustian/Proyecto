import { useEffect, useState } from 'react';
import { products } from '../utils/products'
import '../scss/ItemListContainer.scss';
import { customFetch } from '../utils/customFetch';
import ItemDetail from '../components/ItemDetail';
import { useParams } from 'react-router-dom';

const Products = (props) => {
  const [prod, setProd] = useState([])
  const { itemID } = useParams();

    useEffect(() => {
        customFetch(2000, products.find(item => item.id == itemID))
        .then(response => setProd(response))
        .catch(err => console.log(err))
    })

    return (
      <>
      <div>
          <h1 id='greeting'> {props.greeting} </h1> 
      </div> 
      <ItemDetail item={prod}/>
      </>
    );
  }
  
  export default Products;