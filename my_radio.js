(function () {
    'use strict';

    function RadioCustomPlugin(api) {
        var storage_key = 'lampa_custom_radio_list';

        // Функція для отримання списку станцій з пам'яті
        function getSavedStations() {
            var saved = localStorage.getItem(storage_key);
            return saved ? JSON.parse(saved) : [
                { title: 'Hit FM', url: 'https://online.hitfm.ua/HitFM' },
                { title: 'Radio ROKS', url: 'https://online.radioroks.ua/RadioROKS' }
            ];
        }

        // Функція для збереження нової станції
        function saveStation(title, url) {
            var stations = getSavedStations();
            stations.push({ title: title, url: url });
            localStorage.setItem(storage_key, JSON.stringify(stations));
            Lampa.Noty.show('Станцію додано!');
            renderAll(); // Перемалювати список
        }

        this.create = function () {
            this.renderAll();
        };

        this.renderAll = function () {
            var stations = getSavedStations();
            var scroll = Lampa.Template.get('items_list', { title: 'Моє Радіо' });
            
            // Кнопка "Додати свою станцію"
            var add_btn = Lampa.Template.get('card', { title: 'ДОДАТИ НОВУ', card_category: 'Налаштування' });
            add_btn.on('hover:enter', function () {
                // Виклик екранної клавіатури Lampa для введення назви та посилання
                Lampa.Input.edit({
                    title: 'Назва радіо',
                    value: ''
                }, function (name) {
                    if (name) {
                        Lampa.Input.edit({
                            title: 'URL посилання (mp3/m3u8)',
                            value: 'http://'
                        }, function (url) {
                            if (url) saveStation(name, url);
                        });
                    }
                });
            });
            scroll.find('.items-line').append(add_btn);

            // Виведення списку станцій
            stations.forEach(function (station) {
                var item = Lampa.Template.get('card', { title: station.title, card_category: 'Радіо UA' });
                item.on('hover:enter', function () {
                    Lampa.Player.play({
                        url: station.url,
                        title: station.title
                    });
                });
                scroll.find('.items-line').append(item);
            });

            Lampa.Select.show({
                container: scroll,
                onBack: function () {
                    Lampa.Controller.toggle('main');
                }
            });
        };
    }

    Lampa.Plugins.add('custom_radio', RadioCustomPlugin);
})();
