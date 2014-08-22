;(function($){
  jQuery.fn.avklicensor = function(options){
    options = $.extend({
        types: ['c', 'cc', 'cczero'],
        ccsubs: ['ccby', 'ccnc', 'ccsa', 'ccnd'],
        current: 'CCBY',
        locale: 'en',
        lang: null,
    }, options);
    
    var thisselector = this,
    
    make = function(){   
    
        if (typeof AVKLICENSORLOCALE == "undefined") {
            $.ajax({
                type: "GET",
                url: "lang/"+options.locale+".js",
                dataType: "script",
                async: false,
                cache: true,
                success: function(data){
                  options.lang = AVKLICENSORLOCALE;
                }
              });    
        } else {
            options.lang = AVKLICENSORLOCALE;
        }
        
      $(this).addClass('avklicensor').append(typeshtml).append(ccsubshtml).append(infohtml);

      switch (options.current.toLowerCase()){
        case 'c':
          $(this).children('span.avkl-c').addClass('sel');
          break;
        case 'ccby':
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          break;
        case 'ccbysa':
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          $(this).find('span.avkl-ccsa').addClass('sel');
          break;
        case 'ccbynd':
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          $(this).find('span.avkl-ccnd').addClass('sel');
          break;
        case 'ccbync':
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          $(this).find('span.avkl-ccnc').addClass('sel');
          break;
        case 'ccbyncsa':
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          $(this).find('span.avkl-ccnc').addClass('sel');
          $(this).find('span.avkl-ccsa').addClass('sel');
          break;
        case 'ccbyncnd':
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          $(this).find('span.avkl-ccnc').addClass('sel');
          $(this).find('span.avkl-ccnd').addClass('sel');
          break;
        case 'cczero':
          $(this).find('span.avkl-cczero').addClass('sel');
          break;
        default:
          $(this).find('span.avkl-cc').addClass('sel');
          $(this).find('span.avkl-ccby').addClass('sel');
          break;
      }
      thisselector.find('div.license').html(makeinfo);

      thisselector.on('click', 'div.avklicensor-lic span.item', function(){
        if (!$(this).hasClass('sel')) {
          $(this).siblings('span.item').removeClass('sel');
          $(this).addClass('sel');
          
          if ($(this).is('span.avkl-cc')) {
            thisselector.find('.avklicensor-lic').after(ccsubshtml);
            thisselector.find('.avkl-ccby').addClass('sel');;
          } else {
            thisselector.find('div.avklicensor-sub').remove();
          }
        }
        thisselector.find('div.license').html(makeinfo);
      });

      thisselector.on('click', 'div.avklicensor-sub span.item:not(".avkl-ccby")', function(){
        if ($(this).is('.avkl-ccsa')) thisselector.find('.avkl-ccnd').removeClass('sel');
        if ($(this).is('.avkl-ccnd')) thisselector.find('.avkl-ccsa').removeClass('sel');
        $(this).toggleClass('sel');
        thisselector.find('div.license').html(makeinfo);
      });      
    },
    typeshtml = function(){
      var code = '<div class = "avklicensor-lic">';
        
      for (var i=0; i<options.types.length; i++) {
        code+='<span class="item avkl-'+options.types[i].toLowerCase()+'" title="'+options.lang[options.types[i].toLowerCase()]+'"></span>';
      }

      code +='</div>';
      return code;
    },
    ccsubshtml = function(){
      var code = '<div class = "avklicensor-sub" id="ccsub">';

      for (var i=0; i<options.ccsubs.length; i++) {
        code+='<span class="item avkl-'+options.ccsubs[i].toLowerCase()+'" title="'+options.lang[options.ccsubs[i].toLowerCase()]+'"></span>';
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