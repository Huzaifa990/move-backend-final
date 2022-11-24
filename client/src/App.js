import "./App.css";
import "./bootstrap.min.css";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Introduction from "./components/Introduction";
import SubServices from "./components/Services/SubServices";
import Discount from "./components/Services/Discount";
import Slider from "./components/Headers/Slider";
import SubHeaderAbout from "./components/Headers/SubHeader";
import FindCar from "./components/FindCar";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <div className="App">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rubik&display=swap" rel="stylesheet"/>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css" rel="stylesheet"/>

      <NavBar />
      <Search />
      {/* <SubHeaderAbout/> */}
      <Introduction />
      <SubServices />
      <Discount />
      <FindCar/>
      <ContactUs/>
      <Footer/>
    </div>
  );
}

export default App;
