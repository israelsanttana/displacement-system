import { Box, CircularProgress, Container } from "@mui/material";


export default function MyLoading() {
    return (
        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>


            <CircularProgress size={70} />


        </Box>

    )
}