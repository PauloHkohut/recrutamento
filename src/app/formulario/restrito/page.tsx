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
                <h1 className="h3 mb-3">Você já se candidatou recentemente!</h1>
                <p>
                    Obrigado por se interessar pela nossas vagas, mas você já se candidatou recentemente e deve aguardar
                    para se candidatar novamente.
                    <br />
                    Em caso de dúvidas, entre em contato conosco por e-mail.
                </p>
                <a href="/" className="btn btn-primary">
                    Voltar para o Início
                </a>
            </div>
        </div>
    );
}
