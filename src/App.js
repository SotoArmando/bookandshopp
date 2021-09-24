import logo from './logo.svg';
import './res/index.scss';
import Colummenu from './components/Columnmenu';
import { Redirect, Route, Switch } from 'react-router';
import Rowmenu from './components/Rowmenu';
import Pagehomepath from './components/Pagehomepath';
import { useEffect } from 'react';
import { dbkeys, fetcher } from './fetch';

function App() {

  let paths = {
    "/": Pagehomepath,
  };
  let [appstate,setAppstate] = {
    makeid: 441,
    year: 2015,
    data: [],
    init: true,
  };
  useEffect(() => {
    const {init} = appstate;
    const {"Get all Models by Make ID and Year": url0,"Get Article image as media content":url1}= dbkeys;
    if (init) {
      fetcher([url0,url1],(response)=> { 
        debugger;
      }).fetchandwaitAll()
      setAppstate({...appstate,init:false})
    }
  })
  return (
    <div className="App">
      <Rowmenu/>
      <Switch>
        {Object.entries(paths).map(({ 0: route, 1: View }) => (
          <Route path={route}>
            <View />
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
