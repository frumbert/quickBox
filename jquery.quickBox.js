(function($,window,document){
	$.fn.quickBox_imgLoad = function(callback) {
        return this.each(function() {
            if (callback) {
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function(){
                        callback.apply(this);
                    });
                }
            }
        });
    };

    $.fn.quickBox = function (opt) {
		var $overlay = $('<div id="quickBox_overlay" />').css({
						position:"fixed", 
						top:0,
						left:0,
						width:"100%",
						height:"100%",
						background:"#000",
						opacity:0.5,
						cursor:"not-allowed"
					}).hide(),
			$content = $('<div />').css({
						"border-radius":"8px",
						background:"#fff",
						padding:"10px",
						overflow:"hidden"
					}),
			$close = $('<a href="#">close</a>').css({
						position:"absolute",
						background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABCdJREFUeNqcVl1IbFUUnjNzr47enLFkvKUoDNk1S0kxDPHBH4gCTfHJH4jgYgrpg1APmqjQS2gggiLViyBdkEAxjARFSPBBfPCv/LcRS5tSlLzXMcdxZvWt3d6HmTkzXW8LPs45a6/1rbX3XmvvYzL9hxBRC/AjRZcD4BGQE41Di0JciMfnQDF/n5+fm2ZmZkxnZ2e6TWFhoSknJ4T3a03TmkxPE5C/q9JbX1+nmpoaslgsxEPhSE9Pp6GhIbq5uVEuU8DztyLv7e2NShwOzIRcLpdy/S4auQNws0VHR8etiIORmppKh4eHKshXkQLwZtH4+Pgzkyvk5+cHL1dOMLmTNV6vV6xrsFNxcTHV1tZSSkpKiL6srIyam5spLS0tRM97IuWRHsDv97ezZmRkxJDV3t4enZ6e0sDAADkcDqGrqqqizc1NwdLe3m7YeFXCeoBAIPADa8rLyw0BZmdnhfX19TX19fVRY2OjTg4/amhoMPisra2J8YuLizeY3wzDfVY4nU6DcW5uLq2srAiHy8tLQi+I96urK1EM8fHxBp/h4WGV1EMOYOF3VsTExETdPO4JJZx5T08Pmc3miPZc4iwej+dTMweAwxOOZLfbja2uaSabzcaFoOtQKSYkY0pISIhY8jzGgqLx8zMO0xXp8XKEZ1NZWUk7Ozv6smxvb6vsaHBwkJKTkw0+XOossP2AAzx3dHQkeqClpcVgPDY2pm9yW1sblZSU0OLiotD5fD6qqKgIsefu56pj6ezsfJ0DJMzNzX3MCt798ADd3d20sbFBXV1dhOXSj4apqSmanp6mvLy8EPvq6mpBfnJysoLvFBEAyHK73aL26uvrQxx4CYqKigzVkp2dTRkZGSHnFb9vbW2JAPPz84MqwD3glYmJiS954Pj4WDj+n6Oiv7//3w47ONjhEx24zwGsQDrw9tLS0s/qmH7WINwTSpqamrqgywXE0X0XSAYKkpKSPgL572zEGxW+XNHuhNHRUZ28tbX1G+jLgQwuINHJgA14ALyXmJj4GY6H35TD8vKyqB5utri4OEHKs+Py5Y7l7mbBrefDMfI9xj8E3gJeBGLVtRkr1+tN4H3gC1TPT1gyD91CJicnT7Kysr6F3yfAOzJ7Lh6LupMt3HDAC3I/MoFXgZfr6upeKy0tvV9QUHAvMzPzjtVq1fb39/27u7vehYWFx2gq1+rq6hZseWP5+QvwB/AY8GlBl/8dIF4GSQWcEmmAg08SOVO2vQE8AP8FuAE+ml3Ar8CfktzLB7UW9odxV87ELjee1/ElGSBRjvGeXQMXwKkkdMusOeATOe6P9NuiZhIr+8MuiW2yImJkAJ7BpSQ7B/6S73/zsnDmssoi/hdpkkQFskrEyhlqMjvO8ioIPqkPPPXHK2hMkwWgYFbXuCRThIFwYiX/CDAA8quvgv5A6LkAAAAASUVORK5CYII=) 0 0 no-repeat",
						width:"24px",
						height:"27px",
						display:"block",
						"text-indent":"-9999px",
						top:"-7px",
						right:"-7px"
					}),
			$box = $('<div />').css({
						position:"absolute",
						background:"url(tint20.png) 0 0 repeat",
						background:"rgba(0,0,0,0.2)",
						"border-radius":"14px",
						padding:"8px"
					}).hide().append($content, $close),
			_init = function () {
				$content.empty();
				if (!$("#quickBox_overlay").length) {
					$(document).ready(function(){
						$('body').append($overlay, $box);						
					});
				}
			},
			_center = function () {
				$box.css({
					top: (Math.max($(window).height() - $box.outerHeight(), 0) / 2) + $(window).scrollTop(), 
					left: (Math.max($(window).width() - $box.outerWidth(), 0) / 2) + $(window).scrollLeft()
				});
			},
			_close = function () {
				$(window).unbind('resize.quickBox');
				$(document).off(".quickBox"); // both click & keypress
				$box.remove();
				$overlay.remove();
			},
			_show = function () {
				_center();
				$(window).bind('resize.quickBox', _center);
				$box.show();
				$overlay.show();
			}

	    return this.each(function () {
	    	
            $(this).on('click', function(e) {	
            	e.preventDefault();
		    	_init();
				var settings = $.extend(true, {
		        	width: "auto",
		        	height: "auto",
		        	scrollable: false,
		        	escape: false,
		            overlay: "#000"
				}, opt, $(this).data() );

				$overlay.css("background-color", settings.overlay);

				$box.css({
					width: settings.width, 
					height: settings.height
				});

				if (settings.height!=="auto" && settings.scrollable==true) {
					$content.css({
						"overflow-y":"auto",
						"height": $box.height() + "px"
					});
				}

				$(document).on('click.quickBox', function (e) {
					if (e.target==$close.get(0) || e.target==$overlay.get(0)) {
						e.preventDefault();
						_close();
					}
				});
				if (settings.escape) {
					$(document).on("keyup.quickBox", function (e) {
						if ((e.keyCode || e.which) == 27) _close();
					})
				}
				var href = $(this).attr("href");

				if (settings.content) {
					$content.append(settings.content);
					_show();
				} else if (href.indexOf("#")==0) {
					$content.append($(href).clone().show());
					_show();
				} else if (href.match(/\.(jpg|png|gif|jpeg|apng)/i)) {
					$("<img>").attr("src", href).quickBox_imgLoad(function () {
						$content.append("<img src='" + href + "' />");
						_show();
					});
				} else if (href.length) {
					$.get(href, function (data) {
						$content.html(data);
						_show();
					});
				}
            });
			
	    });
    }
})(jQuery, window, document);