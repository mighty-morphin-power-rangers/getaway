import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import BasicDatePicker from "../components/BasicDatePicker"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#CCD7FF',
          color: 'white'
        }
      }
    }
  }
});

export default function BookNowButton(props:any) {

  const { setAppointment } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{backgroundColor:"green"}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Book Now
      </Button>
      <ThemeProvider theme={customTheme}>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent >
            <DialogContentText>
              Please select a data and time that works for you.
            </DialogContentText>
            <BasicDatePicker setAppointment={setAppointment} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color:"primary"}}>Cancel</Button>
            <Button onClick={handleClose} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}