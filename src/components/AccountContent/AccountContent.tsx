import { useThemeApply } from '../../hooks/useThemeApply';
import React, { useState, useRef } from 'react';
import './AccountContent.scss';
import { useNavigate } from 'react-router-dom';
import { PHOTO_CONSTANTS } from '../../store/constants/photoTypeOptions';
import { useDataProtection } from '../../hooks/useDataProtection';
import { useBlacklist } from '../../hooks/useBlackList';
import { useGlobalAvatar } from '../../hooks/useGlobalAvatar';
import AccountPhoto from '../../assets/Photo/User.png';
import VerificatePhoto from '../../assets/Verificate/CheckMark.png';

interface AccountContentData {
  login: string;
  email: string;
  description: string;
  password: string;
}

interface AccountContentDataProps {
  formData: AccountContentData;
  onFormChange: (field: string, value: string) => void;
  className?: string;
}

export const AccountContent: React.FC<AccountContentDataProps> = ({ formData, onFormChange, className = '' }) => {
  const [errors, setErrors] = useState<{ login?: string; email?: string; password?: string; description?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { avatar, updateAvatar } = useGlobalAvatar();
  const { hashData, generateSecureId } = useDataProtection();
  const { validateInput } = useBlacklist();

  useThemeApply();
  const navigate = useNavigate();

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
    const newErrors: { login?: string; email?: string; password?: string; description?: string } = {};

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

    if (!formData.password) {
      newErrors.password = PHOTO_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED;
    } else if (formData.password.length < 6) {
      newErrors.password = PHOTO_CONSTANTS.ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    } else if (formData.password.length > PHOTO_CONSTANTS.FIELD_LIMITS.password) {
      newErrors.password = `Пароль не должен превышать ${PHOTO_CONSTANTS.FIELD_LIMITS.password} символов`;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Пароль должен содержать заглавные и строчные буквы, а также цифры';
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
      const hashedPassword = hashData(formData.password);
      const updateId = generateSecureId();
      const normalizedEmail = formData.email.trim().toLowerCase();
      const normalizedLogin = formData.login.trim();

      const secureDataForAPI = {
        updateId,
        login: normalizedLogin,
        email: normalizedEmail,
        passwordHash: hashedPassword,
        description: formData.description || '',
        avatarChanged: avatar !== AccountPhoto,
        updateTime: Date.now(),
      };

      const accountDataMessage = `
      Вы ввели данные:
      Логин: ${formData.login}
      Email: ${formData.email}
      Описание: ${formData.description || 'Не указано'}
      Пароль: ${formData.password}
      Аватарка: ${avatar !== AccountPhoto ? 'Обновлена' : 'По умолчанию'}
      
      Для API будут переданы защищенные данные:
      ID обновления: ${secureDataForAPI.updateId.substring(0, 8)}...
      Логин: ${secureDataForAPI.login}
      Email: ${secureDataForAPI.email}
      Хеш пароля: ${secureDataForAPI.passwordHash.substring(0, 16)}...
      `.trim();

      alert(accountDataMessage);
      alert('Данные успешно обновлены!');
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
        alert('Ошибка при удалении профиля');
      }
    }

    setDeleteConfirm(false);
  };

  return (
    <div className='main-page-wrapper'>
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
              <div className='verification-badge'>
                <img src={VerificatePhoto} alt='Verified' className='checkmark-icon' />
                <span className='verified-text'>Подтвержден</span>
              </div>
            </div>
          </div>

          <div className='profile-right'>
            <form className='accountcontent-form' onSubmit={handleSubmit}>
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
                  placeholder='Логин'
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
                  Опишите немного о себе
                </label>
                <textarea
                  id='description'
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  className='form-textarea'
                  placeholder='Описание профиля'
                  rows={4}
                  maxLength={PHOTO_CONSTANTS.FIELD_LIMITS.description}
                  disabled={isSubmitting}
                />
                <div className='character-count-right'>
                  {formData.description.length}/{PHOTO_CONSTANTS.FIELD_LIMITS.description}
                </div>
                {errors.description && <span className='error-message'>{errors.description}</span>}
              </div>

              <div className='form-field'>
                <label htmlFor='password' className='form-label'>
                  Ваш пароль
                </label>
                <div className='password-input-container'>
                  <input
                    id='password'
                    type={'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className='form-input'
                    placeholder='Пароль'
                    required
                    maxLength={PHOTO_CONSTANTS.FIELD_LIMITS.password}
                    disabled={isSubmitting}
                  />
                </div>
                <div className='character-count-right'>
                  {formData.password.length}/{PHOTO_CONSTANTS.FIELD_LIMITS.password}
                </div>
                {errors.password && <span className='error-message'>{errors.password}</span>}
              </div>

              <div className='form-field'>
                <div className='form-buttons-container'>
                  <>
                    <button
                      type='button'
                      className='button-delete-account'
                      onClick={handleDeleteAccount}
                      disabled={isSubmitting}
                    >
                      Удалить аккаунт
                    </button>
                    <button type='submit' className='button-accountcontents' disabled={isSubmitting}>
                      {isSubmitting ? 'Сохранение...' : 'Изменить данные'}
                    </button>
                  </>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};