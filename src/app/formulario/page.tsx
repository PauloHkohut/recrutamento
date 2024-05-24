'use client';

import { getAreas, getCidades, getEstados, getLojas, submeterCandidatura } from '@/actions/formulario';
import { useGetUsuario } from '@/auth/methods';
import { Loading } from '@/components/Loading/Loading';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import { TermoLGPD } from '@/components/TermoLGPD/TermoLGPD';
import Area from '@/models/area';
import Cidade from '@/models/cidade';
import Estado from '@/models/estado';
import Loja from '@/models/loja';
import Usuario from '@/models/usuario';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formataCelular, validaFormulario, validarRestricao } from './formUtils';

export default function Formulario() {
    const router = useRouter();
    const usuario = useGetUsuario() as Usuario;
    const [estados, setEstados] = useState([] as Estado[]);
    const [cidades, setCidades] = useState([] as Cidade[]);
    const [lojas, setLojas] = useState([] as Loja[]);
    const [areas, setAreas] = useState([] as Area[]);
    const [restricaoValidada, setRestricaoValidada] = useState<boolean | undefined>(undefined);
    const [termoAceito, setTermoAceito] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        formataCelular();
        validaFormulario();
    }, [restricaoValidada]);

    useEffect(() => {
        if (termoAceito === false) router.push('/');
    }, [router, termoAceito]);

    useEffect(() => {
        if (restricaoValidada === false || restricaoValidada === true) return;
        validarRestricao(usuario).then(restrito => {
            if (restrito) router.push('/formulario/restrito');
            else if (restrito === false) setRestricaoValidada(true);
        });
    }, [router, restricaoValidada, usuario]);

    useEffect(() => {
        // Obtêm todos os estados ao iniciar a página.
        const setFormData = async () => {
            const data = await getEstados();
            setEstados(data);
        };
        setFormData();
    }, []);

    async function onSelectEstado(event: React.ChangeEvent<HTMLSelectElement>) {
        const estadoId = event.target.value;
        const data = await getCidades(estadoId);
        setCidades(data);
    }

    async function onSelectCidade(event: React.ChangeEvent<HTMLSelectElement>) {
        const cidadeId = event.target.value;
        const data = await getLojas(cidadeId);
        setLojas(data);
    }

    async function onSelectLoja(event: React.ChangeEvent<HTMLSelectElement>) {
        const lojaId = event.target.value;
        const data = await getAreas(lojaId);
        setAreas(data);
    }
    return restricaoValidada ? (
        termoAceito ? (
            <div>
                <form className="needs-validation" noValidate action={f => submeterCandidatura(f, usuario.uid)}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">
                                        Nome
                                    </label>
                                    <input
                                        className="form-control"
                                        name="nome"
                                        id="nome"
                                        placeholder="Digite seu nome"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nascimento" className="form-label">
                                        Data de Nascimento
                                    </label>
                                    <input
                                        className="form-control"
                                        name="nascimento"
                                        type="date"
                                        id="nascimento"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="sexo" className="form-label">
                                        Sexo
                                    </label>
                                    <select className="form-select" name="sexo" defaultValue="" required>
                                        <option value="" disabled>
                                            Selecione seu sexo
                                        </option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Feminino</option>
                                        <option value="3">Outros</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="celular" className="form-label">
                                        Celular
                                    </label>
                                    <input
                                        className="form-control"
                                        name="celular"
                                        id="celular"
                                        placeholder="Digite seu celular"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="estado" className="form-label">
                                        Estado
                                    </label>
                                    <select
                                        className="form-select"
                                        name="estadoId"
                                        defaultValue=""
                                        onChange={onSelectEstado}
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione seu Estado
                                        </option>
                                        {estados.map(e => (
                                            <option key={e.id} value={e.id}>
                                                {e.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loja" className="form-label">
                                        Loja
                                    </label>
                                    <select
                                        className="form-select"
                                        name="lojaId"
                                        onChange={onSelectLoja}
                                        disabled={!lojas.length}
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione a Loja
                                        </option>
                                        {lojas.map(l => (
                                            <option key={l.id} value={l.id}>
                                                {l.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="horario" className="form-label">
                                        Disponibilidade de Horário
                                    </label>
                                    <select className="form-select" name="horario" defaultValue="" required>
                                        <option value="" disabled>
                                            Selecione sua disponibilidade de horário
                                        </option>
                                        <option value="1">Diurno</option>
                                        <option value="2">Noturno</option>
                                        <option value="3">Ambos</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label htmlFor="cidade" className="form-label">
                                        Cidade
                                    </label>
                                    <select
                                        className="form-select"
                                        name="cidadeId"
                                        defaultValue=""
                                        onChange={onSelectCidade}
                                        disabled={!cidades.length}
                                        required
                                    >
                                        <option value="" disabled>
                                            Selecione sua Cidade
                                        </option>
                                        {cidades.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="area" className="form-label">
                                        Área que deseja trabalhar
                                    </label>
                                    <select
                                        className="form-select"
                                        name="areaId"
                                        defaultValue=""
                                        disabled={!areas.length}
                                        required
                                    >
                                        <option value="">Selecione a área que deseja trabalhar</option>
                                        {areas.map(a => (
                                            <option key={a.id} value={a.id}>
                                                {a.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mensagem" className="form-label">
                                Mensagem
                            </label>
                            <textarea
                                className="form-control"
                                name="mensagem"
                                id="mensagem"
                                rows={5}
                                placeholder="Digite sua mensagem"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="curriculo" className="form-label">
                                Anexar currículo
                            </label>
                            <input
                                className="form-control"
                                type="file"
                                accept="application/pdf"
                                name="curriculo"
                                id="curriculo"
                                required
                            />
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 offset-md-11">
                                <SubmitButton rotulo="Enviar" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        ) : (
            <div className="d-flex justify-content-center">
                <div className="mt-5 p-5 border rounded-3 shadow-sm">
                    <div style={{ height: 400, width: 700, overflow: 'auto' }}>
                        <TermoLGPD />
                    </div>
                    <br />
                    <div style={{ textAlign: 'right' }}>
                        <a
                            onClick={() => {
                                setTermoAceito(true);
                            }}
                            className="btn btn-success"
                        >
                            Aceitar
                        </a>
                        <a
                            onClick={() => {
                                setTermoAceito(false);
                            }}
                            className="btn btn-secondary ms-2"
                        >
                            Recusar
                        </a>
                    </div>
                </div>
            </div>
        )
    ) : (
        <Loading />
    );
}
