;(function($){
  jQuery.fn.avklicensor = function(options){
    options = $.extend({
        types: ['c', 'cc', 'cc-zero'],
        ccsubs: ['cc-by', 'cc-nc', 'cc-sa', 'cc-nd'],
        current: 'CCBY',
        locale: 'ru',
        lang: null,
    }, options);
    
    var thisselector = this,
    
    make = function(){
      $.ajax({
        type: "GET",
        url: "/vendor/avklicensor/lang/"+options.locale+".js",
        dataType: "script",
        async: false,
        cache: true,
        success: function(data){
          options.lang = AVKLICENSORLOCALE;
        }
      });
        
      $(this).addClass('avklicensor').append(typeshtml).append(ccsubshtml).append(infohtml);

      switch (options.current.toLowerCase()){
        case 'c':
          $(this).children('span.lic-c').addClass('sel');
          break;
        case 'ccby':
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          break;
        case 'ccbysa':
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          $(this).find('span.lic-cc-sa').addClass('sel');
          break;
        case 'ccbynd':
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          $(this).find('span.lic-cc-nd').addClass('sel');
          break;
        case 'ccbync':
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          $(this).find('span.lic-cc-nc').addClass('sel');
          break;
        case 'ccbyncsa':
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          $(this).find('span.lic-cc-nc').addClass('sel');
          $(this).find('span.lic-cc-sa').addClass('sel');
          break;
        case 'ccbyncnd':
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          $(this).find('span.lic-cc-nc').addClass('sel');
          $(this).find('span.lic-cc-nd').addClass('sel');
          break;
        case 'cczero':
          $(this).find('span.lic-cc-zero').addClass('sel');
          break;
        default:
          $(this).find('span.lic-cc').addClass('sel');
          $(this).find('span.lic-cc-by').addClass('sel');
          break;
      }
      thisselector.find('div.license').html(makeinfo);

      thisselector.on('click', 'div.avklicensor-lic span.item', function(){
        if (!$(this).hasClass('sel')) {
          $(this).siblings('span.item').removeClass('sel');
          $(this).addClass('sel');
          
          if ($(this).is('span.lic-cc')) {
            thisselector.find('.avklicensor-lic').after(ccsubshtml);
            thisselector.find('.lic-cc-by').addClass('sel');;
          } else {
            thisselector.find('div.avklicensor-sub').remove();
          }
        }
        thisselector.find('div.license').html(makeinfo);
      });

      thisselector.on('click', 'div.avklicensor-sub span.item:not(".lic-cc-by")', function(){
        if ($(this).is('.lic-cc-sa')) thisselector.find('.lic-cc-nd').removeClass('sel');
        if ($(this).is('.lic-cc-nd')) thisselector.find('.lic-cc-sa').removeClass('sel');
        $(this).toggleClass('sel');
        thisselector.find('div.license').html(makeinfo);
      });      
    },
    typeshtml = function(){
      var code = '<div class = "avklicensor-lic">';
        
      for (var i=0; i<options.types.length; i++) {
        code+='<span class="item lic-'+options.types[i].toLowerCase()+'" title="'+options.lang[options.types[i].toLowerCase()]+'"></span>';
      }

      code +='</div>';
      return code;
    },
    ccsubshtml = function(){
      var code = '<div class = "avklicensor-sub" id="ccsub">';

      for (var i=0; i<options.ccsubs.length; i++) {
        code+='<span class="item lic-'+options.ccsubs[i].toLowerCase()+'" title="'+options.lang[options.ccsubs[i].toLowerCase()]+'"></span>';
      }        
        
      code +='</div>';
      return code;
    },
    infohtml = function(){
      return '<div class="license"></div>';
    },
    makeinfo = function(){
      var licinfo = '';
      thisselector.find('span.item.sel').each(function(){
         licinfo += '<a href="#" target="_blank">'+$(this).attr('title')+'</a> ';
      });
      return licinfo;
    };
    
    return this.each(make); 
  };
})(jQuery);