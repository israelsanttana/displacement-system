
export async function getUsers() {
    const response = await fetch(
        "https://api-deslocamento.herokuapp.com/api/v1/Cliente");
    const users = await response.json();

    return users
}

export async function addUsers() {
    const response = await fetch(
        "https://api-deslocamento.herokuapp.com/api/v1/Cliente");
    const users = await response.json();

    return users
}
