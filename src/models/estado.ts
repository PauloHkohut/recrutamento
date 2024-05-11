interface Estado {
    id: string; // uuid
    sigla: string; // 'PR', 'SP', 'RJ'
    nome: string; // 'Paraná', 'São Paulo', 'Rio de Janeiro'
    visivel: boolean;
}

export default Estado;
