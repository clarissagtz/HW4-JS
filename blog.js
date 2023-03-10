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

//Global variable for the delete option
let indexForDelete = null;

showButton.addEventListener('click', () => {
  favDialog.showModal();
});  


// items array - contains all the posts
let items = JSON.parse(localStorage.getItem("posts-list")) || [];

// function to add item to the items array
function addItem() {
  textInput = document.getElementById("ftitle");
  dateInput = document.getElementById("pdate");
  textarea = document.getElementById("textarea");

  //Sanity check for title only 
  if( textInput.value === "" )return alert("Please enter title");

  //add item to items array
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

// function to add item to the items array after you edit a post 
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
        list= list+=`<li> 
                        <b>Title:</b> ${items[i].value}
                        <b>Date:</b> ${items[i].date}
                        <b>Summary: </b>${items[i].summary}
                        <a href="javascript:void(0)" onclick="editItem(${i})" >Edit</a>                  
                        <a href="javascript:void(0)" onclick="deleteConfirm(${i})" >Delete</a> 
                    </li>
                    <br>`
  }
  document.getElementById('list-items').innerHTML=list;

}


