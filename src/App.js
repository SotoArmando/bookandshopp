import logo from './logo.svg';
import './res/index.scss';
import Colummenu from './components/Columnmenu';
import { Redirect, Route, Switch } from 'react-router';
import Rowmenu from './containers/Rowmenu';
import Pagehomepath from './containers/Pagehomepath';
import { useEffect, useState } from 'react';
import { dbkeys, fetcher } from './fetch';
import Pagesignsession from './containers/Pagesignsession';
import Pageitempreview from './containers/Pageitempreview';
import './res/fonts/Inter/stylesheet.css';
import './res/fonts/Opensans/stylesheet.css';

function App() {
  let paths = {
    "/shop": Pagehomepath,
    "/book": Pagehomepath,
    "/sign": Pagesignsession,
    "/preview/:id": Pageitempreview,
    "/": Pagehomepath,
  };

  let [appstate,setAppstate] = useState({
    makeid: 100,
    year: 2015,
    data: [],
    init: true
  });

  function upstreamUser(id,payload) {
    debugger
    delete payload.id
    if (id) {
      const {users_crud:url0} =  dbkeys;
      fetcher(url0+`/${id}?`+new URLSearchParams({user:JSON.stringify(payload)}).toString()).fetchcrudOperation("PATCH")
    }
  }

  useEffect(() => {
    const {init,makeid,year} = appstate;
    const {"Return all items in db": url0}= dbkeys;
    if (init) {
      fetcher([url0],(response)=> { 
        
        setAppstate({...setAppstate,data:response[0]})
      }).fetchandwaitAll()
      setAppstate({...appstate,init:false})
    }
  })

  return (
    <div className="App col items_center">
      <Rowmenu upstreamUser={upstreamUser}/>
      <div className="maxedcorebox_x23">
      <div className="corebox_0"/>
      <Switch>
        {Object.entries(paths).map(({ 0: route, 1: View }) => (
          <Route path={route}>
            <View appstate={appstate} upstreamUser={upstreamUser} />
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
      </div>
    </div>
  );
}

export default App;
