"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';




function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),


];






export interface UserProps {
    users: [
        {
            id: number,
            numeroDocumento: string,
            tipoDocumento: string,
            nome: string,
            logradouro: string,
            numero: string,
            bairro: string,
            cidade: string,
            uf: string
        }

    ]

}

export interface TypeUser {
    id: number,
    numeroDocumento: string,
    tipoDocumento: string,
    nome: string,
    logradouro: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string
}



export default function BasicTable({ users }: UserProps) {

    return (
        <>
            <Box component="div"
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 3 }}>

                <h2>Clientes</h2>

                <TextField id="outlined-basic"
                    label="Buscar"
                    variant="outlined"
                    size="small"
                    sx={{ m: 1, width: '50ch' }}
                />

                <Button variant="outlined">Cadastrar</Button>

            </Box >

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Telefone</TableCell>
                            <TableCell align="right">CPF</TableCell>
                            <TableCell align="right">Rua</TableCell>
                            <TableCell align="right">Numero</TableCell>
                            <TableCell align="right">Bairro</TableCell>
                            <TableCell align="right">Cidade</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: TypeUser) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.nome}
                                </TableCell>
                                <TableCell align="right">{user.nome}</TableCell>
                                <TableCell align="right">{user.numeroDocumento}</TableCell>
                                <TableCell align="right">{user.logradouro}</TableCell>
                                <TableCell align="right">{user.numero}</TableCell>
                                <TableCell align="right">{user.bairro}</TableCell>
                                <TableCell align="right">{user.cidade}</TableCell>
                                <TableCell align="right">{user.uf}</TableCell>
                                <TableCell align="right"><Button variant="text">Text</Button></TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}