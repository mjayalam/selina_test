import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/Header';
import {Footer} from './components/Footer';
import { Inventory } from './pages/Inventory'; 
function App() {
  return (
    <>
     <Header />
      <Inventory />
     <Footer />
    </> 
  );
}
export default App;
