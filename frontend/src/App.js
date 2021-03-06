import './App.css';
import Entete from './components/Entete'
import Maincon from './components/Maincon'
import {ModalProvider} from './Contexts/Modalcontext'
import {LinkProvider} from './Contexts/Linkcontext'
import Connect from './components/Connect'


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
