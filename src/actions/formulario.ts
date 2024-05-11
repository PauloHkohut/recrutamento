'use server';

import { firestore, storage } from '@/database/firebase';
import Area from '@/models/area';
import { Candidatura } from '@/models/candidatura';
import Cidade from '@/models/cidade';
import Estado from '@/models/estado';
import Loja from '@/models/loja';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

/**
 * Faz query de estados ao banco firestore.
 *
 * @export
 * @return {*}  {Promise<Estado[]>}
 */
export async function getEstados(): Promise<Estado[]> {
    const q = query(collection(firestore, 'estados'), where('visivel', '==', true));
    const docs = await getDocs(q);
    const estados: Estado[] = [];
    docs.forEach(doc => estados.push(doc.data() as Estado));
    return estados;
}

/**
 * Faz query de cidades ao banco firestore por estadoId.
 *
 * @export
 * @param {string} estadoId
 * @return {*}  {Promise<Cidade[]>}
 */
export async function getCidades(estadoId: string): Promise<Cidade[]> {
    const q = query(collection(firestore, 'cidades'), where('estadoId', '==', estadoId), where('visivel', '==', true));
    const docs = await getDocs(q);
    const cidades: Cidade[] = [];
    docs.forEach(doc => cidades.push(doc.data() as Cidade));
    return cidades;
}

/**
 * Faz query de lojas ao banco firestore por cidadeId.
 *
 * @export
 * @param {string} cidadeId
 * @return {*}  {Promise<Loja[]>}
 */
export async function getLojas(cidadeId: string): Promise<Loja[]> {
    const q = query(collection(firestore, 'lojas'), where('cidadeId', '==', cidadeId), where('visivel', '==', true));
    const docs = await getDocs(q);
    const lojas: Loja[] = [];
    docs.forEach(doc => lojas.push(doc.data() as Loja));
    return lojas;
}

/**
 * Faz query de areas ao banco firestore por lojaId.
 *
 * @export
 * @param {string} lojaId
 * @return {*}  {Promise<Area[]>}
 */
export async function getAreas(lojaId: string): Promise<Area[]> {
    const q = query(collection(firestore, 'areas'), where('lojaId', '==', lojaId), where('visivel', '==', true));
    const docs = await getDocs(q);
    const areas: Area[] = [];
    docs.forEach(doc => areas.push(doc.data() as Area));
    return areas;
}

/**
 * Salva os dados do formulário de submissão como uma candidatura no banco firestore.
 *
 * @export
 * @param {FormData} formData
 * @param {string} usuarioId
 */
export async function submeterCandidatura(formData: FormData, usuarioId: string) {
    const arquivo = formData.get('curriculo') as File;
    const curriculoId = uuidv4();
    const storageRef = ref(storage, `curriculos/${curriculoId}`);
    await uploadBytes(storageRef, arquivo);

    const candidatura = {
        areaId: formData.get('areaId'),
        celular: formData.get('celular'),
        cidadeId: formData.get('cidadeId'),
        criadoEm: Date.now(),
        estadoId: formData.get('estadoId'),
        horario: parseInt(formData.get('horario') as string),
        lojaId: formData.get('lojaId'),
        mensagem: formData.get('mensagem'),
        nascimento: Date.parse(formData.get('nascimento') as string),
        nome: formData.get('nome'),
        sexo: parseInt(formData.get('sexo') as string),
        usuarioId: usuarioId,
        curriculoId: curriculoId,
    } as Candidatura;

    await setDoc(doc(firestore, 'candidaturas', uuidv4()), candidatura);
    redirect('/formulario/sucesso');
}

/**
 * Obtêm todas as candidaturas de um usuário.
 *
 * @export
 * @param {string} usuarioId
 * @return {*}  {Promise<Candidatura[]>}
 */
export async function getCandidaturas(usuarioId: string): Promise<Candidatura[]> {
    const q = query(collection(firestore, 'candidaturas'), where('usuarioId', '==', usuarioId));
    const docs = await getDocs(q);
    const candidaturas: Candidatura[] = [];
    docs.forEach(doc => candidaturas.push(doc.data() as Candidatura));
    return candidaturas;
}
