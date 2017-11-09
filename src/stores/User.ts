import { ReduceStore } from "flux/utils";
import {IPayload, default as UserDispatcher} from "../dispatchers/UserDispatcher";

export interface IUserStoreState {

}

class UserStore extends ReduceStore<IUserStoreState, IPayload> {
  getInitialState() {
    return {}
  }

  reduce(s: IUserStoreState, payload: IPayload) {
    return s
  }
}

export default new UserStore(UserDispatcher);