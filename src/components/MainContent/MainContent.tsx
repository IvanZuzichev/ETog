export function MainContent() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 250px)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        style={{
          fontSize: '1.5rem',
          color: '#333',
          maxWidth: '600px',
          lineHeight: '1.6',
        }}
      >
        Тут будет контент, но я хочу спать честно(
      </p>
    </div>
  );
}
