import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from '../state';

const AllTheProviders = ({ children }) => {
  return (
    <Router>
      <Provider store={createStore()}>{children}</Provider>
    </Router>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
