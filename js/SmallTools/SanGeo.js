/**
 * The SacredGeometry object is a calculator for the pathfinder Sacred Geometry
 * feat.
 */
const SacredGeometry = {};
SacredGeometry.MAX_SPELL_LEVEL = 9;
SacredGeometry.MIN_SPELL_LEVEL = 1;
SacredGeometry.MAX_ITERATIONS = 1000000;
SacredGeometry.OPERATORS = ["+", "-", "*", "/"];
SacredGeometry.PRIME_CONSTANTS = [
  [3, 5, 7],
  [11, 13, 17],
  [19, 23, 29],
  [31, 37, 41],
  [43, 47, 53],
  [59, 61, 67],
  [71, 73, 79],
  [83, 89, 97],
  [101, 103, 107],
];

SacredGeometry.isValidSpellLevel = function (spellLevel) {
  var num = parseInt(spellLevel);
  return (
    !isNaN(num) &&
    num >= SacredGeometry.MIN_SPELL_LEVEL &&
    num <= SacredGeometry.MAX_SPELL_LEVEL
  );
};

/**
 * Returns whether or not roll is a valid dice roll for the sacred
 * geometry feat. It has to be a number between 1 and 8 inclusive.
 */
SacredGeometry.isValidRoll = function (roll) {
  const num = parseInt(roll);
  return !isNaN(num) && num >= 1 && num <= 8;
};

/**
 * Determines whether or not the total is a valid prime for the
 * given spell level for the sacred geometry feat.
 */
SacredGeometry.isPrime = function (total, spellLevel) {
  return SacredGeometry.PRIME_CONSTANTS[spellLevel - 1].indexOf(total) !== -1;
};

/**
 * General purpose array shuffling function.
 */
SacredGeometry.shuffle = function (array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
};

SacredGeometry.calculate = function (spellLevel, rolls) {
  let total = 0;
  for (
    var iteration = 0;
    iteration < SacredGeometry.MAX_ITERATIONS &&
    !SacredGeometry.isPrime(total, spellLevel);
    iteration++
  ) {
    var operators = [];
    rolls = SacredGeometry.shuffle(rolls);
    total = rolls[0];
    for (let i = 1; i < rolls.length; i++) {
      let operator =
        SacredGeometry.OPERATORS[
          Math.floor(Math.random() * SacredGeometry.OPERATORS.length)
        ];
      let currentDie = rolls[i];
      switch (operator) {
        case "+":
          total += currentDie;
          break;
        case "-":
          // avoid negatives or 0s by not doing subtraction when it is not positive
          if (total > currentDie) {
            total -= currentDie;
          } else {
            total *= currentDie;
            operator = "*";
          }
          break;
        case "*":
          total *= currentDie;
          break;
        case "/":
          // avoid negatives or 0s by not doing division when it is not positive
          if (total % currentDie === 0) {
            total /= currentDie;
          } else {
            total += currentDie;
            operator = "+";
          }
          break;
      }
      operators.push(operator);
    }
  }

  // either return an object with the solution or null
  if (SacredGeometry.isPrime(total, spellLevel)) {
    return {
      result: total,
      dice: rolls,
      operations: operators,
      loops: iteration,
    };
  }
  return null;
};

/**
 * Given a spell level, a string representing the dice rolls, and a boolean
 * for if the number of guesses should be shown, this function does the
 * Sacred Geometry calculation and returns a result string.
 */
SacredGeometry.predict = function (spellLevel, dice, showGuesses) {
  // validate spell level and rolls exist
  if (!(spellLevel && dice)) {
    return "法术环位或骰子值非法。";
  }

  // validate spell level
  if (!SacredGeometry.isValidSpellLevel(spellLevel)) {
    return spellLevel + " 是非法环位。请输入环位1-9";
  }

  // validate there are enough dice
  if (dice.length < 2) {
    return "骰子数不能小于2";
  }

  // transform dice string into an array of numbers
  var rolls = [];
  for (var i = 0; i < dice.length; i++) {
    var roll = dice.charAt(i);
    if (!SacredGeometry.isValidRoll(roll)) {
      return roll + " 非法骰子值。请输入骰子值1-8";
    }
    rolls.push(parseInt(roll));
  }
  const primes = SacredGeometry.PRIME_CONSTANTS[spellLevel - 1];
  const need_primes =
    "[ " + primes[0] + ", " + primes[1] + ", " + primes[2] + "]";
  // do the calculation and display the results
  var result = SacredGeometry.calculate(spellLevel, rolls);
  if (result) {
    let display = "" + result.dice[0] + result.operations[0] + result.dice[1];
    for (let i = 1; i < result.operations.length; i++) {
      // wrap with parenthesis to show correct ordering
      display =
        "(" + display + ") " + result.operations[i] + result.dice[i + 1];
    }
    display += " = " + result.result;

    if (showGuesses) {
      display +=
        " （所需素数 " +
        need_primes +
        "，" +
        "预测次数 " +
        result.loops +
        "次）";
    }
    return display;
  }

  return "计算失败，所需素数为 " + need_primes + "。";
};

function calSanGeo() {
  return {
    spellLevel: "",
    dice: "",
    resultSanGeo: "",
    predictSanGeo() {
      this.resultSanGeo = SacredGeometry.predict(
        this.spellLevel,
        this.dice,
        true,
      );
    },
    resetSanGeo() {
      this.spellLevel = "";
      this.dice = "";
      this.resultSanGeo = "";
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.resultSanGeo);
    },
  };
}
