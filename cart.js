window.onload = function() {
    let addButton = document.querySelector("#add-item");
    let sortButton = document.querySelector('#sort-button');
    
    addButton.addEventListener('click',addCartItem);
    sortButton.addEventListener('click',sortList);

}

function addCartItem(){

    let input = document.querySelector('#add-input');
    let text = input.value;
    let cart = document.querySelector('#cart-items-container');

    let deleteButton = document.createElement('button');
    let upButton = document.createElement('button');
    let downButton = document.createElement('button');
    let itemText = document.createElement('h3')
    let container = document.createElement('div');
    let checkbox = document.createElement('input');
    

    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute('aria-label',`delete-${text}`);
    deleteButton.addEventListener('click',removeCartItem);

    upButton.innerHTML = "Up";
    upButton.setAttribute('aria-label',`move-${text}-up`);
    upButton.addEventListener('click',moveCartItemUp);

    downButton.innerHTML = "Down";
    downButton.setAttribute('aria-label',`move-${text}-down`);
    downButton.addEventListener('click',moveCartItemDown);

    itemText.innerHTML = text;
    itemText.setAttribute('class','cart-text');

    checkbox.setAttribute('aria-label','check-off-item');
    checkbox.setAttribute('type','checkbox');
    checkbox.checked = false;
    checkbox.setAttribute('aria-checked','false');
    checkbox.addEventListener('click',checkCartItem);

    container.append(checkbox,itemText,upButton,deleteButton,downButton);
    container.setAttribute('class','cart-item');

    cart.appendChild(container);
    input.value="";
}

function removeCartItem(event){
    console.log(event);
    let parent = event.target.parentNode;
    let cart = document.querySelector('#cart-items-container'); 
    cart.removeChild(parent);
}

function moveCartItemUp(event){
    let parent = event.target.parentNode;
    let items = document.querySelectorAll('.cart-item');
    let itemsArray = Array.from(items);
    let cart = document.querySelector('#cart-items-container');
    
    for(let item in itemsArray){
        if(itemsArray[item] == parent && item>0){
            let temp = itemsArray[item];
            itemsArray[item] = itemsArray[item-1];
            itemsArray[item-1] = temp;
        }
    }
    
    cart.innerHTML = "";
    
    for(let item of itemsArray){
        cart.appendChild(item);
    }
    
}

function moveCartItemDown(event){
    let parent = event.target.parentNode;
    let items = document.querySelectorAll('.cart-item');
    let itemsArray = [];
    let cart = document.querySelector('#cart-items-container');

    for(let i=0;i<items.length;i++){
        if(items[i] == parent && i<items.length-1){
            itemsArray.push(items[i+1]);
            itemsArray.push(items[i]);
            i++
        }
        else{
            itemsArray.push(items[i]);
        }
       
    }
    
    cart.innerHTML = "";
    for(let item of itemsArray){
        cart.appendChild(item);
    }
}

function sortList(){
    let items = document.querySelectorAll('.cart-item');
    let itemsArray = [].slice.call(items);
    let cart = document.querySelector('#cart-items-container');

    itemsArray.sort(function (a,b){
        let stringA = a.querySelector('h3').innerHTML;
        let stringB = b.querySelector('h3').innerHTML;
        return stringA < stringB ? -1 : stringA > stringB ? 1 : 0;
    });

    cart.innerHTML = "";

    for(let item of itemsArray){
        cart.appendChild(item);
    }
}

function checkCartItem(event){
    let target = event.target;
    let parent = target.parentNode;

    target.setAttribute('aria-check',!target.checked);

    parent.classList.toggle('checked');
}