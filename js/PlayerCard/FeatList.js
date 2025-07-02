// {title:"", source:"", description:``}
const Dodge = {
  title: "闪避（Dodge）〔战斗〕",
  source: "1级专长",
  description: `你的训练和反应令你能够迅速闪避攻击。
  先决条件：敏捷13。
  专长效果：你可以在AC上获得+1闪避加值。若你失去AC的敏捷加值时，也会同时失去此专长的加值。
`,
  effectFunc() {
    charACInfos.push([1, "闪避", true]);
  },
};

const BlindFight = {
  title: "盲斗（Blind-Fight）〔战斗〕",
  source: "3级专长",
  description: `你能够在不能清晰感知你的敌人的情况下，熟练地进行攻击。
  专长效果：在近战时，每次因为隐蔽效果而造成的攻击失手，你都能重骰失手率以确定你是否击中。不可见的攻击者在近战攻击你时不会获得特殊优势。这就是说你不会失去AC的敏捷加值，对方也无法获得通常隐形下的攻击+2加值。但是不可见攻击者的远程攻击依然会有上述优势。此外，你在目盲状态下全速移动时无需进行特技技能检定。
　　通常状况：不可见的攻击者对你的攻击会让你失去AC的敏捷加值。黑暗或视觉受限的状况也会减慢你的移动速度。
　　特殊说明：“盲斗”专长对于那些处在‘闪现术’法术效果下的角色无效。
`,
};

const ImprovedInitiative = {
  title: "精通先攻（Improved Initiative）〔战斗〕",
  source: "5级专长",
  description: `你对战斗的反应很快，使你能够迅速对危险做出反应。
专长效果：先攻检定获得+4加值。
`,
  effectFunc() {
    charInitiativeInfos.push([4, "精通先攻", true]);
  },
};

const AdaptiveStyle = {
  title: "运用自如（Adaptive style）",
  source: "7级专长",
  description: `你根据自己面对情况的不同，在瞬间改变了武术和战术。
先决条件：天诛之剑，贤者之刃，或军道之刃1级。
效果：你可以在任何时候以一个整轮动作改变你准备的武术。如果你是一名天诛之剑，你失去之前的武术以及获得的武术，如同你当天准备的就是这些新武术一般。正常：你需要5分钟来改变你准备的武术。`,
};

const ImprovedUnarmedStrike = {
  title: "精通徒手打击（Improved Unarmed Strike）〔战斗〕",
  source: "流派专攻",
  description: `你精通徒手作战的技巧。
  专长效果：即使徒手也视同持有武器，也就是说当你徒手攻击时，不会引发借机攻击。此外，你可以选择让你的徒手击打造成致命或非致命伤害。
　　通常状况：无此专长者若徒手攻击则视为未武装，也只能造成非致命伤害。
`,
};

const FlybyAttack = {
  title: "飞跃攻击",
  source: "3级龙专长",
  description: `飞越（Flyby Attack） [一般专长]
先决条件：飞行
效果：飞行时，生物能在移动中的任何时候作标准动作。
正常：没有此专长，生物只能在移动前或移动后作标准动作。
`,
};

const HeightenBreath = {
  title: "喷吐加强",
  source: "",
  description: `喷吐加强（HEIGHTEN BREATH）[超喷吐]
  你的喷吐武器甚至比正常情况更致命了。
  先决条件：体质13，喷吐武器。
  效果：你能使你的喷吐武器的豁免DC增加至多等于你的体质加值的任意数量。
  你每让豁免DC增加1点，你在再次使用你的喷吐武器前必须等待的回合数就增加+1。
`,
};

const ImprovedManeuverability = {
  title: "精通机动",
  source: "6级龙专长",
  description: `精通机动（IMPROVED MANEUVERABILITY）[一般]
你的飞行机动性提高。先决条件：飞行速度150英尺，盘旋或横转。
效果：你的机动性提高一级，从笨拙到不良，不良到普通，或者普通到良好（见《城主指南》20页的空中战术移动）。
特殊：你能多次选取该专长。每次选取该专长，你的机动性提高一级（但永远不能好于良好）。`,
};
const PowerAttack = {
  title: "猛力攻击（Power Attack）〔战斗〕",
  source: "",
  description: `先决条件：力量13，基本攻击加值+1。
　　专长效果：你可以选择在所有近战攻击和战技检定上承受-1减值，以在所有近战伤害检定上获得+2加值。如果你进行攻击时使用的是双手武器、双手持用的单手武器或可在伤害检定上加上1.5倍力量修正的主要天生武器，此伤害加值提升一半（+50%）。如果你进行攻击时使用的是副手武器或次要天生武器，此伤害加值减半（-50%）。当你的BAB达到+4，和以后的每4点提升，攻击减值再-1，伤害加值再+2。你必须在进行攻击检定前选择使用此专长，其效果持续到你的下回合之前。接触攻击和不造成生命点数伤害的效果无法获得伤害加值。
`,
};

const Lunge = {
  title: "突刺（Lunge）〔战斗〕",
  source: "",
  description: `突刺（Lunge）〔战斗〕
你可以攻击正常触及之外的敌人。
先决条件：基本攻击加值+6。
专长效果：你可以令近战攻击距离增加5尺直到你的回合结束，但直到你的下轮行动时AC受-2减值。你必须在做出任何攻击前宣布使用此能力。
`,
};

const PlaceHolder = {
  title: "占位符",
  source: "",
  description: `这是一个占位符`,
};

// 计算专长加值影响
function processFeatList() {
  for (let i = 0; i < charFeats.length; i++) {
    if (charFeats[i][1].effectFunc) {
      charFeats[i][1].effectFunc();
    }
  }
}
