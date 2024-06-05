# Jogo da Velha

Este projeto é um simples jogo da velha (tic-tac-toe) implementado em JavaScript. Os jogadores se revezam para marcar células em uma grade 3x3, e o objetivo é ser o primeiro a alinhar três de seus símbolos (X ou O) horizontalmente, verticalmente ou diagonalmente.

## Funcionalidades

- Dois jogadores (X e O) se revezam para jogar.
- Verificação de vitória e empate.
- Exibição de mensagens de vitória ou empate.
- Reiniciar o jogo sem recarregar a página.

## Estrutura do Código

O código é composto pelas seguintes partes principais:

### Seleção de Elementos do DOM

```javascript
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelectorAll("[data-board]");
const winningMessageText = document.querySelector("[data-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");
const messagePanel = document.querySelector("[data-panel-message]");
```

### Definição de Variáveis e Combinações Vencedoras
```javascript

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
```
### Função para Iniciar o Jogo
```javascript
const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });   
    } 

    messagePanel.innerText = "Vez do (X) Jogar!";
    isCircleTurn = false;

    winningMessage.classList.remove("show-winner-message");
};
```
### Função para Finalizar o Jogo
```javascript

const fimDeJogo = (isDraw) => {
    if(isDraw) {
        winningMessageText.innerText ="Empate!"
    } else {
        winningMessageText.innerText = isCircleTurn ? "Círculo Venceu!" : "X Venceu!";
    }
    winningMessage.classList.add("show-winner-message");
    messagePanel.innerText = "";
};
```
### Função para Verificar a Vitória
```javascript
const checkForWin = (currentPlayer) => {
    return combinacoes.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};
```
### Função para Marcar a Célula
```javascript
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};
```

### Função para Verificar Empate
```javascript
const checkForDrawn = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};
```

### Função para Alternar Mensagem de Painel
```javascript
const swapPanelMessage = () => {
    if(!isCircleTurn) {
        messagePanel.innerText = "Vez do (O) Jogar!";
    } else {
        messagePanel.innerText = "Vez do (X) Jogar!";
    }
};
```

### Função para Alternar Turnos
```javascript
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
};
```

### Função de Clique
```javascript
const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const ganhador = checkForWin(classToAdd);
    const empate = checkForDrawn();
   
    if(ganhador) {
        fimDeJogo(false);
    } else if(empate) {
        fimDeJogo(true);
    } else {
        swapPanelMessage();
    }

    swapTurns();
};
```

### Início do Jogo e Reinicialização
```javascript
startGame();

restartButton.addEventListener("click", startGame);
```

## Como Executar
1. Clone este repositório.
    ```bash
    git clone https://github.com/igorssobral/jogo-da-velha.git

2. Navegue até o diretório do projeto.
    ```bash
    cd jogo-da-velha

3. Abra o arquivo index.html em um navegador.
    ```bash
    open index.html

4. Ou abra o jogo pelo Link abaixo.
   
   [Jogo Da Velha](https://jogo-da-velha-smoky-alpha.vercel.app/)
   
### Divirta-se jogando!
