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
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Slider from "../components/Headers/Slider";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Listings from "../components/Listings";
import AddListings from "../components/AddListings";
import ViewListings from "../components/ViewListings";
import EditListing from "../components/EditListings";
import ChangePassword from "../components/ChangePassword";
import DeleteListing from "../components/DeleteListing";
import RequestForget from "../components/RequestForget";
import ResetPassword from "../components/ResetPassword";
import MyListings from "../components/MyListings";
import MyBookings from "../components/MyBookings";
import EditBooking from "../components/EditBooking";
import ViewBooking from "../components/ViewBooking";
import DeleteBooking from "../components/DeleteBooking";
import LessorDashboard from "../components/LessorDashboard";
import LesseeDashboard from "../components/LesseeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import ActivateAccount from "../components/ActivateAccount";
import MyProfile from "../components/MyProfile.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar /> <Search /> <Slider /> <Introduction /> <SubServices numbering="2" />{" "}
                <Discount /> <FindCar /> <ContactUs numbering="4" /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="about"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="About" /> <Introduction />{" "}
                <Driver /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="contact"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Contact" />{" "}
                <ContactUs numbering="1" /> <Map /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="services"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Services" />{" "}
                <SubServices numbering="1" /> <Discount /> <Driver /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="signup"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="SignUp" /> <SignUp />{" "}
                <SubServices numbering="1" />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="signin"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="SignIn" /> <SignIn />{" "}
                <SubServices numbering="1" />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="listings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Listings" /> <Listings />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="addListings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="List Your Car" /> <AddListings />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="viewListings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Car Details" /> <ViewListings />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="editListings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Edit Details" /> <EditListing />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="changepassword"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Update Password" />{" "}
                <ChangePassword /> <SubServices numbering="1" />
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="deleteListings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Delete Listing" />{" "}
                <DeleteListing /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="requestForget"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Forgot Password" />{" "}
                <RequestForget /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="reset"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Reset Password" />{" "}
                <ResetPassword /> <Footer />{" "}
              </>
            }
          />
          <Route
            path="myListings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="My Listings" /> <MyListings />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="myBookings"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="My Bookings" /> <MyBookings />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="editBooking"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Edit Bookings" /> <EditBooking />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="viewBooking"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="View Bookings" /> <ViewBooking />{" "}
                <Footer />{" "}
              </>
            }
          />
          <Route
            path="deleteBooking"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Delete Bookings" />{" "}
                <DeleteBooking /> <Footer />{" "}
              </>
            }
          />

          <Route
            path="lessorDashboard"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Dashboard" /> <LessorDashboard />{" "}
                <Footer />{" "}
              </>
            }
          />

          <Route
            path="lesseeDashboard"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Dashboard" /> <LesseeDashboard />{" "}
                <Footer />{" "}
              </>
            }
          />

          <Route
            path="adminDashboard"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="Admin Dashboard" />{" "}
                <AdminDashboard /> <Footer />{" "}
              </>
            }
          />

           <Route
            path="myProfile"
            element={
              <>
                <NavBar /> <Search /> <SubHeaderAbout headingText="My Profile" />{" "}
                <MyProfile /> <Footer />{" "}
              </>
            }
          />

          <Route
            path="activateAccount"
            element={
              <>
                <ActivateAccount />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
