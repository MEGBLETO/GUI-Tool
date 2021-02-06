import './App.css';
import Entete from './components/Entete'
import Maincon from './components/Maincon'
import {LinkProvider} from './Contexts/Linkcontext'

function App() {
  return (
    <div className="App">
      <LinkProvider>
         <Entete/>
         <Maincon/>
      </LinkProvider>

    </div>
  );
}

export default App;
