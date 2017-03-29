/*
 * jHighlighter (jQuery)
 * version: 0.1 (2014)
 * author: @iamtiago
 * homepage: https://iamtiago.net/
 *
 * Copyright (c) 2014
 * Available under the MIT license

 * jHighlighter let's you highlight individual letters as you type
 */

;(function ( $, window, document, undefined ) {
    
    var pluginName = 'jHighlighter',
        defaults = {
            color: "#e92e44",
            background: null,
            target: null
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {

    	var style = '<style>strong.jHighlighter{';

    	style += 'color: ' + this.options.color;
    	this.options.background ? style += 'background: ' + this.options.background : null;
    	style += '}</style>';

    	$('body').append(style);

    	var __highlight = function(s, t) {
  			
  			var matcher = new RegExp("(" + t + ")", "ig" );
  			return s.replace(matcher, "<strong class=\"jHighlighter\">$1</strong>");

		},
		$this = this,
		cache = $this.options.target.html();

		$($this.element).on("keyup", function(event){

			$this.options.target.html(__highlight(cache, $(this).val()));

		});
        
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );