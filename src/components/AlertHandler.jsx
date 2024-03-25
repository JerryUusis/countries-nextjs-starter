import { Alert, Fade } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { turnInvisible } from "../store/visitedCountriesSlice";

const AlertHandler = () => {
    const visitedAddedMessage = useSelector((state) => state.visitedCountries.alertMessage);
    const visitedSeverity = useSelector((state) => state.visitedCountries.alertSeverity);
    const visitedVisible = useSelector((state) => state.visitedCountries.alertVisible);

    const dispatch = useDispatch();

    const hideAlertAfterDelay = () => {
        setTimeout(() => {
            dispatch(turnInvisible(false)); // Dispatch action to turn alert invisible
        }, 2000);
    };

    // Trigger the hideAlertAfterDelay function when faveVisible is true
    useEffect(() => {
        if (visitedVisible) {
            hideAlertAfterDelay();
        }
    });

    return (
        <Fade sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "5" }} in={visitedVisible} timeout={250} onExited={() => dispatch(turnInvisible(false))}>
            <Alert
                severity={visitedSeverity}
                variant="filled">
                {visitedAddedMessage}
            </Alert>
        </Fade>
    )
}

export default AlertHandler