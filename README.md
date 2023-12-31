# Веб-приложение "Каталог игр"

## Описание

Веб-приложение "Каталог игр" предоставляет удобный способ просмотра списка игр, их фильтрации, сортировки и просмотра подробной информации о каждой игре. Приложение разработано с использованием React, TypeScript, Redux Toolkit.

## Основные функции

### Главная страница

- Отображает список игр.
- Позволяет фильтровать игры по платформе и жанру.
- Предоставляет опции сортировки по различным критериям.
- Каждая игра в списке содержит следующую информацию:
  - Название
  - Дата релиза
  - Издатель
  - Жанр
  - Изображение

### Страница игры

- Показывает подробную информацию о выбранной игре.
- Включает в себя:
  - Название
  - Дата релиза
  - Издатель
  - Разработчик
  - Жанр
  - Изображение/постер
  - Карусель скриншотов
  - Системные требования
- Предоставляет кнопку для возврата на главную страницу.

### Индикаторы загрузки и обработка ошибок

- Отображаются индикаторы загрузки во время запросов к API.
- При возникновении ошибок пользователю предоставляется информация об ошибке.

### Адаптивный дизайн

- Веб-приложение адаптировано для использования как на мобильных устройствах, так и на настольных компьютерах.

### Кэширование данных

- Карточка игры кэшируется в локальном хранилище на 5 минут, что позволяет возвращаться к ней без дополнительных запросов в течение этого времени.
