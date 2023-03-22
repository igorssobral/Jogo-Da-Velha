const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelectorAll("[data-board]");
const winningMessageText = document.querySelector("[data-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const messagePanel = document.querySelector("[data-panel-message]");

let isCircleTurn;

var combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const startGame = () =>{
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, {once: true});   
} 

messagePanel.innerText = "Vez do (X) Jogar!";
isCircleTurn = false;

winningMessage.classList.remove("show-winner-message");
};


const fimDeJogo = (isDraw) =>{
    if(isDraw){
      winningMessageText.innerText ="Empate!"
    }else{
        winningMessageText.innerText = isCircleTurn ? "Circulo Venceu!" : "X Venceu!";
    }
    winningMessage.classList.add("show-winner-message");
    messagePanel.innerText = "";
};
const checkForWin = (currentPlayer) =>{
    return combinacoes.some((combination)=>{
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark =(cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const checkForDrawn = () =>{
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    });

};
const swapPanelMessage = () =>{
    if(!isCircleTurn){
        messagePanel.innerText = "Vez do (O) Jogar!";
    }else{
        messagePanel.innerText = "Vez do (X) Jogar!";
    }
};
const swapTurns = () =>{
    isCircleTurn = !isCircleTurn;
};


const handleClick = (e) => {
    const cell = e.target;
    console.log(cell.value);
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const ganhador = checkForWin(classToAdd);
    const empate = checkForDrawn();
   
    if(ganhador){
        fimDeJogo(false);
    }else if(empate){
        fimDeJogo(true);
    }else{
        swapPanelMessage();
    }

    swapTurns();
};
startGame();

restartButton.addEventListener("click", startGame);