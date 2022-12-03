import { useEffect, useState } from 'react';
import '../scss/ItemListContainer.scss';
import { useParams } from 'react-router-dom';
import ItemList from '../components/ItemList';
import { firestoreFetch } from '../utils/firestoreFetch';

const Products = (props) => {
  const [prod, setProd] = useState([])
  const { categoryID } = useParams();

    useEffect(() => {
      firestoreFetch(categoryID)
        .then(result => setProd(result))
        .catch(err => console.log(err))
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