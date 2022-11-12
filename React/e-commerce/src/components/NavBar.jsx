import { Link } from 'react-router-dom';
import '../scss/NavBar.scss';
import CartWidget from './CartWidget';

const Navbar = () => {
    return (
      <>
        <h1 className='tituloNavBar'>
          <Link className='tituloNavBar link' to='/'>
          HIERRO & HOME
          </Link>
        </h1>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="link" to='/category/parrillas'>PARRILLAS</Link>
                </li>
                <li className="nav-item">
                  <Link className="link" to='/category/hornos'>HORNOS</Link>
                </li>
                <li className="nav-item">
                  <Link className="link" to='/category/fogoneros'>FOGONEROS</Link>
                </li>
                <li className="nav-item">
                  <Link className="link" to='/category/calefacción'>CALEFACCION</Link>
                </li>
                <li className="nav-item">
                  <Link className="link" to='/category/accesorios'>ACCESORIOS</Link>
                </li>
                <li className="nav-item">
                <CartWidget />
                </li>
              </ul>
            </div>
          </div>
        </nav>

      </>
    );
  }
  
  export default Navbar;