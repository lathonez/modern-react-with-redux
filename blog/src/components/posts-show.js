import React, { Component } from 'react';
import { fetchPost, deletePost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsShow extends Component {

  componentDidMount() {

    if (this.props.post) {
      // do not refetch if we already have a post
      return;
    }

    this.props.fetchPost(this.props.match.params.id);
  }

  onDelete() {
    this.props.deletePost(this.props.match.params.id, () => this.props.history.push('/'));
  }

  render() {

    const { post } = this.props;

    if (!post) {
      return <div>Loading..</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDelete.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Tags: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { deletePost, fetchPost })(PostsShow);
