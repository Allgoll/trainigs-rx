import { AbstractActionFactory } from '../utils/ActionFactory';
import { IUserStoreState }       from '../stores/UserStore';
import { AjaxResponse }          from 'rxjs/Rx';
import { Observable }            from 'rxjs/Observable';
import UserDispatcher            from '../dispatchers/UserDispatcher';
import Api                       from '../api/api';

export enum EUserActions {
  registerUser,
  auth,
  getInfo
}

const ActionFactory = AbstractActionFactory(UserDispatcher);

export const UserActions = {
  registerUser(user: IUserStoreState): Observable<AjaxResponse> {
    return ActionFactory.ApiAction(
      EUserActions.registerUser,
      Api.post('/users', JSON.stringify({user})).pluck('response')
    );
  },
  auth(auth: Partial<IUserStoreState>): Observable<string> {
    return ActionFactory.ApiAction(
      EUserActions.auth,
      Api.post('/users/auth', JSON.stringify({auth})).pluck('response').pluck('jwt')
    );
  },
  userInfo(): Observable<IUserStoreState> {
    return ActionFactory.ApiAction(
      EUserActions.getInfo,
      Api.get('/users/1').pluck('response')
    );
  }
};
