SearchResultItemComponent = React.createClass({
  handleClick(e) {
    e.preventDefault();

    var id = this.props.result.id.videoId;

    if (id == null) {
      id = this.props.result.id;
    }

    // TODO use the videoType to determine the url
    FlowRouter.go('/v/' + id);
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