//     jquery.sausage.js 0.1.0
//     (c) 2011 Christopher Cliff
//     Freely distributed under the MIT license.
//     For all details and documentation:
//     http://christophercliff.github.com/sausage

(function($, undefined){
    
    $.widget('cc.sausage', {
        
        // # Options
        
        options: {
            
            // ### page `string`
            //
            // Set the string to use to select the page elements.
            // 
            // Example:
            // 
            //      $(window)
            //          .sausage({
            //              page: '.my-page-selector'
            //          })
            //          ;
            //
            page: '.page',
            
            // ### content `function`
            // 
            // Set the content of the sausage elements. Use `i` and `$page` to render content dynamically from the page element.
            // 
            // Example:
            // 
            //      $(window)
            //          .sausage({
            //              content: function (i, $page) {
            //                  return '<div>' + $page.data('name') + '</div>';
            //          }
            //      })
            //      ;
            //
            content: function (i, $page) {
                return '<a class="sausage-a" href="' + i + '"><span class="sausage-span">' + (i + 1) + '</span></a>';
            }
            
        },
        
        _create: function () {
            
            var self = this,
                $el = self.element;
            
            self.blocked = true,
            // Use $el for the outer element.
            self.$outer = $el,
            // Use `body` for the inner element if the outer element is `window`. Otherwise, use the first child of `$el`.
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
            
            if (self.$outer.scrollTop() < 1)
            {
                self.destroy();
                
                return;
            }
            
            self.draw();
            self._update(self.options.current);
            self._events();
            self._delegates();
            
            self.$sausages
                .addClass('sausage-set-init')
                ;
            
            self.blocked = false;
            
            self._trigger('init');
            
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
            
            // [Prevent crazy amounts of scroll events from being fired](http://ejohn.org/blog/learning-from-twitter/) by setting an interval and listening.
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
        
        // # Methods
        
        // ### draw `.sausage("draw")`
        // 
        // Create the sausage UI.
        draw: function () {
            
            var self = this,
                h_win = self.$outer.height(),
                h_doc = self.$inner.height(),
                $items = self.$inner.find(self.options.page),
                $page,
                s = [];
            
            self.count = $items.length;
            
            // Detach from DOM while making changes.
            self.$sausages
                .detach()
                .empty()
                ;
            
            // Calculate the element heights and push to an array.
            for (var i = 0; i < self.count; i++)
            {
                $page = $items.eq(i);
                
                s.push('<div class="sausage' + ((i === self.current) ? ' sausage-current' : '') + '" style="height:' + ($page.outerHeight()/h_doc*h_win) + 'px;top:' + ($page.offset().top/h_doc*h_win) + 'px;">' + self.options.content(i, $page) + '</div>');
            }
            
            // Use Array.join() for speed.
            self.sausages.innerHTML = s.join('');
            
            // And reattach.
            self.$sausages
                .appendTo(self.$inner)
                ;
            
            return;
        },
        
        // ### block `.sausage("block")`
        // 
        // Prevent users from interacting with the sausage UI. Useful when loading data and updating the DOM.
        block: function () {
            
            var self = this,
                c = 'sausage-set-blocked';
            
            self.blocked = true;
            
            // Add a CSS class for styling purposes.
            self.$sausages
                .addClass(c)
                ;
            
            return;
        },
        
        // ### unblock `.sausage("unblock")`
        // 
        // Unblock the UI once loading and DOM manipulation are complete.
        unblock: function () {
            
            var self = this,
                c = 'sausage-set-blocked';
            
            self.$sausages
                .removeClass(c)
                ;
            
            self.blocked = false;
            
            return;
        },
        
        // ### destroy `.sausage("destroy")`
        // 
        // Remove the sausage instance from the DOM.
        destroy: function () {
            
            var self = this;
            
            self.element
                .remove()
                ;
            
            return;
        }
        
    });
    
})(jQuery);