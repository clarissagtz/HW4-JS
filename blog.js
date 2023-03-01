//Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);
function init(){
  listItems();
}

const saveButton = document.getElementById('saveBut');
saveButton.addEventListener('click', addItem);

//Save for the Edit item Dialog:
const saveChanges = document.getElementById('saveCh');
saveChanges.addEventListener('click', addItem2);


//Dialogs for the Post List page
const showButton = document.getElementById('createPost');
const favDialog = document.getElementById('favDialog');
const editDialog = document.getElementById('editDialog');
const deleteDialog = document.getElementById('deleteDialog');

//Variables to store user input 
let textInput = document.getElementById("ftitle");
let dateInput = document.getElementById("pdate");
let textarea = document.getElementById("textarea");

showButton.addEventListener('click', () => {
  favDialog.showModal();
});  


// items array that contains all todo items
// JSON.parse is used to parse the stringified items from localStorage
// if localStorage is empty, make the items letiable an empty array
let items = JSON.parse(localStorage.getItem("posts-list")) || [];

//Pre-populate the array with 3 posts ( THIS WORKS BUT EVERY TIME I EDIT THE FILE THEY ARE ADDED)
items.push({
    value: "My first post",
    date: "2023-04-12",
    summary: "This is an example of my first post",
  },
  {
    value: "Do my homework",
    date: "2023-04-12",
    summary: "This is an example of a post that reminds me about my homework",
  },
  );

// then convert to a string with JSON.stringify and save to localStorage
//   localStorage.setItem("posts-list", JSON.stringify(items));

// function to add item to the items array
function addItem() {
  textInput = document.getElementById("ftitle");
  dateInput = document.getElementById("pdate");
  textarea = document.getElementById("textarea");

  //Sanity check for title only 
  if( textInput.value === "" )return alert("Please enter title");
  //ISSUE NEED TO FIX I click okay on the alert and it closes the modal 
  
  // If input is valid, add item to items array
  items.push({
    value: textInput.value, 
    date: dateInput.value,
    summary: textarea.value,
  });

  // then convert to a string with JSON.stringify and save to localStorage
  localStorage.setItem("posts-list", JSON.stringify(items));

  // call function to list all items
  listItems();

  // clear input box
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

// function to add item to the items array
function addItem2() {
  textInput = document.getElementById("ftitle2");
  dateInput = document.getElementById("pdate2");
  textarea = document.getElementById("textarea2");

  //Sanity check for title only 
  if( textInput.value === "" )return alert("Please enter title");

  items.push({
    value: textInput.value,
    date: dateInput.value,
    summary: textarea.value,
  });

  // then convert to a string with JSON.stringify and save to localStorage
  localStorage.setItem("posts-list", JSON.stringify(items));

  // call function to list all items
  listItems();

  // clear input box
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
}

let indexForDelete = null;

// function to remove item from array with Array.splice()
// removes item, then saves new items array to localStorage
function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem("posts-list", JSON.stringify(items));
  listItems();
}
//Funciton that shows the dialog of delete confirmation
function deleteConfirm(index){
  deleteDialog.showModal();
  indexForDelete= index;
}

document.getElementById('deletePost').addEventListener('click', ()=>{
  console.log("The index is ", indexForDelete )
  deleteItem(indexForDelete);
})
function editItem(index){
  // console.log("this is index ", index) // index represents the index of the current item
  // console.log(items[index].value)
  let selectedTask = items[index];

  //FOR EDIT MODAL:
  textInput = document.getElementById("ftitle2");
  dateInput = document.getElementById("pdate2");
  textarea = document.getElementById("textarea2");
  editDialog.showModal(); 

  textInput.value = selectedTask.value;
  dateInput.value = selectedTask.date;
  textarea.value = selectedTask.summary;
  
  
  // END OF FOR EDIT MODAL
  deleteItem(index);
}
// function that generates list of items and populates the html
function listItems() {
  let list = "";
  for (let i = 0; i < items.length; i++) {      
      list= list+=`<li> Title: ${items[i].value}
                        Date: ${items[i].date}
                        Summary: ${items[i].summary}
                    <a href="javascript:void(0)" onclick="editItem(${i})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit">Edit</a>                  
                    <a href="javascript:void(0)" onclick="deleteConfirm(${i})" id="pex">Delete</a> 
                    <button onclick="deleteConfirm(${i})">DELETE</button>
                    </li>`
  }
  // document.querySelector("#list-items").innerHTML = list;
  document.getElementById('list-items').innerHTML=list;

}


