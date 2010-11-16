;(function($, window, document, undefined){
    
    $.widget('ctc.sausages', {
        
        options: {
            current: 0
        },
        
        _create: function () {
            
            var self = this;
            
            self.$sausages = $('<ol class="sausage-set"/>');
            
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
                h_win = $(window).height(),
                h_doc = $(document).height(),
                $items = self.element.children(),
                i,
                $page;
            
            self.count = $items.length,
            
            self.$sausages
                .detach()
                .empty()
                ;
            
            for (i = 0; i < self.count; i++)
            {
                $page = $items.eq(i);
                
                self.$sausages.append('<li class="sausage' + ((i === self.current) ? ' sausage-current' : '') + '" style="height:' + ($page.outerHeight()/h_doc*h_win) + 'px;top:' + ($page.offset().top/h_doc*h_win) + 'px;"><a class="sausage-a" href="' + i + '"><span class="sausage-span">' + (i + 1) + '</span></a></li>');
            }
            
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
    
})(jQuery, this, this.document);