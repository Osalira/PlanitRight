// Get references to the input field and button
const inputField = document.getElementById('inputField');
const saveTaskButton = document.getElementById('saveTaskButton');

// Add a click event listener to the button
saveTaskButton.addEventListener('click', () => {
  // Get the input value from the input field
  const titleInputValue = inputField.value;

  // Create a new hidden input element
  const hiddenInput = document.createElement('input');
  hiddenInput.type = 'hidden';
  hiddenInput.name = 'titleListT'; // Use 'titleListT' to match your form's input name
  hiddenInput.value = titleInputValue;

  // Append the hidden input to the button's form
  const buttonForm = document.getElementById('saveTaskandListFormID');
  buttonForm.appendChild(hiddenInput);

  // Submit the form containing the hidden input
  buttonForm.submit();
});

//
// Add this to your existing JavaScript code
document.addEventListener('DOMContentLoaded', function () {
  const editButtons = document.querySelectorAll("[name='editListElement']");

  editButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Assuming you have an input field with class "task-input" and a data-taskid attribute on the button
      const listItem = button.closest('.list-group-item');
      const taskInput = listItem.querySelector('.task-input');
      const newTaskTitle = taskInput.value;
      const taskID = button.getAttribute('data-taskid');
      const listID = button.getAttribute('data-listid');

      // Send the updated task title to the server
      fetch('/updateTaskTitle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listID: listID,
          taskID: taskID,
          newTaskTitle: newTaskTitle,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Assuming the server sends a response
          // You can perform additional actions or updates here if needed
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  });
});
