let prefix = "negative-label-filter";


function addStyles() {
  const styleId = `${prefix}-style`;
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.type = 'text/css';
    style.id = styleId;
    document.head.append(style);
  }

  style.textContent = `
    .${prefix}-list-sub-header {
      margin: 0 5px 5px;
    }

    .${prefix}-list-item-clickable button {
      font-size: 10px;
      margin: 0;
      border: 0;
      padding: 5px;
    }

    .${prefix}-list-item-clickable {
      float: left;
      padding: 3px;
    }

  `;
}

function init() {
  addStyles();
  const lists = Array.from(document.querySelectorAll(".list"));
  lists.forEach((list) => {
    addLabelsToSubHeader(list);
  });
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
  return self.map(e => e.title).indexOf(value.title) === index;
}

function getUniqueLabelsInList(listElement) {
  return Array.from(listElement.querySelectorAll(".card-label"))
    .map((l) => {
      const title = l.getAttribute('title')
      const colorClass = Array.from(l.classList).find((c) => c.startsWith("card-label-"))
      return { title, colorClass };
    }).filter(onlyUnique);
}

function hideCard(card) {
    card.style.height = '0px';
    card.classList.add('hide');
  }

function showCard(card) {
    card.style.removeProperty('height');
    card.classList.remove('hide');        
}

function addLabelsToSubHeader(list){
  const labels = getUniqueLabelsInList(list);
  console.log(labels);
  const header = list.querySelector('.list-header');
  let subHeader = list.querySelector(`.${prefix}-list-sub-header`);

  if (!subHeader) {
    subHeader = document.createElement('div');
    subHeader.className = `${prefix}-list-sub-header`;
    header.parentElement.insertBefore(subHeader, header.nextElementSibling);
  }

  subHeader.innerHTML = '';

  if (labels.length) {
    const ul = document.createElement('ul');
    ul.className = `${prefix}-list`;
    
    // Sort all labels
    labels.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      }

      return 0;
    });

    // Construct the label elements
    for (const label of labels) {
      const button = document.createElement("button");
      button.innerText = label.title;

      // Add color class from trello
      button.classList.add(label.colorClass);

      const li = document.createElement('li');
      li.classList.add(`${prefix}-list-item`, `${prefix}-list-item-clickable`);
      li.appendChild(button);

      ul.appendChild(li);

      button.addEventListener('click', (event) => {
        buttonClicked(list, label.title)
        event.stopPropagation();
      });
    }

    subHeader.appendChild(ul);
  }
}

function addResetLabel(){
  
}