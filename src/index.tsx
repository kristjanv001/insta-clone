import React from 'react';
import { AuthContextProvider } from "./authContext"
import { PostsContextProvider } from "./postsContext"
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// export { PostsContextProvider, PostsContext }