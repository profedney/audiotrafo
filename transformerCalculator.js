document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculateTransformer);

    function calculateTransformer() {
        const power = parseFloat(document.getElementById('power').value);
        const primaryImpedance = parseFloat(document.getElementById('primaryImpedance').value);
        const secondaryImpedance = parseFloat(document.getElementById('secondaryImpedance').value);
        const frequency = parseFloat(document.getElementById('frequency').value);

        const Bm = 11300.0;
        const DC = 3.0;

        const Vi = Math.sqrt(power * primaryImpedance);
        const Ii = power / Vi;

        const Vo = Math.sqrt(power * secondaryImpedance);
        const Io = power / Vo;

        const Si = Ii / DC;
        const So = Io / DC;

        const Bitolai = 2 * Math.sqrt(Si / (3.14159265));
        const Bitolao = 2 * Math.sqrt(So / (3.14159265));

        const Sm = 7.5 * Math.sqrt((1.5 * power) / frequency);
        const Sg = 1.1 * Sm;

        const L = parseFloat(prompt('Largura da perna central (cm):'));
        const H = parseFloat(prompt('Empilhamento do núcleo (cm):'));

        const Sgo = L * H;
        const Smo = Sgo / 1.1;

        let AWG = 0;
        let Wi = 0, Wo = 0;

        // Loop para calcular a bitola no primário
        while (Bitolai < (0.005 * 92 ** ((36 - AWG) / 39) * 25.4)) {
            AWG++;
        }
        Wi = AWG - 1;

        AWG = 0;

        // Loop para calcular a bitola no secundário
        while (Bitolao < (0.005 * 92 ** ((36 - AWG) / 39) * 25.4)) {
            AWG++;
        }
        Wo = AWG - 1;

        const Ni = Math.floor(Vi * 100000000 / (4.44 * Bm * Smo * frequency));
        const No = Math.floor(Vo / Vi * Ni);

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <p>Tensão no primário (V): ${Vi.toFixed(2)}</p>
            <p>Corrente no primário (A): ${Ii.toFixed(2)}</p>
            <p>Espiras no primário: ${Ni}</p>
            <p>Bitola no primário (AWG): ${Wi}</p>
            <p>Espiras no secundário: ${No}</p>
            <p>Bitola no secundário (AWG): ${Wo}</p>
        `;
    }
});
