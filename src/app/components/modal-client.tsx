"use client"
import { useState, useEffect } from "react";
import { Modal, Container, Box, TextField, Button } from "@mui/material";


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


export interface ModalClientProps {
    open: boolean,
    onClose: () => void,

}

export default function ModalClient({ open, onClose, }: ModalClientProps) {



    const handleClose = () => {
        onClose();
    };

    const [isUser, setIsUser] = useState<TypeUser>({
        id: 0,
        numeroDocumento: "",
        tipoDocumento: "",
        nome: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setIsUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    };


    return (
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
            <Container maxWidth="sm" sx={{
                bgcolor: '#ffffff',
            }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '28ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Nome"
                        defaultValue=""
                        name="nome"
                        type="text"
                        value={isUser.nome}
                        onChange={handleInputChange}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Telefone"
                        defaultValue=""
                        name="telefone"
                        type="tel"
                        value={isUser.numero}
                        onChange={handleInputChange}
                    />
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <Button type="submit" variant="contained" color="success">
                            Success
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleClose}>
                            Error
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Modal>
    )
}
