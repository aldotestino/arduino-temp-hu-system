import {useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './views/Home';
import Stats from "./views/Stats";
import NavBar from "./components/NavBar";

const savedGraphType = localStorage.getItem('graphType') || 'bar';
const savedId = localStorage.getItem('id') || null;

function App() {

  const [id, setId] = useState(savedId);
  const [graphType, setGraphType] = useState(savedGraphType);

  function logout() {
    setId(null);
    localStorage.clear();
  }

  return (
    <Router>
      <NavBar graphType={graphType} setGraphType={setGraphType} logout={logout} />
      <Switch>
        <Route exact path="/">
          <Home id={id} setId={setId} />
        </Route>
        <Route exact path="/stats">
          <Stats id={id} graphtType={graphType} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
