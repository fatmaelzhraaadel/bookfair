
window.onload = function() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    const btn = document.getElementById("themeBtn");
    if (btn) btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("closed");
}




function logout(){
  localStorage.removeItem("email");
  window.location.href ="index.html";
}


function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const home = document.querySelector(".home");
    
    sidebar.classList.toggle("closed");
    
    if (sidebar.classList.contains("closed")) {
        home.style.marginLeft = "60px";  
    } else {
        home.style.marginLeft = "200px"; 
    }
}
/**form validation checking */

function checkName (){
  let name = document.getElementById("user").value;
  let msg = document.getElementById("usernameMsg")


  if (name.length <3){
    msg.innerText ="Name too short!";
    msg.style.color = "red";
    
  }
  else {
    msg.innerText ="";
  }
}

function checkPass(){
  let pass = document.getElementById("pass").value;
  let msg = document.getElementById("passMsg");

  if(pass.length < 8){
    msg.innerText = "Password must be at least 8 characters";
    msg.style.color = "red";
  }
  else{
    msg.innerText = "";
  }
}

function checkEmail() {
  let email = document.getElementById("em").value;
  let msg = document.getElementById("emailMsg");

  if (!email.includes ("@")){
    msg.innerText = "Invalid Email,must contain @!";
    msg.style.color ="red";
  }
    else {
    msg.innerText ="";
  }
}


function checkPhone(){
  let phone = document.getElementById("phone").value;
  let msg = document.getElementById("phoneMsg");

  let pattern = /^01[0-9]{9}$/; 

  if(!pattern.test(phone)){
    msg.innerText = "Invalid phone number!";
    msg.style.color = "red";
  }
  else{
    msg.innerText = "";
  }
}






function signin(){
  window.location.href =("sign.html");
}


function signup(){
  window.location.href =("create.html");
}
const form = document.getElementById("signform");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("user").value;
        const email = document.getElementById("em").value;
        const password = document.getElementById("pass").value;

        const isSignUp = document.getElementById("phone") !== null;

        if (isSignUp) {
            const phone = document.getElementById("phone").value;

            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("phone", phone);

            window.location.href = "index.html";
        } else {
            const savedEmail = localStorage.getItem("email");
            const savedPassword = localStorage.getItem("password");

            if (email === savedEmail && password === savedPassword) {
                window.location.href = "index.html";
            } else {
                alert("USER NOT FOUND");
            }
        }
    });
}
/* acc */
const nameElement = document.getElementById("accName");
const emailElement = document.getElementById("accEmail");

if (nameElement && emailElement) {

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    console.log("DATA:", name, email);

    if (name && email) {
        nameElement.innerText = name;
        emailElement.innerText = email;
    } else {

    }
  
  }

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById("themeBtn");

    body.classList.toggle("dark");

    let navbar = document.querySelector(".navbar");
    let sidebar = document.querySelector(".sidebar");

    if (body.classList.contains("dark")) {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("theme", "dark");

        navbar.style.display = "block";
        sidebar.style.display = "none";

    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem("theme", "light");

        navbar.style.display = "none";
        sidebar.style.display = "block";
    }
}


    let navbar = document.querySelector(".navbar");
    navbar.style.display = "none";



//nav theme 
document.addEventListener("DOMContentLoaded", function () {

    let theme = localStorage.getItem("theme") || "light";

    let navbar = document.querySelector(".navbar");
    let sidebar = document.querySelector(".sidebar");

    if (!navbar || !sidebar) return;

    if (theme === "dark") {
        navbar.style.display = "block";
        sidebar.style.display = "none";
    } else {
        navbar.style.display = "none";
        sidebar.style.display = "block";
    }

});

// ---------------books------------


 
let search = document.getElementById("search");

if (search) {
    search.addEventListener("input", function () {

        let value = search.value.toLowerCase();
        let categories = document.querySelectorAll(".category");
        let found = false;

        for (let i = 0; i < categories.length; i++) {

            let cat = categories[i];
            let text = cat.textContent.toLowerCase();
            let books = cat.nextElementSibling;

            if (text.includes(value)) {
                cat.style.display = "block";
                books.style.display = "grid";
                found = true;
            } else {
                cat.style.display = "none";
                books.style.display = "none";
            }
        }

        let msg = document.getElementById("noResults");
        if (msg) {
            msg.style.display = found ? "none" : "block";
        }

    });
}


/****************************************************************************/

document.addEventListener("click", function (e) {
    let card = e.target.closest(".book-card");
    if (!card) return;

    let title = card.querySelector(".title")?.innerText;
    let author = card.querySelector(".author")?.innerText;
    let img = card.querySelector("img")?.getAttribute("src");

    if (!title || !author || !img) return;

    addToLibrary(title, author, img);
});

function addToLibrary(title, author, img) {
    let email = localStorage.getItem("email");

    if (!email) {
        alert("Please login first");
        return;
    }

    let key = "library_" + email;
    let library = JSON.parse(localStorage.getItem(key)) || [];

    let exists = library.some(book => book.title === title);

    if (exists) {
        alert("Already added!");
        return;
    }

    library.push({ title, author, img });

    localStorage.setItem(key, JSON.stringify(library));

    alert("Added successfully ");
}








function displayLibrary() {

    let email = localStorage.getItem("email");
    if (!email) return;

    let key = "library_" + email;

    let library = JSON.parse(localStorage.getItem(key)) || [];

    let container = document.getElementById("library");
    let empty = document.querySelector(".empty");

    if (!container) return;

    container.innerHTML = "";

    if (library.length === 0) {
        empty.style.display = "block";
        return;
    } else {
        empty.style.display = "none";
    }

    library.forEach(book => {

        let div = document.createElement("div");
        div.classList.add("book-card");

   

        div.innerHTML = `
            <img src="${book.img}" style="width:120px; border-radius:10px;">
            <h3 >${book.title}</h3>
            <p class="bookdis" >${book.author}</p>
        `;

        container.appendChild(div);
    });
}

window.addEventListener("load", displayLibrary);



function addToLibrary(title, author, img) {

    let email = localStorage.getItem("email");

    if (!email) {
        alert("Please login first");
        return;
    }

    let key = "library_" + email;

    let library = JSON.parse(localStorage.getItem(key)) || [];

    let exists = library.some(book => book.title === title);

    if (exists) {
        alert("Already added!");
        return;
    }

    let book = {
        title: title,
        author: author,
        img: img
    };

    library.push(book);

    localStorage.setItem(key, JSON.stringify(library));

alert("Book added to Library!");
displayLibrary();
}


function displayLibrary() {

    let email = localStorage.getItem("email");
    let key = "library_" + email;
    
    let library = JSON.parse(localStorage.getItem(key)) || [];

    let container = document.getElementById("library");
    let empty = document.querySelector(".empty");


     if (!container) return;
    container.innerHTML = "";
    
    
    if (library.length === 0) {
        empty.style.display = "block";
        return;
    } else {
        empty.style.display = "none";
    }

    library.forEach(book => {

        

        let div = document.createElement("div");
        div.classList.add("library-card");

        div.innerHTML = `
            <img src="${book.img}" style="width:180px"; padding:20px; margin-top:20px; border-radius:30px;">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <button class="remove-btn" onclick="removeBook('${book.title}')">
                Remove
            </button>
        `;

        container.appendChild(div);
    });
}
function removeBook(title) {

    let email = localStorage.getItem("email");
    let key = "library_" + email;

    let library = JSON.parse(localStorage.getItem(key)) || [];

    // نشيل الكتاب اللي عنوانه نفس اللي اتبعت
    library = library.filter(book => book.title !== title);

    localStorage.setItem(key, JSON.stringify(library));

    displayLibrary(); // refresh
}


/*******************************************location***********************************************/
document.addEventListener("DOMContentLoaded", function () {

    /************* LOCATION *************/
    function changeMap(){
        let branch = document.getElementById("branch").value;
        let map = document.getElementById("map");

        if (!map) return;

        if (branch === "Cairo"){
            map.src = "https://www.google.com/maps?q=Cairo%20International%20Fair&output=embed";
        } else {
            map.src = "https://www.google.com/maps?q=Bibliotheca%20Alexandrina&output=embed";
        }
    }

    // عشان HTML يشوفها
    window.changeMap = changeMap;


    /************* TICKETS *************/
    const ticketInput = document.getElementById("ticktsnum");
    const typeInput   = document.getElementById("type");
    const total       = document.getElementById("total");
    const form        = document.getElementById("ticketForm");

    if (!ticketInput || !typeInput || !total || !form) return;


    function calculatePrice(){
        let tickets = Number(ticketInput.value);
        let price   = Number(typeInput.value);

        if (tickets && price){
            let totalPrice = tickets * price;


            total.innerText = totalPrice; 
        } else {
            total.innerText = 0;
        }
    }

    // events
    ticketInput.addEventListener("input", calculatePrice);
    typeInput.addEventListener("change", calculatePrice);

    // أول تحميل
    calculatePrice();


    form.addEventListener("reset", () => {
        total.innerText = 0;
        document.getElementById("successMsg").innerText = "";
    });

 
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let valid = true;

        let name    = document.getElementById("user").value.trim();
        let email   = document.getElementById("em").value;
        let tickets = Number(ticketInput.value);
        let type    = typeInput.value;

   
        document.querySelectorAll(".error").forEach(e => e.innerText = "");

        if (name === "") {
            document.getElementById("usernameMsg").innerText = "Name is required";
            valid = false;
        }

        if (email === "" || !email.includes("@")) {
            document.getElementById("emailMsg").innerText = "Valid email required";
            valid = false;
        }

        if (!tickets || tickets <= 0) {
            valid = false;
        }

        if (type === "") {
            document.getElementById("typeerror").innerText = "Select ticket type";
            valid = false;
        }

        if (valid) {
            document.getElementById("successMsg").innerText = "Booking Successful ";
        }
    });

});
/****************************************************events**********************************************************/


function filterHall(hallId) {
 
  const allHallSections = document.querySelectorAll(".hall-content");

  
  allHallSections.forEach((section) => {
    section.style.display = "none";
  });

  if (hallId === "all") {
   
    allHallSections.forEach((section) => {
      section.style.display = "block";
    });
  } else {
    
    const targetSection = document.getElementById("section-" + hallId);

    if (targetSection) {
      targetSection.style.display = "block";

      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start", 
        });
      }, 150);
    }
  }
}
function filterHall(hallId) {
  
  const allSections = document.querySelectorAll(".hall-content");

  
  allSections.forEach((section) => {
    section.style.display = "none";
  });

  
  if (hallId === "all") {
    allSections.forEach((section) => {
      section.style.display = "block";
    });
  } else {
    const targetSection = document.getElementById("section-" + hallId);
    if (targetSection) {
      targetSection.style.display = "block";

      
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start", 
        });
      }, 50);
    }
  }
}

function submitReview(event) {
 
  event.preventDefault();

 
  alert("Thank you for your review! Your feedback is valuable to us. :)");

 
  reviewForm.reset();


  if (detailsWrapper) {
    detailsWrapper.removeAttribute("open");
  }
}