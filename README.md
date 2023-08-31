Решение следующего ТЗ:

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


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
