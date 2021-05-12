import { Route } from 'react-router';
import './App.css';
import Layout from './components/layout/Layout'

function App() {
  return (
    <div className="App">
     <Route exact path="/" component={Layout} />
    </div>
  );
}

export default App;
