import { Routes, Route } from "react-router-dom";
import MainLayout from "./page/Main";
import DetailTour from "./page/DetailTour";
import ListTour from "./page/ListTour";
import Introduce from "./page/Introduce";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/detail" element={<DetailTour />} />
        <Route path="/listTour" element={<ListTour />} />
        <Route path="/Introduce" element={<Introduce />} />
      </Routes>
    </>
  );
}

export default App;
