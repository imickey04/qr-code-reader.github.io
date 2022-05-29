const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInput = form.querySelector("input"),
infoText = form.querySelector("p")
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");
// let formData; -> Made mistake while declarig the object of the FormData() function on line on. 36

// We'll use QR Server API to read QR code.
function fetchRequest(formData, file) {

    infoText.innerText = "Scanning QR Code, Please Be Like a Monk....";
    // Sending POST request to QR server API with passing form data as body & getting response from it.

    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;

        console.log(result);
        infoText.innerText = result ? "Upload Your QR Code to Scan" : "Couldn't Scan Your QR Code";
        if (!result) return; // Return if file is empty.

        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);

        wrapper.classList.add("active");
    });
}

fileInput.addEventListener("change", e => {
    let file = e.target.files[0]; // Getting User Selected File.

    if (!file) return; // Return if user not select any file.

    let formData = new FormData(); // Creating a new FormData Object.

    formData.append("file", file); // Adding Selected File to FormData.
    fetchRequest(formData, file);
    // console.log(file);
});

copyBtn.addEventListener("click", () => {
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text); // writeText Property writes the specifoed text string to the system clipboard
});

form.addEventListener("click", () => fileInput.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));