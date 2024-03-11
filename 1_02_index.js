const { createInterface } = require("readline");

const lines = [];

createInterface({
    input: process.stdin,
    output: process.stdout,
}).on("line", (line) => {
    lines.push(line.toString().trim());
}).on("close", () => {
    console.log(countPaintedTrees(lines));
});

const countPaintedTrees = (data) => {
    const [f1, s1] = data[0].split(':').map(Number);
    const [f2, s2] = data[1].split(':').map(Number);
    const field = Number(data[2]);

    const isPlayingInGuest = field === 1;
    const fg = isPlayingInGuest ? f2 : f1;
    const sg = isPlayingInGuest ? s1 : s2;

    const delta = (f1 + f2) - (s1 + s2);
    const deltaG = isPlayingInGuest ? fg + Math.abs(delta) - sg : fg - sg;

    return delta > 0 ? 0 : Math.abs(delta) + (deltaG > 0 ? 0 : 1);
};