import ConfigureBootstrap from '@/components/ConfigureBootstrap';
import Navbar from '@/components/Navbar/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './layout.css';

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
            <body className={`body-flex ${inter.className}`}>
                <Navbar />
                <div className="div-children">{children}</div>
                <footer className="py-5 bg-dark">
                    <div className="container px-5">
                        <p className="m-0 text-center text-white">Copyright &copy; Recrutamento | Paulo Kohut - 2024</p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
