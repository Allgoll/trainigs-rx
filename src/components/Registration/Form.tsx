import * as React from 'react';
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment/Segment";
import Form from "semantic-ui-react/dist/commonjs/collections/Form/Form";
import Header from "semantic-ui-react/dist/commonjs/elements/Header/Header";
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider/Divider";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import {UserActions} from "../../actions/UserActions";

interface IRFormProps {

}

interface IRFormState {
  name?: string;
  email?: string;
  password?: string;
  password_confirm?: string;
}

const formFields: Array<{name: string, label: string, type: string}> = [
  {name: 'name', label: 'Имя', type: 'text'},
  {name: 'email', label: 'Почта', type: 'text'},
  {name: 'password', label: 'Пароль', type: 'password'},
  {name: 'password_confirm', label: 'Подтверждение пароля', type: 'password'}
];

export default class RForm extends React.PureComponent<IRFormProps, IRFormState> {

  state: IRFormState = {}

  render() {
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Header content="Registration" dividing/>
          {formFields.map((f) =>
            <Form.Input
              {...f}
              value={this.state[f.name]}
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
    this.setState({[name]: value})
  }

  private handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    UserActions.registerUser(this.state);
  }
}
