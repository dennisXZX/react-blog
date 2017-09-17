import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from "../actions";
import './posts_new.css';

class PostsNew extends Component {
	// renderTitleField method is used to display the UI in the field
	// we have to pass all the event handlers to the input
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
		const { handleSubmit } = this.props;

		return (
			// when the form is submitted, it will first run the handleSubmit() to validate form fileds
			// if all validations go well, this.onSubmit() will be called
			<form onSubmit={handleSubmit(this.onSubmit)}>
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
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger cancel">Cancel</Link>
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