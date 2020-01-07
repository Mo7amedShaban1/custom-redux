import React from "react";
import Context from "./react-redux-context";

export default mapStateToProps => Component => {
   class Receiver extends React.Component {
      componentDidMount() {
         const { subscribe } = this.props.store;
         this.unsubscribe = subscribe(() => {
            this.forceUpdate();
         });
      }

      componentWillUnmount() {
         this.unsubscribe();
      }

      render() {
         const { dispatch, getState } = this.props.store;
         const state = getState();
         const stateNeeded = mapStateToProps(state);
         return <Component {...stateNeeded} dispatch={dispatch} />;
      }
   }

   class ConnectedComponent extends React.Component {
      render() {
         return (
            <Context.Consumer>
               {store => <Receiver store={store} />}
            </Context.Consumer>
         );
      }
   }

   return ConnectedComponent;
};
