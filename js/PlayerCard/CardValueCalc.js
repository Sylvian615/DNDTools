// 角色属性
// 属性名称索引
const attMap = {
  str: 0,
  dex: 1,
  con: 2,
  int: 3,
  wis: 4,
  cha: 5,
};

// 属性值汇总
const charAttValue = [
  setCharAtt(attStr),
  setCharAtt(attDex),
  setCharAtt(attCon),
  setCharAtt(attInt),
  setCharAtt(attWis),
  setCharAtt(attCha),
];
// 属性调整值汇总
const charAttModifier = [
  setCharAttModVale(charAttValue[0].attValue),
  setCharAttModVale(charAttValue[1].attValue),
  setCharAttModVale(charAttValue[2].attValue),
  setCharAttModVale(charAttValue[3].attValue),
  setCharAttModVale(charAttValue[4].attValue),
  setCharAttModVale(charAttValue[5].attValue),
];

// 角色速度
const charSpeed = DragonAge2Speed[DragonAge2Size[DragonAge]];

// 豁免
const charSavingThrows = setCharSavingThrow(
  charJobs,
  charAttModifier[attMap.con],
  charAttModifier[attMap.dex],
  charAttModifier[attMap.wis],
);

// 角色BAB
const charBAB = setCharBAB(charJobs);

// 角色CMB
const charCMB = setCharCMB();

// 角色CMD
const charCMD = setCharCMD();

// 角色 HP
const charHP = setCharHP(charJobs, charAttModifier[2]);

// 角色的先攻加值构成
// [加值, 说明, 是否启用]
const charInitiative = setCharInitiative(
  charInitiativeInfos,
  charAttModifier[1],
);

// 角色攻击加值AB 即命中
const charAB = setCharAB(
  charBAB,
  charAttModifier[0],
  charAttModifier[1],
  Size2AC[DragonAge2Size[DragonAge]],
);

//  角色法术抗力
const charSR =
  Number(DragonAge2Idx[DragonAge] >= 4) * (11 + Number(charJobs[0][0]));

// untils
// 计算角色等级与职业
function setCharJobs(charJobs) {
  let tempJobs = "";
  for (let i = 0; i < charJobs.length; i++) {
    if (i === 0) {
      tempJobs += charJobs[i][0] + charJobs[i][1];
    } else {
      tempJobs += "/" + charJobs[i][0] + charJobs[i][1];
    }
  }
  return tempJobs;
}
// 计算角色属性值与属性值的来源
function setCharAtt(attCfg) {
  let tempValue = 0;
  let tempDetails = "";
  for (let i = 0; i < attCfg.length; i++) {
    if (attCfg[i][2] === true) {
      tempValue += attCfg[i][0];
      tempDetails += `${attCfg[i][0]} [${attCfg[i][1]}] \n`;
    }
  }
  return {
    attValue: tempValue,
    attDetails: tempDetails,
  };
}
// 计算角色属性调整值
function setCharAttModVale(attValue) {
  return Math.floor((attValue - 10) / 2);
}

// 计算角色总技能点
function setSkillsTotalPoints(charJobs, skillAtt) {
  let totalPoints = Number(charJobs[0][2]) * 3;
  for (let i = 0; i < charJobs.length; i++) {
    const tempPoint =
      (Number(charJobs[i][2]) + Number(charAttModifier[attMap[skillAtt]])) *
      Number(charJobs[i][0]);
    totalPoints += tempPoint;
  }
  return totalPoints;
}

function setAllUsedSkillsPoints(charSkills) {
  let totalUsedPoints = 0;
  for (let i = 0; i < charSkills.length; i++) {
    totalUsedPoints += Number(charSkills[i][3]);
  }
  return totalUsedPoints;
}

//角色AC计算
function setCharAC(charACInfos) {
  charACInfos.push([charAttModifier[attMap.dex], "敏捷修正加值", true]);
  charACInfos.push([
    Size2AC[DragonAge2Size[DragonAge]],
    `体型加值-${DragonAge}-${DragonAge2Size[DragonAge]}`,
    true,
  ]);
  let totalAC = 10;
  let totalACDetails = "10 [基础]\n";
  let touchAC = 10;
  let touchACDetails = "10 [基础]\n";
  for (let i = 0; i < charACInfos.length; i++) {
    if (charACInfos[i][2] === true) {
      totalAC += charACInfos[i][0];
      totalACDetails +=
        String(charACInfos[i][0]) + " [" + charACInfos[i][1] + "]\n";

      if (i > 2) {
        touchAC += charACInfos[i][0];
        touchACDetails +=
          String(charACInfos[i][0]) + " [" + charACInfos[i][1] + "]\n";
      }
    }
  }
  return { totalAC, totalACDetails, touchAC, touchACDetails };
}

// 角色豁免计算
function setCharSavingThrow(charJobs, conModifier, dexModifier, wisModifier) {
  let Fortitude = conModifier; // 强韧
  let Reflex = dexModifier; // 反射
  let Will = wisModifier; // 意志
  for (let i = 0; i < charJobs.length; i++) {
    const tempJobName = charJobs[i][1];
    const tempJobLevel = charJobs[i][0];
    const tempSavingMap = Job2SavingAdd[tempJobName];
    Fortitude += selectSavingThrowExpr(tempSavingMap[0], Number(tempJobLevel));
    Reflex += selectSavingThrowExpr(tempSavingMap[1], Number(tempJobLevel));
    Will += selectSavingThrowExpr(tempSavingMap[2], Number(tempJobLevel));
  }
  return { Fortitude: Fortitude, Reflex: Reflex, Will: Will };
}

// 角色BAB计算
function setCharBAB(charJobs) {
  let bab = 0;
  for (let i = 0; i < charJobs.length; i++) {
    const tempJobName = charJobs[i][1];
    const tempJobLevel = Number(charJobs[i][0]);
    const tempBABMap = Job2BAB[tempJobName];
    bab += selectBABExpr(tempBABMap, tempJobLevel);
  }
  return bab;
}
// 计算角色 CMB = BAB + 力量修正 + 体型修正
function setCharCMB(charJobs) {
  return charBAB + charAttModifier[0] + Size2CMB[DragonAge2Size[DragonAge]];
}

// 计算角色CMD = 10 + BAB + 力量修正 + 敏捷修正 + 体型修正
function setCharCMD() {
  return (
    10 +
    charBAB +
    charAttModifier[0] +
    charAttModifier[1] +
    Size2CMB[DragonAge2Size[DragonAge]]
  );
}

// 计算角色HP = 生命骰 + 体质调整值 / 等级
function setCharHP(charJobs, conModifier) {
  let HP = 0;
  let HPDetails = "";
  for (let i = 0; i < charJobs.length; i++) {
    const tempJobName = charJobs[i][1];
    const tempJobLevel = Number(charJobs[i][0]);
    const tempJobHD = Number(charJobs[i][3]);
    // (tempJobHD/2)+0.5 是取HD的期望 例如 D8期望4.5 在向上取整为5 即再加0.5
    const HD_Ex = tempJobHD / 2 + 0.5 + 0.5;
    HP += (HD_Ex + conModifier) * tempJobLevel;
    HPDetails += `${tempJobName} [${HD_Ex}(${tempJobHD}期望) + ${conModifier}(体质调整值)] * ${tempJobLevel}(等级)\n`;
  }
  return { HP, HPDetails };
}

// 计算角色先攻
function setCharInitiative(charInitiativeInfos, dexModifier) {
  let Initiative = dexModifier;
  let InitiativeDetails = `${dexModifier} [敏捷调整值] \n`;
  for (let i = 0; i < charInitiativeInfos.length; i++) {
    if (charInitiativeInfos[i][2] === true) {
      Initiative += Number(charInitiativeInfos[i][0]);
      InitiativeDetails += `${charInitiativeInfos[i][0]} [${charInitiativeInfos[i][1]}] \n`;
    }
  }
  return { Initiative, InitiativeDetails };
}

// 计算角色攻击加值-命中
// nearAB近距离命中 farAB远距离命中
function setCharAB(BAB, strModifier, dexModifier, sizeModifier) {
  return {
    nearAB: BAB + strModifier + sizeModifier,
    farAB: BAB + dexModifier + sizeModifier,
  };
}
