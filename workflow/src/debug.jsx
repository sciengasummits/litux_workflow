// Debug component to check environment variables
export default function Debug() {
  return (
    <div style={{ padding: '20px', color: 'white', background: '#1a1a1a' }}>
      <h1>Environment Debug</h1>
      <pre>
        VITE_API_URL: {import.meta.env.VITE_API_URL || 'NOT SET'}
        {'\n'}
        VITE_API_BASE: {import.meta.env.VITE_API_BASE || 'NOT SET'}
        {'\n'}
        MODE: {import.meta.env.MODE}
        {'\n'}
        DEV: {import.meta.env.DEV ? 'true' : 'false'}
        {'\n'}
        PROD: {import.meta.env.PROD ? 'true' : 'false'}
      </pre>
      <button onClick={async () => {
        try {
          const url = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
          console.log('Testing URL:', url);
          const res = await fetch(`${url}/api/health`);
          const data = await res.json();
          alert('Success: ' + JSON.stringify(data));
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }}>
        Test Backend Connection
      </button>
    </div>
  );
}
