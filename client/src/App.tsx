import {useMemo, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './views/Home';
import Stats from './views/Stats';
import NavBar from './components/NavBar';
import {GraphType} from './types';

const savedGraphType = localStorage.getItem('graphType') as GraphType || GraphType.BAR;
const savedId = localStorage.getItem('id') || null;

function App() {

  const [id, setId] = useState(savedId);
  const userLoggedIn = useMemo(() => id ? true : false, [id]);
  const [graphType, setGraphType] = useState(savedGraphType);

  function logout() {
    setId(null);
    localStorage.clear();
  }

  return (
    <Router>
      <NavBar graphType={graphType} setGraphType={setGraphType} logout={logout} userLoggedIn={userLoggedIn} />
      <Switch>
        <Route exact path='/'>
          <Home id={id} setId={setId} />
        </Route>
        <Route exact path='/stats'>
          <Stats id={id} graphType={graphType} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
