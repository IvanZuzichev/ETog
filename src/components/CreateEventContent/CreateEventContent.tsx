import { useThemeApply } from '../../hooks/useThemeApply';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import {EventFormFields} from '../../components/CreateEventContent/EventFormFields/EventFormFields';
import React, { useState } from 'react';

const CreateEventContent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    phone: '',
    telegram: '',
    email: '',
    eventType: undefined,
    eventDateTime: undefined
  });

  const handleFormChange = (field: string, value: string | number | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log('Field changed:', field, value);
  };

  useThemeApply();
  useDocumentTitle('Создай мероприятие | Events Together — ETog');
  
  return (
    <div className='main-page-wrapper'>
          <EventFormFields 
        formData={formData} 
        onFormChange={handleFormChange} 
      />
    </div>
  );
}

export default CreateEventContent;