import * as React            from 'react';

import * as FluxReduceStore  from 'flux/lib/FluxReduceStore';
import { EventSubscription } from 'fbemitter';

/**
 * Декоратор, оборачивает декорируемый компонент в StoreConnector который управляет подпиской, и спускает состояние
 * стора в качестве свойств.
 * @param {T} store - Стор на который требуется подписаться, по умолчанию вызывает store.constructor.name
 * @param {string} name - Название свойства через которое в декорируемый объект будет передано состояние стора
 * @returns {Function<React.ComponentClass>}
 */
export function storeDecorator<T extends FluxReduceStore<{}, {}>>(store: T, name?: string) {
  // At now on ts 2.5.3 we have no way to properly define returned expression
  // tslint:disable-next-line
  return function testDecorator(Component: React.ComponentClass): any {
    return class StoreConnector extends React.Component {
      subscription: EventSubscription;
      name: string;

      constructor(props: {}) {
        super(props);
        this.name = name || store.constructor.name;
        this.state = {
          [this.name]: store.getState()
        };
      }

      shouldComponentUpdate(): boolean {
        return true;
      }

      componentDidMount(): void {
        this.subscription = store.addListener(() => {
          this.setState({[this.name]: store.getState()});
        });
      }

      componentWillUnmount(): void {
        this.subscription.remove();
      }

      render() {
        return (<Component {...this.props} {...this.state}/>);
      }
    };
  };
}