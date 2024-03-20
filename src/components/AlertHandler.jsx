import { Alert, Fade } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { turnInvisible } from "../store/favouritesSlice";

const AlertHandler = () => {
    const faveAddedMessage = useSelector((state) => state.favourites.alertMessage);
    const faveSeverity = useSelector((state) => state.favourites.alertSeverity);
    const faveVisible = useSelector((state) => state.favourites.alertVisible);

    const dispatch = useDispatch();

    const hideAlertAfterDelay = () => {
        setTimeout(() => {
            dispatch(turnInvisible(false)); // Dispatch action to turn alert invisible
        }, 2000); 
    };

    // Trigger the hideAlertAfterDelay function when faveVisible changes
    useEffect(() => {
        if (faveVisible) {
            hideAlertAfterDelay();
        }
    }, [faveVisible]);

    return (
        <Fade sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "5" }} in={faveVisible} timeout={250} onExited={() => dispatch(turnInvisible(false))}>
            <Alert
                severity={faveSeverity}
                variant="filled">
                {faveAddedMessage}
            </Alert>
        </Fade>
    )
}

export default AlertHandler