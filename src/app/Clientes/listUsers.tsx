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
import { Container, Modal, TextField, Typography } from '@mui/material';





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

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <>

            <div>
                <Modal
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Container maxWidth="sm">
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 2, width: '28ch' },
                                width: 700,
                                height: 400,
                                bgcolor: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                flexWrap: 'wrap'

                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Required"
                                defaultValue="Hello World"
                            />

                        </Box>
                    </Container>

                </Modal>
            </div>
            <Box component="div"
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 3 }}>

                <Typography variant="h4" >
                    Clientes
                </Typography>

                <TextField id="outlined-basic"
                    label="Buscar..."
                    variant="outlined"
                    size="small"
                    sx={{ m: 1, width: '50ch' }}
                />

                <Button onClick={handleOpen} color="primary" variant="contained" >
                    Cadastrar
                </Button>


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
                                <TableCell align="right"><Button color="primary" variant="outlined">Editar</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

}

