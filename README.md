# ETog — Events Together

Современное React-приложение с TypeScript для создания и участия в мероприятиях. Проект разрабатывается командой:
- **Зюзичев Иван Сергеевич** (Фронтенд-разработка)
- **Мельниченко Игорь Дмитриевич** (Бекенд-разработка)
- **Тополенко Семен Иванович** (Аналитик) 

![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![ESLint](https://img.shields.io/badge/ESLint-9.33-red)

## Возможности

### Технические
- **Современный стек**: React 19, TypeScript 5.8, Vite 7
- **Строгая типобезопасность**: Настроенные tsconfig с Project References
- **Качество кода**: Prettier + ESLint с автофиксом в pre-commit
- **Быстрая сборка**: Оптимизированная конфигурация Vite
- **PWA-ready**: Базовая структура для Progressive Web App

### Функциональные
- Создание и управление мероприятиями
- Система подписок и рекомендаций
- Адаптивный дизайн с поддержкой тем
- JWT-аутентификация
- Навигация с React Router DOM
- Модульная архитектура компонентов
- TypeScript для типобезопасности
- Responsive дизайн
- Настроенное форматирование кода
- Быстрая сборка с Vite
- Изменение данных профиля
- Вывод мероприятий
- Создание новых мероприятий
- Подписка на пользователей
- Авторизация
- Регистрация
- Сброс пароля
- Удаление аккаунта
- Изменение данных аккаунта
- Удаление мероприятий
- Перемещение мероприятий в архив

## Технологии

### Frontend
- **React 19** с хуками и современными паттернами
- **TypeScript** с строгими проверками
- **React Router DOM** для навигации
- **Sass/SCSS** для стилизации

### Инструменты
- **Vite 7** - сборщик и dev-сервер
- **ESLint 9** (flat config) + TypeScript ESLint
- **Prettier** с настроенными правилами
- **Husky** + **lint-staged** для pre-commit хуков

## Архитектура

src/
├── components/ # Переиспользуемые UI компоненты
├── declaration/ # Декларации работы TypeScript
├── pages/ # Страницы приложения
├── hooks/ # Кастомные React хуки
├── theme/ # Система тем
├── router/ # Конфигурация маршрутизации
└── assets/ # Статические ресурсы

## Доступные команды

# Development
npm run dev              # Запуск dev-сервера
npm run preview          # Просмотр production сборки

# Code Quality
npm run lint            # Проверка кода ESLint
npm run format          # Форматирование кода Prettier
npm run format:check    # Проверка форматирования

# Build
npm run build           # Production сборка

# Local Server (Test)
npx serve -s dist       # Запускает локальный сервер для папки dist/

# Docker

docker-compose down     # Остановить приложение

docker-compose restart   # Перезапустить

docker-compose up -d --build # Сборка проекта

docker-compose up -d # Запуск приложения (Если сборка уже была) - продакшен версия (Порт 3000)

docker-compose -f docker-compose.dev.yml up --build # Запуск приложения - версия для разработки (Порт 5173)

docker-compose logs -f   # Просмотр логов в реальном времени

## Конфигурация

Проект использует современные инструменты конфигурации:

TypeScript: Project References с разделением на app/node

ESLint: Flat config с поддержкой React 19 и TypeScript

Prettier: Настроенные правила для TypeScript/React

Vite: Оптимизированная сборка с React plugin

## Система тем

CSS Variables для динамического переключения

Сохранением предпочтений в cookie

Автоопределением системных предпочтений

## Безопасность

Валидация JWT токенов

Защищенные маршруты

Безопасная обработка пользовательских данных

## Контакты

### Иван Зюзичев (Frontend Lead)

### Telegram: @Ivanziz

### Email: ivan.ziuzichev@gmail.com

### Игорь Мельниченко (Backend)

### Семен Тополенко (Analytics)

## Лицензия

Все права защищены.

## Быстрый старт

### Предварительные требования
- Node.js 18+ 
- npm, yarn или pnpm

### Установка и запуск
```bash
# Клонирование репозитория
git clone https://github.com/IvanZuzichev/ETog
cd etog-app

# Установка зависимостей
npm install

# Запуск development сервера
npm run dev