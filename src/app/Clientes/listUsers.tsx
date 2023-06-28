'use client'
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Grid, TextField, Typography } from '@mui/material';
import { useAPI } from '../Context/AppContext';
import ModalClient from '../components/modal-client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface UserType {
    id: number;
    numeroDocumento: string;
    tipoDocumento: string;
    nome: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
}


export default function TableClient() {
    const { getAPIClient, deleteAPIClient } = useAPI();
    const [users, setUsers] = useState<UserType[]>([]);
    const [modalMode, setModalMode] = useState<'register' | 'edit'>('register');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<UserType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const response = await getAPIClient('v1/Cliente');
        setLoading(false)
        setUsers(response);
    };

    const updateTable = () => {
        if (searchValue.trim() === '') {
            fetchData();
        } else {
            const filteredUsers = users.filter((user) =>
                user.nome.toLowerCase().includes(searchValue.toLowerCase())
            );
            setUsers(filteredUsers);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        if (event.target.value.trim() === '') {
            fetchData();
        } else {
            updateTable();
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteAPIClient(id);
            updateTable();
        } catch (error) {
            console.error('Ocorreu um erro ao deletar o usuário:', error);
        }
    };

    const handleOpenRegisterModal = () => {
        setModalMode('register');
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user: UserType) => {
        setModalMode('edit');
        setEditUser(user);
        setIsModalOpen(true);
    };


    return (
        <>
            <ModalClient
                mode={modalMode}
                open={isModalOpen}
                onClose={handleCloseModal}
                onUpdateTable={updateTable}
                user={editUser}
            />

            <Grid container spacing={1} sx={{ mb: 3, mt: 3, flexWrap: 'wrap' }}
                columnSpacing={{ xs: 1, sm: 3, md: 3 }}
            >

                <Grid item xs={12} md={4}>

                    <Typography variant="h4">Clientes</Typography>

                </Grid>

                <Grid item xs={4} md={4}>

                    <TextField id="outlined-basic"
                        fullWidth
                        label="Buscar..."
                        variant="outlined"
                        size="small"
                        value={searchValue}
                        onChange={handleSearchChange}
                    />

                </Grid>

                <Grid item xs={2} md={4} sx={{ display: 'flex', justifyContent: 'end' }} >

                    <Button id='RegisterButton'
                        onClick={handleOpenRegisterModal}
                        color="primary"
                        variant="contained"
                    >
                        Cadastrar
                    </Button>

                </Grid>

            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
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
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9}>Carregando...</TableCell>
                            </TableRow>
                        ) :
                            users.map((user: UserType) => (
                                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {user.nome}
                                    </TableCell>
                                    <TableCell align="right">{user.numeroDocumento}</TableCell>
                                    <TableCell align="right">{user.logradouro}</TableCell>
                                    <TableCell align="right">{user.numero}</TableCell>
                                    <TableCell align="right">{user.bairro}</TableCell>
                                    <TableCell align="right">{user.cidade}</TableCell>
                                    <TableCell align="right">{user.uf}</TableCell>
                                    <TableCell align="right">
                                        <Button id='EditButton' onClick={() => handleOpenEditModal(user)} sx={{ color: '#707070' }}>
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            sx={{ color: '#707070' }}
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
