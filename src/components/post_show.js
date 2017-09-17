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
		// match.params.id is provided by react-router-dom
		const id = this.props.match.params.id;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	};

	render() {
		const post = this.props.post;

		if (!post) {
			return <div>Loading...</div>
		}

		return (
			<div>
				<Link to="/" className="btn btn-primary">Back To Index</Link>
				<button
					className="btn btn-danger float-right"
					onClick={this.onDeleteClick}
				>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		)
	}
}

// ownProps is essentially equal to this.props
function mapStateToProps(state, ownProps) {
	return {
		post: state.posts[ownProps.match.params.id]
	};
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);