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

// ── VOICE ────────────────────────────────────────────────────────────────────
const speak = (text) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
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
  const [activeRouteId, setActiveRouteId] = useState("route-14");
  const [currentStop, setCurrentStop] = useState(0); // 0-indexed
  const [view, setView] = useState("walk"); // "walk" | "search" | "list" | "routes" | "scan"
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [completed, setCompleted] = useState(new Set());
  const [frameNum, setFrameNum] = useState(1);
  const [frameQuery, setFrameQuery] = useState("");
  const activeRef = useRef(null);

  const route = ROUTES[activeRouteId];
  const stops = route.stops;
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

  // Search
  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    const results = stops.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.postcode.toLowerCase().includes(q)
    );
    setSearchResults(results);
  }, [searchQuery, stops]);

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

  // ── QR HANDLER ──────────────────────────────────────────────────────────────
  // Normalise postcode: strip spaces, uppercase → "TR127LH"
  const normPc = (s) => s.toUpperCase().replace(/\s+/g, "");

  const handleQRScan = (text) => {
    const raw = text.trim();

    if (raw.startsWith("BOX:")) {
      const id = raw.slice(4).trim();
      const label = boxLabel(id);
      const idx = stops.findIndex(s => s.qr === id);
      const note = idx >= 0 ? stops[idx].note : "";
      speak(`Collection. ${label}. ${note || "Check pouch and insert returns."}`);
      if (idx >= 0) setCurrentStop(idx);
      setView("walk");

    } else if (raw.startsWith("STOP:")) {
      const pc = normPc(raw.slice(5));
      const idx = stops.findIndex(s => normPc(s.postcode) === pc);
      if (idx >= 0) {
        const s = stops[idx];
        speak(`Stop ${s.n}. ${s.name}. ${s.note || ""}`);
        setCurrentStop(idx);
        setView("walk");
      } else {
        speak(`Postcode not found on this route.`);
      }

    } else {
      // Last-ditch: treat raw as a bare postcode
      const pc = normPc(raw);
      const idx = stops.findIndex(s => normPc(s.postcode) === pc);
      if (idx >= 0) {
        const s = stops[idx];
        speak(`Stop ${s.n}. ${s.name}. ${s.note || ""}`);
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
        {[["walk","🚶"],["scan","📷"],["frames","🗂"],["search","🔍"],["list","📋"],["routes","🗺"]].map(([id, label]) => (
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
                  onClick={() => goTo(s.n - 1)}
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
            {/* Stop card */}
            <div className="stop-card" key={stop.n} style={styles.stopCard}>
              <div style={styles.stopNumber}>#{stop.n}</div>
              <div style={styles.stopName}>{stop.name}</div>
              <div style={styles.stopPostcode}>{stop.postcode}</div>
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
            </div>

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
              <button className="nav-btn" style={{...styles.navBtn, opacity: currentStop===0?0.3:1}} disabled={currentStop===0} onClick={() => setCurrentStop(c => c - 1)}>
                ← Prev
              </button>
              <div style={styles.stopCounter}>{currentStop+1} of {stops.length}</div>
              <button className="nav-btn" style={{...styles.navBtn, ...styles.navBtnNext, opacity: currentStop===stops.length-1?0.3:1}} disabled={currentStop===stops.length-1} onClick={() => setCurrentStop(c => c + 1)}>
                Next →
              </button>
            </div>
          </div>
        )}

        {/* ── SEARCH VIEW ── */}
        {view === "search" && (
          <div style={{padding:"16px 16px 100px"}}>
            <input
              style={styles.searchInput}
              placeholder="Search by name or postcode…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
              <div key={s.n} style={styles.searchResult} onClick={() => goTo(s.n - 1)}>
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
                    onClick={() => goTo(s.n - 1)}
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

        {/* ── ROUTES VIEW ── */}
        {view === "routes" && (
          <div style={{padding:"16px 16px 100px"}}>
            <div style={styles.sectionTitle}>Active Routes</div>
            {Object.values(ROUTES).map(r => (
              <div key={r.id} style={{...styles.routeCard, ...(r.id === activeRouteId ? styles.routeCardActive : {})}} onClick={() => { setActiveRouteId(r.id); setCurrentStop(0); setCompleted(new Set()); setView("walk"); }}>
                <div style={styles.rcLeft}>
                  <div style={styles.rcName}>{r.name}</div>
                  <div style={styles.rcMeta}>{r.stops.length} addresses · {r.depot}</div>
                  <div style={styles.rcAreas}>{r.areas.slice(0,4).join(", ")}{r.areas.length > 4 ? "…" : ""}</div>
                </div>
                {r.id === activeRouteId && <div style={styles.rcActive}>Active</div>}
              </div>
            ))}

            {/* Add route placeholder */}
            <div style={styles.addRoute}>
              <div style={styles.addRouteIcon}>+</div>
              <div>
                <div style={styles.addRouteTitle}>Add New Route</div>
                <div style={styles.addRouteSub}>Import a route from a text file or paste stop data</div>
              </div>
            </div>

            <div style={styles.sectionTitle}>Route Stats</div>
            <div style={styles.statsGrid}>
              {[
                ["Stops", stops.length],
                ["Postcodes", Object.keys(postcodeGroups).length],
                ["Completed", completed.size],
                ["Remaining", stops.length - completed.size],
              ].map(([label, val]) => (
                <div key={label} style={styles.statCard}>
                  <div style={styles.statVal}>{val}</div>
                  <div style={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────────
const styles = {
  root: { fontFamily:"'DM Mono', monospace", background:"#111110", color:"#e8e4dc", minHeight:"100vh", maxWidth:"480px", margin:"0 auto", position:"relative", overflowX:"hidden" },
  header: { padding:"16px 16px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #2a2a28" },
  headerLeft: { display:"flex", alignItems:"center", gap:"10px" },
  logo: { fontSize:"28px" },
  routeName: { fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:"14px", color:"#fff", letterSpacing:"-0.3px" },
  routeMeta: { fontSize:"10px", color:"#666", marginTop:"1px" },
  progressChip: { background:"#1e1e1c", border:"1px solid #333", borderRadius:"20px", padding:"4px 10px", display:"flex", alignItems:"baseline", gap:"1px" },
  progressNum: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", color:"#f0a500" },
  progressDen: { fontSize:"11px", color:"#555" },
  progressBar: { height:"3px", background:"#222", width:"100%" },
  progressFill: { height:"100%", background:"linear-gradient(90deg, #f0a500, #e06030)", transition:"width 0.4s ease" },
  tabs: { display:"flex", borderBottom:"1px solid #2a2a28" },
  tab: { flex:1, background:"transparent", border:"none", color:"#666", padding:"10px 4px", fontSize:"11px", cursor:"pointer", transition:"color 0.15s", letterSpacing:"0.5px" },
  tabActive: { color:"#f0a500", boxShadow:"inset 0 -2px 0 #f0a500" },
  content: { overflowY:"auto", height:"calc(100vh - 120px)" },

  // Walk
  stopCard: { background:"#1a1a18", border:"1px solid #2e2e2a", borderRadius:"12px", padding:"24px 20px", marginBottom:"16px" },
  stopNumber: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"11px", color:"#555", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"6px" },
  stopName: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"22px", color:"#fff", lineHeight:1.2, marginBottom:"8px" },
  stopPostcode: { fontFamily:"'DM Mono', monospace", fontSize:"13px", color:"#f0a500", background:"rgba(240,165,0,0.1)", display:"inline-block", padding:"3px 8px", borderRadius:"4px", marginBottom:"12px" },
  noteChip: { border:"1px solid", borderRadius:"6px", padding:"8px 12px", fontSize:"12px", marginBottom:"16px", lineHeight:1.4 },
  doneBtn: { width:"100%", padding:"12px", background:"transparent", border:"2px solid #333", color:"#666", borderRadius:"8px", cursor:"pointer", fontFamily:"'DM Mono', monospace", fontSize:"13px", transition:"all 0.2s", letterSpacing:"0.5px" },
  doneBtnActive: { background:"rgba(76,175,61,0.12)", borderColor:"#4caf3d", color:"#4caf3d" },
  contextRow: { display:"flex", gap:"10px", marginBottom:"16px" },
  contextCard: { flex:1, background:"#161614", border:"1px solid #252523", borderRadius:"8px", padding:"12px", cursor:"pointer" },
  contextCardNext: { borderColor:"#2e2a1a" },
  contextLabel: { fontSize:"10px", color:"#555", marginBottom:"4px", letterSpacing:"1px" },
  contextName: { fontSize:"12px", color:"#ccc", fontWeight:500, marginBottom:"2px", lineHeight:1.3 },
  contextCode: { fontSize:"10px", color:"#f0a500" },
  navRow: { display:"flex", alignItems:"center", gap:"12px" },
  navBtn: { flex:1, padding:"14px", background:"#1e1e1c", border:"1px solid #333", color:"#ccc", borderRadius:"8px", cursor:"pointer", fontFamily:"'DM Mono', monospace", fontSize:"13px", transition:"all 0.15s" },
  navBtnNext: { background:"rgba(240,165,0,0.08)", borderColor:"rgba(240,165,0,0.3)", color:"#f0a500" },
  stopCounter: { fontSize:"11px", color:"#555", whiteSpace:"nowrap", textAlign:"center", minWidth:"60px" },

  // Search
  searchInput: { width:"100%", background:"#1a1a18", border:"1px solid #333", borderRadius:"8px", padding:"14px 16px", color:"#fff", fontFamily:"'DM Mono', monospace", fontSize:"14px", outline:"none", marginBottom:"12px" },
  searchMeta: { fontSize:"11px", color:"#555", marginBottom:"12px", letterSpacing:"0.5px" },
  searchHint: { fontSize:"13px", color:"#666", lineHeight:1.6 },
  postcodeList: { display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"12px" },
  pcChip: { background:"#1e1e1c", border:"1px solid #333", borderRadius:"4px", padding:"4px 8px", fontSize:"11px", color:"#f0a500", cursor:"pointer", letterSpacing:"0.5px" },
  searchResult: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:"#161614", border:"1px solid #252523", borderRadius:"8px", marginBottom:"6px", cursor:"pointer" },
  srLeft: { display:"flex", alignItems:"center", gap:"12px" },
  srNum: { fontSize:"11px", color:"#555", minWidth:"28px" },
  srName: { fontSize:"13px", color:"#ddd", marginBottom:"2px" },
  srCode: { fontSize:"11px", color:"#f0a500" },
  srDone: { color:"#4caf3d", fontSize:"14px", marginLeft:"8px" },

  // List
  pcHeader: { padding:"8px 16px 4px", fontSize:"10px", color:"#f0a500", letterSpacing:"2px", background:"#0e0e0d", position:"sticky", top:0, zIndex:2, borderBottom:"1px solid #1e1e1c" },
  listItem: { display:"flex", alignItems:"center", gap:"12px", padding:"12px 16px", borderBottom:"1px solid #1a1a18", cursor:"pointer", transition:"background 0.1s" },
  listItemActive: { background:"rgba(240,165,0,0.06)", borderLeft:"3px solid #f0a500" },
  listItemDone: { opacity:0.4 },
  liNum: { fontSize:"11px", color:"#444", minWidth:"28px", textAlign:"right" },
  liBody: { flex:1 },
  liName: { fontSize:"13px", color:"#ccc" },
  liCheck: { fontSize:"12px", color:"#4caf3d" },
  liCurrent: { fontSize:"10px", color:"#f0a500" },

  // Routes
  sectionTitle: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"11px", color:"#555", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"12px", marginTop:"8px" },
  routeCard: { background:"#161614", border:"1px solid #252523", borderRadius:"10px", padding:"16px", marginBottom:"10px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" },
  routeCardActive: { borderColor:"rgba(240,165,0,0.4)", background:"rgba(240,165,0,0.04)" },
  rcLeft: { flex:1 },
  rcName: { fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"14px", color:"#fff", marginBottom:"4px" },
  rcMeta: { fontSize:"11px", color:"#666", marginBottom:"4px" },
  rcAreas: { fontSize:"11px", color:"#444" },
  rcActive: { fontSize:"10px", color:"#f0a500", border:"1px solid rgba(240,165,0,0.4)", borderRadius:"20px", padding:"3px 8px", letterSpacing:"1px" },
  addRoute: { border:"2px dashed #2a2a28", borderRadius:"10px", padding:"20px 16px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"16px", cursor:"pointer" },
  addRouteIcon: { fontSize:"24px", color:"#444", width:"40px", height:"40px", border:"2px dashed #333", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" },
  addRouteTitle: { fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"13px", color:"#555", marginBottom:"3px" },
  addRouteSub: { fontSize:"11px", color:"#3a3a38", lineHeight:1.4 },
  statsGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" },
  statCard: { background:"#161614", border:"1px solid #252523", borderRadius:"8px", padding:"16px", textAlign:"center" },
  statVal: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"28px", color:"#f0a500" },
  statLabel: { fontSize:"10px", color:"#555", marginTop:"4px", letterSpacing:"1px", textTransform:"uppercase" },

  // Scanner
  scanFrame: { position:"relative", width:"100%", aspectRatio:"1/1", background:"#0a0a09", borderRadius:"12px", overflow:"hidden", border:"1px solid #2e2e2a" },
  scanVideo: { width:"100%", height:"100%", objectFit:"cover", display:"block" },
  scanOverlay: { position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"16px" },
  scanTarget: { width:"180px", height:"180px", border:"2px solid rgba(240,165,0,0.7)", borderRadius:"12px", boxShadow:"0 0 0 4000px rgba(0,0,0,0.45)" },
  scanHint: { fontSize:"12px", color:"rgba(240,165,0,0.8)", letterSpacing:"1px", textTransform:"uppercase" },
  scanSpinner: { fontSize:"13px", color:"#666" },
  scanManualLabel: { fontSize:"10px", color:"#555", letterSpacing:"1.5px", textTransform:"uppercase" },
  scanSubmitBtn: { background:"rgba(240,165,0,0.12)", border:"1px solid rgba(240,165,0,0.4)", color:"#f0a500", borderRadius:"8px", padding:"0 20px", fontFamily:"'DM Mono',monospace", fontSize:"13px", cursor:"pointer" },
  scanExamples: { display:"flex", flexWrap:"wrap", gap:"6px", marginTop:"12px" },

  // Frames
  frameHeader: { display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"12px" },
  frameTitle: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"20px", color:"#fff" },
  frameCount: { fontSize:"11px", color:"#555", letterSpacing:"1px" },
  framePicker: { display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px" },
  frameBtn: { width:"44px", height:"44px", borderRadius:"8px", border:"1px solid #2e2e2a", background:"#161614", color:"#666", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1px", transition:"all 0.15s" },
  frameBtnActive: { background:"rgba(240,165,0,0.1)", borderColor:"rgba(240,165,0,0.5)", color:"#f0a500" },
  frameBtnNum: { fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"16px", lineHeight:1 },
  frameBtnCount: { fontSize:"9px", color:"#555", lineHeight:1 },
  frameEmpty: { color:"#555", fontSize:"13px", padding:"20px 0", lineHeight:1.6 },
  frameItem: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", borderBottom:"1px solid #1a1a18", cursor:"pointer" },
  frameItemDone: { opacity:0.35 },
  frameItemLeft: { flex:1 },
  frameItemName: { fontSize:"14px", color:"#ddd", fontWeight:500, marginBottom:"2px" },
  frameItemCode: { fontSize:"11px", color:"#f0a500", letterSpacing:"0.5px" },
  frameItemRight: { textAlign:"right", paddingLeft:"12px" },
  frameItemN: { fontSize:"11px", color:"#444" },
};
