import './res/index.scss';
import { Redirect, Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import Rowmenu from './containers/Rowmenu';
import Pagehomepath from './containers/Pagehomepath';
import { dbkeys, fetcher } from './fetch';
import Pagesignsession from './containers/Pagesignsession';
import Pageitempreview from './containers/Pageitempreview';
// import './res/fonts/Inter/stylesheet.scss';
// import './res/fonts/Opensans/stylesheet.scss';
import sessionProvider from './res/sessionprovider';
import Pagelifestyle from './containers/Pagelifestyle';

function App() {
  const paths = {
    '/shop': Pagehomepath,
    '/book': Pagehomepath,
    '/sign': Pagesignsession,
    '/style': Pagelifestyle,
    '/preview/:id': Pageitempreview,
    '/': Pagehomepath,
  };

  const [appstate, setAppstate] = useState({
    authorization: '',
    data: [],
    init: true,
    ColumnMenuisOpen: false,
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

  const { ColumnMenuisOpen } = appstate;

  const handleColumnMenuisOpenSwitch = (val = !ColumnMenuisOpen) => {
    setAppstate({ ...appstate, ColumnMenuisOpen: val });
    return val;
  };

  return (
    <div className="App col items_center bodyheight">
      <Rowmenu
        upstreamUser={upstreamUser}
        handleColumnMenuisOpenSwitch={handleColumnMenuisOpenSwitch}
      />

      <Switch>
        {Object.entries(paths).map(({ 0: route, 1: View }) => (
          <Route key={route} path={route}>
            <div
              className="row start items_start gbasis_30 allsize bodyheight back_2"
            >
              {ColumnMenuisOpen ? <div className="corebox_x14 maxedcorebox_x14 mobilehide  " /> : []}
              <div className="col bodyheight">
                <View appdata={appstate} setAppstate={setAppstate} upstreamUser={upstreamUser}>
                  <div className="corebox_4" />
                </View>
              </div>
            </div>
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
