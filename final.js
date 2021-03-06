let plantsDiv = document.getElementById("plants");

let plants = [];

function handleAddPlantClick() {
  let plant = {
    name: "",
    type: "",
    fertPeriod: 1000 * 60 * 60 * 24 * 30,
    wateringPeriod: 1000 * 60 * 60 * 24 * 5,
    lastWatering: moment().valueOf(),
    lastFert: moment().valueOf()
  };

  render(plant);
  plants.push(plant);
}

function render(plant) {
  let plantBlock = document.createElement("div");
  let nameInput = document.createElement("input");
  let typeInput = document.createElement("input");
  let saveBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let dateInput = document.createElement("input");
  let waterBtn = document.createElement("button");
  let fertDateInput = document.createElement("input");
  let fertBtn = document.createElement("button");
  fertDateInput.setAttribute("type", "date");
  fertBtn.innerHTML = "fertilize";
  saveBtn.innerHTML = "Save";
  editBtn.innerHTML = "edit";

  let nextWateringDate;
  let timeToNextWatering;
  waterBtn.innerHTML = "water";
  dateInput.setAttribute("type", "date");
  nameInput.placeholder = "Name";
  typeInput.placeholder = "Type";
  plantBlock.className = "card";
  waterBtn.innerHTML = "water";
  nameInput.className = "blockStyle";
  typeInput.className = "blockStyle";
  dateInput.className = "blockStyle";
  saveBtn.className = "blockStyle";
  waterBtn.className = "blockStyle";
  editBtn.className = "blockStyle";
  fertBtn.classList = "blockStyle";
  fertDateInput.className = "blockStyle";

  plantBlock.appendChild(nameInput);
  plantBlock.appendChild(typeInput);
  plantBlock.appendChild(dateInput);
  plantBlock.appendChild(waterBtn);
  plantBlock.appendChild(fertDateInput);
  plantBlock.appendChild(fertBtn);

  plantBlock.appendChild(saveBtn);
  plantBlock.appendChild(editBtn);
  plantsDiv.appendChild(plantBlock);
  saveBtn.onclick = () => save();

  let plantElement = document.createElement("div");
  plantElement.className = "blockStyle info";
  function save() {
    plant.name = nameInput.value;
    plant.type = typeInput.value;

    plant.lastWatering = moment(dateInput.value).valueOf();
    plant.lastFert = moment(fertDateInput.value).valueOf();
    computeNextWatering();
    savePlants();
    write();

    nameInput.disabled = true;
    typeInput.disabled = true;
  }

  editBtn.onclick = () => {
    nameInput.disabled = false;
    typeInput.disabled = false;
    saveBtn.disabled = false;
  };

  function computeNextWatering() {
    nextWateringDate = plant.lastWatering + plant.wateringPeriod;
    timeToNextWatering = moment(nextWateringDate).fromNow();
    nextFertDate = plant.lastFert + plant.fertPeriod;
    timeToNextFert = moment(nextFertDate).fromNow();
    if (timeToNextWatering.includes("ago")) {
      alert("please water " + plant.name);
    }
    if (timeToNextFert.includes("ago")) {
      alert("please Fert " + plant.name);
    }
  }

  setInterval(function() {
    computeNextWatering();
    write();
  }, 1000 * 60 * 60 * 24);

  function write() {
    plantElement.innerText =
      "Name: " +
      plant.name +
      "\n Type: " +
      plant.type +
      "\n Time to next Watering: " +
      timeToNextWatering +
      "\n time to next fertilizing: " +
      timeToNextFert;
    savePlants();
    plantBlock.appendChild(plantElement);
    typeInput.value = plant.type;
    nameInput.value = plant.name;
  }

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

  computeNextWatering();
  write();
}

function reload() {}

let LOCAL_STORAGE_KEY = "plantslist";

function savePlants() {
  let plantsAsJsonString = JSON.stringify(plants);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, plantsAsJsonString);
}

function loadPlants() {
  let savedPlantsAsJsonString = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedPlantsAsJsonString !== null) {
    plants = JSON.parse(savedPlantsAsJsonString);
  }
}

loadPlants();

for (plant of plants) {
  render(plant);
}
