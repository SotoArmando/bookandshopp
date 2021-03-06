import './res/index.scss';
import { Redirect, Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import Rowmenu from './containers/Rowmenu';
import Pagehomepath from './containers/Pagehomepath';
import { dbkeys, fetcher } from './fetch';
import Pagesignsession from './containers/Pagesignsession';
import Pageitempreview from './components/Pageitempreview';
// import './res/fonts/Inter/stylesheet.scss';
// import './res/fonts/Opensans/stylesheet.scss';
import sessionProvider from './res/sessionprovider';
import Pagelifestyle from './components/Pagelifestyle';
import Pagecommitsession from './containers/Pagecommitsession';
import Pagetestdrive from './components/Pagetestdrive';
import Pageappointments from './containers/Pageappointments';

function App() {
  const paths = {
    '/shop': Pagehomepath,
    '/configure': Pagecommitsession,
    '/appointments': Pageappointments,
    '/checkout': Pagecommitsession,
    '/testdrive': Pagetestdrive,
    '/book': Pagehomepath,
    '/sign': Pagesignsession,
    '/style': Pagelifestyle,
    '/preview/:id': Pageitempreview,
    '/': Pagehomepath,
  };

  const [authorization, setAuthorization] = useState('');
  const [items, setItems] = useState([]);
  const [ColumnMenuisOpen, setColumnMenuisOpen] = useState(false);

  useEffect(() => {
    const { 'Return all items in db': url0 } = dbkeys;
    fetcher(url0, (response) => {
      setItems(response);
    }, authorization).fetch();
  }, []);

  const upstreamUser = (id, payload, type,
    handleSuccesfulAuthorization,
    handleUnauthorizederrors) => {
    sessionProvider(payload, handleSuccesfulAuthorization, handleUnauthorizederrors)
      .upstreamUserAction(type, id, payload, authorization);
  };

  const handleColumnMenuisOpenSwitch = (val = !ColumnMenuisOpen) => {
    setColumnMenuisOpen(val);
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
              <div className="col bodyheight gbasis_20">
                <div className="maxedcorebox_4" />
                <View
                  items={items}
                  setAuthorization={setAuthorization}
                  authorization={authorization}
                  upstreamUser={upstreamUser}
                />
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
