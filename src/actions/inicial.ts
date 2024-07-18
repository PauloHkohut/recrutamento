import { getAreas, getCidades, getEstados, getLojas } from './formulario';

/**
 * Obtêm as áreas disponíveis para exibir na página inicial.
 *
 * @export
 * @return {*}  {Promise<string[]>}
 */
export async function getAreasAbertas(): Promise<string[]> {
    const areasAbertas: string[] = [];

    const estados = await getEstados();
    estados.forEach(async estado => {
        const cidades = await getCidades(estado.id);
        cidades.forEach(async cidade => {
            const lojas = await getLojas(cidade.id);
            lojas.forEach(async loja => {
                const areas = await getAreas(loja.id);
                areas.forEach(area => {
                    areasAbertas.push(`${area.nome} (${loja.nome}) | ${cidade.nome} - ${estado.sigla}`);
                });
            });
        });
    });

    return areasAbertas;
}
