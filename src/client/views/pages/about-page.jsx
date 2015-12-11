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

    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
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
                    <a href="#about-us">About Us</a>
                  </li>
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
                <div id="about-us" className="about__about-us">
                  <div className="card">
                    <h3 className="black-text">About Us</h3>
                    <div className="card-content black-text">
                      <a href="https://twitter.com/MantarayAR"
                        className="twitter-follow-button"
                        data-show-count="false"
                        data-size="large">Follow @MantarayAR</a>
                      <div style={{textAlign: 'left'}}>
                        <br />
                        <p>I made Plipable to be a fun way to interact with
                        videos.</p>
                        <br />
                        <p>Thanks to Youtube, there are tons of videos to watch
                        and comment on. Special thanks to their API which made this
                        all possible.</p>
                        <br />
                        <p>Shout out to Giphy. I just really, really like Giphy.
                        Without them, commenting just would not be as fun as it is.</p>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
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