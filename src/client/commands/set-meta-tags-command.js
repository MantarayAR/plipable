SetMetaTagsCommand = function() {
  var defaultOptions = {
    'title' : TAPi18n.__('app_name'),
    'meta' : [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        name:"msapplication-TileColor",
        content:"#ffffff"
      },
      {
        name:"msapplication-TileImage",
        content:"/mstile-144x144.png"
      },
      {
        name:"theme-color",
        content:"#FF555B"
      },
      {
        name:"keywords",
        content:"chat, discussion, videos, watch"
      },
      {
        name:"description",
        content:"Timestamped chat on videos. See what other people said while watching!"
      },
      {
        name:"subject",
        content:"Video Chat"
      },
      {
        name:"copyright",
        content:"Mantaray AR"
      },
      {
        name:"language",
        content:"US"
      }
    ],
    'link' : [
      {
        rel:'search',
        type:'application/opensearchdescription+xml',
        title: 'Plipable',
        href: '/opensearch.xml'
      },
      {
        rel:"apple-touch-icon",
        sizes: "57x57",
        href: "/apple-touch-icon-57x57.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "60x60",
        href: "/apple-touch-icon-60x60.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "72x72",
        href: "/apple-touch-icon-72x72.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "76x76",
        href: "/apple-touch-icon-76x76.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "76x76",
        href: "/apple-touch-icon-76x76.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "114x114",
        href: "/apple-touch-icon-114x114.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "120x120",
        href: "/apple-touch-icon-120x120.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "144x144",
        href: "/apple-touch-icon-144x144.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "152x152",
        href: "/apple-touch-icon-152x152.png"
      },
      {
        rel:"apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon-180x180.png"
      },
      {
        rel:"icon",
        type: "image/png",
        href: "/favicon-32x32.png",
        sizes: "32x32"
      },
      {
        rel:"icon",
        type: "image/png",
        href: "/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel:"icon",
        type: "image/png",
        href: "/favicon-96x96.png",
        sizes: "96x96"
      },
      {
        rel:"icon",
        type: "image/png",
        href: "/favicon-16x16.png",
        sizes: "16x16"
      },
      {
        rel:"manifest",
        href: "/manifest.json"
      },
      {
        rel:"mask-icon",
        href: "/safari-pinned-tab.svg",
        color: "#FF555B"
      }
    ]
  };

  var _reset = function () {
    DocHead.removeDocHeadAddedTags();
  }

  var _handleTitle = function(name) {
    var title = TAPi18n.__('app_name');

    if (title === name) {
      DocHead.setTitle(name);  
    } else {
      DocHead.setTitle(name + ' — ' + title);
    }
  }

  var _handleMeta = function(name, content) {
    DocHead.addMeta({
      name: name,
      content: content
    });
  }

  var _handleLink = function(option) {
    DocHead.addLink(option);
  };

  /**
   * Extend by merging the arrays (with the override array FIRST),
   * then unique the arrays, then extend objects like normal
   */
  var _extend = function (defaultOptions, options) {
    // 1. merge the metas
    // 1.1. uniq the metas
    // 2. merge the links
    // 2.2. uniq the links
    // 3. put the uniq metas and links into options
    // 4. extend defaultOptions with options

    var metaMerged, linkMerged;

    if (options.meta) {
      metaMerged = options.meta.concat(defaultOptions.meta);
      metaMerged = _.uniq(metaMerged, false, function(a) {
        return a.name;
      });
    } else {
      metaMerged = defaultOptions.meta;
    }

    if (options.link) {
      linkMerged = options.link.concat(defaultOptions.link);
      linkMerged = _.uniq(linkMerged, false);
    } else {
      linkMerged = defaultOptions.link;
    }

    options.meta = metaMerged;
    options.link = linkMerged;

    return _.extend(defaultOptions, options);
  }

  var handle = function (options) {
    var o = _extend(defaultOptions, options);
    var i;

    _reset();
    _handleTitle(o.title);

    for (i = 0; i < o.meta.length; i++) {
      _handleMeta(o.meta[i].name, o.meta[i].content);
    }

    for (i = 0; i < o.link.length; i++) {
      _handleLink(o.link[i]);
    }
  }

  return {
    handle: handle
  }
}