import "./App.css";
import "./bootstrap.min.css";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Introduction from "./components/Introduction";
import SubServices from "./components/Services/SubServices";
import Discount from "./components/Services/Discount";
import Slider from "./components/Headers/slider";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <Slider />
      <Introduction />
      <SubServices />
      <Discount />
    </div>
  );
}

export default App;
