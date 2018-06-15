import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook} from '../actions';
import { bindActionCreators } from 'redux';

class BookList extends Component {

  constructor(props) {
    super(props);
  }

  renderList() {
    return this.props.books.map(book => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item"
        >
          {book.title}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

// this function is the glue between react and redux
function mapStateToProps(state) {
  // Whatever is returned from here will show up as props in side book list

  // 1 - Whenever the app state changes, the container will instantly re-render with the list of books
  return {
    books: state.books
  };
}

// Anything returned from this function will end up as props on the book list container
function mapDispatchToProps(dispatch) {
  // whenever selectBook is called, the result should be passed to all of our reducers
  return bindActionCreators({ selectBook }, dispatch);
}

// Promote bookList from a component to a container
// it needs to know about this new dispatch method selectBook. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
