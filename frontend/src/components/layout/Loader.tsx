export default function Loader() {
  return (
    <div style={{
      display: 'inline-block',
      width: 40,
      height: 40,
      border: '4px solid rgba(0,0,0,0.1)',
      borderRadius: '50%',
      borderTopColor: '#3b82f6',
      animation: 'spin 1s ease-in-out infinite',
    }} />
  );
}