// all-combination.js

let currentStep = 1;
let stepSelections = {};

// Utility to populate radio buttons
function populateRadioButtons(containerId, options) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  options.forEach((option) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = containerId;
    input.value = option;
    label.appendChild(input);
    label.appendChild(document.createTextNode(option));
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
    input.addEventListener("change", () => {
      stepSelections[containerId] = option;
      document.getElementById("next-btn").disabled = false;
    });
  });
}

// Utility to populate dropdown options
function populateDropdown(dropdown, options, selectedValue) {
  dropdown.innerHTML = '<option value="">Select an option</option>';
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    if (option === selectedValue) opt.selected = true;
    dropdown.appendChild(opt);
  });
}

// Utility to display the correct step
function showStep(step) {
  document.querySelectorAll(".step").forEach((el, index) => {
    el.classList.toggle("active", index + 1 === step);
  });

  const backBtn = document.getElementById("back-btn");
  const nextBtn = document.getElementById("next-btn");

  backBtn.style.display = step === 1 ? "none" : "inline-block";
  nextBtn.textContent = step === 4 ? "Result" : "Next";

  const progressBar = document.getElementById("progress-bar-inner");
  progressBar.style.width = `${(step - 1) * (100 / 3)}%`;

  const selectedOption = stepSelections[`radio-group-${step}`];
  if (selectedOption) {
    document.querySelector(
      `input[name="radio-group-${step}"][value="${selectedOption}"]`
    ).checked = true;
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

// Utility to display cards based on filtered data
function displayCards() {
  const value1 = dropdown1.value;
  const value2 = dropdown2.value;
  const value3 = dropdown3.value;

  const filteredData = data.filter(
    (item) =>
      (!value1 || item["Who is this for"] === value1) &&
      (!value2 || item["What do you want to do?"] === value2) &&
      (!value3 || item["What is it?"] === value3)
  );

  cardsContainer.innerHTML = "";
  if (filteredData.length > 0) {
    filteredData.forEach((item) => {
      item.cards.forEach((card) => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
      });
    });
  } else {
    const message = document.createElement("p");
    message.className = "message";
    message.textContent =
      "Don't have combination with these options, please choose other options.";
    cardsContainer.appendChild(message);
  }
}

// Utility to create a card element
function createCardElement(card) {
  const cardElement = document.createElement("div");
  cardElement.className = "card";

  const heading = document.createElement("h3");
  heading.textContent = card.Heading;

  const body = document.createElement("p");
  body.textContent = card["Body text"];

  cardElement.appendChild(heading);
  cardElement.appendChild(body);

  if (card.Links) {
    card.Links.forEach((link) => {
      if (link) {
        const anchor = document.createElement("a");
        anchor.href = link.link;
        anchor.style.display = "block";
        anchor.textContent = link.text;
        cardElement.appendChild(anchor);
      }
    });
  }

  return cardElement;
}

// Prepare options for radio buttons and dropdowns
const options1 = [...new Set(data.map((item) => item["Who is this for"]))];
const options2 = [
  ...new Set(data.map((item) => item["What do you want to do?"])),
];
const options3 = [...new Set(data.map((item) => item["What is it?"]))];

populateRadioButtons("radio-group-1", options1);
populateRadioButtons("radio-group-2", options2);
populateRadioButtons("radio-group-3", options3);

const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");
const dropdown3 = document.getElementById("dropdown3");
const cardsContainer = document.getElementById("cards-container");

populateDropdown(dropdown1, options1, null);
populateDropdown(dropdown2, options2, null);
populateDropdown(dropdown3, options3, null);

// Event listeners for step navigation
document.getElementById("back-btn").addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (currentStep < 4) {
    currentStep++;
    if (currentStep === 4) {
      updateDropdownsFromSelections();
      displayCards();
      document.querySelector(".navigation").style.display = "none";
    }
    showStep(currentStep);
  }
});

document.getElementById("continue-btn").addEventListener("click", () => {
  displayCards();
});

// Utility to update dropdowns from selected radio options
function updateDropdownsFromSelections() {
  const selected1 = document.querySelector(
    'input[name="radio-group-1"]:checked'
  );
  const selected2 = document.querySelector(
    'input[name="radio-group-2"]:checked'
  );
  const selected3 = document.querySelector(
    'input[name="radio-group-3"]:checked'
  );

  if (selected1) dropdown1.value = selected1.value;
  if (selected2) dropdown2.value = selected2.value;
  if (selected3) dropdown3.value = selected3.value;
}
