PlipListItemComponent = React.createClass({
  render() {
    var currentTime = this.props.plip.videoTimestamp;
    currentTime     = __.Time.humanize(currentTime);

    return (
      <div className="plips__list-item collection-item">
        <p>
          @{currentTime} – {this.props.plip.message}
        </p>
      </div>
    );
  }
});
