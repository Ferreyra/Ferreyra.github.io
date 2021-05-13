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
  pdf.text(titulo[0].innerText, 60, 46)
  pdf.setFontSize(12)
  const lFecha = document.getElementById('lFecha')
  const txtFecha = document.getElementById('fechaInput')
  let inFecha = txtFecha.value.replace(" de ", "-").replace(" de ", "-")
  inFecha = inFecha.split(' ')
  pdf.text(lFecha.innerText, 368, 48)
  pdf.text(txtFecha.value, 410, 48)
  pdf.rect(58, 64, 494, 70)
  pdf.line(58, 99, 552, 99)
  pdf.line(305, 64, 305, 134) //Mitad de la tabla 305
  pdf.line(100, 64, 100, 134)
  pdf.line(345, 64, 345, 134) //Separador segunda columna
  
  pdf.rect(90, 148, 215, 130)
  pdf.rect(90, 278, 215, 130)
  pdf.rect(90, 408, 215, 130)
  pdf.rect(90, 538, 215, 130)

  pdf.rect(337, 148, 215, 130)
  pdf.rect(337, 278, 215, 130)
  pdf.rect(337, 408, 215, 130)
  pdf.rect(337, 538, 215, 130)

  pdf.rect(95, 682, 216, 62)
  pdf.setFontSize(10)
  pdf.text('Elaboró:', 114, 698)
  pdf.text('Ing. Fernando Monzón Arellano', 125, 730)
  const lEquipo = document.getElementById('lEquipo')
  const txtEquipo = document.getElementById('equipoInput')  
  pdf.text(lEquipo.innerText, 62, 86)
  pdf.text(txtEquipo.value, 104, 86)

  const lModelo = document.getElementById('lModelo')
  // const txtModelo = document.getElementById('modeloSelect').selectedOptions[0].text
  const txtModelo = document.getElementById('modeloInput')
  pdf.text(lModelo.innerText, 62, 120)
  pdf.text(txtModelo.value, 104, 120)

  const lSerie = document.getElementById('lSerie')
  const txtSerie = document.getElementById('serieInput')
  pdf.text(lSerie.innerText, 308, 120)
  pdf.text(txtSerie.value, 350, 120)

  const lMarca = document.getElementById('lMarca')
  // const txtMarca = document.getElementById('marcaSelect').selectedOptions[0].text
  const txtMarca = document.getElementById('marcaInput')
  pdf.text(lMarca.innerText, 308, 86)
  pdf.text(txtMarca.value, 350, 86)

  pdf.setFontSize(9)
  pdf.text('Placa de Identificación', 70, 165, 270)
  pdf.text('Clave CABMS', 318, 165, 270)
  pdf.text('Antes del servicio', 70, 288, 270)
  pdf.text('Antes del servicio', 318, 288, 270)
  pdf.text('Durante el servicio', 70, 418, 270)
  pdf.text('Durante el servicio', 318, 418, 270)
  pdf.text('Después del servicio', 70, 548, 270)
  pdf.text('Después del servicio', 318, 548, 270)

  let i = 1, x = 95, y = 153
  for (const foto of fotos) {
    if ( i % 2 === 0) {
      x = 342      
    } else {
      x = 95
    }
    if ( i > 2 && i < 5) {
      y = 283
    }
    if ( i > 4 && i < 7) {
      y = 413
    }
    if ( i > 6) {
      y = 543
    }
    if (foto.alt !== "") {
      let fotoWidth = 205, xOffset = 0
      if (foto.width < fotoWidth) {
        xOffset = Math.floor((fotoWidth - foto.width) / 2)
        x += xOffset
        fotoWidth = foto.width
      }
      pdf.addImage(foto, 'jpg', x, y, fotoWidth, 120, undefined, 'MEDIUM')
    }    
    i++
  }
  const iframe = document.getElementById('iframePDF')
  iframe.src = pdf.output('datauristring') 
  const ubicacion = document.getElementById('ubicaInput').value
  
  document.getElementById('btnDescargar').addEventListener('click', () => {    
    pdf.save(ubicacion +' '+ txtEquipo.value +' '+ inFecha[1] +'.pdf')
    document.getElementById('offcanvasTop').classList.remove('show')
  })
}
