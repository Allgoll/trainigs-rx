import { IUserStoreState } from '../stores/User';
// import UserDispatcher from "../dispatchers/UserDispatcher";
import * as Rx from 'rxjs';

export enum EUserActions {
  registerUser
}

// function actionFactory(action: EUserActions, data: IUserStoreState) {
//   UserDispatcher.dispatch({action, data})
// }

export const UserActions = {
  registerUser: (u: IUserStoreState) => {
    Rx.Observable.ajax({
      url: '/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: u})
    }).subscribe((e) => {console.log(e)})
  }
}
