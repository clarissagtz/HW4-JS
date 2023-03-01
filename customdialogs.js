  //FOR ALERT BUTTON 
const alertButton = document.getElementById('alertt');
const alertDial = document.getElementById('alertDial')
alertButton.addEventListener('click', () => {
  alertDial.showModal();
});  

//FOR CONFIRM BUTTON 
const showButton = document.getElementById('confirm');
const favDialog = document.getElementById('favDialog');
const outputBox = document.querySelector('output');


showButton.addEventListener('click', () => {
  favDialog.showModal();
});  
favDialog.addEventListener('close', () => {
    outputBox.value = `Confirm result: ${favDialog.returnValue}`;
}); 



  //FOR PROMPT BUTTON 
  const promptButton = document.getElementById('prompt');
  const promptDial = document.getElementById('promptDial');
  const inputField = document.getElementById('fname');
  

  promptButton.addEventListener('click', () => {
    promptDial.showModal();
  }); 

  promptDial.addEventListener('close', insert_result2);
  function insert_result2 (){
    let text;
    let inputFromUser = inputField.value;
    if (inputFromUser == null || inputFromUser == "") {
      text = "Prompt result: User didn't enter anything";
    } else {
      text = `Prompt result: ${inputField.value}`;
    }
    document.getElementById("demo").innerHTML = text;
    }; 
  
