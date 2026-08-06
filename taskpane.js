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
  function cjkRatio(text) {
    var _a, _b;
    const dense = text.replace(/\s+/g, "");
    if (dense.length === 0) return 0;
    return ((_b = (_a = dense.match(CJK_GLOBAL_RE)) == null ? void 0 : _a.length) != null ? _b : 0) / dense.length;
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
  var DIGIT = /[0-9]/u;
  function digitRunFor(text, finding2) {
    var _a;
    let at = -1;
    for (let i = finding2.start; i < finding2.end; i += 1) {
      if (DIGIT.test((_a = text[i]) != null ? _a : "")) {
        at = i;
        break;
      }
    }
    if (at < 0) return null;
    let start = at;
    let end = at + 1;
    while (start > 0 && DIGIT.test(text[start - 1])) start -= 1;
    while (end < text.length && DIGIT.test(text[end])) end += 1;
    return { start, end, text: text.slice(start, end) };
  }
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
    let run2 = 0;
    for (const char of sentence) {
      if (PAUSE.test(char)) {
        run2 = 0;
        continue;
      }
      run2 += 1;
      if (run2 > longest) longest = run2;
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
        const run2 = longestRun(body);
        const reason = length > limit * HARD_MULTIPLIER ? `\u76EE\u5B89 ${limit} \u5B57\u306E ${HARD_MULTIPLIER} \u500D\u3092\u8D85\u3048\u3066\u3044\u307E\u3059` : run2 > BREATH_LIMIT ? `\u8AAD\u70B9\u3084\u62EC\u5F27\u306E\u306A\u3044 ${run2} \u5B57\u306E\u7D9A\u304D\u304C\u3042\u308A\u307E\u3059` : null;
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
      for (const [word, where2] of first) {
        if (defined.has(word)) continue;
        found.push(
          finding(undefinedAbbreviationRule, {
            severity: "confirm",
            paragraphIndex: where2.paragraphIndex,
            start: where2.start,
            matched: where2.text,
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
  var INTRODUCED = /(?:化合物|compounds?|compds?\.?)\s*$/iu;
  var LOOKBACK = 12;
  function letterSpan(from, to) {
    const start = from.charCodeAt(0);
    const end = to.charCodeAt(0);
    if (end <= start) return [];
    const letters = [];
    for (let code = start; code <= end; code += 1) letters.push(String.fromCharCode(code));
    return letters;
  }
  function compoundLabels(paragraphs) {
    const series = /* @__PURE__ */ new Map();
    const named = /* @__PURE__ */ new Set();
    const record = (stem, letter) => {
      if (!series.has(stem)) series.set(stem, /* @__PURE__ */ new Set());
      series.get(stem).add(letter);
    };
    for (const text of paragraphs) {
      LABEL.lastIndex = 0;
      let m;
      while ((m = LABEL.exec(text)) !== null) {
        const [token, stem, letter] = m;
        record(stem, letter);
        const before = text.slice(Math.max(0, m.index - LOOKBACK), m.index);
        if (INTRODUCED.test(before)) named.add(token);
      }
      LABEL_RANGE.lastIndex = 0;
      while ((m = LABEL_RANGE.exec(text)) !== null) {
        const [, stem, first, secondStem, last] = m;
        if (secondStem !== void 0 && secondStem !== stem) continue;
        for (const letter of letterSpan(first, last)) record(stem, letter);
      }
    }
    const labels = new Set(named);
    for (const [stem, letters] of series) {
      if (letters.size < 2) continue;
      for (const letter of letters) labels.add(`${stem}${letter}`);
    }
    return labels;
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
        for (const [number, where2] of perLabel) {
          if ((_b = captionNumbers.get(label)) == null ? void 0 : _b.has(number)) continue;
          const key = `${where2.paragraphIndex}:${where2.start}:${label}`;
          const entry = (_c = missing.get(key)) != null ? _c : { where: where2, label, numbers: [] };
          entry.numbers.push(number);
          missing.set(key, entry);
        }
      }
      for (const { where: where2, label, numbers } of missing.values()) {
        const list = numbers.sort((a, b) => a - b).map((n) => `${label} ${n}`).join("\u3001");
        found.push(
          finding(figureCrossReferenceRule, {
            severity: "note",
            paragraphIndex: where2.paragraphIndex,
            start: where2.start,
            matched: where2.text,
            message: `${where2.text} \u3092\u5F15\u7528\u3057\u3066\u3044\u307E\u3059\u304C\u3001${list} \u306E\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002`
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
      for (const [number, where2] of first) {
        if (number > highest) {
          highest = number;
          continue;
        }
        found.push(
          finding(compoundOrderRule, {
            severity: "confirm",
            paragraphIndex: where2.paragraphIndex,
            start: where2.start,
            matched: where2.text,
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
  function bySeries(a, b) {
    const parse = (label) => {
      const m = /^(\d+)([a-z]*)$/u.exec(label);
      return m ? [Number(m[1]), m[2]] : [Number.MAX_SAFE_INTEGER, label];
    };
    const [an, al] = parse(a.label);
    const [bn, bl] = parse(b.label);
    return an - bn || al.localeCompare(bl);
  }
  function collect(entries) {
    const byLabel = /* @__PURE__ */ new Map();
    for (const { label, at } of entries) {
      if (!byLabel.has(label)) byLabel.set(label, []);
      byLabel.get(label).push(at);
    }
    return [...byLabel.entries()].map(([label, occurrences2]) => ({ label, occurrences: occurrences2 })).sort(bySeries);
  }
  var COMPOUND_WORD2 = /(?:compounds?|化合物)\s*(\d{1,4})([a-z])?/giu;
  var COMPOUND_LABEL2 = new RegExp(`(?<![A-Za-z0-9.])(\\d{1,4})([a-z])${LABEL_END}`, "gu");
  var COMPOUND_RANGE = new RegExp(
    `(?<![A-Za-z0-9.])(\\d{1,4})([a-z])\\s*[\u2013\u2014\u2212-]\\s*(\\d{1,4})?([a-z])${LABEL_END}`,
    "gu"
  );
  function letterSpan2(from, to) {
    const start = from.charCodeAt(0);
    const end = to.charCodeAt(0);
    if (end <= start) return [];
    const letters = [];
    for (let code = start; code <= end; code += 1) letters.push(String.fromCharCode(code));
    return letters;
  }
  var YEAR = /^(?:19|20)\d{2}$/u;
  var UNIT_AHEAD = new RegExp(
    `^\\s*(?:${[...UNITS, "%"].sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})(?![A-Za-z0-9])`,
    "u"
  );
  var BOLD_TOKEN = new RegExp(`(?<![A-Za-z0-9.])(\\d{1,4})([a-z])?${LABEL_END}`, "gu");
  function boldCandidates(text) {
    const brackets = [...matchAll(/\[[^\]]*\]/gu, text)].map((m) => ({
      start: m.index,
      end: m.index + m[0].length
    }));
    const candidates = [];
    for (const m of matchAll(BOLD_TOKEN, text)) {
      const token = m[0];
      if (YEAR.test(m[1]) && m[2] === void 0) continue;
      if (brackets.some((b) => m.index >= b.start && m.index < b.end)) continue;
      if (UNIT_AHEAD.test(text.slice(m.index + token.length))) continue;
      if (isFigureNumber(text, m.index)) continue;
      candidates.push({ start: m.index, token });
    }
    return candidates;
  }
  function compoundMentions(paragraphs, labels, skipParagraphs = /* @__PURE__ */ new Set()) {
    const mentions = [];
    paragraphs.forEach((text, paragraphIndex) => {
      if (skipParagraphs.has(paragraphIndex)) return;
      const ranges = [];
      const claimed = /* @__PURE__ */ new Set();
      for (const m of matchAll(COMPOUND_RANGE, text)) {
        const [whole, stem, first, secondStem, last] = m;
        if (secondStem !== void 0 && secondStem !== stem) continue;
        if (isFigureNumber(text, m.index)) continue;
        const letters = letterSpan2(first, last);
        if (letters.length === 0) continue;
        ranges.push({ start: m.index, end: m.index + whole.length });
        const at = { paragraphIndex, start: m.index, text: whole };
        for (const letter of letters) mentions.push({ label: `${stem}${letter}`, at, evidence: "label" });
      }
      const insideRange = (at) => ranges.some((r) => at >= r.start && at < r.end);
      for (const m of matchAll(COMPOUND_LABEL2, text)) {
        if (!labels.has(m[0])) continue;
        if (insideRange(m.index)) continue;
        if (isFigureNumber(text, m.index)) continue;
        claimed.add(m.index);
        mentions.push({
          label: m[0],
          at: { paragraphIndex, start: m.index, text: m[0] },
          evidence: "label"
        });
      }
      for (const m of matchAll(COMPOUND_WORD2, text)) {
        if (m[2] !== void 0) continue;
        const digitsAt = m.index + m[0].lastIndexOf(m[1]);
        claimed.add(digitsAt);
        mentions.push({
          label: m[1],
          at: { paragraphIndex, start: digitsAt, text: m[1] },
          evidence: "word"
        });
      }
      for (const candidate of boldCandidates(text)) {
        if (claimed.has(candidate.start) || insideRange(candidate.start)) continue;
        mentions.push({
          label: candidate.token,
          at: { paragraphIndex, start: candidate.start, text: candidate.token },
          evidence: "bold"
        });
      }
    });
    return mentions;
  }
  function buildInventory(mentions) {
    return collect(mentions.map(({ label, at }) => ({ label, at })));
  }
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
  var YEAR_VOLUME = /(?:19|20)\d{2}\s*,\s*\d+/u;
  var FIRST_AUTHOR = /^([A-Z][A-Za-z'’-]+(?:,\s*[A-Z]\.(?:\s*[A-Z]\.)*)?|(?:[A-Z]\.\s*)+[A-Z][A-Za-z'’-]+)/u;
  var ET_AL = /\bet\s+al\.?\s*/iu;
  var LEADING_INITIAL = /^[A-Z]\.\s+(?=[A-Z])/u;
  function describeEntry(entry) {
    var _a, _b, _c;
    const yearVolume = YEAR_VOLUME.exec(entry.text);
    if (!yearVolume) return entry.text;
    const author = (_b = (_a = FIRST_AUTHOR.exec(entry.text)) == null ? void 0 : _a[1]) != null ? _b : "";
    const surnameFirst = author.includes(",");
    const head = entry.text.slice(0, yearVolume.index);
    const etAl = ET_AL.exec(head);
    let journal = etAl ? head.slice(etAl.index + etAl[0].length) : head.slice(lastAuthorEnd(head));
    journal = journal.replace(/^[\s,;]+/u, "").replace(/[\s,;]+$/u, "");
    if (!etAl && surnameFirst) journal = journal.replace(LEADING_INITIAL, "");
    if (journal.length === 0) return entry.text;
    const surname = surnameFirst ? author.slice(0, author.indexOf(",")) : (_c = author.split(/\s+/u).pop()) != null ? _c : "";
    return `${surname ? `${surname} \u3089\u3001` : ""}${journal} ${yearVolume[0].replace(/\s*,\s*/u, ", ")}`;
  }
  function lastAuthorEnd(head) {
    const at = Math.max(head.lastIndexOf(","), head.lastIndexOf(";"));
    return at < 0 ? 0 : at + 1;
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
  function buildContext(paragraphs, settings2, disabledEntries = /* @__PURE__ */ new Set()) {
    const joined = paragraphs.join("\n");
    const isJapanese = settings2.documentLanguage === "auto" ? cjkRatio(joined) > 0.1 : settings2.documentLanguage === "ja";
    return { settings: settings2, isJapanese, disabledEntries, compoundLabels: compoundLabels(paragraphs) };
  }
  function review(paragraphs, options2 = {}) {
    var _a, _b, _c, _d;
    const settings2 = { ...DEFAULT_SETTINGS, ...options2.settings };
    const ctx = buildContext(paragraphs, settings2, new Set((_a = options2.disabledEntries) != null ? _a : []));
    const ruleFilter = new Set((_b = options2.enabledRules) != null ? _b : []);
    const categoryFilter = new Set((_c = options2.enabledCategories) != null ? _c : []);
    const disabled = new Set((_d = options2.disabledRules) != null ? _d : []);
    const rules = ALL_RULES.filter(
      (rule) => !disabled.has(rule.id) && (ruleFilter.size === 0 || ruleFilter.has(rule.id)) && (categoryFilter.size === 0 || categoryFilter.has(rule.category))
    );
    const found = [];
    for (const rule of rules) {
      if (rule.kind === "document") {
        found.push(...rule.run(paragraphs, ctx));
      } else {
        paragraphs.forEach((text, index) => found.push(...rule.run(text, index, ctx)));
      }
    }
    return found.sort(
      (a, b) => a.paragraphIndex - b.paragraphIndex || a.start - b.start || a.ruleId.localeCompare(b.ruleId)
    );
  }
  function groupByCategory(findings) {
    const groups = /* @__PURE__ */ new Map();
    for (const item of findings) {
      if (!groups.has(item.category)) groups.set(item.category, []);
      groups.get(item.category).push(item);
    }
    return groups;
  }
  function groupByRule(findings) {
    const groups = /* @__PURE__ */ new Map();
    for (const item of findings) {
      if (!groups.has(item.ruleId)) groups.set(item.ruleId, []);
      groups.get(item.ruleId).push(item);
    }
    return groups;
  }

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
  function paletteColor(value) {
    if (typeof value !== "string") return null;
    const hex = value.toUpperCase();
    return HIGHLIGHT_PALETTE.some((color) => color.value === hex) ? hex : null;
  }

  // src/core/figureInventory.ts
  function kindFor(label) {
    if (/^(?:Figure|Figures|Fig\.|Figs\.)$/u.test(label)) return "Figure";
    if (/^(?:Table|Tables)$/u.test(label)) return "Table";
    if (label === "\u56F3" || label === "\u8868") return label;
    return null;
  }
  function itemLabel(kind, number) {
    return kind === "\u56F3" || kind === "\u8868" ? `${kind}${number}` : `${kind} ${number}`;
  }
  function figureTableInventory(paragraphs) {
    const items = /* @__PURE__ */ new Map();
    const ensure = (kind, number) => {
      const label = itemLabel(kind, number);
      const existing = items.get(label);
      if (existing) return existing;
      const created = { kind, number, captions: [], references: [] };
      items.set(label, created);
      return created;
    };
    paragraphs.forEach((text, paragraphIndex) => {
      const caption = parseCaption(text);
      const captionKind = caption ? kindFor(caption.label) : null;
      if (caption && captionKind) {
        ensure(captionKind, caption.number).captions.push({
          paragraphIndex,
          start: caption.headStart,
          text: caption.head
        });
      }
      for (const reference of intextRefs(text)) {
        const kind = kindFor(reference.label);
        if (!kind || caption && reference.start < caption.headEnd) continue;
        for (const number of reference.numbers) {
          ensure(kind, number).references.push({ paragraphIndex, start: reference.start, text: reference.text });
        }
      }
    });
    return [...items.entries()].map(([label, item]) => ({ label, ...item })).sort((a, b) => a.kind.localeCompare(b.kind) || a.number - b.number);
  }

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
  function japaneseFontStyle(name) {
    const family = normalize(name);
    if (!isJapaneseFontName(family)) return "unknown";
    if (/(mincho|明朝|serif|minion|kozuka mincho|小塚明朝)/u.test(family)) return "mincho";
    if (/(gothic|ゴシック|sans|meiryo|メイリオ|hiragino sans|kaku)/u.test(family)) return "gothic";
    return "unknown";
  }
  function preferredLatinFont(japaneseFont) {
    return japaneseFontStyle(japaneseFont) === "gothic" ? "Arial" : "Times New Roman";
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
  var WORD_DELIMITERS = [" "];
  var LATIN_RUN2 = "[A-Za-z0-9]{1,}";
  var CJK_RUN = "[\u3041-\u3093\u30A1-\u30F6\u4E00-\u9FA5]{1,}";
  var WILDCARD = { matchWildcards: true };
  async function fontUnits(context, paragraphs) {
    var _a, _b, _c;
    for (const paragraph of paragraphs) {
      paragraph.load("text");
      paragraph.font.load("name");
    }
    await context.sync();
    const units = [];
    const splits = [];
    for (const paragraph of paragraphs) {
      const text = (_a = paragraph.text) != null ? _a : "";
      if (text.trim().length === 0) continue;
      if (paragraph.font.name) {
        units.push({ font: paragraph.font, text });
        continue;
      }
      if (typeof paragraph.getTextRanges !== "function") continue;
      const ranges = paragraph.getTextRanges(WORD_DELIMITERS, false);
      ranges.load("items/text");
      splits.push({ text, ranges });
    }
    if (splits.length === 0) return units;
    await context.sync();
    const pieces = [];
    for (const split of splits) {
      for (const range of split.ranges.items) {
        range.font.load("name");
        pieces.push({ range, text: (_b = range.text) != null ? _b : split.text });
      }
    }
    await context.sync();
    const runs = [];
    for (const piece of pieces) {
      if (piece.range.font.name) {
        units.push({ font: piece.range.font, text: piece.text });
        continue;
      }
      if (typeof piece.range.search !== "function") continue;
      for (const pattern of [LATIN_RUN2, CJK_RUN]) {
        const results = piece.range.search(pattern, WILDCARD);
        results.load("items/text");
        runs.push(results);
      }
    }
    if (runs.length === 0) return units;
    await context.sync();
    for (const results of runs) {
      for (const range of results.items) {
        range.font.load("name");
        units.push({ font: range.font, text: (_c = range.text) != null ? _c : "" });
      }
    }
    await context.sync();
    return units;
  }
  async function styleUnits(context, paragraphs) {
    var _a;
    const collections = [];
    for (const paragraph of paragraphs) {
      const ranges = paragraph.search("?", WILDCARD);
      ranges.load("items/text");
      collections.push(ranges);
    }
    await context.sync();
    const units = [];
    for (const ranges of collections) {
      for (const range of ranges.items) {
        range.font.load("bold, italic, superscript, subscript");
        units.push({ font: range.font, text: (_a = range.text) != null ? _a : "" });
      }
    }
    await context.sync();
    return units;
  }
  function hasStyle(font, style) {
    return font[style] === true;
  }
  async function scanFonts(context, paragraphs) {
    const units = await fontUnits(context, paragraphs);
    const counts = /* @__PURE__ */ new Map();
    for (const unit of units) {
      const name = unit.font.name;
      if (!name) continue;
      const characters = unit.text.replace(/\s/gu, "").length;
      const existing = counts.get(name);
      if (existing) {
        existing.ranges += 1;
        existing.characters += characters;
        continue;
      }
      counts.set(name, { ranges: 1, characters, sample: unit.text.trim().slice(0, 24) });
    }
    return [...counts.entries()].map(([name, info]) => ({ name, ...info, japanese: isJapaneseFontName(name) })).sort((a, b) => b.ranges - a.ranges || a.name.localeCompare(b.name));
  }
  async function scanCharacterStyles(context, paragraphs) {
    const units = await styleUnits(context, paragraphs);
    return CHARACTER_STYLES.map(({ style, label }) => ({
      style,
      label,
      characters: units.filter((unit) => hasStyle(unit.font, style)).length
    })).filter((usage) => usage.characters > 0);
  }
  async function replaceCharacterStyle(context, paragraphs, from, to) {
    if (from === to) return 0;
    const units = await styleUnits(context, paragraphs);
    let changed = 0;
    for (const unit of units) {
      if (!hasStyle(unit.font, from)) continue;
      unit.font[from] = false;
      if (to !== "normal") unit.font[to] = true;
      changed += 1;
    }
    if (changed > 0) await context.sync();
    return changed;
  }
  async function highlightCharacterStyle(context, paragraphs, style, color) {
    const units = await styleUnits(context, paragraphs);
    let highlighted = 0;
    for (const unit of units) {
      if (!hasStyle(unit.font, style)) continue;
      unit.font.highlightColor = color;
      highlighted += 1;
    }
    if (highlighted > 0) await context.sync();
    return highlighted;
  }
  async function replaceFont(context, paragraphs, from, to) {
    if (from === to || from.length === 0 || to.length === 0) return 0;
    const units = await fontUnits(context, paragraphs);
    let changed = 0;
    for (const unit of units) {
      if (unit.font.name !== from) continue;
      unit.font.name = to;
      changed += 1;
    }
    if (changed > 0) await context.sync();
    return changed;
  }
  async function highlightFont(context, paragraphs, name, color) {
    if (name.length === 0) return 0;
    const units = await fontUnits(context, paragraphs);
    let highlighted = 0;
    for (const unit of units) {
      if (unit.font.name !== name) continue;
      unit.font.highlightColor = color;
      highlighted += 1;
    }
    if (highlighted > 0) await context.sync();
    return highlighted;
  }
  async function clearFontHighlights(context, paragraphs, highlights) {
    var _a;
    if (highlights.size === 0) return 0;
    const units = await fontUnits(context, paragraphs);
    const targets = units.filter((unit) => {
      var _a2;
      return highlights.has((_a2 = unit.font.name) != null ? _a2 : "");
    });
    for (const unit of targets) unit.font.load("highlightColor");
    if (targets.length > 0) await context.sync();
    const normal = (value) => typeof value === "string" ? value.replace(/^#/u, "").toUpperCase() : "";
    const aliases = {
      "FFFF00": ["YELLOW"],
      "B6FF00": ["BRIGHTGREEN"],
      "00FF00": ["GREEN"],
      "80FFFF": ["CYAN", "TURQUOISE"],
      "80DEEA": ["CYAN", "TURQUOISE"],
      "00FFFF": ["CYAN", "TURQUOISE"],
      "8080FF": ["BLUE"],
      "FF80FF": ["PINK"],
      "FF00FF": ["MAGENTA"],
      "FFA0A0": ["RED"],
      "C0C0C0": ["GRAY"]
    };
    let cleared = 0;
    for (const unit of targets) {
      const colors = highlights.get((_a = unit.font.name) != null ? _a : "");
      const accepted = new Set([...colors].flatMap((color) => {
        var _a2;
        return [normal(color), ...(_a2 = aliases[normal(color)]) != null ? _a2 : []];
      }));
      if (!accepted.has(normal(unit.font.highlightColor))) continue;
      unit.font.highlightColor = null;
      cleared += 1;
    }
    if (cleared > 0) await context.sync();
    return cleared;
  }
  async function clearCharacterStyleHighlights(context, paragraphs, highlights) {
    if (highlights.size === 0) return 0;
    const units = (await styleUnits(context, paragraphs)).filter(
      (unit) => [...highlights.keys()].some((style) => hasStyle(unit.font, style))
    );
    for (const unit of units) unit.font.load("highlightColor");
    if (units.length > 0) await context.sync();
    const normal = (value) => typeof value === "string" ? value.replace(/^#/u, "").toUpperCase() : "";
    const aliases = {
      "FFFF00": ["YELLOW"],
      "B6FF00": ["BRIGHTGREEN"],
      "00FF00": ["GREEN"],
      "80FFFF": ["CYAN", "TURQUOISE"],
      "80DEEA": ["CYAN", "TURQUOISE"],
      "00FFFF": ["CYAN", "TURQUOISE"],
      "8080FF": ["BLUE"],
      "FF80FF": ["PINK"],
      "FF00FF": ["MAGENTA"],
      "FFA0A0": ["RED"],
      "C0C0C0": ["GRAY"]
    };
    let cleared = 0;
    for (const unit of units) {
      const colors = [...highlights.entries()].filter(([style]) => hasStyle(unit.font, style)).flatMap(([, values]) => [...values]);
      const accepted = new Set(colors.flatMap((color) => {
        var _a;
        return [normal(color), ...(_a = aliases[normal(color)]) != null ? _a : []];
      }));
      if (!accepted.has(normal(unit.font.highlightColor))) continue;
      unit.font.highlightColor = null;
      cleared += 1;
    }
    if (cleared > 0) await context.sync();
    return cleared;
  }

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
  function supersededFormatChecks(disabled) {
    return CHECKS.filter((c) => c.supersededBy !== void 0 && !disabled.has(c.supersededBy)).map(
      (c) => c.id
    );
  }
  function activeChecks(disabled) {
    const superseded = new Set(supersededFormatChecks(disabled));
    return CHECKS.filter((c) => !disabled.has(c.id) && !superseded.has(c.id));
  }
  function applyFormatFix(ruleId, font, latinFont) {
    const check = CHECKS.find((c) => c.id === ruleId);
    if (!(check == null ? void 0 : check.fix)) return false;
    check.fix(font, latinFont);
    return true;
  }
  function isFormatCheckId(ruleId) {
    return CHECKS.some((c) => c.id === ruleId);
  }
  function isParagraphCheckId(ruleId) {
    return PARAGRAPH_CHECKS.some((c) => c.id === ruleId);
  }
  function applyParagraphFix(ruleId, paragraph) {
    const check = PARAGRAPH_CHECKS.find((c) => c.id === ruleId);
    if (!check) return false;
    check.fix(paragraph);
    return true;
  }
  async function runParagraphChecks(context, paragraphs, paragraphTexts, disabled = /* @__PURE__ */ new Set()) {
    const checks = PARAGRAPH_CHECKS.filter((c) => !disabled.has(c.id));
    if (checks.length === 0) return [];
    const pending = [];
    paragraphTexts.forEach((text, paragraphIndex) => {
      const paragraph = paragraphs[paragraphIndex];
      if (!paragraph) return;
      for (const check of checks) {
        const anchor = check.anchor(text);
        if (!anchor) continue;
        paragraph.load(check.load);
        pending.push({ check, paragraph, paragraphIndex, anchor });
      }
    });
    if (pending.length === 0) return [];
    await context.sync();
    const findings = [];
    for (const item of pending) {
      const message = item.check.verdict(item.paragraph);
      if (!message) continue;
      findings.push({
        ruleId: item.check.id,
        category: item.check.category,
        severity: item.check.severity,
        paragraphIndex: item.paragraphIndex,
        start: item.anchor.start,
        end: item.anchor.start + item.anchor.text.length,
        matched: item.anchor.text,
        message
      });
    }
    return findings;
  }
  async function runFormatChecks(context, paragraphs, paragraphTexts, disabled = /* @__PURE__ */ new Set(), labels = /* @__PURE__ */ new Set()) {
    var _a, _b;
    const pending = [];
    const checks = activeChecks(disabled);
    paragraphTexts.forEach((text, paragraphIndex) => {
      const paragraph = paragraphs[paragraphIndex];
      if (!paragraph) return;
      for (const check of checks) {
        for (const probe of check.probe(text, labels)) {
          const term = searchTermFor(probe.text);
          if (term.length === 0) continue;
          const ordinal = occurrenceIndex(text, probe.text, probe.start);
          if (ordinal < 0) continue;
          const results = paragraph.search(term, EXACT);
          results.load("items");
          pending.push({ check, probe, paragraphIndex, ordinal, results });
        }
      }
    });
    if (pending.length === 0) return [];
    await context.sync();
    const resolved = [];
    for (const item of pending) {
      const range = item.results.items[item.ordinal];
      if (!range) continue;
      range.font.load(item.check.load);
      resolved.push({ pending: item, range });
    }
    if (resolved.length === 0) return [];
    await context.sync();
    const findings = [];
    for (const { pending: item, range } of resolved) {
      const message = item.check.verdict(range.font, item.probe);
      if (!message) continue;
      const replacement = (_b = (_a = item.check).replacement) == null ? void 0 : _b.call(_a, item.probe);
      findings.push({
        ruleId: item.check.id,
        category: item.check.category,
        severity: item.check.severity,
        paragraphIndex: item.paragraphIndex,
        start: item.probe.start,
        end: item.probe.end,
        matched: item.probe.text,
        ...replacement === void 0 ? {} : { replacement },
        message
      });
    }
    return findings;
  }
  async function dropSuperscriptCitations(context, paragraphs, paragraphTexts, findings) {
    const pending = [];
    for (const item of findings) {
      if (item.ruleId !== SPACING_RULE_ID) continue;
      const text = paragraphTexts[item.paragraphIndex];
      const paragraph = paragraphs[item.paragraphIndex];
      if (text === void 0 || !paragraph) continue;
      const digits = digitRunFor(text, item);
      if (!digits) continue;
      const term = searchTermFor(digits.text);
      if (term.length === 0) continue;
      const ordinal = occurrenceIndex(text, digits.text, digits.start);
      if (ordinal < 0) continue;
      const results = paragraph.search(term, EXACT);
      results.load("items");
      pending.push({ finding: item, ordinal, results });
    }
    if (pending.length === 0) return [...findings];
    await context.sync();
    const resolved = [];
    for (const item of pending) {
      const range = item.results.items[item.ordinal];
      if (!range) continue;
      range.font.load("superscript");
      resolved.push({ finding: item.finding, range });
    }
    if (resolved.length === 0) return [...findings];
    await context.sync();
    const citations = /* @__PURE__ */ new Set();
    for (const { finding: item, range } of resolved) {
      if (range.font.superscript) citations.add(item);
    }
    return findings.filter((item) => !citations.has(item));
  }
  function loneLetterOf(item) {
    const match = /[A-Za-z]/u.exec(item.matched);
    return match === null ? null : { text: match[0], start: item.start + match.index };
  }
  async function dropNonSymbolLetters(context, paragraphs, paragraphTexts, findings) {
    const pending = [];
    for (const item of findings) {
      if (item.ruleId !== greekSpacingRule.id) continue;
      const letter = loneLetterOf(item);
      if (!letter) continue;
      const text = paragraphTexts[item.paragraphIndex];
      const paragraph = paragraphs[item.paragraphIndex];
      if (text === void 0 || !paragraph) continue;
      const term = searchTermFor(letter.text);
      if (term.length === 0) continue;
      const ordinal = occurrenceIndex(text, letter.text, letter.start);
      if (ordinal < 0) continue;
      const results = paragraph.search(term, EXACT);
      results.load("items");
      pending.push({ finding: item, ordinal, results });
    }
    if (pending.length === 0) return [...findings];
    await context.sync();
    const resolved = [];
    for (const item of pending) {
      const range = item.results.items[item.ordinal];
      if (!range) continue;
      range.font.load("name");
      resolved.push({ finding: item.finding, range });
    }
    if (resolved.length === 0) return [...findings];
    await context.sync();
    const latin = /* @__PURE__ */ new Set();
    for (const { finding: item, range } of resolved) {
      if (range.font.name !== SYMBOL_FONT) latin.add(item);
    }
    return findings.filter((item) => !latin.has(item));
  }

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
  function catalogItem(ruleId) {
    return RULE_CATALOG.find((item) => item.id === ruleId);
  }
  function titleFor(ruleId) {
    var _a, _b;
    return (_b = (_a = catalogItem(ruleId)) == null ? void 0 : _a.title) != null ? _b : ruleId;
  }

  // src/office/actions.ts
  var SPACING_HIGHLIGHT = "#80DEEA";
  function highlightFor(category, opts) {
    var _a, _b;
    return (_b = (_a = opts.markerColors) == null ? void 0 : _a[category]) != null ? _b : CATEGORIES[category].highlight;
  }
  function scopeOf(context, selectionOnly) {
    return selectionOnly ? context.document.getSelection() : context.document.body;
  }
  async function highlightAllSpaces(opts) {
    return Word.run(async (context) => {
      var _a, _b;
      const scope = scopeOf(context, opts.selectionOnly);
      let highlighted = 0;
      for (const [space, color] of [
        [" ", (_a = opts.halfSpaceColor) != null ? _a : SPACING_HIGHLIGHT],
        ["\u3000", (_b = opts.fullSpaceColor) != null ? _b : SPACING_HIGHLIGHT]
      ]) {
        const results = scope.search(space, { matchCase: true, matchWildcards: false });
        results.load("items");
        await context.sync();
        for (const item of results.items) {
          item.font.highlightColor = color;
          highlighted += 1;
        }
      }
      await context.sync();
      return highlighted;
    });
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
  async function clearAllHighlights(opts) {
    return Word.run(async (context) => {
      const scope = scopeOf(context, opts.selectionOnly);
      if ("font" in scope) {
        scope.font.highlightColor = null;
      }
      await context.sync();
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
  var REVIEW_STEPS = 4;
  async function reviewDocument(opts, onProgress = () => {
  }) {
    return Word.run(async (context) => {
      var _a, _b;
      onProgress({ step: 1, of: REVIEW_STEPS, what: "\u672C\u6587\u3092\u8AAD\u307F\u8FBC\u3093\u3067\u3044\u307E\u3059" });
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      onProgress({ step: 2, of: REVIEW_STEPS, what: `${texts.length} \u6BB5\u843D\u306E\u6587\u7AE0\u3092\u70B9\u691C\u3057\u3066\u3044\u307E\u3059` });
      const disabled = new Set((_a = opts.disabledRules) != null ? _a : []);
      const rawTextFindings = review(texts, {
        ...(_b = opts.reviewOptions) != null ? _b : {},
        disabledRules: [...disabled]
      });
      onProgress({ step: 3, of: REVIEW_STEPS, what: "\u4E0A\u4ED8\u304D\u6587\u5B57\u3068\u30D5\u30A9\u30F3\u30C8\u3092\u78BA\u304B\u3081\u3066\u3044\u307E\u3059" });
      const withoutCitations = await dropSuperscriptCitations(context, paragraphs, texts, rawTextFindings);
      const textFindings = await dropNonSymbolLetters(context, paragraphs, texts, withoutCitations);
      onProgress({ step: 4, of: REVIEW_STEPS, what: "\u592A\u5B57\u30FB\u659C\u4F53\u30FB\u4E0A\u4ED8\u304D\u3092\u78BA\u304B\u3081\u3066\u3044\u307E\u3059" });
      const labels = compoundLabels(texts);
      const formatFindings = await runFormatChecks(context, paragraphs, texts, disabled, labels);
      const paragraphFindings = await runParagraphChecks(context, paragraphs, texts, disabled);
      const findings = [...textFindings, ...formatFindings, ...paragraphFindings].sort(
        (a, b) => a.paragraphIndex - b.paragraphIndex || a.start - b.start || a.ruleId.localeCompare(b.ruleId)
      );
      return { findings, paragraphCount: texts.length };
    });
  }
  async function highlightFindings(findings, opts) {
    if (findings.length === 0) return 0;
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const located = await locateFindings(context, paragraphs, texts, findings);
      for (const { finding: finding2, range } of located) {
        range.font.highlightColor = highlightFor(finding2.category, opts);
      }
      await context.sync();
      return located.length;
    });
  }
  async function commentFindings(findings, opts) {
    if (findings.length === 0) return 0;
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const located = await locateFindings(context, paragraphs, texts, findings);
      if (located.length === 0) return 0;
      if (typeof located[0].range.insertComment !== "function") {
        throw new Error("\u3053\u306E Word \u3067\u306F\u30B3\u30E1\u30F3\u30C8\u3092\u633F\u5165\u3067\u304D\u307E\u305B\u3093\uFF08Word 2021 / Microsoft 365 \u304C\u5FC5\u8981\u3067\u3059\uFF09\u3002");
      }
      for (const { finding: finding2, range } of located) range.insertComment(commentText(finding2));
      await context.sync();
      return located.length;
    });
  }
  var TOOL_COMMENT_MARKER = "\u2063\u2063\u2063\u2063\u2063\u2063\u2063\u2063";
  function commentText(finding2) {
    return `${TOOL_COMMENT_MARKER}\u3010${titleFor(finding2.ruleId)}\u3011${finding2.message}`;
  }
  function isToolComment(text) {
    return typeof text === "string" && text.startsWith(TOOL_COMMENT_MARKER);
  }
  async function clearComments(opts) {
    return Word.run(async (context) => {
      const scope = scopeOf(context, opts.selectionOnly);
      if (typeof scope.getComments !== "function") {
        throw new Error("\u3053\u306E Word \u3067\u306F\u30B3\u30E1\u30F3\u30C8\u3092\u64CD\u4F5C\u3067\u304D\u307E\u305B\u3093\uFF08Word 2021 / Microsoft 365 \u304C\u5FC5\u8981\u3067\u3059\uFF09\u3002");
      }
      const comments = scope.getComments();
      comments.load("items/content");
      await context.sync();
      const mine = comments.items.filter((comment) => isToolComment(comment.content));
      for (const comment of mine) comment.delete();
      await context.sync();
      return mine.length;
    });
  }
  async function clearAllComments(opts) {
    return Word.run(async (context) => {
      const scope = scopeOf(context, opts.selectionOnly);
      if (typeof scope.getComments !== "function") {
        throw new Error("\u3053\u306E Word \u3067\u306F\u30B3\u30E1\u30F3\u30C8\u3092\u64CD\u4F5C\u3067\u304D\u307E\u305B\u3093\uFF08Word 2021 / Microsoft 365 \u304C\u5FC5\u8981\u3067\u3059\uFF09\u3002");
      }
      const comments = scope.getComments();
      comments.load("items");
      await context.sync();
      const all = [...comments.items];
      for (const comment of all) comment.delete();
      await context.sync();
      return all.length;
    });
  }
  async function revealSpan(span, opts) {
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const located = await locateFindings(context, paragraphs, texts, [span]);
      const target = located[0];
      if (!target) return false;
      target.range.select();
      await context.sync();
      return true;
    });
  }
  async function revealBibliographyEntry(marker, text) {
    return Word.run(async (context) => {
      var _a;
      const body = context.document.body;
      const prefix = `${marker} ${text}`.trim();
      const exact = body.search(searchTermFor(prefix), {
        matchCase: true,
        matchWholeWord: false,
        matchWildcards: false,
        ignorePunct: false,
        ignoreSpace: false
      });
      const fallback = body.search(searchTermFor(marker), {
        matchCase: true,
        matchWholeWord: false,
        matchWildcards: false,
        ignorePunct: false,
        ignoreSpace: false
      });
      exact.load("items");
      fallback.load("items");
      await context.sync();
      const target = (_a = exact.items.at(-1)) != null ? _a : fallback.items.at(-1);
      if (!target) return false;
      target.select();
      await context.sync();
      return true;
    });
  }
  async function revealFinding(finding2, opts) {
    return revealSpan(finding2, opts);
  }
  async function confirmMentions(context, paragraphs, texts, mentions) {
    const asks = (mention) => mention.evidence === "bold" || mention.evidence === "word";
    const settled = mentions.filter((mention) => !asks(mention));
    const pending = mentions.filter(asks);
    if (pending.length === 0) return settled;
    const located = await locateFindings(
      context,
      paragraphs,
      texts,
      pending.map((mention) => ({
        paragraphIndex: mention.at.paragraphIndex,
        start: mention.at.start,
        matched: mention.at.text,
        mention
      }))
    );
    for (const { range } of located) range.font.load("bold, superscript");
    await context.sync();
    const seen = /* @__PURE__ */ new Map();
    for (const { finding: finding2, range } of located) {
      seen.set(finding2.mention, {
        bold: range.font.bold === true,
        superscript: range.font.superscript === true
      });
    }
    const kept = pending.filter((mention) => {
      const font = seen.get(mention);
      if (!font) return mention.evidence !== "bold";
      if (font.superscript) return false;
      return mention.evidence !== "bold" || font.bold;
    });
    return [...settled, ...kept];
  }
  async function bibliographyFormattingFor(context, paragraphs, entries) {
    var _a, _b, _c, _d;
    const output = /* @__PURE__ */ new Map();
    if (entries.length === 0) return output;
    const paragraphNumbers = [...new Set(entries.map((entry) => entry.paragraphIndex))];
    const requested = [];
    for (const paragraphIndex of paragraphNumbers) {
      const paragraph = paragraphs[paragraphIndex];
      if (!paragraph) continue;
      const ranges = paragraph.search("?", { matchWildcards: true });
      ranges.load("items/text");
      requested.push({ paragraphIndex, ranges });
    }
    await context.sync();
    const characters = /* @__PURE__ */ new Map();
    for (const { paragraphIndex, ranges } of requested) {
      characters.set(paragraphIndex, ranges.items);
      for (const range of ranges.items) range.font.load("bold, italic");
    }
    await context.sync();
    for (const entry of entries) {
      const ranges = characters.get(entry.paragraphIndex);
      const paragraphText = (_b = (_a = paragraphs[entry.paragraphIndex]) == null ? void 0 : _a.text) != null ? _b : "";
      if (!ranges || ranges.length === 0) continue;
      let start = entry.start + entry.marker.length;
      while (/\s/u.test((_c = paragraphText[start]) != null ? _c : "")) start += 1;
      const end = start + entry.text.length;
      const runs = [];
      for (let i = start; i < end; i += 1) {
        const range = ranges[i];
        const text = (_d = paragraphText[i]) != null ? _d : "";
        if (!range || text.length === 0) continue;
        const bold = range.font.bold === true;
        const italic = range.font.italic === true;
        const previous = runs.at(-1);
        if (previous && previous.bold === bold && previous.italic === italic) {
          runs[runs.length - 1] = { ...previous, text: previous.text + text };
        } else {
          runs.push({ text, bold, italic });
        }
      }
      if (runs.map((run2) => run2.text).join("") === entry.text) output.set(entry, runs);
    }
    return output;
  }
  function editedNumber(value, edit) {
    if (edit.mode === "insert") return value >= edit.at ? value + 1 : value;
    return value === edit.from ? edit.to : value;
  }
  function editedNumberText(text, edit) {
    return text.replace(/\d+/gu, (digits) => String(editedNumber(Number(digits), edit)));
  }
  function editedCompoundNumberText(text, edit) {
    return edit.mode === "replace-label" ? text === edit.from ? edit.to : text : editedNumberText(text, edit);
  }
  function rewriteSpans(occurrences2, edit) {
    return rewriteSpansWith(occurrences2, (text) => editedNumberText(text, edit));
  }
  function rewriteSpansWith(occurrences2, replacementFor) {
    const spans = /* @__PURE__ */ new Map();
    for (const occurrence of occurrences2) {
      const replacement = replacementFor(occurrence.text);
      if (replacement === occurrence.text) continue;
      const key = `${occurrence.paragraphIndex}:${occurrence.start}:${occurrence.text}`;
      spans.set(key, {
        paragraphIndex: occurrence.paragraphIndex,
        start: occurrence.start,
        matched: occurrence.text,
        replacement
      });
    }
    return [...spans.values()];
  }
  function editedCitationText(text, edit) {
    if (edit.mode !== "replace") return editedNumberText(text, edit);
    const numbers = citedNumbers(text);
    if (!numbers.includes(edit.from)) return text;
    const open = text.trimStart().startsWith("[") ? "[" : "";
    const close = text.trimEnd().endsWith("]") ? "]" : "";
    return `${open}${numbers.map((value) => editedNumber(value, edit)).join(", ")}${close}`;
  }
  async function applyRewrites(context, paragraphs, texts, spans) {
    const located = await locateFindings(context, paragraphs, texts, spans);
    const ordered = [...located].sort(
      (a, b) => a.finding.paragraphIndex - b.finding.paragraphIndex || b.finding.start - a.finding.start
    );
    for (const { finding: finding2, range } of ordered) {
      range.insertText(finding2.replacement, Word.InsertLocation.replace);
    }
    if (ordered.length > 0) await context.sync();
    return ordered.length;
  }
  async function listLabels(opts) {
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const bibliography = parseBibliography(texts);
      const bibliographyFormatting = await bibliographyFormattingFor(context, paragraphs, bibliography);
      const inList = bibliographyParagraphs(bibliography);
      const mentions = compoundMentions(texts, compoundLabels(texts), inList);
      const compounds = buildInventory(await confirmMentions(context, paragraphs, texts, mentions));
      const cited = /* @__PURE__ */ new Map();
      for (const hit of bodyCitations(texts, inList)) {
        for (const number of citedNumbers(hit.text)) {
          if (!cited.has(number)) cited.set(number, []);
          cited.get(number).push(hit);
        }
      }
      const byNumber = new Map(bibliography.map((entry) => [entry.number, entry]));
      const numbers = [.../* @__PURE__ */ new Set([...cited.keys(), ...byNumber.keys()])].sort((a, b) => a - b);
      const references = numbers.map((number) => {
        var _a, _b;
        const entry = byNumber.get(number);
        return {
          number,
          citations: (_a = cited.get(number)) != null ? _a : [],
          ...entry === void 0 ? {} : {
            entry: {
              at: {
                paragraphIndex: entry.paragraphIndex,
                start: entry.start,
                text: entry.marker
              },
              summary: describeEntry(entry),
              full: entry.text,
              formatting: (_b = bibliographyFormatting.get(entry)) != null ? _b : [{ text: entry.text, bold: false, italic: false }]
            }
          }
        };
      });
      return {
        compounds,
        references,
        missingEntries: numbers.filter((n) => cited.has(n) && !byNumber.has(n)),
        uncited: numbers.filter((n) => byNumber.has(n) && !cited.has(n)),
        hasBibliography: bibliography.length > 0
      };
    });
  }
  async function listFigureTables(opts) {
    return Word.run(async (context) => {
      const { texts } = await loadParagraphs(context, opts.selectionOnly);
      return { items: figureTableInventory(texts) };
    });
  }
  async function editCompoundNumbers(edit, opts) {
    return Word.run(async (context) => {
      if (opts.trackChanges) context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const bibliography = parseBibliography(texts);
      const mentions = compoundMentions(
        texts,
        compoundLabels(texts),
        bibliographyParagraphs(bibliography)
      );
      const confirmed = await confirmMentions(context, paragraphs, texts, mentions);
      return applyRewrites(
        context,
        paragraphs,
        texts,
        edit.mode === "replace-label" ? rewriteSpansWith(
          confirmed.filter((mention) => mention.label === edit.from).map((mention) => mention.at),
          (text) => editedCompoundNumberText(text, edit)
        ) : rewriteSpans(confirmed.map((mention) => mention.at), edit)
      );
    });
  }
  async function confirmedCompoundMentions(context, opts) {
    const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
    const bibliography = parseBibliography(texts);
    const candidates = compoundMentions(texts, compoundLabels(texts), bibliographyParagraphs(bibliography));
    return { paragraphs, texts, mentions: await confirmMentions(context, paragraphs, texts, candidates) };
  }
  async function highlightCompoundLabelEverywhere(label, color, opts) {
    return Word.run(async (context) => {
      const { paragraphs, texts, mentions } = await confirmedCompoundMentions(context, opts);
      const located = await locateFindings(
        context,
        paragraphs,
        texts,
        mentions.filter((mention) => mention.label === label).map((mention) => ({
          paragraphIndex: mention.at.paragraphIndex,
          start: mention.at.start,
          matched: mention.at.text
        }))
      );
      for (const { range } of located) range.font.highlightColor = color;
      if (located.length > 0) await context.sync();
      return located.length;
    });
  }
  function isMatchingHighlightColor(actual, expected) {
    const normal = (value) => typeof value === "string" ? value.replace(/^#/u, "").toUpperCase() : "";
    const aliases = {
      "FFFF00": ["YELLOW"],
      "B6FF00": ["BRIGHTGREEN"],
      "00FF00": ["GREEN"],
      "80FFFF": ["CYAN", "TURQUOISE"],
      "80DEEA": ["CYAN", "TURQUOISE"],
      "00FFFF": ["CYAN", "TURQUOISE"],
      "8080FF": ["BLUE"],
      "FF80FF": ["PINK"],
      "FF00FF": ["MAGENTA"],
      "FFA0A0": ["RED"],
      "C0C0C0": ["GRAY"]
    };
    const accepted = new Set([...expected].flatMap((color) => {
      var _a;
      return [normal(color), ...(_a = aliases[normal(color)]) != null ? _a : []];
    }));
    return accepted.has(normal(actual));
  }
  async function clearCompoundLabelHighlightsEverywhere(highlights, opts) {
    if (highlights.size === 0) return 0;
    return Word.run(async (context) => {
      var _a;
      const { paragraphs, texts, mentions } = await confirmedCompoundMentions(context, opts);
      const targets = /* @__PURE__ */ new Map();
      for (const mention of mentions) {
        const colors = highlights.get(mention.label);
        if (!colors) continue;
        const key = `${mention.at.paragraphIndex}:${mention.at.start}:${mention.at.text}`;
        const target = (_a = targets.get(key)) != null ? _a : {
          paragraphIndex: mention.at.paragraphIndex,
          start: mention.at.start,
          matched: mention.at.text,
          colors: /* @__PURE__ */ new Set()
        };
        for (const color of colors) target.colors.add(color);
        targets.set(key, target);
      }
      const located = await locateFindings(context, paragraphs, texts, [...targets.values()]);
      for (const { range } of located) range.font.load("highlightColor");
      if (located.length > 0) await context.sync();
      let cleared = 0;
      for (const { finding: finding2, range } of located) {
        if (!isMatchingHighlightColor(range.font.highlightColor, finding2.colors)) continue;
        range.font.highlightColor = null;
        cleared += 1;
      }
      if (cleared > 0) await context.sync();
      return cleared;
    });
  }
  function referenceHighlightTargets(texts, bibliography, numberOnly) {
    var _a;
    const targets = [];
    for (const citation of bodyCitations(texts, bibliographyParagraphs(bibliography))) {
      if (!numberOnly) {
        for (const number of citedNumbers(citation.text)) {
          targets.push({ number, paragraphIndex: citation.paragraphIndex, start: citation.start, matched: citation.text });
        }
        continue;
      }
      const literal = /* @__PURE__ */ new Set();
      for (const match of citation.text.matchAll(/\d+/gu)) {
        const number = Number(match[0]);
        literal.add(number);
        targets.push({
          number,
          paragraphIndex: citation.paragraphIndex,
          start: citation.start + ((_a = match.index) != null ? _a : 0),
          matched: match[0]
        });
      }
      for (const number of citedNumbers(citation.text)) {
        if (!literal.has(number)) {
          targets.push({ number, paragraphIndex: citation.paragraphIndex, start: citation.start, matched: citation.text });
        }
      }
    }
    return targets;
  }
  async function highlightReferenceNumberEverywhere(number, color, numberOnly, opts) {
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const bibliography = parseBibliography(texts);
      const targets = referenceHighlightTargets(texts, bibliography, numberOnly).filter((target) => target.number === number);
      const located = await locateFindings(context, paragraphs, texts, targets);
      for (const { range } of located) range.font.highlightColor = color;
      if (located.length > 0) await context.sync();
      return located.length;
    });
  }
  async function clearReferenceNumberHighlightsEverywhere(highlights, numberOnly, opts) {
    if (highlights.size === 0) return 0;
    return Word.run(async (context) => {
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const bibliography = parseBibliography(texts);
      const targets = referenceHighlightTargets(texts, bibliography, numberOnly).filter((target) => highlights.has(target.number));
      const located = await locateFindings(context, paragraphs, texts, targets);
      for (const { range } of located) range.font.load("highlightColor");
      if (located.length > 0) await context.sync();
      let cleared = 0;
      for (const { finding: finding2, range } of located) {
        const colors = highlights.get(finding2.number);
        if (!colors || !isMatchingHighlightColor(range.font.highlightColor, colors)) continue;
        range.font.highlightColor = null;
        cleared += 1;
      }
      if (cleared > 0) await context.sync();
      return cleared;
    });
  }
  async function editReferenceNumbers(edit, opts) {
    return Word.run(async (context) => {
      if (opts.trackChanges) context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const bibliography = parseBibliography(texts);
      const citationSpans = rewriteSpansWith(
        bodyCitations(texts, bibliographyParagraphs(bibliography)),
        (text) => editedCitationText(text, edit)
      );
      const bibliographySpans = rewriteSpans(
        bibliography.map((entry) => ({
          paragraphIndex: entry.paragraphIndex,
          start: entry.start,
          text: entry.marker
        })),
        edit
      );
      return applyRewrites(
        context,
        paragraphs,
        texts,
        [...citationSpans, ...bibliographySpans]
      );
    });
  }
  async function paragraphPages(indices, opts) {
    const pages = /* @__PURE__ */ new Map();
    if (indices.length === 0) return pages;
    try {
      return await Word.run(async (context) => {
        const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
        const pending = [];
        for (const index of indices) {
          const paragraph = paragraphs[index];
          if (!paragraph) continue;
          const collection = paragraph.getRange().pages;
          collection.load("items/index");
          pending.push({ index, collection });
        }
        if (pending.length === 0) return pages;
        await context.sync();
        for (const { index, collection } of pending) {
          const page = collection.items[0];
          if (page) pages.set(index, page.index);
        }
        return pages;
      });
    } catch {
      return pages;
    }
  }
  async function documentPageCount(opts) {
    try {
      return await Word.run(async (context) => {
        const range = opts.selectionOnly ? context.document.getSelection() : context.document.body.getRange();
        const pages = range.pages;
        pages.load("items/index");
        await context.sync();
        return pages.items.length > 0 ? pages.items.length : null;
      });
    } catch {
      return null;
    }
  }
  async function listFonts(opts) {
    return Word.run(async (context) => {
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return scanFonts(context, paragraphs);
    });
  }
  async function replaceFontEverywhere(from, to, opts) {
    return Word.run(async (context) => {
      if (opts.trackChanges) {
        context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
      }
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return replaceFont(context, paragraphs, from, to);
    });
  }
  async function highlightFontEverywhere(name, color, opts) {
    return Word.run(async (context) => {
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return highlightFont(context, paragraphs, name, color);
    });
  }
  async function clearFontHighlightsEverywhere(highlights, opts) {
    return Word.run(async (context) => {
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return clearFontHighlights(context, paragraphs, highlights);
    });
  }
  async function listCharacterStyles(opts) {
    return Word.run(async (context) => {
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return scanCharacterStyles(context, paragraphs);
    });
  }
  async function replaceCharacterStyleEverywhere(from, to, opts) {
    return Word.run(async (context) => {
      if (opts.trackChanges) context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return replaceCharacterStyle(context, paragraphs, from, to);
    });
  }
  async function highlightCharacterStyleEverywhere(style, color, opts) {
    return Word.run(async (context) => {
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return highlightCharacterStyle(context, paragraphs, style, color);
    });
  }
  async function clearCharacterStyleHighlightsEverywhere(highlights, opts) {
    return Word.run(async (context) => {
      const { paragraphs } = await loadParagraphs(context, opts.selectionOnly);
      return clearCharacterStyleHighlights(context, paragraphs, highlights);
    });
  }
  async function applyFindings(findings, opts) {
    const paragraphFixes = findings.filter((f) => isParagraphCheckId(f.ruleId));
    const requested = findings.filter(
      (f) => !isParagraphCheckId(f.ruleId) && (f.replacement !== void 0 || isFormatCheckId(f.ruleId))
    );
    const actionable = orderForApply(requested);
    if (actionable.length === 0 && paragraphFixes.length === 0) {
      return { applied: 0, skipped: 0, appliedFindings: [] };
    }
    return Word.run(async (context) => {
      if (opts.trackChanges) {
        context.document.changeTrackingMode = Word.ChangeTrackingMode.trackAll;
      }
      const { paragraphs, texts } = await loadParagraphs(context, opts.selectionOnly);
      const located = await locateFindings(context, paragraphs, texts, actionable);
      let applied = 0;
      const appliedFindings = [];
      for (const item of paragraphFixes) {
        const paragraph = paragraphs[item.paragraphIndex];
        if (paragraph && applyParagraphFix(item.ruleId, paragraph)) {
          applied += 1;
          appliedFindings.push(item);
        }
      }
      for (const { finding: finding2, range } of located) {
        if (isFormatCheckId(finding2.ruleId)) {
          const latinFont = preferredLatinFont(opts.bodyFont) === "Arial" ? "Arial" : opts.bodyFont;
          const target = finding2.replacement === void 0 ? range : range.insertText(finding2.replacement, Word.InsertLocation.replace);
          if (applyFormatFix(finding2.ruleId, target.font, latinFont)) {
            applied += 1;
            appliedFindings.push(finding2);
          }
          continue;
        }
        if (finding2.replacement === void 0) continue;
        range.insertText(finding2.replacement, Word.InsertLocation.replace);
        applied += 1;
        appliedFindings.push(finding2);
      }
      await context.sync();
      return {
        applied,
        skipped: requested.length + paragraphFixes.length - applied,
        appliedFindings
      };
    });
  }
  function orderForApply(findings) {
    const formatOnly = findings.filter((f) => f.replacement === void 0);
    const rewrites = findings.filter((f) => f.replacement !== void 0);
    const byParagraph = /* @__PURE__ */ new Map();
    for (const item of rewrites) {
      if (!byParagraph.has(item.paragraphIndex)) byParagraph.set(item.paragraphIndex, []);
      byParagraph.get(item.paragraphIndex).push(item);
    }
    const ordered = [];
    for (const paragraphIndex of [...byParagraph.keys()].sort((a, b) => a - b)) {
      const items = byParagraph.get(paragraphIndex).sort((a, b) => b.start - a.start || a.end - b.end);
      let boundary = Number.POSITIVE_INFINITY;
      for (const item of items) {
        if (item.end > boundary) continue;
        ordered.push(item);
        boundary = item.start;
      }
    }
    return [...formatOnly, ...ordered];
  }

  // src/taskpane/prefs.ts
  var KEY = "document-corrector.prefs.v1";
  var DEFAULTS_VERSION = 2;
  var NEWLY_DEFAULT_ON = Object.freeze([
    "greek-cjk-space"
    // DEFAULTS_VERSION 2
  ]);
  var DEFAULT_SPACE_COLOR = "#80DEEA";
  var DEFAULT_PREFERENCES = Object.freeze({
    defaultsVersion: DEFAULTS_VERSION,
    disabledRules: DEFAULT_DISABLED_RULES,
    disabledEntries: DEFAULT_DISABLED_ENTRIES,
    maxSentenceLength: DEFAULT_SETTINGS.maxSentenceLength,
    bodyFont: "Times New Roman",
    selectionOnly: false,
    trackChanges: false,
    markerColors: Object.freeze({}),
    halfSpaceColor: DEFAULT_SPACE_COLOR,
    fullSpaceColor: DEFAULT_SPACE_COLOR
  });
  function markerColor(prefs2, category) {
    var _a;
    return (_a = prefs2.markerColors[category]) != null ? _a : CATEGORIES[category].highlight;
  }
  function normalize2(raw) {
    var _a, _b, _c, _d;
    const source = raw != null ? raw : {};
    const legacySpaceColor = source.spaceColor;
    const strings = (value, fallback) => Array.isArray(value) ? value.filter((v) => typeof v === "string") : fallback;
    const length = Number(source.maxSentenceLength);
    const font = typeof source.bodyFont === "string" ? source.bodyFont.trim() : "";
    const version = Number(source.defaultsVersion);
    return {
      defaultsVersion: Number.isFinite(version) ? version : 0,
      disabledRules: strings(source.disabledRules, DEFAULT_PREFERENCES.disabledRules),
      disabledEntries: strings(source.disabledEntries, DEFAULT_PREFERENCES.disabledEntries),
      maxSentenceLength: Number.isFinite(length) && length > 0 ? length : DEFAULT_PREFERENCES.maxSentenceLength,
      bodyFont: font.length > 0 ? font : DEFAULT_PREFERENCES.bodyFont,
      selectionOnly: source.selectionOnly === true,
      trackChanges: source.trackChanges === true,
      markerColors: markerColors(source.markerColors),
      // `spaceColor` is the setting saved by versions before half/full-width
      // spaces were independently configurable. It remains the migration fallback.
      halfSpaceColor: (_b = paletteColor((_a = source.halfSpaceColor) != null ? _a : legacySpaceColor)) != null ? _b : DEFAULT_SPACE_COLOR,
      fullSpaceColor: (_d = paletteColor((_c = source.fullSpaceColor) != null ? _c : legacySpaceColor)) != null ? _d : DEFAULT_SPACE_COLOR
    };
  }
  function markerColors(raw) {
    if (raw === null || typeof raw !== "object") return DEFAULT_PREFERENCES.markerColors;
    const result = {};
    for (const [key, value] of Object.entries(raw)) {
      if (!(key in CATEGORIES)) continue;
      const color = paletteColor(value);
      if (color !== null) result[key] = color;
    }
    return result;
  }
  function storage() {
    var _a;
    try {
      return (_a = globalThis.localStorage) != null ? _a : null;
    } catch {
      return null;
    }
  }
  function migrate(prefs2) {
    if (prefs2.defaultsVersion >= DEFAULTS_VERSION) return prefs2;
    const turnedOn = new Set(NEWLY_DEFAULT_ON);
    return {
      ...prefs2,
      defaultsVersion: DEFAULTS_VERSION,
      disabledRules: [.../* @__PURE__ */ new Set([...prefs2.disabledRules, ...DEFAULT_DISABLED_RULES])].filter(
        (id) => !turnedOn.has(id)
      ),
      disabledEntries: [.../* @__PURE__ */ new Set([...prefs2.disabledEntries, ...DEFAULT_DISABLED_ENTRIES])]
    };
  }
  function loadPreferences() {
    const store = storage();
    if (!store) return DEFAULT_PREFERENCES;
    try {
      const saved = store.getItem(KEY);
      if (saved === null) return DEFAULT_PREFERENCES;
      const migrated = migrate(normalize2(JSON.parse(saved)));
      savePreferences(migrated);
      return migrated;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  }
  function savePreferences(prefs2) {
    const store = storage();
    if (!store) return;
    try {
      store.setItem(KEY, JSON.stringify(prefs2));
    } catch {
    }
  }

  // src/taskpane/ignored.ts
  function ignoreKey(finding2) {
    return `${finding2.ruleId}${finding2.paragraphIndex}${finding2.matched}`;
  }
  var IgnoreList = class {
    // 引数プロパティ（constructor(private readonly …)）にはしない。node --test は
    // 型を剥がすだけで変換はしないので、走らせた瞬間に構文エラーになる。
    constructor(onChange = () => void 0) {
      /** key → the finding as it looked when it was ignored, for the list display. */
      this.items = /* @__PURE__ */ new Map();
      this.onChange = onChange;
    }
    add(finding2) {
      this.items.set(ignoreKey(finding2), finding2);
      this.onChange();
    }
    /** 「まとめて無視」 — one change, so the document is written once, not once per finding. */
    addAll(findings) {
      for (const finding2 of findings) this.items.set(ignoreKey(finding2), finding2);
      this.onChange();
    }
    remove(key) {
      this.items.delete(key);
      this.onChange();
    }
    has(finding2) {
      return this.items.has(ignoreKey(finding2));
    }
    clear() {
      this.items.clear();
      this.onChange();
    }
    /** Replaces the whole list with what was stored in the document. */
    restore(findings) {
      this.items.clear();
      for (const finding2 of findings) this.items.set(ignoreKey(finding2), finding2);
    }
    get size() {
      return this.items.size;
    }
    /** Ignored findings in document order, each with the key needed to restore it. */
    entries() {
      return [...this.items.entries()].map(([key, finding2]) => ({ key, finding: finding2 })).sort((a, b) => a.finding.paragraphIndex - b.finding.paragraphIndex || a.finding.start - b.finding.start);
    }
    /** The findings themselves, in document order — what gets stored. */
    findings() {
      return this.entries().map(({ finding: finding2 }) => finding2);
    }
    /** Drops the findings the user has chosen not to see. */
    filter(findings) {
      return findings.filter((f) => !this.has(f));
    }
  };
  var MAX_IGNORED = 2e3;
  var SEVERITIES = ["fix", "confirm", "note"];
  function parseFinding(raw) {
    if (raw === null || typeof raw !== "object") return null;
    const source = raw;
    const text = (value) => typeof value === "string" ? value : null;
    const whole = (value) => typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
    const ruleId = text(source.ruleId);
    const matched = text(source.matched);
    const message = text(source.message);
    const paragraphIndex = whole(source.paragraphIndex);
    const start = whole(source.start);
    const end = whole(source.end);
    if (ruleId === null || matched === null || message === null) return null;
    if (paragraphIndex === null || start === null || end === null) return null;
    const category = text(source.category);
    const severity = text(source.severity);
    if (category === null || !(category in CATEGORIES)) return null;
    if (severity === null || !SEVERITIES.includes(severity)) return null;
    const replacement = text(source.replacement);
    return {
      ruleId,
      category,
      severity,
      paragraphIndex,
      start,
      end,
      matched,
      message,
      ...replacement === null ? {} : { replacement }
    };
  }
  function parseIgnored(raw) {
    if (!Array.isArray(raw)) return [];
    const findings = [];
    for (const entry of raw) {
      const finding2 = parseFinding(entry);
      if (finding2 !== null) findings.push(finding2);
      if (findings.length >= MAX_IGNORED) break;
    }
    return findings;
  }

  // src/taskpane/docStore.ts
  function settings() {
    var _a, _b, _c;
    try {
      return (_c = (_b = (_a = Office.context) == null ? void 0 : _a.document) == null ? void 0 : _b.settings) != null ? _c : null;
    } catch {
      return null;
    }
  }
  function readDocumentValue(key) {
    var _a, _b;
    try {
      return (_b = (_a = settings()) == null ? void 0 : _a.get(key)) != null ? _b : null;
    } catch {
      return null;
    }
  }
  function writeDocumentValue(key, value) {
    const store = settings();
    if (!store) return;
    try {
      store.set(key, value);
      store.saveAsync(() => void 0);
    } catch {
    }
  }

  // src/core/version.ts
  var VERSION = /^\d+(?:\.\d+){0,3}$/u;
  function parseVersion(text) {
    const trimmed = (text != null ? text : "").trim();
    if (!VERSION.test(trimmed)) return null;
    const parts = trimmed.split(".").map(Number);
    while (parts.length < 4) parts.push(0);
    return { parts, text: trimmed };
  }
  function compareVersions(a, b) {
    var _a, _b;
    for (let i = 0; i < 4; i += 1) {
      const difference = ((_a = a.parts[i]) != null ? _a : 0) - ((_b = b.parts[i]) != null ? _b : 0);
      if (difference !== 0) return difference;
    }
    return 0;
  }
  function isOutdated(installed, latest) {
    const newest = parseVersion(latest);
    if (!newest) return false;
    const current2 = parseVersion(installed);
    if (!current2) return true;
    return compareVersions(current2, newest) < 0;
  }
  function parseVersionInfo(raw) {
    if (raw === null || typeof raw !== "object") return null;
    const source = raw;
    const manifestVersion = typeof source.manifestVersion === "string" ? source.manifestVersion : "";
    if (parseVersion(manifestVersion) === null) return null;
    return {
      manifestVersion,
      ...typeof source.url === "string" && source.url.length > 0 ? { url: source.url } : {},
      ...typeof source.note === "string" && source.note.length > 0 ? { note: source.note } : {}
    };
  }
  var VERSION_URL = "version.json";
  async function fetchVersionInfo() {
    try {
      const response = await fetch(VERSION_URL, { cache: "no-store" });
      if (!response.ok) return null;
      return parseVersionInfo(await response.json());
    } catch {
      return null;
    }
  }
  function versionLine(installed, latest) {
    var _a;
    const current2 = parseVersion(installed);
    const newest = parseVersion(latest);
    const notes = [];
    if (!current2) notes.push("\u3053\u306E\u4ED5\u7D44\u307F\u3088\u308A\u524D\u306E\u7248");
    if (newest) notes.push(isOutdated(installed, latest) ? `\u6700\u65B0\u306F ${newest.text}` : "\u6700\u65B0\u7248\u3067\u3059");
    const shown = (_a = current2 == null ? void 0 : current2.text) != null ? _a : "\u4E0D\u660E";
    return notes.length === 0 ? `\u30D0\u30FC\u30B8\u30E7\u30F3 ${shown}` : `\u30D0\u30FC\u30B8\u30E7\u30F3 ${shown}\uFF08${notes.join("\u3002")}\uFF09`;
  }
  function installedVersion(search) {
    const value = new URLSearchParams(search).get("v");
    return value && value.length > 0 ? value : null;
  }

  // src/taskpane/taskpane.ts
  var current = null;
  var visibleCategories = new Set(Object.keys(CATEGORIES));
  var visibleSeverities = /* @__PURE__ */ new Set(["fix", "confirm", "note"]);
  var ignored = new IgnoreList(() => saveIgnored());
  var painted = [];
  var paintedSpaces = false;
  var paintedFonts = /* @__PURE__ */ new Map();
  var paintedCharacterStyles = /* @__PURE__ */ new Map();
  var paintedCompoundLabels = /* @__PURE__ */ new Map();
  var paintedReferenceMarkers = /* @__PURE__ */ new Map();
  var paintedReferenceNumbers = /* @__PURE__ */ new Map();
  var selectedFontHighlightColor = "#80DEEA";
  var selectedStyleHighlightColor = "#80DEEA";
  var selectedCompoundHighlightColor = "#80DEEA";
  var selectedReferenceHighlightColor = "#80DEEA";
  var selectedHalfSpaceColor = "#80DEEA";
  var selectedFullSpaceColor = "#80DEEA";
  var prefs = DEFAULT_PREFERENCES;
  var reviewedPages = null;
  var resultTab = "open";
  var fixedRecords = [];
  var COMPOUND_NOTES_KEY = "document-corrector.compound-notes.v1";
  var compoundNotes = /* @__PURE__ */ new Map();
  var lastLabels = null;
  var selectedReferenceNumber = null;
  var crossrefMetadata = /* @__PURE__ */ new Map();
  var crossrefProgress = null;
  Office.onReady((info) => {
    if (info.host !== Office.HostType.Word) {
      setStatus("\u3053\u306E\u30A2\u30C9\u30A4\u30F3\u306F Word \u5C02\u7528\u3067\u3059\u3002");
      return;
    }
    prefs = loadPreferences();
    selectedHalfSpaceColor = prefs.halfSpaceColor;
    selectedFullSpaceColor = prefs.fullSpaceColor;
    restoreIgnored();
    restoreCompoundNotes();
    byId("restore-all").onclick = () => {
      ignored.clear();
      renderReview();
    };
    byId("open-help").onclick = () => showHelp();
    for (const element of document.querySelectorAll("[data-result-tab]")) {
      element.onclick = () => {
        resultTab = element.dataset.resultTab;
        renderReview();
      };
    }
    byId("compound-insert").onclick = run(() => editNumbers("compounds", {
      mode: "insert",
      at: positiveNumber("compound-insert-number")
    }));
    byId("compound-replace").onclick = run(() => editNumbers("compounds", compoundLabelEdit()));
    byId("reference-insert").onclick = run(() => editNumbers("references", {
      mode: "insert",
      at: positiveNumber("reference-insert-number")
    }));
    byId("reference-replace").onclick = run(() => editNumbers("references", {
      mode: "replace",
      from: positiveNumber("reference-from"),
      to: positiveNumber("reference-to")
    }));
    const redrawReferences = () => {
      if (lastLabels) renderReferences(lastLabels);
    };
    byId("reference-search").oninput = redrawReferences;
    byId("reference-filter").onchange = redrawReferences;
    byId("reference-authors").onchange = redrawReferences;
    byId("crossref-enabled").onchange = () => {
      if (!lastLabels) return;
      renderReferences(lastLabels);
      if (byId("crossref-enabled").checked) void enrichReferences(lastLabels);
    };
    byId("reference-list-jump").onclick = run(() => jumpToSelectedReference());
    byId("font-highlight").onclick = run(() => highlightSelectedFont());
    byId("font-replace").onclick = run(() => replaceSelectedFont());
    byId("style-highlight").onclick = run(() => highlightSelectedCharacterStyle());
    byId("style-replace").onclick = run(() => replaceSelectedCharacterStyle());
    byId("highlight-spaces").onclick = run(() => highlightSpaces());
    setUpHighlightColorPicker("half-space", () => selectedHalfSpaceColor, (color) => {
      selectedHalfSpaceColor = color;
      prefs = { ...prefs, halfSpaceColor: color };
      savePreferences(prefs);
    });
    setUpHighlightColorPicker("full-space", () => selectedFullSpaceColor, (color) => {
      selectedFullSpaceColor = color;
      prefs = { ...prefs, fullSpaceColor: color };
      savePreferences(prefs);
    });
    byId("compound-highlight").onclick = run(() => highlightSelectedCompoundLabel());
    setUpHighlightColorPicker("compound-highlight", () => selectedCompoundHighlightColor, (color) => {
      selectedCompoundHighlightColor = color;
    });
    byId("reference-highlight").onclick = run(() => highlightSelectedReferenceNumber());
    setUpHighlightColorPicker("reference-highlight", () => selectedReferenceHighlightColor, (color) => {
      selectedReferenceHighlightColor = color;
    });
    byId("back-to-review").onclick = () => {
      showView("review");
      if (current) renderReview();
      else setStatus("\u30EA\u30DC\u30F3\u306E\uFF3B\u6587\u66F8\u3092\u30C1\u30A7\u30C3\u30AF\uFF3D\u3092\u62BC\u3059\u3068\u3001\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8\u306E\u70B9\u691C\u3092\u59CB\u3081\u307E\u3059\u3002");
    };
    registerRibbonCommands();
    stayLoaded();
    watchVisibility();
    checkForUpdate();
    setStatus("\u30EA\u30DC\u30F3\u306E\uFF3B\u6587\u66F8\u3092\u30C1\u30A7\u30C3\u30AF\uFF3D\u3092\u62BC\u3059\u3068\u3001\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8\u306E\u70B9\u691C\u3092\u59CB\u3081\u307E\u3059\u3002");
  });
  var IGNORED_KEY = "document-corrector.ignored.v1";
  function restoreIgnored() {
    ignored.restore(parseIgnored(readDocumentValue(IGNORED_KEY)));
    renderIgnored();
  }
  function saveIgnored() {
    writeDocumentValue(IGNORED_KEY, ignored.findings().slice(0, MAX_IGNORED));
  }
  function restoreCompoundNotes() {
    compoundNotes.clear();
    const raw = readDocumentValue(COMPOUND_NOTES_KEY);
    if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return;
    for (const [label, value] of Object.entries(raw)) {
      if (value === null || typeof value !== "object" || Array.isArray(value)) continue;
      const source = value;
      if (typeof source.text !== "string") continue;
      const image = typeof source.image === "string" && source.image.startsWith("data:image/") ? source.image : void 0;
      compoundNotes.set(label, { text: source.text.slice(0, 1e4), ...image ? { image } : {} });
    }
  }
  function persistCompoundNotes() {
    writeDocumentValue(COMPOUND_NOTES_KEY, Object.fromEntries(compoundNotes));
  }
  function updateCompoundThumbnail(label) {
    var _a, _b;
    const image = (_a = compoundNotes.get(label)) == null ? void 0 : _a.image;
    for (const thumbnail of document.querySelectorAll(".compound-thumbnail")) {
      if (thumbnail.dataset.compoundLabel !== label) continue;
      thumbnail.src = image != null ? image : "";
      thumbnail.hidden = image === void 0;
      (_b = thumbnail.closest(".compound-item")) == null ? void 0 : _b.classList.toggle("has-thumbnail", image !== void 0);
    }
  }
  var MAX_COMPOUND_IMAGE_BYTES = 5e6;
  function compoundNoteEditor(label) {
    var _a, _b, _c;
    const editor = document.createElement("section");
    editor.className = "compound-note";
    const heading = document.createElement("p");
    heading.className = "compound-detail-heading";
    heading.textContent = "\u30E1\u30E2";
    const textarea = document.createElement("textarea");
    textarea.className = "compound-note-text";
    textarea.rows = 1;
    textarea.value = (_b = (_a = compoundNotes.get(label)) == null ? void 0 : _a.text) != null ? _b : "";
    textarea.setAttribute("aria-label", `\u5316\u5408\u7269 ${label} \u306E\u30E1\u30E2`);
    const pasteTarget = document.createElement("div");
    pasteTarget.className = "compound-image-paste";
    pasteTarget.tabIndex = 0;
    pasteTarget.setAttribute("role", "button");
    pasteTarget.textContent = "\u3053\u3053\u306B\u753B\u50CF\u3092\u8CBC\u308A\u4ED8\u3051\uFF08\u2318V\uFF09";
    pasteTarget.onclick = () => pasteTarget.focus();
    const imageHeading = document.createElement("p");
    imageHeading.className = "compound-detail-heading compound-image-heading";
    imageHeading.textContent = "\u753B\u50CF\uFF08\u6700\u5927 5 MB\uFF09";
    const fileLabel = document.createElement("label");
    fileLabel.className = "compound-image-file-button";
    fileLabel.textContent = "\u30D5\u30A1\u30A4\u30EB\u304B\u3089\u9078\u629E";
    const fileInput = document.createElement("input");
    fileInput.id = `compound-image-${label}`;
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.className = "compound-image-input";
    fileLabel.htmlFor = fileInput.id;
    const imageControls = document.createElement("div");
    imageControls.className = "compound-image-controls";
    imageControls.append(pasteTarget, fileLabel, fileInput);
    const preview = document.createElement("img");
    preview.className = "compound-image";
    preview.alt = `\u5316\u5408\u7269 ${label} \u306E\u30E1\u30E2\u306E\u6DFB\u4ED8\u753B\u50CF`;
    const showImage = () => {
      var _a2;
      const image = (_a2 = compoundNotes.get(label)) == null ? void 0 : _a2.image;
      preview.src = image != null ? image : "";
      preview.hidden = image === void 0;
    };
    showImage();
    const save = button("\u30E1\u30E2\u3092\u4FDD\u5B58", () => {
      var _a2;
      const image = (_a2 = compoundNotes.get(label)) == null ? void 0 : _a2.image;
      compoundNotes.set(label, { text: textarea.value.slice(0, 1e4), ...image ? { image } : {} });
      persistCompoundNotes();
      setStatus(`\u5316\u5408\u7269 ${label} \u306E\u30E1\u30E2\u3092\u539F\u7A3F\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002`);
    });
    save.classList.add("primary");
    const memoControls = document.createElement("div");
    memoControls.className = "compound-memo-controls";
    memoControls.append(textarea, save);
    const imageActions = document.createElement("div");
    imageActions.className = "row compact compound-image-actions";
    const clear = button("\u753B\u50CF\u3092\u5916\u3059", () => {
      compoundNotes.set(label, { text: textarea.value.slice(0, 1e4) });
      persistCompoundNotes();
      showImage();
      updateCompoundThumbnail(label);
      clear.hidden = true;
      setStatus(`\u5316\u5408\u7269 ${label} \u306E\u6DFB\u4ED8\u753B\u50CF\u3092\u5916\u3057\u307E\u3057\u305F\u3002`);
    });
    clear.hidden = ((_c = compoundNotes.get(label)) == null ? void 0 : _c.image) === void 0;
    imageActions.append(clear);
    const attachImage = (image) => {
      if (image.size > MAX_COMPOUND_IMAGE_BYTES) {
        setStatus("\u753B\u50CF\u304C\u5927\u304D\u3059\u304E\u307E\u3059\u30025 MB \u4EE5\u4E0B\u306E\u753B\u50CF\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result !== "string" || !reader.result.startsWith("data:image/")) {
          setStatus("\u753B\u50CF\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
          return;
        }
        compoundNotes.set(label, { text: textarea.value.slice(0, 1e4), image: reader.result });
        persistCompoundNotes();
        showImage();
        updateCompoundThumbnail(label);
        clear.hidden = false;
        setStatus(`\u5316\u5408\u7269 ${label} \u306E\u30E1\u30E2\u306B\u753B\u50CF\u3092\u6DFB\u4ED8\u3057\u307E\u3057\u305F\u3002`);
      };
      reader.onerror = () => setStatus("\u753B\u50CF\u3092\u8AAD\u307F\u8FBC\u3081\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
      reader.readAsDataURL(image);
    };
    editor.addEventListener("paste", (event) => {
      var _a2, _b2, _c2;
      const image = (_c2 = Array.from((_b2 = (_a2 = event.clipboardData) == null ? void 0 : _a2.items) != null ? _b2 : []).find((item) => item.type.startsWith("image/"))) == null ? void 0 : _c2.getAsFile();
      if (!image) return;
      event.preventDefault();
      attachImage(image);
    });
    fileInput.onchange = () => {
      var _a2;
      const image = (_a2 = fileInput.files) == null ? void 0 : _a2[0];
      fileInput.value = "";
      if (image) attachImage(image);
    };
    editor.append(heading, memoControls, imageHeading, imageControls, preview, imageActions);
    return editor;
  }
  function stayLoaded() {
    var _a, _b;
    (_b = (_a = Office.addin) == null ? void 0 : _a.setStartupBehavior) == null ? void 0 : _b.call(_a, Office.StartupBehavior.load).catch(() => void 0);
  }
  function watchVisibility() {
    var _a, _b;
    (_b = (_a = Office.addin) == null ? void 0 : _a.onVisibilityModeChanged) == null ? void 0 : _b.call(_a, (message) => {
      if (message.visibilityMode !== Office.VisibilityMode.taskpane) return;
      if (current) renderReview();
      else setStatus("\u30EA\u30DC\u30F3\u306E\uFF3B\u6587\u66F8\u3092\u30C1\u30A7\u30C3\u30AF\uFF3D\u3092\u62BC\u3059\u3068\u3001\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8\u306E\u70B9\u691C\u3092\u59CB\u3081\u307E\u3059\u3002");
    }).catch(() => void 0);
  }
  function checkForUpdate() {
    void (async () => {
      const installed = installedVersion(location.search);
      const info = await fetchVersionInfo();
      byId("help-version").textContent = versionLine(installed, info == null ? void 0 : info.manifestVersion);
      if (!info) return;
      if (!isOutdated(installed, info.manifestVersion)) return;
      showUpdateBanner(info, installed);
    })();
  }
  function showUpdateBanner(info, installed) {
    const note = byId("update-note");
    const current2 = installed != null ? installed : "\u4E0D\u660E\uFF08\u3053\u306E\u4ED5\u7D44\u307F\u3088\u308A\u524D\u306E\u7248\uFF09";
    note.textContent = info.note ? `${info.note}\uFF08\u304A\u4F7F\u3044\u306E\u7248 ${current2} \u2192 ${info.manifestVersion}\uFF09` : `\u30EA\u30DC\u30F3\u306E\u69CB\u6210\u304C\u5909\u308F\u308A\u307E\u3057\u305F\u3002\u30DE\u30CB\u30D5\u30A7\u30B9\u30C8\u3092\u5165\u308C\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\uFF08${current2} \u2192 ${info.manifestVersion}\uFF09\u3002`;
    const open = byId("update-open");
    const url = info.url;
    if (!url) {
      open.hidden = true;
    } else {
      open.onclick = () => {
        var _a, _b;
        const opener = (_b = (_a = Office.context) == null ? void 0 : _a.ui) == null ? void 0 : _b.openBrowserWindow;
        if (typeof opener === "function") opener.call(Office.context.ui, url);
        else revealUpdateUrl(url);
      };
    }
    byId("update-dismiss").onclick = () => show("update-banner", false);
    show("update-banner", true);
  }
  function revealUpdateUrl(url) {
    const element = byId("update-url");
    element.textContent = url;
    element.hidden = false;
  }
  async function showPane() {
    var _a;
    if ((_a = Office.addin) == null ? void 0 : _a.showAsTaskpane) await Office.addin.showAsTaskpane();
  }
  function command(handler) {
    return (event) => {
      showPane().then(handler).catch((error) => {
        setStatus(`\u30A8\u30E9\u30FC: ${error instanceof Error ? error.message : String(error)}`);
      }).finally(() => event.completed());
    };
  }
  function registerRibbonCommands() {
    var _a;
    if (!((_a = Office.actions) == null ? void 0 : _a.associate)) return;
    Office.actions.associate("runReview", command(runReview));
    Office.actions.associate("openRules", command(() => openDialog("rules.html", "\u30EB\u30FC\u30EB\u8A2D\u5B9A")));
    Office.actions.associate("openSettings", command(() => openDialog("settings.html", "\u8A2D\u5B9A")));
    Office.actions.associate("highlightFindings", command(highlightFindings2));
    Office.actions.associate("commentFindings", command(commentFindings2));
    Office.actions.associate("clearComments", command(clearComments2));
    Office.actions.associate("clearAllComments", command(clearAllComments2));
    Office.actions.associate("clearHighlights", command(clearHighlights2));
    Office.actions.associate("clearAllHighlights", command(clearAllHighlights2));
    Office.actions.associate("listCompounds", command(listCompounds));
    Office.actions.associate("listReferences", command(listReferences));
    Office.actions.associate("listFigures", command(listFigures));
    Office.actions.associate("replaceFonts", command(replaceFonts));
    Office.actions.associate("showHelp", command(async () => showHelp()));
  }
  function byId(id) {
    const element = document.getElementById(id);
    if (!element) throw new Error(`missing element #${id}`);
    return element;
  }
  function setStatus(message, busy = false) {
    const status = byId("status");
    status.textContent = message;
    status.classList.toggle("working", busy);
  }
  function show(id, visible) {
    byId(id).hidden = !visible;
  }
  function run(handler) {
    return () => {
      handler().catch((error) => {
        setStatus(`\u30A8\u30E9\u30FC: ${error instanceof Error ? error.message : String(error)}`);
      });
    };
  }
  function truncate(text, limit) {
    const flat = text.replace(/\s+/gu, " ").trim();
    return flat.length <= limit ? flat : `${flat.slice(0, limit)}\u2026`;
  }
  function button(label, onclick, className) {
    const element = document.createElement("button");
    element.type = "button";
    element.textContent = label;
    if (className) element.className = className;
    element.onclick = onclick;
    return element;
  }
  var VIEWS = {
    review: "view-review",
    compounds: "view-compounds",
    references: "view-references",
    figures: "view-figures",
    fonts: "view-fonts",
    help: "view-help"
  };
  var VIEW_TITLES = {
    review: "\u70B9\u691C\u7D50\u679C",
    compounds: "\u5316\u5408\u7269",
    references: "\u6587\u732E",
    figures: "\u56F3\u30FB\u8868",
    fonts: "\u6587\u5B57",
    help: "\u4F7F\u3044\u65B9"
  };
  function showHelp() {
    showView("help");
    setStatus("\u4F7F\u3044\u65B9\u3067\u3059\u3002\uFF3B\u2190 \u6307\u6458\u4E00\u89A7\u306B\u623B\u308B\uFF3D\u3067\u623B\u308C\u307E\u3059\u3002");
  }
  function showView(view) {
    for (const [name, id] of Object.entries(VIEWS)) show(id, name === view);
    show("view-nav", view !== "review");
    show("reference-list-jump", view === "references");
    byId("panel-title").textContent = VIEW_TITLES[view];
    byId("panel-head").classList.toggle("context-view", view !== "review");
    if (view === "fonts") setStatus("");
  }
  function options() {
    return {
      selectionOnly: prefs.selectionOnly,
      trackChanges: prefs.trackChanges,
      bodyFont: prefs.bodyFont,
      disabledRules: prefs.disabledRules,
      markerColors: prefs.markerColors,
      halfSpaceColor: prefs.halfSpaceColor,
      fullSpaceColor: prefs.fullSpaceColor,
      reviewOptions: {
        settings: { maxSentenceLength: prefs.maxSentenceLength },
        disabledEntries: prefs.disabledEntries
      }
    };
  }
  var dialogWindow = null;
  var dialogName = "";
  function openDialog(page, name) {
    return new Promise((resolve) => {
      if (dialogWindow) {
        setStatus(`\uFF3B${dialogName}\uFF3D\u306E\u30A6\u30A3\u30F3\u30C9\u30A6\u3092\u9589\u3058\u3066\u304B\u3089\u958B\u3044\u3066\u304F\u3060\u3055\u3044\u3002`);
        resolve();
        return;
      }
      const url = new URL(page, location.href);
      url.search = location.search;
      url.hash = encodeURIComponent(JSON.stringify(prefs));
      Office.context.ui.displayDialogAsync(
        url.href,
        { height: 70, width: 45, promptBeforeOpen: false },
        (result) => {
          if (result.status !== Office.AsyncResultStatus.Succeeded) {
            setStatus(`${name}\u3092\u958B\u3051\u307E\u305B\u3093\u3067\u3057\u305F: ${result.error.message}`);
            resolve();
            return;
          }
          dialogWindow = result.value;
          dialogName = name;
          dialogWindow.addEventHandler(Office.EventType.DialogMessageReceived, onDialogMessage);
          dialogWindow.addEventHandler(Office.EventType.DialogEventReceived, () => {
            dialogWindow = null;
          });
          resolve();
        }
      );
    });
  }
  function onDialogMessage(arg) {
    var _a;
    const raw = (_a = arg.message) != null ? _a : "";
    let close = false;
    try {
      const payload = JSON.parse(raw);
      prefs = normalize2(payload.prefs);
      savePreferences(prefs);
      close = payload.close === true;
    } catch {
      return;
    }
    if (!close) {
      if (current) renderReview();
      return;
    }
    dialogWindow == null ? void 0 : dialogWindow.close();
    dialogWindow = null;
    if (current) run(runReview)();
  }
  async function runReview() {
    showView("review");
    const started = Date.now();
    const elapsed = () => {
      const seconds = Math.round((Date.now() - started) / 1e3);
      return seconds < 3 ? "" : `\u3000${seconds} \u79D2\u7D4C\u904E`;
    };
    setStatus("\u70B9\u691C\u306E\u6E96\u5099\u3092\u3057\u3066\u3044\u307E\u3059\u2026", true);
    current = await reviewDocument(options(), ({ step, of, what }) => {
      setStatus(`${what}\u2026\uFF08${step}/${of}\uFF09${elapsed()}`, true);
    });
    [reviewedPages, pageOf] = await Promise.all([
      documentPageCount(options()),
      paragraphPages(current.findings.map((finding2) => finding2.paragraphIndex), options())
    ]);
    renderReview();
  }
  function renderReview() {
    if (!current) return;
    const { findings, paragraphCount } = current;
    const live = ignored.filter(findings);
    renderResultSummary(live);
    renderConditionFilters(live);
    renderCategoryFilters(live);
    renderFindings(live);
    renderFixed();
    renderIgnored();
    show("start-section", false);
    const hiddenCount = findings.length - live.length;
    const suffix = hiddenCount > 0 ? `\uFF08\u7121\u8996 ${hiddenCount} \u4EF6\u3092\u9664\u304F\uFF09` : "";
    const scope = reviewedPages === null ? `${paragraphCount} \u6BB5\u843D` : `${reviewedPages} \u30DA\u30FC\u30B8`;
    setStatus(
      live.length === 0 ? `${scope}\u3092\u70B9\u691C\u3057\u307E\u3057\u305F\u3002\u6307\u6458\u306F\u3042\u308A\u307E\u305B\u3093${suffix}\u3002` : `${scope}\u3092\u70B9\u691C\u3057\u307E\u3057\u305F\u3002\u672A\u51E6\u7406\u306E\u6307\u6458\u306F ${live.length} \u4EF6\u3067\u3059${suffix}\u3002`
    );
  }
  function renderResultSummary(findings) {
    byId("result-open-count").textContent = String(findings.length);
    byId("result-fixed-count").textContent = String(fixedRecords.length);
    byId("result-ignored-count").textContent = String(ignored.size);
    for (const element of document.querySelectorAll("[data-result-tab]")) {
      element.setAttribute("aria-pressed", String(element.dataset.resultTab === resultTab));
    }
    show("result-summary", true);
  }
  function renderCategoryFilters(findings) {
    const counts = groupByCategory(findings);
    const container = byId("category-filters");
    container.innerHTML = "";
    const present = Object.keys(CATEGORIES).filter((id) => {
      var _a, _b;
      return ((_b = (_a = counts.get(id)) == null ? void 0 : _a.length) != null ? _b : 0) > 0;
    });
    show("summary-section", present.length > 0 && resultTab === "open");
    for (const id of present) {
      const info = CATEGORIES[id];
      const label = document.createElement("label");
      label.className = "filter";
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = visibleCategories.has(id);
      box.onchange = () => {
        if (box.checked) visibleCategories.add(id);
        else visibleCategories.delete(id);
        if (current) renderFindings(ignored.filter(current.findings));
      };
      const swatch = document.createElement("span");
      swatch.className = "swatch";
      swatch.style.background = markerColor(prefs, id);
      swatch.title = "\u3053\u306E\u8272\u3067\u5857\u3089\u308C\u307E\u3059\uFF08\uFF3B\u8A2D\u5B9A\uFF3D\u3067\u5909\u66F4\u3067\u304D\u307E\u3059\uFF09";
      const text = document.createElement("span");
      text.textContent = `${info.label}\uFF08${counts.get(id).length}\uFF09`;
      label.append(box, swatch, text);
      container.appendChild(label);
    }
  }
  function renderConditionFilters(findings) {
    const container = byId("condition-filters");
    container.innerHTML = "";
    const conditions = [
      { severity: "fix", label: "\u81EA\u52D5\u4FEE\u6B63\u53EF" },
      { severity: "confirm", label: "\u78BA\u8A8D\u304C\u5FC5\u8981" },
      { severity: "note", label: "\u5185\u5BB9\u3092\u78BA\u8A8D" }
    ];
    for (const { severity, label: text } of conditions) {
      const count = findings.filter((finding2) => finding2.severity === severity).length;
      if (count === 0) continue;
      const label = document.createElement("label");
      label.className = "filter";
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = visibleSeverities.has(severity);
      box.onchange = () => {
        if (box.checked) visibleSeverities.add(severity);
        else visibleSeverities.delete(severity);
        if (current) renderFindings(ignored.filter(current.findings));
      };
      const copy = document.createElement("span");
      copy.textContent = `${text}\uFF08${count}\uFF09`;
      label.append(box, copy);
      container.appendChild(label);
    }
  }
  function renderFindings(findings) {
    const container = byId("findings");
    container.innerHTML = "";
    if (resultTab !== "open") {
      show("findings-section", false);
      return;
    }
    const visible = findings.filter(
      (finding2) => visibleCategories.has(finding2.category) && visibleSeverities.has(finding2.severity)
    );
    byId("findings-title").textContent = "\u672A\u4FEE\u6B63";
    show("findings-section", true);
    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = findings.length === 0 ? "\u672A\u51E6\u7406\u306E\u6307\u6458\u306F\u3042\u308A\u307E\u305B\u3093\u3002" : "\u8868\u793A\u3059\u308B\u6761\u4EF6\u307E\u305F\u306F\u30AB\u30C6\u30B4\u30EA\u304C\u9078\u3070\u308C\u3066\u3044\u307E\u305B\u3093\u3002";
      container.appendChild(empty);
      return;
    }
    for (const [category, items] of groupByCategory(visible)) {
      const info = CATEGORIES[category];
      const group = document.createElement("details");
      group.className = "category-group";
      group.open = true;
      const summary = document.createElement("summary");
      const swatch = document.createElement("span");
      swatch.className = "swatch";
      swatch.style.background = markerColor(prefs, category);
      summary.append(swatch, document.createTextNode(`${info.label}\uFF08${items.length}\uFF09`));
      group.appendChild(summary);
      for (const [ruleId, ofRule] of groupByRule(items)) group.appendChild(ruleGroup(ruleId, ofRule));
      container.appendChild(group);
    }
  }
  var SAMPLE_LIMIT = 8;
  function ruleGroup(ruleId, items) {
    if (items.length === 1) return findingRow(items[0]);
    const group = document.createElement("div");
    group.className = `finding severity-${dominantSeverity(items)}`;
    const head = document.createElement("div");
    head.className = "finding-head";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = titleFor(ruleId);
    const count = document.createElement("span");
    count.className = "severity";
    count.textContent = `${items.length} \u4EF6`;
    head.append(badge, count);
    const quote = document.createElement("p");
    quote.className = "finding-quote";
    const shown = items.slice(0, SAMPLE_LIMIT).map((f) => truncate(f.matched, 16));
    quote.textContent = shown.join(" / ") + (items.length > shown.length ? ` \u307B\u304B ${items.length - shown.length} \u4EF6` : "");
    const range = document.createElement("span");
    range.className = "page-range";
    range.textContent = pageRange(items);
    quote.appendChild(range);
    const buttons = document.createElement("div");
    buttons.className = "rule-actions";
    const fixable = items.filter(canFix);
    if (fixable.length > 0) {
      const label = fixable.length === items.length ? `${fixable.length} \u4EF6\u3092\u307E\u3068\u3081\u3066\u4FEE\u6B63` : `\u4FEE\u6B63\u3067\u304D\u308B ${fixable.length} \u4EF6\u3092\u4FEE\u6B63`;
      buttons.appendChild(button(label, run(() => fixRule(ruleId)), "primary"));
    }
    const details = document.createElement("details");
    details.className = "one-by-one";
    const summary = document.createElement("summary");
    summary.hidden = true;
    summary.textContent = "\u500B\u5225\u306E\u6307\u6458";
    details.appendChild(summary);
    for (const item of items) details.appendChild(findingRow(item, false));
    let firstOpen = true;
    details.ontoggle = () => {
      if (!details.open || !firstOpen) return;
      firstOpen = false;
      run(async () => {
        const ok = await revealFinding(items[0], options());
        setStatus(
          ok ? `1/${items.length} \u4EF6\u76EE\uFF08${where(items[0].paragraphIndex)}\uFF09\u3092\u9078\u629E\u3057\u307E\u3057\u305F\u3002` : "\u8A72\u5F53\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u5EA6\u30C1\u30A7\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
        );
      })();
    };
    buttons.appendChild(
      button("1 \u4EF6\u305A\u3064\u78BA\u8A8D", () => {
        details.open = !details.open;
      }, "review")
    );
    buttons.appendChild(
      button("\u7121\u8996", () => {
        ignored.addAll(items);
        renderReview();
      }, "ignore")
    );
    if (fixable.length === 0) buttons.classList.add("no-fix");
    group.append(head, quote, buttons, details);
    return group;
  }
  function dominantSeverity(items) {
    if (items.some((f) => f.severity === "fix")) return "fix";
    if (items.some((f) => f.severity === "confirm")) return "confirm";
    return "note";
  }
  var MAX_FIX_PASSES = 3;
  async function fixRule(ruleId) {
    const name = titleFor(ruleId);
    let total = 0;
    for (let pass = 0; pass < MAX_FIX_PASSES; pass += 1) {
      const target = selected().filter((f) => f.ruleId === ruleId && canFix(f));
      if (target.length === 0) break;
      setStatus(`\u300C${name}\u300D\u3092 ${target.length} \u4EF6\u307E\u3068\u3081\u3066\u4FEE\u6B63\u3057\u3066\u3044\u307E\u3059\u2026`, true);
      const { applied, appliedFindings } = await applyFindings(target, options());
      rememberFixed(appliedFindings);
      total += applied;
      current = await reviewDocument(options());
      if (applied === 0) break;
    }
    renderReview();
    const remaining = selected().filter((f) => f.ruleId === ruleId && canFix(f)).length;
    if (total === 0) {
      setStatus(`\u300C${name}\u300D\u306F\u4FEE\u6B63\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\uFF3B\u6587\u66F8\u3092\u30C1\u30A7\u30C3\u30AF\uFF3D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002`);
      return;
    }
    setStatus(
      remaining === 0 ? `\u300C${name}\u300D\u3092 ${total} \u4EF6\u307E\u3068\u3081\u3066\u4FEE\u6B63\u3057\u307E\u3057\u305F\u3002` : `\u300C${name}\u300D\u3092 ${total} \u4EF6\u4FEE\u6B63\u3057\u307E\u3057\u305F\u3002${remaining} \u4EF6\u306F\u4F4D\u7F6E\u304C\u5909\u308F\u3063\u305F\u305F\u3081\u6B8B\u3063\u3066\u3044\u307E\u3059\uFF08\u3082\u3046\u4E00\u5EA6\u62BC\u3059\u3068\u7D9A\u3051\u3089\u308C\u307E\u3059\uFF09\u3002`
    );
  }
  function findingRow(item, named = true) {
    const row = document.createElement("div");
    row.className = `finding severity-${item.severity}`;
    const head = document.createElement("div");
    head.className = "finding-head";
    if (named) {
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = titleFor(item.ruleId);
      head.appendChild(badge);
    }
    const message = document.createElement("p");
    message.className = "finding-message";
    message.textContent = item.message;
    const quote = document.createElement("p");
    quote.className = "finding-quote";
    quote.textContent = `${where(item.paragraphIndex)}: ${truncate(item.matched, 60)}`;
    const buttons = document.createElement("div");
    buttons.className = "row compact";
    buttons.appendChild(
      button(
        "\u6587\u66F8\u5185\u3067\u8868\u793A",
        run(async () => {
          const ok = await revealFinding(item, options());
          setStatus(ok ? "\u8A72\u5F53\u7B87\u6240\u3092\u9078\u629E\u3057\u307E\u3057\u305F\u3002" : "\u8A72\u5F53\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u518D\u5EA6\u30C1\u30A7\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
        })
      )
    );
    if (canFix(item)) {
      buttons.appendChild(
        button(
          "\u4FEE\u6B63",
          run(async () => {
            const { applied, appliedFindings } = await applyFindings([item], options());
            if (applied === 0) {
              setStatus("\u4FEE\u6B63\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3082\u3046\u4E00\u5EA6\u30C1\u30A7\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
              return;
            }
            rememberFixed(appliedFindings);
            setStatus("\u4FEE\u6B63\u3057\u307E\u3057\u305F\u3002\u518D\u70B9\u691C\u3057\u307E\u3059\u2026");
            await runReview();
          }),
          "primary"
        )
      );
    }
    buttons.appendChild(
      button(
        "\u30B3\u30E1\u30F3\u30C8",
        run(async () => {
          const n = await commentFindings([item], options());
          setStatus(n > 0 ? "\u3053\u306E\u6307\u6458\u3092\u30B3\u30E1\u30F3\u30C8\u3068\u3057\u3066\u633F\u5165\u3057\u307E\u3057\u305F\u3002" : "\u8A72\u5F53\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        })
      )
    );
    buttons.appendChild(
      button(
        "\u30DE\u30FC\u30AB\u30FC",
        run(async () => {
          const n = await highlightFindings([item], options());
          if (n > 0) remember([item]);
          setStatus(n > 0 ? "\u3053\u306E\u6307\u6458\u3092\u30DE\u30FC\u30AB\u30FC\u3067\u5857\u308A\u307E\u3057\u305F\u3002" : "\u8A72\u5F53\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
        })
      )
    );
    buttons.appendChild(
      button("\u7121\u8996", () => {
        ignored.add(item);
        renderReview();
      })
    );
    row.append(head, message, quote, buttons);
    return row;
  }
  function canFix(item) {
    return item.replacement !== void 0 || RULE_CATALOG.some((r) => r.id === item.ruleId && r.kind === "format");
  }
  function renderIgnored() {
    const container = byId("ignored");
    container.innerHTML = "";
    const items = ignored.entries();
    show("ignored-section", resultTab === "ignored");
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = "\u7121\u8996\u3057\u305F\u9805\u76EE\u306F\u3042\u308A\u307E\u305B\u3093\u3002";
      container.appendChild(empty);
      return;
    }
    for (const { key, finding: finding2 } of items) {
      const row = document.createElement("div");
      row.className = "finding ignored";
      const head = document.createElement("div");
      head.className = "finding-head";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = titleFor(finding2.ruleId);
      head.appendChild(badge);
      const quote = document.createElement("p");
      quote.className = "finding-quote";
      quote.textContent = `${where(finding2.paragraphIndex)}: ${truncate(finding2.matched, 60)}`;
      const buttons = document.createElement("div");
      buttons.className = "row compact";
      buttons.appendChild(
        button("\u623B\u3059", () => {
          ignored.remove(key);
          renderReview();
        })
      );
      row.append(head, quote, buttons);
      container.appendChild(row);
    }
  }
  function rememberFixed(findings) {
    var _a;
    for (const finding2 of findings) {
      fixedRecords.push({
        finding: finding2,
        before: finding2.matched,
        after: (_a = finding2.replacement) != null ? _a : "\u66F8\u5F0F\u3092\u4FEE\u6B63"
      });
    }
  }
  function renderFixed() {
    const container = byId("fixed");
    container.innerHTML = "";
    show("fixed-section", resultTab === "fixed");
    if (fixedRecords.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = "\u3053\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u3067\u9069\u7528\u3057\u305F\u4FEE\u6B63\u306F\u3042\u308A\u307E\u305B\u3093\u3002";
      container.appendChild(empty);
      return;
    }
    for (const record of [...fixedRecords].reverse()) {
      const row = document.createElement("div");
      row.className = "finding fixed";
      const head = document.createElement("div");
      head.className = "finding-head";
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = titleFor(record.finding.ruleId);
      head.appendChild(badge);
      const quote = document.createElement("p");
      quote.className = "finding-quote";
      quote.textContent = `${where(record.finding.paragraphIndex)}\u30FB\u6587\u5B57 ${record.finding.start + 1}\u2013${record.finding.end}\uFF1A${truncate(record.before, 36)} \u2192 ${truncate(record.after, 36)}`;
      row.append(head, quote);
      container.appendChild(row);
    }
  }
  function selected() {
    if (!current) return [];
    return ignored.filter(current.findings).filter((f) => visibleCategories.has(f.category));
  }
  async function highlightFindings2() {
    if (!current) {
      setStatus("\u5148\u306B\uFF3B\u6587\u66F8\u3092\u30C1\u30A7\u30C3\u30AF\uFF3D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    const target = selected();
    if (target.length === 0) {
      setStatus("\u5857\u308B\u6307\u6458\u304C\u3042\u308A\u307E\u305B\u3093\u3002");
      return;
    }
    setStatus("\u30DE\u30FC\u30AB\u30FC\u3092\u5857\u3063\u3066\u3044\u307E\u3059\u2026");
    const n = await highlightFindings(target, options());
    remember(target);
    setStatus(`${n} \u7B87\u6240\u3092\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8\u306E\u8272\u3067\u5857\u308A\u307E\u3057\u305F\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u5857\u308A\u3092\u524A\u9664\uFF3D\u3002`);
  }
  async function commentFindings2() {
    if (!current) {
      setStatus("\u5148\u306B\uFF3B\u6587\u66F8\u3092\u30C1\u30A7\u30C3\u30AF\uFF3D\u3092\u62BC\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    const target = selected();
    if (target.length === 0) {
      setStatus("\u30B3\u30E1\u30F3\u30C8\u306B\u3059\u308B\u6307\u6458\u304C\u3042\u308A\u307E\u305B\u3093\u3002");
      return;
    }
    setStatus("\u30B3\u30E1\u30F3\u30C8\u3092\u633F\u5165\u3057\u3066\u3044\u307E\u3059\u2026", true);
    const n = await commentFindings(target, options());
    setStatus(
      `${n} \u4EF6\u3092\u30B3\u30E1\u30F3\u30C8\u3068\u3057\u3066\u633F\u5165\u3057\u307E\u3057\u305F\u3002\u8FD4\u4FE1\u3084\u89E3\u6C7A\u306F Word \u306E\u6821\u95B2\u6A5F\u80FD\u3067\u884C\u3048\u307E\u3059\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u30B3\u30E1\u30F3\u30C8\u524A\u9664\uFF3D\u3002`
    );
  }
  async function clearComments2() {
    setStatus("\u3053\u306E\u30A2\u30C9\u30A4\u30F3\u304C\u633F\u5165\u3057\u305F\u30B3\u30E1\u30F3\u30C8\u3092\u524A\u9664\u3057\u3066\u3044\u307E\u3059\u2026", true);
    const n = await clearComments(options());
    setStatus(
      n === 0 ? "\u3053\u306E\u30A2\u30C9\u30A4\u30F3\u304C\u633F\u5165\u3057\u305F\u30B3\u30E1\u30F3\u30C8\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\uFF08\u307B\u304B\u306E\u4EBA\u306E\u30B3\u30E1\u30F3\u30C8\u306F\u524A\u9664\u3057\u307E\u305B\u3093\uFF09\u3002" : `${n} \u4EF6\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u3082\u3068\u304B\u3089\u3042\u3063\u305F\u30B3\u30E1\u30F3\u30C8\u306F\u6B8B\u3057\u3066\u3044\u307E\u3059\uFF09\u3002`
    );
  }
  async function clearAllComments2() {
    setStatus("\u6587\u66F8\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u3059\u3079\u3066\u524A\u9664\u3057\u3066\u3044\u307E\u3059\u2026", true);
    const n = await clearAllComments(options());
    setStatus(
      n === 0 ? "\u30B3\u30E1\u30F3\u30C8\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002" : `${n} \u4EF6\u306E\u30B3\u30E1\u30F3\u30C8\u3092\u3059\u3079\u3066\u524A\u9664\u3057\u307E\u3057\u305F\uFF08\u307B\u304B\u306E\u4EBA\u306E\u30B3\u30E1\u30F3\u30C8\u3082\u542B\u307F\u307E\u3059\u3002\u5143\u306B\u623B\u3059\u306E\u306F \u2318Z\uFF09\u3002`
    );
  }
  async function clearAllHighlights2() {
    setStatus("\u6587\u66F8\u306E\u30CF\u30A4\u30E9\u30A4\u30C8\u3092\u3059\u3079\u3066\u6D88\u53BB\u3057\u3066\u3044\u307E\u3059\u2026", true);
    await clearAllHighlights(options());
    painted = [];
    paintedSpaces = false;
    paintedFonts.clear();
    paintedCharacterStyles.clear();
    paintedCompoundLabels.clear();
    paintedReferenceMarkers.clear();
    paintedReferenceNumbers.clear();
    setStatus("\u6587\u66F8\u306E\u30CF\u30A4\u30E9\u30A4\u30C8\u3092\u3059\u3079\u3066\u6D88\u53BB\u3057\u307E\u3057\u305F\uFF08\u624B\u3067\u5857\u3063\u305F\u30DE\u30FC\u30AB\u30FC\u3082\u542B\u307F\u307E\u3059\u3002\u5143\u306B\u623B\u3059\u306E\u306F \u2318Z\uFF09\u3002");
  }
  var pageOf = /* @__PURE__ */ new Map();
  function where(paragraphIndex) {
    const page = pageOf.get(paragraphIndex);
    return page === void 0 ? `${paragraphIndex + 1}\u6BB5\u843D` : `${page}\u30DA\u30FC\u30B8 ${paragraphIndex + 1}\u6BB5\u843D`;
  }
  function pageRange(items) {
    const pages = [...new Set(items.map((item) => pageOf.get(item.paragraphIndex)).filter(
      (page) => page !== void 0
    ))].sort((a, b) => a - b);
    if (pages.length === 0) {
      const paragraphs = items.map((item) => item.paragraphIndex + 1).sort((a, b) => a - b);
      return `\u7B2C ${paragraphs[0]}\u2013${paragraphs.at(-1)} \u6BB5\u843D\u306B\u51FA\u73FE`;
    }
    const first = pages[0];
    const last = pages.at(-1);
    return `p. ${first}${first === last ? "" : `\u2013${last}`} \u306B\u51FA\u73FE\uFF08${pages.length} \u30DA\u30FC\u30B8\uFF09`;
  }
  async function reveal(label, occurrence, index, total) {
    const ok = await revealSpan(
      { paragraphIndex: occurrence.paragraphIndex, start: occurrence.start, matched: occurrence.text },
      options()
    );
    setStatus(
      ok ? `\u300C${label}\u300D${index + 1}/${total} \u4EF6\u76EE\uFF08${where(occurrence.paragraphIndex)}\uFF09\u3092\u9078\u629E\u3057\u307E\u3057\u305F\u3002` : "\u8A72\u5F53\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6587\u66F8\u304C\u5909\u308F\u3063\u3066\u3044\u308B\u5834\u5408\u306F\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    );
  }
  function placesRow(label, occurrences2, onChoose) {
    const row = document.createElement("p");
    row.className = "finding-quote places";
    occurrences2.forEach((occurrence, i) => {
      const place = document.createElement("button");
      place.type = "button";
      place.className = "place";
      place.textContent = where(occurrence.paragraphIndex);
      place.title = `${label} \u306E ${i + 1} \u4EF6\u76EE\u3078\u79FB\u52D5`;
      place.onclick = run(async () => {
        onChoose == null ? void 0 : onChoose();
        await reveal(label, occurrence, i, occurrences2.length);
      });
      row.appendChild(place);
    });
    return row;
  }
  function renderCompounds(items) {
    var _a;
    const container = byId("compounds");
    container.innerHTML = "";
    const highlightSelect = byId("compound-highlight-select");
    const previousHighlight = highlightSelect.value;
    highlightSelect.innerHTML = "";
    for (const item of items) {
      const option = document.createElement("option");
      option.value = item.label;
      option.textContent = `${item.label}\uFF08${item.occurrences.length} \u4EF6\uFF09`;
      highlightSelect.appendChild(option);
    }
    if ([...highlightSelect.options].some((option) => option.value === previousHighlight)) {
      highlightSelect.value = previousHighlight;
    }
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = "\u5316\u5408\u7269\u756A\u53F7\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\uFF08\u592A\u5B57\u306E\u756A\u53F7\u3001\u300C\u5316\u5408\u7269 5\u300D\u306E\u3088\u3046\u306B\u8A9E\u3092\u4F34\u3046\u3082\u306E\u30015a \u306E\u3088\u3046\u306A\u7CFB\u5217\u30E9\u30D9\u30EB\u3092\u6570\u3048\u307E\u3059\uFF09\u3002";
      container.appendChild(empty);
      return;
    }
    for (const item of items) {
      const row = document.createElement("details");
      row.className = "compound-item";
      const head = document.createElement("summary");
      const toggle = document.createElement("span");
      toggle.className = "compound-toggle";
      const label = document.createElement("strong");
      label.className = "compound-label";
      label.textContent = item.label;
      const count = document.createElement("span");
      count.className = "compound-count";
      count.textContent = `${item.occurrences.length} \u4EF6`;
      const meta = document.createElement("span");
      meta.className = "compound-meta";
      meta.append(label, count);
      const thumbnail = document.createElement("img");
      thumbnail.className = "compound-thumbnail";
      thumbnail.dataset.compoundLabel = item.label;
      thumbnail.alt = `\u5316\u5408\u7269 ${item.label} \u306E\u767B\u9332\u753B\u50CF`;
      const image = (_a = compoundNotes.get(item.label)) == null ? void 0 : _a.image;
      thumbnail.src = image != null ? image : "";
      thumbnail.hidden = image === void 0;
      row.classList.toggle("has-thumbnail", image !== void 0);
      toggle.append(thumbnail, meta);
      head.append(toggle);
      const detail = document.createElement("div");
      detail.className = "compound-detail";
      const locations = document.createElement("section");
      locations.className = "compound-detail-section";
      const locationsHeading = document.createElement("p");
      locationsHeading.className = "compound-detail-heading";
      locationsHeading.textContent = "\u51FA\u73FE\u7B87\u6240";
      locations.append(locationsHeading, placesRow(item.label, item.occurrences));
      detail.append(locations, compoundNoteEditor(item.label));
      row.append(head, detail);
      row.addEventListener("toggle", () => {
        if (!row.open) return;
        for (const other of container.querySelectorAll(".compound-item[open]")) {
          if (other !== row) other.open = false;
        }
      });
      container.appendChild(row);
    }
  }
  function renderFigures(items) {
    const container = byId("figures");
    container.innerHTML = "";
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = "Figure\u3001Fig.\u3001Table\u3001\u56F3\u3001\u8868\u306E\u756A\u53F7\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002";
      container.appendChild(empty);
      return;
    }
    for (const item of items) {
      const row = document.createElement("details");
      row.className = "compound-item";
      const head = document.createElement("summary");
      const toggle = document.createElement("span");
      toggle.className = "compound-toggle";
      const label = document.createElement("strong");
      label.className = "compound-label";
      label.textContent = item.label;
      const count = document.createElement("span");
      count.className = "compound-count";
      count.textContent = `\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3 ${item.captions.length} \u4EF6\uFF0F\u672C\u6587 ${item.references.length} \u4EF6`;
      const meta = document.createElement("span");
      meta.className = "compound-meta";
      meta.append(label, count);
      toggle.append(meta);
      head.append(toggle);
      row.appendChild(head);
      const detail = document.createElement("div");
      detail.className = "compound-detail";
      if (item.captions.length > 0) {
        const captions = document.createElement("section");
        captions.className = "compound-detail-section";
        const title = document.createElement("p");
        title.className = "compound-detail-heading";
        title.textContent = "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3";
        captions.append(title, placesRow(item.label, item.captions));
        detail.appendChild(captions);
      }
      if (item.references.length > 0) {
        const references = document.createElement("section");
        references.className = "compound-detail-section";
        const title = document.createElement("p");
        title.className = "compound-detail-heading";
        title.textContent = "\u672C\u6587\u4E2D\u306E\u53C2\u7167";
        references.append(title, placesRow(item.label, item.references));
        detail.appendChild(references);
      }
      row.appendChild(detail);
      container.appendChild(row);
    }
  }
  function selectReference(number) {
    selectedReferenceNumber = number;
    if (lastLabels) renderReferences(lastLabels);
  }
  async function jumpToSelectedReference() {
    const item = lastLabels == null ? void 0 : lastLabels.references.find((reference) => reference.number === (selectedReferenceNumber != null ? selectedReferenceNumber : 1));
    if (!(item == null ? void 0 : item.entry)) {
      setStatus("\u6587\u732E [1] \u304C\u6587\u732E\u30EA\u30B9\u30C8\u306B\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002\u6587\u732E\u30AB\u30FC\u30C9\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus("\u672C\u6587\u4E2D\u306E\u6587\u732E\u30EA\u30B9\u30C8\u3078\u79FB\u52D5\u3057\u3066\u3044\u307E\u3059\u2026", true);
    const ok = await revealBibliographyEntry(item.entry.at.text, item.entry.full);
    setStatus(
      ok ? `\u672C\u6587\u4E2D\u306E\u6587\u732E\u30EA\u30B9\u30C8\uFF08${where(item.entry.at.paragraphIndex)}\uFF09\u3078\u79FB\u52D5\u3057\u307E\u3057\u305F\u3002` : "\u6587\u732E\u30EA\u30B9\u30C8\u306E\u9805\u76EE\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
    );
  }
  function authorEnd(text) {
    const yearAt = text.search(/(?:19|20)\d{2}\s*,\s*\d+/u);
    if (yearAt < 0) return null;
    const head = text.slice(0, yearAt);
    const etAl = /\bet\s+al\.?\s*/iu.exec(head);
    if (etAl) return etAl.index + etAl[0].length;
    const at = Math.max(head.lastIndexOf(","), head.lastIndexOf(";"));
    if (at < 0) return null;
    let end = at + 1;
    if (head.includes(",")) {
      const trailingInitial = /^\s*[A-Z]\.\s+(?=[A-Z])/u.exec(head.slice(end));
      if (trailingInitial) end += trailingInitial[0].length;
    }
    return end;
  }
  var FIRST_AUTHOR2 = /^([A-Z][A-Za-z'’-]+(?:,\s*[A-Z]\.(?:\s*[A-Z]\.)*)?|(?:[A-Z]\.\s*)+[A-Z][A-Za-z'’-]+)/u;
  var REFERENCE_LINK = /(https?:\/\/[^\s<>]+|\bdoi:\s*(10\.\d{4,9}\/[\w.()/:;-]+)|\b(10\.\d{4,9}\/[\w.()/:;-]+))/giu;
  function appendLinkedText(parent, text) {
    var _a, _b;
    let from = 0;
    for (const match of text.matchAll(REFERENCE_LINK)) {
      const at = (_a = match.index) != null ? _a : 0;
      parent.append(document.createTextNode(text.slice(from, at)));
      const displayed = match[0];
      const doi = (_b = match[2]) != null ? _b : match[3];
      const link = document.createElement("a");
      link.href = doi ? `https://doi.org/${doi}` : displayed;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = displayed;
      link.title = doi ? "DOI \u3092\u958B\u304F" : "URL \u3092\u958B\u304F";
      parent.append(link);
      from = at + displayed.length;
    }
    parent.append(document.createTextNode(text.slice(from)));
  }
  function appendReferenceText(parent, entry, authors) {
    var _a;
    const candidateEnd = authors === "short" ? authorEnd(entry.full) : null;
    const end = candidateEnd !== null && !/\bet\s+al\.?\s*$/iu.test(entry.full.slice(0, candidateEnd)) ? candidateEnd : null;
    const first = (_a = FIRST_AUTHOR2.exec(entry.full)) == null ? void 0 : _a[1];
    if (end !== null && first) {
      appendLinkedText(parent, `${first} et al. `);
    }
    let offset = 0;
    for (const run2 of entry.formatting) {
      const runStart = offset;
      offset += run2.text.length;
      const start = end === null ? 0 : Math.max(0, end - runStart);
      if (start >= run2.text.length) continue;
      const styled = document.createElement("span");
      styled.className = `${run2.bold ? "reference-bold " : ""}${run2.italic ? "reference-italic" : ""}`.trim();
      appendLinkedText(styled, run2.text.slice(start));
      parent.append(styled);
    }
  }
  function stringField(source, key) {
    if (source === null || typeof source !== "object") return void 0;
    const value = source[key];
    return typeof value === "string" && value.trim().length > 0 ? value.trim() : void 0;
  }
  function firstStringField(source, key) {
    if (source === null || typeof source !== "object") return void 0;
    const value = source[key];
    return Array.isArray(value) && typeof value[0] === "string" && value[0].trim().length > 0 ? value[0].trim() : void 0;
  }
  async function lookupCrossref(entry) {
    const endpoint = new URL("https://api.crossref.org/works");
    endpoint.searchParams.set("query.bibliographic", entry.full.slice(0, 700));
    endpoint.searchParams.set("rows", "1");
    endpoint.searchParams.set("select", "DOI,title,URL");
    const response = await fetch(endpoint.toString(), { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Crossref: ${response.status}`);
    const payload = await response.json();
    const message = payload !== null && typeof payload === "object" ? payload.message : void 0;
    const items = message !== null && typeof message === "object" ? message.items : void 0;
    const item = Array.isArray(items) ? items[0] : void 0;
    const doi = stringField(item, "DOI");
    const title = firstStringField(item, "title");
    const url = stringField(item, "URL");
    return doi || title || url ? { state: "found", doi, title, url } : { state: "not-found" };
  }
  function crossrefEnabled() {
    return byId("crossref-enabled").checked;
  }
  async function enrichReferences(report) {
    if (!crossrefEnabled()) return;
    const entries = [...new Map(report.references.flatMap((item) => item.entry ? [[item.entry.full, item.entry]] : [])).values()];
    const pending = entries.filter((entry) => !crossrefMetadata.has(entry.full));
    if (pending.length === 0) return;
    crossrefProgress = { completed: 0, total: pending.length };
    for (const entry of pending) crossrefMetadata.set(entry.full, { state: "loading" });
    renderReferences(report);
    const queue = [...pending];
    const worker = async () => {
      for (; ; ) {
        const entry = queue.shift();
        if (!entry) return;
        try {
          crossrefMetadata.set(entry.full, await lookupCrossref(entry));
        } catch {
          crossrefMetadata.set(entry.full, { state: "failed" });
        }
        if (crossrefProgress) crossrefProgress = { ...crossrefProgress, completed: crossrefProgress.completed + 1 };
        if (lastLabels === report) renderReferences(report);
      }
    };
    await Promise.all(Array.from({ length: Math.min(3, pending.length) }, () => worker()));
    crossrefProgress = null;
    if (lastLabels === report) renderReferences(report);
  }
  function externalLink(url, label) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    return link;
  }
  function crossrefDetails(entry) {
    if (!crossrefEnabled()) return null;
    const metadata = crossrefMetadata.get(entry.full);
    if (!metadata || metadata.state === "not-found" || metadata.state === "failed") return null;
    const details = document.createElement("div");
    details.className = "crossref-details";
    if (metadata.state === "loading") {
      details.textContent = "Crossref \u304B\u3089\u30BF\u30A4\u30C8\u30EB\u30FBDOI\u3092\u691C\u7D22\u4E2D\u2026";
      return details;
    }
    const label = document.createElement("span");
    label.className = "crossref-label";
    label.textContent = "Crossref\u5019\u88DC";
    details.appendChild(label);
    if (metadata.title) {
      const title = document.createElement("span");
      title.className = "crossref-title";
      title.textContent = metadata.title;
      details.appendChild(title);
    }
    if (metadata.doi) details.append(externalLink(`https://doi.org/${metadata.doi}`, `DOI: ${metadata.doi}`));
    const normalizedDoiUrl = metadata.doi ? `https://doi.org/${metadata.doi}`.toLowerCase() : "";
    if (metadata.url && metadata.url.toLowerCase() !== normalizedDoiUrl) details.append(externalLink(metadata.url, "\u51FA\u7248\u793E\u30DA\u30FC\u30B8"));
    return details;
  }
  function renderReferences(report) {
    const container = byId("references");
    const highlightSelect = byId("reference-highlight-select");
    const previousHighlight = highlightSelect.value;
    highlightSelect.innerHTML = "";
    for (const item of report.references) {
      const option = document.createElement("option");
      option.value = String(item.number);
      option.textContent = `[${item.number}]\uFF08${item.citations.length} \u56DE\uFF09`;
      highlightSelect.appendChild(option);
    }
    if ([...highlightSelect.options].some((option) => option.value === previousHighlight)) {
      highlightSelect.value = previousHighlight;
    }
    const search = byId("reference-search").value.trim().toLocaleLowerCase();
    const filter = byId("reference-filter").value;
    const authors = byId("reference-authors").value;
    const selected2 = report.references.find((item) => item.number === selectedReferenceNumber);
    const target = selected2 != null ? selected2 : report.references.find((item) => item.number === 1);
    const crossrefStatus = byId("crossref-status");
    const jump = byId("reference-list-jump");
    jump.disabled = (target == null ? void 0 : target.entry) === void 0;
    jump.title = (target == null ? void 0 : target.entry) ? `[${target.number}] \u306E\u6587\u732E\u30EA\u30B9\u30C8\uFF08${where(target.entry.at.paragraphIndex)}\uFF09\u3078\u79FB\u52D5` : "\u6587\u732E [1] \u304C\u306A\u3044\u305F\u3081\u3001\u6587\u732E\u30AB\u30FC\u30C9\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002";
    if (!crossrefEnabled()) {
      crossrefStatus.hidden = true;
    } else if (crossrefProgress) {
      crossrefStatus.hidden = false;
      crossrefStatus.textContent = `Crossref \u3092\u691C\u7D22\u4E2D\u2026 ${crossrefProgress.completed}/${crossrefProgress.total} \u4EF6`;
    } else {
      crossrefStatus.hidden = false;
      const found = report.references.filter((item) => {
        var _a;
        return item.entry && ((_a = crossrefMetadata.get(item.entry.full)) == null ? void 0 : _a.state) === "found";
      }).length;
      crossrefStatus.textContent = `Crossref\u691C\u7D22\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F\u3002${found} \u4EF6\u306E\u5019\u88DC\u3092\u53D6\u5F97\u3057\u307E\u3057\u305F\u3002`;
    }
    container.innerHTML = "";
    const items = report.references.filter((item) => {
      var _a, _b;
      const issue = item.entry === void 0 || item.citations.length === 0;
      const matchesFilter = filter === "issues" ? issue : filter === "uncited" ? item.citations.length === 0 : true;
      const haystack = `[${item.number}] ${(_b = (_a = item.entry) == null ? void 0 : _a.full) != null ? _b : ""}`.toLocaleLowerCase();
      return matchesFilter && (search.length === 0 || haystack.includes(search));
    });
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = report.references.length === 0 ? "\u5F15\u7528\u6587\u732E\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002" : "\u6761\u4EF6\u306B\u5408\u3046\u5F15\u7528\u6587\u732E\u306F\u3042\u308A\u307E\u305B\u3093\u3002";
      container.appendChild(empty);
      return;
    }
    for (const item of items) {
      const missing = item.entry === void 0;
      const uncited = item.citations.length === 0;
      const row = document.createElement("article");
      row.className = `finding reference-item ${missing || uncited ? "severity-fix" : "severity-note"}`;
      row.classList.toggle("selected", item.number === selectedReferenceNumber);
      row.title = "\u30AB\u30FC\u30C9\u306E\u7A7A\u3044\u3066\u3044\u308B\u90E8\u5206\u3092\u62BC\u3059\u3068\u3001\u3053\u306E\u6587\u732E\u3092\u9078\u629E\u3057\u307E\u3059\u3002";
      row.onclick = (event) => {
        if (event.target.closest("button, a, input, select, label")) return;
        selectReference(item.number);
      };
      const head = document.createElement("div");
      head.className = "finding-head";
      const label = document.createElement("span");
      label.className = "inventory-label badge";
      label.textContent = `[${item.number}]`;
      const count = document.createElement("span");
      count.className = "severity";
      count.textContent = uncited ? "\u672C\u6587\u306B\u5F15\u7528\u306A\u3057" : `${item.citations.length} \u56DE`;
      head.append(label, count);
      row.appendChild(head);
      if (item.entry) {
        const citation = document.createElement("p");
        citation.className = "finding-message reference-entry";
        citation.title = item.entry.full;
        appendReferenceText(citation, item.entry, authors);
        row.append(citation);
        const details = crossrefDetails(item.entry);
        if (details) row.appendChild(details);
      } else {
        const warning = document.createElement("p");
        warning.className = "finding-message";
        warning.textContent = report.hasBibliography ? "\u6587\u732E\u30EA\u30B9\u30C8\u306B\u8A72\u5F53\u3059\u308B\u9805\u76EE\u304C\u3042\u308A\u307E\u305B\u3093\u3002" : "\u6587\u732E\u30EA\u30B9\u30C8\u304C\u898B\u3064\u304B\u3089\u306A\u3044\u305F\u3081\u3001\u66F8\u8A8C\u306F\u8868\u793A\u3067\u304D\u307E\u305B\u3093\u3002";
        row.appendChild(warning);
      }
      if (item.citations.length > 0) row.appendChild(placesRow(`[${item.number}]`, item.citations, () => selectReference(item.number)));
      container.appendChild(row);
    }
  }
  async function loadPages(paragraphIndices) {
    pageOf = await paragraphPages([...new Set(paragraphIndices)], options());
  }
  function positiveNumber(id) {
    const value = Number(byId(id).value);
    if (!Number.isInteger(value) || value < 1) throw new Error("1 \u4EE5\u4E0A\u306E\u6574\u6570\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
    return value;
  }
  function numberInUse(kind, number) {
    if (!lastLabels) return false;
    if (kind === "references") return lastLabels.references.some((item) => item.number === number);
    return lastLabels.compounds.some((item) => {
      var _a;
      return Number((_a = /^(\d+)/u.exec(item.label)) == null ? void 0 : _a[1]) === number;
    });
  }
  function compoundLabelEdit() {
    const from = byId("compound-from").value.trim();
    const to = byId("compound-to").value.trim();
    if (!/^\d{1,4}[a-z]?$/iu.test(from) || !/^\d{1,4}[a-z]?$/iu.test(to)) {
      throw new Error("\u5316\u5408\u7269\u756A\u53F7\u306F 1\u30011a \u306E\u3088\u3046\u306B\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
    }
    return { mode: "replace-label", from: from.toLowerCase(), to: to.toLowerCase() };
  }
  function compoundLabelInUse(label) {
    var _a;
    return (_a = lastLabels == null ? void 0 : lastLabels.compounds.some((item) => item.label.toLowerCase() === label.toLowerCase())) != null ? _a : false;
  }
  function migrateCompoundNotes(edit) {
    const moved = /* @__PURE__ */ new Map();
    for (const [label, note] of compoundNotes) {
      moved.set(editedCompoundNumberText(label, edit), note);
    }
    compoundNotes.clear();
    for (const [label, note] of moved) compoundNotes.set(label, note);
    persistCompoundNotes();
  }
  function invalidateReview() {
    current = null;
    reviewedPages = null;
    show("start-section", true);
    show("result-summary", false);
    show("summary-section", false);
    show("findings-section", false);
    show("fixed-section", false);
    show("ignored-section", false);
  }
  async function editNumbers(kind, edit) {
    if (kind === "compounds" && edit.mode === "replace-label") {
      if (edit.from === edit.to) {
        setStatus("\u5909\u66F4\u524D\u3068\u5909\u66F4\u5F8C\u304C\u540C\u3058\u756A\u53F7\u3067\u3059\u3002");
        return;
      }
      if (!compoundLabelInUse(edit.from)) {
        setStatus(`\u5316\u5408\u7269 ${edit.from} \u306F\u4E00\u89A7\u306B\u3042\u308A\u307E\u305B\u3093\u3002`);
        return;
      }
      if (compoundLabelInUse(edit.to)) {
        setStatus(`\u5316\u5408\u7269 ${edit.to} \u306F\u3059\u3067\u306B\u4F7F\u308F\u308C\u3066\u3044\u307E\u3059\u3002`);
        return;
      }
    } else if (edit.mode === "replace") {
      if (edit.from === edit.to) {
        setStatus("\u5909\u66F4\u524D\u3068\u5909\u66F4\u5F8C\u304C\u540C\u3058\u756A\u53F7\u3067\u3059\u3002");
        return;
      }
      if (!numberInUse(kind, edit.from)) {
        setStatus(`\u756A\u53F7 ${edit.from} \u306F\u4E00\u89A7\u306B\u3042\u308A\u307E\u305B\u3093\u3002`);
        return;
      }
      if (numberInUse(kind, edit.to)) {
        setStatus(`\u756A\u53F7 ${edit.to} \u306F\u3059\u3067\u306B\u4F7F\u308F\u308C\u3066\u3044\u307E\u3059\u3002`);
        return;
      }
    }
    const name = kind === "compounds" ? "\u5316\u5408\u7269\u756A\u53F7" : "\u6587\u732E\u756A\u53F7";
    setStatus(`${name}\u3092\u672C\u6587\u5168\u4F53\u3067\u5909\u66F4\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const changed = kind === "compounds" ? await editCompoundNumbers(edit, options()) : await editReferenceNumbers(edit, options());
    if (changed === 0) {
      setStatus("\u5909\u66F4\u5BFE\u8C61\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    if (kind === "compounds") migrateCompoundNotes(edit);
    invalidateReview();
    if (kind === "compounds") await listCompounds();
    else await listReferences();
    setStatus(`${name}\u3092 ${changed} \u7B87\u6240\u5909\u66F4\u3057\u307E\u3057\u305F\u3002\u53D6\u308A\u6D88\u3057\u306F \u2318Z\uFF08Ctrl+Z\uFF09\u3067\u3059\u3002`);
  }
  async function listCompounds() {
    setStatus("\u5316\u5408\u7269\u3092\u96C6\u3081\u3066\u3044\u307E\u3059\u2026");
    showView("compounds");
    const report = await listLabels(options());
    lastLabels = report;
    const { compounds } = report;
    await loadPages(compounds.flatMap((item) => item.occurrences.map((o) => o.paragraphIndex)));
    renderCompounds(compounds);
    setStatus(
      compounds.length === 0 ? "\u5316\u5408\u7269\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002" : `${compounds.length} \u7A2E\u985E\u306E\u5316\u5408\u7269\u3092\u691C\u51FA\u3057\u307E\u3057\u305F\u3002`
    );
  }
  async function listReferences() {
    setStatus("\u6587\u732E\u756A\u53F7\u3092\u96C6\u3081\u3066\u3044\u307E\u3059\u2026");
    showView("references");
    const report = await listLabels(options());
    lastLabels = report;
    await loadPages([
      ...report.references.flatMap((item) => item.citations.map((o) => o.paragraphIndex)),
      ...report.references.flatMap((item) => item.entry ? [item.entry.at.paragraphIndex] : [])
    ]);
    renderReferences(report);
    void enrichReferences(report);
    const notes = [];
    if (!report.hasBibliography) notes.push("\u672B\u5C3E\u306E\u6587\u732E\u30EA\u30B9\u30C8\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F");
    if (report.missingEntries.length > 0) {
      notes.push(`\u6587\u732E\u30EA\u30B9\u30C8\u306B\u306A\u3044\u756A\u53F7\uFF1A${report.missingEntries.join("\u3001")}`);
    }
    if (report.uncited.length > 0) notes.push(`\u672C\u6587\u304C\u5F15\u7528\u3057\u3066\u3044\u306A\u3044\u756A\u53F7\uFF1A${report.uncited.join("\u3001")}`);
    setStatus(
      report.references.length === 0 ? "\u6587\u732E\u756A\u53F7\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002" : `${report.references.length} \u4EF6\u306E\u6587\u732E\u756A\u53F7\u3002${notes.length > 0 ? notes.join("\uFF0F") + "\u3002" : "\u5BFE\u5FDC\u306B\u6F0F\u308C\u306F\u3042\u308A\u307E\u305B\u3093\u3002"}`
    );
  }
  async function listFigures() {
    setStatus("\u56F3\u30FB\u8868\u756A\u53F7\u3092\u96C6\u3081\u3066\u3044\u307E\u3059\u2026");
    showView("figures");
    const report = await listFigureTables(options());
    await loadPages(report.items.flatMap((item) => [
      ...item.captions.map((occurrence) => occurrence.paragraphIndex),
      ...item.references.map((occurrence) => occurrence.paragraphIndex)
    ]));
    renderFigures(report.items);
    const mentions = report.items.reduce((total, item) => total + item.captions.length + item.references.length, 0);
    setStatus(report.items.length === 0 ? "\u56F3\u30FB\u8868\u756A\u53F7\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002" : `${report.items.length} \u7A2E\u985E\u30FB${mentions} \u7B87\u6240\u306E\u56F3\u30FB\u8868\u756A\u53F7\u3092\u691C\u51FA\u3057\u307E\u3057\u305F\u3002`);
  }
  var DEFAULT_FONT_TARGET = "Times New Roman";
  var COMMON_FONTS = [
    "Arial",
    "Helvetica",
    "Calibri",
    "Cambria",
    "\uFF2D\uFF33 \u660E\u671D",
    "\uFF2D\uFF33 \u30B4\u30B7\u30C3\u30AF",
    "\u6E38\u660E\u671D",
    "\u6E38\u30B4\u30B7\u30C3\u30AF",
    "Hiragino Mincho ProN",
    "Hiragino Kaku Gothic ProN"
  ];
  function setUpHighlightColorPicker(prefix, selected2, select) {
    const button2 = byId(`${prefix}-color`);
    const name = byId(`${prefix}-color-name`);
    const menu = byId(`${prefix}-color-menu`);
    const picker = byId(`${prefix}-picker`);
    menu.innerHTML = "";
    const close = () => {
      menu.hidden = true;
      button2.setAttribute("aria-expanded", "false");
    };
    const update = () => {
      var _a;
      const value = selected2();
      const color = HIGHLIGHT_PALETTE.find((item) => item.value === value);
      button2.style.setProperty("--selected-color", value);
      name.textContent = (_a = color == null ? void 0 : color.label) != null ? _a : "\u8272\u3092\u9078\u629E";
      for (const option of menu.querySelectorAll("button")) {
        option.setAttribute("aria-selected", String(option.dataset.color === value));
      }
    };
    for (const color of HIGHLIGHT_PALETTE) {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "font-color-option";
      option.dataset.color = color.value;
      option.setAttribute("role", "option");
      option.innerHTML = `<span class="color-swatch" style="--selected-color: ${color.value}" aria-hidden="true"></span><span>${color.label}</span>`;
      option.onclick = () => {
        select(color.value);
        update();
        close();
      };
      menu.appendChild(option);
    }
    button2.onclick = () => {
      const willOpen = menu.hidden;
      menu.hidden = !willOpen;
      button2.setAttribute("aria-expanded", String(willOpen));
    };
    picker.addEventListener("focusout", () => {
      window.setTimeout(() => {
        if (!picker.contains(document.activeElement)) close();
      }, 0);
    });
    update();
  }
  async function replaceFonts(note) {
    if (note === void 0) setStatus("\u4F7F\u308F\u308C\u3066\u3044\u308B\u30D5\u30A9\u30F3\u30C8\u3092\u8ABF\u3079\u3066\u3044\u307E\u3059\u2026");
    showView("fonts");
    const usages = await listFonts(options());
    const styleUsages = await listCharacterStyles(options());
    const container = byId("font-usage");
    const summary = byId("font-summary");
    const replaceFrom = byId("font-replace-from");
    const replaceTo = byId("font-replace-to");
    const highlightSelect = byId("font-highlight-select");
    const styleSummary = byId("style-summary");
    const styleUsage = byId("style-usage");
    const styleReplaceFrom = byId("style-replace-from");
    const styleReplaceTo = byId("style-replace-to");
    const styleHighlightSelect = byId("style-highlight-select");
    container.innerHTML = "";
    summary.textContent = "";
    replaceFrom.innerHTML = "";
    replaceTo.innerHTML = "";
    highlightSelect.innerHTML = "";
    styleSummary.textContent = "";
    styleUsage.innerHTML = "";
    styleReplaceFrom.innerHTML = "";
    styleReplaceTo.innerHTML = "";
    styleHighlightSelect.innerHTML = "";
    if (usages.length === 0) {
      const empty = document.createElement("p");
      empty.className = "lead";
      empty.textContent = "\u30D5\u30A9\u30F3\u30C8\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002";
      container.appendChild(empty);
      setStatus("\u30D5\u30A9\u30F3\u30C8\u3092\u8AAD\u307F\u53D6\u308C\u307E\u305B\u3093\u3067\u3057\u305F\u3002");
      return;
    }
    const targets = [
      .../* @__PURE__ */ new Set([DEFAULT_FONT_TARGET, ...usages.map((usage) => usage.name), ...COMMON_FONTS, prefs.bodyFont])
    ].filter((font) => font.length > 0);
    const totalCharacters = usages.reduce((total, usage) => total + usage.characters, 0);
    summary.textContent = `${usages.length} \u7A2E\u985E\u30FB\u5408\u8A08 ${totalCharacters.toLocaleString()} \u6587\u5B57\uFF08\u7A7A\u767D\u3092\u9664\u304F\uFF09`;
    for (const usage of usages) {
      const option = document.createElement("option");
      option.value = usage.name;
      option.textContent = usage.name;
      replaceFrom.appendChild(option.cloneNode(true));
      highlightSelect.appendChild(option);
    }
    const populateReplaceTargets = () => {
      const previous = replaceTo.value;
      replaceTo.innerHTML = "";
      for (const target of targets) {
        if (target === replaceFrom.value) continue;
        const option = document.createElement("option");
        option.value = target;
        option.textContent = target;
        replaceTo.appendChild(option);
      }
      if ([...replaceTo.options].some((option) => option.value === previous)) replaceTo.value = previous;
    };
    replaceFrom.onchange = populateReplaceTargets;
    populateReplaceTargets();
    setUpHighlightColorPicker("font-highlight", () => selectedFontHighlightColor, (color) => {
      selectedFontHighlightColor = color;
    });
    setUpHighlightColorPicker("style-highlight", () => selectedStyleHighlightColor, (color) => {
      selectedStyleHighlightColor = color;
    });
    for (const usage of usages) {
      const row = document.createElement("article");
      row.className = "font-stat";
      const name = document.createElement("strong");
      name.textContent = usage.name;
      const kind = document.createElement("span");
      kind.className = "font-kind";
      kind.textContent = usage.japanese ? "\u548C\u6587\u30D5\u30A9\u30F3\u30C8" : "\u6B27\u6587\u30D5\u30A9\u30F3\u30C8";
      const facts = document.createElement("span");
      facts.className = "font-facts";
      facts.textContent = `${usage.ranges} \u7B87\u6240\u30FB${usage.characters.toLocaleString()} \u6587\u5B57`;
      const sample = document.createElement("p");
      sample.className = "font-sample";
      sample.textContent = usage.name.toLowerCase() === "symbol" ? "\u30AE\u30EA\u30B7\u30E3\u6587\u5B57\u306A\u3069\u306B\u4F7F\u7528" : usage.sample ? `\u4F8B: ${truncate(usage.sample, 30)}` : "";
      row.append(name, kind, facts, sample);
      container.appendChild(row);
    }
    if (styleUsages.length === 0) {
      styleSummary.textContent = "\u592A\u5B57\u30FB\u659C\u4F53\u30FB\u4E0A\u4ED8\u304D\u30FB\u4E0B\u4ED8\u304D\u306E\u6587\u5B57\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002";
    } else {
      const total = styleUsages.reduce((count, usage) => count + usage.characters, 0);
      styleSummary.textContent = `${styleUsages.length} \u7A2E\u985E\u30FB\u5408\u8A08 ${total.toLocaleString()} \u6587\u5B57`;
      for (const usage of styleUsages) {
        const item = document.createElement("span");
        item.className = "style-stat";
        item.innerHTML = `<strong>${usage.label}</strong>${usage.characters.toLocaleString()} \u6587\u5B57`;
        styleUsage.appendChild(item);
        const option = document.createElement("option");
        option.value = usage.style;
        option.textContent = `${usage.label}\uFF08${usage.characters.toLocaleString()} \u6587\u5B57\uFF09`;
        styleReplaceFrom.appendChild(option.cloneNode(true));
        styleHighlightSelect.appendChild(option);
      }
    }
    const populateStyleTargets = () => {
      const source = styleReplaceFrom.value;
      styleReplaceTo.innerHTML = "";
      const normal = document.createElement("option");
      normal.value = "normal";
      normal.textContent = "\u901A\u5E38\uFF08\u88C5\u98FE\u306A\u3057\uFF09";
      styleReplaceTo.appendChild(normal);
      for (const style of CHARACTER_STYLES) {
        if (style.style === source) continue;
        const option = document.createElement("option");
        option.value = style.style;
        option.textContent = style.label;
        styleReplaceTo.appendChild(option);
      }
    };
    styleReplaceFrom.onchange = populateStyleTargets;
    populateStyleTargets();
    if (note !== void 0) setStatus(note);
  }
  async function replaceSelectedFont() {
    const from = byId("font-replace-from").value;
    const to = byId("font-replace-to").value;
    if (!from || !to || from === to) {
      setStatus("\u7570\u306A\u308B\u5143\u306E\u30D5\u30A9\u30F3\u30C8\u3068\u7F6E\u63DB\u5148\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus(`\u300C${from}\u300D\u3092\u300C${to}\u300D\u306B\u7F6E\u63DB\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const n = await replaceFontEverywhere(from, to, options());
    if (n === 0) {
      setStatus(`\u300C${from}\u300D\u306E\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002`);
      return;
    }
    await replaceFonts(`\u300C${from}\u300D\u306E ${n} \u7B87\u6240\u3092\u300C${to}\u300D\u306B\u7F6E\u63DB\u3057\u307E\u3057\u305F\uFF08\u53D6\u308A\u6D88\u3057\u306F \u2318Z\uFF09\u3002`);
  }
  async function highlightSelectedFont() {
    var _a;
    const select = byId("font-highlight-select");
    const color = selectedFontHighlightColor;
    const name = select.value;
    if (!name || !color) {
      setStatus("\u5148\u306B\uFF3B\u30D5\u30A9\u30F3\u30C8\uFF3D\u3092\u958B\u3044\u3066\u66F8\u4F53\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus(`\u300C${name}\u300D\u3092\u5F37\u8ABF\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const n = await highlightFontEverywhere(name, color, options());
    if (n > 0) {
      const colors = (_a = paintedFonts.get(name)) != null ? _a : /* @__PURE__ */ new Set();
      colors.add(color);
      paintedFonts.set(name, colors);
    }
    setStatus(
      n > 0 ? `\u300C${name}\u300D\u306E ${n} \u7B87\u6240\u3092\u5F37\u8ABF\u3057\u307E\u3057\u305F\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u5857\u308A\u3092\u524A\u9664\uFF3D\u3002` : `\u300C${name}\u300D\u306E\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
    );
  }
  async function highlightSelectedCompoundLabel() {
    var _a;
    const label = byId("compound-highlight-select").value;
    if (!label) {
      setStatus("\u5148\u306B\uFF3B\u5316\u5408\u7269\uFF3D\u3092\u958B\u3044\u3066\u756A\u53F7\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus(`\u5316\u5408\u7269 ${label} \u3092\u5F37\u8ABF\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const n = await highlightCompoundLabelEverywhere(label, selectedCompoundHighlightColor, options());
    if (n > 0) {
      const colors = (_a = paintedCompoundLabels.get(label)) != null ? _a : /* @__PURE__ */ new Set();
      colors.add(selectedCompoundHighlightColor);
      paintedCompoundLabels.set(label, colors);
    }
    setStatus(
      n > 0 ? `\u5316\u5408\u7269 ${label} \u306E ${n} \u7B87\u6240\u3092\u5F37\u8ABF\u3057\u307E\u3057\u305F\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u5857\u308A\u3092\u524A\u9664\uFF3D\u3002` : `\u5316\u5408\u7269 ${label} \u306E\u7B87\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
    );
  }
  async function highlightSelectedReferenceNumber() {
    var _a;
    const number = Number(byId("reference-highlight-select").value);
    const numberOnly = byId("reference-highlight-number-only").checked;
    if (!Number.isInteger(number) || number < 1) {
      setStatus("\u5148\u306B\uFF3B\u6587\u732E\uFF3D\u3092\u958B\u3044\u3066\u756A\u53F7\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus(`\u6587\u732E [${number}] \u3092\u5F37\u8ABF\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const n = await highlightReferenceNumberEverywhere(number, selectedReferenceHighlightColor, numberOnly, options());
    if (n > 0) {
      const painted2 = numberOnly ? paintedReferenceNumbers : paintedReferenceMarkers;
      const colors = (_a = painted2.get(number)) != null ? _a : /* @__PURE__ */ new Set();
      colors.add(selectedReferenceHighlightColor);
      painted2.set(number, colors);
    }
    setStatus(
      n > 0 ? `\u6587\u732E [${number}] \u306E ${n} \u7B87\u6240\u3092${numberOnly ? "\u756A\u53F7\u3060\u3051" : "\u5F15\u7528\u8A18\u53F7\u3054\u3068"}\u5F37\u8ABF\u3057\u307E\u3057\u305F\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u5857\u308A\u3092\u524A\u9664\uFF3D\u3002` : `\u6587\u732E [${number}] \u306E\u672C\u6587\u4E2D\u306E\u5F15\u7528\u306F\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002`
    );
  }
  async function replaceSelectedCharacterStyle() {
    var _a, _b;
    const from = byId("style-replace-from").value;
    const to = byId("style-replace-to").value;
    const fromLabel = (_a = CHARACTER_STYLES.find((style) => style.style === from)) == null ? void 0 : _a.label;
    const toLabel = to === "normal" ? "\u901A\u5E38\u306E\u6587\u5B57" : (_b = CHARACTER_STYLES.find((style) => style.style === to)) == null ? void 0 : _b.label;
    if (!from || !to || from === to || !fromLabel || !toLabel) {
      setStatus("\u7570\u306A\u308B\u5143\u306E\u66F8\u4F53\u3068\u7F6E\u63DB\u5148\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus(`${fromLabel}\u3092${toLabel}\u3078\u7F6E\u63DB\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const n = await replaceCharacterStyleEverywhere(from, to, options());
    if (n === 0) {
      setStatus(`${fromLabel}\u306E\u6587\u5B57\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002`);
      return;
    }
    await replaceFonts(`${fromLabel}\u306E ${n} \u6587\u5B57\u3092${toLabel}\u306B\u7F6E\u63DB\u3057\u307E\u3057\u305F\uFF08\u53D6\u308A\u6D88\u3057\u306F \u2318Z\uFF09\u3002`);
  }
  async function highlightSelectedCharacterStyle() {
    var _a, _b;
    const style = byId("style-highlight-select").value;
    const label = (_a = CHARACTER_STYLES.find((item) => item.style === style)) == null ? void 0 : _a.label;
    if (!style || !label) {
      setStatus("\u5148\u306B\uFF3B\u6587\u5B57\uFF3D\u3092\u958B\u3044\u3066\u66F8\u4F53\u3092\u9078\u3093\u3067\u304F\u3060\u3055\u3044\u3002");
      return;
    }
    setStatus(`${label}\u3092\u5F37\u8ABF\u3057\u3066\u3044\u307E\u3059\u2026`, true);
    const n = await highlightCharacterStyleEverywhere(style, selectedStyleHighlightColor, options());
    if (n > 0) {
      const colors = (_b = paintedCharacterStyles.get(style)) != null ? _b : /* @__PURE__ */ new Set();
      colors.add(selectedStyleHighlightColor);
      paintedCharacterStyles.set(style, colors);
    }
    setStatus(
      n > 0 ? `${label}\u306E ${n} \u6587\u5B57\u3092\u5F37\u8ABF\u3057\u307E\u3057\u305F\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u5857\u308A\u3092\u524A\u9664\uFF3D\u3002` : `${label}\u306E\u6587\u5B57\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u4E00\u89A7\u3092\u4F5C\u308A\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002`
    );
  }
  async function highlightSpaces() {
    setStatus("\u30B9\u30DA\u30FC\u30B9\u3092\u5F37\u8ABF\u3057\u3066\u3044\u307E\u3059\u2026", true);
    const n = await highlightAllSpaces({
      ...options(),
      halfSpaceColor: selectedHalfSpaceColor,
      fullSpaceColor: selectedFullSpaceColor
    });
    paintedSpaces = true;
    setStatus(`${n} \u7B87\u6240\u306E\u30B9\u30DA\u30FC\u30B9\u3092\u5857\u308A\u307E\u3057\u305F\u3002\u7247\u4ED8\u3051\u306F\uFF3B\u30A2\u30C9\u30A4\u30F3\u306E\u5857\u308A\u3092\u524A\u9664\uFF3D\u3002`);
  }
  function remember(findings) {
    const seen = new Set(painted.map(ignoreKey));
    painted = [...painted, ...findings.filter((f) => !seen.has(ignoreKey(f)))];
  }
  async function clearHighlights2() {
    setStatus("\u3053\u306E\u30A2\u30C9\u30A4\u30F3\u304C\u5857\u3063\u305F\u7B87\u6240\u3092\u6D88\u53BB\u4E2D\u2026", true);
    const blind = painted.length === 0;
    const findingCount = await clearHighlights(options(), {
      findings: blind ? selected() : painted,
      spaces: paintedSpaces || blind
    });
    const fontCount = await clearFontHighlightsEverywhere(paintedFonts, options());
    const styleCount = await clearCharacterStyleHighlightsEverywhere(paintedCharacterStyles, options());
    const compoundCount = await clearCompoundLabelHighlightsEverywhere(paintedCompoundLabels, options());
    const referenceMarkerCount = await clearReferenceNumberHighlightsEverywhere(paintedReferenceMarkers, false, options());
    const referenceNumberCount = await clearReferenceNumberHighlightsEverywhere(paintedReferenceNumbers, true, options());
    const n = findingCount + fontCount + styleCount + compoundCount + referenceMarkerCount + referenceNumberCount;
    painted = [];
    paintedSpaces = false;
    paintedFonts.clear();
    paintedCharacterStyles.clear();
    paintedCompoundLabels.clear();
    paintedReferenceMarkers.clear();
    paintedReferenceNumbers.clear();
    setStatus(
      n === 0 ? "\u6D88\u305B\u308B\u30CF\u30A4\u30E9\u30A4\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u624B\u3067\u5857\u3063\u305F\u30DE\u30FC\u30AB\u30FC\u3054\u3068\u6D88\u3059\u306B\u306F\u3001\u30EA\u30DC\u30F3\u306E\uFF3B\u30CF\u30A4\u30E9\u30A4\u30C8\u3092\u5168\u3066\u524A\u9664\uFF3D\u3092\u4F7F\u3063\u3066\u304F\u3060\u3055\u3044\u3002" : `${n} \u7B87\u6240\u306E\u30CF\u30A4\u30E9\u30A4\u30C8\u3092\u6D88\u53BB\u3057\u307E\u3057\u305F\uFF08\u624B\u3067\u5857\u3063\u305F\u30DE\u30FC\u30AB\u30FC\u306F\u6B8B\u3057\u3066\u3044\u307E\u3059\uFF09\u3002`
    );
  }
})();
//# sourceMappingURL=taskpane.js.map
