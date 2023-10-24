 // Initialize numbers and message from local storage
 let numbers = JSON.parse(localStorage.getItem("numbers")) || [];
 let message = localStorage.getItem("message") || "";

 // Function to add a number to the list
 document.getElementById("addNumber").addEventListener("click", function () {
     const numberInput = document.getElementById("number");
     const number = numberInput.value;

     if (number) {
         numbers.push(number);
         renderNumberList();
         numberInput.value = "";
         saveDataToLocalStorage();
     }
 });

 // Function to render the number list
 function renderNumberList() {
     const numberList = document.getElementById("number-list");
     numberList.innerHTML = "";
     numbers.forEach((number, index) => {
         const listItem = document.createElement("li");
         listItem.className = "list-group-item";
         listItem.innerHTML = `
             ${number}
             <button class="btn btn-danger btn-sm float-right" onclick="deleteNumber(${index})">Delete</button>
             <button class="btn btn-primary btn-sm float-right mr-2" onclick="editNumber(${index})">Edit</button>
         `;
         numberList.appendChild(listItem);
     });
 }

 // Function to delete a number from the list
 function deleteNumber(index) {
     numbers.splice(index, 1);
     renderNumberList();
     saveDataToLocalStorage();
 }

 // Function to edit a number in the list
 function editNumber(index) {
     const newNumber = prompt("Edit the number:", numbers[index]);
     if (newNumber !== null) {
         numbers[index] = newNumber;
         renderNumberList();
         saveDataToLocalStorage();
     }
 }

 // Function to generate WhatsApp link
 document.getElementById("generateLink").addEventListener("click", function () {
     message = document.getElementById("message").value;
     saveDataToLocalStorage();

     if (message && numbers.length > 0) {
         const whatsappLinks = numbers.map(number => {
             return `<a href="https://wa.me/${number}/?text=${encodeURIComponent(message)}">Send to ${number}</a>`;
         });
         document.getElementById("number-list").innerHTML = whatsappLinks.join("<br>");
     }
 });

 // Function to save data to local storage
 function saveDataToLocalStorage() {
     localStorage.setItem("numbers", JSON.stringify(numbers));
     localStorage.setItem("message", message);
}
function openWhatsAppLinks(links) {
    for (let link of links) {
        window.open(link, "_blank");
    }
}

// Function to send messages to all selected numbers
document.getElementById("sendToAll").addEventListener("click", function () {
    const message = document.getElementById("message").value;
    if (message && numbers.length > 0) {
        const whatsappLinks = numbers.map(number => {
            return `https://wa.me/${number}/?text=${encodeURIComponent(message)}`;
        });
        openWhatsAppLinks(whatsappLinks);
    }
});

 // Initial rendering
 renderNumberList();
 document.getElementById("message").value = message;