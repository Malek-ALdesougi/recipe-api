import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import MyFavoirate from './MyFavoirate'

function App() {
  return (
   <>
   <Header />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="my-f" element={<MyFavoirate />} />

   </Routes>
   </>
  );
}

export default App;
