import Axios from 'axios';
import React, { Component } from 'react';
import './FullPost.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    loadData = () => {
        // console.log(this.props);
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
                // this.state.loadedPost ? console.log(this.state.loadedPost.id) : console.log('loading post');
                // console.log(+this.props.match.params.id);
                Axios.get('/posts/' + this.props.match.params.id)
                    .then(response => {
                        console.log(response);
                        this.setState({ loadedPost: response.data});
                    });
            }
        }
    }

    componentDidMount() {
        // console.log(this.props);
        // console.log('[FullPost] componentDidMount');
        this.loadData();
    }

    componentDidUpdate() {
        // console.log('[FullPost] componentDidUpdate');
        // console.log(this.state.loadedPost);
        this.loadData();
    }



    deletePostHandler = (id) => {
        // send delete request
        Axios.delete("/posts/" + id)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ loadedPost: null });
                    this.props.history.push('/');
                }
            });
    }

    render() {
        let post = <p style={{ textAlign: "center" }}>The post has been deleted!</p>;

        if (this.props.match.params.id) {
            post = <Spinner />;
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

// export default withLoading(FullPost, Axios, '/posts');
export default FullPost;