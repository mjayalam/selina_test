import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header';
import {Footer} from './components/Footer';
import { Inventory } from './pages/Inventory'; 
import { Instructions } from './pages/Instructions';
function App() {
  return (
    <BrowserRouter>
   
      <Header />
      <Routes>
      <Route path="/" element={ <Instructions />}/>
        <Route path="instrucciones" element={ <Instructions />}/>
        <Route path="inventario" element={ <Inventory />}/>
       
      </Routes> 
     
     <Footer />
    </BrowserRouter> 
  );
}
export default App;
