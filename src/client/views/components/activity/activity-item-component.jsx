ActivityItemComponent = React.createClass({
  handleClick(e) {
    e.preventDefault();

    var id = this.props.activity.videoId;

    // TODO use the videoType to determine the url
    FlowRouter.go('/v/' + id);
  },
  render() {
    var description = '';

    if (this.props.activity.description) {
      description = __.String.truncate(this.props.activity.description, 200, true);
    }

    return (
      <div className="activity-feed__item collection-item" onClick={this.handleClick}>
        <div className="activity-feed__item-video">
          <img
              src={this.props.activity.thumbnail}
              alt=""
              className="circle" />
          <span className="title">{this.props.activity.title}</span>
          <p>
            {description}
          </p>
        </div>
        <div className="activity-feed__item-plips">
          <TransitionGroup
                className="plips__list collection plip-items"
                transitionName='slide-down'
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                name="plip-items">
            {this.props.activity.plips.map(function(plip, i){
              return (
                <div key={plip._id}>
                  <PlipListItemComponent plip={plip} />
                </div>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    );
  }
})
