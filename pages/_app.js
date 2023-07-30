import Layout from '@/component/Layout';
import { initializeStore } from '@/redux/configureStore';
import '@/styles/style.scss'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }) {

  const { store, persistor } = initializeStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>)
}
