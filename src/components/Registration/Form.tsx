import * as React      from 'react';

import {
  RouteComponentProps
}                      from 'react-router';
import {UserActions}   from '../../actions/UserActions';
import Segment         from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Divider         from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Message         from 'semantic-ui-react/dist/commonjs/collections/Message/Message';
import Header          from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import Button          from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Form            from 'semantic-ui-react/dist/commonjs/collections/Form/Form';

interface IRFormProps extends RouteComponentProps<{}> {

}

interface IRFormState {
  name?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
  errors?: Array<{title: string, value: Array<string>}>;
}

const formFields: Array<{name: string, label: string, type: string}> = [
  {name: 'name', label: 'Имя', type: 'text'},
  {name: 'email', label: 'Почта', type: 'text'},
  {name: 'password', label: 'Пароль', type: 'password'},
  {name: 'password_confirm', label: 'Подтверждение пароля', type: 'password'}
];

export default class RForm extends React.PureComponent<IRFormProps, IRFormState> {

  state: IRFormState = {
    errors: []
  };

  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Header content="Registration" dividing/>
          <Message error visible={this.state.errors!.length > 0}>
            <Message.Header content={'При регистрации возникли ошибки'}/>
            <Message.Content>
              <Message.List>
                {this.state.errors!.map(error => [
                  <Message.Item key={error.title}><b>{error.title}</b></Message.Item>,
                  error.value.map((val => <Message.Item>{val}</Message.Item>))
                ])}
              </Message.List>
            </Message.Content>
          </Message>
          {formFields.map((f) =>
            <Form.Input
              {...f}
              key={f.name}
              value={this.state[f.name] || ''}
              onChange={this.handleChange}
            />
          )}
          <Divider/>
          <Button.Group>
            <Button basic primary content={'Подтвердить'} type={'submit'}/>
            <Button basic primary negative content={'Отклонить'} type={'button'}/>
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
    UserActions.registerUser(this.state).subscribe({
      next: this.onApiSuccess,
      error: (err) => this.onApiError(err.xhr.response)
    });
  }

  private onApiSuccess = () => {
    this.props.history.replace('/auth');
  }

  private onApiError = (errors: {[n: string]: Array<string>}) => {
    const mappedErrors = Object.keys(errors).map(key => {
      const title = formFields.find(({name}) => name === key)!.label;
      return {title, value: errors[key]};
    });
    this.setState({errors: mappedErrors});
  }
}
