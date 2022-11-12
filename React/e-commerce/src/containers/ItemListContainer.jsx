import { useEffect, useState } from 'react';
import { products } from '../utils/products'
import '../scss/ItemListContainer.scss';
import { customFetch } from '../utils/customFetch';
import { useParams } from 'react-router-dom';
import ItemList from '../components/ItemList';

const Products = (props) => {
  const [prod, setProd] = useState([])
  const { categoryID } = useParams();

    useEffect(() => {
      if (categoryID === undefined) {
        customFetch(2000, products)
        .then(response => setProd(response))
        .catch(err => console.log(err))
      } else {
        customFetch(2000, products.filter(item => item.categoria === categoryID))
        .then(response => setProd(response))
        .catch(err => console.log(err))
      }
    }, [categoryID])

    return (
      <>
      <div>
          <h1 id='greeting'> {props.greeting} </h1> 
      </div> 
      <ItemList items={prod}/>
      </>
    );
  }
  
  export default Products;