//// google.charts.load('current', {'packages':['corechart']});
////      google.charts.setOnLoadCallback(drawStuff);




 
  function drawStuff() {
      
       var seleccionlimite=document.getElementById('ob_cantidad');
     
         if (seleccionlimite.selectedIndex==0){
              limites=100
         }
          if (seleccionlimite.selectedIndex==1){
              limites=500
         }        
      
        moneda=document.getElementById("DropDownList1").value
        //document.getElementById('stock').innerHTML=moneda
 
    let endpoint = `https://fapi.binance.com/fapi/v1/depth?symbol=${moneda}&limit=${limites}`
// esta linea se ejectuta cada 4 segundos segun el tiemer de esta pagina
    fetch(endpoint)
    .then( respuesta => respuesta.json() )
    .then( datos =>{
    
        var nuevodatos = datos["bids"] // SOPORTES
        var nuevodatosRESISTENCIA = datos["asks"] // RESISTENCIAS
 
       datocompuesto=[]
       datocompuestoRESISTENCIA=[]
       datocompuesto_pastel_soporte=[]
       datocompuesto_pastel_resistencia=[]

       maximoSOPORTE = 0
       maximoRESISTENCIA = 0
       maximoTOTAL = 0
       var Total_sumado_soporte = 0
       var Total_sumado_resistencia = 0
       
        for (i = 0; i < nuevodatos.length; i++) {
           numerocero = parseFloat(nuevodatos[i][0])
           numerouno = parseFloat(nuevodatos[i][1])
           Total_sumado_soporte=Total_sumado_soporte+numerouno
           numerocero_pastel_soporte=numerocero.toString()
          datocompuesto.push([numerocero,numerouno])
          datocompuesto_pastel_soporte.push([numerocero_pastel_soporte,numerouno])
          if (numerouno > maximoSOPORTE){maximoSOPORTE=numerouno }
        } 
        
        for (i = 0; i < nuevodatosRESISTENCIA.length; i++) {
           numerocero = parseFloat(nuevodatosRESISTENCIA[i][0])
           numerouno = parseFloat(nuevodatosRESISTENCIA[i][1])
           Total_sumado_resistencia=Total_sumado_resistencia+numerouno
           numerocero_pastel_resistencia=numerocero.toString()
           datocompuestoRESISTENCIA.push([numerocero,numerouno])
           datocompuesto_pastel_resistencia.push([numerocero_pastel_resistencia,numerouno])
           if (numerouno > maximoRESISTENCIA){maximoRESISTENCIA=numerouno }
        }         

        maximoTOTAL=maximoRESISTENCIA
        if (maximoSOPORTE > maximoRESISTENCIA){maximoTOTAL=maximoSOPORTE }
// Math.max(nuevovalorcadena)

//document.getElementById('stock').innerHTML=maximoTOTAL //maximoSOPORTE + '  max resistencia ' + maximoRESISTENCIA


//////////////////////////////////////////////////////////////////////////
var data_pastel_resistencia = new google.visualization.DataTable();
data_pastel_resistencia.addColumn('string', 'Precio');
data_pastel_resistencia.addColumn('number', 'Resistencias');
data_pastel_resistencia.addRows(datocompuesto_pastel_resistencia)


 var data_pastel_soporte = new google.visualization.DataTable();
 data_pastel_soporte.addColumn('string', 'Precio');
 data_pastel_soporte.addColumn('number', 'Resistencias');
 data_pastel_soporte.addRows(datocompuesto_pastel_soporte)


     var dataRESISTENCIA = new google.visualization.DataTable();
     dataRESISTENCIA.addColumn('number', 'Precio');
     dataRESISTENCIA.addColumn('number', 'Resistencia');   
     dataRESISTENCIA.addRows(datocompuestoRESISTENCIA)

//   


     var data = new google.visualization.DataTable();
     data.addColumn('number', 'Precio');
     data.addColumn('number', 'Soporte');
    
     data.addRows(datocompuesto)
     var porcentaje = '90%'
     var top_pasteles = 10
     var left_graficas = 50

        var options = {
          chartArea:{left:left_graficas,top:10,width:porcentaje,height:porcentaje},
         bars:{groupWidth:50},
         backgroundColor:"white",
         hAxis:{direction:'1',title: moneda+" Precio"},
         vAxis:{title:"Magnitud",textPosition:'out',maxValue:maximoTOTAL},    // format:'decimal' textPosition:'in' 'out' 'none' '-1' out de mayor a menor  ,viewWindowMode:explicit pretty  maximized
         colors:['green'],
         legend: { position: 'none' },
         axisTitlesPosition:'none'
        };
        
         var optionsRESISTENCIA = {
          chartArea:{left:left_graficas,top:10,width:porcentaje,height:porcentaje},
         bars:{groupWidth:50},
         backgroundColor:"white",
         hAxis:{direction:'1',title: moneda+" Precio"},
         vAxis:{title:"Magnitud",textPosition:'out',maxValue:maximoTOTAL},    // maxValue:  textPosition:'in' 'out' 'none' '-1' out de mayor a menor  ,viewWindowMode:explicit pretty  maximized
         colors:['red'],
         legend: { position: 'none' },
         axisTitlesPosition:'none'
        };

        var options_pastel_soporte = {
         // original: bars: 'horizontal', // Required for Material Bar Charts. hAxis.direction  vAxis: {title: "Year"}, isStacked: true
         chartArea:{left:1,top:top_pasteles,width:porcentaje,height:porcentaje},
         bars:{groupWidth:50},
         backgroundColor:"white",
         hAxis:{direction:'1',title: moneda+" Precio"},
         vAxis:{title:"Magnitud"},    // '-1' de mayor a menor  ,viewWindowMode:explicit pretty  maximized
         'legend':'labeled',
         //is3D: true,
         sliceVisibilityThreshold: .04
        };
        
        //maximumtotal  ,maxValue: maximumtotal
         // todas funcionan, para 500 se ve mejor areachart, y scatechart(puntos) es la mas estable. BarChart es el igual al dorotee
     var selecciongrafica=document.getElementById('tipo_de_grafica_ob');
     
         if (selecciongrafica.selectedIndex==0){
           var chart = new google.visualization.ScatterChart(document.getElementById('top_x_div'));
           var chart_resistencia = new google.visualization.ScatterChart(document.getElementById('resistencias'));
         }
          if (selecciongrafica.selectedIndex==1){
           var chart = new google.visualization.AreaChart(document.getElementById('top_x_div'));
           var chart_resistencia = new google.visualization.AreaChart(document.getElementById('resistencias'));
         }          
        
          if (selecciongrafica.selectedIndex==2){
           var chart = new google.visualization.ComboChart(document.getElementById('top_x_div'));
           var chart_resistencia = new google.visualization.ComboChart(document.getElementById('resistencias'));
         }
        
          if (selecciongrafica.selectedIndex==3){
           var chart = new google.visualization.ColumnChart(document.getElementById('top_x_div'));
           var chart_resistencia = new google.visualization.ColumnChart(document.getElementById('resistencias'));
         }         
     // var chart = new google.visualization.ComboChart(document.getElementById('top_x_div')); // lineas que se unen
     // var chart = new google.visualization.ScatterChart(document.getElementById('top_x_div'));
    //var chart = new google.visualization.AreaChart(document.getElementById('top_x_div'));
   
    var chart_pastel_soporte = new google.visualization.PieChart(document.getElementById('soporte_pastel'))

    var chart_pastel_resistencia = new google.visualization.PieChart(document.getElementById('resistencia_pastel'))

   
    
        chart.draw(data, options)
        chart_resistencia.draw(dataRESISTENCIA, optionsRESISTENCIA)
        chart_pastel_soporte.draw(data_pastel_soporte, options_pastel_soporte) 
        chart_pastel_resistencia.draw(data_pastel_resistencia, options_pastel_soporte)
        
        
          var data_ob = google.visualization.arrayToDataTable([
          ['Soporte', 'Resistencia'],
          ['Soporte OB /', Total_sumado_soporte],
          ['Resistencia OB', Total_sumado_resistencia]
        ]);

        var options_ob = {
        //is3D: true,
        chartArea:{left:1,top:1,width:'100%',height:'100%'},
            pieHole: 0.2,
           // is3D: true,
          
          pieStartAngle: 90,
          tooltip: { trigger: 'none' },
          
          slices: {
            0: { color: 'green' },
            1: { color: 'red' }
          }
        };

        var chartob = new google.visualization.PieChart(document.getElementById('balance_ob'));
        chartob.draw(data_ob, options_ob);
        
      })
      };


function activar_order_book(){
document.getElementById('Mensaje_de_prueba_dos').innerHTML=Date.now()
    google.charts.setOnLoadCallback(drawStuff)

}




//setInterval(function(){   
//document.getElementById('Mensaje_de_prueba_dos').innerHTML=Date.now()  
//    if (document.getElementById('optimizar_velocidad').checked){
//    google.charts.setOnLoadCallback(drawStuff)
//}
//else{
////google.charts.setOnLoadCallback(drawStuff);
////}
//}
//},5000)

/////// quito el setinterval par reemplazarlo por otro temporizador ///(((((
////setInterval(function(){     
////    if (document.getElementById('optimizar_velocidad').checked){
////}
////else{
////google.charts.setOnLoadCallback(drawStuff);
////}
////},5000)
///////////////////////////////////////////////////////)))))))))))))))))))))
      


