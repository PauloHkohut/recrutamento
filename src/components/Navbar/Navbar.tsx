'use client';

import { login, logout, useGetUsuario } from '@/auth/methods';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const usuario = useGetUsuario();
    const pathname = usePathname();

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <Image src="/logo.png" width={65} height={30} alt="logo" />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#itemsNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="itemsNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={`nav-link ${pathname == '/' ? 'active' : ''}`} href="/">
                                Início
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${pathname == '/sobre' ? 'active' : ''}`} href="/sobre">
                                Sobre
                            </a>
                        </li>
                        {usuario ? (
                            usuario.isGestor ? (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                        Gestão
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="/candidaturas">
                                                Candidaturas
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/gerir">
                                                Configurações
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${pathname == '/formulario' ? 'active' : ''}`}
                                        href="/formulario"
                                    >
                                        Candidatar-se
                                    </a>
                                </li>
                            )
                        ) : (
                            <></>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {usuario ? (
                            <>
                                <li className="nav-item">
                                    <Image
                                        style={{ marginRight: '15px', borderRadius: '45px' }}
                                        src={usuario.fotoUrl!}
                                        alt={usuario.nome!}
                                        title={usuario.nome!}
                                        width={40}
                                        height={40}
                                    />
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={logout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-outline-success" onClick={login}>
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
