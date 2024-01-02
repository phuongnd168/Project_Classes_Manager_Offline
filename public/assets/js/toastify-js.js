const errorToast = document.getElementById("error-toast");
const successToast = document.getElementById("success-toast");
if (errorToast?.innerText) {
  Toastify({
    text: errorToast.innerText,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "rgba(217, 92, 92, 0.95)",
    },
  }).showToast();
}
if (successToast?.innerText) {
  Toastify({
    text: successToast.innerText,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "rgb(0, 153, 51)",
    },
  }).showToast();
}
