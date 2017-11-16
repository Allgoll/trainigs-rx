import Dispatcher = require('flux/lib/Dispatcher');
import { Observable } from 'rxjs/Observable';

export function AbstractActionFactory<TActions>(dispatcher: Dispatcher<{}>) {
  return {
    ApiAction<T>(action: TActions, observable: Observable<T>): Observable<T> {
      return observable.do((data) => dispatcher.dispatch({action, data}));
    },
    BasicAction<TData>(action: TActions, data: TData) {
      dispatcher.dispatch({action, data});
    }
  };
}