//Extract the  html elements
const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

//When we submit the form
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  //Extract the url and size from inputs
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") alert("Please enter a URL");
  else {
    showSpinner(); //Show the spinner

    setTimeout(() => {
      hideSpinner(); //Hide the spinner
      //Generate the QR Code after hiding the spinner
      generateQRCode(url, size);

      //Why insideTimeout?? -> First let the QR Code generate then call the fn
      setTimeout(() => {
        //Extract the image url of QR Code
        const saveUrl = qr.querySelector("img").src;
        //Call the create link method
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    correctLevel: QRCode.CorrectLevel.H,
  });
};

//Setting the style of spinner(Show/Hide)
const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

//Clear out the previously generated QR Code and Button
const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
};

//Creates a Link to download the QR Code Image
const createSaveBtn = (saveUrl) => {
  //It receives the image URL of the QR Code
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

form.addEventListener("submit", onGenerateSubmit);
