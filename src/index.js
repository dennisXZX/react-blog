import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import registerServiceWorker from './registerServiceWorker';

// import reducers
import reducers from './reducers';

// import components
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/post_show';

import './index.css';

// apply middleware to store
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				{/* wrap routes in a Switch component so only one route is matched at a time */}
				{/* place the most specific route at the top */}
				<Switch>
					<Route path="/posts/new" component={PostsNew} />
					<Route path="/posts/:id" component={PostsShow} />
					<Route path="/" component={PostsIndex} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
