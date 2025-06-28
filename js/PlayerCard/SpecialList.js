// {title:"", source:"", action:"", numbers:"", description:``}

// 龙
const change_shape = {
  title: "变化形态 Change Shape（Su）",
  source: "雏龙特性",
  action: "标准动作",
  numbers: "3/每天",
  description: `银龙可以化身为任何动物或类人生物形态，每日三次，如同使用变形术 polymorph。
  变形术 (Polymorph)
学派 变化系 (变形)
环位 炼金术师 5, 术士/法师 5
施法时间 标准动作
成分 语言, 姿势, 材料 (你想要变成的生物的一小块肢体)
距离 接触
目标 接触到的活物
持续时间 1分钟/等级 (可解消)
豁免 意志, 通过则无效 (无害)
法术抗力 可 (无害)
　　该法术会将一名自愿的生物变为一个动物、类人生物或者元素，具体由你选择；法术对非自愿生物没有效果，法术目标无法改变他所获得的新形态 (除非对你口头表达自身意愿之外)。
　　如果你使用该法术将目标变为动物的形态，它的功能如同‘野兽形态II (beast shape II)’。如果变为元素的形态，该法术的功能如同‘元素形态I (elemental body I)’。如果变为类人生物的形态，该法术的功能如同‘变身术 (alter self)’。受术者可以选择以整轮动作变为正常的形态；这么做会立刻结束受术者的法术。`,
};

const paralyzing_breath = {
  title: "麻痹喷吐 Paralyzing Breath（Su）",
  source: "雏龙特性",
  action: "被动",
  numbers: "NA",
  description: `代替锥形寒冷，银龙可以喷吐出锥形的麻痹气体。处于锥形范围内的生物必须通过强韧检定，否则麻痹 1d6 轮加每年龄层 1 轮。
`,
};

const cloudwalking = {
  title: "云行 Cloudwalking（Su）",
  source: "幼龙特性",
  action: "被动",
  numbers: "NA",
  description: `幼龙开始，银龙可以如同在地面上一般在云雾上行走。`,
};

// 贤者之剑
const quick_to_act = {
  title: "快速行动+1",
  source: "贤者之剑1级特性",
  action: "被动",
  numbers: "NA",
  description: `快速行动（Quick to Act）（Ex）：
你在先攻上获得+1加值。此加值在第5，第10，第15，第20级各增加1。`,
  effectFunc() {
    charInitiativeInfos.push([1, "快速行动+1", true]);
  },
};

const discipline_focus = {
  title: "流派专攻（Discipline Focus）（Ex）",
  source: "贤者之剑1级",
  action: "被动",
  numbers: "NA",
  description: `作为贤者之剑你可以将你的选练专注于特定的流派使你在使用此流派战斗时获得优势。每次你获得流派专攻能力，从六个贤者之剑流派中选择一个来专攻。每次你获得流派专攻能力时你可以选择一个不同的流派，不过你必须至少知道一个此流派的武功招式。即使你在高等级选择了一个不同的流派，你在早期选择的流派专攻能力也不会改变。
流派专攻有以下几种方式：
武器专攻：在第一级你获得你选择流派武器的武器专攻。见第4章流派描述。
洞察打击（Insighful Strikes）：在第4级你可以选择一个流派，无论何时你使用此流派的打击技时你都可以在伤害骰上附加你的感知加值。在第12级你可以选择第二个流派附加此能力。
防御步法（Defensive Stance）：在第8级当你使用你所选择的流派步法时你将在豁免上获得+2加值。在第16级你可以选择第二个流派附加此能力。
你在使用武术知识（Martial Lore）辨识你所选择的流派时获得+2加值。`,
};

// 计算特性加值影响
function processSpecialList() {
  for (let i = 0; i < charSpecial.length; i++) {
    if (charSpecial[i][1].effectFunc) {
      charSpecial[i][1].effectFunc();
    }
  }
}
