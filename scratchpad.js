let prefix = "negative-label-filter";

function setButton(list) {
  // Knopje maken, eerst de subheader definieren
  const labels = getUniqueLabelsInList(list);
  const header = list.querySelector('.list-header');
  let subHeader = list.querySelector(`.${prefix}-list-sub-header`);

  if (!subHeader) {
    subHeader = document.createElement('div');
    subHeader.className = `${prefix}-list-sub-header`;
    header.parentElement.insertBefore(subHeader, header.nextElementSibling);
  }

  subHeader.innerHTML = '';

  // Knopje toevoegen in Subheader
  let button = document.createElement('button');
  button.innerText = "CLICK ME";

  button.addEventListener('click', (event) => {
    const labelName = prompt("Welke label wil je niet zien? \n\n" + labels.join(", "));
    buttonClicked(list, labelName)
    event.stopPropagation();
  });

  subHeader.appendChild(button);
}

function buttonClicked(list, labelName) {
  const cards = Array.from(list.querySelectorAll('.list-card'));

  // show all cards first
  cards.forEach((card) => {
    showCard(card);
  });

  const cardElements = cards.filter((c) => Array.from(c.querySelectorAll(".card-label"))
        .some((l) => l.getAttribute("title") == labelName ))
  cardElements.forEach(card => {
    hideCard(card);
  })
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function getUniqueLabelsInList(listElement) {
  return Array.from(listElement.querySelectorAll(".card-label")).map((l) => l.getAttribute('title')).filter(onlyUnique);
}

function hideCard(card) {
    card.style.height = '0px';
    card.classList.add('hide');
  }

function showCard(card) {
    card.style.removeProperty('height');
    card.classList.remove('hide');        
}