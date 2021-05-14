var pdf

function leerDatos() {
  let fecha = new Date(Date.now())
  document.getElementById('fechaInput').value = fecha.toLocaleDateString('es-MX', { weekday:'long', day:'numeric', month:'long', year:'numeric'})
  pdf = new jsPDF('p', 'pt', 'letter', false, true)
}

function onFileSelected(event, imgTxt) {
  const selectedFile = event.target.files[0]   
  const reader = new FileReader()  
  const imgtag = document.getElementById(imgTxt)
  imgtag.alt = selectedFile.name
  reader.onload = (evento) => imgtag.src = evento.target.result    
  reader.readAsDataURL(selectedFile)
  document.getElementById(imgTxt).classList.remove("visually-hidden")
}

function createPDF(event) { 
  event.preventDefault()
  // const pdf = new jsPDF('p', 'pt', 'letter', false, true)
  const fotos = document.getElementsByTagName('img')
  // impresión recuadros de tabla y textos
  const titulo = document.getElementsByTagName('h3')
  pdf.setFontSize(18)
  pdf.text(titulo[0].innerText, 58, 84)
  pdf.setFontSize(12)
  const lFecha = document.getElementById('lFecha')
  const txtFecha = document.getElementById('fechaInput')
  let inFecha = txtFecha.value.replace(" de ", "-").replace(" de ", "-")
  inFecha = inFecha.split(' ')
  if (inFecha[1] === undefined) {
    inFecha = inFecha[0]
  } else {
    inFecha = inFecha[1]
  }  
  pdf.text(lFecha.innerText, 368, 86)
  pdf.text(txtFecha.value, 410, 86)
  pdf.rect(58, 94, 494, 66)     //58, 64, 494, 66
  pdf.line(58, 127, 552, 127)   //58, 99, 552, 99
  pdf.line(305, 94, 305, 160)   //305, 64, 305, 134  Mitad de la tabla 305
  pdf.line(100, 94, 100, 160)   //100, 64, 100, 134
  pdf.line(345, 94, 345, 160)   //345, 64, 345, 134  Separador segunda columna
  
  pdf.rect(90, 164, 215, 129)
  pdf.rect(90, 293, 215, 129)
  pdf.rect(90, 422, 215, 129)
  pdf.rect(90, 551, 215, 129)

  pdf.rect(337, 164, 215, 129)
  pdf.rect(337, 293, 215, 129)
  pdf.rect(337, 422, 215, 129)
  pdf.rect(337, 551, 215, 129) //538

  pdf.rect(95, 688, 216, 59)
  pdf.setFontSize(10)
  pdf.text('Elaboró:', 110, 702)
  pdf.text('Ing. Fernando Monzón Arellano', 125, 733)
  const lEquipo = document.getElementById('lEquipo')
  const txtEquipo = document.getElementById('equipoInput')  
  pdf.text(lEquipo.innerText, 62, 114)
  pdf.text(txtEquipo.value, 104, 114)

  const lModelo = document.getElementById('lModelo')
  // const txtModelo = document.getElementById('modeloSelect').selectedOptions[0].text
  const txtModelo = document.getElementById('modeloInput')
  pdf.text(lModelo.innerText, 62, 147)
  pdf.text(txtModelo.value, 104, 147)

  const lSerie = document.getElementById('lSerie')
  const txtSerie = document.getElementById('serieInput')
  pdf.text(lSerie.innerText, 308, 147)
  pdf.text(txtSerie.value, 350, 147)

  const lMarca = document.getElementById('lMarca')
  // const txtMarca = document.getElementById('marcaSelect').selectedOptions[0].text
  const txtMarca = document.getElementById('marcaInput')
  pdf.text(lMarca.innerText, 308, 114)
  pdf.text(txtMarca.value, 350, 114)

  pdf.setFontSize(9)
  pdf.text('Placa de Identificación', 70, 170, 270)
  pdf.text('Clave CABMS', 318, 170, 270)
  pdf.text('Antes del servicio', 70, 298, 270)
  pdf.text('Antes del servicio', 318, 298, 270)
  pdf.text('Durante el servicio', 70, 427, 270)
  pdf.text('Durante el servicio', 318, 427, 270)
  pdf.text('Después del servicio', 70, 557, 270)
  pdf.text('Después del servicio', 318, 557, 270)

  let i = 1, x = 93, y = 168
  for (const foto of fotos) {
    if ( i % 2 === 0) {
      x = 340      
    } else {
      x = 93
    }
    if ( i > 2 && i < 5) {
      y = 296
    }
    if ( i > 4 && i < 7) {
      y = 425
    }
    if ( i > 6) {
      y = 554
    }
    if (foto.alt !== "") {
      let fotoWidth = 209, xOffset = 0 //, r = 1.71
      console.log(foto.width/foto.height)
      if (foto.width < fotoWidth) {
        xOffset = Math.floor((fotoWidth - foto.width) / 2)
        x += xOffset
        fotoWidth = foto.width
      }
      pdf.addImage(foto, 'jpg', x, y, fotoWidth, 123, undefined, 'MEDIUM')
    }    
    i++
  }
  const iframe = document.getElementById('iframePDF')
  iframe.src = pdf.output('datauristring') 
  const ubicacion = document.getElementById('ubicaInput').value  
  document.getElementById('btnDescargar').addEventListener('click', () => {    
    pdf.save(ubicacion +' '+ txtEquipo.value +' '+ inFecha +'.pdf')
    document.getElementById('offcanvasTop').classList.remove('show')
    window.location.reload()
  })
}
