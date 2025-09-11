//making the layout
let filtersBar = document.createElement("div");
document.body.append(filtersBar);
let filters = [];
let container = document.createElement("div");
document.body.append(container);

//getting data
async function fetchData() {
  let data = await fetch("data.json");
  data = await data.json();

  return data;
}

//addElement function
let addElement = (element) => {
  let mainDiv = document.createElement("div");
  let companyHeading = document.createElement("h4");
  companyHeading.textContent = element.company;
  companyHeading.className = "meta";
  let titleHeading = document.createElement("h3");
  titleHeading.textContent = element.title;
  titleHeading.className = "meta";
  let sinceSpan = document.createElement("span");
  sinceSpan.textContent = element.since;
  sinceSpan.className = "meta";
  let jobTypeSpan = document.createElement("span");
  jobTypeSpan.textContent = element.jobType;
  jobTypeSpan.className = "meta";
  let locationSpan = document.createElement("span");
  locationSpan.textContent = element.location;
  locationSpan.className = "meta";
  let skillsDiv = document.createElement("div");
  skillsDiv.className = "skills-div";
  element.skills.forEach((skill) => {
    let skillSpan = document.createElement("span");
    skillSpan.textContent = skill;
    skillSpan.className = "skill";
    //Toggle Function
    skillSpan.addEventListener("click",()=> {
     if(filters.indexOf(skill) === -1){
      filters.push(skill);
      showElements();
     }else{
     filters =  filters.filter((e)=> e !== skill);
     showElements()
     }
    })
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
};

//show elements functtion
function drawData(array) {
  container.innerHTML = ""
  if(filters.length === 0){
    array.forEach((element) => {
      addElement(element);
    });
  }else{
        const filtered = array.filter(job =>
      filters.every(skill => job.skills.includes(skill))
    );
    filtered.forEach(element => addElement(element));
  }
}

//showing elements
showElements = ()=>{
  fetchData().then((data) => drawData(data));
}
showElements();




// filtering and adding logic by Tarek 
// container.addEventListener("click", async (e) => {

//   let data;
//   if (e.target.classList.contains("skill")) {
//     if (
//       ![...filtersBar.children].some(
//         (child) => e.target.textContent == child.firstChild.textContent
//       )
//     ) {
//       filters.push(e.target.textContent);
//       container.innerHTML = "";

//       data = await fetchData();

//       data.forEach((obj) => {
//         if (filters.every((skill) => obj.skills.includes(skill))) {
//           drawData([obj]);
//         }
//       });

//       let filterSpan = document.createElement("span");
//       filterSpan.textContent = e.target.textContent;

//       let deleteBtn = document.createElement("button");
//       deleteBtn.innerHTML = "X";
//       deleteBtn.onclick = async function (e) {
//         let span = e.target.parentElement;
//         span.remove();
//         container.innerHTML = "";

//         let removedSkill = span.firstChild.textContent.trim();
//         filters = filters.filter((f) => f !== removedSkill);

//         if (filters.length > 0) {
//           let data = await fetchData();
//           data.forEach((obj) => {
//             if (filters.every((filter) => obj.skills.includes(filter))) {
//               drawData([obj]);
//             }
//           });
//         } else {
//           drawData(await fetchData());
//         }
//       };
//       filterSpan.append(deleteBtn);
//       filtersBar.append(filterSpan);
//     }
//   }
// });

