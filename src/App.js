import './res/index.scss';
import { Redirect, Route, Switch } from 'react-router';
import { useEffect, useState } from 'react';
import Rowmenu from './containers/Rowmenu';
import Pagehomepath from './containers/Pagehomepath';
import { dbkeys, fetcher } from './fetch';
import Pagesignsession from './containers/Pagesignsession';
import Pageitempreview from './containers/Pageitempreview';
import './res/fonts/Inter/stylesheet.css';
import './res/fonts/Opensans/stylesheet.css';

function App() {
  const paths = {
    '/shop': Pagehomepath,
    '/book': Pagehomepath,
    '/sign': Pagesignsession,
    '/preview/:id': Pageitempreview,
    '/': Pagehomepath,
  };

  const [appstate, setAppstate] = useState({
    makeid: 100,
    year: 2015,
    data: [],
    init: true,
  });
  function deleteIdkey(a) {
    // https://eslint.org/docs/rules/no-param-reassign
    // eslint-disable-next-line no-param-reassign
    delete a.id;
  }

  const upstreamUser = (id, payload) => {
    deleteIdkey(payload);
    if (id) {
      const { users_crud: url0 } = dbkeys;
      fetcher(`${url0}/${id}?${new URLSearchParams({ user: JSON.stringify(payload) }).toString()}`).fetchcrudOperation('PATCH');
    }
  };

  useEffect(() => {
    const { 'Return all items in db': url0 } = dbkeys;
    fetcher(url0, (response) => {
      setAppstate({ ...appstate, data: response });
      console.log(response);
      console.log(appstate);
    }).fetch();
    setAppstate({ ...appstate, init: false });
  }, []);

  return (
    <div className="App col items_center">
      <Rowmenu upstreamUser={upstreamUser} />
      <div className="maxedcorebox_x23">
        <div className="corebox_0" />
        <Switch>
          {Object.entries(paths).map(({ 0: route, 1: View }) => (
            <Route key={route} path={route}>
              <View appdata={appstate} upstreamUser={upstreamUser} />
            </Route>
          ))}
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
