import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Jobify',
  description: 'AI-Powered Resume Builder',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', textAlign: 'center', background: '#0070f3', color: 'white' }}>
          <h1>Jobify</h1>
        </header>
        <main style={{ padding: '20px' }}>{children}</main>
        <footer style={{ padding: '10px', textAlign: 'center', background: '#f0f0f0' }}>
          © {new Date().getFullYear()} Jobify
        </footer>
      </body>
    </html>
  );
}
