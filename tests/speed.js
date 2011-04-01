$(function(){
    
    var numbers = [],
        $el = $('<div>').appendTo('body');
    
    $el
        .sausage()
        ;
    
    JSLitmus.test('draw', function(count){
        while (count--)
        {
            $el.sausage("draw");
        }
    });
    
});