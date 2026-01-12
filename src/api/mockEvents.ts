import event1 from '../assets/images/events/event1.png';
import event2 from '../assets/images/events/event2.png';
import event3 from '../assets/images/events/event3.png';
import event4 from '../assets/images/events/event4.png';
import event5 from '../assets/images/events/event5.png';
import event6 from '../assets/images/events/event6.png';


export interface Event {
  id: number;
  title: string;
  organizer: string;
  price: number | 'Бесплатно';
  imageUrl: string; // теперь это локальный путь
  category: string;
  date: string;
  location: string;
  description: string;
}

export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Концерт классической музыки",
    organizer: "Московская филармония",
    price: 2500,
    imageUrl: event1,
    category: "Всемирные праздники",
    date: "2025-12-15",
    location: "Москва, Большой зал консерватории",
    description: "Вечер классической музыки с участием известных музыкантов"
  },
  {
    id: 2,
    title: "Собрание любителей гончарного дела",
    organizer: "Гончарная студия № 1",
    price: "Бесплатно",
    imageUrl: event2,
    category: "Собрание любителей",
    date: "2025-12-10",
    location: "Москва, Ленинградский проспект, 20",
    description: "Работы современных российских художников"
  },
  {
    id: 3,
    title: "День рождение в пиратском стиле",
    organizer: "Иванов Иван",
    price: 1500,
    imageUrl: event3,
    category: "День рождение",
    date: "2025-12-08",
    location: "Москва, ул. Тверская, 15",
    description: "Урок йоги для начинающих и продолжающих"
  },
  {
    id: 4,
    title: "Вечеринка у Антона",
    organizer: "Зажигалов Антон",
    price: 3200,
    imageUrl: event4,
    category: "Вечеринка",
    date: "2025-12-12",
    location: "Москва, Кузнецкий мост, 12",
    description: "Учимся готовить итальянскую пасту"
  },
  {
    id: 5,
    title: "Технологическая конференция",
    organizer: "TechEvents",
    price: 5000,
    imageUrl: event5,
    category: "Конференция",
    date: "2025-12-20",
    location: "Москва, Сколково",
    description: "Обсуждение трендов в IT индустрии"
  },
  {
    id: 6,
    title: "Поэтический вечер",
    organizer: "Литературный клуб",
    price: "Бесплатно",
    imageUrl: event6,
    category: "Другое",
    date: "2025-12-18",
    location: "Москва, Булгаковский дом",
    description: "Чтение стихов современных поэтов"
  },
  {
    id: 7,
    title: "Квест 'найди меня, если сможешь'",
    organizer: "Quest Club Premium MSK",
    price: 4500,
    imageUrl: event1,
    category: "Квесты",
    date: "2025-12-14",
    location: "Москва, Пятницкая улица, 64",
    description: "Знакомство с французскими винами"
  },
  {
    id: 8,
    title: "День рождение Семена",
    organizer: "Тополенко Семен",
    price: "Бесплатно",
    imageUrl: event2,
    category: "День рождения",
    date: "2025-12-22",
    location: "Москва, Москва-Сити",
    description: "Презентация стартапов для инвесторов"
  },
   {
    id: 11,
    title: "Концерт классической музыки",
    organizer: "Московская филармония",
    price: 2500,
    imageUrl: event1,
    category: "Всемирные праздники",
    date: "2025-12-15",
    location: "Москва, Большой зал консерватории",
    description: "Вечер классической музыки с участием известных музыкантов"
  },
  {
    id: 12,
    title: "Собрание любителей гончарного дела",
    organizer: "Гончарная студия № 1",
    price: "Бесплатно",
    imageUrl: event2,
    category: "Собрание любителей",
    date: "2025-12-10",
    location: "Москва, Ленинградский проспект, 20",
    description: "Работы современных российских художников"
  },
  {
    id: 13,
    title: "День рождение в пиратском стиле",
    organizer: "Иванов Иван",
    price: 1500,
    imageUrl: event3,
    category: "День рождение",
    date: "2025-12-08",
    location: "Москва, ул. Тверская, 15",
    description: "Урок йоги для начинающих и продолжающих"
  },
  {
    id: 14,
    title: "Вечеринка у Антона",
    organizer: "Зажигалов Антон",
    price: 3200,
    imageUrl: event4,
    category: "Вечеринка",
    date: "2025-12-12",
    location: "Москва, Кузнецкий мост, 12",
    description: "Учимся готовить итальянскую пасту"
  },
  {
    id: 15,
    title: "Технологическая конференция",
    organizer: "TechEvents",
    price: 5000,
    imageUrl: event5,
    category: "Конференция",
    date: "2025-12-20",
    location: "Москва, Сколково",
    description: "Обсуждение трендов в IT индустрии"
  },
  {
    id: 16,
    title: "Поэтический вечер",
    organizer: "Литературный клуб",
    price: "Бесплатно",
    imageUrl: event6,
    category: "Другое",
    date: "2025-12-18",
    location: "Москва, Булгаковский дом",
    description: "Чтение стихов современных поэтов"
  },
  {
    id: 17,
    title: "Квест 'найди меня, если сможешь'",
    organizer: "Quest Club Premium MSK",
    price: 4500,
    imageUrl: event1,
    category: "Квесты",
    date: "2025-12-14",
    location: "Москва, Пятницкая улица, 64",
    description: "Знакомство с французскими винами"
  },
  {
    id: 18,
    title: "День рождение Семена",
    organizer: "Тополенко Семен",
    price: "Бесплатно",
    imageUrl: event2,
    category: "День рождения",
    date: "2025-12-22",
    location: "Москва, Москва-Сити",
    description: "Презентация стартапов для инвесторов"
  },
   {
    id: 21,
    title: "Концерт классической музыки",
    organizer: "Московская филармония",
    price: 2500,
    imageUrl: event1,
    category: "Всемирные праздники",
    date: "2025-12-15",
    location: "Москва, Большой зал консерватории",
    description: "Вечер классической музыки с участием известных музыкантов"
  },
  {
    id: 22,
    title: "Собрание любителей гончарного дела",
    organizer: "Гончарная студия № 1",
    price: "Бесплатно",
    imageUrl: event2,
    category: "Собрание любителей",
    date: "2025-12-10",
    location: "Москва, Ленинградский проспект, 20",
    description: "Работы современных российских художников"
  },
  {
    id: 23,
    title: "День рождение в пиратском стиле",
    organizer: "Иванов Иван",
    price: 1500,
    imageUrl: event3,
    category: "День рождение",
    date: "2025-12-08",
    location: "Москва, ул. Тверская, 15",
    description: "Урок йоги для начинающих и продолжающих"
  },
  {
    id: 24,
    title: "Вечеринка у Антона",
    organizer: "Зажигалов Антон",
    price: 3200,
    imageUrl: event4,
    category: "Вечеринка",
    date: "2025-12-12",
    location: "Москва, Кузнецкий мост, 12",
    description: "Учимся готовить итальянскую пасту"
  },
  {
    id: 25,
    title: "Технологическая конференция",
    organizer: "TechEvents",
    price: 5000,
    imageUrl: event5,
    category: "Конференция",
    date: "2025-12-20",
    location: "Москва, Сколково",
    description: "Обсуждение трендов в IT индустрии"
  },
  {
    id: 26,
    title: "Поэтический вечер",
    organizer: "Литературный клуб",
    price: "Бесплатно",
    imageUrl: event6,
    category: "Другое",
    date: "2025-12-18",
    location: "Москва, Булгаковский дом",
    description: "Чтение стихов современных поэтов"
  },
  {
    id: 27,
    title: "Квест 'найди меня, если сможешь'",
    organizer: "Quest Club Premium MSK",
    price: 4500,
    imageUrl: event1,
    category: "Квесты",
    date: "2025-12-14",
    location: "Москва, Пятницкая улица, 64",
    description: "Знакомство с французскими винами"
  },
  {
    id: 28,
    title: "День рождение Семена",
    organizer: "Тополенко Семен",
    price: "Бесплатно",
    imageUrl: event2,
    category: "День рождения",
    date: "2025-12-22",
    location: "Москва, Москва-Сити",
    description: "Презентация стартапов для инвесторов"
  }
];