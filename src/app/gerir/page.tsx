'use client';

import {
    adicionarArea,
    adicionarCidade,
    adicionarEstado,
    adicionarLoja,
    alterarVisibilidade,
    atualizaRestricao,
    atualizaRetencao,
    getRestricaoCandidatura,
    getRetencao,
    getTodasAreas,
    getTodasCidades,
    getTodasLojas,
    getTodosEstados,
} from '@/actions/gerir';
import { useGetUsuario } from '@/auth/methods';
import { Loading } from '@/components/Loading/Loading';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import Area from '@/models/area';
import Cidade from '@/models/cidade';
import Estado from '@/models/estado';
import Loja from '@/models/loja';
import RestricaoCandidatura from '@/models/restricao';
import Retencao from '@/models/retencao';
import { useEffect, useState } from 'react';
import './page.css';

type aba = 'restricao' | 'retencao' | 'estado' | 'cidade' | 'loja' | 'area';

export default function Gerir() {
    const usuario = useGetUsuario(true);
    const [abaAtual, setAbaAtual] = useState<aba>('restricao');
    const [estados, setEstados] = useState<Estado[]>([]);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [lojas, setLojas] = useState<Loja[]>([]);
    const [areas, setAreas] = useState<Area[]>([]);
    const [restricao, setRestricao] = useState<RestricaoCandidatura>();
    const [retencao, setRetencao] = useState<Retencao>();

    useEffect(() => {
        getRestricaoCandidatura().then(r => setRestricao(r));
        getRetencao().then(r => setRetencao(r));
        getTodosEstados().then(e => setEstados(e));
        getTodasCidades().then(c => setCidades(c));
        getTodasLojas().then(l => setLojas(l));
        getTodasAreas().then(a => setAreas(a));
    }, []);

    return usuario === undefined ? (
        <Loading />
    ) : (
        <>
            <br />
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${abaAtual === 'restricao' ? 'active' : ''}`}
                                onClick={() => setAbaAtual('restricao')}
                            >
                                Restrição de Candidatura
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${abaAtual === 'retencao' ? 'active' : ''}`}
                                onClick={() => setAbaAtual('retencao')}
                            >
                                Retenção de Dados
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${abaAtual === 'estado' ? 'active' : ''}`}
                                onClick={() => setAbaAtual('estado')}
                            >
                                Estados
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${abaAtual === 'cidade' ? 'active' : ''}`}
                                onClick={() => setAbaAtual('cidade')}
                            >
                                Cidades
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${abaAtual === 'loja' ? 'active' : ''}`}
                                onClick={() => setAbaAtual('loja')}
                            >
                                Lojas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${abaAtual === 'area' ? 'active' : ''}`}
                                onClick={() => setAbaAtual('area')}
                            >
                                Áreas
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {(() => {
                        switch (abaAtual) {
                            case 'restricao':
                                return (
                                    <>
                                        <form className="needs-validation" action={f => atualizaRestricao(f)}>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="diasRestricao" className="form-label">
                                                                Dias
                                                            </label>
                                                            {restricao ? (
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="diasRestricao"
                                                                    id="diasRestricao"
                                                                    placeholder="Quantidade de dias para a restrição de uma nova candidatura"
                                                                    value={restricao.dias}
                                                                    onChange={e =>
                                                                        setRestricao({
                                                                            ...restricao,
                                                                            dias: parseInt(e.target.value),
                                                                        })
                                                                    }
                                                                    required
                                                                />
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-3 offset-md-11">
                                                        <SubmitButton rotulo="Salvar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                );
                            case 'retencao':
                                return (
                                    <>
                                        <form className="needs-validation" action={f => atualizaRetencao(f)}>
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3">
                                                            <label htmlFor="diasRetencao" className="form-label">
                                                                Dias
                                                            </label>
                                                            {retencao ? (
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="diasRetencao"
                                                                    id="diasRetencao"
                                                                    placeholder="Quantidade de dias manter os dados salvos"
                                                                    value={retencao.dias}
                                                                    onChange={e =>
                                                                        setRetencao({
                                                                            ...retencao,
                                                                            dias: parseInt(e.target.value),
                                                                        })
                                                                    }
                                                                    required
                                                                />
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-3 offset-md-11">
                                                        <SubmitButton rotulo="Salvar" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </>
                                );
                            case 'estado':
                                return (
                                    <>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-3 offset-md-10">
                                                    <button
                                                        className="btn btn-success"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#estadoModal"
                                                    >
                                                        Adicionar Novo
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Sigla</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {estados.map(e => (
                                                    <tr key={e.id}>
                                                        <td style={{ width: '50%' }} scope="row">
                                                            {e.nome}
                                                        </td>
                                                        <td style={{ width: '40%' }} scope="row">
                                                            {e.sigla}
                                                        </td>
                                                        <td style={{ width: '10%' }}>
                                                            <button
                                                                className="btn btn-light"
                                                                data-toggle="tooltip"
                                                                title="Alterar Visibilidade"
                                                                onClick={() =>
                                                                    alterarVisibilidade('estados', e, setEstados)
                                                                }
                                                            >
                                                                {e.visivel ? (
                                                                    <i className="bi bi-toggle-on fs-4"></i>
                                                                ) : (
                                                                    <i className="bi bi-toggle-off fs-4"></i>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                );
                            case 'cidade':
                                return (
                                    <>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-3 offset-md-10">
                                                    <button
                                                        className="btn btn-success"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#cidadeModal"
                                                    >
                                                        Adicionar Nova
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cidades.map(c => (
                                                    <tr key={c.id}>
                                                        <td style={{ width: '50%' }} scope="row">
                                                            {c.nome}
                                                        </td>
                                                        {(() => {
                                                            const estado = estados.find(e => e.id == c.estadoId);
                                                            return (
                                                                <td style={{ width: '40%' }} scope="row">
                                                                    {estado?.nome}
                                                                    {estado?.visivel ? (
                                                                        <i className="bi bi-eye-fill ms-1 fs-6"></i>
                                                                    ) : (
                                                                        <i className="bi bi-eye-slash-fill ms-1 fs-6"></i>
                                                                    )}
                                                                </td>
                                                            );
                                                        })()}
                                                        <td style={{ width: '10%' }}>
                                                            <button
                                                                className="btn btn-light"
                                                                data-toggle="tooltip"
                                                                title="Alterar Visibilidade"
                                                                onClick={() =>
                                                                    alterarVisibilidade('cidades', c, setCidades)
                                                                }
                                                            >
                                                                {c.visivel ? (
                                                                    <i className="bi bi-toggle-on fs-4"></i>
                                                                ) : (
                                                                    <i className="bi bi-toggle-off fs-4"></i>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                );
                            case 'loja':
                                return (
                                    <>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-3 offset-md-10">
                                                    <button
                                                        className="btn btn-success"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#lojaModal"
                                                    >
                                                        Adicionar Nova
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Cidade</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {lojas.map(l => (
                                                    <tr key={l.id}>
                                                        <td style={{ width: '50%' }} scope="row">
                                                            {l.nome}
                                                        </td>
                                                        {(() => {
                                                            const cidade = cidades.find(e => e.id == l.cidadeId);
                                                            return (
                                                                <td style={{ width: '40%' }} scope="row">
                                                                    {cidade?.nome}
                                                                    {cidade?.visivel ? (
                                                                        <i className="bi bi-eye-fill ms-1 fs-6"></i>
                                                                    ) : (
                                                                        <i className="bi bi-eye-slash-fill ms-1 fs-6"></i>
                                                                    )}
                                                                </td>
                                                            );
                                                        })()}
                                                        <td style={{ width: '10%' }}>
                                                            <button
                                                                className="btn btn-light"
                                                                data-toggle="tooltip"
                                                                title="Alterar Visibilidade"
                                                                onClick={() =>
                                                                    alterarVisibilidade('lojas', l, setLojas)
                                                                }
                                                            >
                                                                {l.visivel ? (
                                                                    <i className="bi bi-toggle-on fs-4"></i>
                                                                ) : (
                                                                    <i className="bi bi-toggle-off fs-4"></i>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                );
                            case 'area':
                                return (
                                    <>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-3 offset-md-10">
                                                    <button
                                                        className="btn btn-success"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#areaModal"
                                                    >
                                                        Adicionar Nova
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <table className="table table-sm">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nome</th>
                                                    <th scope="col">Loja</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {areas.map(a => (
                                                    <tr key={a.id}>
                                                        <td style={{ width: '50%' }} scope="row">
                                                            {a.nome}
                                                        </td>
                                                        {(() => {
                                                            const loja = lojas.find(e => e.id == a.lojaId);
                                                            return (
                                                                <td style={{ width: '40%' }} scope="row">
                                                                    {loja?.nome}
                                                                    {loja?.visivel ? (
                                                                        <i className="bi bi-eye-fill ms-1 fs-6"></i>
                                                                    ) : (
                                                                        <i className="bi bi-eye-slash-fill ms-1 fs-6"></i>
                                                                    )}
                                                                </td>
                                                            );
                                                        })()}
                                                        <td style={{ width: '10%' }}>
                                                            <button
                                                                className="btn btn-light"
                                                                data-toggle="tooltip"
                                                                title="Alterar Visibilidade"
                                                                onClick={() =>
                                                                    alterarVisibilidade('areas', a, setAreas)
                                                                }
                                                            >
                                                                {a.visivel ? (
                                                                    <i className="bi bi-toggle-on fs-4"></i>
                                                                ) : (
                                                                    <i className="bi bi-toggle-off fs-4"></i>
                                                                )}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>
                                );
                        }
                    })()}
                </div>
            </div>

            <div className="modal fade" id="estadoModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="needs-validation" action={f => adicionarEstado(f, setEstados)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Adicionar Novo Estado</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 row">
                                    <label htmlFor="estadoNome" className="form-label col-sm-3 col-form-label">
                                        Nome
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="estadoNome"
                                            id="estadoNome"
                                            placeholder="Nome do novo estado"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="estadoSigla" className="form-label col-sm-3 col-form-label">
                                        Sigla
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="estadoSigla"
                                            id="estadoSigla"
                                            placeholder="Sigla do novo estado"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <SubmitButton rotulo="Adicionar" />
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="cidadeModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="needs-validation" action={f => adicionarCidade(f, setCidades)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Adicionar Nova Cidade</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 row">
                                    <label htmlFor="cidadeNome" className="form-label col-sm-3 col-form-label">
                                        Nome
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cidadeNome"
                                            id="cidadeNome"
                                            placeholder="Nome da nova cidade"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="estado" className="form-label col-sm-3 col-form-label">
                                        Estado
                                    </label>
                                    <div className="col-sm-9">
                                        <select
                                            className="form-select"
                                            name="estadoId"
                                            defaultValue=""
                                            disabled={!estados.length}
                                            required
                                        >
                                            <option value="" disabled>
                                                Selecione o Estado
                                            </option>
                                            {estados.map(e => (
                                                <option key={e.id} value={e.id}>
                                                    {e.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <SubmitButton rotulo="Adicionar" />
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="lojaModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="needs-validation" action={f => adicionarLoja(f, setLojas)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Adicionar Nova Loja</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 row">
                                    <label htmlFor="lojaNome" className="form-label col-sm-3 col-form-label">
                                        Nome
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lojaNome"
                                            id="lojaNome"
                                            placeholder="Nome da nova loja"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="cidade" className="form-label col-sm-3 col-form-label">
                                        Cidade
                                    </label>
                                    <div className="col-sm-9">
                                        <select
                                            className="form-select"
                                            name="cidadeId"
                                            defaultValue=""
                                            disabled={!cidades.length}
                                            required
                                        >
                                            <option value="" disabled>
                                                Selecione a Cidade
                                            </option>
                                            {cidades.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <SubmitButton rotulo="Adicionar" />
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="areaModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form className="needs-validation" action={f => adicionarArea(f, setAreas)}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Adicionar Nova Área</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3 row">
                                    <label htmlFor="areaNome" className="form-label col-sm-3 col-form-label">
                                        Nome
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="areaNome"
                                            id="areaNome"
                                            placeholder="Nome da nova area"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="loja" className="form-label col-sm-3 col-form-label">
                                        Loja
                                    </label>
                                    <div className="col-sm-9">
                                        <select
                                            className="form-select"
                                            name="lojaId"
                                            defaultValue=""
                                            disabled={!lojas.length}
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
                                </div>
                            </div>
                            <div className="modal-footer">
                                <SubmitButton rotulo="Adicionar" />
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
