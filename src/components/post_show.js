import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
	componentDidMount() {
		// match.params.id is provided by react-router-dom
		const id = this.props.match.params.id;
		this.props.fetchPost(id);
	}

	onDeleteClick = () => {
		// match.params.id is provided by react-router-dom, which grabs the id wildcard in the url
		const id = this.props.match.params.id;
		this.props.deletePost(id, () => {
			// history.push() is provided by react-router-dom, which
			this.props.history.push('/');
		});
	};

	render() {
		const post = this.props.post;

		// display a loading message if the post is being returned from an AJAX call
		if (!post) {
			return <div>Loading...</div>
		}

		return (
			<div>
				<div className="post-nav">
					<Link to="/" className="btn btn-primary">Back To Index</Link>
					<button
						className="btn btn-danger float-right"
						onClick={this.onDeleteClick}
					>
						Delete Post
					</button>
				</div>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		)
	}
}

// the second argument ownProps is the props that passed to the component
// which is essentially equal to this.props
// here we just map a single post to the props, instead of all the posts
function mapStateToProps(state, ownProps) {
	return {
		post: state.posts[ownProps.match.params.id]
	};
}

// we use a shorthand for mapDispatchToProps as the second argument
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);