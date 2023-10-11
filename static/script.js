// UI ELEMENTS
const modal = document.getElementById("userName");
const userNameInput = document.getElementById("name");
const continueBtn = document.getElementById("continue");
const userNameElement = document.getElementById("userNameDisplay");
const searchInput = document.getElementById("searchNote");
const searchBtn = document.getElementById("search");
const addInput = document.getElementById("addNote");
const addBtn = document.getElementById("add");

// GLOBAL VARIABLES
let userName = localStorage.getItem("userName")
  ? localStorage.getItem("userName")
  : "";

// CHECK FOR USERNAME
function handleUserName() {
  if (userName == "") {
    modal.style.display = "flex";
  } else if (userName != "") {
    userNameElement.innerHTML = `
    Welcome Back, <span id="userNameDisplay" class="text-red">${userName.toUpperCase()}!</span>
    `;
  }
}

// MODAL DISPLAY
function handleUserNameModal() {
  if (userNameInput.value.trim() == "") {
    alert("Please enter a valid name!");
  } else {
    userName = userNameInput.value.trim();
    localStorage.setItem("userName", userName);
    userNameElement.innerHTML = `
    Welcome, <span id="userNameDisplay" class="text-red">${userName.toUpperCase()}!</span>
    `;
    modal.style.display = "none";
  }
}

// HANDLE SEARCH INPUT VALUE
function handleSearchNotes(e) {
  if (searchInput.value.trim() == "") {
    e.preventDefault();
    alert("Please enter a valid value to search!");
  }
}

// HANDLE ADD INPUT VALUE
function handleAddNote(e) {
  if (addInput.value.trim() == "") {
    e.preventDefault();
    alert("Please enter a valid value to Add!");
  }
}

// EVENT LISTENERS & FUNCTIONS CALLS
handleUserName();
continueBtn.addEventListener("click", handleUserNameModal);
searchBtn.addEventListener("click", handleSearchNotes);
addBtn.addEventListener("click", handleAddNote);
