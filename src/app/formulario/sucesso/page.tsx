'use client';

import { useGetUsuario } from '@/auth/methods';
import { Loading } from '@/components/Loading/Loading';

export default function Sucesso() {
    const usuario = useGetUsuario();

    return usuario === undefined ? (
        <Loading />
    ) : (
        <div className="d-flex justify-content-center">
            <div className="text-center mt-5 p-5 border rounded-3 shadow-sm">
                <h1 className="h3 mb-3">Candidatura Enviada com Sucesso!</h1>
                <p>
                    Obrigado por enviar sua candidatura. Entraremos em contato em breve se o seu perfil for selecionado
                    para as próximas etapas.
                </p>
                <a href="/" className="btn btn-primary">
                    Voltar para o Início
                </a>
            </div>
        </div>
    );
}
