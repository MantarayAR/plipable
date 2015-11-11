PlipListItemComponent = React.createClass({
  render() {
    var currentTime = this.props.plip.videoTimestamp;
    currentTime     = __.Time.humanize(currentTime);

    var imageUrl = this.props.plip.thumbnail;
    var username = this.props.plip.username;

    var $$image = (
      <i className="material-icons circle brand">chat_bubble</i>
    );

    if (imageUrl) {
      $$image = <img src={imageUrl} alt={username} className="circle" />;
    }

    return (
      <div className="plips__list-item collection-item avatar">
        {$$image}
        <span className="title">{username}</span>
        <p>
          @{currentTime} – {this.props.plip.message}
        </p>
      </div>
    );
  }
});
