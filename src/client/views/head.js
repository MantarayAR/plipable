Meteor.startup(function() {
  DocHead.setTitle(TAPi18n.__('app_name'));
});

DocHead.addMeta({
    name: "viewport",
    content: "width=device-width, initial-scale=1"
});

DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "57x57",
  href: "/apple-touch-icon-57x57.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "60x60",
  href: "/apple-touch-icon-60x60.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "72x72",
  href: "/apple-touch-icon-72x72.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "76x76",
  href: "/apple-touch-icon-76x76.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "114x114",
  href: "/apple-touch-icon-114x114.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "120x120",
  href: "/apple-touch-icon-120x120.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "144x144",
  href: "/apple-touch-icon-144x144.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "152x152",
  href: "/apple-touch-icon-152x152.png"
});
DocHead.addLink({
  rel:"apple-touch-icon",
  sizes: "180x180",
  href: "/apple-touch-icon-180x180.png"
});

DocHead.addLink({
  rel:"icon",
  type: "image/png",
  href: "/favicon-32x32.png",
  sizes: "32x32"
});
DocHead.addLink({
  rel:"icon",
  type: "image/png",
  href: "/android-chrome-192x192.png",
  sizes: "192x192"
});
DocHead.addLink({
  rel:"icon",
  type: "image/png",
  href: "/favicon-96x96.png",
  sizes: "96x96"
});
DocHead.addLink({
  rel:"icon",
  type: "image/png",
  href: "/favicon-16x16.png",
  sizes: "16x16"
});

DocHead.addLink({
  rel:"manifest",
  href: "/manifest.json"
});
DocHead.addLink({
  rel:"mask-icon",
  href: "/safari-pinned-tab.svg",
  color: "#FF555B"
});


DocHead.addMeta({
  name:"msapplication-TileColor",
  content:"#ffffff"
});
DocHead.addMeta({
  name:"msapplication-TileImage",
  content:"/mstile-144x144.png"
});
DocHead.addMeta({
  name:"theme-color",
  content:"#FF555B"
});