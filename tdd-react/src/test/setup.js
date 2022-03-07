import { render } from '@testing-library/react';
import AuthContextWrapper from '../state/AuthContextWrapper';
import { BrowserRouter as Router } from 'react-router-dom';

const AllTheProviders = ({ children }) => {
  return (
    <Router>
      <AuthContextWrapper>{children}</AuthContextWrapper>
    </Router>
  );
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from '@testing-library/react';

export { customRender as render };
