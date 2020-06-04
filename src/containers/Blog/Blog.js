import React, { Component, Suspense } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import errorPage from '../../components/UI/ErrorPage/ErrorPage';
import './Blog.css';
import Posts from './Posts/Posts';
// import asyncComponent from '../../hoc/asyncComponent';

const NewPost = React.lazy(() => import('./NewPost/NewPost'));

// const AsyncNewPost = asyncComponent(() => {
//   return import('./NewPost/NewPost');
// });

class Blog extends Component {
  state = {
    authed: true
  }

  render() {
    return (
      <div className='Blog'>
        <header>
          <nav>
            <ul>
              <li><NavLink
                to='/posts'
                activeClassName='active'
                activeStyle={{
                  color: "#feceab",
                  textDecoration: "underline"
                }}
              >Home</NavLink></li>
              <li><NavLink to={{
                pathname: '/new-post',
                hash: '#submit',
                search: '?quick-submit=true'
              }}>New Post</NavLink></li>

            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.authed ? <Route
            path='/new-post'
            render={() => (
              <Suspense fallback={<div>loading...</div>}>
                <NewPost />
              </Suspense>
            )} /> : null}
          <Route path='/posts' component={Posts} />
          <Redirect from="/" exact to="/posts" />
          <Route render={errorPage} />
          {/* <Route path='/' component={Posts} /> */}
          {/* <Route path='/:id' exact component={FullPost} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;