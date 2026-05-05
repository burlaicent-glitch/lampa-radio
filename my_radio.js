(function () {
    'use strict';

    Lampa.Plugins.add('radio_ua_custom', function (api) {
        var storage_key = 'lampa_my_radio_list';

        function showRadio() {
            var stations = JSON.parse(localStorage.getItem(storage_key) || '[]');
            if (stations.length === 0) {
                stations = [
                    {title: 'Hit FM', url: 'https://online.hitfm.ua/HitFM'},
                    {title: 'Radio ROKS', url: 'https://online.radioroks.ua/RadioROKS'},
                    {title: 'Kiss FM', url: 'https://online.kissfm.ua/KissFM'}
                ];
            }

            var scroll = Lampa.Template.get('items_list', {title: 'Моє Радіо'});
            
            var add_btn = Lampa.Template.get('card', {title: 'Додати станцію', card_category: 'Налаштування'});
            add_btn.on('hover:enter', function () {
                Lampa.Input.edit({title: 'Назва радіо'}, function (name) {
                    if (name) {
                        Lampa.Input.edit({title: 'URL посилання (mp3)', value: 'http://'}, function (url) {
                            if (url) {
                                stations.push({title: name, url: url});
                                localStorage.setItem(storage_key, JSON.stringify(stations));
                                Lampa.Noty.show('Збережено! Перезайдіть у радіо');
                            }
                        });
                    }
                });
            });
            scroll.find('.items-line').append(add_btn);

            stations.forEach(function (st) {
                var item = Lampa.Template.get('card', {title: st.title, card_category: 'UA Radio'});
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

        var menu_item = $('<div class="menu__item selector" data-action="radio_ua">' +
            '<div class="menu__ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="13" rx="2" stroke="white" stroke-width="2"/><circle cx="12" cy="12.5" r="3.5" stroke="white" stroke-width="2"/><path d="M7 6V4H17V6" stroke="white" stroke-width="2"/></svg></div>' +
            '<div class="menu__text">Радіо</div>' +
        '</div>');

        menu_item.on('hover:enter', showRadio);
        $('.menu .menu__list').append(menu_item);
    });
})();
