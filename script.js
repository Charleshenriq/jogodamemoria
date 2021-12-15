const cartaf = document.querySelectorAll('.carta');
let viradas = false;
let naoDescoberta = false;
let primeiraCarta, segundaCarta;

function virar() {
    if (naoDescoberta) return;
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

const parabens = document.getElementById("parabensaba");


function checar() {
    if (primeiraCarta.dataset.carta === segundaCarta.dataset.carta) {
        desabilitar();
        return;
    }

    desvira();
}

function desabilitar() {
    primeiraCarta.removeEventListener('click', virar);
    segundaCarta.removeEventListener('click', virar);
    resetaTab();
}

function desvira() {
    naoDescoberta = true;

    setTimeout(() => {
        primeiraCarta.classList.remove('vira');
        segundaCarta.classList.remove('vira');

        resetaTab();
    }, 1500);
}

function resetaTab() {
    [viradas, naoDescoberta] = [false, false];
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