;(function($){
  jQuery.fn.avklicensor = function(options){
    options = $.extend({
        licenses: ['c', 'cc', 'cczero'],
        current: 'cc',
        showinfo: true,
    }, options);

    /**
     * Full collection of license objects
     * @type {Object}
     */
    var collection = [
      { license: 'c' },
      { license: 'cc', lock: ['ccby'], children: [{ license: 'ccby' }, { license: 'ccnc' }, { license: 'ccsa' }, { license: 'ccnd' }]},
      { license: 'cczero' },
      { license: 'rars', children: [{ license: 'rars0' }, { license: 'rars6' }, { license: 'rars12' }, { license: 'rars16' }, { license: 'rars18' }]},
    ]

    /**
     * Genreates plugin instance
     */
    make = function(){
      if (typeof i18n == "undefined") console.log('Please include localisation file');

      $(this).addClass('avklicensor').append(selector);
      if (options.showinfo) $(this).append(infohtml);
    },

    /**
     * Generate license selector
     * @return {html} license selector block
     */
    selector = function(){
      var license = '<div class = "avklicensor-selector"><ul></ul></div>';

      return license;
    },

    /**
     * Generate selected license information
     * @return {html} information block
     */
    infohtml = function(){
      return '<div class="license"></div>';
    };

    return this.each(make);
  };
})(jQuery);