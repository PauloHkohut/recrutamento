import { createUsuario, getUsuario } from '@/actions/auth';
import { auth } from '@/database/firebase';
import Usuario from '@/models/usuario';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, UserCredential } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Método para fazer login no google com um popup.
 *
 * @export
 */
export async function login() {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider).then(async (c: UserCredential) => {
            const usuario = {
                uid: c.user.uid,
                nome: c.user.displayName,
                email: c.user.email,
                fotoUrl: c.user.photoURL,
            } as Usuario;
            await createUsuario(usuario);
        });
    } catch (error) {
        console.log('Não foi possível fazer o login', error);
    }
}

/**
 * Método para fazer logout.
 *
 * @export
 */
export async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.log('Não foi possível fazer o logout', error);
    }
}

/**
 * Obtêm o usuário autenticado da sessão checando se é gestor ou candidato.
 *
 * @export
 * @param {boolean} [checarGestor=false]
 * @return {*}  {(Usuario | null)}
 */
export function useGetUsuario(checarGestor: boolean = false): Usuario | null | undefined {
    const [usuario, setUsuario] = useState<Usuario | null | undefined>(undefined);
    const router = useRouter();

    // Escuta as alterações de autenticação e atualiza o state de usuário.
    useEffect(() => {
        const redirecionar = () => {
            setUsuario(null);
            router.push('/');
        };

        const unsubscribe = onAuthStateChanged(auth, authUsuario => {
            if (!authUsuario) redirecionar();
            else
                getUsuario(authUsuario!.uid).then(u => {
                    if (checarGestor && !u?.isGestor) return redirecionar();
                    setUsuario(u);
                });
        });
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Escuta as alterações do state usuário para atualizar a página atual.
    useEffect(() => {
        onAuthStateChanged(auth, authUsuario => {
            if (usuario?.email !== authUsuario?.email) router.refresh();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario]);

    return usuario;
}
