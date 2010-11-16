;(function($, window, document, undefined){
    
    $.widget('ctc.lazypages', {
        
        options: {
            current: 0
        },
        
        _create: function () {
            
            var self = this;
            
            self.$lazypages = $('<ol class="lzp-set"/>');
            
            self.$lazypages
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
            
            $(window)
                .resize(function(){
                    
                    self.draw();
                    
                })
                .scroll(function(e){
                    
                    var st = $(window).scrollTop(),
                        h_win = $(window).height(),
                        h_doc = $(document).height(),
                        i = Math.floor((st + h_win/2)/h_doc*self.count);
                    
                    self._update(i);
                    
                })
                ;
            
            return;
        },
        
        _delegates: function () {
            
            var self = this;
            
            self.$lazypages
                .delegate('.lzp', 'hover', function(){
                    
                    $(this)
                        .toggleClass('lzp-hover')
                        ;
                    
                })
                .delegate('.lzp-a', 'click', function(e){
                    e.preventDefault();
                    
                    var $lzp = $(this).closest('.lzp'),
                        val = $lzp.index(),
                        o = self.element.children().eq(val).offset().top;
                    
                    $(window)
                        .scrollTop(o)
                        ;
                    
                    self._trigger('onClick');
                    
                    if ($lzp.hasClass('current'))
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
                c = 'lzp-current';
            
            if (i === self.current)
            {
                return;
            }
            
            self.current = i;
            
            self.$lazypages.children().eq(i)
                .addClass(c)
            .siblings()
                .removeClass(c)
                ;
            
            self._trigger('update');
            
            return;
        },
        
        draw: function () {
            
            var self = this,
                h_win = $(window).height(),
                h_doc = $(document).height(),
                $items = self.element.children(),
                i,
                $page;
            
            self.count = $items.length,
            
            self.$lazypages
                .detach()
                .empty()
                ;
            
            for (i = 0; i < self.count; i++)
            {
                $page = $items.eq(i);
                
                self.$lazypages.append('<li class="lzp' + ((i === self.current) ? ' lzp-current' : '') + '" style="height:' + ($page.outerHeight()/h_doc*h_win) + 'px;top:' + ($page.offset().top/h_doc*h_win) + 'px;"><a class="lzp-a" href="' + i + '"><span class="lzp-span">' + (i + 1) + '</span></a></li>');
            }
            
            self.$lazypages
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
    
})(jQuery, this, this.document);