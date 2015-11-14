controller = function(klass, action, name) {
  name = name || action || '';

  return {
    action: (new klass)[action],
    name: name
  }
};
