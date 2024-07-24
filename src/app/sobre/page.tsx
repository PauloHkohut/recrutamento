import './page.css';

export default function Sobre() {
    return (
        <div className="container py-5">
            <div>
                <h1 className="mb-4">Sobre o Sistema de Recrutamento</h1>
                <p className="lead text-justify">
                    Nosso sistema foi desenvolvido para transformar o processo de recrutamento, tornando-o mais
                    eficiente, acessível e seguro para todos os envolvidos. Através da tecnologia, buscamos simplificar
                    a forma como os candidatos se conectam com oportunidades de emprego, ao mesmo tempo em que
                    fornecemos às empresas as ferramentas necessárias para encontrar os talentos certos com facilidade.
                </p>
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <h2>Missão</h2>
                    <p className="text-justify">
                        Nossa missão é facilitar o encontro entre talentos e oportunidades, proporcionando uma
                        experiência positiva e enriquecedora tanto para candidatos quanto para empregadores. Estamos
                        comprometidos em oferecer um serviço de qualidade, pautado pela transparência, eficiência e
                        inovação.
                    </p>
                </div>
                <div className="col-md-4">
                    <h2>Visão</h2>
                    <p className="text-justify">
                        Nossa visão é criar um ecossistema onde candidatos e empregadores possam se conectar de maneira
                        mais intuitiva, transparente e eficiente, superando as barreiras tradicionais do recrutamento.
                        Através de nosso sistema, visamos permitir tanto os candidatos quanto as empresas a alcançar
                        seus mais altos potenciais.
                    </p>
                </div>
                <div className="col-md-4">
                    <h2>Valores</h2>
                    <p className="text-justify">
                        Integridade, comprometimento, inovação e excelência são os pilares que sustentam nosso trabalho.
                        Acreditamos que, ao aderir a estes valores, podemos criar um ambiente de recrutamento mais
                        justo, eficaz e adaptável às necessidades de um mercado de trabalho em constante evolução.
                    </p>
                </div>
            </div>

            <h2 className="mt-5">Conformidade com a LGPD</h2>
            <p className="text-justify">
                A proteção da privacidade e dos dados pessoais é uma prioridade para nós. Nosso sistema foi
                cuidadosamente projetado para cumprir todas as normas estabelecidas pela Lei Geral de Proteção de Dados
                (LGPD), garantindo a segurança e a confidencialidade das informações de todos os usuários.
            </p>
        </div>
    );
}
