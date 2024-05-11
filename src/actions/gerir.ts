import { firestore } from '@/database/firebase';
import Area from '@/models/area';
import Cidade from '@/models/cidade';
import Estado from '@/models/estado';
import Loja from '@/models/loja';
import RestricaoCandidatura from '@/models/restricao';
import Retencao from '@/models/retencao';
import { collection, doc, getDoc, getDocs, query, setDoc } from 'firebase/firestore';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Obtêm a configuração de restrição de candidatura ou cria e insere no banco uma nova.
 *
 * @export
 * @return {*}  {Promise<RestricaoCandidatura>}
 */
export async function getRestricaoCandidatura(): Promise<RestricaoCandidatura> {
    const restricaoDoc = doc(firestore, 'configuracoes', 'restricaoCandidatura');
    const restricao = (await getDoc(restricaoDoc)).data() as RestricaoCandidatura;
    if (restricao) return restricao;

    const novaRestricao: RestricaoCandidatura = { dias: 30 };
    await setDoc(restricaoDoc, novaRestricao);
    return novaRestricao;
}

/**
 * Obtêm a configuração de retenção de dados ou cria e insere no banco uma nova.
 *
 * @export
 * @return {*}  {Promise<Retencao>}
 */
export async function getRetencao(): Promise<Retencao> {
    const retencaoDoc = doc(firestore, 'configuracoes', 'retencao');
    const retencao = (await getDoc(retencaoDoc)).data() as Retencao;
    if (retencao) return retencao;

    const novaRetencao: Retencao = { dias: 180 };
    await setDoc(retencaoDoc, novaRetencao);
    return novaRetencao;
}

/**
 * Atualiza a restrição de candidaturas com a submissão do formulário de gestão.
 *
 * @export
 * @param {FormData} formData
 * @return {*}  {Promise<void>}
 */
export async function atualizaRestricao(formData: FormData): Promise<void> {
    const restricaoDoc = doc(firestore, 'configuracoes', 'restricaoCandidatura');
    const restricao: RestricaoCandidatura = { dias: parseInt(formData.get('diasRestricao') as string) };
    await setDoc(restricaoDoc, restricao);
}

/**
 * Atualiza a retenção de dados com a submissão do formulário de gestão.
 *
 * @export
 * @param {FormData} formData
 * @return {*}  {Promise<void>}
 */
export async function atualizaRetencao(formData: FormData): Promise<void> {
    const retencaoDoc = doc(firestore, 'configuracoes', 'retencao');
    const retencao: Retencao = { dias: parseInt(formData.get('diasRetencao') as string) };
    await setDoc(retencaoDoc, retencao);
}

/**
 * Obtêm todos os estados para exibir na gestão.
 *
 * @export
 * @return {*}  {Promise<Estado[]>}
 */
export async function getTodosEstados(): Promise<Estado[]> {
    const q = query(collection(firestore, 'estados'));
    const docs = await getDocs(q);
    const estados: Estado[] = [];
    docs.forEach(doc => estados.push(doc.data() as Estado));
    return estados;
}

/**
 * Obtêm todos as cidades para exibir na gestão.
 *
 * @export
 * @return {*}  {Promise<Cidade[]>}
 */
export async function getTodasCidades(): Promise<Cidade[]> {
    const q = query(collection(firestore, 'cidades'));
    const docs = await getDocs(q);
    const cidades: Cidade[] = [];
    docs.forEach(doc => cidades.push(doc.data() as Cidade));
    return cidades;
}

/**
 * Obtêm todos as lojas para exibir na gestão.
 *
 * @export
 * @return {*}  {Promise<Loja[]>}
 */
export async function getTodasLojas(): Promise<Loja[]> {
    const q = query(collection(firestore, 'lojas'));
    const docs = await getDocs(q);
    const lojas: Loja[] = [];
    docs.forEach(doc => lojas.push(doc.data() as Loja));
    return lojas;
}

/**
 * Obtêm todos as areas para exibir na gestão.
 *
 * @export
 * @return {*}  {Promise<Area[]>}
 */
export async function getTodasAreas(): Promise<Area[]> {
    const q = query(collection(firestore, 'areas'));
    const docs = await getDocs(q);
    const areas: Area[] = [];
    docs.forEach(doc => areas.push(doc.data() as Area));
    return areas;
}

/**
 * Adiciona um novo estado no banco de dados.
 *
 * @export
 * @param {FormData} formData
 * @param {Dispatch<SetStateAction<Estado[]>>} setEstados
 * @return {*}  {Promise<void>}
 */
export async function adicionarEstado(
    formData: FormData,
    setEstados: Dispatch<SetStateAction<Estado[]>>,
): Promise<void> {
    const estadoId = uuidv4();
    const estado = {
        id: estadoId,
        nome: formData.get('estadoNome'),
        sigla: formData.get('estadoSigla'),
        visivel: true,
    } as Estado;
    await setDoc(doc(firestore, 'estados', estadoId), estado);
    setEstados(prev => [...prev, estado]);
}

/**
 * Adiciona uma nova cidade no banco de dados.
 *
 * @export
 * @param {FormData} formData
 * @param {Dispatch<SetStateAction<Cidade[]>>} setCidades
 * @return {*}  {Promise<void>}
 */
export async function adicionarCidade(
    formData: FormData,
    setCidades: Dispatch<SetStateAction<Cidade[]>>,
): Promise<void> {
    const cidadeId = uuidv4();
    const cidade = {
        id: cidadeId,
        nome: formData.get('cidadeNome'),
        estadoId: formData.get('estadoId'),
        visivel: true,
    } as Cidade;
    await setDoc(doc(firestore, 'cidades', cidadeId), cidade);
    setCidades(prev => [...prev, cidade]);
}

/**
 * Adiciona uma nova loja no banco de dados.
 *
 * @export
 * @param {FormData} formData
 * @param {Dispatch<SetStateAction<Loja[]>>} setLojas
 * @return {*}  {Promise<void>}
 */
export async function adicionarLoja(formData: FormData, setLojas: Dispatch<SetStateAction<Loja[]>>): Promise<void> {
    const lojaId = uuidv4();
    const loja = {
        id: lojaId,
        nome: formData.get('lojaNome'),
        cidadeId: formData.get('cidadeId'),
        visivel: true,
    } as Loja;
    await setDoc(doc(firestore, 'lojas', lojaId), loja);
    setLojas(prev => [...prev, loja]);
}

/**
 * Adiciona uma nova area no banco de dados.
 *
 * @export
 * @param {FormData} formData
 * @param {Dispatch<SetStateAction<Area[]>>} setAreas
 * @return {*}  {Promise<void>}
 */
export async function adicionarArea(formData: FormData, setAreas: Dispatch<SetStateAction<Area[]>>): Promise<void> {
    const areaId = uuidv4();
    const area = {
        id: areaId,
        nome: formData.get('areaNome'),
        lojaId: formData.get('lojaId'),
        visivel: true,
    } as Area;
    await setDoc(doc(firestore, 'areas', areaId), area);
    setAreas(prev => [...prev, area]);
}

type ModeloVisibilidade = Estado | Cidade | Loja | Area;
type ModeloCollection = 'estados' | 'cidades' | 'lojas' | 'areas';

/**
 * Altera a visibilidade de um elemento no banco de dados.
 *
 * @export
 * @param {ModeloCollection} collection
 * @param {ModeloVisibilidade} modelo
 * @param {*} setModelo
 * @return {*}  {Promise<void>}
 */
export async function alterarVisibilidade(
    collection: ModeloCollection,
    modelo: ModeloVisibilidade,
    setModelo: any,
): Promise<void> {
    const atualizado: ModeloVisibilidade = { ...modelo, visivel: !modelo.visivel };
    await setDoc(doc(firestore, collection, atualizado.id), atualizado);
    setModelo((prev: ModeloVisibilidade[]) => prev.map(m => (m.id === atualizado.id ? atualizado : m)));
}
