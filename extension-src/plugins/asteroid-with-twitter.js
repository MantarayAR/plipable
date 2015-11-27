var Asteroid = require('asteroid/dist/asteroid.chrome');

var getTwitterOauthOptions = function () {
  var credentialToken = Asteroid.utils.guid();
  var query = {
    requestTokenAndRedirect:  this._host + "/_oauth/twitter?&state=" + credentialToken,
    state:      Asteroid.utils.getOauthState(credentialToken)
  };
  var loginUrl = this._host + "/_oauth/twitter/?" + Asteroid.utils.formQs(query);
  return {
    credentialToken: credentialToken,
    loginUrl: loginUrl
  };
};

Asteroid.prototype.loginWithTwitter = function () {
  var options = getTwitterOauthOptions.call(this);
  return this._openOauthPopup(
    options.credentialToken,
    options.loginUrl,
    this._loginAfterCredentialSecretReceived
  );
};

Asteroid.prototype.connectWithTwitter = function () {
  var options = getTwitterOauthOptions.call(this);
  return this._openOauthPopup(
    options.credentialToken,
    options.loginUrl,
    this._connectAfterCredentialSecretReceived
  );
};

module.exports = Asteroid;