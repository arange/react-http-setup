import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        console.log("fetching data...");
        axios.get('/posts')
            // axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                // const posts = response.data.slice(0, 4);
                const posts = response.data;
                // const updatedPosts = posts.map(post => {
                //     return {
                //         ...post,
                //         author: 'Pan'
                //     }
                // })
                this.setState({ posts: posts });
                // console.log(response.data);
            }).catch(error => {
                this.setState({ error: error.message });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
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

    render() {
    let posts = <p style={{ textAlign: "center" }}>{this.state.error}</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={this.postSelectedHandler.bind(this, post.id)} />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} delete={this.postDeletedHandler} />
                </section>
                <section>
                    <NewPost postData={this.postedDataHandler} />
                </section>
            </div>
        );
    }
}

export default Blog;