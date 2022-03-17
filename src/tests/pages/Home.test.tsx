import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/Home';

test('renders learn react link', () => {
  render(<Home editMode={false} />);
});
