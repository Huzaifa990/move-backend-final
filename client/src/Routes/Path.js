import "../App.css";
import "../bootstrap.min.css";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Introduction from "../components/Introduction";
import SubServices from "../components/Services/SubServices";
import Discount from "../components/Services/Discount";
import SubHeaderAbout from "../components/Headers/SubHeader";
import FindCar from "../components/FindCar";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import Driver from "../components/Driver";
import Map from "../components/Map";
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Slider from "../components/Headers/Slider";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Listings from "../components/Listings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <><NavBar/> <Search/> <Slider/> <Introduction/> <SubServices numbering="2"/> <Discount/> <FindCar/> <ContactUs numbering="4"/> <Footer/> </>} />
            <Route path='about' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="About"/> <Introduction/> <Driver/>  <Footer/> </>} />
            <Route path='contact' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="Contact"/> <ContactUs numbering="1"/> <Map/>  <Footer/> </>} />
            <Route path='services' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="Services"/> <SubServices numbering="1"/> <Discount/> <Driver/>  <Footer/> </>} />
            <Route path='signup' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="SignUp"/> <SignUp/> <SubServices numbering="1"/><Footer/> </>} />
            <Route path='signin' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="SignIn"/> <SignIn/> <SubServices numbering="1"/><Footer/> </>} />
            <Route path='listings' element={ <><NavBar/> <Search/> <SubHeaderAbout headingText="Listings"/> <Listings/> <Footer/> </>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
