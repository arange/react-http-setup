import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                Axios.get('/posts/' + this.props.id)
                    // Axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }

    deletePostHandler = (id) => {
        // send delete request
        Axios.delete("/posts/" + id)
            .then(response => {
                if (response.status === 200) {
                    this.props.delete(id);
                    this.setState({ loadedPost: null });
                }
            });
    }

    render() {
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

        if (this.props.id) {
            post = <p style={{ textAlign: "center" }}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler.bind(this, this.state.loadedPost.id)}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;