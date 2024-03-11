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
    const [P, V] = data[0].split(' ').map(Number);
    const [Q, M] = data[1].split(' ').map(Number);

    let result = 0;

    const minV = P - V;
    const maxV = P + V;
    const minM = Q - M;
    const maxM = Q + M;

    const isSeparate = maxV < minM || maxM < minV;
    const isNested = (minV <= minM && maxV >= maxM) || (minM <= minV && maxM >= maxV);

    const getLength = (minT, maxT) => {
        if (maxT === 0 || minT === 0 || Math.sign(minT) === Math.sign(maxT)) {
            return Math.abs(maxT - minT) + 1;
        }
        return Math.abs(minT) + Math.abs(maxT) + 1;
    };

    if (isSeparate) {
        result = (2 * V + 1) + (2 * M + 1);
    } else if (isNested) {
        result = getLength(Math.min(minV, minM), Math.max(maxV, maxM));
    } else {
        let minI = 0;
        let maxI = 0;

        if (minV <= minM) {
            maxI = maxV;
            minI = minM;
        } else {
            maxI = maxM;
            minI = minV;
        }

        result = 2 * V + 2 * M + 2 - getLength(minI, maxI);
    }

    return result;
};