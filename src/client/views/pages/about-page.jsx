AboutPage = React.createClass({
  componentDidMount() {
    dispatch(new SetMetaTagsCommand(), {
      title: 'About',
      meta: [
        {
          name:'description',
          content:'About Plipable: Read about us, contact us, and view the terms of service'
        }
      ]
    });

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
                  <li className="tab col s4">
                    <a href="#contact-us">Contact Us</a>
                  </li>
                  <li className="tab col s4">
                    <a href="#terms-of-service">Terms of Service</a>
                  </li>
                  <li className="tab col s4">
                    <a href="#more-links">More Links</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col s10 offset-s1 m8 offset-m2">
                <div id="contact-us" className="about__contact-us">
                  <div className="card">
                    <h3 className="black-text">Contact Us</h3>
                    <div className="black-text">
                      <IncludeTemplate template={Template.contactForm} />
                    </div>
                  </div>
                </div>
                <div id="terms-of-service">
                  <div className="card">
                    <div className="card-content">
                      <TermsOfServiceComponent />
                    </div>
                  </div>
                </div>
                <div id="more-links">
                  <div className="card">
                    <div className="row center">
                      <h2 className="black-text">More Links</h2>
                      <a href="https://github.com/MantarayAR/plip-it" className="btn-large waves-effect waves-light brand">Github</a>

                      <a href="https://github.com/MantarayAR/plip-it/issues" className="btn-large waves-effect waves-light brand">Report an Issue</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
})