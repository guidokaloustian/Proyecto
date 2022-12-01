import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./containers/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import Navbar from "./components/NavBar";
import Cart from "./components/Cart";
import CartContextProvider from "./components/CartContext";

const App = (props) => {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<ItemListContainer greeting='¡Bienvenidos a H&H!' />}/>
            <Route path='/category/:categoryID' element={<ItemListContainer/>}/>
            <Route path='/item/:itemID' element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
      </BrowserRouter>
    </CartContextProvider>
  );
}

export default App;
