import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState, useRef } from 'react';
import './AccountContent.scss';
import { useNavigate } from 'react-router-dom';
import { PHOTO_CONSTANTS } from '../../store/constants/photoTypeOptions';
import { useDataProtection } from '../../hooks/useDataProtection';
import { useBlacklist } from '../../hooks/useBlackList';
import { useGlobalAvatar } from '../../hooks/useGlobalAvatar';
import { ThemeToggleCompact } from '../ConfigurationContent/ThemeToggleCompact/ThemeToggleCompact';
import { 
  ACCOUNT_STATUS, 
  STATUS_CONFIG,
  ORGANIZATION_PLANS 
} from '../../store/constants/accountStatus';
import AccountPhoto from '../../assets/Photo/User.png';

interface AccountContentData {
  login: string;
  email: string;
  description: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface AccountContentDataProps {
  formData: AccountContentData;
  onFormChange: (field: string, value: string) => void;
  accountStatus?: string;
  className?: string;
  rating?: number; // рейтинг от 0 до 5
  reviewCount?: number; // количество отзывов
  userId?: string; // ID пользователя для ссылки
}

export const AccountContent: React.FC<AccountContentDataProps> = ({ 
  formData, 
  onFormChange, 
  accountStatus = ACCOUNT_STATUS.UNVERIFIED,
  className = '',
  rating = 4.5,
  reviewCount = 12,
  userId = '12345' // Моковый ID пользователя
}) => {
  const [errors, setErrors] = useState<{ 
    login?: string; 
    email?: string; 
    description?: string;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { avatar, updateAvatar } = useGlobalAvatar();
  const { hashData, generateSecureId } = useDataProtection();
  const { validateInput } = useBlacklist();

  useThemeApply();
  const navigate = useNavigate();

  const statusConfig = STATUS_CONFIG[accountStatus as keyof typeof STATUS_CONFIG] || STATUS_CONFIG[ACCOUNT_STATUS.UNVERIFIED];

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;

    const limit = PHOTO_CONSTANTS.FIELD_LIMITS[field as keyof typeof PHOTO_CONSTANTS.FIELD_LIMITS];
    if (limit && value.length > limit) {
      setErrors(prev => ({
        ...prev,
        [field]: `Максимальная длина: ${limit} символов`,
      }));
      return;
    }

    if (field === 'description') {
      const blacklistValidation = validateInput(value);
      if (blacklistValidation.containsBlacklistedWords) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Описание содержит запрещенные слова',
        }));
        return;
      }
    }

    onFormChange(field, value);
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!PHOTO_CONSTANTS.ALLOWED_AVATAR_TYPES.includes(file.type as any)) {
        alert(PHOTO_CONSTANTS.ERROR_MESSAGES.INVALID_FILE_TYPE);
        return;
      }

      if (file.size > PHOTO_CONSTANTS.MAX_FILE_SIZE) {
        alert(PHOTO_CONSTANTS.ERROR_MESSAGES.FILE_TOO_LARGE);
        return;
      }

      const avatarUrl = URL.createObjectURL(file);
      updateAvatar(avatarUrl);

      console.log('Аватарка загружена:', {
        name: file.name,
        size: file.size,
        type: file.type,
        secureId: generateSecureId(),
      });
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Валидация основных полей
    if (!formData.login) {
      newErrors.login = PHOTO_CONSTANTS.ERROR_MESSAGES.LOGIN_REQUIRED;
    } else if (formData.login.length > PHOTO_CONSTANTS.FIELD_LIMITS.login) {
      newErrors.login = `Логин не должен превышать ${PHOTO_CONSTANTS.FIELD_LIMITS.login} символов`;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.login)) {
      newErrors.login = 'Логин может содержать только буквы, цифры и нижнее подчеркивание';
    }

    if (!formData.email) {
      newErrors.email = PHOTO_CONSTANTS.ERROR_MESSAGES.EMAIL_REQUIRED;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = PHOTO_CONSTANTS.ERROR_MESSAGES.EMAIL_INVALID;
    } else if (formData.email.length > PHOTO_CONSTANTS.FIELD_LIMITS.email) {
      newErrors.email = `Email не должен превышать ${PHOTO_CONSTANTS.FIELD_LIMITS.email} символов`;
    }

    // Валидация полей смены пароля
    if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.oldPassword) {
        newErrors.oldPassword = 'Введите старый пароль';
      }

      if (!formData.newPassword) {
        newErrors.newPassword = 'Введите новый пароль';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Новый пароль должен быть не менее 6 символов';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
        newErrors.newPassword = 'Пароль должен содержать заглавные и строчные буквы, а также цифры';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Повторите новый пароль';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }
    }

    const descriptionValidation = validateInput(formData.description);
    if (descriptionValidation.containsBlacklistedWords) {
      newErrors.description = 'Описание содержит запрещенные слова';
    } else if (formData.description.length > PHOTO_CONSTANTS.FIELD_LIMITS.description) {
      newErrors.description = `Описание не должно превышать ${PHOTO_CONSTANTS.FIELD_LIMITS.description} символов`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const updateId = generateSecureId();
      const normalizedEmail = formData.email.trim().toLowerCase();
      const normalizedLogin = formData.login.trim();

      const secureDataForAPI = {
        updateId,
        login: normalizedLogin,
        email: normalizedEmail,
        description: formData.description || '',
        avatarChanged: avatar !== AccountPhoto,
        updateTime: Date.now(),
        ...(formData.newPassword && {
          passwordHash: hashData(formData.newPassword),
          passwordChanged: true
        })
      };

      const accountDataMessage = `
      Вы ввели данные:
      Логин: ${formData.login}
      Email: ${formData.email}
      Описание: ${formData.description || 'Не указано'}
      ${formData.newPassword ? 'Пароль: Изменен' : 'Пароль: Без изменений'}
      Аватарка: ${avatar !== AccountPhoto ? 'Обновлена' : 'По умолчанию'}
      
      Для API будут переданы защищенные данные:
      ID обновления: ${secureDataForAPI.updateId.substring(0, 8)}...
      Логин: ${secureDataForAPI.login}
      Email: ${secureDataForAPI.email}
      ${formData.newPassword ? 'Пароль: Изменен' : 'Пароль: Без изменений'}
      `.trim();

      alert(accountDataMessage);
      alert('Данные успешно обновлены!');
      
      // Сброс полей смены пароля после успешного обновления
      if (formData.newPassword) {
        onFormChange('oldPassword', '');
        onFormChange('newPassword', '');
        onFormChange('confirmPassword', '');
      }
    } catch (error) {
      console.error('Ошибка обновления данных:', error);
      alert('Ошибка при обновлении данных. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    const isConfirmed = window.confirm('ВНИМАНИЕ! Вы точно хотите удалить профиль? Это действие необратимо!');

    if (isConfirmed) {
      try {
        localStorage.removeItem('user_session');
        localStorage.removeItem('user_profile_data');
        localStorage.removeItem('user_avatar');
        localStorage.removeItem('user_registration_data');
        
        updateAvatar('');

        alert('Профиль успешно удален');
        navigate('/');
      } catch (error) {
        console.error('Ошибка при удалении профиля:', error);
        alert('Ошибка при удаления профиля');
      }
    }

    setDeleteConfirm(false);
  };

  const handleLogout = () => {
    const isConfirmed = window.confirm('Вы действительно хотите выйти из аккаунта?');
    
    if (isConfirmed) {
      try {
        localStorage.removeItem('user_session');
        localStorage.removeItem('user_auth_token');
        updateAvatar('');
        
        alert('Вы успешно вышли из аккаунта');
        navigate('/');
      } catch (error) {
        console.error('Ошибка при выходе из аккаунта:', error);
        alert('Ошибка при выходе из аккаунта');
      }
    }
  };

  const handleShareAccount = () => {
    const accountUrl = `${window.location.origin}/user/${userId}`;
    navigator.clipboard.writeText(accountUrl)
      .then(() => {
        alert(`Ссылка на профиль скопирована в буфер обмена:\n${accountUrl}`);
      })
      .catch(() => {
        alert('Не удалось скопировать ссылку. Скопируйте вручную:\n' + accountUrl);
      });
  };

  const renderStars = () => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    let starsString = '';
    
    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        starsString += '★';
      } else if (i === filledStars + 1 && hasHalfStar) {
        starsString += '☆';
      } else {
        starsString += '☆';
      }
    }
    
    return starsString;
  };

  return (
  <div className='main-page-wrapper'>
    <div className='account-section'>
    <div className={`accountcontent-container ${className}`}>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleAvatarSelect}
        accept={PHOTO_CONSTANTS.FILE_ACCEPT}
        style={{ display: 'none' }}
      />

      <div className='profile-header'>
        <h1 className='profile-title'>Личные данные профиля</h1>
      </div>

      <div className='profile-content'>
        <div className='profile-left'>
          <div className='profile-photo-container'>
            <div className='profile-photo' onClick={handleAvatarUpload} style={{ cursor: 'pointer' }}>
              <img src={avatar || AccountPhoto} alt='Profile' className='profile-image' />
              <div className='avatar-overlay'></div>
            </div>
            
            {/* Рейтинг и отзывы */}
            <div className='rating-section'>
              <div className='stars-container'>
                <span className='stars-text' title={`Рейтинг: ${rating.toFixed(1)} из 5`}>
                  {renderStars()}
                </span>
                <span className='rating-value'>{rating.toFixed(1)}</span>
              </div>
              <div className='reviews-count' title={`Количество отзывов: ${reviewCount}`}>
                {reviewCount} {reviewCount === 1 ? 'отзыв' : reviewCount >= 2 && reviewCount <= 4 ? 'отзыва' : 'отзывов'}
              </div>
            </div>

            {/* Статус аккаунта (без стикера) */}
            <div 
              className='account-status' 
              style={{ color: statusConfig.color }}
              title={statusConfig.description}
            >
              {statusConfig.label}
            </div>
            <ThemeToggleCompact/>
          </div>
        </div>

        <div className='profile-right'>
          <form className='accountcontent-form' onSubmit={handleSubmit}>
            <div className='two-column-layout'>
              {/* Левая колонка: Основные данные */}
              <div className='left-column'>
                <h3 className='column-title'>Основные данные</h3>
                
                <div className='form-field'>
                  <label htmlFor='login' className='form-label'>
                    Ваш логин
                  </label>
                  <input
                    id='login'
                    type='text'
                    value={formData.login}
                    onChange={handleInputChange('login')}
                    className='form-input'
                    placeholder='Введите ваш логин'
                    required
                    maxLength={PHOTO_CONSTANTS.FIELD_LIMITS.login}
                    disabled={isSubmitting}
                  />
                  <div className='character-count-right'>
                    {formData.login.length}/{PHOTO_CONSTANTS.FIELD_LIMITS.login}
                  </div>
                  {errors.login && <span className='error-message'>{errors.login}</span>}
                </div>

                <div className='form-field'>
                  <label htmlFor='email' className='form-label'>
                    Ваш адрес электронной почты
                  </label>
                  <input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className='form-input'
                    placeholder='email@example.com'
                    required
                    maxLength={PHOTO_CONSTANTS.FIELD_LIMITS.email}
                    disabled={isSubmitting}
                  />
                  <div className='character-count-right'>
                    {formData.email.length}/{PHOTO_CONSTANTS.FIELD_LIMITS.email}
                  </div>
                  {errors.email && <span className='error-message'>{errors.email}</span>}
                </div>

                <div className='form-field'>
                  <label htmlFor='description' className='form-labels'>
                    Описание профиля
                  </label>
                  <textarea
                    id='description'
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    className='form-textarea'
                    placeholder='Расскажите о себе...'
                    rows={3}
                    maxLength={PHOTO_CONSTANTS.FIELD_LIMITS.description}
                    disabled={isSubmitting}
                  />
                  <div className='character-count-right'>
                    {formData.description.length}/{PHOTO_CONSTANTS.FIELD_LIMITS.description}
                  </div>
                  {errors.description && <span className='error-message'>{errors.description}</span>}
                </div>
              </div>

              {/* Правая колонка: Смена пароля */}
              <div className='right-column'>
                <h3 className='column-title'>Смена пароля</h3>
                
                <div className='form-field'>
                  <label htmlFor='oldPassword' className='form-label'>
                    Старый пароль
                  </label>
                  <input
                    id='oldPassword'
                    type='password'
                    value={formData.oldPassword || ''}
                    onChange={handleInputChange('oldPassword')}
                    className='form-input'
                    placeholder='Введите старый пароль'
                    disabled={isSubmitting}
                  />
                  {errors.oldPassword && <span className='error-message'>{errors.oldPassword}</span>}
                </div>

                <div className='form-field'>
                  <label htmlFor='newPassword' className='form-label'>
                    Новый пароль
                  </label>
                  <input
                    id='newPassword'
                    type='password'
                    value={formData.newPassword || ''}
                    onChange={handleInputChange('newPassword')}
                    className='form-input'
                    placeholder='Введите новый пароль'
                    disabled={isSubmitting}
                  />
                  {errors.newPassword && <span className='error-message'>{errors.newPassword}</span>}
                </div>

                <div className='form-field'>
                  <label htmlFor='confirmPassword' className='form-label'>
                    Повторите новый пароль
                  </label>
                  <input
                    id='confirmPassword'
                    type='password'
                    value={formData.confirmPassword || ''}
                    onChange={handleInputChange('confirmPassword')}
                    className='form-input'
                    placeholder='Повторите новый пароль'
                    disabled={isSubmitting}
                  />
                  {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
                </div>
              </div>
            </div>

            {/* Кнопки действий (4 кнопки) */}
            <div className='form-buttons-container'>
              <button
                type='button'
                className='button-delete-account'
                onClick={handleDeleteAccount}
                disabled={isSubmitting}
              >
                {deleteConfirm ? 'Подтвердить удаление' : 'Удалить аккаунт'}
              </button>
              
              <button 
                type='button'
                className='logout-button'
                onClick={handleLogout}
                disabled={isSubmitting}
              >
                Выйти из аккаунта
              </button>
              
              <button 
                type='button'
                className='share-button'
                onClick={handleShareAccount}
                disabled={isSubmitting}
              >
                Поделиться аккаунтом
              </button>
              
              <button type='submit' className='button-accountcontents' disabled={isSubmitting}>
                {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>
);
};