const cartaf = document.querySelectorAll('.carta');
let viradas = false;
let lockBoard = false;
let primeiraCarta, segundaCarta;


function virar() {
    if (lockBoard) return;
    if (this === primeiraCarta) return;

    this.classList.add('vira');

    if (!viradas) {
        viradas = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    viradas = false;

    checar();
}


function checar() {
    if (primeiraCarta.dataset.carta === segundaCarta.dataset.carta) {
        disableCards();
        return;
    }

    desvira();
}

function disableCards() {
    primeiraCarta.removeEventListener('click', virar);
    segundaCarta.removeEventListener('click', virar);

    resetBoard();
}

function desvira() {
    lockBoard = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('vira');
        segundaCarta.classList.remove('vira');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCarta, lockBoard] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function shuffle() {
    cartaf.forEach((carta) => {
        let aleatorio = Math.floor(Math.random() * 12);
        carta.style.order = aleatorio;
    })
})();

cartaf.forEach((carta) => {
    carta.addEventListener('click', virar);
});
