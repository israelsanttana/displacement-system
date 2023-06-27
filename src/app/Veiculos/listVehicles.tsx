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
import ModalVehicles from '../components/modal-vehicles';


export interface VehicleType {
    id: number;
    placa: string;
    marcaModelo: string,
    anoFabricacao: string;
    kmAtual: string;
}


export default function TableVehicles() {
    const { getAPIVehicles, deleteAPIDrivers } = useAPI();
    const [vehicles, setVehicles] = useState<VehicleType[]>([]);
    const [modalMode, setModalMode] = useState<'register' | 'edit'>('register');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<VehicleType | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const response = await getAPIVehicles('v1/Veiculo');
        setLoading(false)
        setVehicles(response);

    };

    const updateTable = async () => {
        if (searchValue.trim() === '') {
            fetchData();
        } else {
            const response = await getAPIVehicles(`v1/Veiculo?search=${searchValue}`);
            setVehicles(response);

        }

    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleDeleteDrive = async (id: number) => {
        try {
            await deleteAPIDrivers(id);
            updateTable();
        } catch (error) {
            console.error('Ocorreu um erro ao deletar o usuário:', error);
        }
    };

    const handleOpenRegisterModal = () => {
        setModalMode('register');
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (user: VehicleType) => {
        setModalMode('edit');
        setEditUser(user);
        setIsModalOpen(true);
    };


    return (
        <>
            {
                <ModalVehicles
                    mode={modalMode}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpdateTable={updateTable}
                    vehicles={editUser}
                />
            }

            <Grid container spacing={1} sx={{ mb: 3, mt: 3, flexWrap: 'wrap' }}
                columnSpacing={{ xs: 1, sm: 3, md: 3 }}
            >

                <Grid item xs={12} md={4}>

                    <Typography variant="h4">Veículos</Typography>

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

                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={9}>Carregando...</TableCell>
                            </TableRow>

                        ) :
                            vehicles.map((vehicles: VehicleType) => (
                                <TableRow key={vehicles.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {vehicles.placa}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicles.marcaModelo}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicles.anoFabricacao}
                                    </TableCell>
                                    <TableCell align="right">
                                        {vehicles.kmAtual}
                                    </TableCell>

                                    <TableCell align="right">
                                        <Button id='EditButton' onClick={() => handleOpenEditModal(vehicles)} sx={{ color: '#707070' }}>
                                            <EditIcon />
                                        </Button>
                                        <Button
                                            sx={{ color: '#707070' }}
                                            onClick={() => handleDeleteDrive(vehicles.id)}
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
