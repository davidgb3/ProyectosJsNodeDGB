import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-red-600 shadow-lg sticky bottom-0">
      <div className="container mx-auto p-4 justify-between flex items-center">
        <p className="text-white text-2xl font-bold">Todos los derechos reservados</p>
        <p className="text-white text-2xl font-bold">Curso de React 2025</p>
        <p className="text-white text-2xl font-bold">Link a la página de Github: <Link to='https://github.com/davidgb3' target="blank" className="hover:text-black hover:text-3xl transition-all duration-150">davidgb3</Link></p>
      </div>
    </footer>
  );
};

export default Footer;
