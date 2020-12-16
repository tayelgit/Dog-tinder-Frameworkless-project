

class Dog {
    constructor(imgUrl) {
        this._imgUrl = imgUrl;
    }

    get imgUrl() {
        return this._imgUrl
    }

}

let currentDog;
//naming needs to match with pseudo enum values
goodBoys = [];
veryGoodBoys = [];

//pseudo enums keys have to match between both objects
const listIds = {
    GOOD_BOY: "good-boy-list-container",
    VERY_GOOD_BOY: "very-good-boy-list-container"
}

const list_keys = {
    VERY_GOOD_BOY: "veryGoodBoys",
    GOOD_BOY: "goodBoys",
}


const listItemFactory = (src) => {
    const item = document.createElement("div");
    item.classList.add("image-list-item");
    const img = document.createElement("img");
    img.classList.add("list-image", "shadow", "pointer");
    img.src = src;
    img.alt = "picture of a dog";
    img.onclick = removeDog;
    item.append(img);
    return item;
}

const getRandomDogSrc = () =>
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(response => response.message)


const getNewDog = async () => {
    const src = await getRandomDogSrc();
    currentDog = new Dog(src);
    return currentDog;
}



const removeDog = (event) => {
    const clickedElement = event.target;
    const listItem = clickedElement.parentNode;
    const list = listItem.parentNode;
    const id = list.getAttribute("id");
    const src = clickedElement.getAttribute("src");
    list.removeChild(listItem);
    removeFromLocalList(id,src);
}



const rateDog = (listId) => {
    addDogPictureToList(listId, currentDog);
    addToLocalList(listId);
    changeRatingImageSrc();
}

const addToLocalList = (listId) => {
    Object.entries(listIds).forEach(([key, value]) => {
        if (value === listId) {
            window[list_keys[key]].push(currentDog);
            saveToLocalStorage(list_keys[key], window[list_keys[key]]);
        }
    })
}

const removeFromLocalList = (listId, dogSrc) => {
    Object.entries(listIds).forEach(([key, value]) => {
        if (value === listId) {
            window[list_keys[key]] = window[list_keys[key]].filter(dog => dog.imgUrl != dogSrc);
            saveToLocalStorage(list_keys[key], window[list_keys[key]]);
        }
    })
}

const addDogPictureToList = (listId, dog) => {
    const element = document.getElementById(listId);
    const dogSrc = dog.imgUrl;
    const listItem = listItemFactory(dogSrc);
    element.append(listItem);
}


const changeRatingImageSrc = async () => {
    const element = document.getElementById("rating-image");
    element.src = (await getNewDog()).imgUrl;
}




const saveToLocalStorage = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val))
}
const loadLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) ?? [];
}



const loadLists = () => {
    Object.entries(list_keys).forEach(
        ([key, value]) => {
            const tempList = loadLocalStorage(value);
            window[value] = tempList.map(x => new Dog(x._imgUrl));
            buildList(window[value], listIds[key]);
        }
    )
}


const buildList = (array, listId) => {
    array.forEach((dog) => {
        addDogPictureToList(listId, dog);
    }
    )
}

const initApp = () => {
    loadLists();
    changeRatingImageSrc();
}
window.onload = initApp();