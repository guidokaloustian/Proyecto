import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemListContainer from "./containers/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import Navbar from "./components/NavBar";

const App = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<ItemListContainer greeting='¡Bienvenidos a H&H!' />}/>
          <Route path='/category/:categoryID' element={<ItemListContainer/>}/>
          <Route path='/item/:itemID' element={<ItemDetailContainer/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
