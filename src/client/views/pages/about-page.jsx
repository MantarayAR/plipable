AboutPage = React.createClass({
  render() {
    return (
      <div className="about">
        <div className="section no-pad-bot">
          <div className="container center">
            <br/><br/>
            <img className="" src="/logos/logo-reverse.png" />
            <h1 className="header white-text">{TAPi18n.__('app_name')}</h1>
            <div className="row center">
              <h5 className="header col s12 white-text text-darken-2">{TAPi18n.__('app_description')}</h5>
            </div>
            <div className="row center">
              <a href="https://github.com/MantarayAR/plip-it" className="btn-large waves-effect waves-light white darken-2 brand-text">Github</a>

              <a href="https://github.com/MantarayAR/plip-it/issues" className="btn-large waves-effect waves-light white darken-2 brand-text">Report an Issue</a>
            </div>
            <br/><br/>

            <div className="col s10 offset-s1 m6 offset-m3">
              <h3 className="white-text">Contact Us</h3>
              <div className="white-text">
                <IncludeTemplate template={Template.contactForm} />
              </div>
              <br/><br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
})