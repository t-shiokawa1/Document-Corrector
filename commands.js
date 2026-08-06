"use strict";
(() => {
  // src/core/dict.ts
  var KANJI_TO_KANA = Object.freeze([
    { from: "\u66F4\u306B", to: "\u3055\u3089\u306B", severity: "fix" },
    { from: "\u5F93\u3063\u3066", to: "\u3057\u305F\u304C\u3063\u3066", severity: "fix" },
    { from: "\u53CA\u3073", to: "\u304A\u3088\u3073", severity: "fix" },
    { from: "\u53C8\u306F", to: "\u307E\u305F\u306F", severity: "fix" },
    { from: "\u82E5\u3057\u304F\u306F", to: "\u3082\u3057\u304F\u306F", severity: "fix" },
    { from: "\u6216\u3044\u306F", to: "\u3042\u308B\u3044\u306F", severity: "fix" },
    { from: "\u4F46\u3057", to: "\u305F\u3060\u3057", severity: "fix" },
    { from: "\u5C1A", to: "\u306A\u304A", severity: "fix" },
    { from: "\u5373\u3061", to: "\u3059\u306A\u308F\u3061", severity: "fix" },
    { from: "\u4E14\u3064", to: "\u304B\u3064", severity: "fix" },
    { from: "\u6545\u306B", to: "\u3086\u3048\u306B", severity: "fix" },
    { from: "\u56E0\u307F\u306B", to: "\u3061\u306A\u307F\u306B", severity: "fix" },
    { from: "\u4E88\u3081", to: "\u3042\u3089\u304B\u3058\u3081", severity: "fix" },
    { from: "\u6B86\u3069", to: "\u307B\u3068\u3093\u3069", severity: "fix" },
    { from: "\u5168\u3066", to: "\u3059\u3079\u3066", severity: "fix" },
    { from: "\u51FA\u6765\u308B", to: "\u3067\u304D\u308B", severity: "fix" },
    { from: "\u51FA\u6765\u305F", to: "\u3067\u304D\u305F", severity: "fix" },
    { from: "\u7121\u3044", to: "\u306A\u3044", severity: "fix" },
    { from: "\u4F55\u6545", to: "\u306A\u305C", severity: "fix" },
    { from: "\u6975\u3081\u3066", to: "\u304D\u308F\u3081\u3066", severity: "confirm", note: "\u5206\u91CE\u306B\u3088\u308A\u6F22\u5B57\u3082\u53EF" },
    { from: "\u6562\u3048\u3066", to: "\u3042\u3048\u3066", severity: "fix" },
    { from: "\u65BC\u3044\u3066", to: "\u304A\u3044\u3066", severity: "fix" },
    { from: "\u62D8\u308F\u3089\u305A", to: "\u304B\u304B\u308F\u3089\u305A", severity: "fix" },
    { from: "\u4E0B\u3055\u3044", to: "\u304F\u3060\u3055\u3044", severity: "fix" },
    { from: "\u9802\u304F", to: "\u3044\u305F\u3060\u304F", severity: "fix" },
    { from: "\u6CA2\u5C71", to: "\u305F\u304F\u3055\u3093", severity: "fix" },
    { from: "\u4E01\u5EA6", to: "\u3061\u3087\u3046\u3069", severity: "fix" },
    { from: "\u662F\u975E", to: "\u305C\u3072", severity: "fix" },
    { from: "\u8FC4", to: "\u307E\u3067", severity: "fix" },
    { from: "\u5C24\u3082", to: "\u3082\u3063\u3068\u3082", severity: "fix" },
    { from: "\u8CB0\u3046", to: "\u3082\u3089\u3046", severity: "fix" },
    { from: "\u5C45\u308B", to: "\u3044\u308B", severity: "fix" }
  ]);
  var KANJI_MEANING = Object.freeze([
    { from: "\u6301\u3064", to: "\u3082\u3064", severity: "confirm", note: "\u7121\u751F\u7269\u4E3B\u8A9E\u306A\u3089\u300C\u3082\u3064\u300D" },
    { from: "\u6301\u3061", to: "\u3082\u3061", severity: "confirm", note: "\u7121\u751F\u7269\u4E3B\u8A9E\u306A\u3089\u300C\u3082\u3061\u300D" },
    { from: "\u6301\u3063\u3066", to: "\u3082\u3063\u3066", severity: "confirm", note: "\u7121\u751F\u7269\u4E3B\u8A9E\u306A\u3089\u300C\u3082\u3063\u3066\u300D" },
    { from: "\u4E8B", to: "\u3053\u3068", severity: "confirm", note: "\u5F62\u5F0F\u540D\u8A5E\u306A\u3089 \u304B\u306A\u66F8\u304D" },
    { from: "\u70BA", to: "\u305F\u3081", severity: "confirm", note: "\u5F62\u5F0F\u540D\u8A5E\u306A\u3089 \u304B\u306A\u66F8\u304D" },
    { from: "\u6642", to: "\u3068\u304D", severity: "confirm", note: "\u6642\u523B\u3067\u306A\u3051\u308C\u3070 \u304B\u306A\u66F8\u304D" },
    { from: "\u6240", to: "\u3068\u3053\u308D", severity: "confirm", note: "\u5834\u6240\u3067\u306A\u3051\u308C\u3070 \u304B\u306A\u66F8\u304D" },
    { from: "\u69D8\u306B", to: "\u3088\u3046\u306B", severity: "confirm", note: "\u5F62\u5F0F\u540D\u8A5E\u306A\u3089 \u304B\u306A\u66F8\u304D" },
    { from: "\u8A33", to: "\u308F\u3051", severity: "confirm", note: "translation \u306E\u610F\u3067\u306A\u3051\u308C\u3070 \u304B\u306A\u66F8\u304D" },
    { from: "\u7B48", to: "\u306F\u305A", severity: "confirm" },
    { from: "\u901A\u308A", to: "\u3068\u304A\u308A", severity: "confirm", note: "\u9053\u8DEF\u3067\u306A\u3051\u308C\u3070 \u304B\u306A\u66F8\u304D" },
    { from: "\u5206\u304B\u308B", to: "\u308F\u304B\u308B", severity: "confirm" }
  ]);
  var VERBOSE = Object.freeze([
    { from: "\u3092\u6709\u3059\u308B", to: "\u3092\u3082\u3064", severity: "fix" },
    { from: "\u3092\u6709\u3057", to: "\u3092\u3082\u3061", severity: "fix" },
    // 「明らかになった」は結論を述べる定型で、「わかった」に直すと口語に寄る。
    // 単調な繰り返しのときだけ効く助言なので、既定では黙らせる。
    {
      from: "\u660E\u3089\u304B\u306B\u306A\u3063\u305F",
      to: "\u308F\u304B\u3063\u305F",
      severity: "confirm",
      note: "\u5358\u8ABF\u306B\u306A\u3089\u306A\u3044\u7BC4\u56F2\u3067",
      defaultEnabled: false
    },
    {
      from: "\u660E\u3089\u304B\u3068\u306A\u3063\u305F",
      to: "\u308F\u304B\u3063\u305F",
      severity: "confirm",
      note: "\u5358\u8ABF\u306B\u306A\u3089\u306A\u3044\u7BC4\u56F2\u3067",
      defaultEnabled: false
    },
    { from: "\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u308B", to: "\u3067\u304D\u308B", severity: "fix" },
    { from: "\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u305F", to: "\u3067\u304D\u305F", severity: "fix" },
    { from: "\u3059\u308B\u3053\u3068\u304C\u53EF\u80FD\u3067\u3042\u308B", to: "\u3067\u304D\u308B", severity: "fix" },
    { from: "\u3059\u308B\u3053\u3068\u304C\u53EF\u80FD", to: "\u3067\u304D\u308B", severity: "confirm" },
    { from: "\u3092\u884C\u3063\u305F", to: "\u3057\u305F", severity: "confirm", note: "\u52D5\u8A5E\u5316\u3067\u304D\u308B\u306A\u3089\u77ED\u304F" },
    { from: "\u3092\u884C\u3046", to: "\u3059\u308B", severity: "confirm", note: "\u52D5\u8A5E\u5316\u3067\u304D\u308B\u306A\u3089\u77ED\u304F" },
    { from: "\u3092\u5B9F\u65BD\u3057\u305F", to: "\u3057\u305F", severity: "confirm" },
    { from: "\u3068\u3044\u3046\u4E8B", to: "\u3068\u3044\u3046\u3053\u3068", severity: "fix" },
    { from: "\u306B\u95A2\u3057\u3066", to: "\u306B\u3064\u3044\u3066", severity: "confirm" },
    { from: "\u306B\u5BFE\u3057\u3066\u306E", to: "\u306B\u5BFE\u3059\u308B", severity: "fix" },
    // 「溶液の中で」のように場所を示す用法は冗長ではないので、既定では黙らせる。
    { from: "\u306E\u4E2D\u3067", to: "\u3067", severity: "confirm", defaultEnabled: false },
    { from: "\u3092\u7528\u3044\u3066\u884C\u3063\u305F", to: "\u3092\u7528\u3044\u305F", severity: "confirm" },
    // 「〜であると考えられる」は主語が体言のときに要る形で、削ると文が壊れる場合がある。
    { from: "\u3067\u3042\u308B\u3068\u8003\u3048\u3089\u308C\u308B", to: "\u3068\u8003\u3048\u3089\u308C\u308B", severity: "confirm", defaultEnabled: false },
    { from: "\u3068\u3044\u3046\u3053\u3068\u304C\u3067\u304D\u308B", to: "\u3068\u3044\u3048\u308B", severity: "fix" },
    { from: "\u3092\u76EE\u7684\u3068\u3057\u3066", to: "\u306E\u305F\u3081", severity: "confirm" },
    // 列挙の定型表現として定着しているので、既定では黙らせる。
    { from: "\u304C\u6319\u3052\u3089\u308C\u308B", to: "\u304C\u3042\u308B", severity: "confirm", defaultEnabled: false },
    { from: "\u3059\u308B\u3053\u3068\u306B\u3088\u308A", to: "\u3057\u3066", severity: "confirm" },
    // 「Aにおいては B だが、Cでは」のような対比では「においては」が要る。
    { from: "\u306B\u304A\u3044\u3066\u306F", to: "\u3067\u306F", severity: "confirm", defaultEnabled: false }
  ]);
  var CASUAL = Object.freeze([
    { from: "\u3068\u3066\u3082", to: "\u975E\u5E38\u306B", severity: "confirm" },
    { from: "\u3059\u3054\u304F", to: "\u975E\u5E38\u306B", severity: "fix" },
    { from: "\u304B\u306A\u308A", to: "\u76F8\u5F53\u306B", severity: "confirm" },
    { from: "\u3061\u3087\u3063\u3068", to: "\u308F\u305A\u304B\u306B", severity: "fix" },
    { from: "\u3084\u3063\u3071\u308A", to: "\u3084\u306F\u308A", severity: "fix" },
    { from: "\u3069\u3093\u3069\u3093", to: "\u6B21\u7B2C\u306B", severity: "confirm" },
    { from: "\u3060\u3044\u3076", to: "\u304B\u306A\u308A", severity: "confirm" },
    { from: "\u3051\u3063\u3053\u3046", to: "\u6BD4\u8F03\u7684", severity: "fix" },
    { from: "\u7D50\u69CB", to: "\u6BD4\u8F03\u7684", severity: "confirm", note: "\u526F\u8A5E\u306E\u5834\u5408\u306E\u307F" },
    { from: "\u3044\u308D\u3093\u306A", to: "\u3055\u307E\u3056\u307E\u306A", severity: "fix" },
    { from: "\u3060\u3051\u3069", to: "\u3057\u304B\u3057", severity: "fix" },
    // 「〜でも」（〜であっても・最低でも）と文頭の逆接をテキストだけで区別できず、
    // 誤検出が多い。既定では黙らせる。
    { from: "\u3067\u3082", to: "\u3057\u304B\u3057", severity: "confirm", note: "\u6587\u982D\u306E\u9006\u63A5\u306E\u5834\u5408\u306E\u307F", defaultEnabled: false },
    { from: "\u307F\u305F\u3044\u306A", to: "\u306E\u3088\u3046\u306A", severity: "fix" },
    { from: "\u307F\u305F\u3044\u306B", to: "\u306E\u3088\u3046\u306B", severity: "fix" },
    { from: "\u305F\u3076\u3093", to: "\u304A\u305D\u3089\u304F", severity: "fix" },
    { from: "\u3070\u3063\u3061\u308A", to: "\u5341\u5206\u306B", severity: "fix" },
    { from: "\u304D\u308C\u3044\u306B", to: "\u6E05\u6D44\u306B", severity: "confirm", note: "\u6587\u8108\u306B\u3088\u308A\u300C\u53CE\u7387\u3088\u304F\u300D\u7B49" }
  ]);
  var VARIANT_GROUPS = Object.freeze([
    ["\u884C\u3046", "\u884C\u306A\u3046"],
    ["\u8868\u3059", "\u8868\u308F\u3059"],
    ["\u73FE\u308C\u308B", "\u73FE\u308F\u308C\u308B"],
    ["basedon", "based on"],
    ["\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF", "\u30B3\u30F3\u30D4\u30E5\u30FC\u30BF\u30FC"],
    ["\u30B5\u30FC\u30D0", "\u30B5\u30FC\u30D0\u30FC"],
    ["\u30E6\u30FC\u30B6", "\u30E6\u30FC\u30B6\u30FC"],
    ["\u30D5\u30A3\u30EB\u30BF", "\u30D5\u30A3\u30EB\u30BF\u30FC"],
    ["\u30D1\u30E9\u30E1\u30FC\u30BF", "\u30D1\u30E9\u30E1\u30FC\u30BF\u30FC"],
    ["\u30DD\u30EA\u30DE", "\u30DD\u30EA\u30DE\u30FC"],
    ["\u30A8\u30CD\u30EB\u30AE", "\u30A8\u30CD\u30EB\u30AE\u30FC"],
    ["\u30B9\u30DA\u30AF\u30C8\u30EB", "\u30B9\u30DA\u30AF\u30C8\u30E9\u30E0"],
    ["\u306A\u3069", "\u7B49"],
    ["\u304A\u3088\u3073", "\u53CA\u3073"],
    ["\u305F\u3060\u3057", "\u4F46\u3057"],
    ["\u3055\u3089\u306B", "\u66F4\u306B"],
    ["\u3057\u305F\u304C\u3063\u3066", "\u5F93\u3063\u3066"],
    ["\u3059\u3079\u3066", "\u5168\u3066"],
    ["\u3082\u3064", "\u6301\u3064"],
    ["\u308F\u304B\u3063\u305F", "\u5206\u304B\u3063\u305F"],
    ["\u89E3\u6790", "\u5206\u6790"]
  ]);
  var JOURNAL_ABBREV = Object.freeze([
    {
      from: "Angew. Chem. Int. Ed. Engl.",
      to: "Angew. Chem. Int. Ed.",
      severity: "confirm",
      note: "1998\u5E74\u9803\u3092\u5883\u306B Engl. \u304C\u5916\u308C\u308B\u3002\u63B2\u8F09\u5E74\u3092\u78BA\u8A8D"
    },
    { from: "Chem. Comm.", to: "Chem. Commun.", severity: "fix" },
    { from: "Chem. Commun", to: "Chem. Commun.", severity: "confirm", note: "\u672B\u5C3E\u306E\u30D4\u30EA\u30AA\u30C9" },
    { from: "J. Amer. Chem. Soc.", to: "J. Am. Chem. Soc.", severity: "fix" },
    { from: "JACS", to: "J. Am. Chem. Soc.", severity: "fix" },
    { from: "Angew. Chemie", to: "Angew. Chem.", severity: "fix" },
    { from: "Tetrahedron Letters", to: "Tetrahedron Lett.", severity: "confirm", note: "\u7565\u79F0\u30B9\u30BF\u30A4\u30EB\u306B\u7D71\u4E00" },
    { from: "Organic Letters", to: "Org. Lett.", severity: "confirm", note: "\u7565\u79F0\u30B9\u30BF\u30A4\u30EB\u306B\u7D71\u4E00" },
    { from: "J. Org. Chem", to: "J. Org. Chem.", severity: "confirm", note: "\u672B\u5C3E\u306E\u30D4\u30EA\u30AA\u30C9" },
    { from: "Nature Chem.", to: "Nat. Chem.", severity: "confirm", note: "CASSI \u6E96\u62E0\u306A\u3089 Nat." },
    { from: "Nature Commun.", to: "Nat. Commun.", severity: "confirm", note: "CASSI \u6E96\u62E0\u306A\u3089 Nat." }
  ]);
  var PHYSICAL_QUANTITIES = Object.freeze([
    "T",
    "P",
    "V",
    "E",
    "J",
    "K",
    "R",
    "M",
    "N",
    "G",
    "H",
    "S",
    "C",
    "Z",
    "Q",
    "A",
    "c",
    "d",
    "t",
    "m",
    "n",
    "k",
    "p",
    "q",
    "r",
    "v",
    "x",
    "y",
    "z",
    "g",
    "h",
    "e",
    "f"
  ]);
  var UNITS = Object.freeze([
    "\xB0C",
    "\xB0F",
    "\u2103",
    "\u2109",
    "mL",
    "L",
    "\xB5L",
    "\u03BCL",
    "uL",
    "mol",
    "mmol",
    "\xB5mol",
    "\u03BCmol",
    "nmol",
    "g",
    "mg",
    "kg",
    "\xB5g",
    "\u03BCg",
    "ng",
    "m",
    "cm",
    "mm",
    "\xB5m",
    "\u03BCm",
    "nm",
    "pm",
    "\xC5",
    "s",
    "ms",
    "\xB5s",
    "\u03BCs",
    "ns",
    "min",
    "h",
    "d",
    "Hz",
    "kHz",
    "MHz",
    "GHz",
    "K",
    "eV",
    "keV",
    "meV",
    "J",
    "kJ",
    "cal",
    "kcal",
    "V",
    "mV",
    "A",
    "mA",
    "W",
    "mW",
    "Pa",
    "kPa",
    "MPa",
    "GPa",
    "bar",
    "atm",
    "Torr",
    "equiv",
    "wt",
    "vol",
    "ppm",
    "ppb",
    "M",
    "mM",
    "\xB5M",
    "\u03BCM",
    "nM"
  ]);
  var NMR_NUCLIDES = Object.freeze([
    "1H",
    "2H",
    "3H",
    "6Li",
    "7Li",
    "9Be",
    "10B",
    "11B",
    "13C",
    "14N",
    "15N",
    "17O",
    "19F",
    "23Na",
    "25Mg",
    "27Al",
    "29Si",
    "31P",
    "33S",
    "35Cl",
    "37Cl",
    "39K",
    "43Ca",
    "45Sc",
    "47Ti",
    "49Ti",
    "51V",
    "53Cr",
    "55Mn",
    "57Fe",
    "59Co",
    "61Ni",
    "63Cu",
    "65Cu",
    "67Zn",
    "69Ga",
    "71Ga",
    "73Ge",
    "75As",
    "77Se",
    "79Br",
    "81Br",
    "87Rb",
    "87Sr",
    "89Y",
    "91Zr",
    "93Nb",
    "95Mo",
    "99Ru",
    "103Rh",
    "105Pd",
    "107Ag",
    "109Ag",
    "111Cd",
    "113Cd",
    "115In",
    "117Sn",
    "119Sn",
    "121Sb",
    "125Te",
    "127I",
    "133Cs",
    "137Ba",
    "139La",
    "183W",
    "187Os",
    "191Ir",
    "195Pt",
    "197Au",
    "199Hg",
    "203Tl",
    "205Tl",
    "207Pb",
    "209Bi"
  ]);
  var COMMON_ABBREVIATIONS = Object.freeze([
    // 測定・分析
    "NMR",
    "IR",
    "UV",
    "VIS",
    "MS",
    "HRMS",
    "LRMS",
    "ESI",
    "EI",
    "FAB",
    "MALDI",
    "TOF",
    "GC",
    "LC",
    "HPLC",
    "GPC",
    "SEC",
    "TLC",
    "XRD",
    "XPS",
    "SEM",
    "TEM",
    "AFM",
    "STM",
    "EPR",
    "ESR",
    "CV",
    "CD",
    "ORD",
    "DSC",
    "TGA",
    "ICP",
    "EDX",
    "SAXS",
    "DLS",
    // 理論・計算
    "DFT",
    "TDDFT",
    "HOMO",
    "LUMO",
    "SOMO",
    "MO",
    "SCF",
    "ZPE",
    "RMSD",
    "QM",
    "MM",
    "MD",
    // 試薬・溶媒
    "THF",
    "DMF",
    "DMSO",
    "DME",
    "DCM",
    "DCE",
    "NMP",
    "TFA",
    "TFE",
    "TMS",
    "TBS",
    "TBDMS",
    "TIPS",
    "PMB",
    "LDA",
    "LiHMDS",
    "NBS",
    "NIS",
    "DDQ",
    "AIBN",
    "TEMPO",
    "DIBAL",
    "DMAP",
    "TBAF",
    "EDTA",
    "SDS",
    "PBS",
    "DIPEA",
    "HMPA",
    // 物性・デバイス
    "PL",
    "EL",
    "QY",
    "ISC",
    "FRET",
    "LED",
    "OLED",
    "OFET",
    "OPV",
    "PCE",
    "EQE",
    "CT",
    // 一般
    "SI",
    "CAS",
    "CCDC",
    "PDB",
    "IUPAC",
    "ACS",
    "RSC",
    "USA",
    "UK",
    "EU",
    "OK",
    "AI",
    "ML",
    "CPU",
    "GPU",
    "API",
    "PDF",
    "XML",
    "HTML",
    "URL",
    "ID",
    "RT",
    // 見出しに現れる全角大文字語（略語ではない）
    "ABSTRACT",
    "INTRODUCTION",
    "RESULTS",
    "DISCUSSION",
    "CONCLUSION",
    "CONCLUSIONS",
    "METHODS",
    "EXPERIMENTAL",
    "REFERENCES",
    "SUPPORTING",
    "INFORMATION",
    "SECTION",
    "GENERAL",
    "SCHEME",
    "FIGURE",
    "TABLE",
    "NOTE",
    "NOTES"
  ]);
  var ALKYL_PREFIXES = Object.freeze([
    "n",
    "i",
    "s",
    "t",
    "iso",
    "sec",
    "tert",
    "neo",
    "cyclo",
    "c"
  ]);
  var ALKYL_GROUPS = Object.freeze([
    "Bu",
    "Pr",
    "Am",
    "Hex",
    "Oct",
    "BuLi",
    "BuOH",
    "PrOH",
    "BuOK",
    "BuONa"
  ]);
  var EN_DASH_PAIRS = Object.freeze([
    ["HOMO", "LUMO"],
    ["HOMO", "SOMO"],
    ["SOMO", "LUMO"],
    ["donor", "acceptor"],
    ["structure", "property"],
    ["structure", "activity"],
    ["metal", "ligand"],
    ["Diels", "Alder"],
    ["Suzuki", "Miyaura"],
    ["Sonogashira", "Hagihara"],
    ["Buchwald", "Hartwig"],
    ["Mizoroki", "Heck"],
    ["Stille", "Migita"],
    ["Friedel", "Crafts"],
    ["Birch", "H\xFCckel"],
    ["Marcus", "Hush"],
    ["Jahn", "Teller"],
    ["Beer", "Lambert"],
    ["Stern", "Volmer"],
    ["Franck", "Condon"],
    ["Born", "Oppenheimer"],
    ["Lennard", "Jones"],
    ["Hartree", "Fock"],
    ["Kohn", "Sham"]
  ]);

  // src/core/types.ts
  var CATEGORIES = Object.freeze({
    structure: {
      id: "structure",
      label: "1-(1) \u30D1\u30E9\u30B0\u30E9\u30D5\u306E\u69CB\u6210",
      short: "\u69CB\u6210",
      highlight: "#FF80FF",
      swatch: "#ff80ff",
      markerName: "\u30D4\u30F3\u30AF"
    },
    science: {
      id: "science",
      label: "1-(2) \u79D1\u5B66\u7684\u6B63\u78BA\u3055",
      short: "\u79D1\u5B66",
      highlight: "#80FFFF",
      swatch: "#80ffff",
      markerName: "\u9752"
    },
    readability: {
      id: "readability",
      label: "1-(3) \u6587\u7AE0\u306E\u53EF\u8AAD\u6027",
      short: "\u53EF\u8AAD\u6027",
      highlight: "#B6FF00",
      swatch: "#b6ff00",
      markerName: "\u9EC4\u7DD1"
    },
    format: {
      id: "format",
      label: "2 \u66F8\u5F0F\u4E0A\u306E\u8AA4\u308A",
      short: "\u66F8\u5F0F",
      highlight: "#FFFF00",
      swatch: "#ffff00",
      markerName: "\u9EC4"
    },
    figure: {
      id: "figure",
      label: "2-(2) \u56F3\u8868\u95A2\u4FC2",
      short: "\u56F3\u8868",
      highlight: "#FFFF00",
      swatch: "#ffe066",
      markerName: "\u9EC4"
    },
    reference: {
      id: "reference",
      label: "2-(3) \u53C2\u8003\u6587\u732E",
      short: "\u6587\u732E",
      highlight: "#FFFF00",
      swatch: "#ffd699",
      markerName: "\u9EC4"
    }
  });
  var DEFAULT_SETTINGS = Object.freeze({
    // 100 字では論文でごく普通の文まで拾っていた。長さは足切りで、読みにくさの
    // 判断は long-sentence の構造チェックが受け持つ。
    maxSentenceLength: 200,
    documentLanguage: "auto"
  });
  function finding(rule, args) {
    return {
      ruleId: rule.id,
      category: rule.category,
      severity: args.severity,
      paragraphIndex: args.paragraphIndex,
      start: args.start,
      end: args.start + args.matched.length,
      matched: args.matched,
      ...args.replacement === void 0 ? {} : { replacement: args.replacement },
      message: args.message
    };
  }

  // src/core/text.ts
  var CLASS = Object.freeze({
    /** Hiragana, katakana, CJK ideographs, and full-width forms. */
    cjk: "\\u3040-\\u30FF\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uFF00-\\uFFEF\\u3000-\\u303F",
    greek: "\\u0370-\\u03FF\\u1F00-\\u1FFF",
    /** Sentence terminators in both scripts. */
    terminator: "\u3002\uFF0E\\.!?\uFF01\uFF1F"
  });
  var CJK_RE = new RegExp(`[${CLASS.cjk}]`, "u");
  var CJK_GLOBAL_RE = new RegExp(`[${CLASS.cjk}]`, "gu");
  function hasCJK(text) {
    return CJK_RE.test(text);
  }
  var SENTENCE_END = new RegExp(`[${CLASS.terminator}]`, "u");
  function splitSentences(paragraph) {
    const sentences = [];
    let start = 0;
    for (let i = 0; i < paragraph.length; i += 1) {
      const ch = paragraph[i];
      if (!SENTENCE_END.test(ch)) continue;
      if ((ch === "." || ch === "\uFF0E") && !endsSentence(paragraph, i)) continue;
      let end = i + 1;
      while (end < paragraph.length && /[)）」』】\]”’"']/u.test(paragraph[end])) end += 1;
      const text = paragraph.slice(start, end);
      if (text.trim().length > 0) sentences.push({ text, start });
      start = end;
    }
    const tail = paragraph.slice(start);
    if (tail.trim().length > 0) sentences.push({ text: tail, start });
    return sentences;
  }
  function endsSentence(text, i) {
    var _a, _b, _c, _d;
    const before = (_a = text[i - 1]) != null ? _a : "";
    const after = (_b = text[i + 1]) != null ? _b : "";
    if (/\d/u.test(before) && /\d/u.test(after)) return false;
    const token = (_d = (_c = /([A-Za-z]+)\.$/u.exec(text.slice(0, i + 1))) == null ? void 0 : _c[1]) != null ? _d : "";
    if (token.length > 0 && token.length <= 4 && /^[A-Z]/u.test(token) && /^\s*[A-Z0-9(]/u.test(after ? text.slice(i + 1) : "")) {
      return false;
    }
    if (/\b(et al|vs|cf|e\.g|i\.e|approx|ca|eq|ref)\.$/iu.test(text.slice(0, i + 1))) return false;
    return true;
  }
  function* matchAll(re, text) {
    const cursor = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
    cursor.lastIndex = 0;
    let m;
    while ((m = cursor.exec(text)) !== null) {
      yield m;
      if (m[0].length === 0) cursor.lastIndex += 1;
    }
  }
  function escapeRegExp(literal) {
    return literal.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  }

  // src/core/rules/format.ts
  var NUMERIC_RANGE = /(?<![,\d–-])(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)(?![-–+*]*[A-Za-z(0-9])/gu;
  var rangeDashRule = {
    id: "range-dash",
    category: "format",
    title: "\u7BC4\u56F2\u306E\u6A2A\u68D2\u306F en dash",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(NUMERIC_RANGE, text)) {
        const replacement = `${m[1]}\u2013${m[2]}`;
        if (m[0] === replacement) continue;
        found.push(
          finding(rangeDashRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: `\u7BC4\u56F2\u3092\u793A\u3059\u6A2A\u68D2\u306F\u30CF\u30A4\u30D5\u30F3\u3067\u306A\u304F en dash\uFF08\u2013\uFF09\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      }
      return found;
    }
  };
  var NAME_PREFIXES = [
    "tert",
    "trans",
    "cyclo",
    "sec",
    "neo",
    "iso",
    "cis",
    "n",
    "i",
    "s",
    "t",
    "o",
    "m",
    "p",
    "N",
    "O",
    "S",
    "P",
    "E",
    "Z",
    "R",
    "D",
    "L",
    "\u03B1",
    "\u03B2",
    "\u03B3",
    "\u03B4",
    "\u03C0",
    "\u03C3",
    "\u03C9"
  ];
  var NAME_GROUPS = [
    ...ALKYL_GROUPS,
    "Me",
    "Et",
    "Ph",
    "Bn",
    "Ac",
    "Ts",
    "Tf",
    "Ms",
    "Boc",
    "Cbz"
  ];
  var byLengthDesc = (a, b) => b.length - a.length;
  var COMPOUND_EN_DASH = new RegExp(
    `(?<![A-Za-z0-9])(\\d+(?:,\\d+)*|${[...NAME_PREFIXES].sort(byLengthDesc).map(escapeRegExp).join("|")})\u2013([a-z]{3,}|(?:${[...NAME_GROUPS].sort(byLengthDesc).join("|")})(?![a-z]))`,
    "gu"
  );
  var compoundHyphenRule = {
    id: "compound-hyphen",
    category: "format",
    title: "\u5316\u5408\u7269\u540D\u306E\u6A2A\u68D2\u306F\u30CF\u30A4\u30D5\u30F3",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(COMPOUND_EN_DASH, text)) {
        const replacement = `${m[1]}-${m[2]}`;
        found.push(
          finding(compoundHyphenRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: `\u5316\u5408\u7269\u547D\u540D\u306E\u6A2A\u68D2\u306F en dash \u3067\u306A\u304F\u30CF\u30A4\u30D5\u30F3\uFF08-\uFF09\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      }
      return found;
    }
  };
  var PRIME_AS_APOSTROPHE = /([0-9A-Za-z\])])(['’‘`´])(?![a-z])/gu;
  var primeRule = {
    id: "prime-apostrophe",
    category: "format",
    title: "\u30D7\u30E9\u30A4\u30E0\u304C\u30A2\u30DD\u30B9\u30C8\u30ED\u30D5\u30A3\u30FC\u306B\u306A\u3063\u3066\u3044\u308B",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(PRIME_AS_APOSTROPHE, text)) {
        const replacement = `${m[1]}\u2032`;
        found.push(
          finding(primeRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: `\u30D7\u30E9\u30A4\u30E0\u306F\u30A2\u30DD\u30B9\u30C8\u30ED\u30D5\u30A3\u30FC\uFF08${m[2]}\uFF09\u3067\u306A\u304F U+2032\uFF08\u2032\uFF09\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      }
      return found;
    }
  };
  var UNIT_ALT = [...UNITS].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|");
  var UNIT_PATTERN = new RegExp(
    `(?<![A-Za-z0-9.])(\\d+(?:\\.\\d+)?)(${UNIT_ALT})(?![A-Za-z0-9])`,
    "gu"
  );
  var TIGHT_OPERATOR = /(?<=[A-Za-z0-9Ͱ-Ͽ)])([=<>≤≥±×])(?=[-−–]?[A-Za-z0-9.(Ͱ-Ͽ])/gu;
  var NUMBER_AHEAD = /^[-−–]?\d/u;
  var AMBIGUOUS_LABEL = /^\d+[a-z]$/u;
  var missingSpaceRule = {
    id: "space-missing",
    category: "format",
    title: "\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\u306E\u8AA4\u308A\u2460\uFF08\u4E0D\u8DB3\uFF09",
    kind: "paragraph",
    run(text, index, ctx) {
      var _a, _b;
      const found = [];
      for (const m of matchAll(UNIT_PATTERN, text)) {
        const replacement = `${m[1]} ${m[2]}`;
        const ambiguous = AMBIGUOUS_LABEL.test(m[0]);
        if (ambiguous && ctx.compoundLabels.has(m[0])) continue;
        found.push(
          finding(missingSpaceRule, {
            severity: ambiguous ? "confirm" : "fix",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: ambiguous ? `\u6570\u5024\u3068\u5358\u4F4D\u306A\u3089\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D\uFF08\u5316\u5408\u7269\u756A\u53F7\u306A\u3089\u3001\u3053\u306E\u307E\u307E\u3067\u6B63\u3057\u3044\uFF09` : `\u6570\u5024\u3068\u5358\u4F4D\u306E\u9593\u306B\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      }
      for (const m of matchAll(TIGHT_OPERATOR, text)) {
        const before = (_a = text[m.index - 1]) != null ? _a : "";
        const after = (_b = text[m.index + 1]) != null ? _b : "";
        if (m[1] === "=" && !NUMBER_AHEAD.test(text.slice(m.index + 1))) continue;
        const matched = `${before}${m[1]}${after}`;
        found.push(
          finding(missingSpaceRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index - 1,
            matched,
            replacement: `${before} ${m[1]} ${after}`,
            message: `\u6F14\u7B97\u5B50\u306E\u524D\u5F8C\u306B\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\uFF1A\u300C${matched}\u300D\u2192\u300C${before} ${m[1]} ${after}\u300D`
          })
        );
      }
      return found;
    }
  };
  var NEGATIVE_VALUE = new RegExp(
    `(?<![A-Za-z0-9)\\]\u2013-])([-\u2212])(\\d+(?:\\.\\d+)?)(?=\\s*(?:${UNIT_ALT})(?![A-Za-z0-9]))`,
    "gu"
  );
  var negativeDashRule = {
    id: "negative-dash",
    category: "format",
    title: "\u8CA0\u53F7\u306F en dash",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(NEGATIVE_VALUE, text)) {
        const replacement = `\u2013${m[2]}`;
        const name = m[1] === "-" ? "\u30CF\u30A4\u30D5\u30F3" : "\u30DE\u30A4\u30CA\u30B9\u8A18\u53F7\uFF08U+2212\uFF09";
        found.push(
          finding(negativeDashRule, {
            severity: "fix",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: `\u8CA0\u53F7\u306F${name}\u3067\u306A\u304F en dash\uFF08\u2013\uFF09\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      }
      return found;
    }
  };
  var UNIT_CHARACTERS = [
    { re: /℃/gu, to: "\xB0C", why: "\u2103\uFF081 \u6587\u5B57\uFF09\u3067\u306F\u306A\u304F\u300C\xB0\u300D\uFF0B\u300CC\u300D\u306E 2 \u6587\u5B57" },
    { re: /℉/gu, to: "\xB0F", why: "\u2109\uFF081 \u6587\u5B57\uFF09\u3067\u306F\u306A\u304F\u300C\xB0\u300D\uFF0B\u300CF\u300D\u306E 2 \u6587\u5B57" },
    { re: /º(?=\s*[CF])/gu, to: "\xB0", why: "\u5E8F\u6570\u8A18\u53F7 \xBA \u3067\u306F\u306A\u304F\u5EA6\u8A18\u53F7 \xB0\uFF08U+00B0\uFF09" }
  ];
  var celsiusSignRule = {
    id: "celsius-sign",
    category: "format",
    title: "\u2103 \u306F \xB0C \u3068\u66F8\u304F",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const { re, to, why } of UNIT_CHARACTERS) {
        for (const m of matchAll(re, text)) {
          found.push(
            finding(celsiusSignRule, {
              severity: "fix",
              paragraphIndex: index,
              start: m.index,
              matched: m[0],
              replacement: to,
              message: `${why}\uFF1A\u300C${m[0]}\u300D\u2192\u300C${to}\u300D\uFF08Mac \u3067\u306F \u2325 + shift + 8 \u3067 \xB0\uFF09`
            })
          );
        }
      }
      return found;
    }
  };
  var extraSpaceRule = {
    id: "space-extra",
    category: "format",
    title: "\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\u306E\u8AA4\u308A\u2461\uFF08\u4F59\u5206\uFF09",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      const cases = [
        // 和文の前後に付いた半角スペース（全角文字どうしの間）
        {
          re: /([぀-ヿ一-鿿])[ 　]+([぀-ヿ一-鿿])/gu,
          fix: (m) => `${m[1]}${m[2]}`,
          why: "\u548C\u6587\u3069\u3046\u3057\u306E\u9593\u306E\u7A7A\u767D\u306F\u4E0D\u8981"
        },
        // 句読点・閉じ括弧の直前の空白
        {
          re: /[ ]+([,.;:)\]、。，．）」』])/gu,
          fix: (m) => m[1],
          why: "\u53E5\u8AAD\u70B9\u30FB\u9589\u3058\u62EC\u5F27\u306E\u76F4\u524D\u306E\u7A7A\u767D\u306F\u4E0D\u8981"
        },
        // 開き括弧の直後の空白
        {
          re: /([(\[（「『])[ ]+/gu,
          fix: (m) => m[1],
          why: "\u958B\u304D\u62EC\u5F27\u306E\u76F4\u5F8C\u306E\u7A7A\u767D\u306F\u4E0D\u8981"
        },
        // 連続した空白
        {
          re: /[ ]{2,}/gu,
          fix: () => " ",
          why: "\u7A7A\u767D\u304C\u9023\u7D9A\u3057\u3066\u3044\u307E\u3059"
        },
        // 全角スペース（和文組版の字下げ以外では使わない）
        {
          re: /(?<=\S)　+/gu,
          fix: () => " ",
          why: "\u5168\u89D2\u30B9\u30DA\u30FC\u30B9\u304C\u4F7F\u308F\u308C\u3066\u3044\u307E\u3059"
        }
      ];
      for (const { re, fix, why } of cases) {
        for (const m of matchAll(re, text)) {
          const replacement = fix(m);
          if (replacement === m[0]) continue;
          found.push(
            finding(extraSpaceRule, {
              severity: "fix",
              paragraphIndex: index,
              start: m.index,
              matched: m[0],
              replacement,
              message: `${why}\uFF1A\u300C${m[0].replace(/ /gu, "\u2423").replace(/　/gu, "\u25A1")}\u300D\u2192\u300C${replacement.replace(/ /gu, "\u2423")}\u300D`
            })
          );
        }
      }
      return found;
    }
  };
  var ALKYL_PATTERN = new RegExp(
    `\\b(${[...ALKYL_PREFIXES].sort((a, b) => b.length - a.length).join("|")})(-?)(${[...ALKYL_GROUPS].sort((a, b) => b.length - a.length).join("|")})\\b`,
    "gu"
  );
  var reagentStyleRule = {
    id: "reagent-style",
    category: "format",
    title: "n-BuLi / nBuLi \u306E\u69D8\u5F0F\u7D71\u4E00",
    kind: "document",
    run(paragraphs) {
      var _a;
      const hits = [];
      paragraphs.forEach((p, paragraphIndex) => {
        for (const m of matchAll(ALKYL_PATTERN, p)) {
          hits.push({
            paragraphIndex,
            start: m.index,
            text: m[0],
            key: `${m[1]}${m[3]}`,
            hyphenated: m[2] === "-"
          });
        }
      });
      const styles = /* @__PURE__ */ new Map();
      for (const hit of hits) {
        if (!styles.has(hit.key)) styles.set(hit.key, /* @__PURE__ */ new Set());
        styles.get(hit.key).add(hit.hyphenated);
      }
      const hyphenated = hits.filter((h) => h.hyphenated).length;
      const preferHyphen = hyphenated >= hits.length - hyphenated;
      const found = [];
      for (const hit of hits) {
        if (styles.get(hit.key).size < 2) continue;
        if (hit.hyphenated === preferHyphen) continue;
        const [, prefix, , group] = (_a = ALKYL_PATTERN.exec(hit.text)) != null ? _a : [];
        ALKYL_PATTERN.lastIndex = 0;
        if (!prefix || !group) continue;
        const replacement = preferHyphen ? `${prefix}-${group}` : `${prefix}${group}`;
        found.push(
          finding(reagentStyleRule, {
            severity: "confirm",
            paragraphIndex: hit.paragraphIndex,
            start: hit.start,
            matched: hit.text,
            replacement,
            message: `\u8A66\u85AC\u8868\u8A18\u306E\u69D8\u5F0F\u304C\u6DF7\u5728\u3057\u3066\u3044\u307E\u3059\uFF1A\u300C${hit.text}\u300D\u2192\u300C${replacement}\u300D\u306B\u7D71\u4E00`
          })
        );
      }
      return found;
    }
  };
  var GREEK = "\\u0370-\\u03FF\\u1F00-\\u1FFF";
  var CJK = "\\u3040-\\u30FF\\u3400-\\u4DBF\\u4E00-\\u9FFF";
  var GREEK_CJK_BOUNDARY = new RegExp(`([${GREEK}][${CJK}])|([${CJK}][${GREEK}])`, "gu");
  var SYMBOL_CJK_BOUNDARY = new RegExp(
    `((?<![A-Za-z0-9])[A-Za-z][${CJK}])|([${CJK}][A-Za-z](?![A-Za-z0-9]))`,
    "gu"
  );
  var greekSpacingRule = {
    id: "greek-cjk-space",
    category: "format",
    title: "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u3068\u548C\u6587\u306E\u9593\u9694",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(GREEK_CJK_BOUNDARY, text)) {
        const pair = m[0];
        const replacement = `${pair[0]} ${pair[1]}`;
        found.push(
          finding(greekSpacingRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index,
            matched: pair,
            replacement,
            message: `\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u3068\u548C\u6587\u306E\u9593\u306B\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\uFF1A\u300C${pair}\u300D\u2192\u300C${replacement}\u300D\uFF08\u6295\u7A3F\u898F\u7A0B\u3092\u78BA\u8A8D\uFF09`
          })
        );
      }
      for (const m of matchAll(SYMBOL_CJK_BOUNDARY, text)) {
        const pair = m[0];
        const replacement = `${pair[0]} ${pair[1]}`;
        found.push(
          finding(greekSpacingRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index,
            matched: pair,
            replacement,
            message: `\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u3068\u548C\u6587\u306E\u9593\u306B\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\uFF1A\u300C${pair}\u300D\u2192\u300C${replacement}\u300D\uFF08\u6295\u7A3F\u898F\u7A0B\u3092\u78BA\u8A8D\uFF09`
          })
        );
      }
      return found.sort((a, b) => a.start - b.start);
    }
  };
  var JA_CHAR = /[\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Han}]/u;
  var LATIN_RUN = /[A-Za-z0-9]+/gu;
  var LONE_LETTER = /^[A-Za-z]$/u;
  var japaneseLatinSpacingRule = {
    id: "ja-latin-space",
    category: "format",
    title: "\u548C\u6587\u3068\u82F1\u6570\u5B57\u306E\u9593\u9694",
    kind: "paragraph",
    run(text, index) {
      var _a, _b;
      const found = [];
      const report = (start, stop) => {
        const matched = text.slice(start, stop);
        const replacement = [...matched].join(" ");
        found.push(
          finding(japaneseLatinSpacingRule, {
            severity: "fix",
            paragraphIndex: index,
            start,
            matched,
            replacement,
            message: `\u548C\u6587\u3068\u82F1\u6570\u5B57\u306E\u9593\u306B\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\uFF1A\u300C${matched}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      };
      for (const m of matchAll(LATIN_RUN, text)) {
        if (LONE_LETTER.test(m[0])) continue;
        const end = m.index + m[0].length;
        const before = JA_CHAR.test((_a = text[m.index - 1]) != null ? _a : "");
        const after = JA_CHAR.test((_b = text[end]) != null ? _b : "");
        if (before && after && m[0].length === 1) {
          report(m.index - 1, end + 1);
          continue;
        }
        if (before) report(m.index - 1, m.index + 1);
        if (after) report(end - 1, end + 1);
      }
      return found;
    }
  };
  var EN_DASH_PAIR = new RegExp(
    `(?<![A-Za-z0-9-])(${EN_DASH_PAIRS.map(([a]) => escapeRegExp(a)).join("|")})-(${EN_DASH_PAIRS.map(
      ([, b]) => escapeRegExp(b)
    ).join("|")})(?![A-Za-z0-9-])`,
    "giu"
  );
  var PAIR_KEYS = new Set(EN_DASH_PAIRS.map(([a, b]) => `${a}-${b}`.toLowerCase()));
  var pairDashRule = {
    id: "pair-dash",
    category: "format",
    title: "\u5BFE\u306B\u306A\u308B\u8A9E\u3092\u7D50\u3076\u6A2A\u68D2\u306F en dash",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(EN_DASH_PAIR, text)) {
        if (!PAIR_KEYS.has(`${m[1]}-${m[2]}`.toLowerCase())) continue;
        const replacement = `${m[1]}\u2013${m[2]}`;
        found.push(
          finding(pairDashRule, {
            severity: "fix",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: `\u5BFE\u306B\u306A\u308B\u8A9E\u3092\u7D50\u3076\u6A2A\u68D2\u306F en dash\uFF08\u2013\uFF09\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
          })
        );
      }
      return found;
    }
  };
  var FORMAT_RULES = [
    rangeDashRule,
    pairDashRule,
    negativeDashRule,
    celsiusSignRule,
    compoundHyphenRule,
    primeRule,
    missingSpaceRule,
    extraSpaceRule,
    japaneseLatinSpacingRule,
    greekSpacingRule,
    reagentStyleRule
  ];

  // src/core/catalog.ts
  var RULE_DOCS = Object.freeze({
    // --- 1-(2) 科学的正確さ ---------------------------------------------------
    "undefined-abbreviation": {
      summary: "\u521D\u51FA\u3067\u6B63\u5F0F\u540D\u79F0\u304C\u793A\u3055\u308C\u3066\u3044\u306A\u3044\u7565\u8A9E\u3002\u3088\u304F\u77E5\u3089\u308C\u305F\u7565\u8A9E\uFF08NMR\u3001DFT\u3001THF \u306A\u3069\uFF09\u306F\u5BFE\u8C61\u5916\u3067\u3001\u305D\u306E\u4E00\u89A7\u306F src/core/dict.ts \u306E COMMON_ABBREVIATIONS \u306B\u3042\u308A\u307E\u3059\u3002\u5316\u5B66\u5F0F\uFF08CO2\u3001NaCl\uFF09\u3068\u30ED\u30FC\u30DE\u6570\u5B57\u306F\u7565\u8A9E\u3068\u3057\u3066\u6570\u3048\u307E\u305B\u3093\u3002",
      example: "TBAF \u3092\u52A0\u3048\u305F \u2192 \u30C6\u30C8\u30E9\u30D6\u30C1\u30EB\u30A2\u30F3\u30E2\u30CB\u30A6\u30E0\u30D5\u30EB\u30AA\u30EA\u30C9\uFF08TBAF\uFF09\u3092\u52A0\u3048\u305F"
    },
    // --- 1-(3) 文章の可読性 ---------------------------------------------------
    "kanji-to-kana": {
      summary: "\u63A5\u7D9A\u8A5E\u3084\u526F\u8A5E\u306A\u3069\u3001\u79D1\u5B66\u6280\u8853\u6587\u3067\u901A\u4F8B\u304B\u306A\u66F8\u304D\u306B\u3059\u308B\u8A9E\u3092\u6F22\u5B57\u3067\u66F8\u3044\u3066\u3044\u308B\u7B87\u6240\u3002",
      example: "\u66F4\u306B\u691C\u8A0E\u3057\u305F \u2192 \u3055\u3089\u306B\u691C\u8A0E\u3057\u305F"
    },
    "kanji-meaning": {
      summary: "\u6F22\u5B57\u3068\u304B\u306A\u3067\u610F\u5473\u304C\u5909\u308F\u308B\u8A9E\u3002\u7121\u751F\u7269\u304C\u4E3B\u8A9E\u306E\u3068\u304D\u3084\u5F62\u5F0F\u540D\u8A5E\u306F\u304B\u306A\u66F8\u304D\u306B\u3057\u307E\u3059\u3002",
      example: "\u9AD8\u3044\u71B1\u5B89\u5B9A\u6027\u3092\u6301\u3064 \u2192 \u3082\u3064\uFF0F\u305D\u306E\u4E8B\u304B\u3089 \u2192 \u305D\u306E\u3053\u3068\u304B\u3089"
    },
    "verbose-expression": {
      summary: "\u540C\u3058\u610F\u5473\u3092\u3088\u308A\u77ED\u304F\u66F8\u3051\u308B\u8A00\u3044\u56DE\u3057\u3002\u5197\u9577\u306A\u8868\u73FE\u306F\u4E3B\u5F35\u3092\u307C\u304B\u3057\u307E\u3059\u3002",
      example: "\u660E\u3089\u304B\u306B\u306A\u3063\u305F \u2192 \u308F\u304B\u3063\u305F\uFF0F\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u308B \u2192 \u3067\u304D\u308B"
    },
    "casual-expression": {
      summary: "\u8A71\u3057\u8A00\u8449\u30FB\u53E3\u8A9E\u7684\u306A\u5F37\u8ABF\u8A9E\u3002\u8AD6\u6587\u306E\u6587\u4F53\u306B\u305D\u3050\u308F\u306A\u3044\u8A9E\u3092\u6307\u6458\u3057\u307E\u3059\u3002",
      example: "\u3059\u3054\u304F\u5927\u304D\u3044 \u2192 \u975E\u5E38\u306B\u5927\u304D\u3044"
    },
    "long-sentence": {
      summary: "\u9577\u3044\u3046\u3048\u306B\u8AAD\u307F\u4E0B\u3057\u306B\u304F\u3044\u6587\u3002\u8AD6\u6587\u3067\u306F 150\u301C200 \u5B57\u3067\u3082\u81EA\u7136\u306A\u6587\u304C\u3042\u308B\u306E\u3067\u3001\u5B57\u6570\uFF08\u8A2D\u5B9A\u3067\u5909\u66F4\u53EF\uFF09\u3092\u8D85\u3048\u305F\u3082\u306E\u3059\u3079\u3066\u3067\u306F\u306A\u304F\u3001\u533A\u5207\u308A\u306A\u3057\u306B 60 \u5B57\u4EE5\u4E0A\u7D9A\u304F\u304B\u3001\u76EE\u5B89\u306E 1.5 \u500D\u3092\u8D85\u3048\u308B\u6587\u3060\u3051\u3092\u6307\u6458\u3057\u307E\u3059\u3002",
      example: "\u65E2\u5B9A\u306F 200 \u5B57\u8D85\uFF08\u8AAD\u70B9\u306E\u306A\u3044\u7D9A\u304D\u304C\u9577\u3044\u6587\uFF09"
    },
    "no-chain": {
      summary: "\u300C\u306E\u300D\u3067\u540D\u8A5E\u3092\u3064\u306A\u304E\u7D9A\u3051\u3066\u3044\u308B\u7B87\u6240\u3002\u5206\u89E3\u3059\u308B\u3068\u8AAD\u307F\u3084\u3059\u304F\u306A\u308A\u307E\u3059\u304C\u3001\u5C02\u9580\u7528\u8A9E\u304C\u4E26\u3076\u3060\u3051\u3067 3 \u9023\u7D9A\u306B\u306A\u308B\u6587\u3082\u591A\u3044\u305F\u3081\u65E2\u5B9A\u3067\u306F\u7121\u52B9\u3067\u3059\u3002",
      example: "\u8A66\u6599\u306E\u8868\u9762\u306E\u9178\u5316\u306E\u72B6\u614B \u2192\uFF08\u5206\u89E3\u3092\u691C\u8A0E\uFF09",
      defaultEnabled: false
    },
    "multi-modifier": {
      summary: "\u8AAD\u70B9\u304C\u591A\u304F\u3001\u4FEE\u98FE\u304C\u91CD\u306A\u3063\u3066\u4FC2\u308A\u53D7\u3051\u304C\u8AAD\u307F\u53D6\u308A\u306B\u304F\u3044\u6587\u3002",
      example: "\u8AAD\u70B9\u304C 4 \u500B\u4EE5\u4E0A\u3042\u308B\u6587 \u2192\uFF08\u5206\u89E3\u3092\u691C\u8A0E\uFF09"
    },
    demonstrative: {
      summary: "1 \u6587\u306B\u6307\u793A\u8A9E\u304C 3 \u3064\u4EE5\u4E0A\u3042\u308B\u7B87\u6240\u3002\u6307\u3059\u5BFE\u8C61\u304C\u81EA\u660E\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      example: "\u3053\u308C\u3089\u306E\u305D\u306E\u7D50\u679C\u306F\u3053\u306E\u2026 \u2192\uFF08\u540D\u8A5E\u3067\u8A00\u3044\u76F4\u3059\uFF09"
    },
    "notation-variance": {
      summary: "\u540C\u3058\u8A9E\u3092 2 \u901A\u308A\u306B\u66F8\u3044\u3066\u3044\u308B\u7B87\u6240\u3002\u6587\u66F8\u5185\u3067\u591A\u6570\u6D3E\u306E\u8868\u8A18\u306B\u5BC4\u305B\u307E\u3059\u3002",
      example: "\u884C\u3046 \u3068 \u884C\u306A\u3046 \u306E\u6DF7\u5728"
    },
    "punctuation-consistency": {
      summary: "\u53E5\u8AAD\u70B9\u304C \u3002\u3001 \u3068 \uFF0E\uFF0C \u3067\u6DF7\u3056\u3063\u3066\u3044\u308B\u7B87\u6240\u3002\u3069\u3061\u3089\u304B\u306B\u7D71\u4E00\u3057\u307E\u3059\u3002",
      example: "\u3002\u3068\uFF0E\u306E\u6DF7\u5728"
    },
    "politeness-consistency": {
      summary: "\u3067\u3042\u308B\u4F53\u306E\u6587\u66F8\u306B\u6DF7\u3056\u3063\u305F \u3067\u3059\u30FB\u307E\u3059 \u4F53\u3002",
      example: "\u6E2C\u5B9A\u3057\u307E\u3057\u305F \u2192 \u6E2C\u5B9A\u3057\u305F"
    },
    // --- 2 書式上の誤り -------------------------------------------------------
    "range-dash": {
      summary: "\u6570\u5024\u306E\u7BC4\u56F2\u3092\u8868\u3059\u6A2A\u68D2\u3002\u30CF\u30A4\u30D5\u30F3\u3067\u306F\u306A\u304F en dash\uFF08\u2013\uFF09\u3092\u4F7F\u3044\u307E\u3059\u3002\u5316\u5408\u7269\u540D\u306E locant\uFF082-butanol\uFF09\u3068\u8A08\u7B97\u30EC\u30D9\u30EB\u306E\u57FA\u5E95\u95A2\u6570\uFF086-31G(d)\uFF09\u306F\u30CF\u30A4\u30D5\u30F3\u304C\u6B63\u3057\u3044\u306E\u3067\u5BFE\u8C61\u5916\u3067\u3059\u3002",
      example: "25-30 \xB0C \u2192 25\u201330 \xB0C"
    },
    "negative-dash": {
      summary: "\u8CA0\u306E\u5024\u306E\u524D\u306E\u6A2A\u68D2\u3002\u30CF\u30A4\u30D5\u30F3\u3084\u30DE\u30A4\u30CA\u30B9\u8A18\u53F7\uFF08U+2212\uFF09\u3067\u306F\u306A\u304F en dash\uFF08\u2013\uFF09\u306B\u3057\u307E\u3059\u3002\u6570\u5024\u306E\u5F8C\u308D\u306B\u5358\u4F4D\u304C\u7D9A\u304F\u5834\u5408\u3060\u3051\u3092\u898B\u308B\u306E\u3067\u3001\u5316\u5408\u7269\u540D\u306E locant \u3084\u30DA\u30FC\u30B8\u7BC4\u56F2\u306B\u306F\u53CD\u5FDC\u3057\u307E\u305B\u3093\u3002",
      example: "-78 \xB0C \u2192 \u201378 \xB0C"
    },
    "celsius-sign": {
      summary: "\u2103\uFF08U+2103\uFF09\u3084 \u2109 \u306E\u3088\u3046\u306A 1 \u6587\u5B57\u306E\u5358\u4F4D\u8A18\u53F7\u3002\u300C\xB0\u300D\uFF0B\u300CC\u300D\u306E 2 \u6587\u5B57\u3067\u66F8\u304D\u307E\u3059\u3002Mac \u306E\u5EA6\u8A18\u53F7\u306F \u2325 + shift + 8 \u3067\u3059\u3002\u89D2\u5EA6\u306E 90\xB0 \u306F\u5BFE\u8C61\u5916\u3067\u3059\u3002",
      example: "-78\u2103 \u2192 -78 \xB0C"
    },
    "pair-dash": {
      summary: "\u5BFE\u7B49\u306A 2 \u3064\u306E\u3082\u306E\u3092\u7D50\u3076\u6A2A\u68D2\u3002\u30CF\u30A4\u30D5\u30F3\u3067\u306F\u306A\u304F en dash\uFF08\u2013\uFF09\u3092\u4F7F\u3044\u307E\u3059\u3002\u6587\u5B57\u306E\u4E26\u3073\u3060\u3051\u3067\u306F n-BuLi \u3084 well-known \u3068\u533A\u5225\u304C\u4ED8\u304B\u306A\u3044\u305F\u3081\u3001src/core/dict.ts \u306E EN_DASH_PAIRS \u306B\u8F09\u3063\u3066\u3044\u308B\u7D44\uFF08HOMO-LUMO\u3001Diels-Alder\u3001donor-acceptor \u306A\u3069\uFF09\u3060\u3051\u3092\u898B\u307E\u3059\u3002\u7814\u7A76\u5BA4\u3067\u4F7F\u3046\u7D44\u306F\u8FFD\u8A18\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      example: "HOMO-LUMO \u30AE\u30E3\u30C3\u30D7 \u2192 HOMO\u2013LUMO \u30AE\u30E3\u30C3\u30D7"
    },
    "compound-hyphen": {
      summary: "\u5316\u5408\u7269\u540D\u306E\u4E2D\u306E\u6A2A\u68D2\u3002en dash \u3067\u306F\u306A\u304F\u30CF\u30A4\u30D5\u30F3\uFF08-\uFF09\u3092\u4F7F\u3044\u307E\u3059\u3002\u4E21\u5074\u304C\u5316\u5408\u7269\u540D\u3089\u3057\u3044\u3068\u304D\u3060\u3051\u898B\u308B\u306E\u3067\u3001HOMO\u2013LUMO \u3084 \u5316\u5408\u7269 a\u2013f \u306E\u3088\u3046\u306B en dash \u304C\u6B63\u3057\u3044\u7B87\u6240\u306F\u5BFE\u8C61\u5916\u3067\u3059\u3002",
      example: "2\u2013butanol \u2192 2-butanol\uFF0Fn\u2013BuLi \u2192 n-BuLi"
    },
    "prime-apostrophe": {
      summary: "\u30D7\u30E9\u30A4\u30E0\u304C\u30A2\u30DD\u30B9\u30C8\u30ED\u30D5\u30A3\u30FC\u3067\u4EE3\u7528\u3055\u308C\u3066\u3044\u308B\u7B87\u6240\u3002",
      example: "2' \u2192 2\u2032"
    },
    "space-missing": {
      summary: "\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\u304C\u5FC5\u8981\u306A\u5834\u6240\u306B\u5165\u3063\u3066\u3044\u306A\u3044\u7B87\u6240\uFF08\u6570\u5024\u3068\u5358\u4F4D\u3001\u6F14\u7B97\u5B50\u306E\u524D\u5F8C\uFF09\u3002= \u306F\u53F3\u304C\u6570\u5024\u306E\u3068\u304D\u3060\u3051\u6F14\u7B97\u5B50\u3068\u307F\u306A\u3059\u306E\u3067\u3001\u4E8C\u91CD\u7D50\u5408\u306E C=C \u306F\u5BFE\u8C61\u5916\u3067\u3059\u3002\u300C18d\u300D\u306E\u3088\u3046\u306B\u5316\u5408\u7269\u756A\u53F7\u3068\u3082\u8AAD\u3081\u308B\u5F62\u306F\u3001\u6587\u66F8\u304C 18a\u30FB18d \u306E\u3088\u3046\u306B\u7CFB\u5217\u3067\u4F7F\u3063\u3066\u3044\u308B\u304B\u300C\u5316\u5408\u7269 18d\u300D\u3068\u66F8\u3044\u3066\u3044\u308C\u3070\u6307\u6458\u3057\u307E\u305B\u3093\u3002\u3069\u3061\u3089\u306E\u624B\u304C\u304B\u308A\u3082\u306A\u3044\u3068\u304D\u3060\u3051\u3014\u78BA\u8A8D\u3015\u3068\u3057\u3066\u51FA\u3057\u307E\u3059\u3002",
      example: "10mL \u2192 10 mL\uFF0Fx=5 \u2192 x = 5\uFF0818d \u306F\u5316\u5408\u7269\u756A\u53F7\u306A\u3089\u5BFE\u8C61\u5916\uFF09"
    },
    "space-extra": {
      summary: "\u4E0D\u8981\u306A\u7A7A\u767D\u3002\u548C\u6587\u3069\u3046\u3057\u306E\u9593\u3001\u62EC\u5F27\u306E\u5185\u5074\u3001\u9023\u7D9A\u7A7A\u767D\u3001\u5168\u89D2\u30B9\u30DA\u30FC\u30B9\u3002",
      example: "\uFF08 1 \uFF09 \u2192 \uFF081\uFF09"
    },
    "ja-latin-space": {
      summary: "\u548C\u6587\u3068\u82F1\u6570\u5B57\u304C\u76F4\u63A5\u96A3\u308A\u5408\u3046\u7B87\u6240\u3002\u6570\u5B57\u3068\u548C\u6587\u306E\u52A9\u6570\u8A5E\uFF083\u7A2E\u985E\uFF09\u3082\u62FE\u3044\u307E\u3059\u3002\u4E0A\u4ED8\u304D\u306E\u6570\u5B57\u306F\u5F15\u7528\u756A\u53F7\u306A\u306E\u3067\u5BFE\u8C61\u5916\u3002\u8A18\u53F7 1 \u6587\u5B57\uFF08Symbol \u30D5\u30A9\u30F3\u30C8\u306E\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u306A\u3069\uFF09\u3082\u5BFE\u8C61\u5916\u3067\u3059\u3002",
      example: "Figure 1\u306B\u793A\u3059 \u2192 Figure 1 \u306B\u793A\u3059"
    },
    "greek-cjk-space": {
      // 2026-07-29 に既定で有効へ。要否が投稿規程で分かれるのは変わらないが、
      // 研究室の原稿では入れるほうが常だという利用者の判断。
      summary: "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u3068\u548C\u6587\u304C\u76F4\u63A5\u96A3\u308A\u5408\u3046\u7B87\u6240\u3002\u6295\u7A3F\u898F\u7A0B\u3067\u4E0D\u8981\u3068\u3055\u308C\u308B\u5834\u5408\u306F\u5916\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
      example: "\u03C0\u5171\u5F79 \u2192 \u03C0 \u5171\u5F79"
    },
    "reagent-style": {
      summary: "\u8A66\u85AC\u306E\u7565\u8A18\u304C\u8907\u6570\u306E\u66F8\u304D\u65B9\u3067\u6DF7\u3056\u3063\u3066\u3044\u308B\u7B87\u6240\u3002\u6587\u66F8\u5185\u3067\u7D71\u4E00\u3057\u307E\u3059\u3002",
      example: "n-BuLi \u3068 nBuLi \u306E\u6DF7\u5728"
    },
    "greek-symbol-font": {
      summary: "Unicode \u306E\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u3002Symbol \u30D5\u30A9\u30F3\u30C8\u306E\u6B27\u5B57\u306B\u7F6E\u304D\u63DB\u3048\u307E\u3059\uFF08\u03B1 \u306F\u300Ca\u300D\u3001\u03C0 \u306F\u300Cp\u300D\uFF09\u3002\u5358\u4F4D\u306E \xB5\uFF08\u30DE\u30A4\u30AF\u30ED\u8A18\u53F7\uFF09\u306F\u5BFE\u8C61\u5916\u3067\u3059\u3002",
      example: "\u03C0 \u5171\u5F79 \u2192 Symbol \u30D5\u30A9\u30F3\u30C8\u306E p"
    },
    "greek-font": {
      summary: "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u306B\u548C\u6587\u30D5\u30A9\u30F3\u30C8\u304C\u5F53\u305F\u3063\u3066\u3044\u308B\u7B87\u6240\u3002\u6B27\u6587\u30D5\u30A9\u30F3\u30C8\u306B\u76F4\u3057\u307E\u3059\u3002\u4E0A\u306E\u300CSymbol \u30D5\u30A9\u30F3\u30C8\u300D\u304C\u6709\u52B9\u306A\u3042\u3044\u3060\u306F\u3001\u305D\u3061\u3089\u304C\u540C\u3058\u7B87\u6240\u3092\u898B\u308B\u306E\u3067\u3053\u306E\u30EB\u30FC\u30EB\u306F\u52D5\u304D\u307E\u305B\u3093\u3002",
      example: "\u03C0 \u304C \uFF2D\uFF33\u660E\u671D"
    },
    "nmr-superscript": {
      summary: "NMR \u306E\u6838\u7A2E\u306E\u8CEA\u91CF\u6570\u304C\u4E0A\u4ED8\u304D\u306B\u306A\u3063\u3066\u3044\u306A\u3044\u7B87\u6240\uFF081H NMR \u2192 \xB9H NMR\uFF09\u3002\u5F8C\u308D\u306B NMR \u304C\u7D9A\u304F\u65E2\u77E5\u306E\u6838\u7A2E\u3060\u3051\u3092\u898B\u308B\u306E\u3067\u3001\u6B21\u5143\u3092\u8868\u3059 2D NMR\u30FB3D NMR \u306F\u5BFE\u8C61\u5916\u3067\u3059\u300213C{1H} NMR \u306E\u3088\u3046\u306A\u76F8\u95A2\u8868\u8A18\u306F\u5185\u5074\u306E\u6838\u7A2E\u3082\u76F4\u3057\u307E\u3059\u3002",
      example: "1H NMR\u300113C NMR \u306E\u300C1\u300D\u300C13\u300D\u3092\u4E0A\u4ED8\u304D\u306B"
    },
    "quantity-italic": {
      summary: "\u7269\u7406\u91CF\u306E\u8A18\u53F7\u306F\u30A4\u30BF\u30EA\u30C3\u30AF\u3002\u300C\u8A18\u53F7 = \u6570\u5024\u300D\u306E\u5F62\u3060\u3051\u3092\u898B\u307E\u3059\u3002",
      example: "T = 298 K \u306E T"
    },
    // --- 2-(2) 図表関係 -------------------------------------------------------
    "figure-paren-position": {
      summary: "\u6587\u672B\u306B\u62EC\u5F27\u3067\u56F3\u8868\u756A\u53F7\u3092\u66F8\u304F\u3068\u304D\u3001\u53E5\u70B9\u306F\u62EC\u5F27\u306E\u5F8C\u308D\u306B\u7F6E\u304D\u307E\u3059\u3002",
      example: "\u3067\u3042\u308B\uFF0E(Figure 1) \u2192 \u3067\u3042\u308B (Figure 1)\uFF0E"
    },
    "caption-punctuation": {
      summary: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u30D4\u30EA\u30AA\u30C9\u3002\u8AAC\u660E\u6587\u304C\u7D9A\u3051\u3070\u756A\u53F7\u306E\u5F8C\u306B\u3001\u672B\u5C3E\u306F\u5FC5\u305A\u30D4\u30EA\u30AA\u30C9\u3067\u6B62\u3081\u307E\u3059\u3002",
      example: "Figure 1 Absorption spectra \u2192 Figure 1. Absorption spectra."
    },
    "figure-cross-reference": {
      summary: "\u672C\u6587\u3068\u56F3\u8868\u306E\u5BFE\u5FDC\u3002\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306F\u3042\u308B\u306E\u306B\u672C\u6587\u304C\u89E6\u308C\u3066\u3044\u306A\u3044\u56F3\u8868\u3001\u5F15\u7528\u3057\u3066\u3044\u308B\u306E\u306B\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u304C\u306A\u3044\u756A\u53F7\u3001\u756A\u53F7\u306E\u98DB\u3073\u3092\u63A2\u3057\u307E\u3059\u3002\u56F31\u30FB\u88681\u30FB\u30B9\u30AD\u30FC\u30E01 \u3068\u3044\u3046\u548C\u6587\u306E\u66F8\u304D\u65B9\u3068\u3001Figures 1 and 2\uFF0FFigs. 1\u20133 \u306E\u3088\u3046\u306A\u307E\u3068\u3081\u5F15\u7528\u306B\u3082\u5BFE\u5FDC\u3057\u307E\u3059\u3002",
      example: "Figure 2 \u306E\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306F\u3042\u308B\u304C\u3001\u672C\u6587\u304C\u3069\u3053\u304B\u3089\u3082\u8A00\u53CA\u3057\u3066\u3044\u306A\u3044"
    },
    "caption-alignment": {
      summary: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u914D\u7F6E\u3002\u4E2D\u592E\u63C3\u3048\u3067\u306F\u306A\u304F\u56F3\u306E\u5DE6\u7AEF\uFF08\u5DE6\u63C3\u3048\uFF09\u306B\u5408\u308F\u305B\u307E\u3059\u3002\u6BB5\u843D\u306E\u914D\u7F6E\u3092\u898B\u308B\u306E\u3067\u3001\u56F3\u304C\u3069\u3053\u306B\u3042\u308B\u304B\u306B\u306F\u4F9D\u5B58\u3057\u307E\u305B\u3093\u3002",
      example: "\u4E2D\u592E\u63C3\u3048\u306E\u300CFigure 1. \u2026\u300D\u2192 \u5DE6\u63C3\u3048"
    },
    "compound-order": {
      summary: "\u5316\u5408\u7269\u756A\u53F7\u304C\u672C\u6587\u306B\u767B\u5834\u3059\u308B\u9806\u306B\u306A\u3063\u3066\u3044\u308B\u304B\u3002\u300C\u5316\u5408\u7269 3\u300D\u306E\u3088\u3046\u306B\u8A9E\u3092\u4F34\u3046\u756A\u53F7\u3068\u3001\u7CFB\u5217\u30E9\u30D9\u30EB\uFF083a\u30011a\u2013f\uFF09\u3092\u6570\u3048\u307E\u3059\u3002\u88F8\u306E\u6570\u5B57\u306F\u5E74\u3084\u5DFB\u3068\u533A\u5225\u3067\u304D\u306A\u3044\u306E\u3067\u6570\u3048\u307E\u305B\u3093\u3002\u756A\u53F7\u306E\u98DB\u3073\uFF081 \u306E\u6B21\u304C 3\uFF09\u306F\u3001\u3042\u3044\u3060\u306E\u756A\u53F7\u304C\u3053\u306E\u6587\u66F8\u306B\u51FA\u3066\u3053\u306A\u3044\u3060\u3051\u304B\u3082\u3057\u308C\u306A\u3044\u306E\u3067\u6307\u6458\u3057\u307E\u305B\u3093\u3002\u5927\u304D\u3044\u756A\u53F7\u3092\u51FA\u3057\u305F\u3042\u3068\u3067\u5C0F\u3055\u3044\u756A\u53F7\u304C\u521D\u3081\u3066\u51FA\u3066\u304D\u305F\u3068\u304D\u3060\u3051\u6307\u6458\u3057\u307E\u3059\u3002",
      example: "\u5316\u5408\u7269 5 \u306E\u5F8C\u306B \u5316\u5408\u7269 3 \u304C\u521D\u51FA\uFF081 \u304B\u3089\u59CB\u307E\u3089\u306A\u3044\u306E\u306F\u9055\u53CD\u3067\u306F\u306A\u3044\uFF09"
    },
    "caption-number-bold": {
      summary: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u56F3\u8868\u756A\u53F7\u306F\u592A\u5B57\u306B\u3057\u307E\u3059\u3002",
      example: "Figure 1. \u306E\u300CFigure 1\u300D"
    },
    "intext-ref-not-bold": {
      summary: "\u672C\u6587\u4E2D\u306B\u5F15\u7528\u3059\u308B\u56F3\u8868\u756A\u53F7\u306F\u592A\u5B57\u306B\u3057\u307E\u305B\u3093\u3002",
      example: "\u2026\u3092 Figure 1 \u306B\u793A\u3059\u3002\u306E\u300CFigure 1\u300D"
    },
    "compound-number-bold": {
      summary: "\u5316\u5408\u7269\u756A\u53F7\u306F\u592A\u5B57\u306B\u3057\u307E\u3059\u3002\u300C\u5316\u5408\u7269 1\u300D\u306E\u3088\u3046\u306B\u8A9E\u3092\u4F34\u3046\u3082\u306E\u306B\u52A0\u3048\u3066\u3001\u6587\u66F8\u5168\u4F53\u304B\u3089\u5316\u5408\u7269\u756A\u53F7\u3068\u5224\u65AD\u3067\u304D\u305F\u7CFB\u5217\u30E9\u30D9\u30EB\uFF081a\u30011a\u2013f \u306E 1a\u3001\u96FB\u8377\u4ED8\u304D\u306E 1b2\u2013 \u306E 1b\uFF09\u3082\u5BFE\u8C61\u3067\u3059\u3002\u88F8\u306E\u6570\u5B57\u306F\u5E74\u3084\u5DFB\u3068\u533A\u5225\u3067\u304D\u306A\u3044\u306E\u3067\u898B\u307E\u305B\u3093\u3002",
      example: "\u5316\u5408\u7269 1 \u306E\u300C1\u300D\u30011a\u2013f \u306E\u300C1a\u300D"
    },
    // --- 2-(3) 参考文献 -------------------------------------------------------
    "citation-position": {
      summary: "\u5F15\u7528\u756A\u53F7\u3068\u53E5\u8AAD\u70B9\u306E\u524D\u5F8C\u3002\u548C\u6587\u306F\u53E5\u8AAD\u70B9\u306E\u524D\u3001\u82F1\u6587\u306F\u30D4\u30EA\u30AA\u30C9\u30FB\u30AB\u30F3\u30DE\u306E\u5F8C\u3067\u3059\u3002",
      example: "\u77E5\u3089\u308C\u3066\u3044\u308B\u3002[1] \u2192 \u77E5\u3089\u308C\u3066\u3044\u308B[1]\u3002"
    },
    "journal-abbrev": {
      summary: "\u96D1\u8A8C\u540D\u306E\u7565\u79F0\u304C\u6B63\u3057\u3044\u304B\u3002\u6539\u79F0\u306E\u3042\u308B\u96D1\u8A8C\u306F\u63B2\u8F09\u5E74\u306E\u78BA\u8A8D\u3092\u4FC3\u3057\u307E\u3059\u3002",
      example: "Chem. Comm. \u2192 Chem. Commun."
    },
    "journal-consistency": {
      summary: "\u540C\u3058\u96D1\u8A8C\u3092 2 \u901A\u308A\u306B\u66F8\u3044\u3066\u3044\u308B\u7B87\u6240\u3002\u540C\u5B9A\u3067\u304D\u308B\u306E\u306F\u3001\u30D4\u30EA\u30AA\u30C9\u3084\u7A7A\u767D\u3060\u3051\u304C\u9055\u3046\u5834\u5408\u3068\u3001Engl. \u306E\u3088\u3046\u306A\u7248\u306E\u63A5\u5C3E\u8A9E\u304C\u843D\u3061\u3066\u3044\u308B\u5834\u5408\u3060\u3051\u3067\u3059\u3002\u672B\u5C3E\u306E 1 \u6587\u5B57\u304C\u9055\u3046\u3082\u306E\uFF08J. Phys. Chem. A \u3068 C\u3001Phys. Rev. B \u3068 E\uFF09\u306F\u5225\u306E\u96D1\u8A8C\u306A\u306E\u3067\u6307\u6458\u3057\u307E\u305B\u3093\u3002",
      example: "J Am Chem Soc \u3068 J. Am. Chem. Soc. \u306E\u6DF7\u5728"
    },
    "citation-style": {
      summary: "\u5F15\u7528\u8A18\u53F7\u306E\u66F8\u5F0F\u304C [1] \u3068 (1) \u3067\u6DF7\u3056\u3063\u3066\u3044\u308B\u7B87\u6240\u3002",
      example: "[1] \u3068 (1) \u306E\u6DF7\u5728"
    },
    "reference-journal-italic": {
      summary: "\u5F15\u7528\u6587\u732E\u306E\u8A8C\u540D\u306F\u659C\u4F53\u3002\u300C\u8A8C\u540D \u5E74, \u5DFB,\u300D\u306E\u4E26\u3073\u3060\u3051\u3092\u898B\u308B\u306E\u3067\u3001\u672C\u6587\u4E2D\u306E\u96D1\u8A8C\u540D\u306B\u306F\u53CD\u5FDC\u3057\u307E\u305B\u3093\u3002\u30A4\u30CB\u30B7\u30E3\u30EB \u59D3 \u306E\u9806\u3067\u8457\u8005\u3092\u66F8\u304D\u3001\u304B\u3064\u8A8C\u540D\u304C 1 \u6587\u5B57\u3067\u59CB\u307E\u308B\u5834\u5408\uFF08\u2026, H. Suzuki, J. Am. Chem. Soc. 2019\uFF09\u3060\u3051\u3001\u5148\u982D\u306E\u300CJ.\u300D\u3092\u8457\u8005\u306E\u30A4\u30CB\u30B7\u30E3\u30EB\u3068\u533A\u5225\u3067\u304D\u305A\u7BC4\u56F2\u304C\u77ED\u304F\u306A\u308A\u307E\u3059\u3002",
      example: "J. Am. Chem. Soc. 2019, 141, 1234. \u306E\u8A8C\u540D\u90E8\u5206"
    },
    "charge-superscript": {
      summary: "\u9084\u5143\u7A2E\u30FB\u9178\u5316\u7A2E\u306E\u96FB\u8377\u304C\u4E0A\u4ED8\u304D\u306B\u306A\u3063\u3066\u3044\u306A\u3044\u7B87\u6240\uFF081b2\u2013 \u306E\u300C2\u2013\u300D\uFF09\u3002\u6587\u66F8\u304C\u5316\u5408\u7269\u756A\u53F7\u3068\u8A8D\u3081\u305F\u30E9\u30D9\u30EB\u306E\u76F4\u5F8C\u3060\u3051\u3092\u898B\u308B\u306E\u3067\u3001\u5F15\u304D\u7B97\u3084\u30DA\u30FC\u30B8\u7BC4\u56F2\u306B\u306F\u53CD\u5FDC\u3057\u307E\u305B\u3093\u3002",
      example: "1b2\u2013 \u306E\u300C2\u2013\u300D\u3092\u4E0A\u4ED8\u304D\u306B"
    },
    "uncited-reference": {
      summary: "\u6587\u732E\u30EA\u30B9\u30C8\u306B\u8F09\u3063\u3066\u3044\u308B\u306E\u306B\u3001\u672C\u6587\u306E\u3069\u3053\u304B\u3089\u3082\u5F15\u7528\u3055\u308C\u3066\u3044\u306A\u3044\u9805\u76EE\u3002\u5F15\u7528\u3092\u52A0\u3048\u308B\u304B\u3001\u30EA\u30B9\u30C8\u304B\u3089\u5916\u3057\u307E\u3059\u3002\u30EA\u30B9\u30C8\u81EA\u8EAB\u306E\u4E2D\u306E [1] \u306F\u5F15\u7528\u3068\u3057\u3066\u6570\u3048\u307E\u305B\u3093\u3002",
      example: "[3] \u304C\u6587\u732E\u30EA\u30B9\u30C8\u306B\u3042\u308B\u304C\u3001\u672C\u6587\u306B [3] \u304C\u51FA\u3066\u3053\u306A\u3044"
    },
    "reference-year-bold": {
      summary: "\u5F15\u7528\u6587\u732E\u306E\u5E74\u306F\u592A\u5B57\u3002ACS \u6D41\u3067\u306F \u8A8C\u540D\uFF08\u659C\u4F53\uFF09\u5E74\uFF08\u592A\u5B57\uFF09\u5DFB\uFF08\u659C\u4F53\uFF09\u306E\u9806\u3067\u3001\u5F37\u8ABF\u304C\u4E57\u308B\u306E\u306F\u5E74\u3067\u3059\u3002\u300C\u8A8C\u540D \u5E74, \u5DFB,\u300D\u306E\u4E26\u3073\u304B\u3089\u5E74\u3092\u7279\u5B9A\u3057\u307E\u3059\u3002\u3069\u3053\u3092\u5F37\u8ABF\u3059\u308B\u304B\u306F\u96D1\u8A8C\u306B\u3088\u308B\u305F\u3081\u3001\u78BA\u8A8D\u3068\u3057\u3066\u51FA\u3057\u307E\u3059\u3002",
      example: "J. Am. Chem. Soc. 2019, 141, 1234. \u306E\u300C2019\u300D\u3092\u592A\u5B57\u306B"
    },
    "reference-volume-italic": {
      summary: "\u5F15\u7528\u6587\u732E\u306E\u5DFB\u306F\u659C\u4F53\u3002ACS \u6D41\u3067\u306F \u8A8C\u540D\uFF08\u659C\u4F53\uFF09\u5E74\uFF08\u592A\u5B57\uFF09\u5DFB\uFF08\u659C\u4F53\uFF09\u306E\u9806\u306A\u306E\u3067\u3001\u592A\u5B57\u306B\u3059\u308B\u306E\u306F\u5E74\u3067\u3001\u5DFB\u306F\u659C\u4F53\u3067\u3059\u3002\u540C\u3058\u304F\u300C\u8A8C\u540D \u5E74, \u5DFB,\u300D\u306E\u4E26\u3073\u304B\u3089\u5DFB\u3092\u7279\u5B9A\u3057\u307E\u3059\u3002\u3069\u3053\u3092\u5F37\u8ABF\u3059\u308B\u304B\u306F\u96D1\u8A8C\u306B\u3088\u308B\u305F\u3081\u3001\u78BA\u8A8D\u3068\u3057\u3066\u51FA\u3057\u307E\u3059\u3002",
      example: "J. Am. Chem. Soc. 2019, 141, 1234. \u306E\u300C141\u300D\u3092\u659C\u4F53\u306B"
    },
    "author-order": {
      summary: "\u8457\u8005\u540D\u306E\u59D3\u540D\u9806\u306E\u6DF7\u5728\u3002\u3069\u3061\u3089\u306E\u6D41\u5100\u3067\u3082\u69CB\u3044\u307E\u305B\u3093\u304C\u6587\u732E\u8868\u5185\u3067\u306F\u63C3\u3048\u307E\u3059\u3002",
      example: "Smith, J. A. \u3068 J. A. Smith \u306E\u6DF7\u5728"
    }
  });
  var RULE_ENTRIES = Object.freeze({
    "kanji-to-kana": KANJI_TO_KANA,
    "kanji-meaning": KANJI_MEANING,
    "verbose-expression": VERBOSE,
    "casual-expression": CASUAL,
    "journal-abbrev": JOURNAL_ABBREV
  });
  var RULE_GROUPS = Object.freeze({
    "notation-variance": VARIANT_GROUPS
  });
  function entryKey(ruleId, from) {
    return `${ruleId}:${from}`;
  }
  var DEFAULT_DISABLED_ENTRIES = Object.freeze(
    Object.entries(RULE_ENTRIES).flatMap(
      ([ruleId, entries]) => entries.filter((entry) => entry.defaultEnabled === false).map((entry) => entryKey(ruleId, entry.from))
    )
  );
  function enabledByDefault(ruleId) {
    var _a, _b;
    return (_b = (_a = RULE_DOCS[ruleId]) == null ? void 0 : _a.defaultEnabled) != null ? _b : true;
  }

  // src/core/rules/dictRule.ts
  var KANJI = /[一-鿿㐀-䶿々]/u;
  var LATIN = /[A-Za-z0-9]/u;
  function isKanji(ch) {
    return ch !== void 0 && KANJI.test(ch);
  }
  function isLatin(ch) {
    return ch !== void 0 && LATIN.test(ch);
  }
  function isPartOfCompound(text, start, end) {
    const term = text.slice(start, end);
    if (isKanji(term[0]) && isKanji(text[start - 1])) return true;
    if (isKanji(term[term.length - 1]) && isKanji(text[end])) return true;
    if (isLatin(term[0]) && isLatin(text[start - 1])) return true;
    if (isLatin(term[term.length - 1]) && isLatin(text[end])) return true;
    return false;
  }
  function alreadyCorrect(text, start, from, to) {
    return to.length > from.length && text.startsWith(to, start);
  }
  function dictionaryRule(spec) {
    const sorted = [...spec.entries].sort((a, b) => b.from.length - a.from.length);
    const pattern = new RegExp(sorted.map((e) => escapeRegExp(e.from)).join("|"), "gu");
    const byForm = new Map(sorted.map((e) => [e.from, e]));
    return {
      id: spec.id,
      category: spec.category,
      title: spec.title,
      kind: "paragraph",
      run(text, index, ctx) {
        const found = [];
        for (const m of matchAll(pattern, text)) {
          const entry = byForm.get(m[0]);
          if (!entry) continue;
          if (ctx.disabledEntries.has(entryKey(spec.id, entry.from))) continue;
          if (isPartOfCompound(text, m.index, m.index + m[0].length)) continue;
          if (alreadyCorrect(text, m.index, entry.from, entry.to)) continue;
          found.push(
            finding(spec, {
              severity: entry.severity,
              paragraphIndex: index,
              start: m.index,
              matched: m[0],
              replacement: entry.to,
              message: spec.message(entry)
            })
          );
        }
        return found;
      }
    };
  }
  function arrowMessage(prefix) {
    return (entry) => `${prefix}\uFF1A\u300C${entry.from}\u300D\u2192\u300C${entry.to}\u300D${entry.note ? `\uFF08${entry.note}\uFF09` : ""}`;
  }

  // src/core/rules/readability.ts
  var kanjiToKanaRule = dictionaryRule({
    id: "kanji-to-kana",
    category: "readability",
    title: "\u6F22\u5B57\u3067\u66F8\u304F\u3079\u304D\u3067\u306A\u3044\u8868\u73FE\u2460\uFF08\u901A\u4F8B\u304B\u306A\u66F8\u304D\uFF09",
    entries: KANJI_TO_KANA,
    message: arrowMessage("\u901A\u4F8B\u304B\u306A\u66F8\u304D\u306E\u8A9E")
  });
  var kanjiMeaningRule = dictionaryRule({
    id: "kanji-meaning",
    category: "readability",
    title: "\u6F22\u5B57\u3067\u66F8\u304F\u3079\u304D\u3067\u306A\u3044\u8868\u73FE\u2461\uFF08\u6F22\u5B57\u3068\u304B\u306A\u3067\u610F\u5473\u304C\u9055\u3046\uFF09",
    entries: KANJI_MEANING,
    message: arrowMessage("\u304B\u306A\u66F8\u304D\u304C\u9069\u5207\u304B\u78BA\u8A8D")
  });
  var verboseRule = dictionaryRule({
    id: "verbose-expression",
    category: "readability",
    title: "\u8868\u73FE\u3092\u3082\u3063\u3068\u7C21\u6F54\u306B",
    entries: VERBOSE,
    message: arrowMessage("\u3088\u308A\u77ED\u3044\u8868\u73FE\u3078")
  });
  var casualRule = dictionaryRule({
    id: "casual-expression",
    category: "readability",
    title: "\u30AB\u30B8\u30E5\u30A2\u30EB\u3059\u304E\u308B\u8868\u73FE",
    entries: CASUAL,
    message: arrowMessage("\u8AD6\u6587\u306B\u305D\u3050\u308F\u306A\u3044\u53E3\u8A9E\u8868\u73FE")
  });
  var PAUSE = /[、，,；;：:（）()「」『』〔〕[\]]/u;
  var BREATH_LIMIT = 60;
  var HARD_MULTIPLIER = 1.5;
  function longestRun(sentence) {
    let longest = 0;
    let run = 0;
    for (const char of sentence) {
      if (PAUSE.test(char)) {
        run = 0;
        continue;
      }
      run += 1;
      if (run > longest) longest = run;
    }
    return longest;
  }
  var longSentenceRule = {
    id: "long-sentence",
    category: "readability",
    title: "\u9577\u3059\u304E\u308B\u6587",
    kind: "paragraph",
    run(text, index, ctx) {
      const limit = ctx.settings.maxSentenceLength;
      const found = [];
      for (const sentence of splitSentences(text)) {
        const body = sentence.text.trim();
        const length = body.length;
        if (length <= limit) continue;
        const run = longestRun(body);
        const reason = length > limit * HARD_MULTIPLIER ? `\u76EE\u5B89 ${limit} \u5B57\u306E ${HARD_MULTIPLIER} \u500D\u3092\u8D85\u3048\u3066\u3044\u307E\u3059` : run > BREATH_LIMIT ? `\u8AAD\u70B9\u3084\u62EC\u5F27\u306E\u306A\u3044 ${run} \u5B57\u306E\u7D9A\u304D\u304C\u3042\u308A\u307E\u3059` : null;
        if (reason === null) continue;
        found.push(
          finding(longSentenceRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: sentence.start,
            matched: sentence.text,
            message: `${length} \u5B57\u306E\u6587\u3067\u3059\uFF08\u76EE\u5B89 ${limit} \u5B57\uFF09\u3002${reason}\u3002\u5206\u5272\u3092\u691C\u8A0E\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
          })
        );
      }
      return found;
    }
  };
  var NO_CHAIN = /(?:[^\s、，。．]{1,8}の){3,}/gu;
  var noChainRule = {
    id: "no-chain",
    category: "readability",
    title: "\u300C\u306E\u300D\u306E\u9023\u7D9A",
    kind: "paragraph",
    run(text, index) {
      var _a;
      const found = [];
      for (const m of matchAll(NO_CHAIN, text)) {
        const chain = ((_a = m[0].match(/の/gu)) != null ? _a : []).length;
        found.push(
          finding(noChainRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            message: `\u300C\u306E\u300D\u304C ${chain} \u9023\u7D9A\u3057\u3066\u3044\u307E\u3059\u3002\u4FEE\u98FE\u95A2\u4FC2\u3092\u5206\u89E3\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
          })
        );
      }
      return found;
    }
  };
  var multiModifierRule = {
    id: "multi-modifier",
    category: "readability",
    title: "\u591A\u91CD\u4FEE\u98FE",
    kind: "paragraph",
    run(text, index) {
      var _a;
      const found = [];
      for (const sentence of splitSentences(text)) {
        const commas = ((_a = sentence.text.match(/[、，]/gu)) != null ? _a : []).length;
        if (commas < 4) continue;
        found.push(
          finding(multiModifierRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: sentence.start,
            matched: sentence.text,
            message: `\u8AAD\u70B9\u304C ${commas} \u500B\u3042\u308B\u6587\u3067\u3059\u3002\u4FEE\u98FE\u304C\u91CD\u306A\u3063\u3066\u3044\u306A\u3044\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
          })
        );
      }
      return found;
    }
  };
  var DEMONSTRATIVE = /このような|そのような|これら|それら|この|その|これ|それ/gu;
  var demonstrativeRule = {
    id: "demonstrative",
    category: "readability",
    title: "\u6307\u793A\u8A9E\u306E\u591A\u7528",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const sentence of splitSentences(text)) {
        const hits = [...matchAll(DEMONSTRATIVE, sentence.text)];
        if (hits.length < 3) continue;
        found.push(
          finding(demonstrativeRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: sentence.start,
            matched: sentence.text,
            message: `\u6307\u793A\u8A9E\u304C ${hits.length} \u500B\u3042\u308A\u307E\u3059\uFF08${hits.map((h) => h[0]).join("\u3001")}\uFF09\u3002\u6307\u3059\u5185\u5BB9\u304C\u81EA\u660E\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
          })
        );
      }
      return found;
    }
  };
  var variantConsistencyRule = {
    id: "notation-variance",
    category: "readability",
    title: "\u8868\u8A18\u306E\u3086\u3089\u304E",
    kind: "document",
    run(paragraphs) {
      const found = [];
      for (const group of VARIANT_GROUPS) {
        const used = group.filter(
          (form) => paragraphs.some((p) => p.includes(form) && !overlapsLongerForm(p, form, group))
        );
        if (used.length < 2) continue;
        const counts = new Map(
          used.map((form) => [form, paragraphs.reduce((n, p) => n + countOccurrences(p, form, group), 0)])
        );
        const preferred = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
        for (const form of used) {
          if (form === preferred) continue;
          const pattern = new RegExp(escapeRegExp(form), "gu");
          paragraphs.forEach((p, index) => {
            for (const m of matchAll(pattern, p)) {
              if (overlapsLongerForm(p, form, group, m.index)) continue;
              found.push(
                finding(variantConsistencyRule, {
                  severity: "confirm",
                  paragraphIndex: index,
                  start: m.index,
                  matched: m[0],
                  replacement: preferred,
                  message: `\u8868\u8A18\u3086\u308C\uFF1A\u300C${form}\u300D(${counts.get(form)}\u4EF6) \u3068\u300C${preferred}\u300D(${counts.get(preferred)}\u4EF6) \u304C\u6DF7\u5728\u3057\u3066\u3044\u307E\u3059\u3002`
                })
              );
            }
          });
        }
      }
      return found;
    }
  };
  function overlapsLongerForm(text, form, group, at) {
    const longer = group.filter((other) => other !== form && other.startsWith(form));
    if (longer.length === 0) return false;
    if (at !== void 0) return longer.some((other) => text.startsWith(other, at));
    const pattern = new RegExp(escapeRegExp(form), "gu");
    for (const m of matchAll(pattern, text)) {
      if (!longer.some((other) => text.startsWith(other, m.index))) return false;
    }
    return true;
  }
  function countOccurrences(text, form, group) {
    const pattern = new RegExp(escapeRegExp(form), "gu");
    let n = 0;
    for (const m of matchAll(pattern, text)) {
      if (!overlapsLongerForm(text, form, group, m.index)) n += 1;
    }
    return n;
  }
  var punctuationConsistencyRule = {
    id: "punctuation-consistency",
    category: "readability",
    title: "\u53E5\u8AAD\u70B9\u306E\u7D71\u4E00\uFF08\u3002\u3001 \u3068 \uFF0E\uFF0C\uFF09",
    kind: "document",
    run(paragraphs, ctx) {
      if (!ctx.isJapanese) return [];
      const found = [];
      for (const [a, b, name] of [
        ["\u3002", "\uFF0E", "\u53E5\u70B9"],
        ["\u3001", "\uFF0C", "\u8AAD\u70B9"]
      ]) {
        const countA = paragraphs.reduce((n, p) => n + occurrences(p, a), 0);
        const countB = paragraphs.reduce((n, p) => n + occurrences(p, b), 0);
        if (countA === 0 || countB === 0) continue;
        const minority = countA < countB ? a : b;
        const majority = countA < countB ? b : a;
        paragraphs.forEach((p, index) => {
          for (const m of matchAll(new RegExp(escapeRegExp(minority), "gu"), p)) {
            found.push(
              finding(punctuationConsistencyRule, {
                severity: "fix",
                paragraphIndex: index,
                start: m.index,
                matched: minority,
                replacement: majority,
                message: `${name}\u304C\u6DF7\u5728\u3057\u3066\u3044\u307E\u3059\uFF08\u300C${a}\u300D${countA}\u4EF6\uFF0F\u300C${b}\u300D${countB}\u4EF6\uFF09\u3002\u6587\u66F8\u5185\u3067\u7D71\u4E00\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
              })
            );
          }
        });
      }
      return found;
    }
  };
  var politenessConsistencyRule = {
    id: "politeness-consistency",
    category: "readability",
    title: "\u3067\u3059\u30FB\u307E\u3059\u4F53\u306E\u6DF7\u5728",
    kind: "document",
    run(paragraphs, ctx) {
      if (!ctx.isJapanese) return [];
      const polite = /(で(す|した)|ます|ました|ません)(?=[。．！？!?]|$)/gu;
      const found = [];
      const plain = paragraphs.reduce(
        (n, p) => n + occurrences(p, "\u3067\u3042\u308B") + occurrences(p, "\u3057\u305F\u3002") + occurrences(p, "\u3057\u305F\uFF0E"),
        0
      );
      if (plain === 0) return [];
      paragraphs.forEach((p, index) => {
        for (const m of matchAll(polite, p)) {
          found.push(
            finding(politenessConsistencyRule, {
              severity: "confirm",
              paragraphIndex: index,
              start: m.index,
              matched: m[0],
              message: "\u5E38\u4F53\uFF08\u3067\u3042\u308B\u4F53\uFF09\u306E\u6587\u66F8\u306B\u656C\u4F53\u304C\u6DF7\u3056\u3063\u3066\u3044\u307E\u3059\u3002"
            })
          );
        }
      });
      return found;
    }
  };
  function occurrences(text, needle) {
    let n = 0;
    let from = 0;
    for (; ; ) {
      const at = text.indexOf(needle, from);
      if (at === -1) return n;
      n += 1;
      from = at + needle.length;
    }
  }
  var READABILITY_RULES = [
    kanjiToKanaRule,
    kanjiMeaningRule,
    verboseRule,
    casualRule,
    longSentenceRule,
    noChainRule,
    multiModifierRule,
    demonstrativeRule,
    variantConsistencyRule,
    punctuationConsistencyRule,
    politenessConsistencyRule
  ];

  // src/core/rules/science.ts
  var ABBREVIATION = /(?<![A-Za-z0-9\-−–])([A-Z]{2,9})(?![A-Za-z0-9])/gu;
  var ROMAN_NUMERAL = /^[IVXLCDM]+$/u;
  var ALL_CAPS_HEADING = /^[^a-z\p{sc=Hiragana}\p{sc=Katakana}\p{sc=Han}]*$/u;
  var OPEN_PAREN_BEFORE = /[(（]\s*$/u;
  var CLOSE_PAREN_AFTER = /^\s*[)）]/u;
  var EXPANSION_AFTER = /^\s*[(（][^)）]{4,}[)）]/u;
  var KNOWN = new Set(COMMON_ABBREVIATIONS.map((word) => word.toUpperCase()));
  function definesAbbreviation(text, start, end) {
    const before = text.slice(0, start);
    const after = text.slice(end);
    if (OPEN_PAREN_BEFORE.test(before) && CLOSE_PAREN_AFTER.test(after)) {
      return before.replace(OPEN_PAREN_BEFORE, "").trim().length >= 4;
    }
    return EXPANSION_AFTER.test(after);
  }
  var undefinedAbbreviationRule = {
    id: "undefined-abbreviation",
    category: "science",
    title: "\u7565\u8A9E\u306E\u5B9A\u7FA9",
    kind: "document",
    run(paragraphs) {
      const first = /* @__PURE__ */ new Map();
      const defined = /* @__PURE__ */ new Set();
      paragraphs.forEach((text, paragraphIndex) => {
        if (ALL_CAPS_HEADING.test(text)) return;
        for (const m of matchAll(ABBREVIATION, text)) {
          const word = m[1];
          if (KNOWN.has(word) || ROMAN_NUMERAL.test(word)) continue;
          const end = m.index + word.length;
          if (definesAbbreviation(text, m.index, end)) {
            defined.add(word);
            continue;
          }
          if (!first.has(word)) first.set(word, { paragraphIndex, start: m.index, text: word });
        }
      });
      const found = [];
      for (const [word, where] of first) {
        if (defined.has(word)) continue;
        found.push(
          finding(undefinedAbbreviationRule, {
            severity: "confirm",
            paragraphIndex: where.paragraphIndex,
            start: where.start,
            matched: where.text,
            message: `\u7565\u8A9E\u300C${word}\u300D\u304C\u5B9A\u7FA9\u3055\u308C\u305A\u306B\u4F7F\u308F\u308C\u3066\u3044\u307E\u3059\u3002\u521D\u51FA\u3067\u6B63\u5F0F\u540D\u79F0\u3092\u793A\u3057\u3066\u304F\u3060\u3055\u3044\uFF08\u4F8B\uFF1A\u300C\u2026\uFF08${word}\uFF09\u300D\uFF09\u3002`
          })
        );
      }
      return found;
    }
  };
  var SCIENCE_RULES = [undefinedAbbreviationRule];

  // src/core/labels.ts
  var CHARGE_AHEAD = "(?=\\d{1,2}\\s*[\u2013\u2014\u2212+])";
  var LABEL_END = `(?:(?![A-Za-z0-9])|${CHARGE_AHEAD})`;
  var LABEL = new RegExp(`(?<![A-Za-z0-9.])(\\d{1,4})([a-z])${LABEL_END}`, "gu");
  var LABEL_RANGE = new RegExp(
    `(?<![A-Za-z0-9.])(\\d{1,4})([a-z])\\s*[\u2013\u2014\u2212-]\\s*(\\d{1,4})?([a-z])${LABEL_END}`,
    "gu"
  );
  function labelRanges(text) {
    const spans = [];
    LABEL_RANGE.lastIndex = 0;
    let m;
    while ((m = LABEL_RANGE.exec(text)) !== null) {
      spans.push({ start: m.index, text: m[0], base: `${m[1]}${m[2]}` });
    }
    return spans;
  }
  var FIGURE_LABEL = /(?:Fig(?:ures?|s?)?\.?|Tables?|Schemes?|Charts?|Eq(?:uations?|ns?)?\.?|Entry|Entries|Refs?\.?|図|表|式|スキーム|チャート)\s*$/iu;
  var CONNECTOR = /^[\s,、and&+\-–—]*$/iu;
  var FIGURE_LOOKBACK = 28;
  function isFigureNumber(text, index) {
    const before = text.slice(Math.max(0, index - FIGURE_LOOKBACK), index);
    if (FIGURE_LABEL.test(before)) return true;
    const viaConnector = /(\d+)([\s,、and&+\-–—]*)$/iu.exec(before);
    if (!viaConnector || !CONNECTOR.test(viaConnector[2])) return false;
    return FIGURE_LABEL.test(before.slice(0, before.length - viaConnector[0].length));
  }

  // src/core/rules/figure.ts
  var LABELS = ["Figure", "Fig.", "Table", "Scheme", "Chart", "Equation", "Eq."];
  var LATIN_LABEL_ALT = "Figures|Figure|Figs\\.|Fig\\.|Tables|Table|Schemes|Scheme|Charts|Chart|Equations|Equation|Eqs\\.|Eq\\.";
  var JA_LABEL_ALT = "\u56F3|\u8868|\u30B9\u30AD\u30FC\u30E0";
  var LABEL_ALT = `${LATIN_LABEL_ALT}|${JA_LABEL_ALT}`;
  var PLURAL_LABEL = /^(?:Figures|Figs\.|Tables|Schemes|Charts|Equations|Eqs\.)$/u;
  var JAPANESE_LABEL = /^(?:図|表|スキーム)$/u;
  var CAPTION_START = new RegExp(
    `^[\\s\\u0001\\u0002]*(${LABEL_ALT})\\s*(\\d+)\\s*([.\uFF0E:\uFF1A]?)\\s*(.*)$`,
    "u"
  );
  var REF_TAIL = /\s*(,|、|，|and|&|–|—|―|-|~|〜|から|および|と)\s*(\d+)/gu;
  var RANGE_SEPARATOR = /^(?:[–—―\-~〜]|から)$/u;
  var INTEXT_REF = new RegExp(
    `((?<![A-Za-z])(?:${LATIN_LABEL_ALT})|(?<!\\p{sc=Han})(?:${JA_LABEL_ALT}))\\s*(\\d+)((?:\\s*(?:,|\u3001|\uFF0C|and|&|\u2013|\u2014|\u2015|-|~|\u301C|\u304B\u3089|\u304A\u3088\u3073|\u3068)\\s*\\d+)*)`,
    "gu"
  );
  var RUNNING_TEXT = /^[\p{sc=Hiragana}a-z]/u;
  var CITATION_LIST = /^\s*(?:[、，,;；]|and\b|&|[–—―~〜]|から|および)\s*\d/u;
  function parseCaption(text) {
    const m = CAPTION_START.exec(text);
    if (!m) return null;
    const label = m[1];
    if (PLURAL_LABEL.test(label)) return null;
    const separator = m[3];
    const body = m[4].trim();
    if (CITATION_LIST.test(`${separator}${body}`)) return null;
    if (separator.length === 0 && body.length > 0 && RUNNING_TEXT.test(body)) return null;
    const headStart = text.indexOf(label);
    const digits = m[2];
    const headEnd = text.indexOf(digits, headStart + label.length) + digits.length;
    return {
      label,
      number: Number(digits),
      separator,
      body,
      headStart,
      headEnd,
      head: text.slice(headStart, headEnd)
    };
  }
  function intextRefs(text) {
    var _a;
    const refs = [];
    for (const m of matchAll(INTEXT_REF, text)) {
      const numbers = [Number(m[2])];
      for (const tail of matchAll(REF_TAIL, (_a = m[3]) != null ? _a : "")) {
        const value = Number(tail[2]);
        const previous = numbers[numbers.length - 1];
        if (RANGE_SEPARATOR.test(tail[1]) && value > previous && value - previous <= 20) {
          for (let n = previous + 1; n <= value; n += 1) numbers.push(n);
        } else {
          numbers.push(value);
        }
      }
      refs.push({ label: normalizeLabel(m[1]), numbers, start: m.index, text: m[0] });
    }
    return refs;
  }
  var PAREN_AFTER_PERIOD = new RegExp(
    `([\u3002\uFF0E.])\\s*(\\((?:${LABEL_ALT})[^)]*\\))\\s*([\u3002\uFF0E.]?)`,
    "gu"
  );
  var figureParenPositionRule = {
    id: "figure-paren-position",
    category: "figure",
    title: "\u6587\u672B\u62EC\u5F27\uFF08Figure 1\uFF09\u306E\u4F4D\u7F6E",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      for (const m of matchAll(PAREN_AFTER_PERIOD, text)) {
        if (m[3]) continue;
        const terminator = m[1];
        const replacement = ` ${m[2]}${terminator}`;
        found.push(
          finding(figureParenPositionRule, {
            severity: "fix",
            paragraphIndex: index,
            start: m.index,
            matched: m[0],
            replacement,
            message: `\u53E5\u70B9\u306F\u56F3\u8868\u756A\u53F7\u306E\u5F8C\u308D\u3078\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement.trim()}\u300D`
          })
        );
      }
      return found;
    }
  };
  var captionPunctuationRule = {
    id: "caption-punctuation",
    category: "figure",
    title: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u30D4\u30EA\u30AA\u30C9",
    kind: "paragraph",
    run(text, index) {
      var _a, _b;
      const caption = parseCaption(text);
      if (!caption) return [];
      const found = [];
      const head = caption.head;
      const period = JAPANESE_LABEL.test(caption.label) ? "\uFF0E" : ".";
      const hasPeriod = /^[.．]$/u.test(caption.separator);
      if (caption.body.length > 0 && !hasPeriod) {
        const bodyStart = text.indexOf(caption.body, caption.headEnd);
        const matched = text.slice(caption.headStart, bodyStart).trimEnd();
        found.push(
          finding(captionPunctuationRule, {
            severity: "fix",
            paragraphIndex: index,
            start: caption.headStart,
            matched,
            replacement: `${head}${period}`,
            message: `\u8AAC\u660E\u6587\u304C\u7D9A\u304F\u306E\u3067\u56F3\u8868\u756A\u53F7\u306E\u5F8C\u306B\u30D4\u30EA\u30AA\u30C9\u3092\u4ED8\u3051\u307E\u3059\uFF1A\u300C${matched}\u300D\u2192\u300C${head}${period}\u300D`
          })
        );
      }
      if (caption.body.length === 0 && hasPeriod) {
        const matched = text.slice(caption.headStart).trimEnd();
        found.push(
          finding(captionPunctuationRule, {
            severity: "confirm",
            paragraphIndex: index,
            start: caption.headStart,
            matched,
            replacement: head,
            message: `\u5F8C\u308D\u306B\u8AAC\u660E\u6587\u304C\u306A\u3044\u306E\u3067\u30D4\u30EA\u30AA\u30C9\u306F\u4E0D\u8981\u3067\u3059\uFF1A\u300C${matched}\u300D\u2192\u300C${head}\u300D`
          })
        );
      }
      if (caption.body.length > 0 && !/[.．。]$/u.test(caption.body)) {
        const lastWord = (_b = (_a = /(\S+)\s*$/u.exec(caption.body)) == null ? void 0 : _a[1]) != null ? _b : caption.body;
        const start = text.lastIndexOf(lastWord);
        found.push(
          finding(captionPunctuationRule, {
            severity: "fix",
            paragraphIndex: index,
            start,
            matched: lastWord,
            replacement: `${lastWord}.`,
            message: `\u56F3\u8868\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u6700\u5F8C\u306F\u30D4\u30EA\u30AA\u30C9\u3067\u6B62\u3081\u307E\u3059\uFF1A\u300C\u2026${lastWord}\u300D\u2192\u300C\u2026${lastWord}.\u300D`
          })
        );
      }
      return found;
    }
  };
  var figureCrossReferenceRule = {
    id: "figure-cross-reference",
    category: "figure",
    title: "\u56F3\u8868\u756A\u53F7\u306E\u5BFE\u5FDC\u3068\u9023\u756A",
    kind: "document",
    run(paragraphs) {
      var _a, _b, _c;
      const captions = [];
      const cited = /* @__PURE__ */ new Map();
      paragraphs.forEach((text, paragraphIndex) => {
        const caption = parseCaption(text);
        if (caption) captions.push({ ...caption, paragraphIndex });
        for (const ref of intextRefs(text)) {
          if (caption && ref.start < caption.headEnd) continue;
          if (!cited.has(ref.label)) cited.set(ref.label, /* @__PURE__ */ new Map());
          const perLabel = cited.get(ref.label);
          for (const number of ref.numbers) {
            if (!perLabel.has(number)) {
              perLabel.set(number, { paragraphIndex, start: ref.start, text: ref.text });
            }
          }
        }
      });
      const found = [];
      for (const caption of captions) {
        const label = normalizeLabel(caption.label);
        if ((_a = cited.get(label)) == null ? void 0 : _a.has(caption.number)) continue;
        const head = caption.head;
        found.push(
          finding(figureCrossReferenceRule, {
            severity: "confirm",
            paragraphIndex: caption.paragraphIndex,
            start: caption.headStart,
            matched: head,
            message: `${head} \u306E\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306F\u3042\u308A\u307E\u3059\u304C\u3001\u672C\u6587\u4E2D\u3067\u5F15\u7528\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u672C\u6587\u304B\u3089\u300C${head}\u300D\u306B\u8A00\u53CA\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
          })
        );
      }
      const captionNumbers = /* @__PURE__ */ new Map();
      for (const caption of captions) {
        const label = normalizeLabel(caption.label);
        if (!captionNumbers.has(label)) captionNumbers.set(label, /* @__PURE__ */ new Set());
        captionNumbers.get(label).add(caption.number);
      }
      const missing = /* @__PURE__ */ new Map();
      for (const [label, perLabel] of cited) {
        for (const [number, where] of perLabel) {
          if ((_b = captionNumbers.get(label)) == null ? void 0 : _b.has(number)) continue;
          const key = `${where.paragraphIndex}:${where.start}:${label}`;
          const entry = (_c = missing.get(key)) != null ? _c : { where, label, numbers: [] };
          entry.numbers.push(number);
          missing.set(key, entry);
        }
      }
      for (const { where, label, numbers } of missing.values()) {
        const list = numbers.sort((a, b) => a - b).map((n) => `${label} ${n}`).join("\u3001");
        found.push(
          finding(figureCrossReferenceRule, {
            severity: "note",
            paragraphIndex: where.paragraphIndex,
            start: where.start,
            matched: where.text,
            message: `${where.text} \u3092\u5F15\u7528\u3057\u3066\u3044\u307E\u3059\u304C\u3001${list} \u306E\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002`
          })
        );
      }
      const byLabel = /* @__PURE__ */ new Map();
      for (const caption of captions) {
        const label = normalizeLabel(caption.label);
        if (!byLabel.has(label)) byLabel.set(label, []);
        byLabel.get(label).push(caption);
      }
      for (const [label, list] of byLabel) {
        list.forEach((caption, i) => {
          if (caption.number === i + 1) return;
          found.push(
            finding(figureCrossReferenceRule, {
              severity: "confirm",
              paragraphIndex: caption.paragraphIndex,
              start: caption.headStart,
              matched: caption.head,
              message: `${label} \u306E\u756A\u53F7\u304C\u767B\u5834\u9806\u306B\u306A\u3063\u3066\u3044\u307E\u305B\u3093\uFF08${i + 1} \u756A\u76EE\u306B ${caption.number} \u304C\u767B\u5834\uFF09\u3002`
            })
          );
        });
      }
      return found;
    }
  };
  function normalizeLabel(label) {
    if (/^Figs?\.$|^Figures?$/u.test(label)) return "Figure";
    if (/^Eqs?\.$|^Equations?$/u.test(label)) return "Equation";
    if (/^Tables?$/u.test(label)) return "Table";
    if (/^Schemes?$/u.test(label)) return "Scheme";
    if (/^Charts?$/u.test(label)) return "Chart";
    return label;
  }
  var COMPOUND_WORD = /(?:compounds?|化合物)\s*(\d{1,4})[a-z]?/giu;
  var COMPOUND_LABEL = new RegExp(`(?<![A-Za-z0-9.])(\\d{1,4})[a-z]${LABEL_END}`, "gu");
  var compoundOrderRule = {
    id: "compound-order",
    category: "figure",
    title: "\u5316\u5408\u7269\u756A\u53F7\u306E\u767B\u5834\u9806",
    kind: "document",
    run(paragraphs, ctx) {
      const mentions = [];
      paragraphs.forEach((text, paragraphIndex) => {
        for (const m of matchAll(COMPOUND_WORD, text)) {
          mentions.push({ paragraphIndex, start: m.index, text: m[0], number: Number(m[1]) });
        }
        for (const m of matchAll(COMPOUND_LABEL, text)) {
          if (!ctx.compoundLabels.has(m[0])) continue;
          mentions.push({ paragraphIndex, start: m.index, text: m[0], number: Number(m[1]) });
        }
      });
      mentions.sort((a, b) => a.paragraphIndex - b.paragraphIndex || a.start - b.start);
      const first = /* @__PURE__ */ new Map();
      for (const mention of mentions) {
        if (!first.has(mention.number)) first.set(mention.number, mention);
      }
      const found = [];
      let highest = 0;
      for (const [number, where] of first) {
        if (number > highest) {
          highest = number;
          continue;
        }
        found.push(
          finding(compoundOrderRule, {
            severity: "confirm",
            paragraphIndex: where.paragraphIndex,
            start: where.start,
            matched: where.text,
            message: `\u5316\u5408\u7269\u756A\u53F7\u306F\u767B\u5834\u9806\u306B\u4ED8\u3051\u307E\u3059\uFF08${highest} \u3092\u5148\u306B\u51FA\u3057\u305F\u3042\u3068\u3067 ${number} \u304C\u521D\u51FA\uFF09\u3002`
          })
        );
      }
      return found;
    }
  };
  var FIGURE_RULES = [
    figureParenPositionRule,
    captionPunctuationRule,
    figureCrossReferenceRule,
    compoundOrderRule
  ];

  // src/core/inventory.ts
  var COMPOUND_LABEL2 = new RegExp(`(?<![A-Za-z0-9.])(\\d{1,4})([a-z])${LABEL_END}`, "gu");
  var COMPOUND_RANGE = new RegExp(
    `(?<![A-Za-z0-9.])(\\d{1,4})([a-z])\\s*[\u2013\u2014\u2212-]\\s*(\\d{1,4})?([a-z])${LABEL_END}`,
    "gu"
  );
  var UNIT_AHEAD = new RegExp(
    `^\\s*(?:${[...UNITS, "%"].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})(?![A-Za-z0-9])`,
    "u"
  );
  var BOLD_TOKEN = new RegExp(`(?<![A-Za-z0-9.])(\\d{1,4})([a-z])?${LABEL_END}`, "gu");
  var NUMBER_RUN = /\d+/gu;
  var RANGE_SEPARATOR2 = /[–—−-]/u;
  function citedNumbers(marker) {
    const inner = marker.slice(1, -1);
    const numbers = [...matchAll(NUMBER_RUN, inner)];
    const cited = [];
    numbers.forEach((m, i) => {
      const value = Number(m[0]);
      if (i === 0) {
        cited.push(value);
        return;
      }
      const previous = numbers[i - 1];
      const between = inner.slice(previous.index + previous[0].length, m.index);
      if (RANGE_SEPARATOR2.test(between)) {
        for (let n = Number(previous[0]) + 1; n <= value; n += 1) cited.push(n);
      } else {
        cited.push(value);
      }
    });
    return [...new Set(cited)].sort((a, b) => a - b);
  }

  // src/core/references.ts
  var HEADING = /^\s*(?:\d+[.．]?\s*)?(?:references?|bibliography|literature\s+cited|参考文献|引用文献|文\s*献)\s*[:：]?\s*$/iu;
  var LEADING_NUMBER = /^\s*(?:\(\s*(\d{1,3})\s*\)|(\d{1,3})\s*[.．)]）?)\s*/u;
  var BRACKET_MARKER = /\[\s*(\d{1,3})\s*\]/gu;
  var MIN_ENTRY_LENGTH = 8;
  function splitEntries(text) {
    var _a;
    const markers = [...matchAll(BRACKET_MARKER, text)].filter(
      (m2) => {
        var _a2;
        return m2.index === 0 || !/[A-Za-z0-9]/u.test((_a2 = text[m2.index - 1]) != null ? _a2 : "");
      }
    );
    const accepted = [];
    let highest = 0;
    for (const m2 of markers) {
      const number2 = Number(m2[1]);
      if (number2 <= highest) continue;
      accepted.push({ index: m2.index, marker: m2[0], number: number2 });
      highest = number2;
    }
    if (accepted.length > 0) {
      const entries = [];
      accepted.forEach((marker, i) => {
        var _a2, _b;
        const from = marker.index + marker.marker.length;
        const to = (_b = (_a2 = accepted[i + 1]) == null ? void 0 : _a2.index) != null ? _b : text.length;
        const body2 = text.slice(from, to).trim();
        if (body2.length < MIN_ENTRY_LENGTH) return;
        entries.push({ number: marker.number, text: body2, start: marker.index, marker: marker.marker });
      });
      return entries;
    }
    const m = LEADING_NUMBER.exec(text);
    if (!m) return [];
    const number = Number((_a = m[1]) != null ? _a : m[2]);
    const body = text.slice(m[0].length).trim();
    if (!Number.isFinite(number) || number < 1 || body.length < MIN_ENTRY_LENGTH) return [];
    return [{ number, text: body, start: 0, marker: m[0].trim() }];
  }
  function parseBibliography(paragraphs) {
    let headingAt = -1;
    paragraphs.forEach((text, i) => {
      if (HEADING.test(text)) headingAt = i;
    });
    const from = (start2) => {
      const entries2 = [];
      for (let i = start2; i < paragraphs.length; i += 1) {
        for (const entry of splitEntries(paragraphs[i])) entries2.push({ ...entry, paragraphIndex: i });
      }
      return entries2;
    };
    if (headingAt >= 0) {
      const entries2 = from(headingAt + 1);
      if (entries2.length > 0) return entries2;
    }
    let start = paragraphs.length;
    for (let i = paragraphs.length - 1; i >= 0; i -= 1) {
      const text = paragraphs[i];
      if (text.trim().length === 0) continue;
      if (splitEntries(text).length === 0) break;
      start = i;
    }
    const entries = from(start);
    return entries.length >= 2 ? entries : [];
  }
  var BRACKET_CITATION = /\[\s*\d+(?:\s*[,、–—−-]\s*\d+)*\s*\]/gu;
  function bibliographyParagraphs(entries) {
    return new Set(entries.map((entry) => entry.paragraphIndex));
  }
  function bodyCitations(paragraphs, skip) {
    const hits = [];
    paragraphs.forEach((text, paragraphIndex) => {
      if (skip.has(paragraphIndex)) return;
      for (const m of matchAll(BRACKET_CITATION, text)) {
        hits.push({ paragraphIndex, start: m.index, text: m[0] });
      }
    });
    return hits;
  }

  // src/core/rules/reference.ts
  var CITATION = /\[\s*\d+(?:\s*[,–\-]\s*\d+)*\s*\]/u;
  var CITATION_SOURCE = CITATION.source;
  var JA_CITATION_AFTER_PUNCT = new RegExp(`([\u3002\uFF0E])\\s*(${CITATION_SOURCE})`, "gu");
  var EN_CITATION_BEFORE_PUNCT = new RegExp(`(${CITATION_SOURCE})\\s*([.,])`, "gu");
  var citationPositionRule = {
    id: "citation-position",
    category: "reference",
    title: "\u5F15\u7528\u756A\u53F7\u3068\u53E5\u8AAD\u70B9\u306E\u524D\u5F8C",
    kind: "paragraph",
    run(text, index) {
      const found = [];
      if (hasCJK(text)) {
        for (const m of matchAll(JA_CITATION_AFTER_PUNCT, text)) {
          const replacement = `${m[2]}${m[1]}`;
          found.push(
            finding(citationPositionRule, {
              severity: "fix",
              paragraphIndex: index,
              start: m.index,
              matched: m[0],
              replacement,
              message: `\u548C\u6587\u3067\u306F\u5F15\u7528\u756A\u53F7\u306F\u53E5\u8AAD\u70B9\u306E\u524D\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
            })
          );
        }
      } else {
        for (const m of matchAll(EN_CITATION_BEFORE_PUNCT, text)) {
          const replacement = `${m[2]}${m[1]}`;
          found.push(
            finding(citationPositionRule, {
              severity: "fix",
              paragraphIndex: index,
              start: m.index,
              matched: m[0],
              replacement,
              message: `\u82F1\u6587\u3067\u306F\u5F15\u7528\u756A\u53F7\u306F\u30D4\u30EA\u30AA\u30C9\u30FB\u30AB\u30F3\u30DE\u306E\u5F8C\uFF1A\u300C${m[0]}\u300D\u2192\u300C${replacement}\u300D`
            })
          );
        }
      }
      return found;
    }
  };
  var journalAbbrevRule = dictionaryRule({
    id: "journal-abbrev",
    category: "reference",
    title: "\u96D1\u8A8C\u7565\u79F0",
    entries: JOURNAL_ABBREV,
    message: arrowMessage("\u96D1\u8A8C\u7565\u79F0")
  });
  var JOURNAL_LIKE = /\b(?:[A-Z][A-Za-z]*\.\s*){2,}(?:[A-Z][A-Za-z]*\.?)/gu;
  var EDITION_SUFFIXES = /* @__PURE__ */ new Set(["engl"]);
  function journalKey(name) {
    const tokens = name.split(/\s+/u).filter((t) => t.length > 0);
    while (tokens.length > 2 && EDITION_SUFFIXES.has(tokens[tokens.length - 1].replace(/\./gu, "").toLowerCase())) {
      tokens.pop();
    }
    return tokens.join("").replace(/\./gu, "").toLowerCase();
  }
  var journalConsistencyRule = {
    id: "journal-consistency",
    category: "reference",
    title: "\u96D1\u8A8C\u7565\u79F0\u306E\u63FA\u308C",
    kind: "document",
    run(paragraphs) {
      const hits = [];
      paragraphs.forEach((text, paragraphIndex) => {
        for (const m of matchAll(JOURNAL_LIKE, text)) {
          hits.push({ paragraphIndex, start: m.index, text: m[0].trim() });
        }
      });
      const journals = /* @__PURE__ */ new Map();
      for (const hit of hits) {
        const key = journalKey(hit.text);
        if (key.length === 0) continue;
        if (!journals.has(key)) journals.set(key, /* @__PURE__ */ new Map());
        const forms = journals.get(key);
        if (!forms.has(hit.text)) forms.set(hit.text, []);
        forms.get(hit.text).push(hit);
      }
      const found = [];
      for (const forms of journals.values()) {
        if (forms.size < 2) continue;
        const sorted = [...forms.entries()].sort((a, b) => b[1].length - a[1].length);
        const preferred = sorted[0][0];
        for (const [form, occurrences2] of sorted.slice(1)) {
          for (const hit of occurrences2) {
            found.push(
              finding(journalConsistencyRule, {
                severity: "confirm",
                paragraphIndex: hit.paragraphIndex,
                start: hit.start,
                matched: hit.text,
                replacement: preferred,
                message: `\u540C\u3058\u96D1\u8A8C\u304C 2 \u901A\u308A\u306B\u66F8\u304B\u308C\u3066\u3044\u307E\u3059\uFF1A\u300C${form}\u300D\u3068\u300C${preferred}\u300D\u3002\u63B2\u8F09\u5E74\u306B\u3088\u308B\u6539\u79F0\u3067\u306A\u3051\u308C\u3070\u7D71\u4E00\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
              })
            );
          }
        }
      }
      return found;
    }
  };
  var CITATION_STYLES = [
    { name: "[1]", re: /\[\s*\d+(?:\s*[,–\-]\s*\d+)*\s*\]/gu },
    { name: "(1)", re: /(?<![A-Za-z0-9])\(\s*\d+(?:\s*[,–\-]\s*\d+)*\s*\)(?![A-Za-z0-9])/gu }
  ];
  var citationStyleRule = {
    id: "citation-style",
    category: "reference",
    title: "\u5F15\u7528\u30B9\u30BF\u30A4\u30EB\u306E\u7D71\u4E00",
    kind: "document",
    run(paragraphs) {
      const counts = CITATION_STYLES.map(({ name, re }) => ({
        name,
        re,
        total: paragraphs.reduce((n, p) => n + [...matchAll(re, p)].length, 0)
      }));
      const used = counts.filter((c) => c.total > 0);
      if (used.length < 2) return [];
      const sorted = [...used].sort((a, b) => b.total - a.total);
      const preferred = sorted[0];
      const found = [];
      for (const style of sorted.slice(1)) {
        paragraphs.forEach((text, paragraphIndex) => {
          for (const m of matchAll(style.re, text)) {
            found.push(
              finding(citationStyleRule, {
                severity: "confirm",
                paragraphIndex,
                start: m.index,
                matched: m[0],
                message: `\u5F15\u7528\u306E\u66F8\u5F0F\u304C\u6DF7\u5728\u3057\u3066\u3044\u307E\u3059\uFF08${preferred.name} \u304C ${preferred.total} \u4EF6\u3001${style.name} \u304C ${style.total} \u4EF6\uFF09\u3002`
              })
            );
          }
        });
      }
      return found;
    }
  };
  var SURNAME_FIRST = /\b([A-Z][a-z]+),\s*([A-Z]\.(?:\s*[A-Z]\.)*)/gu;
  var INITIALS_FIRST = /\b([A-Z]\.(?:\s*[A-Z]\.)*)\s+([A-Z][a-z]+)\b(?!\.)/gu;
  var AUTHOR_LOOKBACK = 40;
  function initialsPrecede(text, index) {
    const before = text.slice(Math.max(0, index - AUTHOR_LOOKBACK), index);
    const separator = Math.max(before.lastIndexOf(","), before.lastIndexOf(";"));
    return /[A-Z]\./u.test(before.slice(separator + 1));
  }
  var authorOrderRule = {
    id: "author-order",
    category: "reference",
    title: "\u8457\u8005\u540D\u306E\u59D3\u540D\u9806\u306E\u7D71\u4E00",
    kind: "document",
    run(paragraphs) {
      const surnameFirst = [];
      const initialsFirst = [];
      paragraphs.forEach((text, paragraphIndex) => {
        for (const m of matchAll(SURNAME_FIRST, text)) {
          if (initialsPrecede(text, m.index)) continue;
          surnameFirst.push({ paragraphIndex, start: m.index, text: m[0] });
        }
        for (const m of matchAll(INITIALS_FIRST, text)) {
          initialsFirst.push({ paragraphIndex, start: m.index, text: m[0] });
        }
      });
      if (surnameFirst.length === 0 || initialsFirst.length === 0) return [];
      const minority = surnameFirst.length < initialsFirst.length ? surnameFirst : initialsFirst;
      const minorityName = surnameFirst.length < initialsFirst.length ? "\u59D3, \u30A4\u30CB\u30B7\u30E3\u30EB" : "\u30A4\u30CB\u30B7\u30E3\u30EB \u59D3";
      const majorityName = minorityName === "\u59D3, \u30A4\u30CB\u30B7\u30E3\u30EB" ? "\u30A4\u30CB\u30B7\u30E3\u30EB \u59D3" : "\u59D3, \u30A4\u30CB\u30B7\u30E3\u30EB";
      return minority.map(
        (hit) => finding(authorOrderRule, {
          severity: "confirm",
          paragraphIndex: hit.paragraphIndex,
          start: hit.start,
          matched: hit.text,
          message: `\u8457\u8005\u540D\u306E\u59D3\u540D\u9806\u304C\u6DF7\u5728\u3057\u3066\u3044\u307E\u3059\uFF08\u591A\u6570\u6D3E\u306F\u300C${majorityName}\u300D\u3001\u3053\u3053\u306F\u300C${minorityName}\u300D\uFF09\u3002`
        })
      );
    }
  };
  var uncitedReferenceRule = {
    id: "uncited-reference",
    category: "reference",
    title: "\u5F15\u7528\u3055\u308C\u3066\u3044\u306A\u3044\u6587\u732E",
    kind: "document",
    run(paragraphs) {
      const entries = parseBibliography(paragraphs);
      if (entries.length === 0) return [];
      const inList = bibliographyParagraphs(entries);
      const cited = /* @__PURE__ */ new Set();
      for (const hit of bodyCitations(paragraphs, inList)) {
        for (const number of citedNumbers(hit.text)) cited.add(number);
      }
      return entries.filter((entry) => !cited.has(entry.number)).map(
        (entry) => finding(uncitedReferenceRule, {
          severity: "note",
          paragraphIndex: entry.paragraphIndex,
          start: entry.start,
          matched: entry.marker,
          message: `\u6587\u732E ${entry.number} \u306F\u672C\u6587\u306E\u3069\u3053\u304B\u3089\u3082\u5F15\u7528\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002\u5F15\u7528\u3092\u52A0\u3048\u308B\u304B\u3001\u30EA\u30B9\u30C8\u304B\u3089\u5916\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
        })
      );
    }
  };
  var REFERENCE_RULES = [
    citationPositionRule,
    journalAbbrevRule,
    journalConsistencyRule,
    citationStyleRule,
    authorOrderRule,
    uncitedReferenceRule
  ];

  // src/core/engine.ts
  var ALL_RULES = Object.freeze([
    ...FORMAT_RULES,
    ...SCIENCE_RULES,
    ...READABILITY_RULES,
    ...FIGURE_RULES,
    ...REFERENCE_RULES
  ]);

  // src/core/palette.ts
  var HIGHLIGHT_PALETTE = Object.freeze([
    { value: "#FFFF00", label: "\u9EC4" },
    { value: "#FFE066", label: "\u3046\u3059\u3044\u9EC4" },
    { value: "#FFD699", label: "\u30AF\u30EA\u30FC\u30E0" },
    { value: "#B6FF00", label: "\u9EC4\u7DD1" },
    { value: "#00FF00", label: "\u660E\u308B\u3044\u7DD1" },
    { value: "#80FFFF", label: "\u6C34\u8272" },
    { value: "#80DEEA", label: "\u30B7\u30A2\u30F3" },
    { value: "#00FFFF", label: "\u30BF\u30FC\u30B3\u30A4\u30BA" },
    { value: "#8080FF", label: "\u9752\u7D2B" },
    { value: "#FF80FF", label: "\u30D4\u30F3\u30AF" },
    { value: "#FF00FF", label: "\u30DE\u30BC\u30F3\u30BF" },
    { value: "#FFA0A0", label: "\u30B5\u30FC\u30E2\u30F3" },
    { value: "#C0C0C0", label: "\u30B0\u30EC\u30FC" }
  ]);

  // src/office/locate.ts
  var MAX_SEARCH_LENGTH = 255;
  function escapeSearch(term) {
    return term.replace(/\^/gu, "^^");
  }
  function searchTermFor(matched) {
    return escapeSearch(matched.slice(0, MAX_SEARCH_LENGTH));
  }
  function occurrenceIndex(paragraphText, matched, start) {
    if (matched.length === 0) return -1;
    let n = 0;
    let from = 0;
    for (; ; ) {
      const at = paragraphText.indexOf(matched, from);
      if (at === -1 || at > start) return -1;
      if (at === start) return n;
      n += 1;
      from = at + matched.length;
    }
  }
  var EXACT = {
    matchCase: true,
    matchWholeWord: false,
    matchWildcards: false,
    ignorePunct: false,
    ignoreSpace: false
  };
  async function locateFindings(context, paragraphs, paragraphTexts, findings) {
    const pending = [];
    for (const item of findings) {
      const paragraph = paragraphs[item.paragraphIndex];
      const text = paragraphTexts[item.paragraphIndex];
      if (!paragraph || text === void 0) continue;
      const term = searchTermFor(item.matched);
      if (term.trim().length === 0 && item.matched.trim().length === 0) continue;
      if (term.length === 0) continue;
      const ordinal = occurrenceIndex(text, item.matched.slice(0, MAX_SEARCH_LENGTH), item.start);
      if (ordinal < 0) continue;
      const results = paragraph.search(term, EXACT);
      results.load("items");
      pending.push({ finding: item, ordinal, results });
    }
    await context.sync();
    const located = [];
    for (const { finding: finding2, ordinal, results } of pending) {
      const range = results.items[ordinal];
      if (!range) continue;
      located.push({ finding: finding2, range });
    }
    return located;
  }

  // src/core/fonts.ts
  var JAPANESE_FONTS = [
    "ms mincho",
    "\uFF4D\uFF53 \u660E\u671D",
    "ms \u660E\u671D",
    "ms pmincho",
    "ms gothic",
    "\uFF4D\uFF53 \u30B4\u30B7\u30C3\u30AF",
    "ms gothic",
    "ms pgothic",
    "hiragino",
    "\u30D2\u30E9\u30AE\u30CE",
    "yu gothic",
    "\u6E38\u30B4\u30B7\u30C3\u30AF",
    "yu mincho",
    "\u6E38\u660E\u671D",
    "meiryo",
    "\u30E1\u30A4\u30EA\u30AA",
    "noto sans jp",
    "noto serif jp",
    "noto sans cjk",
    "noto serif cjk",
    "biz ud",
    "hg",
    "osaka",
    "klee",
    "kozuka",
    "\u5C0F\u585A",
    "\u6E90\u30CE\u89D2",
    "source han",
    "ipa",
    "sarasa",
    "morisawa",
    "a-otf"
  ];
  function normalize(name) {
    if (!name) return "";
    return name.split(",")[0].trim().toLowerCase();
  }
  function isJapaneseFontName(name) {
    const family = normalize(name);
    if (family.length === 0) return false;
    return JAPANESE_FONTS.some((jp) => family.includes(jp));
  }
  var SYMBOL_FONT = "Symbol";
  var SYMBOL_GREEK = Object.freeze({
    \u03B1: "a",
    \u03B2: "b",
    \u03C7: "c",
    \u03B4: "d",
    \u03B5: "e",
    \u03C6: "f",
    \u03B3: "g",
    \u03B7: "h",
    \u03B9: "i",
    \u03D5: "j",
    \u03BA: "k",
    \u03BB: "l",
    \u03BC: "m",
    \u03BD: "n",
    \u03BF: "o",
    \u03C0: "p",
    \u03B8: "q",
    \u03C1: "r",
    \u03C3: "s",
    \u03C4: "t",
    \u03C5: "u",
    \u03D6: "v",
    \u03C9: "w",
    \u03BE: "x",
    \u03C8: "y",
    \u03B6: "z",
    \u0391: "A",
    \u0392: "B",
    \u03A7: "C",
    \u0394: "D",
    \u0395: "E",
    \u03A6: "F",
    \u0393: "G",
    \u0397: "H",
    \u0399: "I",
    \u03D1: "J",
    \u039A: "K",
    \u039B: "L",
    \u039C: "M",
    \u039D: "N",
    \u039F: "O",
    \u03A0: "P",
    \u0398: "Q",
    \u03A1: "R",
    \u03A3: "S",
    \u03A4: "T",
    \u03A5: "U",
    \u03C2: "V",
    \u03A9: "W",
    \u039E: "X",
    \u03A8: "Y",
    \u0396: "Z"
  });
  function symbolKeyFor(greek) {
    var _a;
    return (_a = SYMBOL_GREEK[greek]) != null ? _a : null;
  }
  function symbolKeysFor(greek) {
    let keys = "";
    for (const character of greek) {
      const key = symbolKeyFor(character);
      if (key === null) return null;
      keys += key;
    }
    return keys.length > 0 ? keys : null;
  }

  // src/office/fontScan.ts
  var CHARACTER_STYLES = Object.freeze([
    { style: "bold", label: "\u592A\u5B57" },
    { style: "italic", label: "\u659C\u4F53" },
    { style: "superscript", label: "\u4E0A\u4ED8\u304D" },
    { style: "subscript", label: "\u4E0B\u4ED8\u304D" }
  ]);

  // src/core/probes.ts
  var GREEK2 = /[Ͱ-Ͽἀ-῿]+/gu;
  function greekProbes(text) {
    return [...matchAll(GREEK2, text)].map((m) => ({
      start: m.index,
      end: m.index + m[0].length,
      text: m[0],
      reason: "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u306B\u65E5\u672C\u8A9E\u30D5\u30A9\u30F3\u30C8\u304C\u5F53\u305F\u3063\u3066\u3044\u307E\u3059"
    }));
  }
  function symbolGreekProbes(text) {
    const probes = [];
    for (const m of matchAll(GREEK2, text)) {
      const keys = symbolKeysFor(m[0]);
      if (keys === null) continue;
      probes.push({
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
        reason: `\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u300C${m[0]}\u300D\u306F Symbol \u30D5\u30A9\u30F3\u30C8\u306E\u300C${keys}\u300D\u3067\u5165\u529B\u3057\u307E\u3059`
      });
    }
    return probes;
  }
  var QUANTITY_ASSIGNMENT = new RegExp(
    `(?<![A-Za-z0-9])([${PHYSICAL_QUANTITIES.join("")}])(\\s*=\\s*)(?=[-\u2212\u2013]?\\d)`,
    "gu"
  );
  function quantityProbes(text) {
    return [...matchAll(QUANTITY_ASSIGNMENT, text)].map((m) => ({
      start: m.index,
      end: m.index + m[1].length,
      text: m[1],
      reason: `\u7269\u7406\u91CF\u300C${m[1]}\u300D\u306F\u30A4\u30BF\u30EA\u30C3\u30AF\u306B\u3057\u307E\u3059`
    }));
  }
  var NUCLIDE_SET = new Set(NMR_NUCLIDES);
  var NUCLIDE_ALT = [...NMR_NUCLIDES].sort((a, b) => b.length - a.length).join("|");
  var NMR_TAIL = "[\\s\\-\u2013]*NMR";
  var NMR_NUCLIDE = new RegExp(
    `(?<![A-Za-z0-9])(\\d{1,3})([A-Za-z]{1,2})(?=(?:\\s*\\{\\s*(?:${NUCLIDE_ALT})\\s*\\})?${NMR_TAIL})`,
    "gu"
  );
  var NMR_DECOUPLED = new RegExp(`(?<=\\{\\s*)(\\d{1,3})([A-Za-z]{1,2})(?=\\s*\\}${NMR_TAIL})`, "gu");
  function nmrNuclideProbes(text) {
    const probes = [];
    for (const re of [NMR_NUCLIDE, NMR_DECOUPLED]) {
      for (const m of matchAll(re, text)) {
        const digits = m[1];
        if (!NUCLIDE_SET.has(`${digits}${m[2]}`)) continue;
        probes.push({
          start: m.index,
          end: m.index + digits.length,
          text: digits,
          reason: `\u6838\u7A2E\u306E\u8CEA\u91CF\u6570\u300C${digits}\u300D\u306F\u4E0A\u4ED8\u304D\u306B\u3057\u307E\u3059\uFF08${digits}${m[2]} NMR\uFF09`
        });
      }
    }
    return probes.sort((a, b) => a.start - b.start);
  }
  function captionNumberProbes(text) {
    const caption = parseCaption(text);
    if (!caption) return [];
    return [
      {
        start: caption.headStart,
        end: caption.headEnd,
        text: caption.head,
        reason: `\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u56F3\u8868\u756A\u53F7\u300C${caption.head}\u300D\u306F\u592A\u5B57\u306B\u3057\u307E\u3059`
      }
    ];
  }
  function intextRefProbes(text) {
    const caption = parseCaption(text);
    return intextRefs(text).filter((ref) => !caption || ref.start >= caption.headEnd).map((ref) => ({
      start: ref.start,
      end: ref.start + ref.text.length,
      text: ref.text,
      reason: `\u672C\u6587\u4E2D\u306E\u56F3\u8868\u756A\u53F7\u300C${ref.text}\u300D\u306F\u592A\u5B57\u306B\u3057\u307E\u305B\u3093`
    }));
  }
  var FIRST_TOKEN = "(?:[A-Z][A-Za-z]+\\.|(?<![A-Z][a-z]+,\\s{0,2})[A-Z]\\.)";
  var JOURNAL_NAME = `(?:${FIRST_TOKEN}(?:\\s*[A-Z][A-Za-z]*\\.?)*|[A-Z][A-Za-z]{2,})`;
  var REFERENCE_ENTRY = new RegExp(
    `(?<![A-Za-z0-9])(${JOURNAL_NAME})\\s+(\\d{4})\\s*,\\s*(\\d+)\\s*,`,
    "gu"
  );
  var NOT_A_JOURNAL = new Set(LABELS.map((label) => label.replace(".", "")));
  function referenceEntries(text) {
    return [...matchAll(REFERENCE_ENTRY, text)].filter(
      (m) => !NOT_A_JOURNAL.has(m[1].replace(".", ""))
    );
  }
  function journalNameProbes(text) {
    return referenceEntries(text).map((m) => {
      const name = m[1].replace(/\.$/u, "");
      return {
        start: m.index,
        end: m.index + name.length,
        text: name,
        reason: `\u5F15\u7528\u6587\u732E\u306E\u8A8C\u540D\u300C${m[1]}\u300D\u306F\u659C\u4F53\u306B\u3057\u307E\u3059`
      };
    });
  }
  function chargeProbes(text, labels) {
    const probes = [];
    for (const label of labels) {
      const pattern = new RegExp(`(?<![A-Za-z0-9.])${label}(\\d{1,2}\\s*[\u2013\u2014\u2212+])`, "gu");
      for (const m of matchAll(pattern, text)) {
        const charge = m[1];
        const start = m.index + label.length;
        probes.push({
          start,
          end: start + charge.length,
          text: charge,
          reason: `\u5316\u5408\u7269 ${label} \u306E\u96FB\u8377\u300C${charge.trim()}\u300D\u306F\u4E0A\u4ED8\u304D\u306B\u3057\u307E\u3059`
        });
      }
    }
    return probes.sort((a, b) => a.start - b.start);
  }
  function yearProbes(text) {
    return referenceEntries(text).map((m) => {
      const year = m[2];
      const start = m.index + m[0].indexOf(year, m[1].length);
      return {
        start,
        end: start + year.length,
        text: year,
        reason: `\u5F15\u7528\u6587\u732E\u306E\u5E74\u300C${year}\u300D\u306F\u592A\u5B57\u306B\u3057\u307E\u3059`
      };
    });
  }
  function volumeNumberProbes(text) {
    return referenceEntries(text).map((m) => {
      const volume = m[3];
      const start = m.index + m[0].lastIndexOf(volume);
      return {
        start,
        end: start + volume.length,
        text: volume,
        reason: `\u5F15\u7528\u6587\u732E\u306E\u5DFB\u300C${volume}\u300D\u306F\u659C\u4F53\u306B\u3057\u307E\u3059\uFF08\u592A\u5B57\u306B\u3059\u308B\u306E\u306F\u5E74\uFF09`
      };
    });
  }
  var COMPOUND_NUMBER = /(?:compounds?|化合物)\s*(\d+[a-z]?)/giu;
  function compoundNumberProbes(text, labels = /* @__PURE__ */ new Set()) {
    const probes = /* @__PURE__ */ new Map();
    for (const m of matchAll(COMPOUND_NUMBER, text)) {
      const digits = m[1];
      const start = m.index + m[0].lastIndexOf(digits);
      probes.set(start, {
        start,
        end: start + digits.length,
        text: digits,
        reason: `\u5316\u5408\u7269\u756A\u53F7\u300C${digits}\u300D\u306F\u592A\u5B57\u306B\u3057\u307E\u3059`
      });
    }
    const covered = [];
    for (const span of labelRanges(text)) {
      if (!labels.has(span.base)) continue;
      if (isFigureNumber(text, span.start)) continue;
      covered.push({ start: span.start, end: span.start + span.text.length });
      probes.set(span.start, {
        start: span.start,
        end: span.start + span.text.length,
        text: span.text,
        reason: `\u5316\u5408\u7269\u756A\u53F7\u300C${span.text}\u300D\u306F\u592A\u5B57\u306B\u3057\u307E\u3059`
      });
    }
    const inRange = (start) => covered.some((span) => start >= span.start && start < span.end);
    for (const label of labels) {
      const pattern = new RegExp(`(?<![A-Za-z0-9.])${label}${LABEL_END}`, "gu");
      for (const m of matchAll(pattern, text)) {
        if (probes.has(m.index) || inRange(m.index)) continue;
        if (isFigureNumber(text, m.index)) continue;
        probes.set(m.index, {
          start: m.index,
          end: m.index + label.length,
          text: label,
          reason: `\u5316\u5408\u7269\u756A\u53F7\u300C${label}\u300D\u306F\u592A\u5B57\u306B\u3057\u307E\u3059`
        });
      }
    }
    return [...probes.values()].sort((a, b) => a.start - b.start);
  }

  // src/office/formatChecks.ts
  var SPACING_RULE_ID = japaneseLatinSpacingRule.id;
  var CHECKS = [
    {
      id: "greek-symbol-font",
      category: "format",
      title: "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u306F Symbol \u30D5\u30A9\u30F3\u30C8",
      probe: symbolGreekProbes,
      load: "name",
      severity: "confirm",
      // Every Unicode Greek character is wrong under this convention, whatever
      // font carries it, so the font is read only to describe the current state.
      verdict: (font, probe) => font.name && !isJapaneseFontName(font.name) ? `${probe.reason}\uFF08\u73FE\u5728: ${font.name}\uFF09` : probe.reason,
      replacement: (probe) => {
        var _a;
        return (_a = symbolKeysFor(probe.text)) != null ? _a : void 0;
      },
      fix: (font) => {
        font.name = SYMBOL_FONT;
      }
    },
    {
      id: "greek-font",
      category: "format",
      title: "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u306B\u65E5\u672C\u8A9E\u30D5\u30A9\u30F3\u30C8",
      probe: greekProbes,
      load: "name",
      severity: "fix",
      // 「Symbol フォント」 replaces the character outright, which fixes the font
      // question too; running both would put two contradictory findings on one π.
      supersededBy: "greek-symbol-font",
      verdict: (font, probe) => isJapaneseFontName(font.name) ? `${probe.reason}\uFF08\u73FE\u5728: ${font.name}\uFF09\u3002\u6B27\u6587\u30D5\u30A9\u30F3\u30C8\u306B\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002` : null,
      fix: (font, latinFont) => {
        font.name = latinFont;
      }
    },
    {
      id: "nmr-superscript",
      category: "format",
      title: "\u6838\u7A2E\u306E\u8CEA\u91CF\u6570\u306F\u4E0A\u4ED8\u304D",
      probe: nmrNuclideProbes,
      load: "superscript",
      severity: "fix",
      verdict: (font, probe) => font.superscript ? null : probe.reason,
      fix: (font) => {
        font.superscript = true;
      }
    },
    {
      id: "quantity-italic",
      category: "format",
      title: "\u7269\u7406\u91CF\u306F\u30A4\u30BF\u30EA\u30C3\u30AF",
      probe: quantityProbes,
      load: "italic",
      severity: "fix",
      verdict: (font, probe) => font.italic ? null : probe.reason,
      fix: (font) => {
        font.italic = true;
      }
    },
    {
      id: "caption-number-bold",
      category: "figure",
      title: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306E\u56F3\u8868\u756A\u53F7\u306F\u592A\u5B57",
      probe: captionNumberProbes,
      load: "bold",
      severity: "fix",
      verdict: (font, probe) => font.bold ? null : probe.reason,
      fix: (font) => {
        font.bold = true;
      }
    },
    {
      id: "intext-ref-not-bold",
      category: "figure",
      title: "\u672C\u6587\u4E2D\u306E\u56F3\u8868\u756A\u53F7\u306F\u592A\u5B57\u306B\u3057\u306A\u3044",
      probe: intextRefProbes,
      load: "bold",
      severity: "fix",
      verdict: (font, probe) => font.bold ? probe.reason : null,
      fix: (font) => {
        font.bold = false;
      }
    },
    {
      id: "compound-number-bold",
      category: "figure",
      title: "\u5316\u5408\u7269\u756A\u53F7\u306F\u592A\u5B57",
      probe: compoundNumberProbes,
      // 上付きも読むのは、それが化合物番号かどうかの判定に要るから。
      // 「ジラジカル化合物⁸⁸と」 の 88 は文献 88 で、本文だけ見ると
      // 「化合物 88」 と区別が付かない。数字が上がっていることだけが証拠になる。
      load: "bold, superscript",
      severity: "confirm",
      verdict: (font, probe) => font.superscript || font.bold ? null : probe.reason,
      fix: (font) => {
        font.bold = true;
      }
    },
    {
      id: "charge-superscript",
      category: "figure",
      title: "\u5316\u5408\u7269\u306E\u96FB\u8377\u306F\u4E0A\u4ED8\u304D",
      probe: chargeProbes,
      load: "superscript",
      severity: "fix",
      verdict: (font, probe) => font.superscript ? null : probe.reason,
      fix: (font) => {
        font.superscript = true;
      }
    },
    {
      id: "reference-journal-italic",
      category: "reference",
      title: "\u5F15\u7528\u6587\u732E\u306E\u8A8C\u540D\u306F\u659C\u4F53",
      probe: journalNameProbes,
      load: "italic",
      // Which token is emphasised is the journal's house style, so this is raised
      // for confirmation even though the fix itself is unambiguous.
      severity: "confirm",
      verdict: (font, probe) => font.italic ? null : probe.reason,
      fix: (font) => {
        font.italic = true;
      }
    },
    {
      id: "reference-year-bold",
      category: "reference",
      title: "\u5F15\u7528\u6587\u732E\u306E\u5E74\u306F\u592A\u5B57",
      probe: yearProbes,
      load: "bold",
      // 誌名の書式と同じく、どの語を強調するかは投稿規程で決まるので確認扱い。
      severity: "confirm",
      verdict: (font, probe) => font.bold ? null : probe.reason,
      fix: (font) => {
        font.bold = true;
      }
    },
    {
      id: "reference-volume-italic",
      category: "reference",
      title: "\u5F15\u7528\u6587\u732E\u306E\u5DFB\u306F\u659C\u4F53",
      probe: volumeNumberProbes,
      load: "italic",
      severity: "confirm",
      verdict: (font, probe) => font.italic ? null : probe.reason,
      fix: (font) => {
        font.italic = true;
      }
    }
  ];
  function isCentered(alignment) {
    return typeof alignment === "string" && alignment.toLowerCase() === "centered";
  }
  var PARAGRAPH_CHECKS = [
    {
      id: "caption-alignment",
      category: "figure",
      title: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306F\u4E2D\u592E\u63C3\u3048\u306B\u3057\u306A\u3044",
      severity: "fix",
      anchor: (text) => {
        const caption = parseCaption(text);
        return caption === null ? null : { start: caption.headStart, text: caption.head };
      },
      load: "alignment",
      verdict: (paragraph) => isCentered(paragraph.alignment) ? "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u304C\u4E2D\u592E\u63C3\u3048\u3067\u3059\u3002\u56F3\u306E\u5DE6\u7AEF\u306B\u5408\u308F\u305B\u307E\u3059\uFF08\u5DE6\u63C3\u3048\uFF09\u3002" : null,
      fix: (paragraph) => {
        paragraph.alignment = "Left";
      }
    }
  ];
  var FORMAT_CHECK_INFO = [...CHECKS, ...PARAGRAPH_CHECKS].map(({ id, title, category }) => ({ id, title, category }));

  // src/office/ruleCatalog.ts
  function describe(id, title, category, kind) {
    var _a;
    const doc = RULE_DOCS[id];
    return {
      id,
      title,
      category,
      kind,
      summary: (_a = doc == null ? void 0 : doc.summary) != null ? _a : "",
      ...(doc == null ? void 0 : doc.example) === void 0 ? {} : { example: doc.example },
      defaultEnabled: enabledByDefault(id),
      ...RULE_ENTRIES[id] ? { entries: RULE_ENTRIES[id] } : {},
      ...RULE_GROUPS[id] ? { groups: RULE_GROUPS[id] } : {}
    };
  }
  var RULE_CATALOG = Object.freeze([
    ...ALL_RULES.map((rule) => describe(rule.id, rule.title, rule.category, "text")),
    ...FORMAT_CHECK_INFO.map((check) => describe(check.id, check.title, check.category, "format"))
  ]);
  var DEFAULT_DISABLED_RULES = Object.freeze(
    RULE_CATALOG.filter((item) => !item.defaultEnabled).map((item) => item.id)
  );

  // src/office/actions.ts
  var SPACING_HIGHLIGHT = "#80DEEA";
  var DEFAULT_OPTIONS = {
    selectionOnly: false,
    bodyFont: "Times New Roman",
    trackChanges: false
  };
  function scopeOf(context, selectionOnly) {
    return selectionOnly ? context.document.getSelection() : context.document.body;
  }
  var HIGHLIGHT_NAMES = Object.freeze({
    yellow: "#FFFF00",
    brightgreen: "#00FF00",
    green: "#008000",
    turquoise: "#00FFFF",
    teal: "#008080",
    pink: "#FF00FF",
    magenta: "#FF00FF",
    blue: "#0000FF",
    gray25: "#C0C0C0",
    gray50: "#808080"
  });
  function normalizeHighlight(value) {
    if (typeof value !== "string" || value.length === 0) return "";
    const lower = value.toLowerCase();
    if (HIGHLIGHT_NAMES[lower]) return HIGHLIGHT_NAMES[lower];
    return lower.startsWith("#") ? `#${lower.slice(1).toUpperCase()}` : `#${lower.toUpperCase()}`;
  }
  var TOOL_COLORS = /* @__PURE__ */ new Set([
    ...HIGHLIGHT_PALETTE.map((color) => normalizeHighlight(color.value)),
    ...Object.values(CATEGORIES).map((info) => normalizeHighlight(info.highlight)),
    normalizeHighlight(SPACING_HIGHLIGHT)
  ]);
  async function clearHighlights(opts, target) {
    var _a;
    const findings = (_a = target.findings) != null ? _a : [];
    if (findings.length === 0 && !target.spaces) return 0;
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const candidates = [];
      if (findings.length > 0) {
        const located = await locateFindings(context, paragraphs, texts, findings);
        candidates.push(...located.map((item) => item.range));
      }
      if (target.spaces) {
        const scope = scopeOf(context, opts.selectionOnly);
        const batches = [" ", "\u3000"].map((space) => {
          const results = scope.search(space, { matchCase: true, matchWildcards: false });
          results.load("items");
          return results;
        });
        await context.sync();
        for (const batch of batches) candidates.push(...batch.items);
      }
      if (candidates.length === 0) return 0;
      for (const range of candidates) range.font.load("highlightColor");
      await context.sync();
      let cleared = 0;
      for (const range of candidates) {
        if (!TOOL_COLORS.has(normalizeHighlight(range.font.highlightColor))) continue;
        range.font.highlightColor = null;
        cleared += 1;
      }
      await context.sync();
      return cleared;
    });
  }
  async function loadParagraphs(context, selectionOnly) {
    const scope = scopeOf(context, selectionOnly);
    const collection = scope.paragraphs;
    collection.load("items/text");
    await context.sync();
    const paragraphs = collection.items;
    return { paragraphs, texts: paragraphs.map((p) => p.text) };
  }

  // src/commands/commands.ts
  function command(handler) {
    return (event) => {
      handler().catch((error) => {
        console.error("Document Corrector command failed:", error);
      }).finally(() => event.completed());
    };
  }
  var clearHighlights2 = command(() => clearHighlights(DEFAULT_OPTIONS, { spaces: true }));
  Office.onReady(() => {
    Office.actions.associate("clearHighlights", clearHighlights2);
  });
})();
//# sourceMappingURL=commands.js.map
