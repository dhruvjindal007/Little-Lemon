import Logo from './Logo.png';
function Header() {
    return (
      <header className="header">
        <img
          src={Logo}
          alt="Little Lemon restaurant logo"
          className="logo"
        />
      </header>
    );
  }

  export default Header;