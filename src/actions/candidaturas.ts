'use server';

import { CandidaturaView } from '@/app/candidaturas/CandidaturaView';
import { firestore, storage } from '@/database/firebase';
import Area from '@/models/area';
import { Candidatura, Horario, Sexo } from '@/models/candidatura';
import Cidade from '@/models/cidade';
import Loja from '@/models/loja';
import Usuario from '@/models/usuario';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

/**
 * Obtêm a idade a partir de um timestamp em milissegundos.
 *
 * @param {number} nascimento
 * @return {*}  {number}
 */
function calcularIdade(nascimento: number): number {
    const dataAtual = new Date();
    const dataNascimento = new Date(nascimento);
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    const mes = dataAtual.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && dataAtual.getDate() < dataNascimento.getDate())) idade--;
    return idade;
}

/**
 * Faz query de candidaturas e usuários ao banco firestore.
 *
 * @export
 * @return {*}  {Promise<CandidaturaView[]>}
 */
export async function getCandidaturasViews(): Promise<CandidaturaView[]> {
    const views = [] as CandidaturaView[];

    const q = query(collection(firestore, 'candidaturas'));
    const docs = await getDocs(q);

    for (const c of docs.docs) {
        const candidatura = c.data() as Candidatura;

        const usuarioRef = doc(firestore, 'usuarios', candidatura.usuarioId);
        const usuario = (await getDoc(usuarioRef)).data() as Usuario;

        const cidadeRef = doc(firestore, 'cidades', candidatura.cidadeId);
        const cidade = (await getDoc(cidadeRef)).data() as Cidade;

        const lojaRef = doc(firestore, 'lojas', candidatura.lojaId);
        const loja = (await getDoc(lojaRef)).data() as Loja;

        const areaRef = doc(firestore, 'areas', candidatura.areaId);
        const area = (await getDoc(areaRef)).data() as Area;

        const criadoEm = new Date(candidatura.criadoEm);

        const curriculo = ref(storage, `curriculos/${candidatura.curriculoId}`);
        const curriculoUrl = await getDownloadURL(curriculo);

        views.push({
            id: c.id,
            nome: candidatura.nome,
            email: usuario.email,
            fotoUrl: usuario.fotoUrl,
            celular: candidatura.celular,
            mensagem: candidatura.mensagem,
            sexo: Sexo[candidatura.sexo],
            idade: calcularIdade(candidatura.nascimento),
            horario: Horario[candidatura.horario],
            cidade: cidade.nome,
            loja: loja.nome,
            area: area.nome,
            data: criadoEm.toLocaleDateString('pt-BR'),
            curriculoUrl: curriculoUrl,
        });
    }

    return views;
}
