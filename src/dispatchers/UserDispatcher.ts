import { EUserActions } from '../actions/UserActions';
import * as Dispatcher  from 'flux/lib/Dispatcher';

export interface IPayload {
  action: EUserActions;
  data: {};
}

class UserDispatcher extends Dispatcher<IPayload> {}

export default new UserDispatcher();