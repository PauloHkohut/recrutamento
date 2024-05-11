import ConfigureBootstrap from '@/components/ConfigureBootstrap';
import Navbar from '@/components/Navbar/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Recrutamento - Paraná Supermercados',
    description: 'Portal para Candidatos e Gestores',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <ConfigureBootstrap />
            <body className={inter.className}>
                <Navbar />
                <div className="container">{children}</div>
            </body>
        </html>
    );
}
