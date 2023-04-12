document.addEventListener('DOMContentLoaded', async () => {
    let names = window.api.getNames();
    let divNames = document.getElementById("names");
    

    let nameString = names.map((elem) => {
        return elem.name;
    }).join("<br />");

    // Add New Element
    // window.api.addName("Jeet");

    // Delete Elements
    // for (i=3; i<=10; i++) {
    //     window.api.deleteName(i)
    // }
    

    divNames.innerHTML = nameString;



})