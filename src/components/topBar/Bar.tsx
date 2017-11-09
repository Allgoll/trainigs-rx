import * as React from 'react';
import Menu from "semantic-ui-react/dist/commonjs/collections/Menu/Menu";
import MenuItem from "semantic-ui-react/dist/commonjs/collections/Menu/MenuItem";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import User from "./User";

interface IBarProps {

}

interface IBarState {

}

export default class Bar extends React.PureComponent<IBarProps, IBarState> {

  constructor(props: IBarProps) {
    super(props);
  }

  render() {
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
}
