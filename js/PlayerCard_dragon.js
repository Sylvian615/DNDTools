function PlayerCard() {
  return {
    charName: "希尔维安",
    charRace: "精灵-日精灵",
    charAge: "约100岁",
    charAlignment: "混乱善良",
    charBelief: "普露拉",
    charJob: setCharJobs(charJobs),
    charAttName: ["力量", "敏捷", "体质", "智力", "感知", "魅力"],
    charAttValue: charAttValue,
    charAttModifier: charAttModifier,
    charLanguage: ["通用语", "精灵语", "地底通用语", "龙语", "深渊语"],
    charSpecial: charSpecial,
    charSpellLike: charSpellLike,
    charFeats: charFeats,
    charSpells: charSpells,
    charSkillTotalPoints: setSkillsTotalPoints(charJobs, "int"),
    charSkillUsedPoints: setAllUsedSkillsPoints(charSkills),
    charSkills: charSkills,
  };
}

// 角色等级与职业 --> 5法师/4观星者/5银月城法术守卫
// [等级, 职业, 技能点每等级,]
const charJobs = [
  ["6", "龙", "6"],
  ["1", "贤者之剑", "6"],
];

// 角色属性
// [属性值, 数值来源, 是否启用]
// 力量
const attStr = [
  [18, "基础", true],
  [1, "4级奖励属性点", true],
  [11, "测试", false],
];
// 敏捷
const attDex = [
  [10, "基础", true],
  [4, "种族加值", true],
];
// 体质
const attCon = [[16, "基础", true]];
// 智力
const attInt = [[8, "基础", true]];
// 感知
const attWis = [
  [12, "基础", true],
  [2, "种族加值", true],
];
// 魅力
const attCha = [
  [8, "基础", true],
  [2, "种族加值", true],
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

// 属性名称索引
const attMap = {
  str: 0,
  dex: 1,
  con: 2,
  int: 3,
  wis: 4,
  cha: 5,
};

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
