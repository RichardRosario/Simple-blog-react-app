import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost'


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'RR'
                }
            });
            this.setState({posts: updatedPosts});
            //console.log(response);
        }) 
        .catch(error =>{
            this.setState({error: true})
            //console.log(error);
        });
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({pathname: '/' + id})
        this.props.history.push('/posts/' + id);
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return (
                // <Link to={'/' + post.id}  >
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author} 
                        clicked={() => this.postSelectedHandler(post.id)} />
                // </Link>
                );
            });
            
        }
        return(
            <div>
            <section className="Posts">
            {posts}
        </section>
            <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
        </div>
        )
    }
}

export default Posts;