import { IPayload, default as UserDispatcher } from '../dispatchers/UserDispatcher';
import { EUserActions }                        from '../actions/UserActions';
import { ReduceStore }                         from 'flux/utils';

export interface IUserStoreState {
  name?: string;
  email?: string;
  token?: string;
}

class UserStore extends ReduceStore<IUserStoreState, IPayload> {

  getInitialState() {
    return {};
  }

  authorized(): boolean {
    const token = this.getState().token;
    return !!token && token.length > 0;
  }

  reduce(s: IUserStoreState, {action, data}: IPayload) {
    switch (action) {
      case EUserActions.auth:
        return {token: (data as string), ...s};
      case EUserActions.getInfo:
        return {...s, ...data};
      default:
        return s;
    }
  }
}

export default new UserStore(UserDispatcher);