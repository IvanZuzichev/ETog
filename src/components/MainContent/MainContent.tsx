import { useTheme } from '../../theme/ThemeContext';
export function MainContent() {
  const { theme } = useTheme(); // Получаем текущую тему

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 250px)', // Исправлено: minHeight вместо mineLight
    textAlign: 'center' as const, // Добавляем тип для textAlign
    padding: '2rem',
    backgroundColor: theme.colors.background,
    transition: 'background-color 0.3s ease',
    gap: '60px',
    alignContent: 'center'
  };

  const textStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: theme.colors.text,
    maxWidth: '600px',
    lineHeight: 1.6,
    transition: 'color 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      {/* <p style={textStyle}> Тут будет контент, но я хочу спать честно( </p> */}
    
    </div>
  );
}