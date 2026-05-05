(function () {
    Lampa.Plugins.add('radio_test', function () {
        function open() {
            var s = [{title:'Hit FM',url:'https://online.hitfm.ua/HitFM'}];
            var l = Lampa.Template.get('items_list', {title:'Radio'});
            s.forEach(function(i){
                var c = Lampa.Template.get('card', {title:i.title,card_category:'UA'});
                c.on('hover:enter', function(){ Lampa.Player.play({url:i.url,title:i.title}); });
                l.find('.items-line').append(c);
            });
            Lampa.Select.show({container:l,onBack:function(){Lampa.Controller.toggle('main');}});
        }
        var m = $('<div class="menu__item selector"><div class="menu__ico"></div><div class="menu__text">Radio UA</div></div>');
        m.on('hover:enter', open);
        $('.menu .menu__list').append(m);
    });
})();
