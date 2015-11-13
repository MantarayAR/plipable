PlipListItemComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var username = null;

    if (Meteor.user()) {
      username  = Meteor.user().services.twitter.screenName;
    }

    return {
      username: username
    }
  },
  handleDelete(e) {
    e.preventDefault();

    var plipId = this.props.plip._id;

    Meteor.call('delete', plipId, function(err, result) {
      if (err) {
          if (err.reason) {
            Materialize.toast(err.reason, 3000, 'red lighten-1')
          } else {
            Materialize.toast('Something bad happened :(', 3000, 'red lighten-1')
          }
        } else {
          Materialize.toast('Plip Deleted!', 4000)
        }
    });
  },
  render() {
    var currentTime = this.props.plip.videoTimestamp;
    currentTime     = __.Time.humanize(currentTime);

    var thumbnail = this.props.plip.thumbnail;
    var username = this.props.plip.username;

    var $$delete = '';

    if (this.data.username === this.props.plip.username) {
      $$delete = (
        <a href="#!" onClick={this.handleDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      );
    }

    var $$thumbnail = (
      <i className="material-icons circle brand">chat_bubble</i>
    );

    if (thumbnail) {
      $$thumbnail = <img src={thumbnail} alt={username} className="circle" />;
    }

    var $$image = '';

    if (this.props.plip.image) {
      var $$watermark = '';

      if (this.props.plip.image.type === 'giphy') {
        $$watermark = (
          <div className="plip__image-watermark">
            <img src="/giphy/horizontal-dark-text.png" />
          </div>
        );
      }

      $$image = (
        <div>
          <img src={this.props.plip.image.url} />
          {$$watermark}
        </div>
      );  
    }

    return (
      <div className="plips__list-item collection-item avatar">
        {$$thumbnail}
        <span className="title">{username}</span>
        <p>
          @{currentTime} – {this.props.plip.message}
        </p>
        {$$image}
        {$$delete}
      </div>
    );
  }
});
