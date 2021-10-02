import './res/index.scss';
import { Redirect, Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import Rowmenu from './containers/Rowmenu';
import Pagehomepath from './containers/Pagehomepath';
import { dbkeys, fetcher } from './fetch';
import Pagesignsession from './containers/Pagesignsession';
import Pageitempreview from './containers/Pageitempreview';
import './res/fonts/Inter/stylesheet.scss';
import './res/fonts/Opensans/stylesheet.scss';
import sessionProvider from './res/sessionprovider';

function App() {
  const paths = {
    '/shop': Pagehomepath,
    '/book': Pagehomepath,
    '/sign': Pagesignsession,
    '/preview/:id': Pageitempreview,
    '/': Pagehomepath,
  };

  const [appstate, setAppstate] = useState({
    authorization: undefined,
    data: [],
    init: true,
  });

  useEffect(() => {
    const { 'Return all items in db': url0 } = dbkeys;
    const { authorization } = appstate;
    fetcher(url0, (response) => {
      setAppstate({ ...appstate, data: response });
    }, authorization).fetch();
    setAppstate({ ...appstate, init: false });
  }, []);

  const upstreamUser = (id, payload) => {
    const { authorization } = appstate;
    sessionProvider().upstreamUser(id, payload, authorization);
  };

  return (
    <div className="App col items_center">
      <Rowmenu upstreamUser={upstreamUser} />
      <div className="maxedcorebox_x23">
        <div className="corebox_0" />
        <Switch>
          {Object.entries(paths).map(({ 0: route, 1: View }) => (
            <Route key={route} path={route}>
              <View appdata={appstate} setAppstate={setAppstate} upstreamUser={upstreamUser} />
            </Route>
          ))}
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
