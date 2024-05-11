import { getCandidaturas } from '@/actions/formulario';
import { getRestricaoCandidatura } from '@/actions/gerir';
import Usuario from '@/models/usuario';

/**
 * Formata celular usando máscara (00) 00000-0000
 *
 * @export
 */
export function formataCelular() {
    const celular = document.getElementById('celular');
    celular?.addEventListener('input', (ev: Event) => {
        const target = ev.target as HTMLInputElement;
        if (!target) return;
        let x = target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        if (x) target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

/**
 * Checa a validade do formulário e adiciona a estilização ao falhar.
 *
 * @export
 */
export function validaFormulario() {
    const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener(
            'submit',
            event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated');
            },
            false,
        );
    });
}

/**
 * Retorna uma promise checando se a restrição de dias para novo submissão foi atendida ou não.
 *
 * @export
 * @param {(Usuario | undefined)} usuario
 * @return {*}  {(Promise<boolean | undefined>)}
 */
export async function validarRestricao(usuario: Usuario | undefined): Promise<boolean | undefined> {
    if (!usuario) return;
    const restricao = await getRestricaoCandidatura();
    const candidaturas = await getCandidaturas(usuario.uid);
    let restrito = false;
    candidaturas.forEach(c => {
        const diasPassado = (Date.now() - c.criadoEm) / (24 * 60 * 60 * 1000);
        if (diasPassado < restricao.dias) restrito = true;
    });
    return restrito;
}
