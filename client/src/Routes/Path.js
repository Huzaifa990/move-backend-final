import "../App.css";
import "../bootstrap.min.css";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Introduction from "../components/Introduction";
import SubServices from "../components/Services/SubServices";
import Discount from "../components/Services/Discount";
// import Slider from "./components/Headers/slider";
import SubHeaderAbout from "../components/Headers/SubHeader";
import FindCar from "../components/FindCar";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import Driver from "../components/Driver";
import Map from "../components/Map";
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={ <><NavBar/> <Search/> <Introduction/> <SubServices numbering="2"/> <Discount/> <ContactUs numbering="4"/> <FindCar/> <Footer/> </>} />
            <Route path='about' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="About"/> <Introduction/> <Driver/>  <Footer/> </>} />
            <Route path='contact' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="Contact"/> <ContactUs numbering="1"/> <Map/>  <Footer/> </>} />
            <Route path='services' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="Services"/> <SubServices numbering="1"/> <Discount/> <Driver/>  <Footer/> </>} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
