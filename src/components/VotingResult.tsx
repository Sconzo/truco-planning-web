import React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Modal,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    score:{
        color:"black",
        marginTop:"40px",
        fontSize:"30px",
        padding:"8px",
        backgroundColor:theme.palette.primary.main,
        borderRadius: '8px',
    }
}));

type VotingResultProps = {
    total:number;
    openModal : boolean;
    onClearSelection: () => void;
}
const VotingResult = (props : VotingResultProps) => {
    const classes = useStyles();

    return (
        <div>

            <Grid item xs={4} >
                <Dialog open={props.openModal}>
                    <DialogTitle>Resultado da Rodada</DialogTitle>
                    <DialogContent>
                        <Box className={classes.score}>
                            <span>{props.total}</span>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.onClearSelection} color="primary">
                            Nova Rodada
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    )
}

export default VotingResult;