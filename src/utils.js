export const limpiarCampos = (setNomApell,setPtoRef,setDireccHabita,setTelfHabi,setTelfCel,setContAsesor,setTelfAsesor,setNombreAsesor,setEstados,setCiudades,setEmailAsegurado) => {
  setNomApell('');
  setPtoRef('');
  setDireccHabita('');
  setTelfHabi('');
  setTelfCel('');
  setNombreAsesor('');
  setTelfAsesor('');
  // setEmailAsegurado("");
    // setContAsesor('N')
    //setEstados([])
    //setCiudades([])
  }

  var options = {
    enableHighAccuracy: true,
  };
  
  function success(pos) {
    var crd = pos.coords;
  
    console.log('Su ubicación actual es:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('Aproximadamente ' + crd.accuracy + ' metros.');
    return crd
  };
  
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  
 export const obtenerPosicion = () =>  {
   return navigator.geolocation.getCurrentPosition(success, error, options)
  };