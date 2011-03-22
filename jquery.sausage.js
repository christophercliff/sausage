// Copyright 2010, [Christopher Cliff](http://christophercliff.com). Dual licensed under the MIT or GPL Version 2 licenses.
//
// [Source](https://github.com/christophercliff/sausage)


(function($, undefined){
    
    $.widget('cc.sausage', {
        
        // # options
        options: {
            
            // ## page
            // 
            // a selector used to define the page set
            
            page: '.page',
            
            // ## content
            // 
            // a function that determines the content of the sausage link
            
            content: function (i, $page) {
                return '<a class="sausage-a" href="' + i + '"><span class="sausage-span">' + (i + 1) + '</span></a>';
            }
            
        },
        
        _create: function () {
            
            var self = this,
                $el = self.element;
            
            self.blocked = true,
            self.$outer = $el,
            self.$inner = $.isWindow(self.element.get(0)) ? $('body') : $el.children(':first-child'),
            self.$sausages = $('<div class="sausage-set"/>');
            self.sausages = self.$sausages.get(0);
            
            self.$sausages
                .appendTo(self.$inner)
                ;
            
            self._trigger('create');
            
            return;
        },
        
        _init: function () {
            
            var self = this;
            
            self.draw();
            self._update(self.options.current);
            self._events();
            self._delegates();
            
            self.blocked = false;
            
            self.$sausages
                .addClass('sausage-set-init')
                ;
            
            self._trigger('init');
            
            return;
        },
        
        _destroy: function () {
            
            var self = this;
            
            self.$element
                .remove()
                ;
            
            self.window
            
            return;
        },
        
        _events: function () {
            
            var self = this;
            
            self.hasScrolled = false;
            
            $(window)
                .resize(function(){
                    
                    self.draw();
                    
                })
                .scroll(function(e){
                    
                    self.hasScrolled = true;
                    
                })
                ;
            
            // prevent crazy amounts of scroll events
            setInterval(function(){
                
                if (!self.hasScrolled)
                {
                    return;
                }
                
                self.hasScrolled = true;
                
                var st = $(window).scrollTop(),
                    h_win = $(window).height(),
                    h_doc = $(document).height(),
                    i = Math.floor((st + h_win/2)/h_doc*self.count);
                
                self._update(i);
                
            }, 250);
            
            return;
        },
        
        _delegates: function () {
            
            var self = this;
            
            self.$sausages
                .delegate('.sausage', 'hover', function(){
                    
                    if (self.blocked)
                    {
                        return;
                    }
                    
                    $(this)
                        .toggleClass('sausage-hover')
                        ;
                    
                })
                .delegate('.sausage', 'click', function(e){
                    e.preventDefault();
                    
                    if (self.blocked)
                    {
                        return;
                    }
                    
                    var $sausage = $(this),
                        val = $sausage.index(),
                        o = self.$inner.find(self.options.page).eq(val).offset().top;
                    
                    $(window)
                        .scrollTop(o)
                        ;
                    
                    self._trigger('onClick');
                    
                    if ($sausage.hasClass('current'))
                    {
                        return;
                    }
                    
                    self._trigger('onUpdate');
                })
                ;
            
            return;
        },
        
        _update: function (i) {
            
            var self = this;
                c = 'sausage-current';
            
            if (i === self.current || self.blocked)
            {
                return;
            }
            
            self.current = i;
            
            self.$sausages.children().eq(i)
                .addClass(c)
            .siblings()
                .removeClass(c)
                ;
            
            self._trigger('update');
            
            return;
        },
        
        draw: function () {
            
            var self = this,
                h_win = self.$outer.height(),
                h_doc = self.$inner.height(),
                $items = self.$inner.find(self.options.page),
                $page,
                s = [];
            
            self.count = $items.length;
            
            self.$sausages
                .detach()
                .empty()
                ;
            
            for (var i = 0; i < self.count; i++)
            {
                $page = $items.eq(i);
                
                s.push('<div class="sausage' + ((i === self.current) ? ' sausage-current' : '') + '" style="height:' + ($page.outerHeight()/h_doc*h_win) + 'px;top:' + ($page.offset().top/h_doc*h_win) + 'px;">' + self.options.content(i, $page) + '</div>');
            }
            
            self.sausages.innerHTML = s.join('');
            
            self.$sausages
                .appendTo(self.$inner)
                ;
            
            return;
        },
        
        block: function () {
            
            var self = this,
                c = 'sausage-set-blocked';
            
            self.blocked = true;
            
            self.$sausages
                .addClass(c)
                ;
            
            return;
        },
        
        unblock: function () {
            
            var self = this,
                c = 'sausage-set-blocked';
            
            self.$sausages
                .removeClass(c)
                ;
            
            self.blocked = false;
            
            return;
        }
        
    });
    
})(jQuery);