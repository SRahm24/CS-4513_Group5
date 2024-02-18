import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function TableLayout() {
    return (
        <Grid container spacing={2}>
            {[...Array(9)].map((_, index) => (
                <Grid item xs={4} key={index}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Table {index + 1}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default TableLayout;