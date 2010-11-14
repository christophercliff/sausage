;(function($, window, document, undefined){
    
    $.widget('ctc.lazypages', {
        
        options: {
            count: 1,
            index: 0
        },
        
        _create: function () {
            
            var self = this;
            
            self.template = $('#lazypages');
            self.$lzps = $('<div class="lzp-set"/>');
            
            self.$lzps
                .appendTo(document.body)
                ;
            
            return;
        },
        
        _init: function () {
            
            var self = this;
            
            self.draw();
            self._events();
            self._delegates();
            
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
                ;
            
            return;
        },
        
        _delegates: function () {
            
            var self = this;
            
            self.$lzps
                .delegate('.lzp', 'hover', function(){
                    
                    $(this)
                        .toggleClass('lzp-hover')
                        ;
                    
                })
                .delegate('.lzp-a', 'click', function(e){
                    e.preventDefault();
                    
                    var val = $(this).closest('.lzp').index(),
                        o = self.element.children().eq(val).offset().top;
                    
                    $(window)
                        .scrollTop(o)
                        ;
                    
                })
                ;
            
            return;
        },
        
        draw: function () {
            
            var self = this,
                $el = self.element,
                h_win = $(window).height(),
                h_doc = $(document).height();
            
            self.$lzps
                .empty()
                ;
            
            $el.children()
                .each(function(i){
                    
                    var $page = $(this),
                        o_page_rel = $page.offset().top/h_doc*h_win,
                        h_page_rel = $page.outerHeight()/h_doc*h_win;
                    
                    self.template
                        .tmpl({
                            h_page_rel: h_page_rel,
                            o_page_rel: o_page_rel,
                            href: i,
                            title: i + 1
                        })
                        .appendTo(self.$lzps)
                        ;
                    
                })
                ;
            
            return;
        },
        
        block: function () {
            
            
            
        },
        
        unblock: function () {
            
            
            
        }
        
    });
    
})(jQuery, this, this.document);