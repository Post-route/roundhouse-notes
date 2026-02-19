import { useState, useMemo, useEffect, useRef, useCallback } from "react";

// ── ROUTE DATA ─────────────────────────────────────────────────────────────
const ROUTES = {
  "route-14": {
    id: "route-14",
    name: "Route 14 – Ruan Minor",
    van: "Van",
    depot: "Halston DO",
    collection: "Foaumay",
    areas: ["Ruan Minor","Treal","Treleague","Ruan Minor Village","Treworder","Chapel Terrace","Cadgwith","Ledra Close","Bruggan","St Ruan","Poltesco","Kuggar","Kennack","Tresadderne"],
    stops: [
      {n:1,name:"Eglos Farm",postcode:"TR12 7TL"},
      {n:2,name:"St. Heleria",postcode:"TR12 7LH"},
      {n:3,name:"Rose In The Valley",postcode:"TR12 7LH",note:"Next right"},
      {n:4,name:"Mill View",postcode:"TR12 7LH",note:"All post in box"},
      {n:5,name:"Melynithon",postcode:"TR12 7LH",note:"Turn left"},
      {n:6,name:"Windmill Bungalow",postcode:"TR12 7LH"},
      {n:7,name:"Windmill Cottage",postcode:"TR12 7LH"},
      {n:8,name:"The Barn, Windmill Cottage",postcode:"TR12 7LH"},
      {n:9,name:"Sunny Corner Cottage",postcode:"TR12 7LW"},
      {n:10,name:"St. Ruan Croft",postcode:"TR12 7LW",note:"Box at end of lane"},
      {n:11,name:"Treveddon Farm",postcode:"TR12 7LW"},
      {n:12,name:"Little Treveddon",postcode:"TR12 7LW"},
      {n:13,name:"Parc Bush",postcode:"TR12 7JR"},
      {n:14,name:"Krista",postcode:"TR12 7JR"},
      {n:15,name:"Trevose",postcode:"TR12 7JR",note:"Park on road - hazards"},
      {n:16,name:"1 Plain An Gwarry, Ebenezer Road",postcode:"TR12 7GF"},
      {n:17,name:"2 Plain An Gwarry, Ebenezer Road",postcode:"TR12 7GF"},
      {n:18,name:"3 Plain An Gwarry, Ebenezer Road",postcode:"TR12 7GF",note:"Dog!"},
      {n:19,name:"4 Plain An Gwarry, Ebenezer Road",postcode:"TR12 7GF"},
      {n:20,name:"5 Plain An Gwarry, Ebenezer Road",postcode:"TR12 7GF"},
      {n:21,name:"6 Plain An Gwarry, Ebenezer Road",postcode:"TR12 7GF"},
      {n:22,name:"BonaVista",postcode:"TR12 7JR"},
      {n:23,name:"Meadowdene",postcode:"TR12 7JR"},
      {n:24,name:"Wheldon",postcode:"TR12 7JR"},
      {n:25,name:"Kelvin Mor",postcode:"TR12 7JR"},
      {n:26,name:"Rose Cottage",postcode:"TR12 7JR"},
      {n:27,name:"Rozen Furniture, Cherry Tree Workshop",postcode:"TR12 7JR"},
      {n:28,name:"Cherry Tree House",postcode:"TR12 7JR"},
      {n:29,name:"Tresco",postcode:"TR12 7JR"},
      {n:30,name:"The Glanis",postcode:"TR12 7LS"},
      {n:31,name:"Treal House",postcode:"TR12 7LS"},
      {n:32,name:"Lower Treal",postcode:"TR12 7LS"},
      {n:33,name:"Skyber, Treal",postcode:"TR12 7LS"},
      {n:34,name:"Treal Lodge",postcode:"TR12 7LS"},
      {n:35,name:"The Bullpen, Higher Farm",postcode:"TR12 7LS"},
      {n:36,name:"Higher Treal Farm",postcode:"TR12 7LS"},
      {n:37,name:"Perghenn",postcode:"TR12 7LS"},
      {n:38,name:"Little Treleague",postcode:"TR12 7JP"},
      {n:39,name:"Treleague Farm",postcode:"TR12 7JP"},
      {n:40,name:"Trekenwyn, Treleague Farm",postcode:"TR12 7JP"},
      {n:41,name:"White House Farm",postcode:"TR12 7JP"},
      {n:42,name:"White Cottage",postcode:"TR12 7JP"},
      {n:43,name:"Rumon Cottage",postcode:"TR12 7JP"},
      {n:44,name:"Avalon",postcode:"TR12 7JN"},
      {n:45,name:"Long Reach",postcode:"TR12 7JN"},
      {n:46,name:"Ruan Vean",postcode:"TR12 7JN"},
      {n:47,name:"Sherwood",postcode:"TR12 7JN"},
      {n:48,name:"1 Glebe Terrace",postcode:"TR12 7JN"},
      {n:49,name:"2 Glebe Terrace",postcode:"TR12 7JN"},
      {n:50,name:"3 Glebe Terrace",postcode:"TR12 7JN"},
      {n:51,name:"4 Glebe Terrace",postcode:"TR12 7JN"},
      {n:52,name:"5 Glebe Terrace",postcode:"TR12 7JN"},
      {n:53,name:"Ruan Minor Village Hall",postcode:"TR12 7JN"},
      {n:54,name:"Conro",postcode:"TR12 7JN"},
      {n:55,name:"Trevaze House",postcode:"TR12 7JN"},
      {n:56,name:"The Studio",postcode:"TR12 7JN"},
      {n:57,name:"New Thatch",postcode:"TR12 7JN"},
      {n:58,name:"Maen Veor Cottage",postcode:"TR12 7JN"},
      {n:59,name:"The Old Forge",postcode:"TR12 7JN"},
      {n:60,name:"Grade Ruan C Of E School",postcode:"TR12 7JN"},
      {n:61,name:"Bay View House",postcode:"TR12 7JL"},
      {n:62,name:"St Marys",postcode:"TR12 7JL"},
      {n:63,name:"The Old Post Office",postcode:"TR12 7JL"},
      {n:64,name:"Clahar Dene",postcode:"TR12 7JL"},
      {n:65,name:"Tremanmor",postcode:"TR12 7JL"},
      {n:66,name:"Treworder Farm",postcode:"TR12 7JL"},
      {n:67,name:"Tremogh",postcode:"TR12 7JL"},
      {n:68,name:"The Bull Pens",postcode:"TR12 7JL"},
      {n:69,name:"Treworder Dairy",postcode:"TR12 7JL"},
      {n:70,name:"Treworder",postcode:"TR12 7JL"},
      {n:71,name:"Crabbers Watch",postcode:"TR12 7JL"},
      {n:72,name:"Grade Ruan Recreation Ground",postcode:"TR12 7JL"},
      {n:73,name:"Annas Cottage",postcode:"TR12 7JL"},
      {n:74,name:"Fuchsia Cottage",postcode:"TR12 7JL"},
      {n:75,name:"Gwelmor",postcode:"TR12 7JL"},
      {n:76,name:"Linden Lea",postcode:"TR12 7JL"},
      {n:77,name:"Well Cottage",postcode:"TR12 7JL"},
      {n:78,name:"Greystones",postcode:"TR12 7JL"},
      {n:79,name:"Verbena",postcode:"TR12 7JL"},
      {n:80,name:"Mallards",postcode:"TR12 7JN"},
      {n:81,name:"Ellesvane",postcode:"TR12 7JL"},
      {n:82,name:"Flat 1, The Cedars",postcode:"TR12 7JL"},
      {n:83,name:"Flat 2, The Cedars",postcode:"TR12 7JL"},
      {n:84,name:"Flat 3, The Cedars",postcode:"TR12 7JL"},
      {n:85,name:"Trenoweth",postcode:"TR12 7JL"},
      {n:86,name:"The Haven",postcode:"TR12 7JL"},
      {n:87,name:"Old Bus House Cottage",postcode:"TR12 7JL"},
      {n:88,name:"Yellow Fish Cottage",postcode:"TR12 7JL"},
      {n:89,name:"Rockspray",postcode:"TR12 7JL"},
      {n:90,name:"Monte Carlo",postcode:"TR12 7JL"},
      {n:91,name:"Carlton Cottage",postcode:"TR12 7JL"},
      {n:92,name:"Chy-Elowen",postcode:"TR12 7JL"},
      {n:93,name:"Ruan Post Office",postcode:"TR12 7JL",note:"Collect pouch and returns",type:"collection",qr:"RUAN_POST_OFFICE"},
      {n:94,name:"Cam Du",postcode:"TR12 7JL"},
      {n:95,name:"Ruan Minor Stores",postcode:"TR12 7JL"},
      {n:96,name:"Ealing House",postcode:"TR12 7JL"},
      {n:97,name:"6 Chapel Terrace",postcode:"TR12 7JT"},
      {n:98,name:"5 Chapel Terrace",postcode:"TR12 7JT"},
      {n:99,name:"4 Chapel Terrace",postcode:"TR12 7JT"},
      {n:100,name:"3 Chapel Terrace",postcode:"TR12 7JT"},
      {n:101,name:"2 Chapel Terrace",postcode:"TR12 7JT"},
      {n:102,name:"1 Chapel Terrace",postcode:"TR12 7JT"},
      {n:103,name:"Chy An Praze",postcode:"TR12 7JT"},
      {n:104,name:"Ivylewell",postcode:"TR12 7JT"},
      {n:105,name:"Trerice",postcode:"TR12 7JT"},
      {n:106,name:"Highbarn",postcode:"TR12 7JT"},
      {n:107,name:"Mermaid Cottage",postcode:"TR12 7JT"},
      {n:108,name:"Sryher House",postcode:"TR12 7JT"},
      {n:109,name:"The Retreat",postcode:"TR12 7JL"},
      {n:110,name:"Penmaur",postcode:"TR12 7JL"},
      {n:111,name:"Rainbows End",postcode:"TR12 7JT"},
      {n:112,name:"Seascape",postcode:"TR12 7JL"},
      {n:113,name:"Gweltek",postcode:"TR12 7JT"},
      {n:114,name:"Penreenes",postcode:"TR12 7JT"},
      {n:115,name:"Creggan Veor",postcode:"TR12 7JT"},
      {n:116,name:"Chyreen",postcode:"TR12 7JT"},
      {n:117,name:"Braeside",postcode:"TR12 7JT"},
      {n:118,name:"Penolva",postcode:"TR12 7JT"},
      {n:119,name:"Bodrigy Lodge",postcode:"TR12 7JU"},
      {n:120,name:"Bodrigy",postcode:"TR12 7JU"},
      {n:121,name:"Seaview",postcode:"TR12 7JT"},
      {n:122,name:"Tremarne",postcode:"TR12 7JT"},
      {n:123,name:"Maenvor",postcode:"TR12 7JU"},
      {n:124,name:"The Orchard",postcode:"TR12 7JU"},
      {n:125,name:"Renee's Cottage",postcode:"TR12 7JU"},
      {n:126,name:"The Cott",postcode:"TR12 7JU"},
      {n:127,name:"Cliff Cottage",postcode:"TR12 7JU"},
      {n:128,name:"The Corner House",postcode:"TR12 7JU"},
      {n:129,name:"Chy-War-Dinas",postcode:"TR12 7JU"},
      {n:130,name:"Tregwyn",postcode:"TR12 7JU"},
      {n:131,name:"Square Cottage",postcode:"TR12 7JU"},
      {n:132,name:"Sharkeys",postcode:"TR12 7JU"},
      {n:133,name:"The Sea Rose",postcode:"TR12 7JU"},
      {n:134,name:"Man-O-War",postcode:"TR12 7JU"},
      {n:135,name:"Clifton Cottage",postcode:"TR12 7JU"},
      {n:136,name:"Smyrna",postcode:"TR12 7JX"},
      {n:137,name:"Tamarisk",postcode:"TR12 7JX"},
      {n:138,name:"Bay View Cottage",postcode:"TR12 7JX"},
      {n:139,name:"Cadgwith Cove Inn",postcode:"TR12 7JX"},
      {n:140,name:"The Vine Cottage",postcode:"TR12 7JX"},
      {n:141,name:"Pebbles",postcode:"TR12 7JX"},
      {n:142,name:"The Old Cellars",postcode:"TR12 7JU"},
      {n:143,name:"Annexe, The Old Cellars",postcode:"TR12 7JU"},
      {n:144,name:"Cove Cottage",postcode:"TR12 7JX"},
      {n:145,name:"Rose Cottage",postcode:"TR12 7JX"},
      {n:146,name:"3 Jimmers Court",postcode:"TR12 7JU"},
      {n:147,name:"2 Jimmers Court",postcode:"TR12 7JU"},
      {n:148,name:"1 Jimmers Court",postcode:"TR12 7JU"},
      {n:149,name:"Stream Cottage",postcode:"TR12 7JX"},
      {n:150,name:"Toe Watch House",postcode:"TR12 7JX"},
      {n:151,name:"Steamers House",postcode:"TR12 7JX"},
      {n:152,name:"The Crows Nest Gallery",postcode:"TR12 7JX"},
      {n:153,name:"Kiddly-Wink",postcode:"TR12 7JX"},
      {n:154,name:"Ship Cottage",postcode:"TR12 7JX"},
      {n:155,name:"Veronica",postcode:"TR12 7JY"},
      {n:156,name:"Little Ship Load",postcode:"TR12 7JY"},
      {n:157,name:"Dummers Loft",postcode:"TR12 7JX"},
      {n:158,name:"Beach Cottage",postcode:"TR12 7JX"},
      {n:159,name:"Todden Cottage",postcode:"TR12 7JX"},
      {n:160,name:"Little Todden",postcode:"TR12 7JX"},
      {n:161,name:"Long Loft",postcode:"TR12 7JY"},
      {n:162,name:"Pink Cottage",postcode:"TR12 7JY"},
      {n:163,name:"Kinsale",postcode:"TR12 7JY"},
      {n:164,name:"Rooks",postcode:"TR12 7JY"},
      {n:165,name:"Nook",postcode:"TR12 7JY"},
      {n:166,name:"Ynys Loft",postcode:"TR12 7JY"},
      {n:167,name:"Mengarth",postcode:"TR12 7JY"},
      {n:168,name:"Spinnaker",postcode:"TR12 7JZ"},
      {n:169,name:"Polvellan",postcode:"TR12 7JY"},
      {n:170,name:"Lovain",postcode:"TR12 7JY"},
      {n:171,name:"Coth Lytherna",postcode:"TR12 7JY"},
      {n:172,name:"Little Sandcastle",postcode:"TR12 7JY"},
      {n:173,name:"Pentilla",postcode:"TR12 7JY"},
      {n:174,name:"Citrine",postcode:"TR12 7JY"},
      {n:175,name:"Seagulls Cry",postcode:"TR12 7JY"},
      {n:176,name:"Sowenna",postcode:"TR12 7JY"},
      {n:177,name:"Welfield",postcode:"TR12 7JY"},
      {n:178,name:"Mount Pleasant",postcode:"TR12 7JY"},
      {n:179,name:"Gwel An Watershed",postcode:"TR12 7JY"},
      {n:180,name:"Peny Craig",postcode:"TR12 7JZ"},
      {n:181,name:"1 Ruminella View",postcode:"TR12 7JZ"},
      {n:182,name:"2 Ruminella View",postcode:"TR12 7JZ"},
      {n:183,name:"3 Coastguard Houses (Serpentine Design)",postcode:"TR12 7JZ"},
      {n:184,name:"3 Ruminella View",postcode:"TR12 7JZ",note:"Same area"},
      {n:185,name:"4 Ruminella View",postcode:"TR12 7JZ"},
      {n:186,name:"5 Ruminella View",postcode:"TR12 7JZ"},
      {n:187,name:"6 Ruminella View",postcode:"TR12 7JZ"},
      {n:188,name:"Meneghiji",postcode:"TR12 7JZ"},
      {n:189,name:"Ruminella House",postcode:"TR12 7JZ"},
      {n:190,name:"Tregastel",postcode:"TR12 7JZ"},
      {n:191,name:"3 Ledra Close",postcode:"TR12 7LD"},
      {n:192,name:"4 Ledra Close",postcode:"TR12 7LD"},
      {n:193,name:"5 Ledra Close",postcode:"TR12 7LD"},
      {n:194,name:"6 Ledra Close (Gwelanmor)",postcode:"TR12 7LD"},
      {n:195,name:"7 Ledra Close (Seaview)",postcode:"TR12 7LD"},
      {n:196,name:"8 Ledra Close (Hillfield)",postcode:"TR12 7LD"},
      {n:197,name:"9 Ledra Close",postcode:"TR12 7LD"},
      {n:198,name:"10 Ledra Close (Bellucia)",postcode:"TR12 7LD"},
      {n:199,name:"11 Ledra Close (Goldcrest)",postcode:"TR12 7LD"},
      {n:200,name:"12 Ledra Close",postcode:"TR12 7LD"},
      {n:201,name:"13 Ledra Close (Merrivale)",postcode:"TR12 7LD"},
      {n:202,name:"14 Ledra Close (Kamaka)",postcode:"TR12 7LD"},
      {n:203,name:"15 Ledra Close (Goverside)",postcode:"TR12 7LD"},
      {n:204,name:"16 Ledra Close (Greystones)",postcode:"TR12 7LD",note:"Dog guard - red"},
      {n:205,name:"17 Ledra Close",postcode:"TR12 7LD"},
      {n:206,name:"18 Ledra Close",postcode:"TR12 7LD"},
      {n:207,name:"19 Ledra Close (Dropped Anchor)",postcode:"TR12 7LD"},
      {n:208,name:"1 Ledra Close (Ancarva)",postcode:"TR12 7LD"},
      {n:209,name:"2 Ledra Close",postcode:"TR12 7LD"},
      {n:210,name:"Vind",postcode:"TR12 7LD",note:"Car park on left, in post box"},
      {n:211,name:"Bryn-Mor",postcode:"TR12 7JZ"},
      {n:212,name:"Malahat",postcode:"TR12 7JZ",note:"On top, first right, in box"},
      {n:213,name:"Sodrogan House, Bruggan",postcode:"TR12 7LQ",note:"In box"},
      {n:214,name:"Ruanwell Bungalow, Bruggan",postcode:"TR12 7LQ"},
      {n:215,name:"The Orchard, Bruggan",postcode:"TR12 7LQ"},
      {n:216,name:"Bungalow, Bruggan",postcode:"TR12 7LQ"},
      {n:217,name:"The Gate House",postcode:"TR12 7LQ"},
      {n:218,name:"Higher Ledra",postcode:"TR12 7LQ"},
      {n:219,name:"Grade Cottage",postcode:"TR12 7LQ"},
      {n:220,name:"Bramley Cottage",postcode:"TR12 7LQ"},
      {n:221,name:"Prazegooth Cottage",postcode:"TR12 7LQ"},
      {n:222,name:"Trewidden",postcode:"TR12 7LQ"},
      {n:223,name:"Holly Tree Cottage",postcode:"TR12 7LQ"},
      {n:224,name:"Hillside",postcode:"TR12 7LQ"},
      {n:225,name:"Flat 7, Ingewidden",postcode:"TR12 7LA"},
      {n:226,name:"Flat Elm, Ingewidden",postcode:"TR12 7LA"},
      {n:227,name:"Flat Serpentine, Ingewidden",postcode:"TR12 7LA"},
      {n:228,name:"Flat 4, Ingewidden",postcode:"TR12 7LA"},
      {n:229,name:"Flat 5, Ingewidden",postcode:"TR12 7LA"},
      {n:230,name:"Flat 6, Ingewidden",postcode:"TR12 7LA"},
      {n:231,name:"Willowfield",postcode:"TR12 7LB"},
      {n:232,name:"Marlea",postcode:"TR12 7LB"},
      {n:233,name:"Moorlands",postcode:"TR12 7LB"},
      {n:234,name:"Bryher Cottage",postcode:"TR12 7LB"},
      {n:235,name:"Green Roofs",postcode:"TR12 7LB"},
      {n:236,name:"Annexe Green Roofs",postcode:"TR12 7LB"},
      {n:237,name:"Carrick Luz",postcode:"TR12 7LB"},
      {n:238,name:"Channel View",postcode:"TR12 7LB"},
      {n:239,name:"Toe Coach House",postcode:"TR12 7LB"},
      {n:240,name:"Polrose",postcode:"TR12 7LB"},
      {n:241,name:"Yesnaby",postcode:"TR12 7LB"},
      {n:242,name:"Argallack",postcode:"TR12 7LB"},
      {n:243,name:"Argallack Mews",postcode:"TR12 7LB"},
      {n:244,name:"Goonhilly",postcode:"TR12 7LB"},
      {n:245,name:"Mon Abri",postcode:"TR12 7LB"},
      {n:246,name:"Place",postcode:"TR12 7LB"},
      {n:247,name:"Massetts Court",postcode:"TR12 7LB"},
      {n:248,name:"Chapel Cottage",postcode:"TR12 7LB"},
      {n:249,name:"Carsilgy",postcode:"TR12 7LB"},
      {n:250,name:"High Assets",postcode:"TR12 7LB"},
      {n:251,name:"Greywings",postcode:"TR12 7LB"},
      {n:252,name:"Riverside",postcode:"TR12 7JS"},
      {n:253,name:"Ledra Mill",postcode:"TR12 7JS"},
      {n:254,name:"St Ruan Close",postcode:"TR12 7JS"},
      {n:255,name:"St Ruan House",postcode:"TR12 7JS"},
      {n:256,name:"Rumons Cottage",postcode:"TR12 7JS"},
      {n:257,name:"Trescovean",postcode:"TR12 7JS"},
      {n:258,name:"Ocklynge",postcode:"TR12 7JS"},
      {n:259,name:"St Ruan Farm",postcode:"TR12 7JS"},
      {n:260,name:"St Ruan Meadow",postcode:"TR12 7JS"},
      {n:261,name:"St Ruan Barn",postcode:"TR12 7JS"},
      {n:262,name:"St Rumons House",postcode:"TR12 7JS"},
      {n:263,name:"Glyn House",postcode:"TR12 7JS"},
      {n:264,name:"Chylin",postcode:"TR12 7JS"},
      {n:265,name:"Meadowside",postcode:"TR12 7JS"},
      {n:266,name:"Glenelg",postcode:"TR12 7JS"},
      {n:267,name:"3 Pras Coombe, St. Ruan",postcode:"TR12 7JS"},
      {n:268,name:"2 Pras Coombe, St. Ruan",postcode:"TR12 7JS"},
      {n:269,name:"1 Pras Coombe, St. Ruan",postcode:"TR12 7JS"},
      {n:270,name:"4 Pras Coombe, St. Ruan",postcode:"TR12 7JS",note:"Post box"},
      {n:271,name:"Rosemerryn",postcode:"TR12 7JR"},
      {n:272,name:"Trelowarth",postcode:"TR12 7JS"},
      {n:273,name:"Sunlea",postcode:"TR12 7JR"},
      {n:274,name:"Chy An Deyleck",postcode:"TR12 7JS",note:"New build"},
      {n:275,name:"Cam-Mar",postcode:"TR12 7JR"},
      {n:276,name:"Yukon",postcode:"TR12 7JR"},
      {n:277,name:"Hazel Tree House",postcode:"TR12 7JR"},
      {n:278,name:"Chy-Ula",postcode:"TR12 7JR",note:"Cross roads"},
      {n:279,name:"Caerleon Cottage",postcode:"TR12 7LR"},
      {n:280,name:"Millstone Cottage",postcode:"TR12 7LR"},
      {n:281,name:"Poltesco Mill House",postcode:"TR12 7LR"},
      {n:282,name:"Poltesco Mill",postcode:"TR12 7LR"},
      {n:283,name:"Carteon House",postcode:"TR12 7LR"},
      {n:284,name:"Poltesco Farm",postcode:"TR12 7LR"},
      {n:285,name:"Poltesco House",postcode:"TR12 7LR"},
      {n:286,name:"Primrose Cottage",postcode:"TR12 7LR",note:"Reverse in lane, turn right"},
      {n:287,name:"Polstangey Praze",postcode:"TR12 7LS"},
      {n:288,name:"Polstangey Bungalow",postcode:"TR12 7LS"},
      {n:289,name:"Valley View",postcode:"TR12 7LU"},
      {n:290,name:"Corgenick Barn",postcode:"TR12 7LU"},
      {n:291,name:"Thistledome",postcode:"TR12 7LU"},
      {n:292,name:"Corgenick Cottage",postcode:"TR12 7LU",note:"Right at crossroads"},
      {n:293,name:"Myresyke",postcode:"TR12 7LU"},
      {n:294,name:"Far View",postcode:"TR12 7LU"},
      {n:295,name:"Kennack Bay House",postcode:"TR12 7LU"},
      {n:296,name:"Enys View",postcode:"TR12 7LY"},
      {n:297,name:"Kuggar Farm",postcode:"TR12 7LX"},
      {n:298,name:"Lowam",postcode:"TR12 7LX"},
      {n:299,name:"Mirayaden",postcode:"TR12 7LX"},
      {n:300,name:"Kuggar House",postcode:"TR12 7LX"},
      {n:301,name:"Chycarne Bungalow",postcode:"TR12 7LX"},
      {n:302,name:"Chycarne Chalet & Caravan Park",postcode:"TR12 7LX"},
      {n:303,name:"Kennack Sands Park",postcode:"TR12 7LT",note:"Holiday park"},
      {n:304,name:"Acres Holiday Park",postcode:"TR12 7LT"},
      {n:305,name:"Kennack Sands Beach Cafe",postcode:"TR12 7LT"},
      {n:306,name:"The Beach",postcode:"TR12 7LX"},
      {n:307,name:"7 The Beach",postcode:"TR12 7LX"},
      {n:308,name:"6 The Beach",postcode:"TR12 7LX"},
      {n:309,name:"5 The Beach",postcode:"TR12 7LX"},
      {n:310,name:"4 The Beach",postcode:"TR12 7LX"},
      {n:311,name:"3 The Beach",postcode:"TR12 7LX"},
      {n:312,name:"2 The Beach",postcode:"TR12 7LX"},
      {n:313,name:"Kennack Sands Pottery",postcode:"TR12 7LX"},
      {n:314,name:"Cleethorpes",postcode:"TR12 7LX"},
      {n:315,name:"Crig-A-Tana",postcode:"TR12 7LX"},
      {n:316,name:"Mist",postcode:"TR12 7LX"},
      {n:317,name:"Gwilkynek",postcode:"TR12 7LY"},
      {n:318,name:"Downas Cottage",postcode:"TR12 7LY"},
      {n:319,name:"Pentira",postcode:"TR12 7LY"},
      {n:320,name:"Cookies Barn",postcode:"TR12 7LY"},
      {n:321,name:"Bramble Cottage",postcode:"TR12 7LY"},
      {n:322,name:"The Poplars",postcode:"TR12 7LY"},
      {n:323,name:"Roscarne",postcode:"TR12 7LY"},
      {n:324,name:"Rose Cottage",postcode:"TR12 7LY"},
      {n:325,name:"Chy Dowr",postcode:"TR12 7LY"},
      {n:326,name:"Kingey Vean",postcode:"TR12 7LY"},
      {n:327,name:"The Stables",postcode:"TR12 7LY"},
      {n:328,name:"Greepy Meadows Farm",postcode:"TR12 7LY"},
      {n:329,name:"Blackberry Cottage",postcode:"TR12 7LY"},
      {n:330,name:"Holly Cottage",postcode:"TR12 7LY"},
      {n:331,name:"Fishermans Cottage",postcode:"TR12 7LY"},
      {n:332,name:"Holly Lodge House",postcode:"TR12 7LY"},
      {n:333,name:"Marshty",postcode:"TR12 7LY"},
      {n:334,name:"Skyber Lowen",postcode:"TR12 7LY"},
      {n:335,name:"Ambergate",postcode:"TR12 7LY"},
      {n:336,name:"Namparra",postcode:"TR12 7LY"},
      {n:337,name:"4 Council Houses",postcode:"TR12 7LY"},
      {n:338,name:"3 Council Houses",postcode:"TR12 7LY"},
      {n:339,name:"Coth Devera",postcode:"TR12 7LY"},
      {n:340,name:"2 Council Houses",postcode:"TR12 7LY"},
      {n:341,name:"April Cottage",postcode:"TR12 7LY"},
      {n:342,name:"Cargey Cottage",postcode:"TR12 7LY"},
      {n:343,name:"Gwealgues Inn",postcode:"TR12 7LY"},
      {n:344,name:"Kingey",postcode:"TR12 7LY"},
      {n:345,name:"Trerise Farm",postcode:"TR12 7NA"},
      {n:346,name:"Treglynn",postcode:"TR12 7NA"},
      {n:347,name:"The Granary",postcode:"TR12 7NA"},
      {n:348,name:"Tresadderne Farm House",postcode:"TR12 7NA",note:"Post box opposite"},
      {n:349,name:"Lowena, Tresadderne",postcode:"TR12 7NA"},
      {n:350,name:"Tresadderne Court",postcode:"TR12 7NA"},
      {n:351,name:"Chybarles",postcode:"TR12 7NA"},
      {n:352,name:"Bonaventure Animal Sanctuary",postcode:"TR12 7NA",note:"Post box"},
      {n:353,name:"Karn Mera Farm",postcode:"TR12 7NA",note:"Left, in box"},
      {n:354,name:"Pons-Medda",postcode:"TR12 7NA"},
      {n:355,name:"Crowgey Farm",postcode:"TR12 7NA"},
      {n:356,name:"The Pines",postcode:"TR12 7NA"},
      {n:357,name:"Trelugga",postcode:"TR12 7NB"},
      {n:358,name:"Parc En Crouse",postcode:"TR12 7NB"},
    ]
  }
};

// ── POSTCODE COORDINATES (geocoded via postcodes.io) ────────────────────────
const PC_COORDS = {
  "TR12 7TL": [50.001, -5.222],   // Eglos Farm approx
  "TR12 7LH": [49.994426, -5.215946],
  "TR12 7LW": [49.997714, -5.200521],
  "TR12 7JR": [49.995678, -5.189528],
  "TR12 7GF": [49.996459, -5.190249],
  "TR12 7LS": [50.001118, -5.186371],
  "TR12 7JP": [49.995171, -5.186703],
  "TR12 7JN": [49.993849, -5.182429],
  "TR12 7JL": [49.994145, -5.180816],
  "TR12 7JT": [49.991932, -5.182791],
  "TR12 7JU": [49.987980, -5.179614],
  "TR12 7JX": [49.987468, -5.179887],
  "TR12 7JY": [49.987621, -5.180902],
  "TR12 7JZ": [49.988567, -5.182457],
  "TR12 7LD": [49.988268, -5.183205],
  "TR12 7LQ": [49.985690, -5.196457],
  "TR12 7LA": [49.986707, -5.182055],
  "TR12 7LB": [49.985648, -5.184581],
  "TR12 7JS": [49.991950, -5.187355],
  "TR12 7LR": [49.997702, -5.177101],
  "TR12 7LU": [50.001687, -5.179737],
  "TR12 7LY": [50.005236, -5.177612],
  "TR12 7LX": [50.004263, -5.175007],
  "TR12 7LT": [50.004199, -5.170453],
  "TR12 7NA": [50.006346, -5.193529],
  "TR12 7NB": [50.013573, -5.204828],
};

// ── NOTE CLASSIFIERS ────────────────────────────────────────────────────────
const getNoteType = (note) => {
  if (!note) return null;
  const l = note.toLowerCase();
  if (l.includes("dog")) return "dog";
  if (l.includes("box") || l.includes("scan code")) return "postbox";
  if (l.includes("hazard") || l.includes("reverse") || l.includes("park on road")) return "hazard";
  if (l.includes("new build")) return "newbuild";
  return "info";
};

const NOTE_ICONS = { dog:"🐕", postbox:"📬", hazard:"⚠️", newbuild:"🏗️", info:"💬" };
const NOTE_COLORS = { dog:"#e05252", postbox:"#e87e2e", hazard:"#f5c518", newbuild:"#4caf8d", info:"#6ea8d8" };

const OUTCOME_ICONS  = { delivered:"✅", no_access:"🚫", no_answer:"🔔", neighbour:"🤝" };
const OUTCOME_LABELS = { delivered:"Delivered", no_access:"No access", no_answer:"No answer", neighbour:"Left with neighbour" };

// ── VOICE ────────────────────────────────────────────────────────────────────
let preferredVoice = null;

const pickVoice = () => {
  if (!("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  // Prefer female UK voices; fall back to female US rather than male Daniel
  preferredVoice =
    voices.find(v => v.name === "Kate") ||      // iOS UK female (if downloaded)
    voices.find(v => v.name === "Serena") ||    // iOS UK alt female
    voices.find(v => v.name === "Samantha") ||  // iOS US female (beats Daniel)
    voices.find(v => v.lang === "en-GB" && !v.name.toLowerCase().includes("daniel")) ||
    voices.find(v => v.lang.startsWith("en") && !v.name.toLowerCase().includes("daniel")) ||
    voices.find(v => v.lang.startsWith("en")) ||
    null;
  return preferredVoice;
};

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = pickVoice;
  setTimeout(pickVoice, 100);
  setTimeout(pickVoice, 800); // iOS sometimes loads voices late
}

const speak = (text) => {
  if (!("speechSynthesis" in window) || !text) return;
  if (!preferredVoice) pickVoice();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.voice = preferredVoice || null;
  u.rate = 0.88;
  u.pitch = 1.1;
  u.volume = 1;
  window.speechSynthesis.cancel();
  // iOS needs a tick after cancel() or speech silently fails
  setTimeout(() => window.speechSynthesis.speak(u), 60);
};

const speakStop = (s) => {
  if (!s) return;
  const name = String(s.name || "").trim();
  const pc = String(s.postcode || "").trim().toUpperCase();
  const note = String(s.note || "").trim();
  const prefix = s.type === "collection" ? "Collection." : "Stop.";
  const noteSpeech = note
    ? " Notes: " + note.replace(/\n+/g, ". ").replace(/;/g, ". ")
    : "";
  speak(`${prefix} ${name}. ${pc ? "Postcode " + pc + "." : ""}${noteSpeech}`);
};

// Search helpers
const normalise = s => String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
const searchStops = (query, stops) => {
  const q = normalise(query);
  if (!q) return [];
  return stops.filter(s =>
    (normalise(s.name) + " " + normalise(s.note) + " " + normalise(s.postcode)).includes(q)
  );
};

// Zone indicator for frame sorting
const getZone = (pct) => {
  if (pct < 0.2) return { label: "VERY TOP",  color: "#2563eb" };
  if (pct < 0.4) return { label: "EARLY",     color: "#059669" };
  if (pct < 0.6) return { label: "MIDDLE",    color: "#d97706" };
  if (pct < 0.8) return { label: "LATE",      color: "#dc2626" };
  return             { label: "END",       color: "#7c3aed" };
};

// Human-readable label from QR box ID: "RUAN_POST_OFFICE" → "Ruan Post Office"
const boxLabel = (qrId) =>
  qrId.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

// ── jsQR CDN loader (used on iOS/Safari where BarcodeDetector is absent) ─────
const loadJsQR = () => new Promise((resolve, reject) => {
  if (window.jsQR) { resolve(window.jsQR); return; }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js";
  s.onload = () => resolve(window.jsQR);
  s.onerror = () => reject(new Error("jsQR failed to load"));
  document.head.appendChild(s);
});

// ── Leaflet CDN loader ───────────────────────────────────────────────────────
const loadLeaflet = () => new Promise((resolve, reject) => {
  if (window.L) { resolve(window.L); return; }
  if (!document.getElementById("leaflet-css")) {
    const link = document.createElement("link");
    link.id = "leaflet-css";
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }
  const s = document.createElement("script");
  s.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  s.onload = () => resolve(window.L);
  s.onerror = () => reject(new Error("Leaflet failed to load"));
  document.head.appendChild(s);
});

// Fan stops that share the same postcode centroid into a small circle
function jitterAround(lat, lng, k, i) {
  if (k <= 1) return [lat, lng];
  const r = 16; // spread radius in metres
  const angle = (2 * Math.PI * i) / k;
  const dLat = (r / 111111) * Math.cos(angle);
  const dLng = (r / (111111 * Math.cos((lat * Math.PI) / 180))) * Math.sin(angle);
  return [lat + dLat, lng + dLng];
}

function markerStyle(s, isCurrent) {
  if (isCurrent)           return { radius: 10, color: "#E21A22", fillColor: "#E21A22", fillOpacity: 1, weight: 3 };
  if (s.type === "adhoc")  return { radius: 6,  color: "#7c3aed", fillColor: "#a78bfa", fillOpacity: 0.9, weight: 1.5 };
  if (s.type === "collection") return { radius: 5, color: "#e87e2e", fillColor: "#e87e2e", fillOpacity: 1, weight: 1.5 };
  return { radius: 5, color: "#1d4ed8", fillColor: "#fff", fillOpacity: 1, weight: 1.5 };
}

// ── SPEECH RECOGNITION ───────────────────────────────────────────────────────
const recognise = () => new Promise((resolve, reject) => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { reject(new Error("not supported")); return; }
  const r = new SR();
  r.lang = "en-GB";
  r.interimResults = false;
  r.maxAlternatives = 1;
  r.onresult = e => resolve(String(e.results[0][0].transcript).trim());
  r.onerror = e => reject(new Error(e.error));
  r.onnomatch = () => reject(new Error("no match"));
  r.start();
});

// ── MAP VIEW COMPONENT ───────────────────────────────────────────────────────
function MapView({ stops, currentStop, onGoTo }) {
  const divRef = useRef(null);
  const stateRef = useRef({ map: null, L: null, markerMap: new Map(), prevIdx: null, gpsDot: null, gpsAcc: null, gpsWatchId: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [gpsOn, setGpsOn] = useState(false);
  const missingCount = stops.filter(s => s.type !== "adhoc" && !PC_COORDS[s.postcode]).length;

  // Init map once
  useEffect(() => {
    let cancelled = false;
    const st = stateRef.current;
    loadLeaflet().then(L => {
      if (cancelled || !divRef.current || st.map) return;
      st.L = L;
      const map = L.map(divRef.current, { zoomControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
      st.map = map;

      // Group stops by postcode centroid key (adhoc use GPS coords directly)
      const groups = new Map();
      stops.forEach((s, idx) => {
        const c = (s.type === "adhoc" && s.lat && s.lng) ? [s.lat, s.lng] : PC_COORDS[s.postcode];
        if (!c) return;
        const key = `${c[0].toFixed(6)},${c[1].toFixed(6)}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push({ s, idx, lat: c[0], lng: c[1] });
      });

      const allCoords = [];
      groups.forEach(arr => {
        arr.forEach(({ s, idx, lat, lng }, i) => {
          const [jLat, jLng] = jitterAround(lat, lng, arr.length, i);
          allCoords.push([jLat, jLng]);
          const isCurrent = idx === currentStop;
          const m = L.circleMarker([jLat, jLng], markerStyle(s, isCurrent))
            .addTo(map)
            .on("click", () => onGoTo(idx));
          st.markerMap.set(idx, m);
        });
      });

      st.prevIdx = currentStop;
      if (allCoords.length) map.fitBounds(L.latLngBounds(allCoords), { padding: [24, 24] });
      setLoading(false);
    }).catch(e => { if (!cancelled) { setError(String(e.message)); setLoading(false); } });

    return () => {
      cancelled = true;
      const st = stateRef.current;
      if (st.gpsWatchId != null) { navigator.geolocation.clearWatch(st.gpsWatchId); st.gpsWatchId = null; }
      if (st.map) { st.map.remove(); st.map = null; st.markerMap = new Map(); st.gpsDot = null; st.gpsAcc = null; }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update current stop marker + pan
  useEffect(() => {
    const { map, markerMap, prevIdx } = stateRef.current;
    if (!map) return;
    // Reset previous
    if (prevIdx != null && prevIdx !== currentStop) {
      const prev = markerMap.get(prevIdx);
      if (prev) prev.setStyle(markerStyle(stops[prevIdx], false));
    }
    // Highlight current
    const cur = markerMap.get(currentStop);
    if (cur) {
      cur.setStyle(markerStyle(stops[currentStop], true));
      map.panTo(cur.getLatLng(), { animate: true });
    }
    stateRef.current.prevIdx = currentStop;
  }, [currentStop, stops]);

  // GPS toggle
  const toggleGPS = () => {
    const { map, L } = stateRef.current;
    if (!map || !L) return;
    const st = stateRef.current;

    if (gpsOn) {
      if (st.gpsWatchId != null) { navigator.geolocation.clearWatch(st.gpsWatchId); st.gpsWatchId = null; }
      if (st.gpsDot) { map.removeLayer(st.gpsDot); st.gpsDot = null; }
      if (st.gpsAcc) { map.removeLayer(st.gpsAcc); st.gpsAcc = null; }
      setGpsOn(false);
      return;
    }

    if (!("geolocation" in navigator)) { alert("Geolocation not available."); return; }
    setGpsOn(true);

    st.gpsWatchId = navigator.geolocation.watchPosition(pos => {
      const { latitude: lat, longitude: lng, accuracy } = pos.coords;
      if (!st.gpsDot) {
        st.gpsDot = L.circleMarker([lat, lng], { radius: 8, color: "#2563eb", fillColor: "#60a5fa", fillOpacity: 0.9, weight: 2 }).addTo(map);
        st.gpsAcc  = L.circle([lat, lng], { radius: Math.max(accuracy, 5), color: "#2563eb", fillColor: "#93c5fd", fillOpacity: 0.15, weight: 1 }).addTo(map);
      } else {
        st.gpsDot.setLatLng([lat, lng]);
        st.gpsAcc.setLatLng([lat, lng]);
        st.gpsAcc.setRadius(Math.max(accuracy, 5));
      }
    }, err => { alert(err.message || "GPS error"); setGpsOn(false); },
    { enableHighAccuracy: true, maximumAge: 4000, timeout: 15000 });
  };

  return (
    <div>
      {loading && <div style={{padding:"20px 16px", color:MUTED, fontSize:"13px"}}>Loading map…</div>}
      {error && <div style={{padding:"20px 16px", color:"#e05252", fontSize:"13px"}}>Map error: {error}</div>}
      {!loading && missingCount > 0 && (
        <div style={{padding:"6px 16px", fontSize:"11px", color:"#e87e2e", background:"#fff8f0", borderBottom:"1px solid #f0e0cc"}}>
          ⚠ {missingCount} stop(s) have no map coords
        </div>
      )}
      {!loading && (
        <div style={{padding:"6px 12px", display:"flex", gap:"8px", borderBottom:`1px solid ${BORDER}`, background:CARD}}>
          <button onClick={toggleGPS} style={{fontSize:"12px", padding:"5px 12px", borderRadius:"6px", border:`1px solid ${gpsOn ? "#2563eb" : BORDER}`, background: gpsOn ? "#eff6ff" : CARD, color: gpsOn ? "#2563eb" : MUTED, cursor:"pointer", fontWeight:600}}>
            {gpsOn ? "📍 Tracking" : "📍 Show me"}
          </button>
          <div style={{fontSize:"11px", color:MUTED, alignSelf:"center"}}>🔴 current · 🔵 stop · 🟠 collection · 🟣 added</div>
        </div>
      )}
      <div ref={divRef} style={{width:"100%", height:`calc(100vh - ${loading ? 148 : (missingCount > 0 ? 202 : 184)}px)`, visibility: loading ? "hidden" : "visible"}} />
    </div>
  );
}

// ── QR SCANNER COMPONENT ─────────────────────────────────────────────────────
function QRScanView({ onScan }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const [status, setStatus] = useState("idle"); // "idle"|"starting"|"scanning"|"done"|"error"
  const [statusMsg, setStatusMsg] = useState("");
  const [manualInput, setManualInput] = useState("");

  const stopAll = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const v = videoRef.current;
    if (v) { try { v.pause(); v.srcObject = null; } catch {} }
    const s = streamRef.current;
    if (s) { try { s.getTracks().forEach(t => t.stop()); } catch {} streamRef.current = null; }
  }, []);

  const startCamera = useCallback(async () => {
    stopAll();
    setStatus("starting");
    setStatusMsg("Starting camera…");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("No camera API");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      streamRef.current = stream;
      const v = videoRef.current;
      if (!v) throw new Error("Video element missing");
      v.srcObject = stream;
      v.setAttribute("playsinline", "true");
      await v.play();

      if ("BarcodeDetector" in window) {
        setStatus("scanning"); setStatusMsg("Scanning…");
        const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
        const tick = async () => {
          try {
            const codes = await detector.detect(v);
            if (codes?.length) { const t = String(codes[0].rawValue || "").trim(); if (t) { setStatus("done"); setStatusMsg("✓ Got it"); onScan(t); stopAll(); return; } }
          } catch {}
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // iOS/Safari fallback: jsQR via CDN
      setStatus("starting"); setStatusMsg("Loading QR engine…");
      const jsQR = await loadJsQR();
      setStatus("scanning"); setStatusMsg("Scanning…");
      const c = canvasRef.current;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      const tick = () => {
        const w = v.videoWidth, h = v.videoHeight;
        if (w > 0 && h > 0) {
          c.width = w; c.height = h;
          ctx.drawImage(v, 0, 0, w, h);
          const img = ctx.getImageData(0, 0, w, h);
          const code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
          if (code?.data) { const t = String(code.data).trim(); if (t) { setStatus("done"); setStatusMsg("✓ Got it"); onScan(t); stopAll(); return; } }
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } catch (e) {
      setStatus("error"); setStatusMsg(String(e?.message || e));
      stopAll();
    }
  }, [onScan, stopAll]);

  // Auto-start on mount
  useEffect(() => { startCamera(); return () => stopAll(); }, [startCamera, stopAll]);

  const scanning = status === "scanning";

  return (
    <div style={{padding:"16px 16px 100px"}}>
      {/* Status */}
      <div style={{fontSize:"11px",color: status==="error" ? "#e05252" : status==="done" ? "#4caf3d" : "#666", letterSpacing:"1px", marginBottom:"10px", textTransform:"uppercase"}}>
        {statusMsg || "Initialising…"}
      </div>

      {/* Camera view */}
      <div style={styles.scanFrame}>
        <video ref={videoRef} muted playsInline style={styles.scanVideo} />
        <canvas ref={canvasRef} style={{display:"none"}} />
        {scanning && (
          <div style={styles.scanOverlay}>
            <div style={styles.scanTarget} />
            <div style={styles.scanHint}>Point at QR code</div>
          </div>
        )}
        {(status === "idle" || status === "starting") && (
          <div style={styles.scanOverlay}><div style={styles.scanSpinner}>{statusMsg || "Starting…"}</div></div>
        )}
        {status === "error" && (
          <div style={styles.scanOverlay}><div style={{color:"#e05252",fontSize:"13px",textAlign:"center",padding:"0 24px"}}>{statusMsg}</div></div>
        )}
      </div>

      {/* Restart/Stop controls */}
      <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
        <button style={{...styles.navBtn, flex:1}} onClick={startCamera}>↺ Restart</button>
        <button style={{...styles.navBtn}} onClick={stopAll}>■ Stop</button>
      </div>

      {/* Manual input fallback */}
      <div style={{marginTop:"20px"}}>
        <div style={styles.scanManualLabel}>Manual / Test input</div>
        <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
          <input
            style={{...styles.searchInput, marginBottom:0, flex:1}}
            placeholder="e.g. BOX:RUAN_POST_OFFICE"
            value={manualInput}
            onChange={e => setManualInput(e.target.value)}
          />
          <button
            style={styles.scanSubmitBtn}
            onClick={() => { if (manualInput.trim()) { onScan(manualInput.trim()); setManualInput(""); } }}
          >Go</button>
        </div>
        <div style={styles.scanExamples}>
          {["BOX:RUAN_POST_OFFICE","STOP:TR12 7JL","STOP:TR12 7LH"].map(ex => (
            <span key={ex} style={styles.pcChip} onClick={() => onScan(ex)}>{ex}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
export default function PostieApp() {
  const [activeRouteId] = useState("route-14");
  const [currentStop, setCurrentStop] = useState(() => {
    try { const v = parseInt(localStorage.getItem("postie-stop") || "0", 10); return isNaN(v) ? 0 : v; }
    catch { return 0; }
  });
  const [view, setView] = useState("walk"); // "walk" | "search" | "list" | "routes" | "scan"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [completed, setCompleted] = useState(() => {
    try { const raw = localStorage.getItem("postie-completed"); return raw ? new Set(JSON.parse(raw)) : new Set(); }
    catch { return new Set(); }
  });
  const [frameNum, setFrameNum] = useState(1);
  const [frameQuery, setFrameQuery] = useState("");
  const [events, setEvents] = useState(() => {
    try { const raw = localStorage.getItem("postie-events"); return raw ? JSON.parse(raw) : []; }
    catch { return []; }
  });
  // Show resume banner only when app loads with a saved non-zero position
  const [resumed, setResumed] = useState(() => {
    try { return parseInt(localStorage.getItem("postie-stop") || "0", 10) > 0; }
    catch { return false; }
  });
  const activeRef = useRef(null);

  const route = ROUTES[activeRouteId];
  const [stops, setStops] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("postie-stops-v1") || "null");
      if (Array.isArray(saved) && saved.length) return saved;
    } catch {}
    return route.stops;
  });
  const [adhocPhase, setAdhocPhase] = useState(null); // null | "gps" | "listening" | "done"
  const [editingFrame, setEditingFrame] = useState(false);

  const stop = stops[currentStop];
  const prevStop = currentStop > 0 ? stops[currentStop - 1] : null;
  const nextStop = currentStop < stops.length - 1 ? stops[currentStop + 1] : null;

  // Postcode groups for list view
  const postcodeGroups = useMemo(() => {
    const groups = {};
    stops.forEach(s => {
      if (!groups[s.postcode]) groups[s.postcode] = [];
      groups[s.postcode].push(s);
    });
    return groups;
  }, [stops]);

  // Frame map: derive which frames are used + filter current frame
  const maxFrame = useMemo(() => {
    const used = stops.map(s => s.frame || 0).filter(Boolean);
    return used.length > 0 ? Math.max(...used) : 8;
  }, [stops]);

  const frameStops = useMemo(() => {
    const q = frameQuery.trim().toLowerCase().replace(/\s+/g, "");
    const inFrame = stops.filter(s => (s.frame || 0) === frameNum);
    if (!q) return inFrame;
    return inFrame.filter(s =>
      (s.name || "").toLowerCase().includes(q) ||
      (s.postcode || "").toLowerCase().replace(/\s+/g, "").includes(q) ||
      (s.note || "").toLowerCase().includes(q)
    );
  }, [stops, frameNum, frameQuery]);

  // Search — name + note + postcode
  useEffect(() => {
    setSearchResults(searchStops(searchQuery, stops));
  }, [searchQuery, stops]);

  // Persist position + completions to localStorage on every change
  useEffect(() => {
    try { localStorage.setItem("postie-stop", String(currentStop)); } catch {}
  }, [currentStop]);

  useEffect(() => {
    try { localStorage.setItem("postie-completed", JSON.stringify([...completed])); } catch {}
  }, [completed]);

  useEffect(() => {
    try { localStorage.setItem("postie-events", JSON.stringify(events)); } catch {}
  }, [events]);

  useEffect(() => {
    try { localStorage.setItem("postie-stops-v1", JSON.stringify(stops)); } catch {}
  }, [stops]);

  const markCompleted = (n) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n); else next.add(n);
      return next;
    });
  };

  const goTo = (idx) => {
    setCurrentStop(idx);
    setView("walk");
  };

  const startOver = () => {
    setCurrentStop(0);
    setCompleted(new Set());
    setEvents([]);
    setResumed(false);
    try { localStorage.removeItem("postie-stop"); localStorage.removeItem("postie-completed"); localStorage.removeItem("postie-events"); } catch {}
  };

  const logOutcome = (kind) => {
    const stopN = stops[currentStop].n;
    const now = Date.now();
    setEvents(prev => {
      if (prev.find(e => e.stop === stopN && e.kind === kind && now - e.ts < 10000)) return prev;
      return [...prev, { ts: now, routeId: activeRouteId, stop: stopN, kind }];
    });
    if (kind === "neighbour") {
      setCompleted(prev => { const n = new Set(prev); n.add(stopN); return n; });
    }
    speak(OUTCOME_LABELS[kind] + " logged.");
  };

  // Reset frame editing state when stop changes
  useEffect(() => { setEditingFrame(false); }, [currentStop]);

  const saveFrame = (val) => {
    const v = val.trim().toUpperCase();
    setStops(prev => prev.map(s => s.n === stop.n ? { ...s, frame: v || undefined } : s));
    setEditingFrame(false);
  };

  const addHouseAfterCurrentStop = async () => {
    if (adhocPhase) return; // already in progress
    setAdhocPhase("gps");
    speak("Getting position.");
    let lat, lng;
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 })
      );
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
    } catch (e) {
      setAdhocPhase(null);
      alert(e?.message || "GPS unavailable — try outside.");
      return;
    }
    setAdhocPhase("listening");
    speak("Say the name.");
    let name = "";
    try {
      name = await recognise();
    } catch {
      name = (window.prompt("House name (e.g. Rose Cottage behind farm):") || "").trim();
    }
    if (!name) { setAdhocPhase(null); return; }
    const newStop = { n: Date.now(), name, postcode: "", type: "adhoc", lat, lng };
    setStops(prev => {
      const next = [...prev];
      next.splice(currentStop + 1, 0, newStop);
      return next;
    });
    setCurrentStop(i => i + 1);
    setAdhocPhase("done");
    speak("Added: " + name);
    setTimeout(() => setAdhocPhase(null), 2000);
  };

  const copySummary = () => {
    const date = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const counts = {};
    events.forEach(e => { counts[e.kind] = (counts[e.kind] || 0) + 1; });
    let text = `${route.name}\n${date}\n\n`;
    text += `Delivered: ${completed.size}\n`;
    if (counts.no_access) text += `No access: ${counts.no_access}\n`;
    if (counts.no_answer) text += `No answer: ${counts.no_answer}\n`;
    if (counts.neighbour) text += `Left with neighbour: ${counts.neighbour}\n`;
    if (events.length) {
      text += `\nEXCEPTIONS:\n`;
      events.forEach(e => {
        const s = stops.find(st => st.n === e.stop);
        const t = new Date(e.ts).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
        text += `• #${e.stop} ${s?.name || "?"} ${s?.postcode || ""} – ${OUTCOME_LABELS[e.kind]} (${t})\n`;
      });
    }
    try { navigator.clipboard.writeText(text).then(() => speak("Summary copied."), () => alert(text)); }
    catch { alert(text); }
  };

  const exportJSON = () => {
    const data = { route: activeRouteId, date: new Date().toISOString(), completed: [...completed], events };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `postie-route14-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetDay = () => {
    if (!confirm("Reset today's log? Clears deliveries and exceptions, keeps your route.")) return;
    setCompleted(new Set());
    setEvents([]);
    setCurrentStop(0);
    setResumed(false);
    try { localStorage.removeItem("postie-completed"); localStorage.removeItem("postie-events"); localStorage.removeItem("postie-stop"); } catch {}
  };

  // ── QR HANDLER ──────────────────────────────────────────────────────────────
  // Normalise postcode: strip spaces, uppercase → "TR127LH"
  const normPc = (s) => s.toUpperCase().replace(/\s+/g, "");

  const handleQRScan = (text) => {
    const raw = text.trim();

    if (raw.startsWith("BOX:")) {
      const id = raw.slice(4).trim();
      const idx = stops.findIndex(s => s.qr === id);
      const matched = idx >= 0 ? stops[idx] : null;
      speakStop(matched || { name: boxLabel(id), postcode: "", note: "Check pouch and insert returns.", type: "collection" });
      if (idx >= 0) setCurrentStop(idx);
      setView("walk");

    } else if (raw.startsWith("STOP:")) {
      const pc = normPc(raw.slice(5));
      const idx = stops.findIndex(s => normPc(String(s.postcode || "")) === pc);
      if (idx >= 0) {
        speakStop(stops[idx]);
        setCurrentStop(idx);
        setView("walk");
      } else {
        speak("Postcode not found on this route.");
      }

    } else {
      // Last-ditch: treat raw as a bare postcode
      const pc = normPc(raw);
      const idx = stops.findIndex(s => normPc(String(s.postcode || "")) === pc);
      if (idx >= 0) {
        speakStop(stops[idx]);
        setCurrentStop(idx);
        setView("walk");
      } else {
        speak("Unrecognised code.");
      }
    }
  };

  const progress = Math.round((completed.size / stops.length) * 100);

  // Scroll active list item into view
  useEffect(() => {
    if (view === "list" && activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [view, currentStop]);

  const noteType = getNoteType(stop.note);

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a18; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }
        @keyframes slideUp { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        .stop-card { animation: slideUp 0.25s ease both; }
        .nav-btn:active { transform: scale(0.95); }
        .list-item:hover { background: rgba(255,255,255,0.04) !important; }
      `}</style>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>📮</span>
          <div>
            <div style={styles.routeName}>{route.name}</div>
            <div style={styles.routeMeta}>{route.depot} · {route.collection}</div>
          </div>
        </div>
        <div style={styles.progressChip}>
          <span style={styles.progressNum}>{completed.size}</span>
          <span style={styles.progressDen}>/{stops.length}</span>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={styles.progressBar}>
        <div style={{...styles.progressFill, width: `${progress}%`}} />
      </div>

      {/* NAV TABS */}
      <div style={styles.tabs}>
        {[["walk","🚶"],["scan","📷"],["frames","🗂"],["search","🔍"],["list","📋"],["routes","🗺"],["summary","📊"]].map(([id, label]) => (
          <button key={id} style={{...styles.tab, ...(view===id ? styles.tabActive : {})}} onClick={() => setView(id)}>
            {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={styles.content}>

        {/* ── SCAN VIEW ── */}
        {view === "scan" && (
          <QRScanView onScan={handleQRScan} />
        )}

        {/* ── FRAMES VIEW ── */}
        {view === "frames" && (
          <div style={{padding:"16px 16px 100px"}}>
            {/* Frame picker */}
            <div style={styles.frameHeader}>
              <span style={styles.frameTitle}>Frame {frameNum}</span>
              <span style={styles.frameCount}>{frameStops.length} stops</span>
            </div>
            <div style={styles.framePicker}>
              {Array.from({length: maxFrame}, (_, i) => i + 1).map(n => {
                const count = stops.filter(s => (s.frame || 0) === n).length;
                return (
                  <button
                    key={n}
                    style={{...styles.frameBtn, ...(n === frameNum ? styles.frameBtnActive : {})}}
                    onClick={() => { setFrameNum(n); setFrameQuery(""); }}
                  >
                    <span style={styles.frameBtnNum}>{n}</span>
                    {count > 0 && <span style={styles.frameBtnCount}>{count}</span>}
                  </button>
                );
              })}
            </div>

            {/* Search within frame */}
            <input
              style={{...styles.searchInput, marginBottom:"12px"}}
              placeholder='Name, postcode, note — e.g. "7LH" or "dog"'
              value={frameQuery}
              onChange={e => setFrameQuery(e.target.value)}
            />

            {/* Results */}
            {frameStops.length === 0 && (
              <div style={styles.frameEmpty}>
                {frameQuery ? "No matches in this frame." : "No stops tagged for frame " + frameNum + " yet."}
                <div style={{marginTop:"8px", fontSize:"11px", color:"#444"}}>
                  Add <code style={{color:"#f0a500"}}>frame: {frameNum}</code> to stops in the route data to populate this.
                </div>
              </div>
            )}
            {frameStops.map(s => {
              const nt = getNoteType(s.note);
              return (
                <div
                  key={s.n}
                  style={{...styles.frameItem, ...(completed.has(s.n) ? styles.frameItemDone : {})}}
                  onClick={() => goTo(stops.findIndex(x => x.n === s.n))}
                >
                  <div style={styles.frameItemLeft}>
                    <div style={styles.frameItemName}>{s.name}</div>
                    <div style={styles.frameItemCode}>{s.postcode}</div>
                    {s.note && <div style={{fontSize:"11px", color: NOTE_COLORS[nt], marginTop:"3px"}}>{NOTE_ICONS[nt]} {s.note}</div>}
                  </div>
                  <div style={styles.frameItemRight}>
                    <div style={styles.frameItemN}>#{s.n}</div>
                    {completed.has(s.n) && <div style={{fontSize:"11px", color:"#4caf3d"}}>✓</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── WALK VIEW ── */}
        {view === "walk" && (
          <div style={{padding:"16px 16px 100px"}}>
            {/* Resume banner */}
            {resumed && (
              <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(226,26,34,0.07)", border:`1px solid rgba(226,26,34,0.25)`, borderRadius:"8px", padding:"10px 12px", marginBottom:"14px", gap:"8px"}}>
                <span style={{fontSize:"12px", color:R, fontWeight:600}}>↩ Resumed at stop {currentStop + 1} of {stops.length}</span>
                <div style={{display:"flex", gap:"6px"}}>
                  <button onClick={startOver} style={{fontSize:"11px", color:MUTED, background:"transparent", border:`1px solid ${BORDER}`, borderRadius:"5px", padding:"3px 8px", cursor:"pointer"}}>Start over</button>
                  <button onClick={() => setResumed(false)} style={{fontSize:"12px", color:MUTED, background:"transparent", border:"none", cursor:"pointer", lineHeight:1}}>✕</button>
                </div>
              </div>
            )}
            {/* Stop card */}
            {(() => {
              const stopExceptions = events.filter(e => e.stop === stop.n && e.kind !== "delivered");
              const pct = (currentStop + 1) / stops.length;
              const zone = getZone(pct);
              return (
                <div className="stop-card" key={stop.n} style={styles.stopCard}>
                  {/* Zone / frame position indicator */}
                  <div style={{marginBottom:"14px"}}>
                    <div style={{fontSize:"22px", fontWeight:800, color:zone.color, letterSpacing:"1px", lineHeight:1, marginBottom:"6px"}}>{zone.label}</div>
                    <div style={{height:"10px", background:FAINT, borderRadius:"5px", overflow:"hidden"}}>
                      <div style={{height:"100%", width:`${Math.round(pct*100)}%`, background:zone.color, borderRadius:"5px", transition:"width 0.3s ease"}} />
                    </div>
                    <div style={{fontSize:"10px", color:MUTED, marginTop:"4px", letterSpacing:"0.5px"}}>{Math.round(pct*100)}% through round · stop {currentStop+1} of {stops.length}</div>
                  </div>
                  {/* Frame slot */}
                  <div style={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px", paddingBottom:"14px", borderBottom:`1px solid ${FAINT}`}}>
                    {editingFrame ? (
                      <input
                        autoFocus
                        defaultValue={stop.frame || ""}
                        placeholder="e.g. C14"
                        maxLength={6}
                        style={{fontSize:"26px", fontWeight:800, color:TEXT, border:`2px solid ${R}`, borderRadius:"8px", padding:"6px 12px", width:"120px", outline:"none", letterSpacing:"2px", textTransform:"uppercase"}}
                        onKeyDown={e => { if (e.key === "Enter") saveFrame(e.target.value); if (e.key === "Escape") setEditingFrame(false); }}
                        onBlur={e => saveFrame(e.target.value)}
                      />
                    ) : (
                      <>
                        <span style={{fontSize:"26px", fontWeight:800, color: stop.frame ? TEXT : MUTED, letterSpacing:"1px"}}>
                          {stop.frame ? `FRAME: ${stop.frame}` : "FRAME: —"}
                        </span>
                        <button onClick={() => setEditingFrame(true)} style={{fontSize:"11px", color: stop.frame ? MUTED : R, background:"transparent", border:`1px solid ${stop.frame ? BORDER : R}`, borderRadius:"5px", padding:"4px 10px", cursor:"pointer", fontWeight:600}}>
                          {stop.frame ? "✏️ Edit" : "Set"}
                        </button>
                      </>
                    )}
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"5px"}}>
                    <div style={styles.stopNumber}>#{stop.n}</div>
                    {stopExceptions.length > 0 && (
                      <div style={{display:"flex", gap:"4px", flexWrap:"wrap", justifyContent:"flex-end"}}>
                        {stopExceptions.map((e, i) => (
                          <span key={i} style={{fontSize:"10px", background:"rgba(232,126,46,0.1)", border:"1px solid rgba(232,126,46,0.3)", color:"#e87e2e", borderRadius:"20px", padding:"2px 7px", fontWeight:600}}>
                            {OUTCOME_ICONS[e.kind]} {new Date(e.ts).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  {stop.type === "adhoc" && (
                    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"8px"}}>
                      <span style={{fontSize:"10px", background:"rgba(124,58,237,0.1)", color:"#7c3aed", border:"1px solid rgba(124,58,237,0.3)", borderRadius:"20px", padding:"2px 8px", fontWeight:600}}>🟣 Added stop</span>
                      <button onClick={() => { setStops(prev => prev.filter(s => s.n !== stop.n)); setCurrentStop(c => Math.max(0, c - 1)); }} style={{fontSize:"11px", color:"#e05252", background:"transparent", border:"1px solid rgba(224,82,82,0.3)", borderRadius:"5px", padding:"3px 8px", cursor:"pointer"}}>✕ Remove</button>
                    </div>
                  )}
                  <div style={styles.stopName}>{stop.name}</div>
                  {stop.postcode && <div style={styles.stopPostcode}>{stop.postcode}</div>}
                  {stop.note && (
                    <div style={{...styles.noteChip, background: NOTE_COLORS[noteType] + "22", borderColor: NOTE_COLORS[noteType] + "66", color: NOTE_COLORS[noteType]}}>
                      {NOTE_ICONS[noteType]} {stop.note}
                    </div>
                  )}
                  <button
                    style={{...styles.doneBtn, ...(completed.has(stop.n) ? styles.doneBtnActive : {})}}
                    onClick={() => markCompleted(stop.n)}
                  >
                    {completed.has(stop.n) ? "✓ Delivered" : "Mark Delivered"}
                  </button>
                  {/* Outcome buttons */}
                  <div style={{display:"flex", gap:"6px", marginTop:"10px", paddingTop:"10px", borderTop:`1px solid ${FAINT}`}}>
                    {[{kind:"no_access",label:"🚫 No access"},{kind:"no_answer",label:"🔔 No answer"},{kind:"neighbour",label:"🤝 Neighbour"}].map(({kind, label}) => {
                      const logged = events.some(e => e.stop === stop.n && e.kind === kind);
                      return (
                        <button key={kind} onClick={() => logOutcome(kind)} style={{flex:1, padding:"7px 4px", fontSize:"10px", fontWeight:600, background: logged ? "rgba(232,126,46,0.1)" : "transparent", border:`1px solid ${logged ? "rgba(232,126,46,0.4)" : BORDER}`, borderRadius:"6px", color: logged ? "#e87e2e" : MUTED, cursor:"pointer"}}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Context — prev / next */}
            <div style={styles.contextRow}>
              {prevStop && (
                <div style={styles.contextCard} onClick={() => goTo(currentStop - 1)}>
                  <div style={styles.contextLabel}>← Previous</div>
                  <div style={styles.contextName}>{prevStop.name}</div>
                  <div style={styles.contextCode}>{prevStop.postcode}</div>
                </div>
              )}
              {nextStop && (
                <div style={{...styles.contextCard, ...styles.contextCardNext}} onClick={() => goTo(currentStop + 1)}>
                  <div style={styles.contextLabel}>Next →</div>
                  <div style={styles.contextName}>{nextStop.name}</div>
                  <div style={styles.contextCode}>{nextStop.postcode}</div>
                  {nextStop.note && <div style={{fontSize:"11px", color: NOTE_COLORS[getNoteType(nextStop.note)] || "#888", marginTop:4}}>{NOTE_ICONS[getNoteType(nextStop.note)]} {nextStop.note}</div>}
                </div>
              )}
            </div>

            {/* Nav buttons */}
            <div style={styles.navRow}>
              <button className="nav-btn" style={{...styles.navBtn, opacity: currentStop===0?0.3:1}} disabled={currentStop===0} onClick={() => { const i = currentStop - 1; setCurrentStop(i); speakStop(stops[i]); }}>
                ← Prev
              </button>
              <button style={{...styles.navBtn, flex:"none", padding:"13px 14px"}} onClick={() => speakStop(stop)} title="Speak current stop">🔊</button>
              <div style={styles.stopCounter}>{currentStop+1} of {stops.length}</div>
              <button className="nav-btn" style={{...styles.navBtn, ...styles.navBtnNext, opacity: currentStop===stops.length-1?0.3:1}} disabled={currentStop===stops.length-1} onClick={() => { const i = currentStop + 1; setCurrentStop(i); speakStop(stops[i]); }}>
                Next →
              </button>
              <button
                onClick={addHouseAfterCurrentStop}
                disabled={!!adhocPhase}
                title="Add unlisted house after this stop (GPS + voice)"
                style={{...styles.navBtn, flex:"none", padding:"13px 14px", background: adhocPhase === "done" ? "#4caf3d" : adhocPhase ? "#f5f0ff" : CARD, borderColor: adhocPhase ? "#7c3aed" : BORDER, color: adhocPhase ? "#7c3aed" : MUTED, opacity: 1}}
              >
                {adhocPhase === "gps" ? "📍" : adhocPhase === "listening" ? "🎤" : adhocPhase === "done" ? "✓" : "➕"}
              </button>
            </div>
          </div>
        )}

        {/* ── SEARCH VIEW ── */}
        {view === "search" && (
          <div style={{padding:"16px 16px 100px"}}>
            <input
              style={styles.searchInput}
              placeholder="Search name, street, note, postcode…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key !== "Enter") return;
                const first = searchResults[0];
                if (first) { goTo(stops.findIndex(x => x.n === first.n)); setSearchQuery(""); }
                else speak("No match.");
              }}
              autoFocus
            />
            {searchQuery && (
              <div style={styles.searchMeta}>{searchResults.length} result{searchResults.length !== 1 ? "s" : ""}</div>
            )}
            {!searchQuery && (
              <div style={styles.searchHint}>
                <p>Search any address or postcode on this route.</p>
                <p style={{marginTop:8, opacity:0.5}}>Postcodes on this route:</p>
                <div style={styles.postcodeList}>
                  {Object.keys(postcodeGroups).map(pc => (
                    <span key={pc} style={styles.pcChip} onClick={() => setSearchQuery(pc)}>{pc}</span>
                  ))}
                </div>
              </div>
            )}
            {searchResults.map(s => (
              <div key={s.n} style={styles.searchResult} onClick={() => goTo(stops.findIndex(x => x.n === s.n))}>
                <div style={styles.srLeft}>
                  <div style={styles.srNum}>#{s.n}</div>
                  <div>
                    <div style={styles.srName}>{s.name}</div>
                    <div style={styles.srCode}>{s.postcode}</div>
                  </div>
                </div>
                {s.note && <div style={{fontSize:"11px", color: NOTE_COLORS[getNoteType(s.note)], whiteSpace:"nowrap"}}>{NOTE_ICONS[getNoteType(s.note)]}</div>}
                {completed.has(s.n) && <div style={styles.srDone}>✓</div>}
              </div>
            ))}
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {view === "list" && (
          <div style={{padding:"0 0 100px"}}>
            {Object.entries(postcodeGroups).map(([pc, group]) => (
              <div key={pc}>
                <div style={styles.pcHeader}>{pc}</div>
                {group.map(s => (
                  <div
                    key={s.n}
                    ref={s.n === stop.n ? activeRef : null}
                    className="list-item"
                    style={{...styles.listItem, ...(s.n === stop.n ? styles.listItemActive : {}), ...(completed.has(s.n) ? styles.listItemDone : {})}}
                    onClick={() => goTo(stops.findIndex(x => x.n === s.n))}
                  >
                    <div style={styles.liNum}>{s.n}</div>
                    <div style={styles.liBody}>
                      <div style={styles.liName}>{s.name}</div>
                      {s.note && <div style={{fontSize:"11px", color: NOTE_COLORS[getNoteType(s.note)], marginTop:2}}>{NOTE_ICONS[getNoteType(s.note)]} {s.note}</div>}
                    </div>
                    {completed.has(s.n) && <div style={styles.liCheck}>✓</div>}
                    {s.n === stop.n && <div style={styles.liCurrent}>▶</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── MAP VIEW ── */}
        {view === "routes" && (
          <MapView stops={stops} currentStop={currentStop} onGoTo={goTo} />
        )}

        {/* ── SUMMARY VIEW ── */}
        {view === "summary" && (() => {
          const counts = {};
          events.forEach(e => { counts[e.kind] = (counts[e.kind] || 0) + 1; });
          const exceptions = events.filter(e => e.kind !== "delivered");
          const dateStr = new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long" });
          return (
            <div style={{padding:"16px 16px 100px"}}>
              <div style={{fontSize:"11px", color:MUTED, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"16px"}}>{dateStr}</div>

              {/* Totals grid */}
              <div style={styles.statsGrid}>
                {[{kind:"delivered",label:"Delivered"},{kind:"no_access",label:"No access"},{kind:"no_answer",label:"No answer"},{kind:"neighbour",label:"Neighbour"}].map(({kind,label}) => (
                  <div key={kind} style={styles.statCard}>
                    <div style={{fontSize:"20px", marginBottom:"4px"}}>{OUTCOME_ICONS[kind]}</div>
                    <div style={styles.statVal}>{kind === "delivered" ? completed.size : (counts[kind] || 0)}</div>
                    <div style={styles.statLabel}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Exceptions list */}
              {exceptions.length > 0 && (
                <>
                  <div style={{fontSize:"11px", color:MUTED, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginTop:"20px", marginBottom:"10px"}}>
                    Exceptions · {exceptions.length}
                  </div>
                  {exceptions.map((e, i) => {
                    const s = stops.find(st => st.n === e.stop);
                    const t = new Date(e.ts).toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"});
                    return (
                      <div key={i} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 14px", background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", marginBottom:"6px", cursor:"pointer"}} onClick={() => goTo(stops.findIndex(x => x.n === e.stop))}>
                        <div>
                          <div style={{fontSize:"13px", fontWeight:600, color:TEXT}}>{s?.name || `Stop #${e.stop}`}</div>
                          <div style={{fontSize:"11px", color:MUTED, marginTop:"2px"}}>{s?.postcode} · {t}</div>
                        </div>
                        <div style={{fontSize:"11px", color:"#e87e2e", fontWeight:600, textAlign:"right"}}>{OUTCOME_ICONS[e.kind]}<br/>{OUTCOME_LABELS[e.kind]}</div>
                      </div>
                    );
                  })}
                </>
              )}

              {events.length === 0 && (
                <div style={{color:MUTED, fontSize:"13px", textAlign:"center", padding:"30px 0"}}>No events logged yet.<br/><span style={{fontSize:"11px", opacity:0.6}}>Mark stops delivered or log exceptions on the 🚶 tab.</span></div>
              )}

              {/* Actions */}
              <div style={{display:"flex", gap:"8px", marginTop:"24px"}}>
                <button onClick={copySummary} style={{flex:1, padding:"12px", background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", fontWeight:600, color:TEXT, cursor:"pointer"}}>📋 Copy</button>
                <button onClick={exportJSON} style={{flex:1, padding:"12px", background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", fontWeight:600, color:TEXT, cursor:"pointer"}}>⬇ Export</button>
              </div>
              <button onClick={resetDay} style={{width:"100%", marginTop:"10px", padding:"12px", background:"transparent", border:`1px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", fontWeight:600, color:MUTED, cursor:"pointer"}}>
                🔄 Reset day (keep route)
              </button>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
// Royal Mail red/white theme
const R = "#E21A22"; // RM red
const BG = "#F5F2EE"; // warm off-white page
const CARD = "#FFFFFF";
const BORDER = "#E0D9D2";
const TEXT = "#111111";
const MUTED = "#6B7280";
const FAINT = "#F0ECE8";

const styles = {
  root: { fontFamily:"system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif", background:BG, color:TEXT, minHeight:"100vh", maxWidth:"480px", margin:"0 auto", position:"relative", overflowX:"hidden" },
  header: { padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", background:R, position:"sticky", top:0, zIndex:10, boxShadow:"0 1px 0 rgba(0,0,0,0.12)" },
  headerLeft: { display:"flex", alignItems:"center", gap:"10px" },
  logo: { fontSize:"26px" },
  routeName: { fontWeight:800, fontSize:"14px", color:"#fff", letterSpacing:"-0.2px" },
  routeMeta: { fontSize:"10px", color:"rgba(255,255,255,0.7)", marginTop:"1px" },
  progressChip: { background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:"20px", padding:"3px 10px", display:"flex", alignItems:"baseline", gap:"1px" },
  progressNum: { fontWeight:800, fontSize:"15px", color:"#fff" },
  progressDen: { fontSize:"11px", color:"rgba(255,255,255,0.6)" },
  progressBar: { height:"3px", background:"rgba(226,26,34,0.15)", width:"100%" },
  progressFill: { height:"100%", background:R, transition:"width 0.4s ease" },
  tabs: { display:"flex", borderBottom:`1px solid ${BORDER}`, background:CARD },
  tab: { flex:1, background:"transparent", border:"none", color:MUTED, padding:"10px 4px", fontSize:"16px", cursor:"pointer", transition:"color 0.15s" },
  tabActive: { color:R, boxShadow:`inset 0 -2px 0 ${R}` },
  content: { overflowY:"auto", height:"calc(100vh - 110px)" },

  // Walk
  stopCard: { background:CARD, border:`1px solid ${BORDER}`, borderRadius:"12px", padding:"20px 18px", marginBottom:"14px", boxShadow:"0 1px 3px rgba(0,0,0,0.05)" },
  stopNumber: { fontWeight:700, fontSize:"10px", color:MUTED, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"5px" },
  stopName: { fontWeight:800, fontSize:"22px", color:TEXT, lineHeight:1.2, marginBottom:"8px" },
  stopPostcode: { fontSize:"12px", color:R, background:"rgba(226,26,34,0.08)", display:"inline-block", padding:"3px 8px", borderRadius:"4px", marginBottom:"12px", fontWeight:600 },
  noteChip: { border:"1px solid", borderRadius:"6px", padding:"8px 12px", fontSize:"12px", marginBottom:"14px", lineHeight:1.4 },
  doneBtn: { width:"100%", padding:"12px", background:"transparent", border:`2px solid ${BORDER}`, color:MUTED, borderRadius:"8px", cursor:"pointer", fontSize:"13px", transition:"all 0.2s", fontWeight:600 },
  doneBtnActive: { background:"rgba(34,139,34,0.08)", borderColor:"#228B22", color:"#228B22" },
  contextRow: { display:"flex", gap:"10px", marginBottom:"14px" },
  contextCard: { flex:1, background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", padding:"12px", cursor:"pointer" },
  contextCardNext: { borderLeft:`3px solid ${R}` },
  contextLabel: { fontSize:"10px", color:MUTED, marginBottom:"4px", letterSpacing:"1px" },
  contextName: { fontSize:"12px", color:TEXT, fontWeight:500, marginBottom:"2px", lineHeight:1.3 },
  contextCode: { fontSize:"10px", color:R, fontWeight:600 },
  navRow: { display:"flex", alignItems:"center", gap:"10px" },
  navBtn: { flex:1, padding:"13px", background:CARD, border:`1px solid ${BORDER}`, color:TEXT, borderRadius:"8px", cursor:"pointer", fontSize:"13px", transition:"all 0.15s", fontWeight:600 },
  navBtnNext: { background:R, borderColor:R, color:"#fff" },
  stopCounter: { fontSize:"11px", color:MUTED, whiteSpace:"nowrap", textAlign:"center", minWidth:"60px" },

  // Search
  searchInput: { width:"100%", background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", padding:"13px 16px", color:TEXT, fontSize:"14px", outline:"none", marginBottom:"12px" },
  searchMeta: { fontSize:"11px", color:MUTED, marginBottom:"12px", letterSpacing:"0.5px" },
  searchHint: { fontSize:"13px", color:MUTED, lineHeight:1.6 },
  postcodeList: { display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"12px" },
  pcChip: { background:CARD, border:`1px solid ${BORDER}`, borderRadius:"4px", padding:"4px 8px", fontSize:"11px", color:R, cursor:"pointer", fontWeight:600 },
  searchResult: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 14px", background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", marginBottom:"6px", cursor:"pointer" },
  srLeft: { display:"flex", alignItems:"center", gap:"12px" },
  srNum: { fontSize:"11px", color:MUTED, minWidth:"28px" },
  srName: { fontSize:"13px", color:TEXT, marginBottom:"2px", fontWeight:500 },
  srCode: { fontSize:"11px", color:R, fontWeight:600 },
  srDone: { color:"#228B22", fontSize:"14px", marginLeft:"8px" },

  // List
  pcHeader: { padding:"7px 16px", fontSize:"10px", color:R, fontWeight:700, letterSpacing:"2px", background:FAINT, position:"sticky", top:0, zIndex:2, borderBottom:`1px solid ${BORDER}` },
  listItem: { display:"flex", alignItems:"center", gap:"12px", padding:"12px 16px", borderBottom:`1px solid ${FAINT}`, cursor:"pointer", transition:"background 0.1s" },
  listItemActive: { background:"rgba(226,26,34,0.05)", borderLeft:`3px solid ${R}` },
  listItemDone: { opacity:0.4 },
  liNum: { fontSize:"11px", color:MUTED, minWidth:"28px", textAlign:"right" },
  liBody: { flex:1 },
  liName: { fontSize:"13px", color:TEXT, fontWeight:500 },
  liCheck: { fontSize:"12px", color:"#228B22" },
  liCurrent: { fontSize:"10px", color:R },

  // Routes
  sectionTitle: { fontWeight:800, fontSize:"10px", color:MUTED, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"12px", marginTop:"8px" },
  routeCard: { background:CARD, border:`1px solid ${BORDER}`, borderRadius:"10px", padding:"14px", marginBottom:"8px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 2px rgba(0,0,0,0.04)" },
  routeCardActive: { borderColor:`rgba(226,26,34,0.5)`, background:"rgba(226,26,34,0.03)" },
  rcLeft: { flex:1 },
  rcName: { fontWeight:700, fontSize:"14px", color:TEXT, marginBottom:"3px" },
  rcMeta: { fontSize:"11px", color:MUTED, marginBottom:"3px" },
  rcAreas: { fontSize:"11px", color:MUTED, opacity:0.7 },
  rcActive: { fontSize:"10px", color:R, border:`1px solid rgba(226,26,34,0.4)`, borderRadius:"20px", padding:"3px 8px", fontWeight:700 },
  addRoute: { border:`2px dashed ${BORDER}`, borderRadius:"10px", padding:"18px 14px", marginBottom:"18px", display:"flex", alignItems:"center", gap:"14px", cursor:"pointer" },
  addRouteIcon: { fontSize:"22px", color:MUTED, width:"38px", height:"38px", border:`2px dashed ${BORDER}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" },
  addRouteTitle: { fontWeight:700, fontSize:"13px", color:MUTED, marginBottom:"3px" },
  addRouteSub: { fontSize:"11px", color:MUTED, opacity:0.7, lineHeight:1.4 },
  statsGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" },
  statCard: { background:CARD, border:`1px solid ${BORDER}`, borderRadius:"8px", padding:"14px", textAlign:"center" },
  statVal: { fontWeight:800, fontSize:"26px", color:R },
  statLabel: { fontSize:"10px", color:MUTED, marginTop:"3px", letterSpacing:"1px", textTransform:"uppercase" },

  // Scanner
  scanFrame: { position:"relative", width:"100%", aspectRatio:"1/1", background:"#111", borderRadius:"12px", overflow:"hidden", border:`1px solid ${BORDER}` },
  scanVideo: { width:"100%", height:"100%", objectFit:"cover", display:"block" },
  scanOverlay: { position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"16px" },
  scanTarget: { width:"180px", height:"180px", border:`2px solid rgba(226,26,34,0.85)`, borderRadius:"12px", boxShadow:"0 0 0 4000px rgba(0,0,0,0.5)" },
  scanHint: { fontSize:"12px", color:"rgba(255,255,255,0.85)", letterSpacing:"1px", textTransform:"uppercase" },
  scanSpinner: { fontSize:"13px", color:"rgba(255,255,255,0.6)" },
  scanManualLabel: { fontSize:"10px", color:MUTED, letterSpacing:"1.5px", textTransform:"uppercase" },
  scanSubmitBtn: { background:R, border:`1px solid ${R}`, color:"#fff", borderRadius:"8px", padding:"0 20px", fontSize:"13px", cursor:"pointer", fontWeight:700 },
  scanExamples: { display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"12px" },

  // Frames
  frameHeader: { display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"12px" },
  frameTitle: { fontWeight:800, fontSize:"20px", color:TEXT },
  frameCount: { fontSize:"11px", color:MUTED, letterSpacing:"1px" },
  framePicker: { display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px" },
  frameBtn: { width:"44px", height:"44px", borderRadius:"8px", border:`1px solid ${BORDER}`, background:CARD, color:MUTED, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1px", transition:"all 0.15s" },
  frameBtnActive: { background:R, borderColor:R, color:"#fff" },
  frameBtnNum: { fontWeight:800, fontSize:"16px", lineHeight:1 },
  frameBtnCount: { fontSize:"9px", lineHeight:1, opacity:0.7 },
  frameEmpty: { color:MUTED, fontSize:"13px", padding:"20px 0", lineHeight:1.6 },
  frameItem: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0", borderBottom:`1px solid ${FAINT}`, cursor:"pointer" },
  frameItemDone: { opacity:0.35 },
  frameItemLeft: { flex:1 },
  frameItemName: { fontSize:"14px", color:TEXT, fontWeight:500, marginBottom:"2px" },
  frameItemCode: { fontSize:"11px", color:R, fontWeight:600 },
  frameItemRight: { textAlign:"right", paddingLeft:"12px" },
  frameItemN: { fontSize:"11px", color:MUTED },
};
