(function( $ ){

  var methods = {
     
     
     init : function( options ) {
     
				// default settings
				var settings = {
				
					/**
					 * the view_mode is a switch between different display options.
					 */
					'pluginRoot': 'src',
					'shareknobImage': 'crevo_socialmediaknob_var4_150x150.png',
					'size': 150,
					'popupDelay': 200,
					'services': [
						{
							id: 'facebook',
							color: '#3c5b9b',
							icon: '',
							link: 'http://www.facebook.com/sharer/sharer.php?s=100&amp;p[url]=http://logicum.co/creating-custom-share-buttons-facebook-twitter-google&amp;p[images][0]=http://logicum.co/wp-content/kliximagedimsum/sharetweetbuttons.dimsum.291x173.jpg&amp;p[title]=Creating Custom share buttons: Facebook, Twitter, Google+&amp;p[summary]=Build your custom share buttons from normal images with examples on each button'
						},
						{
							id: 'twitter',
							color: '#2daae1',
							icon: ''
						},
						{
							id: 'xing',
							color: '#025962',
							icon: ''
						},
						{
							id: 'linkedin',
							color: '#0173b2',
							icon: ''
						},
						{
							id: 'pinterest',
							color: '#cb2027',
							icon: ''
						},
						{
							id: 'googleplus',
							color: '#333230',
							icon: ''
						}
					]
				};
				
				// If options exist, lets merge them with our default settings
				if ( options ) {
					settings = $.extend( {}, settings, options );
				}
				
				// preload icons to prevent flickering while the appear effect
				$.each(settings.services, function(key, val) {
					$('<img/>')[0].src = settings.pluginRoot + '/icons/' + val.id + '.png';
				});

       return this.each(function(key, val){
        
         var $this = $(this);
         var data = $this.data('shareknob');
         
         // If the plugin hasn't been initialized yet
         if ( ! data ) {

           $(this).data('shareknob', {
               target : $this
           });

         }
         
					// generate unique id and assign it
					var id = 'shareknob-instance-' + key;
					$this.attr('id', id);
					
					// create shareknob markup
					// @todo	hard coded path
					var $el = $('<div class="shareknob-dial"><img src="'+settings.pluginRoot+'/' + settings.shareknobImage + '" /></div>');

					$el.css({
						'-webkit-transition': 'all 2s',
						'-moz-transition': 'all 2s',
						'-ms-transition': 'all 2s',
						'-o-transition': 'all 2s',
						'transition': 'all 2s',
						'-webkit-transform': 'scale(.9) rotate(0deg)',
						'width': '150px',
						'height': '150px',
						'overflow': 'hidden',
						'position': 'relative',
						'z-index': '2'
					});
	
					$el.one("mouseenter", function(ev) {
						$el.css({
							'-webkit-transform': 'scale(1) rotate(450deg)',
							'cursor': 'pointer'
						});
					});
					
					$el.one("mouseleave", function(ev) {
						$el.css({
							'-webkit-transform': 'scale(.9) rotate(-0deg)',
							'cursor': 'pointer'
						});					
					});
					
					$el.bind("click", function(ev) {
							
						// this is currently tied to six items with a static gap
						var pos = $this.offset();
						var itemsPerRow = 3;
					
						$.each(settings.services, function(i, service) {
							var $tile = $('<div class="service service-' + service.id + '"></div>');
							
							
							var row = Math.floor(i / itemsPerRow);
							var item = Math.abs(row * itemsPerRow - i);
							
							var xOffset = Math.round( (itemsPerRow * 150 + (itemsPerRow - 1) * 5) / 2 - 150 / 2 );
							var yOffset = 75;	// @todo ;-) 
							
							var left = pos.left - (item * 5 + item * 150) + xOffset;
							var top = pos.top - (row * 5 + row * 150) + yOffset;
									
							$tile.css({
								'-webkit-transition': 'all 1s',
								'-moz-transition': 'all 1s',
								'-ms-transition': 'all 1s',
								'-o-transition': 'all 1s',
								'transition': 'all 1s',
								'-webkit-transform': 'scale(.1)',
								'width': '150px',
								'height': '150px',
								'background-color': service.color,
								'background-image': 'url(' + settings.pluginRoot + '/icons/' + service.id + '.png)',
								'background-repeat': 'no-repeat',
								'background-position': 'center center',
								'position': 'absolute',
								'overflow': 'hidden',
								'top': top + 'px',
								'left': left + 'px',
								'z-index': '0',
								'opacity': '0'
							});
							
							$tile.one('mouseenter', function(ev) {
								$tile.css({
									'cursor': 'pointer',
									'opacity': '1'
								});
							});
							
							$tile.one('mouseleave', function(ev) {
								$tile.css({
									'opacity': '1'
								});
							});
							
							$tile.bind('click', function(ev) {
								window.open(service.link);	
							});
							
							$('body').append($tile);
							
							// timeout for delayed appearance
							var appear = setTimeout(function() {
								$tile.css({
									'-webkit-transform': 'scale(1)',
									'opacity': '1'
								});
							}, (i * settings.popupDelay ));
							

							// lock the dial rotation when active		
							/*					
							$el.css({
								'-webkit-transition': 'none',
								'-moz-transition': 'none',
								'-ms-transition': 'none',
								'-o-transition': 'none',
								'transition': 'none'
							});
							*/
						});
					});					
					
					$this.append($el);
					
       });
     },
     
     destroy : function( ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('shareknob');

         // Namespacing FTW
         $(window).unbind('.shareknob');
         data.tooltip.remove();
         $this.removeData('shareknob');

       })

     },
     
     reposition : function( ) {  },
     show : function( ) {  },
     hide : function( ) {  },
     update : function( content ) { }
  };

  $.fn.shareknob = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.shareknob' );
    }    
  
  };

})( jQuery );