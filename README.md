Нужно сверстать онлайн-сервис по мониторингу и уничтожению опасных астероидов на основе данных API NASA. 

АПИ: https://api.nasa.gov Asteroids - NeoWs

На главной список подлетов астероидов к Земле от текущей даты в бесконечность. Подгрузка при скролле порциями. По каждому астероиду: название, размер, оценка опасности, как близко будет к Земле, точная дата максимального подлёта. Иконка астероида в зависимости от размера (критерий малый-большой выбрать самостоятельно). И опция вывода расстояний: в километрах или расстояниях до Луны.

Адаптивная вёрстка.

Кнопка заказа отправляет заказ в корзину. Корзина — это плашка на странице списка. По нажатию на кнопку отправки открывается страница успешного заказа, где перечислены заказанные сближения.

У астероида есть своя страница. Там указаны данные астероида и список всех его сближений. По каждому сближению: скорость относительно Земли, время максимального сближения с Землей, расстояние до Земли, по орбите вокруг чего летит. Дизайн страницы астероида кандидат делает на своё усмотрение. 

https://www.figma.com/file/N9aUcWK3o189lZcwQyzU79/Armaggedon-V3?type=design&node-id=0%3A1&mode=design&t=nb1Hyl3qNhdm2c4a-1 
<ul>
<li>Использовать Next.js (также принимаются решения на React, если будет реализован SSR);</li>
<li>Использование redux нежелательно;</li>
<li>Стилизация с помощью CSS модулей;</li>
<li>Решение предоставить в виде git репозитория (github/bitbucket/gitlab по выбору);</li>
<li>Корректное отображение в последних версиях браузеров (chrome, firefox, safari, edge);</li>
</ul>
Будет плюсом:
<ul>
<li>использование TypeScript;</li>
<li>тесты;</li>
<li>если вы задеплоите ваш проект на любой удобный для вас хостинг;</li>
<li>документация/инструкция по сборке проекта (README);</li>
</ul>
