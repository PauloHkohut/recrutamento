'use client';

import { getAreasAbertas } from '@/actions/inicial';
import { useEffect, useState } from 'react';
import './page.css';

export default function Home() {
    const [areas, setAreas] = useState<string[]>([]);

    useEffect(() => {
        // Obtêm toda as áreas ao iniciar a página.
        const setAreasInciais = async () => {
            const data = await getAreasAbertas();
            setAreas(data);
        };
        setAreasInciais();
    }, []);

    return (
        <>
            <header className="bg-dark py-5">
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-6">
                            <div className="text-center my-5">
                                <h1 className="display-5 fw-bolder text-white mb-2">
                                    Recrutamento Paraná Supermercados
                                </h1>
                                <p className="lead text-white-50 mb-4">
                                    Sistema de recrutamento para facilitar sua jornada em busca de novas oportunidades.
                                    Explore, encontre e candidate-se com facilidade e segurança.
                                </p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                    <a className="btn btn-primary btn-lg px-4 me-sm-3" href="/sobre">
                                        Saiba mais
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <section className="py-2">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="detalhe bg-primary bg-gradient text-white rounded-3 mb-3">
                                <i className="bi bi-collection"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Fácil de Usar</h2>
                            <p>Interface intuitiva para candidatos e gestores.</p>
                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0">
                            <div className="detalhe bg-primary bg-gradient text-white rounded-3 mb-3">
                                <i className="bi bi-ui-checks"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Processo Ágil</h2>
                            <p>Processo de seleção eficiente e dinâmico.</p>
                        </div>
                        <div className="col-lg-4">
                            <div className="detalhe bg-primary bg-gradient text-white rounded-3 mb-3">
                                <i className="bi bi-shield-fill-check"></i>
                            </div>
                            <h2 className="h4 fw-bolder">Segurança de Dados</h2>
                            <p>Proteção completa das suas informações.</p>
                        </div>
                    </div>
                </div>
            </section>

            {!!areas.length ? (
                <section>
                    <div id="carouselAreas" className="carousel carousel-dark slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                            {areas.map((_, index) => {
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselAreas"
                                        data-bs-slide-to={index}
                                        className={index == 0 ? 'active' : ''}
                                        aria-label={`Slide ${index}`}
                                    ></button>
                                );
                            })}
                        </div>
                        <div className="carousel-inner">
                            {areas.map((area, index) => {
                                return (
                                    <div key={area} className={`carousel-item ${index == 0 ? 'active' : ''}`}>
                                        <div className="bg-light" style={{ height: '150px', width: '100vw' }}></div>
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{area.split(' | ')[0]}</h5>
                                            <p>{area.split(' | ')[1]}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselAreas"
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Anterior</span>
                        </button>
                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselAreas"
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Próximo</span>
                        </button>
                    </div>
                </section>
            ) : (
                <></>
            )}
        </>
    );
}
