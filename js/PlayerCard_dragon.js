function PlayerCard() {
  return {
    charTokenFilename: charTokenFilename,
    charName: charName,
    charRace: charRace,
    charAge: charAge,
    charAlignment: charAlignment,
    charBelief: charBelief,
    charJob: setCharJobs(charJobs),
    charAttName: ["力量", "敏捷", "体质", "智力", "感知", "魅力"],
    charAttValue: charAttValue,
    charAttModifier: charAttModifier,
    charAC: setCharAC(charACInfos),
    charSpeed: charSpeed,
    charFlyType: charFlyType,
    charSavingThrows: charSavingThrows,
    charBAB: charBAB,
    charCMB: charCMB,
    charCMD: charCMD,
    charHP: charHP,
    charInitiative: charInitiative,
    charAB: charAB,
    charLanguage: charLanguage,
    charSpecial: charSpecial,
    charSpellLike: charSpellLike,
    charFeats: charFeats,
    charSpells: charSpells,
    charSkillTotalPoints: setSkillsTotalPoints(charJobs, "int"),
    charSkillUsedPoints: setAllUsedSkillsPoints(charSkills),
    charSkills: charSkills,
  };
}
// 龙的年龄层
const DragonAge = "幼龙";

//角色头像
const charTokenFilename = "PixPin_2025-06-20_01-42-03.png";
// 角色名称
const charName = "一条还没想好名字的银龙";
// 角色种族
const charRace = "银龙";
// 角色年龄
const charAge = `${DragonAge} 刚刚破壳`;
// 角色阵营
const charAlignment = "混乱善良";
// 角色信仰
const charBelief = "巴哈姆特？";

// 角色所知语言
const charLanguage = ["通用语", "龙语", "精灵语"];

// 角色等级与职业 --> 5法师/4观星者/5银月城法术守卫
// [等级, 职业, 技能点每等级, 生命骰]
const charJobs = [
  ["6", "龙", "6", "12"],
  ["1", "贤者之剑", "6", "8"],
];

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
// [属性值, 数值来源, 是否启用]
// 力量
const attStr = [
  [18, "基础", true],
  [1, "4级奖励属性点", true],
  [11, "测试", false],
  [DragonAge2AttAdd[DragonAge][0], "龙年龄层加值", true],
];
// 敏捷
const attDex = [
  [10, "基础", true],
  [4, "种族加值", true],
  [DragonAge2AttAdd[DragonAge][1], "龙年龄层加值", true],
];
// 体质
const attCon = [
  [16, "基础", true],
  [DragonAge2AttAdd[DragonAge][2], "龙年龄层加值", true],
];
// 智力
const attInt = [
  [8, "基础", true],
  [DragonAge2AttAdd[DragonAge][3], "龙年龄层加值", true],
];
// 感知
const attWis = [
  [12, "基础", true],
  [2, "种族加值", true],
  [DragonAge2AttAdd[DragonAge][4], "龙年龄层加值", true],
];
// 魅力
const attCha = [
  [8, "基础", true],
  [2, "种族加值", true],
  [DragonAge2AttAdd[DragonAge][5], "龙年龄层加值", true],
];
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

// 角色AC
// AC = 10 + 护盾 + 盾牌 + 敏捷调整值 + 体型 + 其他
const charACInfos = [
  [0, "护盾加值", true],
  [0, "盾牌加值", true],
  [DragonAge2NaturalAC[DragonAge], `天生护甲-${DragonAge}`, true],
  [charAttModifier[attMap.dex], "敏捷修正加值", true],
  [Size2AC[DragonAge2Size[DragonAge]], `体型加值-${DragonAge}-中型`, true],
];

// 角色速度
const charSpeed = DragonAge2Speed[DragonAge2Size[DragonAge]];
// 角色飞行机动性
const charFlyType = "良好";

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
const charInitiativeInfos = [
  [0, "xxx加值", true],
  [4, "精通先攻", true],
];
// 角色先攻 敏捷修正 + 各项加值
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

// 角色特性/特殊能力
// [特性名称, 特性变量]
// .title 特性名称 .source 特性来源 .action 特性消耗动作 .numbers 特性可用次数 .description 特性介绍
const charSpecial = [
  ["变化形态 Change Shape（Su）", change_shape],
  ["麻痹喷吐 Paralyzing Breath（Su）", paralyzing_breath],
  ["云行 Cloudwalking（Su）", cloudwalking],
];

// 角色类法术能力
const charSpellLike = [["侦测邪恶", detect_evil]];

// 角色招式/法术
const charSpells = [["阴影宠儿", ChildOfShadow]];

// 角色专长
// .title .description
const charFeats = [
  ["闪避", Dodge],
  ["盲斗", BlindFight],
  ["精通先攻", ImprovedInitiative],
  ["运用自如", AdaptiveStyle],
  ["精通徒手打击", ImprovedUnarmedStrike],
  ["飞跃攻击", FlybyAttack],
  ["精通机动", ImprovedManeuverability],
];

// 技能点取决的属性名称
const skillAtt = "int";

// 各项技能点
// [技能名称, 取决属性, 加点]
const charSkills = [
  ["攀爬", "力量", "1"],
  ["游泳", "力量", "1"],
  ["特技", "敏捷", "1"],
  ["解除装置", "敏捷", "1"],
  ["逃脱", "敏捷", "1"],
  ["飞行", "敏捷", "1"],
  ["骑术", "敏捷", "1"],
  ["巧手", "敏捷", "1"],
  ["隐匿", "敏捷", "1"],
  ["估价", "智力", "1"],
  ["工艺", "智力", "1"],
  ["语言学", "智力", "1"],
  ["法术辨识", "智力", "1"],
  ["知识-奥秘", "智力", "1"],
  ["知识-地城", "智力", "1"],
  ["知识-工程", "智力", "1"],
  ["知识-地理", "智力", "1"],
  ["知识-历史", "智力", "1"],
  ["知识-地方", "智力", "1"],
  ["知识-自然", "智力", "1"],
  ["知识-贵族", "智力", "1"],
  ["知识-位面", "智力", "1"],
  ["知识-宗教", "智力", "1"],
  ["医疗", "感知", "1"],
  ["察觉", "感知", "1"],
  ["专业", "感知", "1"],
  ["察言观色", "感知", "1"],
  ["生产", "感知", "1"],
  ["唬骗", "魅力", "1"],
  ["交涉", "魅力", "1"],
  ["易容", "魅力", "1"],
  ["驯养动物", "魅力", "1"],
  ["威吓", "魅力", "1"],
  ["表演", "魅力", "1"],
  ["使用魔法装置", "魅力", "1"],
];

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
      tempDetails += attCfg[i][1] + "\n";
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
  let totalPoints = 0;
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
    totalUsedPoints += Number(charSkills[i][2]);
  }
  return totalUsedPoints;
}

//角色AC计算
function setCharAC(charACInfos) {
  let totalAC = 10;
  let totalACDetails = "";
  let touchAC = 10;
  let touchACDetails = "";
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
  for (let i = 0; i < charJobs.length; i++) {
    const tempJobLevel = Number(charJobs[i][0]);
    const tempJobHD = Number(charJobs[i][3]);
    // (tempJobHD/2)+0.5 是取HD的期望 例如 D8期望4.5 在向上取整为5
    HP += (tempJobHD / 2 + 1 + conModifier) * tempJobLevel;
  }
  return HP;
}

// 计算角色先攻
function setCharInitiative(charInitiativeInfos, dexModifier) {
  let Initiative = dexModifier;
  let InitiativeDetails = `${dexModifier} [敏捷调整值]`;
  for (let i = 0; i < charInitiativeInfos.length; i++) {
    if (charInitiativeInfos[i][2] === true) {
      Initiative += Number(charInitiativeInfos[i][0]);
      InitiativeDetails += `${charInitiativeInfos[i][0]} [${charInitiativeInfos[i][1]} \n`;
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
