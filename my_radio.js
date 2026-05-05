(function () {
    'use strict';

    function RadioPlugin(api) {
        this.create = function () {
            // Список станцій (можна додавати свої посилання)
            var stations = [
                { title: 'Hit FM', url: 'https://online.hitfm.ua/HitFM', img: 'https://static.hitfm.ua/logo.png' },
                { title: 'Radio ROKS', url: 'https://online.radioroks.ua/RadioROKS', img: 'https://static.radioroks.ua/logo.png' },
                { title: 'Kiss FM', url: 'https://online.kissfm.ua/KissFM', img: 'https://static.kissfm.ua/logo.png' },
                { title: 'Bayraktar', url: 'https://online.radiobayraktar.com.ua/RadioBayraktar', img: 'https://static.radiobayraktar.com.ua/logo.png' }
            ];

            // Створення головного екрану плагіна
            var view = Lampa.Template.get('items_list', { title: 'Українське Радіо' });
            
            stations.forEach(function (station) {
                var item = Lampa.Template.get('card', {
                    title: station.title,
                    card_category: 'Радіо'
                });

                item.find('.card__img').attr('src', station.img);
                
                item.on('hover:enter', function () {
                    Lampa.Player.play({
                        url: station.url,
                        title: station.title
                    });
                });

                view.find('.items-line').append(item);
            });

            Lampa.Select.show({
                container: view,
                onBack: function () {
                    Lampa.Controller.toggle('main');
                }
            });
        };
    }

    // Реєстрація плагіна в меню
    Lampa.Plugins.add('radio_ua', RadioPlugin);
})();
