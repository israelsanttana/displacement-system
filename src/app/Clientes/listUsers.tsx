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
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
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
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const response = await getAPIClient('v1/Cliente');
        setUsers(response);
    };

    const updateTable = async () => {
        if (searchValue.trim() === '') {
            fetchData();
        } else {
            const response = await getAPIClient(`v1/Cliente?search=${searchValue}`);
            setUsers(response);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
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

    const handleOpenEditModal = () => {
        setModalMode('edit');
        setIsModalOpen(true);
    };

    return (
        <>
            {isModalOpen && (
                <ModalClient
                    mode={modalMode}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdateTable={updateTable}
                />
            )}

            <Box component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', m: 3
                }}
            >
                <Typography variant="h4">Clientes</Typography>

                <TextField id="outlined-basic"
                    label="Buscar..."
                    variant="outlined"
                    size="small"
                    sx={{ m: 1, width: '50ch' }}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                <Button id='RegisterButton' onClick={handleOpenRegisterModal}
                    color="primary"
                    variant="contained"
                >
                    Cadastrar
                </Button>
            </Box>

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
                        {users.length === 0 ? (
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
                                        <Button id='EditButton' onClick={handleOpenEditModal} sx={{ color: '#707070' }}>
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
