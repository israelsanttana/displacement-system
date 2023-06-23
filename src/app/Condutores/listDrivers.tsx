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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

export interface DriverType {
    id: number;
    nome: string;
    numeroHabilitacao: string,
    catergoriaHabilitacao: string;
    vencimentoHabilitacao: string;
}


export default function TableDrivers() {
    const { getAPIDrivers, deleteAPIClient } = useAPI();
    const [driver, setDriver] = useState<DriverType[]>([]);
    const [modalMode, setModalMode] = useState<'register' | 'edit'>('register');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<DriverType | null>(null);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        const response = await getAPIDrivers('v1/Condutor');
        setDriver(response);
    };

    const updateTable = async () => {
        if (searchValue.trim() === '') {
            fetchData();
        } else {
            const response = await getAPIDrivers(`v1/Condutor?search=${searchValue}`);
            setDriver(response);
        }
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

    const handleOpenEditModal = (user: DriverType) => {
        setModalMode('edit');
        setEditUser(user);
        setIsModalOpen(true);
    };


    return (
        <>
            {
                /* <ModalClient
                    mode={modalMode}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdateTable={updateTable}
                    user={editUser}
                /> */
            }

            <Grid container spacing={1} sx={{ mb: 3, mt: 3, flexWrap: 'wrap' }}
                columnSpacing={{ xs: 1, sm: 3, md: 3 }}
            >

                <Grid item xs={12} md={4}>

                    <Typography variant="h4">Condutores</Typography>

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
                            <TableCell align="right">Nº Habilitação</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Vencimento</TableCell>
                            <TableCell align="right">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {driver.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9}>Carregando...</TableCell>
                            </TableRow>
                        ) :
                            driver.map((driver: DriverType) => (
                                <TableRow key={driver.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {driver.nome}
                                    </TableCell>
                                    <TableCell align="right">
                                        {driver.numeroHabilitacao}
                                    </TableCell>
                                    <TableCell align="right">
                                        {driver.catergoriaHabilitacao}
                                    </TableCell>
                                    <TableCell align="right">
                                        {format
                                            (new Date
                                                (driver.vencimentoHabilitacao),
                                                'dd/MM/yyyy')}
                                    </TableCell>

                                    <TableCell align="right">
                                        <Button id='EditButton' onClick={() => handleOpenEditModal(driver)} sx={{ color: '#707070' }}>
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            sx={{ color: '#707070' }}
                                            onClick={() => handleDeleteUser(driver.id)}
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