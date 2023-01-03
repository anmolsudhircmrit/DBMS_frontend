import 'bootstrap/dist/css/bootstrap.css'
import './styles/styles.css'

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import { Container } from 'react-bootstrap';
import SideBar from './components/Sidebar'

function App() {
  return (
    <Container fluid>
      <Dashboard />
    </Container>
    //<SignIn/>
  );
}

export default App;

//"https://atlas.mapmyindia.com/",