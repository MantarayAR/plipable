SearchResultItemComponent = React.createClass({
  handleClick(e) {
    e.preventDefault();

    FlowRouter.go('/v/' + this.props.result.id.videoId);
  },
  render() {
    var result = this.props.result;
    return (
      <a href="#!" className="collection-item avatar" onClick={this.handleClick}>
        <img
            src={result.snippet.thumbnails['default'].url}
            alt=""
            className="circle" />
        <span className="title">{result.snippet.title}</span>
        <p>
          {result.snippet.description}
        </p>
      </a>
    );
  }
});