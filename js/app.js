'use strict';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let allMobile = [];
function Mobilestore(user, type) {
    this.user = user;
    this.type = type;
    this.price = getRndInteger(100, 500);
    this.condition = 0;

    allMobile.push(this);
    udateData();
}

function udateData() {
    let stringData = JSON.stringify(allMobile);
    localStorage.setItem('mobiledata', stringData);
}

function getData() {
    let dataBack = localStorage.getItem('mobiledata');
    let objectData = JSON.parse(dataBack);

    if (objectData) {
        for (let i = 0; i < objectData.length; i++) {
            new Mobilestore(objectData[i].user, objectData[i].type);
        }
    }
}

let parent = document.getElementById('table');

function showHeader() {
    let newLine = document.createElement('tr');
    parent.appendChild(newLine);

    let headerUser = document.createElement('th');
    newLine.appendChild(headerUser);
    headerUser.textContent = 'User';

    let headerType = document.createElement('th');
    newLine.appendChild(headerType);
    headerType.textContent = 'Type';

    let headerPrice = document.createElement('th');
    newLine.appendChild(headerPrice);
    headerPrice.textContent = 'Price';

    let headerCondition = document.createElement('th');
    newLine.appendChild(headerCondition);
    headerCondition.textContent = 'Condition';
}

Mobilestore.prototype.render = function () {
    let newLine = document.createElement('tr');
    parent.appendChild(newLine);

    let newUser = document.createElement('td');
    newLine.appendChild(newUser);
    newUser.textContent = this.user;

    let newType = document.createElement('td');
    newLine.appendChild(newType);
    newType.textContent = this.type;

    let newPrice = document.createElement('td');
    newLine.appendChild(newPrice);
    newPrice.textContent = this.price;

    let newORused = document.createElement('td');
    newLine.appendChild(newORused);
    if (this.price <= 200) {
        newORused.textContent = 'Used';
        this.condition = 'Used';

    } else {
        newORused.textContent = 'New';
        this.condition = 'New';
    }
}


let form = document.getElementById('form');
form.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();

    let user = event.target.User.value;
    // console.log(user);
    let type = event.target.Type.value;
    // console.log(type);
    let newMobile = new Mobilestore(user, type);
    newMobile.render();

    // parent.textContent='';
    // showHeader();
    // for (let i = 0; i < allMobile.length; i++) {
    //     allMobile[i].render();
    // }



}

getData()
showHeader();
for (let i = 0; i < allMobile.length; i++) {
    allMobile[i].render();
}


