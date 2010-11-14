LazyPages
===========

A contextual pagination jQuery plugin for infinite scrolling pages. Early days--pretty rough at the moment. Check the demo!

The goal is to contextualize the infinite scrolling experience, rather than let the user scroll into a bottomless pit. Receive instant feedback when pages are added and easily navigate to previously viewed pages.

A Picture!
--------------

![Alt text](http://s3.amazonaws.com/forrst-production/posts/snaps/39102/original.png?1289710907)

Demos
--------------

- [Basic](http://christophercliff.github.com/lazypages/demos/basic.html "Basic")

Requirements
-------------

- jQuery 1.4.3
- jQuery UI 1.8.5
- jQuery Templates

Usage
-------------

    $('.myPages')
        .lazypages()
        ;

Presumably, you have some callbacks available for lazy loading additional data. If that's the case, you can do the following:

    ...
    startLoadingSomeData: function () {
    
        $('.myPages')
            .lazypages('block')
            ;
    
    },
    gotTheDataAndInsertedInDOM: function () {
    
        $('.myPages')
            .lazypages('draw')
            ;
    
        $('.myPages')
            .lazypages('unblock')
            ;
    }
    ...

Future development/TODOs
-------------

- Graceful degredation/cross-browser compatibility
- Customizable tooltips (e.g. page name, thumbnail, etc.)
- Blocking
- BUG: alignment gets progressively worse as pages are added, need to investigate...
- Highlight the current page
- Scale to 100+ pages (&#8734; pages!?!?)