// src/store/constants/accountStatus.ts
export const ACCOUNT_STATUS = {
  UNVERIFIED: 'unverified',     // Не подтвержден
  VERIFIED: 'verified',         // Подтвержден
  TRUSTED: 'trusted',          // Доверенный
  ORGANIZATION: 'organization', // Организация
  PARTNER: 'partner',          // Партнер
  ADMIN: 'admin'               // Администратор
} as const;

export type AccountStatusType = keyof typeof ACCOUNT_STATUS;

export const STATUS_CONFIG = {
  [ACCOUNT_STATUS.UNVERIFIED]: {
    label: 'Не подтвержден',
    color: '#dc3545',
    badge: '🚫',
    description: 'Требуется подтверждение email'
  },
  [ACCOUNT_STATUS.VERIFIED]: {
    label: 'Подтвержден',
    color: '#28a745',
    badge: '✅',
    description: 'Обычный пользователь'
  },
  [ACCOUNT_STATUS.TRUSTED]: {
    label: 'Доверенный',
    color: '#17a2b8',
    badge: '⭐',
    description: 'Активный пользователь'
  },
  [ACCOUNT_STATUS.ORGANIZATION]: {
    label: 'Организация',
    color: '#7b1fa2',
    badge: '🏢',
    description: 'Официальная компания'
  },
  [ACCOUNT_STATUS.PARTNER]: {
    label: 'Партнер',
    color: '#fd7e14',
    badge: '🤝',
    description: 'Партнер платформы'
  },
  [ACCOUNT_STATUS.ADMIN]: {
    label: 'Администратор',
    color: '#6f42c1',
    badge: '👑',
    description: 'Администратор'
  }
} as const;

export const ORGANIZATION_PRIVILEGES = {
  VERIFIED_BADGE: 'verified_badge',
  EXTENDED_PROFILE: 'extended_profile',
  COMPANY_DESCRIPTION: 'company_desc',
  CONTACTS_SECTION: 'contacts',
  MULTIPLE_ADMINS: 'multiple_admins',
  ANALYTICS_ACCESS: 'analytics',
  PROMOTED_EVENTS: 'promoted_events',
  CUSTOM_DOMAIN: 'custom_domain',
  API_ACCESS: 'api_access',
  PRIORITY_SUPPORT: 'priority_support'
} as const;

export const ORGANIZATION_PLANS = {
  FREE: {
    name: 'Базовый',
    price: 0,
    features: [
      'Бейдж организации',
      'Расширенный профиль',
      'До 5 администраторов'
    ]
  },
  PRO: {
    name: 'Профессиональный',
    price: 2990,
    features: [
      'Аналитика мероприятий',
      'Приоритет в поиске',
      'Кастомный домен',
      'API доступ'
    ]
  }
} as const;