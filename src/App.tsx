import * as React from 'react';
import { RegistrationForm } from './components/Registration';
import { TopBar } from './components/topBar';
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid/Grid";

class App extends React.Component {
  render() {
    return (
      <div>
        <TopBar/>
        <Grid container>
          <Grid.Column width={4}/>
          <Grid.Column width={8}>
            <RegistrationForm/>
          </Grid.Column>
          <Grid.Column width={4}/>
        </Grid>
      </div>
    );
  }
}

export default App;
