'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';

const WelcomeScreen: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Tela de Boas-Vindas
            </Typography>
            <Typography variant="body1">
                Aqui estão os eventos futuros e importantes:
            </Typography>
            <ul>
                <li>Reunião de equipe - 1º de julho, 10h</li>
                <li>Treinamento de novos recursos - 5 de julho, 14h</li>
                <li>Manutenção programada - 8 de julho, 20h</li>
            </ul>
        </Box>
    );
};

export default WelcomeScreen;
