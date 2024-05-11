'use server';

import { firestore } from '@/database/firebase';
import Usuario from '@/models/usuario';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Adiciona um usuário logado ao banco firestore.
 *
 * @export
 * @param {Usuario} usuario
 * @return {*}  {Promise<Usuario>}
 */
export async function createUsuario(usuario: Usuario): Promise<Usuario> {
    const existente = await getUsuario(usuario.uid);
    usuario.isGestor = existente?.isGestor || false;

    const c = collection(firestore, 'usuarios');
    await setDoc(doc(firestore, 'usuarios', usuario.uid), usuario);
    return usuario;
}

/**
 * Obtêm usuário do firestore pelo uid.
 *
 * @export
 * @param {string} uid
 * @return {*}  {(Promise<Usuario | null>)}
 */
export async function getUsuario(uid: string): Promise<Usuario | null> {
    const d = doc(firestore, 'usuarios', uid);
    const result = await getDoc(d);
    return result.data() as Usuario | null;
}
