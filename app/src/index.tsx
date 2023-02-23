import 'react-calendar/dist/Calendar.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import { router } from './app/router/Route';
import { store, StoreContext } from './app/stores/store';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
reportWebVitals();
