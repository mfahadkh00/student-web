import { applyMiddleware, createStore, Store } from "redux";
import { IApplicationState, rootReducer, rootSaga } from "state/ducks/index";
import sagaMiddleware from "state/middleware/saga";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureAppStore(
  initialState: IApplicationState
): Store<IApplicationState> {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
