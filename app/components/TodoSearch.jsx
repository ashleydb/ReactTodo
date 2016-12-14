var React = require('react');

var TodoSearch = React.createClass({
  handleSearch: function() {
    var searchText = this.refs.searchText.value;
    var showCompleted = this.refs.showCompleted.checked;
    this.props.onSearch(searchText, showCompleted);
  },
  render: function() {
    var {id, text, time, complete} = this.props;
    return (
      <div>
        <div>
          <input type="search" placeholder="Enter search filter" ref="searchText" onChange={this.handleSearch}/>
        </div>
        <div>
          <label>
            <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/> Show Completed To Dos
          </label>
        </div>
      </div>
    );
  }
});

module.exports = TodoSearch;
