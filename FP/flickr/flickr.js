require.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require(['ramda', 'jquery'], function (R, $) {
  /// /////////////////////////////////////////
  // Utils
  let Impure = {
    getJSON: R.curry((cb, url) => {
      $.getJSON(url, cb);
    }),

    setHtml: R.curry((sel, html) => {
      $(sel).html(html);
    })
  };

  let img = function (url) {
    return $('<img />', { src: url });
  };

  let trace = R.curry((tag, x) => {
    console.log(tag, x);
    return x;
  })
  /// /////////////////////////////////////////

  let url = function (t) {
    return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + t + '&format=json&jsoncallback=?';
  }

  var mediaUrl = R.compose(R.prop('m'), R.prop('media'));
  var srcs = R.compose(R.map(mediaUrl), R.prop('items'));
  var images = R.compose(R.map(img), srcs);
  var renderImages = R.compose(Impure.setHtml('body'), images);
  var app = R.compose(Impure.getJSON(renderImages), url);

  app('cats');
});
