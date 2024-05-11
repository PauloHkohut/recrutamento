import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    query,
    QueryDocumentSnapshot,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { schedule } from 'node-cron';
import { firestore, storage } from './database/firebase';
import { Candidatura } from './models/candidatura';
import Retencao from './models/retencao';

/**
 * Rotina para verificação de retenção de dados, excluindo candidaturas após tempo definido.
 *
 * @param {boolean} [testando=false]
 */
function iniciar(testando: boolean = false): void {
    const TODO_DIA_6HORAS = '0 6 * * *';
    const A_CADA_10_SEGUNDOS = '*/10 * * * * *';
    const expressao = testando ? A_CADA_10_SEGUNDOS : TODO_DIA_6HORAS;

    schedule(expressao, async () => {
        console.log('Iniciando verificação de retenção de dados...');
        const retencaoDoc = doc(firestore, 'configuracoes', 'retencao');
        const retencao = (await getDoc(retencaoDoc)).data() as Retencao;

        console.log(`Excluindo candidaturas com mais de ${retencao.dias} dias.`);

        const q = query(collection(firestore, 'candidaturas'));
        const candidaturas: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];
        (await getDocs(q)).forEach(doc => candidaturas.push(doc));

        const excluir = candidaturas.filter(doc => {
            const candidatura = doc.data() as Candidatura;
            const diasPassado = (Date.now() - candidatura.criadoEm) / (24 * 60 * 60 * 1000);
            return diasPassado > retencao.dias;
        });

        console.log(`${excluir.length} candidaturas serão excluídas.\n`);

        for (const doc of excluir) {
            const curriculoId = (doc.data() as Candidatura).curriculoId;
            deleteObject(ref(storage, `curriculos/${curriculoId}`));
            await deleteDoc(doc.ref);
        }
    });
}

iniciar(true);
