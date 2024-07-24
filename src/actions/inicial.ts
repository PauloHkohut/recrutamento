import { getAreas, getCidades, getEstados, getLojas } from './formulario';

/**
 * Obtêm as áreas disponíveis para exibir na página inicial.
 *
 * @export
 * @return {*}  {Promise<string[]>}
 */
export async function getAreasAbertas(): Promise<string[]> {
    const areasAbertas: string[] = [];
    const maximoAreas = 5;
    const estados = await getEstados();

    for (const estado of estados) {
        const cidades = await getCidades(estado.id);
        for (const cidade of cidades) {
            const lojas = await getLojas(cidade.id);
            for (const loja of lojas) {
                const areas = await getAreas(loja.id);
                for (const area of areas) {
                    if (areasAbertas.length >= maximoAreas) break;
                    areasAbertas.push(`${area.nome} (${loja.nome}) | ${cidade.nome} - ${estado.sigla}`);
                }
            }
        }
    }

    return areasAbertas;
}
