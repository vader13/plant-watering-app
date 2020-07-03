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
  nameInput.placeholder = "Name";
  typeInput.placeholder = "Type";
  plantBlock.className = "card";

  plantBlock.appendChild(nameInput);
  plantBlock.appendChild(typeInput);

  plantBlock.appendChild(saveBtn);
  plantsDiv.appendChild(plantBlock);
  saveBtn.onclick = () => save();

  let plantElement = document.createElement("div");
  function save() {
    plant.name = nameInput.value;
    plant.type = typeInput.value;
    savePlants();
    write();
  }
  function write() {
    plantElement.innerText = "Name: " + plant.name + "\n Type: " + plant.type;
    savePlants();
    plantBlock.appendChild(plantElement);
  }
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
