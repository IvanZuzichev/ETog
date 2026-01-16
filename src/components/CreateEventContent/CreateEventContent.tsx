import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { EventFormFields } from '../../components/CreateEventContent/EventFormFields/EventFormFields';
import React, { useState } from 'react';

// Компонент отвечающий за создание мероприятия
const CreateEventContent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    phone: '',
    telegram: '',
    email: '',
    users: '',
    eventType: undefined,
    eventDateTime: undefined,
  });

  const handleFormChange = (field: string, value: string | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  useThemeApply();
  useDocumentTitle('Создай мероприятие | Events Together — ETog');

  return (
    <div className='main-page-wrapper'>
      <EventFormFields formData={formData} onFormChange={handleFormChange} />
    </div>
  );
};

export default CreateEventContent;
