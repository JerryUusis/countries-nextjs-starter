import { Alert, Fade } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { turnInvisible } from "../store/visitedCountriesSlice";
import { AlertStateType } from "../types/reduxStateTypes";
import { setIsVisible } from "../store/alertSlice";

const AlertHandler = () => {
  const message = useSelector((state: AlertStateType) => state.alert.message);
  const severity = useSelector((state: AlertStateType) => state.alert.severity);
  const visibility = useSelector(
    (state: AlertStateType) => state.alert.visibility
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (visibility) {
      const timeoutId = setTimeout(() => {
        dispatch(setIsVisible(false));
      }, 3500);
      return () => clearTimeout(timeoutId);
    }
  });

  return (
    <Fade
      in={visibility}
      timeout={250}
      onExited={() => dispatch(turnInvisible(false))}
    >
      <Alert
        severity={severity}
        variant="filled"
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "5",
        }}
        onClick={() => dispatch(turnInvisible(false))}
      >
        {message}
      </Alert>
    </Fade>
  );
};

export default AlertHandler;
