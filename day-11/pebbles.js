// const input = `0 1 10 99 999`;
// const input = `125 17`;
const input = `4329 385 0 1444386 600463 19 1 56615`;

let stones = input.split(" ").map(Number);

const numberOfDigits = (n) => Math.floor(Math.log10(n) + 1);

// map of maps. initial key is the level
const cache = new Map();

const splitValue = (n) => {
    const digitCount = numberOfDigits(n);

    if (digitCount % 2 === 1)
        throw new Error("only works on numbers with even digit count");

    const factor = Math.pow(10, digitCount / 2);

    const left = Math.floor(n / factor);
    const right = Math.floor(n % factor);
    return [left, right];
};

function blink(stone, times) {
    // console.log({ stone, times });

    if (times >= 20) {
        if (cache.has(times) && cache.get(times).has(stone)) {
            return cache.get(times).get(stone);
        }
    }

    let value = 0;

    if (times === 0) {
        value = 1;
    } else if (stone === 0) {
        value = blink(1, times - 1);
    } else if (numberOfDigits(stone) % 2 === 0) {
        const [left, right] = splitValue(stone);
        value = blink(left, times - 1) + blink(right, times - 1);
    } else {
        value = blink(stone * 2024, times - 1);
    }

    if (times >= 25) {
        const levelCache = cache.get(times) || new Map();
        levelCache.set(stone, value);
        cache.set(times, levelCache);
    }

    return value;
}

let total = 0;
const iterations = 75;
for (let stone of stones) {
    total += blink(stone, iterations);
}

console.log(total);
