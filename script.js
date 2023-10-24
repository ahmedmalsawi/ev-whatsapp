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


 const defaultNumbers = [
    966555216482,
    966503377800,
    966503429976,
    966555258709,
    966543666909,
    966505227500,
    966540744486,
    966505362098,
    966503272850,
    966505324822,
    966553144966,
    966509464503,
    966506494762,
    966552309609,
    966501104224,
    966502220786,
    966567244777,
    966550050242,
    966502020266,
    966555988484,
    966555242465,
    966552142222,
    966505947096,
    966552002015,
    966556477479,
    966555556495,
    966562875628,
    966505457560,
    966503262298,
    966549777808,
    966549924297,
    966554285655,
    966533555028,
    966590019063,
    966562000865,
    966543400090,
    966506000039,
    966506719833,
    966506414298,
    966555238233,
    966551426771,
    966553435000,
    966542360699,
    966543822228,
    966533009840,
    966532771479,
    966544539991,
    966500707348,
    966552977725,
    966560877220,
    966544200088,
    966504464294,
    966504993038,
    966555275569,
    966555441188,
    966556128072,
    966552707044,
    966537792623,
    966504435960,
    966557757407,
    966561147773,
    966503133361,
    966566333733,
    966553218322,
    966505171703,
    966553323383,
    966500451730,
    966555000503,
    966555145306,
    966590011239,
    966503163831,
    966500859274,
    966555741508,
    966502220520,
    966530807099,
    966543900003,
    966505576661,
    966504827975,
    966502239992,
    966504401872,
    966507055552,
    966556453578,
    966503445764,
    966505207570,
    966500012773,
    966504817303,
    966556155665,
    966561066678,
    966532681490,
    966545258428,
    966555485442,
    966533340559,
    966542002020,
    966540998717,
    966590522525,
    966507799961,
    966504107993,
    966504197970,
    966533033371,
    966504809229,
    966505269915,
    966560092230
    
    // Add more numbers as needed
];
// Add the default numbers to the existing array
defaultNumbers.forEach(number => {
    if (!numbers.includes(number)) {
        numbers.push(number);
    }
});


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