import * as React from 'react';

import MenuItem from 'semantic-ui-react/dist/commonjs/collections/Menu/MenuItem';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import User from './User';

export default function Bar() {
  return (
    <Menu color={'blue'} secondary inverted>
      <MenuItem icon={'settings'}/>
      <MenuItem>
        <Header content={'Bug Tracker'} inverted/>
      </MenuItem>
      <MenuItem position={'right'}>
        <User/>
      </MenuItem>
    </Menu>
  );
}