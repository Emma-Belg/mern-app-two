import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

    state = {
        title: '',
        body: '',
        posts: []
    };

    componentDidMount() {
        this.getBlogPost();
    }

    getBlogPost = () => {
        axios.get('/api')
            .then((response) => {
                const data = response.data;
                this.setState({posts: data});
                console.log('Data has been retrieved');
            })
            .catch(() => {
                alert('Problem retrieving data')
            });
    }

    handleChange = ({target}) => {
        const {name, value} = target;

        this.setState({
            //dynamically pass the value of the title or the body in the below forms
            [name]: value
        });
    };

    submit = (event) => {
        event.preventDefault();

        const payload = {
            title: this.state.title,
            body: this.state.body
        };
        axios({
            url: '/api/save',
            method: 'POST',
            data: payload
        }).then(() => {
            console.log('Data has been sent to the server');
            this.clearUserInputs();
            this.getBlogPost();
        })
            .catch(() => {
                console.log('Internal server error')
            });
    };

    clearUserInputs = () => {
        this.setState({
            title: '',
            body: ''
        });
    };

    displayBlogPosts = (posts) => {
        if (!posts.length) return null;
        return posts.map((post, index) => (
            <div key={index} className="blog-post_display">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ));
    };

    render() {
        console.log('state', this.state);
        //jsx
        return (
            <div className='app'>
                <h2>Welcome to the App</h2>
                <div className='flex-container'>
                        <form onSubmit={this.submit}>
                            <div className='form-input'>
                                <input type='text'
                                       name='title'
                                       placeholder='Enter title'
                                       value={this.state.title}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className='form-input'>
                        <textarea name='body'
                                  placeholder='Enter the body of your blog'
                                  cols='30'
                                  rows='10'
                                  value={this.state.body}
                                  onChange={this.handleChange}>
                        </textarea>
                            </div>
                            <button>Submit</button>
                        </form>
                        <div className="blog-posts">
                            {this.displayBlogPosts(this.state.posts)}
                        </div>
                </div>
            </div>
        )
    }
}

export default App;
