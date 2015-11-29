AboutPage = React.createClass({
  componentDidMount() {
    $(ReactDOM.findDOMNode(this.refs.tabs)).tabs();

    this.pickTab(this.props.pageName);
  },
  pickTab(pageName) {
    $(ReactDOM.findDOMNode(this.refs.tabs)).tabs('select_tab', pageName);
  },
  render() {
    return (
      <div className="about">
        <div className="section no-pad-bot">
          <div className="container center">
            <div className="row">
              <div className="col s10 offset-s1">
                <ul className="tabs" ref="tabs">
                  <li className="tab col s6">
                    <a href="#contact-us">Contact Us</a>
                  </li>
                  <li className="tab col s6"><a href="#terms-of-service">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col s10 offset-s1 m6 offset-m3">
                <div id="contact-us">
                  <h3 className="white-text">Contact Us</h3>
                  <div className="white-text">
                    <IncludeTemplate template={Template.contactForm} />
                  </div>
                </div>
                <div id="terms-of-service">
                  <div className="card">
                    <div className="card-content">
                      <TermsOfServiceComponent />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/><br/>

            <div className="row center">
              <h2 className="white-text">More Links</h2>
              <a href="https://github.com/MantarayAR/plip-it" className="btn-large waves-effect waves-light white darken-2 brand-text">Github</a>

              <a href="https://github.com/MantarayAR/plip-it/issues" className="btn-large waves-effect waves-light white darken-2 brand-text">Report an Issue</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
})