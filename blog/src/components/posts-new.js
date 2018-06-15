import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  renderField(field) {

    const { input, label, meta: { touched, error } } = field;
    const formClassName = `form-group ${touched && error  ? 'has-danger' : '' }`;

    return (
      <div className={formClassName}>
        <label>{label}</label>
        <input
          className="form-control"
          type="text"
          {...input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    return this.props.createPost(values, () => this.props.history.push('/'));
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          name="title"
          label="Title"
          component={this.renderField}
        />

        <Field
          name="categories"
          label="Tags"
          component={this.renderField}
        />

        <Field
          name="content"
          label="Post Content"
          component={this.renderField}
        />

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.title && values.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  if (!values.title) {
    errors.title = 'Enter a title!';
  }

  if (!values.categories) {
    errors.categories = 'Enter a some categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
