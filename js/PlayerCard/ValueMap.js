// 属性到索引的映射
const Att2Idx = {
  力量: 0,
  敏捷: 1,
  体质: 2,
  智力: 3,
  感知: 4,
  魅力: 5,
};

// 体型对AC的修正 同样适用于对AB 攻击检定的修正
const Size2AC = {
  超微型: +8,
  微型: +4,
  超小型: +2,
  小型: +1,
  中型: 0,
  大型: -1,
  超大型: -2,
  巨型: -4,
  超巨型: -8,
};

//{雏龙:,幼龙:,少年:,青少年:,青年: ,成年: ,}
const DragonAge2Idx = {
  雏龙: 0,
  幼龙: 1,
  少年: 2,
  青少年: 3,
  青年: 4,
  成年: 5,
};
// 龙年龄层到体型的映射
const DragonAge2Size = {
  雏龙: "小型",
  幼龙: "中型",
  少年: "大型",
  青少年: "大型",
  青年: "超大型",
  成年: "超大型",
};
// 龙年龄层到天生防御的映射
const DragonAge2NaturalAC = {
  雏龙: +0,
  幼龙: +3,
  少年: +6,
  青少年: +9,
  青年: +12,
  成年: +15,
};
// 龙年龄层到属性值的映射
const DragonAge2AttAdd = {
  雏龙: [0, 0, 0, 0, 0, 0],
  幼龙: [4, -2, 2, 2, 2, 2],
  少年: [8, -2, 4, 2, 2, 2],
  青少年: [10, -2, 6, 2, 2, 2],
  青年: [12, -5, 6, 4, 4, 4],
  成年: [14, -4, 8, 6, 6, 6],
};
// {小型:,中型:,大型:,超大型:,巨型:,超巨型:,}
// [地面速度, 飞行速度]
const DragonAge2Speed = {
  小型: [40, 150],
  中型: [40, 150],
  大型: [40, 200],
  超大型: [40, 200],
  巨型: [40, 250],
  超巨型: [40, 250],
};

// CMB体型修正
const Size2CMB = {
  小型: -1,
  中型: +0,
  大型: +1,
  超大型: +2,
  巨型: +4,
  超巨型: +8,
};

// 职业豁免成长计算公式 1强 0弱
function selectSavingThrowExpr(flag, level) {
  if (flag === 1) {
    return 2 + Math.floor(level / 2.0); //强豁免计算公式
  } else {
    return Math.floor(level / 3.0); // 弱豁免计算公式
  }
}
// 职业豁免成长映射
// [强韧, 反射, 意志] 1强 0弱
const Job2SavingAdd = {
  龙: [1, 1, 1],
  龙II: [1, 0, 0],
  贤者之剑: [0, 1, 1],
};

// 职业BAB成长计算公式 0弱 1中 2强
function selectBABExpr(flag, level) {
  if (flag === 0) {
    return Math.floor(level / 2.0);
  } else if (flag === 1) {
    return Math.floor((level * 3) / 4.0);
  } else {
    return level;
  }
}
// 职业BAB成长映射
// 0弱 1中 2强
const Job2BAB = {
  龙: 2,
  贤者之剑: 1,
};
