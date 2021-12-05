let data;
let ratingData = [];
(async () => {
    data = await (await fetch('/data.json')).json();
})();

window.onload = function () {
    let container = document.getElementById('container');
    let contactsList = document.querySelector(".contacts-list");
    let backArrow = document.querySelector(".back");
    let peoplesWrapper = document.querySelector(".people-wrapper");
    let personInfoDiv = document.querySelector(".person-info");
    let listView = document.querySelector(".list-view");
    let friendsLi = document.querySelector(".people-title.in-friends");
    let notFriends = document.querySelector(".people-title.not-friends")
    let popPeoples = document.querySelector(".people-title.pop-peoples")

    contactsList.addEventListener('click', clickInList);
    backArrow.addEventListener('click', backToList);

    if (data) {
        initData()
        for (let i = 0; i < 10; i++) {
            let person = data[i];
            let li = document.createElement("li");
            let strong = document.createElement("strong");
            
            li.dataset.personId = person.id

            strong.append(person.name);
            li.append(strong);
            container.firstElementChild.firstElementChild.append(li);
        }
    }

    function clickInList(e) {
        listView.style.zIndex = 0;
        friendsLi = document.querySelector(".people-title.in-friends");
        notFriends = document.querySelector(".people-title.not-friends")
        popPeoples = document.querySelector(".people-title.pop-peoples")

        let person = data.find(el => Number(e.target.dataset.personId) === el.id
            || Number(e.target.parentNode.dataset.personId) === el.id);

        fillDetails(person);
    }

    function fillDetails(person) {
        personInfoDiv.innerHTML = "<div>" + person.name + "</div>"

        person.friends.map(personIdInFriends => {
            let personInData = data[personIdInFriends - 1];

            let li = document.createElement("li");
            let i = document.createElement("i");
            let span = document.createElement("span");

            li.id = personInData.id;
            li.className = "friend"
            i.className = "fa fa-male";
            span.textContent = personInData.name;

            li.append(i);
            li.append(span);
            friendsLi.after(li);
        })

        for (let j = 2; j >= 0; j--) {
            let personInData = data[person.notFriends[j] - 1];

            let li = document.createElement("li");
            let i = document.createElement("i");
            let span = document.createElement("span");

            li.id = personInData.id;
            li.className = "friend"
            i.className = "fa fa-male";
            span.textContent = personInData.name;

            li.append(i);
            li.append(span);
            notFriends.after(li);
        }

        for (let j = 2; j >= 0; j--) {
            let personInRatingData = ratingData[j];

            let li = document.createElement("li");
            let i = document.createElement("i");
            let span = document.createElement("span");

            li.id = personInRatingData.id;
            li.className = "friend"
            i.className = "fa fa-male";
            span.textContent = personInRatingData.name;

            li.append(i);
            li.append(span);
            popPeoples.after(li);
        }

    }

    function backToList() {
        listView.style.zIndex = 1;
        peoplesWrapper.innerHTML = '';
        peoplesWrapper.innerHTML = '' +
            '<li class="people-title in-friends">Друзья</li>' +
            '<li class="people-title not-friends">Не в друзьях</li>' +
            '<li class="people-title pop-peoples">Популярные люди</li>'
    }

    function initData() {
        let allFriends = [];
        data.map(dataEl => {
            dataEl.friends.map(friend => {
                allFriends.push(friend)
            })
            dataEl.notFriends = [];
            data.map(el => {
                if (!dataEl.friends.includes(el.id)) {
                    dataEl.notFriends.push(el.id)
                }
            })
        })
        const sortedFriendsByCount = allFriends.reduce(function (acc, el) {
            acc[el - 1] = (acc[el - 1] || 0) + 1;
            return acc;
        }, []);

        for (let i = 0; i < sortedFriendsByCount.length; i++) {
            if (sortedFriendsByCount[i] === undefined) {
                sortedFriendsByCount[i] = 0
            }
        }
        sortedFriendsByCount.map((rating, index) => {
            let tmpObj = {
                id: index + 1,
                name: data[index].name,
                rating: rating
            }
            ratingData.push(tmpObj)
        })

        ratingData.sort((prev, next) => {
            if (prev.name < next.name) return -1;
            if (prev.name < next.name) return 1;
        });
        ratingData.sort((prev, next) => next.rating - prev.rating)
    }
}








