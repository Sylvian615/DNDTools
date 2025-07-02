function calcDiceEx(diceNum) {
  let sum = 0;
  for (let i = 1; i < diceNum + 1; i++) {
    sum += i;
  }
  return sum / diceNum;
}

// 计算武器额外特性期望
function calcItemEx(battleItem) {
  const itemTitle = battleItem.title;
  const diceValue = battleItem.diceValue || 0;
  const constanceValue = Number(battleItem.constantValue) || 0;
  const attAdd =
    charAttModifier[Att2Idx[battleItem.attBind]] *
    (Number(battleItem.attMul) || 0);
  let diceEx = 0;
  if (diceValue) {
    const diceSplit = diceValue.split("d");
    const diceMul = Number(diceSplit[0]);
    const diceNum = Number(diceSplit[1]);
    diceEx = diceMul * calcDiceEx(diceNum);
  }
  let itemEx = diceEx + constanceValue + attAdd;
  let itemDetails = `${itemEx} (${battleItem.title})`;
  return { itemEx, itemDetails, itemTitle };
}

// 计算武器期望
function calcWeaponEx(WeaponItem, weaponAdds) {
  const diceValue = WeaponItem.diceValue || 0;
  const constanceValue = Number(WeaponItem.constantValue) || 0;
  const attAdd =
    charAttModifier[Att2Idx[WeaponItem.attBind]] *
    (Number(WeaponItem.attMul) || 0);
  let diceEx = 0;
  let diceMul = 0;
  let diceNum = 0;
  if (diceValue !== 0) {
    const diceSplit = diceValue.split("d");
    diceMul = Number(diceSplit[0]);
    diceNum = Number(diceSplit[1]);
    diceEx = diceMul * calcDiceEx(diceNum);
  }
  let itemEx = diceEx + constanceValue + attAdd;
  let itemDetails = `[[${itemEx} (${WeaponItem.title}) = ${diceEx} (${diceValue}) + ${constanceValue} (常值) + ${attAdd} (${WeaponItem.attBind}修正)] * ${diceMul}] `;

  weaponAdds = weaponAdds || [];
  if (weaponAdds.length > 0) {
    for (let i = 0; i < weaponAdds.length; i++) {
      const tempWeaponAdd = calcItemEx(weaponAddList[weaponAdds[i]]);
      if (tempWeaponAdd.itemTitle === "猛力攻击") {
        itemEx += tempWeaponAdd.itemEx * diceMul * WeaponItem.attMul;
        itemDetails += `+ [${tempWeaponAdd.itemEx * diceMul * WeaponItem.attMul} = [${tempWeaponAdd.itemDetails} * ${WeaponItem.attMul}] * ${diceMul}]`;
      } else {
        itemEx += tempWeaponAdd.itemEx * diceMul;
        itemDetails += `+ [${tempWeaponAdd.itemDetails} * ${diceMul}]`;
      }
    }
  }
  return { itemEx, itemDetails };
}

function calcGroupEx(groupList) {
  // console.log("groupList", groupList, groupList.length);
  let groupEx = 0;
  let groupDetails = ``;
  for (let i = 0; i < groupList.length; i++) {
    const tempItem = charBattleItems[groupList[i][0]];
    const weaponAdds = groupList[i][1];
    const tempItemEx = calcWeaponEx(tempItem, weaponAdds);
    groupEx += tempItemEx.itemEx;
    groupDetails += ` ${tempItemEx.itemEx} = ${tempItemEx.itemDetails} \n`;
  }
  return { groupEx, groupDetails };
}

// {title: "", diceValue: "", constantValue: ,attBind: "力量", attMul: 1,}
const charBattleItems = {
  啮咬: {
    title: "1啮咬",
    diceValue: "1d4",
    constantValue: 0,
    attBind: "力量",
    attMul: 1.5,
  },
  爪抓: {
    title: "2爪抓",
    diceValue: "2d3",
    constantValue: 0,
    attBind: "力量",
    attMul: 1,
  },
};

const weaponAddList = {
  猛力攻击: {
    title: "猛力攻击",
    diceValue: "",
    constantValue: 4,
    attBind: "力量",
    attMul: 0,
  },
};

// 角色战斗选项
// CBI --> charBattleItems
// FCGE --> function calcGroupEx
const FCGE = calcGroupEx;
const charBattleOptions = [
  ["1啮咬", FCGE([["啮咬", []]])],
  ["1啮咬猛力", FCGE([["啮咬", ["猛力攻击"]]])],
  ["2爪抓", FCGE([["爪抓", []]])],
  ["2爪抓猛力", FCGE([["爪抓", ["猛力攻击"]]])],
  [
    "全回合",
    FCGE([
      ["啮咬", []],
      ["爪抓", []],
    ]),
  ],
  [
    "全回合猛力",
    FCGE([
      ["啮咬", ["猛力攻击"]],
      ["爪抓", ["猛力攻击"]],
    ]),
  ],
];
