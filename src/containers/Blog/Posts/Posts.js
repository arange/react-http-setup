import axios from 'axios';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }



    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
        this.props.history.push('/posts/' + id);
    }

    componentDidMount() {
        this.fetchData();
    }

    postDeletedHandler = (id) => {
        let updatedPosts = [...this.state.posts];
        updatedPosts = updatedPosts.filter((post, index) => {
            return post.id !== id;
        });
        this.setState({ posts: updatedPosts, selectedPostId: null });
    }

    postedDataHandler = () => {
        this.fetchData();
    }

    fetchData() {
        console.log("fetching data...");
        axios.get('/posts')
            // axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                // const posts = response.data;
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Pan'
                    }
                })
                this.setState({ posts: updatedPosts });
                // console.log(response.data);
            }).catch(error => {
                this.setState({ error: error.message });
            });
    }

    render() {
        let posts = <p style={{ textAlign: "center" }}>{this.state.error}</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link key={post.id} to={this.props.match.url + '/' + post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={this.postSelectedHandler.bind(this, post.id)} />
                    // </Link>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;