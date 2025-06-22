// {title:"", source:"", action:"", numbers:"", description:``}

// 龙
const change_shape = {
  title: "变化形态 Change Shape（Su）",
  source: "雏龙特性",
  action: "标准动作",
  numbers: "3/每天",
  description: `银龙可以化身为任何动物或类人生物形态，每日三次，如同使用变形术 polymorph。`,
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
  source: "游龙特性",
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
