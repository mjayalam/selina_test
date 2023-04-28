import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import {Footer} from './components/Footer';
import { Inventory } from './pages/Inventory'; 
import { Instructions } from './pages/Instructions';
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path={`/`}>
          <Instructions />
          </Route>
          <Route exact path={`/inventario`}>
            <Inventory />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter> 
    </>
  );
}
export default App;