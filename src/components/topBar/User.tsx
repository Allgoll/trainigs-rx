import * as React from 'react';

import UserStore, {IUserStoreState} from '../../stores/UserStore';
import {storeDecorator}             from '../../utils/decorators';
import Header                       from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Image                        from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import List                         from 'semantic-ui-react/dist/commonjs/elements/List/List';

interface IUserProps {
  user?: IUserStoreState;
}

@storeDecorator(UserStore, 'user')
export default class User extends React.PureComponent<IUserProps, {}> {

  constructor(props: IUserProps) {
    super(props);
  }

  render() {
    const {user} = this.props;
    return (
      <List inverted>
        <List.Item>
          {user && user.token && <Image avatar src={`/images/ade.jpg`} />}
          <List.Content>
            <Header>{user ? user.name : ''}</Header>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}
