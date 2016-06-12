
import 'css/common'
import { createStore, combineReducers,compose,applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import rootRoute from './resource/assets/route/config'
import rootReducer from 'assets/reducers'
import reduxLogger from 'redux-logger'
import Root from 'page/root/root'
import DevTools from './resource/assets/devTools/DevTools';
import { devTools, persistState } from 'redux-devtools';

console.log(rootRoute);

const logger = reduxLogger();
const createStoreWithMiddleware = compose(
		applyMiddleware(thunk,logger),
		DevTools.instrument(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
	)(createStore);
const reducer = combineReducers({
  routing: routerReducer,
  reducer: rootReducer
})
const store = createStoreWithMiddleware(reducer)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <div>
		<Provider store={store}>
		  	<Router history={history} routes={rootRoute}/>
		</Provider>
		{/*<DevTools store={store}/>*/}
	</div>,
  document.getElementById('app')
)