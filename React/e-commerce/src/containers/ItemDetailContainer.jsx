import { useEffect, useState } from 'react';
import '../scss/ItemListContainer.scss';
import { firestoreFetchDetail } from "../utils/firestoreFetch";
import ItemDetail from '../components/ItemDetail';
import { useParams } from 'react-router-dom';

const Products = (props) => {
  const [prod, setProd] = useState([])
  const { itemID } = useParams();

  useEffect(() => {
    firestoreFetchDetail(itemID)
        .then(result => setProd(result))
        .catch(err => console.log(err))
});

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