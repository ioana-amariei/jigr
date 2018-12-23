const fileInput = document.getElementById('load__image');
let canvas = document.getElementById('canvas');
let reader  = new FileReader();

fileInput.addEventListener('change', changeEventHandler);
reader.addEventListener("load", function () {
    let img = new Image();
    img.addEventListener("load", () => {
        ctx.drawImage(img, 250, 50, canvas.width, canvas.height);
    })
    img.src = reader.result;
    console.log(reader.result);
  }, false);
  
function changeEventHandler(event) {
    if (!event.target.value) {
        alert('Please Select One');
    }
    else {
        ctx = canvas.getContext('2d');

        let imageSource = fileInput.files[0];
        reader.readAsDataURL(imageSource);
    }
}