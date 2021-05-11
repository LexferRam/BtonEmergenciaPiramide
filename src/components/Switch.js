import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  

  export default function CustomizedSwitches({setContAsesor,contAsesor}) {
    const [state, setState] = useState({
 
      checkedC: false,
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    
      if(event.target.checked){
        const cambiaState = async ()=>{
          await setContAsesor("S")
        }
        cambiaState()     
      }else{
        const cambiaState = async ()=>{
          await setContAsesor("N")
        }
        cambiaState()     
      }
    };
  
    return (
     
       
        <Typography component="div">
            <Grid component="label" container alignItems="center">
                <Grid item>
                    <label style={{ color: 'gray', fontSize: '12px' }} htmlFor="">No</label>
                </Grid>
                <Grid item style={{ marginLeft:10 }}>
                    <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
                </Grid>
                <Grid item>
                    <label style={{ color: 'gray', fontSize: '12px', marginLeft:10 }} htmlFor=""> Si  </label>             
                    </Grid>
            </Grid>
        </Typography>
    );
  }