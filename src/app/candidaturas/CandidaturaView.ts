export interface CandidaturaView {
    id: string;
    nome: string;
    email: string;
    fotoUrl: string;
    celular: string;
    mensagem: string;
    sexo: string;
    idade: number;
    horario: string;
    cidade: string;
    loja: string;
    area: string;
    data: string;
    curriculoId: string;
}

export const QtdePorPagina = 8;

export interface Ordenacao {
    chave: keyof CandidaturaView | '';
    direcao: 'asc' | 'desc' | '';
}

export interface Filtros {
    [chave: string]: string;
}

export const FILTROS: Filtros = {
    nome: '',
    sexo: '',
    idade: '',
    horario: '',
    cidade: '',
    loja: '',
    area: '',
    data: '',
};

export const CandidaturaInicial: CandidaturaView = {
    id: '',
    nome: '',
    email: '',
    fotoUrl: '',
    celular: '',
    mensagem: '',
    sexo: '',
    idade: 0,
    horario: '',
    cidade: '',
    loja: '',
    area: '',
    data: '',
    curriculoId: '',
};

/**
 * Retorna uma cópia das candidaturas filtradas, paginadas e ordenadas.
 *
 * @export
 * @param {CandidaturaView[]} candidaturas
 * @param {number} pagina
 * @param {Filtros} filtros
 * @param {Ordenacao} ordenacao
 * @return {*}  {[CandidaturaView[], number]}
 */
export function filtrarOrdenar(
    candidaturas: CandidaturaView[],
    pagina: number,
    filtros: Filtros,
    ordenacao: Ordenacao,
): [CandidaturaView[], number] {
    let dados = [...candidaturas];
    dados = dados.filter(item =>
        Object.keys(filtros).every(
            chave =>
                filtros[chave as keyof Filtros] === '' ||
                item[chave as keyof CandidaturaView]
                    ?.toString()
                    .toLowerCase()
                    .includes(filtros[chave as keyof Filtros].toLowerCase()),
        ),
    );

    if (ordenacao.chave) {
        dados.sort((a, b) => {
            if (a[ordenacao.chave as keyof CandidaturaView] < b[ordenacao.chave as keyof CandidaturaView]) {
                return ordenacao.direcao === 'asc' ? -1 : 1;
            }
            if (a[ordenacao.chave as keyof CandidaturaView] > b[ordenacao.chave as keyof CandidaturaView]) {
                return ordenacao.direcao === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    const inicio = (pagina - 1) * QtdePorPagina;
    const fim = inicio + QtdePorPagina;
    const paginado = dados.slice(inicio, fim);

    return [paginado, dados.length];
}

/**
 * Obtêm a label para uma coluna de acordo com a chave do campo.
 *
 * @export
 * @param {string} campo
 * @return {*}  {string}
 */
export function obtemLabel(campo: string): string {
    switch (campo) {
        case 'horario':
            return 'Horário';
        case 'area':
            return 'Área';
        default:
            return campo.charAt(0).toUpperCase() + campo.slice(1);
    }
}
