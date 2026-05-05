(function () {
    'use strict';
    Lampa.Plugins.add('radio_fixed', function (api) {
        function showRadio() {
            var stations = [
                {title: 'Hit FM', url: 'https://online.hitfm.ua/HitFM'},
                {title: 'Radio ROKS', url: 'https://online.radioroks.ua/RadioROKS'},
                {title: 'Kiss FM', url: 'https://online.kissfm.ua/KissFM'}
            ];
            var scroll = Lampa.Template.get('items_list', {title: 'Радіо UA'});
            stations.forEach(function (st) {
                var item = Lampa.Template.get('card', {title: st.title, card_category: 'RADIO'});
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
        var item = $('<div class="menu__item selector" data-action="radio"><div class="menu__ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 12h18M3 12a9 9 0 0 1 18 0M3 12v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/></svg></div><div class="menu__text">Радіо</div></div>');
        item.on('hover:enter', showRadio);
        $('.menu .menu__list').append(item);
    });
})();
