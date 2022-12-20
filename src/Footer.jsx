import './Footer.css'; //Estilos del footer
import LogoAngela from './img/LogoAngela.svg';//---------------Logos de los creadores del dashboard
import LogoAlejandro from './img/LogoAlejandro.svg';
import LogoAndres from './img/LogoAndres.svg';
import LogoBrayan from './img/LogoBrayan.svg';
import LogoCamila from './img/LogoCamila.svg';
import LogoJesus from './img/LogoJesus.svg';
import LogoNicolas from './img/LogoNicolas.svg';
import LogoDruck from './img/LogoDruck.jpeg';
import LogoYeray from './img/LogoYeray.png';
//Simple código JSX para organizar texto e imagenes del footer. 
const Footer = () => {
    return (
        <div className="Footer">
            <div className="footer-up">
                <div className="footer-p">
                    <p>DESCARGO DE RESPONSABILIDAD IMPORTANTE: todo el contenido disponible en nuestro sitio web, en los sitios web hipervinculados,
                        y en las aplicaciones, foros, blogs, cuentas de redes sociales y otras plataformas asociados ("Sitio") tienen como único
                        objetivo proporcionarle información general procedente de fuentes externas.</p>
                </div>
                <div className="footer-c">
                    <p>Crypto Stadistics</p>
                    <p>© 2022</p>
                </div>
            </div>
            <div className="footer-down">
                <p>Developed by</p>
                <div>
                    <img src={LogoAngela} alt="Logo Angela" />
                    <img src={LogoAndres} alt="logo Andres" />
                    <img src={LogoBrayan} alt="logo Brayan" />
                    <img src={LogoCamila} alt="logo Camila" />
                    <img src={LogoJesus} alt="logo Jesus" />
                    <img src={LogoAlejandro} alt="logo Alejandro" />
                    <img src={LogoNicolas} alt="logo Nicolas" />
                    <img src={LogoDruck} alt="logo Druck" />
                    <img src={LogoYeray} alt="logo Yeray" />
                </div>
            </div>
        </div>
    );
}
export default Footer;