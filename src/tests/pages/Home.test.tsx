import React from 'react';

import Home from '../../pages/navigationBar/Home';

import { render } from '@testing-library/react';

test('renders learn react link', () => {
  render(<Home editMode={false} />);
});
