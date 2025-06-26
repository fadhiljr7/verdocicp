import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StackSection from "./components/ModularStackSection";
import PricingPage from "./components/PricingPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import MainApp from "./pages/MainApp";
import ManageDocuments from "./pages/ManageDocuments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>
          <Navbar/>
          <LandingPage/>
          <StackSection/>
          <PricingPage/>
          <Footer/>
        </div>} />
        <Route path="/app" element={<MainApp />} />
        <Route path="/manage" element={<ManageDocuments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
