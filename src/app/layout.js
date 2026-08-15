import './global.css';

export const metadata = {
  title: 'Profil Sekolah',
  description: 'Website Profil Sekolah Resmi',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
