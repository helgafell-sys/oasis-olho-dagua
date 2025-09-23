
const toggleBtn = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu ul');

toggleBtn.addEventListener('click', () => {
    menuList.classList.toggle('show');
});



function contarFinsDeSemana(inicio, fim) {
    let count = 0;
    let d = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate());
    const end = new Date(fim.getFullYear(), fim.getMonth(), fim.getDate());

    while (d < end) {
        const dia = d.getDay(); // 0 = domingo, 6 = sábado
        if (dia === 0 || dia === 6) count++;
        d.setDate(d.getDate() + 1);
    }
    return count;
}

document.getElementById('reservaForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const tipo = document.getElementById('tipo').value;
    const checkin = new Date(document.getElementById('checkin').value);
    const checkout = new Date(document.getElementById('checkout').value);
    const hospedes = parseInt(document.getElementById('hospedes').value, 10);

    if (!tipo) {
        alert("Selecione o tipo de locação.");
        return;
    }

    if (checkout <= checkin) {
        alert("A data de check-out deve ser após o check-in.");
        return;
    }

    const msPorDia = 1000 * 60 * 60 * 24;
    const dias = Math.round((checkout - checkin) / msPorDia);

    let valorDiaria = 0;

    if (tipo === "evento") {
        valorDiaria = hospedes > 30 ? 2750 : 2250;
    } else if (tipo === "temporada") {
        if (hospedes > 15) {
            alert(
                "Quantidade de hóspedes desejada excede o limite comportado pelo nosso serviço.\n" +
                "Por favor, entrar em contato por algum dos métodos listados abaixo."
            );
            return;
        }
        valorDiaria = 1750;

        const diasFimSemana = contarFinsDeSemana(checkin, checkout);
        const diasUteis = dias - diasFimSemana;
        const total = diasUteis * valorDiaria + diasFimSemana * 4000;

        document.getElementById('resultado').textContent =
            `Tipo: ${tipo}. ${dias} diárias (${diasFimSemana} fim de semana). Valor estimado: R$ ${total.toFixed(2)}.`;
        return;
    }

    const total = dias * valorDiaria;
    document.getElementById('resultado').textContent =
        `Tipo: ${tipo}. Reserva de ${dias} diárias para ${hospedes} hóspede(s). Valor estimado: R$ ${total.toFixed(2)}.`;
});
