import './App.css';
import Entete from './components/Entete'
import Maincon from './components/Maincon'
import {ModalProvider} from './Contexts/Modalcontext'
import {LinkProvider} from './Contexts/Linkcontext'
import Connect from './components/Connect'
import Tableview from './components/Tableview'
import Diagram from './components/Diagram'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {
  return (
   <ModalProvider>
      <LinkProvider>
    <div className="App">
         <Entete/>
         <Connect/>
         <Maincon/>
     
    </div>
      </LinkProvider>
    </ModalProvider>
  );
}

export default App;
