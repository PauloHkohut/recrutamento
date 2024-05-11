export default function Home() {
    return (
        <>
            <div className="container py-5">
                <div className="text-center">
                    <h1 className="display-4 fw-bold">Bem-vindo ao Recrutamento Paraná Supermercados</h1>
                    <p className="lead my-4">
                        Sistema de recrutamento para facilitar sua jornada em busca de novas oportunidades. Explore,
                        encontre e candidate-se com facilidade e segurança.
                    </p>
                    <a href="/sobre" className="btn btn-lg btn-primary">
                        Saiba mais
                    </a>
                </div>
            </div>

            <div className="bg-light py-3">
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
                        <div className="col">
                            <div className="h-100 p-3 text-bg-dark rounded-3">
                                <h2>Fácil de Usar</h2>
                                <p>Interface intuitiva para candidatos e gestores</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="h-100 p-3 text-bg-dark rounded-3">
                                <h2>Processo Ágil</h2>
                                <p>Processo de seleção eficiente e dinâmico</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="h-100 p-3 text-bg-dark rounded-3">
                                <h2>Segurança de Dados</h2>
                                <p>Proteção completa das suas informações</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
