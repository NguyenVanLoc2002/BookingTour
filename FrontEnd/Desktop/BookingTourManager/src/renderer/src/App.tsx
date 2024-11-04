// import React from "react";
// import CreateTour from "./pages/TourManagement/CreateTour";
// import ListTour from "./pages/TourManagement/ListTour";

// const App: React.FC = () => {
//   return (
//     <>
//     <div className="w-[1920px] h-[1080px]">
//       <ListTour></ListTour>
//     </div>
     
//     </>
//   );
// }

// export default App;
import { Route, Routes } from 'react-router-dom';
import CreateTour from './pages/TourManagement/CreateTour';
import ListTour from './pages/TourManagement/ListTour';
import PushTour from './pages/TourManagement/PushTour';

const App: React.FC = () => {
  return (
    <div className="bg-white text-black text-base">
      <Routes>
      <Route path="/" element={<ListTour />} />
        <Route path="/createTour" element={<CreateTour />} />
        <Route path="/pushTour" element={<PushTour />} />
        <Route path="/listTour" element={<ListTour />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </div>
  );
}

export default App;
