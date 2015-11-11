dispatch = function(command) {
  // TODO check the type of command to see if it is queued, synchronous, asynchronous, etc

  var args = Array.prototype.slice.call(arguments);
  
  return command.handle.apply(this, args.slice(1));
}