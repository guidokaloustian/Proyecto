import { query, orderBy, where, collection, getDocs } from '@firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebaseConfig';

export const firestoreFetch = async (categoryID) => {
    let request;
    if (categoryID) {
        request = query(collection(db, "products"), where('categoria', '==', categoryID));
    } else {
        request = query(collection(db, "products"), orderBy('categoria'));
    }
    const querySnapshot = await getDocs(request);
    const dataFromFirestore = querySnapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
    }));
    return dataFromFirestore;
}

export const firestoreFetchDetail = async (itemID) => {
    const docRef = doc(db, "products", itemID);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
          id: itemID,
          ...docSnap.data()
      }
    } else {
      // doc.data() will be undefined in this case
      console.log("El producto no existe.");
    }
}