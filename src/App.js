import logo from './logo.svg';
import './App.css';

function App() {
  let paths = {
    "": Portraitmeals,
  };
  return (
    <div className="App">
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
