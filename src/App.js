import logo from './logo.svg';
import './res/index.scss';
import Colummenu from './components/Columnmenu';
import { Redirect, Route, Switch } from 'react-router';
import Rowmenu from './containers/Rowmenu';
import Pagehomepath from './containers/Pagehomepath';
import { useEffect, useState } from 'react';
import { dbkeys, fetcher } from './fetch';

function App() {

  let paths = {
    "/": Pagehomepath,
    "/shop": Pagehomepath,
    "/book": Pagehomepath,
  };

  let [appstate,setAppstate] = useState({
    makeid: 100,
    year: 2015,
    data: [],
    init: true
  });

  useEffect(() => {
    const {init,makeid,year} = appstate;
    const {"Return all items in db": url0}= dbkeys;
    if (init) {
      fetcher([url0],(response)=> { 
        debugger
        setAppstate({...setAppstate,data:response[0]})
      }).fetchandwaitAll()
      setAppstate({...appstate,init:false})
    }
  })

  return (
    <div className="App col items_center">
      <Rowmenu/>
      <div className="maxedcorebox_x23">
      <div className="corebox_0"/>
      <Switch>
        {Object.entries(paths).map(({ 0: route, 1: View }) => (
          <Route path={route}>
            <View appstate={appstate} />
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
      </div>
    </div>
  );
}

export default App;
