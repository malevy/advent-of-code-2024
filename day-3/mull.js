import fs from "fs";

async function part1() {
  const pattern = /mul\((\d{1,3}),(\d{1,3})\)/gm;

  const input = await fs.promises.readFile("input.txt", "utf-8");

  const matches = input.matchAll(pattern);
  let total = 0;
  for (const match of matches) {
    total += parseInt(match[1]) * parseInt(match[2]);
  }
  console.log(total);
}

async function part2() {
  const pattern = /don't\(\)|do\(\)|mul\((\d{1,3}),(\d{1,3})\)/gm;

  const input = await fs.promises.readFile("input.txt", "utf-8");

  const matches = input.matchAll(pattern);
  let total = 0;
  let include = true;
  for (const match of matches) {
    if (match[0] === "don't()") include = false;
    else if (match[0] === "do()") include = true;
    else if (include) total += parseInt(match[1]) * parseInt(match[2]);
  }
  console.log(total);
}

part2();
