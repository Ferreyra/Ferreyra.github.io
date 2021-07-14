// var url = window.location.href;
// var swLocation = '/reportes/sw.js';
const { jsPDF } = window.jspdf;
const datosJson = {}
var Android = false, iOS = false, pdfGenerado = false, local = true
var pdf

var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/drive';
function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
  }

function initClient() {
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  var idaw = documet.getElementById('gpcid').value + ".apps.googleusercontent.com"
  gapi.client.init({
      'clientId': idaw,
      'discoveryDocs': [discoveryUrl],
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();

    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    $('#sign-in-or-out-button').click(function() {
      handleAuthClick();
    });
    $('#revoke-access-button').click(function() {
      revokeAccess();
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked "Sign out" button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus() {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    $('#sign-in-or-out-button').html('Sign out');
    $('#revoke-access-button').css('display', 'inline-block');
    $('#auth-status').html('You are currently signed in and have granted ' +
        'access to this app.');
  } else {
    $('#sign-in-or-out-button').html('Sign In/Authorize');
    $('#revoke-access-button').css('display', 'none');
    $('#auth-status').html('You have not authorized this app or you are ' +
        'signed out.');
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

/* if ( navigator.serviceWorker ) {
  if ( url.includes('localhost') ) {
    swLocation = '/sw.js';
  }
  navigator.serviceWorker.register( swLocation );
} */

function conectado() {
  if (navigator.onLine) {
    local = false
  } else {
    local = true
  }
}
window.addEventListener('online', conectado)
window.addEventListener('offline', conectado)

function formatoPDF() {
  // impresión recuadros de tabla
  pdf.setFontSize(18)
  const titulo = document.getElementById('titulo')
  pdf.text(titulo.children[0].innerText, 58, 84)
  pdf.rect(58, 94, 494, 66)     
  pdf.line(58, 127, 552, 127)   
  pdf.line(305, 94, 305, 160)   // Mitad de la tabla 305
  pdf.line(100, 94, 100, 160)   
  pdf.line(345, 94, 345, 160)   // Separador segunda columna  
  pdf.rect(90, 164, 215, 129)
  pdf.rect(90, 293, 215, 129)
  pdf.rect(90, 422, 215, 129)
  pdf.rect(90, 551, 215, 129)
  pdf.rect(337, 164, 215, 129)
  pdf.rect(337, 293, 215, 129)
  pdf.rect(337, 422, 215, 129)
  pdf.rect(337, 551, 215, 129)
  pdf.rect(95, 688, 216, 59)
  pdf.setFontSize(9)
  pdf.text('Placa de Identificación', 70, 170, 270)
  pdf.text('Clave CABMS', 318, 170, 270)
  pdf.text('Antes del servicio', 70, 298, 270)
  pdf.text('Antes del servicio', 318, 298, 270)
  pdf.text('Durante el servicio', 70, 427, 270)
  pdf.text('Durante el servicio', 318, 427, 270)
  pdf.text('Después del servicio', 70, 557, 270)
  pdf.text('Después del servicio', 318, 557, 270)
}

function leerDatos() {
  conectado()
  let fecha = new Date(Date.now())
  document.getElementById('fechaInput').value = fecha.toLocaleDateString('es-MX', { weekday:'long', day:'numeric', month:'long', year:'numeric'})
  pdf = new jsPDF('p', 'pt', 'letter', false, true)
  formatoPDF()
}

function confirmarPDF() {
  if (confirm('¿Reporte generado correctamente?')) {
    document.querySelector('form').reset()
    limpiarImgs()
  } else {
    pdf = new jsPDF('p', 'pt', 'letter', false, true)
    formatoPDF()
  }
}

function limpiarImgs() {
  const imagenes = document.querySelectorAll('img')
  imagenes.forEach(imagen => {
    imagen.removeAttribute('alt')
    imagen.removeAttribute('src')
    imagen.classList.add("visually-hidden")
  });
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

function plataforma() {
  const userAgent = (typeof navigator !== "undefined" && navigator.userAgent) || ""; 
  const platform = (typeof navigator !== "undefined" && navigator.platform) || ""; 
  const maxTouchPoints = (typeof navigator !== "undefined" && navigator.maxTouchPoints) || 1; 
  const isAndroid = /Android/.test(userAgent);
  const isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
  if (isAndroid) {
    Android = true
  }
  if (isIOS) {
    iOS = true
  }
}

function createPDF(event) { 
  event.preventDefault()
  // impresión textos
  pdf.setFontSize(18)
  const mantPoC = document.getElementById('correctivo').selectedOptions[0].text
  pdf.text(mantPoC, 248, 84)
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
  datosJson["Fecha"] = inFecha
  pdf.text(lFecha.innerText, 368, 86)
  pdf.text(txtFecha.value, 410, 86)

  pdf.setFontSize(10)
  pdf.text('Elaboró:', 110, 702)
  pdf.text('Ing. Fernando Monzón Arellano', 125, 733)
  const lEquipo = document.getElementById('lEquipo')
  const txtEquipo = document.getElementById('equipoInput')
  datosJson["Equipo"] = txtEquipo.value
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

  const fotos = document.getElementsByTagName('img')
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
      let fotoWidth = 209, xOffset = 0
      if (foto.width < fotoWidth) {
        xOffset = Math.floor((fotoWidth - foto.width) / 2)
        x += xOffset
        fotoWidth = foto.width
      }
      pdf.addImage(foto, 'jpg', x, y, fotoWidth, 123, undefined, 'MEDIUM')
      // console.log(foto.getAttribute('src'))
    }    
    i++
  }
  const ubicacion = document.getElementById('ubicaInput').value
  let pdfName = ubicacion +' '+ txtEquipo.value +' '+ inFecha +'.pdf'
  plataforma()
  pdfGenerado = true
  // console.log(datosJson)
  if (local) {
    // Definir indice para guardar varios reportes de forma local para despues mandarlos al drive
    localStorage.setItem("reporte", JSON.stringify(datosJson));   
  }
  if (iOS) {
    const pdfPromesa = pdf.save(pdfName, {returnPromise: true});
    pdfPromesa.then(confirmarPDF())  
  } else {
    // const pdfTab = pdf.output('bloburl', {filename: pdfName})
    const pdfTab = pdf.output('save', {filename: pdfName, returnPromise: true})
    pdfTab.then(confirmarPDF())
    // window.open(pdfTab, pdfName)
  }
}

/* window.addEventListener('visibilitychange', ()=> {
  if (document.visibilityState === 'hidden' && pdfGenerado) {
    pdfGenerado = false
    confirmarPDF()
  }
}) */

/**
       *  On load, called to load the auth2 library and API client library.
       */
 function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listFiles();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print files.
 */
function listFiles() {
  gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': "nextPageToken, files(id, name)"
  }).then(function(response) {
    appendPre('Files:');
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        appendPre(file.name + ' (' + file.id + ')');
      }
    } else {
      appendPre('No files found.');
    }
  });
}
