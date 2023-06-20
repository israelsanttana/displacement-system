
export async function getUsers() {
    const response = await fetch(
        "https://api-deslocamento.herokuapp.com/api/v1/Cliente");
    const users = await response.json();

    return users
}

export async function addUsers() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numeroDocumento: "123456789",
            tipoDocumento: "RG",
            nome: "João da Silva",
            logradouro: "Rua das Flores",
            numero: "123",
            bairro: "Centro",
            cidade: "São Paulo",
            uf: "SP"
        }),
    };

    const response = await fetch(
        'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
        options
    );

    const users = await response.json();

    return users;
}


