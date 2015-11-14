/**
 * Awesome React Component
 *
 * Include Blaze Templates in React
 *
 * @see https://github.com/reactjs/react-meteor
 */
IncludeTemplate = React.createClass({
  componentDidMount: function() {
    var componentRoot = React.findDOMNode(this);
    var parentNode = componentRoot.parentNode;
    parentNode.removeChild(componentRoot);
    return Blaze.render(this.props.template, parentNode);
  },
  render: function(template) {
    return (<div />)
  }
});