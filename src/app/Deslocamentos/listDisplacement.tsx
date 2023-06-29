'use client'
import { Card, CardContent, Typography, CardActions, Button, } from '@mui/material';
import { useAPI } from '../Context/AppContext';
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MyLoading from '../components/loading'
import Timeline from '@mui/lab/Timeline';
import { TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent, timelineOppositeContentClasses } from '@mui/lab';
import { format } from 'date-fns';


interface CardType {
    id: number,
    kmInicial: number,
    kmFinal: number,
    inicioDeslocamento: string,
    fimDeslocamento: string,
    checkList: string,
    motivo: string,
    observacao: string,
    idCondutor: number,
    idVeiculo: number,
    idCliente: number
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


export default function TableDisplacement() {
    const { getAPIDisplacements } = useAPI();
    const [route, setRoute] = useState<CardType[]>([]);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        setLoading(true)
        const response = await getAPIDisplacements('v1/Deslocamento');
        setLoading(false)
        setRoute(response);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3, }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }



    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };



    return (

        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Todos" {...a11yProps(0)} />
                    <Tab label="Em andamento" {...a11yProps(1)} />
                    <Tab label="Concluídos" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0} >


                {loading ? <Box sx={{ height: '70vh' }}> <MyLoading /></Box>
                    : (route.map((route: CardType) => (

                        <Card key={route.id} sx={{ minWidth: 275, m: 3 }}>
                            <CardContent>

                                <Typography variant="h5" component="div" sx={{ fontSize: 20 }} color="text" >
                                    {route.motivo}
                                    <Timeline
                                        sx={{
                                            [`& .${timelineOppositeContentClasses.root}`]: {
                                                flex: 0.1,

                                            },
                                        }}
                                    >
                                        <TimelineItem >
                                            <TimelineOppositeContent color="textSecondary">
                                                {format
                                                    (new Date
                                                        (route.inicioDeslocamento),
                                                        'dd/MM/yyyy')}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>início</TimelineContent>
                                        </TimelineItem>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="textSecondary">
                                                {format
                                                    (new Date
                                                        (route.fimDeslocamento),
                                                        'dd/MM/yyyy')}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot />
                                            </TimelineSeparator>
                                            <TimelineContent>Final</TimelineContent>
                                        </TimelineItem>
                                    </Timeline>
                                </Typography>

                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >

                                </Typography>

                                <Typography sx={{ mb: 1.5 }}
                                    color="text.secondary">

                                </Typography>
                                <Typography variant="body2">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>

                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    )))}

            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>


    )
}