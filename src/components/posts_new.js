import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from "../actions";

class PostsNew extends Component {
	// renderField() is used to display UI in the field
	// field.input contains all the event handlers
	// field.meta contains meta info related to the field, such as in which state the field is in
	renderField = (field) => {
		// apply 'has-danger' class if the form field is in touched state and there is an error reported
		const inputClassName = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

		return (
			<div className={inputClassName}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="form-control-feedback">
					{/* only shows error when the input fields are in a touched state */}
					{field.meta.touched ? field.meta.error : ''}
				</div>
			</div>
		)
	};

	// the argument values is an object containing all form field values
	onSubmit = (values) => {
		this.props.createPost(values, () => {
			// history object is passed via Route component from react-router-dom
			this.props.history.push('/');
		});
	};

	render() {
		// handleSubmit is passed from redux form
		const handleSubmit = this.props.handleSubmit;

		return (
			// when the form is submitted, it will first run the handleSubmit() to validate form fields
			// if all validations go well, this.onSubmit() will be called
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<div className="post-nav">
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/" className="btn btn-danger float-right">Cancel</Link>
				</div>
				<Field
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
			</form>
		);
	}
}

// this function is automatically called by redux-form
// the argument is an object holding all the values in the form
function validate(values) {
	const errors = {};

	// validate the inputs from 'values'
	if (values.title && values.title.length < 3) {
		errors.title = "Title must be at least 3 characters!";
	}
	if (!values.title) {
		errors.title = "Enter a title please!";
	}
	if (!values.categories) {
		errors.categories = "Enter some categories please!";
	}
	if (!values.content) {
		errors.content = "Enter some content please!";
	}

	// if errors is an empty object, the form is fine to submit
	// else redux form assumes the form is invalid
	return errors;
}

// name the form 'PostsNewForm', since reduxForm supports multiple forms in a page
// validate property accepts a function to validate form inputs
export default reduxForm({
	form: 'PostsNewForm',
	validate: validate
})(
	connect(null, { createPost })(PostsNew)
);