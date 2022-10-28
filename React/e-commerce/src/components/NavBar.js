import '../scss/NavBar.scss';
import CartWidget from './CartWidget';

const Navbar = () => {
    return (
      <>
        <h1 className='tituloNavBar'>
          HIERRO & HOME
        </h1>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link">PARRILLAS</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" >HORNOS</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">FOGONEROS</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" >CALEFACCIÓN</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" >ACCESORIOS</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <CartWidget />
      </>
    );
  }
  
  export default Navbar;