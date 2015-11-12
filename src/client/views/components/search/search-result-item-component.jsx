SearchResultItemComponent = React.createClass({
  handleClick(e) {
    e.preventDefault();

    FlowRouter.go('/v/' + this.props.result.id.videoId);
  },
  render() {
    var result      = this.props.result;
    var description = __.String.truncate(result.snippet.description, 200, true);
    return (
      <a href="#!" className="collection-item avatar" onClick={this.handleClick}>
        <img
            src={result.snippet.thumbnails['default'].url}
            alt=""
            className="circle" />
        <span className="title">{result.snippet.title}</span>
        <p>
          {description}
        </p>
      </a>
    );
  }
});