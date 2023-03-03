const contactPic = document.getElementById("contactpic");
const headers = document.querySelectorAll("th");
const origOrderRows = document.querySelectorAll(".datarow");
const table = document.querySelector("table tbody");

let sorted = -1;


for (let elem of headers) {
    elem.addEventListener('click', sortBy);
}

for(let elem of origOrderRows) {
    elem.addEventListener('mouseenter', showAddressPic);
    elem.addEventListener('mouseleave', hideAddressPic);
}

function showAddressPic(e) {
    let pic = e.target.querySelector(".address").children[1];
    pic.removeAttribute("hidden");
    contactPic.setAttribute('src', pic.src);
}

function hideAddressPic(e) {
    contactPic.setAttribute('src', '/images/gophers-mascot.png');
    let pic = e.target.querySelector(".address").children[1];
    pic.setAttribute("hidden", "true");
}

function sortBy(e) {
    let headerElem = e.target;
    let sortFunction;
    let col;

    switch (headerElem.getAttribute('id')) {
        case "location_header":
            col = 1
            break;
        case "contact_header":
            col = 2;
            break;

        case "email_header":
            col = 3;
            break;

        case "website_header":
            col = 4;
            break;
        case "name_header":
            col = 0;
    }

    if(sorted === col) {
        //return to unsorted list
        for (let elem of origOrderRows) {
            table.removeChild(elem);
            table.appendChild(elem);
        }
        sorted = -1;
        return;
    }

    if (col == 1) {//location sort function
        sortFunction = function (row1, row2) {
            let span = row1.querySelector("span");
            let span2 = row2.querySelector("span");

            if (span.innerText < span2.innerText) {
                return -1;
            } else if (span.innerText > span2.innerText) {
                return 1;
            }
            return 0;
        }
    } else {//all others sort function
        sortFunction = function (row1, row2) {
            if (row1.children[col].innerText < row2.children[col].innerText) {
                return -1;
            } else if (row1.children[col].innerText > row2.children[col].innerText){
                return 1;
            }
            return 0;
        }
    }

    let currData = document.querySelectorAll("tr");
    let rowsArr = [];
    //put each element of the node list intp an array
    currData.forEach( (elem) => rowsArr.push(elem) );
    //remove first element of array (header row)
    rowsArr.shift();
    
    rowsArr.sort(sortFunction);
    console.log(table);
    console.log(rowsArr);
    for (let elem of rowsArr) {
        table.removeChild(elem);
        table.appendChild(elem);
    }

    sorted = col;
}