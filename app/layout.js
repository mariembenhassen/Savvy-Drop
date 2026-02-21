import "./globals.css";



export const metadata = {
  title: "Savvy Drop",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        {children}
      </body>
    </html>
  );
}
