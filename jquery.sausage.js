// Copyright 2010, [Christopher Cliff](http://christophercliff.com). Dual licensed under the MIT or GPL Version 2 licenses.
//
// [Source](https://github.com/christophercliff/sausage)


(function($, undefined){
    
    $.widget('ctc.sausage', {
        
        options: {
            current: 0
        },
        
        _create: function () {
            
            var self = this;
            
            self.$sausages = $('<ol class="sausage-set"/>');
            self.sausages = self.$sausages.get(0);
            
            self.$sausages
                .appendTo(document.body)
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
            
            self._trigger('init');
            
            return;
        },
        
        _destroy: function () {
            
            //// TODO: implement destroy
            
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
                    
                    $(this)
                        .toggleClass('sausage-hover')
                        ;
                    
                })
                .delegate('.sausage-a', 'click', function(e){
                    e.preventDefault();
                    
                    var $sausage = $(this).closest('.sausage'),
                        val = $sausage.index(),
                        o = self.element.children().eq(val).offset().top;
                    
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
            
            if (i === self.current)
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
                h_win = window.innerHeight,
                h_doc = document.body.clientHeight,
                $items = self.element.children(),
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
                
                s.push('<li class="sausage' + ((i === self.current) ? ' sausage-current' : '') + '" style="height:' + ($page.outerHeight()/h_doc*h_win) + 'px;top:' + ($page.offset().top/h_doc*h_win) + 'px;"><a class="sausage-a" href="' + i + '"><span class="sausage-span">' + (i + 1) + '</span></a></li>');
            }
            
            self.sausages.innerHTML = s.join('');
            
            self.$sausages
                .appendTo(document.body)
                ;
            
            return;
        },
        
        block: function () {
            
            //// TODO: implement block
            
        },
        
        unblock: function () {
            
            //// TODO: implement unblock
            
        }
        
    });
    
})(jQuery);