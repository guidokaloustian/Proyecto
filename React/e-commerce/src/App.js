import ItemListContainer from "./components/ItemListContainer";
import Navbar from "./components/NavBar"

const App = (props) => {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting='¡Bienvenidos!' />
    </>
  );
}

export default App;
