Session.setDefault('content-enter-finished', false);

TransitionMixin = React.createMixin({
  componentWillEnter(done) {
    this.el = ReactDOM.findDOMNode(this);

    this.el.classList.add('content-enter-before');
    requestAnimationFrame(() => {
      this.el.classList.add("content-enter");
      this.el.classList.remove('content-enter-before');

      requestAnimationFrame(() => {
        this.el.classList.add("content-enter-active");
        arrival(this.el, () => {
          done();
          Session.set('content-enter-finished', true);
        });
      });

    });
  },
  componentWillLeave(done) {
    this.el = ReactDOM.findDOMNode(this);

    this.el.classList.remove('content-enter');
    this.el.classList.remove('content-enter-active');
    Tracker.autorun((c) => {
      if (Session.equals('content-enter-finished', true)) {
        requestAnimationFrame(() => {
          this.el.classList.add("content-leave");

          requestAnimationFrame(() => {
            this.el.classList.add("content-leave-active");
            arrival(this.el, () => {
              done()
              Session.set('content-enter-finished', false);
              c.stop();
            });
          });
        });

      }
    });
  }
});
