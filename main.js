let filtersBar = document.createElement("div");
document.body.append(filtersBar);
let filters = [];
let container = document.createElement("div");
document.body.append(container);

async function fetchData() {
  let data = await fetch("data.json");
  data = await data.json();
  return data;
}

function drawData(array) {
  array.forEach((obj) => {
    let mainDiv = document.createElement("div");
    let companyHeading = document.createElement("h4");
    companyHeading.textContent = obj.company;
    companyHeading.className = "meta";
    let titleHeading = document.createElement("h3");
    titleHeading.textContent = obj.title;
    titleHeading.className = "meta";
    let sinceSpan = document.createElement("span");
    sinceSpan.textContent = obj.since;
    sinceSpan.className = "meta";
    let jobTypeSpan = document.createElement("span");
    jobTypeSpan.textContent = obj.jobType;
    jobTypeSpan.className = "meta";
    let locationSpan = document.createElement("span");
    locationSpan.textContent = obj.location;
    locationSpan.className = "meta";
    let skillsDiv = document.createElement("div");
    skillsDiv.className = "skills-div";
    obj.skills.forEach((skill) => {
      let skillSpan = document.createElement("span");
      skillSpan.textContent = skill;
      skillSpan.className = "skill";
      skillsDiv.append(skillSpan);
    });
    mainDiv.append(
      companyHeading,
      titleHeading,
      sinceSpan,
      jobTypeSpan,
      locationSpan,
      skillsDiv
    );
    container.append(mainDiv);
  });
}

fetchData().then((data) => drawData(data));

container.addEventListener("click", async (e) => {
  let data;
  if (e.target.classList.contains("skill")) {
    if (
      ![...filtersBar.children].some(
        (child) => e.target.textContent == child.firstChild.textContent
      )
    ) {
      filters.push(e.target.textContent);
      container.innerHTML = "";

      data = await fetchData();

      data.forEach((obj) => {
        if (filters.every((skill) => obj.skills.includes(skill))) {
          drawData([obj]);
        }
      });

      let filterSpan = document.createElement("span");
      filterSpan.textContent = e.target.textContent;

      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "X";
      deleteBtn.onclick = async function (e) {
        let span = e.target.parentElement;
        span.remove();
        container.innerHTML = "";

        let removedSkill = span.firstChild.textContent.trim();
        filters = filters.filter((f) => f !== removedSkill);

        if (filters.length > 0) {
          let data = await fetchData();
          data.forEach((obj) => {
            if (filters.every((filter) => obj.skills.includes(filter))) {
              drawData([obj]);
            }
          });
        } else {
          drawData(await fetchData());
        }
      };
      filterSpan.append(deleteBtn);
      filtersBar.append(filterSpan);
    }
  }
});
