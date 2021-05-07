const pdf = new jsPDF('p', 'mm', 'letter', false, true)

function onFileSelected(event, imgTxt) {
  console.log(imgTxt)
  const selectedFile = event.target.files[0]   
  const reader = new FileReader()  
  const imgtag = document.getElementById(imgTxt)
  imgtag.title = selectedFile.name
  reader.onload = (evento) => imgtag.src = evento.target.result    
  reader.readAsDataURL(selectedFile)
  document.getElementById(imgTxt).classList.remove("visually-hidden")
}

function createPDFObject(imgData, type, format, compress) {
  var pdf = new jsPDF('p', 'pt', 'a4', false);
  pdf.setFontSize(40);
  pdf.setDrawColor(0);
  pdf.setFillColor(238, 238, 238);
  pdf.rect(0, 0, 595.28,  841.89, 'F');
  pdf.text(35, 100, type);
  pdf.addImage(imgData, format, 100, 200, 280, 210, undefined, compress);
  pdf.save( type + '.pdf')
}