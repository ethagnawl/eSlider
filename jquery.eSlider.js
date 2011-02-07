/*!
*   eSlider jQuery Plugin
*   V0.9
*   ethagnawl@gmail.com
*   http://ethagnawl.com/eSlider
*   Copyright 2010, Pete Doherty
*   Date: 09/19/10 13:52 (EDT)
*
*   eSlider is distributed under the terms of the GNU General Public License.
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
*   GNU General Public License for more details.
*
*   http://www.gnu.org/licenses/gpl.txt
*
*
*   options:
*       api_key:'dd557c079ba39b8d62c2f6b0f299b89e',    -    Flickr API key - http://www.flickr.com/services/apps/create/apply
*       auto_slide: 5000,                              -    slide after x milliseconds    
*       key_nav: true,                                 -    enable keyboard (<-, ->) navigation
*       fade_speed: 'fast'                             -    'slow', 'fast' or milliseconds - i.e. 1000
*       left_arrow: 'prev',                            -    left arrow chars/words (i.e. '<', '<-', '-', 'left')
*       opacity: .9,                                   -    slide opacity before img load
*       per_page: 7,                                   -    photos per page; 7 is the default, .css may need to be tweaked to accomodate other set sizes 
*       reset: false,                                  -    reset/scroll to beginning of slideshow or die 
*       right_arrow: 'next',                           -    right arrow chars/words (i.e. '>', '->', '+', 'right')
*       set_id: '72157601848439095',                   -    Flickr set id
*       size: 'm',                                     -    photo size: square - 's', thumbnail - 't', small - 'm', original - 'o' - http://www.flickr.com/services/api/flickr.photos.getSizes.html
*       slide_speed: 'fast'                            -    'slow', 'fast' or milliseconds - i.e. 1000
*
*
*/

(function ($) {

	$.fn.eSlider = function (options) {
        var animated = ':animated'
            ,   arrow_left = 'arrow_left'
            ,   arrow_right = 'arrow_right'
            ,   button = 'button'
            ,   config = {
                    auto_slide: 5000,    
                    fade_speed: 'slow',
                    key_nav: false,
                    left_arrow: '<',
                    last: 'last',
                    loading: 'loading',
                    per_page: 7,
                    reset: true,
                    right_arrow: '>',
                    size: 'm',
                    slide_speed: 'slow'
            }
            ,   slideshow_inner_class = 'slideshow-inner'
            ,   div = 'div'
            ,   img = 'img'
            ,   ul = 'ul'
            ,   li = 'li'
            ,   left_key = 37
            ,   right_key = 39
            ,   left = 'left'
            ,   on = 'on'
            ,   on_class = '.' + on
            ,   html_builder = function(e,i,a,c,t,ch){$e=document.createElement(e);if(i)$e.id=i;if(a)for(var key in a)if(a.hasOwnProperty(key))$e.setAttribute([key],a[key]);if(c)typeof c==='object'?$e.className=c.join(' '):$e.className=c;if(t)$e.appendChild(document.createTextNode(t));if(ch)if(!ch.length){$e.appendChild(ch);}else{for(var i=0;i<ch.length;i++)$e.appendChild(ch[i]);}return $e;}
            ,   get_imgs = function () {
                    slide.count += 1;
                    if (slide.count === slide.pages) {
                        slide.fin = true;
                    } 
                    var ul_id = ul + '_' + slide.count, new_ul = html_builder(ul, ul_id, 0, on), loop = 0, i;
                    for (i = 0; i < config.per_page; i += 1) {
                        new_ul.appendChild(html_builder(li, ul_id + '_li_' + i, 0, (i + 1) === config.per_page ? [config.loading, config.last] : config.loading));
                    }    
                    $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+config.api_key+'&photoset_id='+config.set_id+'&per_page='+config.per_page+'&page='+slide.count+'&format=json&jsoncallback=?', 
                        function (data) {
                            var photos = data.photoset.photo;
                            if (photos.length < config.per_page) {
                                slide.fin = true;
                            }
                            slide.pages = data.photoset.pages;
                            $.each(photos, function (i, photo) {
                                var li_id = ul_id + '_' + 'li' + '_' + i, img_id = ul_id + '_' + 'img' + '_' + i, img = new Image();
                                img.id = img_id;
                                img.alt = photo.title;
                                img.onload = function () {
                                    $(document.getElementById(li_id)).removeClass(config.loading);
                                    $(document.getElementById(img_id)).fadeIn(config.fade_speed);
                                };
                                img.src = 'http://farm'+photo.farm+'.static.flickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_'+config.size+'.jpg';
                                document.getElementById(li_id).appendChild(img);
                                loop += 1;
                            });
                        }
                    );
                    $slideshow_inner.append(new_ul);
                } 
            ,   $origin = $(this)
	        ,   slide = {	
			        count: 0,
                    fin: false,
                    auto_slider: function () {
                        window.clearTimeout(auto_scroll_caller);
                        auto_scroll_caller = setTimeout(slide.slide_left, config.auto_scroll);
                    },
                    reset: function () {
                        $slideshow_inner.animate({
                          left: 0
                        }, config.slide_speed);
                        $slideshow_inner.find(on_class).removeClass(on);
                        $slideshow_inner.find(ul + ':first-child').addClass(on);
                    },
			        slide_left: function() {
		                slide.last_ul = $origin.find(on_class).is(':last-child') ? true : false;
			            if (slide.fin) {
			                if (slide.last_ul) {    //  merge
    			                if (config.reset) {    //  merge
    			                    slide.reset();
			                    }
                            } else {
	                            $slideshow_inner.animate({
		                            left: '-=' + slide.width,
		                            width: '+=' + slide.width
	                            }, config.slide_speed, function () {
	                                $origin.find(on_class).removeClass(on).next().addClass(on);
	                            });
		                    }
                        } else {
                            if (!$slideshow_inner.is(animated)) {
                                if (slide.last_ul) {
			                        $slideshow_inner.animate({
				                        left: '-=' + slide.width,
				                        width: '+=' + slide.width
			                        }, config.slide_speed, function () {
                                        $origin.find(on_class).removeClass(on);
                                        get_imgs();
			                        });
			                    } else {
	                                $slideshow_inner.animate({
		                                left: '-=' + slide.width,
		                                width: '+=' + slide.width
	                                }, config.slide_speed, function () {
	                                    $origin.find(on_class).removeClass(on).next().addClass(on);
	                                });			                    
			                    }
                            }
                        }
                        if (config.auto_scroll && !isNaN(config.auto_scroll)) {
                            slide.auto_slider();
                        }      
		            },
			        slide_right: function () {
                        if (!$slideshow_inner.is(animated) && parseInt($slideshow_inner.css(left), 10) < 0) {	
				            $origin.find(on_class).removeClass(on).prev().addClass(on);
				            $slideshow_inner.animate({
					            left: '+=' + slide.width,
					            width: '+=' + slide.width							            
				            });
			            }
                        if (config.auto_scroll && !isNaN(config.auto_scroll)) {
                            slide.auto_slider();
                        }      			            
			        },
			        width: $origin.width()
		        }
        ;

        $.extend(config, options);  // TODO: use vanilla solution

        if (config.auto_scroll && !isNaN(config.auto_scroll)) {
            var auto_scroll_caller = setTimeout(slide.slide_left, config.auto_scroll);
        }
        if (!$origin.children().length) {
            $([html_builder(button, arrow_left, 0, 0, config.left_arrow), html_builder(button, arrow_right, 0, 0, config.right_arrow), html_builder(div, 0, 0, slideshow_inner_class)]).appendTo($origin);
            var $slideshow_inner = $origin.find('.' + slideshow_inner_class);
            get_imgs();
        }
        if (config.key_nav) {
            $(document).keyup(function (e) {
	            if (e.which === left_key) {
    	            slide.slide_right();
	            }
	            if (e.which === right_key) {
	                slide.slide_left();
	            }		
            });
        }
        $origin.delegate(button, 'click', function () {
            if (this.id === arrow_left) {
                slide.slide_right();
            } 
            if (this.id === arrow_right) {
                slide.slide_left();
            }
        });
        return this;
    };
})(jQuery);
