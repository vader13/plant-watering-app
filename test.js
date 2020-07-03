let plantsDiv = document.getElementById("plants");

let plants = [];

function add() {
  let plant = {
    name: "",
    type: "",
    fertPeriod: 1000 * 60 * 60 * 24 * 30,
    wateringPeriod: 1000 * 60 * 60 * 24 * 5,
    lastWatering: moment().valueOf(),
    lastFert: moment().valueOf()
  };

  let plantBlock = document.createElement("div");
  let nameInput = document.createElement("input");
  let typeInput = document.createElement("input");
  let dateInput = document.createElement("input");
  let fertDateInput = document.createElement("input");
  let saveBtn = document.createElement("button");
  let waterBtn = document.createElement("button");
  let fertBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let nextWateringDate;

  dateInput.setAttribute("type", "date");
  fertDateInput.setAttribute("type", "date");
  nameInput.placeholder = "Name";
  typeInput.placeholder = "Type";
  saveBtn.innerHTML = "Save";
  waterBtn.innerHTML = "water";
  editBtn.innerHTML = "edit";
  fertBtn.innerHTML = "fertilize";

  nameInput.className = "blockStyle";
  typeInput.className = "blockStyle";
  dateInput.className = "blockStyle";
  saveBtn.className = "blockStyle";
  waterBtn.className = "blockStyle";
  editBtn.className = "blockStyle";
  fertBtn.classList = "blockStyle";
  fertDateInput.className = "blockStyle";
  plantsDiv.appendChild(plantBlock);
  plantBlock.className = "card";

  saveBtn.onclick = () => {
    plant.name = nameInput.value;
    plant.type = typeInput.value;
    nameInput.disabled = true;
    typeInput.disabled = true;
    console.log(plant);
    plant.lastWatering = moment(dateInput.value).valueOf();
    plant.lastFert = moment(fertDateInput.value).valueOf();
    computeNextWatering();
    write(plant);
  };

  setInterval(function() {
    computeNextWatering();
    write();
  }, 1000 * 60 * 60 * 24);

  editBtn.onclick = () => {
    nameInput.disabled = false;
    typeInput.disabled = false;
    saveBtn.disabled = false;
  };

  waterBtn.onclick = () => {
    plant.lastWatering = moment().valueOf();
    dateInput.value = moment().valueOf();
    computeNextWatering();
    write();
  };

  fertBtn.onclick = () => {
    plant.lastFert = moment().valueOf();
    fertDateInput.value = moment().valueOf();
    computeNextWatering();
    write();
  };

  plantBlock.appendChild(nameInput);
  plantBlock.appendChild(typeInput);
  plantBlock.appendChild(saveBtn);
  plantBlock.appendChild(waterBtn);
  plantBlock.appendChild(fertBtn);
  plantBlock.appendChild(editBtn);
  plantBlock.appendChild(dateInput);
  plantBlock.appendChild(fertDateInput);

  write(plant);
  plants.push(plant);
}

function write(plant) {
  computeNextWatering(plant);
  let timeToNextWatering;
  let plantElement = document.createElement("div");
  plantElement.className = "blockStyle info";
  plantElement.innerText =
    "Name: " +
    plant.name +
    "\n Type: " +
    plant.type +
    "\n Time to next Watering: " +
    timeToNextWatering +
    "\n time to next fertilizing: " +
    timeToNextFert;
  plantBlock.appendChild(plantElement);
}

function computeNextWatering(plant) {
  nextWateringDate = plant.lastWatering + plant.wateringPeriod;
  timeToNextWatering = moment(nextWateringDate).fromNow();
  nextFertDate = plant.lastFert + plant.fertPeriod;
  timeToNextFert = moment(nextFertDate).fromNow();
  return timeToNextFert;
}

let LOCAL_STORAGE_KEY = "plantsList";

function savePlants() {
  let plantsAsJsonString = JSON.stringify(plants);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, plantsAsJsonString);
}

function loadPlants() {
  let savedplantsAsJsonString = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedplantsAsJsonString !== null) {
    plants = JSON.parse(savedplantsAsJsonString);
  }
}

// On startup, we need to load any saved contacts and render them
loadPlants();

// let plantAsJsonString = JSON.stringify(plants);
// localStorage.setItem("savedPlant", plantAsJsonString);
// // // User refreshes the page...
// let plantString = localStorage.getItem("savedPlant");
// let something = JSON.parse(plantString);
// console.log(something);





//this is the old main.js 

// let plantsDiv = document.getElementById("plants");

// let plants = [
//   {
//     name: "Nemo",
//     type: "Avocdo",
//     fertPeriod: 1000 * 60 * 60 * 24 * 30,
//     wateringPeriod: 1000 * 60 * 60 * 24 * 5,
//     lastWatering: moment().valueOf(),
//     lastFert: moment().valueOf()
//   }
// ];

// for (let plant of plants) {
//   let plantBlock = document.createElement("div");
//   let plantElement = document.createElement("div");
//   let nameInput = document.createElement("input");
//   let typeInput = document.createElement("input");
//   let dateInput = document.createElement("input");
//   let fertDateInput = document.createElement("input");
//   let saveBtn = document.createElement("button");
//   let waterBtn = document.createElement("button");
//   let fertBtn = document.createElement("button");
//   let editBtn = document.createElement("button");
//   let nextWateringDate;
//   let timeToNextWatering;
//   dateInput.setAttribute("type", "date");
//   fertDateInput.setAttribute("type", "date");
//   nameInput.placeholder = "Name";
//   typeInput.placeholder = "Type";
//   saveBtn.innerHTML = "Save";
//   waterBtn.innerHTML = "water";
//   editBtn.innerHTML = "edit";
//   fertBtn.innerHTML = "fertilize";
//   plantElement.className = "blockStyle info";
//   nameInput.className = "blockStyle";
//   typeInput.className = "blockStyle";
//   dateInput.className = "blockStyle";
//   saveBtn.className = "blockStyle";
//   waterBtn.className = "blockStyle";
//   editBtn.className = "blockStyle";
//   fertBtn.classList = "blockStyle";
//   fertDateInput.className = "blockStyle";
//   plantsDiv.appendChild(plantBlock);
//   plantBlock.className = "card";

//   saveBtn.onclick = () => {
//     plant.name = nameInput.value;
//     plant.type = typeInput.value;
//     nameInput.disabled = true;
//     typeInput.disabled = true;
//     console.log(plant);
//     plant.lastWatering = moment(dateInput.value).valueOf();
//     plant.lastFert = moment(fertDateInput.value).valueOf();
//     computeNextWatering();
//     write();
//   };

//   setInterval(function() {
//     computeNextWatering();
//     write();
//   }, 1000 * 60 * 60 * 24);

//   editBtn.onclick = () => {
//     nameInput.disabled = false;
//     typeInput.disabled = false;
//     saveBtn.disabled = false;
//   };

//   function computeNextWatering() {
//     nextWateringDate = plant.lastWatering + plant.wateringPeriod;
//     timeToNextWatering = moment(nextWateringDate).fromNow();
//     nextFertDate = plant.lastFert + plant.fertPeriod;
//     timeToNextFert = moment(nextFertDate).fromNow();
//   }

//   waterBtn.onclick = () => {
//     plant.lastWatering = moment().valueOf();
//     dateInput.value = moment().valueOf();
//     computeNextWatering();
//     write();
//   };

//   fertBtn.onclick = () => {
//     plant.lastFert = moment().valueOf();
//     fertDateInput.value = moment().valueOf();
//     computeNextWatering();
//     write();
//   };

//   function write() {
//     plantElement.innerText =
//       "Name: " +
//       plant.name +
//       "\n Type: " +
//       plant.type +
//       "\n Time to next Watering: " +
//       timeToNextWatering +
//       "\n time to next fertilizing: " +
//       timeToNextFert;
//     plantBlock.appendChild(plantElement);
//   }
//   plantBlock.appendChild(nameInput);
//   plantBlock.appendChild(typeInput);
//   plantBlock.appendChild(saveBtn);
//   plantBlock.appendChild(waterBtn);
//   plantBlock.appendChild(fertBtn);
//   plantBlock.appendChild(editBtn);
//   plantBlock.appendChild(dateInput);
//   plantBlock.appendChild(fertDateInput);
// }
// let plantAsJsonString = JSON.stringify(plants);
// localStorage.setItem("savedPlant", plantAsJsonString);
// // // User refreshes the page...
// let plantString = localStorage.getItem("savedPlant");
// let something = JSON.parse(plantString);
// console.log(something);

