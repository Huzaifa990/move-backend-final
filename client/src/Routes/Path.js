import "../App.css";
import "../bootstrap.min.css";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Introduction from "../components/Introduction";
import SubServices from "../components/Services/SubServices";
import Discount from "../components/Services/Discount";
// import Slider from "./components/Headers/slider";
// import SubHeaderAbout from "./components/Headers/SubHeader";
import FindCar from "../components/FindCar";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={ <><NavBar/> <Search/> <Introduction/> <SubServices/> <Discount/> <ContactUs/> <FindCar/> <Footer/> </>} />
            <Route path='about' element={ <><NavBar/> <Search/> <Introduction/>  <Footer/> </>} />
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
