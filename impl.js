
const agregarFila = () => {
    const tabla = document.getElementById('tablaprueba');
    const id = tabla.rows.length; // El ID será el número de filas actuales
    const nuevaFila = tabla.insertRow(-1);
    nuevaFila.innerHTML = `<td>${id}</td>
                           <td><input type="text" class="form-control" id="latitud${id}" value=""></td>
                           <td><input type="text" class="form-control" id="longitud${id}" value=""></td>
                           <td><input type="text" class="form-control" id="peso${id}" value=""></td>`;
}
  
const eliminarFila = () => {
    const tabla = document.getElementById('tablaprueba');
    if (tabla.rows.length > 2) { // Mantener al menos la fila de encabezado y una fila de datos
        tabla.deleteRow(-1);
    }
}
const generarJSON = () => {
    const tabla = document.getElementById('tablaprueba');
    const filas = tabla.getElementsByTagName('tr');
    const datos = [];

    for (let i = 1; i < filas.length; i++) { // Empezar desde 1 para saltar la fila de encabezado
        const celdas = filas[i].getElementsByTagName('td');
        const latitud = celdas[1].getElementsByTagName('input')[0].value;
        const longitud = celdas[2].getElementsByTagName('input')[0].value;
        const peso = celdas[3].getElementsByTagName('input')[0].value;

        datos.push({
            lat: parseFloat(latitud),
            lng: parseFloat(longitud),
            weight: parseFloat(peso)
        });
    }
    console.log(datos);
    return datos;
}