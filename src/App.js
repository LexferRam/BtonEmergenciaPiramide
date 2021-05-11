import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Logo from './logo.svg'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import HouseIcon from '@material-ui/icons/House';
import MenuItem from '@material-ui/core/MenuItem';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import FormControl from '@material-ui/core/FormControl';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { limpiarCampos, obtenerPosicion } from "./utils";
import Alert from './components/alert';
import GetAppIcon from '@material-ui/icons/GetApp';
import Swicth from './components/Switch'
import { isAndroid, isIOS, isDesktop } from "react-device-detect";
import EmailIcon from '@material-ui/icons/Email';
import arrayTelf from './lista_telf.js';
import { AddAlert } from '@material-ui/icons';
import { brown } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';
const Arrtipoid = [
  {
    value: 'V',
    label: 'V',
  },
  {
    value: 'E',
    label: 'E',
  },
  {
    value: 'P',
    label: 'P',
  },
  {
    value: 'M',
    label: 'M',
  },

];
const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {

    width: '300px',
    padding: '20px',
    borderRadius: '10px',

  },
  img: {
    width: '150px'
  },
  container: {
    textAlign: 'center',
    marginBottom: 30,
    paddingTop: '23px',
    padding: '10px',
  },
  input: {
    fontSize: '10px'
  },

  button: {
    margin: theme.spacing(1),
    marginTop: '20px',
    background: 'green',
    fontSize: '11px'
  },
  buttonInstalar: {
    margin: theme.spacing(1),
    marginTop: '20px',
    color: '#f46b45 !important',
    border: '1px solid #f46b45 !important',
    fontSize: '11px'
  },
}));

var valor_sms = ''
const App = () => {
  const classes = useStyles()
  const {REACT_APP_URL} = process.env

  const [tipoid, setTipoid] = React.useState('V');
  const [txtCedula, setTxtCedula] = React.useState('');
  const [NomApell, setNomApell] = React.useState('');
  const [ptoRef, setPtoRef] = React.useState('');
  const [direccHabita, setDireccHabita] = React.useState('');
  const [telfHabi, setTelfHabi] = useState('');
  const [telfCel, setTelfCel] = useState('');
  const [estados, setEstados] = useState([]);
  const [estadoSel, setEstadoSel] = useState('');
  const [ciudades, setCiudades] = useState([]);
  const [ciudadSel, setCiudadSel] = useState('');
  const [activaCiudad, setActivaCiudad] = useState(true);
  const [nombreAsesor, setNombreAsesor] = useState('');
  const [asesorSelecc, setAsesorSelecc] = useState('');
  const [telfAsesor, setTelfAsesor] = useState('');

  const [datosAsegurado, setDatosAsegurado] = useState([]);

  const [valCodEst, setValCodEst] = useState('');
  const [valCodCiu, setValCodCiu] = useState('');

  const [openA, setOpenA] = useState(false);
  const [msnAlert, setMnsAlert] = useState('')


  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  //estados de validacion
  const [errorDirecHab, setErrorDirecHab] = useState(false);
  const [leyendaDirecHab, setLeyendaDirecHab] = useState("");

  const [errorNomApe, setErrorNomApe] = useState(false);
  const [leyendaNomApe, setLeyendaNomApe] = useState("");

  const [errorCI, setErrorCI] = useState(false);
  const [leyendaCI, setLeyendaCI] = useState("");

  const [actBtnWs, setActBtnWs] = useState(false);
  const [longitud, setLongitud] = useState(0);
  const [latitud, setLatitud] = useState(0);
  const [pais, setPais] = useState('');

  const [contAsesor, setContAsesor] = useState('N');

  const [PWAEvent, setPWAEvent] = useState(null);
  const [showButtton, setShowButton] = useState(true);

  const [btnDownLoad, setBtnDownLoad] = useState(true);
  //estado para el tipo de poliza en la consulta inicial(Colectiva/individual)
  const [tipoUsc, setTipoUsc] = useState("");
  const [emailAsesor, setEmailAsesor] = useState("");
  const [emailAsegurado, setEmailAsegurado] = useState("");
  // const handlePWAEvent = (e = null) => {
  //   e && e.preventDefault();
  //   e && setPWAEvent(e);
  //   setShowButton(true);
  // }

  const fetcData = async () => {

    if (txtCedula.length < 1) {
      setErrorCI(true)
      setLeyendaCI("Ingresar Nro de Identificación")
    } else {
      setErrorCI(false);
      setLeyendaCI("");
      setOpen(true);
      setActivaCiudad(false)
      const nroCI = txtCedula.replace('.', '');
      setTxtCedula(nroCI);
      const response = await axios.post(`${REACT_APP_URL}/asistDomiciliaria`, {
        "ctipoid": tipoid,
        "cnumid": nroCI,
        "cdvid": "0"//siempre pasar 0
      })

      // console.log(response)
      if (response.data == "") {
        setOpenA(true)
        setMnsAlert("El número de identificación no tiene póliza activa")
        limpiarCampos(setNomApell, setPtoRef, setDireccHabita, setTelfHabi, setTelfCel, setContAsesor, setTelfAsesor, setNombreAsesor, setEstados, setCiudades,setEmailAsegurado);
        setActBtnWs(true)
        setOpen(false)
      } else {
        setActBtnWs(false)
        setDatosAsegurado(response.data)
        limpiarCampos(setNomApell, setPtoRef, setDireccHabita, setTelfHabi,setTelfCel, setNombreAsesor, setTelfAsesor, setContAsesor, setTelfAsesor, setNombreAsesor, setEstados, setCiudades,setEmailAsegurado);
        const responseCiudades = await axios.post(`${REACT_APP_URL}/listarCiudades`, {
          "p_codpais": '001',
          "p_codestado": response.data[0].CODESTADO
        })
        setPais(response.data[0].DESCPAIS)
        setEmailAsesor(response.data[0].EMAILASESOR)
        setTipoUsc(response.data[0].TIPOSUSC)
        setValCodCiu(response.data[0].CODCCIUDAD + "$" + response.data[0].DESCCIUDAD)
        // alert("seteando en fetch "+response.data[0].CODESTADO+"$"+response.data[0].DESCESTADO)
        // setValCodEst(response.data[0].DESCESTADO)
        setEstadoSel(response.data[0].CODESTADO + "$" + response.data[0].DESCESTADO);
        setCiudades(responseCiudades.data)
        setCiudadSel(response.data[0].CODCIUDAD + "$" + response.data[0].DESCCIUDAD);

        setNombreAsesor(response.data[0].CODINTER + "%" + response.data[0].TIPOSUSC);
        setAsesorSelecc(response.data[0].NOMBRE_INTER)
        var telfAsesor = response.data[0].CODAREA_CEL_INTER + response.data[0].CELULAR_INTER;
        setTelfAsesor(telfAsesor);

        setNomApell(response.data[0].NOMBRE);
        setEmailAsegurado(response.data[0].EMAILASEG)
        var telfHabitacion = response.data[0].CODAREA1 + response.data[0].TELEF1;
       // setTelfHabi(telfHabitacion)

        var telfCelular = response.data[0].CODAREA_CEL + response.data[0].CELULAR;
        setTelfCel(telfCelular)

        // setEstadoSel(response.data[0].CODESTADO);

        setDireccHabita(response.data[0].DIRECCION);
        setOpen(false);
        if (response.data[0].DIRECCION == null) {
          setErrorDirecHab(false)
          setLeyendaDirecHab("")
          setDireccHabita("")
        } else {
          if (response.data[0].DIRECCION.length > 1) {
            setErrorDirecHab(false)
            setLeyendaDirecHab("")
          }
        }
        if (response.data[0].NOMBRE) {
          setErrorNomApe(false);
          setLeyendaNomApe("")
        }
        /////////////////////////////////////////////   
        ////////////////api geolocalizador del navegadOr/////////////////////////   
        // var options = {
        //   enableHighAccuracy: true,
        // };

        // function success(pos) {
        //   var crd = pos.coords;
        //   setLatitud(crd.latitude)
        //   setLongitud(crd.longitude)
        //   console.log('Su ubicación actual es:');
        //   console.log('Latitude : ' + crd.latitude);
        //   console.log('Longitude: ' + crd.longitude);
        //   console.log('Aproximadamente ' + crd.accuracy + ' metros.');
        // };

        // function error(err) {
        //   console.warn('ERROR(' + err.code + '): ' + err.message);
        // };
        // await navigator.geolocation.getCurrentPosition(success, error, options)
        /////////////////////////////////////////////
        /////////////////////////////////////////////   
      }
    }

  }
  //79995253422
  const msn = {
    "phone": "+79995253422",
    "body": valor_sms
  }
  const handleChangetipoid = (event) => {
    setTipoid(event.target.value);
  };
  const handleChangetxtCedula = (event) => {
    setTxtCedula(event.target.value);
  };
  const handleChangeNomApell = (event) => {
    setNomApell(event.target.value);
  };
  const handleBlurNomApe = () => {
    if (NomApell.length < 1) {
      setErrorNomApe(true)
      setLeyendaNomApe("Debe ingresar su Nombre y Apellido")
    } else {
      setErrorNomApe(false);
      setLeyendaNomApe("")
    }
  }

  const handleChangeptoRef = (event) => {
    setPtoRef(event.target.value);
  };

  const handleChangeestadoSel = (event) => {
    const estadoSeleccionado = async (e) => {
      setEstadoSel(event.target.value.split("$")[0] + "$" + event.target.value.split("$")[1]);
      // alert("codigo de la ciudad seleccionada: "+event.target.value.split("$"))

      setOpen(true);
      const responseCiudades = await axios.post(`${REACT_APP_URL}/listarCiudades`, {
        "p_codpais": '001',
        "p_codestado": event.target.value.split("$")[0]
      })
      await setValCodEst(event.target.value.split("$")[1])
      // await setEstadoSel(event.target.value.split("$")[0]+"$"+event.target.value.split("$")[1]);
      await setCiudades(responseCiudades.data);
      
      setValCodCiu(responseCiudades.data[0].CODCIUDAD+"$"+responseCiudades.data[0].DESCCIUDAD.toUpperCase())
      setCiudadSel(responseCiudades.data[0].CODCIUDAD+"$"+responseCiudades.data[0].DESCCIUDAD.toUpperCase());

      await setActivaCiudad(false);
      setOpen(false);
    }
    estadoSeleccionado()
  };
  const handleChangeCiudadSel = (e) => {
    // alert(e.target.value.split("$")[0])
    setCiudadSel(e.target.value.split("$")[0] + "$" + e.target.value.split("$")[1]);
    setValCodCiu(e.target.value.split("$")[1]);
  };

  const handleChangeDireccHabi = (event) => {
    setDireccHabita(event.target.value);
  };
  const handleBlurDireccHabi = () => {
    if (direccHabita.length < 1) {
      setErrorDirecHab(true)
      setLeyendaDirecHab("Debe ingresar una dirección de habitación")
    } else {
      setErrorDirecHab(false);
      setLeyendaDirecHab("")
    }
  }

  const enviar = async () => {

    if (!txtCedula || !NomApell || !direccHabita || telfHabi == "(____) ___ ____" || telfCel == "(____) ___ ____") {
      setOpenA(true)
      setMnsAlert("Debe completar los campos requeridos")
    }
    else {
     // console.log("OTRO TELEF CONTACTO>>>>>  "+ telfHabi)
      setOpen(true);
      const insertSolicitud = async () => {
       const {REACT_APP_TOKEN_GEO} = process.env
        const localizacion = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${direccHabita.toLowerCase()} ${estadoSel.split("$")[1]} ${ciudadSel.split("$")[1]} Venezuela&key=${REACT_APP_TOKEN_GEO}`)
        // northeast
        const coords = localizacion.data.results[0].geometry.location

        const nroCI = parseInt(txtCedula);

        const tlfAse1 = telfAsesor.replace('(', '')
        const tlfAse2 = tlfAse1.replace(')', '')
        const tlfAse3 = tlfAse2.replace(/ /g, '')

        const telfCel1 = telfCel.replace('(', '')
        const telfCel2 = telfCel1.replace(')', '')
        const telfCel3 = telfCel2.replace(/ /g, '')

        const telfHabi1 = telfHabi.replace('(', '')
        const telfHabi2 = telfHabi1.replace(')', '')
        const telfHabi3 = telfHabi2.replace(/ /g, '')

        const codInter = nombreAsesor.split("%")

        const valores = {
          cTipoid: tipoid,
          nNumid: nroCI,
          cDvid: "0",
          cNombre: NomApell,
          cCodPais: "001",
          cDescPais: pais,
          cCodEstado: estadoSel.split("$")[0],
          cDescEstado: estadoSel.split("$")[1],
          cCodCiudad: ciudadSel.split("$")[0],
          cDescCiudad: ciudadSel.split("$")[1],
          cDireccion: direccHabita,
          cPuntoReferencia: ptoRef,
          cCelular: telfCel3,
          cTelefHab: telfHabi3,
          cCodArea: "0004",
          cDescArea: "PERSONAS",
          nLongitud: coords.lng ? coords.lng : 0,
          nLatitud: coords.lat ? coords.lat : 0,
          cCodInter: codInter[0],
          cNombreInter: asesorSelecc,
          cIndContAsesor: contAsesor,
          cCelularAsesor: tlfAse3,
          cCodCia: "01",
          cTipoSusc:tipoUsc,
          cEmailAsesor:emailAsesor,
          cEmailAseg:emailAsegurado
        }
        
        // console.log("TIPO ASESOR SELECC>>>>  "+codInter[1])
        //  console.log(JSON.stringify(valores))
        const { REACT_APP_TOKEN_WP } = process.env
        const res = await axios.post(`${REACT_APP_URL}/InsertaSolicitud`, valores);
        arrayTelf.map(telf => {
          const msn = {
            "phone": telf.nro_tef,
            "body": valor_sms
          }
          const res = axios.post(`https://api.chat-api.com/instance238371/sendMessage?token=${REACT_APP_TOKEN_WP}`, msn);
        });
        if(codInter[1] == "I"){
          console.log("ENVIAR A NRO TELF ASESOR>>>>  "+tlfAse3)
          const nroMiguel ="04142433344"
          axios.post(`https://api.chat-api.com/instance238371/sendMessage?token=${REACT_APP_TOKEN_WP}`, {
            "phone": `+58${nroMiguel}`,
            "body": valor_sms
          });
        }
        limpiarCampos(setNomApell, setPtoRef, setDireccHabita, setTelfHabi, setTelfCel, setContAsesor, setTelfAsesor, setNombreAsesor, setEstados, setCiudades,setEmailAsegurado);
        if (res.data.name == "OK") {
          setOpen(false);
          setOpenA(true)
          setMnsAlert("Notificación Enviada exitosamente!")
        } else {
          setOpen(false);
          setOpenA(true)
          setMnsAlert(res.data.name)
          console.log(res.data.name)
        }
      }
      insertSolicitud();

    }
  }
  useEffect(() => {
    valor_sms = `*SEGUROS PIRAMIDE*\n*ATENCION MEDICA DOMICILIARIA*\n*Nro Identificación:*\n${tipoid}-${txtCedula}\n${ptoRef == '' ? (`*Nombre y Apellido Titular:*\n${NomApell}\n*Estado:*\n${estadoSel.split("$")[1]}\n*Ciudad:*\n${ciudadSel.split("$")[1]}\n*Dirección:*\n${direccHabita}\n`) :
      (`*Nombre y Apellido Titular:*\n${NomApell}\n*Estado:*\n${estadoSel.split("$")[1]}\n*Ciudad:*\n${ciudadSel.split("$")[1]}\n*Dirección:*\n${direccHabita}\n*Punto de Referencia:*\n${ptoRef}\n`)}`
    valor_sms += `*Números de Celular:*\n${telfCel}\n*Otro Número de Contacto:*\n${telfHabi}\n`;
    valor_sms += `*Asesor:*\n${asesorSelecc}\n*Número Asesor:*\n${telfAsesor}\n`;

  }, [tipoid, txtCedula, NomApell, direccHabita, ptoRef, telfCel, telfHabi, valCodEst, valCodCiu])

  useEffect(() => {

    const fetchEstados = async () => {
      const response = await axios.post(`${REACT_APP_URL}/listarEstados`, {
        "p_codpais": '001'
      });
      await setEstados(response.data);
      // await setCiudades(responseCiudades.data);

    }
    fetchEstados();


  }, []);

  useEffect(() => {
    // const instalarApp = () => {
    window.onload = (e) => {
      // Declare init HTML elements
      const buttonAdd = document.querySelector('#buttonAdd');

      let deferredPrompt;
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
      });
      if (buttonAdd) {
        // Add event click function for Add button
        buttonAdd.addEventListener('click', (e) => {
          console.log('Aqui');
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice
            .then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
              } else {
                console.log('User dismissed the A2HS prompt');
              }
              deferredPrompt = null;
            });
        });
      }

    }
    // }
  }, [])

  useEffect(() => {
    if (isAndroid) {
      setBtnDownLoad(true);
    }
    if (isIOS) {
      setBtnDownLoad(false);
    }
    if (isDesktop) {
      setBtnDownLoad(true);
    }
    const isInStandaloneMode = () =>
      (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');

    if (isInStandaloneMode()) {
      console.log("webapp is installed")
      setBtnDownLoad(false);
    }
  }, [])

  // useEffect(() => {

  //   var options = {
  //     enableHighAccuracy: true,
  //   };

  //   function success(pos) {
  //     var crd = pos.coords;
  //     setLatitud(crd.latitude)
  //     setLongitud(crd.longitude)
  //     console.log('Su ubicación actual es:');
  //     console.log('Latitude : ' + crd.latitude);
  //     console.log('Longitude: ' + crd.longitude);
  //     console.log('Aproximadamente ' + crd.accuracy + ' metros.');
  //   };

  //   function error(err) {
  //     console.warn('ERROR(' + err.code + '): ' + err.message);
  //   };
  //   navigator.geolocation.getCurrentPosition(success, error, options)

  // }, [])

  // useEffect(() => {
  //   // const instalarApp = () => {
  //     window.onload = (e) => { 
  //       // Declare init HTML elements
  //       const buttonAdd = document.querySelector('#buttonAdd');

  //       let deferredPrompt;

  //       window.addEventListener('beforeinstallprompt', (e) => {
  //         // Prevent Chrome 67 and earlier from automatically showing the prompt
  //         e.preventDefault();
  //         // Stash the event so it can be triggered later.
  //         deferredPrompt = e;
  //       });

  //       // Add event click function for Add button
  //       buttonAdd.addEventListener('click', (e) => {

  //         // Show the prompt
  //         deferredPrompt.prompt();
  //         // Wait for the user to respond to the prompt
  //         deferredPrompt.userChoice
  //           .then((choiceResult) => {
  //             if (choiceResult.outcome === 'accepted') {
  //               console.log('User accepted the A2HS prompt');
  //             } else {
  //               console.log('User dismissed the A2HS prompt');
  //             }
  //             deferredPrompt = null;
  //           });
  //       });
  //       window.addEventListener('appinstalled', () => {
  //         // Hide the app-provided install promotion
  //        // hideInstallPromotion();
  //         // Clear the deferredPrompt so it can be garbage collected
  //         //deferredPrompt = null;
  //         // Optionally, send analytics event to indicate successful install
  //         console.log('PWA was installed');
  //         setShowButton(false)
  //       });

  //     }
  //   // }
  // }, [])

  return (
    <div className={classes.container}>
      <Alert setOpenA={setOpenA} openA={openA} msnAlert={msnAlert} />
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Paper className={classes.paper} elevation={24}>
        <img className={classes.img} src={Logo} />
        <Divider />
        <div style={{ marginTop: '5px' }} className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <ContactMailIcon className='colorIcons' />
            </Grid>
            <Grid item>
              <TextField
                select
                label=""
                value={tipoid}
                name="tipoid"
                onChange={handleChangetipoid}
                helperText=""
                color="primary"
              >
                {Arrtipoid.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <TextField
                onChange={handleChangetxtCedula}
                onBlur={fetcData}
                style={{ width: '200px' }}
                value={txtCedula}
                id="txtCedula" name="txtCedula"
                label="NRO IDENTIFICACION"
                color="primary"
                error={errorCI}
                helperText={leyendaCI}
                type="number"
                autoFocus
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <AccountCircle className='colorIcons' />
            </Grid>

            <Grid item>
              <TextField
                style={{ width: '250px' }}
                id="txtNombres"
                value={NomApell}
                onChange={handleChangeNomApell}
                label="NOMBRES Y APELLIDOS"
                onBlur={handleBlurNomApe}
                color="primary"
                error={errorNomApe}
                helperText={leyendaNomApe}
                disabled="true"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container className={classes.padding} style={{ marginTop: '15px', marginBttom: '10px' }} >
            <Grid xs={1} style={{ marginTop: '17px', marginRight: 5 }} item>
              <PhoneAndroidIcon className='colorIcons' />
            </Grid>

            <Grid xs={3} item>
              <FormControl style={{ marginTop: '5px' }} >
                <label id="celular" style={{ color: 'gray', width: '107px', marginLeft: '-3px', fontSize: '10px',marginBottom:'4px' }} htmlFor="">TELEFONO CELULAR *</label>
                <NumberFormat
                  value={telfCel}
                  onChange={(e) => {
                    setTelfCel(e.target.value)
                  }}
                  format="(####) ### ####"
                  allowEmptyFormatting
                  mask="_"
                  style={{ border: 'none !important', width: 114, border: 'none', marginTop: 5, fontSize: '10px' }}
                />
              </FormControl>
            </Grid>

            <Grid xs={3} item>
              <FormControl style={{ marginTop: '5px', marginLeft: '30px' }} >
                <label id="telfHab" style={{ color: 'gray', width: '150px', marginLeft: '15px', fontSize: '10px',marginBottom:'4px' }} htmlFor="">OTRO TELEFONO CONTACTO *</label>
                <NumberFormat
                  value={telfHabi}
                  onChange={(e) => {
                    const telfHabi1 = e.target.value.replace('(', '')
                    const telfHabi2 = telfHabi1.replace(')', '')
                    const telfHabi3 = telfHabi2.replace(/ /g, '')
                    setTelfHabi(telfHabi3)
                  }}
                  format="(####) ### ####"
                  allowEmptyFormatting
                  mask="_"
                  style={{ border: 'none !important', width: 114, marginLeft: 25, border: 'none', marginTop: 5, fontSize: '10px' }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailIcon  className='colorIcons' />
            </Grid>
            <Grid item>
              <TextField
                value={emailAsegurado}
                onChange={ (event) => {
                  setEmailAsegurado(event.target.value);
                }}
                style={{ width: '250px' }} label="EMAIL"
                color="primary"
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ marginTop: '5px' }} className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <LocationOnIcon className='colorIcons' />
            </Grid>

            <Grid item>
              <TextField
                select
                label="ESTADOS"
                value={estadoSel}
                name="estado"
                onChange={handleChangeestadoSel}
                color="primary"
                style={{ width: '123px', textAlign: 'left' }}
              >
                {estados.map((option, i) => (
                  <MenuItem key={i} value={option.CODESTADO + "$" + option.DESCESTADO.toUpperCase()}>
                    {option.DESCESTADO}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item>
              <TextField
                select
                label="CIUDAD"
                value={ciudadSel}
                name="ciudad"
                onChange={handleChangeCiudadSel}
                helperText=""
                color="primary"
                style={{ width: '123px', textAlign: 'left' }}
                disabled={activaCiudad}
              >
                {ciudades.map((option, i) => (
                  <MenuItem key={i} value={option.CODCIUDAD + "$" + option.DESCCIUDAD.toUpperCase()}>
                    {option.DESCCIUDAD}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <HouseIcon className='colorIcons' />
            </Grid>
            <Grid item>
              <TextField style={{ width: '250px' }}
                id="txtDireccion"
                label="DIRECCION DE EMERGENCIA"
                multiline
                value={direccHabita}
                rowsMax={4}
                name="direccHabi"
                onChange={handleChangeDireccHabi}
                onBlur={handleBlurDireccHabi}
                color="primary"
                error={errorDirecHab}
                helperText={leyendaDirecHab}
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <NotListedLocationIcon className='colorIcons' />
            </Grid>
            <Grid item>
              <TextField
                value={ptoRef}
                onChange={handleChangeptoRef}
                style={{ width: '250px' }} id="txtdirreferencia" label="PUNTO DE REFERENCIA"
                color="primary"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.margin}>
          <Grid container className={classes.padding} spacing={1} alignItems="flex-end">
            <Grid item>
              <Grid item>
                <AccountCircle className='colorIcons' />
              </Grid>
            </Grid>
            <Grid item>



              <TextField
                select
                label="NOMBRE ASESOR"
                value={nombreAsesor}
                name="ciudad"
                onChange={(e) => {

                  const estadoSeleccionado = async () => {
                    // console.log("AAAAAAAAA :::::"+e.target.value.split("%"))
                    const codAsesor = e.target.value.split("%")
                    setNombreAsesor(e.target.value);

                    setOpen(true);
                    const responseTelfAsesor = await axios.post(`${REACT_APP_URL}/BuscarTelefonoAsesor`, {
                      "cCodinter": codAsesor[0]
                    })

                    setTelfAsesor('')
                    await setTipoUsc(codAsesor[1])
                   // console.log("AAAAAAAAA :::::"+codAsesor[1])
                    await setAsesorSelecc(responseTelfAsesor.data[0].NOMBRE_INTER)
                    await setTelfAsesor(responseTelfAsesor.data[0].CELULAR_INTER);
                    setEmailAsesor(responseTelfAsesor.data[0].EMAILASESOR)
                    // console.log(responseTelfAsesor.data[0].EMAILASESOR)
                    setOpen(false);

                  }
                  estadoSeleccionado()

                }}
                helperText=""
                color="primary"
                style={{ width: '250px', textAlign: 'left' }}
              >
                {datosAsegurado.map((option, i) => (
                  <MenuItem style={{ fontSize: '10px', overflow: "auto !important" }} key={i} value={option.CODINTER + "%" + option.TIPOSUSC}>
                    {option.NOMBRE_INTER} ({option.TIPOSUSC =="C" ? ("COLECTIVA"):("INDIVIDUAL")})
                  </MenuItem>
                ))}
              </TextField>

            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container className={classes.padding} style={{ marginTop: '15px' }} >
            <Grid xs={1} style={{ marginTop: '17px', marginRight: 5 }} item>
              <PhoneAndroidIcon className='colorIcons' />
            </Grid>

            <Grid xs={3} item>
              <FormControl style={{ marginTop: '5px' }} >
                <label id="celular" style={{ color: 'gray', width: '260px', marginLeft: '-62px', fontSize: '10px',marginBottom:'4px' }} htmlFor="">TELEFONO CELULAR ASESOR*</label>
                <NumberFormat
                  value={telfAsesor}
                  onChange={(e) => {
                    setTelfAsesor(e.target.value)
                  }}
                  format="(####) ### ####"
                  allowEmptyFormatting
                  mask="_"
                  style={{ border: 'none !important', width: 248, border: 'none', marginTop: 5, fontSize: '10px' }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Divider style={{ marginTop: '20px' }} />
        {/* <label id="celular" style={{ color: 'black', width: '250px', fontSize: '11px', fontWeight: 700 }} htmlFor="">SOLO PARA SER USADO POR EL ASESOR*</label>
        <Divider style={{ marginTop: '5px', backgroundColor: 'gainsboro' }} />
        <div style={{ backgroundColor: 'gainsboro', paddingBottom: 5 }}>
          <label id="celular" style={{ color: 'gray', width: '250px', fontSize: '12px', marginTop: '-5px' }} htmlFor="">¿ Desea ser Contactado por el Operador ?</label>


        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: 10, height: 40 }}>
          <Swicth setContAsesor={setContAsesor} contAsesor={contAsesor} />
        </div>
        <Divider style={{ marginTop: '-10px', backgroundColor: 'gainsboro' }} /> */}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={enviar}
          className={classes.button}
          startIcon={<WhatsAppIcon />}
          id="btnWsp"
          disabled={actBtnWs}
        >
          Notificar
        </Button>
        {btnDownLoad ? (

          <Button
            variant="outlined"
            color="secondary"
            size="small"
            className={classes.buttonInstalar}
            startIcon={<GetAppIcon />}
            id="buttonAdd"
          >
            Instalar App
          </Button>
        ) : (null)}
      </Paper>

    </div>
  )
}

export default App
