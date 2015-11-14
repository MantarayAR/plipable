appDump.allow = function (user) {
  if (this.user) {
    return Roles.userIsInRole(this.user._id, ['admin'], Roles.GLOBAL_GROUP)
  } else {
    return false;
  }
}