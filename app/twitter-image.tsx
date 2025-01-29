import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'Best Tech YouTube Channels';
export const size = {
  width: 1200,
  height: 630,
};
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #4F46E5, #7C3AED)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Best Tech YouTube Channels
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
          }}
        >
          Find the best programming and tech education content creators
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}