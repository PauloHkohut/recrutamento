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
 * Retorna uma cópia das candidaturas filtradas e ordenadas.
 *
 * @export
 * @param {CandidaturaView[]} candidaturas
 * @param {Filtros} filtros
 * @param {Ordenacao} ordenacao
 * @return {*}  {CandidaturaView[]}
 */
export function filtrarOrdenar(
    candidaturas: CandidaturaView[],
    filtros: Filtros,
    ordenacao: Ordenacao,
): CandidaturaView[] {
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

    return dados;
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
