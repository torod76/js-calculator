let darkMode = 0;
const darkModeToggle = document.querySelector(".darkmode-button");

function enableDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", 1);
}

function disableDarkMode() {
    document.body.classList[0] = "";
    localStorage.setItem("darkMode", null); 
}

darkModeToggle.addEventListener("click", function() {
    setDarkMode();
})

function setDarkMode(){
    darkMode = localStorage.getItem("darkMode");
    if (darkMode === 1) {
        disableDarkMode();
    }else {
        enableDarkMode();
    }
}
