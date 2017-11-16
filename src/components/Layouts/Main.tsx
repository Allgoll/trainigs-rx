import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router';
import { RegistrationForm }        from '../Registration';
import { TopBar }                  from '../topBar';
import UserStore                   from '../../stores/UserStore';
import { Auth }                    from '../Auth';
import Grid                        from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

export function Main() {
  return(
    <div>
      <TopBar/>
      <Grid container>
        <Grid.Column width={4}/>
        <Grid.Column width={8}>
          <Switch>
            <Route exact path={'/sign_in'} component={RegistrationForm}/>
            {!UserStore.authorized() && <Redirect to={'/auth'} path={'/'} exact/>}
            <Route exact path={'/auth'} component={Auth}/>
          </Switch>
        </Grid.Column>
        <Grid.Column width={4}/>
      </Grid>
    </div>
  );
}