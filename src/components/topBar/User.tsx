import * as React from 'react';
import List from "semantic-ui-react/dist/commonjs/elements/List/List";
import Image from "semantic-ui-react/dist/commonjs/elements/Image/Image";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";

interface IUserProps {

}

interface IUserState {

}

export default class User extends React.PureComponent<IUserProps, IUserState> {

  constructor(props: IUserProps) {
    super(props);
  }

  render() {
    return (
      <List inverted>
        <List.Item>
          <Image avatar src={`/images/ade.jpg`} />
          <List.Content>
            <Header>User Name</Header>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}
