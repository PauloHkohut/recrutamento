'use client';

import { getCandidaturasViews } from '@/actions/candidaturas';
import { useGetUsuario } from '@/auth/methods';
import { Loading } from '@/components/Loading/Loading';
import { storage } from '@/database/firebase';
import FileSaver from 'file-saver';
import { ref } from 'firebase/storage';
import { getBlob } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
    CandidaturaInicial,
    CandidaturaView,
    filtrarOrdenar,
    FILTROS,
    Filtros,
    obtemLabel,
    Ordenacao,
} from './CandidaturaView';

export default function Candidaturas() {
    const usuario = useGetUsuario(true);
    const [candidaturas, setCandidaturas] = useState([] as CandidaturaView[]);
    const [candidaturasFiltradas, setCandidaturasFiltradas] = useState([] as CandidaturaView[]);
    const [detalhe, setDetalhe] = useState<CandidaturaView>(CandidaturaInicial);
    const [ordenacao, setOrdenacao] = useState<Ordenacao>({ chave: '', direcao: '' });
    const [filtros, setFiltros] = useState<Filtros>(FILTROS);

    useEffect(() => {
        // Obtêm todos os candidaturas ao iniciar a página.
        const setFormData = async () => {
            const data = await getCandidaturasViews();
            setCandidaturas(data);
            setCandidaturasFiltradas(data);
        };
        setFormData();
    }, []);

    useEffect(() => {
        const dados = filtrarOrdenar(candidaturas, filtros, ordenacao);
        setCandidaturasFiltradas(dados);
    }, [ordenacao, candidaturas, filtros]);

    const onOrdenar = (campo: keyof CandidaturaView) => {
        let direcao: 'asc' | 'desc' | '' = 'asc';
        if (ordenacao.chave === campo && ordenacao.direcao == 'asc') direcao = 'desc';
        setOrdenacao({ chave: campo, direcao: direcao });
    };

    const onFiltrar = (campo: keyof Filtros, valor: string) => {
        setFiltros(prev => ({
            ...prev,
            [campo]: valor,
        }));
    };

    const baixarCurriculo = async (candidatura: CandidaturaView) => {
        const curriculo = ref(storage, `curriculos/${candidatura.curriculoId}`);
        const data = await getBlob(curriculo);
        FileSaver.saveAs(data, candidatura.curriculoId);
    };

    return usuario === undefined ? (
        <Loading />
    ) : (
        <>
            <table className="table table-sm" style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        {Object.keys(FILTROS).map(campo => (
                            <th key={campo}>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => onOrdenar(campo as keyof CandidaturaView)}
                                >
                                    {obtemLabel(campo)}{' '}
                                    {ordenacao.chave === campo ? (
                                        ordenacao.direcao === 'asc' ? (
                                            <i className="bi bi-sort-up"></i>
                                        ) : (
                                            <i className="bi bi-sort-down"></i>
                                        )
                                    ) : (
                                        <i className="bi bi-filter"></i>
                                    )}
                                </div>

                                <input
                                    type={campo == 'idade' ? 'number' : 'text'}
                                    className="form-control"
                                    value={filtros[campo as keyof Filtros]}
                                    onChange={e => onFiltrar(campo as keyof Filtros, e.target.value)}
                                    placeholder={`Filtrar por ${obtemLabel(campo)}`}
                                />
                            </th>
                        ))}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {candidaturasFiltradas.map(c => (
                        <tr key={c.id}>
                            <td scope="row">
                                <Image
                                    style={{ marginRight: '15px', borderRadius: '45px' }}
                                    src={c.fotoUrl!}
                                    alt={c.nome!}
                                    title={c.nome!}
                                    width={40}
                                    height={40}
                                />
                            </td>
                            <td
                                className="text-truncate"
                                style={{ maxWidth: 150 }}
                                data-toggle="tooltip"
                                title={c.nome}
                            >
                                {c.nome}
                            </td>
                            <td>{c.sexo}</td>
                            <td>{c.idade}</td>
                            <td>{c.horario}</td>
                            <td>{c.cidade}</td>
                            <td>{c.loja}</td>
                            <td>{c.area}</td>
                            <td>{c.data}</td>
                            <td>
                                <div className="btn-group">
                                    <button
                                        className="btn btn-light"
                                        data-bs-toggle="modal"
                                        data-bs-target="#detalhesModal"
                                        onClick={() => setDetalhe(c)}
                                        data-toggle="tooltip"
                                        title="Mais Detalhes"
                                    >
                                        <i className="bi bi-person-lines-fill"></i>
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        data-toggle="tooltip"
                                        title="Currículo"
                                        onClick={() => baixarCurriculo(c)}
                                    >
                                        <i className="bi bi-file-earmark-arrow-down-fill"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modal fade" id="detalhesModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                {detalhe?.nome}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
                                    Email
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-control-plaintext"
                                        id="staticEmail"
                                        value={detalhe?.email}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
                                    Celular
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="text"
                                        readOnly
                                        className="form-control-plaintext"
                                        id="staticEmail"
                                        value={detalhe?.celular}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">
                                    Mensagem
                                </label>
                                <div className="col-sm-9">
                                    <textarea
                                        readOnly
                                        className="form-control-plaintext"
                                        id="staticEmail"
                                        rows={8}
                                        value={detalhe?.mensagem}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
