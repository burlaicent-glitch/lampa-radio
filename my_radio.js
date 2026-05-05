(function () {
    'use strict';

    Lampa.Plugins.add('radio_plugin', function (api) {
        function show() {
            var scroll = Lampa.Template.get('items_list', {title: 'Радіо'});
            var stations = [
                {title: 'Hit FM', url: 'https://online.hitfm.ua/HitFM'},
                {title: 'Radio ROKS', url: 'https://online.radioroks.ua/RadioROKS'},
                {title: 'Kiss FM', url: 'https://online.kissfm.ua/KissFM'}
            ];

            stations.forEach(function (st) {
                var item = Lampa.Template.get('card', {title: st.title, card_category: 'UA'});
                item.on('hover:enter', function () {
                    Lampa.Player.play({url: st.url, title: st.title});
                });
                scroll.find('.items-line').append(item);
            });

            Lampa.Select.show({
                container: scroll,
                onBack: function () { Lampa.Controller.toggle('main'); }
            });
        }

        var menu_item = $('<div class="menu__item selector"><div class="menu__ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"></path><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></div><div class="menu__text">Радіо</div></div>');
        menu_item.on('hover:enter', show);
        $('.menu .menu__list').append(menu_item);
    });
})();
