import Axios from 'axios';
import React, { Component } from 'react';
import './NewPost.css';
import Spinner from '../../../components/UI/Spinner/Spinner';


class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Pan',
        waiting: false
    }

    componentDidMount() {
        // console.log(this.props);
    }

    postDataHandler = () => {
        
        const post = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };
        this.setState({waiting: true});
        Axios.post("/posts", post)
            .then(response => {
                this.setState({waiting: false});
                this.props.history.replace('/');
            });
    }

    render() {
        return (
                <div className="NewPost">
                    {this.state.waiting ? <Spinner /> : null}
                    <h1>Add a Post</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                    <label>Content</label>
                    <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                    <label>Author</label>
                    <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                        <option value="Pan">Pan</option>
                        <option value="Rachel">Rachel</option>
                    </select>
                    <button onClick={this.postDataHandler}>Add Post</button>
                </div>
        );
    }
}

export default NewPost;