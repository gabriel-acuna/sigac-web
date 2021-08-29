import Layout from './components/Layout';

import {

  BrowserRouter

} from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <Layout/>
        </PersistGate>
        </Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;
