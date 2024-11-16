import { Routes, Route } from "react-router-dom";
import MainLayout from "./page/Main";
import DetailTour from "./page/DetailTour";
import ListTour from "./page/ListTour";
import Introduce from "./page/Introduce";
import Account from "./page/Account";
import Booking from "./page/Booking";
import PaymentPage from "./page/Payment";
import Bookings from "./page/Bookings";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/detail" element={<DetailTour />} />
        <Route path="/listTour" element={<ListTour />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/account" element={<Account />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </>
  );
}

export default App;
