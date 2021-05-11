import React,{useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ResponsiveDialog({setOpenA,openA, msnAlert}) {
  const theme = useTheme();

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleCloseA = () => {
    setOpenA(false);
  };

  return (
    <div>

      <Dialog
        open={openA}
        onClose={handleCloseA}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText>
         {msnAlert}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseA} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}