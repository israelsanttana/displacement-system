import { getUsers, addUsers } from "../api/api-client"
import ModalClient from "../components/modal-client"
import TableClient from "./listUsers"


export default async function PageClients() {

    const resGet = await getUsers()
    const resPost = await addUsers()


    return (
        <>

            <TableClient users={resGet} post={resPost} />


        </>
    )
}