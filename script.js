const studyItems = [
  {
    name: "형태소",
    type: "station",
    subtopics: ["이형태", "형태소의 종류"],
  },
  {
    name: "단어의 형성",
    type: "station",
    subtopics: ["단일어", "합성어", "파생어", "어근 / 접사"],
  },
  {
    name: "품사",
    type: "station",
    subtopics: ["명사", "대명사", "수사", "조사", "관형사", "부사", "감탄사", "동사", "형용사"],
  },
  {
    name: "문장성분",
    type: "station",
    subtopics: ["주어", "목적어", "서술어", "보어", "관형어", "부사어"],
  },
  {
    name: "문장구조",
    type: "station",
    subtopics: ["홑문장", "겹문장", "안은문장", "이어진문장", "구 / 절"],
  },
  {
    name: "문법요소",
    type: "station",
    subtopics: ["종결법", "높임법", "시제 / 상", "피동 / 사동", "부정법"],
  },
];

let currentIndex = 0;

const studyLine = document.querySelector("#study-line");
const currentTopic = document.querySelector("#current-topic");
const currentState = document.querySelector("#current-state");
const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");

function getStatus(index) {
  if (index < currentIndex) {
    return "done";
  }

  if (index === currentIndex) {
    return "current";
  }

  return "todo";
}

function getTopicGroup(index) {
  if (index < 3) {
    return "형태론";
  }

  return "통사론";
}

function getStateText(item, index) {
  const status = getStatus(index);

  if (status === "done") {
    return `${item.name} 정차 완료`;
  }

  if (status === "current") {
    return `${item.name} 정차 중`;
  }

  return `${item.name} 대기`;
}

function createItemElement(item, index) {
  const wrapper = document.createElement("article");
  const status = getStatus(index);
  wrapper.className = `study-item ${status}`;

  const node = document.createElement("div");
  node.className = "study-node";
  wrapper.appendChild(node);

  if (item.type === "station") {
    const badge = document.createElement("div");
    badge.className = "station-badge";
    badge.innerHTML = `
      <span class="station-title">${item.name}</span>
    `;
    wrapper.appendChild(badge);

    if (item.subtopics && item.subtopics.length > 0) {
      const panel = document.createElement("div");
      panel.className = "subtopic-panel";

      const chips = document.createElement("div");
      chips.className = "subtopic-chips";

      item.subtopics.forEach((subtopic) => {
        const chip = document.createElement("span");
        chip.className = "subtopic-chip";
        chip.textContent = subtopic;
        chips.appendChild(chip);
      });

      panel.appendChild(chips);
      wrapper.appendChild(panel);
    }
  }

  return wrapper;
}

function renderLine() {
  studyLine.innerHTML = "";

  studyItems.forEach((item, index) => {
    const element = createItemElement(item, index);
    studyLine.appendChild(element);
  });

  const currentItem = studyItems[currentIndex];
  currentTopic.textContent = getTopicGroup(currentIndex);
  currentState.textContent = getStateText(currentItem, currentIndex);

  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === studyItems.length - 1;
}

prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderLine();
  }
});

nextButton.addEventListener("click", () => {
  if (currentIndex < studyItems.length - 1) {
    currentIndex += 1;
    renderLine();
  }
});

renderLine();
