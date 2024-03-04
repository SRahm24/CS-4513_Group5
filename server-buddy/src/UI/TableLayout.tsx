import Grid from '@mui/material/Grid';
import TableCard from './TableButtons';


function TableLayout() {
    return (
        <Grid container spacing={2}>
            {[...Array(9)].map((_, index) => (
                <Grid item xs={4} key={index}>
                    {TableCard(index + 1)}
                </Grid>
            ))}
        </Grid>
    )
}

export default TableLayout;