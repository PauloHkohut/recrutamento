export enum Sexo {
    Masculino = 1,
    Feminino = 2,
    Outros = 3,
}

export enum Horario {
    Diurno = 1,
    Noturno = 2,
    Ambos = 3,
}

export interface Candidatura {
    areaId: string;
    celular: string;
    cidadeId: string;
    criadoEm: number;
    estadoId: string;
    horario: Horario;
    lojaId: string;
    mensagem: string;
    nascimento: number;
    nome: string;
    sexo: Sexo;
    usuarioId: string;
    curriculoId: string;
}
