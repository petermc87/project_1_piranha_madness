// ---------------------------------//
// -------- GLOBAL VARIABLES -------//
// ---------------------------------//

let move = null;
let fishEaten = 0;
let currentLevel = 0;
let newPlayerFish = null;
// let newPiranhaFishOne = null;
// let newPiranhaFishTwo = null;
// ---------------------------------//
// -----------CACHED DOMS-----------//
// ---------------------------------//

const allEatingFish = document.querySelector('.all-sprites')
//player sprite
const playerSprite = document.querySelector('.player-sprite')
const imageContainer = document.querySelector('.image-container')

//piranha
const piranhaEl = document.querySelector('.piranha-sprite')
const piranhaOne = document.getElementById('first-piranha')
const pirahnhaContact = document.querySelector('.piranha-contact')
const piranhaTwo = document.getElementById('second-piranha')
const piranhaOneContact = document.getElementById('pir-one-contact')
const piranhaTwoContact = document.getElementById('pir-two-contact')

//title screen
const titleScreen = document.querySelector('.title')

//background images
const bottomImage = document.querySelector('.bottom-image')

//starting modals
const gameStartButton = document.querySelector('#openModal');
const modal = document.querySelector('#modal');
const continueBtn = document.querySelector('#continue');
const allButtons = document.querySelector('.modal-buttons')

//next level & dying modal
const nextLevelModal = document.querySelector('.next-level')
const levelCompleteText = document.getElementById('level-text')
const levelCompleteModalBox = document.getElementById('next-level-text')
const restartText = document.getElementById('restart')

//stats
const hullUpdate = document.getElementById('hull');
const eaten = document.getElementById('eaten');
const thisLevel = document.getElementById('level');
const thisFish = document.getElementById('name');
const statContainer = document.querySelector('.stat-container');
const messageBar = document.querySelector('.message-panel');
const liveMessage = document.querySelector('.live-message');
const playerSelection = document.getElementById('selection');

//fish selection containers
const salmonSelection = document.getElementById('silly-salmon');
const dogfishSelection = document.getElementById('dogfish-darcy');
const troutSelection = document.getElementById('trout-magic');
//stat boxes
const dogfishStats = document.getElementById('dogfish-stats');
const salmonStats = document.getElementById('salmon-stats');
const troutStats = document.getElementById('trout-stats');
//stat spans for each fish
const dogfishHealth = document.getElementById('dogfish-health');
const dogfishSpeed = document.getElementById('dogfish-speed');
const salmonHealth = document.getElementById('salmon-health');
const salmonSpeed = document.getElementById('salmon-speed');
const troutHealth = document.getElementById('trout-health');
const troutSpeed = document.getElementById('trout-speed');
//play game button
const playGameBtn = document.getElementById('play')


// ---------------------------------//
// -------------CLASSES-------------//
// ---------------------------------//

class Piranha {
    constructor(name, hitpoints, speed){
        this.name = name;
        this.hitpoints = hitpoints;
        this.speed = speed;
    }
    generatePiranha(){
        
    }
}

class playerFish {
    constructor(name, hull, speed){
        this.name = name;
        this.hull = hull;
        this.speed = speed;
    }
    hullDamage(){
        return this.hull - newPiranha.hitpoints;
    }
}


// ---------------------------------//
// -------------OBJECTS-------------//
// ---------------------------------//
const piranhaKillers = [
    new Piranha('Slick Rick', 2, 7),
    new Piranha('Billy Bully', 4, 8),
    // new Piranha('Stabby Gabby', 1.5, 4)
]

const fishPlayers = [
    new playerFish('Dogfish Darcy', 20, 17),
    new playerFish('Silly Salmon', 15, 24),
    new playerFish('Trouty Magic', 25, 12),
]

const levelParameter = [
    ['krill', 'gold', 'red'],
    [10, 15, 20],
    [10, 8, 3, 6, 12, 4, 5, 7, 9, 13, 14]
]

//instantiating two new piranhas
const newPiranhaFishOne = piranhaKillers[0]
const newPiranhaFishTwo = piranhaKillers[1]

fishPlayers.forEach((aFish)=>{
    console.log(aFish.hull)
})


// ---------------------------------//
// ------------FUNCTIONS ----------//
// ---------------------------------//

//generate random height for the fish to spawn
// const levelCompleteText = document.getElementById('level-text')


const fishRandomHeight = () => {
    return Math.random() * 80;
}

// resetting the game
const gameReset = () => {
    playerSprite.innerHTML = `<div class="mouth-contact"></div>`
    playerSprite.style.display = 'none';
    piranhaEl.style.display = 'none';
    statContainer.style.display = 'none';
    messageBar.style.display = 'none';
    titleScreen.style.display = 'block';
    gameStartButton.style.display = 'block';
    bottomImage.style.display = 'none';
    allEatingFish.innerHTML = '';
    piranhaTwo.style.display = 'none';
    fishPlayers[0].hull = '20';
    fishPlayers[1].hull = '15';
    fishPlayers[2].hull = '25';
    fishEaten = 0;
    currentLevel = 0;
}


//updating the floor image
const bottomImageUpdate = (image) => {
    bottomImage.innerHTML = `<img src="images/${image}" class ='back-images' alt="river-bed-image">`
}

//player fish seletion at the selection modal
const playerFishSelection = (fishSelection) => {
    newPlayerFish = (fishPlayers[fishSelection]);
    playerSelection.style.display = 'none';
    move = newPlayerFish.speed;
    console.log(newPlayerFish.hull)
}


//selecting a player
const selectPlayer = () => {
    playerSelection.style.display = 'none';
    playerSprite.style.display = 'block';
    piranhaOne.style.display = 'block';
    hullUpdate.innerHTML = newPlayerFish.hull;
    thisFish.innerHTML = newPlayerFish.name;
    thisLevel.innerHTML = '1';
    eaten.innerHTML = '0';
    statContainer.style.display = 'block';
    messageBar.style.display = 'block';
    messageUpdate('THE RIVER OF DESTINY...');
    bottomImageUpdate('riverbed.png')
    fishSpawn(currentLevel)
}


//renders the piranhas spped
const piranhaRender = () =>{
 
    if (currentLevel == 0){
        piranhaOne.style = `
        animation: piranha-one ${newPiranhaFishOne.speed}s ease-in-out infinite;
        display: block`
    }
    else if (currentLevel == 1){
        piranhaOne.style.display = 'none';
        piranhaTwo.style = `
        animation: piranha-two ${newPiranhaFishTwo.speed}s ease-in-out infinite;
        display: block`
    }
    else if (currentLevel == 2){
        //ADD TO CLASS AS A METHOD
        piranhaOne.style.display = 'block';
    }
}

//message bar update
const messageUpdate = (thisMessage) => {
    liveMessage.innerHTML = `<h3>${thisMessage}</h3>`;
}


//fish spawning
const fishSpawn = (currentLevel) => {
    for (i = 0; i < levelParameter[1][currentLevel]; i++){
        //random select fish
        let randomFish = randomSelector(0, levelParameter[0]);
        //select random time
        let randomTime = randomSelector(2, levelParameter[2]);
        fishMoveRender(randomFish, randomTime)
    }
}

//opening the main modal window
const openModal = () => {
    modal.style.display = 'flex';
}

//next window
const nextWindow = () => {
    modal.style.display = 'none';
    allButtons.style.display = 'none';
    titleScreen.style.display = 'none';
    playerSelection.style.display = 'block'
}



const nextLevel = () => {
    //chainging from level 1 to level 0
    if (currentLevel == 0){
        //display level complete
        nextLevelModal.style.display = 'block';
        levelCompleteText.innerHTML = `LEVEL ${currentLevel + 1} COMPLETE. YOU ARE ONE LUCKY FISH`
        //reset numbers
        currentLevel += 1;
        fishEaten = 0;
        eaten.innerHTML = fishEaten;
        thisLevel.innerHTML = currentLevel + 1
        bottomImageUpdate('Seabed.jpg')
        messageUpdate('THE SEA OF SILENCE...')
    }
    else if (currentLevel == 1){
        //display level complete
        nextLevelModal.style.display = 'block';
        levelCompleteText.innerHTML = `LEVEL ${currentLevel + 1} COMPLETE. OMG, YOU ARE REALLY GOOD AT THIS.` 
        //reset
        currentLevel += 1;
        fishEaten = 0;
        eaten.innerHTML = fishEaten;
        thisLevel.innerHTML = currentLevel + 1
        //create new level
        bottomImageUpdate('oceanbed.png')
        messageUpdate('FREEDOM OCEAN...')
    }
    else {
        currentLevel += 1;
        nextLevelModal.style.display = 'block';
        levelCompleteText.innerHTML = `LEVEL ${currentLevel} COMPLETE. YOU ARE FREE!!!
        I COMMEND YOU ${newPlayerFish.name} ON YOUR EFFORTS. HURRY, MORE PIRANHAA ARE COMING, YOU NEED TO SWIM TO SAFETY NOW!`
        restartText.innerHTML = 'RESTART'
        fishEaten = 0
    }
}




//checking if the players mouth hit a fish
const fishCollisionCheck = (food, player) => {
    // console.log(player)
    let foodRect = food.getBoundingClientRect();
    let playerRect = player.getBoundingClientRect(); 
    return (foodRect.right >= playerRect.left && foodRect.left <= playerRect.right) && 
    (foodRect.bottom >= playerRect.top && foodRect.top <= playerRect.bottom);
  }


//render fish move animation, spawn in random y pos
const fishMoveRender = (fish, moveTime) => {
// console.log(moveTime)

    const randomHeight = fishRandomHeight()
    // console.log(randomHeight)
    if (fish === 'gold'){
        currentFish = allEatingFish.innerHTML +=` <div class="fish" id="gold-fish" 
            style= "
            left: 110vw; top: ${randomHeight}vh;
            animation: fishmove ${moveTime}s linear infinite;
            ">
            <div class="fin"></div>
            <div class="mouth"></div>
            <div class="eye">
                <div class="m"></div>
            </div>
            <div class="g"id="gold-gill"></div>
            <div class="t1"id="gold-gill"></div>
            <div class="t2"id="gold-gill"></div>
            </div>`
    }

    else {
        currentFish = allEatingFish.innerHTML +=` <div class="fish" id="${fish}-fish" 
            style= 
            "left: 60vw; top: ${randomHeight}vh;
            animation: fishmove ${moveTime}s linear infinite;">
            <div class="fin" id="${fish}-fin"></div>
            <div class="mouth"></div>
            <div class="eye">
                <div class="m"></div>
            </div>
            <div class="g" id="${fish}-gill"></div>
            <div class="t1" id="${fish}-tail"></div>
            <div class="t2" id="${fish}-tail"></div>
            </div>`
    }
}
   


//checks if level is complete
const fishEatenCheck = (currentFish) => {
    currentFish.style = `display: none;`
    fishEaten += 1;
    eaten.innerHTML = fishEaten;

    if (fishEaten == 7 && currentLevel == 0){
        // messageBar.innerHTML = `ONLY 3 FISH LEFT!`;
        messageUpdate('ONLY 3 FISH lEFT!!')
    }
    else if (fishEaten == 10 && currentLevel == 0){
        currentFish.style = `display: none;`
        nextLevel()
    }
    else if (fishEaten == 12 && currentLevel == 1){
        messageUpdate('ONLY 3 FISH lEFT!!')
    }
    else if (fishEaten == 15 && currentLevel == 1){
        currentFish.style = `display: none;`
        nextLevel()
    }
    else if (fishEaten == 17 && currentLevel == 2){
        messageUpdate('ONLY 3 FISH lEFT!!')
    }
    else if (fishEaten == 20 && currentLevel == 2){
        currentFish.style = `display: none;`
        nextLevel()
    }
}


const playerHealth = () => {
    
    if (newPlayerFish.hull > 0 && newPlayerFish.hull < 10){
        messageUpdate('LESS THAN 10 HEALTH POINTS LEFT!');
    }
    
    if (newPlayerFish.hull <= 0){
        currentLevel = 0;
        fishEaten = 0;
        nextLevelModal.style.display = 'block'
        messageUpdate('YOU LOSE! DEATH BY PIRANHA 💀');
        levelCompleteText.innerHTML = `YOU LOSE! DEATH BY PIRANHA 💀`
        restartText.innerHTML = 'RESTART'
    }
}


//random selector
const randomSelector = (array, iterator) => {
    return levelParameter[array][Math.floor(Math.random() * iterator.length)]
}


// ---------------------------------//
// -------- EVENT LISTENERS --------//
// ---------------------------------//



levelCompleteModalBox.addEventListener('click', () => {
    nextLevelModal.style.display = 'none';
    if (currentLevel == 1 || currentLevel == 2){
        fishSpawn(currentLevel)
        piranhaRender()
    }
    else if (currentLevel == 3){
        console.log('restting after final level')
        gameReset()
    }
 
    if (newPlayerFish.hull <= 0) {
        gameReset()
    }

})


salmonSelection.addEventListener('click', () => {
    playerSprite.innerHTML += `<img src="images/salomoneymaker-removebg-preview-modified.png" alt="">`;
    playerFishSelection(1);
    selectPlayer();
})

troutSelection.addEventListener('click', () => {
    playerSprite.innerHTML += `<img src="images/trickytrout-removebg-preview.png" alt="">`
    playerSelection.style.display = 'none';
    playerFishSelection(2);
    selectPlayer();

})

dogfishSelection.addEventListener('click', () => {
    playerSprite.innerHTML += `<img src="images/dogfishbossone-modified-removebg-preview.png" alt="">`
    playerSelection.style.display = 'none';
    playerFishSelection(0);
    selectPlayer()
})

//the start game button
gameStartButton.addEventListener('click', openModal)

//moves into the next window for fish selection
continueBtn.addEventListener('click', nextWindow)

//statrting position of the player
window.addEventListener('load', () => {
    playerSprite.style = `position: abolsute;
    left: 0;
    top: 100px;`
});


//when you hit an arrow key
window.addEventListener('keydown', (evt) => {
    switch(evt.key){
        case 'ArrowLeft':
           
            // playerSprite.style = 'transform: rotate(180deg);'
            // playerSprite.style = 'transform: rotateY(180deg);'
            playerSprite.style.left = parseInt(playerSprite.style.left) - move + 'px';
            break;

        case 'ArrowRight': 
            playerSprite.style.left = parseInt(playerSprite.style.left) + move + 'px';
            break;

        case 'ArrowUp':  
            // playerSprite.style = 'transform: rotate(-90deg);'
            playerSprite.style.top = parseInt(playerSprite.style.top) - move + 'px';
            break;

        case 'ArrowDown':  
            playerSprite.style.top = parseInt(playerSprite.style.top) + move + 'px';
            break;
    }
    
    const playerBody = document.querySelector('.player-sprite > img')
    const playerMouth = document.querySelector('.mouth-contact')
    const allFishEls = document.querySelectorAll('.fish')
    
    allFishEls.forEach((thisFish)=>{
        if (fishCollisionCheck(thisFish, playerMouth)) {
            fishEatenCheck(thisFish)
        }
    })
    
   
    if (fishCollisionCheck(playerBody, piranhaOneContact)){
        if (currentLevel == 0 || currentLevel == 2){
            playerBody.style = `animation: sprite-hit 1s linear;`
            newPlayerFish.hull = newPlayerFish.hull - newPiranhaFishOne.hitpoints;
            hullUpdate.innerHTML = newPlayerFish.hull;
            console.log(newPlayerFish.hull)
            playerHealth()
        }
       
    }
    else if (fishCollisionCheck(playerBody, piranhaTwoContact)){
        if (currentLevel == 1 || currentLevel == 2){
            playerBody.style = `animation: sprite-hit 1s linear;`
            newPlayerFish.hull = newPlayerFish.hull - newPiranhaFishTwo.hitpoints;
            hullUpdate.innerHTML = newPlayerFish.hull;
            console.log(newPlayerFish.hull)
            playerHealth()
        }
        
    }
});






// fishSpawn(currentLevel)

// piranhaMoveRender()








// let modifier = 5;

// window.addEventListener('keydown', (evt) => {
//     const {style} = playerSprite;
//     switch (evt.key){
//         case 'ArrowUp': style.top = `${parseInt(style.top) - modifier}`; break;
//         case 'ArrowDown': style.top = `${parseInt(style.top) + modifier}`; break;
//     }
// })



// window.addEventListener('keydown', checkKeyPress, false);


// function checkKeyPress(key){
//     if (key.keyCode == '65'){
//         // alert('the left arrow was pressed')
//         playerSprite.style = 'transform: rotate(180deg);'
//         playerSprite.style = 'transform: rotateY(180deg);'
//     }

//     else if (key.keyCode == '68'){
//         //right using d
//         playerSprite.style = `transform: rotate(0deg);`
//         // playerSprite.style = 'animation: sprite-animation 1s infinite;'
//     }

//     else if (key.keyCode == '87'){
//         // move up with w
//         playerSprite.style = 'transform: rotate(-90deg);'
//         // playerSprite.style = 'animation: sprite-animation 1s infinite;'

//     }
    
//     else if (key.keyCode == '83'){
//         // down using s
//         playerSprite.style = 'transform: rotate(90deg);'

//     }   
    

//     else if (key.keyCode == '69'){
//         //up and right using e
//         playerSprite.style = 'transform: rotate(-30deg);'
      
//     }   

//     else if (key.keyCode == '88'){
//         //down and right with x
//         playerSprite.style = 'transform: rotate(30deg);'

//     }   
//     else if (key.keyCode == '81'){
//         //down and right with x
        
//         playerSprite.style = 'transform: rotate(-150deg);'
//         playerSprite.style = 'transform: rotateY(-180deg);'

//     }   


// }



