import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { Provider } from 'react-redux'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'
import { getUsers } from './actions/users.action'
import { getPosts } from './actions/post.action'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
store.dispatch(getUsers())
store.dispatch(getPosts())

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
