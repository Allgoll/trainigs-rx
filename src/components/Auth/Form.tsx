import * as React from 'react';

import { RouterProps } from 'react-router';
import {UserActions}   from '../../actions/UserActions';
import Segment         from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Divider         from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Message         from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Header          from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Button          from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Form            from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import {AjaxError} from 'rxjs/Rx';

interface IAuthFormProps extends RouterProps {

}

interface IAuthFormState {
  email?: string;
  password?: string;
  error?: boolean;
}

const formFields: Array<{name: string, label: string, type: string}> = [
  {name: 'email', label: 'Почта', type: 'text'},
  {name: 'password', label: 'Пароль', type: 'password'},
];

export default class AuthForm extends React.PureComponent<IAuthFormProps, IAuthFormState> {

  state: IAuthFormState = {
    error: false
  };

  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Header content="Авторизация" dividing/>
          <Message error visible={this.state.error}>
            <Message.Header content={'При авторизации возникли ошибки'}/>
            <Message.Content>
              Почта или пароль указанны не верно
            </Message.Content>
          </Message>
          {formFields.map((f) =>
            <Form.Input
              key={f.name}
              {...f}
              value={this.state[f.name] || ''}
              onChange={this.handleChange}
            />
          )}
          <Divider/>
          <Button.Group>
            <Button basic primary content={'Подтвердить'} type={'submit'}/>
          </Button.Group>
        </Form>
      </Segment>
    );
  }

  private handleChange = ({currentTarget: {name, value}}: React.SyntheticEvent<HTMLInputElement>) => {
    this.setState({[name]: value});
  }

  private handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserActions.auth(this.state).subscribe({
      next: this.onApiSuccess,
      error: (err: AjaxError) => this.onApiError(err.xhr.status)
    });
  }

  private onApiSuccess = (jwt: string) => {
    UserActions.userInfo().subscribe(() => {
      this.props.history.replace('/');
    });
  }

  private onApiError = (status: number) => {
    if (status === 404) {
      this.setState({error: true});
    }
  }
}
