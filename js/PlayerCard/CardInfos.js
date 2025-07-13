// 龙的年龄层
const DragonAge = "幼龙";
//角色头像
// const charTokenFilename = "PixPin_2025-06-20_01-42-03-1.png";
const charTokenFilename = "dragon-token-1.png";
// 角色名称
const charName = "瑟拉文 Selavyn";
// 角色种族
const charRace = "银龙";
// 角色年龄
const charAge = `${DragonAge} 刚刚破壳`;
// 角色阵营
const charAlignment = "混乱善良";
// 角色信仰
const charBelief = "阿丝忒瑞娜？";

// 角色所知语言
const charLanguage = ["通用语", "龙语", "精灵语"];

// 角色等级与职业 --> 5法师/4观星者/5银月城法术守卫
// [等级, 职业, 技能点每等级, 生命骰]
const charJobs = [
  [4, "龙", 6, 12],
  [1, "军道之剑", 4, 12],
  [1, "龙II", 6, 12],
  // [1, "贤者之剑", 4, 12],
  // [1, "贤者之剑", 6, 8],
];

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

// 角色AC
// AC = 10 + 护盾 + 盾牌 + 敏捷调整值 + 体型 + 其他
const charACInfos = [
  [0, "护甲加值", true],
  [0, "盾牌加值", true],
  [DragonAge2NaturalAC[DragonAge], "天生护甲", true],
];

// 角色飞行机动性
const charFlyType = "良好";

// 角色先攻 敏捷修正 + 各项加值
const charInitiativeInfos = [[0, "xxx加值", false]];

// 角色类法术能力
const charSpellLike = [["侦测邪恶", detect_evil]];

// [已知招式数,可准备招式数,已知步法数]
const charSpellNum = [4, 3, 1];

// 角色招式/法术
const charSpells = [
  ["行在意前", ActionBeforeThrought],
  ["剑刃壁障", WallofBlades],
  ["领军冲锋", BattleLeadersCharge],
  ["领导冲锋", LeadingTheCharge],
  ["待定", SpellPlaceholder],
  // ["惩戒之姿", PunishingStance],
  // ["铁心之力", IronHeartSurge],
  // ["战场之狼", TacticsofTheWolf],
  // ["狼抓", RabidWolfStrike],
  // ["红莲之剑", BurningBlade],
  // ["千幻防御", BafflingDefense],
  // ["巨山破", MountainHammer],
  // ["狡诈斗篷", CloakOfDeception],
  // ["避火决", FlamesBlessing],
];

// 角色专长
// [专长名, 专长变量, 专长来源]
// .title .description
const charFeats = [
  // ["闪避", Dodge],
  // ["盲斗", BlindFight],
  // ["精通先攻", ImprovedInitiative],
  // ["运用自如", AdaptiveStyle],
  // ["精通徒手打击", ImprovedUnarmedStrike],
  ["精通机动", ImprovedManeuverability, "1级通用专长"],
  ["猛力攻击", PowerAttack, "3级通用专长"],
  ["飞跃攻击", FlybyAttack, "3级怪物专长"],
  ["喷吐加强", HeightenBreath, "4级喷吐专长"],
  ["恶魔之型", DemonicStyle, "5级通用专长"],
  ["角魔之猛击", CornugonSmash, "6级战斗专长"],
  ["龙II占位符", PlaceHolder, "7级通用专长"],
  ["龙II占位符", PlaceHolder, "7级喷吐专长"],
  ["龙II占位符", PlaceHolder, "8级怪物专长"],
  ["龙II占位符", PlaceHolder, "9级通用专长"],
  ["龙II占位符", PlaceHolder, "9级战斗专长"],
  ["龙II占位符", PlaceHolder, "10级喷吐专长"],
  ["龙II占位符", PlaceHolder, "11级通用专长"],
  ["龙II占位符", PlaceHolder, "11级怪物专长"],
];

// 角色特性/特殊能力
// [特性名称, 特性变量]
// .title 特性名称 .source 特性来源 .action 特性消耗动作 .numbers 特性可用次数 .description 特性介绍
const charSpecial = [
  ["变化形态 Change Shape（Su）", change_shape],
  ["麻痹喷吐 Paralyzing Breath（Su）", paralyzing_breath],
  ["云行 Cloudwalking（Su）", cloudwalking],
  // ["快速行动+1", quick_to_act],
  // ["流派专攻（Discipline Focus）（Ex）", discipline_focus],
];

processSpecialList();
processFeatList();
