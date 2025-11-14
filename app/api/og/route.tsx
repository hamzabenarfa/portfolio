import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export async function GET() {
  return new ImageResponse(
    (
        <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#ffffff', // pure white is fine, or use a very light gray like #fafafa if preferred
          padding: '64px',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          color: '#000000', // black instead of near-black
        }}
      >
        <div
          style={{
            fontSize: '45px',
            fontWeight: '800',
            lineHeight: '1.2',
            textAlign: 'center',
            maxWidth: '800px',
            marginBottom: '16px',
            color: '#000000',
          }}
        >
          Benarfa Hamza
        </div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#444444', // muted dark gray instead of indigo
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          Full-Stack Developer 
        </div>
        <div
          style={{
            fontSize: '20px',
            color: '#555555', // slightly lighter muted gray
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: '1.6',
          }}
        >
          Building fast, beautiful websites and powerful backends — from idea to launch
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}