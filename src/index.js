import "./styles.css";

//Set data from the User form to data table:
let addDataButton = document.getElementById("submit-data");
addDataButton.addEventListener("click", () => addData());

function addData() {
  //Get data values from form:
  let username = document.getElementById("input-username").value;
  let email = document.getElementById("input-email").value;
  let address = document.getElementById("input-address").value;
  let isAdmin = document.getElementById("input-admin").checked;
  let imgFile = document.getElementById("input-image").files[0];

  let dataTable = document.getElementById("data-table");

  // Check if existing user:
  let userRowIndex = -1;
  for (let i = 1; i < dataTable.rows.length; i++) {
    if (dataTable.rows[i].cells[0].innerText === username) {
      userRowIndex = i;
      break;
    }
  }

  if (userRowIndex === -1) {
    //Create new data table row:
    let row = dataTable.insertRow(-1);

    //Insert data:
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);

    c1.innerText = username;
    c2.innerText = email;
    c3.innerText = address;

    //Check if added user is admin:
    if (isAdmin) {
      c4.innerText = "X";
    } else {
      c4.innerText = "-";
    }

    //Check if there is img file --> add to cell 5:
    if (imgFile) {
      let img = new Image();
      img.src = URL.createObjectURL(imgFile);
      img.width = 64;
      img.height = 64;
      c5.appendChild(img);
    }
  } else {
    let row = dataTable.rows[userRowIndex];
    row.cells[1].innerText = email;
    row.cells[2].innerText = address;
    row.cells[3].innerText = isAdmin ? "X" : "-";

    //If existing user --> check if he/she has an img --> if yes, remove the old img:
    let pImg = row.cells[4].querySelector("img");
    if (pImg) {
      URL.revokeObjectURL(pImg.src);
      row.cells[4].removeChild(pImg);
    }

    //Add new img
    if (imgFile) {
      let img = new Image();
      img.src = URL.createObjectURL(imgFile);
      img.width = 64;
      img.height = 64;
      row.cells[4].appendChild(img);
    }
  }
}

//Remove table data when pressing button:
let rmDataButton = document.getElementById("empty-table");
rmDataButton.addEventListener("click", () => removeTableData());

function removeTableData() {
  let dataTable = document.getElementById("data-table");
  let rowCount = dataTable.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    console.log("kissa");
    dataTable.deleteRow(i);
  }
}
