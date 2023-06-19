import { getUsers } from "../api/api-client"
import BasicTable from "./listUsers"

export default async function PageClients() {

    const res = await getUsers()


    return (
        <>

            <BasicTable users={res} />

        </>
    )
}