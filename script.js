var data; // Variable to store the fetched data

// Fetch the table data and populate the table initially
function fetchTableData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      populateTable(data);
    }
  };
  xhttp.open("GET", "showtable.php", true);
  xhttp.send();
}

// Call fetchTableData() to populate the table initially
fetchTableData();

function populateTable(data) {
  var tableBody = document.getElementById("tableBody");
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += "<tr>";
    html += "<td>" + data[i].id + "</td>";
    html += "<td data-column='firstName'>" + data[i].firstName + "</td>";
    html += "<td data-column='lastName'>" + data[i].lastName + "</td>";
    html += "<td data-column='gender'>" + data[i].gender + "</td>";
    html += "<td data-column='nationality'>" + data[i].nationality + "</td>";
    html += "<td data-column='email'>" + data[i].email + "</td>";
    html += "<td data-column='phonenumber'>" + data[i].phonenumber + "</td>";
    html += "<td data-column='birthdate'>" + data[i].birthdate + "</td>";
    html += "<td data-column='visitortype'>" + data[i].visitortype + "</td>";
    html += "<td><button class='edit-btn' data-id='" + data[i].id + "'>Edit</button> <button onclick='deleteTourist(" + data[i].id + ")'>Delete</button></td>";
    html += "</tr>";
  }
  tableBody.innerHTML = html;

//EDIT
  var editButtons = document.getElementsByClassName("edit-btn");
  for (var j = 0; j < editButtons.length; j++) {
    editButtons[j].addEventListener("click", handleEditButtonClick);
  }
}

function handleEditButtonClick(event) {
  var id = event.target.getAttribute("data-id");

  // NGITAON ANG ROW NA GIN PINDOT
  var row = event.target.parentNode.parentNode;
  var cells = row.getElementsByTagName("td");

  // ENABLE ANG PAG EDIT
  for (var i = 1; i < cells.length - 1; i++) { // EXCLUDE SA PAG EDIT ANG ID KAG ACTION
    var cell = cells[i];
    var currentValue = cell.innerText;
    cell.innerHTML = "<input type='text' value='" + currentValue + "'/>";
  }

  // REPLACE EDIT SA SAVE BUTTON
  var editButton = row.querySelector(".edit-btn");
  editButton.innerHTML = "Save";
  editButton.removeEventListener("click", handleEditButtonClick);
  editButton.addEventListener("click", function () {
    handleSaveButtonClick(id, row);
  });
}

function handleSaveButtonClick(id, row) {
  // NGITAON ANG ROW NA GN EDIT
  var cells = row.getElementsByTagName("td");
  var updatedData = {};

  for (var i = 1; i < cells.length - 1; i++) { // EXCLUSE SA PAG EDIT ANG ID KAG ACTION
    var cell = cells[i];
    var newValue = cell.querySelector("input").value;
    var columnName = cell.getAttribute("data-column");
    updatedData[columnName] = newValue;
    cell.innerHTML = newValue;
  }

  // SEND SNG UPDATED NA INFORMATION
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      alert("Tourist updated successfully");
    } else if (this.readyState == 4 && this.status != 200) {
      alert("An error occurred while updating the tourist");
    }
  };
  xhttp.open("POST", "update.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(
    "id=" + id +
    "&data=" + JSON.stringify(updatedData)
  );

  // REVERT SAVE BUTTON TO SAVE BUTTON
  var saveButton = row.querySelector(".edit-btn");
  saveButton.innerHTML = "Edit";
  saveButton.removeEventListener("click", handleSaveButtonClick);
  saveButton.addEventListener("click", handleEditButtonClick);
}

function deleteTourist(id) {
  var confirmed = confirm("Are you sure you want to delete this tourist?");
  if (confirmed) {
    // DELETE REQUEST SA SERVER
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        alert("Tourist deleted successfully");
        // REFRESH PARA UP TO DATE ANG DATA
        fetchTableData();
      } else if (this.readyState == 4 && this.status != 200) {
        alert("An error occurred while deleting the tourist");
      }
    };
    xhttp.open("POST", "delete.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
  }
}
