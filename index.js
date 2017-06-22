import readline from 'readline';
import validate from './validation';
import { add, getYield } from './helpers';

const WIN_COMMISSION = 15;
const PRICE_COMMISSION = 12;
const EXACTA_COMMISSION = 18;

let winBets = new Map();
let priceBets = new Map();
let exactaBets = new Map();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.input.setEncoding('utf8');
rl.output.write('\x1B[2J\x1B[0f');
rl.output.write('Please provide input: \n');

rl.on('line', (line) => {
    if (line !== null && line !== '') {
      const entry = line.trim().split(':');
      const validation = validate(entry);

      if (!validation.valid) {
        console.log(...validation.msg);
        rl.output.write('\nPlease provide correct input!\n\n');
        rl.output.write('Application will not stop...\n\n');
        rl.close();
      }

      if (entry[0] === 'Bet') {
        switch(entry[1]) {
          case 'W':
            winBets = add(winBets, entry[2], entry[3]);
            break;
          case 'P':
            priceBets = add(priceBets, entry[2], entry[3]);
            break;
          case 'E':
            exactaBets = add(exactaBets, entry[2], entry[3]);
            break;
          default:
            rl.output.write('\n\nSomething went wrong...\n\n');
            rl.close();
        }
      }

      if (entry[0] === 'Result') {
        rl.output.write('\x1B[2J\x1B[0f');
        rl.output.write('Results: \n');
        const exactaWin = entry[1] + ',' + entry[2];
        rl.output.write('\nW:' + entry[1] + ':$' + getYield(winBets, entry[1], WIN_COMMISSION));
        rl.output.write('\nP:' + entry[1] + ':$' + getYield(priceBets, entry[1], PRICE_COMMISSION, 3));
        rl.output.write('\nP:' + entry[2] + ':$' + getYield(priceBets, entry[2], PRICE_COMMISSION, 3));
        rl.output.write('\nP:' + entry[3] + ':$' + getYield(priceBets, entry[3], PRICE_COMMISSION, 3));
        rl.output.write('\nE:' + exactaWin + ':$' + getYield(exactaBets, exactaWin, EXACTA_COMMISSION));
      }
    }
});
