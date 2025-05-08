const airlineLocations = [
    {
        "key": "NSZ",
        "city": "Nansha",
        "name": "Ferry port",
        "country": "China"
    },
    {
        "key": "PFT",
        "city": "Guangzhou city",
        "name": "Pazhou ferry terminal airport",
        "country": "China"
    },
    {
        "key": "IWK",
        "city": "Iwakuni",
        "name": "Iwakuni airport",
        "country": "Japan"
    },
    {
        "key": "QNS",
        "city": "Porto alegre",
        "name": "Canoas air force base",
        "country": "Brazil"
    },
    {
        "key": "HGI",
        "city": "Itanagar",
        "name": "Donyi polo airport",
        "country": "India"
    },
    {
        "key": "SGX",
        "city": "Songea",
        "name": "Songea airport",
        "country": "Tanzania"
    },
    {
        "key": "AHA",
        "city": "Ambikapur airport",
        "name": "Ambikapur airport",
        "country": "India"
    },
    {
        "key": "ALV",
        "city": "Andorra La Vella",
        "name": "Andorra La Vella Hlpt",
        "country": "Andorra"
    },
    {
        "key": "WSY",
        "city": "Airlie Beach",
        "name": "Whitsunday Airstrip",
        "country": "Australia"
    },
    {
        "key": "NSA",
        "city": "Noosa",
        "name": "Noosa Airport",
        "country": "Australia"
    },
    {
        "key": "JHQ",
        "city": "Shute Hrb",
        "name": "Shute Harbour Heliport",
        "country": "Australia"
    },
    {
        "key": "SWZ",
        "city": "Sydney",
        "name": "Sydney West",
        "country": "Australia"
    },
    {
        "key": "ZZZ",
        "city": "Sydney",
        "name": "Sydney Kingsford Smiht Arpt",
        "country": "Australia"
    },
    {
        "key": "VDD",
        "city": "Vienna",
        "name": "Vienna Danubepier Hov",
        "country": "Austria"
    },
    {
        "key": "GBQ",
        "city": "Muharraq Town",
        "name": "Muharraq Arpt",
        "country": "Bahrain"
    },
    {
        "key": "PID",
        "city": "Nassau",
        "name": "Paradise Island Arpt",
        "country": "Bahamas"
    },
    {
        "key": "ZBW",
        "city": "Atibaia",
        "name": "Atibaia Arpt",
        "country": "Brazil"
    },
    {
        "key": "QIG",
        "city": "Iguatu",
        "name": "Iguatu Arpt",
        "country": "Brazil"
    },
    {
        "key": "QNT",
        "city": "Niteroi",
        "name": "Niteroi Arpt",
        "country": "Brazil"
    },
    {
        "key": "QHV",
        "city": "Novo Hamburgo",
        "name": "Novo Hamburgo Arpt",
        "country": "Brazil"
    },
    {
        "key": "KUB",
        "city": "Kuala Belait",
        "name": "Kuala Belait Arpt",
        "country": "Brunei Darussalam"
    },
    {
        "key": "ROU",
        "city": "Ruse",
        "name": "Ruse Shtrukevo Airport",
        "country": "Bulgaria"
    },
    {
        "key": "KOB",
        "city": "Koutaba",
        "name": "Koutaba Arpt",
        "country": "Cameroon"
    },
    {
        "key": "YCK",
        "city": "Colville",
        "name": "Colville Municipal",
        "country": "Canada"
    },
    {
        "key": "YXD",
        "city": "Edmonton",
        "name": "Edmonton Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YJA",
        "city": "Jasper",
        "name": "Jasper Airport",
        "country": "Canada"
    },
    {
        "key": "YYI",
        "city": "Rivers",
        "name": "Rivers Rail Station",
        "country": "Canada"
    },
    {
        "key": "YTJ",
        "city": "Terrace Bay",
        "name": "Terrace Bay Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "ULC",
        "city": "Santiago",
        "name": "Los Cerrillos",
        "country": "Chile"
    },
    {
        "key": "ZCO",
        "city": "Temuco",
        "name": "Manquehue Arpt",
        "country": "Chile"
    },
    {
        "key": "HHA",
        "city": "Huanghua",
        "name": "Changsha Huanghua Arpt",
        "country": "China"
    },
    {
        "key": "LZD",
        "city": "Lanzhou",
        "name": "Lanzhoudong Airport",
        "country": "China"
    },
    {
        "key": "ZGC",
        "city": "Lanzhou",
        "name": "Zhongchuan Airport",
        "country": "China"
    },
    {
        "key": "SZO",
        "city": "Shanzhou",
        "name": "Shanzhou Arpt",
        "country": "China"
    },
    {
        "key": "SIA",
        "city": "Xi An",
        "name": "Xiguan Airport",
        "country": "China"
    },
    {
        "key": "CCC",
        "city": "Cayo Coco",
        "name": "Cayo Coco Arpt",
        "country": "Cuba"
    },
    {
        "key": "NIC",
        "city": "Nicosia",
        "name": "Nicosia Airport",
        "country": "Cyprus"
    },
    {
        "key": "GTW",
        "city": "Zlin",
        "name": "Holesov Airport",
        "country": "Czech Republic"
    },
    {
        "key": "AJH",
        "city": "Aarhus",
        "name": "AARHUS RAIL STATION",
        "country": "Denmark"
    },
    {
        "key": "HEX",
        "city": "Santo Domingo",
        "name": "Herrera Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "BFJ",
        "city": "Ba City",
        "name": "Ba Arpt",
        "country": "Fiji"
    },
    {
        "key": "QXB",
        "city": "Aix En Provence",
        "name": "Aix en Provence Rail Station",
        "country": "France"
    },
    {
        "key": "QRV",
        "city": "Arras",
        "name": "Arras Arpt",
        "country": "France"
    },
    {
        "key": "FRJ",
        "city": "Frejus",
        "name": "Frejus Arpt",
        "country": "France"
    },
    {
        "key": "ZLX",
        "city": "Lyon",
        "name": "British Rail Terminal",
        "country": "France"
    },
    {
        "key": "DLP",
        "city": "Paris",
        "name": "Disneyland Paris Heliport",
        "country": "France"
    },
    {
        "key": "XSS",
        "city": "Soissons",
        "name": "Soissons Railway Station",
        "country": "France"
    },
    {
        "key": "JSZ",
        "city": "St Tropez",
        "name": "St Tropez Hlpt",
        "country": "France"
    },
    {
        "key": "QYR",
        "city": "Troyes",
        "name": "Barberey airport",
        "country": "France"
    },
    {
        "key": "THF",
        "city": "Berlin",
        "name": "Tempelhof Arpt",
        "country": "Germany"
    },
    {
        "key": "BNJ",
        "city": "Bonn",
        "name": "Bonn Railroad Station",
        "country": "Germany"
    },
    {
        "key": "HDB",
        "city": "Heidelberg",
        "name": "Heidelberg Arpt",
        "country": "Germany"
    },
    {
        "key": "QWD",
        "city": "Mittenwald",
        "name": "Mittenwald Airport",
        "country": "Germany"
    },
    {
        "key": "NDZ",
        "city": "Nordholz Spieka",
        "name": "Cuxhaven Arpt",
        "country": "Germany"
    },
    {
        "key": "ZOX",
        "city": "Oberammergau",
        "name": "Oberammergau Airport",
        "country": "Germany"
    },
    {
        "key": "ZPP",
        "city": "Reutlingen",
        "name": "Rail Station Reutlingen",
        "country": "Germany"
    },
    {
        "key": "AGQ",
        "city": "Agrinion",
        "name": "Agrinion Arpt",
        "country": "Greece"
    },
    {
        "key": "NGM",
        "city": "Guam",
        "name": "Agana NAS",
        "country": "Guam"
    },
    {
        "key": "NRV",
        "city": "Guam",
        "name": "USCG Shore Street Guam",
        "country": "Guam"
    },
    {
        "key": "CFW",
        "city": "Louisiana",
        "name": "Chennault international airport",
        "country": "United States"
    },
    {
        "key": "DAE",
        "city": "Daparizo",
        "name": "Daparizo Airport",
        "country": "India"
    },
    {
        "key": "PUI",
        "city": "Purnea",
        "name": "Purnea Airport",
        "country": "India"
    },
    {
        "key": "AMI",
        "city": "Mataram",
        "name": "Selaparang Airport",
        "country": "Indonesia"
    },
    {
        "key": "WEX",
        "city": "Wexford",
        "name": "Castlebridge Arpt",
        "country": "Ireland"
    },
    {
        "key": "JRS",
        "city": "Jerusalem",
        "name": "Atarot Airport",
        "country": "Israel"
    },
    {
        "key": "QMM",
        "city": "Marina Di Massa",
        "name": "Marina Di Massa Arpt",
        "country": "Italy"
    },
    {
        "key": "SWK",
        "city": "Milan",
        "name": "Segrate Arpt",
        "country": "Italy"
    },
    {
        "key": "YEH",
        "city": "Asaloyeh",
        "name": "Asaloyeh Arpt",
        "country": "Iran"
    },
    {
        "key": "QPA",
        "city": "Padova",
        "name": "Padova Arpt",
        "country": "Italy"
    },
    {
        "key": "NGY",
        "city": "Nagoya",
        "name": "NOGOYA EK BUS STATION",
        "country": "Japan"
    },
    {
        "key": "XSA",
        "city": "Sinoe",
        "name": "Sinoe AFC",
        "country": "Liberia"
    },
    {
        "key": "TIP",
        "city": "Tripoli",
        "name": "Tripoli Intl Arpt",
        "country": "Libya"
    },
    {
        "key": "KLJ",
        "city": "Klaipeda",
        "name": "Klaipeda Arpt",
        "country": "Lithuania"
    },
    {
        "key": "PNO",
        "city": "Pinotepa Nacional",
        "name": "Pinotepa Nacional Arpt",
        "country": "Mexico"
    },
    {
        "key": "SZT",
        "city": "San Cristobal De Las Casas",
        "name": "San Cristobal Arpt",
        "country": "Mexico"
    },
    {
        "key": "VIB",
        "city": "Villa Constitucion",
        "name": "Villa Constitucion Arpt",
        "country": "Mexico"
    },
    {
        "key": "TCV",
        "city": "Tete",
        "name": "Tete Arpt",
        "country": "Mozambique"
    },
    {
        "key": "HAG",
        "city": "The Hague",
        "name": "Hague Arpt",
        "country": "Netherlands"
    },
    {
        "key": "UTC",
        "city": "Utrecht",
        "name": "Soesterberg Arpt",
        "country": "Netherlands"
    },
    {
        "key": "DLD",
        "city": "Geilo",
        "name": "Dagali Arpt",
        "country": "Norway"
    },
    {
        "key": "GZA",
        "city": "Gaza",
        "name": "Gaza International Arpt",
        "country": "Palestine"
    },
    {
        "key": "TIG",
        "city": "Tingwon",
        "name": "Tingwon Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "ZBG",
        "city": "Elblag",
        "name": "Elblag Airport",
        "country": "Poland"
    },
    {
        "key": "QYO",
        "city": "Olsztyn",
        "name": "Olsztyn Arpt",
        "country": "Poland"
    },
    {
        "key": "BKA",
        "city": "Moscow",
        "name": "Bykovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "RVH",
        "city": "St Petersburg",
        "name": "Rzhevka Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "HCS",
        "city": "Johannesburg",
        "name": "Randburg Heliport",
        "country": "South Africa"
    },
    {
        "key": "HIC",
        "city": "Pretoria",
        "name": "Iscor Heliport",
        "country": "South Africa"
    },
    {
        "key": "HPR",
        "city": "Pretoria",
        "name": "Central Hpr Arpt",
        "country": "South Africa"
    },
    {
        "key": "CQM",
        "city": "Ciudad Real",
        "name": "Ciudad Real Central Arpt",
        "country": "Spain"
    },
    {
        "key": "CJI",
        "city": "Ciudad Real City",
        "name": "Ciudad Real City Arpt",
        "country": "Spain"
    },
    {
        "key": "MMA",
        "city": "Malmo",
        "name": "Malmo Metropolitan Area Arpt",
        "country": "Sweden"
    },
    {
        "key": "ACO",
        "city": "Ascona",
        "name": "Ascona Arpt",
        "country": "Switzerland"
    },
    {
        "key": "MQJ",
        "city": "Balikesir",
        "name": "Merkez Arpt",
        "country": "Turkey"
    },
    {
        "key": "BTZ",
        "city": "Bursa",
        "name": "Bursa Airport",
        "country": "Turkey"
    },
    {
        "key": "WXF",
        "city": "Braintree",
        "name": "Wether Field Raf",
        "country": "United Kingdom"
    },
    {
        "key": "ZGG",
        "city": "Glasgow",
        "name": "Glasgow ScotRail",
        "country": "United Kingdom"
    },
    {
        "key": "GSY",
        "city": "Grimsby",
        "name": "Binbrook Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "HTF",
        "city": "Hatfield",
        "name": "Hatfield Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LPH",
        "city": "Lochgilphead",
        "name": "Lochgilphead Heliport",
        "country": "United Kingdom"
    },
    {
        "key": "MSE",
        "city": "Manston",
        "name": "Kent International Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "GXH",
        "city": "Mildenhall",
        "name": "Mildenhall NAF",
        "country": "United Kingdom"
    },
    {
        "key": "OHP",
        "city": "Oban",
        "name": "Oban Heliport",
        "country": "United Kingdom"
    },
    {
        "key": "PZE",
        "city": "Penzance",
        "name": "Penzance Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "PLH",
        "city": "Plymouth",
        "name": "Roborough Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "RAY",
        "city": "Rothesay",
        "name": "Rothesay Heliport",
        "country": "United Kingdom"
    },
    {
        "key": "SZD",
        "city": "Sheffield",
        "name": "Sheffield City Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SWI",
        "city": "Swindon",
        "name": "Swindon Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZLY",
        "city": "Albany",
        "name": "Albany NY Rail Station",
        "country": "United States"
    },
    {
        "key": "AIY",
        "city": "Atlantic City",
        "name": "Bader Field",
        "country": "United States"
    },
    {
        "key": "ATU",
        "city": "Attu Island",
        "name": "Attu Island Arpt",
        "country": "United States"
    },
    {
        "key": "CHD",
        "city": "Chandler",
        "name": "Williams AFB",
        "country": "United States"
    },
    {
        "key": "CLC",
        "city": "Clear Lake City",
        "name": "Metroport",
        "country": "United States"
    },
    {
        "key": "CSG",
        "city": "Columbus",
        "name": "Columbus Metro Ft Benning Arpt",
        "country": "United States"
    },
    {
        "key": "NRC",
        "city": "Crows Landing",
        "name": "Aux Field Arpt",
        "country": "United States"
    },
    {
        "key": "DWF",
        "city": "Dayton",
        "name": "Wright AFB",
        "country": "United States"
    },
    {
        "key": "UIZ",
        "city": "Detroit",
        "name": "Berz Macomb Arpt",
        "country": "United States"
    },
    {
        "key": "DVX",
        "city": "Dover",
        "name": "Delaware Airpark",
        "country": "United States"
    },
    {
        "key": "PPD",
        "city": "Humacao",
        "name": "Palmas Del Mar",
        "country": "United States"
    },
    {
        "key": "NZC",
        "city": "Jacksonville",
        "name": "Cecil Field Nas",
        "country": "United States"
    },
    {
        "key": "KYL",
        "city": "Key Largo",
        "name": "Port Largo Arpt",
        "country": "United States"
    },
    {
        "key": "RZH",
        "city": "Lancaster",
        "name": "Quartz Hill Arpt",
        "country": "United States"
    },
    {
        "key": "EZF",
        "city": "Manassas",
        "name": "Shannon Airport",
        "country": "United States"
    },
    {
        "key": "HAX",
        "city": "Muskogee",
        "name": "Hatbox Field Arpt",
        "country": "United States"
    },
    {
        "key": "NWK",
        "city": "New York",
        "name": "Newark Pennsylvania Railway Stn",
        "country": "United States"
    },
    {
        "key": "FLU",
        "city": "New York",
        "name": "Flushing Airport",
        "country": "United States"
    },
    {
        "key": "DWN",
        "city": "Oklahoma City",
        "name": "Downtown Airpark",
        "country": "United States"
    },
    {
        "key": "DWS",
        "city": "Orlando",
        "name": "Walt Disney World Arpt",
        "country": "United States"
    },
    {
        "key": "PVZ",
        "city": "Painesville",
        "name": "Casement Arpt",
        "country": "United States"
    },
    {
        "key": "PFN",
        "city": "Panama City",
        "name": "Bay County Arpt",
        "country": "United States"
    },
    {
        "key": "FLE",
        "city": "Petersburg",
        "name": "Fort Lee AAF",
        "country": "United States"
    },
    {
        "key": "PLB",
        "city": "Plattsburgh",
        "name": "Clinton County Arpt",
        "country": "United States"
    },
    {
        "key": "RZZ",
        "city": "Roanoke Rapids",
        "name": "Halifax Cty Arpt",
        "country": "United States"
    },
    {
        "key": "SFR",
        "city": "San Fernando",
        "name": "San Fernando Airport",
        "country": "United States"
    },
    {
        "key": "SRF",
        "city": "San Rafael",
        "name": "Hamilton AAF",
        "country": "United States"
    },
    {
        "key": "SKY",
        "city": "Sandusky",
        "name": "Griffing Sandusky Arpt",
        "country": "United States"
    },
    {
        "key": "SRU",
        "city": "Santa Cruz",
        "name": "Skypark Arpt",
        "country": "United States"
    },
    {
        "key": "SCR",
        "city": "Scranton",
        "name": "Scranton Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SKJ",
        "city": "Sitinak Island",
        "name": "Sitkinak Arpt",
        "country": "United States"
    },
    {
        "key": "ZSF",
        "city": "Springfield",
        "name": "Pringfield Ma Rr",
        "country": "United States"
    },
    {
        "key": "UCA",
        "city": "Utica",
        "name": "Oneida County Arpt",
        "country": "United States"
    },
    {
        "key": "MKX",
        "city": "Mukalla",
        "name": "Mukalla Arpt",
        "country": "Yemen"
    },
    {
        "key": "CGH",
        "city": "Sao Paulo",
        "name": "Congonhas Arpt",
        "country": "Brazil"
    },
    {
        "key": "KUL",
        "city": "Kuala Lumpur",
        "name": "Kuala Lumpur International Arpt",
        "country": "Malaysia"
    },
    {
        "key": "VID",
        "city": "Bellary",
        "name": "Bellary",
        "country": "India"
    },
    {
        "key": "IHX",
        "city": "Kailashahar",
        "name": "Kailashahar",
        "country": "India"
    },
    {
        "key": "XLL",
        "city": "Alleppey",
        "name": "Alleppey",
        "country": "India"
    },
    {
        "key": "XKU",
        "city": "Kumarakom",
        "name": "Kumarakom",
        "country": "India"
    },
    {
        "key": "XAM",
        "city": "Amreli",
        "name": "Amreli",
        "country": "India"
    },
    {
        "key": "UJA",
        "city": "Ujjain",
        "name": "Ujjain",
        "country": "India"
    },
    {
        "key": "YIC",
        "city": "Yichun (Jiangxi)",
        "name": "Mingyueshan",
        "country": "China"
    },
    {
        "key": "STO",
        "city": "Stockholm",
        "name": "Metropolitan Area",
        "country": "Sweden"
    },
    {
        "key": "LPF",
        "city": "Liupanshui",
        "name": "Yue Zhao",
        "country": "China"
    },
    {
        "key": "QRZ",
        "city": "Resende",
        "name": "Resende",
        "country": "Brazil"
    },
    {
        "key": "ZIA",
        "city": "Zhukovsky",
        "name": "Zhukovsky International Airport",
        "country": "Russia"
    },
    {
        "key": "BZX",
        "city": "Bazhong",
        "name": "Enyang",
        "country": "China"
    },
    {
        "key": "YKH",
        "city": "Yingkou",
        "name": "Yingkou Lanqi",
        "country": "China"
    },
    {
        "key": "XAI",
        "city": "Xinyang",
        "name": "Minggang",
        "country": "China"
    },
    {
        "key": "SQD",
        "city": "Shangrao",
        "name": "Sanqingshan",
        "country": "China"
    },
    {
        "key": "LFQ",
        "city": "Linfen",
        "name": "Qiaoli",
        "country": "China"
    },
    {
        "key": "IRI",
        "city": "Iringa",
        "name": "Iringa Airport",
        "country": "Tanzania"
    },
    {
        "key": "LON",
        "city": "London",
        "name": "London",
        "country": "United Kingdom"
    },
    {
        "key": "MOW",
        "city": "Moscow",
        "name": "Moscow",
        "country": "Russia"
    },
    {
        "key": "WDS",
        "city": "Shiyan",
        "name": "Wudangshan",
        "country": "China"
    },
    {
        "key": "SQJ",
        "city": "Sanming",
        "name": "Shaxian",
        "country": "China"
    },
    {
        "key": "WUT",
        "city": "Xinzhou",
        "name": "Xinzhou Wutaishan",
        "country": "China"
    },
    {
        "key": "LLV",
        "city": "Luliang",
        "name": "Luliang",
        "country": "China"
    },
    {
        "key": "ASS",
        "city": "Arathusa Safari Lodge",
        "name": "Arathusa Safari Lodge",
        "country": "South Africa"
    },
    {
        "key": "LNL",
        "city": "Longnan",
        "name": "Cheng Xian",
        "country": "China"
    },
    {
        "key": "WTB",
        "city": "Wellcamp",
        "name": "Brisbane West Wellcamp Airport",
        "country": "Australia"
    },
    {
        "key": "AHJ",
        "city": "Hongyuan, Sichuan",
        "name": "Hongyuan Airport",
        "country": "China"
    },
    {
        "key": "TEV",
        "city": "Teruel",
        "name": "Teruel Airport",
        "country": "Spain"
    },
    {
        "key": "OLX",
        "city": "Olkiombo, Kenya",
        "name": "Olkiombo Airstrip",
        "country": "Kenya"
    },
    {
        "key": "CIF",
        "city": "Chifeng",
        "name": "Yulong",
        "country": "China"
    },
    {
        "key": "TYO",
        "city": "Tokyo, Honshu",
        "name": "Metropolitan area2",
        "country": "Japan"
    },
    {
        "key": "SAO",
        "city": "SÃ£o Paulo",
        "name": "Metropolitan area1",
        "country": "Brazil"
    },
    {
        "key": "NYC",
        "city": "New York City, New York",
        "name": "Metropolitan area2",
        "country": "United States"
    },
    {
        "key": "USA",
        "city": "Concord",
        "name": "Concord Regional Airport (FAA: JQF)",
        "country": "United States"
    },
    {
        "key": "KOL",
        "city": "East Mackay",
        "name": "Koumala Airport",
        "country": "Australia"
    },
    {
        "key": "OGU",
        "city": "OrduGiresun, Turkey",
        "name": "OrduGiresun Airport",
        "country": "Turkey"
    },
    {
        "key": "NKT",
        "city": "Sirnak / Cizre, Turkey",
        "name": "Sirnak Airport",
        "country": "Turkey"
    },
    {
        "key": "IXX",
        "city": "Bidar",
        "name": "Bidar Airport",
        "country": "India"
    },
    {
        "key": "KTK",
        "city": "Ankula Part",
        "name": "Kunua Airport",
        "country": "India"
    },
    {
        "key": "WLP",
        "city": "Newman",
        "name": "West Angelas Airport",
        "country": "Australia"
    },
    {
        "key": "DGC",
        "city": "Kebri Dehar",
        "name": "Degeh Bur Airport",
        "country": "Ethiopia"
    },
    {
        "key": "AAD",
        "city": "Adado (Cadaado), Galguduud",
        "name": "Adado Airport",
        "country": "Somalia"
    },
    {
        "key": "GNJ",
        "city": "Ganja",
        "name": "Ganja international airport",
        "country": "Azerbaijan"
    },
    {
        "key": "DQO",
        "city": "Delhi",
        "name": "Delhi Municipal",
        "country": "United States"
    },
    {
        "key": "SEL",
        "city": "Seoul",
        "name": "metropolitan area3",
        "country": "South Korea"
    },
    {
        "key": "YTU",
        "city": "Tasu, British Columbia",
        "name": "Tasu Water Aerodrome",
        "country": "Canada"
    },
    {
        "key": "AEM",
        "city": "Amgu, Primorsky Krai",
        "name": "Amgu Airport",
        "country": "Russia"
    },
    {
        "key": "CHG",
        "city": "Chaoyang",
        "name": "Chaoyang Airport",
        "country": "China"
    },
    {
        "key": "DIC",
        "city": "Dili",
        "name": "Dili Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "OMN",
        "city": "Osmanabad",
        "name": "Osmanabad",
        "country": "India"
    },
    {
        "key": "BHZ",
        "city": "Belo Horizonte, Minas Gerais",
        "name": "metropolitan area3",
        "country": "Brazil"
    },
    {
        "key": "TMF",
        "city": "Thimarafushi",
        "name": "Thimarafushi Airport",
        "country": "Maldives"
    },
    {
        "key": "BJS",
        "city": "Beijing",
        "name": "China metropolitan area4",
        "country": "China"
    },
    {
        "key": "IZM",
        "city": "Ä°zmir,",
        "name": "Turkey metropolitan area2",
        "country": "Turkey"
    },
    {
        "key": "BNZ",
        "city": "Banz",
        "name": "Banz Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SPK",
        "city": "Sapporo, Hokkaido",
        "name": "Sapporo metropolitan area5",
        "country": "Japan"
    },
    {
        "key": "DIA",
        "city": "Doha",
        "name": "Doha international airport",
        "country": "Qatar"
    },
    {
        "key": "MZA",
        "city": "Muzaffarnagar",
        "name": "Muzaffarnagar",
        "country": "India"
    },
    {
        "key": "AWT",
        "city": "Awantipur",
        "name": "Awantipur",
        "country": "India"
    },
    {
        "key": "MIL",
        "city": "Milano",
        "name": "Milano",
        "country": "Italy"
    },
    {
        "key": "KHL",
        "city": "Khulna",
        "name": "Khulna",
        "country": "Bangladesh"
    },
    {
        "key": "TSK",
        "city": "Taskul",
        "name": "Taskul Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MFW",
        "city": "Magaruque Island, Mozambique",
        "name": "Magaruque Airport",
        "country": "Mozambique"
    },
    {
        "key": "DWO",
        "city": "Sri Jayawardenepura Kotte",
        "name": "Diyawanna Oya Seaplane Base",
        "country": "Sri Lanka"
    },
    {
        "key": "BUE",
        "city": "Buenos Aires",
        "name": "metropolitan area5",
        "country": "Argentina"
    },
    {
        "key": "QSZ",
        "city": "Kashi Diqu",
        "name": "Shache Airport",
        "country": "China"
    },
    {
        "key": "KIA",
        "city": "Kaiapit",
        "name": "Kaiapit Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "NYS",
        "city": "New York",
        "name": "New York Skyports Seaplane Base",
        "country": "United States"
    },
    {
        "key": "MYS",
        "city": "Moyale",
        "name": "Moyale",
        "country": "Ethiopia"
    },
    {
        "key": "KSG",
        "city": "Kisengan",
        "name": "Kisengan Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MUM",
        "city": "Mumias",
        "name": "Mumias",
        "country": "Kenya"
    },
    {
        "key": "QLR",
        "city": "Monte Real",
        "name": "Monte Real Airport",
        "country": "Portugal"
    },
    {
        "key": "DSL",
        "city": "Daru",
        "name": "Daru",
        "country": "Sierra Leone"
    },
    {
        "key": "YON",
        "city": "Trashigang",
        "name": "Yongphulla Airport",
        "country": "Bhutan"
    },
    {
        "key": "GCT",
        "city": "Grand Canyon",
        "name": "Bar Ten Ranch Airport",
        "country": "United States"
    },
    {
        "key": "BBL",
        "city": "Ballera",
        "name": "Ballera Airport",
        "country": "Australia"
    },
    {
        "key": "GLU",
        "city": "Gelephu",
        "name": "Gelephu Airport",
        "country": "Bhutan"
    },
    {
        "key": "BKN",
        "city": "Balkanabat",
        "name": "Balkanabat Airport",
        "country": "Turkmenistan"
    },
    {
        "key": "GKK",
        "city": "Kooddoo Island",
        "name": "Kooddoo Island Airport",
        "country": "Maldives"
    },
    {
        "key": "DDD",
        "city": "Kudahuvadhoo",
        "name": "Dhaalu Atoll Airport",
        "country": "Maldives"
    },
    {
        "key": "SAJ",
        "city": "Sirajganj",
        "name": "Sirajganj",
        "country": "Bangladesh"
    },
    {
        "key": "MKD",
        "city": "Chagni",
        "name": "Chagni Airport",
        "country": "Ethiopia"
    },
    {
        "key": "RCN",
        "city": "American River",
        "name": "American River",
        "country": "Australia"
    },
    {
        "key": "TGA",
        "city": "Singapore",
        "name": "Tengah Airport",
        "country": "Singapore"
    },
    {
        "key": "JKT",
        "city": "Jakarta",
        "name": "Jakarta",
        "country": "Indonesia"
    },
    {
        "key": "ROM",
        "city": "Roma",
        "name": "Roma",
        "country": "Italy"
    },
    {
        "key": "PAR",
        "city": "Paris",
        "name": "Paris",
        "country": "France"
    },
    {
        "key": "RIO",
        "city": "Rio de Janeiro",
        "name": "Rio de Janeiro",
        "country": "Brazil"
    },
    {
        "key": "WAS",
        "city": "Washington",
        "name": "Washington",
        "country": "United States"
    },
    {
        "key": "BUH",
        "city": "Bucuresti",
        "name": "Bucuresti",
        "country": "Romania"
    },
    {
        "key": "YEA",
        "city": "Edmonton",
        "name": "Edmonton",
        "country": "Canada"
    },
    {
        "key": "YMQ",
        "city": "Montreal",
        "name": "Montreal",
        "country": "Canada"
    },
    {
        "key": "OSA",
        "city": "Osaka",
        "name": "Osaka",
        "country": "Japan"
    },
    {
        "key": "DTT",
        "city": "Detroit",
        "name": "Detroit",
        "country": "United States"
    },
    {
        "key": "REK",
        "city": "Reykjavik",
        "name": "Reykjavik",
        "country": "Iceland"
    },
    {
        "key": "TCI",
        "city": "Tenerife",
        "name": "Tenerife",
        "country": "Spain"
    },
    {
        "key": "BXR",
        "city": "Bam",
        "name": "Bam",
        "country": "Iran"
    },
    {
        "key": "RAU",
        "city": "Rangpur",
        "name": "Rangpur",
        "country": "Bangladesh"
    },
    {
        "key": "KZK",
        "city": "Kompong Thom",
        "name": "Kompong Thom Airport",
        "country": "Cambodia"
    },
    {
        "key": "DUH",
        "city": "Durres",
        "name": "Durres Railway Station",
        "country": "Albania"
    },
    {
        "key": "KTZ",
        "city": "Kwun Tong",
        "name": "Kwun Tong",
        "country": "Hong Kong"
    },
    {
        "key": "TJL",
        "city": "Tres Lagoas",
        "name": "Tres Lagoas Airport",
        "country": "Brazil"
    },
    {
        "key": "PAI",
        "city": "Pailin",
        "name": "Pailin",
        "country": "Cambodia"
    },
    {
        "key": "SUZ",
        "city": "Suria",
        "name": "Suria Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "YGA",
        "city": "Gagnon",
        "name": "Gagnon Airport",
        "country": "Canada"
    },
    {
        "key": "NLI",
        "city": "Nikolayevsk-na-Amure",
        "name": "Nikolayevsk-na-Amure Airport",
        "country": "Russia"
    },
    {
        "key": "QGP",
        "city": "Garanhuns",
        "name": "Garanhuns",
        "country": "Brazil"
    },
    {
        "key": "LLC",
        "city": "Lallo",
        "name": "Cagayan North International Airport (Lallo Airport)",
        "country": "Philippines"
    },
    {
        "key": "AWR",
        "city": "Awar",
        "name": "Awar Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "OSF",
        "city": "Moskva",
        "name": "Ostafyevo International Airport",
        "country": "Russia"
    },
    {
        "key": "VBC",
        "city": "Mandalay",
        "name": "Mandalay Chanmyathazi Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "MRJ",
        "city": "Marcala",
        "name": "Marcala Airport",
        "country": "Honduras"
    },
    {
        "key": "TAV",
        "city": "Tau",
        "name": "Tau Airport (FAA: HI36)",
        "country": "American Samoa"
    },
    {
        "key": "CCT",
        "city": "Catriel",
        "name": "Colonia Catriel Airport",
        "country": "Argentina"
    },
    {
        "key": "BUT",
        "city": "Jakar",
        "name": "Bathpalathang Airport",
        "country": "Bhutan"
    },
    {
        "key": "VDO",
        "city": "Quang ninh province",
        "name": "Van don international airport",
        "country": "Vietnam"
    },
    {
        "key": "LZS",
        "city": "Linz",
        "name": "Linz railway station",
        "country": "Austria"
    },
    {
        "key": "HXD",
        "city": "Haixi Mengguzuzangzuzizhizhou",
        "name": "Delingha Airport",
        "country": "China"
    },
    {
        "key": "WHA",
        "city": "Wuhu",
        "name": "Wuhu xuanzhou arpt",
        "country": "China"
    },
    {
        "key": "UKG",
        "city": "Ust-Kuyga, Yakutia, Russia",
        "name": "Ust-Kuyga Airport",
        "country": "Russia"
    },
    {
        "key": "YTO",
        "city": "Toronto ontario",
        "name": "Toronto pearson international airport",
        "country": "Canada"
    },
    {
        "key": "INP",
        "city": "Naples",
        "name": "Naples Central Railway Station",
        "country": "Italy"
    },
    {
        "key": "INQ",
        "city": "Inisheer, Ireland",
        "name": "Inisheer Aerodrome",
        "country": "Ireland"
    },
    {
        "key": "INR",
        "city": "Sault Ste Marie",
        "name": "Kincheloe AFB",
        "country": "United States"
    },
    {
        "key": "INS",
        "city": "Indian Springs",
        "name": "Creech Air Force Base",
        "country": "United States"
    },
    {
        "key": "INT",
        "city": "Winston-Salem",
        "name": "Smith Reynolds Arpt",
        "country": "United States"
    },
    {
        "key": "SYG",
        "city": "Syangboche",
        "name": "Syangboche Airport",
        "country": "Nepal"
    },
    {
        "key": "INU",
        "city": "Nauru Island",
        "name": "Nauru Intl Arpt",
        "country": "Nauru"
    },
    {
        "key": "INV",
        "city": "Inverness",
        "name": "Inverness Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "INW",
        "city": "Winslow",
        "name": "Winslow Municipal",
        "country": "United States"
    },
    {
        "key": "IOA",
        "city": "Ioannina",
        "name": "Ioannina Arpt",
        "country": "Greece"
    },
    {
        "key": "IOM",
        "city": "Isle Of Man",
        "name": "Ronaldsway Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "IOS",
        "city": "Ilheus",
        "name": "Eduardo Gomes Airport",
        "country": "Brazil"
    },
    {
        "key": "DTU",
        "city": "Heihe",
        "name": "Wudalianchi Airport",
        "country": "China"
    },
    {
        "key": "IOW",
        "city": "Iowa City",
        "name": "Iowa City Municipal Airport",
        "country": "United States"
    },
    {
        "key": "IPC",
        "city": "Easter Island",
        "name": "Mataveri Intl Arpt",
        "country": "Chile"
    },
    {
        "key": "IFU",
        "city": "Ifuru, Raa Atoll, Maldives",
        "name": "Ifuru Airport",
        "country": "Maldives"
    },
    {
        "key": "IPE",
        "city": "Ipil",
        "name": "Ipil Airport",
        "country": "Philippines"
    },
    {
        "key": "IPH",
        "city": "Ipoh",
        "name": "Ipoh Arpt",
        "country": "Malaysia"
    },
    {
        "key": "IPI",
        "city": "Ipiales",
        "name": "San Luis Arpt",
        "country": "Colombia"
    },
    {
        "key": "IPL",
        "city": "El Centro",
        "name": "Imperial County",
        "country": "United States"
    },
    {
        "key": "NTA",
        "city": "Natadola Bay",
        "name": "Natadola Seaplane Base",
        "country": "Fiji"
    },
    {
        "key": "CGD",
        "city": "Changde",
        "name": "Changde Arpt",
        "country": "China"
    },
    {
        "key": "CGE",
        "city": "Cambridge",
        "name": "Cambridge Airport",
        "country": "United States"
    },
    {
        "key": "CGF",
        "city": "Cleveland",
        "name": "Cuyahoga County Airport",
        "country": "United States"
    },
    {
        "key": "CGI",
        "city": "Cape Girardeau",
        "name": "Cape Girardeau Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SWM",
        "city": "Alto Boa Vista, Mato Grosso",
        "name": "Suia Missu Airport",
        "country": "Brazil"
    },
    {
        "key": "USO",
        "city": "Usino",
        "name": "Usino Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "CGK",
        "city": "Jakarta",
        "name": "Soekarno Hatta Intl",
        "country": "Indonesia"
    },
    {
        "key": "CGM",
        "city": "Mambajao",
        "name": "Camiguin Airport",
        "country": "Philippines"
    },
    {
        "key": "CGN",
        "city": "Cologne",
        "name": "Koeln Bonn Arpt",
        "country": "Germany"
    },
    {
        "key": "CGO",
        "city": "Zhengzhou",
        "name": "Zhengzhou Arpt",
        "country": "China"
    },
    {
        "key": "CGP",
        "city": "Chittagong",
        "name": "Patenga Arpt",
        "country": "Bangladesh"
    },
    {
        "key": "GMQ",
        "city": "Golog",
        "name": "Golog Maqin Airport",
        "country": "China"
    },
    {
        "key": "WUI",
        "city": "Murrin Murrin",
        "name": "Murrin Murrin Airport",
        "country": "Australia"
    },
    {
        "key": "KMT",
        "city": "Krong Preah Sihanouk",
        "name": "Kampot Airport",
        "country": "Cambodia"
    },
    {
        "key": "ZDY",
        "city": "Dalma",
        "name": "Dalma Airport",
        "country": "United Arab Emirates"
    },
    {
        "key": "ADV",
        "city": "Nyala",
        "name": "Ed Daein Airport",
        "country": "Sudan"
    },
    {
        "key": "BEA",
        "city": "Kerema",
        "name": "Bereina Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BEM",
        "city": "Beni Mellal, Morocco",
        "name": "Beni Mellal Airport",
        "country": "Morocco"
    },
    {
        "key": "DOS",
        "city": "Dios",
        "name": "Dios Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "DPU",
        "city": "Goroka",
        "name": "Dumpu Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "OFF",
        "city": "Offutt Air Force Base",
        "name": "Offutt Air Force Base",
        "country": "United States"
    },
    {
        "key": "ETM",
        "city": "Eilat",
        "name": "Ramon Airport",
        "country": "Israel"
    },
    {
        "key": "BNQ",
        "city": "Baganga",
        "name": "Baganga Airport",
        "country": "Philippines"
    },
    {
        "key": "AOA",
        "city": "Aroa",
        "name": "Aroa Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SUY",
        "city": "Suntar",
        "name": "Suntar Airport",
        "country": "Russia"
    },
    {
        "key": "KFS",
        "city": "Kastamonu, Turkey",
        "name": "Kastamonu Airport",
        "country": "Turkey"
    },
    {
        "key": "BVF",
        "city": "Bua",
        "name": "Dama Airport",
        "country": "Fiji"
    },
    {
        "key": "JJG",
        "city": "Jaguaruna, Santa Catarina, Brazil",
        "name": "Humberto Ghizzo Bortoluzzi Regional Airport",
        "country": "Brazil"
    },
    {
        "key": "KNL",
        "city": "Kelanoa",
        "name": "Kelanoa Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BAP",
        "city": "Baibara",
        "name": "Baibara Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SHF",
        "city": "Shihezi, Xinjiang",
        "name": "Shihezi Huayuan Airport",
        "country": "China"
    },
    {
        "key": "YDE",
        "city": "Paradise River",
        "name": "Paradise River Airport",
        "country": "Canada"
    },
    {
        "key": "RHR",
        "city": "Ras al Khaimah",
        "name": "Al Hamra Seaplane Base",
        "country": "United Arab Emirates"
    },
    {
        "key": "VBA",
        "city": "Ann",
        "name": "Ann Airport",
        "country": "Burma (Myanmar)"
    },
    {
        "key": "ECI",
        "city": "Rivas",
        "name": "Costa Esmeralda Airport",
        "country": "Nicaragua"
    },
    {
        "key": "DBC",
        "city": "Baicheng",
        "name": "Baicheng Chang an Airport",
        "country": "China"
    },
    {
        "key": "TUT",
        "city": "Tauta",
        "name": "Tauta Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "EDC",
        "city": "Austin",
        "name": "Austin Executive Airport",
        "country": "United States"
    },
    {
        "key": "EVA",
        "city": "Evadale",
        "name": "Landing Strip",
        "country": "United States"
    },
    {
        "key": "WLE",
        "city": "Miles",
        "name": "Miles Airport",
        "country": "Australia"
    },
    {
        "key": "DJH",
        "city": "Dubai",
        "name": "Jebel Ali Seaplane Base",
        "country": "United Arab Emirates"
    },
    {
        "key": "BGN",
        "city": "Belaya Gora",
        "name": "Belaya Gora Airport",
        "country": "Russia"
    },
    {
        "key": "SKI",
        "city": "Tahir",
        "name": "Skikda Airport",
        "country": "Algeria"
    },
    {
        "key": "ODM",
        "city": "Accident",
        "name": "Garrett County Airport (FAA: 2G4)",
        "country": "United States"
    },
    {
        "key": "USR",
        "city": "Ust-Nera",
        "name": "Ust-Nera Airport",
        "country": "Russia"
    },
    {
        "key": "UZR",
        "city": "Urzhar",
        "name": "Urzhar Airport",
        "country": "Kazakhstan"
    },
    {
        "key": "BUU",
        "city": "Bungo Regency, Jambi, Indonesia",
        "name": "Muara Bungo Airport",
        "country": "Indonesia"
    },
    {
        "key": "ZQW",
        "city": "Contwig",
        "name": "ZweibrÃ¼cken Airport",
        "country": "Germany"
    },
    {
        "key": "XSB",
        "city": "Sir Bani Yas, United Arab Emirates",
        "name": "Sir Bani Yas Airport",
        "country": "United Arab Emirates"
    },
    {
        "key": "VYI",
        "city": "Vilyuysk, Yakutia, Russia",
        "name": "Vilyuysk Airport",
        "country": "Russia"
    },
    {
        "key": "JBB",
        "city": "Jember, Indonesia",
        "name": "Notohadinegoro Airport",
        "country": "Indonesia"
    },
    {
        "key": "JEK",
        "city": "Jeki, Zambia",
        "name": "Jeki Airstrip",
        "country": "Zambia"
    },
    {
        "key": "PVL",
        "city": "Pikeville",
        "name": "Pike County Airport (FAA: PBX)",
        "country": "United States"
    },
    {
        "key": "YKO",
        "city": "Hakkar Yuksekova, Turkey",
        "name": "Hakkari Yuksekova Airport",
        "country": "Turkey"
    },
    {
        "key": "NYR",
        "city": "Nyurba",
        "name": "Nyurba Airport",
        "country": "Russia"
    },
    {
        "key": "NMF",
        "city": "Maafaru",
        "name": "Maafaru international airport",
        "country": "Maldives"
    },
    {
        "key": "HRH",
        "city": "Aligarh city",
        "name": "Aligarh airport",
        "country": "India"
    },
    {
        "key": "CGQ",
        "city": "Changchun",
        "name": "Changchun Arpt",
        "country": "China"
    },
    {
        "key": "CGR",
        "city": "Campogrande",
        "name": "Internacional",
        "country": "Brazil"
    },
    {
        "key": "IPN",
        "city": "Ipatinga",
        "name": "Usiminas Arpt",
        "country": "Brazil"
    },
    {
        "key": "KNJ",
        "city": "Kindamba, Republic of the Congo",
        "name": "Kindamba Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "IPT",
        "city": "Williamsport",
        "name": "Williamsport Lycoming Municipal",
        "country": "United States"
    },
    {
        "key": "CGS",
        "city": "College Park",
        "name": "College Park",
        "country": "United States"
    },
    {
        "key": "IPW",
        "city": "Ipswich",
        "name": "Ipswitch Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "CGT",
        "city": "Chinguetti",
        "name": "Chinguetti Airport",
        "country": "Mauritania"
    },
    {
        "key": "IQN",
        "city": "Qingyang",
        "name": "Qingyang Airport",
        "country": "China"
    },
    {
        "key": "IQQ",
        "city": "Iquique",
        "name": "Cavancha Chucumata Arpt",
        "country": "Chile"
    },
    {
        "key": "CGY",
        "city": "Cagayan",
        "name": "Lumbia Arpt",
        "country": "Philippines"
    },
    {
        "key": "IQT",
        "city": "Iquitos",
        "name": "C F Secada Arpt",
        "country": "Peru"
    },
    {
        "key": "CGZ",
        "city": "Casa Grande",
        "name": "Casa Grande Arpt",
        "country": "United States"
    },
    {
        "key": "IRB",
        "city": "Iraan",
        "name": "Iraan Municipal Airport (FAA: 2F0)",
        "country": "United States"
    },
    {
        "key": "CHA",
        "city": "Chattanooga",
        "name": "Chattanooga Lovell Fld",
        "country": "United States"
    },
    {
        "key": "IRC",
        "city": "Circle",
        "name": "Circle City Arpt",
        "country": "United States"
    },
    {
        "key": "CHC",
        "city": "Christchurch",
        "name": "Christchurch Arpt",
        "country": "New Zealand"
    },
    {
        "key": "CHF",
        "city": "Jinhae, South Korea",
        "name": "Jinhae Airport",
        "country": "South Korea"
    },
    {
        "key": "IRD",
        "city": "Ishurdi",
        "name": "Ishurdi",
        "country": "Bangladesh"
    },
    {
        "key": "IRE",
        "city": "IrecÃª, Bahia, Brazil",
        "name": "IrecÃª Airport",
        "country": "Brazil"
    },
    {
        "key": "IRG",
        "city": "Lockhart",
        "name": "Lockhart River Arpt",
        "country": "Australia"
    },
    {
        "key": "CHH",
        "city": "Chachapoyas",
        "name": "Chachapoyas Airport",
        "country": "Peru"
    },
    {
        "key": "CHI",
        "city": "Chicago",
        "name": "Chicago",
        "country": "United States"
    },
    {
        "key": "CHJ",
        "city": "Chipinge",
        "name": "Chipinge Airport",
        "country": "Zimbabwe"
    },
    {
        "key": "IRJ",
        "city": "La Rioja",
        "name": "La Rioja Arpt",
        "country": "Argentina"
    },
    {
        "key": "IRK",
        "city": "Kirksville",
        "name": "Kirksville Municipal",
        "country": "United States"
    },
    {
        "key": "CHK",
        "city": "Chickasha",
        "name": "Chickasha",
        "country": "United States"
    },
    {
        "key": "CHL",
        "city": "Challis",
        "name": "Challis Airport",
        "country": "United States"
    },
    {
        "key": "IRM",
        "city": "IGRIM",
        "name": "IGRIM ARPT",
        "country": "Russian Federation"
    },
    {
        "key": "CHM",
        "city": "Nuevo Chimbote District",
        "name": "Tnte. FAP Jaime Montreuil Morales Airport",
        "country": "Peru"
    },
    {
        "key": "IRN",
        "city": "Brus Laguna",
        "name": "Iriona Airport",
        "country": "Honduras"
    },
    {
        "key": "IRO",
        "city": "Birao, Central African Republic",
        "name": "Birao Airport",
        "country": "Central African Republic"
    },
    {
        "key": "CHN",
        "city": "Jeonju-si",
        "name": "Jeonju Airport",
        "country": "South Korea"
    },
    {
        "key": "IRS",
        "city": "Sturgis",
        "name": "Kirsch Municipal",
        "country": "United States"
    },
    {
        "key": "CHO",
        "city": "Charlottesville",
        "name": "Charlottesville Albemarle Arpt",
        "country": "United States"
    },
    {
        "key": "IRT",
        "city": "Rome",
        "name": "Roma Tiburtina Rail Station",
        "country": "Italy"
    },
    {
        "key": "CHP",
        "city": "Circle Hot Springs",
        "name": "Circle Hot Springs Arpt",
        "country": "United States"
    },
    {
        "key": "ISA",
        "city": "Mount Isa",
        "name": "Mount Isa Arpt",
        "country": "Australia"
    },
    {
        "key": "KNK",
        "city": "Kakhonak",
        "name": "Kakhonak Arpt",
        "country": "United States"
    },
    {
        "key": "CHQ",
        "city": "Chania",
        "name": "Souda Arpt",
        "country": "Greece"
    },
    {
        "key": "ISB",
        "city": "Islamabad",
        "name": "Islamabad Intl",
        "country": "Pakistan"
    },
    {
        "key": "CHR",
        "city": "Chateauroux",
        "name": "Chateauroux Arpt",
        "country": "France"
    },
    {
        "key": "ISC",
        "city": "Isles Of Scilly",
        "name": "St Marys Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CHS",
        "city": "Charleston",
        "name": "Charleston Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CHU",
        "city": "Chuathbaluk",
        "name": "Chuathbaluk Arpt",
        "country": "United States"
    },
    {
        "key": "JRF",
        "city": "Kapolei",
        "name": "Kalaeloa Airport (John Rodgers Field)",
        "country": "United States"
    },
    {
        "key": "ISE",
        "city": "Isparta",
        "name": "Isparta Airport",
        "country": "Turkey"
    },
    {
        "key": "ISG",
        "city": "Ishigaki",
        "name": "Ishigaki Airport",
        "country": "Japan"
    },
    {
        "key": "ISH",
        "city": "Ischia",
        "name": "Ischia Arpt",
        "country": "Italy"
    },
    {
        "key": "ISI",
        "city": "Isisford",
        "name": "Isisford Airport",
        "country": "Australia"
    },
    {
        "key": "ISJ",
        "city": "Isla Mujeres",
        "name": "Isla Mujeres Arpt",
        "country": "Mexico"
    },
    {
        "key": "ISK",
        "city": "Nasik",
        "name": "Ozar Airport",
        "country": "India"
    },
    {
        "key": "ISL",
        "city": "Isabel Pass",
        "name": "Isabel Pass Arpt",
        "country": "United States"
    },
    {
        "key": "ISM",
        "city": "Kissimmee",
        "name": "Kissimmee Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ISN",
        "city": "Williston",
        "name": "Sloulin Field Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ISO",
        "city": "Kinston",
        "name": "East Reg Jetport Stallings",
        "country": "United States"
    },
    {
        "key": "ISP",
        "city": "Islip",
        "name": "Long Island Macarthur Arpt",
        "country": "United States"
    },
    {
        "key": "ISQ",
        "city": "Manistique",
        "name": "Schoolcraft County Arpt",
        "country": "United States"
    },
    {
        "key": "ISS",
        "city": "Wiscasset",
        "name": "Wiscasset Arpt",
        "country": "United States"
    },
    {
        "key": "IST",
        "city": "Istanbul",
        "name": "Istanbul airport",
        "country": "Turkey"
    },
    {
        "key": "ISU",
        "city": "Sulaymaniyah",
        "name": "Sulaymaniyah Intl ARPT",
        "country": "Iraq"
    },
    {
        "key": "ISW",
        "city": "Wisconsin Rapids",
        "name": "Alexander Field",
        "country": "United States"
    },
    {
        "key": "ITA",
        "city": "Itacoatiara, Amazonas, Brazil",
        "name": "Itacoatiara Airport",
        "country": "Brazil"
    },
    {
        "key": "ITB",
        "city": "Itaituba, ParÃ¡, Brazil",
        "name": "Itaituba Airport",
        "country": "Brazil"
    },
    {
        "key": "ITH",
        "city": "Ithaca",
        "name": "Tomkins County",
        "country": "United States"
    },
    {
        "key": "ITK",
        "city": "Itokama",
        "name": "ITOKAMA AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "ITM",
        "city": "Osaka",
        "name": "Itami Arpt",
        "country": "Japan"
    },
    {
        "key": "ITO",
        "city": "Hilo",
        "name": "Hilo Hawaii Intl",
        "country": "United States"
    },
    {
        "key": "ITP",
        "city": "Itaperuna",
        "name": "Itaperuna Arpt",
        "country": "Brazil"
    },
    {
        "key": "ITQ",
        "city": "Itaqui, Rio Grande do Sul, Brazil",
        "name": "Itaqui Airport",
        "country": "Brazil"
    },
    {
        "key": "ITR",
        "city": "Itumbiara, GoiÃ¡s, Brazil",
        "name": "Itumbiara Airport",
        "country": "Brazil"
    },
    {
        "key": "IUE",
        "city": "Niue Island",
        "name": "Hanan Arpt",
        "country": "Niue"
    },
    {
        "key": "IVC",
        "city": "Invercargill",
        "name": "Invercargill Arpt",
        "country": "New Zealand"
    },
    {
        "key": "IVL",
        "city": "Ivalo",
        "name": "Ivalo Arpt",
        "country": "Finland"
    },
    {
        "key": "IVR",
        "city": "Inverell",
        "name": "Inverell Arpt",
        "country": "Australia"
    },
    {
        "key": "IWA",
        "city": "Ivanovo",
        "name": "Ivanovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "IWD",
        "city": "Ironwood",
        "name": "Ironwood Arpt",
        "country": "United States"
    },
    {
        "key": "IWJ",
        "city": "Iwami",
        "name": "Iwami Arpt",
        "country": "Japan"
    },
    {
        "key": "IWS",
        "city": "Houston",
        "name": "West Houston",
        "country": "United States"
    },
    {
        "key": "IXA",
        "city": "Agartala",
        "name": "Singerbhil Arpt",
        "country": "India"
    },
    {
        "key": "IXB",
        "city": "Bagdogra",
        "name": "Bagdogra Arpt",
        "country": "India"
    },
    {
        "key": "IXC",
        "city": "Chandigarh",
        "name": "Chandigarh Arpt",
        "country": "India"
    },
    {
        "key": "IXD",
        "city": "Prayagraj",
        "name": "Prayagraj airport",
        "country": "India"
    },
    {
        "key": "IXE",
        "city": "Mangalore",
        "name": "Bajpe Arpt",
        "country": "India"
    },
    {
        "key": "IXG",
        "city": "Belgaum",
        "name": "Belagavi airport",
        "country": "India"
    },
    {
        "key": "IXH",
        "city": "Kailashahar",
        "name": "Kailashahar Airport",
        "country": "India"
    },
    {
        "key": "IXI",
        "city": "Lilabari",
        "name": "Lilabari Arpt",
        "country": "India"
    },
    {
        "key": "IXJ",
        "city": "Jammu",
        "name": "Satwari Arpt",
        "country": "India"
    },
    {
        "key": "IXK",
        "city": "Keshod",
        "name": "Keshod Airport",
        "country": "India"
    },
    {
        "key": "IXL",
        "city": "Leh IN",
        "name": "Leh Kushok Bakula Rimpochee Arpt",
        "country": "India"
    },
    {
        "key": "IXM",
        "city": "Madurai",
        "name": "Madurai Airport",
        "country": "India"
    },
    {
        "key": "IXN",
        "city": "khowai",
        "name": "khowai Airport",
        "country": "India"
    },
    {
        "key": "IXP",
        "city": "Pathankot",
        "name": "Pathankot Arpt",
        "country": "India"
    },
    {
        "key": "IXQ",
        "city": "Kamalpur",
        "name": "Kamalpur Airport",
        "country": "India"
    },
    {
        "key": "IXR",
        "city": "Ranchi",
        "name": "Birsa Munda Arpt",
        "country": "India"
    },
    {
        "key": "IXS",
        "city": "Silchar",
        "name": "Kumbhigram Arpt",
        "country": "India"
    },
    {
        "key": "IXT",
        "city": "Pasighat",
        "name": "Pasighat Airport",
        "country": "India"
    },
    {
        "key": "IXU",
        "city": "Aurangabad",
        "name": "Aurangabad airport",
        "country": "India"
    },
    {
        "key": "IXV",
        "city": "Along",
        "name": "Along Airport",
        "country": "India"
    },
    {
        "key": "IXW",
        "city": "Jamshedpur",
        "name": "Sonari Arpt",
        "country": "India"
    },
    {
        "key": "IXY",
        "city": "Kandla",
        "name": "Kandla Arpt",
        "country": "India"
    },
    {
        "key": "IXZ",
        "city": "Port Blair",
        "name": "Veer Savarkar Arpt",
        "country": "India"
    },
    {
        "key": "IYK",
        "city": "Inyokern",
        "name": "Kern Cty Airport",
        "country": "United States"
    },
    {
        "key": "IZA",
        "city": "Juiz de Fora, Minas Gerais, Brazil",
        "name": "Presidente Itamar Franco Airport (Zona da Mata Regional Airport)",
        "country": "Brazil"
    },
    {
        "key": "IZO",
        "city": "Izumo",
        "name": "Izumo Arpt",
        "country": "Japan"
    },
    {
        "key": "IZT",
        "city": "Ixtepec",
        "name": "Ixtepec Arpt",
        "country": "Mexico"
    },
    {
        "key": "JAA",
        "city": "Jalalabad",
        "name": "Jalalabad Airport",
        "country": "Afghanistan"
    },
    {
        "key": "JAB",
        "city": "Jabiru",
        "name": "Jabiru Arpt",
        "country": "Australia"
    },
    {
        "key": "JAC",
        "city": "Jackson",
        "name": "Jackson Hole Arpt",
        "country": "United States"
    },
    {
        "key": "JAD",
        "city": "Jandakot",
        "name": "Jandakot Airport",
        "country": "Australia"
    },
    {
        "key": "JAE",
        "city": "Atlanta",
        "name": "Technology Park Arpt",
        "country": "United States"
    },
    {
        "key": "JAF",
        "city": "Palaly",
        "name": "Jaffna International Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "JAI",
        "city": "Jaipur",
        "name": "Sanganeer Arpt",
        "country": "India"
    },
    {
        "key": "JAJ",
        "city": "Atlanta",
        "name": "Perimeter Hlpt",
        "country": "United States"
    },
    {
        "key": "JAK",
        "city": "Jacmel",
        "name": "Jacmel Airport",
        "country": "Haiti"
    },
    {
        "key": "JAL",
        "city": "Jalapa",
        "name": "Jalapa Arpt",
        "country": "Mexico"
    },
    {
        "key": "JAM",
        "city": "Yambol, Bulgaria",
        "name": "Bezmer Air Base",
        "country": "Bulgaria"
    },
    {
        "key": "JAN",
        "city": "Jackson",
        "name": "Jackson Evers Intl Arpt",
        "country": "United States"
    },
    {
        "key": "JAO",
        "city": "Atlanta",
        "name": "Beaver Ruin Helpt",
        "country": "United States"
    },
    {
        "key": "JAP",
        "city": "Punta Renes",
        "name": "Punta Renes Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "KNM",
        "city": "Kaniama",
        "name": "Kaniama Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "KNN",
        "city": "Kankan, Guinea",
        "name": "Kankan Airport (Diankana Airport)",
        "country": "Guinea"
    },
    {
        "key": "KNO",
        "city": "Sumatera",
        "name": "Kualanamu Airport",
        "country": "Indonesia"
    },
    {
        "key": "KNP",
        "city": "Capanda",
        "name": "Kapanda Airport",
        "country": "Angola"
    },
    {
        "key": "KNQ",
        "city": "Kone",
        "name": "KonÃ© Airport",
        "country": "New Caledonia"
    },
    {
        "key": "KNR",
        "city": "Jam",
        "name": "Jam Airport",
        "country": "Iran"
    },
    {
        "key": "KNS",
        "city": "King Island",
        "name": "King Island Arpt",
        "country": "Australia"
    },
    {
        "key": "KNT",
        "city": "Kennett",
        "name": "Kennett Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "KNU",
        "city": "Kanpur",
        "name": "Chakeri Arpt",
        "country": "India"
    },
    {
        "key": "KNW",
        "city": "Anchorage",
        "name": "New Stuyahok Airport",
        "country": "United States"
    },
    {
        "key": "KNX",
        "city": "Kununurra",
        "name": "Kununurra Airport",
        "country": "Australia"
    },
    {
        "key": "KOA",
        "city": "Kona",
        "name": "Keahole Arpt",
        "country": "United States"
    },
    {
        "key": "KOC",
        "city": "Koumac",
        "name": "Koumac Arpt",
        "country": "New Caledonia"
    },
    {
        "key": "KOD",
        "city": "Kotabangun, Indonesia",
        "name": "Kotabangun Airport",
        "country": "Indonesia"
    },
    {
        "key": "KOE",
        "city": "Kupang",
        "name": "El Tari Aiport",
        "country": "Indonesia"
    },
    {
        "key": "KOF",
        "city": "KOMATIPOORT",
        "name": "KOMATIPOORT AIRPORT",
        "country": "South Africa"
    },
    {
        "key": "KOG",
        "city": "Khong",
        "name": "Khong Airport",
        "country": "Laos"
    },
    {
        "key": "KOH",
        "city": "Maramie",
        "name": "Koolatah Airport",
        "country": "Australia"
    },
    {
        "key": "KOI",
        "city": "Kirkwall",
        "name": "Kirkwall Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "KOJ",
        "city": "Kagoshima",
        "name": "Kagoshima Arpt",
        "country": "Japan"
    },
    {
        "key": "KOK",
        "city": "Kokkola",
        "name": "Kokkola Arpt",
        "country": "Finland"
    },
    {
        "key": "KOM",
        "city": "Lamu",
        "name": "Komo-Manda Airport",
        "country": "Kenya"
    },
    {
        "key": "KON",
        "city": "ThÃ nh phá»‘ Pleiku",
        "name": "Kontum Airport",
        "country": "Vietnam"
    },
    {
        "key": "KOO",
        "city": "Kongolo",
        "name": "Kongolo Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "KOP",
        "city": "Nakhon Phanom",
        "name": "Nakhon Phanom Arpt",
        "country": "Thailand"
    },
    {
        "key": "KOQ",
        "city": "KÃ¶then",
        "name": "KÃ¶then Airport",
        "country": "Germany"
    },
    {
        "key": "KOR",
        "city": "Kokoro",
        "name": "Kokoro Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "KOS",
        "city": "Sihanoukville",
        "name": "Sihanoukville International",
        "country": "Cambodia"
    },
    {
        "key": "KOT",
        "city": "Kotlik",
        "name": "Kotlik Airport (FAA: 2A9)",
        "country": "United States"
    },
    {
        "key": "KOU",
        "city": "Koulamoutou, Gabon",
        "name": "Koulamoutou Airport",
        "country": "Gabon"
    },
    {
        "key": "KOV",
        "city": "Kokshetau",
        "name": "Kokshetau",
        "country": "Kazakhstan"
    },
    {
        "key": "KOW",
        "city": "Ganzhou",
        "name": "Ganzhou Arpt",
        "country": "China"
    },
    {
        "key": "KOX",
        "city": "Kokonao, Indonesia",
        "name": "Kokonao Airport",
        "country": "Indonesia"
    },
    {
        "key": "KOZ",
        "city": "Ouzinkie",
        "name": "Ouzinkie Airport (FAA: 4K5)",
        "country": "United States"
    },
    {
        "key": "KPB",
        "city": "Point Baker",
        "name": "Point Baker Arpt",
        "country": "United States"
    },
    {
        "key": "KPD",
        "city": "King Of Prussia",
        "name": "King Of Prussia Arpt",
        "country": "United States"
    },
    {
        "key": "KPF",
        "city": "Kondubol",
        "name": "Kondubol Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KPG",
        "city": "Kurupung",
        "name": "Kurupung Airport",
        "country": "Guyana"
    },
    {
        "key": "KPH",
        "city": "Pauloff Harbor",
        "name": "Pauloff Arpt",
        "country": "United States"
    },
    {
        "key": "KPL",
        "city": "Kapal",
        "name": "Kapal Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KPN",
        "city": "Kipnuk",
        "name": "Kipnuk Airport (FAA: IIK)",
        "country": "United States"
    },
    {
        "key": "KPO",
        "city": "Pohang",
        "name": "Pohang Arpt",
        "country": "Korea"
    },
    {
        "key": "KPS",
        "city": "Kempsey",
        "name": "Kempsey Arpt",
        "country": "Australia"
    },
    {
        "key": "KPT",
        "city": "Jackpot",
        "name": "Jackpot Airport (Hayden Field) (FAA: 06U)",
        "country": "United States"
    },
    {
        "key": "KPV",
        "city": "Perryville",
        "name": "Perryville Airport (FAA: PEV)",
        "country": "United States"
    },
    {
        "key": "KPY",
        "city": "Port Bailey",
        "name": "Port Bailey Sea Plane Base",
        "country": "United States"
    },
    {
        "key": "KQL",
        "city": "Kol",
        "name": "Kol",
        "country": "Papua New Guinea"
    },
    {
        "key": "KRB",
        "city": "Karumba",
        "name": "Karumba Arpt",
        "country": "Australia"
    },
    {
        "key": "KRC",
        "city": "Kerinci, Indonesia",
        "name": "Depati Parbo Airport",
        "country": "Indonesia"
    },
    {
        "key": "KRE",
        "city": "Butare",
        "name": "Kirundo Airport",
        "country": "Rwanda"
    },
    {
        "key": "KRF",
        "city": "Kramfors",
        "name": "Kramfors Arpt",
        "country": "Sweden"
    },
    {
        "key": "KRJ",
        "city": "Karawari",
        "name": "Karawari Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KRK",
        "city": "Krakow",
        "name": "John Paul II International",
        "country": "Poland"
    },
    {
        "key": "KRL",
        "city": "Bayingol",
        "name": "Korla Airport",
        "country": "China"
    },
    {
        "key": "KRM",
        "city": "Karanambo",
        "name": "Karanambo Airport",
        "country": "Guyana"
    },
    {
        "key": "KRN",
        "city": "Kiruna",
        "name": "Kiruna Airport",
        "country": "Sweden"
    },
    {
        "key": "KRO",
        "city": "Kurgan",
        "name": "Kurgan Airport",
        "country": "Russian Federation"
    },
    {
        "key": "KRP",
        "city": "Karup",
        "name": "Karup Arpt",
        "country": "Denmark"
    },
    {
        "key": "KRQ",
        "city": "Kramatorsk",
        "name": "Kramatorsk Airport",
        "country": "Ukraine"
    },
    {
        "key": "KRR",
        "city": "Krasnodar",
        "name": "Krasnodar Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KRS",
        "city": "Kristiansand",
        "name": "Kjevik Airport",
        "country": "Norway"
    },
    {
        "key": "KRT",
        "city": "Khartoum",
        "name": "Civil Arpt",
        "country": "Sudan"
    },
    {
        "key": "KRU",
        "city": "Kerau",
        "name": "Kerau Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KRW",
        "city": "Turkmanbashi",
        "name": "Turkmanbashi Arpt",
        "country": "Turkmenistan"
    },
    {
        "key": "KRY",
        "city": "Kelamayi Shi",
        "name": "Karamay Airport",
        "country": "China"
    },
    {
        "key": "KSA",
        "city": "Kosrae",
        "name": "Kosrae International",
        "country": "Federated States of Micronesia"
    },
    {
        "key": "KSC",
        "city": "Kosice",
        "name": "Barca Arpt",
        "country": "Slovakia"
    },
    {
        "key": "KSD",
        "city": "Karlstad",
        "name": "Karlstad Arpt",
        "country": "Sweden"
    },
    {
        "key": "KSE",
        "city": "Kasese",
        "name": "Kasese Airport",
        "country": "Uganda"
    },
    {
        "key": "KSF",
        "city": "Kassel",
        "name": "Kassel Calden Arpt",
        "country": "Germany"
    },
    {
        "key": "KSH",
        "city": "Kermanshah",
        "name": "Kermanshah Arpt",
        "country": "Iran"
    },
    {
        "key": "KSI",
        "city": "Kissidougou",
        "name": "Kissidougou Airport",
        "country": "Guinea"
    },
    {
        "key": "DCM",
        "city": "Castres",
        "name": "Mazamet Arpt",
        "country": "France"
    },
    {
        "key": "KSJ",
        "city": "Kasos Island, Greece",
        "name": "Kasos Island Public Airport",
        "country": "Greece"
    },
    {
        "key": "KSK",
        "city": "Karlskoga",
        "name": "Karlskoga Airport",
        "country": "Sweden"
    },
    {
        "key": "KSL",
        "city": "Kassala, Sudan",
        "name": "Kassala Airport",
        "country": "Sudan"
    },
    {
        "key": "KSM",
        "city": "St. Marys, Alaska, United States",
        "name": "St Marys Airport",
        "country": "United Kingdom"
    },
    {
        "key": "KSN",
        "city": "Kostanay",
        "name": "Kostanay Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "KSO",
        "city": "Kastoria",
        "name": "Aristoteles Arpt",
        "country": "Greece"
    },
    {
        "key": "KSP",
        "city": "Kosipe",
        "name": "Kosipe Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KSQ",
        "city": "Karshi",
        "name": "Karshi Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "KSR",
        "city": "Sandy River",
        "name": "Sandy River Airpor",
        "country": "United States"
    },
    {
        "key": "KSS",
        "city": "Sikasso",
        "name": "Sikasso Airport",
        "country": "Mali"
    },
    {
        "key": "KST",
        "city": "Kosti",
        "name": "Rabak Airport",
        "country": "Sudan"
    },
    {
        "key": "KSU",
        "city": "Kristiansund",
        "name": "Kvernberget Arpt",
        "country": "Norway"
    },
    {
        "key": "KSW",
        "city": "Kiryat Shmona",
        "name": "Kiryat Shmona Arpt",
        "country": "Israel"
    },
    {
        "key": "KSY",
        "city": "Kars",
        "name": "Kars Arpt",
        "country": "Turkey"
    },
    {
        "key": "KSZ",
        "city": "Kotlas, Arkhangelsk Oblast, Russia",
        "name": "Kotlas Airport",
        "country": "Russia"
    },
    {
        "key": "KTA",
        "city": "Karratha",
        "name": "Karratha Airport",
        "country": "Australia"
    },
    {
        "key": "KTB",
        "city": "Thorne Bay",
        "name": "Thorne Bay Seaplane Base",
        "country": "United States"
    },
    {
        "key": "KTC",
        "city": "Katiola",
        "name": "Katiola Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "KTD",
        "city": "Kitadaito",
        "name": "Kitadaito Airport",
        "country": "Japan"
    },
    {
        "key": "KTE",
        "city": "Kerteh",
        "name": "Kertech Arpt",
        "country": "Malaysia"
    },
    {
        "key": "KTH",
        "city": "Dillingham",
        "name": "Tikchik Lodge Seaplane Base (FAA: AK56)",
        "country": "United States"
    },
    {
        "key": "KTI",
        "city": "Kratie",
        "name": "Kratie Airport",
        "country": "Cambodia"
    },
    {
        "key": "KTL",
        "city": "Kitale",
        "name": "Kitale Airport",
        "country": "Kenya"
    },
    {
        "key": "KTM",
        "city": "Kathmandu",
        "name": "Tribuvan Arpt",
        "country": "Nepal"
    },
    {
        "key": "KTN",
        "city": "Ketchikan",
        "name": "Ketchikan Intl Arpt",
        "country": "United States"
    },
    {
        "key": "KTO",
        "city": "Kato",
        "name": "Kato Airport",
        "country": "Guyana"
    },
    {
        "key": "KTP",
        "city": "Kingston",
        "name": "Tinson Arpt",
        "country": "Jamaica"
    },
    {
        "key": "KTQ",
        "city": "Kitee",
        "name": "Kitee",
        "country": "Finland"
    },
    {
        "key": "KTR",
        "city": "Katherine",
        "name": "Tindal Airport",
        "country": "Australia"
    },
    {
        "key": "KTS",
        "city": "Brevig Mission",
        "name": "Brevig Mission Arpt",
        "country": "United States"
    },
    {
        "key": "KTT",
        "city": "Kittila",
        "name": "Kittila Arpt",
        "country": "Finland"
    },
    {
        "key": "KTU",
        "city": "Kota",
        "name": "Kota Airport",
        "country": "India"
    },
    {
        "key": "KTW",
        "city": "Katowice",
        "name": "Pyrzowice",
        "country": "Poland"
    },
    {
        "key": "KTX",
        "city": "Koutiala",
        "name": "Koutiala Airport",
        "country": "Mali"
    },
    {
        "key": "KUA",
        "city": "Kuantan",
        "name": "Kuantan Arpt",
        "country": "Malaysia"
    },
    {
        "key": "KUC",
        "city": "Kuria",
        "name": "Kuria",
        "country": "Kiribati"
    },
    {
        "key": "KUD",
        "city": "Kudat",
        "name": "Kudat Arpt",
        "country": "Malaysia"
    },
    {
        "key": "KUE",
        "city": "Kolombangara",
        "name": "Kukundu Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "KUF",
        "city": "Samara",
        "name": "Samara Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KUG",
        "city": "Kubin Island",
        "name": "Kubin Airport",
        "country": "Australia"
    },
    {
        "key": "KUH",
        "city": "Kushiro",
        "name": "Kushiro Arpt",
        "country": "Japan"
    },
    {
        "key": "KUK",
        "city": "Kasigluk",
        "name": "Kasigluk Arpt",
        "country": "United States"
    },
    {
        "key": "KUN",
        "city": "Kaunas",
        "name": "Kaunas Arpt",
        "country": "Lithuania"
    },
    {
        "key": "KUO",
        "city": "Kuopio",
        "name": "Kuopio Arpt",
        "country": "Finland"
    },
    {
        "key": "KUQ",
        "city": "Kuri",
        "name": "Kuri Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KUR",
        "city": "Koran va Monjan",
        "name": "Razer Airport",
        "country": "Afghanistan"
    },
    {
        "key": "KUS",
        "city": "Kulusuk",
        "name": "Kulusuk Arpt",
        "country": "Greenland"
    },
    {
        "key": "KUT",
        "city": "Kutaisi",
        "name": "Kutaisi International Airport",
        "country": "Georgia"
    },
    {
        "key": "KUU",
        "city": "Kulu",
        "name": "Bhuntar Arpt",
        "country": "India"
    },
    {
        "key": "KUV",
        "city": "Kunsan",
        "name": "Kunsan Arpt",
        "country": "Korea"
    },
    {
        "key": "KUW",
        "city": "Kugururok River",
        "name": "Kugururok River Airport",
        "country": "United States"
    },
    {
        "key": "KUY",
        "city": "Kamusi",
        "name": "Kamusi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KVA",
        "city": "Kavalla",
        "name": "Megas Alexandros",
        "country": "Greece"
    },
    {
        "key": "KVB",
        "city": "Skovde",
        "name": "Skovde Arpt",
        "country": "Sweden"
    },
    {
        "key": "KVD",
        "city": "Gyandzhan",
        "name": "Gyandzha Airport",
        "country": "Azerbaijan"
    },
    {
        "key": "KVG",
        "city": "Kavieng",
        "name": "Kavieng Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "KVX",
        "city": "Kirov Pobedilovo",
        "name": "KIROV ARPT",
        "country": "Russian Federation"
    },
    {
        "key": "KWA",
        "city": "Kwajalein",
        "name": "Kwajalein Arpt",
        "country": "Marshall Islands"
    },
    {
        "key": "KWE",
        "city": "Guiyang",
        "name": "Guiyang Arpt",
        "country": "China"
    },
    {
        "key": "KWF",
        "city": "Waterfall",
        "name": "Waterfall Spb",
        "country": "United States"
    },
    {
        "key": "KWG",
        "city": "Krivoy Rog",
        "name": "Krivoy Rog Arpt",
        "country": "Ukraine"
    },
    {
        "key": "KWH",
        "city": "Termez",
        "name": "Khwahan Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "KWI",
        "city": "Kuwait",
        "name": "Kuwait Intl",
        "country": "Kuwait"
    },
    {
        "key": "KWJ",
        "city": "Kwangju",
        "name": "Kwangju Arpt",
        "country": "Korea"
    },
    {
        "key": "KWL",
        "city": "Guilin",
        "name": "Guilin Airport",
        "country": "China"
    },
    {
        "key": "KWM",
        "city": "Kowanyama",
        "name": "Kowanyama Airport",
        "country": "Australia"
    },
    {
        "key": "KWN",
        "city": "Quinhagak",
        "name": "Quinhagak Airport (FAA: AQH)",
        "country": "United States"
    },
    {
        "key": "KWO",
        "city": "Kawito",
        "name": "Kawito Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KWR",
        "city": "Kwai Harbour",
        "name": "Kwai Harbour Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "KWT",
        "city": "Kwethluk",
        "name": "Kwethluk Airport",
        "country": "United States"
    },
    {
        "key": "KWY",
        "city": "Lamu",
        "name": "Kiwayu Airport",
        "country": "Kenya"
    },
    {
        "key": "KWZ",
        "city": "Kolwezi",
        "name": "Kolwezi Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "KXA",
        "city": "Thorne Bay",
        "name": "Kasaan Seaplane Base",
        "country": "United States"
    },
    {
        "key": "KXF",
        "city": "Koro Island",
        "name": "Koro Airport",
        "country": "Fiji"
    },
    {
        "key": "DCN",
        "city": "Derby",
        "name": "Curtain Arpt",
        "country": "Australia"
    },
    {
        "key": "JAR",
        "city": "Jahrom",
        "name": "Jahrom Airport",
        "country": "Iran"
    },
    {
        "key": "JAT",
        "city": "Jabot",
        "name": "Jabot Island",
        "country": "Marshall Islands"
    },
    {
        "key": "JAU",
        "city": "Jauja",
        "name": "Jauja",
        "country": "Peru"
    },
    {
        "key": "JAV",
        "city": "Ilulissat",
        "name": "Ilulissat Arpt",
        "country": "Greenland"
    },
    {
        "key": "JAX",
        "city": "Jacksonville",
        "name": "Jacksonville Intl Arpt",
        "country": "United States"
    },
    {
        "key": "JBC",
        "city": "Boston",
        "name": "Boston City Heliport",
        "country": "United States"
    },
    {
        "key": "JBP",
        "city": "Los Angeles",
        "name": "Commerce Bus. Plaza",
        "country": "United States"
    },
    {
        "key": "JBQ",
        "city": "Higuero",
        "name": "Dr Joaquin Balaguer",
        "country": "Dominican Republic"
    },
    {
        "key": "JBR",
        "city": "Jonesboro",
        "name": "Jonesboro Municipal",
        "country": "United States"
    },
    {
        "key": "JBS",
        "city": "Pleasanton",
        "name": "Hacienda Business Park Hlpt",
        "country": "United States"
    },
    {
        "key": "JBT",
        "city": "Bethel",
        "name": "Bethal Alaska Airport",
        "country": "United States"
    },
    {
        "key": "JCA",
        "city": "Cannes",
        "name": "Croisette Heliport",
        "country": "France"
    },
    {
        "key": "JCB",
        "city": "Joacaba",
        "name": "Joacaba Arpt",
        "country": "Brazil"
    },
    {
        "key": "JCC",
        "city": "San Francisco",
        "name": "China Basin Hlpt",
        "country": "United States"
    },
    {
        "key": "JCD",
        "city": "St Croix",
        "name": "Downtown Hp",
        "country": "United States"
    },
    {
        "key": "JCE",
        "city": "Oakland",
        "name": "Oakland Conv Ctr Hlpt",
        "country": "United States"
    },
    {
        "key": "JCI",
        "city": "Gardner",
        "name": "New Century AirCenter (FAA: IXD)",
        "country": "United States"
    },
    {
        "key": "JCJ",
        "city": "Jeju City",
        "name": "Chuja Heliport",
        "country": "Korea"
    },
    {
        "key": "JCK",
        "city": "Julia Creek",
        "name": "Julia Creek Arpt",
        "country": "Australia"
    },
    {
        "key": "JCM",
        "city": "Jacobina, Bahia, Brazil",
        "name": "Jacobina Airport",
        "country": "Brazil"
    },
    {
        "key": "JCT",
        "city": "Junction",
        "name": "Kimble County Airport",
        "country": "United States"
    },
    {
        "key": "JCY",
        "city": "Johnson City, Texas",
        "name": "LBJ Ranch Airport (FAA: 0TE7)",
        "country": "United States"
    },
    {
        "key": "JDA",
        "city": "John Day",
        "name": "Grant County Regional",
        "country": "United States"
    },
    {
        "key": "JDB",
        "city": "Dallas",
        "name": "Downtown Heliport",
        "country": "United States"
    },
    {
        "key": "JDF",
        "city": "Juiz De Fora",
        "name": "Francisco De Assis Arpt",
        "country": "Brazil"
    },
    {
        "key": "JDH",
        "city": "Jodhpur",
        "name": "Jodhpur Arpt",
        "country": "India"
    },
    {
        "key": "JDM",
        "city": "Miami",
        "name": "Downtown Hlt",
        "country": "United States"
    },
    {
        "key": "JDN",
        "city": "Jordan",
        "name": "Jordan",
        "country": "United States"
    },
    {
        "key": "JDO",
        "city": "Juazeiro Do Norte",
        "name": "Regional Do Cariri Arpt",
        "country": "Brazil"
    },
    {
        "key": "JDP",
        "city": "Paris",
        "name": "Issy Les Moulineaux Arpt",
        "country": "France"
    },
    {
        "key": "JDR",
        "city": "Sao Joao del Rei, Minas Gerais, Brazil",
        "name": "Prefeito Octavio de Almeida Neves Airport",
        "country": "Brazil"
    },
    {
        "key": "JDT",
        "city": "Minneapolis",
        "name": "Minneapolis Downtown Heliport",
        "country": "United States"
    },
    {
        "key": "JDX",
        "city": "Houston",
        "name": "Central Bus District Heliport",
        "country": "United States"
    },
    {
        "key": "JDZ",
        "city": "Jingdezhen",
        "name": "Jingdezhen Arpt",
        "country": "China"
    },
    {
        "key": "JED",
        "city": "Jeddah",
        "name": "Jeddah Intl",
        "country": "Saudi Arabia"
    },
    {
        "key": "JEE",
        "city": "Jeremie",
        "name": "Jeremie",
        "country": "Haiti"
    },
    {
        "key": "JEF",
        "city": "Jefferson City",
        "name": "Jefferson City Memorial",
        "country": "United States"
    },
    {
        "key": "JEG",
        "city": "Aasiaat",
        "name": "Aasiaat Arpt",
        "country": "Greenland"
    },
    {
        "key": "JEM",
        "city": "Emeryville",
        "name": "Hlpt",
        "country": "United States"
    },
    {
        "key": "JER",
        "city": "Jersey",
        "name": "States Airport",
        "country": "United Kingdom"
    },
    {
        "key": "JFK",
        "city": "New York",
        "name": "John F Kennedy Intl",
        "country": "United States"
    },
    {
        "key": "JFM",
        "city": "Fremantle",
        "name": "Fremantle Heliport",
        "country": "Australia"
    },
    {
        "key": "JFR",
        "city": "Paamiut",
        "name": "Paamiut Airport",
        "country": "Greenland"
    },
    {
        "key": "JGA",
        "city": "Jamnagar",
        "name": "Govardhanpur Arpt",
        "country": "India"
    },
    {
        "key": "JGB",
        "city": "Jagdalpur",
        "name": "Jagdalpur Airport",
        "country": "India"
    },
    {
        "key": "JGC",
        "city": "Grand Canyon",
        "name": "Grand Canyon Heliport",
        "country": "United States"
    },
    {
        "key": "JGD",
        "city": "Da Hinggan Ling",
        "name": "Jiagedaqi Airport",
        "country": "China"
    },
    {
        "key": "JGL",
        "city": "Atlanta",
        "name": "Galleria Arpt",
        "country": "United States"
    },
    {
        "key": "JGN",
        "city": "Jiayuguan",
        "name": "Jiayuguan Arpt",
        "country": "China"
    },
    {
        "key": "JGP",
        "city": "Houston",
        "name": "Greenway Plaza Heliport",
        "country": "United States"
    },
    {
        "key": "JGQ",
        "city": "Houston",
        "name": "Transco Twr Galleria",
        "country": "United States"
    },
    {
        "key": "JGR",
        "city": "Groennedal",
        "name": "Groennedal Heliport",
        "country": "Greenland"
    },
    {
        "key": "JGS",
        "city": "Ji an",
        "name": "Jinggangshan",
        "country": "China"
    },
    {
        "key": "JGX",
        "city": "Burbank",
        "name": "Heliport",
        "country": "United States"
    },
    {
        "key": "JHB",
        "city": "Johor Bahru",
        "name": "Sultan Ismail Intl Arpt",
        "country": "Malaysia"
    },
    {
        "key": "JHE",
        "city": "Helsingborg",
        "name": "Helsingborg Heliport",
        "country": "Sweden"
    },
    {
        "key": "JHG",
        "city": "Jinghong",
        "name": "Jinghong Arpt",
        "country": "China"
    },
    {
        "key": "JHM",
        "city": "Kapalua",
        "name": "Kapalua Arpt",
        "country": "United States"
    },
    {
        "key": "JHS",
        "city": "Sisimiut",
        "name": "Sisimiut Arpt",
        "country": "Greenland"
    },
    {
        "key": "JHW",
        "city": "Jamestown",
        "name": "Chautauqua Cty Arpt",
        "country": "United States"
    },
    {
        "key": "JIB",
        "city": "Djibouti",
        "name": "Ambouli Airport",
        "country": "Djibouti"
    },
    {
        "key": "JIC",
        "city": "Jinchang",
        "name": "Jinchang Jinchuan Airport",
        "country": "China"
    },
    {
        "key": "JID",
        "city": "Los Angeles",
        "name": "City of Industry Heliport",
        "country": "United States"
    },
    {
        "key": "JIJ",
        "city": "Jijiga",
        "name": "Wilwal International Airport",
        "country": "Ethiopia"
    },
    {
        "key": "JIK",
        "city": "Ikaria Island",
        "name": "Ikaria Arpt",
        "country": "Greece"
    },
    {
        "key": "JIL",
        "city": "Jilin",
        "name": "Jilin Arpt",
        "country": "China"
    },
    {
        "key": "JIM",
        "city": "Jimma",
        "name": "Jimma Arpt",
        "country": "Ethiopia"
    },
    {
        "key": "JIN",
        "city": "Jinja",
        "name": "Jinja Airport",
        "country": "Uganda"
    },
    {
        "key": "JIO",
        "city": "Los Angeles",
        "name": "International Heliport",
        "country": "United States"
    },
    {
        "key": "JIP",
        "city": "Jipijapa",
        "name": "Jipijapa Airport",
        "country": "Ecuador"
    },
    {
        "key": "JIQ",
        "city": "Qianjiang",
        "name": "Qianjiang Wulingshan Arpt",
        "country": "China"
    },
    {
        "key": "JIR",
        "city": "Chaurikharka V.D.C.",
        "name": "Jiri Airport",
        "country": "Nepal"
    },
    {
        "key": "CMD",
        "city": "Cootamundra",
        "name": "Cootamundra Airport",
        "country": "Australia"
    },
    {
        "key": "CME",
        "city": "Ciudad Del Carmen",
        "name": "Ciudad Del Carmen Arpt",
        "country": "Mexico"
    },
    {
        "key": "CMF",
        "city": "Chambery",
        "name": "Chambery Aix Les Bains Arpt",
        "country": "France"
    },
    {
        "key": "CMG",
        "city": "Corumba",
        "name": "Internacional Corumba",
        "country": "Brazil"
    },
    {
        "key": "CMH",
        "city": "Columbus",
        "name": "Port Columbus Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CMI",
        "city": "Champaign",
        "name": "Univ Of Illinois Willard Arpt",
        "country": "United States"
    },
    {
        "key": "CMK",
        "city": "Nkopola",
        "name": "Club Makokola Airport",
        "country": "Malawi"
    },
    {
        "key": "CMN",
        "city": "Casablanca",
        "name": "Mohamed V Arpt",
        "country": "Morocco"
    },
    {
        "key": "CMQ",
        "city": "Clermont",
        "name": "Clermont Arpt",
        "country": "Australia"
    },
    {
        "key": "CMR",
        "city": "Colmar",
        "name": "Colmar Houssen Arpt",
        "country": "France"
    },
    {
        "key": "CMT",
        "city": "Cameta",
        "name": "Cameta Airport",
        "country": "Brazil"
    },
    {
        "key": "CMV",
        "city": "Coromandel",
        "name": "Coromandel Arpt",
        "country": "New Zealand"
    },
    {
        "key": "CMW",
        "city": "Camaguey",
        "name": "Ign Agramonte Intl Arpt",
        "country": "Cuba"
    },
    {
        "key": "CMX",
        "city": "Houghton",
        "name": "Houghton Cty Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "CMY",
        "city": "Sparta",
        "name": "Camp Mccoy Aaf",
        "country": "United States"
    },
    {
        "key": "CNA",
        "city": "Cananea",
        "name": "Cananea National Airport",
        "country": "Mexico"
    },
    {
        "key": "CNB",
        "city": "Coonamble",
        "name": "Coonamble Arpt",
        "country": "Australia"
    },
    {
        "key": "CNC",
        "city": "Coconut Island",
        "name": "Coconut Island Arpt",
        "country": "Australia"
    },
    {
        "key": "CND",
        "city": "Constanta",
        "name": "Kogalniceanu Arpt",
        "country": "Romania"
    },
    {
        "key": "CNE",
        "city": "Canon City",
        "name": "Canon City Arpt",
        "country": "United States"
    },
    {
        "key": "CNF",
        "city": "Belo Horizonte",
        "name": "Tancredo Neves Intl Arpt",
        "country": "Brazil"
    },
    {
        "key": "CNG",
        "city": "Cognac",
        "name": "Parvaud Arpt",
        "country": "France"
    },
    {
        "key": "CNH",
        "city": "Lebanon",
        "name": "Claremont Municipal",
        "country": "United States"
    },
    {
        "key": "CNI",
        "city": "Dalian",
        "name": "Changhai Airport",
        "country": "China"
    },
    {
        "key": "CNJ",
        "city": "Cloncurry",
        "name": "Cloncurry Arpt",
        "country": "Australia"
    },
    {
        "key": "CNL",
        "city": "Sindal",
        "name": "Sindal Airport",
        "country": "Denmark"
    },
    {
        "key": "CNM",
        "city": "Carlsbad",
        "name": "Carlsbad Airport",
        "country": "United States"
    },
    {
        "key": "CNO",
        "city": "Chino",
        "name": "Chino Airport",
        "country": "United States"
    },
    {
        "key": "CNQ",
        "city": "Corrientes",
        "name": "Camba Punta Arpt",
        "country": "Argentina"
    },
    {
        "key": "CNR",
        "city": "Chanaral",
        "name": "Chanaral",
        "country": "Chile"
    },
    {
        "key": "CNS",
        "city": "Cairns",
        "name": "Cairns Airport",
        "country": "Australia"
    },
    {
        "key": "CNT",
        "city": "Charata, Chaco, Argentina",
        "name": "Charata Airport",
        "country": "Argentina"
    },
    {
        "key": "CNU",
        "city": "Chanute",
        "name": "Chanute Martin Johnson Airport",
        "country": "United States"
    },
    {
        "key": "CNV",
        "city": "Canavieiras",
        "name": "Canavieiras Airport",
        "country": "Brazil"
    },
    {
        "key": "CNW",
        "city": "Waco",
        "name": "James Connall Arpt",
        "country": "United States"
    },
    {
        "key": "CNX",
        "city": "Chiang Mai",
        "name": "Chiang Mai Intl Arpt",
        "country": "Thailand"
    },
    {
        "key": "CNY",
        "city": "Moab",
        "name": "Moab Municipal",
        "country": "United States"
    },
    {
        "key": "COA",
        "city": "Columbia",
        "name": "Columbia Arpt",
        "country": "United States"
    },
    {
        "key": "COC",
        "city": "Concordia",
        "name": "Concordia Arpt",
        "country": "Argentina"
    },
    {
        "key": "COD",
        "city": "Cody",
        "name": "Yellowstone Regional Arpt",
        "country": "United States"
    },
    {
        "key": "COE",
        "city": "Coeur D Alene",
        "name": "Coeur d Alene Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "COF",
        "city": "Cocoa",
        "name": "Patrick AFB",
        "country": "United States"
    },
    {
        "key": "COG",
        "city": "Condoto",
        "name": "Mandinga Arpt",
        "country": "Colombia"
    },
    {
        "key": "COH",
        "city": "Cooch Behar",
        "name": "Cooch Behar Airport",
        "country": "India"
    },
    {
        "key": "COI",
        "city": "Cocoa",
        "name": "Merrit Island Arpt",
        "country": "United States"
    },
    {
        "key": "COJ",
        "city": "Coonabarabrn",
        "name": "Coonabarabran Arpt",
        "country": "Australia"
    },
    {
        "key": "COK",
        "city": "Kochi",
        "name": "Cochin Internation Arpt",
        "country": "India"
    },
    {
        "key": "COM",
        "city": "Coleman",
        "name": "Coleman Municipal Airport",
        "country": "United States"
    },
    {
        "key": "CON",
        "city": "Concord",
        "name": "Concord Arpt",
        "country": "United States"
    },
    {
        "key": "COO",
        "city": "Cotonou",
        "name": "Cotonou Airport",
        "country": "Benin"
    },
    {
        "key": "COQ",
        "city": "Choibalsan",
        "name": "Choibalsan Airport",
        "country": "Mongolia"
    },
    {
        "key": "COR",
        "city": "Cordoba",
        "name": "Pajas Blanco Arpt",
        "country": "Argentina"
    },
    {
        "key": "COS",
        "city": "Colorado Springs",
        "name": "Colorado Springs Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "COT",
        "city": "Cotulla",
        "name": "Cotulla La Salle County Airport",
        "country": "United States"
    },
    {
        "key": "COU",
        "city": "Columbia",
        "name": "Columbia Regional",
        "country": "United States"
    },
    {
        "key": "COW",
        "city": "La Serena",
        "name": "Coquimbo Airport",
        "country": "Chile"
    },
    {
        "key": "COY",
        "city": "Coolawanyah",
        "name": "Coolawanyah Airport",
        "country": "Australia"
    },
    {
        "key": "COZ",
        "city": "Constanza, Dominican Republic",
        "name": "Constanza Airport",
        "country": "Dominican Republic"
    },
    {
        "key": "CPB",
        "city": "Capurgana",
        "name": "Capurgana Arpt",
        "country": "Colombia"
    },
    {
        "key": "CPC",
        "city": "Chapelco",
        "name": "Chapelco Arpt",
        "country": "Argentina"
    },
    {
        "key": "CPD",
        "city": "Coober Pedy",
        "name": "Coober Pedy Arpt",
        "country": "Australia"
    },
    {
        "key": "CPE",
        "city": "Campeche",
        "name": "Campeche Intl Arpt",
        "country": "Mexico"
    },
    {
        "key": "CPF",
        "city": "Cepu, Indonesia",
        "name": "Ngloram Airport",
        "country": "Indonesia"
    },
    {
        "key": "CPG",
        "city": "Carmen de Patagones, Buenos Aires, Argentina",
        "name": "Carmen de Patagones Airport",
        "country": "Argentina"
    },
    {
        "key": "CPH",
        "city": "Copenhagen",
        "name": "Copenhagen Arpt",
        "country": "Denmark"
    },
    {
        "key": "CPI",
        "city": "Sixes",
        "name": "Cape Orford Airport",
        "country": "United States"
    },
    {
        "key": "CPL",
        "city": "Chaparral, Colombia",
        "name": "General Navas Pardo Airport",
        "country": "Colombia"
    },
    {
        "key": "CPM",
        "city": "Compton",
        "name": "Compton Arpt",
        "country": "United States"
    },
    {
        "key": "CPO",
        "city": "Copiapo",
        "name": "Chamonate Arpt",
        "country": "Chile"
    },
    {
        "key": "CPQ",
        "city": "Campinas",
        "name": "International Campinas",
        "country": "Brazil"
    },
    {
        "key": "CPR",
        "city": "Casper",
        "name": "Natrona Cty Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CPS",
        "city": "St Louis",
        "name": "East St Louis",
        "country": "United States"
    },
    {
        "key": "CPT",
        "city": "Cape Town",
        "name": "Cape Town International",
        "country": "South Africa"
    },
    {
        "key": "CPV",
        "city": "Campina Grande",
        "name": "Joao Suassuana Arpt",
        "country": "Brazil"
    },
    {
        "key": "CPX",
        "city": "Culebra",
        "name": "Culebra Arpt",
        "country": "United States"
    },
    {
        "key": "CQA",
        "city": "Canarana, Mato Grosso",
        "name": "Canarana Airport",
        "country": "Brazil"
    },
    {
        "key": "CQD",
        "city": "Shahre Kord",
        "name": "Shahre Kord Arpt",
        "country": "Iran"
    },
    {
        "key": "CQF",
        "city": "Calais",
        "name": "Aeroport Calais Dunkerque",
        "country": "France"
    },
    {
        "key": "CQS",
        "city": "Costa Marques, RondÃ´nia, Brazil",
        "name": "Costa Marques Airport",
        "country": "Brazil"
    },
    {
        "key": "CRA",
        "city": "Craiova",
        "name": "Craiova Arpt",
        "country": "Romania"
    },
    {
        "key": "CRB",
        "city": "Collarenebri",
        "name": "Collarenebri Airport",
        "country": "Australia"
    },
    {
        "key": "CRD",
        "city": "Comodoro Rivadavia",
        "name": "Comodoro Rivadavia Arpt",
        "country": "Argentina"
    },
    {
        "key": "CRE",
        "city": "Myrtle Beach",
        "name": "Grand Strand Arpt",
        "country": "United States"
    },
    {
        "key": "CRF",
        "city": "Carnot",
        "name": "Carnot Airport",
        "country": "Central African Republic"
    },
    {
        "key": "CRG",
        "city": "Jacksonville",
        "name": "Craig Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CRH",
        "city": "Elbow Valley",
        "name": "Cherrabah Airport",
        "country": "Australia"
    },
    {
        "key": "CRI",
        "city": "Crooked Island",
        "name": "CROOKED ISLAND AIRPORT",
        "country": "Bahamas"
    },
    {
        "key": "CRJ",
        "city": "Yalata",
        "name": "Coorabie Airport",
        "country": "Australia"
    },
    {
        "key": "CRK",
        "city": "Luzon Island",
        "name": "Clark Field Arpt",
        "country": "Philippines"
    },
    {
        "key": "CRL",
        "city": "Brussels",
        "name": "Brussels South Charleroi Arpt",
        "country": "Belgium"
    },
    {
        "key": "CRM",
        "city": "Catarman",
        "name": "National Airport",
        "country": "Philippines"
    },
    {
        "key": "CRO",
        "city": "Corcoran",
        "name": "Corcoran Arpt",
        "country": "United States"
    },
    {
        "key": "CRP",
        "city": "Corpus Christi",
        "name": "Corpus Christi Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CRS",
        "city": "Corsicana",
        "name": "Corsicana Arpt",
        "country": "United States"
    },
    {
        "key": "CRT",
        "city": "Crossett",
        "name": "Crossett Arpt",
        "country": "United States"
    },
    {
        "key": "CRU",
        "city": "Carriacou, Grenada",
        "name": "Lauriston Airport (Carriacou Island Airport)",
        "country": "Grenada"
    },
    {
        "key": "CRV",
        "city": "Crotone",
        "name": "Crotone Arpt",
        "country": "Italy"
    },
    {
        "key": "CRW",
        "city": "Charleston",
        "name": "Yeager Arpt",
        "country": "United States"
    },
    {
        "key": "CRX",
        "city": "Corinth",
        "name": "Roscoe Turner Arpt",
        "country": "United States"
    },
    {
        "key": "CRZ",
        "city": "Turkmenabad",
        "name": "Turkmenabad Arpt",
        "country": "Turkmenistan"
    },
    {
        "key": "CSB",
        "city": "Caransebea",
        "name": "Caransebea Airport",
        "country": "Romania"
    },
    {
        "key": "CSC",
        "city": "Canas",
        "name": "Mojica Airport",
        "country": "Costa Rica"
    },
    {
        "key": "CSF",
        "city": "Creil",
        "name": "Creil Arpt",
        "country": "France"
    },
    {
        "key": "CSI",
        "city": "Casino",
        "name": "Casino Arpt",
        "country": "Australia"
    },
    {
        "key": "CSK",
        "city": "Cap Skirring",
        "name": "Cap Skirring Airport",
        "country": "Senegal"
    },
    {
        "key": "CSL",
        "city": "San Luis Obispo",
        "name": "O Sullivan Army Air Field",
        "country": "United States"
    },
    {
        "key": "CSM",
        "city": "Clinton",
        "name": "Sherman Arpt",
        "country": "United States"
    },
    {
        "key": "CSN",
        "city": "Carson City",
        "name": "Carson Arpt",
        "country": "United States"
    },
    {
        "key": "CSO",
        "city": "Magdeburg Cochstedt",
        "name": "Magdeburg Cochstedt Airport",
        "country": "Germany"
    },
    {
        "key": "CSP",
        "city": "Cape Spencer",
        "name": "Cape Spencer Arpt",
        "country": "United States"
    },
    {
        "key": "CSQ",
        "city": "Creston",
        "name": "Creston Municipal Airport",
        "country": "United States"
    },
    {
        "key": "CST",
        "city": "Castaway",
        "name": "Castaway Airport",
        "country": "Fiji"
    },
    {
        "key": "CSU",
        "city": "Santa Cruz Do Sul",
        "name": "Santa Cruz Do Sul Arpt",
        "country": "Brazil"
    },
    {
        "key": "CSV",
        "city": "Crossville",
        "name": "Crossville Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "CSX",
        "city": "Changsha",
        "name": "Changsha Arpt",
        "country": "China"
    },
    {
        "key": "CSY",
        "city": "Cheboksary",
        "name": "Cheboksary",
        "country": "Russia"
    },
    {
        "key": "CTA",
        "city": "Catania",
        "name": "Fontanarossa Arpt",
        "country": "Italy"
    },
    {
        "key": "CTB",
        "city": "Cut Bank",
        "name": "Cut Bank Municipal Airport",
        "country": "United States"
    },
    {
        "key": "CTC",
        "city": "Catamarca",
        "name": "Choya Arpt",
        "country": "Argentina"
    },
    {
        "key": "CTD",
        "city": "Chitre",
        "name": "Chitre Airfield",
        "country": "Panama"
    },
    {
        "key": "CTE",
        "city": "CartÃ­",
        "name": "CartÃ­ Airport",
        "country": "Panama"
    },
    {
        "key": "CTF",
        "city": "Coatepeque",
        "name": "Coatepeque Airport",
        "country": "Guatemala"
    },
    {
        "key": "CTG",
        "city": "Cartagena",
        "name": "Rafael Nunez Arpt",
        "country": "Colombia"
    },
    {
        "key": "CTI",
        "city": "Cuito Cuanavale",
        "name": "Cuito Cuanavale Airport",
        "country": "Angola"
    },
    {
        "key": "CTK",
        "city": "Canton",
        "name": "Canton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "CTL",
        "city": "Charleville",
        "name": "Charleville Arpt",
        "country": "Australia"
    },
    {
        "key": "CTM",
        "city": "Chetumal",
        "name": "Chetumal International",
        "country": "Mexico"
    },
    {
        "key": "CTN",
        "city": "Cooktown",
        "name": "Cooktown Arpt",
        "country": "Australia"
    },
    {
        "key": "CTO",
        "city": "Calverton",
        "name": "Calverton Executive Airpark (FAA: 3C8)",
        "country": "United States"
    },
    {
        "key": "CTS",
        "city": "Sapporo",
        "name": "Chitose Arpt",
        "country": "Japan"
    },
    {
        "key": "CTU",
        "city": "Chengdu",
        "name": "Chengdu Arpt",
        "country": "China"
    },
    {
        "key": "CTW",
        "city": "Cottonwood",
        "name": "Cottonwood Airport",
        "country": "United States"
    },
    {
        "key": "CTX",
        "city": "Cortland",
        "name": "Cortland County Airport (Chase Field, FAA: N03)",
        "country": "United States"
    },
    {
        "key": "CUA",
        "city": "Ciudad Constitucion",
        "name": "Ciudad Constitucion Arpt",
        "country": "Mexico"
    },
    {
        "key": "CUB",
        "city": "Columbia",
        "name": "Columbia Owens Downtown Arpt",
        "country": "United States"
    },
    {
        "key": "CUC",
        "city": "Cucuta",
        "name": "Camilo Dazo Arpt",
        "country": "Colombia"
    },
    {
        "key": "CUD",
        "city": "Caloundra West",
        "name": "Caloundra Airport",
        "country": "Australia"
    },
    {
        "key": "CUE",
        "city": "Cuenca",
        "name": "Cuenca Arpt",
        "country": "Ecuador"
    },
    {
        "key": "CUF",
        "city": "Cuneo",
        "name": "Levaldigi Arpt",
        "country": "Italy"
    },
    {
        "key": "CUG",
        "city": "Cudal",
        "name": "Cudal Arpt",
        "country": "Australia"
    },
    {
        "key": "CUH",
        "city": "Cushing",
        "name": "Cushing Municipal Airport",
        "country": "United States"
    },
    {
        "key": "CUJ",
        "city": "Coron Island",
        "name": "Culion Airport",
        "country": "Philippines"
    },
    {
        "key": "JIU",
        "city": "Jiujiang",
        "name": "Jiujiang Airport",
        "country": "China"
    },
    {
        "key": "JIW",
        "city": "Gwadar",
        "name": "Jiwani Airport",
        "country": "Pakistan"
    },
    {
        "key": "JJN",
        "city": "Jinjiang",
        "name": "Jinjiang Arpt",
        "country": "China"
    },
    {
        "key": "JJU",
        "city": "Qaqortoq",
        "name": "Qaqortoq Arpt",
        "country": "Greenland"
    },
    {
        "key": "JKG",
        "city": "Jonkoping",
        "name": "Axamo Airport",
        "country": "Sweden"
    },
    {
        "key": "JKH",
        "city": "Chios",
        "name": "Chios Arpt",
        "country": "Greece"
    },
    {
        "key": "JKL",
        "city": "Kalymnos Island",
        "name": "Kalymnos Arpt",
        "country": "Greece"
    },
    {
        "key": "JKR",
        "city": "Janakpur",
        "name": "Janakpur",
        "country": "Nepal"
    },
    {
        "key": "JKV",
        "city": "Jacksonville",
        "name": "Cherokee County Arpt",
        "country": "United States"
    },
    {
        "key": "JLD",
        "city": "Landskrona",
        "name": "Landskrona Heliport",
        "country": "Sweden"
    },
    {
        "key": "JLN",
        "city": "Joplin",
        "name": "Joplin Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "JLR",
        "city": "Jabalpur",
        "name": "Jabalpur Airport",
        "country": "India"
    },
    {
        "key": "JLS",
        "city": "Jales, SÃ£o Paulo, Brazil",
        "name": "Jales Airport",
        "country": "Brazil"
    },
    {
        "key": "JLX",
        "city": "Los Angeles",
        "name": "Union Station Heliport",
        "country": "United States"
    },
    {
        "key": "JMA",
        "city": "Houston",
        "name": "Marriot Astrodome Arpt",
        "country": "United States"
    },
    {
        "key": "JMB",
        "city": "Jamba",
        "name": "Jamba",
        "country": "Angola"
    },
    {
        "key": "JMD",
        "city": "Dallas",
        "name": "Market Centre Heliport",
        "country": "United States"
    },
    {
        "key": "JMK",
        "city": "Mykonos",
        "name": "Mykonos Greece Arpt",
        "country": "Greece"
    },
    {
        "key": "JMM",
        "city": "Malmo",
        "name": "Malmo Harbour Heliport",
        "country": "Sweden"
    },
    {
        "key": "JMN",
        "city": "Mankato",
        "name": "Municipal Heliport",
        "country": "United States"
    },
    {
        "key": "JMO",
        "city": "Jomsom",
        "name": "Jomsom Airport",
        "country": "Nepal"
    },
    {
        "key": "JMS",
        "city": "Jamestown",
        "name": "Jamestown Arpt",
        "country": "United States"
    },
    {
        "key": "JMU",
        "city": "Jiamusi Shi",
        "name": "Jiamusi Dongjiao Airport",
        "country": "China"
    },
    {
        "key": "JMY",
        "city": "Freetown",
        "name": "Mammy Yoko Heliport",
        "country": "Sierra Leone"
    },
    {
        "key": "JNA",
        "city": "JanuÃ¡ria, Minas Gerais, Brazil",
        "name": "JanuÃ¡ria Airport",
        "country": "Brazil"
    },
    {
        "key": "JNB",
        "city": "Johannesburg",
        "name": "O R Tambo International Arpt",
        "country": "South Africa"
    },
    {
        "key": "JNG",
        "city": "JINING",
        "name": "Jining Airport",
        "country": "China"
    },
    {
        "key": "JNH",
        "city": "Dallas",
        "name": "North Park Inn Heliport",
        "country": "United States"
    },
    {
        "key": "JNI",
        "city": "Junin",
        "name": "JunÃ­n Airport",
        "country": "Argentina"
    },
    {
        "key": "JNJ",
        "city": "Duqm, Oman",
        "name": "Duqm Jaaluni Airport",
        "country": "Oman"
    },
    {
        "key": "JNN",
        "city": "Nanortalik",
        "name": "Nanortalik Arpt",
        "country": "Greenland"
    },
    {
        "key": "JNP",
        "city": "Santa Ana",
        "name": "Newport Beach Heliport",
        "country": "United States"
    },
    {
        "key": "JNS",
        "city": "Narsaq",
        "name": "Narsaq Heleport",
        "country": "Greenland"
    },
    {
        "key": "JNU",
        "city": "Juneau",
        "name": "Juneau Arpt",
        "country": "United States"
    },
    {
        "key": "JNX",
        "city": "Naxos",
        "name": "Naxos Arpt",
        "country": "Greece"
    },
    {
        "key": "JNZ",
        "city": "Jinzhou",
        "name": "Jinzhou Arpt",
        "country": "China"
    },
    {
        "key": "JOE",
        "city": "Joensuu",
        "name": "Joensuu Arpt",
        "country": "Finland"
    },
    {
        "key": "JOG",
        "city": "Yogyakarta",
        "name": "Adisutjipto Arpt",
        "country": "Indonesia"
    },
    {
        "key": "JOH",
        "city": "Port St. Johns",
        "name": "Port St. Johns Airport",
        "country": "South Africa"
    },
    {
        "key": "JOI",
        "city": "Joinville",
        "name": "Cubatao Arpt",
        "country": "Brazil"
    },
    {
        "key": "JOK",
        "city": "YOSHKAR OLA",
        "name": "Yoshkar Ola Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "JOL",
        "city": "Jolo",
        "name": "Jolo",
        "country": "Philippines"
    },
    {
        "key": "JOM",
        "city": "Njombe",
        "name": "Njombe Airport",
        "country": "Tanzania"
    },
    {
        "key": "JOP",
        "city": "Josephstaal",
        "name": "Josephstaal",
        "country": "Papua New Guinea"
    },
    {
        "key": "JOS",
        "city": "Jos, Nigeria",
        "name": "Yakubu Gowon Airport",
        "country": "Nigeria"
    },
    {
        "key": "JOT",
        "city": "Joliet",
        "name": "Joliet Park District Arpt",
        "country": "United States"
    },
    {
        "key": "JPA",
        "city": "Joao Pessoa",
        "name": "Castro Pinto Arpt",
        "country": "Brazil"
    },
    {
        "key": "JPD",
        "city": "Pasadena",
        "name": "Burbank Heliport",
        "country": "United States"
    },
    {
        "key": "JPR",
        "city": "Ji Parana",
        "name": "Ji Parana Arpt",
        "country": "Brazil"
    },
    {
        "key": "JPT",
        "city": "Houston",
        "name": "Park Ten Heliport",
        "country": "United States"
    },
    {
        "key": "JQA",
        "city": "Qaarsut",
        "name": "Qaarsut Arpt",
        "country": "Greenland"
    },
    {
        "key": "JQO",
        "city": "Belorussky Rail Station",
        "name": "Belorussky Rail Station",
        "country": "Russian Federation"
    },
    {
        "key": "JRA",
        "city": "New York",
        "name": "West 30Th St Heliport",
        "country": "United States"
    },
    {
        "key": "JRB",
        "city": "New York",
        "name": "Downtown Manhattan Heliport",
        "country": "United States"
    },
    {
        "key": "JRC",
        "city": "Rochester",
        "name": "Rochester Charlton Building Heliport",
        "country": "United States"
    },
    {
        "key": "JRE",
        "city": "New York",
        "name": "East 60th St Hlpt",
        "country": "United States"
    },
    {
        "key": "JRH",
        "city": "Jorhat",
        "name": "Rowriah Arpt",
        "country": "India"
    },
    {
        "key": "JRO",
        "city": "Kilimanjaro",
        "name": "Kilimanjaro Arpt",
        "country": "Tanzania"
    },
    {
        "key": "JSA",
        "city": "Jaisalmer",
        "name": "Jaisalmer airport",
        "country": "India"
    },
    {
        "key": "JSG",
        "city": "San Rafael",
        "name": "San Rafael Heliport",
        "country": "United States"
    },
    {
        "key": "JSH",
        "city": "Sitia",
        "name": "Sitia Municipal Airport",
        "country": "Greece"
    },
    {
        "key": "JSI",
        "city": "Skiathos",
        "name": "Skiathos Arpt",
        "country": "Greece"
    },
    {
        "key": "JSK",
        "city": "Saint Cloud",
        "name": "Municipal Hpt",
        "country": "United States"
    },
    {
        "key": "JSL",
        "city": "Atlantic City",
        "name": "Steel Pier Hlpt",
        "country": "United States"
    },
    {
        "key": "JSM",
        "city": "Jose de San Martin",
        "name": "Jose De San Martin",
        "country": "Argentina"
    },
    {
        "key": "JSN",
        "city": "Los Angeles",
        "name": "Sherman Oaks Heliport",
        "country": "United States"
    },
    {
        "key": "JSO",
        "city": "Sodertalje",
        "name": "Sodertalje Heliport",
        "country": "Sweden"
    },
    {
        "key": "JSP",
        "city": "Jeju City",
        "name": "Seogwipo Heliport",
        "country": "Korea"
    },
    {
        "key": "JSR",
        "city": "Jessore",
        "name": "Jessore",
        "country": "Bangladesh"
    },
    {
        "key": "JST",
        "city": "Johnstown",
        "name": "Johnstown Cambria Arpt",
        "country": "United States"
    },
    {
        "key": "JSU",
        "city": "Maniitsoq",
        "name": "Maniitsoq Heleport",
        "country": "Greenland"
    },
    {
        "key": "JSY",
        "city": "Syros Island",
        "name": "Syros Island Arpt",
        "country": "Greece"
    },
    {
        "key": "JTC",
        "city": "Bauru Old Code",
        "name": "Arealva Airport",
        "country": "Brazil"
    },
    {
        "key": "GLD",
        "city": "Goodland",
        "name": "Goodland Municipal",
        "country": "United States"
    },
    {
        "key": "GLE",
        "city": "Gainesville",
        "name": "Gainesville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GLH",
        "city": "Greenville",
        "name": "Greenville Municipal",
        "country": "United States"
    },
    {
        "key": "GLI",
        "city": "Glen Innes",
        "name": "Glen Innes Arpt",
        "country": "Australia"
    },
    {
        "key": "GLK",
        "city": "Galkayo",
        "name": "Abdullahi Yusuf International Airport",
        "country": "Somalia"
    },
    {
        "key": "GLL",
        "city": "Gol City",
        "name": "Klanten Arpt",
        "country": "Norway"
    },
    {
        "key": "GLN",
        "city": "Guelmim",
        "name": "Guelmim airport",
        "country": "Morocco"
    },
    {
        "key": "GLO",
        "city": "Gloucester",
        "name": "Staverton Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "GLP",
        "city": "Gulgubip",
        "name": "Gulgubip Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GLR",
        "city": "Gaylord",
        "name": "Otsego Arpt",
        "country": "United States"
    },
    {
        "key": "GLS",
        "city": "Galveston",
        "name": "Scholes Field",
        "country": "United States"
    },
    {
        "key": "GLT",
        "city": "Gladstone",
        "name": "Gladstone Airport",
        "country": "Australia"
    },
    {
        "key": "GLW",
        "city": "Glasgow",
        "name": "Glasgow Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GLZ",
        "city": "Rijen",
        "name": "Gilze-Rijen Air Base",
        "country": "Netherlands"
    },
    {
        "key": "GMA",
        "city": "Gemena",
        "name": "Gemena Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "GMB",
        "city": "Gambela",
        "name": "Gambela Airport",
        "country": "Ethiopia"
    },
    {
        "key": "GMD",
        "city": "Ben Slimane, Morocco",
        "name": "Ben Slimane Airport[2]",
        "country": "Morocco"
    },
    {
        "key": "GME",
        "city": "Gomel",
        "name": "Gomel Arpt",
        "country": "Belarus"
    },
    {
        "key": "GMP",
        "city": "Seoul",
        "name": "Gimpo Intl Arpt",
        "country": "Korea"
    },
    {
        "key": "GMR",
        "city": "Gambier Island",
        "name": "Gambier Island Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "GMU",
        "city": "Greenville",
        "name": "Greenville Downtown Arpt",
        "country": "United States"
    },
    {
        "key": "GMZ",
        "city": "San Sebastian De La Gomera",
        "name": "La Gomera Arpt",
        "country": "Spain"
    },
    {
        "key": "GNA",
        "city": "Grodna",
        "name": "Grodna Arpt",
        "country": "Belarus"
    },
    {
        "key": "GNB",
        "city": "Grenoble",
        "name": "Saint Geoirs Arpt",
        "country": "France"
    },
    {
        "key": "GND",
        "city": "Grenada",
        "name": "Maurice Bishop Intl",
        "country": "Grenada"
    },
    {
        "key": "GNF",
        "city": "Quincy",
        "name": "Gansner Field",
        "country": "United States"
    },
    {
        "key": "GNG",
        "city": "Gooding",
        "name": "Gooding Municipal Airport",
        "country": "United States"
    },
    {
        "key": "GNI",
        "city": "Lyudao",
        "name": "Lyudao Airport Green Island Airport",
        "country": "Taiwan"
    },
    {
        "key": "GNN",
        "city": "Ginir",
        "name": "Ginir Airport",
        "country": "Ethiopia"
    },
    {
        "key": "GNS",
        "city": "Gunungsitoli",
        "name": "Gunungsitoli Arpt",
        "country": "Indonesia"
    },
    {
        "key": "GNT",
        "city": "Grants",
        "name": "Grants Milan Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GNU",
        "city": "Goodnews Bay",
        "name": "Goodnews Bay",
        "country": "United States"
    },
    {
        "key": "GNV",
        "city": "Gainesville",
        "name": "Gainesville Regional",
        "country": "United States"
    },
    {
        "key": "GNY",
        "city": "Sanliurfa",
        "name": "Guney Anadolu Airport",
        "country": "Turkey"
    },
    {
        "key": "GNZ",
        "city": "Ghanzi",
        "name": "Ghanzi Airport",
        "country": "Botswana"
    },
    {
        "key": "GOA",
        "city": "Genoa",
        "name": "Christoforo Colombo",
        "country": "Italy"
    },
    {
        "key": "GOB",
        "city": "Goba, Ethiopia",
        "name": "Robe Airport",
        "country": "Ethiopia"
    },
    {
        "key": "GOC",
        "city": "Gora",
        "name": "Gora Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GOE",
        "city": "Gonalia",
        "name": "Gonalia Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GOF",
        "city": "San Angelo",
        "name": "Goodfellow Air Force Base",
        "country": "United States"
    },
    {
        "key": "GOG",
        "city": "Gobabis",
        "name": "Gobabis",
        "country": "Namibia"
    },
    {
        "key": "GOH",
        "city": "Nuuk",
        "name": "Nuuk Arpt",
        "country": "Greenland"
    },
    {
        "key": "GOI",
        "city": "Goa In",
        "name": "Dabolim Arpt",
        "country": "India"
    },
    {
        "key": "GOJ",
        "city": "Nizhniy Novgorod",
        "name": "Nizhniy Novgorod Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "GOK",
        "city": "Guthrie",
        "name": "GuthrieEdmond Regional Airport",
        "country": "United States"
    },
    {
        "key": "GOL",
        "city": "GOLD BEACH",
        "name": "State Arpt",
        "country": "United States"
    },
    {
        "key": "GOM",
        "city": "Goma",
        "name": "Gomo International Arpt",
        "country": "Congo"
    },
    {
        "key": "GON",
        "city": "New London",
        "name": "Groton New London Arpt",
        "country": "United States"
    },
    {
        "key": "GOO",
        "city": "Goondiwindi",
        "name": "Goondiwindi Arpt",
        "country": "Australia"
    },
    {
        "key": "GOP",
        "city": "Gorakhpur",
        "name": "Gorakhpur Arpt",
        "country": "India"
    },
    {
        "key": "GOQ",
        "city": "Haixi",
        "name": "Golmud Airport",
        "country": "China"
    },
    {
        "key": "GOR",
        "city": "Charlton",
        "name": "Gore Airport",
        "country": "New Zealand"
    },
    {
        "key": "GOS",
        "city": "Gosford",
        "name": "Gosford Airport",
        "country": "Australia"
    },
    {
        "key": "GOT",
        "city": "Gothenburg",
        "name": "Landvetter Arpt",
        "country": "Sweden"
    },
    {
        "key": "GOU",
        "city": "Garoua",
        "name": "Garoua Arpt",
        "country": "Cameroon"
    },
    {
        "key": "GOV",
        "city": "Gove",
        "name": "Nhulunbuy Arpt",
        "country": "Australia"
    },
    {
        "key": "GOZ",
        "city": "Gorna Orjahovica",
        "name": "Gorna Orechovitsa Airport",
        "country": "Bulgaria"
    },
    {
        "key": "GPA",
        "city": "Patras",
        "name": "Araxos Arpt",
        "country": "Greece"
    },
    {
        "key": "GPB",
        "city": "Guarapuava, ParanÃ¡, Brazil",
        "name": "Tancredo Thomas de Faria Airport",
        "country": "Brazil"
    },
    {
        "key": "GPI",
        "city": "Guapi",
        "name": "Guapi Arpt",
        "country": "Colombia"
    },
    {
        "key": "GPO",
        "city": "General Pico",
        "name": "General Pico Airport",
        "country": "Argentina"
    },
    {
        "key": "GPS",
        "city": "Galapagos Is",
        "name": "Baltra Arpt",
        "country": "Ecuador"
    },
    {
        "key": "GPT",
        "city": "Gulfport",
        "name": "Biloxi Regional Arpt",
        "country": "United States"
    },
    {
        "key": "GPZ",
        "city": "Grand Rapids",
        "name": "Itasca County",
        "country": "United States"
    },
    {
        "key": "GQQ",
        "city": "Galion",
        "name": "Galion Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GRB",
        "city": "Green Bay",
        "name": "Austin Straubel Fld",
        "country": "United States"
    },
    {
        "key": "GRD",
        "city": "Greenwood",
        "name": "Greenwood County Airport",
        "country": "United States"
    },
    {
        "key": "GRE",
        "city": "Greer",
        "name": "Greenville Airport",
        "country": "United States"
    },
    {
        "key": "GRF",
        "city": "Tacoma",
        "name": "Gray Army Air Field",
        "country": "United States"
    },
    {
        "key": "GRG",
        "city": "Gardez, Afghanistan",
        "name": "Gardez Airport",
        "country": "Afghanistan"
    },
    {
        "key": "GRI",
        "city": "Grand Island",
        "name": "Hall Cty Regional",
        "country": "United States"
    },
    {
        "key": "GRJ",
        "city": "George",
        "name": "George Arpt",
        "country": "South Africa"
    },
    {
        "key": "DSI",
        "city": "Destin",
        "name": "Destin Arpt",
        "country": "United States"
    },
    {
        "key": "DSK",
        "city": "District",
        "name": "Dera Ismail Khan Airport",
        "country": "Pakistan"
    },
    {
        "key": "DSM",
        "city": "Des Moines",
        "name": "Des Moines Municipal Airport",
        "country": "United States"
    },
    {
        "key": "DSN",
        "city": "Ordos",
        "name": "Ordos Ejin Horo Airport",
        "country": "China"
    },
    {
        "key": "DTA",
        "city": "Delta",
        "name": "Delta Municipal Airport",
        "country": "United States"
    },
    {
        "key": "DTD",
        "city": "Datadawai, Indonesia",
        "name": "Datadawai Airport",
        "country": "Indonesia"
    },
    {
        "key": "DTE",
        "city": "Daet",
        "name": "Bagasbas Airport",
        "country": "Philippines"
    },
    {
        "key": "DTH",
        "city": "Death Valley",
        "name": "Death Valley Arpt",
        "country": "United States"
    },
    {
        "key": "DTM",
        "city": "Dortmund",
        "name": "Wickede Dortmund Arpt",
        "country": "Germany"
    },
    {
        "key": "DTN",
        "city": "Shreveport",
        "name": "Shreveport Downtown Arpt",
        "country": "United States"
    },
    {
        "key": "DTW",
        "city": "Detroit",
        "name": "Detroit Metro Wayne Cnty Arpt",
        "country": "United States"
    },
    {
        "key": "DUA",
        "city": "Durant",
        "name": "Durant Regional AirportEaker Field",
        "country": "United States"
    },
    {
        "key": "DUB",
        "city": "Dublin",
        "name": "Dublin Arpt",
        "country": "Ireland"
    },
    {
        "key": "DUC",
        "city": "Duncan",
        "name": "Halliburton Arpt",
        "country": "United States"
    },
    {
        "key": "DUD",
        "city": "Dunedin",
        "name": "Momona Airport",
        "country": "New Zealand"
    },
    {
        "key": "DUE",
        "city": "Dundo",
        "name": "Dundo Airport",
        "country": "Angola"
    },
    {
        "key": "DUF",
        "city": "Corolla",
        "name": "Pine Island Airport (FAA: 7NC2)",
        "country": "United States"
    },
    {
        "key": "DUG",
        "city": "Douglas",
        "name": "Bisbee Douglas Intl",
        "country": "United States"
    },
    {
        "key": "DUJ",
        "city": "Dubois",
        "name": "Dubois Jefferson Cty Arpt",
        "country": "United States"
    },
    {
        "key": "DUM",
        "city": "Dumai, Indonesia",
        "name": "Pinang Kampai Airport",
        "country": "Indonesia"
    },
    {
        "key": "DUQ",
        "city": "Duncan",
        "name": "Duncan/Quam Rail Station",
        "country": "Canada"
    },
    {
        "key": "DUR",
        "city": "Durban",
        "name": "King Shaka International",
        "country": "South Africa"
    },
    {
        "key": "DUS",
        "city": "Dusseldorf",
        "name": "Dusseldorf Arpt",
        "country": "Germany"
    },
    {
        "key": "DUT",
        "city": "Dutch Harbor",
        "name": "Emergency Field",
        "country": "United States"
    },
    {
        "key": "DVD",
        "city": "Morombe",
        "name": "Andavadoaka Airport",
        "country": "Madagascar"
    },
    {
        "key": "DVL",
        "city": "Devils Lake",
        "name": "Devils Lake Arpt",
        "country": "United States"
    },
    {
        "key": "DVN",
        "city": "Davenport",
        "name": "Davenport Airport",
        "country": "United States"
    },
    {
        "key": "DVO",
        "city": "Davao",
        "name": "Francisco Bangoy Intl",
        "country": "Philippines"
    },
    {
        "key": "DVP",
        "city": "Diamantina Lakes",
        "name": "Davenport Downs Airport",
        "country": "Australia"
    },
    {
        "key": "DVR",
        "city": "Daly River",
        "name": "Daly River Airport",
        "country": "Australia"
    },
    {
        "key": "DVT",
        "city": "Phoenix",
        "name": "Deer Valley",
        "country": "United States"
    },
    {
        "key": "DWC",
        "city": "Dubai",
        "name": "Al Maktoum International Airport",
        "country": "United Arab Emirates"
    },
    {
        "key": "DWD",
        "city": "Dawadmi",
        "name": "King Salman Abdulaziz",
        "country": "Saudi"
    },
    {
        "key": "DWH",
        "city": "Houston",
        "name": "David Wayne Hooks Arpt",
        "country": "United States"
    },
    {
        "key": "DXB",
        "city": "Dubai",
        "name": "Dubai Intl Arpt",
        "country": "United Arab Emirates"
    },
    {
        "key": "DXD",
        "city": "Madison Heights",
        "name": "Dixie Airport",
        "country": "United States"
    },
    {
        "key": "DXR",
        "city": "Danbury",
        "name": "Danbury Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "DYG",
        "city": "Dayong",
        "name": "Dayong Arpt",
        "country": "China"
    },
    {
        "key": "DYL",
        "city": "Doylestown",
        "name": "Doylestown Arpt",
        "country": "United States"
    },
    {
        "key": "DYR",
        "city": "Anadyr",
        "name": "Anadyr Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "DYS",
        "city": "Abilene",
        "name": "Dyess Airforce Base",
        "country": "United States"
    },
    {
        "key": "DYU",
        "city": "Dushanbe",
        "name": "Dushanbe Arpt",
        "country": "Tajikistan"
    },
    {
        "key": "DYW",
        "city": "Daly Waters",
        "name": "Daly Waters Airport",
        "country": "Australia"
    },
    {
        "key": "DZA",
        "city": "Dzaoudzi",
        "name": "Dzaoudzi Arpt",
        "country": "Mayotte"
    },
    {
        "key": "DZI",
        "city": "Pororo",
        "name": "Codazzi Airport",
        "country": "Colombia"
    },
    {
        "key": "DZN",
        "city": "ZHEZKAZGAN",
        "name": "ZHEZKAZGAN ARPT",
        "country": "Kazakhstan"
    },
    {
        "key": "DZO",
        "city": "Santa Bernardina",
        "name": "Santa Bernardina International Airport",
        "country": "Uruguay"
    },
    {
        "key": "EAA",
        "city": "Eagle",
        "name": "Eagle Airport",
        "country": "United States"
    },
    {
        "key": "EAB",
        "city": "Abbs",
        "name": "Abbs Airport",
        "country": "Yemen"
    },
    {
        "key": "EAM",
        "city": "Nejran",
        "name": "Nejran Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "EAN",
        "city": "WHEATLAND",
        "name": "PHIFER FIELD ARPT",
        "country": "United States"
    },
    {
        "key": "EAR",
        "city": "Kearney",
        "name": "Kearney Municipal Arrpt",
        "country": "United States"
    },
    {
        "key": "EAS",
        "city": "San Sebastian",
        "name": "San Sebastian Arpt",
        "country": "Spain"
    },
    {
        "key": "EAT",
        "city": "Wenatchee",
        "name": "Pangborn Memorial Fld",
        "country": "United States"
    },
    {
        "key": "EAU",
        "city": "Eau Claire",
        "name": "Eau Claire Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "EBA",
        "city": "Elba Island",
        "name": "Marina Di Campo Arpt",
        "country": "Italy"
    },
    {
        "key": "EBB",
        "city": "Entebbe",
        "name": "Entebbe Airport",
        "country": "Uganda"
    },
    {
        "key": "EBD",
        "city": "El Obeid",
        "name": "El Obeid Airport",
        "country": "Sudan"
    },
    {
        "key": "EBG",
        "city": "El Bagre",
        "name": "El Bagre Arpt",
        "country": "Colombia"
    },
    {
        "key": "EBJ",
        "city": "Esbjerg",
        "name": "Esbjerg Arpt",
        "country": "Denmark"
    },
    {
        "key": "EBL",
        "city": "Erbil",
        "name": "Erbil Arpt",
        "country": "Iraq"
    },
    {
        "key": "EBM",
        "city": "El Borma",
        "name": "El Borma Airport",
        "country": "Tunisia"
    },
    {
        "key": "EBO",
        "city": "Ebon",
        "name": "Ebon Arpt",
        "country": "Marshall Islands"
    },
    {
        "key": "EBR",
        "city": "Baton Rouge",
        "name": "Baton Rouge Downtown Arpt",
        "country": "United States"
    },
    {
        "key": "EBU",
        "city": "St Etienne",
        "name": "Boutheon Arpt",
        "country": "France"
    },
    {
        "key": "ECG",
        "city": "Elizabeth City",
        "name": "Elizabeth Municipal Cgas",
        "country": "United States"
    },
    {
        "key": "ECH",
        "city": "Echuca",
        "name": "Echuca Arpt",
        "country": "Australia"
    },
    {
        "key": "ECN",
        "city": "Ercan",
        "name": "Ercan Airport",
        "country": "Cyprus"
    },
    {
        "key": "ECP",
        "city": "Panama City",
        "name": "Northwest Florida Beaches Intl",
        "country": "United States"
    },
    {
        "key": "EDA",
        "city": "Edna Bay",
        "name": "Edna Bay Arpt",
        "country": "United States"
    },
    {
        "key": "EDE",
        "city": "Edenton",
        "name": "Edenton Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "EDF",
        "city": "Anchorage",
        "name": "Elmendorf Airforce Base",
        "country": "United States"
    },
    {
        "key": "LXG",
        "city": "Luang Namtha",
        "name": "Louang Namtha Airport",
        "country": "Laos"
    },
    {
        "key": "LXN",
        "city": "Lexington",
        "name": "Jim Kelley Field",
        "country": "United States"
    },
    {
        "key": "LXR",
        "city": "Luxor",
        "name": "Luxor Airport",
        "country": "Egypt"
    },
    {
        "key": "LXS",
        "city": "Limnos",
        "name": "Limnos Airport",
        "country": "Greece"
    },
    {
        "key": "LXU",
        "city": "Lukulu",
        "name": "Lukulu Airport",
        "country": "Zambia"
    },
    {
        "key": "LXV",
        "city": "Leadville",
        "name": "Leadville Arpt",
        "country": "United States"
    },
    {
        "key": "LYA",
        "city": "Luoyang",
        "name": "Luoyang Arpt",
        "country": "China"
    },
    {
        "key": "LYB",
        "city": "Little Cayman",
        "name": "Little Cayman Arpt",
        "country": "Cayman Islands"
    },
    {
        "key": "LYC",
        "city": "Lycksele",
        "name": "Hedlunda Arpt",
        "country": "Sweden"
    },
    {
        "key": "LYE",
        "city": "Lyneham",
        "name": "RAF Lyneham",
        "country": "United Kingdom"
    },
    {
        "key": "LYG",
        "city": "Lianyungang",
        "name": "Lianyungang Arpt",
        "country": "China"
    },
    {
        "key": "LYH",
        "city": "Lynchburg",
        "name": "Lynchburg Municipal",
        "country": "United States"
    },
    {
        "key": "LYI",
        "city": "Linyi",
        "name": "Linyi Arpt",
        "country": "China"
    },
    {
        "key": "LYK",
        "city": "Lunyuk, Indonesia",
        "name": "Lunyuk Airport",
        "country": "Indonesia"
    },
    {
        "key": "LYN",
        "city": "Lyon",
        "name": "Bron Arpt",
        "country": "France"
    },
    {
        "key": "LYP",
        "city": "Faisalabad",
        "name": "Faisalabad International Arpt",
        "country": "Pakistan"
    },
    {
        "key": "LYR",
        "city": "Longyearbyen",
        "name": "Svalbard Arpt",
        "country": "Norway"
    },
    {
        "key": "LYS",
        "city": "Lyon",
        "name": "Lyon Saint Exupery Arpt",
        "country": "France"
    },
    {
        "key": "LYU",
        "city": "Ely Mn",
        "name": "Ely Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "LYX",
        "city": "Lydd",
        "name": "Lydd Intl Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LZC",
        "city": "Lazaro Cardenas Michoacan",
        "name": "Lazaro Cardenas Arpt",
        "country": "Mexico"
    },
    {
        "key": "LZH",
        "city": "Liuzhou",
        "name": "Liuzhou Airport",
        "country": "China"
    },
    {
        "key": "LZN",
        "city": "Nangan, Taiwan",
        "name": "Matsu Nangan Airport",
        "country": "Taiwan"
    },
    {
        "key": "LZO",
        "city": "Luzhou",
        "name": "Luzhou Arpt",
        "country": "China"
    },
    {
        "key": "LZR",
        "city": "Lizard Island",
        "name": "Lizard Island Arpt",
        "country": "Australia"
    },
    {
        "key": "LZY",
        "city": "Nyingchi",
        "name": "Nyingchi Mainling Airport",
        "country": "China"
    },
    {
        "key": "MAA",
        "city": "Chennai",
        "name": "Chennai Arpt",
        "country": "India"
    },
    {
        "key": "MAB",
        "city": "Maraba",
        "name": "Maraba Arpt",
        "country": "Brazil"
    },
    {
        "key": "MAC",
        "city": "Macon",
        "name": "Macon Downtownarpt",
        "country": "United States"
    },
    {
        "key": "MAD",
        "city": "Madrid",
        "name": "Barajas Arpt",
        "country": "Spain"
    },
    {
        "key": "MAE",
        "city": "Madera",
        "name": "Madera Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MAF",
        "city": "Midland",
        "name": "Midland Intl Arpt",
        "country": "United States"
    },
    {
        "key": "MAG",
        "city": "Madang",
        "name": "Madang Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "MAH",
        "city": "Menorca",
        "name": "Aerop De Menorca",
        "country": "Spain"
    },
    {
        "key": "MAI",
        "city": "Nkopola",
        "name": "Mangochi Airport",
        "country": "Malawi"
    },
    {
        "key": "MAJ",
        "city": "Majuro",
        "name": "Amata Kabua Intl Arpt",
        "country": "Marshall Islands"
    },
    {
        "key": "MAK",
        "city": "Malakal",
        "name": "Malakal Arpt",
        "country": "South Sudan"
    },
    {
        "key": "MAL",
        "city": "Mangole",
        "name": "Mangole",
        "country": "Indonesia"
    },
    {
        "key": "MAM",
        "city": "Matamoros",
        "name": "Servando Canales Arpt",
        "country": "Mexico"
    },
    {
        "key": "MAN",
        "city": "Manchester",
        "name": "Manchester Intl",
        "country": "United Kingdom"
    },
    {
        "key": "MAO",
        "city": "Manaus",
        "name": "Intl Arpt Eduardo Gomes",
        "country": "Brazil"
    },
    {
        "key": "MAP",
        "city": "Mamai",
        "name": "Mamai Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MAQ",
        "city": "Mae Sot",
        "name": "Mae Sot Arpt",
        "country": "Thailand"
    },
    {
        "key": "MAR",
        "city": "Maracaibo",
        "name": "La Chinita Arpt",
        "country": "Venezuela"
    },
    {
        "key": "MAS",
        "city": "Manus Island",
        "name": "Momote Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "MAT",
        "city": "Matadi",
        "name": "Matadi",
        "country": "Republic of the Congo"
    },
    {
        "key": "MAU",
        "city": "Maupiti",
        "name": "Maupiti Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "MAW",
        "city": "Malden",
        "name": "Malden Regional Airport",
        "country": "United States"
    },
    {
        "key": "MAX",
        "city": "Ouro Sogui",
        "name": "Ouro Sogui Airport",
        "country": "Senegal"
    },
    {
        "key": "MAY",
        "city": "Mangrove Cay, Andros Island",
        "name": "Clarence A. Bain Airport",
        "country": "Bahamas"
    },
    {
        "key": "MAZ",
        "city": "Mayaguez",
        "name": "Eugenio M De Hostos Arpt",
        "country": "United States"
    },
    {
        "key": "MBA",
        "city": "Mombasa",
        "name": "Moi Intl",
        "country": "Kenya"
    },
    {
        "key": "MBD",
        "city": "Mmabatho",
        "name": "Mmabatho International Arpt",
        "country": "South Africa"
    },
    {
        "key": "MBE",
        "city": "Monbetsu-shi",
        "name": "Monbetsu Airport",
        "country": "Japan"
    },
    {
        "key": "MBG",
        "city": "Mobridge",
        "name": "Mobridge Municipal Airport",
        "country": "United States"
    },
    {
        "key": "MBH",
        "city": "Maryborough",
        "name": "Maryborough Arpt",
        "country": "Australia"
    },
    {
        "key": "MBI",
        "city": "Mbeya",
        "name": "Songwe Airport",
        "country": "Tanzania"
    },
    {
        "key": "MBJ",
        "city": "Montego Bay",
        "name": "Sangster Arpt",
        "country": "Jamaica"
    },
    {
        "key": "MBK",
        "city": "Matupa",
        "name": "Orlando Villas-Boas Regional Airport",
        "country": "Brazil"
    },
    {
        "key": "MBL",
        "city": "Manistee",
        "name": "Manistee Arpt",
        "country": "United States"
    },
    {
        "key": "MBO",
        "city": "Mamburao",
        "name": "Mamburao Airport",
        "country": "Philippines"
    },
    {
        "key": "MBQ",
        "city": "Mbarara, Uganda",
        "name": "Mbarara Airport",
        "country": "Uganda"
    },
    {
        "key": "MBR",
        "city": "M bout",
        "name": "M Bout Airport",
        "country": "Mauritania"
    },
    {
        "key": "MBS",
        "city": "Saginaw",
        "name": "Saginaw Arpt",
        "country": "United States"
    },
    {
        "key": "MBT",
        "city": "Masbate",
        "name": "Murfreesboro Municipal Arpt",
        "country": "Philippines"
    },
    {
        "key": "MBV",
        "city": "Mesa",
        "name": "Masa Airport",
        "country": "United States"
    },
    {
        "key": "MBW",
        "city": "Moorabbin",
        "name": "Moorabbin Arpt",
        "country": "Australia"
    },
    {
        "key": "MBX",
        "city": "Maribor",
        "name": "Maribor Arpt",
        "country": "Slovenia"
    },
    {
        "key": "MBY",
        "city": "Moberly",
        "name": "Omar N. Bradley Airport",
        "country": "United States"
    },
    {
        "key": "MCC",
        "city": "Sacramento",
        "name": "Mcclellan Airforce Base",
        "country": "United States"
    },
    {
        "key": "MCD",
        "city": "Mackinac Island",
        "name": "Mackinac Island Airport",
        "country": "United States"
    },
    {
        "key": "MCE",
        "city": "Merced",
        "name": "Merced Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MCF",
        "city": "Tampa",
        "name": "Mac Dill Airforce Base",
        "country": "United States"
    },
    {
        "key": "MCH",
        "city": "Machala",
        "name": "General Manuel Serrano Airport",
        "country": "Ecuador"
    },
    {
        "key": "KXK",
        "city": "Komsomolsk Na Amure",
        "name": "Komsomolsk Na Amure Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KXU",
        "city": "Katiu",
        "name": "Katiu Airport",
        "country": "French Polynesia"
    },
    {
        "key": "KYA",
        "city": "Konya",
        "name": "Konya Arpt",
        "country": "Turkey"
    },
    {
        "key": "KYE",
        "city": "Tripoli",
        "name": "Kleyate",
        "country": "Lebanon"
    },
    {
        "key": "KYI",
        "city": "Yalata",
        "name": "Yalata Airport",
        "country": "Australia"
    },
    {
        "key": "KYK",
        "city": "Kodiak",
        "name": "Karluk Airport",
        "country": "United States"
    },
    {
        "key": "KYN",
        "city": "Milton Keynes",
        "name": "Milton Keynes Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "KYO",
        "city": "Tampa",
        "name": "Topp Of Tampa",
        "country": "United States"
    },
    {
        "key": "KYP",
        "city": "Kyaukpyu",
        "name": "Kyaukpyu Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "KYS",
        "city": "Kayes",
        "name": "Kayes Airport (Dag-Dag Airport)",
        "country": "Mali"
    },
    {
        "key": "KYT",
        "city": "Kyaukhtu",
        "name": "Kyauktu Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "KYU",
        "city": "Koyukuk",
        "name": "Koyukuk",
        "country": "United States"
    },
    {
        "key": "KYZ",
        "city": "Kyzyl",
        "name": "Kyzyl Airport",
        "country": "Russia"
    },
    {
        "key": "KZC",
        "city": "Kampong Chhang West",
        "name": "Kampong Chhnang Airport",
        "country": "Cambodia"
    },
    {
        "key": "KZD",
        "city": "Balice",
        "name": "Krakor Airport",
        "country": "Poland"
    },
    {
        "key": "KZF",
        "city": "Kaintiba",
        "name": "Kaintiba Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KZG",
        "city": "Kitzingen",
        "name": "Kitzingen Airport",
        "country": "Germany"
    },
    {
        "key": "KZH",
        "city": "Kizhuyak",
        "name": "Kizhuyak Airport",
        "country": "United States"
    },
    {
        "key": "KZI",
        "city": "Kozani, Greece",
        "name": "Kozani National Airport (Filippos Airport)",
        "country": "Greece"
    },
    {
        "key": "KZN",
        "city": "Kazan",
        "name": "Kazan Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KZO",
        "city": "Kzyl Orda",
        "name": "Kzyl Orda Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "KZR",
        "city": "KÃ¼tahya, Turkey",
        "name": "Zafer Airport",
        "country": "Turkey"
    },
    {
        "key": "KZS",
        "city": "Kastelorizo",
        "name": "Kastelorizo Arpt",
        "country": "Greece"
    },
    {
        "key": "LAA",
        "city": "Lamar",
        "name": "Lamar Arpt",
        "country": "United States"
    },
    {
        "key": "LAC",
        "city": "Layang-Layang Island, Sabah",
        "name": "Layang-Layang Airport (Swallow Reef Airport)",
        "country": "Malaysia"
    },
    {
        "key": "LAD",
        "city": "Luanda",
        "name": "Four De Fevereiro Arpt",
        "country": "Angola"
    },
    {
        "key": "LAE",
        "city": "Lae Pg",
        "name": "Nadzab Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "LAF",
        "city": "Lafayette",
        "name": "Lafayette Arpt",
        "country": "United States"
    },
    {
        "key": "LAH",
        "city": "Labuha, Indonesia",
        "name": "Oesman Sadik Airport",
        "country": "Indonesia"
    },
    {
        "key": "LAI",
        "city": "Lannion",
        "name": "Servel Airport",
        "country": "France"
    },
    {
        "key": "LAJ",
        "city": "Lajes",
        "name": "Lages Arpt",
        "country": "Brazil"
    },
    {
        "key": "LAK",
        "city": "Aklavik",
        "name": "Aklavik/Freddie Carmichael Airport",
        "country": "Canada"
    },
    {
        "key": "LAL",
        "city": "Lakeland",
        "name": "Lakeland Arpt",
        "country": "United States"
    },
    {
        "key": "LAM",
        "city": "Los Alamos",
        "name": "Los Alamos Municipal",
        "country": "United States"
    },
    {
        "key": "LAN",
        "city": "Lansing",
        "name": "Lansing Arpt",
        "country": "United States"
    },
    {
        "key": "LAO",
        "city": "Laoag",
        "name": "Laoag Arpt",
        "country": "Philippines"
    },
    {
        "key": "LAP",
        "city": "La Paz",
        "name": "Aeropuerto Gen Marquez De Leon",
        "country": "Mexico"
    },
    {
        "key": "LAR",
        "city": "Laramie",
        "name": "General Brees Fld",
        "country": "United States"
    },
    {
        "key": "LAS",
        "city": "Las Vegas",
        "name": "McCarran Intl",
        "country": "United States"
    },
    {
        "key": "LAU",
        "city": "Lamu",
        "name": "Lamu Arpt",
        "country": "Kenya"
    },
    {
        "key": "LAW",
        "city": "Lawton",
        "name": "Lawton Municipal",
        "country": "United States"
    },
    {
        "key": "LAX",
        "city": "Los Angeles",
        "name": "Los Angeles Intl Arpt",
        "country": "United States"
    },
    {
        "key": "LAY",
        "city": "Ladysmith",
        "name": "Ladysmith Arpt",
        "country": "South Africa"
    },
    {
        "key": "LAZ",
        "city": "Bom Jesus da Lapa, Bahia, Brazil",
        "name": "Bom Jesus da Lapa Airport",
        "country": "Brazil"
    },
    {
        "key": "LBA",
        "city": "Leeds",
        "name": "Leeds Bradford Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LBB",
        "city": "Lubbock",
        "name": "Lubbock Preston Smith Intl Arpt",
        "country": "United States"
    },
    {
        "key": "LBC",
        "city": "Luebeck",
        "name": "Blankensee Arpt",
        "country": "Germany"
    },
    {
        "key": "LBD",
        "city": "Khujand, Tajikistan",
        "name": "Khujand Airport",
        "country": "Tajikistan"
    },
    {
        "key": "LBE",
        "city": "Latrobe",
        "name": "Westmorland County",
        "country": "United States"
    },
    {
        "key": "LBF",
        "city": "North Platte",
        "name": "Lee Bird Field",
        "country": "United States"
    },
    {
        "key": "LBG",
        "city": "Paris",
        "name": "Le Bourget Arpt",
        "country": "France"
    },
    {
        "key": "LBH",
        "city": "Sydney",
        "name": "Palm Beach Arpt",
        "country": "Australia"
    },
    {
        "key": "LBI",
        "city": "Albi",
        "name": "Le Sequestre Arpt",
        "country": "France"
    },
    {
        "key": "LBJ",
        "city": "Labuan Bajo",
        "name": "Komodo Airport",
        "country": "Indonesia"
    },
    {
        "key": "LBL",
        "city": "Liberal",
        "name": "Liberal Municipal",
        "country": "United States"
    },
    {
        "key": "LBP",
        "city": "Long Banga",
        "name": "Long Banga Airfield Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LBQ",
        "city": "Lambarene",
        "name": "Lambarene",
        "country": "Gabon"
    },
    {
        "key": "LBS",
        "city": "Labasa",
        "name": "Labasa Arpt",
        "country": "Fiji"
    },
    {
        "key": "LBT",
        "city": "Lumberton",
        "name": "Lumberton Arpt",
        "country": "United States"
    },
    {
        "key": "LBU",
        "city": "Labuan",
        "name": "Labuan Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LBV",
        "city": "Libreville",
        "name": "Libreville Arpt",
        "country": "Gabon"
    },
    {
        "key": "LBX",
        "city": "Lubang",
        "name": "Lubang Airport",
        "country": "Philippines"
    },
    {
        "key": "LBY",
        "city": "La Baule",
        "name": "Montoir Arpt",
        "country": "France"
    },
    {
        "key": "LCA",
        "city": "Larnaca",
        "name": "Larnaca Intl",
        "country": "Cyprus"
    },
    {
        "key": "LCC",
        "city": "Lecce",
        "name": "Galatina Arpt",
        "country": "Italy"
    },
    {
        "key": "LCD",
        "city": "Louis Trichardt",
        "name": "Louis Trichardt Airport",
        "country": "South Africa"
    },
    {
        "key": "LCE",
        "city": "La Ceiba",
        "name": "Goloson Intl Arpt",
        "country": "Honduras"
    },
    {
        "key": "LCF",
        "city": "Rio Dulce",
        "name": "Las Vegas Airport",
        "country": "Guatemala"
    },
    {
        "key": "LCG",
        "city": "La Coruna",
        "name": "La Coruna Arpt",
        "country": "Spain"
    },
    {
        "key": "LCH",
        "city": "Lake Charles",
        "name": "Lake Charles Municipal",
        "country": "United States"
    },
    {
        "key": "LCI",
        "city": "Laconia",
        "name": "Laconia Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "LCJ",
        "city": "Lodz",
        "name": "Lodz Lublinek Arpt",
        "country": "Poland"
    },
    {
        "key": "PMO",
        "city": "Palermo",
        "name": "Punta Raisi Arpt",
        "country": "Italy"
    },
    {
        "key": "AAA",
        "city": "Anaa",
        "name": "Anaa Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "AAB",
        "city": "Tanbar",
        "name": "Arrabury Airport",
        "country": "Australia"
    },
    {
        "key": "AAC",
        "city": "El Arish",
        "name": "Al Arish International",
        "country": "Egypt"
    },
    {
        "key": "AAE",
        "city": "Annaba",
        "name": "Les Salines Arpt",
        "country": "Algeria"
    },
    {
        "key": "AAF",
        "city": "Apalachicola",
        "name": "Apalachicola Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AAG",
        "city": "Arapoti",
        "name": "Arapoti Arpt",
        "country": "Brazil"
    },
    {
        "key": "AAH",
        "city": "Aachen",
        "name": "Aachen Merzbruck Arpt",
        "country": "Germany"
    },
    {
        "key": "AAL",
        "city": "Aalborg",
        "name": "Aalborg Arpt",
        "country": "Denmark"
    },
    {
        "key": "AAM",
        "city": "Mala Mala",
        "name": "Mala Mala Arpt",
        "country": "South Africa"
    },
    {
        "key": "AAN",
        "city": "Al Ain",
        "name": "Al Ain Arpt",
        "country": "United Arab Emirates"
    },
    {
        "key": "AAO",
        "city": "Anaco",
        "name": "Anaco Airport",
        "country": "Venezuela"
    },
    {
        "key": "AAQ",
        "city": "Anapa",
        "name": "Anapa Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "AAR",
        "city": "Aarhus",
        "name": "Tirstrup Arpt",
        "country": "Denmark"
    },
    {
        "key": "AAU",
        "city": "Asau, Savai",
        "name": "Asau Airport",
        "country": "Island, Samoa"
    },
    {
        "key": "AAV",
        "city": "Alah",
        "name": "Alah Airport",
        "country": "Philippines"
    },
    {
        "key": "AAX",
        "city": "Araxa",
        "name": "Araxa Airport",
        "country": "Brazil"
    },
    {
        "key": "AAY",
        "city": "Al Ghaydah",
        "name": "Al Ghaydah Arpt",
        "country": "Yemen"
    },
    {
        "key": "AAZ",
        "city": "Quezaltenango",
        "name": "Quetzaltenango Airport",
        "country": "Guatemala"
    },
    {
        "key": "ABA",
        "city": "Abakan",
        "name": "Abakan Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "ABB",
        "city": "Asaba",
        "name": "Asaba International Arpt",
        "country": "Nigeria"
    },
    {
        "key": "ABC",
        "city": "Albacete",
        "name": "Los Llanos Arpt",
        "country": "Spain"
    },
    {
        "key": "ABD",
        "city": "Abadan",
        "name": "Abadan Arpt",
        "country": "Iran"
    },
    {
        "key": "ABE",
        "city": "Allentown",
        "name": "Lehigh Valley Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ABF",
        "city": "Abaiang, Kiribati",
        "name": "Abaiang Atoll Airport",
        "country": "Kiribati"
    },
    {
        "key": "ABI",
        "city": "Abilene",
        "name": "Abilene Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ABJ",
        "city": "Abidjan",
        "name": "Felix Houphouet Boigny Arpt",
        "country": "CÃ´te dIvoire"
    },
    {
        "key": "ABK",
        "city": "Kebri Dehar",
        "name": "Kabri Dar Airport",
        "country": "Ethiopia"
    },
    {
        "key": "ABL",
        "city": "Ambler",
        "name": "Ambler Arpt",
        "country": "United States"
    },
    {
        "key": "ABM",
        "city": "Bamaga",
        "name": "Bamaga Arpt",
        "country": "Australia"
    },
    {
        "key": "ABN",
        "city": "Albina",
        "name": "Albina Airstrip",
        "country": "Suriname"
    },
    {
        "key": "ABP",
        "city": "Atkamba",
        "name": "Atkamba Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ABQ",
        "city": "Albuquerque",
        "name": "Albuquerque Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ABR",
        "city": "Aberdeen",
        "name": "Aberdeen Arpt",
        "country": "United States"
    },
    {
        "key": "ABS",
        "city": "Abu Simbel",
        "name": "Abu Simbel Arpt",
        "country": "Egypt"
    },
    {
        "key": "ABT",
        "city": "Al Baha",
        "name": "Al Aqiq",
        "country": "Saudi Arabia"
    },
    {
        "key": "ABU",
        "city": "Atambua, Indonesia",
        "name": "Haliwen Airport",
        "country": "Indonesia"
    },
    {
        "key": "ABV",
        "city": "Abuja",
        "name": "Abuja Intl",
        "country": "Nigeria"
    },
    {
        "key": "ABW",
        "city": "Abau",
        "name": "Abau Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ABX",
        "city": "Albury",
        "name": "Albury Airport",
        "country": "Australia"
    },
    {
        "key": "ABY",
        "city": "Albany",
        "name": "Dougherty Cty Arpt",
        "country": "United States"
    },
    {
        "key": "ABZ",
        "city": "Aberdeen",
        "name": "Dyce Airport",
        "country": "United Kingdom"
    },
    {
        "key": "ACA",
        "city": "Acapulco",
        "name": "Alvarez Intl Arpt",
        "country": "Mexico"
    },
    {
        "key": "ACB",
        "city": "Bellaire",
        "name": "Antrim County Airport",
        "country": "United States"
    },
    {
        "key": "ACC",
        "city": "Accra",
        "name": "Kotoka Airport",
        "country": "Ghana"
    },
    {
        "key": "ACD",
        "city": "Acandi",
        "name": "Aeropuerto Alcides Fernandez",
        "country": "Colombia"
    },
    {
        "key": "ACE",
        "city": "Lanzarote",
        "name": "Lanzarote Airport",
        "country": "Spain"
    },
    {
        "key": "ACH",
        "city": "Altenrhein",
        "name": "Altenrhein Arpt",
        "country": "Switzerland"
    },
    {
        "key": "ACI",
        "city": "Alderney",
        "name": "The Blaye Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "ACJ",
        "city": "Anuradhapura",
        "name": "Anuradhapura Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "ACK",
        "city": "Nantucket",
        "name": "Nantucket Memorial",
        "country": "United States"
    },
    {
        "key": "ACL",
        "city": "Aguaclara",
        "name": "Aguaclara Airport",
        "country": "Colombia"
    },
    {
        "key": "ACM",
        "city": "Arica, Colombia",
        "name": "Arica Airport",
        "country": "Chile"
    },
    {
        "key": "ACP",
        "city": "Maragheh",
        "name": "Sahand Airport",
        "country": "Iran"
    },
    {
        "key": "ACR",
        "city": "Araracuara",
        "name": "Araracuara Arpt",
        "country": "Colombia"
    },
    {
        "key": "ACS",
        "city": "Achinsk",
        "name": "Achinsk Airport",
        "country": "Russia"
    },
    {
        "key": "ACT",
        "city": "Waco",
        "name": "Madison Cooper Arpt",
        "country": "United States"
    },
    {
        "key": "ACV",
        "city": "Arcata",
        "name": "Arcata Eureka Arpt",
        "country": "United States"
    },
    {
        "key": "ACX",
        "city": "Xingyi",
        "name": "Xingyi",
        "country": "China"
    },
    {
        "key": "ACY",
        "city": "Atlantic City",
        "name": "Atlantic City Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ADA",
        "city": "Adana",
        "name": "Adana Arpt",
        "country": "Turkey"
    },
    {
        "key": "ADB",
        "city": "Izmir",
        "name": "Adnan Menderes Airport",
        "country": "Turkey"
    },
    {
        "key": "ADC",
        "city": "Andakombe",
        "name": "Andakombe Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ADD",
        "city": "Addis Ababa",
        "name": "Bole Airport",
        "country": "Ethiopia"
    },
    {
        "key": "ADE",
        "city": "Aden",
        "name": "Yemen Intl Arpt",
        "country": "Yemen"
    },
    {
        "key": "ADF",
        "city": "Adiyaman",
        "name": "ADIYAMAN ARPT",
        "country": "Turkey"
    },
    {
        "key": "ADG",
        "city": "Adrian",
        "name": "Lenawee County Arpt",
        "country": "United States"
    },
    {
        "key": "ADH",
        "city": "Aldan, Yakutia",
        "name": "Aldan Airport",
        "country": "Russia"
    },
    {
        "key": "ADI",
        "city": "Arandis, Namibia",
        "name": "Arandis Airport",
        "country": "Namibia"
    },
    {
        "key": "ADJ",
        "city": "Amman",
        "name": "Civil Marka Arpt",
        "country": "Jordan"
    },
    {
        "key": "ADK",
        "city": "Adak Island",
        "name": "Adak Island Ns",
        "country": "United States"
    },
    {
        "key": "ADL",
        "city": "Adelaide",
        "name": "Adelaide Arpt",
        "country": "Australia"
    },
    {
        "key": "ADM",
        "city": "Ardmore",
        "name": "Ardmore Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MCI",
        "city": "Kansas City",
        "name": "Kansas City Intl",
        "country": "United States"
    },
    {
        "key": "ADO",
        "city": "Andamooka",
        "name": "Andamooka Airport",
        "country": "Australia"
    },
    {
        "key": "BFS",
        "city": "Belfast",
        "name": "Belfast Intl Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "BFT",
        "city": "Beaufort",
        "name": "Beaufort County Arpt",
        "country": "United States"
    },
    {
        "key": "BFU",
        "city": "Bengbu",
        "name": "Bengbu Airport",
        "country": "China"
    },
    {
        "key": "BFV",
        "city": "Buri Ram",
        "name": "Buri Ram Arpt",
        "country": "Thailand"
    },
    {
        "key": "BGA",
        "city": "Bucaramanga",
        "name": "Palo Negro Arpt",
        "country": "Colombia"
    },
    {
        "key": "BGC",
        "city": "BraganÃ§a",
        "name": "BraganÃ§a Airport",
        "country": "Portugal"
    },
    {
        "key": "BGD",
        "city": "Borger",
        "name": "Hutchinson County Airport",
        "country": "United States"
    },
    {
        "key": "BGE",
        "city": "Bainbridge",
        "name": "Decatur County Industrial Air Park",
        "country": "United States"
    },
    {
        "key": "BGF",
        "city": "Bangui",
        "name": "Bangui Airport",
        "country": "Central African Republic"
    },
    {
        "key": "BGG",
        "city": "Bingol, Turkey",
        "name": "Bingol Airport",
        "country": "Turkey"
    },
    {
        "key": "BGI",
        "city": "Bridgetown",
        "name": "Grantley Adams Intl Arpt",
        "country": "Barbados"
    },
    {
        "key": "BGK",
        "city": "McCall",
        "name": "Big Creek Airport",
        "country": "United States"
    },
    {
        "key": "BGL",
        "city": "Narayansthan",
        "name": "Balewa Airport",
        "country": "Nepal"
    },
    {
        "key": "BGM",
        "city": "Binghamton",
        "name": "Edwin A Link Field",
        "country": "United States"
    },
    {
        "key": "BGO",
        "city": "Bergen",
        "name": "Flesland Airport",
        "country": "Norway"
    },
    {
        "key": "BGP",
        "city": "Bongo",
        "name": "Bongo",
        "country": "Gabon"
    },
    {
        "key": "BGQ",
        "city": "Big Lake",
        "name": "Big Lake Arpt",
        "country": "United States"
    },
    {
        "key": "BGR",
        "city": "Bangor",
        "name": "Bangor Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BGS",
        "city": "BIG SPRING",
        "name": "Webb Airforce Base",
        "country": "United States"
    },
    {
        "key": "BGT",
        "city": "Bagdad",
        "name": "Bagdad Arpt",
        "country": "United States"
    },
    {
        "key": "BGU",
        "city": "Bangassou, Central African Republic",
        "name": "Bangassou Airport",
        "country": "Central African Republic"
    },
    {
        "key": "BGV",
        "city": "Bento Goncalves",
        "name": "Bento Goncalves Arpt",
        "country": "Brazil"
    },
    {
        "key": "BGW",
        "city": "Baghdad",
        "name": "Baghdad International Arpt",
        "country": "Iraq"
    },
    {
        "key": "BGX",
        "city": "Bage",
        "name": "Bage",
        "country": "Brazil"
    },
    {
        "key": "BGY",
        "city": "Bergamo",
        "name": "Orio Al Serio Arpt",
        "country": "Italy"
    },
    {
        "key": "BGZ",
        "city": "Palmeira",
        "name": "Braga Airport",
        "country": "Portugal"
    },
    {
        "key": "BHA",
        "city": "BahÃ­a de Caraquez",
        "name": "Los Perales Airport",
        "country": "Ecuador"
    },
    {
        "key": "BHB",
        "city": "Bar Harbor",
        "name": "Hancock County",
        "country": "United States"
    },
    {
        "key": "BHC",
        "city": "Bhurban",
        "name": "Bhurban Heliport",
        "country": "Pakistan"
    },
    {
        "key": "BHD",
        "city": "Belfast",
        "name": "Belfast City Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "MCJ",
        "city": "Albania",
        "name": "Jorge Isaacs Airport (La Mina Airport)",
        "country": "Colombia"
    },
    {
        "key": "BHE",
        "city": "Blenheim",
        "name": "Woodbourne Arpt",
        "country": "New Zealand"
    },
    {
        "key": "MCK",
        "city": "McCook",
        "name": "McCook Municipal",
        "country": "United States"
    },
    {
        "key": "BHG",
        "city": "Brus Laguna",
        "name": "Brus Laguna Airport",
        "country": "Honduras"
    },
    {
        "key": "BHH",
        "city": "Bisha",
        "name": "Bisha Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "MCL",
        "city": "Denali National Park and Preserve",
        "name": "McKinley National Park Airport (FAA: INR)",
        "country": "United States"
    },
    {
        "key": "MCM",
        "city": "Monte Carlo",
        "name": "Hel De Monte Carlo Airport",
        "country": "Monaco"
    },
    {
        "key": "BHI",
        "city": "Bahia Blanca",
        "name": "Commandante Airport",
        "country": "Argentina"
    },
    {
        "key": "MCN",
        "city": "Macon",
        "name": "Lewis B Wilson",
        "country": "United States"
    },
    {
        "key": "BHJ",
        "city": "Bhuj",
        "name": "Rudra Mata Arpt",
        "country": "India"
    },
    {
        "key": "MCO",
        "city": "Orlando",
        "name": "Orlando Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BHK",
        "city": "Bukhara",
        "name": "Bukhara Arpt",
        "country": "Uzbekistan"
    },
    {
        "key": "BHL",
        "city": "Bahia De Los Angeles",
        "name": "Bahia De Los Angeles Arpt",
        "country": "Mexico"
    },
    {
        "key": "MCP",
        "city": "Macapa",
        "name": "Macapa Intl Arpt",
        "country": "Brazil"
    },
    {
        "key": "MCQ",
        "city": "Miskolc",
        "name": "Miskolc Arpt",
        "country": "Hungary"
    },
    {
        "key": "BHM",
        "city": "Birmingham",
        "name": "Birmingham International Arpt",
        "country": "United States"
    },
    {
        "key": "MCT",
        "city": "Muscat",
        "name": "Muscat Internatonal Arpt",
        "country": "Oman"
    },
    {
        "key": "BHN",
        "city": "Bayhan al Qisab",
        "name": "Beihan Airport",
        "country": "Yemen"
    },
    {
        "key": "MCU",
        "city": "Montlucon",
        "name": "Gueret Arpt",
        "country": "France"
    },
    {
        "key": "BHO",
        "city": "Bhopal",
        "name": "Raja Bhoj Arpt",
        "country": "India"
    },
    {
        "key": "MCV",
        "city": "McArthur River",
        "name": "McArthur River Arpt",
        "country": "Australia"
    },
    {
        "key": "BHP",
        "city": "Bhojpur",
        "name": "Bhojpur",
        "country": "Nepal"
    },
    {
        "key": "BHQ",
        "city": "Broken Hill",
        "name": "Broken Hill Arpt",
        "country": "Australia"
    },
    {
        "key": "MCW",
        "city": "Mason City",
        "name": "Mason City Municipal",
        "country": "United States"
    },
    {
        "key": "BHR",
        "city": "Bharatpur",
        "name": "Bharatpur Airport",
        "country": "Nepal"
    },
    {
        "key": "MCX",
        "city": "Makhachkala",
        "name": "Makhachkala International Airport",
        "country": "Russia"
    },
    {
        "key": "BHS",
        "city": "Bathurst",
        "name": "Raglan Airport",
        "country": "Australia"
    },
    {
        "key": "MCY",
        "city": "Maroochydore",
        "name": "Maroochydore Arpt",
        "country": "Australia"
    },
    {
        "key": "BHU",
        "city": "Bhavnagar",
        "name": "Bhavnagar Arpt",
        "country": "India"
    },
    {
        "key": "MCZ",
        "city": "Maceio",
        "name": "Palmeres Airport",
        "country": "Brazil"
    },
    {
        "key": "BHV",
        "city": "Bahawalpur",
        "name": "Bahawalpur Airport",
        "country": "Pakistan"
    },
    {
        "key": "MDA",
        "city": "San Antonio",
        "name": "Martindale AAF",
        "country": "United States"
    },
    {
        "key": "BHW",
        "city": "Sargodha",
        "name": "Bhagatanwala Arpt",
        "country": "Pakistan"
    },
    {
        "key": "MDB",
        "city": "Melinda",
        "name": "Melinda Airport",
        "country": "Belize"
    },
    {
        "key": "BHX",
        "city": "Birmingham",
        "name": "Birmingham Intl Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "MDC",
        "city": "Manado",
        "name": "Samratulang Arpt",
        "country": "Indonesia"
    },
    {
        "key": "BHY",
        "city": "Beihai",
        "name": "Beihai Airport",
        "country": "China"
    },
    {
        "key": "MDD",
        "city": "Midland",
        "name": "Midland Airpark",
        "country": "United States"
    },
    {
        "key": "BIA",
        "city": "Bastia",
        "name": "Poretta Airport",
        "country": "France"
    },
    {
        "key": "MDE",
        "city": "Medellin",
        "name": "Jose Marie Cordova",
        "country": "Colombia"
    },
    {
        "key": "BIB",
        "city": "Baidoa",
        "name": "Baidoa Airport",
        "country": "Somalia"
    },
    {
        "key": "MDG",
        "city": "Mudanjiang",
        "name": "Mudanjiang Arpt",
        "country": "China"
    },
    {
        "key": "BID",
        "city": "Block Island",
        "name": "Block Island Municipal",
        "country": "United States"
    },
    {
        "key": "MZZ",
        "city": "Marion",
        "name": "Marion Municipal Airport",
        "country": "United States"
    },
    {
        "key": "NAA",
        "city": "Narrabri",
        "name": "Narrabri Arpt",
        "country": "Australia"
    },
    {
        "key": "NAB",
        "city": "Albany",
        "name": "Albany Naval Air Station",
        "country": "United States"
    },
    {
        "key": "NAC",
        "city": "Naracoorte",
        "name": "Naracoorte Arpt",
        "country": "Australia"
    },
    {
        "key": "NAE",
        "city": "Natitingou",
        "name": "Boundetingou Airport",
        "country": "Benin"
    },
    {
        "key": "NAF",
        "city": "Banaina",
        "name": "Banaina Airport",
        "country": "Indonesia"
    },
    {
        "key": "NAG",
        "city": "Nagpur",
        "name": "Dr Ambedkar Intl Arpt",
        "country": "India"
    },
    {
        "key": "NAI",
        "city": "Annai",
        "name": "Annai Airport",
        "country": "Guyana"
    },
    {
        "key": "NAJ",
        "city": "Nakhchivan",
        "name": "Nakhchivan International Airport",
        "country": "Azerbaijan"
    },
    {
        "key": "NAK",
        "city": "Nakhon Ratchasima",
        "name": "Nakhon Ratchasima Arpt",
        "country": "Thailand"
    },
    {
        "key": "NAL",
        "city": "Nalchik",
        "name": "Nalchik Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NAM",
        "city": "Namlea",
        "name": "Namlea Arpt",
        "country": "Indonesia"
    },
    {
        "key": "NAN",
        "city": "Nadi",
        "name": "Nadi Intl",
        "country": "Fiji"
    },
    {
        "key": "NAO",
        "city": "Nanchong",
        "name": "Nanchong Gaoping Airport",
        "country": "China"
    },
    {
        "key": "NAP",
        "city": "Naples",
        "name": "Capodichino Arpt",
        "country": "Italy"
    },
    {
        "key": "NAR",
        "city": "Nare",
        "name": "Nare Arpt",
        "country": "Colombia"
    },
    {
        "key": "NAS",
        "city": "Nassau",
        "name": "Nassau Intl",
        "country": "Bahamas"
    },
    {
        "key": "NAT",
        "city": "Natal",
        "name": "Augusto Severo Intl Arpt",
        "country": "Brazil"
    },
    {
        "key": "NAV",
        "city": "Nevsehir",
        "name": "Nevsehir Arpt",
        "country": "Turkey"
    },
    {
        "key": "NAW",
        "city": "Narathiwat",
        "name": "Narathiwat Arpt",
        "country": "Thailand"
    },
    {
        "key": "NAY",
        "city": "Beijing",
        "name": "Nanyuan Arpt",
        "country": "China"
    },
    {
        "key": "NBC",
        "city": "Naberevnye Chelny",
        "name": "Nijnekamsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NBE",
        "city": "Enfidha",
        "name": "Zine Elabidine Ben Ali",
        "country": "Tunisia"
    },
    {
        "key": "NBG",
        "city": "New Orleans",
        "name": "Alvin Callendar Arpt",
        "country": "United States"
    },
    {
        "key": "NBH",
        "city": "Nambucca Heads",
        "name": "Nambucca Heads Airport",
        "country": "Australia"
    },
    {
        "key": "NBO",
        "city": "Nairobi",
        "name": "Jomo Kenyatta Intl",
        "country": "Kenya"
    },
    {
        "key": "NBP",
        "city": "New York",
        "name": "Battery Pk City N Cov",
        "country": "United States"
    },
    {
        "key": "NBS",
        "city": "Baishan",
        "name": "Changbaishan Airport",
        "country": "China"
    },
    {
        "key": "NBW",
        "city": "Guantanamo",
        "name": "Guantanamo NAS",
        "country": "Cuba"
    },
    {
        "key": "NBX",
        "city": "Nabire, Indonesia",
        "name": "Nabire Airport",
        "country": "Indonesia"
    },
    {
        "key": "NCA",
        "city": "North Caicos",
        "name": "North Caicos Municipal Arpt",
        "country": "Turks and Caicos Islands"
    },
    {
        "key": "NCE",
        "city": "Nice",
        "name": "Cote D Azur Arpt",
        "country": "France"
    },
    {
        "key": "NCH",
        "city": "Nachingwea",
        "name": "Nachingwea Airport",
        "country": "Tanzania"
    },
    {
        "key": "NCI",
        "city": "Necocli",
        "name": "Necocli Arpt",
        "country": "Colombia"
    },
    {
        "key": "NCJ",
        "city": "Sunchales",
        "name": "Sunchales Airport",
        "country": "Argentina"
    },
    {
        "key": "NCL",
        "city": "Newcastle",
        "name": "Newcastle Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "NCO",
        "city": "North Kingstown",
        "name": "Quonset State Airport (FAA: OQU)",
        "country": "United States"
    },
    {
        "key": "NCP",
        "city": "Luzon Island",
        "name": "Cubi Pt NAS",
        "country": "Philippines"
    },
    {
        "key": "NCQ",
        "city": "Marietta",
        "name": "Marietta Atlanta Naval Air Station",
        "country": "United States"
    },
    {
        "key": "NCR",
        "city": "San Carlos",
        "name": "San Carlos Airport",
        "country": "United States"
    },
    {
        "key": "NCS",
        "city": "Newcastle",
        "name": "Newcastle Intl Arpt",
        "country": "South Africa"
    },
    {
        "key": "NCT",
        "city": "Nicoya",
        "name": "Nicoya Guanacaste Airport",
        "country": "Costa Rica"
    },
    {
        "key": "NCU",
        "city": "Nukus",
        "name": "Nukus Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "NCY",
        "city": "Annecy",
        "name": "Annecy Meythet Arpt",
        "country": "France"
    },
    {
        "key": "NDA",
        "city": "Banda Islands, Indonesia",
        "name": "Bandanaira Airport",
        "country": "Indonesia"
    },
    {
        "key": "NDB",
        "city": "Nouadhibou",
        "name": "Nouadhibou Arpt",
        "country": "Mauritania"
    },
    {
        "key": "NDC",
        "city": "Nanded",
        "name": "Nanded Airport",
        "country": "India"
    },
    {
        "key": "NDE",
        "city": "Mandera",
        "name": "Mandera Airport",
        "country": "Kenya"
    },
    {
        "key": "NDG",
        "city": "Qiqihar",
        "name": "Qiqihar Arpt",
        "country": "China"
    },
    {
        "key": "NDJ",
        "city": "N Djamena",
        "name": "N Djamena Arpt",
        "country": "Chad"
    },
    {
        "key": "NDK",
        "city": "Namdrik",
        "name": "Namdrik Arpt",
        "country": "Marshall Islands"
    },
    {
        "key": "NDL",
        "city": "NDele, Central African Republic",
        "name": "NDele Airport",
        "country": "Central African Republic"
    },
    {
        "key": "NDN",
        "city": "Nadunumu",
        "name": "Nadunumu Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "NDP",
        "city": "Pensacola",
        "name": "Pensacola Ellyson Naval Air Station",
        "country": "United States"
    },
    {
        "key": "NDR",
        "city": "Nador",
        "name": "Nador Arpt",
        "country": "Morocco"
    },
    {
        "key": "NDU",
        "city": "Rundu",
        "name": "Rundu Airport",
        "country": "Namibia"
    },
    {
        "key": "NDV",
        "city": "Anacostia",
        "name": "USN Heliport",
        "country": "United States"
    },
    {
        "key": "NDY",
        "city": "Sanday",
        "name": "Sanday Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "NEG",
        "city": "Negril",
        "name": "Negril Arpt",
        "country": "Jamaica"
    },
    {
        "key": "NEK",
        "city": "Jimma",
        "name": "Nekemte Airport",
        "country": "Ethiopia"
    },
    {
        "key": "NEN",
        "city": "Jacksonville",
        "name": "NOLF Whitehouse",
        "country": "United States"
    },
    {
        "key": "NES",
        "city": "New York",
        "name": "Skyports Inc Seaplane Base",
        "country": "United States"
    },
    {
        "key": "NEU",
        "city": "Sam Nuea",
        "name": "Sam Neua Airport",
        "country": "Laos"
    },
    {
        "key": "NEV",
        "city": "Nevis",
        "name": "Nevis Airport",
        "country": "Saint Kitts and Nevis"
    },
    {
        "key": "NEW",
        "city": "New Orleans",
        "name": "Lakefront Airport",
        "country": "United States"
    },
    {
        "key": "NFB",
        "city": "MT CLEMENS",
        "name": "Detroit Naval Air Facility",
        "country": "United States"
    },
    {
        "key": "NFG",
        "city": "Nefteyugansk",
        "name": "Nefteyugansk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NFL",
        "city": "Fallon",
        "name": "Fallon Nas",
        "country": "United States"
    },
    {
        "key": "NGA",
        "city": "Young",
        "name": "Young Arpt",
        "country": "Australia"
    },
    {
        "key": "NGB",
        "city": "Ningbo",
        "name": "Ningbo Arpt",
        "country": "China"
    },
    {
        "key": "ADQ",
        "city": "Kodiak",
        "name": "Kodiak Arpt",
        "country": "United States"
    },
    {
        "key": "NGC",
        "city": "Grand Canyon",
        "name": "Grand Canyon North Rim Arpt",
        "country": "United States"
    },
    {
        "key": "PFJ",
        "city": "Patreksfjordur",
        "name": "Patreksfjordur",
        "country": "Iceland"
    },
    {
        "key": "PFO",
        "city": "Paphos",
        "name": "Paphos Intl Airport",
        "country": "Cyprus"
    },
    {
        "key": "PFQ",
        "city": "Farsabad",
        "name": "Parsabad-Moghan Airport",
        "country": "Iran"
    },
    {
        "key": "PGA",
        "city": "Page",
        "name": "Page Airport",
        "country": "United States"
    },
    {
        "key": "PGD",
        "city": "Punta Gorda",
        "name": "Charlotte County",
        "country": "United States"
    },
    {
        "key": "PGF",
        "city": "Perpignan",
        "name": "Llabanere Arpt",
        "country": "France"
    },
    {
        "key": "PGH",
        "city": "Pantnagar",
        "name": "Pantnagar",
        "country": "India"
    },
    {
        "key": "PGK",
        "city": "Pangkalpinang",
        "name": "Pangkalpinang Arpt",
        "country": "Indonesia"
    },
    {
        "key": "PGL",
        "city": "Pascagoula",
        "name": "Jackson Cnty",
        "country": "United States"
    },
    {
        "key": "PGM",
        "city": "Port Graham",
        "name": "Port Graham Arpt",
        "country": "United States"
    },
    {
        "key": "PGN",
        "city": "Pangia",
        "name": "Pangia Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "PGO",
        "city": "Pagosa Springs",
        "name": "Stevens Field Arpt",
        "country": "United States"
    },
    {
        "key": "PGR",
        "city": "Paragould",
        "name": "Paragould Municipal",
        "country": "United States"
    },
    {
        "key": "PGS",
        "city": "Peach Springs",
        "name": "Grand Canyon Caverns Airport (FAA: L37)",
        "country": "United States"
    },
    {
        "key": "PGV",
        "city": "Greenville",
        "name": "Pitt Greenville Arpt",
        "country": "United States"
    },
    {
        "key": "PGX",
        "city": "Perigueux",
        "name": "Perigueux Arpt",
        "country": "France"
    },
    {
        "key": "PHA",
        "city": "Thanh pho Phan Rang - ThÃ¡p ChÃ m",
        "name": "Phan Rang Air Base",
        "country": "Vietnam"
    },
    {
        "key": "PHB",
        "city": "Parnaiba",
        "name": "Santos Dumont Airport",
        "country": "Brazil"
    },
    {
        "key": "PHC",
        "city": "Port Harcourt",
        "name": "Port Harcourt Arpt",
        "country": "Nigeria"
    },
    {
        "key": "PHD",
        "city": "New Philadelphia",
        "name": "Harry Clever Field",
        "country": "United States"
    },
    {
        "key": "PHE",
        "city": "Port Hedland",
        "name": "Port Hedland Arpt",
        "country": "Australia"
    },
    {
        "key": "PHF",
        "city": "Newport News",
        "name": "Williamsburg Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PHG",
        "city": "Port Harcourt",
        "name": "Port Harcourt City Arpt",
        "country": "Nigeria"
    },
    {
        "key": "PHH",
        "city": "Phan Thiet",
        "name": "Phan Thiet Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "PHK",
        "city": "Pahokee",
        "name": "Palm Beach County Glades Arpt",
        "country": "United States"
    },
    {
        "key": "PHL",
        "city": "Philadelphia",
        "name": "Philadelphia Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PHN",
        "city": "Port Huron",
        "name": "St Clair County Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PHP",
        "city": "Philip",
        "name": "Philip Airport",
        "country": "United States"
    },
    {
        "key": "PHR",
        "city": "Pacific Harbour",
        "name": "Pacific Harbour Airport",
        "country": "Fiji"
    },
    {
        "key": "PHS",
        "city": "Phitsanulok",
        "name": "Phitsanulok Arpt",
        "country": "Thailand"
    },
    {
        "key": "PHT",
        "city": "Paris",
        "name": "Henry County Arpt",
        "country": "United States"
    },
    {
        "key": "PHW",
        "city": "Phalaborwa",
        "name": "Phalaborwa Arpt",
        "country": "South Africa"
    },
    {
        "key": "PHX",
        "city": "Phoenix",
        "name": "Sky Harbor Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PHY",
        "city": "Tambon Lan Ba",
        "name": "Phetchabun Airport",
        "country": "Thailand"
    },
    {
        "key": "PIA",
        "city": "Peoria",
        "name": "Greater Peoria Arpt",
        "country": "United States"
    },
    {
        "key": "PIB",
        "city": "Laurel",
        "name": "Hattiesburg Laurel Regional Arpt",
        "country": "United States"
    },
    {
        "key": "PIE",
        "city": "Tampa",
        "name": "St Petersburg Clearwater Arpt",
        "country": "United States"
    },
    {
        "key": "PIH",
        "city": "Pocatello",
        "name": "Pocatello Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "PII",
        "city": "Fairbanks",
        "name": "Fairbanks Phillips Airport",
        "country": "United States"
    },
    {
        "key": "PIK",
        "city": "Glasgow",
        "name": "Prestwick Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "PIN",
        "city": "Parintins, Amazonas, Brazil",
        "name": "JÃºlio BelÃ©m Airport",
        "country": "Brazil"
    },
    {
        "key": "PIO",
        "city": "Pisco",
        "name": "Pisco Airport",
        "country": "Peru"
    },
    {
        "key": "PIP",
        "city": "Pilot Point",
        "name": "Pilot Point Airport",
        "country": "United States"
    },
    {
        "key": "PIR",
        "city": "Pierre",
        "name": "Pierre Municipal",
        "country": "United States"
    },
    {
        "key": "PIS",
        "city": "Poitiers",
        "name": "Biard Airport",
        "country": "France"
    },
    {
        "key": "PIT",
        "city": "Pittsburgh",
        "name": "Pittsburgh Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PIU",
        "city": "Piura",
        "name": "Piura Arpt",
        "country": "Peru"
    },
    {
        "key": "PIV",
        "city": "Pirapora",
        "name": "Pirapora Airport",
        "country": "Brazil"
    },
    {
        "key": "PIW",
        "city": "Pikwitonei",
        "name": "Pikwitonei Rail Station",
        "country": "Canada"
    },
    {
        "key": "PIX",
        "city": "Pico Island",
        "name": "Pico Arpt",
        "country": "Portugal"
    },
    {
        "key": "PIZ",
        "city": "Point Lay",
        "name": "Dew Station Arpt",
        "country": "United States"
    },
    {
        "key": "PJA",
        "city": "Pajala",
        "name": "Pajala Arpt",
        "country": "Sweden"
    },
    {
        "key": "PJB",
        "city": "Payson",
        "name": "Payson Arpt",
        "country": "United States"
    },
    {
        "key": "PJG",
        "city": "Panjgur",
        "name": "Panjgur Airport",
        "country": "Pakistan"
    },
    {
        "key": "PJM",
        "city": "Puerto Jimenez",
        "name": "Puerto Jimenez ARPT",
        "country": "Costa Rica"
    },
    {
        "key": "PKB",
        "city": "Parkersburg",
        "name": "Wood County",
        "country": "United States"
    },
    {
        "key": "PKC",
        "city": "Petropavlovsk Kamchatskiy",
        "name": "Petropavlovsk Kamchatskiy Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "PKD",
        "city": "Park Rapids",
        "name": "Park Rapids Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "PKE",
        "city": "Parkes",
        "name": "Parkes Arpt",
        "country": "Australia"
    },
    {
        "key": "PKG",
        "city": "Pangkor",
        "name": "Pangkor Arpt",
        "country": "Malaysia"
    },
    {
        "key": "PKH",
        "city": "Portoheli",
        "name": "Alexion Arpt",
        "country": "Greece"
    },
    {
        "key": "PKJ",
        "city": "Playa Grande",
        "name": "Playa Grand Arpt",
        "country": "Guatemala"
    },
    {
        "key": "PKK",
        "city": "Nyaung-U",
        "name": "Pakokku Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "PKM",
        "city": "Port Kaituma",
        "name": "Port Kaituma Airstrip",
        "country": "Guyana"
    },
    {
        "key": "PKN",
        "city": "Pangkalan Bun (Pangkalanbuun), Indonesia",
        "name": "Iskandar Airport",
        "country": "Indonesia"
    },
    {
        "key": "PKP",
        "city": "Puka-Puka, Tuamotus, French Polynesia",
        "name": "Puka Puka Airport",
        "country": "French Polynesia"
    },
    {
        "key": "ADR",
        "city": "Andrews",
        "name": "Robert F. Swinnie Airport",
        "country": "United States"
    },
    {
        "key": "PKR",
        "city": "Pokhara",
        "name": "Pokhara Arpt",
        "country": "Nepal"
    },
    {
        "key": "PKT",
        "city": "Wadeye",
        "name": "Port Keats Airfield",
        "country": "Australia"
    },
    {
        "key": "ADS",
        "city": "Dallas",
        "name": "Addison Arpt",
        "country": "United States"
    },
    {
        "key": "JTI",
        "city": "Jatai",
        "name": "Jatai Airport",
        "country": "Brazil"
    },
    {
        "key": "JTO",
        "city": "Los Angeles",
        "name": "Thousand Oaks Hlpt",
        "country": "United States"
    },
    {
        "key": "JTR",
        "city": "Thira Island",
        "name": "Santorini Arpt",
        "country": "Greece"
    },
    {
        "key": "JTY",
        "city": "Astypalaia Island",
        "name": "Astypalaia Arpt",
        "country": "Greece"
    },
    {
        "key": "JUB",
        "city": "Juba",
        "name": "Juba Arpt",
        "country": "South Sudan"
    },
    {
        "key": "JUH",
        "city": "Chizhou",
        "name": "Jiuhuashan",
        "country": "China"
    },
    {
        "key": "JUI",
        "city": "Juist",
        "name": "Juist Arpt",
        "country": "Germany"
    },
    {
        "key": "JUJ",
        "city": "Jujuy",
        "name": "El Cadillal Airport",
        "country": "Argentina"
    },
    {
        "key": "JUL",
        "city": "Juliaca",
        "name": "Juliaca Arpt",
        "country": "Peru"
    },
    {
        "key": "JUM",
        "city": "Chandannath",
        "name": "Jumla Airport",
        "country": "Nepal"
    },
    {
        "key": "JUN",
        "city": "Jundah",
        "name": "Jundah Airport",
        "country": "Australia"
    },
    {
        "key": "JUO",
        "city": "Jurado",
        "name": "Jurado Arpt",
        "country": "Colombia"
    },
    {
        "key": "JUP",
        "city": "UPLAND",
        "name": "Cable Heliport",
        "country": "United States"
    },
    {
        "key": "JUR",
        "city": "Jurien Bay",
        "name": "Jurien Bay Airport",
        "country": "Australia"
    },
    {
        "key": "JUV",
        "city": "Upernavik",
        "name": "Upernavik Airport",
        "country": "Greenland"
    },
    {
        "key": "JUZ",
        "city": "Juzhou",
        "name": "Juzhou Arpt",
        "country": "China"
    },
    {
        "key": "JVI",
        "city": "Manville, New Jersey, United States",
        "name": "Central Jersey Regional Airport",
        "country": "United States"
    },
    {
        "key": "JVL",
        "city": "Beloit",
        "name": "Rock County Arpt",
        "country": "United States"
    },
    {
        "key": "JWA",
        "city": "Jwaneng",
        "name": "Jwaneng Airport",
        "country": "Botswana"
    },
    {
        "key": "JWC",
        "city": "Los Angeles",
        "name": "Warner Cntr Bus Plaza",
        "country": "United States"
    },
    {
        "key": "JWH",
        "city": "Houston",
        "name": "Westchase Hilton Heliport",
        "country": "United States"
    },
    {
        "key": "JWL",
        "city": "Houston",
        "name": "Woodlawns Airport",
        "country": "United States"
    },
    {
        "key": "JWN",
        "city": "Zanjan",
        "name": "Zanjan Arpt",
        "country": "Iran"
    },
    {
        "key": "JXA",
        "city": "Jixi Shi",
        "name": "Jixi Xingkaihu Airport",
        "country": "China"
    },
    {
        "key": "JXN",
        "city": "Jackson",
        "name": "Jackson Reynolds Municipal",
        "country": "United States"
    },
    {
        "key": "JYR",
        "city": "Jiroft",
        "name": "Jiroft Airport",
        "country": "Iran"
    },
    {
        "key": "JYV",
        "city": "Jyvaskyla",
        "name": "Jyvaskyla Arpt",
        "country": "Finland"
    },
    {
        "key": "JZH",
        "city": "Songpan",
        "name": "Jiu Zhai Huang Long Arpt",
        "country": "China"
    },
    {
        "key": "KAA",
        "city": "Kasama",
        "name": "Kasama Airport",
        "country": "Zambia"
    },
    {
        "key": "KAB",
        "city": "Kariba Dam",
        "name": "Kariba Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "KAC",
        "city": "Qamishli",
        "name": "Kamishly Airport",
        "country": "Syria"
    },
    {
        "key": "KAD",
        "city": "Kaduna",
        "name": "Kaduna Airport",
        "country": "Nigeria"
    },
    {
        "key": "KAE",
        "city": "Kake",
        "name": "Kake Arpt",
        "country": "United States"
    },
    {
        "key": "KAG",
        "city": "Gangneung-si",
        "name": "Gangneung Air Base",
        "country": "South Korea"
    },
    {
        "key": "KAH",
        "city": "Melbourne",
        "name": "City Heliport",
        "country": "Australia"
    },
    {
        "key": "KAI",
        "city": "Kaieteur",
        "name": "Kaieteur Airport",
        "country": "Guyana"
    },
    {
        "key": "KAJ",
        "city": "Kajaani",
        "name": "Kajaani Airport",
        "country": "Finland"
    },
    {
        "key": "KAK",
        "city": "Kar",
        "name": "Kar",
        "country": "Papua New Guinea"
    },
    {
        "key": "KAL",
        "city": "Kaltag",
        "name": "Kaltag",
        "country": "United States"
    },
    {
        "key": "KAM",
        "city": "Kamaran, Yemen",
        "name": "Kamaran Airport",
        "country": "Yemen"
    },
    {
        "key": "KAN",
        "city": "Kano",
        "name": "Aminu Kano Intl Arpt",
        "country": "Nigeria"
    },
    {
        "key": "KAO",
        "city": "Kuusamo",
        "name": "Kuusamo",
        "country": "Finland"
    },
    {
        "key": "KAQ",
        "city": "Kamulai",
        "name": "Kamulai Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KAS",
        "city": "Karasburg",
        "name": "Karasburg Airport",
        "country": "Namibia"
    },
    {
        "key": "KAT",
        "city": "Kaitaia",
        "name": "Kaitaia Arpt",
        "country": "New Zealand"
    },
    {
        "key": "KAU",
        "city": "Kauhava",
        "name": "Kauhava Airfield",
        "country": "Finland"
    },
    {
        "key": "KAW",
        "city": "Kawthaung",
        "name": "Kawthaung",
        "country": "Myanmar"
    },
    {
        "key": "KAX",
        "city": "Kalbarri",
        "name": "Kalbarri",
        "country": "Australia"
    },
    {
        "key": "KAZ",
        "city": "Kuusamo",
        "name": "Kao Airport",
        "country": "Finland"
    },
    {
        "key": "KBA",
        "city": "Faranah",
        "name": "Kabala Airport",
        "country": "Guinea"
    },
    {
        "key": "KBD",
        "city": "Kimberley Downs",
        "name": "Kimberley Downs Airport",
        "country": "Australia"
    },
    {
        "key": "KBG",
        "city": "Kabalega Falls, Uganda",
        "name": "Kabalega Falls Airport",
        "country": "Uganda"
    },
    {
        "key": "KBH",
        "city": "Kalat",
        "name": "Kalat",
        "country": "Pakistan"
    },
    {
        "key": "KBI",
        "city": "Kribi, Cameroon",
        "name": "Kribi Airport",
        "country": "Cameroon"
    },
    {
        "key": "KBJ",
        "city": "Kings Canyon",
        "name": "Kings Canyon Arpt",
        "country": "Australia"
    },
    {
        "key": "KBK",
        "city": "Kushinagar",
        "name": "Kushinagar International Airport",
        "country": "India"
    },
    {
        "key": "KBL",
        "city": "Kabul",
        "name": "Khwaja Rawash Arpt",
        "country": "Afghanistan"
    },
    {
        "key": "KBN",
        "city": "Kabinda",
        "name": "Kabinda",
        "country": "Republic of the Congo"
    },
    {
        "key": "KBP",
        "city": "Kiev",
        "name": "Borispol Arpt",
        "country": "Ukraine"
    },
    {
        "key": "KBQ",
        "city": "Kasungu",
        "name": "Kasungu Airport",
        "country": "Malawi"
    },
    {
        "key": "KBR",
        "city": "Kota Bharu",
        "name": "Pengkalan Chepa",
        "country": "Malaysia"
    },
    {
        "key": "KBS",
        "city": "Bo",
        "name": "Bo Airport",
        "country": "Sierra Leone"
    },
    {
        "key": "KBU",
        "city": "Kotabaru, Indonesia",
        "name": "Gusti Syamsir Alam Airport (Stagen Airport)",
        "country": "Indonesia"
    },
    {
        "key": "KBV",
        "city": "Krabi",
        "name": "Krabi Arpt",
        "country": "Thailand"
    },
    {
        "key": "KBW",
        "city": "Chignik Lagoon",
        "name": "Chignik Bay Arpt",
        "country": "United States"
    },
    {
        "key": "KBX",
        "city": "Ayamaru",
        "name": "Kambuaya Airport",
        "country": "Indonesia"
    },
    {
        "key": "KBZ",
        "city": "Kaikoura",
        "name": "Kaikoura Arpt",
        "country": "New Zealand"
    },
    {
        "key": "KCA",
        "city": "Aksu",
        "name": "Kuqa Qiuci Airport",
        "country": "China"
    },
    {
        "key": "KCC",
        "city": "Coffman Cove",
        "name": "Coffman Cove SPB",
        "country": "United States"
    },
    {
        "key": "KCD",
        "city": "Kamur",
        "name": "Kamur Airport",
        "country": "Indonesia"
    },
    {
        "key": "KCE",
        "city": "Collinsville",
        "name": "Collinsville Arpt",
        "country": "Australia"
    },
    {
        "key": "KCF",
        "city": "Kadanwari, Pakistan",
        "name": "Kadanwari Airport",
        "country": "Pakistan"
    },
    {
        "key": "KCG",
        "city": "Chignik Lagoon",
        "name": "Chignik Fisheries Arpt",
        "country": "United States"
    },
    {
        "key": "KCH",
        "city": "Kuching",
        "name": "Kuching Airport",
        "country": "Malaysia"
    },
    {
        "key": "KCI",
        "city": "KailuaKona",
        "name": "Kon Airport",
        "country": "United States"
    },
    {
        "key": "CUK",
        "city": "Belize City",
        "name": "Caye Caulker Airport",
        "country": "Belize"
    },
    {
        "key": "CUL",
        "city": "Culiacan",
        "name": "Fedl De Bachigualato Arpt",
        "country": "Mexico"
    },
    {
        "key": "CUM",
        "city": "Cumana",
        "name": "Antonio Jose De Sucre",
        "country": "Venezuela"
    },
    {
        "key": "CUN",
        "city": "Cancun",
        "name": "Cancun Aeropuerto Internacional",
        "country": "Mexico"
    },
    {
        "key": "CUP",
        "city": "Carupano",
        "name": "General Jose Francisco BermÃºdez Airport",
        "country": "Venezuela"
    },
    {
        "key": "CUQ",
        "city": "Coen",
        "name": "Coen Arpt",
        "country": "Australia"
    },
    {
        "key": "CUR",
        "city": "Curacao",
        "name": "Areopuerto Hato Arpt",
        "country": "CuraÃ§ao"
    },
    {
        "key": "CUS",
        "city": "Columbus",
        "name": "Columbus Municipal",
        "country": "United States"
    },
    {
        "key": "CUT",
        "city": "Cutral CÃ³",
        "name": "Cutral CÃ³ Airport",
        "country": "Argentina"
    },
    {
        "key": "CUU",
        "city": "Chihuahua",
        "name": "Chihuahua Airport",
        "country": "Mexico"
    },
    {
        "key": "CUW",
        "city": "Cube Cove",
        "name": "Cube Cove Arpt",
        "country": "United States"
    },
    {
        "key": "CUX",
        "city": "Corpus Christi",
        "name": "Cuddihy Field Arpt",
        "country": "United States"
    },
    {
        "key": "CUZ",
        "city": "Cuzco",
        "name": "Tte Velazco Astete Arpt",
        "country": "Peru"
    },
    {
        "key": "CVA",
        "city": "Pittsburgh",
        "name": "Civic Arena Heliport",
        "country": "United States"
    },
    {
        "key": "CVC",
        "city": "Cleve",
        "name": "Cleve Airport",
        "country": "Australia"
    },
    {
        "key": "CVF",
        "city": "Courchevel",
        "name": "Courchevel Arpt",
        "country": "France"
    },
    {
        "key": "CVG",
        "city": "Cincinnati",
        "name": "Cincinnati No Kentucky Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CVJ",
        "city": "Cuernavaca",
        "name": "Cuernavaca Arpt",
        "country": "Mexico"
    },
    {
        "key": "CVM",
        "city": "Ciudad Victoria",
        "name": "Ciudad Victoria Arpt",
        "country": "Mexico"
    },
    {
        "key": "CVN",
        "city": "Clovis",
        "name": "Clovis Airport",
        "country": "United States"
    },
    {
        "key": "CVO",
        "city": "Corvallis",
        "name": "Corvallis Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CVQ",
        "city": "Carnarvon",
        "name": "Carnarvon Arpt",
        "country": "Australia"
    },
    {
        "key": "CVS",
        "city": "Clovis",
        "name": "Cannon Afbarpt",
        "country": "United States"
    },
    {
        "key": "CVT",
        "city": "Coventry",
        "name": "Baginton Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CVU",
        "city": "Corvo Island",
        "name": "Corvo Arpt",
        "country": "Portugal"
    },
    {
        "key": "CWA",
        "city": "Wausau",
        "name": "Central Wisconsin Arpt",
        "country": "United States"
    },
    {
        "key": "CWB",
        "city": "Curitiba",
        "name": "Afonso Pena Arpt",
        "country": "Brazil"
    },
    {
        "key": "CWC",
        "city": "Chernovtsy",
        "name": "Chernovtsy Arpt",
        "country": "Ukraine"
    },
    {
        "key": "CWF",
        "city": "Lake Charles",
        "name": "Chennault International Airport",
        "country": "United States"
    },
    {
        "key": "CWI",
        "city": "Clinton",
        "name": "Clinton Municipal",
        "country": "United States"
    },
    {
        "key": "CWL",
        "city": "Cardiff",
        "name": "Cardiff Wales Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CWO",
        "city": "MINERAL WELLS",
        "name": "Ft Wolter AAF",
        "country": "United States"
    },
    {
        "key": "CWT",
        "city": "Cowra",
        "name": "Cowra Arpt",
        "country": "Australia"
    },
    {
        "key": "CWW",
        "city": "Corowa",
        "name": "COROWA ARPT",
        "country": "Australia"
    },
    {
        "key": "CWX",
        "city": "Cochise County",
        "name": "Cochise County Arpt",
        "country": "United States"
    },
    {
        "key": "CXB",
        "city": "Coxs Bazar",
        "name": "Coxs Bazar",
        "country": "Bangladesh"
    },
    {
        "key": "CXC",
        "city": "Chitina",
        "name": "Chitina Arpt",
        "country": "United States"
    },
    {
        "key": "CXF",
        "city": "Coldfoot",
        "name": "Coldfoot Arpt",
        "country": "United States"
    },
    {
        "key": "CXH",
        "city": "Vancouver",
        "name": "Coal Harbor Sea Plane Arpt",
        "country": "Canada"
    },
    {
        "key": "CXI",
        "city": "Christmas Island",
        "name": "Cassidy",
        "country": "Kiribati"
    },
    {
        "key": "CXJ",
        "city": "Caxias Do Sul",
        "name": "Campo Dos Bugres Arpt",
        "country": "Brazil"
    },
    {
        "key": "CXL",
        "city": "Calexico",
        "name": "Calexico Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CXN",
        "city": "Candala",
        "name": "Candala Airport",
        "country": "Somalia"
    },
    {
        "key": "CXO",
        "city": "Conroe",
        "name": "Montgomery Co Arpt",
        "country": "United States"
    },
    {
        "key": "CXP",
        "city": "Cilacap",
        "name": "Tunggul Wulung Arpt",
        "country": "Indonesia"
    },
    {
        "key": "CXR",
        "city": "Cam Ranh",
        "name": "Cam Ranh Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "CYB",
        "city": "Cayman Brac",
        "name": "Gerrard Smith Arpt",
        "country": "Cayman Islands"
    },
    {
        "key": "CYI",
        "city": "Chiayi",
        "name": "Chia Yi Airport",
        "country": "Taiwan"
    },
    {
        "key": "CYL",
        "city": "Coyoles",
        "name": "Coyoles Airport",
        "country": "Honduras"
    },
    {
        "key": "CYM",
        "city": "Chatham",
        "name": "Chatham SPB",
        "country": "United States"
    },
    {
        "key": "CYO",
        "city": "Cayo Largo Del Sur",
        "name": "Cayo Largo Del Sur Arpt",
        "country": "Cuba"
    },
    {
        "key": "CYP",
        "city": "Calbayog City",
        "name": "Calbayog Airport",
        "country": "Philippines"
    },
    {
        "key": "CYR",
        "city": "Colonia",
        "name": "Colonia Arpt",
        "country": "Uruguay"
    },
    {
        "key": "CYS",
        "city": "Cheyenne",
        "name": "Cheyenne Arpt",
        "country": "United States"
    },
    {
        "key": "CYT",
        "city": "Cape Yakataga",
        "name": "Cape Yakataga Arpt",
        "country": "United States"
    },
    {
        "key": "CYW",
        "city": "Celaya",
        "name": "Captain Rogelio Castillo National Airport",
        "country": "Mexico"
    },
    {
        "key": "CYZ",
        "city": "Cauayan City",
        "name": "Cauayan Airport",
        "country": "Philippines"
    },
    {
        "key": "CZA",
        "city": "Chichen Itza",
        "name": "Chichen Itza Arpt",
        "country": "Mexico"
    },
    {
        "key": "CZC",
        "city": "Copper Center",
        "name": "Copper Center Arpt",
        "country": "United States"
    },
    {
        "key": "CZE",
        "city": "Coro",
        "name": "Coro Arpt",
        "country": "Venezuela"
    },
    {
        "key": "CZL",
        "city": "Constantine",
        "name": "Ain El Bey Arpt",
        "country": "Algeria"
    },
    {
        "key": "CZM",
        "city": "Cozumel",
        "name": "Aeropuerto Intl De Cozumel",
        "country": "Mexico"
    },
    {
        "key": "CZO",
        "city": "Glennallen",
        "name": "Chistochina Airport",
        "country": "United States"
    },
    {
        "key": "CZS",
        "city": "Cruzeiro Do Sul",
        "name": "Campo Intl Arpt",
        "country": "Brazil"
    },
    {
        "key": "CZU",
        "city": "Corozal",
        "name": "Corozal Arpt",
        "country": "Colombia"
    },
    {
        "key": "CZW",
        "city": "Rudnik",
        "name": "Czestochowa Rudniki Airport",
        "country": "Poland"
    },
    {
        "key": "CZX",
        "city": "Changzhou",
        "name": "Changzhou Arpt",
        "country": "China"
    },
    {
        "key": "CZZ",
        "city": "Campo",
        "name": "Campo Arpt",
        "country": "United States"
    },
    {
        "key": "DAA",
        "city": "Fort Belvoir",
        "name": "Davison Army Airfield",
        "country": "United States"
    },
    {
        "key": "DAB",
        "city": "Daytona Beach",
        "name": "Daytona Beach Regional Arpt",
        "country": "United States"
    },
    {
        "key": "DAC",
        "city": "Dhaka",
        "name": "Hazrat Shahjalal Intl Arpt",
        "country": "Bangladesh"
    },
    {
        "key": "DAD",
        "city": "Da Nang",
        "name": "Da Nang Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "LCK",
        "city": "Columbus",
        "name": "Rickenbacker Intl Arpt",
        "country": "United States"
    },
    {
        "key": "LCM",
        "city": "La Cumbre, CÃ³rdoba, Argentina",
        "name": "La Cumbre Airport",
        "country": "Argentina"
    },
    {
        "key": "LCO",
        "city": "Lague",
        "name": "Lague Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "LCR",
        "city": "La Chorrera",
        "name": "La Chorrera Arpt",
        "country": "Colombia"
    },
    {
        "key": "LCV",
        "city": "Lucca",
        "name": "Lucca Arpt",
        "country": "Italy"
    },
    {
        "key": "LCX",
        "city": "Longyan",
        "name": "Longyan Guanzhishan Airport",
        "country": "China"
    },
    {
        "key": "LCY",
        "city": "London",
        "name": "London City Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LDA",
        "city": "Malda",
        "name": "Malda Airport",
        "country": "India"
    },
    {
        "key": "LDB",
        "city": "Londrina",
        "name": "Londrina Arpt",
        "country": "Brazil"
    },
    {
        "key": "LDE",
        "city": "Lourdes",
        "name": "Tarbes Intl Arpt",
        "country": "France"
    },
    {
        "key": "LDH",
        "city": "Lord Howe Island",
        "name": "Lord Howe Island Arpt",
        "country": "Australia"
    },
    {
        "key": "LDI",
        "city": "Lindi Kikwetu Airport",
        "name": "Lindi Airport (Kikwetu Airport)",
        "country": "Tanzania"
    },
    {
        "key": "LDJ",
        "city": "Linden",
        "name": "Linden Municipal",
        "country": "United States"
    },
    {
        "key": "LDK",
        "city": "Lidkoping",
        "name": "Hovby Airport",
        "country": "Sweden"
    },
    {
        "key": "LDM",
        "city": "Ludington",
        "name": "Mason County Airport",
        "country": "United States"
    },
    {
        "key": "LDR",
        "city": "Lawdar, Yemen",
        "name": "Lawdar Airport",
        "country": "Yemen"
    },
    {
        "key": "LDU",
        "city": "Lahad Datu",
        "name": "Lahad Datu Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LDV",
        "city": "Saint-Servais",
        "name": "Landivisiau Air Base",
        "country": "France"
    },
    {
        "key": "LDX",
        "city": "Saint Laurent du Maroni",
        "name": "Saint Laurent du Maroni Arpt",
        "country": "French Guiana"
    },
    {
        "key": "LDY",
        "city": "Londonderry",
        "name": "Eglinton Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LDZ",
        "city": "Londolozi",
        "name": "Londolozi",
        "country": "South Africa"
    },
    {
        "key": "LEA",
        "city": "Learmonth",
        "name": "Learmonth Arpt",
        "country": "Australia"
    },
    {
        "key": "NGE",
        "city": "N Gaoundere",
        "name": "N Gaoundere Arpt",
        "country": "Cameroon"
    },
    {
        "key": "LEB",
        "city": "Lebanon",
        "name": "Lebanon Regional",
        "country": "United States"
    },
    {
        "key": "NGL",
        "city": "Ngala",
        "name": "Ngala Airfield",
        "country": "South Africa"
    },
    {
        "key": "LEC",
        "city": "Lencois",
        "name": "Chapada Diamantina Arpt",
        "country": "Brazil"
    },
    {
        "key": "LED",
        "city": "St Petersburg",
        "name": "Pulkovo Airport",
        "country": "Russian Federation"
    },
    {
        "key": "NGN",
        "city": "NarganÃ¡",
        "name": "NarganÃ¡ Airport",
        "country": "Panama"
    },
    {
        "key": "LEE",
        "city": "Leesburg",
        "name": "Leesburg Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "NGO",
        "city": "Nagoya",
        "name": "Chubu Centrair Intl Arpt",
        "country": "Japan"
    },
    {
        "key": "LEF",
        "city": "Lebakeng",
        "name": "Lebakeng Airport",
        "country": "Lesotho"
    },
    {
        "key": "NGP",
        "city": "Corpus Christi",
        "name": "Corpus Christi Naval Air Station",
        "country": "United States"
    },
    {
        "key": "LEG",
        "city": "Aleg",
        "name": "Aleg Airport",
        "country": "Mauritania"
    },
    {
        "key": "NGQ",
        "city": "Ali Diqu",
        "name": "Ngari Gunsa Airport",
        "country": "China"
    },
    {
        "key": "LEH",
        "city": "Le Havre",
        "name": "Octeville Arpt",
        "country": "France"
    },
    {
        "key": "NGS",
        "city": "Nagasaki",
        "name": "Nagasaki Airport",
        "country": "Japan"
    },
    {
        "key": "LEI",
        "city": "Almeria",
        "name": "Almeria Arpt",
        "country": "Spain"
    },
    {
        "key": "NGU",
        "city": "Norfolk",
        "name": "Naval Air Station Chambers",
        "country": "United States"
    },
    {
        "key": "LEJ",
        "city": "Leipzig",
        "name": "Leipzig Arpt",
        "country": "Germany"
    },
    {
        "key": "LEK",
        "city": "Labe",
        "name": "Tata Airport",
        "country": "Guinea"
    },
    {
        "key": "NGW",
        "city": "Corpus Christi",
        "name": "Cabaniss Field Arpt",
        "country": "United States"
    },
    {
        "key": "LEL",
        "city": "Gapuwiyak",
        "name": "Lake Evella Airport",
        "country": "Australia"
    },
    {
        "key": "NGX",
        "city": "Upper Manang",
        "name": "Manang Airport",
        "country": "Nepal"
    },
    {
        "key": "LEN",
        "city": "Leon",
        "name": "Leon Arpt",
        "country": "Spain"
    },
    {
        "key": "NHA",
        "city": "Nha Trang",
        "name": "Nha Trang Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "LEQ",
        "city": "Lands End",
        "name": "St Just Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "NHD",
        "city": "Dubai",
        "name": "Al Minhad Air Base",
        "country": "United Arab Emirates"
    },
    {
        "key": "LER",
        "city": "Leinster",
        "name": "Leinster Arpt",
        "country": "Australia"
    },
    {
        "key": "LES",
        "city": "Lesobeng",
        "name": "Lesobeng Arpt",
        "country": "Lesotho"
    },
    {
        "key": "NHK",
        "city": "Patuxent River",
        "name": "NAS Patuxent River (Trapnell Field)",
        "country": "United States"
    },
    {
        "key": "LET",
        "city": "Leticia",
        "name": "General A V Cobo Arpt",
        "country": "Colombia"
    },
    {
        "key": "NHT",
        "city": "Northolt",
        "name": "Northolt",
        "country": "United Kingdom"
    },
    {
        "key": "LEU",
        "city": "Montferrer",
        "name": "La Seu d Urgell Airport",
        "country": "Spain"
    },
    {
        "key": "LEV",
        "city": "Levuka, Ovalau Island, Fiji",
        "name": "Levuka Airfield (Bureta Airport)",
        "country": "Fiji"
    },
    {
        "key": "NHZ",
        "city": "Brunswick",
        "name": "Naval Air Station",
        "country": "United States"
    },
    {
        "key": "LEW",
        "city": "Lewiston",
        "name": "Auburn Lewiston Arpt",
        "country": "United States"
    },
    {
        "key": "NIB",
        "city": "Nikolai",
        "name": "Nikolai Airport",
        "country": "United States"
    },
    {
        "key": "LEX",
        "city": "Lexington",
        "name": "Blue Grass Field",
        "country": "United States"
    },
    {
        "key": "MDH",
        "city": "Carbondale",
        "name": "Southern Illinois Arpt",
        "country": "United States"
    },
    {
        "key": "LEY",
        "city": "Lelystad",
        "name": "Lelystad Arpt",
        "country": "Netherlands"
    },
    {
        "key": "NIG",
        "city": "Nikunau, Kiribati",
        "name": "Nikunau Airport",
        "country": "Kiribati"
    },
    {
        "key": "MDI",
        "city": "Makurdi",
        "name": "Makurdi Arpt",
        "country": "Nigeria"
    },
    {
        "key": "LFB",
        "city": "Lumbo",
        "name": "Lumbo Airport",
        "country": "Mozambique"
    },
    {
        "key": "MDJ",
        "city": "Madras",
        "name": "City county",
        "country": "United States"
    },
    {
        "key": "NIM",
        "city": "Niamey",
        "name": "Niamey Airport",
        "country": "Niger"
    },
    {
        "key": "LFI",
        "city": "Hampton",
        "name": "Langley Air force Base",
        "country": "United States"
    },
    {
        "key": "NIN",
        "city": "Ninilchik",
        "name": "Ninilchik Arpt",
        "country": "United States"
    },
    {
        "key": "MDL",
        "city": "Mandalay",
        "name": "Annisaton Arpt",
        "country": "Myanmar"
    },
    {
        "key": "LFK",
        "city": "Lufkin",
        "name": "Angelina Cty Arpt",
        "country": "United States"
    },
    {
        "key": "NIP",
        "city": "Jacksonville",
        "name": "Jacksonville Nas",
        "country": "United States"
    },
    {
        "key": "MDN",
        "city": "Madison",
        "name": "Madison Municipal Airport",
        "country": "United States"
    },
    {
        "key": "LFR",
        "city": "La Fria",
        "name": "La Fria Airport",
        "country": "Venezuela"
    },
    {
        "key": "KCK",
        "city": "Kirensk, Irkutsk Oblast, Russia",
        "name": "Kirensk Airport",
        "country": "Russia"
    },
    {
        "key": "KCL",
        "city": "Chignik Lagoon",
        "name": "Chignik Lagoon Arpt",
        "country": "United States"
    },
    {
        "key": "KCM",
        "city": "Kahramanmaras",
        "name": "Kahramanmaras aRPT",
        "country": "Turkey"
    },
    {
        "key": "KCN",
        "city": "Chernofski",
        "name": "Sp Base",
        "country": "United States"
    },
    {
        "key": "KCO",
        "city": "Ä°zmit, Turkey",
        "name": "Cengiz Topel Naval Air Station",
        "country": "Turkey"
    },
    {
        "key": "KCQ",
        "city": "Chignik Lagoon",
        "name": "Chignik Airport",
        "country": "United States"
    },
    {
        "key": "KCS",
        "city": "Petermann",
        "name": "Kings Creek Station Airport",
        "country": "Australia"
    },
    {
        "key": "KCT",
        "city": "Koggala",
        "name": "Koggala Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "KCZ",
        "city": "Kochi",
        "name": "Kochi Airport",
        "country": "Japan"
    },
    {
        "key": "KDA",
        "city": "Kolda",
        "name": "Kolda North Airport",
        "country": "Senegal"
    },
    {
        "key": "KDB",
        "city": "Kambalda West",
        "name": "Kambalda Airport",
        "country": "Australia"
    },
    {
        "key": "KDC",
        "city": "Kandi",
        "name": "Kandi Airport",
        "country": "Benin"
    },
    {
        "key": "KDD",
        "city": "Khuzdar",
        "name": "Khuzdar Airport",
        "country": "Pakistan"
    },
    {
        "key": "KDE",
        "city": "Koroba",
        "name": "Koroba Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KDH",
        "city": "Kandahar, Afghanistan",
        "name": "Kandahar International Airport",
        "country": "Afghanistan"
    },
    {
        "key": "KDI",
        "city": "Kendari",
        "name": "Wolter Monginsidi Airport",
        "country": "Indonesia"
    },
    {
        "key": "KDK",
        "city": "Kodiak",
        "name": "Kodiak Municipal",
        "country": "United States"
    },
    {
        "key": "KDL",
        "city": "Kardla",
        "name": "Kardla",
        "country": "Estonia"
    },
    {
        "key": "DAG",
        "city": "Daggett",
        "name": "Barstow Daggett Airport",
        "country": "United States"
    },
    {
        "key": "KDM",
        "city": "Male",
        "name": "Kaadedhdhoo",
        "country": "Maldives"
    },
    {
        "key": "DAK",
        "city": "Dakhla Oasis",
        "name": "Dakhla Arpt",
        "country": "Egypt"
    },
    {
        "key": "DAL",
        "city": "Dallas",
        "name": "Love Field",
        "country": "United States"
    },
    {
        "key": "KDO",
        "city": "Kadhdhoo Island, Laamu Atoll, Maldives",
        "name": "Kadhdhoo Airport",
        "country": "Maldives"
    },
    {
        "key": "DAM",
        "city": "Damascus",
        "name": "Damascus Intl",
        "country": "Syrian Arab Republic"
    },
    {
        "key": "KDP",
        "city": "Kandep",
        "name": "Kandep",
        "country": "Papua New Guinea"
    },
    {
        "key": "KDR",
        "city": "Kandrian, Papua New Guinea",
        "name": "Kandrian Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "DAN",
        "city": "Danville",
        "name": "Danville Municipal",
        "country": "United States"
    },
    {
        "key": "DAO",
        "city": "Dabo, Papua New Guinea",
        "name": "Dabo Airport",
        "country": "Indonesia"
    },
    {
        "key": "KDT",
        "city": "Kra Tip",
        "name": "Kamphaeng Saen Airport",
        "country": "Thailand"
    },
    {
        "key": "DAP",
        "city": "Darchula",
        "name": "Darchula",
        "country": "Nepal"
    },
    {
        "key": "KDU",
        "city": "Skardu",
        "name": "Skardu Airport",
        "country": "Pakistan"
    },
    {
        "key": "DAR",
        "city": "Dar Es Salaam",
        "name": "Es Salaam Intl",
        "country": "Tanzania"
    },
    {
        "key": "KDV",
        "city": "Kandavu",
        "name": "Kandavu",
        "country": "Fiji"
    },
    {
        "key": "DAT",
        "city": "Datong",
        "name": "Datong Arpt",
        "country": "China"
    },
    {
        "key": "KDX",
        "city": "Kaduqli",
        "name": "Kadugli Airport",
        "country": "Sudan"
    },
    {
        "key": "DAU",
        "city": "Daru",
        "name": "Daru Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KDZ",
        "city": "Kandy",
        "name": "Polgolla Reservoir Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "DAV",
        "city": "David",
        "name": "Enrique Malek Arpt",
        "country": "Panama"
    },
    {
        "key": "KEB",
        "city": "English Bay",
        "name": "Nanwalek Arpt",
        "country": "United States"
    },
    {
        "key": "DAX",
        "city": "Dazhou",
        "name": "Heshi",
        "country": "China"
    },
    {
        "key": "KEC",
        "city": "Kasenga",
        "name": "Kasenga Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "KED",
        "city": "KaÃ©di",
        "name": "KaÃ©di Airport",
        "country": "Mauritania"
    },
    {
        "key": "DAY",
        "city": "Dayton",
        "name": "Dayton International Airport",
        "country": "United States"
    },
    {
        "key": "DBA",
        "city": "Panjgur",
        "name": "Dalbandin Airport",
        "country": "Pakistan"
    },
    {
        "key": "KEE",
        "city": "Kelle",
        "name": "Kelle Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "DBB",
        "city": "El Alamein, Egypt",
        "name": "Al Alamain International Airport",
        "country": "Egypt"
    },
    {
        "key": "KEF",
        "city": "Reykjavik",
        "name": "Reykjavik Keflavik Intl Arpt",
        "country": "Iceland"
    },
    {
        "key": "DBD",
        "city": "Dhanbad",
        "name": "Dhanbad",
        "country": "India"
    },
    {
        "key": "KEH",
        "city": "Seattle",
        "name": "Kenmore Air Harbor",
        "country": "United States"
    },
    {
        "key": "DBM",
        "city": "Bahir Dar",
        "name": "Debre Marqos Airport",
        "country": "Ethiopia"
    },
    {
        "key": "KEJ",
        "city": "Kemerovo",
        "name": "Kemerovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "DBN",
        "city": "Dublin",
        "name": "Dublin Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "KEL",
        "city": "Kiel",
        "name": "Holtenau Arpt",
        "country": "Germany"
    },
    {
        "key": "DBO",
        "city": "Dubbo",
        "name": "Dubbo Arpt",
        "country": "Australia"
    },
    {
        "key": "KEM",
        "city": "Kemi",
        "name": "Kemi Tornio Arpt",
        "country": "Finland"
    },
    {
        "key": "DBP",
        "city": "Debepare, Papua New Guinea",
        "name": "Debepare Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KEN",
        "city": "Kenema",
        "name": "Kenema Airport",
        "country": "Sierra Leone"
    },
    {
        "key": "DBQ",
        "city": "Dubuque",
        "name": "Dubuque Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "KEO",
        "city": "Odienne",
        "name": "Odienne Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "DBS",
        "city": "Dubois",
        "name": "Dubois Municipal Airport (FAA: U41)",
        "country": "United States"
    },
    {
        "key": "KEP",
        "city": "Manikapur",
        "name": "Nepalgunj Airport",
        "country": "Nepal"
    },
    {
        "key": "BIF",
        "city": "El Paso",
        "name": "Biggs Army Air Field",
        "country": "United States"
    },
    {
        "key": "DBT",
        "city": "Debre Tabor",
        "name": "Debre Tabor Airport",
        "country": "Ethiopia"
    },
    {
        "key": "KEQ",
        "city": "Kebar",
        "name": "Kebar Airport",
        "country": "Indonesia"
    },
    {
        "key": "BIG",
        "city": "Big Delta",
        "name": "Big Delta Arpt",
        "country": "United States"
    },
    {
        "key": "DBU",
        "city": "Dambulla",
        "name": "Dambulu Oya Tank Seaplane Base",
        "country": "Sri Lanka"
    },
    {
        "key": "BIH",
        "city": "Bishop",
        "name": "Bishop Airport",
        "country": "United States"
    },
    {
        "key": "KER",
        "city": "Kerman",
        "name": "Kerman Arpt",
        "country": "Iran"
    },
    {
        "key": "BII",
        "city": "Bikini Atoll",
        "name": "Enyu Airfield",
        "country": "Marshall Islands"
    },
    {
        "key": "DBV",
        "city": "Dubrovnik",
        "name": "Dubrovnik Arpt",
        "country": "Croatia"
    },
    {
        "key": "KET",
        "city": "Keng Tung",
        "name": "Kengtung Airport",
        "country": "Myanmar"
    },
    {
        "key": "BIK",
        "city": "Biak",
        "name": "Mokmer Arpt",
        "country": "Indonesia"
    },
    {
        "key": "GRK",
        "city": "Killeen",
        "name": "Gray AAF",
        "country": "United States"
    },
    {
        "key": "GRN",
        "city": "Gordon",
        "name": "Gordon Municipal Airport",
        "country": "United States"
    },
    {
        "key": "GRO",
        "city": "Gerona",
        "name": "Costa Brava Arpt",
        "country": "Spain"
    },
    {
        "key": "GRP",
        "city": "Gurupi",
        "name": "Gurupi",
        "country": "Brazil"
    },
    {
        "key": "GRQ",
        "city": "Groningen",
        "name": "Eelde Arpt",
        "country": "Netherlands"
    },
    {
        "key": "GRR",
        "city": "Grand Rapids",
        "name": "Gerald R Ford Intl Airport",
        "country": "United States"
    },
    {
        "key": "GRS",
        "city": "Grosseto",
        "name": "Baccarini Arpt",
        "country": "Italy"
    },
    {
        "key": "PKU",
        "city": "Pekanbaru",
        "name": "Simpang Tiga Arpt",
        "country": "Indonesia"
    },
    {
        "key": "GRT",
        "city": "Gujrat",
        "name": "Gujrat",
        "country": "Pakistan"
    },
    {
        "key": "PKV",
        "city": "Pskov",
        "name": "Pskov Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "GRU",
        "city": "Sao Paulo",
        "name": "Guarulhos Arpt",
        "country": "Brazil"
    },
    {
        "key": "PKW",
        "city": "Selebi Phikwe",
        "name": "Selebi Phikwe Arpt",
        "country": "Botswana"
    },
    {
        "key": "GRV",
        "city": "GROZNY",
        "name": "GROZNY ARPT",
        "country": "Russian Federation"
    },
    {
        "key": "PKY",
        "city": "Palangkaraya",
        "name": "Tjilik Riwut",
        "country": "Indonesia"
    },
    {
        "key": "GRW",
        "city": "Graciosa Island",
        "name": "Graciosa Arpt",
        "country": "Portugal"
    },
    {
        "key": "PKZ",
        "city": "Pakse",
        "name": "Pakse Arpt",
        "country": "Lao Peoples Democratic Republic"
    },
    {
        "key": "PLC",
        "city": "Planeta Rica",
        "name": "Planeta Rica",
        "country": "Colombia"
    },
    {
        "key": "GRX",
        "city": "Granada",
        "name": "Granada Arpt",
        "country": "Spain"
    },
    {
        "key": "PLE",
        "city": "Paiela",
        "name": "Paiela Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "PLF",
        "city": "Pala",
        "name": "Pala Airport",
        "country": "Chad"
    },
    {
        "key": "GRY",
        "city": "GrÃ­msey, Iceland",
        "name": "GrÃ­msey Airport",
        "country": "Iceland"
    },
    {
        "key": "PLI",
        "city": "Palm Island",
        "name": "Palm Island Airport",
        "country": "Australia"
    },
    {
        "key": "PLJ",
        "city": "Placencia",
        "name": "Placencia Arpt",
        "country": "Belize"
    },
    {
        "key": "GRZ",
        "city": "Graz",
        "name": "Thalerhof Arpt",
        "country": "Austria"
    },
    {
        "key": "PLK",
        "city": "Point Lookout",
        "name": "M Graham Clark Arpt",
        "country": "United States"
    },
    {
        "key": "GSB",
        "city": "Goldsboro",
        "name": "Seymour Johnson AFB",
        "country": "United States"
    },
    {
        "key": "PLL",
        "city": "Manaus",
        "name": "Manaus Air Force Base",
        "country": "Brazil"
    },
    {
        "key": "PLM",
        "city": "Palembang",
        "name": "Mahmud Badaruddin Li Arpt",
        "country": "Indonesia"
    },
    {
        "key": "GSC",
        "city": "Gascoyne Junction",
        "name": "Gascoyne Junction",
        "country": "Australia"
    },
    {
        "key": "PLN",
        "city": "Pellston",
        "name": "Emmet Cty Arpt",
        "country": "United States"
    },
    {
        "key": "PLO",
        "city": "Port Lincoln",
        "name": "Port Lincoln Arpt",
        "country": "Australia"
    },
    {
        "key": "GSE",
        "city": "Gothenburg",
        "name": "Saeve Arpt",
        "country": "Sweden"
    },
    {
        "key": "PLP",
        "city": "La Palma",
        "name": "Captain Ramon Xatruch Airport",
        "country": "Panama"
    },
    {
        "key": "GSH",
        "city": "Goshen",
        "name": "Goshen Municipal Airport",
        "country": "United States"
    },
    {
        "key": "PLQ",
        "city": "Palanga",
        "name": "Palanga Intl Arpt",
        "country": "Lithuania"
    },
    {
        "key": "PLR",
        "city": "Pell City",
        "name": "Saint Clair County",
        "country": "United States"
    },
    {
        "key": "GSJ",
        "city": "San Jose",
        "name": "San JosÃ© Airport[2]",
        "country": "United States"
    },
    {
        "key": "PLS",
        "city": "Providenciales",
        "name": "Providenciales Intl",
        "country": "Turks and Caicos Islands"
    },
    {
        "key": "PLU",
        "city": "Belo Horizonte",
        "name": "Pampulha Arpt",
        "country": "Brazil"
    },
    {
        "key": "GSM",
        "city": "Qeshm, Iran",
        "name": "Dayrestan Airport (Qeshm International Airport)",
        "country": "Iran"
    },
    {
        "key": "PLV",
        "city": "Poltava",
        "name": "Poltava Arpt",
        "country": "Ukraine"
    },
    {
        "key": "GSO",
        "city": "Greensboro",
        "name": "Piedmont Triad Intl",
        "country": "United States"
    },
    {
        "key": "PLW",
        "city": "Palu",
        "name": "Mutiara Arpt",
        "country": "Indonesia"
    },
    {
        "key": "PLX",
        "city": "Semey",
        "name": "SEMIPALATINSK ARPT",
        "country": "Kazakhstan"
    },
    {
        "key": "GSP",
        "city": "Greenville",
        "name": "Greenville Spartanburg Arpt",
        "country": "United States"
    },
    {
        "key": "PLY",
        "city": "Plymouth",
        "name": "Plymouth Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "PLZ",
        "city": "Port Elizabeth",
        "name": "Port Elizabeth Airport",
        "country": "South Africa"
    },
    {
        "key": "GSR",
        "city": "Qardho, Somalia",
        "name": "Qardho Airport",
        "country": "Somalia"
    },
    {
        "key": "PMA",
        "city": "Pemba",
        "name": "Pemba Airport",
        "country": "Mozambique"
    },
    {
        "key": "GSS",
        "city": "Kruger Park",
        "name": "Sabi Sabi Airport",
        "country": "South Africa"
    },
    {
        "key": "PMC",
        "city": "Puerto Montt",
        "name": "Tepual Arpt",
        "country": "Chile"
    },
    {
        "key": "GST",
        "city": "Glacier Bay",
        "name": "Gustavus Arpt",
        "country": "United States"
    },
    {
        "key": "PMD",
        "city": "Palmdale",
        "name": "La Palmdale Regional Arpt",
        "country": "United States"
    },
    {
        "key": "DBY",
        "city": "Dalby",
        "name": "Dalby",
        "country": "Australia"
    },
    {
        "key": "PME",
        "city": "Portsmouth",
        "name": "Portsmouth Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "MDO",
        "city": "Middleton Island",
        "name": "Interm",
        "country": "United States"
    },
    {
        "key": "GTA",
        "city": "Gatokae",
        "name": "Gatokae Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "DCA",
        "city": "Washington",
        "name": "Ronald Reagan National Arpt",
        "country": "United States"
    },
    {
        "key": "BIL",
        "city": "Billings",
        "name": "Logan Field",
        "country": "United States"
    },
    {
        "key": "PMF",
        "city": "Parma",
        "name": "Parma Arpt",
        "country": "Italy"
    },
    {
        "key": "MDP",
        "city": "Mindiptana, Indonesia",
        "name": "Mindiptana Airport",
        "country": "Indonesia"
    },
    {
        "key": "DCF",
        "city": "Dominica",
        "name": "Canefield Arpt",
        "country": "Dominica"
    },
    {
        "key": "BIM",
        "city": "Bimini",
        "name": "Bimini Airport",
        "country": "Bahamas"
    },
    {
        "key": "PMG",
        "city": "Ponta Pora",
        "name": "International",
        "country": "Brazil"
    },
    {
        "key": "GTE",
        "city": "Groote Eylandt",
        "name": "Alyangula Arpt",
        "country": "Australia"
    },
    {
        "key": "BIN",
        "city": "Bamyan",
        "name": "Bamyan Airport",
        "country": "Afghanistan"
    },
    {
        "key": "DCG",
        "city": "Dubai",
        "name": "Dubai Creek Seaplane Base",
        "country": "United Arab Emirates"
    },
    {
        "key": "PMH",
        "city": "Huntington",
        "name": "Portsmith Regional",
        "country": "United States"
    },
    {
        "key": "MDQ",
        "city": "Mar Del Plata",
        "name": "Mar Del Plata Arpt",
        "country": "Argentina"
    },
    {
        "key": "DCK",
        "city": "Kobuk",
        "name": "Dahl Creek Airport",
        "country": "United States"
    },
    {
        "key": "PMI",
        "city": "Palma Mallorca",
        "name": "Palma Mallorca Arpt",
        "country": "Spain"
    },
    {
        "key": "BIO",
        "city": "Bilbao",
        "name": "Bilbao Arpt",
        "country": "Spain"
    },
    {
        "key": "EDI",
        "city": "Edinburgh",
        "name": "Edinburgh Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "EDL",
        "city": "Eldoret",
        "name": "Eldoret Arpt",
        "country": "Kenya"
    },
    {
        "key": "EDM",
        "city": "La Roche",
        "name": "Les Ajoncs Arpt",
        "country": "France"
    },
    {
        "key": "EDO",
        "city": "Edremit",
        "name": "Edremit Korfez",
        "country": "Turkey"
    },
    {
        "key": "EDR",
        "city": "Edward River",
        "name": "Edward River Arpt",
        "country": "Australia"
    },
    {
        "key": "ADT",
        "city": "Ada OK",
        "name": "Ada Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "EED",
        "city": "Needles",
        "name": "Needles Arpt",
        "country": "United States"
    },
    {
        "key": "ADU",
        "city": "Ardabil",
        "name": "Ardabil Arpt",
        "country": "Iran"
    },
    {
        "key": "ADW",
        "city": "Camp Springs",
        "name": "Andrews Air Force Base",
        "country": "United States"
    },
    {
        "key": "EEK",
        "city": "Eek City",
        "name": "Eek Arpt",
        "country": "United States"
    },
    {
        "key": "ADX",
        "city": "St Andrews",
        "name": "Leuchars Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "EEN",
        "city": "Keene",
        "name": "Dilliant Hopkins Arpt",
        "country": "United States"
    },
    {
        "key": "ADY",
        "city": "Alldays, South Africa",
        "name": "Alldays Airport",
        "country": "Botswana"
    },
    {
        "key": "EFD",
        "city": "Houston",
        "name": "Ellington Field",
        "country": "United States"
    },
    {
        "key": "ADZ",
        "city": "San Andres",
        "name": "San Andres Island Arpt",
        "country": "Colombia"
    },
    {
        "key": "EFG",
        "city": "Efogi",
        "name": "EFOGI AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "AEB",
        "city": "Baise Shi",
        "name": "Baise Bama Airport",
        "country": "China"
    },
    {
        "key": "EFK",
        "city": "Middletown",
        "name": "Newport State Airport",
        "country": "United States"
    },
    {
        "key": "AED",
        "city": "Aleneva",
        "name": "Aleneva Arpt",
        "country": "United States"
    },
    {
        "key": "EFL",
        "city": "Kefalonia",
        "name": "Argostoli Arpt",
        "country": "Greece"
    },
    {
        "key": "AEG",
        "city": "Padang Sidempuan, Indonesia",
        "name": "Aek Godang Airport",
        "country": "Indonesia"
    },
    {
        "key": "EFW",
        "city": "Jefferson",
        "name": "Jefferson Municipal Airport",
        "country": "United States"
    },
    {
        "key": "AEH",
        "city": "Abecher",
        "name": "Abecher Airport",
        "country": "Chad"
    },
    {
        "key": "EGC",
        "city": "Bergerac",
        "name": "Roumaniere Arpt",
        "country": "France"
    },
    {
        "key": "AEI",
        "city": "Algeciras",
        "name": "Algeciras Arpt",
        "country": "Spain"
    },
    {
        "key": "EGE",
        "city": "Eagle",
        "name": "Eagle County Arpt",
        "country": "United States"
    },
    {
        "key": "AEL",
        "city": "Albert Lea",
        "name": "Albert Lea Arpt",
        "country": "United States"
    },
    {
        "key": "EGI",
        "city": "Valparaiso",
        "name": "Duke Field",
        "country": "United States"
    },
    {
        "key": "AEO",
        "city": "Aioun el Atrouss, Mauritania",
        "name": "Aioun el Atrouss Airport",
        "country": "Mauritania"
    },
    {
        "key": "EGM",
        "city": "Sege",
        "name": "Sege Arpt",
        "country": "Solomon Islands"
    },
    {
        "key": "AEP",
        "city": "Buenos Aires",
        "name": "Jorge Newbery",
        "country": "Argentina"
    },
    {
        "key": "EGN",
        "city": "Al Junaynah",
        "name": "Geneina Airport",
        "country": "Sudan"
    },
    {
        "key": "AER",
        "city": "Sochi",
        "name": "Sochi Intl Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "AES",
        "city": "Aalesund",
        "name": "Vigra Airport",
        "country": "Norway"
    },
    {
        "key": "EGO",
        "city": "Belgorod",
        "name": "Belgorod Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "AET",
        "city": "Allakaket",
        "name": "Allakaket Airport (FAA: 6A8)",
        "country": "United States"
    },
    {
        "key": "EGP",
        "city": "Eagle Pass",
        "name": "Maverick County Arpt",
        "country": "United States"
    },
    {
        "key": "AEU",
        "city": "Abu Musa",
        "name": "Abu Musa Airport",
        "country": "Iran"
    },
    {
        "key": "EGS",
        "city": "Egilsstadir",
        "name": "Egilsstadir Arpt",
        "country": "Iceland"
    },
    {
        "key": "AEX",
        "city": "Alexandria",
        "name": "Alexandria Intl Arpt",
        "country": "United States"
    },
    {
        "key": "EGV",
        "city": "Eagle River",
        "name": "Eagle River Union Arpt",
        "country": "United States"
    },
    {
        "key": "KEY",
        "city": "Kericho",
        "name": "Kericho Airport",
        "country": "Kenya"
    },
    {
        "key": "AEY",
        "city": "Akureyri",
        "name": "Akureyri",
        "country": "Iceland"
    },
    {
        "key": "LFT",
        "city": "Lafayette",
        "name": "Lafayette Municipal",
        "country": "United States"
    },
    {
        "key": "KEZ",
        "city": "Kelaniya",
        "name": "Kelaniya River",
        "country": "Sri Lanka"
    },
    {
        "key": "NIT",
        "city": "Niort",
        "name": "Souche Airport",
        "country": "France"
    },
    {
        "key": "EHL",
        "city": "El Bolson",
        "name": "El Bolson Arpt",
        "country": "Argentina"
    },
    {
        "key": "AFA",
        "city": "San Rafael",
        "name": "San Rafael Arpt",
        "country": "Argentina"
    },
    {
        "key": "KFA",
        "city": "Kiffa",
        "name": "Kiffa Airport",
        "country": "Mauritania"
    },
    {
        "key": "LFW",
        "city": "Lome",
        "name": "Lome Airport",
        "country": "Togo"
    },
    {
        "key": "EHT",
        "city": "East Hartford",
        "name": "Rentschler Arpt",
        "country": "United States"
    },
    {
        "key": "KFG",
        "city": "Kalkurung",
        "name": "Kalkurung Airport",
        "country": "Australia"
    },
    {
        "key": "LGA",
        "city": "New York",
        "name": "La Guardia",
        "country": "United States"
    },
    {
        "key": "NJA",
        "city": "Atsugi",
        "name": "Atsugi Naval Air Station",
        "country": "Japan"
    },
    {
        "key": "EIB",
        "city": "Eisenach",
        "name": "Eisenach Arpt",
        "country": "Germany"
    },
    {
        "key": "LGB",
        "city": "Long Beach",
        "name": "Long Beach Municipal",
        "country": "United States"
    },
    {
        "key": "AFF",
        "city": "Colorado Springs",
        "name": "USAF Academy",
        "country": "United States"
    },
    {
        "key": "KGA",
        "city": "Kananga",
        "name": "Kananga Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "GTF",
        "city": "Great Falls",
        "name": "Great Falls Intl Arpt",
        "country": "United States"
    },
    {
        "key": "NJC",
        "city": "Nizhnevartovsk",
        "name": "Nizhnevartovsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "MDS",
        "city": "Conch Bar",
        "name": "Middle Caicos Airport",
        "country": "Turks and Caicos Islands"
    },
    {
        "key": "AFI",
        "city": "Amalfi, Colombia",
        "name": "Amalfi Airport",
        "country": "Italy"
    },
    {
        "key": "PMK",
        "city": "Palm Island",
        "name": "Palm Island Arpt",
        "country": "Australia"
    },
    {
        "key": "LGC",
        "city": "La Grange",
        "name": "Calloway Arpt",
        "country": "United States"
    },
    {
        "key": "GTI",
        "city": "Guettin",
        "name": "Guettin Arpt",
        "country": "Germany"
    },
    {
        "key": "KGB",
        "city": "Konge",
        "name": "Konge Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BIP",
        "city": "Brisbane Airport",
        "name": "Bulimba Airport",
        "country": "Australia"
    },
    {
        "key": "MDT",
        "city": "Harrisburg",
        "name": "Harrisburg Intl",
        "country": "United States"
    },
    {
        "key": "EIL",
        "city": "Fairbanks",
        "name": "Eielson AFB Arpt",
        "country": "United States"
    },
    {
        "key": "NJF",
        "city": "Al Najaf",
        "name": "Najaf International Arpt",
        "country": "Iraq"
    },
    {
        "key": "LGD",
        "city": "La Grande",
        "name": "La Grande Union County Arpt",
        "country": "United States"
    },
    {
        "key": "KGC",
        "city": "Kingscote",
        "name": "Kingscote Arpt",
        "country": "Australia"
    },
    {
        "key": "CHV",
        "city": "Chaves",
        "name": "Chaves Arpt",
        "country": "Portugal"
    },
    {
        "key": "CHW",
        "city": "Jiuquan",
        "name": "Jiuquan Arpt",
        "country": "China"
    },
    {
        "key": "CHX",
        "city": "Changuinola",
        "name": "Changuinola Arpt",
        "country": "Panama"
    },
    {
        "key": "CHY",
        "city": "Choiseul Bay, Taro Island, Solomon Islands",
        "name": "Choiseul Bay Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "CIA",
        "city": "Rome",
        "name": "Ciampino Arpt",
        "country": "Italy"
    },
    {
        "key": "CIC",
        "city": "Chico",
        "name": "Chico Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CID",
        "city": "Cedar Rapids",
        "name": "Cedar Rapids Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CIG",
        "city": "Craig",
        "name": "Craig Moffat",
        "country": "United States"
    },
    {
        "key": "CIH",
        "city": "Changzhi Shi",
        "name": "Changzhi Wangcun Airport",
        "country": "China"
    },
    {
        "key": "CIJ",
        "city": "Cobija",
        "name": "Captain Anibal Arab Airport",
        "country": "Bolivia"
    },
    {
        "key": "CIK",
        "city": "Chalkyitsik",
        "name": "Chalkyitsik Airport",
        "country": "United States"
    },
    {
        "key": "CIL",
        "city": "Council",
        "name": "Melsing Creek Arpt",
        "country": "United States"
    },
    {
        "key": "CIM",
        "city": "Cimitarra",
        "name": "Cimitarra",
        "country": "Colombia"
    },
    {
        "key": "CIN",
        "city": "Carroll",
        "name": "Arthur N. Neu Airport",
        "country": "United States"
    },
    {
        "key": "CIO",
        "city": "Concepcion",
        "name": "Mcal Lopez Arpt",
        "country": "Paraguay"
    },
    {
        "key": "CIP",
        "city": "Chipata, Zambia",
        "name": "Chipata Airport",
        "country": "Zambia"
    },
    {
        "key": "CIR",
        "city": "Cairo",
        "name": "Cairo",
        "country": "United States"
    },
    {
        "key": "CIS",
        "city": "Canton Island",
        "name": "Canton Island Airport",
        "country": "Kiribati"
    },
    {
        "key": "CIT",
        "city": "Shimkent",
        "name": "Shimkent Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "CIU",
        "city": "Sault Ste Marie",
        "name": "Chippewa Cnty Intl",
        "country": "United States"
    },
    {
        "key": "CIW",
        "city": "Canovan Island",
        "name": "Canouan Island Minicipal",
        "country": "Dominica"
    },
    {
        "key": "CIX",
        "city": "Chiclayo",
        "name": "Cornel Ruiz Arpt",
        "country": "Peru"
    },
    {
        "key": "CIY",
        "city": "Comiso",
        "name": "Comiso Arpt",
        "country": "Italy"
    },
    {
        "key": "CJA",
        "city": "Cajamarca",
        "name": "Cajamarca Airport",
        "country": "Peru"
    },
    {
        "key": "CJB",
        "city": "Coimbatore",
        "name": "Peelamedu Airport",
        "country": "India"
    },
    {
        "key": "CJC",
        "city": "Calama",
        "name": "El Loa Arpt",
        "country": "Chile"
    },
    {
        "key": "CJD",
        "city": "Candilejas",
        "name": "Candilejas Airport",
        "country": "Colombia"
    },
    {
        "key": "CJH",
        "city": "Chilko Lake, British Columbia, Canada",
        "name": "Chilko Lake (Tsylos Park Lodge) Aerodrome (TC: CAG3)",
        "country": "Canada"
    },
    {
        "key": "CJJ",
        "city": "Cheongju",
        "name": "Cheongju Arpt",
        "country": "Korea"
    },
    {
        "key": "CJL",
        "city": "Chitral",
        "name": "Chitral Airport",
        "country": "Pakistan"
    },
    {
        "key": "CJM",
        "city": "Chumphon",
        "name": "Chumphon Arpt",
        "country": "Thailand"
    },
    {
        "key": "CJN",
        "city": "El Cajon",
        "name": "El Cajon Arpt",
        "country": "United States"
    },
    {
        "key": "CJS",
        "city": "Ciudad Juarez",
        "name": "Intl Abraham Gonzalez",
        "country": "Mexico"
    },
    {
        "key": "CJT",
        "city": "ComitÃ¡n, Chiapas, Mexico",
        "name": "Copalar Airport",
        "country": "Mexico"
    },
    {
        "key": "CJU",
        "city": "Jeju City",
        "name": "Jeju Intl Arpt",
        "country": "Korea"
    },
    {
        "key": "CKA",
        "city": "Jet",
        "name": "Kegelman Air Force Auxiliary Field",
        "country": "United States"
    },
    {
        "key": "CKB",
        "city": "Clarksburg",
        "name": "Clarksburg Benedum Arpt",
        "country": "United States"
    },
    {
        "key": "CKC",
        "city": "Cherkassy",
        "name": "Cherkassy Arpt",
        "country": "Ukraine"
    },
    {
        "key": "CKD",
        "city": "Crooked Creek",
        "name": "Crooked Creek Arpt",
        "country": "United States"
    },
    {
        "key": "CKE",
        "city": "Clear Lake",
        "name": "Clear Lake Arpt",
        "country": "United States"
    },
    {
        "key": "CKG",
        "city": "Chongqing",
        "name": "Chongqing Arpt",
        "country": "China"
    },
    {
        "key": "CKL",
        "city": "Shchyolkovo",
        "name": "Chkalovsky Airport",
        "country": "Russia"
    },
    {
        "key": "CKM",
        "city": "Clarksdale",
        "name": "Fletcher Field",
        "country": "United States"
    },
    {
        "key": "CKO",
        "city": "Cornelio Procopio",
        "name": "Cornelio Procopio",
        "country": "Brazil"
    },
    {
        "key": "CKS",
        "city": "Carajas",
        "name": "Carajas Arpt",
        "country": "Brazil"
    },
    {
        "key": "CKT",
        "city": "Sarakhs",
        "name": "Sarakhs",
        "country": "Iran"
    },
    {
        "key": "CKU",
        "city": "Cordova",
        "name": "City Airport",
        "country": "United States"
    },
    {
        "key": "CKV",
        "city": "Clarksville",
        "name": "Outlaw Field",
        "country": "United States"
    },
    {
        "key": "CKW",
        "city": "Newman",
        "name": "Graeme Rowley Aerodrome",
        "country": "Australia"
    },
    {
        "key": "CKX",
        "city": "Chicken",
        "name": "Chicken Airport",
        "country": "United States"
    },
    {
        "key": "CKY",
        "city": "Conakry",
        "name": "Conakry Airport",
        "country": "Guinea"
    },
    {
        "key": "CKZ",
        "city": "Canakkale",
        "name": "Canakkale Arpt",
        "country": "Turkey"
    },
    {
        "key": "CLA",
        "city": "Comilla",
        "name": "Comilla",
        "country": "Bangladesh"
    },
    {
        "key": "CLD",
        "city": "San Diego",
        "name": "Carlsbad Arpt",
        "country": "United States"
    },
    {
        "key": "CLE",
        "city": "Cleveland",
        "name": "Hopkins Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CLG",
        "city": "Coalinga",
        "name": "Coalinga Arpt",
        "country": "United States"
    },
    {
        "key": "CLJ",
        "city": "Cluj",
        "name": "Napoca Arpt",
        "country": "Romania"
    },
    {
        "key": "CLK",
        "city": "Clinton",
        "name": "Clinton Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CLL",
        "city": "College Station",
        "name": "Easterwood Field",
        "country": "United States"
    },
    {
        "key": "CLM",
        "city": "Port Angeles",
        "name": "William Fairchild Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CLN",
        "city": "Charlotte",
        "name": "Carolina Airport",
        "country": "United States"
    },
    {
        "key": "CLO",
        "city": "Cali",
        "name": "Alfonso Bonilla Aragon Arpt",
        "country": "Colombia"
    },
    {
        "key": "CLP",
        "city": "Clarks Point",
        "name": "Clarks Point Airport",
        "country": "United States"
    },
    {
        "key": "CLQ",
        "city": "Colima",
        "name": "Colima Arpt",
        "country": "Mexico"
    },
    {
        "key": "CLR",
        "city": "Calipatria",
        "name": "Calipatria Arpt",
        "country": "United States"
    },
    {
        "key": "CLT",
        "city": "Charlotte",
        "name": "Charlotte Douglas Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CLU",
        "city": "Columbus",
        "name": "Columbus Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CLW",
        "city": "Clearwater",
        "name": "Clearwater Executive Airpark",
        "country": "United States"
    },
    {
        "key": "CLY",
        "city": "Calvi",
        "name": "Ste Catherine Arpt",
        "country": "France"
    },
    {
        "key": "CMA",
        "city": "Cunnamulla",
        "name": "Cunnamulla Arpt",
        "country": "Australia"
    },
    {
        "key": "CMB",
        "city": "Colombo",
        "name": "Bandaranaike Intl Arpt",
        "country": "Sri Lanka"
    },
    {
        "key": "CMC",
        "city": "Camocim",
        "name": "Camocim Airport",
        "country": "Brazil"
    },
    {
        "key": "AFK",
        "city": "Ampara",
        "name": "Kondavattavan Tank Arpt",
        "country": "Sri Lanka"
    },
    {
        "key": "AFL",
        "city": "Alta Floresta",
        "name": "Alta Floresta Arpt",
        "country": "Brazil"
    },
    {
        "key": "AFN",
        "city": "Jaffrey",
        "name": "Jaffrey AirportSilver Ranch",
        "country": "United States"
    },
    {
        "key": "AFO",
        "city": "Afton, Wyoming",
        "name": "Afton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "AFT",
        "city": "Afutara",
        "name": "Afutara Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "AFY",
        "city": "Afyon",
        "name": "Afyon Arpt",
        "country": "Turkey"
    },
    {
        "key": "AGA",
        "city": "Agadir",
        "name": "Agadir Almassira Arpt",
        "country": "Morocco"
    },
    {
        "key": "AGB",
        "city": "Augsburg",
        "name": "Muehlhausen Arpt",
        "country": "Germany"
    },
    {
        "key": "AGC",
        "city": "Pittsburgh",
        "name": "Allegheny Cty Arpt",
        "country": "United States"
    },
    {
        "key": "AGE",
        "city": "Wangerooge",
        "name": "Flugplatz Arpt",
        "country": "Germany"
    },
    {
        "key": "AGF",
        "city": "Agen",
        "name": "La Garenne Arpt",
        "country": "France"
    },
    {
        "key": "AGG",
        "city": "Wewak",
        "name": "Angoram Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "AGH",
        "city": "Angelholm",
        "name": "Angelholm Helsingborg Arpt",
        "country": "Sweden"
    },
    {
        "key": "AGJ",
        "city": "Aguni",
        "name": "Aguni Airport",
        "country": "Japan"
    },
    {
        "key": "AGN",
        "city": "Angoon",
        "name": "Angoon Arpt",
        "country": "United States"
    },
    {
        "key": "AGO",
        "city": "Magnolia",
        "name": "Magnolia Municipal",
        "country": "United States"
    },
    {
        "key": "AGP",
        "city": "Malaga",
        "name": "Malaga Arpt",
        "country": "Spain"
    },
    {
        "key": "AGR",
        "city": "Agra",
        "name": "Kheria Arpt",
        "country": "India"
    },
    {
        "key": "AGS",
        "city": "Augusta",
        "name": "Bush Field",
        "country": "United States"
    },
    {
        "key": "AGT",
        "city": "Ciudad Del Este",
        "name": "Alejo Garcia Arpt",
        "country": "Paraguay"
    },
    {
        "key": "AGU",
        "city": "Aguascalientes",
        "name": "Aguascalientes Municipal Arpt",
        "country": "Mexico"
    },
    {
        "key": "AGX",
        "city": "Agatti Island",
        "name": "Agatti Aerodrome",
        "country": "India"
    },
    {
        "key": "AGZ",
        "city": "Aggeneys",
        "name": "Aggeneys Airport",
        "country": "South Africa"
    },
    {
        "key": "AHB",
        "city": "Abha",
        "name": "Abha Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "AHC",
        "city": "Herlong",
        "name": "Herlong Arpt",
        "country": "United States"
    },
    {
        "key": "AHD",
        "city": "Ardmore",
        "name": "Downtown Arpt",
        "country": "United States"
    },
    {
        "key": "AHE",
        "city": "Ahe, Tuamotus, French Polynesia",
        "name": "Ahe Airport",
        "country": "French Polynesia"
    },
    {
        "key": "AHH",
        "city": "Amery",
        "name": "Municipal",
        "country": "United States"
    },
    {
        "key": "AHI",
        "city": "Amahai",
        "name": "Amahai Airport",
        "country": "Indonesia"
    },
    {
        "key": "AHM",
        "city": "Ashland",
        "name": "Ashland Municipal Airport (FAA: S03)",
        "country": "United States"
    },
    {
        "key": "AHN",
        "city": "Athens",
        "name": "Athens Municipal",
        "country": "United States"
    },
    {
        "key": "AHO",
        "city": "Alghero",
        "name": "Fertilia Arpt",
        "country": "Italy"
    },
    {
        "key": "AHU",
        "city": "Al Hoceima",
        "name": "Charif Al Idrissi Arpt",
        "country": "Morocco"
    },
    {
        "key": "AHZ",
        "city": "Alpe dHuez",
        "name": "Alpe dHuez Airport",
        "country": "France"
    },
    {
        "key": "AIA",
        "city": "Alliance",
        "name": "Alliance Municipal",
        "country": "United States"
    },
    {
        "key": "AIB",
        "city": "Anita Bay",
        "name": "Anita Bay Arpt",
        "country": "United States"
    },
    {
        "key": "AIC",
        "city": "Airok, Ailinglaplap Atoll, Marshall Islands",
        "name": "Ailinglaplap Airok Airport",
        "country": "Marshall Islands"
    },
    {
        "key": "AID",
        "city": "Anderson",
        "name": "Anderson Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AIF",
        "city": "Assis, SÃ£o Paulo, Brazil",
        "name": "Assis Airport (former ICAO: SBAS)",
        "country": "Brazil"
    },
    {
        "key": "AII",
        "city": "Ali Sabieh",
        "name": "AliSabieh Airport",
        "country": "Djibouti"
    },
    {
        "key": "AIK",
        "city": "Aiken",
        "name": "Aiken Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AIN",
        "city": "Wainwright",
        "name": "Wainwright Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AIO",
        "city": "Atlantic",
        "name": "Municipal Atlantic Arpt",
        "country": "United States"
    },
    {
        "key": "AIP",
        "city": "Jalandhar",
        "name": "Jalandhar Airport",
        "country": "India"
    },
    {
        "key": "AIR",
        "city": "AripuanÃ£, Mato Grosso, Brazil",
        "name": "AripuanÃ£ Airport",
        "country": "Brazil"
    },
    {
        "key": "AIS",
        "city": "Arorae Island, Kiribati",
        "name": "Arorae Island Airport",
        "country": "Kiribati"
    },
    {
        "key": "AIT",
        "city": "Aitutaki",
        "name": "Aitutaki Arpt",
        "country": "Cook Islands"
    },
    {
        "key": "AIV",
        "city": "Aliceville",
        "name": "Aliceville Arpt",
        "country": "United States"
    },
    {
        "key": "AIZ",
        "city": "Lake Of The Ozarks",
        "name": "Lee C Fine Memorial",
        "country": "United States"
    },
    {
        "key": "AJA",
        "city": "Ajaccio",
        "name": "Campo Dell Oro Arpt",
        "country": "France"
    },
    {
        "key": "AJF",
        "city": "Al Jouf",
        "name": "Jouf Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "AJI",
        "city": "Agri",
        "name": "Agri Airport",
        "country": "Turkey"
    },
    {
        "key": "AJK",
        "city": "Arak",
        "name": "Arak Airport",
        "country": "Iran"
    },
    {
        "key": "AJL",
        "city": "Aizawl",
        "name": "Lengpui Airport",
        "country": "India"
    },
    {
        "key": "AJN",
        "city": "Ouani",
        "name": "Ouani Airport",
        "country": "Comoros"
    },
    {
        "key": "AJR",
        "city": "Arvidsjaur",
        "name": "Arvidsjaur Arpt",
        "country": "Sweden"
    },
    {
        "key": "AJU",
        "city": "Aracaju",
        "name": "Santa Maria Arpt",
        "country": "Brazil"
    },
    {
        "key": "AJY",
        "city": "Agadez",
        "name": "Mano Dayak International Airport",
        "country": "Niger"
    },
    {
        "key": "AKA",
        "city": "Ankang",
        "name": "Ankang Wulipu Airport",
        "country": "China"
    },
    {
        "key": "AKB",
        "city": "Atka",
        "name": "Atka Arpt",
        "country": "United States"
    },
    {
        "key": "AKC",
        "city": "Akron",
        "name": "Fulton International Arpt",
        "country": "United States"
    },
    {
        "key": "AKD",
        "city": "Akola",
        "name": "Akola Airport",
        "country": "India"
    },
    {
        "key": "AKF",
        "city": "Al-Jawf",
        "name": "Kufra Airport",
        "country": "Libya"
    },
    {
        "key": "AKH",
        "city": "Al Kharj",
        "name": "Prince Sultan Air Base",
        "country": "Saudi Arabia"
    },
    {
        "key": "AKJ",
        "city": "Asahikawa",
        "name": "Asahikawa Arpt",
        "country": "Japan"
    },
    {
        "key": "AKL",
        "city": "Auckland",
        "name": "Auckland Arpt",
        "country": "New Zealand"
    },
    {
        "key": "AKM",
        "city": "Zakouma",
        "name": "Zakouma",
        "country": "Chad"
    },
    {
        "key": "AKN",
        "city": "King Salmon",
        "name": "King Salmon Arpt",
        "country": "United States"
    },
    {
        "key": "AKO",
        "city": "Akron",
        "name": "Washington County",
        "country": "United States"
    },
    {
        "key": "AKP",
        "city": "Anaktuvuk Pass",
        "name": "Anaktuvuk Pass Airport",
        "country": "United States"
    },
    {
        "key": "AKQ",
        "city": "Astraksetra, Indonesia",
        "name": "Gunung Batin Airport",
        "country": "Indonesia"
    },
    {
        "key": "AKR",
        "city": "Akure, Nigeria",
        "name": "Akure Airport",
        "country": "Nigeria"
    },
    {
        "key": "GTN",
        "city": "Mount Cook",
        "name": "Glentannerarpt",
        "country": "New Zealand"
    },
    {
        "key": "GTO",
        "city": "Gorontalo",
        "name": "Jalaluddin Airport",
        "country": "Indonesia"
    },
    {
        "key": "GTP",
        "city": "Grants Pass",
        "name": "Grants Pass Airport",
        "country": "United States"
    },
    {
        "key": "GTR",
        "city": "Columbus",
        "name": "Golden Arpt",
        "country": "United States"
    },
    {
        "key": "GTY",
        "city": "Gettysburg",
        "name": "Gettysburg Arpt",
        "country": "United States"
    },
    {
        "key": "GTZ",
        "city": "Grumeti",
        "name": "Kirawira B",
        "country": "Tanzania"
    },
    {
        "key": "GUA",
        "city": "Guatemala City",
        "name": "La Aurora Arpt",
        "country": "Guatemala"
    },
    {
        "key": "GUB",
        "city": "Guerrero Negro, Baja California Sur,2 Mexico",
        "name": "Guerrero Negro Airport",
        "country": "Mexico"
    },
    {
        "key": "GUC",
        "city": "Gunnison",
        "name": "Gunnison Cty",
        "country": "United States"
    },
    {
        "key": "GUD",
        "city": "Goundam",
        "name": "Goundam Airport",
        "country": "Mali"
    },
    {
        "key": "GUF",
        "city": "Gulf Shores",
        "name": "Edwards Arpt",
        "country": "United States"
    },
    {
        "key": "GUG",
        "city": "Guari",
        "name": "Guari Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GUH",
        "city": "Gunnedah",
        "name": "Gunnedah Airport",
        "country": "Australia"
    },
    {
        "key": "GUI",
        "city": "Guiria",
        "name": "Guiria Airport",
        "country": "Venezuela"
    },
    {
        "key": "GUJ",
        "city": "Guaratingueta",
        "name": "Guaratingueta",
        "country": "Brazil"
    },
    {
        "key": "GUM",
        "city": "Guam",
        "name": "Antonio B Won Pat Intl",
        "country": "Guam"
    },
    {
        "key": "GUN",
        "city": "Montgomery",
        "name": "Gunter AFB",
        "country": "United States"
    },
    {
        "key": "GUP",
        "city": "Gallup",
        "name": "Gallup Municipal",
        "country": "United States"
    },
    {
        "key": "GUQ",
        "city": "Guanare",
        "name": "Guanare Airport",
        "country": "Venezuela"
    },
    {
        "key": "GUR",
        "city": "Alotau",
        "name": "Gurney Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "GUS",
        "city": "Grissom Air Force Base",
        "name": "Grissom Air Reserve Base",
        "country": "United States"
    },
    {
        "key": "GUT",
        "city": "Gutersloh",
        "name": "Guetersloh Arpt",
        "country": "Germany"
    },
    {
        "key": "GUU",
        "city": "GrundarfjÃ¶rÃ°ur, Iceland",
        "name": "GrundarfjÃ¶rÃ°ur Airport",
        "country": "Iceland"
    },
    {
        "key": "GUW",
        "city": "Atyrau",
        "name": "Atyrau Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "GUX",
        "city": "Guna",
        "name": "Guna",
        "country": "India"
    },
    {
        "key": "GUY",
        "city": "Guymon",
        "name": "Guymon Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GUZ",
        "city": "Guarapari, Espirito Santo, Brazil",
        "name": "Guarapari Airport",
        "country": "Brazil"
    },
    {
        "key": "GVA",
        "city": "Geneva",
        "name": "Geneve Cointrin",
        "country": "Switzerland"
    },
    {
        "key": "GVL",
        "city": "Gainesville",
        "name": "LEE GILMER MEMORIAL ARPT",
        "country": "United States"
    },
    {
        "key": "GVR",
        "city": "Governador Valadares",
        "name": "Governador Valadares Arpt",
        "country": "Brazil"
    },
    {
        "key": "GVX",
        "city": "Gavle",
        "name": "Sandviken Arpt",
        "country": "Sweden"
    },
    {
        "key": "GWA",
        "city": "Gwa",
        "name": "Gwa",
        "country": "Myanmar"
    },
    {
        "key": "GWD",
        "city": "Gwadar",
        "name": "Gwadar International Airport",
        "country": "Pakistan"
    },
    {
        "key": "GWE",
        "city": "Gweru",
        "name": "Gweru Airport",
        "country": "Zimbabwe"
    },
    {
        "key": "GWL",
        "city": "Gwalior",
        "name": "Gwalior Airport",
        "country": "India"
    },
    {
        "key": "GWO",
        "city": "Greenwood",
        "name": "Leflore Arpt",
        "country": "United States"
    },
    {
        "key": "GWS",
        "city": "Glenwood Springs",
        "name": "Glenwood Springs Arpt",
        "country": "United States"
    },
    {
        "key": "GWT",
        "city": "Westerland",
        "name": "Westerland Airport",
        "country": "Germany"
    },
    {
        "key": "GWY",
        "city": "Galway",
        "name": "Carnmore Arpt",
        "country": "Ireland"
    },
    {
        "key": "GXF",
        "city": "Sayun, Yemen",
        "name": "Sayun Airport",
        "country": "Yemen"
    },
    {
        "key": "GXG",
        "city": "Negage",
        "name": "Negage Airport",
        "country": "Angola"
    },
    {
        "key": "GXQ",
        "city": "Coyhaique",
        "name": "Teniente Vidal Arpt",
        "country": "Chile"
    },
    {
        "key": "GXY",
        "city": "Greeley",
        "name": "Weld County Regional Arpt",
        "country": "United States"
    },
    {
        "key": "GYA",
        "city": "Guayaramerin",
        "name": "Guayaramerin",
        "country": "Bolivia"
    },
    {
        "key": "GYD",
        "city": "Baku",
        "name": "Heydar Aliyev Intl Arpt",
        "country": "Azerbaijan"
    },
    {
        "key": "GYE",
        "city": "Guayaquil",
        "name": "Simon Bolivar Airport",
        "country": "Ecuador"
    },
    {
        "key": "GYI",
        "city": "Gisenyi",
        "name": "Gisenyi Arpt",
        "country": "Rwanda"
    },
    {
        "key": "GYL",
        "city": "Kingstown",
        "name": "Argyle Airport",
        "country": "Saint Vincent and the Grenadines"
    },
    {
        "key": "KLD",
        "city": "Tver",
        "name": "Migalovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "GYM",
        "city": "Guaymas",
        "name": "Gen Jose M Yanez Arpt",
        "country": "Mexico"
    },
    {
        "key": "KLE",
        "city": "Kaele",
        "name": "Kaele Airport",
        "country": "Cameroon"
    },
    {
        "key": "KLF",
        "city": "Kaluga",
        "name": "Kaluga Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "GYN",
        "city": "Goiania",
        "name": "Santa Genoveva",
        "country": "Brazil"
    },
    {
        "key": "KLG",
        "city": "Kalskag",
        "name": "Kalskag Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GYP",
        "city": "Gympie",
        "name": "Gympie Arpt",
        "country": "Australia"
    },
    {
        "key": "KLH",
        "city": "Kolhapur",
        "name": "Kolhapur Arpt",
        "country": "India"
    },
    {
        "key": "KLI",
        "city": "Kotakoli",
        "name": "Kotakoli Air Base",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "GYR",
        "city": "Goodyear",
        "name": "Litchfield Goodyear Arpt",
        "country": "United States"
    },
    {
        "key": "KLK",
        "city": "Kalokol",
        "name": "Kalokol Airport (Fergusons Gulf Airport)",
        "country": "Kenya"
    },
    {
        "key": "GYS",
        "city": "Guang Yuan",
        "name": "Guang Yuan Arpt",
        "country": "China"
    },
    {
        "key": "KLL",
        "city": "Levelock",
        "name": "Levelock Airport",
        "country": "United States"
    },
    {
        "key": "GYU",
        "city": "Guyuan",
        "name": "Guyuan Liupanshan Airport[2]",
        "country": "China"
    },
    {
        "key": "KLM",
        "city": "Kalaleh, Iran",
        "name": "Kalaleh Airport",
        "country": "Iran"
    },
    {
        "key": "KLO",
        "city": "Kalibo",
        "name": "Kalibo Arpt",
        "country": "Philippines"
    },
    {
        "key": "GYY",
        "city": "Gary",
        "name": "Gary International Arpt",
        "country": "United States"
    },
    {
        "key": "GZM",
        "city": "Gozo",
        "name": "Gozo Arpt",
        "country": "Malta"
    },
    {
        "key": "KLP",
        "city": "Kelp Bay",
        "name": "Kelp Bay Arpt",
        "country": "United States"
    },
    {
        "key": "KLR",
        "city": "Kalmar",
        "name": "Kalmar Arpt",
        "country": "Sweden"
    },
    {
        "key": "KLS",
        "city": "Kelso",
        "name": "Kelso Longview Regional Arpt",
        "country": "United States"
    },
    {
        "key": "GZO",
        "city": "Gizo",
        "name": "Gizo Arpt",
        "country": "Solomon Islands"
    },
    {
        "key": "KLT",
        "city": "Kaiserslautern",
        "name": "Kaiserslautern Rail Station",
        "country": "Germany"
    },
    {
        "key": "KLU",
        "city": "Klagenfurt",
        "name": "Klagenfurt Arpt",
        "country": "Austria"
    },
    {
        "key": "GZP",
        "city": "Gazipasa",
        "name": "Gazipasaairport",
        "country": "Turkey"
    },
    {
        "key": "DCU",
        "city": "Decatur",
        "name": "Pyor Arpt",
        "country": "United States"
    },
    {
        "key": "DDC",
        "city": "Dodge City",
        "name": "Dodge City Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "DDG",
        "city": "Dandong",
        "name": "Dandong Arpt",
        "country": "China"
    },
    {
        "key": "DDI",
        "city": "Daydream Island",
        "name": "Daydream Island Arpt",
        "country": "Australia"
    },
    {
        "key": "DDM",
        "city": "Dodoima",
        "name": "Dodoima Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "DDN",
        "city": "Orange",
        "name": "Delta Downs Airport",
        "country": "United States"
    },
    {
        "key": "DDU",
        "city": "Dadu",
        "name": "Dadu",
        "country": "Pakistan"
    },
    {
        "key": "DEA",
        "city": "Dera Ghazi Khan, Pakistan",
        "name": "Dera Ghazi Khan International Airport",
        "country": "Pakistan"
    },
    {
        "key": "DEB",
        "city": "Debrecen",
        "name": "Debrecen Arpt",
        "country": "Hungary"
    },
    {
        "key": "DEC",
        "city": "Decatur",
        "name": "Decatur Municipal",
        "country": "United States"
    },
    {
        "key": "DED",
        "city": "Dehra Dun",
        "name": "Jolly Grant Airport",
        "country": "India"
    },
    {
        "key": "DEF",
        "city": "Dezful",
        "name": "Dezful Airport",
        "country": "Iran"
    },
    {
        "key": "DEH",
        "city": "Decorah",
        "name": "Decorah Municipal",
        "country": "United States"
    },
    {
        "key": "DEI",
        "city": "Grand Anse",
        "name": "Denis Island Airport",
        "country": "Seychelles"
    },
    {
        "key": "DEL",
        "city": "Delhi",
        "name": "Delhi indira gandhi intl",
        "country": "India"
    },
    {
        "key": "DEM",
        "city": "Dembidolo, Ethiopia",
        "name": "Dembidolo Airport",
        "country": "Ethiopia"
    },
    {
        "key": "DEN",
        "city": "Denver",
        "name": "Denver Intl Arpt",
        "country": "United States"
    },
    {
        "key": "DEP",
        "city": "Deparizo",
        "name": "Deparizo Airport",
        "country": "India"
    },
    {
        "key": "DER",
        "city": "Derim",
        "name": "Derim Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "DES",
        "city": "Desroches Island",
        "name": "Desroches Airport",
        "country": "Seychelles"
    },
    {
        "key": "DET",
        "city": "Detroit",
        "name": "Detroit City Apt",
        "country": "United States"
    },
    {
        "key": "DEZ",
        "city": "Deirezzor",
        "name": "Al Jafrah Arpt",
        "country": "Syrian Arab Republic"
    },
    {
        "key": "DFI",
        "city": "Defiance",
        "name": "Defiance Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "DFW",
        "city": "Dallas",
        "name": "Dallas Ft Worth Intl",
        "country": "United States"
    },
    {
        "key": "DGA",
        "city": "Dangriga",
        "name": "Dangriga",
        "country": "Belize"
    },
    {
        "key": "DGD",
        "city": "Yalgoo",
        "name": "Dalgaranga Airport",
        "country": "Australia"
    },
    {
        "key": "DGE",
        "city": "Mudgee",
        "name": "Mudgee Arpt",
        "country": "Australia"
    },
    {
        "key": "DGF",
        "city": "Douglas Lake",
        "name": "Douglas Lake Airport",
        "country": "Canada"
    },
    {
        "key": "DGL",
        "city": "Douglas",
        "name": "Douglas Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "DGM",
        "city": "Colombo",
        "name": "Dandugama Water Aerodrome",
        "country": "Sri Lanka"
    },
    {
        "key": "DGN",
        "city": "Dahlgren",
        "name": "Naval Air Field",
        "country": "United States"
    },
    {
        "key": "DGO",
        "city": "Durango",
        "name": "Guadalupe Victoria Arpt",
        "country": "Mexico"
    },
    {
        "key": "DGP",
        "city": "Daugavpils",
        "name": "Daugavpils Arpt",
        "country": "Latvia"
    },
    {
        "key": "DGR",
        "city": "Turiwiri",
        "name": "Dargaville Aerodrome",
        "country": "New Zealand"
    },
    {
        "key": "DGT",
        "city": "Dumaguete",
        "name": "Dumaguete Arpt",
        "country": "Philippines"
    },
    {
        "key": "DHA",
        "city": "Dhahran",
        "name": "Dhahran Intl",
        "country": "Saudi Arabia"
    },
    {
        "key": "DHB",
        "city": "Friday Harbor",
        "name": "Deer Harbor Sea Plane Base",
        "country": "United States"
    },
    {
        "key": "DHD",
        "city": "Durham",
        "name": "Durham Downs Airport",
        "country": "Australia"
    },
    {
        "key": "DHF",
        "city": "Abu Dhabi",
        "name": "Al Dhafra Military Apt",
        "country": "United Arab Emirates"
    },
    {
        "key": "DHI",
        "city": "Dhangarhi",
        "name": "Dhangarhi",
        "country": "Nepal"
    },
    {
        "key": "DHL",
        "city": "Dhala",
        "name": "Dhala Airport",
        "country": "Yemen"
    },
    {
        "key": "DHM",
        "city": "Dharamsala",
        "name": "Dharamsala",
        "country": "India"
    },
    {
        "key": "DHN",
        "city": "Dothan",
        "name": "Dothan Municipal",
        "country": "United States"
    },
    {
        "key": "DHR",
        "city": "Den Helder",
        "name": "De Kooy",
        "country": "Netherlands"
    },
    {
        "key": "DIB",
        "city": "Dibrugarh",
        "name": "Mohanbari Arpt",
        "country": "India"
    },
    {
        "key": "DIE",
        "city": "Diegosuarez",
        "name": "Antsiranana Arrachart Arpt",
        "country": "Madagascar"
    },
    {
        "key": "DIG",
        "city": "Diqing",
        "name": "Diging Arpt",
        "country": "China"
    },
    {
        "key": "DIJ",
        "city": "Dijon",
        "name": "Longvic Airport",
        "country": "France"
    },
    {
        "key": "DIK",
        "city": "Dickinson",
        "name": "Dickinson Municipal",
        "country": "United States"
    },
    {
        "key": "DIL",
        "city": "Dili",
        "name": "Presidente Nicolau Lobato Intl Arpt",
        "country": "Timor-Leste"
    },
    {
        "key": "DIM",
        "city": "Dimbokro",
        "name": "Dimbokro Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "DIN",
        "city": "Dien Bien Phu",
        "name": "Gialam Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "DIQ",
        "city": "Divinopolis, Minas Gerais, Brazil",
        "name": "Divinopolis Airport",
        "country": "Brazil"
    },
    {
        "key": "DIR",
        "city": "Dire Dawa",
        "name": "Aba Tenna D Yilma Arpt",
        "country": "Ethiopia"
    },
    {
        "key": "DIU",
        "city": "Diu In",
        "name": "Diu Arpt",
        "country": "India"
    },
    {
        "key": "DIV",
        "city": "Divo",
        "name": "Divo Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "DIW",
        "city": "Dikwella",
        "name": "Mawella Lagoon Seaplane Base",
        "country": "Sri Lanka"
    },
    {
        "key": "DIY",
        "city": "Diyarbai",
        "name": "Diyarbakir Arpt",
        "country": "Turkey"
    },
    {
        "key": "DJB",
        "city": "Jambi",
        "name": "Sultan Taha Syarifudin Arpt",
        "country": "Indonesia"
    },
    {
        "key": "DJE",
        "city": "Djerba",
        "name": "Melita Airport",
        "country": "Tunisia"
    },
    {
        "key": "DJG",
        "city": "Djanet",
        "name": "Tiska Djanet Airport",
        "country": "Algeria"
    },
    {
        "key": "DJJ",
        "city": "Jayapura",
        "name": "Sentani Arpt",
        "country": "Indonesia"
    },
    {
        "key": "DJN",
        "city": "Delta Junction",
        "name": "Delta Junction Arpt",
        "country": "United States"
    },
    {
        "key": "DKA",
        "city": "Katsina",
        "name": "Katsina Airport",
        "country": "Nigeria"
    },
    {
        "key": "DKI",
        "city": "Dunk Island",
        "name": "Dunk Island Arpt",
        "country": "Australia"
    },
    {
        "key": "DKK",
        "city": "Dunkirk",
        "name": "Chautauqua County/Dunkirk Airport",
        "country": "United States"
    },
    {
        "key": "DKR",
        "city": "Dakar",
        "name": "Leopold Sedar Senghor Arpt",
        "country": "Senegal"
    },
    {
        "key": "DLA",
        "city": "Douala",
        "name": "Douala Arpt",
        "country": "Cameroon"
    },
    {
        "key": "DLC",
        "city": "Dalian",
        "name": "Dalian Arpt",
        "country": "China"
    },
    {
        "key": "DLE",
        "city": "Dole",
        "name": "Tavaux Arpt",
        "country": "France"
    },
    {
        "key": "DLF",
        "city": "Del Rio",
        "name": "Laughlin AFB",
        "country": "United States"
    },
    {
        "key": "DLG",
        "city": "Dillingham",
        "name": "Dillingham Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "DLH",
        "city": "Duluth",
        "name": "Duluth Intl",
        "country": "United States"
    },
    {
        "key": "BIQ",
        "city": "Biarritz",
        "name": "Bayonne Anglet Arpt",
        "country": "France"
    },
    {
        "key": "BIR",
        "city": "Biratnagar",
        "name": "Biratnagar Airport",
        "country": "Nepal"
    },
    {
        "key": "BIS",
        "city": "Bismarck",
        "name": "Bismarck Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BIT",
        "city": "Patan",
        "name": "Baitadi Airport",
        "country": "Nepal"
    },
    {
        "key": "BIU",
        "city": "Bildudalur",
        "name": "Bildudalur Airport",
        "country": "Iceland"
    },
    {
        "key": "BIW",
        "city": "Sturt Creek",
        "name": "Billiluna Airport",
        "country": "Australia"
    },
    {
        "key": "BIX",
        "city": "Biloxi",
        "name": "Keesler Air Force Base",
        "country": "United States"
    },
    {
        "key": "BIY",
        "city": "Bisho",
        "name": "Bisho Arpt",
        "country": "South Africa"
    },
    {
        "key": "BJA",
        "city": "Bejaia",
        "name": "Bejaia Arpt",
        "country": "Algeria"
    },
    {
        "key": "BJC",
        "city": "Broomfield",
        "name": "Jeffco Arpt",
        "country": "United States"
    },
    {
        "key": "BJD",
        "city": "BakkafjÃ¶rÃ°ur",
        "name": "BakkafjÃ¶rÃ°ur Airport",
        "country": "Iceland"
    },
    {
        "key": "BJF",
        "city": "Batsfjord",
        "name": "Batsfjord Arpt",
        "country": "Norway"
    },
    {
        "key": "BJH",
        "city": "Jayaprithvi",
        "name": "Bajhang Airport",
        "country": "Nepal"
    },
    {
        "key": "BJI",
        "city": "Bemidji",
        "name": "Bemidji Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BJJ",
        "city": "Smithville",
        "name": "Wayne County Airport",
        "country": "United States"
    },
    {
        "key": "BJK",
        "city": "Benjina, Indonesia",
        "name": "Benjina Airport (Nangasuri Airport)",
        "country": "Indonesia"
    },
    {
        "key": "BJL",
        "city": "Banjul",
        "name": "Banjul International Airport",
        "country": "Gambia"
    },
    {
        "key": "BJM",
        "city": "Bujumbura",
        "name": "Bujumbura Intl Arpt",
        "country": "Burundi"
    },
    {
        "key": "BJN",
        "city": "Bajone",
        "name": "Bajone Airport",
        "country": "Mozambique"
    },
    {
        "key": "BJP",
        "city": "Braganca Paulista, Sao Paulo, Brazil",
        "name": "Arthur Siqueira Braganca Paulista State Airport",
        "country": "Brazil"
    },
    {
        "key": "BJR",
        "city": "Bahar Dar",
        "name": "Bahar Dar Arpt",
        "country": "Ethiopia"
    },
    {
        "key": "BJT",
        "city": "Bentota",
        "name": "Bentota River Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "BJU",
        "city": "Sanfebagar",
        "name": "Bajura Airport",
        "country": "Nepal"
    },
    {
        "key": "BJV",
        "city": "Bodrum",
        "name": "Milas Arpt",
        "country": "Turkey"
    },
    {
        "key": "BJW",
        "city": "Bajawa",
        "name": "Bajawa",
        "country": "Indonesia"
    },
    {
        "key": "BJX",
        "city": "Leon",
        "name": "Del Bajio Arpt",
        "country": "Mexico"
    },
    {
        "key": "BJY",
        "city": "Belgrade",
        "name": "Batajnica Arpt",
        "country": "Serbia"
    },
    {
        "key": "BJZ",
        "city": "Badajoz",
        "name": "Talaveral La Real Arpt",
        "country": "Spain"
    },
    {
        "key": "BKE",
        "city": "Baker",
        "name": "Baker City Arpt",
        "country": "United States"
    },
    {
        "key": "BKG",
        "city": "Branson",
        "name": "Branson Regional Arpt",
        "country": "United States"
    },
    {
        "key": "BKH",
        "city": "Kekaha",
        "name": "Barking Sands PMRF",
        "country": "United States"
    },
    {
        "key": "BKI",
        "city": "Kota Kinabalu",
        "name": "Kota Kinabalu Arpt",
        "country": "Malaysia"
    },
    {
        "key": "BKJ",
        "city": "Boke",
        "name": "BokÃ© Baralande Airport",
        "country": "Guinea"
    },
    {
        "key": "BKK",
        "city": "Bangkok",
        "name": "Suvarnabhumi Intl Arpt",
        "country": "Thailand"
    },
    {
        "key": "BKL",
        "city": "Cleveland",
        "name": "Burke Lakefront Arpt",
        "country": "United States"
    },
    {
        "key": "BKM",
        "city": "Bakalalan",
        "name": "Bakalalan Arpt",
        "country": "Malaysia"
    },
    {
        "key": "BKO",
        "city": "Bamako",
        "name": "Senou Airport",
        "country": "Mali"
    },
    {
        "key": "BKP",
        "city": "Mount Isa",
        "name": "Barkly Downs Airport",
        "country": "Australia"
    },
    {
        "key": "BKQ",
        "city": "Blackall",
        "name": "Blackall Arpt",
        "country": "Australia"
    },
    {
        "key": "BKR",
        "city": "Bokoro",
        "name": "Bokoro",
        "country": "Chad"
    },
    {
        "key": "BKS",
        "city": "Bengkulu",
        "name": "Padangkemiling Arpt",
        "country": "Indonesia"
    },
    {
        "key": "BKW",
        "city": "Beckley",
        "name": "Raleigh Cty Memorial",
        "country": "United States"
    },
    {
        "key": "BKX",
        "city": "Brookings",
        "name": "Brookings Municipal",
        "country": "United States"
    },
    {
        "key": "DLI",
        "city": "Dalat",
        "name": "Lienkhang",
        "country": "Viet Nam"
    },
    {
        "key": "BKY",
        "city": "Kavumu",
        "name": "Kavumu Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "BLA",
        "city": "Barcelona",
        "name": "Gen J A Anzoategui Arpt",
        "country": "Venezuela"
    },
    {
        "key": "DLL",
        "city": "Dillon",
        "name": "Dillon Arpt",
        "country": "United States"
    },
    {
        "key": "DLM",
        "city": "Dalaman",
        "name": "Dalaman Airport",
        "country": "Turkey"
    },
    {
        "key": "BLB",
        "city": "Panama Pacifico, Panama",
        "name": "PanamÃ¡ PacÃ­fico International Airport (former Howard AFB)",
        "country": "Panama"
    },
    {
        "key": "DLN",
        "city": "Dillon",
        "name": "Dillon Airport",
        "country": "United States"
    },
    {
        "key": "BLC",
        "city": "Bali",
        "name": "Bali Airport",
        "country": "Cameroon"
    },
    {
        "key": "DLO",
        "city": "Dolomi",
        "name": "Dolomi Arpt",
        "country": "United States"
    },
    {
        "key": "BLD",
        "city": "Boulder City",
        "name": "Boulder City Municipal Airport (FAA: 61B)",
        "country": "United States"
    },
    {
        "key": "DLS",
        "city": "The Dalles",
        "name": "The Dalles Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BLE",
        "city": "Borlange",
        "name": "Dala Airport",
        "country": "Sweden"
    },
    {
        "key": "DLU",
        "city": "Dali City",
        "name": "Dali Arpt",
        "country": "China"
    },
    {
        "key": "BLF",
        "city": "Bluefield",
        "name": "Mercer County",
        "country": "United States"
    },
    {
        "key": "DMA",
        "city": "Tucson",
        "name": "Davis Monthan AFB",
        "country": "United States"
    },
    {
        "key": "BLG",
        "city": "Belaga",
        "name": "Belaga Arpt",
        "country": "Malaysia"
    },
    {
        "key": "DMB",
        "city": "Taraz",
        "name": "Taraz Airport (Jambyl Airport)",
        "country": "Kazakhstan"
    },
    {
        "key": "BLH",
        "city": "Blythe",
        "name": "Blythe Airport",
        "country": "United States"
    },
    {
        "key": "DMD",
        "city": "Doomadgee",
        "name": "Doomadgee Arpt",
        "country": "Australia"
    },
    {
        "key": "BLI",
        "city": "Bellingham",
        "name": "Bellingham Intl Arpt",
        "country": "United States"
    },
    {
        "key": "DME",
        "city": "Moscow",
        "name": "Domodedovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "DMK",
        "city": "Bangkok",
        "name": "Don Mueang International Arpt",
        "country": "Thailand"
    },
    {
        "key": "BLJ",
        "city": "Batna",
        "name": "Batna Arpt",
        "country": "Algeria"
    },
    {
        "key": "DMM",
        "city": "Dammam",
        "name": "King Fahad Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "BLK",
        "city": "Blackpool",
        "name": "Blackpool Airport",
        "country": "United Kingdom"
    },
    {
        "key": "DMN",
        "city": "Deming",
        "name": "Deming Municipal Airport",
        "country": "United States"
    },
    {
        "key": "DMO",
        "city": "Sedalia",
        "name": "Sedalia Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "BLL",
        "city": "Billund",
        "name": "Billund Airport",
        "country": "Denmark"
    },
    {
        "key": "DMR",
        "city": "Dhamar",
        "name": "Dhamar Airport",
        "country": "Yemen"
    },
    {
        "key": "KGD",
        "city": "Kaliningrad",
        "name": "Kaliningrad Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KGF",
        "city": "Karaganda",
        "name": "Karaganda Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "KGG",
        "city": "Kedougou, Senegal",
        "name": "Kedougou Airport",
        "country": "Senegal"
    },
    {
        "key": "KGI",
        "city": "Kalgoorlie",
        "name": "Kalgoorlie Arpt",
        "country": "Australia"
    },
    {
        "key": "KGJ",
        "city": "Karonga",
        "name": "Karonga",
        "country": "Malawi"
    },
    {
        "key": "KGK",
        "city": "Koliganek",
        "name": "Koliganek Airport (FAA: JZZ)",
        "country": "United States"
    },
    {
        "key": "KGL",
        "city": "Kigali",
        "name": "Kigali Intl Arpt",
        "country": "Rwanda"
    },
    {
        "key": "KGO",
        "city": "Kirovohrad",
        "name": "Kirovohrad Airport",
        "country": "Ukraine"
    },
    {
        "key": "KGP",
        "city": "Kogalym",
        "name": "Kogalym International Airport",
        "country": "Russian Federation"
    },
    {
        "key": "KGR",
        "city": "Ghan",
        "name": "Kulgera Airport",
        "country": "Australia"
    },
    {
        "key": "KGS",
        "city": "Kos Gr",
        "name": "Kos Arpt",
        "country": "Greece"
    },
    {
        "key": "KGT",
        "city": "Garze",
        "name": "Kangding Airport",
        "country": "China"
    },
    {
        "key": "KGU",
        "city": "Tambunan",
        "name": "Keningau Airport",
        "country": "Malaysia"
    },
    {
        "key": "KGW",
        "city": "Kagi",
        "name": "KAGI AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "KGX",
        "city": "Grayling",
        "name": "Grayling",
        "country": "United States"
    },
    {
        "key": "KHA",
        "city": "Piranshahr (Khaneh)",
        "name": "Khaneh Airport (Piranshahr Airport)",
        "country": "Iran"
    },
    {
        "key": "KHC",
        "city": "Kerch",
        "name": "Kerch Airport (Voykovo Airport)",
        "country": "Ukraine"
    },
    {
        "key": "KHD",
        "city": "Khorramabad",
        "name": "Khorramabad Arpt",
        "country": "Iran"
    },
    {
        "key": "KHE",
        "city": "Kherson",
        "name": "Kherson International Airport",
        "country": "Ukraine"
    },
    {
        "key": "KHG",
        "city": "Kashi",
        "name": "Kashi Arpt",
        "country": "China"
    },
    {
        "key": "KHH",
        "city": "Kaohsiung",
        "name": "Kaohsiung Intl",
        "country": "Taiwan"
    },
    {
        "key": "KHI",
        "city": "Karachi",
        "name": "Quaid E Azam International",
        "country": "Pakistan"
    },
    {
        "key": "KHJ",
        "city": "Kauhajoki, Finland",
        "name": "Kauhajoki Airfield",
        "country": "Finland"
    },
    {
        "key": "KHM",
        "city": "Hkamti",
        "name": "Khamti Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "KHN",
        "city": "Nanchang",
        "name": "Nanchang Arpt",
        "country": "China"
    },
    {
        "key": "KHO",
        "city": "Kruger Park",
        "name": "Khoka Moya Airport",
        "country": "South Africa"
    },
    {
        "key": "KHS",
        "city": "Al Khasab",
        "name": "Khasab Airport",
        "country": "Oman"
    },
    {
        "key": "KHU",
        "city": "Kremenchug",
        "name": "Kremenchug Airport",
        "country": "Ukraine"
    },
    {
        "key": "KHV",
        "city": "Khabarovsk",
        "name": "Novyy Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KHY",
        "city": "Khoy",
        "name": "Khoy Airport",
        "country": "Iran"
    },
    {
        "key": "KHZ",
        "city": "Kauehi, Tuamotus, French Polynesia",
        "name": "Kauehi Airport",
        "country": "French Polynesia"
    },
    {
        "key": "KIC",
        "city": "King City",
        "name": "Mesa Del Rey Arpt",
        "country": "United States"
    },
    {
        "key": "KID",
        "city": "Kristianstad",
        "name": "Kristianstad Arpt",
        "country": "Sweden"
    },
    {
        "key": "KIE",
        "city": "Kieta, Papua New Guinea",
        "name": "Aropa Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KIF",
        "city": "Kingfisher Lake",
        "name": "Kingfisher Lake Airport",
        "country": "Canada"
    },
    {
        "key": "KIG",
        "city": "Koingnaas",
        "name": "Koingnaas Airport",
        "country": "South Africa"
    },
    {
        "key": "KIH",
        "city": "Kish",
        "name": "Kish International Airport",
        "country": "Iran"
    },
    {
        "key": "KIJ",
        "city": "Niigata",
        "name": "Niigata Arpt",
        "country": "Japan"
    },
    {
        "key": "KIK",
        "city": "Kirkuk",
        "name": "Kirkuk Airport",
        "country": "Iraq"
    },
    {
        "key": "KIM",
        "city": "Kimberley",
        "name": "Kimberley Arpt",
        "country": "South Africa"
    },
    {
        "key": "KIN",
        "city": "Kingston",
        "name": "Norman Manly Arpt",
        "country": "Jamaica"
    },
    {
        "key": "KIP",
        "city": "Wichita Falls",
        "name": "Kickapoo Downtown Airpark",
        "country": "United States"
    },
    {
        "key": "KIQ",
        "city": "Kira",
        "name": "Kira Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KIR",
        "city": "Kerry County",
        "name": "Kerry County Arpt",
        "country": "Ireland"
    },
    {
        "key": "KIS",
        "city": "Kisumu",
        "name": "Kisumu Arpt",
        "country": "Kenya"
    },
    {
        "key": "KIT",
        "city": "Kithira",
        "name": "Kithira Arpt",
        "country": "Greece"
    },
    {
        "key": "KIU",
        "city": "Kiunga",
        "name": "Kiunga Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KIV",
        "city": "Chisinau",
        "name": "Chisinau Arpt",
        "country": "Moldova"
    },
    {
        "key": "KIW",
        "city": "Kitwe",
        "name": "Southdowns",
        "country": "Zambia"
    },
    {
        "key": "KIX",
        "city": "Osaka",
        "name": "Kansai International Arpt",
        "country": "Japan"
    },
    {
        "key": "KJA",
        "city": "Krasnoyarsk",
        "name": "Krasnojarsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KJI",
        "city": "Altay",
        "name": "Kanas Airport",
        "country": "China"
    },
    {
        "key": "KJK",
        "city": "Kortrijk",
        "name": "Kortrijk Arpt",
        "country": "Belgium"
    },
    {
        "key": "KJP",
        "city": "Zamami",
        "name": "Kerama Airport",
        "country": "Japan"
    },
    {
        "key": "KKA",
        "city": "Koyuk",
        "name": "Koyuk Alfred Adams Airport",
        "country": "United States"
    },
    {
        "key": "KKC",
        "city": "Khon Kaen",
        "name": "Khon Kaen Arpt",
        "country": "Thailand"
    },
    {
        "key": "KKD",
        "city": "Kokoda",
        "name": "Kokoda Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KKE",
        "city": "Kerikeri",
        "name": "Kerikeri Arpt",
        "country": "New Zealand"
    },
    {
        "key": "KKH",
        "city": "Bethel",
        "name": "Kongiganak Airport (FAA: DUY)",
        "country": "United States"
    },
    {
        "key": "KKJ",
        "city": "Kita Kyushu",
        "name": "Kokura Arpt",
        "country": "Japan"
    },
    {
        "key": "KKK",
        "city": "Kalakaket",
        "name": "Kalakaket Afs",
        "country": "United States"
    },
    {
        "key": "KKL",
        "city": "Karluk Lake",
        "name": "Karluk Lake Arpt",
        "country": "United States"
    },
    {
        "key": "KKN",
        "city": "Kirkenes",
        "name": "Hoeybuktmoen Arpt",
        "country": "Norway"
    },
    {
        "key": "KKO",
        "city": "Kaikohe",
        "name": "Kaikohe Aerodrome",
        "country": "New Zealand"
    },
    {
        "key": "KKP",
        "city": "Koolburra",
        "name": "Koolburra Airport",
        "country": "Australia"
    },
    {
        "key": "KKR",
        "city": "Kaukura Atoll, Tuamotus, French Polynesia",
        "name": "Kaukura Airport",
        "country": "French Polynesia"
    },
    {
        "key": "KKT",
        "city": "Kentland",
        "name": "Kentland Arpt",
        "country": "United States"
    },
    {
        "key": "KKU",
        "city": "Clarks Point",
        "name": "Ekuk Airport",
        "country": "United States"
    },
    {
        "key": "KKW",
        "city": "Kikwit",
        "name": "Kikwit Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "KKY",
        "city": "Kilkenny, Ireland",
        "name": "Kilkenny Airport",
        "country": "Ireland"
    },
    {
        "key": "KKZ",
        "city": "Krong Khemara Phoumin",
        "name": "Koh Kong Airport",
        "country": "Cambodia"
    },
    {
        "key": "KLB",
        "city": "Kalabo, Zambia",
        "name": "Kalabo Airport",
        "country": "Zambia"
    },
    {
        "key": "KLC",
        "city": "Kaolack",
        "name": "Kaolack Airport",
        "country": "Senegal"
    },
    {
        "key": "LGF",
        "city": "Yuma",
        "name": "Laguna AAF",
        "country": "United States"
    },
    {
        "key": "LGG",
        "city": "Liege",
        "name": "Bierset Airport",
        "country": "Belgium"
    },
    {
        "key": "LGH",
        "city": "Leigh Creek",
        "name": "Leigh Creek Airport",
        "country": "Australia"
    },
    {
        "key": "LGI",
        "city": "Deadmans Cay",
        "name": "Deadmans Cay Arpt",
        "country": "Bahamas"
    },
    {
        "key": "LGK",
        "city": "Langkawi",
        "name": "Langkawi Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LGL",
        "city": "Long Lellang",
        "name": "Long Lellang Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LGN",
        "city": "Linga Linga",
        "name": "Linga Linga Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "LGP",
        "city": "Legaspi",
        "name": "Legaspi Arpt",
        "country": "Philippines"
    },
    {
        "key": "LGQ",
        "city": "Nueva Loja",
        "name": "Lago Agrio Airport",
        "country": "Ecuador"
    },
    {
        "key": "LGR",
        "city": "Cochrane",
        "name": "Cochrane Airfield",
        "country": "Chile"
    },
    {
        "key": "LGT",
        "city": "Tijuana",
        "name": "Las Gaviotas Airport",
        "country": "Mexico"
    },
    {
        "key": "LGU",
        "city": "Logan",
        "name": "Logan Arpt",
        "country": "United States"
    },
    {
        "key": "LGW",
        "city": "London",
        "name": "Gatwick Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LGX",
        "city": "Lugh Ganane",
        "name": "Lugh Ganane Airport",
        "country": "Somalia"
    },
    {
        "key": "LHA",
        "city": "Lahr",
        "name": "Lahr Arpt",
        "country": "Germany"
    },
    {
        "key": "LHE",
        "city": "Lahore",
        "name": "Lahore Arpt",
        "country": "Pakistan"
    },
    {
        "key": "LHG",
        "city": "Lightning Ridge",
        "name": "Lightning Ridge Arpt",
        "country": "Australia"
    },
    {
        "key": "LHI",
        "city": "Lereh",
        "name": "Lereh Airport",
        "country": "Indonesia"
    },
    {
        "key": "LHK",
        "city": "Laohekou, Hubei",
        "name": "Laohekou Airport",
        "country": "China"
    },
    {
        "key": "LHP",
        "city": "Lehu",
        "name": "Lehu Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "LHR",
        "city": "London",
        "name": "Heathrow",
        "country": "United Kingdom"
    },
    {
        "key": "LHU",
        "city": "Lianshulu",
        "name": "Lianshulu Airport",
        "country": "Namibia"
    },
    {
        "key": "LIA",
        "city": "Lianping",
        "name": "Lianping Arpt",
        "country": "China"
    },
    {
        "key": "LIC",
        "city": "Limon",
        "name": "Limon Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "LIE",
        "city": "Libenge",
        "name": "Libenge Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "LIF",
        "city": "Lifou",
        "name": "Lifou Arpt",
        "country": "New Caledonia"
    },
    {
        "key": "LIG",
        "city": "Limoges",
        "name": "Bellegarde Arpt",
        "country": "France"
    },
    {
        "key": "LIH",
        "city": "Lihue",
        "name": "Lihue Municipal",
        "country": "United States"
    },
    {
        "key": "LIK",
        "city": "Likiep Atoll, Marshall Islands",
        "name": "Likiep Airport",
        "country": "Marshall Islands"
    },
    {
        "key": "LIL",
        "city": "Lille",
        "name": "Lesquin Arpt",
        "country": "France"
    },
    {
        "key": "LIM",
        "city": "Lima",
        "name": "Jorge Chavez International Arpt",
        "country": "Peru"
    },
    {
        "key": "LIN",
        "city": "Milan",
        "name": "Linate Arpt",
        "country": "Italy"
    },
    {
        "key": "LIO",
        "city": "Limon",
        "name": "Limon Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "LIQ",
        "city": "Lisala",
        "name": "Lisala Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "LIR",
        "city": "Liberia",
        "name": "Liberia Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "LIS",
        "city": "Lisbon",
        "name": "Lisboa",
        "country": "Portugal"
    },
    {
        "key": "LIT",
        "city": "Little Rock",
        "name": "Little Rock Regional",
        "country": "United States"
    },
    {
        "key": "LIV",
        "city": "Livengood",
        "name": "Livengood Arpt",
        "country": "United States"
    },
    {
        "key": "LIW",
        "city": "Loikaw",
        "name": "Loikaw Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "LIX",
        "city": "Likoma",
        "name": "Likoma Airport",
        "country": "Malawi"
    },
    {
        "key": "LIY",
        "city": "Hinesville",
        "name": "MidCoast Regional Airport at Wright Army Airfield (FAA: LHW)",
        "country": "United States"
    },
    {
        "key": "LJG",
        "city": "Lijiang City",
        "name": "Lijiang Arpt",
        "country": "China"
    },
    {
        "key": "LJN",
        "city": "Lake Jackson",
        "name": "Lake Jackson Arpt",
        "country": "United States"
    },
    {
        "key": "LJU",
        "city": "Ljubljana",
        "name": "Brnik Airport",
        "country": "Slovenia"
    },
    {
        "key": "LKA",
        "city": "Larantuka, Indonesia",
        "name": "Gewayantana Airport",
        "country": "Indonesia"
    },
    {
        "key": "LKB",
        "city": "Lakeba Island, Fiji",
        "name": "Lakeba Airport",
        "country": "Fiji"
    },
    {
        "key": "LKD",
        "city": "Rossville",
        "name": "Lakeland Downs Airport",
        "country": "Australia"
    },
    {
        "key": "LKE",
        "city": "Seattle",
        "name": "Lake Union Seaplane Base",
        "country": "United States"
    },
    {
        "key": "LKG",
        "city": "Lokichoggio",
        "name": "Lokichoggio Arpt",
        "country": "Kenya"
    },
    {
        "key": "LKH",
        "city": "Long Akah",
        "name": "Long Akah Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LKI",
        "city": "Duluth",
        "name": "Lakeside USAF",
        "country": "United States"
    },
    {
        "key": "LKL",
        "city": "Lakselv",
        "name": "Banak Airport",
        "country": "Norway"
    },
    {
        "key": "LKN",
        "city": "Leknes",
        "name": "Leknes Arpt",
        "country": "Norway"
    },
    {
        "key": "LKO",
        "city": "Lucknow",
        "name": "Amausi Arpt",
        "country": "India"
    },
    {
        "key": "LKP",
        "city": "Lake Placid",
        "name": "Lake Placid Airport",
        "country": "United States"
    },
    {
        "key": "LKR",
        "city": "Las Khorey (Laasqoray)",
        "name": "Las Khorey Airport",
        "country": "Somalia"
    },
    {
        "key": "KLV",
        "city": "Karlovy Vary",
        "name": "Karlovy Vary Arpt",
        "country": "Czech Republic"
    },
    {
        "key": "LKU",
        "city": "Lake Rudolf",
        "name": "Lake Rudolf Airport",
        "country": "Kenya"
    },
    {
        "key": "KLW",
        "city": "Klawock",
        "name": "Klawock Arpt",
        "country": "United States"
    },
    {
        "key": "LKV",
        "city": "Leadville",
        "name": "Lake County Airport",
        "country": "United States"
    },
    {
        "key": "KLX",
        "city": "Kalamata",
        "name": "Kalamata Airport",
        "country": "Greece"
    },
    {
        "key": "LKY",
        "city": "Karatu",
        "name": "Lake Manyara Airport",
        "country": "Tanzania"
    },
    {
        "key": "KMA",
        "city": "Kerema",
        "name": "Kerema Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KMB",
        "city": "Koinambe",
        "name": "Koinambe Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "LKZ",
        "city": "Lakenheath",
        "name": "RAF Lakenheath",
        "country": "United Kingdom"
    },
    {
        "key": "KMC",
        "city": "King Khalid Military City",
        "name": "King Khalid Military Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "LLA",
        "city": "Lulea",
        "name": "Kallax Airport",
        "country": "Sweden"
    },
    {
        "key": "KME",
        "city": "Cyangugu",
        "name": "Kamembe Airport",
        "country": "Rwanda"
    },
    {
        "key": "KMG",
        "city": "Kunming",
        "name": "Kunming Airport",
        "country": "China"
    },
    {
        "key": "LLB",
        "city": "Qiannan",
        "name": "Libo Airport",
        "country": "China"
    },
    {
        "key": "KMH",
        "city": "Kuruman",
        "name": "Kuruman Arpt",
        "country": "South Africa"
    },
    {
        "key": "LLE",
        "city": "Malelane",
        "name": "Municipal Arpt",
        "country": "South Africa"
    },
    {
        "key": "KMI",
        "city": "Miyazaki",
        "name": "Miyazaki Arpt",
        "country": "Japan"
    },
    {
        "key": "KMJ",
        "city": "Kumamoto",
        "name": "Kumamoto Airport",
        "country": "Japan"
    },
    {
        "key": "NJK",
        "city": "El Centro",
        "name": "El Centro Naval Air Facility",
        "country": "United States"
    },
    {
        "key": "NKC",
        "city": "Nouakchott",
        "name": "Nouakchott Arpt",
        "country": "Mauritania"
    },
    {
        "key": "NKG",
        "city": "Nanjing",
        "name": "Nanjing Arpt",
        "country": "China"
    },
    {
        "key": "NKL",
        "city": "Kolo Fuma",
        "name": "NkoloFuma Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "NKM",
        "city": "Nagoya",
        "name": "Nagoya Komaki Arpt",
        "country": "Japan"
    },
    {
        "key": "NKO",
        "city": "Ankokoambo",
        "name": "Ankokoambo Airport",
        "country": "Madagascar"
    },
    {
        "key": "NKX",
        "city": "San Diego",
        "name": "San Diego Miramar Naval Air Station",
        "country": "United States"
    },
    {
        "key": "NLA",
        "city": "N Dola",
        "name": "Ndola Arpt",
        "country": "Zambia"
    },
    {
        "key": "NLC",
        "city": "Lemoore",
        "name": "Nas Reeves Field",
        "country": "United States"
    },
    {
        "key": "NLD",
        "city": "Nuevo Laredo",
        "name": "Quetzalcoatl Intl",
        "country": "Mexico"
    },
    {
        "key": "NLG",
        "city": "Nelson Lagoon",
        "name": "Nelson Lagoon Arpt",
        "country": "United States"
    },
    {
        "key": "NLK",
        "city": "Norfolk Island",
        "name": "Norfolk Island Intl Arpt",
        "country": "Norfolk Island"
    },
    {
        "key": "NLL",
        "city": "Nullagine",
        "name": "Nullagine Airport",
        "country": "Australia"
    },
    {
        "key": "NLO",
        "city": "Kinshasa",
        "name": "N Dolo Airport",
        "country": "Congo"
    },
    {
        "key": "NLP",
        "city": "Nelspruit",
        "name": "Nelspruit Airport",
        "country": "South Africa"
    },
    {
        "key": "NLT",
        "city": "Ili",
        "name": "Xinyuan Nalati Airport",
        "country": "China"
    },
    {
        "key": "NLU",
        "city": "Mexico City",
        "name": "Santa Lucia Arpt",
        "country": "Mexico"
    },
    {
        "key": "NLV",
        "city": "Balovne",
        "name": "Mykolaiv International Airport",
        "country": "Ukraine"
    },
    {
        "key": "NMA",
        "city": "Namangan",
        "name": "Namangan Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "NMB",
        "city": "Daman",
        "name": "Daman Airport",
        "country": "India"
    },
    {
        "key": "NMN",
        "city": "Nomane, Papua New Guinea",
        "name": "Nomane Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "NNA",
        "city": "Kenitra",
        "name": "Kenitra Air Base",
        "country": "Morocco"
    },
    {
        "key": "NNG",
        "city": "Nanning",
        "name": "Nanning Arpt",
        "country": "China"
    },
    {
        "key": "NNL",
        "city": "Nondalton",
        "name": "Nondalton Arpt",
        "country": "United States"
    },
    {
        "key": "NNM",
        "city": "Naryan-Mar",
        "name": "Naryan-Mar",
        "country": "Russia"
    },
    {
        "key": "NNR",
        "city": "Spiddal",
        "name": "Connemara Arpt",
        "country": "Ireland"
    },
    {
        "key": "NNT",
        "city": "Nan Th",
        "name": "Nan Arpt",
        "country": "Thailand"
    },
    {
        "key": "NNU",
        "city": "Nanuque, Minas Gerais, Brazil",
        "name": "Nanuque Airport",
        "country": "Brazil"
    },
    {
        "key": "NNY",
        "city": "Nanyang",
        "name": "Nanyang Airport",
        "country": "China"
    },
    {
        "key": "NOA",
        "city": "Nowra",
        "name": "Nowra Arpt",
        "country": "Australia"
    },
    {
        "key": "NOB",
        "city": "Nosara",
        "name": "Nosara Airport",
        "country": "Costa Rica"
    },
    {
        "key": "NOC",
        "city": "Knock",
        "name": "Knock International",
        "country": "Ireland"
    },
    {
        "key": "NOD",
        "city": "Norden",
        "name": "Norddeich Airport",
        "country": "Germany"
    },
    {
        "key": "NOG",
        "city": "Nogales",
        "name": "Nogales Arpt",
        "country": "Mexico"
    },
    {
        "key": "NOJ",
        "city": "Nojabrxsk",
        "name": "Nojabrxsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NON",
        "city": "Nonouti, Kiribati",
        "name": "Nonouti Airport",
        "country": "Kiribati"
    },
    {
        "key": "NOP",
        "city": "SINOP",
        "name": "Sinop Arpt",
        "country": "Turkey"
    },
    {
        "key": "NOR",
        "city": "Neskaupstadur",
        "name": "NorÃ°fjÃ¶rÃ°ur Airport",
        "country": "Iceland"
    },
    {
        "key": "NOS",
        "city": "Nossi Be",
        "name": "Fascene Arpt",
        "country": "Madagascar"
    },
    {
        "key": "NOT",
        "city": "Novato",
        "name": "Novato Arpt",
        "country": "United States"
    },
    {
        "key": "NOU",
        "city": "Noumea",
        "name": "Tontouta Arpt",
        "country": "New Caledonia"
    },
    {
        "key": "NOV",
        "city": "Huambo",
        "name": "Albano Machado Airport",
        "country": "Angola"
    },
    {
        "key": "NOZ",
        "city": "Novokuznetsk",
        "name": "Novokuznetsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NPA",
        "city": "Pensacola",
        "name": "Pensacola Naval Air Station",
        "country": "United States"
    },
    {
        "key": "NPE",
        "city": "Napier Hastings",
        "name": "Hawkes Bay Arpt",
        "country": "New Zealand"
    },
    {
        "key": "NPG",
        "city": "Nipa",
        "name": "Nipa Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "NPH",
        "city": "Nephi",
        "name": "Nephi Municipal Airport (FAA: U14)",
        "country": "United States"
    },
    {
        "key": "NPL",
        "city": "New Plymouth",
        "name": "New Plymouth Arpt",
        "country": "New Zealand"
    },
    {
        "key": "NPO",
        "city": "Nanga Pinoh, Indonesia",
        "name": "Nanga Pinoh Airport",
        "country": "Indonesia"
    },
    {
        "key": "NPT",
        "city": "Newport",
        "name": "Newport State Arpt",
        "country": "United States"
    },
    {
        "key": "NPU",
        "city": "San Pedro de UrabÃ¡",
        "name": "San Pedro de UrabÃ¡ Airport",
        "country": "Colombia"
    },
    {
        "key": "NQA",
        "city": "Memphis",
        "name": "Memphis Naval Air Station",
        "country": "United States"
    },
    {
        "key": "NQI",
        "city": "Kingsville",
        "name": "Naval Air Station Arpt",
        "country": "United States"
    },
    {
        "key": "NQN",
        "city": "Neuquen",
        "name": "Neuquen Airport",
        "country": "Argentina"
    },
    {
        "key": "NQT",
        "city": "Nottingham Uk",
        "name": "Nottingham Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "NQU",
        "city": "Nuqui",
        "name": "Nuqui Arpt",
        "country": "Colombia"
    },
    {
        "key": "DMS",
        "city": "Dammam",
        "name": "SABTCO BUS STATION",
        "country": "Saudi Arabia"
    },
    {
        "key": "DMU",
        "city": "Dimapur",
        "name": "Dimapur Airport",
        "country": "India"
    },
    {
        "key": "NQX",
        "city": "Key West",
        "name": "Key West Naval Air Station Arpt",
        "country": "United States"
    },
    {
        "key": "DNA",
        "city": "Okinawa",
        "name": "Kadena AFB",
        "country": "Japan"
    },
    {
        "key": "DNB",
        "city": "Maramie",
        "name": "Dunbar Airport",
        "country": "Australia"
    },
    {
        "key": "NQY",
        "city": "Newquay",
        "name": "Newquay Civil Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "DND",
        "city": "Dundee",
        "name": "Riverside Park Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "DNE",
        "city": "Dallas",
        "name": "Dallas North Airport",
        "country": "United States"
    },
    {
        "key": "NRA",
        "city": "Narrandera",
        "name": "Narrandera Arpt",
        "country": "Australia"
    },
    {
        "key": "DNF",
        "city": "Darnah",
        "name": "Martuba",
        "country": "Libya"
    },
    {
        "key": "NRE",
        "city": "Namrole, Indonesia",
        "name": "Namrole Airport",
        "country": "Indonesia"
    },
    {
        "key": "DNG",
        "city": "Butuan City",
        "name": "Doongan Airport",
        "country": "Philippines"
    },
    {
        "key": "NRK",
        "city": "Norrkoping",
        "name": "Kungsangen Arpt",
        "country": "Sweden"
    },
    {
        "key": "DNH",
        "city": "Dunhuang",
        "name": "Dunhuang Arpt",
        "country": "China"
    },
    {
        "key": "DNI",
        "city": "Wad Madani, Sudan",
        "name": "Wad Medani Airport",
        "country": "Sudan"
    },
    {
        "key": "NRL",
        "city": "North Ronaldsay",
        "name": "North Ronaldsay Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "PMQ",
        "city": "Perito Moreno, Santa Cruz, Argentina",
        "name": "Perito Moreno Airport",
        "country": "Argentina"
    },
    {
        "key": "PMR",
        "city": "Palmerston",
        "name": "Palmerston North Arpt",
        "country": "New Zealand"
    },
    {
        "key": "PMS",
        "city": "Palmyra",
        "name": "Palmyra Airport",
        "country": "Syria"
    },
    {
        "key": "PMT",
        "city": "Paramakatoi",
        "name": "Paramakatoi Airstrip",
        "country": "Guyana"
    },
    {
        "key": "PMU",
        "city": "Paimiut",
        "name": "Sea Plane Base Airport",
        "country": "United States"
    },
    {
        "key": "PMV",
        "city": "Porlamar",
        "name": "Delcaribe Gen S Marino Arpt",
        "country": "Venezuela"
    },
    {
        "key": "PMW",
        "city": "Palmas",
        "name": "Palmas Arpt",
        "country": "Brazil"
    },
    {
        "key": "PMX",
        "city": "Palmer, Massachusetts",
        "name": "Metropolitan Airport (FAA: 13MA)",
        "country": "United States"
    },
    {
        "key": "PMY",
        "city": "Puerto Madryn",
        "name": "El Tehuelche Arpt",
        "country": "Argentina"
    },
    {
        "key": "PMZ",
        "city": "Palmar Sur",
        "name": "Palmar Sur Airport",
        "country": "Costa Rica"
    },
    {
        "key": "PNA",
        "city": "Pamplona",
        "name": "Pamplona Noain Arpt",
        "country": "Spain"
    },
    {
        "key": "PNB",
        "city": "Porto Nacional, Tocantins, Brazil",
        "name": "Porto Nacional Airport",
        "country": "Brazil"
    },
    {
        "key": "PNC",
        "city": "Ponca City",
        "name": "Ponca City Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "PND",
        "city": "Punta Gorda",
        "name": "Punta Gorda Airport",
        "country": "United States"
    },
    {
        "key": "PNE",
        "city": "Philadelphia",
        "name": "N Philadelphia",
        "country": "United States"
    },
    {
        "key": "PNG",
        "city": "Paranagua",
        "name": "Paranagua Municipal",
        "country": "Brazil"
    },
    {
        "key": "PNH",
        "city": "Phnom Penh",
        "name": "Phnom Penh Intl Arpt",
        "country": "Cambodia"
    },
    {
        "key": "PNI",
        "city": "Pohnpei",
        "name": "Pohnpei Arpt",
        "country": "Micronesia"
    },
    {
        "key": "PNJ",
        "city": "Penglai",
        "name": "Sha He Kou Arpt",
        "country": "China"
    },
    {
        "key": "PNK",
        "city": "Pontianak",
        "name": "Supadio Arpt",
        "country": "Indonesia"
    },
    {
        "key": "PNL",
        "city": "Pantelleria",
        "name": "Pantelleria Airport",
        "country": "Italy"
    },
    {
        "key": "PNN",
        "city": "Princeton",
        "name": "Princeton",
        "country": "United States"
    },
    {
        "key": "PNP",
        "city": "Popondetta",
        "name": "Girua Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "PNQ",
        "city": "Pune",
        "name": "Lohegaon Arpt",
        "country": "India"
    },
    {
        "key": "PNR",
        "city": "Pointe Noire",
        "name": "Pointe Noire Arpt",
        "country": "Congo"
    },
    {
        "key": "PNS",
        "city": "Pensacola",
        "name": "Pensacola Regional Municipal",
        "country": "United States"
    },
    {
        "key": "PNT",
        "city": "Puerto Natales",
        "name": "Teniente Julio Gallardo Arpt",
        "country": "Chile"
    },
    {
        "key": "PNU",
        "city": "Panguitch",
        "name": "Panguitch",
        "country": "United States"
    },
    {
        "key": "PNX",
        "city": "Sherman",
        "name": "Grayson County Arpt",
        "country": "United States"
    },
    {
        "key": "PNY",
        "city": "Pondicherry",
        "name": "Pondicherry Airport",
        "country": "India"
    },
    {
        "key": "PNZ",
        "city": "Petrolina",
        "name": "Petrolina Internacional Arpt",
        "country": "Brazil"
    },
    {
        "key": "POA",
        "city": "Porto Alegre",
        "name": "Porto Alegre Airport",
        "country": "Brazil"
    },
    {
        "key": "POB",
        "city": "Fayetteville",
        "name": "Pope Airforce Base",
        "country": "United States"
    },
    {
        "key": "POC",
        "city": "La Verne",
        "name": "Brackett Field",
        "country": "United States"
    },
    {
        "key": "POE",
        "city": "Fort Polk",
        "name": "Fort Polk Arpt",
        "country": "United States"
    },
    {
        "key": "POF",
        "city": "Poplar Bluff",
        "name": "Earl Fields Memorial",
        "country": "United States"
    },
    {
        "key": "POG",
        "city": "Port Gentil",
        "name": "Port Gentil Arpt",
        "country": "Gabon"
    },
    {
        "key": "POH",
        "city": "Pocahontas",
        "name": "Pocahontas Municipal Airport",
        "country": "United States"
    },
    {
        "key": "POI",
        "city": "Potosi",
        "name": "Potosi Airport",
        "country": "Bolivia"
    },
    {
        "key": "POJ",
        "city": "Patos de Minas, Minas Gerais, Brazil",
        "name": "Pedro Pereira dos Santos Airport",
        "country": "Brazil"
    },
    {
        "key": "POL",
        "city": "Pemba",
        "name": "Pemba Arpt",
        "country": "Mozambique"
    },
    {
        "key": "POM",
        "city": "Port Moresby",
        "name": "Jackson Field",
        "country": "Papua New Guinea"
    },
    {
        "key": "PON",
        "city": "PoptÃºn",
        "name": "PoptÃºn Airport",
        "country": "Guatemala"
    },
    {
        "key": "POO",
        "city": "PoÃ§os de Caldas, Minas Gerais, Brazil",
        "name": "PoÃ§os de Caldas Airport",
        "country": "Brazil"
    },
    {
        "key": "POP",
        "city": "Puerto Plata",
        "name": "La Union Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "POQ",
        "city": "Polk Inlet",
        "name": "Polk Inlet Arpt",
        "country": "United States"
    },
    {
        "key": "POR",
        "city": "Pori",
        "name": "Pori Airport",
        "country": "Finland"
    },
    {
        "key": "POS",
        "city": "Port Of Spain",
        "name": "Piarco Arpt",
        "country": "Trinidad and Tobago"
    },
    {
        "key": "POT",
        "city": "Saint Margarets Bay",
        "name": "Ken Jones Aerodrome",
        "country": "Jamaica"
    },
    {
        "key": "POU",
        "city": "Poughkeepsie",
        "name": "Dutchess County",
        "country": "United States"
    },
    {
        "key": "POV",
        "city": "PreÅ¡ov, Slovakia",
        "name": "PreÅ¡ov Air Base",
        "country": "Slovakia"
    },
    {
        "key": "GZT",
        "city": "Gaziantep",
        "name": "Gaziantep Arpt",
        "country": "Turkey"
    },
    {
        "key": "POW",
        "city": "Portoroz",
        "name": "Portoroz Airport",
        "country": "Slovenia"
    },
    {
        "key": "GZW",
        "city": "Qazvin",
        "name": "Qazvin Airport[2]",
        "country": "Iran"
    },
    {
        "key": "POX",
        "city": "Pontoise",
        "name": "Cormeille En Vexin",
        "country": "France"
    },
    {
        "key": "HAB",
        "city": "Hamilton",
        "name": "Marion County",
        "country": "United States"
    },
    {
        "key": "POZ",
        "city": "Poznan",
        "name": "Lawica Arpt",
        "country": "Poland"
    },
    {
        "key": "HAC",
        "city": "Hachijo Jima",
        "name": "Hachijo Jima Arpt",
        "country": "Japan"
    },
    {
        "key": "PPA",
        "city": "Pampa",
        "name": "Perry Lefors Field",
        "country": "United States"
    },
    {
        "key": "HAD",
        "city": "Halmstad",
        "name": "Halmstad Arpt",
        "country": "Sweden"
    },
    {
        "key": "PPB",
        "city": "Presidente Prudente",
        "name": "A De Barros",
        "country": "Brazil"
    },
    {
        "key": "HAE",
        "city": "HAVASUPAI",
        "name": "HAVASUPAI ARPT",
        "country": "United States"
    },
    {
        "key": "PPE",
        "city": "Puerto Penasco",
        "name": "Puerto Penasco Municipal",
        "country": "Mexico"
    },
    {
        "key": "HAF",
        "city": "Half Moon Bay",
        "name": "Half Moon Bay Arpt",
        "country": "United States"
    },
    {
        "key": "PPF",
        "city": "Blountville",
        "name": "Tri-City Airport",
        "country": "United States"
    },
    {
        "key": "HAH",
        "city": "Moroni",
        "name": "Prince Said Ibrahim In",
        "country": "Comoros"
    },
    {
        "key": "PPG",
        "city": "Pago Pago",
        "name": "Pago Pago Arpt",
        "country": "American Samoa"
    },
    {
        "key": "HAJ",
        "city": "Hanover",
        "name": "Hanover Arpt",
        "country": "Germany"
    },
    {
        "key": "PPI",
        "city": "Port Pirie",
        "name": "Port Porie Arpt",
        "country": "Australia"
    },
    {
        "key": "HAK",
        "city": "Haikou",
        "name": "Haikou Arpt",
        "country": "China"
    },
    {
        "key": "PPJ",
        "city": "Panjang Island",
        "name": "Panjang Island Airport",
        "country": "Indonesia"
    },
    {
        "key": "EIN",
        "city": "Eindhoven",
        "name": "Welschap Arpt",
        "country": "Netherlands"
    },
    {
        "key": "EIS",
        "city": "Beef Island",
        "name": "Beef Island Arpt",
        "country": "Virgin Islands"
    },
    {
        "key": "EIY",
        "city": "Ein Yahav, Israel",
        "name": "Ein Yahav Airfield",
        "country": "Israel"
    },
    {
        "key": "EJA",
        "city": "Barrancabermeja",
        "name": "Variguies Arpt",
        "country": "Colombia"
    },
    {
        "key": "EJH",
        "city": "Al Wajh",
        "name": "Al Wajh Domestic Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "EKA",
        "city": "Eureka",
        "name": "Eureka Murray Field",
        "country": "United States"
    },
    {
        "key": "EKD",
        "city": "Davenport",
        "name": "Elkedra Airport",
        "country": "Australia"
    },
    {
        "key": "EKI",
        "city": "Elkhart",
        "name": "Elkhart Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "EKN",
        "city": "Elkins",
        "name": "Randolph County Arpt",
        "country": "United States"
    },
    {
        "key": "EKO",
        "city": "Elko",
        "name": "J C Harris Field",
        "country": "United States"
    },
    {
        "key": "EKT",
        "city": "Eskilstuna",
        "name": "Eskilstuna Arpt",
        "country": "Sweden"
    },
    {
        "key": "EKX",
        "city": "Elizabethtown",
        "name": "Addington Field",
        "country": "United States"
    },
    {
        "key": "ELA",
        "city": "Eagle Lake",
        "name": "Eagle Lake Airport",
        "country": "United States"
    },
    {
        "key": "ELD",
        "city": "El Dorado",
        "name": "Goodwin Field",
        "country": "United States"
    },
    {
        "key": "ELH",
        "city": "North Eleuthera",
        "name": "North Eleuthera Intl",
        "country": "Bahamas"
    },
    {
        "key": "ELK",
        "city": "Elk City",
        "name": "Elk City Municipal",
        "country": "United States"
    },
    {
        "key": "ELM",
        "city": "Elmira",
        "name": "Elmira Corning Regional Arpt",
        "country": "United States"
    },
    {
        "key": "ELN",
        "city": "Ellensburg",
        "name": "Bowers Field",
        "country": "United States"
    },
    {
        "key": "ELO",
        "city": "Eldorado, Misiones, Argentina",
        "name": "Eldorado Airport",
        "country": "Colombia"
    },
    {
        "key": "ELP",
        "city": "El Paso",
        "name": "El Paso Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ELQ",
        "city": "Gassim",
        "name": "Gassim Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "ELS",
        "city": "East London",
        "name": "East London Arpt",
        "country": "South Africa"
    },
    {
        "key": "ELT",
        "city": "El Tor, Egypt",
        "name": "El Tor Airport",
        "country": "Egypt"
    },
    {
        "key": "ELU",
        "city": "Guemar",
        "name": "Guemar Airport",
        "country": "Algeria"
    },
    {
        "key": "ELV",
        "city": "Elfin Cove",
        "name": "Elfin Cove Seaplane Base",
        "country": "United States"
    },
    {
        "key": "ELW",
        "city": "Ellamar",
        "name": "Ellamar Arpt",
        "country": "United States"
    },
    {
        "key": "ELY",
        "city": "Ely NV",
        "name": "Yelland Field",
        "country": "United States"
    },
    {
        "key": "ELZ",
        "city": "Wellsville",
        "name": "Wellsville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "EMA",
        "city": "Nottingham Uk",
        "name": "East Midlands Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "EMB",
        "city": "San Francisco",
        "name": "Embarcadero",
        "country": "United States"
    },
    {
        "key": "EMD",
        "city": "Emerald",
        "name": "Emerald Arpt",
        "country": "Australia"
    },
    {
        "key": "EME",
        "city": "Emden",
        "name": "Emden Arpt",
        "country": "Germany"
    },
    {
        "key": "EMG",
        "city": "Empangeni, South Africa",
        "name": "Empangeni Airport",
        "country": "South Africa"
    },
    {
        "key": "EMI",
        "city": "Kavieng",
        "name": "Emirau Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "EML",
        "city": "Emmen",
        "name": "Emmen Air Base",
        "country": "Switzerland"
    },
    {
        "key": "EMN",
        "city": "NÃ©ma, Mauritania",
        "name": "NÃ©ma Airport",
        "country": "Mauritania"
    },
    {
        "key": "EMP",
        "city": "Emporia",
        "name": "EMPORIA MUNICIPAL AIRPORT",
        "country": "United States"
    },
    {
        "key": "EMT",
        "city": "El Monte",
        "name": "El Monte Arpt",
        "country": "United States"
    },
    {
        "key": "ENA",
        "city": "Kenai",
        "name": "Kenai Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ENB",
        "city": "Eneabba",
        "name": "Eneabba Airport",
        "country": "Australia"
    },
    {
        "key": "ENC",
        "city": "Nancy",
        "name": "Essey Airport",
        "country": "France"
    },
    {
        "key": "END",
        "city": "Enid",
        "name": "Vance Airforce Base",
        "country": "United States"
    },
    {
        "key": "ENE",
        "city": "Ende, Indonesia",
        "name": "H. Hasan Aroeboesman Airport",
        "country": "Indonesia"
    },
    {
        "key": "ENF",
        "city": "EnontekiÃ¶",
        "name": "EnontekiÃ¶ Airport",
        "country": "Finland"
    },
    {
        "key": "ENH",
        "city": "Enshi",
        "name": "Xujiaping",
        "country": "China"
    },
    {
        "key": "ENI",
        "city": "El Nido",
        "name": "El Nido Airport",
        "country": "Philippines"
    },
    {
        "key": "ENK",
        "city": "Enniskillen",
        "name": "St Angelo Arpt",
        "country": "Ireland"
    },
    {
        "key": "ENL",
        "city": "Centralia",
        "name": "Centralia Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ENS",
        "city": "Enschede",
        "name": "Twente Airport",
        "country": "Netherlands"
    },
    {
        "key": "ENT",
        "city": "Enewetak, Marshall Islands",
        "name": "Enewetak Auxiliary Airfield",
        "country": "Marshall Islands"
    },
    {
        "key": "ENU",
        "city": "Enugu",
        "name": "Emene Airport",
        "country": "Nigeria"
    },
    {
        "key": "ENV",
        "city": "Wendover",
        "name": "Wendover Arpt",
        "country": "United States"
    },
    {
        "key": "ENW",
        "city": "Kenosha",
        "name": "Kenosha Regional Airport",
        "country": "United States"
    },
    {
        "key": "ENY",
        "city": "Shaanxi",
        "name": "Yanan Ershilipu Airport",
        "country": "China"
    },
    {
        "key": "EOH",
        "city": "Medellin",
        "name": "Enrique Olaya Herrara",
        "country": "Colombia"
    },
    {
        "key": "EOI",
        "city": "Eday",
        "name": "Eday Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "BLM",
        "city": "Wall Township",
        "name": "Monmouth Executive Airport",
        "country": "United States"
    },
    {
        "key": "EOK",
        "city": "Keokuk",
        "name": "Keokuk Arpt",
        "country": "United States"
    },
    {
        "key": "BLN",
        "city": "Benalla",
        "name": "Benalla Airport",
        "country": "Australia"
    },
    {
        "key": "EOR",
        "city": "El Dorado, Venezuela",
        "name": "El Dorado Airport",
        "country": "Colombia"
    },
    {
        "key": "BLP",
        "city": "Bellavista",
        "name": "Huallaga Airport",
        "country": "Peru"
    },
    {
        "key": "EOZ",
        "city": "Elorza",
        "name": "Elorza Airport",
        "country": "Venezuela"
    },
    {
        "key": "BLQ",
        "city": "Bologna",
        "name": "Guglielmo Marconi",
        "country": "Italy"
    },
    {
        "key": "EPA",
        "city": "El Palomar",
        "name": "El Palomar Airport",
        "country": "Argentina"
    },
    {
        "key": "BLR",
        "city": "Bengaluru",
        "name": "Bengaluru intl arpt",
        "country": "India"
    },
    {
        "key": "EPL",
        "city": "Epinal",
        "name": "Mirecourt Arpt",
        "country": "France"
    },
    {
        "key": "BLS",
        "city": "Bollon",
        "name": "Bollon Airport",
        "country": "Australia"
    },
    {
        "key": "EPR",
        "city": "Esperance",
        "name": "Esperance Arpt",
        "country": "Australia"
    },
    {
        "key": "BLT",
        "city": "Blackwater",
        "name": "Blackwater Arpt",
        "country": "Australia"
    },
    {
        "key": "EPS",
        "city": "El Portillo Samana",
        "name": "El Portillo Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "BLU",
        "city": "Blue Canyon",
        "name": "Blue Canyon Arpt",
        "country": "United States"
    },
    {
        "key": "BLV",
        "city": "Belleville",
        "name": "Scott AFB Mid America",
        "country": "United States"
    },
    {
        "key": "LLF",
        "city": "Ling Ling",
        "name": "Ling Ling Arpt",
        "country": "China"
    },
    {
        "key": "LLG",
        "city": "Chillagoe",
        "name": "Chillagoe Airport",
        "country": "Australia"
    },
    {
        "key": "LLH",
        "city": "Las Limas",
        "name": "Las Limas Airport",
        "country": "Honduras"
    },
    {
        "key": "LLI",
        "city": "Lalibela, Ethiopia",
        "name": "Lalibela Airport",
        "country": "Ethiopia"
    },
    {
        "key": "LLK",
        "city": "Lankaran",
        "name": "Lankaran Intl Arpt",
        "country": "Azerbaijan"
    },
    {
        "key": "LLN",
        "city": "Kelila",
        "name": "Kelila Airport",
        "country": "Indonesia"
    },
    {
        "key": "LLU",
        "city": "Alluitsup Paa",
        "name": "Alluitsup Paa Arpt",
        "country": "Greenland"
    },
    {
        "key": "LLW",
        "city": "Lilongwe",
        "name": "Lilongwe Intl Arpt",
        "country": "Malawi"
    },
    {
        "key": "LLX",
        "city": "Lyndon",
        "name": "Caledonia County Airport (FAA: CDA)",
        "country": "United States"
    },
    {
        "key": "LLY",
        "city": "Mount Holly",
        "name": "Burlington Country Arpt",
        "country": "United States"
    },
    {
        "key": "LMB",
        "city": "Salima",
        "name": "Salima Arpt",
        "country": "Malawi"
    },
    {
        "key": "LMC",
        "city": "Lamacarena",
        "name": "Lamacarena Arpt",
        "country": "Colombia"
    },
    {
        "key": "LMD",
        "city": "Los Menucos, RÃ­o Negro, Argentina",
        "name": "Los Menucos Airport",
        "country": "Argentina"
    },
    {
        "key": "LME",
        "city": "Le Mans",
        "name": "Arnage Arpt",
        "country": "France"
    },
    {
        "key": "LML",
        "city": "Nadzab",
        "name": "Lae Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "LMM",
        "city": "Los Mochis",
        "name": "Federal Los Mochis Arpt",
        "country": "Mexico"
    },
    {
        "key": "LMN",
        "city": "Limbang",
        "name": "Limbang Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LMO",
        "city": "Lossiemouth, Scotland, United Kingdom",
        "name": "RAF Lossiemouth",
        "country": "United Kingdom"
    },
    {
        "key": "LMP",
        "city": "Lampedusa",
        "name": "Lampedusa Arpt",
        "country": "Italy"
    },
    {
        "key": "LMQ",
        "city": "Ajdabiya",
        "name": "Marsa Brega Airport",
        "country": "Libya"
    },
    {
        "key": "LMS",
        "city": "Louisville",
        "name": "Louisville Winston County Arpt",
        "country": "United States"
    },
    {
        "key": "LMT",
        "city": "Klamath Falls",
        "name": "Kingsley Field",
        "country": "United States"
    },
    {
        "key": "LMZ",
        "city": "Palma",
        "name": "Palma Airport",
        "country": "Spain"
    },
    {
        "key": "LNA",
        "city": "West Palm Beach",
        "name": "Palm Beach County Arpt",
        "country": "United States"
    },
    {
        "key": "LND",
        "city": "Lander",
        "name": "Hunt Field",
        "country": "United States"
    },
    {
        "key": "LNE",
        "city": "Lonorore",
        "name": "Lonorore Airport",
        "country": "Vanuatu"
    },
    {
        "key": "LNF",
        "city": "Munbil",
        "name": "Munbil Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "LNI",
        "city": "Lonely",
        "name": "Point Lonely Short Range Radar Site",
        "country": "United States"
    },
    {
        "key": "LNJ",
        "city": "LINCANG",
        "name": "Lincang Airport",
        "country": "China"
    },
    {
        "key": "LNK",
        "city": "Lincoln",
        "name": "Lincoln Municipal",
        "country": "United States"
    },
    {
        "key": "LNO",
        "city": "Leonora",
        "name": "Leonora Arpt",
        "country": "Australia"
    },
    {
        "key": "LNP",
        "city": "Wise",
        "name": "Lonesome Pine Airport",
        "country": "United States"
    },
    {
        "key": "LNS",
        "city": "Lancaster",
        "name": "Lancaster Arpt",
        "country": "United States"
    },
    {
        "key": "LNV",
        "city": "Lihir Island",
        "name": "Lihir Island Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "LNX",
        "city": "Smolensk",
        "name": "Smolensk South Airport",
        "country": "Russia"
    },
    {
        "key": "LNY",
        "city": "Lanai",
        "name": "Lanai Airport",
        "country": "United States"
    },
    {
        "key": "LNZ",
        "city": "Linz",
        "name": "Hoersching Arpt",
        "country": "Austria"
    },
    {
        "key": "LOA",
        "city": "Goin",
        "name": "Lorraine Airport",
        "country": "France"
    },
    {
        "key": "LOB",
        "city": "San Rafael",
        "name": "San Rafael Airport",
        "country": "United States"
    },
    {
        "key": "LOC",
        "city": "Lock",
        "name": "Lock Airport",
        "country": "Australia"
    },
    {
        "key": "LOD",
        "city": "Longana, Aoba Island, Penama Province",
        "name": "Longana Airport",
        "country": "Vanuatu"
    },
    {
        "key": "LOE",
        "city": "Loei",
        "name": "Loei Arpt",
        "country": "Thailand"
    },
    {
        "key": "LOH",
        "city": "Loja",
        "name": "Aeropuerto Camilo Enriquez",
        "country": "Ecuador"
    },
    {
        "key": "LOK",
        "city": "Lodwar",
        "name": "Lodwar Airport",
        "country": "Kenya"
    },
    {
        "key": "LOL",
        "city": "Lovelock, Nevada",
        "name": "Derby Field",
        "country": "United States"
    },
    {
        "key": "LOM",
        "city": "Lagos De Moreno",
        "name": "Francisco P V Y R",
        "country": "Mexico"
    },
    {
        "key": "LOO",
        "city": "Laghouat",
        "name": "L Mekrareg Airport (Laghouat Airport)",
        "country": "Algeria"
    },
    {
        "key": "LOP",
        "city": "Praya",
        "name": "Lombok International Airport",
        "country": "Indonesia"
    },
    {
        "key": "LOR",
        "city": "OZARK",
        "name": "Lowe Army Heliport",
        "country": "United States"
    },
    {
        "key": "LOS",
        "city": "Lagos",
        "name": "Murtala Muhammed Arpt",
        "country": "Nigeria"
    },
    {
        "key": "LOT",
        "city": "Lockport",
        "name": "Lewis Lockport",
        "country": "United States"
    },
    {
        "key": "LOU",
        "city": "Louisville",
        "name": "Bowman Field Arpt",
        "country": "United States"
    },
    {
        "key": "LOV",
        "city": "Monclova",
        "name": "Monclova Arpt",
        "country": "Mexico"
    },
    {
        "key": "LOW",
        "city": "Louisa",
        "name": "Louisa County Airport (Freeman Field) (FAA: LKU)",
        "country": "United States"
    },
    {
        "key": "LOY",
        "city": "Loyangalani",
        "name": "Loyangalani Airport",
        "country": "Kenya"
    },
    {
        "key": "LOZ",
        "city": "London",
        "name": "Corbin London Arpt",
        "country": "United States"
    },
    {
        "key": "LPA",
        "city": "Gran Canaria",
        "name": "Aeropuerto De Gran Canaria",
        "country": "Spain"
    },
    {
        "key": "LPB",
        "city": "La Paz",
        "name": "El Alto Arpt",
        "country": "Bolivia"
    },
    {
        "key": "LPC",
        "city": "Santa Maria",
        "name": "Lompoc Arpt",
        "country": "United States"
    },
    {
        "key": "LPD",
        "city": "La Pedrera",
        "name": "La Pedrera Arpt",
        "country": "Colombia"
    },
    {
        "key": "LPG",
        "city": "La Plata",
        "name": "La Plata Arpt",
        "country": "Argentina"
    },
    {
        "key": "LPI",
        "city": "Linkoping",
        "name": "Saab Airport",
        "country": "Sweden"
    },
    {
        "key": "LPK",
        "city": "Lipetsk",
        "name": "Lipetsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "LPL",
        "city": "Liverpool",
        "name": "Liverpool Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LPO",
        "city": "La Porte",
        "name": "La Porte Arpt",
        "country": "United States"
    },
    {
        "key": "LPP",
        "city": "Lappeenranta",
        "name": "Lappeenranta Arpt",
        "country": "Finland"
    },
    {
        "key": "LPQ",
        "city": "Louangphrabang",
        "name": "Louangphrabang Arpt",
        "country": "Lao Peoples Democratic Republic"
    },
    {
        "key": "LPS",
        "city": "Lopez Island",
        "name": "Lopez Island Arpt",
        "country": "United States"
    },
    {
        "key": "LPT",
        "city": "Lampang",
        "name": "Lampang Arpt",
        "country": "Thailand"
    },
    {
        "key": "LPW",
        "city": "Little Port Walter",
        "name": "Little Port Walter Arpt",
        "country": "United States"
    },
    {
        "key": "LPX",
        "city": "Liepaja",
        "name": "Liepaya Arpt",
        "country": "Latvia"
    },
    {
        "key": "LPY",
        "city": "Le Puy",
        "name": "Loudes Airport",
        "country": "France"
    },
    {
        "key": "KMK",
        "city": "Makabana",
        "name": "Makabana Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "KML",
        "city": "Four Ways",
        "name": "Kamileroi Airport",
        "country": "Australia"
    },
    {
        "key": "KMM",
        "city": "Kimam",
        "name": "Kimam Airport",
        "country": "Indonesia"
    },
    {
        "key": "KMQ",
        "city": "Komatsu",
        "name": "Komatsu Airport",
        "country": "Japan"
    },
    {
        "key": "KMR",
        "city": "Karimui, Papua New Guinea",
        "name": "Karimui Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KMS",
        "city": "Kumasi",
        "name": "Kumasiairport",
        "country": "Ghana"
    },
    {
        "key": "KMV",
        "city": "Kale",
        "name": "Kalaymyo Airport (Kalemyo Airport)",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "KMW",
        "city": "Kostroma",
        "name": "Kostroma Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "KMX",
        "city": "Khamis Mushait",
        "name": "Khamis Mushait Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "KMZ",
        "city": "Kaoma",
        "name": "Kaoma Airport",
        "country": "Zambia"
    },
    {
        "key": "KNA",
        "city": "Vina Del Mar",
        "name": "Vina Del Mar Arpt",
        "country": "Chile"
    },
    {
        "key": "KNB",
        "city": "Kanab",
        "name": "Kanab Municipal",
        "country": "United States"
    },
    {
        "key": "KND",
        "city": "Kindu",
        "name": "Kindu Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "KNE",
        "city": "Kanainj",
        "name": "Kanainj Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "KNF",
        "city": "Kings Lynn",
        "name": "Marham Raf",
        "country": "United Kingdom"
    },
    {
        "key": "KNG",
        "city": "Kaimana, Indonesia",
        "name": "Kaimana Airport",
        "country": "Indonesia"
    },
    {
        "key": "KNH",
        "city": "Kinmen",
        "name": "Shang Yi Arpt",
        "country": "Taiwan"
    },
    {
        "key": "KNI",
        "city": "Ewlyamartup",
        "name": "Katanning Airport",
        "country": "Australia"
    },
    {
        "key": "OAG",
        "city": "Orange",
        "name": "Springhill Arpt",
        "country": "Australia"
    },
    {
        "key": "OAI",
        "city": "Bagram",
        "name": "Bagram Airfield",
        "country": "Afghanistan"
    },
    {
        "key": "OAJ",
        "city": "Jacksonville",
        "name": "Albert J Ellis",
        "country": "United States"
    },
    {
        "key": "OAK",
        "city": "Oakland",
        "name": "Metro Oakland Intl Arpt",
        "country": "United States"
    },
    {
        "key": "OAL",
        "city": "Cacoal",
        "name": "Cacoal Arpt",
        "country": "Brazil"
    },
    {
        "key": "OAM",
        "city": "Oamaru",
        "name": "Oamaru Airport",
        "country": "New Zealand"
    },
    {
        "key": "OAR",
        "city": "Monterey",
        "name": "Fritzsche Army Air Field",
        "country": "United States"
    },
    {
        "key": "OAX",
        "city": "Oaxaca",
        "name": "Xoxocotlan Arpt",
        "country": "Mexico"
    },
    {
        "key": "OAZ",
        "city": "Girishk (Gereshk)",
        "name": "Camp Bastion Air Base",
        "country": "Afghanistan"
    },
    {
        "key": "OBE",
        "city": "Okeechobee",
        "name": "Okeechobee County Arpt",
        "country": "United States"
    },
    {
        "key": "AOI",
        "city": "Ancona",
        "name": "Falconara Arpt",
        "country": "Italy"
    },
    {
        "key": "AOJ",
        "city": "Aomori",
        "name": "Aomori Arpt",
        "country": "Japan"
    },
    {
        "key": "OBF",
        "city": "WeÃŸling",
        "name": "Oberpfaffenhofen Airport",
        "country": "Germany"
    },
    {
        "key": "OBN",
        "city": "Oban",
        "name": "Connel Airport",
        "country": "United Kingdom"
    },
    {
        "key": "OBO",
        "city": "Obihiro",
        "name": "Obihiro Arpt",
        "country": "Japan"
    },
    {
        "key": "AOK",
        "city": "Karpathos",
        "name": "Karpathos Arpt",
        "country": "Greece"
    },
    {
        "key": "OBS",
        "city": "Aubenas",
        "name": "Vals Lanas Arpt",
        "country": "France"
    },
    {
        "key": "AOL",
        "city": "Paso De Los Libres",
        "name": "Paso De Los Libres Arpt",
        "country": "Argentina"
    },
    {
        "key": "OBT",
        "city": "OAKLAND",
        "name": "Oakland Coliseum Street",
        "country": "United States"
    },
    {
        "key": "AOM",
        "city": "Adam, Oman",
        "name": "Adam Airport",
        "country": "Oman"
    },
    {
        "key": "OCA",
        "city": "Ocean Reef",
        "name": "Ocean Reef Arpt",
        "country": "United States"
    },
    {
        "key": "AOO",
        "city": "Altoona",
        "name": "Blair Cty Arpt",
        "country": "United States"
    },
    {
        "key": "OCC",
        "city": "Coca",
        "name": "Aeropuerto Francisco De Orellana",
        "country": "Ecuador"
    },
    {
        "key": "AOP",
        "city": "Andoas, Peru",
        "name": "AlfÃ©rez FAP Alfredo Vladimir Sara Bauer Airport",
        "country": "Peru"
    },
    {
        "key": "OCE",
        "city": "Ocean City",
        "name": "Ocean City Airport",
        "country": "United States"
    },
    {
        "key": "AOR",
        "city": "Alor Setar",
        "name": "Sultan Abdul Hamlin Arpt",
        "country": "Malaysia"
    },
    {
        "key": "OCF",
        "city": "Ocala",
        "name": "Taylor Field Arpt",
        "country": "United States"
    },
    {
        "key": "AOT",
        "city": "Aosta",
        "name": "Corrado Gex Arpt",
        "country": "Italy"
    },
    {
        "key": "OCH",
        "city": "Nacogdoches",
        "name": "Al Mangham Jr Regional Arpt",
        "country": "United States"
    },
    {
        "key": "APA",
        "city": "Denver",
        "name": "Centennial Arpt",
        "country": "United States"
    },
    {
        "key": "OCJ",
        "city": "Ocho Rios",
        "name": "Boscobel Arpt",
        "country": "Jamaica"
    },
    {
        "key": "APB",
        "city": "Apolo",
        "name": "Apolo Airport",
        "country": "Bolivia"
    },
    {
        "key": "OCN",
        "city": "Oceanside",
        "name": "Oceanside Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "OCV",
        "city": "Ocana",
        "name": "Aguasclaras Arpt",
        "country": "Colombia"
    },
    {
        "key": "APC",
        "city": "Napa",
        "name": "Napa Cty Arpt",
        "country": "United States"
    },
    {
        "key": "APF",
        "city": "Naples",
        "name": "Naples Municipal",
        "country": "United States"
    },
    {
        "key": "OCW",
        "city": "Washington",
        "name": "Washington Warren Airport (Warren Field)",
        "country": "United States"
    },
    {
        "key": "APG",
        "city": "Baltimore",
        "name": "Phillips Army Air Field",
        "country": "United States"
    },
    {
        "key": "ODB",
        "city": "Cordoba",
        "name": "Cordoba Airport",
        "country": "Spain"
    },
    {
        "key": "APH",
        "city": "Fort A.P. Hill",
        "name": "A.P. Hill Army Airfield",
        "country": "United States"
    },
    {
        "key": "ODD",
        "city": "Oodnadatta",
        "name": "Oodnadatta",
        "country": "Australia"
    },
    {
        "key": "APK",
        "city": "Apataki, Tuamotus, French Polynesia",
        "name": "Apataki Airport",
        "country": "French Polynesia"
    },
    {
        "key": "ODE",
        "city": "Odense",
        "name": "Odense Airport",
        "country": "Denmark"
    },
    {
        "key": "APL",
        "city": "Nampula",
        "name": "Nampula Arpt",
        "country": "Mozambique"
    },
    {
        "key": "ODH",
        "city": "Odiham",
        "name": "RAF Odiham",
        "country": "United Kingdom"
    },
    {
        "key": "ODN",
        "city": "Long Seridan",
        "name": "Long Seridan Arpt",
        "country": "Malaysia"
    },
    {
        "key": "APN",
        "city": "Alpena",
        "name": "Phelps Collins Arpt",
        "country": "United States"
    },
    {
        "key": "APO",
        "city": "Apartado",
        "name": "Apartado Arpt",
        "country": "Colombia"
    },
    {
        "key": "ODO",
        "city": "Bodaybo",
        "name": "Bodaybo Airport",
        "country": "Russia"
    },
    {
        "key": "APP",
        "city": "Asapa",
        "name": "Asapa Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ODS",
        "city": "Odessa",
        "name": "Central Arpt",
        "country": "Ukraine"
    },
    {
        "key": "APR",
        "city": "April River",
        "name": "April River Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ODW",
        "city": "Oak Harbor",
        "name": "Oak Harbour Municipal",
        "country": "United States"
    },
    {
        "key": "OEA",
        "city": "Vincennes",
        "name": "Oneal Arpt",
        "country": "United States"
    },
    {
        "key": "DNK",
        "city": "Dnepropetrovsk",
        "name": "Dnepropetrovsk Arpt",
        "country": "Ukraine"
    },
    {
        "key": "DNL",
        "city": "Augusta",
        "name": "Daniel Airport",
        "country": "United States"
    },
    {
        "key": "DNM",
        "city": "Denham",
        "name": "Denham Arpt",
        "country": "Australia"
    },
    {
        "key": "DNN",
        "city": "Dalton",
        "name": "Dalton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "DNP",
        "city": "Tulsipur",
        "name": "Tribhuvannagar Airport (Dang Airport)",
        "country": "Nepal"
    },
    {
        "key": "DNQ",
        "city": "Deniliquin",
        "name": "Denilinquin Arpt",
        "country": "Australia"
    },
    {
        "key": "DNR",
        "city": "Dinard",
        "name": "Pleurtuit Arpt",
        "country": "France"
    },
    {
        "key": "DNS",
        "city": "Denison",
        "name": "Denison Municipal Airport",
        "country": "United States"
    },
    {
        "key": "DNV",
        "city": "Danville",
        "name": "Vermillion Cty",
        "country": "United States"
    },
    {
        "key": "DNZ",
        "city": "Denizli",
        "name": "Cardak Arpt",
        "country": "Turkey"
    },
    {
        "key": "DOB",
        "city": "Dobo, Indonesia",
        "name": "Dobo Airport",
        "country": "Indonesia"
    },
    {
        "key": "DOC",
        "city": "Dornoch",
        "name": "Dornoch Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "DOD",
        "city": "Dodoma",
        "name": "Dodoma Airport",
        "country": "Tanzania"
    },
    {
        "key": "DOF",
        "city": "Dora Bay",
        "name": "Dora Bay Arpt",
        "country": "United States"
    },
    {
        "key": "DOH",
        "city": "Doha",
        "name": "Hamad international airport",
        "country": "Qatar"
    },
    {
        "key": "DOK",
        "city": "Donetsk",
        "name": "Donetsk Arpt",
        "country": "Ukraine"
    },
    {
        "key": "DOL",
        "city": "Deauville",
        "name": "Saint Gatien Arpt",
        "country": "France"
    },
    {
        "key": "DOM",
        "city": "Dominica",
        "name": "Melville Hall Arpt",
        "country": "Dominica"
    },
    {
        "key": "DOP",
        "city": "Juphal",
        "name": "Dolpa Airport",
        "country": "Nepal"
    },
    {
        "key": "DOR",
        "city": "Dori",
        "name": "Dori Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "DOU",
        "city": "Dourados",
        "name": "Dourados Airport",
        "country": "Brazil"
    },
    {
        "key": "DOV",
        "city": "Dover",
        "name": "Dover AFB",
        "country": "United States"
    },
    {
        "key": "DOX",
        "city": "Dongara",
        "name": "Dongara",
        "country": "Australia"
    },
    {
        "key": "DOY",
        "city": "Dongying",
        "name": "Dongying Airport",
        "country": "China"
    },
    {
        "key": "DPA",
        "city": "Chicago",
        "name": "Dupage County Arpt",
        "country": "United States"
    },
    {
        "key": "DPE",
        "city": "Dieppe",
        "name": "Dieppe Arpt",
        "country": "France"
    },
    {
        "key": "DPG",
        "city": "Dugway Proving Ground",
        "name": "Michael Army Airfield",
        "country": "United States"
    },
    {
        "key": "DPL",
        "city": "Dipolog",
        "name": "Dipolog Arpt",
        "country": "Philippines"
    },
    {
        "key": "DPO",
        "city": "Devonport",
        "name": "Devonport Arpt",
        "country": "Australia"
    },
    {
        "key": "DPS",
        "city": "Denpasar Bali",
        "name": "Ngurah Rai Arpt",
        "country": "Indonesia"
    },
    {
        "key": "DQA",
        "city": "Daqing",
        "name": "Saertu Airport",
        "country": "China"
    },
    {
        "key": "DRB",
        "city": "Derby",
        "name": "Derby Airport",
        "country": "Australia"
    },
    {
        "key": "DRD",
        "city": "Dorunda Station",
        "name": "Dorunda Station Airport",
        "country": "Australia"
    },
    {
        "key": "DRF",
        "city": "Drift River",
        "name": "Drift River Arpt",
        "country": "United States"
    },
    {
        "key": "DRG",
        "city": "Deering",
        "name": "Deering Airport (FAA: DEE)",
        "country": "United States"
    },
    {
        "key": "DRH",
        "city": "Dabra, Indonesia",
        "name": "Dabra Airport",
        "country": "Indonesia"
    },
    {
        "key": "DRI",
        "city": "DeRidder",
        "name": "Beauregard Regional Airport",
        "country": "United States"
    },
    {
        "key": "DRK",
        "city": "Drake Bay, Costa Rica",
        "name": "Drake Bay Airport",
        "country": "Costa Rica"
    },
    {
        "key": "DRN",
        "city": "Dirranbandi",
        "name": "Dirranbandi Arpt",
        "country": "Australia"
    },
    {
        "key": "DRO",
        "city": "Durango",
        "name": "Durango La Plata Cty Arpt",
        "country": "United States"
    },
    {
        "key": "DRR",
        "city": "Birdsville",
        "name": "Durrie Airport",
        "country": "Australia"
    },
    {
        "key": "DRS",
        "city": "Dresden",
        "name": "Dresden Arpt",
        "country": "Germany"
    },
    {
        "key": "DRT",
        "city": "Del Rio",
        "name": "International Del Rio",
        "country": "United States"
    },
    {
        "key": "DRU",
        "city": "Drummond, Montana",
        "name": "Drummond Airport (FAA: M26)",
        "country": "United States"
    },
    {
        "key": "DRV",
        "city": "Dharavandhoo Island",
        "name": "Dharavandhoo AIrport",
        "country": "Maldives"
    },
    {
        "key": "DRW",
        "city": "Darwin",
        "name": "Darwin Airport",
        "country": "Australia"
    },
    {
        "key": "DSA",
        "city": "Doncaster",
        "name": "Finningley Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "DSD",
        "city": "La Desirade",
        "name": "La Desirade Arpt",
        "country": "Guadeloupe"
    },
    {
        "key": "DSE",
        "city": "Dese",
        "name": "Combolcha",
        "country": "Ethiopia"
    },
    {
        "key": "FAJ",
        "city": "Fajardo",
        "name": "Fajardo Arpt",
        "country": "United States"
    },
    {
        "key": "FAK",
        "city": "False Island",
        "name": "False Island Arpt",
        "country": "United States"
    },
    {
        "key": "FAO",
        "city": "Faro",
        "name": "Faro Airport",
        "country": "Portugal"
    },
    {
        "key": "FAR",
        "city": "Fargo",
        "name": "Hector Airport",
        "country": "United States"
    },
    {
        "key": "FAT",
        "city": "Fresno",
        "name": "Fresno Air Terminal",
        "country": "United States"
    },
    {
        "key": "FAU",
        "city": "Fahud",
        "name": "Fahud Airport",
        "country": "Oman"
    },
    {
        "key": "FAV",
        "city": "Fakarava, Tuamotus, French Polynesia",
        "name": "Fakarava Airport",
        "country": "French Polynesia"
    },
    {
        "key": "FAY",
        "city": "Fayetteville",
        "name": "Fayetteville Municipal",
        "country": "United States"
    },
    {
        "key": "FAZ",
        "city": "Fasa",
        "name": "Fasa Airport",
        "country": "Iran"
    },
    {
        "key": "FBD",
        "city": "Faizabad",
        "name": "Faizabad Arpt",
        "country": "Afghanistan"
    },
    {
        "key": "FBE",
        "city": "Francisco BeltrÃ£o, ParanÃ¡, Brazil",
        "name": "Francisco BeltrÃ£o Airport (Paulo Abdala Airport)",
        "country": "Brazil"
    },
    {
        "key": "FBK",
        "city": "Fairbanks",
        "name": "Ft Wainwright Arpt",
        "country": "United States"
    },
    {
        "key": "HII",
        "city": "Lake Havasu Cty",
        "name": "Lake Havasu City Municipal Airport",
        "country": "United States"
    },
    {
        "key": "FBM",
        "city": "Lubumbashi",
        "name": "Luano",
        "country": "Congo"
    },
    {
        "key": "HIJ",
        "city": "Hiroshima",
        "name": "Hiroshima Airport",
        "country": "Japan"
    },
    {
        "key": "FBR",
        "city": "Lyman",
        "name": "Fort Bridger Airport",
        "country": "United States"
    },
    {
        "key": "HIK",
        "city": "Honolulu",
        "name": "Hickam Air Force Base",
        "country": "United States"
    },
    {
        "key": "FCA",
        "city": "Kalispell",
        "name": "Glacier Park Intl",
        "country": "United States"
    },
    {
        "key": "HIN",
        "city": "Chinju",
        "name": "Sacheon Arpt",
        "country": "Korea"
    },
    {
        "key": "FCB",
        "city": "Ficksburg",
        "name": "Ficksburg Sentra Oes",
        "country": "South Africa"
    },
    {
        "key": "HIO",
        "city": "Hillsboro",
        "name": "Portland Hillsboro Arpt",
        "country": "United States"
    },
    {
        "key": "FCH",
        "city": "Fresno",
        "name": "Fresno Chandler Arpt",
        "country": "United States"
    },
    {
        "key": "HIR",
        "city": "Honiara",
        "name": "Henderson Intl Arpt",
        "country": "Solomon Islands"
    },
    {
        "key": "NRM",
        "city": "Nara",
        "name": "Keibane Airport",
        "country": "Mali"
    },
    {
        "key": "NRN",
        "city": "Dusseldorf",
        "name": "Niederrhein Arpt",
        "country": "Germany"
    },
    {
        "key": "NRR",
        "city": "Ceiba",
        "name": "JosÃ© Aponte de la Torre Airport (FAA: RVR)",
        "country": "Puerto Rico"
    },
    {
        "key": "NRS",
        "city": "Imperial Beach",
        "name": "Naval Air Station Airport",
        "country": "United States"
    },
    {
        "key": "NRT",
        "city": "Tokyo",
        "name": "Narita",
        "country": "Japan"
    },
    {
        "key": "NRY",
        "city": "Newry Station, Northern Territory, Australia",
        "name": "Newry Airport",
        "country": "United Kingdom"
    },
    {
        "key": "NSB",
        "city": "Bimini",
        "name": "North Seaplane Base",
        "country": "Bahamas"
    },
    {
        "key": "NSE",
        "city": "Milton",
        "name": "Whiting Field Nas",
        "country": "United States"
    },
    {
        "key": "NSF",
        "city": "Camp Springs",
        "name": "Camp Springs Andrew Air Force Base",
        "country": "United States"
    },
    {
        "key": "NSH",
        "city": "Nowshahr",
        "name": "Noshahr Airport",
        "country": "Iran"
    },
    {
        "key": "NSI",
        "city": "Yaounde",
        "name": "Nsimalen Arpt",
        "country": "Cameroon"
    },
    {
        "key": "NSK",
        "city": "Norilsk",
        "name": "Norilsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NSL",
        "city": "Slayton",
        "name": "Slayton Municipal Airport (FAA: DVP)",
        "country": "United States"
    },
    {
        "key": "NSM",
        "city": "Norseman",
        "name": "Norseman Arpt",
        "country": "Australia"
    },
    {
        "key": "NSN",
        "city": "Nelson",
        "name": "Nelson Arpt",
        "country": "New Zealand"
    },
    {
        "key": "NSO",
        "city": "Scone",
        "name": "Scone Airport",
        "country": "Australia"
    },
    {
        "key": "NST",
        "city": "Nakhon Si Thammarat",
        "name": "Nakhon Si Thammarat Arpt",
        "country": "Thailand"
    },
    {
        "key": "NSV",
        "city": "Marcoola",
        "name": "Noosa Airport",
        "country": "Australia"
    },
    {
        "key": "NTB",
        "city": "Notodden",
        "name": "Notodden Arpt",
        "country": "Norway"
    },
    {
        "key": "NTD",
        "city": "Port Hueneme",
        "name": "Point Mugu",
        "country": "United States"
    },
    {
        "key": "NTE",
        "city": "Nantes",
        "name": "Nantes Atlantique",
        "country": "France"
    },
    {
        "key": "NTG",
        "city": "Nantong",
        "name": "Xingdong",
        "country": "China"
    },
    {
        "key": "NTJ",
        "city": "Ephraim",
        "name": "MantiEphraim Airport (FAA: 41U)",
        "country": "United States"
    },
    {
        "key": "NTL",
        "city": "Newcastle",
        "name": "Williamtown Arpt",
        "country": "Australia"
    },
    {
        "key": "NTN",
        "city": "Normanton",
        "name": "Normanton Arpt",
        "country": "Australia"
    },
    {
        "key": "NTO",
        "city": "Santo Antao",
        "name": "Santo Antao Arpt",
        "country": "Cape Verde"
    },
    {
        "key": "NTR",
        "city": "Monterrey",
        "name": "Aeropuerto Del Norte",
        "country": "Mexico"
    },
    {
        "key": "NTT",
        "city": "Niuatoputapu, Tonga",
        "name": "Niuatoputapu Airport",
        "country": "Tonga"
    },
    {
        "key": "NTY",
        "city": "Sun City",
        "name": "Pilansberg Arpt",
        "country": "South Africa"
    },
    {
        "key": "NUA",
        "city": "Nuwara Eliya",
        "name": "Gregorys Lake Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "NUB",
        "city": "Numbulwar",
        "name": "Numbulwar Airport",
        "country": "Australia"
    },
    {
        "key": "NUE",
        "city": "Nuremberg",
        "name": "Nuremberg Arpt",
        "country": "Germany"
    },
    {
        "key": "NUF",
        "city": "Hatton",
        "name": "Castlereigh Reservoir Seaplane Base",
        "country": "Sri Lanka"
    },
    {
        "key": "NUG",
        "city": "Nuguria, Papua New Guinea",
        "name": "Nuguria Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "NUL",
        "city": "Nulato",
        "name": "Nulato Arpt",
        "country": "United States"
    },
    {
        "key": "NUN",
        "city": "Pensacola",
        "name": "Saufley Field Naval Outlying Field",
        "country": "United States"
    },
    {
        "key": "NUP",
        "city": "Kasigluk",
        "name": "Nunapitchuk Airport (FAA: 16A)",
        "country": "United States"
    },
    {
        "key": "NUQ",
        "city": "Mountain View",
        "name": "Moffett Field",
        "country": "United States"
    },
    {
        "key": "NUR",
        "city": "Nullarbor",
        "name": "Nullarbor Arpt",
        "country": "Australia"
    },
    {
        "key": "NUS",
        "city": "Norsup",
        "name": "Norsup Airport",
        "country": "Vanuatu"
    },
    {
        "key": "NUU",
        "city": "Nakuru",
        "name": "Nakuru Airport",
        "country": "Kenya"
    },
    {
        "key": "NUW",
        "city": "Oak Harbor",
        "name": "NAS Whidbey Island (Ault Field)",
        "country": "United States"
    },
    {
        "key": "NUX",
        "city": "Novy Urengoy",
        "name": "Novy Urengoy Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NVA",
        "city": "Neiva",
        "name": "Aeropuerto Benito Sales",
        "country": "Colombia"
    },
    {
        "key": "NVD",
        "city": "Nevada",
        "name": "Nevada Municipal Airport",
        "country": "United States"
    },
    {
        "key": "NVG",
        "city": "Port Moresby",
        "name": "Nueva Guinea Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "NVI",
        "city": "Navoi",
        "name": "Navoi International Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "NVK",
        "city": "Narvik",
        "name": "Framnes Arpt",
        "country": "Norway"
    },
    {
        "key": "NVP",
        "city": "Novo Aripuana, Amazonas, Brazil",
        "name": "Novo AripuanÃ£ Airport",
        "country": "Brazil"
    },
    {
        "key": "NVS",
        "city": "Nevers",
        "name": "Nevers Arpt",
        "country": "France"
    },
    {
        "key": "NVT",
        "city": "Navegantes",
        "name": "Navegantes Arpt",
        "country": "Brazil"
    },
    {
        "key": "NVY",
        "city": "Neyveli",
        "name": "Neyveli",
        "country": "India"
    },
    {
        "key": "NWA",
        "city": "Moheli",
        "name": "Bandar Es Eslam Airport",
        "country": "Comoros"
    },
    {
        "key": "NWH",
        "city": "Newport",
        "name": "Parlin Field (FAA: 2B3)",
        "country": "United States"
    },
    {
        "key": "NWI",
        "city": "Norwich",
        "name": "Norwich Airport",
        "country": "United Kingdom"
    },
    {
        "key": "NWS",
        "city": "New York",
        "name": "Pier 11 Wall St Seaplane Base",
        "country": "United States"
    },
    {
        "key": "NWU",
        "city": "Bermuda",
        "name": "Bermuda Naval Air Station",
        "country": "Bermuda"
    },
    {
        "key": "NYA",
        "city": "Nyagan",
        "name": "Nyagan Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "NYE",
        "city": "Nyeri",
        "name": "Nyeri Arpt",
        "country": "Kenya"
    },
    {
        "key": "NYG",
        "city": "Quantico",
        "name": "MCAF Quantico (Turner Field)",
        "country": "United States"
    },
    {
        "key": "NYI",
        "city": "Sunyani",
        "name": "Sunyani Airport",
        "country": "Ghana"
    },
    {
        "key": "NYK",
        "city": "Nanyuki",
        "name": "Nanyuki Arpt",
        "country": "Kenya"
    },
    {
        "key": "NYM",
        "city": "Nadym",
        "name": "Nadym Airport",
        "country": "Russia"
    },
    {
        "key": "NYN",
        "city": "Nyngan",
        "name": "Nyngan Arpt",
        "country": "Australia"
    },
    {
        "key": "NYO",
        "city": "Stockholm",
        "name": "Skavsta Airport",
        "country": "Sweden"
    },
    {
        "key": "NYT",
        "city": "(Yelegwe)",
        "name": "Naypyidaw Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "NYU",
        "city": "Nyaung",
        "name": "Nyaung U Arpt",
        "country": "Myanmar"
    },
    {
        "key": "NZE",
        "city": "Nzerekore",
        "name": "Nzerekore Airport",
        "country": "Guinea"
    },
    {
        "key": "NZH",
        "city": "Manzhouli",
        "name": "Manzhouliarpt",
        "country": "China"
    },
    {
        "key": "NZW",
        "city": "South Weymouth",
        "name": "South Weymouth",
        "country": "United States"
    },
    {
        "key": "NZY",
        "city": "San Diego",
        "name": "San Diego North Island Naval Air Station",
        "country": "United States"
    },
    {
        "key": "HHQ",
        "city": "Hua Hin",
        "name": "Hua Hin Arpt",
        "country": "Thailand"
    },
    {
        "key": "EPU",
        "city": "Parnu",
        "name": "Parnu Arpt",
        "country": "Estonia"
    },
    {
        "key": "EQS",
        "city": "Esquel",
        "name": "Esquel Airport",
        "country": "Argentina"
    },
    {
        "key": "ERB",
        "city": "Pukatja",
        "name": "Pukatja Airport (Ernabella Airport",
        "country": "Australia"
    },
    {
        "key": "ERC",
        "city": "Erzincan",
        "name": "Erzincan Arpt",
        "country": "Turkey"
    },
    {
        "key": "ERD",
        "city": "Berdiansk, Ukraine",
        "name": "Berdiansk Airport",
        "country": "Ukraine"
    },
    {
        "key": "ERF",
        "city": "Erfurt",
        "name": "Erfurt Arpt",
        "country": "Germany"
    },
    {
        "key": "ERH",
        "city": "Errachidia",
        "name": "Errachidia Arpt",
        "country": "Morocco"
    },
    {
        "key": "ERI",
        "city": "Erie",
        "name": "Erie Intl",
        "country": "United States"
    },
    {
        "key": "ERM",
        "city": "Erechim",
        "name": "Comandante Kraemer Airport",
        "country": "Brazil"
    },
    {
        "key": "ERN",
        "city": "EirunepÃ©, Amazonas, Brazil",
        "name": "EirunepÃ© Airport (Amaury Feitosa Tomaz Airport)",
        "country": "Brazil"
    },
    {
        "key": "ERO",
        "city": "Eldred Rock",
        "name": "Coast Guard Arpt",
        "country": "United States"
    },
    {
        "key": "ERS",
        "city": "Windhoek",
        "name": "Eros Arpt",
        "country": "Namibia"
    },
    {
        "key": "ERT",
        "city": "Erdenet",
        "name": "Erdenet Airport",
        "country": "Mongolia"
    },
    {
        "key": "ERV",
        "city": "Kerrville",
        "name": "Kerrville Arpt",
        "country": "United States"
    },
    {
        "key": "ERZ",
        "city": "Erzurum",
        "name": "Erzurum Arpt",
        "country": "Turkey"
    },
    {
        "key": "ESB",
        "city": "Ankara",
        "name": "Esenboga Arpt",
        "country": "Turkey"
    },
    {
        "key": "ESC",
        "city": "Escanaba",
        "name": "Delta County",
        "country": "United States"
    },
    {
        "key": "ESD",
        "city": "East Sound",
        "name": "Eastsound Orcas Is Arpt",
        "country": "United States"
    },
    {
        "key": "ESE",
        "city": "Ensenada",
        "name": "Ensenada Arpt",
        "country": "Mexico"
    },
    {
        "key": "ESF",
        "city": "Alexandria",
        "name": "Esler Field",
        "country": "United States"
    },
    {
        "key": "ESG",
        "city": "Mariscal Estigarribia",
        "name": "Dr. Luis MarÃ­a ArgaÃ±a International Airport",
        "country": "Paraguay"
    },
    {
        "key": "ESH",
        "city": "SHOREHAM BY SEA",
        "name": "SHOREHAM ARPT",
        "country": "United Kingdom"
    },
    {
        "key": "ESK",
        "city": "Eskisehir",
        "name": "Eskisehir Arpt",
        "country": "Turkey"
    },
    {
        "key": "ESL",
        "city": "Elista",
        "name": "Elista Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "ESM",
        "city": "Esmeraldas",
        "name": "Carlos Concha Torres International Airport",
        "country": "Ecuador"
    },
    {
        "key": "ESN",
        "city": "Easton",
        "name": "Easton Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ESP",
        "city": "East Stroudsburg",
        "name": "Birchwood Pocono Arpt",
        "country": "United States"
    },
    {
        "key": "ESR",
        "city": "El Salvador",
        "name": "El Salvador Arpt",
        "country": "Chile"
    },
    {
        "key": "ESS",
        "city": "Essen",
        "name": "Essen Arpt",
        "country": "Germany"
    },
    {
        "key": "ESU",
        "city": "Essaouira",
        "name": "Essaouira Arpt",
        "country": "Morocco"
    },
    {
        "key": "ETB",
        "city": "West Bend",
        "name": "West Bend Arpt",
        "country": "United States"
    },
    {
        "key": "ETD",
        "city": "Etadunna",
        "name": "Etadunna Airport",
        "country": "Australia"
    },
    {
        "key": "ETH",
        "city": "Elat",
        "name": "Elat Airport",
        "country": "Israel"
    },
    {
        "key": "ETR",
        "city": "Santa Rosa, Ecuador",
        "name": "Santa Rosa International Airport",
        "country": "Ecuador"
    },
    {
        "key": "ETS",
        "city": "Enterprise",
        "name": "Enterprise Municipal",
        "country": "United States"
    },
    {
        "key": "ETZ",
        "city": "Metz Nancy",
        "name": "Metz Nancy Lorraine",
        "country": "France"
    },
    {
        "key": "EUA",
        "city": "Eua, Tonga",
        "name": "Eua Airport (Kaufana Airport)",
        "country": "Tonga"
    },
    {
        "key": "EUF",
        "city": "Eufaula",
        "name": "Weedon Field",
        "country": "United States"
    },
    {
        "key": "EUG",
        "city": "Eugene",
        "name": "Eugene Arpt",
        "country": "United States"
    },
    {
        "key": "EUM",
        "city": "Neumuenster",
        "name": "Neumuenster Arpt",
        "country": "Germany"
    },
    {
        "key": "EUN",
        "city": "El Aaiun",
        "name": "Hassan I Arpt",
        "country": "Morocco"
    },
    {
        "key": "EUX",
        "city": "St Eustatius",
        "name": "Roosevelt Field",
        "country": "Bonaire"
    },
    {
        "key": "EVE",
        "city": "Harstad Narvik",
        "name": "Evenes Arpt",
        "country": "Norway"
    },
    {
        "key": "EVG",
        "city": "Sveg",
        "name": "Sveg Arpt",
        "country": "Sweden"
    },
    {
        "key": "EVM",
        "city": "Eveleth",
        "name": "Eveleth Virginia Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "EVN",
        "city": "Yerevan",
        "name": "Yerevan Arpt",
        "country": "Armenia"
    },
    {
        "key": "EVV",
        "city": "Evansville",
        "name": "Evansville Regional Arpt",
        "country": "United States"
    },
    {
        "key": "EVW",
        "city": "Evanston",
        "name": "Evanston Arpt",
        "country": "United States"
    },
    {
        "key": "EVX",
        "city": "Evreux",
        "name": "Evreux Arpt",
        "country": "France"
    },
    {
        "key": "EWB",
        "city": "New Bedford",
        "name": "New Bedford Municipal",
        "country": "United States"
    },
    {
        "key": "EWD",
        "city": "Wildman Lake",
        "name": "Wildman Lake Arpt",
        "country": "United States"
    },
    {
        "key": "EWE",
        "city": "Ewer, Indonesia",
        "name": "Ewer Airport",
        "country": "Indonesia"
    },
    {
        "key": "EWK",
        "city": "Newton",
        "name": "Newton City County Arpt",
        "country": "United States"
    },
    {
        "key": "EWN",
        "city": "New Bern",
        "name": "Craven County Regional Arpt",
        "country": "United States"
    },
    {
        "key": "EWR",
        "city": "Newark",
        "name": "Newark Liberty Intl Arpt",
        "country": "United States"
    },
    {
        "key": "EXI",
        "city": "Excursion Inlet",
        "name": "Excursion Inlet Municipal",
        "country": "United States"
    },
    {
        "key": "EXM",
        "city": "Exmouth Gulf",
        "name": "Exmouth Gulf",
        "country": "Australia"
    },
    {
        "key": "EXT",
        "city": "Exeter",
        "name": "Exeter Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "EYK",
        "city": "Beloyarsky",
        "name": "Beloyarsky Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "EYP",
        "city": "El Yopal",
        "name": "El Yopal Arpt",
        "country": "Colombia"
    },
    {
        "key": "EYW",
        "city": "Key West",
        "name": "Key West Intl",
        "country": "United States"
    },
    {
        "key": "EZE",
        "city": "Buenos Aires",
        "name": "Ministro Pistarini",
        "country": "Argentina"
    },
    {
        "key": "EZS",
        "city": "Elazig",
        "name": "Elazig Arpt",
        "country": "Turkey"
    },
    {
        "key": "EZV",
        "city": "BEREZOVO",
        "name": "BEREZOVO AIRPORT",
        "country": "Russian Federation"
    },
    {
        "key": "FAA",
        "city": "Faranah",
        "name": "Faranah Airport",
        "country": "Guinea"
    },
    {
        "key": "FAB",
        "city": "Farnborough Hampshire",
        "name": "Farnborough Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "FAC",
        "city": "Faaite, Tuamotus, French Polynesia",
        "name": "Faaite Airport",
        "country": "French Polynesia"
    },
    {
        "key": "FAE",
        "city": "Faeroe Islands",
        "name": "Faeroe Airport",
        "country": "Denmark"
    },
    {
        "key": "FAF",
        "city": "Newport News",
        "name": "Felker Army Airfield",
        "country": "United States"
    },
    {
        "key": "FAH",
        "city": "Farah, Afghanistan",
        "name": "Farah Airport",
        "country": "Afghanistan"
    },
    {
        "key": "FAI",
        "city": "Fairbanks",
        "name": "Fairbanks Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BLX",
        "city": "Belluno",
        "name": "Belluno Arpt",
        "country": "Italy"
    },
    {
        "key": "BLY",
        "city": "Belmullet, Ireland",
        "name": "Belmullet Aerodrome",
        "country": "Ireland"
    },
    {
        "key": "BLZ",
        "city": "Blantyre",
        "name": "Chileka Airport",
        "country": "Malawi"
    },
    {
        "key": "BMA",
        "city": "Stockholm",
        "name": "Bromma Airport",
        "country": "Sweden"
    },
    {
        "key": "BMB",
        "city": "Bumba,",
        "name": "Bumba Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "BMC",
        "city": "Brigham City",
        "name": "Brigham City Airport",
        "country": "United States"
    },
    {
        "key": "BMD",
        "city": "Belo Tsiribihina",
        "name": "Belo sur Tsiribihina Airport",
        "country": "Madagascar"
    },
    {
        "key": "BME",
        "city": "Broome",
        "name": "Broome Airport",
        "country": "Australia"
    },
    {
        "key": "BMF",
        "city": "Bakouma",
        "name": "Bakouma Airport",
        "country": "Central African Republic"
    },
    {
        "key": "BMG",
        "city": "Bloomington",
        "name": "Monroe Cty Arpt Indiana",
        "country": "United States"
    },
    {
        "key": "BMH",
        "city": "Baramulla",
        "name": "Bomai Airport",
        "country": "India"
    },
    {
        "key": "BMI",
        "city": "Bloomington",
        "name": "Normal Airport",
        "country": "United States"
    },
    {
        "key": "BMJ",
        "city": "Baramita",
        "name": "Baramita Airport",
        "country": "Guyana"
    },
    {
        "key": "BML",
        "city": "Berlin",
        "name": "Berlin Arpt",
        "country": "United States"
    },
    {
        "key": "BMM",
        "city": "Bitam",
        "name": "Bitam",
        "country": "Gabon"
    },
    {
        "key": "BMO",
        "city": "Bhamo",
        "name": "Bhamo Airport",
        "country": "Myanmar"
    },
    {
        "key": "BMP",
        "city": "Brampton Island",
        "name": "Brampton Island Arpt",
        "country": "Australia"
    },
    {
        "key": "BMQ",
        "city": "Mombasa",
        "name": "Bamburi Airport",
        "country": "Kenya"
    },
    {
        "key": "BMR",
        "city": "Baltrum",
        "name": "Baltrum Airport",
        "country": "Germany"
    },
    {
        "key": "BMS",
        "city": "Brumado, Bahia, Brazil",
        "name": "Socrates Mariani Bittencourt Airport",
        "country": "Brazil"
    },
    {
        "key": "BMT",
        "city": "Beaumont",
        "name": "Beaumont Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BMU",
        "city": "Bima",
        "name": "Bima Airport",
        "country": "Indonesia"
    },
    {
        "key": "BMV",
        "city": "Banmethuot",
        "name": "Phung Duc Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "BMW",
        "city": "Bordj Badji Mokhtar",
        "name": "Bordj Mokhtar Airport",
        "country": "Algeria"
    },
    {
        "key": "BNA",
        "city": "Nashville",
        "name": "Nashville International Arpt",
        "country": "United States"
    },
    {
        "key": "BNC",
        "city": "Beni",
        "name": "Beni",
        "country": "Republic of the Congo"
    },
    {
        "key": "BND",
        "city": "Bandar Abbas",
        "name": "Bandar Abbas Intl Airport",
        "country": "Iran"
    },
    {
        "key": "BNE",
        "city": "Brisbane",
        "name": "Brisbane Arpt",
        "country": "Australia"
    },
    {
        "key": "BNF",
        "city": "Baranof",
        "name": "Baranof Arpt",
        "country": "United States"
    },
    {
        "key": "BNG",
        "city": "Banning",
        "name": "Banning Arpt",
        "country": "United States"
    },
    {
        "key": "BNH",
        "city": "Hartford",
        "name": "Barnes Airport",
        "country": "United States"
    },
    {
        "key": "BNI",
        "city": "Benin City",
        "name": "Benin Airport",
        "country": "Nigeria"
    },
    {
        "key": "BNK",
        "city": "Ballina",
        "name": "Ballina Arpt",
        "country": "Australia"
    },
    {
        "key": "BNL",
        "city": "Barnwell",
        "name": "Barnwell Regional Airport",
        "country": "United States"
    },
    {
        "key": "BNN",
        "city": "Bronnoysund",
        "name": "Bronnoy Arpt",
        "country": "Norway"
    },
    {
        "key": "BNO",
        "city": "Burns",
        "name": "Burns Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BNP",
        "city": "Bannu, Pakistan",
        "name": "Bannu Airport",
        "country": "Pakistan"
    },
    {
        "key": "BNR",
        "city": "Banfora",
        "name": "Banfora",
        "country": "Burkina Faso"
    },
    {
        "key": "BNS",
        "city": "Barinas",
        "name": "Barinasairport",
        "country": "Venezuela"
    },
    {
        "key": "BNT",
        "city": "Bundi",
        "name": "Bundi airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BNU",
        "city": "Blumenau",
        "name": "Blumenau Arpt",
        "country": "Brazil"
    },
    {
        "key": "BNX",
        "city": "Banja Luka",
        "name": "Banja Luka Arpt",
        "country": "Bosnia and Herzegovina"
    },
    {
        "key": "BOA",
        "city": "Boma",
        "name": "Boma",
        "country": "Republic of the Congo"
    },
    {
        "key": "BOB",
        "city": "Bora Bora",
        "name": "Motu Mute Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "BOC",
        "city": "Bocas Del Toro",
        "name": "Bocas Del Toro Arpt",
        "country": "Panama"
    },
    {
        "key": "BOD",
        "city": "Bordeaux",
        "name": "Bordeaux Arpt",
        "country": "France"
    },
    {
        "key": "BOE",
        "city": "Boundji",
        "name": "Boundji Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "BOF",
        "city": "Washington",
        "name": "Bolling Airforce Base",
        "country": "United States"
    },
    {
        "key": "BOG",
        "city": "Bogota",
        "name": "Eldorado Airport",
        "country": "Colombia"
    },
    {
        "key": "BOH",
        "city": "Bournemouth",
        "name": "Bournemouth Intl Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "BOI",
        "city": "Boise",
        "name": "Boise Municipal Arpt Gowen Field",
        "country": "United States"
    },
    {
        "key": "BOJ",
        "city": "Bourgas",
        "name": "Bourgas Arpt",
        "country": "Bulgaria"
    },
    {
        "key": "BOK",
        "city": "Brookings",
        "name": "Brookings Airport",
        "country": "United States"
    },
    {
        "key": "BOL",
        "city": "Ballykelly",
        "name": "Ballykelly Airfield (RAF Ballykelly)",
        "country": "United Kingdom"
    },
    {
        "key": "BOM",
        "city": "Mumbai",
        "name": "Chhatrapati shivaji maharaj international airport",
        "country": "India"
    },
    {
        "key": "BON",
        "city": "Bonaire",
        "name": "Flamingo Field",
        "country": "Bonaire"
    },
    {
        "key": "BOO",
        "city": "Bodo",
        "name": "Bodo Arpt",
        "country": "Norway"
    },
    {
        "key": "BOS",
        "city": "Boston",
        "name": "Logan Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BOT",
        "city": "BOSSET",
        "name": "BOSSET AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "BOU",
        "city": "Bourges",
        "name": "Bourges Arpt",
        "country": "France"
    },
    {
        "key": "BOW",
        "city": "Bartow",
        "name": "Bartow Arpt",
        "country": "United States"
    },
    {
        "key": "BOX",
        "city": "Borroloola",
        "name": "Borroloola Arpt",
        "country": "Australia"
    },
    {
        "key": "BOY",
        "city": "Bobo Dioulasso",
        "name": "Borgo Arpt",
        "country": "Burkina Faso"
    },
    {
        "key": "BPB",
        "city": "Boridi",
        "name": "Boridi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BPC",
        "city": "Bamenda, Cameroon",
        "name": "Bamenda Airport",
        "country": "Cameroon"
    },
    {
        "key": "BPD",
        "city": "Bapi",
        "name": "Bapi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BPE",
        "city": "Qinhuangdao",
        "name": "Qinhuangdao Beidaihe Airport",
        "country": "China"
    },
    {
        "key": "BPG",
        "city": "Barra do GarÃ§as, Mato Grosso, Brazil",
        "name": "Barra do GarÃ§as Airport",
        "country": "Brazil"
    },
    {
        "key": "BPL",
        "city": "Bole",
        "name": "Alashankou",
        "country": "China"
    },
    {
        "key": "BPM",
        "city": "Hyderabad",
        "name": "Begumpet Airport",
        "country": "India"
    },
    {
        "key": "BPS",
        "city": "Porto Seguro",
        "name": "Porto Seguro Arpt",
        "country": "Brazil"
    },
    {
        "key": "BPT",
        "city": "Beaumont",
        "name": "Jefferson Cty Arpt",
        "country": "United States"
    },
    {
        "key": "HAL",
        "city": "Halali",
        "name": "Halali Airport",
        "country": "Namibia"
    },
    {
        "key": "HAM",
        "city": "Hamburg",
        "name": "Fuhlsbuettel Arpt",
        "country": "Germany"
    },
    {
        "key": "HAN",
        "city": "Hanoi",
        "name": "Noibai Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "HAO",
        "city": "Hamilton",
        "name": "Butler County Regional Airport",
        "country": "United States"
    },
    {
        "key": "HAP",
        "city": "Long Island",
        "name": "Long Island Arpt",
        "country": "Australia"
    },
    {
        "key": "HAQ",
        "city": "Hanimaadhoo",
        "name": "Hanimaadhoo",
        "country": "Maldives"
    },
    {
        "key": "HAR",
        "city": "Harrisburg",
        "name": "Harrisburg Skyport Airport",
        "country": "United States"
    },
    {
        "key": "HAS",
        "city": "Hail",
        "name": "Hail Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "HAU",
        "city": "Haugesund",
        "name": "Karmoy Arpt",
        "country": "Norway"
    },
    {
        "key": "HAV",
        "city": "Havana",
        "name": "Jose Marti Intl Arpt",
        "country": "Cuba"
    },
    {
        "key": "HAW",
        "city": "Haverfordwest, Wales, United Kingdom",
        "name": "Haverfordwest Aerodrome",
        "country": "United Kingdom"
    },
    {
        "key": "HAY",
        "city": "Haycock",
        "name": "Haycock Arpt",
        "country": "United States"
    },
    {
        "key": "HBA",
        "city": "Hobart",
        "name": "Hobart International Arpt",
        "country": "Australia"
    },
    {
        "key": "HBB",
        "city": "Hobbs",
        "name": "Industrial Airpark Arpt",
        "country": "United States"
    },
    {
        "key": "HBD",
        "city": "Habi",
        "name": "Habi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "HBE",
        "city": "Borg El Arab",
        "name": "Borg El Arab Arpt",
        "country": "Egypt"
    },
    {
        "key": "HBG",
        "city": "Hattiesburg",
        "name": "Bobby L Chain Municipal",
        "country": "United States"
    },
    {
        "key": "HBH",
        "city": "Hobart Bay",
        "name": "Hobart Bay Arpt",
        "country": "United States"
    },
    {
        "key": "HBI",
        "city": "Harbour Island",
        "name": "Harbour Island Arpt",
        "country": "Bahamas"
    },
    {
        "key": "HBT",
        "city": "Hafr Albatin",
        "name": "Hafr Albatin Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "HBU",
        "city": "Khovd",
        "name": "Bulgan Airport, Khovd",
        "country": "Mongolia"
    },
    {
        "key": "HBX",
        "city": "Hubli",
        "name": "Hubli Arpt",
        "country": "India"
    },
    {
        "key": "HCA",
        "city": "BIG SPRING",
        "name": "Howard Arpt",
        "country": "United States"
    },
    {
        "key": "HCC",
        "city": "Ghent",
        "name": "Columbia County Airport (FAA: 1B1)",
        "country": "United States"
    },
    {
        "key": "HCM",
        "city": "Garowe",
        "name": "Eyl Airport",
        "country": "Somalia"
    },
    {
        "key": "HCN",
        "city": "Hengchun",
        "name": "Hengchun Arpt",
        "country": "Taiwan"
    },
    {
        "key": "HCQ",
        "city": "Halls Creek",
        "name": "Halls Creek Arpt",
        "country": "Australia"
    },
    {
        "key": "HDD",
        "city": "Hyderabad",
        "name": "Hyderabad",
        "country": "Pakistan"
    },
    {
        "key": "HDF",
        "city": "Heringsdorf",
        "name": "Heringsdorf Arpt",
        "country": "Germany"
    },
    {
        "key": "HDG",
        "city": "Handan",
        "name": "Hebei Handan",
        "country": "China"
    },
    {
        "key": "HDH",
        "city": "Waialua",
        "name": "Dillingham Airfield",
        "country": "United States"
    },
    {
        "key": "HDM",
        "city": "Hamedan",
        "name": "Hamadan Airport",
        "country": "Iran"
    },
    {
        "key": "HDN",
        "city": "Hayden",
        "name": "Hayden Arpt",
        "country": "United States"
    },
    {
        "key": "HDR",
        "city": "Bandar Abbas",
        "name": "Havadarya Airport",
        "country": "Iran"
    },
    {
        "key": "HDS",
        "city": "Hoedspruit",
        "name": "Hoedspruit Arpt",
        "country": "South Africa"
    },
    {
        "key": "HDY",
        "city": "Hat Yai",
        "name": "Hat Yai Arpt",
        "country": "Thailand"
    },
    {
        "key": "HEA",
        "city": "Herat",
        "name": "Herat Arpt",
        "country": "Afghanistan"
    },
    {
        "key": "HED",
        "city": "Herendeen",
        "name": "Herendeen Arpt",
        "country": "United States"
    },
    {
        "key": "HEE",
        "city": "Helena",
        "name": "Helena Arpt",
        "country": "United States"
    },
    {
        "key": "HEH",
        "city": "Heho",
        "name": "Heho Arpt",
        "country": "Myanmar"
    },
    {
        "key": "HEI",
        "city": "Heide Buesum",
        "name": "Heide Arpt",
        "country": "Germany"
    },
    {
        "key": "HEK",
        "city": "Heihe",
        "name": "Heihe",
        "country": "China"
    },
    {
        "key": "HEL",
        "city": "Helsinki",
        "name": "Helsinki Arpt",
        "country": "Finland"
    },
    {
        "key": "HEM",
        "city": "Helsinki",
        "name": "Helsinki Malmi Arpt",
        "country": "Finland"
    },
    {
        "key": "HEN",
        "city": "Hendon",
        "name": "Hendon",
        "country": "United Kingdom"
    },
    {
        "key": "HEO",
        "city": "Haelogo, Papua New Guinea",
        "name": "Haelogo Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "HER",
        "city": "Heraklion",
        "name": "N Kazantzakis Arpt",
        "country": "Greece"
    },
    {
        "key": "HET",
        "city": "Hohhot",
        "name": "Hohhot Arpt",
        "country": "China"
    },
    {
        "key": "HEY",
        "city": "OZARK",
        "name": "Hanchey Army Heliport",
        "country": "United States"
    },
    {
        "key": "HEZ",
        "city": "Natchez",
        "name": "Natchez Adams Cty",
        "country": "United States"
    },
    {
        "key": "HFA",
        "city": "Haifa",
        "name": "Haifa Arpt",
        "country": "Israel"
    },
    {
        "key": "HFD",
        "city": "Hartford",
        "name": "Brainard Arpt",
        "country": "United States"
    },
    {
        "key": "HFE",
        "city": "Hefei",
        "name": "Hefei Arpt",
        "country": "China"
    },
    {
        "key": "HFF",
        "city": "Hoffman",
        "name": "Mackall Army Airfield",
        "country": "United States"
    },
    {
        "key": "HFN",
        "city": "Hornafjordur",
        "name": "Hornafjordur Arpt",
        "country": "Iceland"
    },
    {
        "key": "HFS",
        "city": "Hagfors, Sweden",
        "name": "Hagfors Airport",
        "country": "Sweden"
    },
    {
        "key": "HFT",
        "city": "Hammerfest",
        "name": "Hammerfest Arpt",
        "country": "Norway"
    },
    {
        "key": "HGA",
        "city": "Hargeisa",
        "name": "Hargeisa Arpt",
        "country": "Somalia"
    },
    {
        "key": "HGD",
        "city": "Hughenden",
        "name": "Hughenden Arpt",
        "country": "Australia"
    },
    {
        "key": "HGH",
        "city": "Hangzhou",
        "name": "Hangzhou Arpt",
        "country": "China"
    },
    {
        "key": "HGL",
        "city": "Helgoland",
        "name": "Helgoland Arpt",
        "country": "Germany"
    },
    {
        "key": "HGN",
        "city": "Mae Hongson",
        "name": "Mae Hong Son Arpt",
        "country": "Thailand"
    },
    {
        "key": "HGO",
        "city": "Bouake",
        "name": "Korhogo Airport",
        "country": "CÃ´te d Ivoire"
    },
    {
        "key": "HGR",
        "city": "Hagerstown",
        "name": "Washington Cty Regional",
        "country": "United States"
    },
    {
        "key": "HGS",
        "city": "Freetown",
        "name": "Hastings Airport",
        "country": "Sierra Leone"
    },
    {
        "key": "HGT",
        "city": "Jolon",
        "name": "Tusi Ahp",
        "country": "United States"
    },
    {
        "key": "HGU",
        "city": "Mt Hagen",
        "name": "Kagamuga Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "HGZ",
        "city": "Hogatza",
        "name": "Hogatza Arpt",
        "country": "United States"
    },
    {
        "key": "HHE",
        "city": "Hachinohe",
        "name": "Hachinohe Arpt",
        "country": "Japan"
    },
    {
        "key": "HHH",
        "city": "Hilton Head",
        "name": "Hilton Head Municipal",
        "country": "United States"
    },
    {
        "key": "HHI",
        "city": "Wheeler Army Airfield",
        "name": "Wheeler Army Airfield",
        "country": "United States"
    },
    {
        "key": "HHN",
        "city": "Frankfurt",
        "name": "Hahn Arpt",
        "country": "Germany"
    },
    {
        "key": "HHP",
        "city": "Hong Kong",
        "name": "Hong Kong Heliport",
        "country": "Hong Kong"
    },
    {
        "key": "PPK",
        "city": "Petropavlovsk",
        "name": "Petropavlovsk Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "PPL",
        "city": "Phaplu",
        "name": "Phaplu Airport",
        "country": "Nepal"
    },
    {
        "key": "PPM",
        "city": "Pompano Beach",
        "name": "Pompano Beach Arpt",
        "country": "United States"
    },
    {
        "key": "PPN",
        "city": "Popayan",
        "name": "Machangara Arpt",
        "country": "Colombia"
    },
    {
        "key": "PPP",
        "city": "Proserpine",
        "name": "Whitsunday Coast Arpt",
        "country": "Australia"
    },
    {
        "key": "PPQ",
        "city": "Paraparaumu",
        "name": "Paraparaumu Arpt",
        "country": "New Zealand"
    },
    {
        "key": "PPR",
        "city": "Pasir Pangaraian (Pasir Pangarayan), Indonesia",
        "name": "Tuanku Tambusai Airport",
        "country": "Indonesia"
    },
    {
        "key": "PPS",
        "city": "Puerto Princesa",
        "name": "Puerto Princesa Arpt",
        "country": "Philippines"
    },
    {
        "key": "PPT",
        "city": "Papeete",
        "name": "Intl Tahiti Faaa",
        "country": "French Polynesia"
    },
    {
        "key": "PPU",
        "city": "Hpa An",
        "name": "Papun Airport",
        "country": "Burma (Myanmar)"
    },
    {
        "key": "PPV",
        "city": "Port Protection",
        "name": "Port Protection Arpt",
        "country": "United States"
    },
    {
        "key": "PPW",
        "city": "Papa Westray",
        "name": "Papa Westray Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "PPX",
        "city": "Param",
        "name": "Param Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "PPZ",
        "city": "Puerto PÃ¡ez",
        "name": "Puerto PÃ¡ez Airport",
        "country": "Venezuela"
    },
    {
        "key": "PQC",
        "city": "Phu Quoc",
        "name": "Duong Dang Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "PQI",
        "city": "Presque Isle",
        "name": "Northern Maine Regional",
        "country": "United States"
    },
    {
        "key": "PQM",
        "city": "Palenque",
        "name": "Palenque Arpt",
        "country": "Mexico"
    },
    {
        "key": "PQQ",
        "city": "Pt Macquarie",
        "name": "Port Macquarie Arpt",
        "country": "Australia"
    },
    {
        "key": "PQS",
        "city": "Pilot Station",
        "name": "Pilot Station Airport (FAA: 0AK)",
        "country": "United States"
    },
    {
        "key": "PRA",
        "city": "Parana",
        "name": "Parana Arpt",
        "country": "Argentina"
    },
    {
        "key": "PRB",
        "city": "Paso Robles",
        "name": "Paso Robles Cty",
        "country": "United States"
    },
    {
        "key": "PRC",
        "city": "Prescott",
        "name": "Prescott Municipal",
        "country": "United States"
    },
    {
        "key": "PRE",
        "city": "Pore",
        "name": "Pore Airport",
        "country": "Colombia"
    },
    {
        "key": "PRG",
        "city": "Prague",
        "name": "Ruzyne Arpt",
        "country": "Czech Republic"
    },
    {
        "key": "PRH",
        "city": "Phrae",
        "name": "Phrae Arpt",
        "country": "Thailand"
    },
    {
        "key": "PRI",
        "city": "Praslin Island",
        "name": "Praslin Island Arpt",
        "country": "Seychelles"
    },
    {
        "key": "PRJ",
        "city": "Capri",
        "name": "Harbour Airport",
        "country": "Italy"
    },
    {
        "key": "PRK",
        "city": "Prieska",
        "name": "Prieska Airport",
        "country": "South Africa"
    },
    {
        "key": "PRM",
        "city": "Portimao",
        "name": "Portimao Airport",
        "country": "Portugal"
    },
    {
        "key": "PRP",
        "city": "Propriano",
        "name": "Propriano Arpt",
        "country": "France"
    },
    {
        "key": "PRR",
        "city": "Paruima, Guyana",
        "name": "Paruima Airport",
        "country": "Guyana"
    },
    {
        "key": "PRS",
        "city": "Parasi",
        "name": "Parasi Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "PRV",
        "city": "Prerov",
        "name": "Prerov",
        "country": "Czech Republic"
    },
    {
        "key": "PRX",
        "city": "Paris",
        "name": "Paris Cox Field Arpt",
        "country": "United States"
    },
    {
        "key": "PRY",
        "city": "Pretoria",
        "name": "Wonderboom Arpt",
        "country": "South Africa"
    },
    {
        "key": "PRZ",
        "city": "Prineville",
        "name": "Prineville Airport (FAA: S39)",
        "country": "United States"
    },
    {
        "key": "PSA",
        "city": "Pisa",
        "name": "Gal Galilei Arpt",
        "country": "Italy"
    },
    {
        "key": "PSB",
        "city": "Philipsburg",
        "name": "Midstate Arpt",
        "country": "United States"
    },
    {
        "key": "PSC",
        "city": "Pasco",
        "name": "Tri Cities Arpt",
        "country": "United States"
    },
    {
        "key": "PSD",
        "city": "Port Said, Egypt",
        "name": "Port Said Airport",
        "country": "Egypt"
    },
    {
        "key": "PSE",
        "city": "Ponce",
        "name": "Mercedita Arpt",
        "country": "United States"
    },
    {
        "key": "PSF",
        "city": "Pittsfield",
        "name": "Pittsfield Municipal",
        "country": "United States"
    },
    {
        "key": "PSG",
        "city": "Petersburg",
        "name": "Petersburg Municipal",
        "country": "United States"
    },
    {
        "key": "PSI",
        "city": "Pasni",
        "name": "Pasni Airport",
        "country": "Pakistan"
    },
    {
        "key": "PSK",
        "city": "Dublin",
        "name": "New River Valley Arpt",
        "country": "United States"
    },
    {
        "key": "PSL",
        "city": "Perth",
        "name": "Perth Airport",
        "country": "United Kingdom"
    },
    {
        "key": "PSM",
        "city": "Portsmouth",
        "name": "Portsmouth Pease Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PSN",
        "city": "Palestine",
        "name": "Palestine Municipal Airport",
        "country": "United States"
    },
    {
        "key": "PSO",
        "city": "Pasto",
        "name": "Cano Arpt",
        "country": "Colombia"
    },
    {
        "key": "PSP",
        "city": "Palm Springs",
        "name": "Palm Springs Municipal",
        "country": "United States"
    },
    {
        "key": "PSQ",
        "city": "Philadelphia",
        "name": "Essington Philadelphia Seaplane Base",
        "country": "United States"
    },
    {
        "key": "PSR",
        "city": "Pescara",
        "name": "Liberi Airport",
        "country": "Italy"
    },
    {
        "key": "PSS",
        "city": "Posadas",
        "name": "Posadas Arpt",
        "country": "Argentina"
    },
    {
        "key": "PSU",
        "city": "Putussibau, Indonesia",
        "name": "Pangsuma Airport",
        "country": "Indonesia"
    },
    {
        "key": "PSX",
        "city": "Palacios",
        "name": "Palacios Municipal Airport",
        "country": "United States"
    },
    {
        "key": "PSY",
        "city": "Stanley",
        "name": "Port Stanley Airport",
        "country": "Falkland Islands (Islas Malvinas)"
    },
    {
        "key": "PTA",
        "city": "Port Alsworth",
        "name": "Port Alsworth",
        "country": "United States"
    },
    {
        "key": "PTB",
        "city": "Petersburg",
        "name": "Petersburg Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "PTC",
        "city": "Port Alice",
        "name": "Port Alice Arpt",
        "country": "United States"
    },
    {
        "key": "PTD",
        "city": "Port Alexander",
        "name": "Port Alexander Arpt",
        "country": "United States"
    },
    {
        "key": "PTF",
        "city": "Malololailai",
        "name": "Malololailai Arpt",
        "country": "Fiji"
    },
    {
        "key": "PTG",
        "city": "Pietersburg",
        "name": "Pietersburg Arpt",
        "country": "South Africa"
    },
    {
        "key": "PTI",
        "city": "Port Douglas",
        "name": "Port Douglas Arpt",
        "country": "Australia"
    },
    {
        "key": "PTJ",
        "city": "Portland",
        "name": "Portland Arpt",
        "country": "Australia"
    },
    {
        "key": "PTK",
        "city": "Pontiac",
        "name": "Oakland Pontiac Arpt",
        "country": "United States"
    },
    {
        "key": "PTL",
        "city": "Port Armstrong",
        "name": "Port Armstrong Arpt",
        "country": "United States"
    },
    {
        "key": "PTM",
        "city": "Palmarito",
        "name": "Palmarito Airport",
        "country": "Venezuela"
    },
    {
        "key": "PTN",
        "city": "Patterson",
        "name": "Williams Memorial",
        "country": "United States"
    },
    {
        "key": "PTO",
        "city": "Pato Branco",
        "name": "Pato Branco Municipal",
        "country": "Brazil"
    },
    {
        "key": "PTP",
        "city": "Pointe A Pitre",
        "name": "Le Raizet Arpt",
        "country": "Guadeloupe"
    },
    {
        "key": "MHU",
        "city": "Mount Hotham",
        "name": "Mount Hotham Arpt",
        "country": "Australia"
    },
    {
        "key": "MHV",
        "city": "Mojave",
        "name": "Kern County Arpt",
        "country": "United States"
    },
    {
        "key": "MHZ",
        "city": "Mildenhall",
        "name": "Mildenhall Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "MIA",
        "city": "Miami",
        "name": "Miami Intl",
        "country": "United States"
    },
    {
        "key": "MIB",
        "city": "Minot",
        "name": "Minot Airforce Base",
        "country": "United States"
    },
    {
        "key": "MIC",
        "city": "Minneapolis",
        "name": "Crystal Airport",
        "country": "United States"
    },
    {
        "key": "MID",
        "city": "Merida",
        "name": "Merida Intl",
        "country": "Mexico"
    },
    {
        "key": "MIE",
        "city": "Muncie",
        "name": "Johnson Field",
        "country": "United States"
    },
    {
        "key": "MIG",
        "city": "Mian Yang",
        "name": "Mian Yang Arpt",
        "country": "China"
    },
    {
        "key": "MIH",
        "city": "Mitchell Plateau",
        "name": "Mitchell Plateau Airport",
        "country": "Australia"
    },
    {
        "key": "MII",
        "city": "Marilia",
        "name": "Dr Gastao Vidigal",
        "country": "Brazil"
    },
    {
        "key": "MIJ",
        "city": "Mili Atoll, Marshall Islands",
        "name": "Mili Airport (FAA: 1Q9)",
        "country": "Marshall Islands"
    },
    {
        "key": "MIK",
        "city": "Mikkeli",
        "name": "Mikkeli Aprt",
        "country": "Finland"
    },
    {
        "key": "MIM",
        "city": "Merimbula",
        "name": "Merimbula Arpt",
        "country": "Australia"
    },
    {
        "key": "MIO",
        "city": "Miami",
        "name": "Miami Municipal Airport",
        "country": "United States"
    },
    {
        "key": "MIP",
        "city": "Mitzpe Ramon",
        "name": "Mitzpe Ramon Airport",
        "country": "Israel"
    },
    {
        "key": "MIQ",
        "city": "Omaha",
        "name": "Millard Airport",
        "country": "United States"
    },
    {
        "key": "MIR",
        "city": "Monastir",
        "name": "Habib Bourguiba Intl",
        "country": "Tunisia"
    },
    {
        "key": "MIS",
        "city": "Misima Island",
        "name": "Misima Island Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MIU",
        "city": "Maiduguri",
        "name": "Maiduguri International Airport",
        "country": "Nigeria"
    },
    {
        "key": "MIV",
        "city": "Millville",
        "name": "Millville Arpt",
        "country": "United States"
    },
    {
        "key": "MIW",
        "city": "Marshalltown",
        "name": "Marshalltown Municipal",
        "country": "United States"
    },
    {
        "key": "MIX",
        "city": "Miriti-Parana",
        "name": "Miriti-Parana Airport",
        "country": "Colombia"
    },
    {
        "key": "MIZ",
        "city": "Mainoru",
        "name": "Mainoru Airport",
        "country": "Australia"
    },
    {
        "key": "MJA",
        "city": "Manja",
        "name": "Manja Airport",
        "country": "Madagascar"
    },
    {
        "key": "MJB",
        "city": "Mejit Atoll",
        "name": "Mejit Airport (FAA: Q30)",
        "country": "Marshall Islands"
    },
    {
        "key": "MJC",
        "city": "Man, Ivory Coast",
        "name": "Man Airport",
        "country": "United Kingdom"
    },
    {
        "key": "MJD",
        "city": "Mohenjodaro",
        "name": "Mohenjodaro Arpt",
        "country": "Pakistan"
    },
    {
        "key": "MJF",
        "city": "Mosjoen",
        "name": "Kjaerstad Arpt",
        "country": "Norway"
    },
    {
        "key": "MJI",
        "city": "Tripoli",
        "name": "Mitiga International Airport",
        "country": "Libya"
    },
    {
        "key": "MJJ",
        "city": "Moki",
        "name": "Moki Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MJK",
        "city": "Monkey Mia",
        "name": "Shark Bay Arpt",
        "country": "Australia"
    },
    {
        "key": "MJM",
        "city": "Mbuji-Mayi",
        "name": "Mbuji Mayi Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "MJN",
        "city": "Majunga",
        "name": "Amborovy Arpt",
        "country": "Madagascar"
    },
    {
        "key": "MJP",
        "city": "Manjimup",
        "name": "Manjimup Airport",
        "country": "Australia"
    },
    {
        "key": "MJQ",
        "city": "Jackson",
        "name": "Jackson Municipal Airport",
        "country": "United States"
    },
    {
        "key": "MJR",
        "city": "Miramar",
        "name": "Miramar Arpt",
        "country": "Argentina"
    },
    {
        "key": "MJT",
        "city": "Mytilene",
        "name": "Mytilene Arpt",
        "country": "Greece"
    },
    {
        "key": "MJU",
        "city": "Mamuju, Indonesia",
        "name": "Tampa Padang Airport",
        "country": "Indonesia"
    },
    {
        "key": "MJV",
        "city": "Murcia",
        "name": "San Javier Airport",
        "country": "Spain"
    },
    {
        "key": "MJW",
        "city": "Mahenye",
        "name": "Mahenye Airfield",
        "country": "Zimbabwe"
    },
    {
        "key": "MKA",
        "city": "Marianske Lazne",
        "name": "Marianske Lazne Arpt",
        "country": "Czech Republic"
    },
    {
        "key": "MKB",
        "city": "Mekambo",
        "name": "Mekambo Airport",
        "country": "Gabon"
    },
    {
        "key": "MKC",
        "city": "Kansas City",
        "name": "Kansas City Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MKE",
        "city": "Milwaukee",
        "name": "General Mitchell Intl Arpt",
        "country": "United States"
    },
    {
        "key": "MKF",
        "city": "Columbus",
        "name": "Mckenna AAF",
        "country": "United States"
    },
    {
        "key": "MKG",
        "city": "Muskegon",
        "name": "Muskegon Cty Intl",
        "country": "United States"
    },
    {
        "key": "MKK",
        "city": "Hoolehua",
        "name": "Molokai Arpt",
        "country": "United States"
    },
    {
        "key": "MKL",
        "city": "Jackson",
        "name": "McKellar Fld",
        "country": "United States"
    },
    {
        "key": "MKM",
        "city": "Mukah",
        "name": "Mukah Arpt",
        "country": "Malaysia"
    },
    {
        "key": "MKO",
        "city": "Muskogee",
        "name": "Davis Field",
        "country": "United States"
    },
    {
        "key": "MKP",
        "city": "Makemo, French Polynesia",
        "name": "Makemo Airport",
        "country": "French Polynesia"
    },
    {
        "key": "MKQ",
        "city": "Merauke, Indonesia",
        "name": "Mopah Airport",
        "country": "Indonesia"
    },
    {
        "key": "MKR",
        "city": "Meekathara",
        "name": "Meekatharra Arpt",
        "country": "Australia"
    },
    {
        "key": "MKS",
        "city": "Mekane Selam",
        "name": "Mekane Selam",
        "country": "Ethiopia"
    },
    {
        "key": "MKT",
        "city": "Mankato",
        "name": "Mankato Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MKU",
        "city": "Makokou",
        "name": "Makokou Airport",
        "country": "Gabon"
    },
    {
        "key": "MKV",
        "city": "Ghan",
        "name": "Mount Cavenagh Airport",
        "country": "Australia"
    },
    {
        "key": "MKW",
        "city": "Manokwari",
        "name": "Rendani Arpt",
        "country": "Indonesia"
    },
    {
        "key": "MKY",
        "city": "Mackay",
        "name": "Mackay Arpt",
        "country": "Australia"
    },
    {
        "key": "MKZ",
        "city": "Malacca",
        "name": "Batu Berendum Arpt",
        "country": "Malaysia"
    },
    {
        "key": "MLA",
        "city": "Malta",
        "name": "Luqa Airport",
        "country": "Malta"
    },
    {
        "key": "MLB",
        "city": "Melbourne",
        "name": "Melbourne Regional",
        "country": "United States"
    },
    {
        "key": "MLC",
        "city": "McAlester",
        "name": "McAlester Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "PTS",
        "city": "Pittsburg",
        "name": "Atkinson Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MLD",
        "city": "Malad City",
        "name": "Malad City Airport",
        "country": "United States"
    },
    {
        "key": "PTT",
        "city": "Pratt",
        "name": "Pratt Regional Airport",
        "country": "United States"
    },
    {
        "key": "MLE",
        "city": "Male",
        "name": "Male Intl Arpt",
        "country": "Maldives"
    },
    {
        "key": "PTU",
        "city": "Platinum",
        "name": "Platinum Airport",
        "country": "United States"
    },
    {
        "key": "MLG",
        "city": "Malang",
        "name": "Malang Airport",
        "country": "Indonesia"
    },
    {
        "key": "PTV",
        "city": "Porterville",
        "name": "Porterville Arpt",
        "country": "United States"
    },
    {
        "key": "MLH",
        "city": "Mulhouse Basel",
        "name": "Mulhouse Euroairport French",
        "country": "France"
    },
    {
        "key": "AKS",
        "city": "Gwaunaruu",
        "name": "Auki Gwaunaruu Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "AKT",
        "city": "Akrotiri",
        "name": "Akrotiri Royal Air Force",
        "country": "Cyprus"
    },
    {
        "key": "AKU",
        "city": "Aksu",
        "name": "Aksu Airport",
        "country": "China"
    },
    {
        "key": "AKV",
        "city": "Akulivik",
        "name": "Akulivik Arpt",
        "country": "Canada"
    },
    {
        "key": "AKX",
        "city": "Aqtobe",
        "name": "Aqtobe Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "AKY",
        "city": "Sittwe",
        "name": "Sittwe Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "ALA",
        "city": "Almaty",
        "name": "Almaty Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "ALB",
        "city": "Albany",
        "name": "Albany Cty Arpt",
        "country": "United States"
    },
    {
        "key": "ALC",
        "city": "Alicante",
        "name": "Alicante Arpt",
        "country": "Spain"
    },
    {
        "key": "ALD",
        "city": "Alerta",
        "name": "Alerta",
        "country": "Peru"
    },
    {
        "key": "ALE",
        "city": "Alpine",
        "name": "Alpine Aprt",
        "country": "United States"
    },
    {
        "key": "ALF",
        "city": "Alta",
        "name": "Elvebakken Arpt",
        "country": "Norway"
    },
    {
        "key": "ALG",
        "city": "Algiers",
        "name": "Houari Boumedienne Arpt",
        "country": "Algeria"
    },
    {
        "key": "ALH",
        "city": "Albany",
        "name": "Albany Airport",
        "country": "Australia"
    },
    {
        "key": "ALI",
        "city": "Alice",
        "name": "Alice International Airport",
        "country": "United States"
    },
    {
        "key": "ALJ",
        "city": "Alexander Bay",
        "name": "Kortdoorn Arpt",
        "country": "South Africa"
    },
    {
        "key": "ALL",
        "city": "Albenga",
        "name": "Albenga Arpt",
        "country": "Italy"
    },
    {
        "key": "ALM",
        "city": "Alamogordo",
        "name": "Alamogordo Municipal",
        "country": "United States"
    },
    {
        "key": "ALO",
        "city": "Waterloo",
        "name": "Livingston Betsworth Fld",
        "country": "United States"
    },
    {
        "key": "ALP",
        "city": "Aleppo",
        "name": "Nejrab Arpt",
        "country": "Syrian Arab Republic"
    },
    {
        "key": "ALR",
        "city": "Alexandra",
        "name": "Alexandra Arpt",
        "country": "New Zealand"
    },
    {
        "key": "ALS",
        "city": "Alamosa",
        "name": "Alamosa Municipal",
        "country": "United States"
    },
    {
        "key": "ALU",
        "city": "Alula",
        "name": "Alula Airport",
        "country": "Somalia"
    },
    {
        "key": "ALW",
        "city": "Walla Walla",
        "name": "Walla Walla City County",
        "country": "United States"
    },
    {
        "key": "ALX",
        "city": "Alexander City",
        "name": "Thomas C Russell Field",
        "country": "United States"
    },
    {
        "key": "ALY",
        "city": "Alexandria",
        "name": "El Nouzha Arpt",
        "country": "Egypt"
    },
    {
        "key": "AMA",
        "city": "Amarillo",
        "name": "Amarillo Intl Arpt",
        "country": "United States"
    },
    {
        "key": "AMB",
        "city": "Ambilobe",
        "name": "Ambilobe",
        "country": "Madagascar"
    },
    {
        "key": "AMD",
        "city": "Ahmedabad",
        "name": "Sardar Vallabh Bhai Patel Intl Arpt",
        "country": "India"
    },
    {
        "key": "AMF",
        "city": "Ama",
        "name": "Ama",
        "country": "Papua New Guinea"
    },
    {
        "key": "AMH",
        "city": "Arba Minch",
        "name": "Arba Minch Airport",
        "country": "Ethiopia"
    },
    {
        "key": "AMK",
        "city": "Durango",
        "name": "Animas Airpark",
        "country": "United States"
    },
    {
        "key": "AMM",
        "city": "Amman",
        "name": "Queen Alia Intl Arpt",
        "country": "Jordan"
    },
    {
        "key": "AMN",
        "city": "Alma",
        "name": "Gratiot Community Airport",
        "country": "United States"
    },
    {
        "key": "AMO",
        "city": "Mao, Chad",
        "name": "Mao Airport",
        "country": "Brazil"
    },
    {
        "key": "AMQ",
        "city": "Ambon",
        "name": "Pattimura Arpt",
        "country": "Indonesia"
    },
    {
        "key": "AMS",
        "city": "Amsterdam",
        "name": "Schiphol Arpt",
        "country": "Netherlands"
    },
    {
        "key": "AMT",
        "city": "Amata",
        "name": "Amata Airport",
        "country": "Australia"
    },
    {
        "key": "AMU",
        "city": "Amanab",
        "name": "Amanab Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "AMV",
        "city": "Amderma",
        "name": "Amderma",
        "country": "Russia"
    },
    {
        "key": "AMW",
        "city": "Ames",
        "name": "Ames Minicipal Arpt",
        "country": "United States"
    },
    {
        "key": "AMY",
        "city": "Ambatomainty",
        "name": "Ambatomainty Airport",
        "country": "Madagascar"
    },
    {
        "key": "AMZ",
        "city": "Ardmore",
        "name": "Ardmore Airport",
        "country": "New Zealand"
    },
    {
        "key": "ANB",
        "city": "Anniston",
        "name": "Anniston Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ANC",
        "city": "Anchorage",
        "name": "Anchorage Intl Arpt",
        "country": "United States"
    },
    {
        "key": "AND",
        "city": "Anderson",
        "name": "Anderson Arpt",
        "country": "United States"
    },
    {
        "key": "ANE",
        "city": "Angers",
        "name": "Marce Arpt",
        "country": "France"
    },
    {
        "key": "ANF",
        "city": "Antofagasta",
        "name": "Cerro Moreno Arpt",
        "country": "Chile"
    },
    {
        "key": "ANG",
        "city": "Angouleme",
        "name": "Brie Champniers",
        "country": "France"
    },
    {
        "key": "ANI",
        "city": "Aniak",
        "name": "Aniak Arpt",
        "country": "United States"
    },
    {
        "key": "ANK",
        "city": "Ankara",
        "name": "Etimesgut Arpt",
        "country": "Turkey"
    },
    {
        "key": "ANL",
        "city": "Andulo",
        "name": "Andulo Airport",
        "country": "Angola"
    },
    {
        "key": "ANM",
        "city": "Antalaha",
        "name": "Antsirabato",
        "country": "Madagascar"
    },
    {
        "key": "ANN",
        "city": "Annette Island",
        "name": "Annette Island Arpt",
        "country": "United States"
    },
    {
        "key": "ANP",
        "city": "Annapolis",
        "name": "Lee Annapolis Arpt",
        "country": "United States"
    },
    {
        "key": "ANQ",
        "city": "Angola",
        "name": "TriState Steuben County Airport",
        "country": "United States"
    },
    {
        "key": "ANR",
        "city": "Antwerp",
        "name": "Antwerp Brussels North",
        "country": "Belgium"
    },
    {
        "key": "ANS",
        "city": "Andahuaylas, Peru",
        "name": "Andahuaylas Airport",
        "country": "Peru"
    },
    {
        "key": "ANU",
        "city": "Antigua",
        "name": "V C Bird Intl Arpt",
        "country": "Antigua and Barbuda"
    },
    {
        "key": "ANW",
        "city": "Ainsworth",
        "name": "Ainsworth Minicipal Arpt",
        "country": "United States"
    },
    {
        "key": "HHR",
        "city": "Hawthorne",
        "name": "Hawthorne Arpt",
        "country": "United States"
    },
    {
        "key": "ANX",
        "city": "Andenes",
        "name": "Andenes Arpt",
        "country": "Norway"
    },
    {
        "key": "HIA",
        "city": "Huai An",
        "name": "LIANSHUI",
        "country": "China"
    },
    {
        "key": "ANY",
        "city": "Anthony",
        "name": "Anthony Municipal Airport",
        "country": "United States"
    },
    {
        "key": "AOC",
        "city": "Altenburg",
        "name": "Altenburg Nobitz Arpt",
        "country": "Germany"
    },
    {
        "key": "HIB",
        "city": "Hibbing",
        "name": "Hibbing Chisolm Arpt",
        "country": "United States"
    },
    {
        "key": "AOD",
        "city": "Abou-Deia, Chad",
        "name": "Abou Deia Airport",
        "country": "Chad"
    },
    {
        "key": "HID",
        "city": "Horn Island",
        "name": "Horn Island Arpt",
        "country": "Australia"
    },
    {
        "key": "AOE",
        "city": "Eskisehir",
        "name": "Anadolu University Arpt",
        "country": "Turkey"
    },
    {
        "key": "HIE",
        "city": "Whitefield",
        "name": "Mt washington Regional Arpt",
        "country": "United States"
    },
    {
        "key": "AOG",
        "city": "Anshan",
        "name": "Anshan Tengao Airport",
        "country": "China"
    },
    {
        "key": "HIF",
        "city": "Ogden",
        "name": "Hill AFB",
        "country": "United States"
    },
    {
        "key": "AOH",
        "city": "Lima",
        "name": "Allen County Arpt",
        "country": "United States"
    },
    {
        "key": "HIG",
        "city": "Highbury",
        "name": "Highbury Airport",
        "country": "Australia"
    },
    {
        "key": "LQK",
        "city": "Liberty",
        "name": "Pickens County Airport",
        "country": "United States"
    },
    {
        "key": "LQM",
        "city": "Puerto Leguizamo",
        "name": "Puerto Leguizamo Arpt",
        "country": "Colombia"
    },
    {
        "key": "LQN",
        "city": "Qaleh-ye Now",
        "name": "Qala i Naw Airport",
        "country": "Afghanistan"
    },
    {
        "key": "LRA",
        "city": "Larisa",
        "name": "Larisa Arpt",
        "country": "Greece"
    },
    {
        "key": "LRD",
        "city": "Laredo",
        "name": "Laredo Intl",
        "country": "United States"
    },
    {
        "key": "LRE",
        "city": "Longreach",
        "name": "Longreach Arpt",
        "country": "Australia"
    },
    {
        "key": "LRF",
        "city": "Jacksonville",
        "name": "Little Rock Arpt",
        "country": "United States"
    },
    {
        "key": "LRH",
        "city": "La Rochelle",
        "name": "Laleu Airport",
        "country": "France"
    },
    {
        "key": "PTW",
        "city": "Pottstown",
        "name": "Pottstown Limerick",
        "country": "United States"
    },
    {
        "key": "LRJ",
        "city": "Le Mars",
        "name": "Le Mars Municipal Airport",
        "country": "United States"
    },
    {
        "key": "LRL",
        "city": "Niamtougou",
        "name": "Niamtougou International Airport",
        "country": "Togo"
    },
    {
        "key": "PTX",
        "city": "Pitalito, Colombia",
        "name": "Contador Airport",
        "country": "Colombia"
    },
    {
        "key": "LRM",
        "city": "La Romana",
        "name": "La Romana Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "PTY",
        "city": "Panama City",
        "name": "Tocumen Intl Arpt",
        "country": "Panama"
    },
    {
        "key": "LRN",
        "city": "Moses Lake",
        "name": "Larson AFB",
        "country": "United States"
    },
    {
        "key": "LRR",
        "city": "Lar",
        "name": "Larestan International Airport",
        "country": "Iran"
    },
    {
        "key": "LRS",
        "city": "Leros",
        "name": "Leros Arpt",
        "country": "Greece"
    },
    {
        "key": "PUB",
        "city": "Pueblo",
        "name": "Pueblo Arpt",
        "country": "United States"
    },
    {
        "key": "PUC",
        "city": "Price",
        "name": "Carbon Cty Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "LRT",
        "city": "Lorient",
        "name": "Lann Bihoue Arpt",
        "country": "France"
    },
    {
        "key": "PUE",
        "city": "Puerto Obaldia,",
        "name": "Puerto Obaldia Airport",
        "country": "Panama"
    },
    {
        "key": "LRU",
        "city": "Las Cruces",
        "name": "Las Cruces Crawford Arpt",
        "country": "United States"
    },
    {
        "key": "PUF",
        "city": "Pau Fr",
        "name": "Uzein Airport",
        "country": "France"
    },
    {
        "key": "LSA",
        "city": "Losuia",
        "name": "Kiriwina Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "PUG",
        "city": "Port Augusta",
        "name": "Port Augusta Arpt",
        "country": "Australia"
    },
    {
        "key": "LSB",
        "city": "Lordsburg",
        "name": "Lordsburg Municipal Airport",
        "country": "United States"
    },
    {
        "key": "PUJ",
        "city": "Punta Cana",
        "name": "Punta Cana Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "LSC",
        "city": "La Serena",
        "name": "La Florida",
        "country": "Chile"
    },
    {
        "key": "FCM",
        "city": "Minneapolis",
        "name": "Flying Cloud Arpt",
        "country": "United States"
    },
    {
        "key": "PUN",
        "city": "Punia",
        "name": "Punia",
        "country": "Republic of the Congo"
    },
    {
        "key": "LSD",
        "city": "Lexington",
        "name": "Creech Army Air Field",
        "country": "United States"
    },
    {
        "key": "PUQ",
        "city": "Punta Arenas",
        "name": "Presidente Ibanez Arpt",
        "country": "Chile"
    },
    {
        "key": "FCN",
        "city": "Cuxhaven",
        "name": "Cuxhaven Nordholz Arpt",
        "country": "Germany"
    },
    {
        "key": "PUR",
        "city": "Carolina",
        "name": "Puerto Rico Airport",
        "country": "Puerto Rico"
    },
    {
        "key": "FCO",
        "city": "Rome",
        "name": "Fiumicino Arpt",
        "country": "Italy"
    },
    {
        "key": "LSE",
        "city": "La Crosse",
        "name": "La Crosse Municipal",
        "country": "United States"
    },
    {
        "key": "FCS",
        "city": "Colorado Springs",
        "name": "Butts AAF",
        "country": "United States"
    },
    {
        "key": "LSF",
        "city": "Columbus",
        "name": "Lawson AAF",
        "country": "United States"
    },
    {
        "key": "PUS",
        "city": "Busan",
        "name": "Kimhae Arpt",
        "country": "Korea"
    },
    {
        "key": "FCT",
        "city": "Yakima",
        "name": "Firing Center AAF",
        "country": "United States"
    },
    {
        "key": "PUT",
        "city": "Puttaprathe",
        "name": "Puttaprathe",
        "country": "India"
    },
    {
        "key": "FCY",
        "city": "Forrest City",
        "name": "Forrest City Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "LSH",
        "city": "Lashio",
        "name": "Lashio Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "PUU",
        "city": "Puerto Asis",
        "name": "Puerto Asis Arpt",
        "country": "Colombia"
    },
    {
        "key": "FDE",
        "city": "Forde",
        "name": "Bringeland Arpt",
        "country": "Norway"
    },
    {
        "key": "FDF",
        "city": "Ft De France",
        "name": "Lamentin Arpt",
        "country": "Martinique"
    },
    {
        "key": "FDH",
        "city": "Friedrichshafen",
        "name": "Friedrichshafen Lowenthal",
        "country": "Germany"
    },
    {
        "key": "FDK",
        "city": "Frederick",
        "name": "Frederick Municipal",
        "country": "United States"
    },
    {
        "key": "FDY",
        "city": "Findlay",
        "name": "FINDLAY ARPT",
        "country": "United States"
    },
    {
        "key": "FEB",
        "city": "Sanfebagar",
        "name": "Sanfebagar Airport",
        "country": "Nepal"
    },
    {
        "key": "FEG",
        "city": "Oepraha",
        "name": "Fergana International Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "FEL",
        "city": "FÃ¼rstenfeldbruck",
        "name": "FÃ¼rstenfeldbruck Air Base",
        "country": "Germany"
    },
    {
        "key": "FEN",
        "city": "Fernando De Noronha",
        "name": "Fernando De Noronha Arpt",
        "country": "Brazil"
    },
    {
        "key": "FET",
        "city": "Fremont",
        "name": "Fremont Municipal Airport",
        "country": "United States"
    },
    {
        "key": "FEW",
        "city": "Cheyenne",
        "name": "Warren AFB Heliport",
        "country": "United States"
    },
    {
        "key": "FEZ",
        "city": "Fez Ma",
        "name": "Fez Airport",
        "country": "Morocco"
    },
    {
        "key": "APS",
        "city": "Anapolis",
        "name": "Anapolis Arpt",
        "country": "Brazil"
    },
    {
        "key": "FFA",
        "city": "Kill Devil Hills",
        "name": "First Flight Airport",
        "country": "United States"
    },
    {
        "key": "APT",
        "city": "Jasper",
        "name": "Marion County Airport (Brown Field)",
        "country": "United States"
    },
    {
        "key": "FFL",
        "city": "Fairfield",
        "name": "Fairfield Municipal Airport",
        "country": "United States"
    },
    {
        "key": "APU",
        "city": "Apucarana, ParanÃ¡, Brazil",
        "name": "Apucarana Airport",
        "country": "Brazil"
    },
    {
        "key": "BSA",
        "city": "Bosaso, Somalia",
        "name": "Bender Qassim International Airport",
        "country": "Somalia"
    },
    {
        "key": "OFK",
        "city": "Norfolk",
        "name": "Karl Stefan Fld",
        "country": "United States"
    },
    {
        "key": "HLG",
        "city": "Wheeling",
        "name": "Ohio County",
        "country": "United States"
    },
    {
        "key": "FFM",
        "city": "Fergus Falls",
        "name": "Fergus Falls Municipal",
        "country": "United States"
    },
    {
        "key": "APV",
        "city": "Applevalley",
        "name": "Apple Valley Arpt",
        "country": "United States"
    },
    {
        "key": "BSB",
        "city": "Brasilia",
        "name": "Brasilia Intl Arpt",
        "country": "Brazil"
    },
    {
        "key": "HLH",
        "city": "Ulanhot",
        "name": "Ulanhot Airport",
        "country": "China"
    },
    {
        "key": "OFU",
        "city": "Ofu",
        "name": "Ofu",
        "country": "American Samoa"
    },
    {
        "key": "APW",
        "city": "Apia",
        "name": "Apia Airport",
        "country": "Samoa"
    },
    {
        "key": "FFO",
        "city": "Dayton",
        "name": "Patterson AFB",
        "country": "United States"
    },
    {
        "key": "BSC",
        "city": "Bahia Solano",
        "name": "Aeropuerto Jose Celestino Mutis",
        "country": "Colombia"
    },
    {
        "key": "BPY",
        "city": "Besalampy",
        "name": "Besalampy Airport",
        "country": "Madagascar"
    },
    {
        "key": "BQA",
        "city": "San Luis",
        "name": "Dr. Juan C. Angara Airport",
        "country": "Philippines"
    },
    {
        "key": "BQB",
        "city": "Busselton",
        "name": "Busselton Arpt",
        "country": "Australia"
    },
    {
        "key": "BQH",
        "city": "London",
        "name": "London Biggin Hill Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "BQI",
        "city": "Bagani",
        "name": "Bagani Airport",
        "country": "Namibia"
    },
    {
        "key": "BQJ",
        "city": "Batagay",
        "name": "Batagay Airport",
        "country": "Russia"
    },
    {
        "key": "BQK",
        "city": "Brunswick",
        "name": "Gylnco Jet Port",
        "country": "United States"
    },
    {
        "key": "BQL",
        "city": "Boulia",
        "name": "Boulia Arpt",
        "country": "Australia"
    },
    {
        "key": "BQN",
        "city": "Aguadilla",
        "name": "Borinquen Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MLI",
        "city": "Moline",
        "name": "Quad City Arpt",
        "country": "United States"
    },
    {
        "key": "BQQ",
        "city": "Eoligarry",
        "name": "Barra Airport",
        "country": "United Kingdom"
    },
    {
        "key": "MLK",
        "city": "Malta",
        "name": "Malta Airport (FAA: M75)",
        "country": "United States"
    },
    {
        "key": "BQS",
        "city": "Blagoveshchensk",
        "name": "Blagoveshchensk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "MLL",
        "city": "Marshall",
        "name": "Marshall Don Hunter Airport",
        "country": "United States"
    },
    {
        "key": "BQT",
        "city": "Brest",
        "name": "Brest Arpt",
        "country": "Belarus"
    },
    {
        "key": "MLM",
        "city": "Morelia",
        "name": "Michoacan Municipal Arpt",
        "country": "Mexico"
    },
    {
        "key": "BQU",
        "city": "Bequia, Saint Vincent and the Grenadines",
        "name": "J. F. Mitchell Airport",
        "country": "Saint Vincent and the Grenadines"
    },
    {
        "key": "MLN",
        "city": "Melilla",
        "name": "Melilla Arpt",
        "country": "Spain"
    },
    {
        "key": "BQV",
        "city": "Glacier Bay",
        "name": "Bartlett Seaplane Base",
        "country": "United States"
    },
    {
        "key": "BQW",
        "city": "Tanami",
        "name": "Balgo Hill Airport",
        "country": "Australia"
    },
    {
        "key": "MLO",
        "city": "Milos, Greece",
        "name": "Milos Island National Airport",
        "country": "Greece"
    },
    {
        "key": "BRA",
        "city": "Barreiras",
        "name": "Barreiras Arpt",
        "country": "Brazil"
    },
    {
        "key": "MLP",
        "city": "Malabang",
        "name": "Malabang Airport",
        "country": "Philippines"
    },
    {
        "key": "BRB",
        "city": "Barreirinhas",
        "name": "Barreirinhas Airport",
        "country": "Brazil"
    },
    {
        "key": "MLQ",
        "city": "Malalaua",
        "name": "Malalaua Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BRC",
        "city": "San Carlos Bariloche",
        "name": "San Carlos De Bariloche Intl Arpt",
        "country": "Argentina"
    },
    {
        "key": "MLR",
        "city": "Millicent",
        "name": "Millicent",
        "country": "Australia"
    },
    {
        "key": "BRD",
        "city": "Brainerd",
        "name": "Crowwing Cty Arpt",
        "country": "United States"
    },
    {
        "key": "MLS",
        "city": "Miles City",
        "name": "Miles City Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "HIS",
        "city": "Hayman Island",
        "name": "Hayman Island Arpt",
        "country": "Australia"
    },
    {
        "key": "BRE",
        "city": "Bremen",
        "name": "Bremen Airport",
        "country": "Germany"
    },
    {
        "key": "HIW",
        "city": "Hiroshima",
        "name": "Hiroshima West Arpt",
        "country": "Japan"
    },
    {
        "key": "MLT",
        "city": "Millinocket",
        "name": "Millinocket Arpt",
        "country": "United States"
    },
    {
        "key": "BRF",
        "city": "Bradford",
        "name": "Bradford Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "HJJ",
        "city": "Huaihua",
        "name": "Huaihua Zhijiang Airport",
        "country": "China"
    },
    {
        "key": "MLU",
        "city": "Monroe",
        "name": "Monroe Regional",
        "country": "United States"
    },
    {
        "key": "BRH",
        "city": "Brahman",
        "name": "Brahman Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MLV",
        "city": "Archer River",
        "name": "Merluna Airport",
        "country": "Australia"
    },
    {
        "key": "HJR",
        "city": "Khajuraho",
        "name": "Khajuraho Arpt",
        "country": "India"
    },
    {
        "key": "MLW",
        "city": "Monrovia",
        "name": "Sprigg Payne Arpt",
        "country": "Liberia"
    },
    {
        "key": "HKA",
        "city": "Blytheville",
        "name": "Blytheville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BRI",
        "city": "Bari",
        "name": "Bari Airport",
        "country": "Italy"
    },
    {
        "key": "BRK",
        "city": "Bourke",
        "name": "Bourke Airport",
        "country": "Australia"
    },
    {
        "key": "HKB",
        "city": "Healy Lake",
        "name": "Healy Lake Arpt",
        "country": "United States"
    },
    {
        "key": "BRL",
        "city": "Burlington",
        "name": "Burlington Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "HKD",
        "city": "Hakodate",
        "name": "Hakodate Arpt",
        "country": "Japan"
    },
    {
        "key": "BRM",
        "city": "Barquisimeto",
        "name": "Airport Barquisimeto",
        "country": "Venezuela"
    },
    {
        "key": "HKG",
        "city": "Hong Kong",
        "name": "Hong Kong Intl",
        "country": "Hong Kong"
    },
    {
        "key": "BRN",
        "city": "Berne",
        "name": "Belp Airport",
        "country": "Switzerland"
    },
    {
        "key": "HKK",
        "city": "Hokitika",
        "name": "Hokitika Airport",
        "country": "New Zealand"
    },
    {
        "key": "BRO",
        "city": "Brownsville",
        "name": "South Padre Island Intl Arpt",
        "country": "United States"
    },
    {
        "key": "HKN",
        "city": "Hoskins",
        "name": "Hoskins Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "BRP",
        "city": "Biaru",
        "name": "Biaru Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "HKS",
        "city": "Jackson",
        "name": "Hawkins Field",
        "country": "United States"
    },
    {
        "key": "BRQ",
        "city": "Brno",
        "name": "Turnay Arpt",
        "country": "Czech Republic"
    },
    {
        "key": "HKT",
        "city": "Phuket",
        "name": "Phuket Intl Airport",
        "country": "Thailand"
    },
    {
        "key": "BRR",
        "city": "Barra",
        "name": "North Bay Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "HKV",
        "city": "Uzundzhovo",
        "name": "Haskovo Malevo Airport",
        "country": "Bulgaria"
    },
    {
        "key": "BRS",
        "city": "Bristol",
        "name": "Bristol Intl Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "HKY",
        "city": "Hickory",
        "name": "Hickory Municipal",
        "country": "United States"
    },
    {
        "key": "BRT",
        "city": "Bathurst Isl",
        "name": "Bathurst Island Arpt",
        "country": "Australia"
    },
    {
        "key": "HLA",
        "city": "Johannesburg",
        "name": "Lanseria International Arpt",
        "country": "South Africa"
    },
    {
        "key": "BRU",
        "city": "Brussels",
        "name": "Brussels National Arpt",
        "country": "Belgium"
    },
    {
        "key": "HLB",
        "city": "Batesville",
        "name": "Hillenbrand",
        "country": "United States"
    },
    {
        "key": "BRV",
        "city": "Bremerhaven",
        "name": "Bremerhaven Arpt",
        "country": "Germany"
    },
    {
        "key": "HLD",
        "city": "Hailar",
        "name": "Hailer Arpt",
        "country": "China"
    },
    {
        "key": "OEL",
        "city": "Oryol",
        "name": "Oryol Yuzhny Airport",
        "country": "Russia"
    },
    {
        "key": "BRW",
        "city": "Barrow",
        "name": "Barrow WBAS",
        "country": "United States"
    },
    {
        "key": "BRX",
        "city": "Barahona",
        "name": "Barahona Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "OER",
        "city": "Ornskoldsvik",
        "name": "Ornskoldsvik Arpt",
        "country": "Sweden"
    },
    {
        "key": "HLF",
        "city": "Hultsfred",
        "name": "Hultsfred Arpt",
        "country": "Sweden"
    },
    {
        "key": "MDU",
        "city": "Mendi",
        "name": "Mendi Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "MDW",
        "city": "Chicago",
        "name": "Midway",
        "country": "United States"
    },
    {
        "key": "MDX",
        "city": "Melbourne Airport",
        "name": "Mercedes Airport",
        "country": "Australia"
    },
    {
        "key": "MDY",
        "city": "Midway Island",
        "name": "Sand Island Field",
        "country": "United States Minor Outlying Islands"
    },
    {
        "key": "MDZ",
        "city": "Mendoza",
        "name": "El Plumerillo Airport",
        "country": "Argentina"
    },
    {
        "key": "MEA",
        "city": "Macae",
        "name": "Macae Arpt",
        "country": "Brazil"
    },
    {
        "key": "MEB",
        "city": "Melbourne",
        "name": "Essendon Arpt",
        "country": "Australia"
    },
    {
        "key": "MEC",
        "city": "Manta",
        "name": "Manta Arpt",
        "country": "Ecuador"
    },
    {
        "key": "MED",
        "city": "Madinah",
        "name": "Prince Mohammad Bin Abdulaziz Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "MEE",
        "city": "La Roche",
        "name": "MarÃ© Airport",
        "country": "New Caledonia"
    },
    {
        "key": "MEG",
        "city": "Malanje",
        "name": "Malanje Airport",
        "country": "Angola"
    },
    {
        "key": "MEH",
        "city": "Mehamn",
        "name": "Mehamn Arpt",
        "country": "Norway"
    },
    {
        "key": "MEI",
        "city": "Meridian",
        "name": "Key Field",
        "country": "United States"
    },
    {
        "key": "MEJ",
        "city": "Meadville",
        "name": "Port Meadville Airport (FAA: GKJ)",
        "country": "United States"
    },
    {
        "key": "MEL",
        "city": "Melbourne",
        "name": "Tullamarine Arpt",
        "country": "Australia"
    },
    {
        "key": "MEM",
        "city": "Memphis",
        "name": "Memphis Intl",
        "country": "United States"
    },
    {
        "key": "MEN",
        "city": "Mende",
        "name": "Brenoux Airport",
        "country": "France"
    },
    {
        "key": "MEO",
        "city": "Manteo",
        "name": "Dare County Regional Arpt",
        "country": "United States"
    },
    {
        "key": "MER",
        "city": "Merced",
        "name": "Castle Airfoce Base",
        "country": "United States"
    },
    {
        "key": "MES",
        "city": "Medan",
        "name": "Polonia Arpt",
        "country": "Indonesia"
    },
    {
        "key": "MEU",
        "city": "Monte Dourado",
        "name": "Monte Dourado Arpt",
        "country": "Brazil"
    },
    {
        "key": "MEV",
        "city": "Minden",
        "name": "Douglas County Arpt",
        "country": "United States"
    },
    {
        "key": "MEX",
        "city": "Mexico City",
        "name": "Benito Juarez Intl Airport",
        "country": "Mexico"
    },
    {
        "key": "MEY",
        "city": "Meghauli",
        "name": "Meghauli",
        "country": "Nepal"
    },
    {
        "key": "MEZ",
        "city": "Messina",
        "name": "Messina Arpt",
        "country": "South Africa"
    },
    {
        "key": "MFA",
        "city": "Kilindoni",
        "name": "Mafia Airport",
        "country": "Tanzania"
    },
    {
        "key": "MFD",
        "city": "Mansfield",
        "name": "Mansfield Municipal",
        "country": "United States"
    },
    {
        "key": "MFE",
        "city": "McAllen",
        "name": "Miller Intl",
        "country": "United States"
    },
    {
        "key": "MFG",
        "city": "Muzaffarabad",
        "name": "Muzaffarabad Airport",
        "country": "Pakistan"
    },
    {
        "key": "MFH",
        "city": "Mesquite",
        "name": "Mesquite Arpt",
        "country": "United States"
    },
    {
        "key": "MFI",
        "city": "Marshfield",
        "name": "Marshfield Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MFK",
        "city": "Matsu",
        "name": "Matsu Arpt",
        "country": "Taiwan"
    },
    {
        "key": "MFM",
        "city": "Macau",
        "name": "Macau Arpt",
        "country": "Macao"
    },
    {
        "key": "MFN",
        "city": "Milford Sound",
        "name": "Milford Sound Arpt",
        "country": "New Zealand"
    },
    {
        "key": "MFP",
        "city": "Manners Creek",
        "name": "Manners Creek Airport",
        "country": "Australia"
    },
    {
        "key": "MFQ",
        "city": "Maradi",
        "name": "Maradi Airport",
        "country": "Niger"
    },
    {
        "key": "MFR",
        "city": "Medford",
        "name": "Medford Jackson Cty",
        "country": "United States"
    },
    {
        "key": "MFT",
        "city": "Machu Picchu",
        "name": "Machu Picchu Arpt",
        "country": "Peru"
    },
    {
        "key": "MFU",
        "city": "Mfuwe, Zambia",
        "name": "Mfuwe Airport",
        "country": "Zambia"
    },
    {
        "key": "MGA",
        "city": "Managua",
        "name": "Augusto C Sandino",
        "country": "Nicaragua"
    },
    {
        "key": "MGB",
        "city": "Mt Gambier",
        "name": "Mount Gambier Arpt",
        "country": "Australia"
    },
    {
        "key": "MGC",
        "city": "Michigan City",
        "name": "Michigan City Arpt",
        "country": "United States"
    },
    {
        "key": "MGD",
        "city": "Magdalena",
        "name": "Magdalena",
        "country": "Bolivia"
    },
    {
        "key": "MGE",
        "city": "Marietta",
        "name": "Dobbins Air Force Base",
        "country": "United States"
    },
    {
        "key": "MGF",
        "city": "Maringa",
        "name": "Regional De Maringa Arpt",
        "country": "Brazil"
    },
    {
        "key": "MGH",
        "city": "Margate",
        "name": "Margate Arpt",
        "country": "South Africa"
    },
    {
        "key": "MGJ",
        "city": "Montgomery",
        "name": "Orange County Arpt",
        "country": "United States"
    },
    {
        "key": "MGL",
        "city": "Dusseldorf",
        "name": "Moenchen Gi Dus Exp",
        "country": "Germany"
    },
    {
        "key": "MGM",
        "city": "Montgomery",
        "name": "Dannelly Field",
        "country": "United States"
    },
    {
        "key": "MGP",
        "city": "Manga",
        "name": "Manga Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MGQ",
        "city": "Mogadishu",
        "name": "Aden Adde International Airport",
        "country": "Somalia"
    },
    {
        "key": "MGR",
        "city": "Moultrie",
        "name": "Moultrie Arpt",
        "country": "United States"
    },
    {
        "key": "MGS",
        "city": "Avarua District",
        "name": "Mangaia Airport",
        "country": "Cook Islands"
    },
    {
        "key": "MGV",
        "city": "Margaret River Station",
        "name": "Margaret River Station Arpt",
        "country": "Australia"
    },
    {
        "key": "MGW",
        "city": "Morgantown",
        "name": "Morgantown Municipal",
        "country": "United States"
    },
    {
        "key": "MGX",
        "city": "Moabi",
        "name": "Moabi Airport",
        "country": "Gabon"
    },
    {
        "key": "MGY",
        "city": "Dayton",
        "name": "Dayton General Airport South",
        "country": "United States"
    },
    {
        "key": "MHA",
        "city": "Skanes, Monastir",
        "name": "Mahdia Airport",
        "country": "Tunisia"
    },
    {
        "key": "MHB",
        "city": "Auckland",
        "name": "Mechanics Bay Arpt",
        "country": "New Zealand"
    },
    {
        "key": "MHC",
        "city": "Castro",
        "name": "Mocopulli",
        "country": "Chile"
    },
    {
        "key": "MHD",
        "city": "Mashad",
        "name": "Mashad Arpt",
        "country": "Iran"
    },
    {
        "key": "MHE",
        "city": "Mitchell",
        "name": "Mitchell Municipal",
        "country": "United States"
    },
    {
        "key": "MHF",
        "city": "Morichal",
        "name": "Morichal Airport",
        "country": "Colombia"
    },
    {
        "key": "MHG",
        "city": "Mannheim Germany",
        "name": "Mannheim Neuostheim",
        "country": "Germany"
    },
    {
        "key": "MHH",
        "city": "Marsh Harbour",
        "name": "Marsh Harbour Intl Arpt",
        "country": "Bahamas"
    },
    {
        "key": "MHI",
        "city": "Moucha Island",
        "name": "Moucha Airport",
        "country": "Djibouti"
    },
    {
        "key": "MHK",
        "city": "Manhattan",
        "name": "Manhattan Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MHL",
        "city": "Mulhouse Basel",
        "name": "Mulhouse",
        "country": "France"
    },
    {
        "key": "MHP",
        "city": "Minsk",
        "name": "Minsk Intl 1",
        "country": "Belarus"
    },
    {
        "key": "MHQ",
        "city": "Mariehamn",
        "name": "Mariehamn Arpt",
        "country": "Finland"
    },
    {
        "key": "MHR",
        "city": "Sacramento",
        "name": "Mather Air Force Base",
        "country": "United States"
    },
    {
        "key": "MHT",
        "city": "Manchester",
        "name": "Manchester Arpt",
        "country": "United States"
    },
    {
        "key": "HLI",
        "city": "Hollister",
        "name": "Hollister Arpt",
        "country": "United States"
    },
    {
        "key": "HLL",
        "city": "Stilwell",
        "name": "Hillside Airport",
        "country": "United States"
    },
    {
        "key": "HLM",
        "city": "Holland",
        "name": "Park Township",
        "country": "United States"
    },
    {
        "key": "HLN",
        "city": "Helena",
        "name": "Helena Municipal",
        "country": "United States"
    },
    {
        "key": "HLP",
        "city": "Jakarta",
        "name": "Halim Perdana Kusuma Arpt",
        "country": "Indonesia"
    },
    {
        "key": "HLR",
        "city": "Killeen",
        "name": "Fort Hood AAF",
        "country": "United States"
    },
    {
        "key": "HLS",
        "city": "St Helens",
        "name": "St Helens Arpt",
        "country": "Australia"
    },
    {
        "key": "HLW",
        "city": "Hluhluwe",
        "name": "Hluhluwe Arpt",
        "country": "South Africa"
    },
    {
        "key": "HLY",
        "city": "Holyhead",
        "name": "Holyhead Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "HLZ",
        "city": "Hamilton",
        "name": "Hamilton Arpt",
        "country": "New Zealand"
    },
    {
        "key": "HMA",
        "city": "Khanty Mansiysk",
        "name": "Khanty Mansiysk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "HMB",
        "city": "Sohag",
        "name": "Mubarak International Airport",
        "country": "Egypt"
    },
    {
        "key": "HME",
        "city": "Hassi Messaoud",
        "name": "Oued Irara Arpt",
        "country": "Algeria"
    },
    {
        "key": "HMI",
        "city": "Hami",
        "name": "Hami Airport",
        "country": "China"
    },
    {
        "key": "HMJ",
        "city": "Khmelnytsky, Ukraine",
        "name": "Khmelnytskyi Airport",
        "country": "Ukraine"
    },
    {
        "key": "HMN",
        "city": "Alamogordo",
        "name": "Holloman Airforce Base",
        "country": "United States"
    },
    {
        "key": "HMO",
        "city": "Hermosillo",
        "name": "Gen Ignacio Pesqueira Garcia Arpt",
        "country": "Mexico"
    },
    {
        "key": "HMR",
        "city": "Hamar",
        "name": "Hamar Arpt",
        "country": "Norway"
    },
    {
        "key": "HMT",
        "city": "Hemet",
        "name": "Hemet-Ryan Airport",
        "country": "United States"
    },
    {
        "key": "HMV",
        "city": "Hemavan",
        "name": "Hemavan Flyg",
        "country": "Sweden"
    },
    {
        "key": "HNA",
        "city": "Morioka",
        "name": "Hanamaki Arpt",
        "country": "Japan"
    },
    {
        "key": "HNB",
        "city": "Huntingburg",
        "name": "Huntingburg Municipal",
        "country": "United States"
    },
    {
        "key": "HNC",
        "city": "Hatteras",
        "name": "Hatteras Arpt",
        "country": "United States"
    },
    {
        "key": "HND",
        "city": "Tokyo",
        "name": "Haneda Arpt",
        "country": "Japan"
    },
    {
        "key": "HNH",
        "city": "Hoonah",
        "name": "Hoonah Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "HNL",
        "city": "Honolulu",
        "name": "Honolulu Intl",
        "country": "United States"
    },
    {
        "key": "HNM",
        "city": "Hana",
        "name": "Hana Municipal",
        "country": "United States"
    },
    {
        "key": "HNS",
        "city": "Haines",
        "name": "Haines Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "HNY",
        "city": "Hengyang",
        "name": "Hengyang Arpt",
        "country": "China"
    },
    {
        "key": "HOA",
        "city": "Hola",
        "name": "Hola Airport",
        "country": "Kenya"
    },
    {
        "key": "HOB",
        "city": "Hobbs",
        "name": "Lea County Arpt",
        "country": "United States"
    },
    {
        "key": "HOD",
        "city": "Hodeidah",
        "name": "Hodeidah Arpt",
        "country": "Yemen"
    },
    {
        "key": "HOF",
        "city": "Hofuf",
        "name": "Alahsa Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "HOG",
        "city": "Holguin",
        "name": "Frank Pias Arpt",
        "country": "Cuba"
    },
    {
        "key": "HOH",
        "city": "Hohenems",
        "name": "Hohenems Airport",
        "country": "Austria"
    },
    {
        "key": "HOI",
        "city": "Hao Island",
        "name": "Hao Island Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "HOM",
        "city": "Homer",
        "name": "Homer Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "HON",
        "city": "Huron",
        "name": "Huron Municipal",
        "country": "United States"
    },
    {
        "key": "HOO",
        "city": "Quang Duc",
        "name": "Nhon Co Airport",
        "country": "Vietnam"
    },
    {
        "key": "HOP",
        "city": "Hopkinsville",
        "name": "Hopkinsville Christian Country Arpt",
        "country": "United States"
    },
    {
        "key": "HOQ",
        "city": "Hof De",
        "name": "Hof Pirk Arpt",
        "country": "Germany"
    },
    {
        "key": "HOR",
        "city": "Horta",
        "name": "Horta Arpt",
        "country": "Portugal"
    },
    {
        "key": "HOT",
        "city": "Hot Springs",
        "name": "Memorial Field",
        "country": "United States"
    },
    {
        "key": "HOU",
        "city": "Houston",
        "name": "Houston Hobby Arpt",
        "country": "United States"
    },
    {
        "key": "HOV",
        "city": "Orsta Volda",
        "name": "Hovden Arpt",
        "country": "Norway"
    },
    {
        "key": "HOX",
        "city": "Homalin",
        "name": "Homalin Airport",
        "country": "Myanmar"
    },
    {
        "key": "HPA",
        "city": "Ha Apai",
        "name": "Salote Pilolevu Arpt",
        "country": "Tonga"
    },
    {
        "key": "HPH",
        "city": "Haiphong",
        "name": "Catbi Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "HPN",
        "city": "White Plains",
        "name": "Westchester County Arpt",
        "country": "United States"
    },
    {
        "key": "HPT",
        "city": "Hampton",
        "name": "Hampton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "HPV",
        "city": "Princeville",
        "name": "Princeville Arpt",
        "country": "United States"
    },
    {
        "key": "HRB",
        "city": "Harbin",
        "name": "Harbin Arpt",
        "country": "China"
    },
    {
        "key": "HRE",
        "city": "Harare",
        "name": "Harare Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "HRG",
        "city": "Hurghada",
        "name": "Hurghada Airport",
        "country": "Egypt"
    },
    {
        "key": "HRI",
        "city": "Mattala",
        "name": "Mattala Rajapaksa International Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "HRK",
        "city": "Kharkov",
        "name": "Kharkov Arpt",
        "country": "Ukraine"
    },
    {
        "key": "HRL",
        "city": "Harlingen",
        "name": "Rio Grande Valley Intl Arpt",
        "country": "United States"
    },
    {
        "key": "HRO",
        "city": "Harrison",
        "name": "Boone County Arpt",
        "country": "United States"
    },
    {
        "key": "HRR",
        "city": "L Altet",
        "name": "La Herrera Airport",
        "country": "Spain"
    },
    {
        "key": "HRS",
        "city": "Harrismith",
        "name": "Harrismith Arpt",
        "country": "South Africa"
    },
    {
        "key": "HRT",
        "city": "Harrogate",
        "name": "Linton On Ouse",
        "country": "United Kingdom"
    },
    {
        "key": "HRZ",
        "city": "Horizontina",
        "name": "Horizontina Arpt",
        "country": "Brazil"
    },
    {
        "key": "HSG",
        "city": "Saga",
        "name": "Saga Arpt",
        "country": "Japan"
    },
    {
        "key": "HSH",
        "city": "Las Vegas",
        "name": "Henderson Sky Harbor Arpt",
        "country": "United States"
    },
    {
        "key": "HSI",
        "city": "Hastings",
        "name": "Hastings Municipal",
        "country": "United States"
    },
    {
        "key": "HSK",
        "city": "Huesca",
        "name": "Pirineos Airport",
        "country": "Spain"
    },
    {
        "key": "HSL",
        "city": "Huslia",
        "name": "Huslia Arpt",
        "country": "United States"
    },
    {
        "key": "HSM",
        "city": "Dooen",
        "name": "Horsham Airport",
        "country": "Australia"
    },
    {
        "key": "HSN",
        "city": "Zhoushan",
        "name": "Zhoushan Arpt",
        "country": "China"
    },
    {
        "key": "HSP",
        "city": "Hot Springs",
        "name": "Ingalls Field",
        "country": "United States"
    },
    {
        "key": "HSS",
        "city": "Hissar",
        "name": "Hissar Airport",
        "country": "India"
    },
    {
        "key": "HST",
        "city": "Homestead",
        "name": "Homestead Municipal",
        "country": "United States"
    },
    {
        "key": "HSV",
        "city": "Huntsville",
        "name": "Huntsville Intl Arpt",
        "country": "United States"
    },
    {
        "key": "APX",
        "city": "Arapongas, ParanÃ¡, Brazil",
        "name": "Arapongas Airport",
        "country": "Brazil"
    },
    {
        "key": "APY",
        "city": "Alto ParnaÃ­ba, MaranhÃ£o, Brazil",
        "name": "Alto ParnaÃ­ba Airport",
        "country": "Brazil"
    },
    {
        "key": "AQA",
        "city": "Araraquara",
        "name": "Araraquara Arpt",
        "country": "Brazil"
    },
    {
        "key": "AQG",
        "city": "v",
        "name": "Tianzhushan",
        "country": "China"
    },
    {
        "key": "AQI",
        "city": "Qaisumah",
        "name": "Qaisumah Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "AQJ",
        "city": "Aqaba",
        "name": "Aqaba Airport",
        "country": "Jordan"
    },
    {
        "key": "AQP",
        "city": "Arequipa",
        "name": "Rodriguez Ballon Arpt",
        "country": "Peru"
    },
    {
        "key": "ARA",
        "city": "NEW IBERIA",
        "name": "Acadiana Regional Arpt",
        "country": "United States"
    },
    {
        "key": "ARB",
        "city": "Ann Arbor",
        "name": "Ann Arbor Municipal",
        "country": "United States"
    },
    {
        "key": "ARC",
        "city": "Arctic Village",
        "name": "Arctic Village Arpt",
        "country": "United States"
    },
    {
        "key": "ARE",
        "city": "Santana",
        "name": "Antonio (Nery) Juarbe Pol Airport (FAA: ABO)",
        "country": "Puerto Rico"
    },
    {
        "key": "ARG",
        "city": "Walnut Ridge",
        "name": "Walnut Ridge Arpt",
        "country": "United States"
    },
    {
        "key": "ARH",
        "city": "Arkhangelsk",
        "name": "Arkhangelsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "ARI",
        "city": "Arica",
        "name": "Chacalluta Arpt",
        "country": "Chile"
    },
    {
        "key": "ARK",
        "city": "Arusha",
        "name": "Arusha Arpt",
        "country": "Tanzania"
    },
    {
        "key": "ARM",
        "city": "Armidale",
        "name": "Armidale Arpt",
        "country": "Australia"
    },
    {
        "key": "ARN",
        "city": "Stockholm",
        "name": "Arlanda Arpt",
        "country": "Sweden"
    },
    {
        "key": "ARO",
        "city": "Arboletes, Colombia",
        "name": "Arboletes Airport",
        "country": "Colombia"
    },
    {
        "key": "ART",
        "city": "Watertown",
        "name": "Watertown Arpt",
        "country": "United States"
    },
    {
        "key": "ARU",
        "city": "Aracatuba",
        "name": "Aracatuba Arpt",
        "country": "Brazil"
    },
    {
        "key": "ARV",
        "city": "Minocqua",
        "name": "Noble F Lee Memorial Field",
        "country": "United States"
    },
    {
        "key": "ARW",
        "city": "Arad",
        "name": "Arad Arpt",
        "country": "Romania"
    },
    {
        "key": "ARY",
        "city": "Ararat",
        "name": "Ararat Arpt",
        "country": "Australia"
    },
    {
        "key": "ASA",
        "city": "Assab, Eritrea",
        "name": "Assab International Airport",
        "country": "Eritrea"
    },
    {
        "key": "ASB",
        "city": "Ashgabat",
        "name": "Ashgabat Arpt",
        "country": "Turkmenistan"
    },
    {
        "key": "ASD",
        "city": "Andros Town",
        "name": "Andros Town Arpt",
        "country": "Bahamas"
    },
    {
        "key": "ASE",
        "city": "Aspen",
        "name": "Pitkin Cty Arptt Sardy Fld",
        "country": "United States"
    },
    {
        "key": "ASF",
        "city": "Astrakhan",
        "name": "Astrakhan Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "ASH",
        "city": "Nashua",
        "name": "Boire Field Arpt",
        "country": "United States"
    },
    {
        "key": "ASJ",
        "city": "Amami O Shima",
        "name": "Amami O Shima Arpt",
        "country": "Japan"
    },
    {
        "key": "ASK",
        "city": "Yamoussouro",
        "name": "Yamoussoukro Arpt",
        "country": "CÃ´te dIvoire"
    },
    {
        "key": "ASL",
        "city": "Marshall",
        "name": "Harrison County Arpt",
        "country": "United States"
    },
    {
        "key": "ASM",
        "city": "Asmara",
        "name": "Asmara Intl Arpt",
        "country": "Eritrea"
    },
    {
        "key": "ASN",
        "city": "Talladega",
        "name": "Talladega Arpt",
        "country": "United States"
    },
    {
        "key": "ASO",
        "city": "Asosa, Ethiopia",
        "name": "Asosa Airport",
        "country": "Ethiopia"
    },
    {
        "key": "ASP",
        "city": "Alice Springs",
        "name": "Alice Springs Arpt",
        "country": "Australia"
    },
    {
        "key": "ASQ",
        "city": "Austin",
        "name": "Austin Airport",
        "country": "United States"
    },
    {
        "key": "ASR",
        "city": "Kayseri",
        "name": "Kayseri Arpt",
        "country": "Turkey"
    },
    {
        "key": "AST",
        "city": "Astoria",
        "name": "Astoria Arpt",
        "country": "United States"
    },
    {
        "key": "ASU",
        "city": "Asuncion",
        "name": "Salvio Pettirosse Arpt",
        "country": "Paraguay"
    },
    {
        "key": "ASV",
        "city": "Amboseli, Kenya",
        "name": "Amboseli Airport",
        "country": "Kenya"
    },
    {
        "key": "ASW",
        "city": "Aswan",
        "name": "Daraw Arpt",
        "country": "Egypt"
    },
    {
        "key": "ATA",
        "city": "Huaraz",
        "name": "Comandante FAP GermÃ¡n Arias Graziani Airport",
        "country": "Peru"
    },
    {
        "key": "ATC",
        "city": "Arthurs Town",
        "name": "Arthurs Town Arpt",
        "country": "Bahamas"
    },
    {
        "key": "ATE",
        "city": "Antlers, Oklahoma",
        "name": "Antlers Municipal Airport (FAA: 80F)",
        "country": "United States"
    },
    {
        "key": "ATH",
        "city": "Athens",
        "name": "Eleftherios Venizelos Intl Arpt",
        "country": "Greece"
    },
    {
        "key": "ATI",
        "city": "Artigas",
        "name": "Artigas Arpt",
        "country": "Uruguay"
    },
    {
        "key": "ATK",
        "city": "Barrow",
        "name": "Atqasuk Edward Burnell Sr. Memorial Airport",
        "country": "United States"
    },
    {
        "key": "ATL",
        "city": "Atlanta",
        "name": "Hartsfield Jackson Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ATM",
        "city": "Altamira",
        "name": "Altamira Arpt",
        "country": "Brazil"
    },
    {
        "key": "ATO",
        "city": "Athens",
        "name": "Ohio University Arpt",
        "country": "United States"
    },
    {
        "key": "ATP",
        "city": "Aitape",
        "name": "Aitape Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ATQ",
        "city": "Amritsar",
        "name": "Raja Sansi Arpt",
        "country": "India"
    },
    {
        "key": "ATR",
        "city": "Atar",
        "name": "Mouakchott Arpt",
        "country": "Mauritania"
    },
    {
        "key": "ATW",
        "city": "Appleton",
        "name": "Outagamie Cty Arpt",
        "country": "United States"
    },
    {
        "key": "ATY",
        "city": "Watertown",
        "name": "Watertown Municipal",
        "country": "United States"
    },
    {
        "key": "ATZ",
        "city": "Assiut",
        "name": "Assiut Airport",
        "country": "Egypt"
    },
    {
        "key": "AUA",
        "city": "Aruba",
        "name": "Reina Beatrix Arpt",
        "country": "Aruba"
    },
    {
        "key": "AUC",
        "city": "Arauca",
        "name": "Arauca Arpt",
        "country": "Colombia"
    },
    {
        "key": "AUD",
        "city": "Stokes",
        "name": "Augustus Downs Airport",
        "country": "Australia"
    },
    {
        "key": "AUE",
        "city": "Abou Redis, Egypt",
        "name": "Abu Rudeis Airport",
        "country": "Egypt"
    },
    {
        "key": "AUF",
        "city": "Auxerre",
        "name": "Branches airport",
        "country": "France"
    },
    {
        "key": "AUG",
        "city": "Augusta",
        "name": "Maine State Arpt",
        "country": "United States"
    },
    {
        "key": "AUH",
        "city": "Abu Dhabi",
        "name": "Dhabi Intl Arpt",
        "country": "United Arab Emirates"
    },
    {
        "key": "AUI",
        "city": "Aua Island",
        "name": "Aua Island Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "AUK",
        "city": "Alakanuk",
        "name": "Alakanuk Airport",
        "country": "United States"
    },
    {
        "key": "AUL",
        "city": "Aurillac",
        "name": "Aur Airport",
        "country": "France"
    },
    {
        "key": "AUM",
        "city": "Austin",
        "name": "Austin Airport",
        "country": "United States"
    },
    {
        "key": "AUN",
        "city": "AUBURN",
        "name": "AUBURN ARPT",
        "country": "United States"
    },
    {
        "key": "AUO",
        "city": "Auburn",
        "name": "Auburn Opelika",
        "country": "United States"
    },
    {
        "key": "AUQ",
        "city": "Atuona",
        "name": "Atuona Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "AUR",
        "city": "Aurillac",
        "name": "Tronquieres Arpt",
        "country": "France"
    },
    {
        "key": "OGA",
        "city": "Ogallala",
        "name": "Searle Field",
        "country": "United States"
    },
    {
        "key": "OGB",
        "city": "Columbia",
        "name": "Orangeburg Municpal",
        "country": "United States"
    },
    {
        "key": "OGD",
        "city": "Ogden",
        "name": "Ogden Municipal",
        "country": "United States"
    },
    {
        "key": "OGG",
        "city": "Kahului",
        "name": "Kahului Airport",
        "country": "United States"
    },
    {
        "key": "OGL",
        "city": "Georgetown",
        "name": "Ogle",
        "country": "Guyana"
    },
    {
        "key": "OGN",
        "city": "Yonaguni",
        "name": "Yonaguni Jima Airport",
        "country": "Japan"
    },
    {
        "key": "OGO",
        "city": "Abengourou",
        "name": "Abengourou Airport",
        "country": "CotedIvoire"
    },
    {
        "key": "OGR",
        "city": "Bangor",
        "name": "Bongor Airport",
        "country": "United States"
    },
    {
        "key": "OGS",
        "city": "Ogdensburg",
        "name": "Ogdensburg Municipal",
        "country": "United States"
    },
    {
        "key": "PUW",
        "city": "Pullman",
        "name": "Pullman Moscow Arpt",
        "country": "United States"
    },
    {
        "key": "OGZ",
        "city": "Vladikavkaz",
        "name": "Beslan Airport",
        "country": "Russian Federation"
    },
    {
        "key": "OHA",
        "city": "Ohakea",
        "name": "Royal Air Force Base Airport",
        "country": "New Zealand"
    },
    {
        "key": "PUY",
        "city": "Pula",
        "name": "Pula Arpt",
        "country": "Croatia"
    },
    {
        "key": "OHD",
        "city": "Ohrid",
        "name": "Ohrid Arpt",
        "country": "Macedonia"
    },
    {
        "key": "PVA",
        "city": "Providencia",
        "name": "Providencia Arpt",
        "country": "Colombia"
    },
    {
        "key": "PVC",
        "city": "Provincetown",
        "name": "Provincetown Municipal",
        "country": "United States"
    },
    {
        "key": "OHE",
        "city": "Da Hinggan Ling",
        "name": "Mohe Gulian Airport",
        "country": "China"
    },
    {
        "key": "PVD",
        "city": "Providence",
        "name": "T F Green St Arpt",
        "country": "United States"
    },
    {
        "key": "OHH",
        "city": "Okha",
        "name": "Okha Airport (Novostroyka Airport)",
        "country": "Russia"
    },
    {
        "key": "PVG",
        "city": "Shanghai",
        "name": "Pudong International Arpt",
        "country": "China"
    },
    {
        "key": "OHO",
        "city": "Okhotsk",
        "name": "Okhotsk Airport",
        "country": "Russia"
    },
    {
        "key": "PVH",
        "city": "Porto Velho",
        "name": "Belmonte Arpt",
        "country": "Brazil"
    },
    {
        "key": "OHR",
        "city": "Wyk auf FÃ¶hr",
        "name": "Wyk auf FÃ¶hr Airport",
        "country": "Germany"
    },
    {
        "key": "PVK",
        "city": "Preveza",
        "name": "Aktion Arpt",
        "country": "Greece"
    },
    {
        "key": "OHT",
        "city": "Kohat",
        "name": "PAF Base Kohat",
        "country": "Pakistan"
    },
    {
        "key": "PVO",
        "city": "Portoviejo",
        "name": "Reales Tamarindos Airport",
        "country": "Ecuador"
    },
    {
        "key": "PVR",
        "city": "Puerto Vallarta",
        "name": "Ordaz Arpt",
        "country": "Mexico"
    },
    {
        "key": "OIA",
        "city": "Ourilandia",
        "name": "Ourilandia Arpt",
        "country": "Brazil"
    },
    {
        "key": "PVU",
        "city": "Provo",
        "name": "Provo Arpt",
        "country": "United States"
    },
    {
        "key": "OIM",
        "city": "Oshima",
        "name": "Oshima Arpt",
        "country": "Japan"
    },
    {
        "key": "PVW",
        "city": "Plainview",
        "name": "Hale County Arpt",
        "country": "United States"
    },
    {
        "key": "OIR",
        "city": "Okushiri-cho",
        "name": "Okushiri Airport",
        "country": "Japan"
    },
    {
        "key": "PWA",
        "city": "Oklahoma City",
        "name": "Wiley Post Arpt",
        "country": "United States"
    },
    {
        "key": "OIT",
        "city": "Oita",
        "name": "Oita Arpt",
        "country": "Japan"
    },
    {
        "key": "PWI",
        "city": "Pawi",
        "name": "Beles Airport",
        "country": "Ethiopia"
    },
    {
        "key": "PWK",
        "city": "Chicago",
        "name": "Pal Waukee Arpt",
        "country": "United States"
    },
    {
        "key": "OJC",
        "city": "Kansas City",
        "name": "Johnson Executive Arpt",
        "country": "United States"
    },
    {
        "key": "PWL",
        "city": "Purwokerto",
        "name": "Wirasaba Airport",
        "country": "Indonesia"
    },
    {
        "key": "PWM",
        "city": "Portland",
        "name": "Portland Intl Jetport",
        "country": "United States"
    },
    {
        "key": "OKA",
        "city": "Okinawa",
        "name": "Naha Field",
        "country": "Japan"
    },
    {
        "key": "PWO",
        "city": "Pweto, Democratic Republic of the Congo",
        "name": "Pweto Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "OKB",
        "city": "Fraser Island",
        "name": "Orchid Beach Airport",
        "country": "Australia"
    },
    {
        "key": "PWQ",
        "city": "Pavlodar",
        "name": "Pavlodar Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "OKC",
        "city": "Oklahoma City",
        "name": "Will Rogers World Arpt",
        "country": "United States"
    },
    {
        "key": "PWR",
        "city": "Port Walter",
        "name": "Port Walter Arpt",
        "country": "United States"
    },
    {
        "key": "PWT",
        "city": "Bremerton",
        "name": "Bremerton Municipal",
        "country": "United States"
    },
    {
        "key": "OKD",
        "city": "Sapporo",
        "name": "Okadama Arpt",
        "country": "Japan"
    },
    {
        "key": "PXL",
        "city": "Polacca",
        "name": "Polacca Arpt",
        "country": "United States"
    },
    {
        "key": "OKE",
        "city": "Okino Erabu",
        "name": "Okino Erabu Arpt",
        "country": "Japan"
    },
    {
        "key": "PXM",
        "city": "Puerto Escondido",
        "name": "Puerto Escondido Municipal",
        "country": "Mexico"
    },
    {
        "key": "OKJ",
        "city": "Okayama",
        "name": "Okayama Arpt",
        "country": "Japan"
    },
    {
        "key": "PXO",
        "city": "Porto Santo",
        "name": "Porto Santo Arpt",
        "country": "Portugal"
    },
    {
        "key": "OKK",
        "city": "Kokomo",
        "name": "Kokomo Municipal",
        "country": "United States"
    },
    {
        "key": "PXR",
        "city": "Surin",
        "name": "Surin",
        "country": "Thailand"
    },
    {
        "key": "PXU",
        "city": "Pleiku",
        "name": "Pleiku Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "PYB",
        "city": "Jeypore",
        "name": "Jeypore Airport",
        "country": "India"
    },
    {
        "key": "OKO",
        "city": "Tokyo",
        "name": "Yokota AFB",
        "country": "Japan"
    },
    {
        "key": "PYC",
        "city": "Mulatupo",
        "name": "PlayÃ³n Chico Airport",
        "country": "Panama"
    },
    {
        "key": "PYE",
        "city": "Aitutaki",
        "name": "Tongareva Airport",
        "country": "Cook Islands"
    },
    {
        "key": "OKT",
        "city": "Oktyabrsky, Bashkortostan, Russia",
        "name": "Oktyabrsky Airport",
        "country": "Russia"
    },
    {
        "key": "PYJ",
        "city": "Udachny",
        "name": "Polyarny Airport",
        "country": "Russia"
    },
    {
        "key": "PYM",
        "city": "Plymouth",
        "name": "Plymouth Arpt",
        "country": "United States"
    },
    {
        "key": "OKY",
        "city": "Kelvinhaugh",
        "name": "Oakey Army Aviation Centre",
        "country": "Australia"
    },
    {
        "key": "PYN",
        "city": "Payan",
        "name": "Payan Airport",
        "country": "Colombia"
    },
    {
        "key": "PYR",
        "city": "Andravida",
        "name": "Andravida Air Base",
        "country": "Greece"
    },
    {
        "key": "OLA",
        "city": "Orlando",
        "name": "Orland Airport",
        "country": "United States"
    },
    {
        "key": "PYS",
        "city": "Paradise, California",
        "name": "Paradise Skypark (FAA: CA92)",
        "country": "United States"
    },
    {
        "key": "PYX",
        "city": "Pattaya",
        "name": "Pattaya Arpt",
        "country": "Thailand"
    },
    {
        "key": "OLB",
        "city": "Olbia",
        "name": "Costa Smeralda Arpt",
        "country": "Italy"
    },
    {
        "key": "PYY",
        "city": "Pai City",
        "name": "Pai Arpt",
        "country": "Thailand"
    },
    {
        "key": "OLC",
        "city": "SÃ£o Paulo de OlivenÃ§a, Amazonas, Brazil",
        "name": "Senadora Eunice Michiles Airport",
        "country": "Brazil"
    },
    {
        "key": "BSD",
        "city": "Baoshan",
        "name": "Baoshan Arpt",
        "country": "China"
    },
    {
        "key": "BSE",
        "city": "Sematan",
        "name": "Sematan Airport",
        "country": "Malaysia"
    },
    {
        "key": "BSG",
        "city": "Bata",
        "name": "Bata Airport",
        "country": "Equatorial Guinea"
    },
    {
        "key": "BSH",
        "city": "Brighton",
        "name": "Brighton Airport",
        "country": "United Kingdom"
    },
    {
        "key": "BSI",
        "city": "Blairsville",
        "name": "Blairsville Arpt",
        "country": "United States"
    },
    {
        "key": "BSJ",
        "city": "Bairnsdale",
        "name": "Bairnsdale Airport",
        "country": "Australia"
    },
    {
        "key": "BSK",
        "city": "Biskra",
        "name": "Biskra Arpt",
        "country": "Algeria"
    },
    {
        "key": "BSL",
        "city": "Basel",
        "name": "Basel EuroAirport Swiss",
        "country": "Switzerland"
    },
    {
        "key": "BSM",
        "city": "Bishe Kola",
        "name": "Bishe Kola Air Base",
        "country": "Iran"
    },
    {
        "key": "BSN",
        "city": "Bossangoa",
        "name": "Bossangoa Airport",
        "country": "Central African Republic"
    },
    {
        "key": "LSI",
        "city": "Lerwick",
        "name": "Sumburgh Airport",
        "country": "United Kingdom"
    },
    {
        "key": "LSL",
        "city": "Los Chiles, Costa Rica",
        "name": "Los Chiles Airport",
        "country": "Costa Rica"
    },
    {
        "key": "LSN",
        "city": "Los Banos",
        "name": "Los Banos Arpt",
        "country": "United States"
    },
    {
        "key": "BSO",
        "city": "Basco",
        "name": "Basco",
        "country": "Philippines"
    },
    {
        "key": "LSO",
        "city": "Les Sables",
        "name": "Talmont Arpt",
        "country": "France"
    },
    {
        "key": "LSP",
        "city": "Las Piedras",
        "name": "Josefa Camejo Arpt",
        "country": "Venezuela"
    },
    {
        "key": "LSQ",
        "city": "Los Angeles",
        "name": "Maria Dolores Arpt",
        "country": "Chile"
    },
    {
        "key": "BSP",
        "city": "Bensbach",
        "name": "Bensbach Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "LSS",
        "city": "Terre-de-Haut Island, Iles des Saintes, Guadeloupe",
        "name": "Les Saintes Airport",
        "country": "Guadeloupe"
    },
    {
        "key": "LST",
        "city": "Launceston",
        "name": "Launceston Arpt",
        "country": "Australia"
    },
    {
        "key": "BSQ",
        "city": "Bisbee",
        "name": "Bisbee Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "LSV",
        "city": "Las Vegas",
        "name": "Nellis Air Force Base",
        "country": "United States"
    },
    {
        "key": "LSW",
        "city": "Lhokseumawe, Indonesia",
        "name": "Malikus Saleh Airport",
        "country": "Indonesia"
    },
    {
        "key": "LSY",
        "city": "Lismore",
        "name": "Lismore Airport",
        "country": "Australia"
    },
    {
        "key": "BSR",
        "city": "Basra",
        "name": "Basra Intl Arpt",
        "country": "Iraq"
    },
    {
        "key": "LSZ",
        "city": "Mali LoÅ¡inj",
        "name": "LoÅ¡inj Airport",
        "country": "Croatia"
    },
    {
        "key": "BSS",
        "city": "Balsas",
        "name": "Balsas",
        "country": "Brazil"
    },
    {
        "key": "LTA",
        "city": "Tzaneen",
        "name": "Letaba Aprt",
        "country": "South Africa"
    },
    {
        "key": "LTB",
        "city": "Latrobe",
        "name": "Latrobe Airport",
        "country": "United States"
    },
    {
        "key": "BST",
        "city": "Lashkar Gah",
        "name": "Bost Airport",
        "country": "Afghanistan"
    },
    {
        "key": "LTC",
        "city": "Lai",
        "name": "Lai",
        "country": "Chad"
    },
    {
        "key": "BSU",
        "city": "Basankusu",
        "name": "Basankusu Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "BSV",
        "city": "Besakoa",
        "name": "Besakoa Airport",
        "country": "Madagascar"
    },
    {
        "key": "LTD",
        "city": "Ghadamis East",
        "name": "Ghadames Airport",
        "country": "Libya"
    },
    {
        "key": "LTI",
        "city": "Altai",
        "name": "Altai Airport",
        "country": "Mongolia"
    },
    {
        "key": "BSX",
        "city": "Pathein",
        "name": "Pathein Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "LTK",
        "city": "Latakia",
        "name": "Hmelmin Airport",
        "country": "Syrian Arab Republic"
    },
    {
        "key": "LTL",
        "city": "Lastoursville",
        "name": "Lastourville Airport",
        "country": "Gabon"
    },
    {
        "key": "BSY",
        "city": "Bardera, Somalia",
        "name": "Bardera Airport",
        "country": "Somalia"
    },
    {
        "key": "LTM",
        "city": "Lethem",
        "name": "Lethem Airport",
        "country": "Guyana"
    },
    {
        "key": "BTA",
        "city": "Bertoua",
        "name": "Bertoua Airport",
        "country": "Cameroon"
    },
    {
        "key": "LTN",
        "city": "Luton",
        "name": "Luton Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "BTC",
        "city": "Batticaloa",
        "name": "Batticaloa Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "LTO",
        "city": "Loreto",
        "name": "Loreto Intl Arpt",
        "country": "Mexico"
    },
    {
        "key": "BTE",
        "city": "Bonthe, Sierra Leone",
        "name": "Sherbro International Airport",
        "country": "Sierra Leone"
    },
    {
        "key": "LTP",
        "city": "Lyndhurst",
        "name": "Lyndhurst Airport",
        "country": "Australia"
    },
    {
        "key": "LTQ",
        "city": "Le Touquet",
        "name": "Le Touquet Arpt",
        "country": "France"
    },
    {
        "key": "BTF",
        "city": "Woods Cross",
        "name": "Skypark Airport",
        "country": "United States"
    },
    {
        "key": "LTR",
        "city": "Letterkenny, Ireland",
        "name": "Letterkenny Airfield",
        "country": "Ireland"
    },
    {
        "key": "LTS",
        "city": "Altus",
        "name": "Altus Airforce Base",
        "country": "United States"
    },
    {
        "key": "BTH",
        "city": "Batam",
        "name": "Hang Nadim Arpt",
        "country": "Indonesia"
    },
    {
        "key": "LTT",
        "city": "St Tropez",
        "name": "La Mole Arpt",
        "country": "France"
    },
    {
        "key": "BTI",
        "city": "Kaktovik",
        "name": "Barter Island",
        "country": "United States"
    },
    {
        "key": "LTU",
        "city": "Latur",
        "name": "Latur Arpt",
        "country": "India"
    },
    {
        "key": "BTJ",
        "city": "Banda Aceh",
        "name": "Blang Bintang Arpt",
        "country": "Indonesia"
    },
    {
        "key": "LTX",
        "city": "Latacunga",
        "name": "Cotapaxi Intl Arpt",
        "country": "Ecuador"
    },
    {
        "key": "LUA",
        "city": "Lukla",
        "name": "Lukla",
        "country": "Nepal"
    },
    {
        "key": "LUC",
        "city": "Laucala Island, Fiji",
        "name": "Laucala Airport",
        "country": "Fiji"
    },
    {
        "key": "LUD",
        "city": "Luderitz",
        "name": "Luderitz Arpt",
        "country": "Namibia"
    },
    {
        "key": "BTK",
        "city": "Bratsk",
        "name": "Bratsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "LUE",
        "city": "SliaÄ_x008d_",
        "name": "BoÄ¾kovce Airport",
        "country": "Slovakia"
    },
    {
        "key": "LUF",
        "city": "Phoenix",
        "name": "Luke AFB",
        "country": "United States"
    },
    {
        "key": "BTL",
        "city": "Battle Creek",
        "name": "WK Kellogg Regional",
        "country": "United States"
    },
    {
        "key": "LUG",
        "city": "Lugano",
        "name": "Agno Airport",
        "country": "Switzerland"
    },
    {
        "key": "LUH",
        "city": "Ludhiana",
        "name": "Ludhiana Arpt",
        "country": "India"
    },
    {
        "key": "BTM",
        "city": "Butte",
        "name": "Bert Mooney Arpt",
        "country": "United States"
    },
    {
        "key": "LUK",
        "city": "Cincinnati",
        "name": "Cincinnati Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BTN",
        "city": "Bennettsville",
        "name": "Marlboro County Jetport",
        "country": "United States"
    },
    {
        "key": "LUL",
        "city": "Laurel",
        "name": "Hesler Noble Field",
        "country": "United States"
    },
    {
        "key": "LUM",
        "city": "Mangshi",
        "name": "Dehong Mangshi",
        "country": "China"
    },
    {
        "key": "LUN",
        "city": "Lusaka",
        "name": "Lusaka Airport",
        "country": "Zambia"
    },
    {
        "key": "BTP",
        "city": "Butler",
        "name": "GRAHAM FIELD ARPT",
        "country": "United States"
    },
    {
        "key": "LUO",
        "city": "Luena",
        "name": "Luena Airport",
        "country": "Angola"
    },
    {
        "key": "BTQ",
        "city": "Butare",
        "name": "Butare Airport",
        "country": "Rwanda"
    },
    {
        "key": "MLX",
        "city": "Malatya",
        "name": "Malatya Arpt",
        "country": "Turkey"
    },
    {
        "key": "MLY",
        "city": "Manley Hot Springs",
        "name": "Manley Hot Springs Airport",
        "country": "United States"
    },
    {
        "key": "MLZ",
        "city": "Melo",
        "name": "Melo Arpt",
        "country": "Uruguay"
    },
    {
        "key": "MMB",
        "city": "Memambetsu",
        "name": "Memanbetsu Arpt",
        "country": "Japan"
    },
    {
        "key": "MMC",
        "city": "Ciudad Mante",
        "name": "Ciudad Mante Arpt",
        "country": "Mexico"
    },
    {
        "key": "MMD",
        "city": "Minami",
        "name": "Minami-Daito Airport",
        "country": "Japan"
    },
    {
        "key": "MME",
        "city": "Durham",
        "name": "Durham Tees Valley Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "MMG",
        "city": "Mount Magnet",
        "name": "Mount Magnet Arpt",
        "country": "Australia"
    },
    {
        "key": "MMH",
        "city": "Mammoth Lakes",
        "name": "Mammoth Lakes Municipal",
        "country": "United States"
    },
    {
        "key": "MMI",
        "city": "Athens",
        "name": "McMinn County Arpt",
        "country": "United States"
    },
    {
        "key": "MMJ",
        "city": "Matsumoto",
        "name": "Matsumoto Arpt",
        "country": "Japan"
    },
    {
        "key": "MMK",
        "city": "Murmansk",
        "name": "Murmansk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "MML",
        "city": "Marshall",
        "name": "Marshall Municipal",
        "country": "United States"
    },
    {
        "key": "MMM",
        "city": "Middlemount",
        "name": "Middlemount Arpt",
        "country": "Australia"
    },
    {
        "key": "MMN",
        "city": "Stow",
        "name": "Minute Man Air Field (FAA: 6B6)",
        "country": "United States"
    },
    {
        "key": "MMO",
        "city": "Maio",
        "name": "Vila Do Maio Arpt",
        "country": "Cape Verde"
    },
    {
        "key": "MMQ",
        "city": "Mbala",
        "name": "Mbala",
        "country": "Zambia"
    },
    {
        "key": "MMR",
        "city": "Austin",
        "name": "Camp Maybry Ahp",
        "country": "United States"
    },
    {
        "key": "MMS",
        "city": "Marks",
        "name": "Selfs Airport",
        "country": "United States"
    },
    {
        "key": "MMT",
        "city": "Columbia",
        "name": "Mc Entire Air National Guard Base Arpt",
        "country": "United States"
    },
    {
        "key": "MMU",
        "city": "Morristown",
        "name": "Morristown Arpt",
        "country": "United States"
    },
    {
        "key": "MMW",
        "city": "Moma, Mozambique",
        "name": "Moma Airport",
        "country": "Russia"
    },
    {
        "key": "MMX",
        "city": "Malmo",
        "name": "Sturup Arpt",
        "country": "Sweden"
    },
    {
        "key": "MMY",
        "city": "Miyako Jima",
        "name": "Hirara Arpt",
        "country": "Japan"
    },
    {
        "key": "MNA",
        "city": "Melonguane, Indonesia",
        "name": "Melangguane Airport",
        "country": "Indonesia"
    },
    {
        "key": "MNC",
        "city": "Nacala",
        "name": "Nacala Airport",
        "country": "Mozambique"
    },
    {
        "key": "MND",
        "city": "Medina",
        "name": "Medina",
        "country": "Colombia"
    },
    {
        "key": "MNE",
        "city": "Mungerannie",
        "name": "Mungerannie Airport",
        "country": "Australia"
    },
    {
        "key": "MNF",
        "city": "Mana Island, Fiji",
        "name": "Mana Island Airport",
        "country": "Fiji"
    },
    {
        "key": "MNG",
        "city": "Maningrida",
        "name": "Maningrida Airport",
        "country": "Australia"
    },
    {
        "key": "MNI",
        "city": "Montserrat",
        "name": "Bramble Arpt",
        "country": "Dominica"
    },
    {
        "key": "MNJ",
        "city": "Mananjary",
        "name": "Mananjary Airport",
        "country": "Madagascar"
    },
    {
        "key": "MNK",
        "city": "Maiana",
        "name": "Maiana Airport",
        "country": "Kiribati"
    },
    {
        "key": "MNL",
        "city": "Manila",
        "name": "Ninoy Aquino Intl",
        "country": "Philippines"
    },
    {
        "key": "MNM",
        "city": "Menominee",
        "name": "Menominee County",
        "country": "United States"
    },
    {
        "key": "MNN",
        "city": "Marion",
        "name": "Marion Municipal Airport",
        "country": "United States"
    },
    {
        "key": "MNO",
        "city": "Manono",
        "name": "Manono Arpt",
        "country": "Congo"
    },
    {
        "key": "MNQ",
        "city": "Monto",
        "name": "Monto Arpt",
        "country": "Australia"
    },
    {
        "key": "MNR",
        "city": "Mongu",
        "name": "Mongu Airport",
        "country": "Zambia"
    },
    {
        "key": "MNS",
        "city": "Mansa",
        "name": "Mansa Airport",
        "country": "Zambia"
    },
    {
        "key": "MNT",
        "city": "Fairbanks",
        "name": "Minto Al Wright Airport (FAA: 51Z)",
        "country": "United States"
    },
    {
        "key": "MNX",
        "city": "Manicore",
        "name": "Manicore Airport",
        "country": "Brazil"
    },
    {
        "key": "MNY",
        "city": "Mono Island, Treasury Islands, Solomon Islands",
        "name": "Mono Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "MNZ",
        "city": "Manassas",
        "name": "Manassas Arpt",
        "country": "United States"
    },
    {
        "key": "MOA",
        "city": "Moa",
        "name": "Orestes Acosta Airport",
        "country": "Cuba"
    },
    {
        "key": "MOB",
        "city": "Mobile",
        "name": "Mobile Municipal",
        "country": "United States"
    },
    {
        "key": "MOC",
        "city": "Montes Claros",
        "name": "Montes Claros Arpt",
        "country": "Brazil"
    },
    {
        "key": "MOD",
        "city": "Modesto",
        "name": "Harry Sham Fld",
        "country": "United States"
    },
    {
        "key": "MOF",
        "city": "Maumere, Indonesia",
        "name": "Frans Seda Airport (Wai Oti Airport)",
        "country": "Indonesia"
    },
    {
        "key": "MOG",
        "city": "Mong Hsat",
        "name": "Monghsat Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "MOI",
        "city": "Mitiaro Island",
        "name": "Mitiaro Island Arpt",
        "country": "Cook Islands"
    },
    {
        "key": "MOL",
        "city": "Molde",
        "name": "Aro Arpt",
        "country": "Norway"
    },
    {
        "key": "MOM",
        "city": "Moudjeria",
        "name": "Letfotar Airport",
        "country": "Mauritania"
    },
    {
        "key": "MON",
        "city": "Mount Cook",
        "name": "Mount Cook Arpt",
        "country": "New Zealand"
    },
    {
        "key": "MOO",
        "city": "Gidgealpa",
        "name": "Moomba Airport",
        "country": "Australia"
    },
    {
        "key": "MOP",
        "city": "Mount Pleasant",
        "name": "Mt Pleasant Municipal",
        "country": "United States"
    },
    {
        "key": "MOQ",
        "city": "Morondava",
        "name": "Morondava Arpt",
        "country": "Madagascar"
    },
    {
        "key": "MOR",
        "city": "Morristown",
        "name": "MOORE MURRELL ARPT",
        "country": "United States"
    },
    {
        "key": "MOT",
        "city": "Minot",
        "name": "Minot Intl",
        "country": "United States"
    },
    {
        "key": "MOU",
        "city": "Mountain Village",
        "name": "Mountain Village Arpt",
        "country": "United States"
    },
    {
        "key": "MOV",
        "city": "Moranbah",
        "name": "Moranbah Arpt",
        "country": "Australia"
    },
    {
        "key": "MOX",
        "city": "Morris",
        "name": "Morris",
        "country": "United States"
    },
    {
        "key": "MOZ",
        "city": "Moorea",
        "name": "Temae Airport",
        "country": "French Polynesia"
    },
    {
        "key": "MPA",
        "city": "Katima Mulilo",
        "name": "Katima Mulilo Airport (Mpacha Airport)",
        "country": "Namibia"
    },
    {
        "key": "MPB",
        "city": "Miami",
        "name": "Mpb Seaplane Base",
        "country": "United States"
    },
    {
        "key": "MPD",
        "city": "Mirpur Khas, Pakistan",
        "name": "Sindhri Airport",
        "country": "Pakistan"
    },
    {
        "key": "MPF",
        "city": "Mapoda",
        "name": "Mapoda Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MPH",
        "city": "Caticlan",
        "name": "Malay Arpt",
        "country": "Philippines"
    },
    {
        "key": "MPK",
        "city": "Mokpo",
        "name": "Mokpo Arpt",
        "country": "Korea"
    },
    {
        "key": "MPL",
        "city": "Montpellier",
        "name": "Mediterranee Arpt",
        "country": "France"
    },
    {
        "key": "MPM",
        "city": "Maputo",
        "name": "Maputo Intl",
        "country": "Mozambique"
    },
    {
        "key": "MPN",
        "city": "Mount Pleasant",
        "name": "Mount Pleasant Arpt",
        "country": "Falkland Islands (Malvinas)"
    },
    {
        "key": "PZB",
        "city": "Pietermaritzburg",
        "name": "Pietermaritzburg Arpt",
        "country": "South Africa"
    },
    {
        "key": "PZI",
        "city": "Panzhihua",
        "name": "Pan Zhi Hua Bao An Ying Arpt",
        "country": "China"
    },
    {
        "key": "PZO",
        "city": "Puerto Ordaz",
        "name": "Puerto Ordaz Arpt",
        "country": "Venezuela"
    },
    {
        "key": "PZU",
        "city": "Port Sudan",
        "name": "Port Sudan New intl Arpt",
        "country": "Sudan"
    },
    {
        "key": "PZY",
        "city": "Piestany",
        "name": "Piestany Arpt",
        "country": "Slovakia"
    },
    {
        "key": "QAW",
        "city": "Anniston",
        "name": "Ft Mcclellan Railway Stn",
        "country": "United States"
    },
    {
        "key": "QBC",
        "city": "Bella Coola",
        "name": "Bella Colla Municipal",
        "country": "Canada"
    },
    {
        "key": "QBF",
        "city": "Eagle",
        "name": "Vail Van Service",
        "country": "United States"
    },
    {
        "key": "QCE",
        "city": "Copper Mountain",
        "name": "Copper Mountain Van Service",
        "country": "United States"
    },
    {
        "key": "QDH",
        "city": "Ashford",
        "name": "Ashford Intl Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "QDK",
        "city": "Chattanooga",
        "name": "Greyhound Bus Service",
        "country": "United States"
    },
    {
        "key": "QDU",
        "city": "Dusseldorf",
        "name": "Dusseldorf Rail Station",
        "country": "Germany"
    },
    {
        "key": "QFI",
        "city": "Iginniarfik",
        "name": "Iginniarfik Heliport",
        "country": "Greenland"
    },
    {
        "key": "QFQ",
        "city": "Maloy",
        "name": "Harbour Arpt",
        "country": "Norway"
    },
    {
        "key": "QFV",
        "city": "Bergen",
        "name": "Bergen Norway Railway Stattion",
        "country": "Norway"
    },
    {
        "key": "QFZ",
        "city": "Saarbruecken",
        "name": "Saarbruecken Rail Station",
        "country": "Germany"
    },
    {
        "key": "QGV",
        "city": "Frankfurt",
        "name": "Neu Isenburg Arpt",
        "country": "Germany"
    },
    {
        "key": "QGY",
        "city": "Gyor",
        "name": "Gyor Airport",
        "country": "Hungary"
    },
    {
        "key": "QJZ",
        "city": "Nantes",
        "name": "Nantes Rail Station",
        "country": "France"
    },
    {
        "key": "QKB",
        "city": "Breckenridge",
        "name": "Breckenridge Van Service",
        "country": "United States"
    },
    {
        "key": "QKL",
        "city": "Cologne",
        "name": "Cologne Railroad Station",
        "country": "Germany"
    },
    {
        "key": "QKS",
        "city": "Keystone",
        "name": "Keystone Van Service",
        "country": "United States"
    },
    {
        "key": "QKU",
        "city": "Cologne",
        "name": "Cologne Railway Station",
        "country": "Germany"
    },
    {
        "key": "QLE",
        "city": "Leeton",
        "name": "Leeton Arpt",
        "country": "Australia"
    },
    {
        "key": "QNY",
        "city": "New York",
        "name": "Marine Air Terminal",
        "country": "United States"
    },
    {
        "key": "QOW",
        "city": "Owerri",
        "name": "Sam Mbakwe Airport",
        "country": "Nigeria"
    },
    {
        "key": "QPG",
        "city": "Singapore",
        "name": "Paya Lebar Arpt",
        "country": "Singapore"
    },
    {
        "key": "QPP",
        "city": "Berlin",
        "name": "Berlin Hauptbahnof Railway St",
        "country": "Germany"
    },
    {
        "key": "QQH",
        "city": "London",
        "name": "Harwich Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "QQK",
        "city": "London",
        "name": "London - Kings Cross Rail Service",
        "country": "United Kingdom"
    },
    {
        "key": "QQM",
        "city": "Manchester",
        "name": "Manchester - Piccadilly Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "QQN",
        "city": "Birmingham",
        "name": "Birmingham - New Street Rail Service",
        "country": "United Kingdom"
    },
    {
        "key": "QQP",
        "city": "London",
        "name": "London - Paddington Rail Service",
        "country": "United Kingdom"
    },
    {
        "key": "QQS",
        "city": "London",
        "name": "St Pancras Intl Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "QQU",
        "city": "London",
        "name": "London - Euston Rail Service",
        "country": "United Kingdom"
    },
    {
        "key": "QQW",
        "city": "London",
        "name": "London - Waterloo Rail Service",
        "country": "United Kingdom"
    },
    {
        "key": "QQX",
        "city": "Bath",
        "name": "Bath Rail Service",
        "country": "United Kingdom"
    },
    {
        "key": "QQY",
        "city": "York",
        "name": "York Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "QRA",
        "city": "Johannesburg",
        "name": "Randgermiston Arpt",
        "country": "South Africa"
    },
    {
        "key": "QRH",
        "city": "Rotterdam",
        "name": "Rotterdam Central Rail Station",
        "country": "Netherlands"
    },
    {
        "key": "QRO",
        "city": "Queretaro",
        "name": "Queretaro Arpt",
        "country": "Mexico"
    },
    {
        "key": "QRW",
        "city": "Warri",
        "name": "Warri Airport",
        "country": "Nigeria"
    },
    {
        "key": "QSF",
        "city": "Setif",
        "name": "Setif Arpt",
        "country": "Algeria"
    },
    {
        "key": "QSG",
        "city": "Sonderborg",
        "name": "Sonderborg Railway Stn",
        "country": "Denmark"
    },
    {
        "key": "QSR",
        "city": "Salerno",
        "name": "Salerno Offline Point",
        "country": "Italy"
    },
    {
        "key": "QUB",
        "city": "Awbari",
        "name": "Ubari Airport",
        "country": "Libya"
    },
    {
        "key": "QUG",
        "city": "Goodwood",
        "name": "Chichester Goodwood Airport",
        "country": "United Kingdom"
    },
    {
        "key": "QUO",
        "city": "Uyo",
        "name": "Akwa Ibom International Airport",
        "country": "Nigeria"
    },
    {
        "key": "QWB",
        "city": "Berlin",
        "name": "Berlin Railway Station",
        "country": "Germany"
    },
    {
        "key": "QWC",
        "city": "Berlin",
        "name": "Berlin Zoo Railway Station",
        "country": "Germany"
    },
    {
        "key": "QWF",
        "city": "Ft Collins",
        "name": "Fort Collins Bus Service",
        "country": "United States"
    },
    {
        "key": "QWG",
        "city": "Charlotte",
        "name": "Wilgrove Air Parkarpt",
        "country": "United States"
    },
    {
        "key": "QWH",
        "city": "Ft Collins",
        "name": "Loveland Bus Service",
        "country": "United States"
    },
    {
        "key": "QWM",
        "city": "Denver",
        "name": "Longmont Bus Service",
        "country": "United States"
    },
    {
        "key": "QWY",
        "city": "Corvallis",
        "name": "Albany Bus Service",
        "country": "United States"
    },
    {
        "key": "QXG",
        "city": "Angers",
        "name": "Angers Railway Stattion",
        "country": "France"
    },
    {
        "key": "QYE",
        "city": "Enschede",
        "name": "Enschede Railway Station",
        "country": "Netherlands"
    },
    {
        "key": "QYH",
        "city": "Hengelo",
        "name": "Hengelo Railway Service",
        "country": "Netherlands"
    },
    {
        "key": "QYM",
        "city": "Amersfoort",
        "name": "Amersfoort Railway Service",
        "country": "Netherlands"
    },
    {
        "key": "QYU",
        "city": "Gavle",
        "name": "Gavle Rail Station",
        "country": "Sweden"
    },
    {
        "key": "QYW",
        "city": "Cannes",
        "name": "Le Vieux Port Harbour",
        "country": "France"
    },
    {
        "key": "QYX",
        "city": "Uppsala",
        "name": "Uppsala Railway Service",
        "country": "Sweden"
    },
    {
        "key": "RAC",
        "city": "Racine",
        "name": "Horlick Arpt",
        "country": "United States"
    },
    {
        "key": "RAD",
        "city": "Tortola Westend",
        "name": "Road Town Arpt",
        "country": "Virgin Islands"
    },
    {
        "key": "RAE",
        "city": "Arar",
        "name": "Arar",
        "country": "Saudi Arabia"
    },
    {
        "key": "RAG",
        "city": "Raglan",
        "name": "Raglan Aerodrome",
        "country": "New Zealand"
    },
    {
        "key": "RAH",
        "city": "Rafha",
        "name": "Rafha Domestic Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "RAI",
        "city": "Praia",
        "name": "Francisco Mendes",
        "country": "Cape Verde"
    },
    {
        "key": "RAJ",
        "city": "Rajkot",
        "name": "Rajkot Civil Arpt",
        "country": "India"
    },
    {
        "key": "RAK",
        "city": "Marrakech",
        "name": "Menara Airport",
        "country": "Morocco"
    },
    {
        "key": "RAL",
        "city": "Riverside",
        "name": "Riverside Municipal",
        "country": "United States"
    },
    {
        "key": "OLD",
        "city": "Old Town",
        "name": "Old Town Municipal Airport and Seaplane Base (Dewitt Field)",
        "country": "United States"
    },
    {
        "key": "OLE",
        "city": "Hinsdale",
        "name": "Cattaraugus County-Olean Airport",
        "country": "United States"
    },
    {
        "key": "OLH",
        "city": "Old Harbor",
        "name": "Old Harbor Airport (FAA: 6R7)",
        "country": "United States"
    },
    {
        "key": "OLJ",
        "city": "Lajmoli",
        "name": "Olpoi Airport (North West Santo Airport)",
        "country": "Vanuatu"
    },
    {
        "key": "OLK",
        "city": "Fuerte Olimpo",
        "name": "Fuerte Olimpo Arpt",
        "country": "Paraguay"
    },
    {
        "key": "OLM",
        "city": "Olympia",
        "name": "Olympia Arpt",
        "country": "United States"
    },
    {
        "key": "OLO",
        "city": "Bohunovice",
        "name": "Olomouc Airport",
        "country": "Czechia"
    },
    {
        "key": "OLP",
        "city": "Olympic Dam",
        "name": "Olympic Dam Arpt",
        "country": "Australia"
    },
    {
        "key": "OLS",
        "city": "Nogales",
        "name": "International Arpt",
        "country": "United States"
    },
    {
        "key": "OLU",
        "city": "Columbus",
        "name": "Columbus Arpt",
        "country": "United States"
    },
    {
        "key": "OLV",
        "city": "Tupelo",
        "name": "Olive Branch Arpt",
        "country": "United States"
    },
    {
        "key": "OLY",
        "city": "Noble",
        "name": "Olney-Noble Airport",
        "country": "United States"
    },
    {
        "key": "OMA",
        "city": "Omaha",
        "name": "Eppley Airfield",
        "country": "United States"
    },
    {
        "key": "OMC",
        "city": "Ormoc",
        "name": "Ormoc Airport",
        "country": "Philippines"
    },
    {
        "key": "OMD",
        "city": "Oranjemund",
        "name": "Oranjemund Arpt",
        "country": "Namibia"
    },
    {
        "key": "OME",
        "city": "Nome",
        "name": "Nome Arpt",
        "country": "United States"
    },
    {
        "key": "OMF",
        "city": "Mafraq",
        "name": "King Hussein Airport",
        "country": "Jordan"
    },
    {
        "key": "OMG",
        "city": "Omega, Namibia",
        "name": "Omega Airport",
        "country": "Namibia"
    },
    {
        "key": "OMH",
        "city": "Azerbaijan",
        "name": "Urmia international airport",
        "country": "Iran"
    },
    {
        "key": "OMJ",
        "city": "Omura",
        "name": "Omura",
        "country": "Japan"
    },
    {
        "key": "OMK",
        "city": "Omak",
        "name": "Omak Airport",
        "country": "United States"
    },
    {
        "key": "OMM",
        "city": "Marmul",
        "name": "Marmul Airport",
        "country": "Oman"
    },
    {
        "key": "OMO",
        "city": "Mostar",
        "name": "Mostar Arpt",
        "country": "Bosnia and Herzegovina"
    },
    {
        "key": "OMR",
        "city": "Oradea",
        "name": "Oradea Arpt",
        "country": "Romania"
    },
    {
        "key": "OMS",
        "city": "Omsk",
        "name": "Omsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "OND",
        "city": "Ondangwa",
        "name": "Ondangwa Arpt",
        "country": "Namibia"
    },
    {
        "key": "ONG",
        "city": "Mornington",
        "name": "Mornington Arpt",
        "country": "Australia"
    },
    {
        "key": "ONH",
        "city": "Oneonta",
        "name": "Oneonta Municpal",
        "country": "United States"
    },
    {
        "key": "ONI",
        "city": "Moanemani (Moanamani)",
        "name": "Moanamani Airport",
        "country": "Indonesia"
    },
    {
        "key": "ONJ",
        "city": "Odate Noshiro",
        "name": "Odate Noshiro Arpt",
        "country": "Japan"
    },
    {
        "key": "ONM",
        "city": "Socorro",
        "name": "Socorro Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ONO",
        "city": "Ontario",
        "name": "Ontario Airport",
        "country": "United States"
    },
    {
        "key": "ONP",
        "city": "Newport",
        "name": "Newport Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "ONQ",
        "city": "Zonguldak",
        "name": "Caycuma Airport",
        "country": "Turkey"
    },
    {
        "key": "ONT",
        "city": "Ontario",
        "name": "Ontario Intl",
        "country": "United States"
    },
    {
        "key": "ONX",
        "city": "ColÃ³n",
        "name": "Enrique Adolfo JimÃ©nez Airport",
        "country": "Panama"
    },
    {
        "key": "OOA",
        "city": "Cedar",
        "name": "Oskaloosa Municipal Airport",
        "country": "United States"
    },
    {
        "key": "OOK",
        "city": "Toksook Bay",
        "name": "Toksook Bay Airport",
        "country": "United States"
    },
    {
        "key": "OOL",
        "city": "Gold Coast",
        "name": "Gold Coast Arpt",
        "country": "Australia"
    },
    {
        "key": "OOM",
        "city": "Cooma",
        "name": "Cooma Airport",
        "country": "Australia"
    },
    {
        "key": "OOT",
        "city": "Onotoa, Kiribati",
        "name": "Onotoa Airport",
        "country": "Kiribati"
    },
    {
        "key": "OPA",
        "city": "Kopasker",
        "name": "Kopasker Arpt",
        "country": "Iceland"
    },
    {
        "key": "OPF",
        "city": "Miami",
        "name": "Opa Locka Arpt",
        "country": "United States"
    },
    {
        "key": "OPL",
        "city": "Opelousas",
        "name": "St. Landry Parish Airport",
        "country": "United States"
    },
    {
        "key": "OPO",
        "city": "Porto",
        "name": "Porto Airport",
        "country": "Portugal"
    },
    {
        "key": "OPS",
        "city": "Sinop",
        "name": "Sinop Airport",
        "country": "Brazil"
    },
    {
        "key": "OPU",
        "city": "Balimo",
        "name": "Balimo Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ORB",
        "city": "Orebro Bofors",
        "name": "Orebro Bofors Arpt",
        "country": "Sweden"
    },
    {
        "key": "ORC",
        "city": "Paratebueno",
        "name": "Orocue Airport",
        "country": "Colombia"
    },
    {
        "key": "ORD",
        "city": "Chicago",
        "name": "OHare Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ORE",
        "city": "Orleans",
        "name": "Orleans Arpt",
        "country": "France"
    },
    {
        "key": "ORF",
        "city": "Norfolk",
        "name": "Norfolk Intl Arpt",
        "country": "United States"
    },
    {
        "key": "ORG",
        "city": "Paramaribo",
        "name": "Zorg En Hoop Arpt",
        "country": "Suriname"
    },
    {
        "key": "ORH",
        "city": "Worcester",
        "name": "Worcester Arpt",
        "country": "United States"
    },
    {
        "key": "ORI",
        "city": "Port Lions",
        "name": "Port Lions Airport",
        "country": "United States"
    },
    {
        "key": "ORK",
        "city": "Cork",
        "name": "Cork International Arpt",
        "country": "Ireland"
    },
    {
        "key": "ORL",
        "city": "Orlando",
        "name": "Herndon Arpt",
        "country": "United States"
    },
    {
        "key": "ORM",
        "city": "Northampton",
        "name": "Northampton Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "ORN",
        "city": "Oran",
        "name": "Es Senia",
        "country": "Algeria"
    },
    {
        "key": "ORQ",
        "city": "Norwalk",
        "name": "Norwalk Heliport",
        "country": "United States"
    },
    {
        "key": "ORS",
        "city": "Orpheus Island",
        "name": "Waterport Arpt",
        "country": "Australia"
    },
    {
        "key": "ORT",
        "city": "Northway",
        "name": "Northway Arpt",
        "country": "United States"
    },
    {
        "key": "ORW",
        "city": "Ormara",
        "name": "Ormara Airport",
        "country": "Pakistan"
    },
    {
        "key": "ORY",
        "city": "Paris",
        "name": "Orly Arpt",
        "country": "France"
    },
    {
        "key": "OSC",
        "city": "Oscoda Township",
        "name": "Oscoda Wurtsmith Airport",
        "country": "United States"
    },
    {
        "key": "OSD",
        "city": "Ostersund",
        "name": "Froesoe Airport",
        "country": "Sweden"
    },
    {
        "key": "OSH",
        "city": "Oshkosh",
        "name": "Wittman Field",
        "country": "United States"
    },
    {
        "key": "OSI",
        "city": "Osijek",
        "name": "Osijek Arpt",
        "country": "Croatia"
    },
    {
        "key": "OSK",
        "city": "Oskarshamn",
        "name": "Oskarshamn",
        "country": "Sweden"
    },
    {
        "key": "OSL",
        "city": "Oslo",
        "name": "Oslo Arpt",
        "country": "Norway"
    },
    {
        "key": "OSM",
        "city": "Mosul",
        "name": "Mosul International Airport",
        "country": "Iraq"
    },
    {
        "key": "OSN",
        "city": "Pyeongtaek",
        "name": "Osan Air Base",
        "country": "South Korea"
    },
    {
        "key": "OSR",
        "city": "Ostrava",
        "name": "Leos Janacek Airport",
        "country": "Czech Republic"
    },
    {
        "key": "LUP",
        "city": "Kalaupapa",
        "name": "Kalaupapa Municipal",
        "country": "United States"
    },
    {
        "key": "LUQ",
        "city": "San Luis",
        "name": "San Luis Cty Arpt",
        "country": "Argentina"
    },
    {
        "key": "LUS",
        "city": "Lusanga",
        "name": "Lusanga Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "LUU",
        "city": "Laura",
        "name": "Laura Airport",
        "country": "Australia"
    },
    {
        "key": "LUW",
        "city": "Luwuk, Indonesia",
        "name": "Syukuran Aminuddin Amir Airport",
        "country": "Indonesia"
    },
    {
        "key": "LUX",
        "city": "Luxembourg",
        "name": "Luxembourg Arpt",
        "country": "Luxembourg"
    },
    {
        "key": "LUZ",
        "city": "Lublin",
        "name": "Swidnik Arpt",
        "country": "Poland"
    },
    {
        "key": "LVA",
        "city": "Laval",
        "name": "Entrammes",
        "country": "France"
    },
    {
        "key": "LVD",
        "city": "Lime Village",
        "name": "Lime Village Arpt",
        "country": "United States"
    },
    {
        "key": "LVI",
        "city": "Livingstone",
        "name": "Livingstone Arpt",
        "country": "Zambia"
    },
    {
        "key": "LVK",
        "city": "Livermore",
        "name": "Bron Airport",
        "country": "United States"
    },
    {
        "key": "LVM",
        "city": "Livingston",
        "name": "Mission Field",
        "country": "United States"
    },
    {
        "key": "LVO",
        "city": "Laverton",
        "name": "Laverton Airport",
        "country": "Australia"
    },
    {
        "key": "LVP",
        "city": "Lavan",
        "name": "Lavan Airport",
        "country": "Iran"
    },
    {
        "key": "LVS",
        "city": "Las Vegas",
        "name": "Las Vegas Arpt",
        "country": "United States"
    },
    {
        "key": "LWB",
        "city": "Lewisburg",
        "name": "Greenbrier Valley Arpt",
        "country": "United States"
    },
    {
        "key": "LWC",
        "city": "Lawrence",
        "name": "Lawrence Municipal",
        "country": "United States"
    },
    {
        "key": "LWK",
        "city": "Lerwick",
        "name": "Tingwall Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "LWM",
        "city": "Lawrence",
        "name": "Lawrence Arpt",
        "country": "United States"
    },
    {
        "key": "LWN",
        "city": "Gyumri",
        "name": "Shirak Airport",
        "country": "Armenia"
    },
    {
        "key": "LWO",
        "city": "Lvov",
        "name": "Snilow Arpt",
        "country": "Ukraine"
    },
    {
        "key": "LWR",
        "city": "Leeuwarden",
        "name": "Leeuwarden Air Base",
        "country": "Netherlands"
    },
    {
        "key": "LWS",
        "city": "Lewiston",
        "name": "Lewiston Nez Pierce Arpt",
        "country": "United States"
    },
    {
        "key": "LWT",
        "city": "Lewistown",
        "name": "Lewistown Municipal",
        "country": "United States"
    },
    {
        "key": "LWV",
        "city": "Lawrenceville",
        "name": "Vincennes Intl",
        "country": "United States"
    },
    {
        "key": "LWY",
        "city": "Lawas",
        "name": "Lawas Arpt",
        "country": "Malaysia"
    },
    {
        "key": "LXA",
        "city": "Lhasa",
        "name": "Lhasa Arpt",
        "country": "China"
    },
    {
        "key": "CBP",
        "city": "Coimbra",
        "name": "Coimbra Arpt",
        "country": "Portugal"
    },
    {
        "key": "CBQ",
        "city": "Calabar",
        "name": "CALABAR ARPT",
        "country": "Nigeria"
    },
    {
        "key": "CBR",
        "city": "Canberra",
        "name": "Canberra Arpt",
        "country": "Australia"
    },
    {
        "key": "CBS",
        "city": "Cabimas",
        "name": "Oro Negro Arpt",
        "country": "Venezuela"
    },
    {
        "key": "CBT",
        "city": "Catumbela",
        "name": "Catumbela Airport",
        "country": "Angola"
    },
    {
        "key": "CBU",
        "city": "JÃ¤nschwalde",
        "name": "Cottbus-Drewitz Airport",
        "country": "Germany"
    },
    {
        "key": "CBW",
        "city": "Campo MourÃ£o, ParanÃ¡, Brazil",
        "name": "Campo MourÃ£o Airport",
        "country": "Brazil"
    },
    {
        "key": "CBX",
        "city": "Condobolin",
        "name": "Condobolin Airport",
        "country": "Australia"
    },
    {
        "key": "CCA",
        "city": "Fort Chaffee",
        "name": "Fort Chaffee Arpt",
        "country": "United States"
    },
    {
        "key": "CCB",
        "city": "Upland",
        "name": "Cable Airport",
        "country": "United States"
    },
    {
        "key": "CCE",
        "city": "Saint Martin",
        "name": "Grand Case Arpt",
        "country": "Guadeloupe"
    },
    {
        "key": "CCF",
        "city": "Carcassonne",
        "name": "Salvaza",
        "country": "France"
    },
    {
        "key": "CCG",
        "city": "Crane",
        "name": "Crane County Arpt",
        "country": "United States"
    },
    {
        "key": "CCH",
        "city": "Cochrane",
        "name": "Chile Chico Airfield",
        "country": "Chile"
    },
    {
        "key": "CCI",
        "city": "ConcÃ³rdia, Santa Catarina, Brazil",
        "name": "ConcÃ³rdia Airport",
        "country": "Brazil"
    },
    {
        "key": "CCJ",
        "city": "Kozhikode",
        "name": "Kozhikode Arpt",
        "country": "India"
    },
    {
        "key": "CCK",
        "city": "Cocos Islands",
        "name": "Cocos Islands Arpt",
        "country": "Cocos (Keeling) Islands"
    },
    {
        "key": "CCL",
        "city": "Chinchilla",
        "name": "Chinchilla Airport",
        "country": "Australia"
    },
    {
        "key": "CCM",
        "city": "Criciuma",
        "name": "Criciuma Arpt",
        "country": "Brazil"
    },
    {
        "key": "CCN",
        "city": "Chaghcharan, Afghanistan",
        "name": "Chaghcharan Airport",
        "country": "Afghanistan"
    },
    {
        "key": "CCO",
        "city": "Carimagua",
        "name": "Carimagua",
        "country": "Colombia"
    },
    {
        "key": "CCP",
        "city": "Concepcion",
        "name": "Carriel Sur Arpt",
        "country": "Chile"
    },
    {
        "key": "CCR",
        "city": "Concord",
        "name": "Buchanan Field",
        "country": "United States"
    },
    {
        "key": "CCS",
        "city": "Caracas",
        "name": "Simon Bolivar Arpt",
        "country": "Venezuela"
    },
    {
        "key": "CCU",
        "city": "Kolkata",
        "name": "Netaji Subhas Chandra Bose Intl",
        "country": "India"
    },
    {
        "key": "CCV",
        "city": "Craig Cove",
        "name": "Craig Cove Arpt",
        "country": "Vanuatu"
    },
    {
        "key": "CCX",
        "city": "CÃ¡ceres, Mato Grosso, Brazil",
        "name": "CÃ¡ceres Airport",
        "country": "Spain"
    },
    {
        "key": "CCY",
        "city": "Charles City",
        "name": "Northeast Iowa Regional Airport",
        "country": "United States"
    },
    {
        "key": "CCZ",
        "city": "Chub Cay, Berry Islands, Bahamas",
        "name": "Chub Cay International Airport",
        "country": "The Bahamas"
    },
    {
        "key": "CDA",
        "city": "Cooinda",
        "name": "Cooinda Airport",
        "country": "Australia"
    },
    {
        "key": "CDC",
        "city": "Cedar City",
        "name": "Cedar City Municipal",
        "country": "United States"
    },
    {
        "key": "CDD",
        "city": "Cauquira",
        "name": "Cauquira Arpt",
        "country": "Honduras"
    },
    {
        "key": "IMP",
        "city": "Imperatriz",
        "name": "Imperatriz Arpt",
        "country": "Brazil"
    },
    {
        "key": "CDE",
        "city": "Chengde",
        "name": "Chengde Puning Airport",
        "country": "China"
    },
    {
        "key": "IMR",
        "city": "Milan",
        "name": "Milano Rogoredo Railway Station",
        "country": "Italy"
    },
    {
        "key": "CDG",
        "city": "Paris",
        "name": "Charles De Gaulle Intl Arpt",
        "country": "France"
    },
    {
        "key": "CDH",
        "city": "Camden",
        "name": "Harrell Fieldsandro Arpt",
        "country": "United States"
    },
    {
        "key": "IMT",
        "city": "Iron Mountain",
        "name": "Ford Arpt",
        "country": "United States"
    },
    {
        "key": "CDI",
        "city": "Cachoeiro De Itapemirim",
        "name": "Cachoeiro De Itapemirim Arpt",
        "country": "Brazil"
    },
    {
        "key": "INA",
        "city": "Inta",
        "name": "Inta Airport",
        "country": "Russia"
    },
    {
        "key": "CDJ",
        "city": "ConceiÃ§Ã£o do Araguaia, ParÃ¡, Brazil",
        "name": "ConceiÃ§Ã£o do Araguaia Airport",
        "country": "Brazil"
    },
    {
        "key": "INC",
        "city": "Yinchuan",
        "name": "Yinchuan Arpt",
        "country": "China"
    },
    {
        "key": "CDL",
        "city": "Candle",
        "name": "Candle Arpt",
        "country": "United States"
    },
    {
        "key": "IND",
        "city": "Indianapolis",
        "name": "Indianapolis Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CDN",
        "city": "Camden",
        "name": "Woodward Field",
        "country": "United States"
    },
    {
        "key": "BTR",
        "city": "Baton Rouge",
        "name": "Ryan Airport",
        "country": "United States"
    },
    {
        "key": "BTS",
        "city": "Bratislava",
        "name": "Ivanka Arpt",
        "country": "Slovakia"
    },
    {
        "key": "BTT",
        "city": "Bettles",
        "name": "Bettles Airport",
        "country": "United States"
    },
    {
        "key": "BTU",
        "city": "Bintulu",
        "name": "Bintulu Arpt",
        "country": "Malaysia"
    },
    {
        "key": "BTV",
        "city": "Burlington",
        "name": "Burlington Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BTW",
        "city": "Batu Licin, Indonesia",
        "name": "Batu Licin Airport",
        "country": "Indonesia"
    },
    {
        "key": "BTY",
        "city": "Beatty",
        "name": "Beatty Airport",
        "country": "United States"
    },
    {
        "key": "BUA",
        "city": "Buka Island",
        "name": "Buka Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BUC",
        "city": "Burketown",
        "name": "Burketown Arpt",
        "country": "Australia"
    },
    {
        "key": "BUD",
        "city": "Budapest",
        "name": "Liszt Ferenc Arpt",
        "country": "Hungary"
    },
    {
        "key": "BUF",
        "city": "Buffalo",
        "name": "Greater Buffalo Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BUG",
        "city": "Benguela",
        "name": "Benguela Airport (Gen. V. Deslandes Airport)",
        "country": "Angola"
    },
    {
        "key": "BUI",
        "city": "Bokondini",
        "name": "Bokondini",
        "country": "Indonesia"
    },
    {
        "key": "BUL",
        "city": "Bulolo",
        "name": "Bulolo Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BUN",
        "city": "Buenaventura",
        "name": "Buenaventura Arpt",
        "country": "Colombia"
    },
    {
        "key": "BUP",
        "city": "Bhatinda",
        "name": "Bhatinda Air Force Station",
        "country": "India"
    },
    {
        "key": "BUQ",
        "city": "Bulawayo",
        "name": "Bulawayo Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "BUR",
        "city": "Burbank",
        "name": "Burbank Glendale Pasadena Arpt",
        "country": "United States"
    },
    {
        "key": "BUS",
        "city": "Batumi",
        "name": "Batumi Arpt",
        "country": "Georgia"
    },
    {
        "key": "BUW",
        "city": "Bau-Bau",
        "name": "Betoambari Airport",
        "country": "Indonesia"
    },
    {
        "key": "BUX",
        "city": "Bunia",
        "name": "Bunia Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "BUY",
        "city": "Bunbury",
        "name": "Bunbury Arpt",
        "country": "Australia"
    },
    {
        "key": "BUZ",
        "city": "Bushehr",
        "name": "Bushehr Arpt",
        "country": "Iran"
    },
    {
        "key": "BVA",
        "city": "Paris",
        "name": "Beauvais Tille Arpt",
        "country": "France"
    },
    {
        "key": "BVB",
        "city": "Boa Vista",
        "name": "Boa Vista Arpt",
        "country": "Brazil"
    },
    {
        "key": "BVC",
        "city": "Boa Vista",
        "name": "Rabil Arpt",
        "country": "Cape Verde"
    },
    {
        "key": "BVE",
        "city": "Brive La Gaill",
        "name": "Laroche Airport",
        "country": "France"
    },
    {
        "key": "BVG",
        "city": "Berlevag",
        "name": "Berlevag",
        "country": "Norway"
    },
    {
        "key": "BVH",
        "city": "Vilhena",
        "name": "Vilhena Arpt",
        "country": "Brazil"
    },
    {
        "key": "BVI",
        "city": "Birdsville",
        "name": "Birdsville Arpt",
        "country": "Australia"
    },
    {
        "key": "BVL",
        "city": "Baures",
        "name": "Baures Airport",
        "country": "Bolivia"
    },
    {
        "key": "BVO",
        "city": "Bartlesville",
        "name": "Bartlesville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BVR",
        "city": "Brava",
        "name": "Esperadinha",
        "country": "Cape Verde"
    },
    {
        "key": "BVU",
        "city": "Beluga",
        "name": "Beluga Arpt",
        "country": "United States"
    },
    {
        "key": "BVX",
        "city": "Batesville",
        "name": "Batesville Municipal",
        "country": "United States"
    },
    {
        "key": "BVY",
        "city": "Beverly",
        "name": "Beverly Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BWA",
        "city": "Siddharthanagar",
        "name": "Gautam Buddha Airport",
        "country": "Nepal"
    },
    {
        "key": "BWC",
        "city": "Brawley",
        "name": "Brawley Arpt",
        "country": "United States"
    },
    {
        "key": "BWD",
        "city": "Brownwood",
        "name": "Brownwood Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BWE",
        "city": "Braunschweig",
        "name": "Braunschweig Arpt",
        "country": "Germany"
    },
    {
        "key": "BWF",
        "city": "Barrow In Furness",
        "name": "Walney Island",
        "country": "United Kingdom"
    },
    {
        "key": "BWG",
        "city": "Bowling Green",
        "name": "Warren Cty Arpt",
        "country": "United States"
    },
    {
        "key": "BWH",
        "city": "Butterworth",
        "name": "RMAF Butterworth",
        "country": "Malaysia"
    },
    {
        "key": "BWI",
        "city": "Baltimore",
        "name": "Baltimore Washington Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BWJ",
        "city": "Bawan",
        "name": "Bawan Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BWK",
        "city": "Supetar",
        "name": "Bol Airport",
        "country": "Croatia"
    },
    {
        "key": "BWL",
        "city": "Blackwell",
        "name": "Blackwell Tonkawa Municipal Airport (FAA: BKN)",
        "country": "United States"
    },
    {
        "key": "BWM",
        "city": "Bowman",
        "name": "Bowman Municipal Airport (FAA: BPP)",
        "country": "United States"
    },
    {
        "key": "BWN",
        "city": "Bandar Seri Begawan",
        "name": "Brunei Intl Arpt",
        "country": "Brunei Darussalam"
    },
    {
        "key": "BWO",
        "city": "Balakovo, Saratov Oblast",
        "name": "Balakovo Airport",
        "country": "Russia"
    },
    {
        "key": "BWP",
        "city": "Bewani, Papua New Guinea",
        "name": "Bewani Airport",
        "country": "Indonesia"
    },
    {
        "key": "BWQ",
        "city": "Brewarrina",
        "name": "Brewarrina Arpt",
        "country": "Australia"
    },
    {
        "key": "BWT",
        "city": "Burnie",
        "name": "Burnie Wynyard Arpt",
        "country": "Australia"
    },
    {
        "key": "BWU",
        "city": "Bankstown",
        "name": "Bankstown Aerodrome",
        "country": "Australia"
    },
    {
        "key": "BXA",
        "city": "Bogalusa",
        "name": "George R. Carr Memorial Air Field",
        "country": "United States"
    },
    {
        "key": "BXB",
        "city": "Babo, Indonesia",
        "name": "Babo Airport",
        "country": "Indonesia"
    },
    {
        "key": "BXD",
        "city": "Bade",
        "name": "Bade Airport",
        "country": "Indonesia"
    },
    {
        "key": "BXE",
        "city": "Bakel, Senegal",
        "name": "Bakel Airport",
        "country": "Senegal"
    },
    {
        "key": "BXG",
        "city": "Bendigo",
        "name": "Bendigo Airport",
        "country": "Australia"
    },
    {
        "key": "BXH",
        "city": "Balhash",
        "name": "Balhash Airport",
        "country": "Kazakhstan"
    },
    {
        "key": "BXI",
        "city": "Boundiali",
        "name": "Boundiali Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "BXK",
        "city": "Buckeye",
        "name": "Buckeye Arpt",
        "country": "United States"
    },
    {
        "key": "BXM",
        "city": "Batom",
        "name": "Batom Airport",
        "country": "Indonesia"
    },
    {
        "key": "BXN",
        "city": "Bodrum",
        "name": "Imsik Arpt",
        "country": "Turkey"
    },
    {
        "key": "BXO",
        "city": "Buochs",
        "name": "Buochs airport",
        "country": "Switzerland"
    },
    {
        "key": "BXP",
        "city": "Biala Podlaska",
        "name": "Biata Podlaska Airport",
        "country": "Poland"
    },
    {
        "key": "BXS",
        "city": "Borrego Springs",
        "name": "Borrego Valley Arpt",
        "country": "United States"
    },
    {
        "key": "BXT",
        "city": "Bontang",
        "name": "Bontang",
        "country": "Indonesia"
    },
    {
        "key": "BXU",
        "city": "Butuan",
        "name": "Butuan Arpt",
        "country": "Philippines"
    },
    {
        "key": "BXX",
        "city": "Borama",
        "name": "Borama Airport",
        "country": "Somalia"
    },
    {
        "key": "BYA",
        "city": "Delta",
        "name": "Boundary Airport",
        "country": "Canada"
    },
    {
        "key": "BYB",
        "city": "Dibba",
        "name": "Dibba Airport",
        "country": "Oman"
    },
    {
        "key": "MPQ",
        "city": "Maan",
        "name": "Maan Arpt",
        "country": "Jordan"
    },
    {
        "key": "MPR",
        "city": "McPherson",
        "name": "McPherson Arpt",
        "country": "United States"
    },
    {
        "key": "MPS",
        "city": "Mount Pleasant",
        "name": "Mount Pleasant Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "MPT",
        "city": "Maliana, East Timor",
        "name": "Maliana Airport",
        "country": "TimorLeste"
    },
    {
        "key": "MPU",
        "city": "Mabua",
        "name": "Mabua Airstrip",
        "country": "Papua New Guinea"
    },
    {
        "key": "MPV",
        "city": "Montpelier",
        "name": "E F Knapp Arpt",
        "country": "United States"
    },
    {
        "key": "MPW",
        "city": "Mariupol",
        "name": "Mariupol Arpt",
        "country": "Ukraine"
    },
    {
        "key": "MQA",
        "city": "Mandora Station, Western Australia",
        "name": "Mandora Station Airport",
        "country": "Australia"
    },
    {
        "key": "MQF",
        "city": "Magnitogorsk",
        "name": "Magnitogorsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "MQI",
        "city": "Quincy",
        "name": "Quincy",
        "country": "United States"
    },
    {
        "key": "MQK",
        "city": "San Matias",
        "name": "San Matias Arpt",
        "country": "Bolivia"
    },
    {
        "key": "MQL",
        "city": "Mildura",
        "name": "Mildura Arpt",
        "country": "Australia"
    },
    {
        "key": "MQM",
        "city": "Mardin",
        "name": "Mardin Arpt",
        "country": "Turkey"
    },
    {
        "key": "MQN",
        "city": "Mo I Rana",
        "name": "Rossvoll",
        "country": "Norway"
    },
    {
        "key": "MQO",
        "city": "Malam",
        "name": "Malam Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MQP",
        "city": "Nelspruit",
        "name": "Kruger Mpumalanga Intl Arpt",
        "country": "South Africa"
    },
    {
        "key": "MQQ",
        "city": "Moundou",
        "name": "Moundou Airport",
        "country": "Chad"
    },
    {
        "key": "MQS",
        "city": "Mustique",
        "name": "Mustique Arpt",
        "country": "Dominica"
    },
    {
        "key": "MQT",
        "city": "Marquette",
        "name": "Sawyer Intl Airport",
        "country": "United States"
    },
    {
        "key": "MQW",
        "city": "Helena",
        "name": "TelfairWheeler Airport",
        "country": "United States"
    },
    {
        "key": "MQX",
        "city": "Mek ele",
        "name": "Alula Aba Nega Airport",
        "country": "Ethiopia"
    },
    {
        "key": "MQY",
        "city": "Smyrna",
        "name": "Smyrna Arpt",
        "country": "United States"
    },
    {
        "key": "MQZ",
        "city": "Margaret River",
        "name": "Margaret River Arpt",
        "country": "Australia"
    },
    {
        "key": "MRA",
        "city": "Misrata",
        "name": "Misrata Airport",
        "country": "Libya"
    },
    {
        "key": "MRB",
        "city": "Martinsburg",
        "name": "Martinsburgh Regional Arpt",
        "country": "United States"
    },
    {
        "key": "MRC",
        "city": "Columbia",
        "name": "Maury Country Arpt",
        "country": "United States"
    },
    {
        "key": "MRD",
        "city": "Merida",
        "name": "Alberto Carnevalli Arpt",
        "country": "Venezuela"
    },
    {
        "key": "MRE",
        "city": "Mara Lodges",
        "name": "Mara Serena Arpt",
        "country": "Kenya"
    },
    {
        "key": "MRF",
        "city": "Marfa",
        "name": "Marfa Municipal Airport",
        "country": "United States"
    },
    {
        "key": "MRI",
        "city": "Anchorage",
        "name": "Merrill Field",
        "country": "United States"
    },
    {
        "key": "MRM",
        "city": "Manari",
        "name": "Manari Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MRN",
        "city": "Morganton",
        "name": "Foothills Regional Airport (was MorgantonLenoir Airport)",
        "country": "United States"
    },
    {
        "key": "MRO",
        "city": "Masterton",
        "name": "Masterton Arpt",
        "country": "New Zealand"
    },
    {
        "key": "MRP",
        "city": "Marla",
        "name": "Marla Airport",
        "country": "Australia"
    },
    {
        "key": "MRS",
        "city": "Marseille",
        "name": "Marseille Provence Arpt",
        "country": "France"
    },
    {
        "key": "MRU",
        "city": "Mauritius",
        "name": "Plaisance Arptt",
        "country": "Mauritius"
    },
    {
        "key": "MRV",
        "city": "Mineralnye Vody",
        "name": "Mineralnye Vody Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "MRY",
        "city": "Monterey",
        "name": "Monterey Peninsula",
        "country": "United States"
    },
    {
        "key": "MRZ",
        "city": "Moree",
        "name": "Moree Arpt",
        "country": "Australia"
    },
    {
        "key": "MSA",
        "city": "Muskrat Dam",
        "name": "Muskrat Dam Airport",
        "country": "Canada"
    },
    {
        "key": "MSB",
        "city": "Marigot St Martin",
        "name": "Marigot Seaplane Base",
        "country": "Guadeloupe"
    },
    {
        "key": "MSC",
        "city": "Mesa",
        "name": "Falcon Field",
        "country": "United States"
    },
    {
        "key": "MSH",
        "city": "Hilf",
        "name": "Masirah Air Base",
        "country": "Oman"
    },
    {
        "key": "MSJ",
        "city": "Misawa",
        "name": "Misawa Arpt",
        "country": "Japan"
    },
    {
        "key": "MSL",
        "city": "Muscle Shoals",
        "name": "Muscle Shoals Arpt",
        "country": "United States"
    },
    {
        "key": "MSN",
        "city": "Madison",
        "name": "Dane County Regional",
        "country": "United States"
    },
    {
        "key": "MSO",
        "city": "Missoula",
        "name": "Missoula Intl",
        "country": "United States"
    },
    {
        "key": "MSP",
        "city": "Minneapolis",
        "name": "Minneapolis St Paul Intl",
        "country": "United States"
    },
    {
        "key": "MSQ",
        "city": "Minsk",
        "name": "Minsk Intl 2",
        "country": "Belarus"
    },
    {
        "key": "MSR",
        "city": "Mus Tr",
        "name": "Mus Arpt",
        "country": "Turkey"
    },
    {
        "key": "MSS",
        "city": "Massena",
        "name": "Richards Field",
        "country": "United States"
    },
    {
        "key": "MST",
        "city": "Maastricht",
        "name": "Maastricht Aachen Arpt",
        "country": "Netherlands"
    },
    {
        "key": "MSU",
        "city": "Maseru",
        "name": "Moshoeshoe Intl Arpt",
        "country": "Lesotho"
    },
    {
        "key": "MSV",
        "city": "Monticello",
        "name": "Catskills Sulivan",
        "country": "United States"
    },
    {
        "key": "MSY",
        "city": "New Orleans",
        "name": "Louis Armstrong Intl Arpt",
        "country": "United States"
    },
    {
        "key": "MSZ",
        "city": "Namibe",
        "name": "MoÃ§Ã¢medes Airport (Yuri Gagarin Airport)",
        "country": "Angola"
    },
    {
        "key": "MTA",
        "city": "Waharoa",
        "name": "Matamata Airport",
        "country": "New Zealand"
    },
    {
        "key": "MTC",
        "city": "Detroit",
        "name": "Selfridge Air Natl Guard",
        "country": "United States"
    },
    {
        "key": "MTG",
        "city": "Mato Grosso, Brazil",
        "name": "Mato Grosso Airport",
        "country": "Brazil"
    },
    {
        "key": "MTH",
        "city": "Marathon",
        "name": "Marathon Arpt",
        "country": "United States"
    },
    {
        "key": "MTJ",
        "city": "Montrose",
        "name": "Montrose County",
        "country": "United States"
    },
    {
        "key": "MTK",
        "city": "Makin Island",
        "name": "Makin Airport",
        "country": "Kiribati"
    },
    {
        "key": "MTL",
        "city": "Maitland",
        "name": "Maitland Airport",
        "country": "Australia"
    },
    {
        "key": "MTN",
        "city": "Washington",
        "name": "Martin State Arpt",
        "country": "United States"
    },
    {
        "key": "MTO",
        "city": "Mattoon",
        "name": "Coles County",
        "country": "United States"
    },
    {
        "key": "MTP",
        "city": "Montauk",
        "name": "Sky Portal Arpt",
        "country": "United States"
    },
    {
        "key": "MTR",
        "city": "Monteria",
        "name": "Los Garzones Arpt",
        "country": "Colombia"
    },
    {
        "key": "MTS",
        "city": "Manzini",
        "name": "Matsapha Intl Arpt",
        "country": "Swaziland"
    },
    {
        "key": "MTT",
        "city": "Minatitlan",
        "name": "Minatitlan Municipal Arpt",
        "country": "Mexico"
    },
    {
        "key": "MTU",
        "city": "Montepuez",
        "name": "Montepuez Airport",
        "country": "Mozambique"
    },
    {
        "key": "MTV",
        "city": "Ablow",
        "name": "Mota Lava Airport",
        "country": "Vanuatu"
    },
    {
        "key": "MTW",
        "city": "Manitowoc",
        "name": "Manitowoc Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AUS",
        "city": "Austin",
        "name": "Bergstrom Intl Arpt",
        "country": "United States"
    },
    {
        "key": "AUU",
        "city": "Aurukun Mission",
        "name": "Aurukin Arpt",
        "country": "Australia"
    },
    {
        "key": "AUW",
        "city": "Wausau",
        "name": "Wausau Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AUX",
        "city": "Araguaina",
        "name": "Araguaina Arpt",
        "country": "Brazil"
    },
    {
        "key": "AUZ",
        "city": "Aurora",
        "name": "Aurora Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AVB",
        "city": "Aviano",
        "name": "Aviano Airbase",
        "country": "Italy"
    },
    {
        "key": "AVI",
        "city": "Ciego De Avila",
        "name": "Maximo Gomez Arpt",
        "country": "Cuba"
    },
    {
        "key": "AVL",
        "city": "Asheville",
        "name": "Asheville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AVN",
        "city": "Avignon",
        "name": "Avignon Caumont Arpt",
        "country": "France"
    },
    {
        "key": "AVO",
        "city": "Avon Park",
        "name": "Avon Park Executive Airport",
        "country": "United States"
    },
    {
        "key": "AVP",
        "city": "Scranton",
        "name": "Wilkes Barre Scranton Intl Arpt",
        "country": "United States"
    },
    {
        "key": "AVV",
        "city": "Melbourne",
        "name": "Avalon Arpt",
        "country": "Australia"
    },
    {
        "key": "AVW",
        "city": "Tucson",
        "name": "Avra Valley",
        "country": "United States"
    },
    {
        "key": "AVX",
        "city": "Avalon",
        "name": "Catalina Airport",
        "country": "United States"
    },
    {
        "key": "AWA",
        "city": "Awassa",
        "name": "Awasa Airport",
        "country": "Ethiopia"
    },
    {
        "key": "AWB",
        "city": "AWABA",
        "name": "AWABA AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "AWE",
        "city": "Alowe",
        "name": "Alowe Airport",
        "country": "Gabon"
    },
    {
        "key": "AWM",
        "city": "West Memphis",
        "name": "West Memphis Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AWP",
        "city": "Austral Downs",
        "name": "Austral Downs Airport",
        "country": "Australia"
    },
    {
        "key": "AWZ",
        "city": "Ahwaz",
        "name": "Ahwaz International Airport",
        "country": "Iran"
    },
    {
        "key": "AXA",
        "city": "Anguilla",
        "name": "Wallblake Municipal",
        "country": "Anguilla"
    },
    {
        "key": "AXD",
        "city": "Alexandroupolis",
        "name": "Dhmokritos Arpt",
        "country": "Greece"
    },
    {
        "key": "AXM",
        "city": "Armenia",
        "name": "El Eden Arpt",
        "country": "Colombia"
    },
    {
        "key": "AXN",
        "city": "Alexandria",
        "name": "Alexandria Airport",
        "country": "United States"
    },
    {
        "key": "AXP",
        "city": "Spring Point Settlement",
        "name": "Spring Point Airport",
        "country": "The Bahamas"
    },
    {
        "key": "AXS",
        "city": "Altus",
        "name": "Altus Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "AXT",
        "city": "Akita",
        "name": "Akita Airport",
        "country": "Japan"
    },
    {
        "key": "AXU",
        "city": "Aksum",
        "name": "Axum Airport",
        "country": "Ethiopia"
    },
    {
        "key": "AXV",
        "city": "Wapakoneta",
        "name": "Neil Armstrong Arpt",
        "country": "United States"
    },
    {
        "key": "AYA",
        "city": "Ayapel, Colombia",
        "name": "Ayapel Airport",
        "country": "Colombia"
    },
    {
        "key": "AYC",
        "city": "Ayacucho",
        "name": "Ayacucho Airport",
        "country": "Peru"
    },
    {
        "key": "AYI",
        "city": "Yari",
        "name": "Yari Airport",
        "country": "Colombia"
    },
    {
        "key": "AYP",
        "city": "Ayacucho",
        "name": "Yanamilla Arpt",
        "country": "Peru"
    },
    {
        "key": "AYQ",
        "city": "Ayers Rock",
        "name": "Connellan Arpt",
        "country": "Australia"
    },
    {
        "key": "AYR",
        "city": "Ayr Au",
        "name": "Ayr Arpt",
        "country": "Australia"
    },
    {
        "key": "AYT",
        "city": "Antalya",
        "name": "Antalya Airport",
        "country": "Turkey"
    },
    {
        "key": "AYU",
        "city": "Aiyura",
        "name": "Aiyura Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "AZA",
        "city": "Phoenix",
        "name": "Williams Gateway Arpt",
        "country": "United States"
    },
    {
        "key": "AZB",
        "city": "Amazon Bay",
        "name": "Amazon Bay Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "AZD",
        "city": "Yazd",
        "name": "Yazd Arpt",
        "country": "Iran"
    },
    {
        "key": "AZG",
        "city": "Apatzingan",
        "name": "Apatzingan Arpt",
        "country": "Mexico"
    },
    {
        "key": "AZI",
        "city": "Abu Dhabi",
        "name": "Bateen Airport",
        "country": "United Arab Emirates"
    },
    {
        "key": "AZN",
        "city": "Andizhan",
        "name": "Andizhan Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "AZO",
        "city": "Kalamazoo",
        "name": "Kalamazoo Cty Arpt",
        "country": "United States"
    },
    {
        "key": "AZP",
        "city": "Mexico City",
        "name": "Atizapan Arpt",
        "country": "Mexico"
    },
    {
        "key": "AZR",
        "city": "Adrar",
        "name": "TouatCheikh Sidi Mohamed Belkebir Airport",
        "country": "Algeria"
    },
    {
        "key": "AZS",
        "city": "Samana",
        "name": "Samana International Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "AZZ",
        "city": "Ambriz",
        "name": "Ambriz Airport",
        "country": "Angola"
    },
    {
        "key": "BAA",
        "city": "Bialla",
        "name": "Bialla Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BAB",
        "city": "Marysville",
        "name": "Beale AFB",
        "country": "United States"
    },
    {
        "key": "BAC",
        "city": "Barranca de Upia",
        "name": "Barranca de Upia Airport",
        "country": "Colombia"
    },
    {
        "key": "BAD",
        "city": "Shreveport",
        "name": "Barksdale Air Force Base",
        "country": "United States"
    },
    {
        "key": "BAE",
        "city": "Tallard",
        "name": "Barcelonnette â€“ Saint-Pons Airport",
        "country": "France"
    },
    {
        "key": "BAF",
        "city": "Westfield",
        "name": "Westfield-Barnes Regional Airport",
        "country": "United States"
    },
    {
        "key": "BAG",
        "city": "Baguio",
        "name": "Loakan Arpt",
        "country": "Philippines"
    },
    {
        "key": "BAH",
        "city": "Muharraq",
        "name": "Bahrain Intl Arpt",
        "country": "Bahrain"
    },
    {
        "key": "BAI",
        "city": "Buenos Aires",
        "name": "Buenos Aires Airport",
        "country": "Costa Rica"
    },
    {
        "key": "BAJ",
        "city": "Bali",
        "name": "Bali Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BAL",
        "city": "Batman",
        "name": "Batman Arpt",
        "country": "Turkey"
    },
    {
        "key": "BAM",
        "city": "Battle Mountain",
        "name": "Battle Mountain Airport (Lander County Airport)",
        "country": "United States"
    },
    {
        "key": "BAO",
        "city": "Ban Mak Khaen",
        "name": "Udorn Arpt",
        "country": "Thailand"
    },
    {
        "key": "BAQ",
        "city": "Barranquilla",
        "name": "E Cortissoz Arpt",
        "country": "Colombia"
    },
    {
        "key": "BAR",
        "city": "Qionghai",
        "name": "Qionghai Boao Airport",
        "country": "China"
    },
    {
        "key": "BAS",
        "city": "Balalae",
        "name": "Balalae Arpt",
        "country": "Solomon Islands"
    },
    {
        "key": "BAT",
        "city": "Barretos",
        "name": "Barretos Arpt",
        "country": "Brazil"
    },
    {
        "key": "BAU",
        "city": "Bauru Old Code",
        "name": "Bauru Airport",
        "country": "Brazil"
    },
    {
        "key": "BAV",
        "city": "Baotou",
        "name": "Baotou Arpt",
        "country": "China"
    },
    {
        "key": "BAX",
        "city": "Barnaul",
        "name": "Barnaul Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "BAY",
        "city": "Baia Mare",
        "name": "Baia Mare Arpt",
        "country": "Romania"
    },
    {
        "key": "BAZ",
        "city": "Barbelos",
        "name": "BARBELOS AIRPORT",
        "country": "Brazil"
    },
    {
        "key": "BBA",
        "city": "Balmaceda",
        "name": "Teniente Vidal Airport",
        "country": "Chile"
    },
    {
        "key": "HSZ",
        "city": "Hsinchun",
        "name": "Hsinchun Arpt",
        "country": "Taiwan"
    },
    {
        "key": "HTA",
        "city": "Chita",
        "name": "Chita Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "HTH",
        "city": "Hawthorne",
        "name": "Hawthorne Industrial",
        "country": "United States"
    },
    {
        "key": "HTI",
        "city": "Hamilton Island",
        "name": "Hamilton Island Arpt",
        "country": "Australia"
    },
    {
        "key": "HTL",
        "city": "HoughtonLake",
        "name": "Roscommon CountyBlodgett Memorial Airport",
        "country": "United States"
    },
    {
        "key": "HTM",
        "city": "Hatgal",
        "name": "Khatgal Airport",
        "country": "Mongolia"
    },
    {
        "key": "HTN",
        "city": "Hotan",
        "name": "Hotan Airport",
        "country": "China"
    },
    {
        "key": "HTO",
        "city": "East Hampton",
        "name": "East Hampton Arpt",
        "country": "United States"
    },
    {
        "key": "HTS",
        "city": "Huntington",
        "name": "Tri State Milton Arpt",
        "country": "United States"
    },
    {
        "key": "HTV",
        "city": "Huntsville",
        "name": "Huntsville Arpt",
        "country": "United States"
    },
    {
        "key": "HTW",
        "city": "South Point",
        "name": "Lawrence County Airpark",
        "country": "United States"
    },
    {
        "key": "HTY",
        "city": "Hantai",
        "name": "Hatay Airport",
        "country": "Turkey"
    },
    {
        "key": "HTZ",
        "city": "Hato Corozal",
        "name": "Hato Corozal Airport",
        "country": "Colombia"
    },
    {
        "key": "HUA",
        "city": "Huntsville",
        "name": "Redstone AAF",
        "country": "United States"
    },
    {
        "key": "HUB",
        "city": "Victoria River",
        "name": "Humbert River Airport",
        "country": "Australia"
    },
    {
        "key": "HUC",
        "city": "Humacao",
        "name": "Humacao Arpt",
        "country": "United States"
    },
    {
        "key": "HUD",
        "city": "Humboldt",
        "name": "Humboldt Municipal Airport",
        "country": "United States"
    },
    {
        "key": "HUF",
        "city": "Terre Haute",
        "name": "Hulman Field",
        "country": "United States"
    },
    {
        "key": "HUH",
        "city": "Huahine",
        "name": "Huahine Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "HUI",
        "city": "Hu",
        "name": "Phu Bai Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "HUJ",
        "city": "Hugo",
        "name": "Stan Stamper Municipal Airport (FAA: HHW)",
        "country": "United States"
    },
    {
        "key": "HUL",
        "city": "Houlton",
        "name": "Houlton International Airport",
        "country": "United States"
    },
    {
        "key": "HUM",
        "city": "Houma",
        "name": "Terrebonne Arpt",
        "country": "United States"
    },
    {
        "key": "HUN",
        "city": "Hualien",
        "name": "Hualien Arpt",
        "country": "Taiwan"
    },
    {
        "key": "HUQ",
        "city": "Hun, Libya",
        "name": "Hun Airport",
        "country": "Taiwan"
    },
    {
        "key": "HUS",
        "city": "Hughes",
        "name": "Hughes Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "HUT",
        "city": "Hutchinson",
        "name": "Hutchinson Municipal",
        "country": "United States"
    },
    {
        "key": "HUU",
        "city": "Huanuco",
        "name": "Huanuco Arpt",
        "country": "Peru"
    },
    {
        "key": "HUV",
        "city": "Hudiksvall",
        "name": "Hudiksvall Arpt",
        "country": "Sweden"
    },
    {
        "key": "HUX",
        "city": "Santa Cruz Huatulco",
        "name": "Bahia De Huatulco Arpt",
        "country": "Mexico"
    },
    {
        "key": "HUY",
        "city": "Humberside",
        "name": "Humberside Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "HUZ",
        "city": "Huizhou",
        "name": "Huizhou Arpt",
        "country": "China"
    },
    {
        "key": "HVB",
        "city": "Hervey Bay",
        "name": "Hervey Bay",
        "country": "Australia"
    },
    {
        "key": "HVD",
        "city": "Khovd",
        "name": "Khovd Airport",
        "country": "Mongolia"
    },
    {
        "key": "HVE",
        "city": "Hanksville",
        "name": "Intermediate Arpt",
        "country": "United States"
    },
    {
        "key": "HVG",
        "city": "Honningsvag",
        "name": "Valan Arpt",
        "country": "Norway"
    },
    {
        "key": "HVK",
        "city": "Holmavik, Iceland",
        "name": "Holmavik Airport",
        "country": "Iceland"
    },
    {
        "key": "HVN",
        "city": "New Haven",
        "name": "Tweed New Haven Arpt",
        "country": "United States"
    },
    {
        "key": "HVR",
        "city": "Havre",
        "name": "City County",
        "country": "United States"
    },
    {
        "key": "HVS",
        "city": "Hartsville",
        "name": "Hartsville Regional Airport",
        "country": "United States"
    },
    {
        "key": "HWA",
        "city": "Hawabango",
        "name": "Hawabango Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "HWD",
        "city": "Hayward",
        "name": "Hayward Air Terminal",
        "country": "United States"
    },
    {
        "key": "HWN",
        "city": "Hwange",
        "name": "Hwange Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "HWO",
        "city": "Miami",
        "name": "North Perry Arpt",
        "country": "United States"
    },
    {
        "key": "HXX",
        "city": "Hay South",
        "name": "Hay Airport",
        "country": "Australia"
    },
    {
        "key": "HYA",
        "city": "Hyannis",
        "name": "Barnstable Cty Arpt",
        "country": "United States"
    },
    {
        "key": "HYD",
        "city": "Hyderabad",
        "name": "Shamshabad Rajiv Gandhi Intl Arpt",
        "country": "India"
    },
    {
        "key": "HYF",
        "city": "Pietermaritzburg",
        "name": "Hayfields Airport",
        "country": "South Africa"
    },
    {
        "key": "HYG",
        "city": "Hydaburg",
        "name": "SPB",
        "country": "United States"
    },
    {
        "key": "HYL",
        "city": "Hollis",
        "name": "Sea Plane Base",
        "country": "United States"
    },
    {
        "key": "HYN",
        "city": "Huangyan",
        "name": "Huangyan Arpt",
        "country": "China"
    },
    {
        "key": "HYR",
        "city": "Hayward",
        "name": "Hayward Municipal",
        "country": "United States"
    },
    {
        "key": "HYS",
        "city": "Hays",
        "name": "Hays Municipal",
        "country": "United States"
    },
    {
        "key": "HYV",
        "city": "Hyvinkaa",
        "name": "Hyvinkaa Airfield",
        "country": "Finland"
    },
    {
        "key": "HZB",
        "city": "Hazebrouck",
        "name": "Merville Calonne Arpt",
        "country": "France"
    },
    {
        "key": "HZG",
        "city": "Hanzhong",
        "name": "Chenggu",
        "country": "China"
    },
    {
        "key": "HZK",
        "city": "Husavik",
        "name": "Husavik Arpt",
        "country": "Iceland"
    },
    {
        "key": "HZL",
        "city": "Hazleton, Pennsylvania, United States",
        "name": "Hazleton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "HZV",
        "city": "Hazyview",
        "name": "Hazyview Airport",
        "country": "South Africa"
    },
    {
        "key": "IAB",
        "city": "Wichita",
        "name": "Mcconnell Airforce Base",
        "country": "United States"
    },
    {
        "key": "IAD",
        "city": "Washington",
        "name": "Washington Dulles Intl",
        "country": "United States"
    },
    {
        "key": "IAG",
        "city": "Niagara Falls",
        "name": "Niagara Falls Intl Arpt",
        "country": "United States"
    },
    {
        "key": "IAH",
        "city": "Houston",
        "name": "George Bush Intercontinental",
        "country": "United States"
    },
    {
        "key": "IAM",
        "city": "In Amenas",
        "name": "In Amenas Airport (Zarzaitine Airport)",
        "country": "Algeria"
    },
    {
        "key": "IAN",
        "city": "Kiana",
        "name": "Bob Baker Memorial Airport",
        "country": "United States"
    },
    {
        "key": "IAO",
        "city": "Siargao",
        "name": "Sayak",
        "country": "Philippines"
    },
    {
        "key": "IAQ",
        "city": "Bahregan, Iran",
        "name": "Bahregan Airport",
        "country": "Iran"
    },
    {
        "key": "IAR",
        "city": "Yaroslavl",
        "name": "Yaroslavl Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "IAS",
        "city": "Iasi",
        "name": "Iasi Arpt",
        "country": "Romania"
    },
    {
        "key": "IBA",
        "city": "Ibadan",
        "name": "Ibadanairport",
        "country": "Nigeria"
    },
    {
        "key": "IBE",
        "city": "Ibague",
        "name": "Ibague Arpt",
        "country": "Colombia"
    },
    {
        "key": "IBL",
        "city": "Bazaruto Island, Mozambique",
        "name": "Indigo Bay Lodge Airport",
        "country": "Mozambique"
    },
    {
        "key": "FRU",
        "city": "Bishkek",
        "name": "Bishkek Arpt",
        "country": "Kyrgyzstan"
    },
    {
        "key": "FRW",
        "city": "Francistown",
        "name": "Francistown Arpt",
        "country": "Botswana"
    },
    {
        "key": "FRY",
        "city": "Fryeburg",
        "name": "Fryeburg",
        "country": "United States"
    },
    {
        "key": "FRZ",
        "city": "Fritzlar",
        "name": "Fritzlar Airbase",
        "country": "Germany"
    },
    {
        "key": "FSC",
        "city": "Figari",
        "name": "Sud Corse Arpt",
        "country": "France"
    },
    {
        "key": "FSD",
        "city": "Sioux Falls",
        "name": "Regional Joe Foss Field",
        "country": "United States"
    },
    {
        "key": "FSI",
        "city": "Fort Sill",
        "name": "Henry Post Army Airfield (Fort Sill)",
        "country": "United States"
    },
    {
        "key": "FSK",
        "city": "Fort Scott",
        "name": "Fort Scott Municipal Airport",
        "country": "United States"
    },
    {
        "key": "FSM",
        "city": "Ft Smith",
        "name": "Ft Smith Municipal",
        "country": "United States"
    },
    {
        "key": "FSP",
        "city": "St Pierre",
        "name": "St Pierre Arpt",
        "country": "Canada"
    },
    {
        "key": "FST",
        "city": "Fort Stockton",
        "name": "Pecos County Arpt",
        "country": "United States"
    },
    {
        "key": "FSZ",
        "city": "Shizuoka City",
        "name": "Mount Fuji Shizuoka Arpt",
        "country": "Japan"
    },
    {
        "key": "FTE",
        "city": "El Calafate",
        "name": "El Calafate Arpt",
        "country": "Argentina"
    },
    {
        "key": "FTI",
        "city": "Maia",
        "name": "Fitiuta Airport",
        "country": "American Samoa"
    },
    {
        "key": "FTU",
        "city": "Fort Dauphin",
        "name": "Marillac Arpt",
        "country": "Madagascar"
    },
    {
        "key": "FTW",
        "city": "Ft Worth",
        "name": "Meacham Field",
        "country": "United States"
    },
    {
        "key": "FTX",
        "city": "Owando, Republic of the Congo",
        "name": "Owando Airport",
        "country": "Republic of the Congo"
    },
    {
        "key": "FTY",
        "city": "Atlanta",
        "name": "Fulton Cty Arpt",
        "country": "United States"
    },
    {
        "key": "FUB",
        "city": "Fulleborn",
        "name": "Fulleborn Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "FUE",
        "city": "Puerto Del Rosario",
        "name": "Fuerteventura Arpt",
        "country": "Spain"
    },
    {
        "key": "FUG",
        "city": "Fuyang",
        "name": "Fuyang Airport",
        "country": "China"
    },
    {
        "key": "FUJ",
        "city": "Fukue",
        "name": "Fukue Arpt",
        "country": "Japan"
    },
    {
        "key": "FUK",
        "city": "Fukuoka",
        "name": "Itazuke Arpt",
        "country": "Japan"
    },
    {
        "key": "FUL",
        "city": "Fullerton",
        "name": "Fullerton Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "FUN",
        "city": "Funafuti",
        "name": "Funafuti Intl Arpt",
        "country": "Tuvalu"
    },
    {
        "key": "FUO",
        "city": "Fuoshan",
        "name": "Fuoshan Arpt",
        "country": "China"
    },
    {
        "key": "FVM",
        "city": "Fuvahmulah",
        "name": "Fuvahmulah Airport",
        "country": "Maldives"
    },
    {
        "key": "FWA",
        "city": "Ft Wayne",
        "name": "Baer Field",
        "country": "United States"
    },
    {
        "key": "FWH",
        "city": "Dallas",
        "name": "Carswell Airforce Base",
        "country": "United States"
    },
    {
        "key": "FWM",
        "city": "Fort William",
        "name": "Fort William Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "FXE",
        "city": "Ft Lauderdale",
        "name": "Ft Lauderdale Excutive",
        "country": "United States"
    },
    {
        "key": "FXO",
        "city": "Cuamba",
        "name": "Cuamba Airport",
        "country": "Mozambique"
    },
    {
        "key": "FXY",
        "city": "Forest City",
        "name": "Forest City Municipal Airport",
        "country": "United States"
    },
    {
        "key": "FYG",
        "city": "Shenzhen",
        "name": "Fuyong ferry port",
        "country": "China"
    },
    {
        "key": "FYT",
        "city": "Faya-Largeau",
        "name": "Faya-Largeau Airport",
        "country": "Chad"
    },
    {
        "key": "FYU",
        "city": "Fort Yukon",
        "name": "Fort Yukon Airport",
        "country": "United States"
    },
    {
        "key": "FYV",
        "city": "Fayetteville",
        "name": "Fayetteville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "GAA",
        "city": "Guamal, Colombia",
        "name": "Guamal Airport",
        "country": "Colombia"
    },
    {
        "key": "GAC",
        "city": "Gracias, Honduras",
        "name": "Gracias Airport",
        "country": "Honduras"
    },
    {
        "key": "GAD",
        "city": "Gadsden",
        "name": "Gadsden Municipal",
        "country": "United States"
    },
    {
        "key": "GAE",
        "city": "Gabes",
        "name": "Gabes Matmata International Airport",
        "country": "Tunisia"
    },
    {
        "key": "GAG",
        "city": "Gage",
        "name": "Gage Airport",
        "country": "United States"
    },
    {
        "key": "GAH",
        "city": "Gayndah",
        "name": "Gayndah Airport",
        "country": "Australia"
    },
    {
        "key": "GAI",
        "city": "Gaithersburg",
        "name": "Montgomery Cty Arpt",
        "country": "United States"
    },
    {
        "key": "GAJ",
        "city": "Yamagata",
        "name": "Yamagata Airport",
        "country": "Japan"
    },
    {
        "key": "GAL",
        "city": "Galena",
        "name": "Galena Arpt",
        "country": "United States"
    },
    {
        "key": "GAM",
        "city": "Gambell",
        "name": "Gambell Airport",
        "country": "United States"
    },
    {
        "key": "GAN",
        "city": "Gan Island",
        "name": "Gan International Arpt",
        "country": "Maldives"
    },
    {
        "key": "GAO",
        "city": "Guantanamo",
        "name": "Guantanamo Airport",
        "country": "Cuba"
    },
    {
        "key": "GAP",
        "city": "Gusap",
        "name": "Gusap Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GAQ",
        "city": "Gao",
        "name": "Gao Airport",
        "country": "Mali"
    },
    {
        "key": "GAR",
        "city": "Garaina",
        "name": "Garaina Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "GAT",
        "city": "Gap France",
        "name": "Tallard Arpt",
        "country": "France"
    },
    {
        "key": "GAU",
        "city": "Guwahati",
        "name": "Lokpriya Gopinath Bordoloi Intl Arpt",
        "country": "India"
    },
    {
        "key": "GAV",
        "city": "Gag Island, Indonesia",
        "name": "Gag Island Airport",
        "country": "Indonesia"
    },
    {
        "key": "GAW",
        "city": "Gangaw",
        "name": "Gangaw Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "GAX",
        "city": "Gamba",
        "name": "Gamba Airport",
        "country": "Gabon"
    },
    {
        "key": "GAY",
        "city": "Gaya",
        "name": "Gaya Arpt",
        "country": "India"
    },
    {
        "key": "GBA",
        "city": "Kemble, England, United Kingdom",
        "name": "Cotswold Airport[2]",
        "country": "United Kingdom"
    },
    {
        "key": "GBB",
        "city": "Gabala",
        "name": "Qabala International Airport",
        "country": "Azerbaijan"
    },
    {
        "key": "GBD",
        "city": "Great Bend",
        "name": "Greate Bend Municipal",
        "country": "United States"
    },
    {
        "key": "GBE",
        "city": "Gaborone",
        "name": "Gaborone Arpt",
        "country": "Botswana"
    },
    {
        "key": "GBF",
        "city": "Negarbo",
        "name": "Negarbo Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GBG",
        "city": "Galesburg",
        "name": "Galesburg Arpt",
        "country": "United States"
    },
    {
        "key": "GBI",
        "city": "Kalaburagi",
        "name": "Kalaburagi Airport",
        "country": "India"
    },
    {
        "key": "GBK",
        "city": "Gbangbatok",
        "name": "Gbangbatok Arpt",
        "country": "Sierra Leone"
    },
    {
        "key": "GBL",
        "city": "Arnhem Land",
        "name": "South Goulburn Island Airport",
        "country": "Australia"
    },
    {
        "key": "GBM",
        "city": "Garbaharey",
        "name": "Garbaharey Airport",
        "country": "Somalia"
    },
    {
        "key": "GBN",
        "city": "San Giovanni Rotondo",
        "name": "San Giovanni Rotondo Arpt",
        "country": "Italy"
    },
    {
        "key": "GBO",
        "city": "Washington",
        "name": "Baltimore Greenbelt Arpt",
        "country": "United States"
    },
    {
        "key": "GBR",
        "city": "Great Barrington",
        "name": "Great Barrington Arpt",
        "country": "United States"
    },
    {
        "key": "GBT",
        "city": "Gorgan",
        "name": "Gorgan",
        "country": "Iran"
    },
    {
        "key": "RAM",
        "city": "Ramingining",
        "name": "Ramingining Airport",
        "country": "Australia"
    },
    {
        "key": "RAN",
        "city": "Ravenna",
        "name": "Ravenna Airport",
        "country": "Italy"
    },
    {
        "key": "RAO",
        "city": "Ribeirao Preto",
        "name": "Leite Lopes",
        "country": "Brazil"
    },
    {
        "key": "RAP",
        "city": "Rapid City",
        "name": "Rapid City Regional Arpt",
        "country": "United States"
    },
    {
        "key": "RAQ",
        "city": "Muna Island, Indonesia",
        "name": "Sugimanuru Airport",
        "country": "Indonesia"
    },
    {
        "key": "RAR",
        "city": "Rarotonga",
        "name": "Rarotonga Arpt",
        "country": "Cook Islands"
    },
    {
        "key": "RAS",
        "city": "Rasht",
        "name": "Rasht Airport",
        "country": "Iran"
    },
    {
        "key": "RAT",
        "city": "Raduzhny, Khanty-Mansi Autonomous Okrug",
        "name": "Raduzhny Airport",
        "country": "Russia"
    },
    {
        "key": "RAX",
        "city": "Oram",
        "name": "Oram Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "RAZ",
        "city": "Rawala Kot",
        "name": "Rawala Kot",
        "country": "Pakistan"
    },
    {
        "key": "RBA",
        "city": "Rabat",
        "name": "Sale Airport",
        "country": "Morocco"
    },
    {
        "key": "RBB",
        "city": "Borba",
        "name": "Borba Airport",
        "country": "Brazil"
    },
    {
        "key": "RBD",
        "city": "Dallas",
        "name": "Redbirdarpt",
        "country": "United States"
    },
    {
        "key": "RBE",
        "city": "Ratanakiri",
        "name": "Ratanakiri Airport",
        "country": "Cambodia"
    },
    {
        "key": "RBF",
        "city": "Big Bear City",
        "name": "Big Bear City Arpt",
        "country": "United States"
    },
    {
        "key": "RBG",
        "city": "Roseburg",
        "name": "Roseburg Municipal",
        "country": "United States"
    },
    {
        "key": "RBI",
        "city": "Rabi Island",
        "name": "Rabi Airport",
        "country": "Fiji"
    },
    {
        "key": "RBK",
        "city": "Murrieta",
        "name": "French Valley Airport (FAA: F70)",
        "country": "United States"
    },
    {
        "key": "RBL",
        "city": "Redding",
        "name": "Flight Service Station",
        "country": "United States"
    },
    {
        "key": "RBM",
        "city": "Straubing",
        "name": "Wallmuhle",
        "country": "Germany"
    },
    {
        "key": "RBP",
        "city": "Gurney",
        "name": "Rabaraba Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "RBR",
        "city": "Rio Branco",
        "name": "Pres Medici Arpt",
        "country": "Brazil"
    },
    {
        "key": "RBW",
        "city": "Walterboro",
        "name": "Walterboro Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "RBY",
        "city": "Ruby",
        "name": "Ruby Airport",
        "country": "United States"
    },
    {
        "key": "RCA",
        "city": "Rapid City",
        "name": "Ellsworth Airforce Base",
        "country": "United States"
    },
    {
        "key": "RCB",
        "city": "Richards Bay",
        "name": "Richards Bay Arpt",
        "country": "South Africa"
    },
    {
        "key": "RCE",
        "city": "Roche Harbor",
        "name": "Roche Harbor Arpt",
        "country": "United States"
    },
    {
        "key": "RCH",
        "city": "Riohacha",
        "name": "RIOHACHA ARPT",
        "country": "Colombia"
    },
    {
        "key": "RCM",
        "city": "Richmond",
        "name": "Richmond Arpt",
        "country": "Australia"
    },
    {
        "key": "RCO",
        "city": "Rochefort",
        "name": "St Agnant Arpt",
        "country": "France"
    },
    {
        "key": "RCR",
        "city": "Atlanta",
        "name": "Fulton County Airport",
        "country": "United States"
    },
    {
        "key": "RCS",
        "city": "Rochester",
        "name": "Rochester Airport",
        "country": "United Kingdom"
    },
    {
        "key": "RCU",
        "city": "Rio Cuarto",
        "name": "Rio Cuarto Arpt",
        "country": "Argentina"
    },
    {
        "key": "RDD",
        "city": "Redding",
        "name": "Redding Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "RDG",
        "city": "Reading",
        "name": "Reading Municipal",
        "country": "United States"
    },
    {
        "key": "RDM",
        "city": "Redmond",
        "name": "Roberts Field",
        "country": "United States"
    },
    {
        "key": "RDN",
        "city": "Redang",
        "name": "Lts Pulau Redang Arpt",
        "country": "Malaysia"
    },
    {
        "key": "RDR",
        "city": "Grand Forks Air Force Base",
        "name": "Grand Forks Air Force Base",
        "country": "United States"
    },
    {
        "key": "RDT",
        "city": "Richard Toll, Senegal",
        "name": "Richard Toll Airport",
        "country": "Senegal"
    },
    {
        "key": "RDU",
        "city": "Raleigh",
        "name": "Raleigh Durham Intl Arpt",
        "country": "United States"
    },
    {
        "key": "RDV",
        "city": "Red Devil",
        "name": "Red Devil Airport",
        "country": "United States"
    },
    {
        "key": "RDZ",
        "city": "Rodez",
        "name": "Marcillac",
        "country": "France"
    },
    {
        "key": "REB",
        "city": "LÃ¤rz",
        "name": "Rechlinâ€“LÃ¤rz Airfield",
        "country": "Germany"
    },
    {
        "key": "REC",
        "city": "Recife",
        "name": "Recife Airport",
        "country": "Brazil"
    },
    {
        "key": "REE",
        "city": "Lubbock",
        "name": "Reese Airforce Base",
        "country": "United States"
    },
    {
        "key": "REG",
        "city": "Reggio Calabria",
        "name": "Tito Menniti Arpt",
        "country": "Italy"
    },
    {
        "key": "REI",
        "city": "Regina",
        "name": "RÃ©gina Airport",
        "country": "Canada"
    },
    {
        "key": "REL",
        "city": "Trelew",
        "name": "Trelew Arpt",
        "country": "Argentina"
    },
    {
        "key": "REN",
        "city": "Orenburg",
        "name": "Orenburg Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "REO",
        "city": "Jordan Valley",
        "name": "Rome State Airport",
        "country": "United States"
    },
    {
        "key": "RER",
        "city": "Retalhuleu",
        "name": "Base Aerea Del Sur Arpt",
        "country": "Guatemala"
    },
    {
        "key": "RES",
        "city": "Resistencia",
        "name": "Resistencia Arpt",
        "country": "Argentina"
    },
    {
        "key": "RET",
        "city": "Rost, Norway",
        "name": "Rost Airport",
        "country": "Norway"
    },
    {
        "key": "REU",
        "city": "Reus",
        "name": "Reus Arpt",
        "country": "Spain"
    },
    {
        "key": "REW",
        "city": "Rewa",
        "name": "Rewa",
        "country": "India"
    },
    {
        "key": "REX",
        "city": "Reynosa",
        "name": "General Lucio Blanco Arpt",
        "country": "Mexico"
    },
    {
        "key": "REZ",
        "city": "Resende",
        "name": "Resende Airport",
        "country": "Brazil"
    },
    {
        "key": "RFD",
        "city": "Chicago",
        "name": "Chicago Rockford Arpt",
        "country": "United States"
    },
    {
        "key": "RFG",
        "city": "REFUGIO",
        "name": "Rooke Fieldarpt",
        "country": "United States"
    },
    {
        "key": "RFP",
        "city": "Raiatea",
        "name": "Raiatea Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "RGA",
        "city": "Rio Grande",
        "name": "Rio Grande Arpt",
        "country": "Argentina"
    },
    {
        "key": "RGH",
        "city": "Balurghat",
        "name": "Balurghat Airport",
        "country": "India"
    },
    {
        "key": "RGI",
        "city": "Rangiroa Island",
        "name": "Rangiroa Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "RGK",
        "city": "Gorno Altaysk",
        "name": "Gorno Altaysk Airport",
        "country": "Russian Federation"
    },
    {
        "key": "RGL",
        "city": "Rio Gallegos",
        "name": "Rio Gallegos Internacional Arpt",
        "country": "Argentina"
    },
    {
        "key": "RGN",
        "city": "Yangon",
        "name": "Mingaladon",
        "country": "Myanmar"
    },
    {
        "key": "RGR",
        "city": "Ranger",
        "name": "Ranger Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "RGS",
        "city": "Burgos",
        "name": "Burgos Arpt",
        "country": "Spain"
    },
    {
        "key": "RGT",
        "city": "Rengat",
        "name": "Japura",
        "country": "Indonesia"
    },
    {
        "key": "RHD",
        "city": "Santiago del Estero",
        "name": "Termas de Rio Hondo Airport",
        "country": "Argentina"
    },
    {
        "key": "RHE",
        "city": "Reims",
        "name": "Champagne Arpt",
        "country": "France"
    },
    {
        "key": "RHG",
        "city": "Ruhengeri",
        "name": "Ruhengeri Airport",
        "country": "Rwanda"
    },
    {
        "key": "BYC",
        "city": "YacuÃ­ba",
        "name": "Yacuiba Airport",
        "country": "Bolivia"
    },
    {
        "key": "BYF",
        "city": "Meaulte",
        "name": "Albert Arpt",
        "country": "France"
    },
    {
        "key": "BYG",
        "city": "Olathe",
        "name": "Johnson County Airport",
        "country": "United States"
    },
    {
        "key": "BYH",
        "city": "Blytheville",
        "name": "Blytheville Air Force Base",
        "country": "United States"
    },
    {
        "key": "BYI",
        "city": "Burley",
        "name": "Burley Arpt",
        "country": "United States"
    },
    {
        "key": "BYJ",
        "city": "Beja",
        "name": "Beja International Airport",
        "country": "Portugal"
    },
    {
        "key": "BYL",
        "city": "Bella Yella",
        "name": "Bella Yella Airport",
        "country": "Liberia"
    },
    {
        "key": "BYO",
        "city": "Barreiras",
        "name": "Bonito Airport",
        "country": "Brazil"
    },
    {
        "key": "BYR",
        "city": "Laeso Island",
        "name": "Laeso Airport",
        "country": "Denmark"
    },
    {
        "key": "BYS",
        "city": "Fort Irwin",
        "name": "Fort Irwin Arpt",
        "country": "United States"
    },
    {
        "key": "BYT",
        "city": "Bantry, Ireland",
        "name": "Bantry Aerodrome",
        "country": "Ireland"
    },
    {
        "key": "BYU",
        "city": "Bayreuth",
        "name": "Bindlacher Berg Arpt",
        "country": "Germany"
    },
    {
        "key": "BYV",
        "city": "Sri Jayawardenepura Kotte",
        "name": "Beira Lake Seaplane Base",
        "country": "Sri Lanka"
    },
    {
        "key": "BYW",
        "city": "Blakely Island",
        "name": "Blakely Is Municipal",
        "country": "United States"
    },
    {
        "key": "BYX",
        "city": "Baniyala",
        "name": "Baniyala Airport",
        "country": "Australia"
    },
    {
        "key": "BZA",
        "city": "San Pedro",
        "name": "San Pedro Airport",
        "country": "Belize"
    },
    {
        "key": "BZC",
        "city": "Buzios",
        "name": "Buzios Arpt",
        "country": "Brazil"
    },
    {
        "key": "BZD",
        "city": "Balranald",
        "name": "Balranald Airport",
        "country": "Australia"
    },
    {
        "key": "BZE",
        "city": "Belize City",
        "name": "Belize Intl Arpt",
        "country": "Belize"
    },
    {
        "key": "BZG",
        "city": "Bydgoszcz",
        "name": "Bydgoszcz Arpt",
        "country": "Poland"
    },
    {
        "key": "BZH",
        "city": "Bumi Hills",
        "name": "Bumi Hills Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "BZI",
        "city": "Balikesir",
        "name": "Balikesir Arpt",
        "country": "Turkey"
    },
    {
        "key": "BZK",
        "city": "Bryansk",
        "name": "Bryansk Airport",
        "country": "Russian Federation"
    },
    {
        "key": "BZL",
        "city": "Barisal",
        "name": "Barisal",
        "country": "Bangladesh"
    },
    {
        "key": "BZM",
        "city": "Bemolanga",
        "name": "Bemolanga Airport",
        "country": "Madagascar"
    },
    {
        "key": "BZN",
        "city": "Bozeman",
        "name": "Gallatin Field",
        "country": "United States"
    },
    {
        "key": "BZO",
        "city": "Bolzano",
        "name": "Bolzano Arpt",
        "country": "Italy"
    },
    {
        "key": "BZP",
        "city": "Lakefield",
        "name": "Bizant Airport",
        "country": "Australia"
    },
    {
        "key": "BZR",
        "city": "Beziers",
        "name": "Beziers Vias Arpt",
        "country": "France"
    },
    {
        "key": "BZT",
        "city": "Brazoria",
        "name": "Brazoria County Arpt",
        "country": "United States"
    },
    {
        "key": "BZU",
        "city": "Buta, Democratic Republic of the Congo",
        "name": "Buta Zega Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "BZV",
        "city": "Brazzaville",
        "name": "Maya Maya Arpt",
        "country": "Congo"
    },
    {
        "key": "BZY",
        "city": "Balti, Moldova",
        "name": "Balti International Airport",
        "country": "Moldova"
    },
    {
        "key": "BZZ",
        "city": "Oxford",
        "name": "Brize Norton Raf Station",
        "country": "United Kingdom"
    },
    {
        "key": "CAA",
        "city": "Catacamas, Honduras",
        "name": "Catacamas Airport",
        "country": "Honduras"
    },
    {
        "key": "CAB",
        "city": "Cabinda",
        "name": "Cabinda Airport",
        "country": "Angola"
    },
    {
        "key": "CAC",
        "city": "Cascavel",
        "name": "Cascavel Arpt",
        "country": "Brazil"
    },
    {
        "key": "CAD",
        "city": "Cadillac",
        "name": "Wexford County Arpt",
        "country": "United States"
    },
    {
        "key": "CAE",
        "city": "Columbia",
        "name": "Columbia Metro Arpt",
        "country": "United States"
    },
    {
        "key": "CAG",
        "city": "Cagliari",
        "name": "Elmas Airport",
        "country": "Italy"
    },
    {
        "key": "CAH",
        "city": "Ca Mau",
        "name": "Ca Mau",
        "country": "Vietnam"
    },
    {
        "key": "CAI",
        "city": "Cairo",
        "name": "Cairo Intl Arpt",
        "country": "Egypt"
    },
    {
        "key": "CAJ",
        "city": "Canaima",
        "name": "Canaima Airport",
        "country": "Venezuela"
    },
    {
        "key": "CAK",
        "city": "Akron",
        "name": "Akron Canton Regional Arpt",
        "country": "United States"
    },
    {
        "key": "CAL",
        "city": "Campbelltown",
        "name": "Machrihanish Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CAM",
        "city": "Camiri",
        "name": "Choreti Arpt",
        "country": "Bolivia"
    },
    {
        "key": "CAN",
        "city": "Guangzhou",
        "name": "Baiyun International Airport",
        "country": "China"
    },
    {
        "key": "CAO",
        "city": "Clayton",
        "name": "Clayton Municipal Airpark",
        "country": "United States"
    },
    {
        "key": "CAP",
        "city": "Cap Haitien",
        "name": "Cap Haitien Numicipal",
        "country": "Haiti"
    },
    {
        "key": "CAQ",
        "city": "Caucasia",
        "name": "Caucasia Arpt",
        "country": "Colombia"
    },
    {
        "key": "CAR",
        "city": "Caribou",
        "name": "Caribou Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CAS",
        "city": "Casablanca",
        "name": "Anfa Airport",
        "country": "Morocco"
    },
    {
        "key": "CAT",
        "city": "SÃ£o Domingos de Rana",
        "name": "Cascais Municipal Aerodrome",
        "country": "Portugal"
    },
    {
        "key": "CAU",
        "city": "Caruaru",
        "name": "Caruaru Arpt",
        "country": "Brazil"
    },
    {
        "key": "CAW",
        "city": "Campos",
        "name": "Bartolomeu Lisandro Arpt",
        "country": "Brazil"
    },
    {
        "key": "CAX",
        "city": "Carlisle",
        "name": "Carlisle Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CAY",
        "city": "Cayenne",
        "name": "Rochambeau Airport",
        "country": "French Guiana"
    },
    {
        "key": "CAZ",
        "city": "Cobar",
        "name": "Cobar Arpt",
        "country": "Australia"
    },
    {
        "key": "CBA",
        "city": "Corner Bay",
        "name": "Corner Bay Arpt",
        "country": "United States"
    },
    {
        "key": "CBB",
        "city": "Cochabamba",
        "name": "J Wilsterman Arpt",
        "country": "Bolivia"
    },
    {
        "key": "CBD",
        "city": "Car Nicobar",
        "name": "Car Nicobar Air Force Base",
        "country": "India"
    },
    {
        "key": "CBE",
        "city": "Cumberland",
        "name": "Cumberland Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CBF",
        "city": "Council Bluffs",
        "name": "Council Bluffs Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CBG",
        "city": "Cambridge",
        "name": "Cambridge Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CBH",
        "city": "Bechar",
        "name": "Leger",
        "country": "Algeria"
    },
    {
        "key": "CBI",
        "city": "Cape Barren Island",
        "name": "Cape Barren Island",
        "country": "Australia"
    },
    {
        "key": "CBJ",
        "city": "Cabo Rojo",
        "name": "Cabo Rojo Airport",
        "country": "Dominican Republic"
    },
    {
        "key": "CBK",
        "city": "Colby",
        "name": "Colby Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "CBL",
        "city": "Ciudad Bolivar",
        "name": "Ciudad Bolivar Arpt",
        "country": "Venezuela"
    },
    {
        "key": "CBM",
        "city": "Sydney",
        "name": "Columbus Airforce Base",
        "country": "Australia"
    },
    {
        "key": "CBN",
        "city": "Cirebon",
        "name": "Penggung Arpt",
        "country": "Indonesia"
    },
    {
        "key": "CBO",
        "city": "Cotabato",
        "name": "Awang Arpt",
        "country": "Philippines"
    },
    {
        "key": "MTX",
        "city": "Fairbanks",
        "name": "Metro Field Airport",
        "country": "United States"
    },
    {
        "key": "MTY",
        "city": "Monterrey",
        "name": "Escobedo Arpt",
        "country": "Mexico"
    },
    {
        "key": "MTZ",
        "city": "Masada, Israel",
        "name": "Bar Yehuda Airfield (Masada Airfield)",
        "country": "Israel"
    },
    {
        "key": "MUA",
        "city": "Munda",
        "name": "Munda Arpt",
        "country": "Solomon Islands"
    },
    {
        "key": "MUB",
        "city": "Maun",
        "name": "Maun Arpt",
        "country": "Botswana"
    },
    {
        "key": "MUC",
        "city": "Munich",
        "name": "Munich Intl Arpt",
        "country": "Germany"
    },
    {
        "key": "MUD",
        "city": "Mueda",
        "name": "Mueda Airport",
        "country": "Mozambique"
    },
    {
        "key": "MUE",
        "city": "Kamuela",
        "name": "Waimea Arpt",
        "country": "United States"
    },
    {
        "key": "MUH",
        "city": "Mersa Matruh",
        "name": "Mersa Matruh Airport",
        "country": "Egypt"
    },
    {
        "key": "MUI",
        "city": "Muirpur Airport",
        "name": "Muirpur Airport",
        "country": "India"
    },
    {
        "key": "MUJ",
        "city": "Annville",
        "name": "Mui Airport",
        "country": "United States"
    },
    {
        "key": "MUK",
        "city": "Mauke Island, Cook Islands",
        "name": "Mauke Airport",
        "country": "Cook Islands"
    },
    {
        "key": "MUL",
        "city": "Moultrie",
        "name": "Spence Airport",
        "country": "United States"
    },
    {
        "key": "MUN",
        "city": "Maturin",
        "name": "Quiriquire Arpt",
        "country": "Venezuela"
    },
    {
        "key": "MUO",
        "city": "Mountain Home",
        "name": "Mountain Home AFB",
        "country": "United States"
    },
    {
        "key": "MUR",
        "city": "Marudi",
        "name": "Marudi Arpt",
        "country": "Malaysia"
    },
    {
        "key": "MUT",
        "city": "Muscatine",
        "name": "Muscatine Municipal Airport",
        "country": "United States"
    },
    {
        "key": "MUV",
        "city": "Philadelphia",
        "name": "Mustin ALF",
        "country": "United States"
    },
    {
        "key": "MUX",
        "city": "Multan",
        "name": "Multan Airport",
        "country": "Pakistan"
    },
    {
        "key": "MUZ",
        "city": "Musoma",
        "name": "Musoma Arpt",
        "country": "Tanzania"
    },
    {
        "key": "MVB",
        "city": "Franceville Mvengue",
        "name": "Franceville Mvengue Arpt",
        "country": "Gabon"
    },
    {
        "key": "MVC",
        "city": "Monroeville",
        "name": "Monroe County Arpt",
        "country": "United States"
    },
    {
        "key": "MVD",
        "city": "Montevideo",
        "name": "Carrasco Arpt",
        "country": "Uruguay"
    },
    {
        "key": "MVF",
        "city": "Mossoro",
        "name": "Dixsept Rosado Arpt",
        "country": "Brazil"
    },
    {
        "key": "MVL",
        "city": "Morristown",
        "name": "Morrisvilleâ€“Stowe State Airport",
        "country": "United States"
    },
    {
        "key": "MVM",
        "city": "Kayenta",
        "name": "Kayenta Airport (FAA: 0V7)",
        "country": "United States"
    },
    {
        "key": "MVN",
        "city": "Mt Vernon",
        "name": "Mt Vernon Outland Arpt",
        "country": "United States"
    },
    {
        "key": "MVP",
        "city": "Mitu",
        "name": "Mitu Arpt",
        "country": "Colombia"
    },
    {
        "key": "MVQ",
        "city": "Mogilev",
        "name": "Mogilev Arpt",
        "country": "Belarus"
    },
    {
        "key": "MVR",
        "city": "Maroua",
        "name": "Salam Arpt",
        "country": "Cameroon"
    },
    {
        "key": "MVS",
        "city": "Mucuri, Bahia, Brazil",
        "name": "Mucuri Airport",
        "country": "Brazil"
    },
    {
        "key": "MVT",
        "city": "Mataiva, Tuamotus, French Polynesia",
        "name": "Mataiva Airport",
        "country": "French Polynesia"
    },
    {
        "key": "MVV",
        "city": "Megeve",
        "name": "Megeve Arpt",
        "country": "France"
    },
    {
        "key": "MVY",
        "city": "Martha S Vineyard",
        "name": "Dukes County",
        "country": "United States"
    },
    {
        "key": "MVZ",
        "city": "Masvingo",
        "name": "Ft Victoria Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "MWA",
        "city": "Marion",
        "name": "Williamson County",
        "country": "United States"
    },
    {
        "key": "MWB",
        "city": "Morawa",
        "name": "Morawa Airport",
        "country": "Australia"
    },
    {
        "key": "MWC",
        "city": "Milwaukee",
        "name": "Lawrence J Timmerman Arpt",
        "country": "United States"
    },
    {
        "key": "MWE",
        "city": "Merowe, Sudan",
        "name": "Merowe Airport",
        "country": "Sudan"
    },
    {
        "key": "MWH",
        "city": "Moses Lake",
        "name": "Grant County",
        "country": "United States"
    },
    {
        "key": "MWJ",
        "city": "Matthews Ridge",
        "name": "Matthews Ridge Airport",
        "country": "Guyana"
    },
    {
        "key": "MWK",
        "city": "Matak, Indonesia",
        "name": "Matak Airport (Tarempa Airport)",
        "country": "Indonesia"
    },
    {
        "key": "MWL",
        "city": "MINERAL WELLS",
        "name": "Mineral Wells Arpt",
        "country": "United States"
    },
    {
        "key": "MWO",
        "city": "Middletown",
        "name": "Hook Field",
        "country": "United States"
    },
    {
        "key": "MWQ",
        "city": "Magwe",
        "name": "Magwe",
        "country": "Myanmar"
    },
    {
        "key": "MWV",
        "city": "Krong Saen Monourom",
        "name": "Mondulkiri Airport",
        "country": "Cambodia"
    },
    {
        "key": "MWX",
        "city": "Muan",
        "name": "Muan International",
        "country": "South Korea"
    },
    {
        "key": "MWZ",
        "city": "Mwanza",
        "name": "Mwanza Arpt",
        "country": "Tanzania"
    },
    {
        "key": "MXA",
        "city": "Manila",
        "name": "Manila Municipal",
        "country": "United States"
    },
    {
        "key": "MXE",
        "city": "Maxton",
        "name": "Laurinburg Maxton Airport",
        "country": "United States"
    },
    {
        "key": "MXF",
        "city": "Montgomery",
        "name": "Maxwell Airforce Base",
        "country": "United States"
    },
    {
        "key": "MXG",
        "city": "Marlborough",
        "name": "Marlboro Airport (FAA: 9B1)",
        "country": "United States"
    },
    {
        "key": "MXJ",
        "city": "Minna",
        "name": "Minna",
        "country": "Nigeria"
    },
    {
        "key": "MXK",
        "city": "Mindik, Papua New Guinea",
        "name": "Mindik Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "MXL",
        "city": "Mexicali",
        "name": "Rodolfg Sachez Taboada",
        "country": "Mexico"
    },
    {
        "key": "MXN",
        "city": "Morlaix",
        "name": "Morlaix Arpt",
        "country": "France"
    },
    {
        "key": "MXP",
        "city": "Milan",
        "name": "Malpensa Arpt",
        "country": "Italy"
    },
    {
        "key": "MXS",
        "city": "Maota",
        "name": "Maota Arpt",
        "country": "Samoa"
    },
    {
        "key": "MXT",
        "city": "Maintirano",
        "name": "Maintirano Airport",
        "country": "Madagascar"
    },
    {
        "key": "MXV",
        "city": "Murun",
        "name": "Moron Airport",
        "country": "Mongolia"
    },
    {
        "key": "MXW",
        "city": "Mandalgovi",
        "name": "Mandalgovi Airport",
        "country": "Mongolia"
    },
    {
        "key": "MXX",
        "city": "Mora",
        "name": "Mora Arpt",
        "country": "Sweden"
    },
    {
        "key": "MXY",
        "city": "Mccarthy",
        "name": "McCarthy Arpt",
        "country": "United States"
    },
    {
        "key": "MXZ",
        "city": "Meixian",
        "name": "Meixian Arpt",
        "country": "China"
    },
    {
        "key": "MYA",
        "city": "Moruya",
        "name": "Moruya Arpt",
        "country": "Australia"
    },
    {
        "key": "MYC",
        "city": "Maracay",
        "name": "Maracay Arpt",
        "country": "Venezuela"
    },
    {
        "key": "MYD",
        "city": "Malindi",
        "name": "Malindi Arpt",
        "country": "Kenya"
    },
    {
        "key": "MYE",
        "city": "Miyakejima",
        "name": "Miyake Jima Airport",
        "country": "Japan"
    },
    {
        "key": "MYF",
        "city": "San Diego",
        "name": "Montgomery Field",
        "country": "United States"
    },
    {
        "key": "MYH",
        "city": "Marble Canyon",
        "name": "Marble Canyon Arpt",
        "country": "United States"
    },
    {
        "key": "MYI",
        "city": "Murray Island",
        "name": "Murray Island Airport",
        "country": "Australia"
    },
    {
        "key": "MYJ",
        "city": "Matsuyama",
        "name": "Matsuyama Airport",
        "country": "Japan"
    },
    {
        "key": "MYK",
        "city": "May Creek",
        "name": "May Creek Arpt",
        "country": "United States"
    },
    {
        "key": "OSS",
        "city": "Osh",
        "name": "Osh International Airport",
        "country": "Kyrgyzstan"
    },
    {
        "key": "OST",
        "city": "Ostende",
        "name": "Ostend Airport",
        "country": "Belgium"
    },
    {
        "key": "OSU",
        "city": "Columbus",
        "name": "Ohio State Univ Arpt",
        "country": "United States"
    },
    {
        "key": "OSW",
        "city": "Orsk",
        "name": "ORSK ARPT",
        "country": "Russian Federation"
    },
    {
        "key": "OSX",
        "city": "Kosciusko",
        "name": "Kosciusko-Attala County Airport",
        "country": "United States"
    },
    {
        "key": "OSY",
        "city": "Namsos",
        "name": "Namsos Arpt",
        "country": "Norway"
    },
    {
        "key": "OTD",
        "city": "San Miguel",
        "name": "Contadora Airport",
        "country": "Panama"
    },
    {
        "key": "OTG",
        "city": "Worthington",
        "name": "Worthington Arpt",
        "country": "United States"
    },
    {
        "key": "OTH",
        "city": "North Bend",
        "name": "North Bend Municipal",
        "country": "United States"
    },
    {
        "key": "OTI",
        "city": "Morotai Island, Indonesia",
        "name": "Pitu Airport",
        "country": "Indonesia"
    },
    {
        "key": "OTM",
        "city": "Ottumwa",
        "name": "Industrial Arpt",
        "country": "United States"
    },
    {
        "key": "OTP",
        "city": "Bucharest",
        "name": "Henri Coanda Arpt",
        "country": "Romania"
    },
    {
        "key": "OTS",
        "city": "Ancortes",
        "name": "Ancortes Arpt",
        "country": "United States"
    },
    {
        "key": "OTU",
        "city": "Otu Co",
        "name": "Otu Arpt",
        "country": "Colombia"
    },
    {
        "key": "OTY",
        "city": "Oria",
        "name": "Oria Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "OTZ",
        "city": "Kotzebue",
        "name": "Ralph Wien Memorial",
        "country": "United States"
    },
    {
        "key": "OUA",
        "city": "Ouagadougou",
        "name": "Ouagadougou Arpt",
        "country": "Burkina Faso"
    },
    {
        "key": "OUD",
        "city": "Oujda",
        "name": "Les Angades Arpt",
        "country": "Morocco"
    },
    {
        "key": "OUG",
        "city": "Ouahigouya",
        "name": "Ouahigouya Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "OUH",
        "city": "Oudtshoorn",
        "name": "Oudtshoorn Arpt",
        "country": "South Africa"
    },
    {
        "key": "OUK",
        "city": "Outer Skerries",
        "name": "Outer Skerries Airport",
        "country": "United Kingdom"
    },
    {
        "key": "OUL",
        "city": "Oulu",
        "name": "Oulu Airport",
        "country": "Finland"
    },
    {
        "key": "OUM",
        "city": "Oum Hadjer",
        "name": "Oum Hadjer",
        "country": "Chad"
    },
    {
        "key": "OUS",
        "city": "Ourinhos, Sao Paulo, Brazil",
        "name": "Jornalista Benedito Pimentel Ourinhos Airport",
        "country": "Brazil"
    },
    {
        "key": "OUZ",
        "city": "Zouerate",
        "name": "Zouerate Arpt",
        "country": "Mauritania"
    },
    {
        "key": "OVA",
        "city": "Bekily",
        "name": "Bekily Airport",
        "country": "Madagascar"
    },
    {
        "key": "OVB",
        "city": "Novosibirsk",
        "name": "Tolmachevo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "OVD",
        "city": "Asturias",
        "name": "Asturias Airport",
        "country": "Spain"
    },
    {
        "key": "OVE",
        "city": "OROVILLE",
        "name": "OROVILLE ARPT",
        "country": "United States"
    },
    {
        "key": "OVS",
        "city": "Sovetsky",
        "name": "Sovetsky Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "OWA",
        "city": "Owatonna",
        "name": "Owatonna Arpt",
        "country": "United States"
    },
    {
        "key": "OWB",
        "city": "Owensboro",
        "name": "Daviess County Arpt",
        "country": "United States"
    },
    {
        "key": "OWD",
        "city": "Norwood",
        "name": "Norwood Ma Arpt",
        "country": "United States"
    },
    {
        "key": "OWK",
        "city": "Norridgewock",
        "name": "Central Maine Airport of Norridgewock",
        "country": "United States"
    },
    {
        "key": "OXB",
        "city": "Bissau",
        "name": "Airport Osvaldo Viera",
        "country": "Guinea-Bissau"
    },
    {
        "key": "OXC",
        "city": "Oxford",
        "name": "Waterbury Oxford Airport",
        "country": "United States"
    },
    {
        "key": "OXD",
        "city": "Oxford",
        "name": "Miami University Airport",
        "country": "United States"
    },
    {
        "key": "OXF",
        "city": "Oxford",
        "name": "Kidlington Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "OXR",
        "city": "Oxnard",
        "name": "Oxnard Ventura Arpt",
        "country": "United States"
    },
    {
        "key": "OYA",
        "city": "Goya",
        "name": "Goya Airport",
        "country": "Argentina"
    },
    {
        "key": "OYG",
        "city": "Moyo Town",
        "name": "Moyo Airport",
        "country": "Uganda"
    },
    {
        "key": "OYO",
        "city": "Tres Arroyos",
        "name": "Tres Arroyos Arpt",
        "country": "Argentina"
    },
    {
        "key": "OZC",
        "city": "Ozamis City",
        "name": "Labo Airport",
        "country": "Philippines"
    },
    {
        "key": "OZG",
        "city": "Zagora",
        "name": "Zagora Airport",
        "country": "Morocco"
    },
    {
        "key": "OZH",
        "city": "Zaporozhe",
        "name": "Zaporozhye Arpt",
        "country": "Ukraine"
    },
    {
        "key": "OZR",
        "city": "OZARK",
        "name": "Cairns AAF",
        "country": "United States"
    },
    {
        "key": "OZZ",
        "city": "Ourzazate",
        "name": "Ourzazate",
        "country": "Morocco"
    },
    {
        "key": "PAA",
        "city": "HpaAn",
        "name": "HpaAn Airport",
        "country": "Myanmar"
    },
    {
        "key": "PAB",
        "city": "Bilaspur",
        "name": "Bilaspur Airport",
        "country": "India"
    },
    {
        "key": "PAC",
        "city": "Panama City",
        "name": "Paitilla Arpt",
        "country": "Panama"
    },
    {
        "key": "PAD",
        "city": "Paderborn",
        "name": "Paderborn Airport",
        "country": "Germany"
    },
    {
        "key": "PAE",
        "city": "Everett",
        "name": "Snohomish Cty Arpt",
        "country": "United States"
    },
    {
        "key": "PAF",
        "city": "Pakuba",
        "name": "Pakuba Airfield",
        "country": "Uganda"
    },
    {
        "key": "PAG",
        "city": "Pagadian City",
        "name": "Pagadian Airport",
        "country": "Philippines"
    },
    {
        "key": "PAH",
        "city": "Paducah",
        "name": "Barkley Regional",
        "country": "United States"
    },
    {
        "key": "PAJ",
        "city": "Parachinar",
        "name": "Parachinar Airport",
        "country": "Pakistan"
    },
    {
        "key": "PAK",
        "city": "Eleele",
        "name": "Port Allen Airport",
        "country": "United States"
    },
    {
        "key": "PAL",
        "city": "Palanquero",
        "name": "Captain GermÃ¡n Olano Moreno Air Base",
        "country": "Colombia"
    },
    {
        "key": "PAM",
        "city": "Panama City",
        "name": "Tyndall Air Force Base",
        "country": "United States"
    },
    {
        "key": "PAN",
        "city": "Pattani",
        "name": "Pattani",
        "country": "Thailand"
    },
    {
        "key": "PAO",
        "city": "Palo Alto",
        "name": "Palo Alto Arpt",
        "country": "United States"
    },
    {
        "key": "PAP",
        "city": "Port Au Prince",
        "name": "Mais Gate Arpt",
        "country": "Haiti"
    },
    {
        "key": "PAQ",
        "city": "Palmer",
        "name": "Palmer Municipal",
        "country": "United States"
    },
    {
        "key": "PAS",
        "city": "Paros",
        "name": "Paros Community Arpt",
        "country": "Greece"
    },
    {
        "key": "PAT",
        "city": "Patna",
        "name": "Jai Prakash Narayan Arpt",
        "country": "India"
    },
    {
        "key": "PAU",
        "city": "Pauk",
        "name": "Pauk Airport",
        "country": "Myanmar"
    },
    {
        "key": "PAX",
        "city": "Port-de-Paix",
        "name": "Port-de-Paix Airport",
        "country": "Haiti"
    },
    {
        "key": "PAZ",
        "city": "Poza Rica",
        "name": "Tajin Arpt",
        "country": "Mexico"
    },
    {
        "key": "PBA",
        "city": "Barrow",
        "name": "Point Barrow Arpt",
        "country": "United States"
    },
    {
        "key": "PBC",
        "city": "Puebla",
        "name": "Huejostingo Arpt",
        "country": "Mexico"
    },
    {
        "key": "PBD",
        "city": "Porbandar",
        "name": "Porbandar Arpt",
        "country": "India"
    },
    {
        "key": "PBE",
        "city": "Puerto Berrio",
        "name": "Puerto Berrio Arpt",
        "country": "Colombia"
    },
    {
        "key": "BBB",
        "city": "Benson",
        "name": "Benson Municipal Airport",
        "country": "United States"
    },
    {
        "key": "BBC",
        "city": "Bay City",
        "name": "Bay City Municipal Airport",
        "country": "United States"
    },
    {
        "key": "BBD",
        "city": "Santa Clara",
        "name": "Curtis Field",
        "country": "United States"
    },
    {
        "key": "BBH",
        "city": "Barth",
        "name": "Barth Arpt",
        "country": "Germany"
    },
    {
        "key": "BBI",
        "city": "Bhubaneswar",
        "name": "Biju Patnaik Arpt",
        "country": "India"
    },
    {
        "key": "BBJ",
        "city": "Bitburg",
        "name": "Bitburg Air Base",
        "country": "Germany"
    },
    {
        "key": "BBK",
        "city": "Kasane",
        "name": "Kasane Arpt",
        "country": "Botswana"
    },
    {
        "key": "BBM",
        "city": "Batdambang",
        "name": "Battambang",
        "country": "Cambodia"
    },
    {
        "key": "BBN",
        "city": "Bario",
        "name": "Bario Arpt",
        "country": "Malaysia"
    },
    {
        "key": "BBO",
        "city": "Berbera",
        "name": "Berbera Arpt",
        "country": "Somalia"
    },
    {
        "key": "BBP",
        "city": "Bembridge, England, United Kingdom",
        "name": "Bembridge Airport",
        "country": "United Kingdom"
    },
    {
        "key": "BBQ",
        "city": "Codrington",
        "name": "Barbuda",
        "country": "Antigua and Barbuda"
    },
    {
        "key": "BBR",
        "city": "Basse Terre",
        "name": "Baillif Arpt",
        "country": "Guadeloupe"
    },
    {
        "key": "BBS",
        "city": "Blackbushe",
        "name": "Blackbushe",
        "country": "England"
    },
    {
        "key": "BBT",
        "city": "Berberati",
        "name": "Berberati Airport",
        "country": "Central African Republic"
    },
    {
        "key": "BBU",
        "city": "Bucharest",
        "name": "Baneasa Airport",
        "country": "Romania"
    },
    {
        "key": "BBV",
        "city": "Bereby",
        "name": "Nero Mer Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "BBW",
        "city": "Broken Bow",
        "name": "Broken Bow Municipal",
        "country": "United States"
    },
    {
        "key": "BBX",
        "city": "Philadelphia",
        "name": "Wings Field",
        "country": "United States"
    },
    {
        "key": "BBY",
        "city": "Bambari, Central African Republic",
        "name": "Bambari Airport",
        "country": "Central African Republic"
    },
    {
        "key": "BBZ",
        "city": "Zambezi",
        "name": "Zambezi Airport",
        "country": "Zambia"
    },
    {
        "key": "BCA",
        "city": "Baracoa",
        "name": "Gustavo Rizo Airport",
        "country": "Cuba"
    },
    {
        "key": "BCB",
        "city": "Blacksburg",
        "name": "Virginia Tech Arpt",
        "country": "United States"
    },
    {
        "key": "BCC",
        "city": "Bear Creek",
        "name": "Bear Creek 3 Airport",
        "country": "United States"
    },
    {
        "key": "BCD",
        "city": "Bacolod",
        "name": "Bacolod Arpt",
        "country": "Philippines"
    },
    {
        "key": "BCE",
        "city": "Bryce",
        "name": "Bryce Arpt",
        "country": "United States"
    },
    {
        "key": "BCH",
        "city": "Baucau",
        "name": "English Madeira Arpt",
        "country": "Timor-Leste"
    },
    {
        "key": "BCI",
        "city": "Barcaldine",
        "name": "Barcaldine Arpt",
        "country": "Australia"
    },
    {
        "key": "BCM",
        "city": "Bacau",
        "name": "Bacau Arpt",
        "country": "Romania"
    },
    {
        "key": "BCN",
        "city": "Barcelona",
        "name": "Barcelona Arpt",
        "country": "Spain"
    },
    {
        "key": "BCO",
        "city": "Jinka",
        "name": "Baco Airport (Jinka Airport)",
        "country": "Ethiopia"
    },
    {
        "key": "BCP",
        "city": "Bambu",
        "name": "Bambu Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "BCQ",
        "city": "Brak, Libya",
        "name": "Brak Airport",
        "country": "Libya"
    },
    {
        "key": "BCT",
        "city": "Ft Lauderdale",
        "name": "Boca Raton Public",
        "country": "United States"
    },
    {
        "key": "BCU",
        "city": "Bauchi, Nigeria",
        "name": "Bauchi State Airport",
        "country": "Nigeria"
    },
    {
        "key": "BCW",
        "city": "Benguera Island",
        "name": "Benguera Island Airport",
        "country": "Mozambique"
    },
    {
        "key": "BCX",
        "city": "Beloretsk, Republic of Bashkortostan, Russia",
        "name": "Beloretsk Airport",
        "country": "Russia"
    },
    {
        "key": "BDA",
        "city": "Bermuda",
        "name": "Bermuda International",
        "country": "Bermuda"
    },
    {
        "key": "BDB",
        "city": "Bundaberg",
        "name": "Bundaberg Arpt",
        "country": "Australia"
    },
    {
        "key": "BDC",
        "city": "Barra do Corda",
        "name": "Barra do Corda Airport",
        "country": "Brazil"
    },
    {
        "key": "BDD",
        "city": "Badu Island",
        "name": "Badu Island Arpt",
        "country": "Australia"
    },
    {
        "key": "PBF",
        "city": "Pine Bluff",
        "name": "Pine Bluff Arpt",
        "country": "United States"
    },
    {
        "key": "BDG",
        "city": "Blanding",
        "name": "Blanding Municipal Airport",
        "country": "United States"
    },
    {
        "key": "PBG",
        "city": "Plattsburgh",
        "name": "Plattsburgh International Airport",
        "country": "United States"
    },
    {
        "key": "BDH",
        "city": "Bandar Lengeh",
        "name": "Bandar Lengeh Airport",
        "country": "Iran"
    },
    {
        "key": "PBH",
        "city": "Paro",
        "name": "Paro Arpt",
        "country": "Bhutan"
    },
    {
        "key": "PBI",
        "city": "West Palm Beach",
        "name": "Palm Beach Intl Arpt",
        "country": "United States"
    },
    {
        "key": "BDI",
        "city": "Bird Island",
        "name": "Bird Island Airport",
        "country": "Seychelles"
    },
    {
        "key": "PBJ",
        "city": "Paama",
        "name": "Paama Airport",
        "country": "Vanuatu"
    },
    {
        "key": "BDJ",
        "city": "Banjarmasin",
        "name": "Sjamsudin Noor Arpt",
        "country": "Indonesia"
    },
    {
        "key": "PBM",
        "city": "Paramaribo",
        "name": "Zanderij Intl Arpt",
        "country": "Suriname"
    },
    {
        "key": "BDK",
        "city": "Bondoukou",
        "name": "Soko Airport",
        "country": "Ivory Coast"
    },
    {
        "key": "PBO",
        "city": "Paraburdoo",
        "name": "Paraburdoo Arpt",
        "country": "Australia"
    },
    {
        "key": "PBP",
        "city": "Punta Islita, Costa Rica",
        "name": "Punta Islita Airport",
        "country": "Costa Rica"
    },
    {
        "key": "BDL",
        "city": "Hartford",
        "name": "Bradley Intl Arpt",
        "country": "United States"
    },
    {
        "key": "PBR",
        "city": "Puerto Barrios",
        "name": "Puerto Barrios Arpt",
        "country": "Guatemala"
    },
    {
        "key": "BDM",
        "city": "Bandirma, Turkey",
        "name": "Bandirma Airport",
        "country": "Turkey"
    },
    {
        "key": "PBU",
        "city": "Puta",
        "name": "Putao Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "BDN",
        "city": "Badin",
        "name": "Talhar Airport",
        "country": "Pakistan"
    },
    {
        "key": "BDO",
        "city": "Bandung",
        "name": "Husein Sastranegara Arpt",
        "country": "Indonesia"
    },
    {
        "key": "PBW",
        "city": "Palibelo",
        "name": "Palibelo",
        "country": "Indonesia"
    },
    {
        "key": "BDP",
        "city": "Bhadrapur",
        "name": "Bhadrapur Airport",
        "country": "India"
    },
    {
        "key": "PBZ",
        "city": "Plettenberg Bay",
        "name": "Plettenberg Bay Arpt",
        "country": "South Africa"
    },
    {
        "key": "BDQ",
        "city": "Vadodara",
        "name": "Vadodara Arpt",
        "country": "India"
    },
    {
        "key": "PCC",
        "city": "Carolina",
        "name": "Puerto Rico Airport",
        "country": "Puerto Rico"
    },
    {
        "key": "BDR",
        "city": "Bridgeport",
        "name": "Sikorsky Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "PCD",
        "city": "Prairie Du Chien",
        "name": "Prairie Du Chien Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "BDS",
        "city": "Brindisi",
        "name": "Papola Casale Arpt",
        "country": "Italy"
    },
    {
        "key": "PCH",
        "city": "Palacios",
        "name": "Palacios Airport",
        "country": "United States"
    },
    {
        "key": "BDT",
        "city": "Gbadolite",
        "name": "Gbadolite Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "PCJ",
        "city": "Puerto La Victoria",
        "name": "Puerto La Victoria Arpt",
        "country": "Paraguay"
    },
    {
        "key": "RHI",
        "city": "Rhinelander",
        "name": "Oneida County",
        "country": "United States"
    },
    {
        "key": "RHN",
        "city": "Rosh Pina",
        "name": "Rosh Pina Airport",
        "country": "Namibia"
    },
    {
        "key": "RHO",
        "city": "Rhodes",
        "name": "Diagoras Arpt",
        "country": "Greece"
    },
    {
        "key": "RHP",
        "city": "Ramechhap",
        "name": "Ramechhap",
        "country": "Nepal"
    },
    {
        "key": "RHV",
        "city": "San Jose",
        "name": "Reid Hillview Of Santa Clara County",
        "country": "United States"
    },
    {
        "key": "RIA",
        "city": "Santa Maria",
        "name": "Base Aerea Arpt",
        "country": "Brazil"
    },
    {
        "key": "RIC",
        "city": "Richmond",
        "name": "Richmond Intl Arpt",
        "country": "United States"
    },
    {
        "key": "RID",
        "city": "Richmond",
        "name": "Richmond Municipal Airport",
        "country": "United States"
    },
    {
        "key": "RIE",
        "city": "Cameron",
        "name": "Rice Lake Regional Airport (Carls Field) (FAA: RPD)",
        "country": "United States"
    },
    {
        "key": "RIF",
        "city": "Richfield",
        "name": "Reynolds Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "RIG",
        "city": "Rio Grande",
        "name": "Rio Grande Airport",
        "country": "Brazil"
    },
    {
        "key": "RIL",
        "city": "Rifle",
        "name": "Garfield Cty Arpt",
        "country": "United States"
    },
    {
        "key": "RIS",
        "city": "Rishirifuji",
        "name": "Rishiri Airport",
        "country": "Japan"
    },
    {
        "key": "RIV",
        "city": "Riverside",
        "name": "March Air Reserve Base",
        "country": "United States"
    },
    {
        "key": "RIW",
        "city": "Riverton",
        "name": "Riverton Municipal",
        "country": "United States"
    },
    {
        "key": "RIX",
        "city": "Riga",
        "name": "Riga Arpt",
        "country": "Latvia"
    },
    {
        "key": "RIY",
        "city": "Riyan",
        "name": "Riyan Mukalla Arpt",
        "country": "Yemen"
    },
    {
        "key": "RIZ",
        "city": "Rizhao",
        "name": "Shanzihe",
        "country": "China"
    },
    {
        "key": "RJA",
        "city": "Rajahmundry",
        "name": "Rajahmundry Arpt",
        "country": "India"
    },
    {
        "key": "RJB",
        "city": "Rajbiraj",
        "name": "Rajbiraj",
        "country": "Nepal"
    },
    {
        "key": "RJH",
        "city": "Rajshahi",
        "name": "Rajshahi",
        "country": "Bangladesh"
    },
    {
        "key": "RJI",
        "city": "Rajouri",
        "name": "Rajouri Airport",
        "country": "India"
    },
    {
        "key": "RJK",
        "city": "Rijeka",
        "name": "Rijeka Arpt",
        "country": "Croatia"
    },
    {
        "key": "RJL",
        "city": "Logrono",
        "name": "Agoncillo Arpt",
        "country": "Spain"
    },
    {
        "key": "RJN",
        "city": "Rafsanjan",
        "name": "Rafsanjan Airport",
        "country": "Iran"
    },
    {
        "key": "RKA",
        "city": "Aratika, Tuamotus, French Polynesia",
        "name": "Aratika-Nord Airport",
        "country": "French Polynesia"
    },
    {
        "key": "RKD",
        "city": "Rockland",
        "name": "Rockland Arpt",
        "country": "United States"
    },
    {
        "key": "RKE",
        "city": "Roskilde",
        "name": "Roskilde Arpt",
        "country": "Denmark"
    },
    {
        "key": "RKH",
        "city": "Rock Hill",
        "name": "Rock Hill York County Arpt",
        "country": "United States"
    },
    {
        "key": "RKI",
        "city": "Sipura, Indonesia",
        "name": "Rokot Airport",
        "country": "Indonesia"
    },
    {
        "key": "RKP",
        "city": "Rockport",
        "name": "Aransas County Arpt",
        "country": "United States"
    },
    {
        "key": "RKR",
        "city": "Poteau",
        "name": "Robert S. Kerr Airport",
        "country": "United States"
    },
    {
        "key": "RKS",
        "city": "Rock Springs",
        "name": "Rock Springs Municipal",
        "country": "United States"
    },
    {
        "key": "RKT",
        "city": "Ras Al Khaimah",
        "name": "Ras Al Khaimah Arpt",
        "country": "United Arab Emirates"
    },
    {
        "key": "RKV",
        "city": "Reykjavik",
        "name": "Reykjavik Domestic Arpt",
        "country": "Iceland"
    },
    {
        "key": "RKW",
        "city": "Rockwood",
        "name": "Rockwood Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "RKZ",
        "city": "Xigaze",
        "name": "Shigatse Peace Airport",
        "country": "China"
    },
    {
        "key": "RLA",
        "city": "Rolla",
        "name": "National Arpt",
        "country": "United States"
    },
    {
        "key": "RLD",
        "city": "Richland",
        "name": "Richland Arpt",
        "country": "United States"
    },
    {
        "key": "RLG",
        "city": "Rostock Laage",
        "name": "Laage Arpt",
        "country": "Germany"
    },
    {
        "key": "RLI",
        "city": "Anniston",
        "name": "Reilly Ahp",
        "country": "United States"
    },
    {
        "key": "RLK",
        "city": "Bayan Nur",
        "name": "Bayannur Tianjitai Airport",
        "country": "China"
    },
    {
        "key": "RLU",
        "city": "Bornite",
        "name": "Bornite Upper Arpt",
        "country": "United States"
    },
    {
        "key": "RMA",
        "city": "Roma",
        "name": "Roma Arpt",
        "country": "Australia"
    },
    {
        "key": "RMD",
        "city": "Ramagundam",
        "name": "Ramagundam Airport",
        "country": "India"
    },
    {
        "key": "RME",
        "city": "Rome",
        "name": "Griffiss International Airport",
        "country": "United States"
    },
    {
        "key": "RMF",
        "city": "Marsa Alam",
        "name": "Marsa Alam Arpt",
        "country": "Egypt"
    },
    {
        "key": "RMG",
        "city": "Rome",
        "name": "Richard B Russell Arpt",
        "country": "United States"
    },
    {
        "key": "RMI",
        "city": "Rimini",
        "name": "Miramare Airport",
        "country": "Italy"
    },
    {
        "key": "RMK",
        "city": "Renmark",
        "name": "Renmark Airport",
        "country": "Australia"
    },
    {
        "key": "RML",
        "city": "Colombo",
        "name": "Ratmalana Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "RMN",
        "city": "Rumginae",
        "name": "Rumginae Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "RMP",
        "city": "Rampart",
        "name": "Rampart Airport",
        "country": "United States"
    },
    {
        "key": "RMQ",
        "city": "Taichung",
        "name": "Ching Chuan Kang",
        "country": "Taiwan"
    },
    {
        "key": "RMS",
        "city": "Ramstein",
        "name": "Ramsteim Arpt",
        "country": "Germany"
    },
    {
        "key": "RMT",
        "city": "Rimatara",
        "name": "Rimatara Airport",
        "country": "French Polynesia"
    },
    {
        "key": "RMY",
        "city": "Mariposa",
        "name": "Mariposa Yosemite Arpt",
        "country": "United States"
    },
    {
        "key": "RNB",
        "city": "Ronneby",
        "name": "Kallinge Arpt",
        "country": "Sweden"
    },
    {
        "key": "RNC",
        "city": "McMinnville",
        "name": "Warren County Memorial Airport",
        "country": "United States"
    },
    {
        "key": "RND",
        "city": "San Antonio",
        "name": "Randolph Airfoce Base",
        "country": "United States"
    },
    {
        "key": "RNE",
        "city": "Roanne",
        "name": "Renaison Arpt",
        "country": "France"
    },
    {
        "key": "RNG",
        "city": "Rangely",
        "name": "Rangely Airport (FAA: 4V0)",
        "country": "United States"
    },
    {
        "key": "BDU",
        "city": "Bardufoss",
        "name": "Bardufoss Arpt",
        "country": "Norway"
    },
    {
        "key": "RNH",
        "city": "New Richmond",
        "name": "New Richmond Municipal",
        "country": "United States"
    },
    {
        "key": "BDV",
        "city": "Moba",
        "name": "Moba Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "RNL",
        "city": "Rennell Island",
        "name": "Rennell/Tingoa Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "RNM",
        "city": "Qarn Alam",
        "name": "Qarn Alam Airport",
        "country": "Oman"
    },
    {
        "key": "BDW",
        "city": "Ord River",
        "name": "Bedford Downs Airport",
        "country": "Australia"
    },
    {
        "key": "BDX",
        "city": "Broadus",
        "name": "Broadus Airport",
        "country": "United States"
    },
    {
        "key": "BDY",
        "city": "Bandon",
        "name": "Bandon State AirportS05)",
        "country": "United States"
    },
    {
        "key": "BEB",
        "city": "Benbecula",
        "name": "Benbecula Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "BEC",
        "city": "Wichita",
        "name": "Beech Arprt",
        "country": "United States"
    },
    {
        "key": "IBT",
        "city": "Bologona",
        "name": "Bologona Central Rail Station",
        "country": "Italy"
    },
    {
        "key": "IBZ",
        "city": "Ibiza",
        "name": "Ibiza Airport",
        "country": "Spain"
    },
    {
        "key": "ICA",
        "city": "Icabaru",
        "name": "IcabarÃº Airport",
        "country": "Venezuela"
    },
    {
        "key": "ICI",
        "city": "Cicia Island, Fiji",
        "name": "Cicia Airport",
        "country": "Fiji"
    },
    {
        "key": "ICN",
        "city": "Seoul",
        "name": "Incheon Intl Arpt",
        "country": "Korea"
    },
    {
        "key": "ICT",
        "city": "Wichita",
        "name": "Mid Continent Arpt",
        "country": "United States"
    },
    {
        "key": "ICY",
        "city": "Icy Bay",
        "name": "Icy Bay Arpt",
        "country": "United States"
    },
    {
        "key": "IDA",
        "city": "Idaho Falls",
        "name": "Fanning Field",
        "country": "United States"
    },
    {
        "key": "IDB",
        "city": "Idre",
        "name": "Idre Airport",
        "country": "Sweden"
    },
    {
        "key": "IDF",
        "city": "Idiofa",
        "name": "Idiofa Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "IDG",
        "city": "Ida Grove",
        "name": "Ida Grove",
        "country": "United States"
    },
    {
        "key": "IDI",
        "city": "Indiana",
        "name": "Indiana County Arpt",
        "country": "United States"
    },
    {
        "key": "IDN",
        "city": "Indagen",
        "name": "Indagen Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "IDO",
        "city": "Santa Isabel do Morro, Tocantins, Brazil",
        "name": "Santa Isabel do Morro Airport",
        "country": "Brazil"
    },
    {
        "key": "IDR",
        "city": "Indore",
        "name": "Devi Ahilya Bai Holkar Arpt",
        "country": "India"
    },
    {
        "key": "IEG",
        "city": "Zielona",
        "name": "Babimost Arpt",
        "country": "Poland"
    },
    {
        "key": "IES",
        "city": "Riesa",
        "name": "Goehlis Arpt",
        "country": "Germany"
    },
    {
        "key": "IEV",
        "city": "Kiev",
        "name": "Kiev Zhuliany Arpt",
        "country": "Ukraine"
    },
    {
        "key": "IFH",
        "city": "Shahin Shahr",
        "name": "Hesa Air Base",
        "country": "Iran"
    },
    {
        "key": "IFJ",
        "city": "Isafjordur",
        "name": "Isafjordur Arpt",
        "country": "Iceland"
    },
    {
        "key": "IFN",
        "city": "Isfahan",
        "name": "Isfahan Arpt",
        "country": "Iran"
    },
    {
        "key": "IFO",
        "city": "Ivano Frankovsk",
        "name": "Ivano Frankovsk Arpt",
        "country": "Ukraine"
    },
    {
        "key": "IFP",
        "city": "Bullhead City",
        "name": "Laughlin Bullhead Intl Arpt",
        "country": "United States"
    },
    {
        "key": "IGD",
        "city": "Igdir, Turkey",
        "name": "Igdir Airport",
        "country": "Turkey"
    },
    {
        "key": "IGG",
        "city": "Igiugig",
        "name": "Igiugig Airport",
        "country": "United States"
    },
    {
        "key": "IGH",
        "city": "Ingham",
        "name": "Ingham Arpt",
        "country": "Australia"
    },
    {
        "key": "IGL",
        "city": "Izmir",
        "name": "Izmir Cigli Military",
        "country": "Turkey"
    },
    {
        "key": "IGM",
        "city": "Kingman",
        "name": "Mohave County",
        "country": "United States"
    },
    {
        "key": "IGN",
        "city": "Baloi",
        "name": "Maria Cristina Airport (Iligan Airport)",
        "country": "Philippines"
    },
    {
        "key": "IGO",
        "city": "Chigoro",
        "name": "Chigorodo Arpt",
        "country": "Colombia"
    },
    {
        "key": "IGR",
        "city": "Iguazu",
        "name": "Iguazu Intl",
        "country": "Argentina"
    },
    {
        "key": "IGS",
        "city": "Ingolstadt",
        "name": "Ingolstadt Manching Airport",
        "country": "Germany"
    },
    {
        "key": "IGU",
        "city": "Iguassu Falls",
        "name": "Cataratas Arpt",
        "country": "Brazil"
    },
    {
        "key": "IHC",
        "city": "Inhaca",
        "name": "Inhaca Airport",
        "country": "Mozambique"
    },
    {
        "key": "IHR",
        "city": "Iran Shahr",
        "name": "Iran Shahr Airport",
        "country": "Iran"
    },
    {
        "key": "IJK",
        "city": "Izhevsk",
        "name": "Izhevsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "IJX",
        "city": "Jacksonville",
        "name": "Jacksonville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "IKA",
        "city": "Tehran",
        "name": "Imam Khomeini Intl",
        "country": "Iran"
    },
    {
        "key": "IKK",
        "city": "Kankakee",
        "name": "Greater Kankakee Arpt",
        "country": "United States"
    },
    {
        "key": "IKL",
        "city": "Ikela",
        "name": "Ikela Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "IKO",
        "city": "Nikolski",
        "name": "Nikolski Afs",
        "country": "United States"
    },
    {
        "key": "IKT",
        "city": "Irkutsk",
        "name": "Irkutsk Airport",
        "country": "Russian Federation"
    },
    {
        "key": "ILD",
        "city": "Lleida",
        "name": "Alguaire",
        "country": "Spain"
    },
    {
        "key": "ILE",
        "city": "Killeen",
        "name": "Killeen Municipal",
        "country": "United States"
    },
    {
        "key": "ILF",
        "city": "Ilford",
        "name": "Ilford Rail Station",
        "country": "Canada"
    },
    {
        "key": "ILG",
        "city": "Wilmington",
        "name": "Greater Wilmington New Castle",
        "country": "United States"
    },
    {
        "key": "ILH",
        "city": "Illesheim",
        "name": "Illesheim Army Airfield",
        "country": "Germany"
    },
    {
        "key": "ILK",
        "city": "Ilaka",
        "name": "IlakaEst Airport (Atsinanana Airport)",
        "country": "Madagascar"
    },
    {
        "key": "ILM",
        "city": "Wilmington",
        "name": "New Hanover Cty Arpt",
        "country": "United States"
    },
    {
        "key": "ILN",
        "city": "Wilmington",
        "name": "Wilmington Air Park",
        "country": "United States"
    },
    {
        "key": "ILO",
        "city": "Iloilo",
        "name": "Mandurriao Arpt",
        "country": "Philippines"
    },
    {
        "key": "PCL",
        "city": "Pucallpa",
        "name": "Capitan Rolden Arpt",
        "country": "Peru"
    },
    {
        "key": "ILP",
        "city": "Ile Des Pins",
        "name": "Ile Des Pins Arpt",
        "country": "New Caledonia"
    },
    {
        "key": "PCM",
        "city": "Playa Del Carmen",
        "name": "Playa Del Carmen Arpt",
        "country": "Mexico"
    },
    {
        "key": "ILR",
        "city": "Ilorin",
        "name": "Ilorin International Airport",
        "country": "Nigeria"
    },
    {
        "key": "PCN",
        "city": "Picton",
        "name": "Koromiko",
        "country": "New Zealand"
    },
    {
        "key": "ILU",
        "city": "Kilaguni",
        "name": "Kilaguni Airport",
        "country": "Kenya"
    },
    {
        "key": "PCR",
        "city": "Puerto Carreno",
        "name": "Puerto Carreno Arpt",
        "country": "Colombia"
    },
    {
        "key": "ILY",
        "city": "Islay",
        "name": "Islay Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "PCT",
        "city": "Princeton",
        "name": "Princeton Arpt",
        "country": "United States"
    },
    {
        "key": "ILZ",
        "city": "Zilina",
        "name": "Zilina Arpt",
        "country": "Slovakia"
    },
    {
        "key": "PDA",
        "city": "Puerto Inirida",
        "name": "Puerto Inirida Arpt",
        "country": "Colombia"
    },
    {
        "key": "IMB",
        "city": "Imbaimadai",
        "name": "Imbaimadai Airport",
        "country": "Guyana"
    },
    {
        "key": "PDB",
        "city": "Pedro Bay",
        "name": "Pedro Bay Airport (FAA: 4K0)",
        "country": "United States"
    },
    {
        "key": "IMF",
        "city": "Imphal",
        "name": "Tulihal Arpt",
        "country": "India"
    },
    {
        "key": "PDE",
        "city": "Innamincka",
        "name": "Pandie Pandie Airport",
        "country": "Australia"
    },
    {
        "key": "IMI",
        "city": "Ine",
        "name": "Ine Airport",
        "country": "Marshall Islands"
    },
    {
        "key": "PDF",
        "city": "Prado",
        "name": "Prado",
        "country": "Brazil"
    },
    {
        "key": "IMK",
        "city": "Simikot",
        "name": "Simikot",
        "country": "Nepal"
    },
    {
        "key": "PDG",
        "city": "Padang",
        "name": "Tabing Arpt",
        "country": "Indonesia"
    },
    {
        "key": "IML",
        "city": "Imperial",
        "name": "Imperial Municipal Airport",
        "country": "United States"
    },
    {
        "key": "PDK",
        "city": "Atlanta",
        "name": "Dekalb Peachtree",
        "country": "United States"
    },
    {
        "key": "IMM",
        "city": "Immokalee",
        "name": "Immokalee Regional Airport",
        "country": "United States"
    },
    {
        "key": "GBZ",
        "city": "Great Barrier Island",
        "name": "Great Barrier Island Arpt",
        "country": "New Zealand"
    },
    {
        "key": "GCC",
        "city": "Gillette",
        "name": "Campbell Cty Arpt",
        "country": "United States"
    },
    {
        "key": "GCH",
        "city": "Gachsaran",
        "name": "Gachsaran Airport",
        "country": "Iran"
    },
    {
        "key": "GCI",
        "city": "Guernsey",
        "name": "Guernsey Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "GCJ",
        "city": "Johannesburg",
        "name": "Grand Central Arpt",
        "country": "South Africa"
    },
    {
        "key": "GCK",
        "city": "Garden City",
        "name": "Garden City Municipal",
        "country": "United States"
    },
    {
        "key": "GCM",
        "city": "Grand Cayman Island",
        "name": "Owen Roberts Arpt",
        "country": "Cayman Islands"
    },
    {
        "key": "GCN",
        "city": "Grand Canyon",
        "name": "Grand Canyon Natl Park Arpt",
        "country": "United States"
    },
    {
        "key": "GCV",
        "city": "Gravatai",
        "name": "Gravatai Arpt",
        "country": "Brazil"
    },
    {
        "key": "GCY",
        "city": "Greeneville",
        "name": "Municipal Greeneville Arpt",
        "country": "United States"
    },
    {
        "key": "GDA",
        "city": "Gounda",
        "name": "Gounda",
        "country": "Central African Republic"
    },
    {
        "key": "GDC",
        "city": "Greenville",
        "name": "Donaldson Center Arpt",
        "country": "United States"
    },
    {
        "key": "GDE",
        "city": "Gode",
        "name": "Gode Airport",
        "country": "Ethiopia"
    },
    {
        "key": "GDG",
        "city": "Magdagachi, Amur Oblast",
        "name": "Magdagachi Airport",
        "country": "Russia"
    },
    {
        "key": "GDL",
        "city": "Guadalajara",
        "name": "Miguel Hidalgo Arpt",
        "country": "Mexico"
    },
    {
        "key": "GDM",
        "city": "Gardner",
        "name": "Gardner Municipal Airport",
        "country": "United States"
    },
    {
        "key": "GDN",
        "city": "Gdansk",
        "name": "Rebiechowo",
        "country": "Poland"
    },
    {
        "key": "GDQ",
        "city": "Gondar, Ethiopia",
        "name": "Gondar Airport",
        "country": "Ethiopia"
    },
    {
        "key": "GDT",
        "city": "Grand Turk",
        "name": "Grand Turk Is Arpt",
        "country": "Turks and Caicos Islands"
    },
    {
        "key": "GDV",
        "city": "Glendive",
        "name": "Dawson Community Arpt",
        "country": "United States"
    },
    {
        "key": "GDX",
        "city": "Magadan",
        "name": "Magadan Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "GDZ",
        "city": "Gelendzhik",
        "name": "Gelendzik Airport",
        "country": "Russian Federation"
    },
    {
        "key": "GEA",
        "city": "Noumea",
        "name": "Magenta Arpt",
        "country": "New Caledonia"
    },
    {
        "key": "GED",
        "city": "Georgetown",
        "name": "Sussex County Arpt",
        "country": "United States"
    },
    {
        "key": "GEE",
        "city": "George Town",
        "name": "George Town Aerodrome",
        "country": "Australia"
    },
    {
        "key": "GEF",
        "city": "Liangai, Vella Lavella",
        "name": "Geva Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "GEG",
        "city": "Spokane",
        "name": "Spokane Intl Arpt",
        "country": "United States"
    },
    {
        "key": "GEI",
        "city": "Green Islands",
        "name": "Green Islands Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "GEK",
        "city": "Ganes Creek",
        "name": "Ganes Creek Arpt",
        "country": "United States"
    },
    {
        "key": "GEO",
        "city": "Georgetown",
        "name": "Cheddi Jagan Intl",
        "country": "Guyana"
    },
    {
        "key": "GER",
        "city": "Nueva Gerona",
        "name": "Rafael Cabrera Arpt",
        "country": "Cuba"
    },
    {
        "key": "GES",
        "city": "General Santos",
        "name": "General Santos Intl",
        "country": "Philippines"
    },
    {
        "key": "GET",
        "city": "Geraldton",
        "name": "Geraldton Arpt",
        "country": "Australia"
    },
    {
        "key": "GEV",
        "city": "Gallivare",
        "name": "Gallivare Arpt",
        "country": "Sweden"
    },
    {
        "key": "GEX",
        "city": "Geelong",
        "name": "Geelong Arpt",
        "country": "Australia"
    },
    {
        "key": "GEY",
        "city": "Greybull",
        "name": "South Big Horn County",
        "country": "United States"
    },
    {
        "key": "GFA",
        "city": "Great Falls",
        "name": "Malmstrom Airforce Base",
        "country": "United States"
    },
    {
        "key": "GFD",
        "city": "Pope Field",
        "name": "Pope Field",
        "country": "United States"
    },
    {
        "key": "GFE",
        "city": "Grenfell",
        "name": "Grenfell Airport[2]",
        "country": "Canada"
    },
    {
        "key": "GFF",
        "city": "Griffith",
        "name": "Griffith Arpt",
        "country": "Australia"
    },
    {
        "key": "GFK",
        "city": "Grand Forks",
        "name": "Grand Forks Mark Andrews Intl",
        "country": "United States"
    },
    {
        "key": "GFL",
        "city": "Glens Falls",
        "name": "Warren County",
        "country": "United States"
    },
    {
        "key": "GFN",
        "city": "Grafton",
        "name": "Grafton Arpt",
        "country": "Australia"
    },
    {
        "key": "GFR",
        "city": "Breville sur Mer",
        "name": "Granville Mont Saint Michel Aerodrome",
        "country": "France"
    },
    {
        "key": "GFY",
        "city": "Grootfontein",
        "name": "Grootfontein Air Base",
        "country": "Namibia"
    },
    {
        "key": "GGC",
        "city": "Lumbala",
        "name": "Lumbala Nguimbo Airport",
        "country": "Angola"
    },
    {
        "key": "GGE",
        "city": "Myrtle Beach",
        "name": "George Town Arpt",
        "country": "United States"
    },
    {
        "key": "GGG",
        "city": "Longview",
        "name": "Greg County Arpt",
        "country": "United States"
    },
    {
        "key": "GGL",
        "city": "Tel Aviv-Yafo",
        "name": "Gilgal Airport[2]",
        "country": "Israel"
    },
    {
        "key": "GGM",
        "city": "Kakamega",
        "name": "Kakamega Airport",
        "country": "Kenya"
    },
    {
        "key": "GGN",
        "city": "Gagnoa",
        "name": "Gagnoa",
        "country": "Ivory Coast"
    },
    {
        "key": "BED",
        "city": "Bedford",
        "name": "Bedford Arpt",
        "country": "United States"
    },
    {
        "key": "GGR",
        "city": "Garowe",
        "name": "Garowe Airport",
        "country": "Somalia"
    },
    {
        "key": "BEG",
        "city": "Belgrade",
        "name": "Belgrade Beograd Arpt",
        "country": "Serbia"
    },
    {
        "key": "GGS",
        "city": "RÃ­o Chico",
        "name": "Gobernador Gregores Airport",
        "country": "Argentina"
    },
    {
        "key": "BEH",
        "city": "Benton Harbor",
        "name": "Ross Field",
        "country": "United States"
    },
    {
        "key": "GGT",
        "city": "George Town",
        "name": "George Town Airport",
        "country": "Bahamas"
    },
    {
        "key": "BEJ",
        "city": "Tanjung Redeb, Indonesia",
        "name": "Kalimarau Airport",
        "country": "Indonesia"
    },
    {
        "key": "GGW",
        "city": "Glasgow",
        "name": "International Glasgow",
        "country": "United States"
    },
    {
        "key": "BEK",
        "city": "Bareilly",
        "name": "Bareilly airport",
        "country": "India"
    },
    {
        "key": "GHA",
        "city": "Ghardaia",
        "name": "Noumerate Arpt",
        "country": "Algeria"
    },
    {
        "key": "BEL",
        "city": "Belem",
        "name": "Val De Cans Arpt",
        "country": "Brazil"
    },
    {
        "key": "GHB",
        "city": "Governor S Harbour",
        "name": "Governors Harbour Municipal Arpt",
        "country": "Bahamas"
    },
    {
        "key": "BEN",
        "city": "Benghazi",
        "name": "Benina Intl Arpt",
        "country": "Libya"
    },
    {
        "key": "GHC",
        "city": "Great Harbour Cay, Berry Islands, Bahamas",
        "name": "Great Harbour Cay Airport",
        "country": "The Bahamas"
    },
    {
        "key": "BEO",
        "city": "Newcastle",
        "name": "Belmont Arpt",
        "country": "Australia"
    },
    {
        "key": "GHM",
        "city": "Centerville",
        "name": "Centerville Municipal Airport",
        "country": "United States"
    },
    {
        "key": "BEP",
        "city": "Bellary",
        "name": "Bellary Airport",
        "country": "India"
    },
    {
        "key": "GHT",
        "city": "Ghat",
        "name": "Ghat",
        "country": "Libya"
    },
    {
        "key": "BEQ",
        "city": "Bury St Edmunds",
        "name": "Honington Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "GHU",
        "city": "GualeguaychÃº",
        "name": "GualeguaychÃº Airport",
        "country": "Argentina"
    },
    {
        "key": "MYL",
        "city": "Mccall",
        "name": "Mccall Arpt",
        "country": "United States"
    },
    {
        "key": "MYO",
        "city": "Myroodah Station, Western Australia",
        "name": "Myroodah Airport",
        "country": "Australia"
    },
    {
        "key": "MYP",
        "city": "Mary",
        "name": "Mary Arpt",
        "country": "Turkmenistan"
    },
    {
        "key": "MYQ",
        "city": "Mysore",
        "name": "Mysore Arpt",
        "country": "India"
    },
    {
        "key": "MYR",
        "city": "Myrtle Beach",
        "name": "Myrtle Beach Jetway",
        "country": "United States"
    },
    {
        "key": "MYT",
        "city": "Myitkyina",
        "name": "Myitkyina Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "MYV",
        "city": "Marysville",
        "name": "Yuba County Arpt",
        "country": "United States"
    },
    {
        "key": "MYW",
        "city": "Mtwara",
        "name": "Mtwara Arpt",
        "country": "Tanzania"
    },
    {
        "key": "MYY",
        "city": "Miri",
        "name": "Miri Arpt",
        "country": "Malaysia"
    },
    {
        "key": "MZG",
        "city": "Makung",
        "name": "Makung Arpt",
        "country": "Taiwan"
    },
    {
        "key": "MZI",
        "city": "Mopti",
        "name": "Mopti Arpt",
        "country": "Mali"
    },
    {
        "key": "MZJ",
        "city": "Marana",
        "name": "Marana Arpt",
        "country": "United States"
    },
    {
        "key": "MZL",
        "city": "Manizales",
        "name": "La Nubia Arpt",
        "country": "Colombia"
    },
    {
        "key": "MZM",
        "city": "Metz",
        "name": "Frescaty Airport",
        "country": "France"
    },
    {
        "key": "MZO",
        "city": "Manzanillo",
        "name": "Sierra Maestra Arpt",
        "country": "Cuba"
    },
    {
        "key": "MZP",
        "city": "Motueka",
        "name": "Motueka Aerodrome",
        "country": "New Zealand"
    },
    {
        "key": "MZR",
        "city": "Mazar I Sharif",
        "name": "Mazar I Sharif Arpt",
        "country": "Afghanistan"
    },
    {
        "key": "MZS",
        "city": "Moradabad",
        "name": "Moradabad",
        "country": "India"
    },
    {
        "key": "MZT",
        "city": "Mazatlan",
        "name": "Buelina Arpt",
        "country": "Mexico"
    },
    {
        "key": "MZU",
        "city": "Muzzafarpu",
        "name": "Muzzafarpur Airport",
        "country": "India"
    },
    {
        "key": "MZV",
        "city": "Mulu",
        "name": "Mulu Arpt",
        "country": "Malaysia"
    },
    {
        "key": "MZW",
        "city": "Mecheria",
        "name": "MÃ©cheria Airport",
        "country": "Algeria"
    },
    {
        "key": "MZX",
        "city": "Mena",
        "name": "Mena Airport",
        "country": "United States"
    },
    {
        "key": "PDL",
        "city": "Ponta Delgada",
        "name": "Nordela Arpt",
        "country": "Portugal"
    },
    {
        "key": "PDP",
        "city": "Punta Del Este",
        "name": "Cap Curbelo Arpt",
        "country": "Uruguay"
    },
    {
        "key": "PDS",
        "city": "Piedras Negras",
        "name": "Piedras Negras Intl Arpt",
        "country": "Mexico"
    },
    {
        "key": "PDT",
        "city": "Pendleton",
        "name": "Pendleton Municipal",
        "country": "United States"
    },
    {
        "key": "PDU",
        "city": "Paysandu",
        "name": "Paysandu Arpt",
        "country": "Uruguay"
    },
    {
        "key": "PDV",
        "city": "Plovdiv",
        "name": "Plovdiv Arpt",
        "country": "Bulgaria"
    },
    {
        "key": "BES",
        "city": "Brest",
        "name": "Guipavas Arpt",
        "country": "France"
    },
    {
        "key": "GIB",
        "city": "Gibraltar",
        "name": "North Front Arpt",
        "country": "Gibraltar"
    },
    {
        "key": "PDX",
        "city": "Portland",
        "name": "Portland Intl Arpt",
        "country": "United States"
    },
    {
        "key": "CDP",
        "city": "Cuddapah",
        "name": "Cuddapah Airport",
        "country": "India"
    },
    {
        "key": "INE",
        "city": "Chinde",
        "name": "Chinde Airport",
        "country": "Mozambique"
    },
    {
        "key": "BET",
        "city": "Bethel",
        "name": "Bethel Airport",
        "country": "United States"
    },
    {
        "key": "CDQ",
        "city": "Croydon, Queensland, Australia",
        "name": "Croydon Airport",
        "country": "United Kingdom"
    },
    {
        "key": "GIC",
        "city": "Boigu Island",
        "name": "Boigu Island Arpt",
        "country": "Australia"
    },
    {
        "key": "INF",
        "city": "In Guezzam",
        "name": "In Guezzam Airport",
        "country": "Algeria"
    },
    {
        "key": "BEU",
        "city": "Bedourie",
        "name": "Bedourie Arpt",
        "country": "Australia"
    },
    {
        "key": "PEA",
        "city": "Cygnet River",
        "name": "Penneshaw Airport",
        "country": "Australia"
    },
    {
        "key": "CDR",
        "city": "Chadron",
        "name": "Chadron Arpt",
        "country": "United States"
    },
    {
        "key": "GID",
        "city": "Gitega",
        "name": "Gitega Airport",
        "country": "Burundi"
    },
    {
        "key": "INH",
        "city": "Inhambane",
        "name": "Inhambane Airport",
        "country": "Mozambique"
    },
    {
        "key": "BEW",
        "city": "Beira",
        "name": "Beira Arpt",
        "country": "Mozambique"
    },
    {
        "key": "CDS",
        "city": "Childress",
        "name": "Childress Municipal Airport",
        "country": "United States"
    },
    {
        "key": "GIF",
        "city": "Winter Haven",
        "name": "Gilbert Fld",
        "country": "United States"
    },
    {
        "key": "PEC",
        "city": "Pelican",
        "name": "Pelican Seaplane Base",
        "country": "United States"
    },
    {
        "key": "INI",
        "city": "Nis Rs",
        "name": "Nis Arpt",
        "country": "Serbia"
    },
    {
        "key": "CDT",
        "city": "Bell-lloc",
        "name": "Castellon Costa Azahar Airport",
        "country": "Spain"
    },
    {
        "key": "BEY",
        "city": "Beirut",
        "name": "Beirut Intl Arpt",
        "country": "Lebanon"
    },
    {
        "key": "GIG",
        "city": "Rio De Janeiro",
        "name": "Rio Internacional",
        "country": "Brazil"
    },
    {
        "key": "PED",
        "city": "Pardubice",
        "name": "Pardubice Arpt",
        "country": "Czech Republic"
    },
    {
        "key": "CDU",
        "city": "Cobbitty",
        "name": "Camden Airport",
        "country": "Australia"
    },
    {
        "key": "INJ",
        "city": "Injune",
        "name": "Injune Airport",
        "country": "Australia"
    },
    {
        "key": "BEZ",
        "city": "Beru",
        "name": "Beru Arpt",
        "country": "Kiribati"
    },
    {
        "key": "GII",
        "city": "Siguiri",
        "name": "Siguiri Airport",
        "country": "Guinea"
    },
    {
        "key": "CDV",
        "city": "Cordova",
        "name": "Mudhole Smith Arpt",
        "country": "United States"
    },
    {
        "key": "PEE",
        "city": "Perm",
        "name": "Perm Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "INL",
        "city": "International Falls",
        "name": "Intl Falls Arpt",
        "country": "United States"
    },
    {
        "key": "BFB",
        "city": "Blue Fox Bay",
        "name": "Blue Fox Bay Arpt",
        "country": "United States"
    },
    {
        "key": "GIL",
        "city": "Gilgit",
        "name": "Gilgit Arpt",
        "country": "Pakistan"
    },
    {
        "key": "CDW",
        "city": "Caldwell",
        "name": "Caldwell Wright Arpt",
        "country": "United States"
    },
    {
        "key": "PEF",
        "city": "Peenemuende",
        "name": "Peenemuende Arpt",
        "country": "Germany"
    },
    {
        "key": "INM",
        "city": "Innamincka",
        "name": "Innamincka Airport",
        "country": "Australia"
    },
    {
        "key": "CEA",
        "city": "Wichita",
        "name": "Cessna Aircraft Field",
        "country": "United States"
    },
    {
        "key": "BFD",
        "city": "Bradford",
        "name": "Bradford Regional Arpt",
        "country": "United States"
    },
    {
        "key": "GIR",
        "city": "Girardot",
        "name": "Girardot Arpt",
        "country": "Colombia"
    },
    {
        "key": "INN",
        "city": "Innsbruck",
        "name": "Kranebitten Airport",
        "country": "Austria"
    },
    {
        "key": "PEG",
        "city": "Perugia",
        "name": "Sant Egidio Arpt",
        "country": "Italy"
    },
    {
        "key": "BFE",
        "city": "Bielefeld",
        "name": "Bielefeld Arpt",
        "country": "Germany"
    },
    {
        "key": "CEB",
        "city": "Cebu",
        "name": "Cebu Intl",
        "country": "Philippines"
    },
    {
        "key": "GIS",
        "city": "Gisborne",
        "name": "Gisborne Arpt",
        "country": "New Zealand"
    },
    {
        "key": "INO",
        "city": "Inongo",
        "name": "Inongo Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "CEC",
        "city": "Crescent City",
        "name": "Crescent City Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "FFT",
        "city": "Frankfor",
        "name": "Capital City",
        "country": "United States"
    },
    {
        "key": "FFU",
        "city": "FutaleufÃº",
        "name": "Futaleufu Airfield",
        "country": "Chile"
    },
    {
        "key": "FGI",
        "city": "Apia",
        "name": "Fagali Arpt",
        "country": "Samoa"
    },
    {
        "key": "FHU",
        "city": "Ft Huachuca",
        "name": "Sierra Vista Municipal",
        "country": "United States"
    },
    {
        "key": "FID",
        "city": "Fishers Island",
        "name": "Elizabeth Field (FAA: 0B8)",
        "country": "United States"
    },
    {
        "key": "FIE",
        "city": "Fair Isle",
        "name": "Fair Isle Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "FIH",
        "city": "Kinshasa",
        "name": "Kinshasa Arpt",
        "country": "Congo"
    },
    {
        "key": "FIL",
        "city": "Fillmore",
        "name": "Fillmore Municipal Airport (FAA: FOM)",
        "country": "United States"
    },
    {
        "key": "FIZ",
        "city": "Fitzroy Crossing",
        "name": "Fitzroy Crossing Airport",
        "country": "Australia"
    },
    {
        "key": "FJR",
        "city": "Al Fujairah",
        "name": "Fujairah Intl Arpt",
        "country": "United Arab Emirates"
    },
    {
        "key": "FKB",
        "city": "Karlsruhe Baden Baden",
        "name": "Soellingen Arpt",
        "country": "Germany"
    },
    {
        "key": "FKI",
        "city": "Kisangani, Democratic Republic of the Congo",
        "name": "Bangoka International Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "FKL",
        "city": "Franklin",
        "name": "Chess Lamberton Arpt",
        "country": "United States"
    },
    {
        "key": "FKN",
        "city": "Franklin",
        "name": "Franklin Municipalâ€“John Beverly Rose Airport",
        "country": "United States"
    },
    {
        "key": "FKS",
        "city": "Fukushima",
        "name": "Fukushima Arpt",
        "country": "Japan"
    },
    {
        "key": "FLB",
        "city": "Floriano",
        "name": "Cangapara Arpt",
        "country": "Brazil"
    },
    {
        "key": "FLC",
        "city": "Falls Creek",
        "name": "Falls Creek Arpt",
        "country": "Australia"
    },
    {
        "key": "FLF",
        "city": "Flensburg",
        "name": "Schaferhaus Arpt",
        "country": "Germany"
    },
    {
        "key": "FLG",
        "city": "Flagstaff",
        "name": "Flagstaff Arpt",
        "country": "United States"
    },
    {
        "key": "FLI",
        "city": "Flateyri",
        "name": "Holt Airport",
        "country": "Iceland"
    },
    {
        "key": "FLL",
        "city": "Ft Lauderdale",
        "name": "Ft Lauderdale Hollywood Intl Arpt",
        "country": "United States"
    },
    {
        "key": "FLM",
        "city": "Filadelfia",
        "name": "Filadelfia Airport",
        "country": "Paraguay"
    },
    {
        "key": "FLN",
        "city": "Florianopolis",
        "name": "Hercilio Luz Arpt",
        "country": "Brazil"
    },
    {
        "key": "FLO",
        "city": "Florence",
        "name": "Gilbert Field",
        "country": "United States"
    },
    {
        "key": "FLP",
        "city": "Flippin",
        "name": "Flippin Arpt",
        "country": "United States"
    },
    {
        "key": "FLR",
        "city": "Florence",
        "name": "Amerigo Vespucci Arpt",
        "country": "Italy"
    },
    {
        "key": "FLV",
        "city": "Leavenworth",
        "name": "Sherman Army Airfield",
        "country": "United States"
    },
    {
        "key": "FLW",
        "city": "Santa Cruz Flores",
        "name": "Aerodromo Das Flores",
        "country": "Portugal"
    },
    {
        "key": "FLX",
        "city": "Fallon",
        "name": "Fallon Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "FLY",
        "city": "Finley",
        "name": "Finley Airport",
        "country": "Australia"
    },
    {
        "key": "FMA",
        "city": "Formosa",
        "name": "El Pucu Arpt",
        "country": "Argentina"
    },
    {
        "key": "FME",
        "city": "Odenton",
        "name": "Tipton",
        "country": "United States"
    },
    {
        "key": "FMH",
        "city": "Falmouth",
        "name": "Otis AFB",
        "country": "United States"
    },
    {
        "key": "FMM",
        "city": "Memmingerberg",
        "name": "Memmingen Airport",
        "country": "Germany"
    },
    {
        "key": "FMN",
        "city": "Farmington",
        "name": "Four Corners Regional Arpt",
        "country": "United States"
    },
    {
        "key": "FMO",
        "city": "Muenster",
        "name": "Muenster Airport",
        "country": "Germany"
    },
    {
        "key": "FMS",
        "city": "Fort Madison",
        "name": "Fort Madison Municipal",
        "country": "United States"
    },
    {
        "key": "FMY",
        "city": "Fort Myers",
        "name": "Page Field Airport",
        "country": "United States"
    },
    {
        "key": "FNA",
        "city": "Freetown",
        "name": "Lungi Intl Arpt",
        "country": "Sierra Leone"
    },
    {
        "key": "FNB",
        "city": "Neubrandenburg",
        "name": "Neubrandenburg Arpt",
        "country": "Germany"
    },
    {
        "key": "FNC",
        "city": "Funchal",
        "name": "Madeira Arpt",
        "country": "Portugal"
    },
    {
        "key": "FNE",
        "city": "Fane",
        "name": "FANE AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "FNH",
        "city": "Fincha",
        "name": "Fincha Airport",
        "country": "Ethiopia"
    },
    {
        "key": "FNI",
        "city": "Nimes",
        "name": "Nimes Airport",
        "country": "France"
    },
    {
        "key": "FNJ",
        "city": "Pyongyang",
        "name": "Sunan Arpt",
        "country": "Korea"
    },
    {
        "key": "FNL",
        "city": "Ft Collins",
        "name": "Municipal Airport",
        "country": "United States"
    },
    {
        "key": "FNR",
        "city": "Funter Bay",
        "name": "Funter Bay Seaplane Base",
        "country": "United States"
    },
    {
        "key": "FNT",
        "city": "Flint",
        "name": "Bishop Intl Arpt",
        "country": "United States"
    },
    {
        "key": "FOA",
        "city": "Foula,Scotland",
        "name": "Foula Airfield",
        "country": "United Kingdom"
    },
    {
        "key": "FOC",
        "city": "Fuzhou",
        "name": "Fuzhou Arpt",
        "country": "China"
    },
    {
        "key": "FOD",
        "city": "Fort Dodge",
        "name": "Ft Dodge Municipal",
        "country": "United States"
    },
    {
        "key": "FOE",
        "city": "Topeka",
        "name": "Forbes Field",
        "country": "United States"
    },
    {
        "key": "FOG",
        "city": "Foggia",
        "name": "Gino Lisa Arpt",
        "country": "Italy"
    },
    {
        "key": "FOK",
        "city": "Westhampton",
        "name": "Suffolk County Arpt",
        "country": "United States"
    },
    {
        "key": "FON",
        "city": "Fortuna",
        "name": "Fortuna Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "FOO",
        "city": "Numfoor, Indonesia",
        "name": "Kornasoren Airport (Numfoor Airport)",
        "country": "Indonesia"
    },
    {
        "key": "FOR",
        "city": "Fortaleza",
        "name": "Pinto Martines Arpt",
        "country": "Brazil"
    },
    {
        "key": "FOT",
        "city": "Forster",
        "name": "Forster",
        "country": "Australia"
    },
    {
        "key": "FPO",
        "city": "Freeport",
        "name": "Grand Bahama Intl Arpt",
        "country": "Bahamas"
    },
    {
        "key": "FPR",
        "city": "Fort Pierce",
        "name": "St Lucie County Arpt",
        "country": "United States"
    },
    {
        "key": "FRA",
        "city": "Frankfurt",
        "name": "Frankfurt Intl",
        "country": "Germany"
    },
    {
        "key": "FRC",
        "city": "Franca",
        "name": "Franca Airport",
        "country": "Brazil"
    },
    {
        "key": "FRD",
        "city": "Friday Harbor",
        "name": "Friday Harbor Airport",
        "country": "United States"
    },
    {
        "key": "FRG",
        "city": "Farmingdale",
        "name": "Republic Arpt",
        "country": "United States"
    },
    {
        "key": "FRH",
        "city": "French Lick",
        "name": "French Lick Municipal Airport",
        "country": "United States"
    },
    {
        "key": "FRK",
        "city": "Fregate Island",
        "name": "Fregate Island Airport",
        "country": "Seychelles"
    },
    {
        "key": "FRL",
        "city": "Forli",
        "name": "Luigi Ridolfi Arpt",
        "country": "Italy"
    },
    {
        "key": "FRM",
        "city": "Fairmont",
        "name": "Fairmont Municipal",
        "country": "United States"
    },
    {
        "key": "FRO",
        "city": "Floro",
        "name": "Flora Arpt",
        "country": "Norway"
    },
    {
        "key": "FRR",
        "city": "Front Royal",
        "name": "Warren County Arpt",
        "country": "United States"
    },
    {
        "key": "FRS",
        "city": "Flores",
        "name": "Flores Airport",
        "country": "Guatemala"
    },
    {
        "key": "BFF",
        "city": "Scottsbluff",
        "name": "Scottsbluff Municipal",
        "country": "United States"
    },
    {
        "key": "BFG",
        "city": "Bullfrog Basin",
        "name": "Bullfrog Basin Arpt",
        "country": "United States"
    },
    {
        "key": "BFH",
        "city": "Curitiba",
        "name": "Bacacheri Arpt",
        "country": "Brazil"
    },
    {
        "key": "BFI",
        "city": "Seattle",
        "name": "Seattle Boeing Field",
        "country": "United States"
    },
    {
        "key": "BFK",
        "city": "Denver",
        "name": "Buckley Air National Guard Base",
        "country": "United States"
    },
    {
        "key": "BFL",
        "city": "Bakersfield",
        "name": "Meadows Field",
        "country": "United States"
    },
    {
        "key": "BFM",
        "city": "Mobile",
        "name": "Brookley Arpt",
        "country": "United States"
    },
    {
        "key": "BFN",
        "city": "Bloemfontein",
        "name": "Bloemfontein International",
        "country": "South Africa"
    },
    {
        "key": "BFP",
        "city": "Beaver Falls",
        "name": "Beaver Falls Arpt",
        "country": "United States"
    },
    {
        "key": "BFR",
        "city": "Bedford",
        "name": "Virgil I Grissom Municipal",
        "country": "United States"
    },
    {
        "key": "GIT",
        "city": "Geita, Tanzania",
        "name": "Geita Airport",
        "country": "Tanzania"
    },
    {
        "key": "GIU",
        "city": "Sigiriya",
        "name": "Sigiriya Airport[2]",
        "country": "Sri Lanka"
    },
    {
        "key": "GIY",
        "city": "Giyani, South Africa",
        "name": "Giyani Airport",
        "country": "South Africa"
    },
    {
        "key": "GIZ",
        "city": "Gizan",
        "name": "Gizan Aprt",
        "country": "Saudi Arabia"
    },
    {
        "key": "GJA",
        "city": "Guanaja",
        "name": "Guanaja Airport",
        "country": "Honduras"
    },
    {
        "key": "GJL",
        "city": "Tahir",
        "name": "Jijel Ferhat Abbas Airport",
        "country": "Algeria"
    },
    {
        "key": "GJR",
        "city": "GjÃ¶gur, Iceland",
        "name": "GjÃ¶gur Airport",
        "country": "Iceland"
    },
    {
        "key": "GJT",
        "city": "Grand Junction",
        "name": "Walker Field Arpt",
        "country": "United States"
    },
    {
        "key": "GKA",
        "city": "Goroka",
        "name": "Goroka Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "GKH",
        "city": "Gorkha Bazar",
        "name": "Palungtar Airport",
        "country": "Nepal"
    },
    {
        "key": "GKL",
        "city": "West Rockhampton",
        "name": "Great Keppel Island Airport",
        "country": "Australia"
    },
    {
        "key": "GKN",
        "city": "Gulkana",
        "name": "Gulkana Arpt",
        "country": "United States"
    },
    {
        "key": "GKO",
        "city": "Kongo Boumba",
        "name": "Kongo Boumba Airport",
        "country": "Gabon"
    },
    {
        "key": "GKT",
        "city": "Gatlinburg",
        "name": "Gatlinburg Arpt",
        "country": "United States"
    },
    {
        "key": "GLA",
        "city": "Glasgow",
        "name": "Glasgow Intl",
        "country": "United Kingdom"
    },
    {
        "key": "GLB",
        "city": "Globe",
        "name": "San Carlos Apache",
        "country": "United States"
    },
    {
        "key": "CED",
        "city": "Ceduna",
        "name": "Ceduna Arpt",
        "country": "Australia"
    },
    {
        "key": "CEE",
        "city": "Botovo",
        "name": "Cherepovets Airport",
        "country": "Russia"
    },
    {
        "key": "CEF",
        "city": "Springfield",
        "name": "Westover Metro",
        "country": "United States"
    },
    {
        "key": "CEG",
        "city": "Chester",
        "name": "Chester Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "CEH",
        "city": "Chelinda",
        "name": "Chelinda Arpt",
        "country": "Malawi"
    },
    {
        "key": "CEI",
        "city": "Chiang Rai",
        "name": "Chaing Rai Arpt",
        "country": "Thailand"
    },
    {
        "key": "CEK",
        "city": "Chelyabinsk",
        "name": "Chelyabinsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "CEM",
        "city": "Tambon Pa Daet",
        "name": "Central Airport",
        "country": "Thailand"
    },
    {
        "key": "CEN",
        "city": "Ciudad Obregon",
        "name": "Ciudad Obregon Arpt",
        "country": "Mexico"
    },
    {
        "key": "CEP",
        "city": "Talcahuano",
        "name": "ConcepciÃ³n Airport",
        "country": "Chile"
    },
    {
        "key": "CEQ",
        "city": "Cannes",
        "name": "Mandelieu Arpt",
        "country": "France"
    },
    {
        "key": "CER",
        "city": "Cherbourg",
        "name": "Maupertius Arpt",
        "country": "France"
    },
    {
        "key": "CES",
        "city": "Cessnock",
        "name": "Cessnock Arpt",
        "country": "Australia"
    },
    {
        "key": "CET",
        "city": "Cholet",
        "name": "Le Pontreau Arpt",
        "country": "France"
    },
    {
        "key": "CEU",
        "city": "Clemson",
        "name": "Clemson Oconee Cty Arpt",
        "country": "United States"
    },
    {
        "key": "CEV",
        "city": "Connersville",
        "name": "Mettle Field",
        "country": "United States"
    },
    {
        "key": "CEX",
        "city": "Chena Hot Springs",
        "name": "Chena Hot Springs Arpt",
        "country": "United States"
    },
    {
        "key": "CEY",
        "city": "Murray",
        "name": "Calloway Cty Arpt",
        "country": "United States"
    },
    {
        "key": "CEZ",
        "city": "Cortez",
        "name": "Montezuma County",
        "country": "United States"
    },
    {
        "key": "CFB",
        "city": "Cabo Frio",
        "name": "Cabo Frio Arpt",
        "country": "Brazil"
    },
    {
        "key": "CFC",
        "city": "Cacador",
        "name": "Cacador Airport",
        "country": "Brazil"
    },
    {
        "key": "CFE",
        "city": "Clermont Ferrand",
        "name": "Aulnat Arpt",
        "country": "France"
    },
    {
        "key": "CFG",
        "city": "Cienfuegos",
        "name": "Cienfuegos Arpt",
        "country": "Cuba"
    },
    {
        "key": "CFK",
        "city": "Chlef",
        "name": "Chlef Arpt",
        "country": "Algeria"
    },
    {
        "key": "CFN",
        "city": "Donegal",
        "name": "Donegal Arpt",
        "country": "Ireland"
    },
    {
        "key": "CFQ",
        "city": "Creston",
        "name": "Creston Arpt",
        "country": "Canada"
    },
    {
        "key": "CFR",
        "city": "Caen",
        "name": "Carpiquet Arpt",
        "country": "France"
    },
    {
        "key": "CFS",
        "city": "Coffs Harbour",
        "name": "Coffs Harbour Arpt",
        "country": "Australia"
    },
    {
        "key": "CFT",
        "city": "Clifton",
        "name": "Clifton Arpt",
        "country": "United States"
    },
    {
        "key": "CFU",
        "city": "Kerkyra",
        "name": "I Kapodistrias Arpt",
        "country": "Greece"
    },
    {
        "key": "CGA",
        "city": "Craig",
        "name": "Craig Seaplane Base",
        "country": "United States"
    },
    {
        "key": "CGB",
        "city": "Cuiaba",
        "name": "Marechal Rondon Arpt",
        "country": "Brazil"
    },
    {
        "key": "XNV",
        "city": "Birmingham",
        "name": "Nuneaton Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XOC",
        "city": "Atocha",
        "name": "Atocha Railway St.",
        "country": "Spain"
    },
    {
        "key": "XOD",
        "city": "Trondheim",
        "name": "Oppdal Rail Station",
        "country": "Norway"
    },
    {
        "key": "XOK",
        "city": "Oakville",
        "name": "Oakville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XON",
        "city": "Carleton",
        "name": "Carleton Rail Station",
        "country": "Canada"
    },
    {
        "key": "XOP",
        "city": "Poitiers",
        "name": "Poitiers Rail Station",
        "country": "France"
    },
    {
        "key": "XOQ",
        "city": "Stavanger",
        "name": "Sira Rail Station",
        "country": "Norway"
    },
    {
        "key": "XPA",
        "city": "Pama",
        "name": "Pama Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "XPB",
        "city": "Parksville",
        "name": "Parksville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XPF",
        "city": "Carlisle",
        "name": "Penrith Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XPG",
        "city": "Paris",
        "name": "Gare du Nord Railway Station",
        "country": "France"
    },
    {
        "key": "XPH",
        "city": "Port Hope",
        "name": "Port Hope Rail Station",
        "country": "Canada"
    },
    {
        "key": "XPJ",
        "city": "Montpellier",
        "name": "Montpellier Railway Station",
        "country": "France"
    },
    {
        "key": "XPK",
        "city": "Pukatawagan",
        "name": "Pukatawagan Rail Station",
        "country": "Canada"
    },
    {
        "key": "XPL",
        "city": "Comayagua",
        "name": "Palmerola Air Base",
        "country": "Honduras"
    },
    {
        "key": "XPN",
        "city": "Brampton",
        "name": "Brampton Rail Station",
        "country": "Canada"
    },
    {
        "key": "XPT",
        "city": "Preston",
        "name": "Preston Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XPU",
        "city": "West Kuparuk",
        "name": "West Kuparuk Arpt",
        "country": "United States"
    },
    {
        "key": "XPX",
        "city": "Pointe Aux Trembles",
        "name": "Pointe-aux-Trembles Rail Station",
        "country": "Canada"
    },
    {
        "key": "XPZ",
        "city": "St Tropez",
        "name": "Harbourarpt",
        "country": "France"
    },
    {
        "key": "XQE",
        "city": "London",
        "name": "Ebbsfleet Kent Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XQG",
        "city": "Berwick Upon Tweed",
        "name": "Berwick Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XQH",
        "city": "Nottingham Uk",
        "name": "Nottingham Railway Stn",
        "country": "United Kingdom"
    },
    {
        "key": "XQI",
        "city": "Nottingham Uk",
        "name": "Nottingham Railway Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZKG",
        "city": "Kegaska",
        "name": "Kegaska Arpt",
        "country": "Canada"
    },
    {
        "key": "ZKJ",
        "city": "Schaffhausen",
        "name": "Schaffhausen Rail Station",
        "country": "Switzerland"
    },
    {
        "key": "ZKN",
        "city": "Skive",
        "name": "Kive Railway Station",
        "country": "Denmark"
    },
    {
        "key": "ZLK",
        "city": "St Petersburg",
        "name": "Moskocskiy Railway Station",
        "country": "Russian Federation"
    },
    {
        "key": "ZLN",
        "city": "Le Mans",
        "name": "Le Mans Railway Station",
        "country": "France"
    },
    {
        "key": "ZLO",
        "city": "Manzanillo",
        "name": "Manzanillo Arpt",
        "country": "Mexico"
    },
    {
        "key": "ZLP",
        "city": "Zurich",
        "name": "Zurich Railway Station",
        "country": "Switzerland"
    },
    {
        "key": "ZLQ",
        "city": "Zurich",
        "name": "Zurich Railway Station",
        "country": "Switzerland"
    },
    {
        "key": "ZLS",
        "city": "Liverpool",
        "name": "Liverpool Street Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZLT",
        "city": "La Tabatiere",
        "name": "La Tabatiere Arpt",
        "country": "Canada"
    },
    {
        "key": "ZLW",
        "city": "Pasir Gudang",
        "name": "Pasir Gudang Port",
        "country": "Malaysia"
    },
    {
        "key": "ZMB",
        "city": "Hamburg",
        "name": "Hamburg Railway Service",
        "country": "Germany"
    },
    {
        "key": "ZME",
        "city": "Naples",
        "name": "NJ Metro Park Railway Station",
        "country": "Italy"
    },
    {
        "key": "ZMF",
        "city": "Naples",
        "name": "Beverello Harbour",
        "country": "Italy"
    },
    {
        "key": "ZMH",
        "city": "108 Mile Ranch",
        "name": "South Cariboo Regional Airport",
        "country": "Canada"
    },
    {
        "key": "ZMI",
        "city": "Naples",
        "name": "Mergellina Railway Station",
        "country": "Italy"
    },
    {
        "key": "ZMJ",
        "city": "Naples",
        "name": "Mergellina Harbour",
        "country": "Italy"
    },
    {
        "key": "ZML",
        "city": "Milwaukee",
        "name": "Milwaukee Airport Rail Station",
        "country": "United States"
    },
    {
        "key": "ZMM",
        "city": "Arlington",
        "name": "Zamora National Airport",
        "country": "United States"
    },
    {
        "key": "ZMS",
        "city": "Florence",
        "name": "Sm Novella Railway Station",
        "country": "Italy"
    },
    {
        "key": "ZMT",
        "city": "Masset",
        "name": "Masset",
        "country": "Canada"
    },
    {
        "key": "ZMU",
        "city": "Munich",
        "name": "Munich HBF Railway Service",
        "country": "Germany"
    },
    {
        "key": "ZNA",
        "city": "Nanaimo",
        "name": "Harbour Seaplane Base",
        "country": "Canada"
    },
    {
        "key": "ZND",
        "city": "Zinder",
        "name": "Zinder Airport",
        "country": "Niger"
    },
    {
        "key": "ZNE",
        "city": "Newman",
        "name": "Newman Airport",
        "country": "Australia"
    },
    {
        "key": "ZNZ",
        "city": "Zanzibar",
        "name": "Kisauni Arpt",
        "country": "Tanzania"
    },
    {
        "key": "ZOS",
        "city": "Osorno",
        "name": "Canal Balo Arpt",
        "country": "Chile"
    },
    {
        "key": "ZPC",
        "city": "Pucon",
        "name": "Pucon Arpt",
        "country": "Chile"
    },
    {
        "key": "ZPE",
        "city": "Osnabruck",
        "name": "Osnabrueck Rail Service",
        "country": "Germany"
    },
    {
        "key": "ZQF",
        "city": "Trier",
        "name": "Trier Arpt",
        "country": "Germany"
    },
    {
        "key": "ZQN",
        "city": "Queenstown",
        "name": "Frankton Airport",
        "country": "New Zealand"
    },
    {
        "key": "ZQS",
        "city": "Queen Charlotte Island",
        "name": "Queen Charlotte Island Arpt",
        "country": "Canada"
    },
    {
        "key": "ZRA",
        "city": "Atlantic City",
        "name": "Atlantic City Railway Station",
        "country": "United States"
    },
    {
        "key": "ZRB",
        "city": "Frankfurt",
        "name": "Frankfurt HBF Railway Service",
        "country": "Germany"
    },
    {
        "key": "ZRD",
        "city": "Richmond",
        "name": "Richmond Va Railway Station",
        "country": "United States"
    },
    {
        "key": "ZRF",
        "city": "Rockford",
        "name": "Peoria Rockford Bus Terminal",
        "country": "United States"
    },
    {
        "key": "ZRG",
        "city": "Bratislava",
        "name": "Bratislava Bus Station",
        "country": "Slovakia"
    },
    {
        "key": "ZRH",
        "city": "Zurich",
        "name": "Zurich Airport",
        "country": "Switzerland"
    },
    {
        "key": "ZRJ",
        "city": "North Caribou Lake",
        "name": "Round Lake Airport",
        "country": "Canada"
    },
    {
        "key": "ZRK",
        "city": "Rockford",
        "name": "Van Galder Bus Terminal",
        "country": "United States"
    },
    {
        "key": "ZRL",
        "city": "Lancaster",
        "name": "Lancaster Pa Railway Station",
        "country": "United States"
    },
    {
        "key": "ZRP",
        "city": "New York",
        "name": "NEWARK RAILWAY STATION",
        "country": "United States"
    },
    {
        "key": "ZRT",
        "city": "Hartford",
        "name": "Hartford Railway Station",
        "country": "United States"
    },
    {
        "key": "ZRU",
        "city": "Boston",
        "name": "Boston Area Railway Stattions",
        "country": "United States"
    },
    {
        "key": "ZRX",
        "city": "Riesa",
        "name": "Riesa Railway Station",
        "country": "Germany"
    },
    {
        "key": "ZRZ",
        "city": "Washington",
        "name": "New Carrollton Railway Station",
        "country": "United States"
    },
    {
        "key": "ZSA",
        "city": "San Salvador",
        "name": "San Salvador Arpt",
        "country": "Bahamas"
    },
    {
        "key": "ZSB",
        "city": "Salzburg",
        "name": "Salzburg Railway Station",
        "country": "Austria"
    },
    {
        "key": "ZSE",
        "city": "St Pierre Dela Reunion",
        "name": "St Pierre Dela Reunion Arpt",
        "country": "RÃ©union"
    },
    {
        "key": "ZSG",
        "city": "Sonneberg",
        "name": "Sonneberg Railway Station",
        "country": "Germany"
    },
    {
        "key": "ZSJ",
        "city": "Sandy Lake",
        "name": "Sandy Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "ZSM",
        "city": "San Jose",
        "name": "Santa Clara Bus Service",
        "country": "United States"
    },
    {
        "key": "ZSV",
        "city": "St Louis",
        "name": "Saint Louis Railway Station",
        "country": "United States"
    },
    {
        "key": "ZSW",
        "city": "Prince Rupert",
        "name": "Seal Cove Arpt",
        "country": "Canada"
    },
    {
        "key": "ZSZ",
        "city": "Swakopmund",
        "name": "Swakopmund Railway Station",
        "country": "Namibia"
    },
    {
        "key": "ZTA",
        "city": "Tureia, Tuamotus, French Polynesia",
        "name": "Tureia Airport",
        "country": "French Polynesia"
    },
    {
        "key": "ZTB",
        "city": "Tete A La Baleine",
        "name": "Tete A La Baleine Arpt",
        "country": "Canada"
    },
    {
        "key": "ZTG",
        "city": "Aalborg",
        "name": "Aalborg Rail Station",
        "country": "Denmark"
    },
    {
        "key": "ZTH",
        "city": "Zakinthos",
        "name": "Zakinthos Arpt",
        "country": "Greece"
    },
    {
        "key": "ZTI",
        "city": "Guangdong province guangzhou",
        "name": "Dongguan humen hong kong ferry terminal chinese mainland",
        "country": "China"
    },
    {
        "key": "ZTM",
        "city": "Shamattawa",
        "name": "Shamattawa Airport",
        "country": "Canada"
    },
    {
        "key": "ZTN",
        "city": "Philadelphia",
        "name": "Trento Railway Station",
        "country": "United States"
    },
    {
        "key": "ZTO",
        "city": "Boston",
        "name": "Boston South Rail Station",
        "country": "United States"
    },
    {
        "key": "ZTR",
        "city": "Zhytomyr",
        "name": "Zhytomyr Airport",
        "country": "Ukraine"
    },
    {
        "key": "ZTY",
        "city": "Boston",
        "name": "Boston Area Railway Station",
        "country": "United States"
    },
    {
        "key": "ZUC",
        "city": "Ignace, Ontario, Canada",
        "name": "Ignace Municipal Airport",
        "country": "Canada"
    },
    {
        "key": "ZUG",
        "city": "Harrisburg",
        "name": "Harrisburg Railway Station",
        "country": "United States"
    },
    {
        "key": "ZUH",
        "city": "Zhuhai",
        "name": "Zhuhai Arpt",
        "country": "China"
    },
    {
        "key": "ZUL",
        "city": "Al Zulfi (Zilfi)",
        "name": "Zilfi Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "RNN",
        "city": "Bornholm",
        "name": "Bornholm Arpt",
        "country": "Denmark"
    },
    {
        "key": "RNO",
        "city": "Reno",
        "name": "Reno Tahoe Intl Arpt",
        "country": "United States"
    },
    {
        "key": "RNS",
        "city": "Rennes",
        "name": "Saint Jacques Arpt",
        "country": "France"
    },
    {
        "key": "RNT",
        "city": "Renton",
        "name": "Renton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "RNU",
        "city": "Ranau",
        "name": "Ranau Airport",
        "country": "Malaysia"
    },
    {
        "key": "ROA",
        "city": "Roanoke",
        "name": "Roanoke Regional Arpt",
        "country": "United States"
    },
    {
        "key": "ROB",
        "city": "Monrovia",
        "name": "Roberts Intl",
        "country": "Liberia"
    },
    {
        "key": "ROC",
        "city": "Rochester",
        "name": "Monroe Cty Arpt New York",
        "country": "United States"
    },
    {
        "key": "ROF",
        "city": "Montague",
        "name": "Montague Airport",
        "country": "United States"
    },
    {
        "key": "ROG",
        "city": "Rogers",
        "name": "Rogers Arpt",
        "country": "United States"
    },
    {
        "key": "ROI",
        "city": "Roi Et",
        "name": "Roi Et Arpt",
        "country": "Thailand"
    },
    {
        "key": "ROK",
        "city": "Rockhampton",
        "name": "Rockhampton Arpt",
        "country": "Australia"
    },
    {
        "key": "ROL",
        "city": "Roosevelt",
        "name": "Roosevelt Municipal Airport",
        "country": "United States"
    },
    {
        "key": "RON",
        "city": "Rondon",
        "name": "Rondon Arpt",
        "country": "Colombia"
    },
    {
        "key": "ROO",
        "city": "Rondonopolis",
        "name": "Rondonopolis Arpt",
        "country": "Brazil"
    },
    {
        "key": "ROP",
        "city": "Rota",
        "name": "Rota Arpt",
        "country": "Northern Mariana Islands"
    },
    {
        "key": "ROR",
        "city": "Koror",
        "name": "Airai Airport",
        "country": "Palau"
    },
    {
        "key": "ROS",
        "city": "Rosario",
        "name": "Fisherton Airport",
        "country": "Argentina"
    },
    {
        "key": "ROT",
        "city": "Rotorua",
        "name": "Rotorua Arpt",
        "country": "New Zealand"
    },
    {
        "key": "ROV",
        "city": "Rostov",
        "name": "Rostov Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "ROW",
        "city": "Roswell",
        "name": "Industrial Aircenter",
        "country": "United States"
    },
    {
        "key": "ROX",
        "city": "Roseau",
        "name": "Roseau Municipal Airport",
        "country": "United States"
    },
    {
        "key": "ROZ",
        "city": "Rota",
        "name": "US Naval Station Rota",
        "country": "Spain"
    },
    {
        "key": "RPA",
        "city": "Wadachaur",
        "name": "Rolpa Airport",
        "country": "Nepal"
    },
    {
        "key": "RPN",
        "city": "Rosh Pina",
        "name": "Rosh Pina Arpt",
        "country": "Israel"
    },
    {
        "key": "RPR",
        "city": "Raipur",
        "name": "Raipur Arpt",
        "country": "India"
    },
    {
        "key": "RRE",
        "city": "Marree",
        "name": "Marree Airport",
        "country": "Australia"
    },
    {
        "key": "RRG",
        "city": "Rodrigues Island",
        "name": "Rodrigues Island Arpt",
        "country": "Mauritius"
    },
    {
        "key": "RRI",
        "city": "Barora",
        "name": "Barora Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "RRK",
        "city": "Rourkela",
        "name": "Rourkela Airport",
        "country": "India"
    },
    {
        "key": "RRO",
        "city": "Sorrento",
        "name": "Sorrento Arpt",
        "country": "Italy"
    },
    {
        "key": "RRR",
        "city": "Raroia, Tuamotus, French Polynesia",
        "name": "Raroia Airport",
        "country": "French Polynesia"
    },
    {
        "key": "RRS",
        "city": "Roros",
        "name": "Roros Arpt",
        "country": "Norway"
    },
    {
        "key": "RSA",
        "city": "Santa Rosa",
        "name": "Santa Rosa Arpt",
        "country": "Argentina"
    },
    {
        "key": "RSB",
        "city": "Birdsville",
        "name": "Roseberth Airport",
        "country": "Australia"
    },
    {
        "key": "RSD",
        "city": "Rock Sound",
        "name": "S Eleuthera Arpt",
        "country": "Bahamas"
    },
    {
        "key": "RSE",
        "city": "Sydney",
        "name": "Au Rose Bay Arpt",
        "country": "Australia"
    },
    {
        "key": "RSH",
        "city": "Russian Mission",
        "name": "Russian Seaplane Base",
        "country": "United States"
    },
    {
        "key": "RSI",
        "city": "Tabuk",
        "name": "Red sea international airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "RSJ",
        "city": "East Sound",
        "name": "Rosario Seaplane Base",
        "country": "United States"
    },
    {
        "key": "RSL",
        "city": "Russell",
        "name": "Russell Municipal Airport",
        "country": "United States"
    },
    {
        "key": "RSN",
        "city": "Ruston",
        "name": "Ruston Regional Arpt",
        "country": "United States"
    },
    {
        "key": "RSP",
        "city": "Raspberry Strait",
        "name": "Raspberry Strait Arpt",
        "country": "United States"
    },
    {
        "key": "RSS",
        "city": "AdDamazÄ«n",
        "name": "Damazin Airport",
        "country": "Sudan"
    },
    {
        "key": "RST",
        "city": "Rochester",
        "name": "Rochester Municipal",
        "country": "United States"
    },
    {
        "key": "RSU",
        "city": "Yeosu",
        "name": "Yeosu Arpt",
        "country": "Korea"
    },
    {
        "key": "RSW",
        "city": "Fort Myers",
        "name": "Regional Southwest Arpt",
        "country": "United States"
    },
    {
        "key": "RSX",
        "city": "Rouses Point",
        "name": "Rouses Point Seaplane Base (FAA: K21)",
        "country": "United States"
    },
    {
        "key": "RTB",
        "city": "Roatan",
        "name": "Roatan Arpt",
        "country": "Honduras"
    },
    {
        "key": "RTC",
        "city": "Ratnagiri",
        "name": "Ratnagiri Airport",
        "country": "India"
    },
    {
        "key": "RTE",
        "city": "Clover Pass",
        "name": "Marguerite Bay Arpt",
        "country": "United States"
    },
    {
        "key": "RTM",
        "city": "Rotterdam",
        "name": "Rotterdam Arpt",
        "country": "Netherlands"
    },
    {
        "key": "RTN",
        "city": "Raton",
        "name": "Crews Fld",
        "country": "United States"
    },
    {
        "key": "RTS",
        "city": "Rottnest",
        "name": "Rottnest Island Arpt",
        "country": "Australia"
    },
    {
        "key": "RTW",
        "city": "Saratov",
        "name": "Saratov Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "RTY",
        "city": "Merty Merty, South Australia",
        "name": "Merty Merty Airport",
        "country": "Australia"
    },
    {
        "key": "RUA",
        "city": "Arua",
        "name": "Arua Airport",
        "country": "Uganda"
    },
    {
        "key": "RUD",
        "city": "Shahroud",
        "name": "Shahroud Airport",
        "country": "Iran"
    },
    {
        "key": "RUE",
        "city": "Butembo",
        "name": "Butembo Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "RUG",
        "city": "Rugao, Jiangsu",
        "name": "Rugao Air Base",
        "country": "China"
    },
    {
        "key": "RUH",
        "city": "Riyadh",
        "name": "King Khaled Intl",
        "country": "Saudi Arabia"
    },
    {
        "key": "RUI",
        "city": "Ruidoso",
        "name": "Ruidoso Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "RUK",
        "city": "Bijayashwari",
        "name": "Chaurjahari Airport",
        "country": "Nepal"
    },
    {
        "key": "RUM",
        "city": "Siddhicharan",
        "name": "Rumjatar Airport",
        "country": "Nepal"
    },
    {
        "key": "RUN",
        "city": "Reunion Island",
        "name": "Gillot Airport",
        "country": "RÃ©union"
    },
    {
        "key": "RUP",
        "city": "Rupsi",
        "name": "Rupsi Airport",
        "country": "India"
    },
    {
        "key": "RUR",
        "city": "Rurutu, French Polynesia",
        "name": "Rurutu Airport",
        "country": "French Polynesia"
    },
    {
        "key": "RUT",
        "city": "Rutland",
        "name": "Rutland Arpt",
        "country": "United States"
    },
    {
        "key": "RUY",
        "city": "Copan Ruinas",
        "name": "Copan Ruinas Airport",
        "country": "Honduras"
    },
    {
        "key": "RVD",
        "city": "Rio Verde",
        "name": "Rio Verde Airport",
        "country": "Brazil"
    },
    {
        "key": "RVE",
        "city": "Saravena",
        "name": "Saravena Arpt",
        "country": "Colombia"
    },
    {
        "key": "RVK",
        "city": "Roervik",
        "name": "Ryumsjoen Arpt",
        "country": "Norway"
    },
    {
        "key": "RVN",
        "city": "Rovaniemi",
        "name": "Rovaniemi Arpt",
        "country": "Finland"
    },
    {
        "key": "SWH",
        "city": "Swan Hill",
        "name": "Swan Hill Arpt",
        "country": "Australia"
    },
    {
        "key": "SWJ",
        "city": "Wintua",
        "name": "South West Bay Airport",
        "country": "Vanuatu"
    },
    {
        "key": "SWL",
        "city": "San Vicente",
        "name": "San Vicente Airport",
        "country": "Philippines"
    },
    {
        "key": "SWN",
        "city": "Faislabad",
        "name": "Sahiwal Airport",
        "country": "Pakistan"
    },
    {
        "key": "SWO",
        "city": "Stillwater",
        "name": "Searcy Fld",
        "country": "United States"
    },
    {
        "key": "SWP",
        "city": "Swakopmund",
        "name": "Swakopmund Arpt",
        "country": "Namibia"
    },
    {
        "key": "SWQ",
        "city": "Sumbawa Besar",
        "name": "Sultan Muhammad Kaharuddin III Airport",
        "country": "Indonesia"
    },
    {
        "key": "SWR",
        "city": "Silur",
        "name": "Silur Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SWS",
        "city": "Swansea",
        "name": "Fairwood Comm",
        "country": "United Kingdom"
    },
    {
        "key": "SWU",
        "city": "Suwon",
        "name": "Suwon Arpt",
        "country": "Korea"
    },
    {
        "key": "SWW",
        "city": "SWEETWATER",
        "name": "SWEETWATER ARPT",
        "country": "United States"
    },
    {
        "key": "SWX",
        "city": "Shakawe",
        "name": "Shakawe Airport",
        "country": "Botswana"
    },
    {
        "key": "SWY",
        "city": "Sitiawan",
        "name": "Sitiawan Airport",
        "country": "Malaysia"
    },
    {
        "key": "SXA",
        "city": "Sialum",
        "name": "Sialum Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SXB",
        "city": "Strasbourg",
        "name": "Enzheim Arpt",
        "country": "France"
    },
    {
        "key": "SXC",
        "city": "Catalina Island",
        "name": "Catalina Arpt",
        "country": "United States"
    },
    {
        "key": "SXE",
        "city": "Sale",
        "name": "Sale Arpt",
        "country": "Australia"
    },
    {
        "key": "SXF",
        "city": "Berlin",
        "name": "Schoenefeld Arpt",
        "country": "Germany"
    },
    {
        "key": "SXG",
        "city": "Senanga",
        "name": "Senanga Airport",
        "country": "Zambia"
    },
    {
        "key": "SXH",
        "city": "Sehulea, Papua New Guinea",
        "name": "Sehulea Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SXI",
        "city": "Sirri Island",
        "name": "Sirri Island Airport",
        "country": "Iran"
    },
    {
        "key": "SXJ",
        "city": "Shanshan, Xinjiang",
        "name": "Shanshan Airport",
        "country": "China"
    },
    {
        "key": "SXL",
        "city": "Sligo",
        "name": "Collooney",
        "country": "Ireland"
    },
    {
        "key": "SXM",
        "city": "St Maarten",
        "name": "Princ Juliana Arpt",
        "country": "Sint Maarten (Dutch part)"
    },
    {
        "key": "SXN",
        "city": "Sowa",
        "name": "Sua Pan Airport",
        "country": "Botswana"
    },
    {
        "key": "SXP",
        "city": "Nunam Iqua",
        "name": "Sheldon Point Airport",
        "country": "United States"
    },
    {
        "key": "SXR",
        "city": "Srinagar",
        "name": "Srinagar Arpt",
        "country": "India"
    },
    {
        "key": "SXS",
        "city": "Sahabat, Sabah",
        "name": "Sahabat Airport",
        "country": "Malaysia"
    },
    {
        "key": "SXT",
        "city": "Alor Setar",
        "name": "Sungai Tiang Airport",
        "country": "Malaysia"
    },
    {
        "key": "SXV",
        "city": "Salem",
        "name": "Salem Arpt",
        "country": "India"
    },
    {
        "key": "SXY",
        "city": "Sidney",
        "name": "Sidney Municipal Airport (FAA: N23)",
        "country": "United States"
    },
    {
        "key": "SXZ",
        "city": "Siirt, Turkey",
        "name": "Siirt Airport",
        "country": "Turkey"
    },
    {
        "key": "SYA",
        "city": "Shemya",
        "name": "Eareckson Air Station",
        "country": "United States"
    },
    {
        "key": "SYB",
        "city": "Seal Bay",
        "name": "Seal Bay Seaplane Base",
        "country": "United States"
    },
    {
        "key": "SYC",
        "city": "Shiringayoc",
        "name": "Shiringayoc Airport",
        "country": "Peru"
    },
    {
        "key": "SYD",
        "city": "Sydney",
        "name": "Kingsford Smith",
        "country": "Australia"
    },
    {
        "key": "SYE",
        "city": "Sadah",
        "name": "Saadah Airport",
        "country": "Yemen"
    },
    {
        "key": "SYI",
        "city": "Shelbyville",
        "name": "Shelbyville Municipal Airport",
        "country": "United States"
    },
    {
        "key": "SYJ",
        "city": "Sirjan",
        "name": "Sirjan Airport",
        "country": "Iran"
    },
    {
        "key": "SYK",
        "city": "StykkishÃ³lmur, Iceland",
        "name": "StykkishÃ³lmur Airport",
        "country": "Iceland"
    },
    {
        "key": "SYL",
        "city": "San Miguel",
        "name": "Roberts Aaf",
        "country": "United States"
    },
    {
        "key": "SYM",
        "city": "Simao",
        "name": "Simao Airport",
        "country": "China"
    },
    {
        "key": "SYN",
        "city": "Dennison",
        "name": "Stanton Airfield",
        "country": "United States"
    },
    {
        "key": "SYO",
        "city": "Shonai",
        "name": "Shonai Arpt",
        "country": "Japan"
    },
    {
        "key": "SYP",
        "city": "Santiago",
        "name": "Ruben Cantu Airport",
        "country": "Panama"
    },
    {
        "key": "SYQ",
        "city": "San Jose",
        "name": "Tobias Bolanos Intl",
        "country": "Costa Rica"
    },
    {
        "key": "SYR",
        "city": "Syracuse",
        "name": "Hancock Intl",
        "country": "United States"
    },
    {
        "key": "SYS",
        "city": "Saskylakh",
        "name": "Saskylakh Airport",
        "country": "Russia"
    },
    {
        "key": "SYT",
        "city": "Saint-Yan",
        "name": "Saint-Yan Airport (Charolais Bourgogne Sud Airport)",
        "country": "France"
    },
    {
        "key": "SYW",
        "city": "Sehwen Sharif",
        "name": "Sehwen Sharif Airport",
        "country": "Pakistan"
    },
    {
        "key": "SYX",
        "city": "Sanya",
        "name": "Sanya Arpt",
        "country": "China"
    },
    {
        "key": "SYY",
        "city": "Stornoway",
        "name": "Stornoway Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SYZ",
        "city": "Shiraz",
        "name": "Shiraz Arpt",
        "country": "Iran"
    },
    {
        "key": "SZB",
        "city": "Kuala Lumpur",
        "name": "Sultan Abdul Aziz Shah Arpt",
        "country": "Malaysia"
    },
    {
        "key": "SZC",
        "city": "Santa Cruz",
        "name": "Guanacaste Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "SZE",
        "city": "Semera",
        "name": "Semera Airport",
        "country": "Ethiopia"
    },
    {
        "key": "SZF",
        "city": "Samsun",
        "name": "Carsamba Arpt",
        "country": "Turkey"
    },
    {
        "key": "SZG",
        "city": "Salzburg",
        "name": "W A Mozart Arpt",
        "country": "Austria"
    },
    {
        "key": "SZJ",
        "city": "Siguanea",
        "name": "Siguanea Arpt",
        "country": "Cuba"
    },
    {
        "key": "SZK",
        "city": "Skukuza",
        "name": "Skukuza Arpt",
        "country": "South Africa"
    },
    {
        "key": "SZL",
        "city": "Warrensburg",
        "name": "Whiteman Air Force Base",
        "country": "United States"
    },
    {
        "key": "SZN",
        "city": "Santa Barbara",
        "name": "Santa Cruz Island",
        "country": "United States"
    },
    {
        "key": "SZP",
        "city": "Santa Paula",
        "name": "Santa Paula Arpt",
        "country": "United States"
    },
    {
        "key": "SZR",
        "city": "Stara Zagora",
        "name": "Stara Zagora Arpt",
        "country": "Bulgaria"
    },
    {
        "key": "SZU",
        "city": "Segou",
        "name": "SÃ©gou Airport",
        "country": "Mali"
    },
    {
        "key": "SZV",
        "city": "Suzhou",
        "name": "Suzhou Arpt",
        "country": "China"
    },
    {
        "key": "SZW",
        "city": "Schwerin",
        "name": "Parchim Arpt",
        "country": "Germany"
    },
    {
        "key": "SZX",
        "city": "Shenzhen",
        "name": "Shenzhen Arpt",
        "country": "China"
    },
    {
        "key": "SZY",
        "city": "Szymany",
        "name": "Mazury Arpt",
        "country": "Poland"
    },
    {
        "key": "SZZ",
        "city": "Szczecin",
        "name": "Goleniow Arpt",
        "country": "Poland"
    },
    {
        "key": "TAB",
        "city": "Tobago",
        "name": "Crown Point Arpt",
        "country": "Trinidad and Tobago"
    },
    {
        "key": "TAC",
        "city": "Tacloban",
        "name": "D Z Romualdez Arpt",
        "country": "Philippines"
    },
    {
        "key": "TAD",
        "city": "Pueblo",
        "name": "Las Animas Arpt",
        "country": "United States"
    },
    {
        "key": "TAE",
        "city": "Daegu",
        "name": "Daegu Arpt",
        "country": "Korea"
    },
    {
        "key": "ZUM",
        "city": "Churchhill Falls",
        "name": "Churchhill Falls Arpt",
        "country": "Canada"
    },
    {
        "key": "ZUN",
        "city": "Chicago",
        "name": "Chicago Union Railway Station",
        "country": "United States"
    },
    {
        "key": "ZVD",
        "city": "Drangedal",
        "name": "Drangedal Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZVH",
        "city": "EK",
        "name": "EK Bus Station",
        "country": "United Arab Emirates"
    },
    {
        "key": "ZVJ",
        "city": "Abu Dhabi",
        "name": "Abu Dhabi Bus Station",
        "country": "United Arab Emirates"
    },
    {
        "key": "ZVK",
        "city": "Savannakhet",
        "name": "Savannakhet Airport",
        "country": "Lao Peoples Democratic Republic"
    },
    {
        "key": "ZVM",
        "city": "Hanover",
        "name": "Hanover Messe BF Railway Stn",
        "country": "Germany"
    },
    {
        "key": "ZVR",
        "city": "Hanover",
        "name": "Hanover HBF Railway Service",
        "country": "Germany"
    },
    {
        "key": "ZWC",
        "city": "Stavanger",
        "name": "Stavanger Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZWE",
        "city": "Brussels",
        "name": "Antwerp Central Railway Stn",
        "country": "Belgium"
    },
    {
        "key": "ZWH",
        "city": "Windhoek",
        "name": "Windhoek Railway Station",
        "country": "Namibia"
    },
    {
        "key": "ZWI",
        "city": "Philadelphia",
        "name": "Wilmington Railway Station",
        "country": "United States"
    },
    {
        "key": "ZWP",
        "city": "Miami",
        "name": "West Palm Beach Railway Stn",
        "country": "United States"
    },
    {
        "key": "ZWS",
        "city": "Stuttgart",
        "name": "Stuttgart Railway Service",
        "country": "Germany"
    },
    {
        "key": "ZWU",
        "city": "Washington",
        "name": "Union Railway Station",
        "country": "United States"
    },
    {
        "key": "ZXA",
        "city": "Aberdeen",
        "name": "Aberdeen ScotRail Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZXE",
        "city": "Edinburgh",
        "name": "Edinburgh ScotRail",
        "country": "United Kingdom"
    },
    {
        "key": "ZXM",
        "city": "Bodo",
        "name": "Rognan Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZXO",
        "city": "Fauske",
        "name": "Fauske Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZXP",
        "city": "Perth",
        "name": "Scotrail",
        "country": "United Kingdom"
    },
    {
        "key": "ZXS",
        "city": "Buffalo",
        "name": "Exchange Street Railway Stn",
        "country": "United States"
    },
    {
        "key": "ZXT",
        "city": "Baku",
        "name": "Zabrat Arpt",
        "country": "Azerbaijan"
    },
    {
        "key": "ZXU",
        "city": "Rygge",
        "name": "Rygge Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZXX",
        "city": "Rade",
        "name": "Rade Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZYA",
        "city": "Amsterdam",
        "name": "Amsterdam Central Rail Station",
        "country": "Netherlands"
    },
    {
        "key": "ZYE",
        "city": "Eindhoven",
        "name": "Eindhoven Rail Station",
        "country": "Netherlands"
    },
    {
        "key": "ZYH",
        "city": "The Hague",
        "name": "The Hague Railways Station",
        "country": "Netherlands"
    },
    {
        "key": "ZYI",
        "city": "Zunyi",
        "name": "Xinzhou",
        "country": "China"
    },
    {
        "key": "ZYK",
        "city": "Shenzhen",
        "name": "Shenzhen shekou ferry",
        "country": "China"
    },
    {
        "key": "ZYL",
        "city": "Sylhet",
        "name": "Sylhet Osmany Arpt",
        "country": "Bangladesh"
    },
    {
        "key": "ZYM",
        "city": "Arnhem",
        "name": "Arnhem Rail Station",
        "country": "Netherlands"
    },
    {
        "key": "ZYN",
        "city": "Nimes",
        "name": "Nimes France Railway Station",
        "country": "France"
    },
    {
        "key": "ZYO",
        "city": "Brussels",
        "name": "Roosendaal Rail Station",
        "country": "Belgium"
    },
    {
        "key": "ZYP",
        "city": "New York",
        "name": "New York Penn Station",
        "country": "United States"
    },
    {
        "key": "ZYR",
        "city": "Brussels",
        "name": "Midi Railway Station",
        "country": "Belgium"
    },
    {
        "key": "ZYS",
        "city": "Sandefjord",
        "name": "Sandejford Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZYT",
        "city": "Maastricht",
        "name": "Maastricht Rail Station",
        "country": "Netherlands"
    },
    {
        "key": "ZYU",
        "city": "Utrecht",
        "name": "Utrecht Rail Station",
        "country": "Netherlands"
    },
    {
        "key": "ZYV",
        "city": "Vegarshei",
        "name": "Vegarshei Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZYW",
        "city": "Sandvika",
        "name": "Sandvika Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZYY",
        "city": "Marnardal",
        "name": "Marnardal Rail Station",
        "country": "Norway"
    },
    {
        "key": "ZYZ",
        "city": "Brussels",
        "name": "Antwerp Berchem Rail Station",
        "country": "Belgium"
    },
    {
        "key": "ZZU",
        "city": "Mzuzu",
        "name": "Mzuzu Airport",
        "country": "Malawi"
    },
    {
        "key": "ZZV",
        "city": "Zanesville",
        "name": "Zanesville Arpt",
        "country": "United States"
    },
    {
        "key": "GOX",
        "city": "Goa",
        "name": "Mopa international airport",
        "country": "India"
    },
    {
        "key": "CNN",
        "city": "Kannur",
        "name": "Kannur International Airport",
        "country": "India"
    },
    {
        "key": "AYJ",
        "city": "Ayodhya",
        "name": "Maharishi valmiki international airport ayodhya dham",
        "country": "India"
    },
    {
        "key": "HSR",
        "city": "Rajkot",
        "name": "Hirasar international airport",
        "country": "India"
    },
    {
        "key": "SAG",
        "city": "Shirdi",
        "name": "Shirdi",
        "country": "India"
    },
    {
        "key": "DBR",
        "city": "Darbhanga",
        "name": "Darbhanga Airport",
        "country": "India"
    },
    {
        "key": "RDP",
        "city": "Durgapur",
        "name": "Kazi Nazrul Islam Airport",
        "country": "India"
    },
    {
        "key": "JRG",
        "city": "Odisha",
        "name": "Jharsuguda Airport",
        "country": "India"
    },
    {
        "key": "DGH",
        "city": "Jharkhand",
        "name": "Deoghar international airport",
        "country": "India"
    },
    {
        "key": "KQH",
        "city": "Ajmer",
        "name": "Ajmer Airport",
        "country": "India"
    },
    {
        "key": "RQY",
        "city": "Shivamogga airport",
        "name": "Shivamogga airport",
        "country": "India"
    },
    {
        "key": "BER",
        "city": "Berlin",
        "name": "Berlin Brandenburg Airport",
        "country": "Germany"
    },
    {
        "key": "GDB",
        "city": "Gondia",
        "name": "Birsi airport gondia",
        "country": "India"
    },
    {
        "key": "HDO",
        "city": "Hindon airport",
        "name": "Ghaziabad uttar pradesh",
        "country": "India"
    },
    {
        "key": "DSS",
        "city": "Dakar",
        "name": "Blaise diagne",
        "country": "Senegal"
    },
    {
        "key": "SAI",
        "city": "Siem reap",
        "name": "Siem reap angkor international airport",
        "country": "Cambodia"
    },
    {
        "key": "SDW",
        "city": "Sindhudurg",
        "name": "Sindhudurg airport",
        "country": "India"
    },
    {
        "key": "KJB",
        "city": "Kurnool",
        "name": "Kurnool Airport",
        "country": "India"
    },
    {
        "key": "RMO",
        "city": "Chisinau",
        "name": "Chisinau international airport",
        "country": "Moldova"
    },
    {
        "key": "JLG",
        "city": "Jalgaon",
        "name": "Jalgaon Airport",
        "country": "India"
    },
    {
        "key": "NQZ",
        "city": "Yesil",
        "name": "Nursultan Nazarbayev International Airport",
        "country": "Kazakhstan"
    },
    {
        "key": "PYG",
        "city": "Pakyong",
        "name": "Pakyong",
        "country": "India"
    },
    {
        "key": "TFU",
        "city": "Chengdu",
        "name": "Chengdu tianfu international airport",
        "country": "China"
    },
    {
        "key": "PKX",
        "city": "Beijing",
        "name": "Daxing Intl",
        "country": "China"
    },
    {
        "key": "YIA",
        "city": "Java",
        "name": "Yogyakarta international airport",
        "country": "Indonesia"
    },
    {
        "key": "UBN",
        "city": "Ulaanbaatar",
        "name": "Ulaanbaatar International Airport",
        "country": "Mongolia"
    },
    {
        "key": "NNS",
        "city": "Naini saini airport pithoragarh",
        "name": "Pithoragarh",
        "country": "India"
    },
    {
        "key": "RVR",
        "city": "Green River",
        "name": "Green River Arpt",
        "country": "United States"
    },
    {
        "key": "RVS",
        "city": "Tulsa",
        "name": "Richard Lloyd Jones Jr Riverside Arpt",
        "country": "United States"
    },
    {
        "key": "RVT",
        "city": "Ravensthorpe",
        "name": "Ravensthorpe Arpt",
        "country": "Australia"
    },
    {
        "key": "RVV",
        "city": "Raivavae, Austral Islands, French Polynesia",
        "name": "Raivavae Airport",
        "country": "French Polynesia"
    },
    {
        "key": "RVY",
        "city": "Rivera",
        "name": "Rivera International Airport",
        "country": "Uruguay"
    },
    {
        "key": "RWB",
        "city": "Rowan Bay",
        "name": "Rowan Bay Arpt",
        "country": "United States"
    },
    {
        "key": "RWI",
        "city": "Rocky Mount",
        "name": "Wilson Arpt",
        "country": "United States"
    },
    {
        "key": "RWL",
        "city": "Rawlins",
        "name": "Rawlins Municipal",
        "country": "United States"
    },
    {
        "key": "RWN",
        "city": "Rovno",
        "name": "Rovno Arpt",
        "country": "Ukraine"
    },
    {
        "key": "RWS",
        "city": "Sumare",
        "name": "Sumare Arpt",
        "country": "Brazil"
    },
    {
        "key": "RXA",
        "city": "Ar Rawdah (Raudha)",
        "name": "Ar Rawdah Airport",
        "country": "Yemen"
    },
    {
        "key": "RXS",
        "city": "Roxas City",
        "name": "Roxas City Arpt",
        "country": "Philippines"
    },
    {
        "key": "RYG",
        "city": "Oslo,Moss, Norway",
        "name": "Moss Airport,Rygge/Rygge Air Station",
        "country": "Norway"
    },
    {
        "key": "RYK",
        "city": "Rahim Yar Khan",
        "name": "Rahim Yar Khan airport",
        "country": "Pakistan"
    },
    {
        "key": "RYN",
        "city": "Medis",
        "name": "Royan Medis Aerodrome",
        "country": "France"
    },
    {
        "key": "RZA",
        "city": "Puerto santa cruz",
        "name": "Airport puerto santa cruz",
        "country": "Argentina"
    },
    {
        "key": "RZE",
        "city": "Rzeszow",
        "name": "Jasionka Arpt",
        "country": "Poland"
    },
    {
        "key": "RZP",
        "city": "Taytay",
        "name": "Cesar Lim Rodriguez Airport",
        "country": "Philippines"
    },
    {
        "key": "RZR",
        "city": "Ramsar",
        "name": "Ramsar International Airport",
        "country": "Iran"
    },
    {
        "key": "RZS",
        "city": "Sawan",
        "name": "Sawan",
        "country": "Pakistan"
    },
    {
        "key": "SAA",
        "city": "Laramie",
        "name": "Lar Shively Arpt",
        "country": "United States"
    },
    {
        "key": "SAB",
        "city": "Saba Island",
        "name": "Juancho Yraus Quinl",
        "country": "Bonaire"
    },
    {
        "key": "SAC",
        "city": "Sacramento",
        "name": "Sacramento Executive Arpt",
        "country": "United States"
    },
    {
        "key": "SAD",
        "city": "Safford",
        "name": "Safford Regional Airport",
        "country": "United States"
    },
    {
        "key": "SAF",
        "city": "Santa Fe",
        "name": "Santa Fe Municipal",
        "country": "United States"
    },
    {
        "key": "SAH",
        "city": "Sanaa",
        "name": "Sanaa Intl Airport",
        "country": "Yemen"
    },
    {
        "key": "SAK",
        "city": "Saudarkrokur",
        "name": "Saudarkrokur Arpt",
        "country": "Iceland"
    },
    {
        "key": "SAL",
        "city": "San Salvador",
        "name": "Comalapa Intl Arpt",
        "country": "El Salvador"
    },
    {
        "key": "SAM",
        "city": "Salamo",
        "name": "Salamo Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "SAN",
        "city": "San Diego",
        "name": "San Diego International Arpt",
        "country": "United States"
    },
    {
        "key": "SAP",
        "city": "San Pedro Sula",
        "name": "Ramon Villeda Morales Arpt",
        "country": "Honduras"
    },
    {
        "key": "SAR",
        "city": "Sparta",
        "name": "Sparta Community Airport",
        "country": "United States"
    },
    {
        "key": "SAS",
        "city": "Salton City",
        "name": "Salton Arpt",
        "country": "United States"
    },
    {
        "key": "SAT",
        "city": "San Antonio",
        "name": "San Antonio Intl",
        "country": "United States"
    },
    {
        "key": "SAU",
        "city": "Savu (Sawu)",
        "name": "Tardamu Airport",
        "country": "Indonesia"
    },
    {
        "key": "SAV",
        "city": "Savannah",
        "name": "Savannah Intl Arpt",
        "country": "United States"
    },
    {
        "key": "SAW",
        "city": "Istanbul",
        "name": "Sabiha Gokcen Arpt",
        "country": "Turkey"
    },
    {
        "key": "SAX",
        "city": "Sambu",
        "name": "Sambu Airport",
        "country": "Panama"
    },
    {
        "key": "SAY",
        "city": "Siena",
        "name": "Siena Arpt",
        "country": "Italy"
    },
    {
        "key": "SAZ",
        "city": "Sasstown",
        "name": "Sasstown Arpt",
        "country": "Liberia"
    },
    {
        "key": "SBA",
        "city": "Santa Barbara",
        "name": "Santa Barbara Arpt",
        "country": "United States"
    },
    {
        "key": "SBC",
        "city": "Selbang",
        "name": "Selbang Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SBD",
        "city": "San Bernardino",
        "name": "San Bernardino Intl Arpt",
        "country": "United States"
    },
    {
        "key": "SBE",
        "city": "Suabi",
        "name": "Suabi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SBG",
        "city": "Sabang, Indonesia",
        "name": "Maimun Saleh Airport",
        "country": "Indonesia"
    },
    {
        "key": "SBH",
        "city": "St Barthelemy",
        "name": "St Jean Arpt",
        "country": "Guadeloupe"
    },
    {
        "key": "SBI",
        "city": "Sambailo",
        "name": "Sambailo Airport",
        "country": "Guinea"
    },
    {
        "key": "SBK",
        "city": "St Brieuc",
        "name": "Tremuson Armor Arpt",
        "country": "France"
    },
    {
        "key": "SBM",
        "city": "Sheboygan",
        "name": "Sheboygan Arpt",
        "country": "United States"
    },
    {
        "key": "SBN",
        "city": "South Bend",
        "name": "Michiana Regional Arpt",
        "country": "United States"
    },
    {
        "key": "SBO",
        "city": "Salina",
        "name": "Salina-Gunnison Airport (FAA: 44U)",
        "country": "United States"
    },
    {
        "key": "SBP",
        "city": "San Luis Obispo",
        "name": "San Luis Obispo County Arpt",
        "country": "United States"
    },
    {
        "key": "SBR",
        "city": "Saibai Island",
        "name": "Saibai Island Airport",
        "country": "Australia"
    },
    {
        "key": "SBS",
        "city": "Steamboat Springs",
        "name": "Steamboat Arpt",
        "country": "United States"
    },
    {
        "key": "SBU",
        "city": "Springbok",
        "name": "Springbok Arpt",
        "country": "South Africa"
    },
    {
        "key": "SBV",
        "city": "Kota Kinabalu",
        "name": "Sabah Airport",
        "country": "Malaysia"
    },
    {
        "key": "SBW",
        "city": "Sibu",
        "name": "Sibu Arpt",
        "country": "Malaysia"
    },
    {
        "key": "SBX",
        "city": "Shelby",
        "name": "Shelby Airport",
        "country": "United States"
    },
    {
        "key": "SBY",
        "city": "Salisbury Ocean City",
        "name": "Wicomico Regional Arpt",
        "country": "United States"
    },
    {
        "key": "SBZ",
        "city": "Sibiu",
        "name": "Sibiu Arpt",
        "country": "Romania"
    },
    {
        "key": "SCB",
        "city": "Scribner",
        "name": "Scribner State Airport",
        "country": "United States"
    },
    {
        "key": "SCC",
        "city": "Prudhoe Bay Deadhorse",
        "name": "Prudhoe Bay Deadhorse Arpt",
        "country": "United States"
    },
    {
        "key": "SCE",
        "city": "State College",
        "name": "University Park Arpt",
        "country": "United States"
    },
    {
        "key": "SCF",
        "city": "Scottsdale",
        "name": "Scottsdale Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SCH",
        "city": "Schenectady",
        "name": "Schenectady County Arpt",
        "country": "United States"
    },
    {
        "key": "SCI",
        "city": "San Crystobal",
        "name": "Aeropuerto Santo Domingo",
        "country": "Venezuela"
    },
    {
        "key": "SCK",
        "city": "Stockton",
        "name": "Stockton Metro Arpt",
        "country": "United States"
    },
    {
        "key": "SCL",
        "city": "Santiago",
        "name": "Arturo Merino Benitez",
        "country": "Chile"
    },
    {
        "key": "SCN",
        "city": "Saarbruecken",
        "name": "Ensheim Arpt",
        "country": "Germany"
    },
    {
        "key": "SCO",
        "city": "Aktau",
        "name": "Aktau Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "BPN",
        "city": "Balikpapan",
        "name": "Sepingan Arpt",
        "country": "Indonesia"
    },
    {
        "key": "AZH",
        "city": "Azamgarh city",
        "name": "Azamgarh airport",
        "country": "India"
    },
    {
        "key": "CWK",
        "city": "Chitrakoot airport",
        "name": "Chitrakoot",
        "country": "India"
    },
    {
        "key": "DQM",
        "city": "Duqm, Oman",
        "name": "Duqm International Airport",
        "country": "Oman"
    },
    {
        "key": "THD",
        "city": "Thanh HÃ³a, Vietnam",
        "name": "Tho Xuan Airport",
        "country": "Vietnam"
    },
    {
        "key": "SPX",
        "city": "Houston",
        "name": "Spacelandarpt",
        "country": "United States"
    },
    {
        "key": "DRP",
        "city": "Daraga",
        "name": "Bicol international airport",
        "country": "Philippines"
    },
    {
        "key": "VDX",
        "city": "Ghaziabad",
        "name": "Hindon Airport",
        "country": "India"
    },
    {
        "key": "DTZ",
        "city": "Dortmund",
        "name": "Dortmund central train station",
        "country": "Germany"
    },
    {
        "key": "OHS",
        "city": "Sohar",
        "name": "Sohar Airport",
        "country": "Oman"
    },
    {
        "key": "RAB",
        "city": "Rabaul",
        "name": "Tokua Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "KJT",
        "city": "Majalengka",
        "name": "Kertajati Intl",
        "country": "Indonesia"
    },
    {
        "key": "TQO",
        "city": "Quintana roo",
        "name": "Tulum felipe carillo puerto",
        "country": "Mexico"
    },
    {
        "key": "LHW",
        "city": "Lanzhou",
        "name": "Lanzhou Arpt",
        "country": "China"
    },
    {
        "key": "VSV",
        "city": "Shravasti",
        "name": "Shravasti airport",
        "country": "India"
    },
    {
        "key": "QYG",
        "city": "Germany rail st airport",
        "name": "Germany rail st airport",
        "country": "Germany"
    },
    {
        "key": "DTB",
        "city": "Siborong-Borong",
        "name": "Silangit",
        "country": "Indonesia"
    },
    {
        "key": "AAP",
        "city": "Samarinda",
        "name": "AP Tumenggung Pranoto",
        "country": "Indonesia"
    },
    {
        "key": "CDF",
        "city": "Cortina d Ampezzo",
        "name": "Fiames",
        "country": "Italy"
    },
    {
        "key": "BWX",
        "city": "Banyuwangi, Indonesia",
        "name": "Banyuwangi Airport",
        "country": "Indonesia"
    },
    {
        "key": "TUC",
        "city": "Tucuman",
        "name": "Benjamin Matienzo Airport",
        "country": "Argentina"
    },
    {
        "key": "TUD",
        "city": "Tambacounda, Senegal",
        "name": "Tambacounda Airport",
        "country": "Senegal"
    },
    {
        "key": "TUF",
        "city": "Tours",
        "name": "Saint Symphorien Arpt",
        "country": "France"
    },
    {
        "key": "TUG",
        "city": "Tuguegarao",
        "name": "Tuguegarao Arpt",
        "country": "Philippines"
    },
    {
        "key": "TUI",
        "city": "Turaif",
        "name": "Turaif Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "TUK",
        "city": "Turbat",
        "name": "Turbat Arpt",
        "country": "Pakistan"
    },
    {
        "key": "TUL",
        "city": "Tulsa",
        "name": "Tulsa Intl",
        "country": "United States"
    },
    {
        "key": "TUM",
        "city": "Bombowlee",
        "name": "Tumut Airport",
        "country": "Australia"
    },
    {
        "key": "TUN",
        "city": "Tunis",
        "name": "Carthage Arpt",
        "country": "Tunisia"
    },
    {
        "key": "TUO",
        "city": "Taupo",
        "name": "Taupo Arpt",
        "country": "New Zealand"
    },
    {
        "key": "TUP",
        "city": "Tupelo",
        "name": "C D Lemons Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "TUR",
        "city": "Tucurui",
        "name": "Tucurui Arpt",
        "country": "Brazil"
    },
    {
        "key": "TUS",
        "city": "Tucson",
        "name": "Tucson Intl Arpt",
        "country": "United States"
    },
    {
        "key": "TUU",
        "city": "Tabuk",
        "name": "Tabuk Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "TUW",
        "city": "Tallinn",
        "name": "Tubala Airport",
        "country": "Estonia"
    },
    {
        "key": "TUY",
        "city": "Tulum",
        "name": "Tulum Arpt",
        "country": "Mexico"
    },
    {
        "key": "TVC",
        "city": "Traverse City",
        "name": "Cherry Capital Arpt",
        "country": "United States"
    },
    {
        "key": "TVF",
        "city": "Thief River Falls",
        "name": "Thief River Falls Numicipal",
        "country": "United States"
    },
    {
        "key": "TVL",
        "city": "Lake Tahoe",
        "name": "Lake Tahoe Arpt",
        "country": "United States"
    },
    {
        "key": "TVS",
        "city": "Tangshan",
        "name": "Sannuhe Arpt",
        "country": "China"
    },
    {
        "key": "TVU",
        "city": "Taveuni",
        "name": "Matei Arpt",
        "country": "Fiji"
    },
    {
        "key": "TVY",
        "city": "Dawei",
        "name": "Dawei Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "TWA",
        "city": "Twin Hills",
        "name": "Twin Hills Arpt",
        "country": "United States"
    },
    {
        "key": "TWB",
        "city": "Toowoomba",
        "name": "Toowoomba Arpt",
        "country": "Australia"
    },
    {
        "key": "TWD",
        "city": "Port Townsend",
        "name": "Jefferson County International Airport (FAA: 0S9)",
        "country": "United States"
    },
    {
        "key": "TWE",
        "city": "Taylor",
        "name": "Taylor Arpt",
        "country": "United States"
    },
    {
        "key": "TWF",
        "city": "Twin Falls",
        "name": "Twin Falls City County Arpt",
        "country": "United States"
    },
    {
        "key": "TWH",
        "city": "Catalina Island",
        "name": "Two Harbors Amphibious Terminal",
        "country": "United States"
    },
    {
        "key": "TWT",
        "city": "Bongao",
        "name": "Sanga-Sanga Airport",
        "country": "Philippines"
    },
    {
        "key": "TWU",
        "city": "Tawau",
        "name": "Tawau Arpt",
        "country": "Malaysia"
    },
    {
        "key": "TWZ",
        "city": "Mount Cook",
        "name": "Pukaki Twizelarpt",
        "country": "New Zealand"
    },
    {
        "key": "TXF",
        "city": "Teixeira de Freitas, Bahia, Brazil",
        "name": "Teixeira de Freitas Airport (9 de maio Airport)",
        "country": "Brazil"
    },
    {
        "key": "TXG",
        "city": "Taichung",
        "name": "Taichung Arpt",
        "country": "Taiwan"
    },
    {
        "key": "TXK",
        "city": "Texarkana",
        "name": "Texarkana Municipal",
        "country": "United States"
    },
    {
        "key": "TXL",
        "city": "Berlin",
        "name": "Tegel Airport",
        "country": "Germany"
    },
    {
        "key": "TXM",
        "city": "Teminabuan, Indonesia",
        "name": "Teminabuan Airport",
        "country": "Indonesia"
    },
    {
        "key": "XSD",
        "city": "Tonopah",
        "name": "Test Range",
        "country": "United States"
    },
    {
        "key": "WNS",
        "city": "Nawabshah",
        "name": "Nawabshah Arpt",
        "country": "Pakistan"
    },
    {
        "key": "TXN",
        "city": "Tunxi",
        "name": "Tunxi Arpt",
        "country": "China"
    },
    {
        "key": "XSH",
        "city": "Tours",
        "name": "St Pierre Corps Rail St",
        "country": "France"
    },
    {
        "key": "WNZ",
        "city": "Wenzhou",
        "name": "Wenzhou Arpt",
        "country": "China"
    },
    {
        "key": "TYE",
        "city": "Tyonek",
        "name": "Tyonek Arpt",
        "country": "United States"
    },
    {
        "key": "XSI",
        "city": "South Indian Lake",
        "name": "South Indian Lake Airport",
        "country": "Canada"
    },
    {
        "key": "WOD",
        "city": "Wood River",
        "name": "Wood River Arpt",
        "country": "United States"
    },
    {
        "key": "TYF",
        "city": "Torsby",
        "name": "Torsby Airport",
        "country": "Sweden"
    },
    {
        "key": "XSP",
        "city": "Singapore",
        "name": "Seletar Airport",
        "country": "Singapore"
    },
    {
        "key": "WOE",
        "city": "Hoogerheide",
        "name": "Woensdrecht Air Base",
        "country": "Netherlands"
    },
    {
        "key": "TYN",
        "city": "Taiyuan",
        "name": "Taiyuan Arpt",
        "country": "China"
    },
    {
        "key": "WOL",
        "city": "Wollongong",
        "name": "Wollongong Arpt",
        "country": "Australia"
    },
    {
        "key": "TYR",
        "city": "Tyler",
        "name": "Pounds Field",
        "country": "United States"
    },
    {
        "key": "XSR",
        "city": "Salisbury",
        "name": "Salisbury Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "WOT",
        "city": "Wang",
        "name": "Wangan Airport",
        "country": "Taiwan"
    },
    {
        "key": "TYS",
        "city": "Knoxville",
        "name": "McGhee Tyson Arpt",
        "country": "United States"
    },
    {
        "key": "SCP",
        "city": "Saint-CrÃ©pin",
        "name": "Mont-Dauphin - Saint-CrÃ©pin Airport",
        "country": "France"
    },
    {
        "key": "SCQ",
        "city": "Santiago De Compostela",
        "name": "Santiago Airport",
        "country": "Spain"
    },
    {
        "key": "SCS",
        "city": "Shetland Islands Area",
        "name": "Scatsta Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SCT",
        "city": "Socotra, Yemen",
        "name": "Socotra Airport",
        "country": "Yemen"
    },
    {
        "key": "SCU",
        "city": "Santiago",
        "name": "Antonio Maceo Arpt",
        "country": "Cuba"
    },
    {
        "key": "SCV",
        "city": "Suceava",
        "name": "Salcea Arpt",
        "country": "Romania"
    },
    {
        "key": "SCW",
        "city": "Syktyvkar",
        "name": "Syktyvkar Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "SCX",
        "city": "Salina Cruz",
        "name": "Salina Cruz Arpt",
        "country": "Mexico"
    },
    {
        "key": "SCY",
        "city": "San Cristobal",
        "name": "San Cristobal Airport",
        "country": "Ecuador"
    },
    {
        "key": "SCZ",
        "city": "Santa Cruz Island",
        "name": "Santa Cruz Island Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "SDB",
        "city": "Saldanha Bay",
        "name": "Langebaanweg Arpt",
        "country": "South Africa"
    },
    {
        "key": "SDD",
        "city": "Lubango",
        "name": "Mukanka Airport",
        "country": "Angola"
    },
    {
        "key": "SDE",
        "city": "Santiago Del Estero",
        "name": "Santiago Des Estero Arpt",
        "country": "Argentina"
    },
    {
        "key": "SDF",
        "city": "Louisville",
        "name": "Louisville International Arpt",
        "country": "United States"
    },
    {
        "key": "SDJ",
        "city": "Sendai",
        "name": "Sendai Arpt",
        "country": "Japan"
    },
    {
        "key": "SDK",
        "city": "Sandakan",
        "name": "Sandakan Arpt",
        "country": "Malaysia"
    },
    {
        "key": "SDL",
        "city": "Sundsvall",
        "name": "Sundsvall Arpt",
        "country": "Sweden"
    },
    {
        "key": "SDM",
        "city": "San Diego",
        "name": "Brown Field Municipal",
        "country": "United States"
    },
    {
        "key": "SDN",
        "city": "Sandane",
        "name": "Anda Airport",
        "country": "Norway"
    },
    {
        "key": "SDP",
        "city": "Sand Point",
        "name": "Sand Point Arpt",
        "country": "United States"
    },
    {
        "key": "SDQ",
        "city": "Santo Domingo",
        "name": "Las Americas Arpt",
        "country": "Dominican Republic"
    },
    {
        "key": "SDR",
        "city": "Santander",
        "name": "Santander Airport",
        "country": "Spain"
    },
    {
        "key": "SDT",
        "city": "Kanju",
        "name": "Saidu Sharif Airport",
        "country": "Pakistan"
    },
    {
        "key": "SDU",
        "city": "Rio De Janeiro",
        "name": "Santos Dumont Arpt",
        "country": "Brazil"
    },
    {
        "key": "SDV",
        "city": "Tel Aviv",
        "name": "Dov Airport",
        "country": "Israel"
    },
    {
        "key": "SDX",
        "city": "Sedona",
        "name": "Sedona Arpt",
        "country": "United States"
    },
    {
        "key": "SDY",
        "city": "Sidney",
        "name": "Sindey Richland Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SEA",
        "city": "Seattle",
        "name": "Seattle Tacoma Intl Arpt",
        "country": "United States"
    },
    {
        "key": "SEB",
        "city": "Sabha",
        "name": "Sabha Airport",
        "country": "Libya"
    },
    {
        "key": "SED",
        "city": "Sedom",
        "name": "Minhat Hashnayim",
        "country": "Israel"
    },
    {
        "key": "SEE",
        "city": "San Diego",
        "name": "Gillespie Field",
        "country": "United States"
    },
    {
        "key": "SEF",
        "city": "Sebring",
        "name": "Air Terminal Arpt",
        "country": "United States"
    },
    {
        "key": "SEG",
        "city": "Selinsgrove",
        "name": "Penn Valley Airport",
        "country": "United States"
    },
    {
        "key": "SEM",
        "city": "SELMA",
        "name": "Craig Field",
        "country": "United States"
    },
    {
        "key": "SEN",
        "city": "Southend",
        "name": "Southend Municipal Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SEP",
        "city": "Stephenville",
        "name": "Clark Field",
        "country": "United States"
    },
    {
        "key": "SER",
        "city": "Seymour",
        "name": "Freeman Municipal",
        "country": "United States"
    },
    {
        "key": "SES",
        "city": "SELMA",
        "name": "Selfieldarpt",
        "country": "United States"
    },
    {
        "key": "SEU",
        "city": "Seronera",
        "name": "Seronera Airport",
        "country": "Tanzania"
    },
    {
        "key": "SEY",
        "city": "Selibaby",
        "name": "Selibaby Arpt",
        "country": "Mauritania"
    },
    {
        "key": "SEZ",
        "city": "Mahe Island",
        "name": "Seychelles Intl Arpt",
        "country": "Seychelles"
    },
    {
        "key": "SFA",
        "city": "Sfax",
        "name": "El Maou Airport",
        "country": "Tunisia"
    },
    {
        "key": "SFB",
        "city": "Sanford",
        "name": "Orlando Sanford Arpt",
        "country": "United States"
    },
    {
        "key": "SFC",
        "city": "Saint Francois",
        "name": "Saint Francois Airport",
        "country": "Guadeloupe"
    },
    {
        "key": "SFD",
        "city": "San Fernando De Apure",
        "name": "Las Flecheras",
        "country": "Venezuela"
    },
    {
        "key": "SFE",
        "city": "San Fernando",
        "name": "San Fernando Arpt",
        "country": "Philippines"
    },
    {
        "key": "SFF",
        "city": "Spokane",
        "name": "Felts Field",
        "country": "United States"
    },
    {
        "key": "SFG",
        "city": "St Martin",
        "name": "Esperance Airport",
        "country": "Guadeloupe"
    },
    {
        "key": "SFH",
        "city": "San Felipe",
        "name": "San Felipe Arpt",
        "country": "Mexico"
    },
    {
        "key": "SFJ",
        "city": "Kangerlussuaq",
        "name": "Sondre Stromfjord Arpt",
        "country": "Greenland"
    },
    {
        "key": "SFK",
        "city": "Soure, Para,Brazil",
        "name": "Soure Airport",
        "country": "Brazil"
    },
    {
        "key": "SFL",
        "city": "Sao Filipe",
        "name": "Sao Filipe Arpt",
        "country": "Cape Verde"
    },
    {
        "key": "SFM",
        "city": "Sanford",
        "name": "Sanford Regional Arpt",
        "country": "United States"
    },
    {
        "key": "SFN",
        "city": "Santa Fe",
        "name": "Santa Fe Arpt",
        "country": "Argentina"
    },
    {
        "key": "SFO",
        "city": "San Francisco",
        "name": "San Francisco Intl Arpt",
        "country": "United States"
    },
    {
        "key": "SFQ",
        "city": "Sanli Urfa",
        "name": "Sanli Urfa Arpt",
        "country": "Turkey"
    },
    {
        "key": "SFS",
        "city": "Subic Bay",
        "name": "Subic Bay Intl Arpt",
        "country": "Philippines"
    },
    {
        "key": "SFT",
        "city": "Skelleftea",
        "name": "Skelleftea Arpt",
        "country": "Sweden"
    },
    {
        "key": "SFU",
        "city": "Safia",
        "name": "Safia",
        "country": "Papua New Guinea"
    },
    {
        "key": "SFV",
        "city": "Santa Fe do Sul, Sao Paulo, Brazil",
        "name": "Santa Fe do Sul Airport",
        "country": "Brazil"
    },
    {
        "key": "SFX",
        "city": "San Felix",
        "name": "San Felix Arpt",
        "country": "Venezuela"
    },
    {
        "key": "SFZ",
        "city": "Smithfield",
        "name": "Smithfield Arpt",
        "country": "United States"
    },
    {
        "key": "SGB",
        "city": "Singaua",
        "name": "Singaua",
        "country": "Papua New Guinea"
    },
    {
        "key": "SGC",
        "city": "Surgut",
        "name": "Surgut Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "SGD",
        "city": "Sonderborg",
        "name": "Sonderborg Arpt",
        "country": "Denmark"
    },
    {
        "key": "SGE",
        "city": "Siegen",
        "name": "Siegerland Arpt",
        "country": "Germany"
    },
    {
        "key": "SGF",
        "city": "Springfield",
        "name": "Springfield Branson Regional Arpt",
        "country": "United States"
    },
    {
        "key": "SGH",
        "city": "Springfield",
        "name": "SPRINGFIELD AIRPORT",
        "country": "United States"
    },
    {
        "key": "SGI",
        "city": "Sargodha",
        "name": "Sargodha Arpt",
        "country": "Pakistan"
    },
    {
        "key": "SGJ",
        "city": "Sagarai",
        "name": "Sagarai Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "TAF",
        "city": "Oran",
        "name": "Tafaraoui Arpt",
        "country": "Algeria"
    },
    {
        "key": "TAG",
        "city": "Tagbilaran",
        "name": "Tagbilaran Arpt",
        "country": "Philippines"
    },
    {
        "key": "TAH",
        "city": "Tanna",
        "name": "Tanna Arpt",
        "country": "Vanuatu"
    },
    {
        "key": "TAI",
        "city": "Taiz",
        "name": "Taizz International Airport",
        "country": "Yemen"
    },
    {
        "key": "TAJ",
        "city": "Aitape",
        "name": "Tadji Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "TAK",
        "city": "Takamatsu",
        "name": "Takamatsu Arpt",
        "country": "Japan"
    },
    {
        "key": "TAL",
        "city": "Tanana",
        "name": "Ralph Calhoun Arpt",
        "country": "United States"
    },
    {
        "key": "TAM",
        "city": "Tampico",
        "name": "General F Javier Mina",
        "country": "Mexico"
    },
    {
        "key": "TAN",
        "city": "Brisbane Airport",
        "name": "Tangalooma Airport",
        "country": "Australia"
    },
    {
        "key": "TAO",
        "city": "Qingdao",
        "name": "Liuting Arpt",
        "country": "China"
    },
    {
        "key": "TAP",
        "city": "Tapachula",
        "name": "Tapachula Arpt",
        "country": "Mexico"
    },
    {
        "key": "TAR",
        "city": "Taranto",
        "name": "M A Grottag Arpt",
        "country": "Italy"
    },
    {
        "key": "TAS",
        "city": "Tashkent",
        "name": "Vostochny Arpt",
        "country": "Uzbekistan"
    },
    {
        "key": "TAT",
        "city": "Poprad Tatry",
        "name": "Poprad Tatry Arpt",
        "country": "Slovakia"
    },
    {
        "key": "TAU",
        "city": "Tauramena",
        "name": "Tauramena Arpt",
        "country": "Colombia"
    },
    {
        "key": "TAY",
        "city": "Tartu",
        "name": "Tartu Arpt",
        "country": "Estonia"
    },
    {
        "key": "TAZ",
        "city": "Dashoguz",
        "name": "Dashoguz Arpt",
        "country": "Turkmenistan"
    },
    {
        "key": "TBB",
        "city": "Tuy Hoa",
        "name": "Tuy Hoa Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "TBC",
        "city": "Tuba City",
        "name": "Tuba City Arpt",
        "country": "United States"
    },
    {
        "key": "TBG",
        "city": "Tububil",
        "name": "Tabubil Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "TBJ",
        "city": "Tabarka",
        "name": "Tabarka Arpt",
        "country": "Tunisia"
    },
    {
        "key": "TBL",
        "city": "Mueller Ranges",
        "name": "Tableland Homestead Airport",
        "country": "Australia"
    },
    {
        "key": "TBM",
        "city": "Tumbang Samba, Indonesia",
        "name": "Tumbang Samba Airport",
        "country": "Indonesia"
    },
    {
        "key": "TBN",
        "city": "Ft Leonard Wood",
        "name": "Forney Field",
        "country": "United States"
    },
    {
        "key": "TBO",
        "city": "Tabora",
        "name": "Tabora Arpt",
        "country": "Tanzania"
    },
    {
        "key": "TBP",
        "city": "Tumbes",
        "name": "Tumbes Arpt",
        "country": "Peru"
    },
    {
        "key": "TBR",
        "city": "Statesboro",
        "name": "Statesboro Bulloch County Airport",
        "country": "United States"
    },
    {
        "key": "TBS",
        "city": "Tbilisi",
        "name": "Tbilisi International Arpt",
        "country": "Georgia"
    },
    {
        "key": "TBT",
        "city": "Tabatinga",
        "name": "Tabatinga Intl Arpt",
        "country": "Brazil"
    },
    {
        "key": "TBU",
        "city": "Nuku Alofa",
        "name": "Tongatapu Intl",
        "country": "Tonga"
    },
    {
        "key": "TBW",
        "city": "Tambov",
        "name": "Tambov Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "TBZ",
        "city": "Tabriz",
        "name": "Tabriz International Arpt",
        "country": "Iran"
    },
    {
        "key": "TCA",
        "city": "Tennant Creek",
        "name": "Tennant Creek Arpt",
        "country": "Australia"
    },
    {
        "key": "TCB",
        "city": "Treasure Cay",
        "name": "Treasure Cay Arpt",
        "country": "Bahamas"
    },
    {
        "key": "TCC",
        "city": "Las Vegas",
        "name": "Tucumcari Arpt",
        "country": "United States"
    },
    {
        "key": "TCD",
        "city": "Tarapaca",
        "name": "Tarapaca Arpt",
        "country": "Colombia"
    },
    {
        "key": "TCE",
        "city": "Tulcea",
        "name": "Tulcea Arpt",
        "country": "Romania"
    },
    {
        "key": "TCF",
        "city": "La Ceiba",
        "name": "Tocoa Airport",
        "country": "Honduras"
    },
    {
        "key": "TCL",
        "city": "Tuscaloosa",
        "name": "Van De Graff Arpt",
        "country": "United States"
    },
    {
        "key": "TCM",
        "city": "Tacoma",
        "name": "McChord AFB",
        "country": "United States"
    },
    {
        "key": "TCN",
        "city": "Tehuacan",
        "name": "Tehuacan Arpt",
        "country": "Mexico"
    },
    {
        "key": "TCO",
        "city": "Tumaco",
        "name": "La Florida Arpt",
        "country": "Colombia"
    },
    {
        "key": "TCP",
        "city": "Taba",
        "name": "Ras An Naqb Arpt",
        "country": "Egypt"
    },
    {
        "key": "TCQ",
        "city": "Tacna",
        "name": "Tacna Airport",
        "country": "Peru"
    },
    {
        "key": "TCR",
        "city": "Tuticorin",
        "name": "Tuticorin Arpt",
        "country": "India"
    },
    {
        "key": "TCT",
        "city": "McGrath",
        "name": "Takotna Airport",
        "country": "United States"
    },
    {
        "key": "TCU",
        "city": "Thaba Nchu",
        "name": "Thaba Nchu Arpt",
        "country": "South Africa"
    },
    {
        "key": "TCW",
        "city": "Tocumwal",
        "name": "Tocumwal Arpt",
        "country": "Australia"
    },
    {
        "key": "TCX",
        "city": "Tabas",
        "name": "Tabas Airport",
        "country": "Iran"
    },
    {
        "key": "TCZ",
        "city": "Tengchong",
        "name": "Hump Airport",
        "country": "China"
    },
    {
        "key": "TDA",
        "city": "Piarco",
        "name": "Trinidad Airport",
        "country": "Trinidad and Tobago"
    },
    {
        "key": "TDD",
        "city": "Trinidad",
        "name": "Trinidad Arpt",
        "country": "Bolivia"
    },
    {
        "key": "TDG",
        "city": "Tandag",
        "name": "Tandag Airport",
        "country": "Philippines"
    },
    {
        "key": "TDK",
        "city": "Taldy Kurgan",
        "name": "Taldy Kurgan Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "TDL",
        "city": "Tandil",
        "name": "Tandil Arpt",
        "country": "Argentina"
    },
    {
        "key": "TDW",
        "city": "Amarillo",
        "name": "Tradewind Airport",
        "country": "United States"
    },
    {
        "key": "TDX",
        "city": "Trat",
        "name": "Trat Arpt",
        "country": "Thailand"
    },
    {
        "key": "TDZ",
        "city": "Toledo",
        "name": "Toledo Metcalf Field",
        "country": "United States"
    },
    {
        "key": "TEA",
        "city": "Tela",
        "name": "Tela Arpt",
        "country": "Honduras"
    },
    {
        "key": "TEB",
        "city": "Teterboro",
        "name": "Teterboro Arpt",
        "country": "United States"
    },
    {
        "key": "TEC",
        "city": "Telemaco Borba",
        "name": "Telemaco Borba Arpt",
        "country": "Brazil"
    },
    {
        "key": "TED",
        "city": "Thisted",
        "name": "Thisted Arpt",
        "country": "Denmark"
    },
    {
        "key": "TEH",
        "city": "Tetlin",
        "name": "Tetlin Arpt",
        "country": "United States"
    },
    {
        "key": "TEI",
        "city": "Tezu",
        "name": "Tezu Airport",
        "country": "India"
    },
    {
        "key": "TEK",
        "city": "Tatitlek",
        "name": "Tatitlek Arpt",
        "country": "United States"
    },
    {
        "key": "TEN",
        "city": "Tongren",
        "name": "Tongren Arpt",
        "country": "China"
    },
    {
        "key": "TEP",
        "city": "Teptep, Papua New Guinea",
        "name": "Teptep Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "TEQ",
        "city": "Tekirdag",
        "name": "Corlu Airport",
        "country": "Turkey"
    },
    {
        "key": "TER",
        "city": "Terceira",
        "name": "Lajes Arpt",
        "country": "Portugal"
    },
    {
        "key": "TES",
        "city": "Teseney, Eritrea",
        "name": "Teseney Airport",
        "country": "Sudan"
    },
    {
        "key": "TET",
        "city": "Tete",
        "name": "Matunda Arpt",
        "country": "Mozambique"
    },
    {
        "key": "TEU",
        "city": "Te Anau",
        "name": "Manapouri Airport",
        "country": "New Zealand"
    },
    {
        "key": "TEX",
        "city": "Telluride",
        "name": "Telluride Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "TEY",
        "city": "Thingeyri",
        "name": "Thingeyri Airport",
        "country": "Iceland"
    },
    {
        "key": "TEZ",
        "city": "Tezpur",
        "name": "Salonibari Airport",
        "country": "India"
    },
    {
        "key": "SGL",
        "city": "Manila",
        "name": "Sangley Point NAS",
        "country": "Philippines"
    },
    {
        "key": "SGN",
        "city": "Ho Chi Minh City",
        "name": "Tan Son Nhut Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "SGO",
        "city": "St George",
        "name": "St George Arpt",
        "country": "Australia"
    },
    {
        "key": "SGR",
        "city": "Sugar Land",
        "name": "Hull Field Arpt",
        "country": "United States"
    },
    {
        "key": "SGT",
        "city": "Stuttgart",
        "name": "Stuttgart Municipal",
        "country": "United States"
    },
    {
        "key": "SGU",
        "city": "St George",
        "name": "Saint George Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SGY",
        "city": "Skagway",
        "name": "Skagway Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SGZ",
        "city": "Songkhla",
        "name": "Songkhla Airport",
        "country": "Thailand"
    },
    {
        "key": "SHA",
        "city": "Shanghai",
        "name": "Hongqiao International Arpt",
        "country": "China"
    },
    {
        "key": "SHB",
        "city": "Nakashibetsu",
        "name": "Nakashibetsu Arpt",
        "country": "Japan"
    },
    {
        "key": "SHC",
        "city": "Shire Indaselassie",
        "name": "Shire Arpt",
        "country": "Ethiopia"
    },
    {
        "key": "SHD",
        "city": "Staunton",
        "name": "Shenandoah Valley Arpt",
        "country": "United States"
    },
    {
        "key": "SHE",
        "city": "Shenyang",
        "name": "Shenyang Arpt",
        "country": "China"
    },
    {
        "key": "SHG",
        "city": "Shungnak",
        "name": "Shungnak Airport",
        "country": "United States"
    },
    {
        "key": "SHH",
        "city": "Shishmaref",
        "name": "Shishmaref",
        "country": "United States"
    },
    {
        "key": "SHI",
        "city": "Miyakojima",
        "name": "Shimojishima Airport",
        "country": "Japan"
    },
    {
        "key": "SHJ",
        "city": "Sharjah",
        "name": "Sharjah Airport",
        "country": "United Arab Emirates"
    },
    {
        "key": "SHL",
        "city": "Shillong",
        "name": "Shillong Airport",
        "country": "India"
    },
    {
        "key": "SHM",
        "city": "Shirahama",
        "name": "NankiShirahama Airport",
        "country": "Japan"
    },
    {
        "key": "SHN",
        "city": "Shelton",
        "name": "Sanderson Field",
        "country": "United States"
    },
    {
        "key": "SHO",
        "city": "Lubombo eswatini",
        "name": "King mswati iii international airport",
        "country": "Swaziland"
    },
    {
        "key": "SHP",
        "city": "Qinhuangdao",
        "name": "Qinhuangdao Arpt",
        "country": "China"
    },
    {
        "key": "SHQ",
        "city": "Coombabah",
        "name": "Southport Airport",
        "country": "Australia"
    },
    {
        "key": "SHR",
        "city": "Sheridan",
        "name": "Sheridan Cty Arpt",
        "country": "United States"
    },
    {
        "key": "SHS",
        "city": "Shashi",
        "name": "Shashi Arpt",
        "country": "China"
    },
    {
        "key": "SHT",
        "city": "Shepparton",
        "name": "Shepparton",
        "country": "Australia"
    },
    {
        "key": "SHV",
        "city": "Shreveport",
        "name": "Shreveport Regional Arpt",
        "country": "United States"
    },
    {
        "key": "SHW",
        "city": "Sharurah",
        "name": "Sharurah Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "SHX",
        "city": "Shageluk",
        "name": "Shageluk Airport",
        "country": "United States"
    },
    {
        "key": "SHY",
        "city": "Shinyanga",
        "name": "Shinyanga Arpt",
        "country": "Tanzania"
    },
    {
        "key": "SIC",
        "city": "San Jose",
        "name": "San JosÃ© Airport",
        "country": "United States"
    },
    {
        "key": "SID",
        "city": "Sal Island",
        "name": "Amilcar Cabral Intl Arpt",
        "country": "Cape Verde"
    },
    {
        "key": "SIE",
        "city": "Lisboa",
        "name": "Sines Airport",
        "country": "Portugal"
    },
    {
        "key": "SIF",
        "city": "Gadhimai",
        "name": "Simara Airport",
        "country": "Nepal"
    },
    {
        "key": "SIG",
        "city": "Isla Grande",
        "name": "SIG Isla Grande Arpt",
        "country": "United States"
    },
    {
        "key": "SIH",
        "city": "Silgarhi Doti",
        "name": "Silgarhi Doti Airport",
        "country": "Nepal"
    },
    {
        "key": "SII",
        "city": "TÃ©touan",
        "name": "Sidi Ifni Airport (Sania Ramel Airport)",
        "country": "Morocco"
    },
    {
        "key": "SIK",
        "city": "Sikeston",
        "name": "Sikeston Memorial Municipal Airport",
        "country": "United States"
    },
    {
        "key": "SIL",
        "city": "Sila",
        "name": "Sila Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SIN",
        "city": "Singapore",
        "name": "Changi Intl Arpt",
        "country": "Singapore"
    },
    {
        "key": "SIO",
        "city": "Smithton",
        "name": "Smithton Airport",
        "country": "Australia"
    },
    {
        "key": "SIP",
        "city": "Simferopol",
        "name": "Simferopol Arpt",
        "country": "Ukraine"
    },
    {
        "key": "SIQ",
        "city": "Singkep, Indonesia",
        "name": "Dabo Singkep Airport",
        "country": "Indonesia"
    },
    {
        "key": "SIR",
        "city": "Sion",
        "name": "Sion Arpt",
        "country": "Switzerland"
    },
    {
        "key": "SIS",
        "city": "Dingleton, South Africa",
        "name": "Sishen Airport",
        "country": "South Africa"
    },
    {
        "key": "SIT",
        "city": "Sitka",
        "name": "Sitka Airport",
        "country": "United States"
    },
    {
        "key": "SIU",
        "city": "Siuna",
        "name": "Siuna Airport",
        "country": "Nicaragua"
    },
    {
        "key": "SIX",
        "city": "Singleton",
        "name": "Singleton Arpt",
        "country": "Australia"
    },
    {
        "key": "SIY",
        "city": "Montague",
        "name": "Yreka Rohrer Field",
        "country": "United States"
    },
    {
        "key": "SJB",
        "city": "San Joaquin",
        "name": "San JoaquÃ­n Airport",
        "country": "Bolivia"
    },
    {
        "key": "SJC",
        "city": "San Jose",
        "name": "San Jose Intl Arpt",
        "country": "United States"
    },
    {
        "key": "SJD",
        "city": "San Jose Cabo",
        "name": "Los Cabos Arpt",
        "country": "Mexico"
    },
    {
        "key": "SJE",
        "city": "San Jose Guaviare",
        "name": "San Jose Del Guaviaro Arpt",
        "country": "Colombia"
    },
    {
        "key": "SJH",
        "city": "San Juan del Cesar, Colombia",
        "name": "San Juan del Cesar Airport",
        "country": "Colombia"
    },
    {
        "key": "SJJ",
        "city": "Sarajevo",
        "name": "Butmir Arpt",
        "country": "Bosnia and Herzegovina"
    },
    {
        "key": "SJK",
        "city": "Sao Jose Dos Campos",
        "name": "Sao Jose Dos Campos Arpt",
        "country": "Brazil"
    },
    {
        "key": "SJN",
        "city": "Saint Johns",
        "name": "St. Johns Industrial Air Park",
        "country": "United States"
    },
    {
        "key": "SJO",
        "city": "San Jose",
        "name": "Juan Santa Maria Intl",
        "country": "Costa Rica"
    },
    {
        "key": "SJP",
        "city": "Sao Jose Do Rio Preto",
        "name": "Sao Jose Do Rio Preto",
        "country": "Brazil"
    },
    {
        "key": "SJR",
        "city": "San Juan de Uraba",
        "name": "San Juan de Uraba Airport",
        "country": "Colombia"
    },
    {
        "key": "SJT",
        "city": "San Angelo",
        "name": "Mathis Field",
        "country": "United States"
    },
    {
        "key": "SJU",
        "city": "San Juan",
        "name": "Luiz Munoz Marin Intl",
        "country": "United States"
    },
    {
        "key": "SJW",
        "city": "Shijiazhuang",
        "name": "Daguocun Arpt",
        "country": "China"
    },
    {
        "key": "SJX",
        "city": "Chetumal",
        "name": "Sarteneja Airport",
        "country": "Mexico"
    },
    {
        "key": "SJY",
        "city": "Seinajoki",
        "name": "Ilmajoki Arpt",
        "country": "Finland"
    },
    {
        "key": "SJZ",
        "city": "Sao Jorge Island",
        "name": "Sao Jorge Arpt",
        "country": "Portugal"
    },
    {
        "key": "SKA",
        "city": "Spokane",
        "name": "Fairchild Airforce Base",
        "country": "United States"
    },
    {
        "key": "SKB",
        "city": "St Kitts",
        "name": "Robert L Bradshaw Arpt",
        "country": "Saint Kitts and Nevis"
    },
    {
        "key": "SKC",
        "city": "Suki, Papua New Guinea",
        "name": "Suki Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SKD",
        "city": "Samarkand",
        "name": "Samarkand Arpt",
        "country": "Uzbekistan"
    },
    {
        "key": "SKE",
        "city": "Skien",
        "name": "Skien Arpt",
        "country": "Norway"
    },
    {
        "key": "UNN",
        "city": "Ranong",
        "name": "Ranong Arpt",
        "country": "Thailand"
    },
    {
        "key": "UNR",
        "city": "Chinggis",
        "name": "Ã–ndÃ¶rkhaan Airport",
        "country": "Mongolia"
    },
    {
        "key": "UNS",
        "city": "Umnak Island",
        "name": "Umnak Island Arpt",
        "country": "United States"
    },
    {
        "key": "UNT",
        "city": "Unst",
        "name": "Baltasound Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "UNU",
        "city": "Juneau",
        "name": "Dodge County Airport",
        "country": "United States"
    },
    {
        "key": "UOS",
        "city": "Louisburg",
        "name": "Franklin County Airport",
        "country": "United States"
    },
    {
        "key": "UOX",
        "city": "University Oxford",
        "name": "University Oxford",
        "country": "United States"
    },
    {
        "key": "UPB",
        "city": "Havana",
        "name": "Playa Baracoa Airport",
        "country": "Cuba"
    },
    {
        "key": "UPG",
        "city": "Ujung Pandang",
        "name": "Hasanudin Arpt",
        "country": "Indonesia"
    },
    {
        "key": "UPL",
        "city": "Upala",
        "name": "Upala Airport",
        "country": "Costa Rica"
    },
    {
        "key": "UPN",
        "city": "Uruapan",
        "name": "Uruapan Arpt",
        "country": "Mexico"
    },
    {
        "key": "UPP",
        "city": "Hawi",
        "name": "Upolu Airport",
        "country": "United States"
    },
    {
        "key": "UPR",
        "city": "Upiara",
        "name": "Upiara Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "UPV",
        "city": "Upavon",
        "name": "RAF Upavon",
        "country": "United Kingdom"
    },
    {
        "key": "URA",
        "city": "Uralsk",
        "name": "Uralsk Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "URC",
        "city": "Urumqi",
        "name": "Diwopu Intl Arpt",
        "country": "China"
    },
    {
        "key": "URD",
        "city": "Ebermannstadt",
        "name": "Burg Feuerstein Airport",
        "country": "Germany"
    },
    {
        "key": "URE",
        "city": "Kuressaare",
        "name": "Kuressaare Arpt",
        "country": "Estonia"
    },
    {
        "key": "URG",
        "city": "Uruguaina",
        "name": "Ruben Berta Arpt",
        "country": "Brazil"
    },
    {
        "key": "URJ",
        "city": "Uray",
        "name": "Uray Airport",
        "country": "Russia"
    },
    {
        "key": "URO",
        "city": "Rouen",
        "name": "Boos Airport",
        "country": "France"
    },
    {
        "key": "URR",
        "city": "Urrao",
        "name": "Urrao Arpt",
        "country": "CÃ´te dIvoire"
    },
    {
        "key": "URS",
        "city": "Kursk",
        "name": "Kursk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "URT",
        "city": "Surat Thani",
        "name": "Surat Thani Arpt",
        "country": "Thailand"
    },
    {
        "key": "URU",
        "city": "Uroubi",
        "name": "Uroubi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "URY",
        "city": "Gurayat",
        "name": "Gurayat Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "USH",
        "city": "Ushuaia",
        "name": "Islas Malvinas Arpt",
        "country": "Argentina"
    },
    {
        "key": "USI",
        "city": "Mabaruma",
        "name": "Mabaruma Airport",
        "country": "Guyana"
    },
    {
        "key": "USK",
        "city": "Usinsk",
        "name": "Usinsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "USL",
        "city": "Useless Loop",
        "name": "Useless Loop Arpt",
        "country": "Australia"
    },
    {
        "key": "USM",
        "city": "Koh Samui",
        "name": "Koh Samui Arpt",
        "country": "Thailand"
    },
    {
        "key": "USN",
        "city": "Ulsan",
        "name": "Ulsan Arpt",
        "country": "Korea"
    },
    {
        "key": "USQ",
        "city": "Usak",
        "name": "Usak",
        "country": "Turkey"
    },
    {
        "key": "USS",
        "city": "Sancti Spiritus",
        "name": "Sancti Spiritus Arpt",
        "country": "Cuba"
    },
    {
        "key": "UST",
        "city": "St Augustine",
        "name": "St Augustine Arpt",
        "country": "United States"
    },
    {
        "key": "USU",
        "city": "Busuanga",
        "name": "Busuangaarpt",
        "country": "Philippines"
    },
    {
        "key": "UTA",
        "city": "Mutare",
        "name": "Mutare Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "UTG",
        "city": "Quthing, Lesotho",
        "name": "Quthing Airport",
        "country": "Lesotho"
    },
    {
        "key": "UTH",
        "city": "Udon Thani",
        "name": "Udon Thani Arpt",
        "country": "Thailand"
    },
    {
        "key": "UTI",
        "city": "Kouvola",
        "name": "Utti Arpt",
        "country": "Finland"
    },
    {
        "key": "UTM",
        "city": "Tunica",
        "name": "Tunica Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "UTN",
        "city": "Upington",
        "name": "Upington Airport",
        "country": "South Africa"
    },
    {
        "key": "UTO",
        "city": "Utopia Creek",
        "name": "Indian Mountain LRRS Airport",
        "country": "United States"
    },
    {
        "key": "UTP",
        "city": "U Tapao",
        "name": "U Tapao Arpt",
        "country": "Thailand"
    },
    {
        "key": "UTR",
        "city": "Uttaradit",
        "name": "Uttaradit",
        "country": "Thailand"
    },
    {
        "key": "UTT",
        "city": "Umtata",
        "name": "Umtata Arpt",
        "country": "South Africa"
    },
    {
        "key": "UTU",
        "city": "Mulatupo",
        "name": "Ustupo Airport",
        "country": "Panama"
    },
    {
        "key": "UTW",
        "city": "Queenstown",
        "name": "Queenstown Airport",
        "country": "South Africa"
    },
    {
        "key": "UUA",
        "city": "Bugulma",
        "name": "Bugulma Airport",
        "country": "Russia"
    },
    {
        "key": "UUD",
        "city": "Ulan Ude",
        "name": "Ulan Ude Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "UUK",
        "city": "Kuparuk",
        "name": "Kuparuk Arpt",
        "country": "United States"
    },
    {
        "key": "UUN",
        "city": "Baruun-Urt",
        "name": "Baruun-Urt Airport",
        "country": "Mongolia"
    },
    {
        "key": "UUS",
        "city": "Yuzhno Sakhalinsk",
        "name": "Yuzhno Sakhalinsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "UVF",
        "city": "Vieux Fort St Lucia",
        "name": "Hewanorra Arpt",
        "country": "Saint Lucia"
    },
    {
        "key": "UVL",
        "city": "Kharga",
        "name": "Kharga Arpt",
        "country": "Egypt"
    },
    {
        "key": "UWA",
        "city": "Ware",
        "name": "Ware Airport (FAA: MA53)",
        "country": "United States"
    },
    {
        "key": "UYL",
        "city": "Nyala",
        "name": "Nyala Airport",
        "country": "Sudan"
    },
    {
        "key": "UYN",
        "city": "Yulin",
        "name": "Yulin Airport",
        "country": "China"
    },
    {
        "key": "UYU",
        "city": "Uyuni, Bolivia",
        "name": "Uyuni Airport (Joya Andina Airport)",
        "country": "Bolivia"
    },
    {
        "key": "UZC",
        "city": "UZICE",
        "name": "Ponikvearpt",
        "country": "Serbia"
    },
    {
        "key": "UZH",
        "city": "Unayzah",
        "name": "Unayzah Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "VAA",
        "city": "Vaasa",
        "name": "Vaasa Arpt",
        "country": "Finland"
    },
    {
        "key": "VAC",
        "city": "Varrelbusch",
        "name": "Varrelbusch",
        "country": "Germany"
    },
    {
        "key": "VAD",
        "city": "Valdosta",
        "name": "Moody AFB",
        "country": "United States"
    },
    {
        "key": "VAF",
        "city": "Valence",
        "name": "Chabeuil Airport",
        "country": "France"
    },
    {
        "key": "VAG",
        "city": "Varginha",
        "name": "Maj Brig Trompowsky Arpt",
        "country": "Brazil"
    },
    {
        "key": "VAI",
        "city": "Vanimo",
        "name": "Vanimo Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "VAL",
        "city": "ValenÃ§a, Bahia, Brazil",
        "name": "ValenÃ§a Airport",
        "country": "Brazil"
    },
    {
        "key": "VAM",
        "city": "Maamigili",
        "name": "Villa International Airport",
        "country": "Maldives"
    },
    {
        "key": "VAN",
        "city": "Van TR",
        "name": "Van Arpt",
        "country": "Turkey"
    },
    {
        "key": "VAP",
        "city": "ValparaÃ­so",
        "name": "Rodelillo Airfield",
        "country": "Chile"
    },
    {
        "key": "VAR",
        "city": "Varna",
        "name": "Varna",
        "country": "Bulgaria"
    },
    {
        "key": "VAS",
        "city": "Sivas",
        "name": "Sivas Arpt",
        "country": "Turkey"
    },
    {
        "key": "VAT",
        "city": "Vatomandry",
        "name": "Vatomandry Airport",
        "country": "Madagascar"
    },
    {
        "key": "VAU",
        "city": "Nadi",
        "name": "Vatukoula Airport",
        "country": "Fiji"
    },
    {
        "key": "TFF",
        "city": "Tefe",
        "name": "Tefe Arpt",
        "country": "Brazil"
    },
    {
        "key": "TFI",
        "city": "Tufi",
        "name": "Tufi Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "TFN",
        "city": "Tenerife",
        "name": "Tenerife Norte Los Rodeos Arpt",
        "country": "Spain"
    },
    {
        "key": "TFS",
        "city": "Tenerife",
        "name": "Reina Sofia Arpt",
        "country": "Spain"
    },
    {
        "key": "TGC",
        "city": "Tanjung Manis",
        "name": "Tanjung Manis Airport",
        "country": "Malaysia"
    },
    {
        "key": "TGD",
        "city": "Podgorica",
        "name": "Golubovci Arpt",
        "country": "Montenegro"
    },
    {
        "key": "TGE",
        "city": "Tuskegee",
        "name": "Sharpe Field",
        "country": "United States"
    },
    {
        "key": "TGG",
        "city": "Kuala Terengganu",
        "name": "Sultan Mahmood Arpt",
        "country": "Malaysia"
    },
    {
        "key": "TGH",
        "city": "Tongoa, Shefa, Vanuatu",
        "name": "Tongoa Airport",
        "country": "Vanuatu"
    },
    {
        "key": "TGK",
        "city": "Rostov",
        "name": "Taganrog Airport",
        "country": "Russia"
    },
    {
        "key": "TGM",
        "city": "Tirgu Mures",
        "name": "Tirgu Mures Arpt",
        "country": "Romania"
    },
    {
        "key": "TGN",
        "city": "Traralgon",
        "name": "La Trobe Traralgon Arpt",
        "country": "Australia"
    },
    {
        "key": "TGO",
        "city": "Tongliao",
        "name": "Tongliao Arpt",
        "country": "China"
    },
    {
        "key": "TGR",
        "city": "Touggourt",
        "name": "Sidi Mahdi Airport",
        "country": "Algeria"
    },
    {
        "key": "TGS",
        "city": "Chokwe",
        "name": "Chokwe Airport",
        "country": "Mozambique"
    },
    {
        "key": "TGT",
        "city": "Tanga",
        "name": "Tanga Arpt",
        "country": "Tanzania"
    },
    {
        "key": "TGU",
        "city": "Tegucigalpa",
        "name": "Toncontin Arpt",
        "country": "Honduras"
    },
    {
        "key": "TGV",
        "city": "Targovishte",
        "name": "Targovishte Airport (Buhovtsi Airfield)",
        "country": "Bulgaria"
    },
    {
        "key": "TGZ",
        "city": "Tuxtla Gutierrez",
        "name": "Angel Albino Corzo Intl Arpt",
        "country": "Mexico"
    },
    {
        "key": "THA",
        "city": "Tullahoma",
        "name": "Tullahoma Regional Airport",
        "country": "United States"
    },
    {
        "key": "THB",
        "city": "Thaba-Tseka",
        "name": "Thaba Tseka Airport",
        "country": "Lesotho"
    },
    {
        "key": "THC",
        "city": "Tchien",
        "name": "Tchien Arpt",
        "country": "Liberia"
    },
    {
        "key": "THE",
        "city": "Teresina",
        "name": "Teresina Arpt",
        "country": "Brazil"
    },
    {
        "key": "THG",
        "city": "Thangool",
        "name": "Thangool Arpt",
        "country": "Australia"
    },
    {
        "key": "THI",
        "city": "Tichit",
        "name": "Tichitt Airport",
        "country": "Mauritania"
    },
    {
        "key": "THL",
        "city": "Tachileik",
        "name": "Tachilek Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "THM",
        "city": "Thompson Falls",
        "name": "Thompson Falls Airport",
        "country": "United States"
    },
    {
        "key": "THN",
        "city": "Trollhattan",
        "name": "Trollhattan Arpt",
        "country": "Sweden"
    },
    {
        "key": "THO",
        "city": "Thorshofn",
        "name": "Thorshofn Airport",
        "country": "Iceland"
    },
    {
        "key": "THP",
        "city": "Thermopolis",
        "name": "Hot Springs",
        "country": "United States"
    },
    {
        "key": "THQ",
        "city": "Tianshui",
        "name": "Tianshui Maijishan Airport",
        "country": "China"
    },
    {
        "key": "THR",
        "city": "Teheran",
        "name": "Mehrabad Arpt",
        "country": "Iran"
    },
    {
        "key": "THS",
        "city": "Sukhothai",
        "name": "Sukhothai Arpt",
        "country": "Thailand"
    },
    {
        "key": "THU",
        "city": "Pituffik, Greenland",
        "name": "Thule Air Base",
        "country": "Greenland"
    },
    {
        "key": "THV",
        "city": "York",
        "name": "York Arpt",
        "country": "United States"
    },
    {
        "key": "THW",
        "city": "Trincomalee",
        "name": "Trincomalee Harbour Seaplane Base",
        "country": "Sri Lanka"
    },
    {
        "key": "THY",
        "city": "Thohoyandou",
        "name": "P R Mphephu Airport",
        "country": "South Africa"
    },
    {
        "key": "TIA",
        "city": "Tirana",
        "name": "Rinas Arpt",
        "country": "Albania"
    },
    {
        "key": "TIC",
        "city": "Tinak Island, Arno Atoll, Marshall Islands",
        "name": "Tinak Airport (FAA: N18)",
        "country": "Marshall Islands"
    },
    {
        "key": "TID",
        "city": "Tiaret",
        "name": "Abdelhafid Boussouf Bou Chekif Airport",
        "country": "Algeria"
    },
    {
        "key": "TIF",
        "city": "Taif",
        "name": "Taif Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "TIH",
        "city": "Tikehau",
        "name": "Tikehau Arpt",
        "country": "French Polynesia"
    },
    {
        "key": "TIJ",
        "city": "Tijuana",
        "name": "Gen Abelardo Rodriguez",
        "country": "Mexico"
    },
    {
        "key": "TIK",
        "city": "Oklahoma City",
        "name": "Tinker Airforce Base Arpt",
        "country": "United States"
    },
    {
        "key": "TIM",
        "city": "Timika",
        "name": "Timika Arpt",
        "country": "Indonesia"
    },
    {
        "key": "TIN",
        "city": "Tinduf",
        "name": "Tindouf Airport",
        "country": "Algeria"
    },
    {
        "key": "TIQ",
        "city": "Tinian",
        "name": "Tinian Arpt",
        "country": "Northern Mariana Islands"
    },
    {
        "key": "TIR",
        "city": "Tirupati",
        "name": "Tirupati Arpt",
        "country": "India"
    },
    {
        "key": "TIS",
        "city": "Thursday Island",
        "name": "Thursday Island Arpt",
        "country": "Australia"
    },
    {
        "key": "TIU",
        "city": "Timaru",
        "name": "Timaru Arpt",
        "country": "New Zealand"
    },
    {
        "key": "TIV",
        "city": "Tivat",
        "name": "Tivat Arpt",
        "country": "Montenegro"
    },
    {
        "key": "TIW",
        "city": "Tacoma",
        "name": "Tacoma Industrial Arpt",
        "country": "United States"
    },
    {
        "key": "TIX",
        "city": "Titusville",
        "name": "Space Center Executive Arpt",
        "country": "United States"
    },
    {
        "key": "TIZ",
        "city": "Tari",
        "name": "Tari Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "TJA",
        "city": "Tarija",
        "name": "Tarija Arpt",
        "country": "Bolivia"
    },
    {
        "key": "TJB",
        "city": "Tanjung Balai, Indonesia",
        "name": "Sei Bati Airport",
        "country": "Indonesia"
    },
    {
        "key": "TJH",
        "city": "Toyooka-shi",
        "name": "Tajima Airport",
        "country": "Japan"
    },
    {
        "key": "TJK",
        "city": "Tokat, Turkey",
        "name": "Tokat Airport",
        "country": "Turkey"
    },
    {
        "key": "TJM",
        "city": "Tyumen",
        "name": "Roshchino Tyumen Intl Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "TJN",
        "city": "Takume",
        "name": "Takume Airport",
        "country": "French Polynesia"
    },
    {
        "key": "TJQ",
        "city": "Tanjung Pandan",
        "name": "Bulutumbang Arpt",
        "country": "Indonesia"
    },
    {
        "key": "TJS",
        "city": "Tanjung Selor, Indonesia",
        "name": "Tanjung Harapan Airport",
        "country": "Indonesia"
    },
    {
        "key": "TJU",
        "city": "Kulob",
        "name": "Kulob Airport",
        "country": "Tajikistan"
    },
    {
        "key": "TJV",
        "city": "Thanjavur",
        "name": "Thanjavur Air Force Station",
        "country": "India"
    },
    {
        "key": "TKA",
        "city": "Talkeetna",
        "name": "Talkeetna Arpt",
        "country": "United States"
    },
    {
        "key": "TKC",
        "city": "Tiko",
        "name": "Tiko",
        "country": "Cameroon"
    },
    {
        "key": "TKD",
        "city": "Takoradi",
        "name": "Takoradi Airport",
        "country": "Ghana"
    },
    {
        "key": "TKF",
        "city": "Truckee",
        "name": "Truckee Arpt",
        "country": "United States"
    },
    {
        "key": "TKG",
        "city": "Bandar Lampung",
        "name": "Branti Arpt",
        "country": "Indonesia"
    },
    {
        "key": "TKI",
        "city": "Tokeen",
        "name": "Tokeen Arpt",
        "country": "United States"
    },
    {
        "key": "TKJ",
        "city": "Tok Ak",
        "name": "Tok Arpt",
        "country": "United States"
    },
    {
        "key": "TKK",
        "city": "Truk",
        "name": "Truk Arpt",
        "country": "Micronesia"
    },
    {
        "key": "TKL",
        "city": "Taku Lodge",
        "name": "Taku Spb",
        "country": "United States"
    },
    {
        "key": "SKF",
        "city": "San Antonio",
        "name": "Kelly Airforce Base",
        "country": "United States"
    },
    {
        "key": "SKG",
        "city": "Thessaloniki",
        "name": "Makedonia Arpt",
        "country": "Greece"
    },
    {
        "key": "SKH",
        "city": "Birendranagar",
        "name": "Surkhet Airport",
        "country": "Nepal"
    },
    {
        "key": "SKK",
        "city": "Shaktoolik",
        "name": "Shaktoolik Arpt",
        "country": "United States"
    },
    {
        "key": "SKL",
        "city": "Isle Of Skye Hebrides Islands",
        "name": "Broadford Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SKN",
        "city": "Stokmarknes",
        "name": "Skagen Arpt",
        "country": "Norway"
    },
    {
        "key": "SKP",
        "city": "Skopje",
        "name": "Skopje Arpt",
        "country": "Macedonia"
    },
    {
        "key": "SKS",
        "city": "Skrydstrup",
        "name": "Skrydstrup Airport",
        "country": "Denmark"
    },
    {
        "key": "SKT",
        "city": "Sialkot",
        "name": "Sialkot Arpt",
        "country": "Pakistan"
    },
    {
        "key": "SKU",
        "city": "Skiros",
        "name": "Skiros Arpt",
        "country": "Greece"
    },
    {
        "key": "SKV",
        "city": "Saint Catherine, Egypt",
        "name": "St. Catherine International Airport",
        "country": "Egypt"
    },
    {
        "key": "SKX",
        "city": "Saransk",
        "name": "Saransk Airport",
        "country": "Russia"
    },
    {
        "key": "SKZ",
        "city": "Sukkur",
        "name": "Sukkur Airport",
        "country": "Pakistan"
    },
    {
        "key": "SLA",
        "city": "Salta",
        "name": "General Belgrano Intl Arpt",
        "country": "Argentina"
    },
    {
        "key": "SLC",
        "city": "Salt Lake City",
        "name": "Salt Lake City Intl Arpt",
        "country": "United States"
    },
    {
        "key": "SLD",
        "city": "Sliac",
        "name": "Sliac Arpt",
        "country": "Slovakia"
    },
    {
        "key": "SLE",
        "city": "Salem",
        "name": "McNary Field",
        "country": "United States"
    },
    {
        "key": "SLG",
        "city": "Siloam Springs",
        "name": "Fayetteville Municipal Apt",
        "country": "United States"
    },
    {
        "key": "SLH",
        "city": "Sola, Vanua Lava, Vanuatu",
        "name": "Vanua Lava Airport",
        "country": "Vanuatu"
    },
    {
        "key": "SLI",
        "city": "Solwezi",
        "name": "Solwezi Airport",
        "country": "Zambia"
    },
    {
        "key": "SLK",
        "city": "Saranac Lake",
        "name": "Adirondack Arpt",
        "country": "United States"
    },
    {
        "key": "SLL",
        "city": "Salalah",
        "name": "Salalah Arpt",
        "country": "Oman"
    },
    {
        "key": "SLM",
        "city": "Salamanca",
        "name": "Matacan Arpt",
        "country": "Spain"
    },
    {
        "key": "SLN",
        "city": "Salina",
        "name": "Salina Municipal",
        "country": "United States"
    },
    {
        "key": "SLO",
        "city": "Salem",
        "name": "Leckrone",
        "country": "United States"
    },
    {
        "key": "SLP",
        "city": "San Luis Potosi",
        "name": "San Luis Potosi Municipal Arpt",
        "country": "Mexico"
    },
    {
        "key": "SLS",
        "city": "Silistra",
        "name": "Silistra Airfield",
        "country": "Bulgaria"
    },
    {
        "key": "SLT",
        "city": "Salida",
        "name": "Salida Arpt",
        "country": "United States"
    },
    {
        "key": "SLU",
        "city": "St Lucia",
        "name": "Vigie Field Arpt",
        "country": "Saint Lucia"
    },
    {
        "key": "SLV",
        "city": "Simla",
        "name": "Simla Arpt",
        "country": "India"
    },
    {
        "key": "SLW",
        "city": "Saltillo",
        "name": "Saltillo Arpt",
        "country": "Mexico"
    },
    {
        "key": "SLY",
        "city": "Salekhard",
        "name": "Salekhard Airport",
        "country": "Russian Federation"
    },
    {
        "key": "SLZ",
        "city": "Sao Luiz",
        "name": "Mal Cunha Machado",
        "country": "Brazil"
    },
    {
        "key": "SMA",
        "city": "Santa Maria",
        "name": "Vilo Do Porto Arpt",
        "country": "Portugal"
    },
    {
        "key": "SMD",
        "city": "Ft Wayne",
        "name": "Smith Field Airport",
        "country": "United States"
    },
    {
        "key": "SME",
        "city": "Somerset",
        "name": "Pulaski County Arpt",
        "country": "United States"
    },
    {
        "key": "SMF",
        "city": "Sacramento",
        "name": "Sacramento International",
        "country": "United States"
    },
    {
        "key": "SMG",
        "city": "Santa Maria",
        "name": "Santa MarÃ­a Airport",
        "country": "United States"
    },
    {
        "key": "SMI",
        "city": "Samos",
        "name": "Samos Arpt",
        "country": "Greece"
    },
    {
        "key": "SMJ",
        "city": "Sim",
        "name": "Sim Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SML",
        "city": "Stella Maris",
        "name": "Stella Maris Arpt",
        "country": "Bahamas"
    },
    {
        "key": "SMN",
        "city": "Salmon",
        "name": "Lemhi County Airport",
        "country": "United States"
    },
    {
        "key": "SMO",
        "city": "Los Angeles",
        "name": "Santa Monica Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SMR",
        "city": "Santa Marta",
        "name": "Simon Bolivar",
        "country": "Colombia"
    },
    {
        "key": "SMS",
        "city": "Saint Marie",
        "name": "St Marie Arpt",
        "country": "Madagascar"
    },
    {
        "key": "SMU",
        "city": "Glacier View",
        "name": "Sheep Mountain Airport",
        "country": "United States"
    },
    {
        "key": "SMV",
        "city": "St Moritz",
        "name": "Samedan Arpt",
        "country": "Switzerland"
    },
    {
        "key": "SMW",
        "city": "Samara",
        "name": "Smara Airport",
        "country": "Western Sahara"
    },
    {
        "key": "SMX",
        "city": "Santa Maria",
        "name": "Santa Maria Public Arpt",
        "country": "United States"
    },
    {
        "key": "SMZ",
        "city": "Stoelmanseiland",
        "name": "Stoelmans Eiland Airstrip",
        "country": "Suriname"
    },
    {
        "key": "SNA",
        "city": "Santa Ana",
        "name": "John Wayne Arpt",
        "country": "United States"
    },
    {
        "key": "SNC",
        "city": "Salinas",
        "name": "General Ulpiano Paez Airport",
        "country": "Ecuador"
    },
    {
        "key": "SNE",
        "city": "Sao Nicolau",
        "name": "Preguica Arpt",
        "country": "Cape Verde"
    },
    {
        "key": "SNF",
        "city": "San Felipe",
        "name": "San Felipe Airport",
        "country": "Venezuela"
    },
    {
        "key": "SNG",
        "city": "San Ignacio de Velasco",
        "name": "CapitÃ¡n Av. Juan Cochamanidis Airport",
        "country": "Bolivia"
    },
    {
        "key": "SNH",
        "city": "Stanthorpe",
        "name": "Stanthorpe",
        "country": "Australia"
    },
    {
        "key": "SNI",
        "city": "Sinoe",
        "name": "R E Murray Arpt",
        "country": "Liberia"
    },
    {
        "key": "SNL",
        "city": "Shawnee",
        "name": "Shawnee Airport",
        "country": "United States"
    },
    {
        "key": "SNN",
        "city": "Shannon",
        "name": "Shannon Arpt",
        "country": "Ireland"
    },
    {
        "key": "SNO",
        "city": "Sakon Nakhon",
        "name": "Sakon Nakhon Arpt",
        "country": "Thailand"
    },
    {
        "key": "SNQ",
        "city": "San Quintin",
        "name": "San Quintin Arpt",
        "country": "Mexico"
    },
    {
        "key": "SNR",
        "city": "St Nazaire",
        "name": "Montoir Airport",
        "country": "France"
    },
    {
        "key": "SNS",
        "city": "Salinas",
        "name": "Salinas Arpt",
        "country": "United States"
    },
    {
        "key": "SNT",
        "city": "Las Cruces",
        "name": "Las Cruces Airport",
        "country": "United States"
    },
    {
        "key": "SNU",
        "city": "Santa Clara",
        "name": "Santa Clara Arpt",
        "country": "Cuba"
    },
    {
        "key": "SNW",
        "city": "Thandwe",
        "name": "Thandwe Airport",
        "country": "Myanmar (Burma)"
    },
    {
        "key": "SNY",
        "city": "Sidney",
        "name": "Sidney Municipal",
        "country": "United States"
    },
    {
        "key": "SNZ",
        "city": "Rio de Janeiro, Rio de Janeiro, Brazil",
        "name": "Santa Cruz Air Force Base",
        "country": "Brazil"
    },
    {
        "key": "SOB",
        "city": "Saarmelleek",
        "name": "Saarmelleek Balaton Arpt",
        "country": "Hungary"
    },
    {
        "key": "SOC",
        "city": "Solo",
        "name": "Adi Sumarno Arpt",
        "country": "Indonesia"
    },
    {
        "key": "SOD",
        "city": "Sorocaba",
        "name": "Sorocaba Arpt",
        "country": "Brazil"
    },
    {
        "key": "SOF",
        "city": "Sofia",
        "name": "Sofia Vrazhdebna Arpt",
        "country": "Bulgaria"
    },
    {
        "key": "VAV",
        "city": "Vava U",
        "name": "Lupepau U Arpt",
        "country": "Tonga"
    },
    {
        "key": "VAW",
        "city": "Vardoe",
        "name": "Vardoe Luftan",
        "country": "Norway"
    },
    {
        "key": "VBG",
        "city": "Lompoc",
        "name": "Vandenberg Airforce Base",
        "country": "United States"
    },
    {
        "key": "VBS",
        "city": "Verona",
        "name": "Brescia Montichiari Arpt",
        "country": "Italy"
    },
    {
        "key": "VBV",
        "city": "Vanua Balavu",
        "name": "Vanuabalavu Airport",
        "country": "Fiji"
    },
    {
        "key": "VBY",
        "city": "Visby",
        "name": "Visby Airport",
        "country": "Sweden"
    },
    {
        "key": "VCA",
        "city": "Can Tho",
        "name": "Can Tho Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "VCD",
        "city": "Victoria River",
        "name": "Victoria River Downs Airport",
        "country": "Australia"
    },
    {
        "key": "VCE",
        "city": "Venice",
        "name": "Marco Polo Arpt",
        "country": "Italy"
    },
    {
        "key": "VCL",
        "city": "Tamky",
        "name": "Chulai Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "VCP",
        "city": "Sao Paulo",
        "name": "Viracopos Arpt",
        "country": "Brazil"
    },
    {
        "key": "VCR",
        "city": "Carora",
        "name": "Carora Airport",
        "country": "Venezuela"
    },
    {
        "key": "VCS",
        "city": "Con Dao",
        "name": "Coong Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "VCT",
        "city": "Victoria",
        "name": "Victoria Regional Arpt",
        "country": "United States"
    },
    {
        "key": "VCV",
        "city": "Victorville",
        "name": "George AFB",
        "country": "United States"
    },
    {
        "key": "VDA",
        "city": "Ovda",
        "name": "Ovda Arpt",
        "country": "Israel"
    },
    {
        "key": "VDB",
        "city": "Fagernes",
        "name": "Valdres Arpt",
        "country": "Norway"
    },
    {
        "key": "VDC",
        "city": "Vitoria Da Conquista",
        "name": "Vitoria Da Conquista Arpt",
        "country": "Brazil"
    },
    {
        "key": "VDE",
        "city": "Valverde",
        "name": "Hierro Arpt",
        "country": "Spain"
    },
    {
        "key": "VDH",
        "city": "Dong Hoi",
        "name": "Dong Hoi Airport",
        "country": "Viet Nam"
    },
    {
        "key": "VDI",
        "city": "Vidalia",
        "name": "Vidalia Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "VDM",
        "city": "Viedma",
        "name": "Viedma Arpt",
        "country": "Argentina"
    },
    {
        "key": "VDS",
        "city": "Vadso",
        "name": "Vadso",
        "country": "Norway"
    },
    {
        "key": "VDY",
        "city": "Vidyanagar",
        "name": "Vidyanagar",
        "country": "India"
    },
    {
        "key": "VDZ",
        "city": "Valdez",
        "name": "Valdez Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "VEE",
        "city": "Venetie",
        "name": "Venetie Airport",
        "country": "United States"
    },
    {
        "key": "VEL",
        "city": "Vernal",
        "name": "Vernal Municipal",
        "country": "United States"
    },
    {
        "key": "VER",
        "city": "Veracruz",
        "name": "Las Bajadas General Heriberto Jara",
        "country": "Mexico"
    },
    {
        "key": "VEY",
        "city": "Vestmannaeyjar",
        "name": "Vestmannaeyjar Arpt",
        "country": "Iceland"
    },
    {
        "key": "VFA",
        "city": "Victoria Falls",
        "name": "Victoria Falls Arpt",
        "country": "Zimbabwe"
    },
    {
        "key": "VGA",
        "city": "Vijayawada",
        "name": "Vijayawada",
        "country": "India"
    },
    {
        "key": "VGD",
        "city": "Vologda",
        "name": "Vologda Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "VGO",
        "city": "Vigo",
        "name": "Vigo Airport",
        "country": "Spain"
    },
    {
        "key": "VGS",
        "city": "General Villegas",
        "name": "General Villegas Airport",
        "country": "Argentina"
    },
    {
        "key": "VGT",
        "city": "Las Vegas",
        "name": "Las Vegas North Air Terminal",
        "country": "United States"
    },
    {
        "key": "VGZ",
        "city": "Villagarzon",
        "name": "Villagarzon Arpt",
        "country": "Colombia"
    },
    {
        "key": "VHC",
        "city": "Saurimo",
        "name": "Henrique de Carvalho Airport",
        "country": "Angola"
    },
    {
        "key": "VHM",
        "city": "Vilhelmina",
        "name": "Vilhelmina Arpt",
        "country": "Sweden"
    },
    {
        "key": "VHN",
        "city": "Van Horn",
        "name": "Culberson Cty Arpt",
        "country": "United States"
    },
    {
        "key": "VHY",
        "city": "Vichy",
        "name": "Charmeil Arpt",
        "country": "France"
    },
    {
        "key": "VHZ",
        "city": "Vahitahi, Tuamotus, French Polynesia",
        "name": "Vahitahi Airport",
        "country": "French Polynesia"
    },
    {
        "key": "VIA",
        "city": "Videira",
        "name": "Angelo Ponzoni Municipal Airport",
        "country": "Brazil"
    },
    {
        "key": "VIC",
        "city": "Vicenza",
        "name": "Vicenza Arpt",
        "country": "Italy"
    },
    {
        "key": "VIE",
        "city": "Vienna",
        "name": "Vienna Intl Arpt",
        "country": "Austria"
    },
    {
        "key": "VIF",
        "city": "Vieste",
        "name": "Vieste Arpt",
        "country": "Italy"
    },
    {
        "key": "VIG",
        "city": "El Vigia",
        "name": "El Vigia Arpt",
        "country": "Venezuela"
    },
    {
        "key": "VII",
        "city": "Vinh City",
        "name": "Vinh City Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "VIJ",
        "city": "Virgin Gorda",
        "name": "Virgin Gorda Arpt",
        "country": "Virgin Islands"
    },
    {
        "key": "VIL",
        "city": "Dakhla",
        "name": "Dakhla Airport",
        "country": "Morocco"
    },
    {
        "key": "VIN",
        "city": "Vinnitsa",
        "name": "Vinnitsa Arpt",
        "country": "Ukraine"
    },
    {
        "key": "VIR",
        "city": "Durban",
        "name": "Virginia Arpt",
        "country": "South Africa"
    },
    {
        "key": "VIS",
        "city": "Visalia",
        "name": "Visalia Municipal",
        "country": "United States"
    },
    {
        "key": "VIT",
        "city": "Vitoria",
        "name": "Vitoria Arpt",
        "country": "Spain"
    },
    {
        "key": "VIU",
        "city": "Kagau",
        "name": "Viru Harbour Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "VIX",
        "city": "Vitoria",
        "name": "Eurico Sales Arpt",
        "country": "Brazil"
    },
    {
        "key": "VIY",
        "city": "Paris",
        "name": "Villacoublay Velizy",
        "country": "France"
    },
    {
        "key": "VJB",
        "city": "Praia Do Bilene",
        "name": "Xai-Xai Airport",
        "country": "Mozambique"
    },
    {
        "key": "VJI",
        "city": "Abingdon",
        "name": "Virginia Highlands Arpt",
        "country": "United States"
    },
    {
        "key": "VJQ",
        "city": "Johannesburg",
        "name": "GurÃºÃ© Airport",
        "country": "South Africa"
    },
    {
        "key": "VKG",
        "city": "Rach Gia",
        "name": "Rach Gia Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "VKO",
        "city": "Moscow",
        "name": "Vnukovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "VKS",
        "city": "Vicksburg",
        "name": "Vicksburg Arpt",
        "country": "United States"
    },
    {
        "key": "VLA",
        "city": "Vandalia",
        "name": "Vandalia Municipal Airport",
        "country": "United States"
    },
    {
        "key": "VLC",
        "city": "Valencia",
        "name": "Valencia Arpt",
        "country": "Spain"
    },
    {
        "key": "VLD",
        "city": "Valdosta",
        "name": "Valdosta Regional",
        "country": "United States"
    },
    {
        "key": "VLE",
        "city": "Valle",
        "name": "J T Robidoux",
        "country": "United States"
    },
    {
        "key": "VLG",
        "city": "Villa Gesell",
        "name": "Villa Gesell Arpt",
        "country": "Argentina"
    },
    {
        "key": "VLI",
        "city": "Port Vila",
        "name": "Bauerfield Arpt",
        "country": "Vanuatu"
    },
    {
        "key": "VLL",
        "city": "Valladolid",
        "name": "Valladolid Arpt",
        "country": "Spain"
    },
    {
        "key": "VLN",
        "city": "Valencia",
        "name": "Valencia Airport",
        "country": "Venezuela"
    },
    {
        "key": "VLO",
        "city": "Vallejo",
        "name": "Stolport Arpt",
        "country": "United States"
    },
    {
        "key": "VLP",
        "city": "Vila Rica",
        "name": "Vila Rica",
        "country": "Brazil"
    },
    {
        "key": "VLR",
        "city": "VALLENAR",
        "name": "Vallenar Arpt",
        "country": "Chile"
    },
    {
        "key": "VLS",
        "city": "Valesdir",
        "name": "Valesdir Airport",
        "country": "Vanuatu"
    },
    {
        "key": "TKM",
        "city": "Tikal",
        "name": "El Peten Arpt",
        "country": "Guatemala"
    },
    {
        "key": "TKN",
        "city": "Tokunoshima",
        "name": "Tokunoshima Arpt",
        "country": "Japan"
    },
    {
        "key": "TKO",
        "city": "Tlokoeng, Lesotho",
        "name": "Tlokoeng Airport",
        "country": "Lesotho"
    },
    {
        "key": "TKQ",
        "city": "Kigoma",
        "name": "Kigoma Arpt",
        "country": "Tanzania"
    },
    {
        "key": "TKR",
        "city": "Thakurgaon",
        "name": "Thakurgaon",
        "country": "Bangladesh"
    },
    {
        "key": "TKS",
        "city": "Tokushima",
        "name": "Tokushima Arpt",
        "country": "Japan"
    },
    {
        "key": "TKT",
        "city": "Tak",
        "name": "Tak",
        "country": "Thailand"
    },
    {
        "key": "TKU",
        "city": "Turku",
        "name": "Turku Arpt",
        "country": "Finland"
    },
    {
        "key": "TKV",
        "city": "Tatakoto, Tuamotus, French Polynesia",
        "name": "Tatakoto Airport",
        "country": "French Polynesia"
    },
    {
        "key": "TKW",
        "city": "Tekin",
        "name": "Tekin Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "TKY",
        "city": "Warmun",
        "name": "Turkey Creek Airport",
        "country": "Australia"
    },
    {
        "key": "TLB",
        "city": "Tarbela Dam, Pakistan",
        "name": "Tarbela Dam Airport",
        "country": "Pakistan"
    },
    {
        "key": "TLC",
        "city": "Toluca",
        "name": "Morelos Arpt",
        "country": "Mexico"
    },
    {
        "key": "TLD",
        "city": "Tuli Block",
        "name": "Limpopo Valley Arpt",
        "country": "Botswana"
    },
    {
        "key": "TLE",
        "city": "Tulear",
        "name": "Tulear Arpt",
        "country": "Madagascar"
    },
    {
        "key": "TLF",
        "city": "Telida",
        "name": "Telida Arpt",
        "country": "United States"
    },
    {
        "key": "TLH",
        "city": "Tallahassee",
        "name": "Tallahassee Municipal",
        "country": "United States"
    },
    {
        "key": "TLJ",
        "city": "Tatalina",
        "name": "Tatalina Air Force Station",
        "country": "United States"
    },
    {
        "key": "TLL",
        "city": "Tallinn",
        "name": "Lennart Meri Airport",
        "country": "Estonia"
    },
    {
        "key": "TLM",
        "city": "Tlemcen",
        "name": "Zenata Messali El Hadj Airport",
        "country": "Algeria"
    },
    {
        "key": "TLN",
        "city": "Toulon",
        "name": "Le Palyvestre Arpt",
        "country": "France"
    },
    {
        "key": "TLQ",
        "city": "Turpan",
        "name": "Turpan Jiaohe Airport",
        "country": "China"
    },
    {
        "key": "TLR",
        "city": "Tulare",
        "name": "Mefford Field",
        "country": "United States"
    },
    {
        "key": "TLS",
        "city": "Toulouse",
        "name": "Blagnac Arpt",
        "country": "France"
    },
    {
        "key": "TLU",
        "city": "Tolu",
        "name": "Tolu Arpt",
        "country": "Colombia"
    },
    {
        "key": "TLV",
        "city": "Tel Aviv",
        "name": "Ben Gurion Intl Arpt",
        "country": "Israel"
    },
    {
        "key": "TMA",
        "city": "Tifton",
        "name": "Henry Tift Myers Arpt",
        "country": "United States"
    },
    {
        "key": "TMB",
        "city": "Miami",
        "name": "Tamiami Airport",
        "country": "United States"
    },
    {
        "key": "TMC",
        "city": "Tambolaka, Indonesia",
        "name": "Tambolaka Airport (Waikabubak Airport)",
        "country": "Indonesia"
    },
    {
        "key": "TME",
        "city": "Tame",
        "name": "Gabriel Vargas Santos Airport",
        "country": "Colombia"
    },
    {
        "key": "TMG",
        "city": "Tomanggong",
        "name": "Tomanggong Arpt",
        "country": "Malaysia"
    },
    {
        "key": "TMI",
        "city": "Khandbari",
        "name": "Tumlingtar Airport",
        "country": "Nepal"
    },
    {
        "key": "TMJ",
        "city": "Termez",
        "name": "Termez Airport",
        "country": "Uzbekistan"
    },
    {
        "key": "TMK",
        "city": "Tam Ká»³, Vietnam",
        "name": "Tam Ká»³ Airport",
        "country": "Vietnam"
    },
    {
        "key": "TML",
        "city": "Tamale",
        "name": "Tamale Arpt",
        "country": "Ghana"
    },
    {
        "key": "TMM",
        "city": "Tamatave",
        "name": "Tamatave Arpt",
        "country": "Madagascar"
    },
    {
        "key": "TMO",
        "city": "Tumeremo",
        "name": "Tumeremo Airport",
        "country": "Venezuela"
    },
    {
        "key": "TMP",
        "city": "Tampere",
        "name": "Tampere Pirkkala Arpt",
        "country": "Finland"
    },
    {
        "key": "TMQ",
        "city": "Tambao",
        "name": "Tambao Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "TMT",
        "city": "Trombetas",
        "name": "Trombetas Arpt",
        "country": "Brazil"
    },
    {
        "key": "TMU",
        "city": "Tambor",
        "name": "Tambor Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "TMW",
        "city": "Tamworth",
        "name": "Tamworth Arpt",
        "country": "Australia"
    },
    {
        "key": "TMX",
        "city": "Timimoun",
        "name": "Timimoun Airport",
        "country": "Algeria"
    },
    {
        "key": "TMZ",
        "city": "Thames",
        "name": "Thames Arpt",
        "country": "New Zealand"
    },
    {
        "key": "TNA",
        "city": "Jinan",
        "name": "Jinan Arpt",
        "country": "China"
    },
    {
        "key": "TNC",
        "city": "Shishmaref",
        "name": "Tin City LRRS Airport",
        "country": "United States"
    },
    {
        "key": "TND",
        "city": "Trinidad",
        "name": "Trinidad CU Arpt",
        "country": "Cuba"
    },
    {
        "key": "TNE",
        "city": "Tanega Shima",
        "name": "Tanega Shima Arpt",
        "country": "Japan"
    },
    {
        "key": "TNF",
        "city": "Toussus Le Noble",
        "name": "Toussus Le Noble Arpt",
        "country": "France"
    },
    {
        "key": "TNG",
        "city": "Tangier",
        "name": "Boukhalef Arpt",
        "country": "Morocco"
    },
    {
        "key": "TNI",
        "city": "Satna Airport",
        "name": "Satna Airport",
        "country": "India"
    },
    {
        "key": "TNJ",
        "city": "Tanjung Pinang, Indonesia",
        "name": "Raja Haji Fisabilillah Airport",
        "country": "Indonesia"
    },
    {
        "key": "TNK",
        "city": "Tununak",
        "name": "Tununak Airport (FAA: 4KA)",
        "country": "United States"
    },
    {
        "key": "TNL",
        "city": "Ternopil",
        "name": "Ternopil International Airport",
        "country": "Ukraine"
    },
    {
        "key": "TNM",
        "city": "Base Presidente Eduardo Frei Montalva",
        "name": "Marsh Airport",
        "country": "Antarctica"
    },
    {
        "key": "TNN",
        "city": "Tainan",
        "name": "Tainan Arpt",
        "country": "Taiwan"
    },
    {
        "key": "TNO",
        "city": "Tamarindo",
        "name": "Tamarindo Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "TNR",
        "city": "Antananarivo",
        "name": "Ivato Arpt",
        "country": "Madagascar"
    },
    {
        "key": "TNT",
        "city": "Miami",
        "name": "Dade Collier Arpt",
        "country": "United States"
    },
    {
        "key": "TNU",
        "city": "Newton",
        "name": "Municipal Newton Arpt",
        "country": "United States"
    },
    {
        "key": "TNX",
        "city": "Krong Stung Treng",
        "name": "Steung Treng Airport",
        "country": "Cambodia"
    },
    {
        "key": "TOA",
        "city": "Torrance",
        "name": "Zamperini Field",
        "country": "United States"
    },
    {
        "key": "TOB",
        "city": "Tobruk",
        "name": "Tobruk Arpt",
        "country": "Libya"
    },
    {
        "key": "TOD",
        "city": "Tioman",
        "name": "Tioman Arpt",
        "country": "Malaysia"
    },
    {
        "key": "TOE",
        "city": "Tozeur",
        "name": "Tozeur Arpt",
        "country": "Tunisia"
    },
    {
        "key": "TOF",
        "city": "Tomsk",
        "name": "Tomsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "TOG",
        "city": "Togiak",
        "name": "Togiak Village Arpt",
        "country": "United States"
    },
    {
        "key": "TOH",
        "city": "Torres",
        "name": "Torres Airstrip",
        "country": "Vanuatu"
    },
    {
        "key": "TOI",
        "city": "Troy",
        "name": "Troy Municipal",
        "country": "United States"
    },
    {
        "key": "TOJ",
        "city": "Madrid",
        "name": "Torrejon AFB",
        "country": "Spain"
    },
    {
        "key": "TOL",
        "city": "Toledo",
        "name": "Toledo Express Arpt",
        "country": "United States"
    },
    {
        "key": "TOM",
        "city": "Timbuktu",
        "name": "Timbuktu Airport",
        "country": "Mali"
    },
    {
        "key": "TON",
        "city": "Tonu, Papua New Guinea",
        "name": "Tonu Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SOG",
        "city": "Sogndal",
        "name": "Haukasen Arpt",
        "country": "Norway"
    },
    {
        "key": "SOI",
        "city": "South Molle",
        "name": "South Molle Island Arpt",
        "country": "Australia"
    },
    {
        "key": "SOJ",
        "city": "Sorkjosen",
        "name": "Sorkjosen",
        "country": "Norway"
    },
    {
        "key": "SOK",
        "city": "Semonkong, Lesotho",
        "name": "Semonkong Airport",
        "country": "Lesotho"
    },
    {
        "key": "SOL",
        "city": "Solomon",
        "name": "Solomon Arpt",
        "country": "United States"
    },
    {
        "key": "SOM",
        "city": "San Tome",
        "name": "El Tigre Arpt",
        "country": "Venezuela"
    },
    {
        "key": "SON",
        "city": "Espiritu Santo",
        "name": "Pekoa Arpt",
        "country": "Vanuatu"
    },
    {
        "key": "SOO",
        "city": "Soderhamn",
        "name": "Soderhamn Arpt",
        "country": "Sweden"
    },
    {
        "key": "SOP",
        "city": "Pinehurst",
        "name": "Pinehurst Arpt",
        "country": "United States"
    },
    {
        "key": "SOQ",
        "city": "Sorong",
        "name": "Jefman Arpt",
        "country": "Indonesia"
    },
    {
        "key": "SOU",
        "city": "Southampton",
        "name": "Southampton Intl Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SOV",
        "city": "Seldovia",
        "name": "Seldovia Arpt",
        "country": "United States"
    },
    {
        "key": "SOW",
        "city": "Show Low",
        "name": "Show Low Arpt",
        "country": "United States"
    },
    {
        "key": "SOY",
        "city": "Stronsay",
        "name": "Stronsay Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "SPA",
        "city": "Greenville",
        "name": "Downtown Memorial",
        "country": "United States"
    },
    {
        "key": "SPB",
        "city": "St Thomas",
        "name": "Seaplane Base",
        "country": "United States"
    },
    {
        "key": "SPC",
        "city": "Santa Cruz",
        "name": "La Palma Arpt",
        "country": "Spain"
    },
    {
        "key": "SPD",
        "city": "Saidpur",
        "name": "Saidpur Airport",
        "country": "Bangladesh"
    },
    {
        "key": "SPF",
        "city": "Spearfish",
        "name": "Black Hills Clyde Ice Field",
        "country": "United States"
    },
    {
        "key": "SPG",
        "city": "St Petersburg",
        "name": "Whitted Arpt",
        "country": "United States"
    },
    {
        "key": "SPI",
        "city": "Springfield",
        "name": "Capital Airport",
        "country": "United States"
    },
    {
        "key": "SPJ",
        "city": "Sparta",
        "name": "Sparta Arpt",
        "country": "Greece"
    },
    {
        "key": "SPM",
        "city": "Spangdahlem",
        "name": "Spangdahlem Air Base",
        "country": "Germany"
    },
    {
        "key": "SPN",
        "city": "Saipan",
        "name": "Saipan Intl",
        "country": "Northern Mariana Islands"
    },
    {
        "key": "SPP",
        "city": "Menongue",
        "name": "Menongue Airport",
        "country": "Angola"
    },
    {
        "key": "SPR",
        "city": "San Pedro",
        "name": "San Pedro Arpt",
        "country": "Belize"
    },
    {
        "key": "SPS",
        "city": "Wichita Falls",
        "name": "Wichita Falls Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SPU",
        "city": "Split",
        "name": "Split Arpt",
        "country": "Croatia"
    },
    {
        "key": "SPW",
        "city": "Spencer",
        "name": "Spencer Municipal",
        "country": "United States"
    },
    {
        "key": "SPZ",
        "city": "Springdale",
        "name": "Springdale Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SQA",
        "city": "Santa Ynez",
        "name": "Santa Ynez Arpt",
        "country": "United States"
    },
    {
        "key": "SQC",
        "city": "Southern Cross",
        "name": "Southern Cross Airport",
        "country": "Australia"
    },
    {
        "key": "SQG",
        "city": "Sintang, Indonesia",
        "name": "Sintang Airport (Susilo Airport)",
        "country": "Indonesia"
    },
    {
        "key": "SQH",
        "city": "Son La",
        "name": "Na San Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "SQI",
        "city": "Sterling",
        "name": "Whiteside Cty Municipal",
        "country": "United States"
    },
    {
        "key": "SQK",
        "city": "Sidi Barani",
        "name": "Sidi Barani Airport",
        "country": "Egypt"
    },
    {
        "key": "SQL",
        "city": "San Carlos",
        "name": "San Carlos Arpt",
        "country": "United States"
    },
    {
        "key": "SQN",
        "city": "Sanana Island, Indonesia",
        "name": "Sanana Airport",
        "country": "Indonesia"
    },
    {
        "key": "SQO",
        "city": "Storuman",
        "name": "Gunnarn Arpt",
        "country": "Sweden"
    },
    {
        "key": "SQQ",
        "city": "Å iauliai",
        "name": "Å iauliai International Airport",
        "country": "Lithuania"
    },
    {
        "key": "SQT",
        "city": "Samarai",
        "name": "China Strait Airstrip",
        "country": "Papua New Guinea"
    },
    {
        "key": "SQV",
        "city": "Sequim",
        "name": "Sequim Valley Airport (FAA: W28)",
        "country": "United States"
    },
    {
        "key": "SQW",
        "city": "Skive",
        "name": "Skive Arpt",
        "country": "Denmark"
    },
    {
        "key": "SQZ",
        "city": "Scampton",
        "name": "RAF Scampton",
        "country": "United Kingdom"
    },
    {
        "key": "SRB",
        "city": "Santa Rosa",
        "name": "Santa Rosa Airport",
        "country": "United States"
    },
    {
        "key": "SRC",
        "city": "Searcy",
        "name": "Searcy Arpt",
        "country": "United States"
    },
    {
        "key": "SRE",
        "city": "Sucre",
        "name": "Sucre Arpt",
        "country": "Bolivia"
    },
    {
        "key": "SRG",
        "city": "Semarang",
        "name": "Achmad Uani Arpt",
        "country": "Indonesia"
    },
    {
        "key": "SRH",
        "city": "Sarh",
        "name": "Sarh",
        "country": "Chad"
    },
    {
        "key": "SRI",
        "city": "Samarinda",
        "name": "Temindung Airport",
        "country": "Indonesia"
    },
    {
        "key": "SRJ",
        "city": "San Borja",
        "name": "Capitan German Quiroga Guardia Airport",
        "country": "Bolivia"
    },
    {
        "key": "SRL",
        "city": "Santa Rosalia",
        "name": "Santa Rosalia Arpt",
        "country": "Mexico"
    },
    {
        "key": "SRM",
        "city": "Melbourne Airport",
        "name": "Sandringham Station Airport",
        "country": "Australia"
    },
    {
        "key": "SRN",
        "city": "Strahan",
        "name": "Strahan Arpt",
        "country": "Australia"
    },
    {
        "key": "SRO",
        "city": "Santana Ramos",
        "name": "Santana Ramos Airport",
        "country": "Colombia"
    },
    {
        "key": "SRP",
        "city": "Stord",
        "name": "Stord Arpt",
        "country": "Norway"
    },
    {
        "key": "SRQ",
        "city": "Sarasota",
        "name": "Sarasota Bradenton Arpt",
        "country": "United States"
    },
    {
        "key": "SRT",
        "city": "Soroti",
        "name": "Soroti",
        "country": "Uganda"
    },
    {
        "key": "SRV",
        "city": "Aniak",
        "name": "Stony River Airport",
        "country": "United States"
    },
    {
        "key": "SRX",
        "city": "Sert",
        "name": "Gardabya Airport",
        "country": "Libya"
    },
    {
        "key": "SRY",
        "city": "Sari",
        "name": "Dasht-e Naz Airport",
        "country": "Iran"
    },
    {
        "key": "SRZ",
        "city": "Santa Cruz",
        "name": "El Trompillo Arpt",
        "country": "Bolivia"
    },
    {
        "key": "SSA",
        "city": "Salvador",
        "name": "Luis E Magalhaes Arpt",
        "country": "Brazil"
    },
    {
        "key": "SSB",
        "city": "St Croix",
        "name": "Soesterberg Seeplane Base",
        "country": "United States"
    },
    {
        "key": "SSC",
        "city": "Sumter",
        "name": "Shaw Air Force Base",
        "country": "United States"
    },
    {
        "key": "SSE",
        "city": "Sholapur",
        "name": "Solapur Airport",
        "country": "India"
    },
    {
        "key": "SSF",
        "city": "San Antonio",
        "name": "Stinson Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SSG",
        "city": "Malabo",
        "name": "Santa Isabel Arpt",
        "country": "Equatorial Guinea"
    },
    {
        "key": "SSH",
        "city": "Sharm El Sheik",
        "name": "Sharm el Sheikh INTL Airport",
        "country": "Egypt"
    },
    {
        "key": "SSI",
        "city": "St Simons Is",
        "name": "McKinnon Arpt",
        "country": "United States"
    },
    {
        "key": "SSJ",
        "city": "Sandnessjoen",
        "name": "Stokka Arpt",
        "country": "Norway"
    },
    {
        "key": "SSN",
        "city": "Seoul",
        "name": "Seoul Ab",
        "country": "Korea"
    },
    {
        "key": "SSQ",
        "city": "La Sarre",
        "name": "La Sarre Rail Station",
        "country": "Canada"
    },
    {
        "key": "VLV",
        "city": "Valera",
        "name": "Carvajal Arpt",
        "country": "Venezuela"
    },
    {
        "key": "VLY",
        "city": "Anglesey",
        "name": "Anglesey Airport / RAF Valley",
        "country": "United Kingdom"
    },
    {
        "key": "VME",
        "city": "Villa Mercedes",
        "name": "Villa Mercedes Arpt",
        "country": "Argentina"
    },
    {
        "key": "VMI",
        "city": "Vallemi",
        "name": "Inc Arpt",
        "country": "Paraguay"
    },
    {
        "key": "VMU",
        "city": "Balimuru",
        "name": "BALIMO AIRPORT",
        "country": "Papua New Guinea"
    },
    {
        "key": "VNA",
        "city": "Salavan",
        "name": "Salavan Airport",
        "country": "Laos"
    },
    {
        "key": "VNC",
        "city": "Venice",
        "name": "Venice Municipal Airport",
        "country": "United States"
    },
    {
        "key": "VND",
        "city": "Vangaindrano",
        "name": "Vangaindrano Airport",
        "country": "Madagascar"
    },
    {
        "key": "VNE",
        "city": "Vannes",
        "name": "Muecon Arpt",
        "country": "France"
    },
    {
        "key": "VNO",
        "city": "Vilnius",
        "name": "Vilnius Arpt",
        "country": "Lithuania"
    },
    {
        "key": "VNR",
        "city": "Vanrook Station, Queensland",
        "name": "Vanrook Airport",
        "country": "Australia"
    },
    {
        "key": "VNS",
        "city": "Varanasi",
        "name": "Lal Bahadur Shastri Arpt",
        "country": "India"
    },
    {
        "key": "VNT",
        "city": "Ventspils",
        "name": "Ventspils Intl Arpt",
        "country": "Latvia"
    },
    {
        "key": "VNX",
        "city": "Vilanculos",
        "name": "Vilanculos Arpt",
        "country": "Mozambique"
    },
    {
        "key": "VNY",
        "city": "Los Angeles",
        "name": "Van Nuys Arpt",
        "country": "United States"
    },
    {
        "key": "VNZ",
        "city": "Vicenza",
        "name": "Vicenza Railway Station",
        "country": "Italy"
    },
    {
        "key": "VOG",
        "city": "Volgograd",
        "name": "Volgograd Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "VOL",
        "city": "Volos",
        "name": "Nea Anchialos Arpt",
        "country": "Greece"
    },
    {
        "key": "VOT",
        "city": "Votuporanga, SÃ£o Paulo, Brazil",
        "name": "Votuporanga Airport (Domingos Pignatari Airport)",
        "country": "Brazil"
    },
    {
        "key": "VOZ",
        "city": "Voronezh",
        "name": "Voronezh Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "VPG",
        "city": "Vipingo",
        "name": "Vipingo Airport",
        "country": "Kenya"
    },
    {
        "key": "VPN",
        "city": "Vopnafjorour",
        "name": "Vopnafjorour Airport",
        "country": "Iceland"
    },
    {
        "key": "VPS",
        "city": "Valparaiso",
        "name": "Ft Walton Beach Arpt",
        "country": "United States"
    },
    {
        "key": "VPY",
        "city": "Chimoio",
        "name": "Chimoio Airport",
        "country": "Mozambique"
    },
    {
        "key": "VPZ",
        "city": "Valparaiso",
        "name": "Porter County",
        "country": "United States"
    },
    {
        "key": "VQS",
        "city": "Vieques",
        "name": "Vieques Arpt",
        "country": "United States"
    },
    {
        "key": "VRA",
        "city": "Varadero",
        "name": "Juan Gualberto Gomez Arpt",
        "country": "Cuba"
    },
    {
        "key": "VRB",
        "city": "Vero Beach",
        "name": "Vero Beach Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "VRC",
        "city": "Virac",
        "name": "Virac Airport",
        "country": "Philippines"
    },
    {
        "key": "VRK",
        "city": "Varkaus",
        "name": "Varkaus",
        "country": "Finland"
    },
    {
        "key": "VRL",
        "city": "Vila Real",
        "name": "Vila Real Arpt",
        "country": "Portugal"
    },
    {
        "key": "VRN",
        "city": "Verona",
        "name": "Verona Airport",
        "country": "Italy"
    },
    {
        "key": "VRO",
        "city": "Matanzas",
        "name": "Kawama Arpt",
        "country": "Cuba"
    },
    {
        "key": "VRS",
        "city": "Versailles",
        "name": "Versailles",
        "country": "United States"
    },
    {
        "key": "VSA",
        "city": "Villahermosa",
        "name": "Capt Carlos Rovirosa Perez",
        "country": "Mexico"
    },
    {
        "key": "VSE",
        "city": "Viseu",
        "name": "Viseu Airport",
        "country": "Portugal"
    },
    {
        "key": "VSF",
        "city": "Springfield",
        "name": "Hartness State Airport",
        "country": "United States"
    },
    {
        "key": "VSG",
        "city": "Lugansk",
        "name": "Lugansk Arpt",
        "country": "Ukraine"
    },
    {
        "key": "VST",
        "city": "Stockholm",
        "name": "Hasslo Airport",
        "country": "Sweden"
    },
    {
        "key": "VTB",
        "city": "Vitebsk",
        "name": "Vitebsk Arpt",
        "country": "Belarus"
    },
    {
        "key": "VTE",
        "city": "Vientiane",
        "name": "Wattay Arpt",
        "country": "Lao Peoples Democratic Republic"
    },
    {
        "key": "VTG",
        "city": "Vung Tau",
        "name": "Vung Tau",
        "country": "Vietnam"
    },
    {
        "key": "VTM",
        "city": "Beer Sheva",
        "name": "Nevatim Airbase",
        "country": "Israel"
    },
    {
        "key": "VTZ",
        "city": "Vishakhapatanam",
        "name": "Vishakhapatnam",
        "country": "India"
    },
    {
        "key": "VUP",
        "city": "Valleduper",
        "name": "Valledupar Arpt",
        "country": "Colombia"
    },
    {
        "key": "VUS",
        "city": "Veliky Ustyug, Vologda Oblast, Russia",
        "name": "Veliky Ustyug Airport",
        "country": "Russia"
    },
    {
        "key": "VUU",
        "city": "Nkopola",
        "name": "Mvuu Camp Airport",
        "country": "Malawi"
    },
    {
        "key": "VVB",
        "city": "Mahanoro",
        "name": "Mahanoro",
        "country": "Madagascar"
    },
    {
        "key": "VVC",
        "city": "Villavicencio",
        "name": "La Vanguardia Arpt",
        "country": "Colombia"
    },
    {
        "key": "VVI",
        "city": "Santa Cruz",
        "name": "Viru Viru Intl Arpt",
        "country": "Bolivia"
    },
    {
        "key": "VVN",
        "city": "Stanley",
        "name": "Las Malvinas Airport",
        "country": "Falkland Islands (Islas Malvinas)"
    },
    {
        "key": "VVO",
        "city": "Vladivostok",
        "name": "Vladivostok Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "VVZ",
        "city": "Illizi",
        "name": "Takhamalt Arpt",
        "country": "Algeria"
    },
    {
        "key": "VXC",
        "city": "Lichinga",
        "name": "Lichinga Airport",
        "country": "Mozambique"
    },
    {
        "key": "VXE",
        "city": "Sao Vicente",
        "name": "San Pedro Airport",
        "country": "Cape Verde"
    },
    {
        "key": "VXO",
        "city": "Vaxjo",
        "name": "Vaxjo Airport",
        "country": "Sweden"
    },
    {
        "key": "VYD",
        "city": "Vryheid",
        "name": "Vryheid Arpt",
        "country": "South Africa"
    },
    {
        "key": "VYS",
        "city": "Peru",
        "name": "Illinois Valley Regional Arpt",
        "country": "United States"
    },
    {
        "key": "WAD",
        "city": "Andriamena",
        "name": "Andriamena Airport",
        "country": "Madagascar"
    },
    {
        "key": "WAE",
        "city": "Wadi Al Dawaser",
        "name": "Wadi Al Dawaser Airport",
        "country": "Saudi Arabia"
    },
    {
        "key": "WAG",
        "city": "Wanganui",
        "name": "Wanganui Arpt",
        "country": "New Zealand"
    },
    {
        "key": "WAL",
        "city": "Chincoteague",
        "name": "Wallops Arpt",
        "country": "United States"
    },
    {
        "key": "WAM",
        "city": "Ambatondrazaka",
        "name": "Ambatondrazaka Airport",
        "country": "Madagascar"
    },
    {
        "key": "WAT",
        "city": "Waterford",
        "name": "Waterford Arpt",
        "country": "Ireland"
    },
    {
        "key": "WAV",
        "city": "Gurindji",
        "name": "Wave Hill Airport",
        "country": "Australia"
    },
    {
        "key": "WAW",
        "city": "Warsaw",
        "name": "Warsaw Intl Arpt",
        "country": "Poland"
    },
    {
        "key": "WAZ",
        "city": "Warwick",
        "name": "Warwick Arpt",
        "country": "Australia"
    },
    {
        "key": "WBB",
        "city": "Stebbins",
        "name": "Stebbins Airport",
        "country": "United States"
    },
    {
        "key": "WBG",
        "city": "Jagel",
        "name": "Schleswig Air Base",
        "country": "Germany"
    },
    {
        "key": "WBI",
        "city": "Boulder",
        "name": "Broker Inn",
        "country": "United States"
    },
    {
        "key": "WBM",
        "city": "Wapenamanda",
        "name": "Wapenamanda Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "WBQ",
        "city": "Beaver",
        "name": "Beaver Airport",
        "country": "United States"
    },
    {
        "key": "TOP",
        "city": "Topeka",
        "name": "Phillip Billard Arpt",
        "country": "United States"
    },
    {
        "key": "TOR",
        "city": "Torrington",
        "name": "Torrington Minicipal Arpt",
        "country": "United States"
    },
    {
        "key": "TOS",
        "city": "Tromso",
        "name": "Tromso Langnes Arpt",
        "country": "Norway"
    },
    {
        "key": "TOV",
        "city": "Beef Island",
        "name": "Tortola British Virgin Isles",
        "country": "Virgin Islands"
    },
    {
        "key": "TOW",
        "city": "Toledo",
        "name": "Toledo Arpt",
        "country": "Brazil"
    },
    {
        "key": "TOX",
        "city": "Tobolsk",
        "name": "Tobolsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "TOY",
        "city": "Toyama",
        "name": "Toyama Arpt",
        "country": "Japan"
    },
    {
        "key": "TPA",
        "city": "Tampa",
        "name": "Tampa Intl",
        "country": "United States"
    },
    {
        "key": "TPE",
        "city": "Taipei",
        "name": "Taiwan Taoyuan Intl Arpt",
        "country": "Taiwan"
    },
    {
        "key": "TPF",
        "city": "Tampa",
        "name": "Peter O Knight Arpt",
        "country": "United States"
    },
    {
        "key": "TPG",
        "city": "Taiping",
        "name": "Taiping Airport",
        "country": "Malaysia"
    },
    {
        "key": "TPH",
        "city": "Tonopah",
        "name": "Tonopah Arpt",
        "country": "United States"
    },
    {
        "key": "TPJ",
        "city": "Taplejung",
        "name": "Taplejung Airport",
        "country": "Nepal"
    },
    {
        "key": "TPL",
        "city": "Temple",
        "name": "Temple Arpt",
        "country": "United States"
    },
    {
        "key": "TPN",
        "city": "Tiputini",
        "name": "Tiputini Airport",
        "country": "Ecuador"
    },
    {
        "key": "TPO",
        "city": "Tanalian Point",
        "name": "Tanalian Point Arpt",
        "country": "United States"
    },
    {
        "key": "TPP",
        "city": "Tarapoto",
        "name": "Cad. FAP Guillermo del Castillo Paredes Airport",
        "country": "Peru"
    },
    {
        "key": "TPQ",
        "city": "Tepic",
        "name": "Tepic Arpt",
        "country": "Mexico"
    },
    {
        "key": "TPR",
        "city": "Tom Price",
        "name": "Tom Price",
        "country": "Australia"
    },
    {
        "key": "TPS",
        "city": "Trapani",
        "name": "Birgi Arpt",
        "country": "Italy"
    },
    {
        "key": "TPT",
        "city": "Tapeta",
        "name": "Tapeta Airport",
        "country": "Liberia"
    },
    {
        "key": "TPU",
        "city": "Tikapur",
        "name": "Tikapur",
        "country": "Nepal"
    },
    {
        "key": "TPX",
        "city": "TÅ«pai, Society Islands",
        "name": "Tupai Airport",
        "country": "French Polynesia"
    },
    {
        "key": "TQD",
        "city": "Fallujah, Iraq",
        "name": "Al-Taqaddum Air Base",
        "country": "Iraq"
    },
    {
        "key": "TQR",
        "city": "San Domino Island",
        "name": "San Domino Island Arpt",
        "country": "Italy"
    },
    {
        "key": "TRA",
        "city": "Tarama-son",
        "name": "Tarama Airport",
        "country": "Japan"
    },
    {
        "key": "TRB",
        "city": "Turbo",
        "name": "Gonzalo Arpt",
        "country": "Colombia"
    },
    {
        "key": "TRC",
        "city": "Torreon",
        "name": "Francisco Sarabia Arpt",
        "country": "Mexico"
    },
    {
        "key": "TRD",
        "city": "Trondheim",
        "name": "Trondheim Vaernes Arpt",
        "country": "Norway"
    },
    {
        "key": "TRE",
        "city": "Tiree",
        "name": "Tiree Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "TRF",
        "city": "Oslo",
        "name": "Sandefjord Arpt",
        "country": "Norway"
    },
    {
        "key": "TRG",
        "city": "Tauranga",
        "name": "Tauranga Arpt",
        "country": "New Zealand"
    },
    {
        "key": "TRH",
        "city": "Trona",
        "name": "Trona Arpt",
        "country": "United States"
    },
    {
        "key": "TRI",
        "city": "Bristol",
        "name": "Tri City Regional Arpt",
        "country": "United States"
    },
    {
        "key": "TRJ",
        "city": "Tarakbits",
        "name": "Tarakbits Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "TRK",
        "city": "Tarakan",
        "name": "Tarakan Arpt",
        "country": "Indonesia"
    },
    {
        "key": "TRL",
        "city": "Terrell",
        "name": "Terrell Field Arpt",
        "country": "United States"
    },
    {
        "key": "TRM",
        "city": "Thermal",
        "name": "Thermal Airport",
        "country": "United States"
    },
    {
        "key": "TRN",
        "city": "Turin",
        "name": "Torino Caselle Arpt",
        "country": "Italy"
    },
    {
        "key": "TRO",
        "city": "Taree",
        "name": "Taree Arpt",
        "country": "Australia"
    },
    {
        "key": "TRR",
        "city": "Trincomalee, Sri Lanka",
        "name": "China Bay Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "TRS",
        "city": "Trieste",
        "name": "Ronchi Dei Legionari Arpt",
        "country": "Italy"
    },
    {
        "key": "TRU",
        "city": "Trujillo",
        "name": "Trujillo Arpt",
        "country": "Peru"
    },
    {
        "key": "TRV",
        "city": "Thiruvananthapuram",
        "name": "Thiruvananthapuram Arpt",
        "country": "India"
    },
    {
        "key": "TRW",
        "city": "Tarawa",
        "name": "Bonriki Arpt",
        "country": "Kiribati"
    },
    {
        "key": "TRY",
        "city": "Tororo",
        "name": "Tororo Airport",
        "country": "Uganda"
    },
    {
        "key": "TRZ",
        "city": "Tiruchirappali",
        "name": "Tiruchirapally Civil Arpt",
        "country": "India"
    },
    {
        "key": "TSA",
        "city": "Taipei",
        "name": "Song Shan Arpt",
        "country": "Taiwan"
    },
    {
        "key": "TSE",
        "city": "Astana",
        "name": "Astana Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "TSF",
        "city": "Treviso",
        "name": "Treviso Arpt",
        "country": "Italy"
    },
    {
        "key": "TSH",
        "city": "Tshikapa",
        "name": "Tshikapa Airport",
        "country": "Democratic Republic of the Congo"
    },
    {
        "key": "TSJ",
        "city": "Tsushima",
        "name": "Tsushima Arpt",
        "country": "Japan"
    },
    {
        "key": "TSM",
        "city": "Taos",
        "name": "Taos Airport",
        "country": "United States"
    },
    {
        "key": "TSN",
        "city": "Tianjin",
        "name": "Tianjin Airport",
        "country": "China"
    },
    {
        "key": "TSO",
        "city": "Isles Of Scilly",
        "name": "Tresco Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "TSP",
        "city": "Tehachapi",
        "name": "Tehachapi Municipal Airport",
        "country": "United States"
    },
    {
        "key": "TSR",
        "city": "Timisoara",
        "name": "Timisoara Arpt",
        "country": "Romania"
    },
    {
        "key": "TSS",
        "city": "New York",
        "name": "East 34th St Hlpt",
        "country": "United States"
    },
    {
        "key": "TST",
        "city": "Trang",
        "name": "Trang Arpt",
        "country": "Thailand"
    },
    {
        "key": "TSV",
        "city": "Townsville",
        "name": "Townsville Arpt",
        "country": "Australia"
    },
    {
        "key": "TTA",
        "city": "Tan-Tan, Morocco",
        "name": "Tan Tan Airport(Plage Blanche Airport)",
        "country": "Morocco"
    },
    {
        "key": "TTB",
        "city": "Tortoli",
        "name": "Arbatax Arpt",
        "country": "Italy"
    },
    {
        "key": "TTD",
        "city": "Troutdale",
        "name": "Troutdale Arpt",
        "country": "United States"
    },
    {
        "key": "TTE",
        "city": "Ternate",
        "name": "Babullah Airport",
        "country": "Indonesia"
    },
    {
        "key": "TTH",
        "city": "Thumrait",
        "name": "RAFO Thumrait",
        "country": "Oman"
    },
    {
        "key": "TTI",
        "city": "Tetiaroa, Society Islands, French Polynesia",
        "name": "Tetiaroa Airport",
        "country": "French Polynesia"
    },
    {
        "key": "TTJ",
        "city": "Tottori",
        "name": "Tottori Arpt",
        "country": "Japan"
    },
    {
        "key": "TTN",
        "city": "Trenton",
        "name": "Trenton Mercer Arpt",
        "country": "United States"
    },
    {
        "key": "TTO",
        "city": "Britton",
        "name": "Britton Municipal Airport",
        "country": "United States"
    },
    {
        "key": "TTQ",
        "city": "Tortuquero",
        "name": "Tortuquero Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "TTR",
        "city": "Tana Toraja, Indonesia",
        "name": "Pongtiku Airport",
        "country": "Indonesia"
    },
    {
        "key": "TTT",
        "city": "Taitung",
        "name": "Taitung Arpt",
        "country": "Taiwan"
    },
    {
        "key": "TTU",
        "city": "Tetuan",
        "name": "Sania Ramel",
        "country": "Morocco"
    },
    {
        "key": "TUB",
        "city": "Tubuai, French Polynesia",
        "name": "Tubuai â€“ Mataura Airport",
        "country": "French Polynesia"
    },
    {
        "key": "SSR",
        "city": "Sara",
        "name": "Sara Airport",
        "country": "Vanuatu"
    },
    {
        "key": "SST",
        "city": "Santa Teresita",
        "name": "Santa Teresita Airport",
        "country": "Argentina"
    },
    {
        "key": "SSV",
        "city": "Siasi",
        "name": "Siasi Airport",
        "country": "Philippines"
    },
    {
        "key": "SSY",
        "city": "Mbanza-Kongo",
        "name": "Mbanza Congo Airport",
        "country": "Angola"
    },
    {
        "key": "SSZ",
        "city": "Santos",
        "name": "Santos Arpt",
        "country": "Brazil"
    },
    {
        "key": "STA",
        "city": "Skjern",
        "name": "Stauning Vestjylland Airport",
        "country": "Denmark"
    },
    {
        "key": "STB",
        "city": "Santa Barbara",
        "name": "Las Delicias Arpt",
        "country": "Venezuela"
    },
    {
        "key": "STC",
        "city": "Saint Cloud",
        "name": "Saint Cloud Municipal",
        "country": "United States"
    },
    {
        "key": "STD",
        "city": "Santo Domingo",
        "name": "Mayor Humberto Vivas Guerrero Arpt",
        "country": "Venezuela"
    },
    {
        "key": "STE",
        "city": "Stevens Point",
        "name": "Stevens Point Municipal",
        "country": "United States"
    },
    {
        "key": "STG",
        "city": "St George Island",
        "name": "St George Island Arpt",
        "country": "United States"
    },
    {
        "key": "STI",
        "city": "Santiago",
        "name": "Santiago Municipal",
        "country": "Dominican Republic"
    },
    {
        "key": "STJ",
        "city": "St Joseph",
        "name": "Rosecrans Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "STL",
        "city": "St Louis",
        "name": "Lambert St Louis Intl",
        "country": "United States"
    },
    {
        "key": "STM",
        "city": "Santarem",
        "name": "Eduardo Gomes Arpt",
        "country": "Brazil"
    },
    {
        "key": "STN",
        "city": "London",
        "name": "Stansted Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "STP",
        "city": "St Paul",
        "name": "Downtown St Paul Arpt",
        "country": "United States"
    },
    {
        "key": "STR",
        "city": "Stuttgart",
        "name": "Stuttgart Arpt",
        "country": "Germany"
    },
    {
        "key": "STS",
        "city": "Santa Rosa",
        "name": "Sonoma Cty Arpt",
        "country": "United States"
    },
    {
        "key": "STT",
        "city": "St Thomas",
        "name": "Cyril E King Arpt",
        "country": "United States"
    },
    {
        "key": "STV",
        "city": "Surat",
        "name": "Surat Airport",
        "country": "India"
    },
    {
        "key": "STW",
        "city": "Stavropol",
        "name": "Stavropol Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "STX",
        "city": "St Croix",
        "name": "Alexander Hamilton Arpt",
        "country": "United States"
    },
    {
        "key": "STY",
        "city": "Salto",
        "name": "Salto Arpt",
        "country": "Uruguay"
    },
    {
        "key": "SUA",
        "city": "Stuart",
        "name": "Witham Field",
        "country": "United States"
    },
    {
        "key": "SUB",
        "city": "Surabaya",
        "name": "Juanda Arpt",
        "country": "Indonesia"
    },
    {
        "key": "SUD",
        "city": "Stroud",
        "name": "Stroud Municipal Airport",
        "country": "United States"
    },
    {
        "key": "SUE",
        "city": "Sturgeon Bay",
        "name": "Door Country Arpt",
        "country": "United States"
    },
    {
        "key": "SUF",
        "city": "Lamezia Terme",
        "name": "S Eufemia Arpt",
        "country": "Italy"
    },
    {
        "key": "SUG",
        "city": "Surigao",
        "name": "Surigao Airport",
        "country": "Philippines"
    },
    {
        "key": "SUH",
        "city": "Sur Om",
        "name": "Sur Arpt",
        "country": "Oman"
    },
    {
        "key": "SUI",
        "city": "Sukhumi, Georgia",
        "name": "Sukhumi Babushara Airport (Dranda Airport)",
        "country": "Georgia"
    },
    {
        "key": "SUJ",
        "city": "Satu Mare",
        "name": "Satu Mare Arpt",
        "country": "Romania"
    },
    {
        "key": "SUM",
        "city": "Sumter",
        "name": "Sumter Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SUN",
        "city": "Sun Valley",
        "name": "Friedman Memorial",
        "country": "United States"
    },
    {
        "key": "SUO",
        "city": "Sunriver",
        "name": "Sunriver Airport (FAA: S21)",
        "country": "United States"
    },
    {
        "key": "SUR",
        "city": "Summer Beaver",
        "name": "Summer Beaver Airport",
        "country": "Canada"
    },
    {
        "key": "SUS",
        "city": "St Louis",
        "name": "Spirit Of St Louis Arpt",
        "country": "United States"
    },
    {
        "key": "SUT",
        "city": "Sumbawanga",
        "name": "Sumbawanga Airport",
        "country": "Tanzania"
    },
    {
        "key": "SUU",
        "city": "Fairfield",
        "name": "Travis AFB",
        "country": "United States"
    },
    {
        "key": "SUV",
        "city": "Suva",
        "name": "Nausori Airport",
        "country": "Fiji"
    },
    {
        "key": "SUW",
        "city": "Superior",
        "name": "Richard I Bong Arpt",
        "country": "United States"
    },
    {
        "key": "SUX",
        "city": "Sioux City",
        "name": "Sioux Gateway Arpt",
        "country": "United States"
    },
    {
        "key": "SVA",
        "city": "Savoonga",
        "name": "Savoonga Airport",
        "country": "United States"
    },
    {
        "key": "SVB",
        "city": "Sambava",
        "name": "Sambava Arpt",
        "country": "Madagascar"
    },
    {
        "key": "SVC",
        "city": "Silver City",
        "name": "Grant County Airport",
        "country": "United States"
    },
    {
        "key": "SVD",
        "city": "St Vincent",
        "name": "Arnos Vale Arpt",
        "country": "Saint Vincent and the Grenadines"
    },
    {
        "key": "SVE",
        "city": "Susanville",
        "name": "Susanville Municipal Airport",
        "country": "United States"
    },
    {
        "key": "SVF",
        "city": "SavÃ©, Benin",
        "name": "SavÃ© Airport",
        "country": "Sweden"
    },
    {
        "key": "SVG",
        "city": "Stavanger",
        "name": "Sola Airport",
        "country": "Norway"
    },
    {
        "key": "SVH",
        "city": "Statesville",
        "name": "Statesville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "SVI",
        "city": "San Vincent",
        "name": "San Vincente Del Caguan",
        "country": "Colombia"
    },
    {
        "key": "SVJ",
        "city": "Svolvaer",
        "name": "Helle",
        "country": "Norway"
    },
    {
        "key": "SVK",
        "city": "Morganton",
        "name": "Silver Creek Airport",
        "country": "United States"
    },
    {
        "key": "SVL",
        "city": "Savonlinna",
        "name": "Savonlinna Arpt",
        "country": "Finland"
    },
    {
        "key": "SVN",
        "city": "Savannah",
        "name": "Hunter AAF",
        "country": "United States"
    },
    {
        "key": "SVO",
        "city": "Moscow",
        "name": "Sheremetyevo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "SVP",
        "city": "Kuito",
        "name": "Kuito Airport",
        "country": "Angola"
    },
    {
        "key": "SVQ",
        "city": "Sevilla",
        "name": "San Pablo Arpt",
        "country": "Spain"
    },
    {
        "key": "SVS",
        "city": "Stevens Village",
        "name": "Stevens Village Airport",
        "country": "United States"
    },
    {
        "key": "SVT",
        "city": "Savuti, Botswana",
        "name": "Savuti Airport",
        "country": "Botswana"
    },
    {
        "key": "SVU",
        "city": "Savusavu",
        "name": "Savusavu Airport",
        "country": "Fiji"
    },
    {
        "key": "SVW",
        "city": "Sparrevohn",
        "name": "Sparrevohn Af",
        "country": "United States"
    },
    {
        "key": "SVX",
        "city": "Ekaterinburg",
        "name": "Koltsovo Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "SVY",
        "city": "Savo Island",
        "name": "Savo Airport",
        "country": "Solomon Islands"
    },
    {
        "key": "SVZ",
        "city": "San Antonio",
        "name": "San Antonio Arpt",
        "country": "Venezuela"
    },
    {
        "key": "SWA",
        "city": "Shantou",
        "name": "Shantou Airport",
        "country": "China"
    },
    {
        "key": "SWD",
        "city": "Seward",
        "name": "Seward Airport",
        "country": "United States"
    },
    {
        "key": "SWE",
        "city": "Siwea",
        "name": "Siwea Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "SWF",
        "city": "Newburgh",
        "name": "Stewart Airport",
        "country": "United States"
    },
    {
        "key": "XQL",
        "city": "Blackpool",
        "name": "Lancaster Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XQP",
        "city": "Quepos",
        "name": "Quepos Arpt",
        "country": "Costa Rica"
    },
    {
        "key": "WBU",
        "city": "Boulder",
        "name": "Boulder Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "WBW",
        "city": "Scranton",
        "name": "Wilkes Barre Wyoming Valley Arpt",
        "country": "United States"
    },
    {
        "key": "WCR",
        "city": "Chandalar",
        "name": "Chandalar Arpt",
        "country": "United States"
    },
    {
        "key": "WDG",
        "city": "Enid",
        "name": "Woodring Municipal",
        "country": "United States"
    },
    {
        "key": "WDH",
        "city": "Windhoek",
        "name": "Hosea Kutako International Arpt",
        "country": "Namibia"
    },
    {
        "key": "WDY",
        "city": "Kodiak",
        "name": "Kodiak Fss",
        "country": "United States"
    },
    {
        "key": "WEA",
        "city": "Weatherford",
        "name": "Parker County Airport",
        "country": "United States"
    },
    {
        "key": "WEF",
        "city": "Weifang",
        "name": "Weifang",
        "country": "China"
    },
    {
        "key": "WEH",
        "city": "Weihai",
        "name": "Dashuibo Arpt",
        "country": "China"
    },
    {
        "key": "WEI",
        "city": "Weipa",
        "name": "Weipa Arpt",
        "country": "Australia"
    },
    {
        "key": "WEL",
        "city": "Welkom",
        "name": "Welkom Arpt",
        "country": "South Africa"
    },
    {
        "key": "WEP",
        "city": "Weam",
        "name": "Weam Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "WEW",
        "city": "Wee Waa",
        "name": "Wee Waa Airport",
        "country": "Australia"
    },
    {
        "key": "WFB",
        "city": "Ketchikan",
        "name": "Ketchikan Harbor Seaplane Base",
        "country": "United States"
    },
    {
        "key": "WFD",
        "city": "Woodford, England, United Kingdom",
        "name": "Woodford Aerodrome",
        "country": "United Kingdom"
    },
    {
        "key": "WFK",
        "city": "Frenchville",
        "name": "Northern Aroostook Regional Airport (FAA: FVE)",
        "country": "United States"
    },
    {
        "key": "WGA",
        "city": "Wagga Wagga",
        "name": "Forrest Hill Arpt",
        "country": "Australia"
    },
    {
        "key": "WGC",
        "city": "Warangal",
        "name": "Warangalairport",
        "country": "India"
    },
    {
        "key": "WGE",
        "city": "Walgett",
        "name": "Walgett Arpt",
        "country": "Australia"
    },
    {
        "key": "WGN",
        "city": "Shaoyang, Hunan",
        "name": "Shaoyang Wugang Airport",
        "country": "China"
    },
    {
        "key": "WGO",
        "city": "Winchester",
        "name": "Winchester Arpt",
        "country": "United States"
    },
    {
        "key": "WGP",
        "city": "Waingapu, Indonesia",
        "name": "Mau Hau Airport",
        "country": "Indonesia"
    },
    {
        "key": "WGT",
        "city": "Wangaratta",
        "name": "Wangaratta",
        "country": "Australia"
    },
    {
        "key": "WHD",
        "city": "Hyder",
        "name": "Seaplane Base Airpot",
        "country": "United States"
    },
    {
        "key": "WHF",
        "city": "Wadi Halfa, Sudan",
        "name": "Wadi Halfa Airport",
        "country": "Egypt"
    },
    {
        "key": "WHH",
        "city": "Boulder",
        "name": "Hiltons Har H",
        "country": "United States"
    },
    {
        "key": "WHK",
        "city": "Whakatane",
        "name": "Whakatane Arpt",
        "country": "New Zealand"
    },
    {
        "key": "WHL",
        "city": "Welshpool",
        "name": "Welshpool Arpt",
        "country": "Australia"
    },
    {
        "key": "WHO",
        "city": "Franz Josef Glacier",
        "name": "Franz Josef Glacier Aerodrome",
        "country": "New Zealand"
    },
    {
        "key": "WHP",
        "city": "Los Angeles",
        "name": "Whiteman Arpt",
        "country": "United States"
    },
    {
        "key": "WHS",
        "city": "Whalsay, Scotland, United Kingdom",
        "name": "Whalsay Airstrip",
        "country": "United Kingdom"
    },
    {
        "key": "WHU",
        "city": "Wuhu",
        "name": "Wuhu Airport",
        "country": "China"
    },
    {
        "key": "WIC",
        "city": "Wick",
        "name": "Wick Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "WIE",
        "city": "Wiesbaden",
        "name": "Air Base",
        "country": "Germany"
    },
    {
        "key": "WIK",
        "city": "Auckland",
        "name": "Waiheke Island Aerodrome",
        "country": "New Zealand"
    },
    {
        "key": "WIL",
        "city": "Nairobi",
        "name": "Wilson Airport",
        "country": "Kenya"
    },
    {
        "key": "WJA",
        "city": "Woja, Ailinglaplap Atoll, Marshall Islands",
        "name": "Woja Airport",
        "country": "Marshall Islands"
    },
    {
        "key": "WJF",
        "city": "Lancaster",
        "name": "Williams J Fox Arpt",
        "country": "United States"
    },
    {
        "key": "WJR",
        "city": "Wajir",
        "name": "Wajir Airport",
        "country": "Kenya"
    },
    {
        "key": "WKA",
        "city": "Wanaka",
        "name": "Wanaka Arpt",
        "country": "New Zealand"
    },
    {
        "key": "WKF",
        "city": "Waterkloof",
        "name": "Waterkloof Airport Fawk",
        "country": "South Africa"
    },
    {
        "key": "WKJ",
        "city": "Wakkanai",
        "name": "Hokkaido Arpt",
        "country": "Japan"
    },
    {
        "key": "WKR",
        "city": "Walkers Cay, Abaco Islands, Bahamas",
        "name": "Walkers Cay Airport",
        "country": "The Bahamas"
    },
    {
        "key": "WLB",
        "city": "Labouchere Bay",
        "name": "Labouchere Bay Arpt",
        "country": "United States"
    },
    {
        "key": "WLD",
        "city": "Winfield",
        "name": "Arkansas City Arpt",
        "country": "United States"
    },
    {
        "key": "WLG",
        "city": "Wellington",
        "name": "Wellington Arpt",
        "country": "New Zealand"
    },
    {
        "key": "WLK",
        "city": "Selawik",
        "name": "Selawik Arpt",
        "country": "United States"
    },
    {
        "key": "WLM",
        "city": "Waltham",
        "name": "Waltham",
        "country": "United States"
    },
    {
        "key": "XQU",
        "city": "Qualicum",
        "name": "Qualicum Arpt",
        "country": "Canada"
    },
    {
        "key": "WLO",
        "city": "Waterloo",
        "name": "Waterloo Airport",
        "country": "United States"
    },
    {
        "key": "XRC",
        "city": "Chester",
        "name": "Runcorn Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "WLW",
        "city": "WILLOWS",
        "name": "GLENN COUNTY ARPT",
        "country": "United States"
    },
    {
        "key": "XRF",
        "city": "Marseille",
        "name": "Marseille Rail Station",
        "country": "France"
    },
    {
        "key": "WMA",
        "city": "Mandritsara",
        "name": "Mandritsara Airport",
        "country": "Madagascar"
    },
    {
        "key": "XRG",
        "city": "Rugeley",
        "name": "Rugeley Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "WMC",
        "city": "Winnemucca",
        "name": "Winnemucca Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "XRH",
        "city": "Richmond",
        "name": "RAAF Base Richmond",
        "country": "Australia"
    },
    {
        "key": "WMH",
        "city": "Mountain Home",
        "name": "Mountain Home Arpt",
        "country": "United States"
    },
    {
        "key": "XRJ",
        "city": "Rome",
        "name": "Terminal Railway Station",
        "country": "Italy"
    },
    {
        "key": "WMI",
        "city": "Warsaw",
        "name": "Warsaw Modlin Airport",
        "country": "Poland"
    },
    {
        "key": "XRK",
        "city": "Moscow",
        "name": "Paveletskiy Rail Station",
        "country": "Russian Federation"
    },
    {
        "key": "WML",
        "city": "Malaimbandy, Madagascar",
        "name": "Malaimbandy Airport",
        "country": "Madagascar"
    },
    {
        "key": "XRP",
        "city": "Riviere A Pierre",
        "name": "Pine Ridge Rail Station",
        "country": "Canada"
    },
    {
        "key": "WMR",
        "city": "Mananara Avaratra",
        "name": "Mananara Nord Airport",
        "country": "Madagascar"
    },
    {
        "key": "XRU",
        "city": "Rugby",
        "name": "Rugby Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "WNH",
        "city": "Wenshan",
        "name": "Wenshan Puzhehei Airport",
        "country": "China"
    },
    {
        "key": "XRY",
        "city": "Jerez De La Frontera",
        "name": "La Parra Arpt",
        "country": "Spain"
    },
    {
        "key": "WNP",
        "city": "Naga",
        "name": "Naga Arpt",
        "country": "Philippines"
    },
    {
        "key": "XSC",
        "city": "South Caicos",
        "name": "South Caicos Intl Arpt",
        "country": "Turks and Caicos Islands"
    },
    {
        "key": "WNR",
        "city": "Windorah",
        "name": "Windorah Arpt",
        "country": "Australia"
    },
    {
        "key": "PEI",
        "city": "Pereira",
        "name": "Matecana Arpt",
        "country": "Colombia"
    },
    {
        "key": "PEJ",
        "city": "Peschiei",
        "name": "Peschiei Arpt",
        "country": "Italy"
    },
    {
        "key": "PEK",
        "city": "Beijing",
        "name": "Beijing Capital Arpt",
        "country": "China"
    },
    {
        "key": "PEM",
        "city": "Puerto Maldonado",
        "name": "Puerto Maldonado Arpt",
        "country": "Peru"
    },
    {
        "key": "PEN",
        "city": "Penang",
        "name": "Penang Intl Arpt",
        "country": "Malaysia"
    },
    {
        "key": "PEQ",
        "city": "PECOS",
        "name": "Pecos Arpt",
        "country": "United States"
    },
    {
        "key": "PER",
        "city": "Perth",
        "name": "Perth Arpt",
        "country": "Australia"
    },
    {
        "key": "PES",
        "city": "Petrozavodsk",
        "name": "Petrozavodsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "PET",
        "city": "Pelotas",
        "name": "Pelotas Federal Arpt",
        "country": "Brazil"
    },
    {
        "key": "PEV",
        "city": "Pecs",
        "name": "Pecs Arpt",
        "country": "Hungary"
    },
    {
        "key": "PEW",
        "city": "Peshawar",
        "name": "Peshawar Arpt",
        "country": "Pakistan"
    },
    {
        "key": "PEX",
        "city": "Pechora",
        "name": "Pechora Airport",
        "country": "Russia"
    },
    {
        "key": "PEZ",
        "city": "Penza",
        "name": "Penza Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "PFB",
        "city": "Passo Fundo",
        "name": "Passo Fundo Arpt",
        "country": "Brazil"
    },
    {
        "key": "PFD",
        "city": "Port Frederick",
        "name": "Port Frederick Arpt",
        "country": "United States"
    },
    {
        "key": "WOW",
        "city": "Willow",
        "name": "Willow Arpt",
        "country": "United States"
    },
    {
        "key": "WPA",
        "city": "Puerto Aisen",
        "name": "Puerto Aisen Arpt",
        "country": "Chile"
    },
    {
        "key": "WPB",
        "city": "Mampikony",
        "name": "Port BergÃ© Airport",
        "country": "Madagascar"
    },
    {
        "key": "WPM",
        "city": "Wipim",
        "name": "Wipim Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "WPO",
        "city": "Paonia",
        "name": "North Fork Valley Arpt",
        "country": "United States"
    },
    {
        "key": "WRB",
        "city": "Macon",
        "name": "Robins Airforce Base",
        "country": "United States"
    },
    {
        "key": "WRE",
        "city": "Whangarei",
        "name": "Whangarei Arpt",
        "country": "New Zealand"
    },
    {
        "key": "WRG",
        "city": "Wrangell",
        "name": "Wrangell Seaplane Base",
        "country": "United States"
    },
    {
        "key": "WRI",
        "city": "McGuire Air Force Base",
        "name": "McGuire Air Force Base",
        "country": "United States"
    },
    {
        "key": "WRL",
        "city": "Worland",
        "name": "Worland Municipal",
        "country": "United States"
    },
    {
        "key": "WRO",
        "city": "Wroclaw",
        "name": "Strachowice",
        "country": "Poland"
    },
    {
        "key": "WRY",
        "city": "Westray",
        "name": "Westray Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "WRZ",
        "city": "Weerawila, Sri Lanka",
        "name": "Weerawila Airport",
        "country": "Sri Lanka"
    },
    {
        "key": "WSB",
        "city": "Steamboat Bay",
        "name": "Seaplane",
        "country": "United States"
    },
    {
        "key": "WSF",
        "city": "Saricheff",
        "name": "Saricheff Airport",
        "country": "United States"
    },
    {
        "key": "WSG",
        "city": "Washington",
        "name": "WASHINGTON COUNTY ARPT",
        "country": "United States"
    },
    {
        "key": "WSH",
        "city": "Brookhaven",
        "name": "Brookhaven Airport",
        "country": "United States"
    },
    {
        "key": "WSM",
        "city": "Wiseman",
        "name": "Wiseman Arpt",
        "country": "United States"
    },
    {
        "key": "WSN",
        "city": "Naknek",
        "name": "South Naknek Airport",
        "country": "United States"
    },
    {
        "key": "WSR",
        "city": "Wasior, Indonesia",
        "name": "Wasior Airport",
        "country": "Indonesia"
    },
    {
        "key": "WST",
        "city": "Westerly",
        "name": "Westerly Municipal",
        "country": "United States"
    },
    {
        "key": "WSX",
        "city": "East Sound",
        "name": "Westsound Seaplane Base",
        "country": "United States"
    },
    {
        "key": "WSZ",
        "city": "Westport",
        "name": "Westport Airport",
        "country": "New Zealand"
    },
    {
        "key": "WTD",
        "city": "West End",
        "name": "West End Airport",
        "country": "The Bahamas"
    },
    {
        "key": "WTL",
        "city": "Tuntutuliak",
        "name": "Tuntutuliak Airport (FAA: A61)",
        "country": "United States"
    },
    {
        "key": "WTR",
        "city": "Whiteriver",
        "name": "Whiteriver Arpt",
        "country": "United States"
    },
    {
        "key": "WUA",
        "city": "Wuhai",
        "name": "Wuhai Airport",
        "country": "China"
    },
    {
        "key": "WUH",
        "city": "Wuhan",
        "name": "Wuhan Arpt",
        "country": "China"
    },
    {
        "key": "WUM",
        "city": "Wasum",
        "name": "Wasum Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "WUN",
        "city": "Wiluna",
        "name": "Wiluna Arpt",
        "country": "Australia"
    },
    {
        "key": "WUS",
        "city": "Wuyishan",
        "name": "Wuyishan Arpt",
        "country": "China"
    },
    {
        "key": "WUU",
        "city": "Wau City",
        "name": "Wau Arpt",
        "country": "South Sudan"
    },
    {
        "key": "WUX",
        "city": "Wuxi",
        "name": "Wuxi Arpt",
        "country": "China"
    },
    {
        "key": "WVB",
        "city": "Walvis Bay",
        "name": "Rooikop Arpt",
        "country": "Namibia"
    },
    {
        "key": "WVI",
        "city": "Watsonville",
        "name": "Watsonville Municipal Arpt",
        "country": "United States"
    },
    {
        "key": "WVK",
        "city": "Manakara",
        "name": "Manakara",
        "country": "Madagascar"
    },
    {
        "key": "WVL",
        "city": "Waterville",
        "name": "Robert La Fleur Arpt",
        "country": "United States"
    },
    {
        "key": "WVN",
        "city": "Wilhelmshaven",
        "name": "Wilhelmshaven Arpt",
        "country": "Germany"
    },
    {
        "key": "WWA",
        "city": "Wasilla",
        "name": "Wasilla Arpt",
        "country": "United States"
    },
    {
        "key": "WWD",
        "city": "Cape May",
        "name": "Cape May Arpt",
        "country": "United States"
    },
    {
        "key": "WWK",
        "city": "Wewak",
        "name": "Boram Arpt",
        "country": "Papua New Guinea"
    },
    {
        "key": "WWP",
        "city": "Whale Pass",
        "name": "Whale Pass Arpt",
        "country": "United States"
    },
    {
        "key": "WWR",
        "city": "Woodward",
        "name": "West Woodward Arpt",
        "country": "United States"
    },
    {
        "key": "WXN",
        "city": "Wanxian",
        "name": "Wanxian Arpt",
        "country": "China"
    },
    {
        "key": "WYA",
        "city": "Whyalla",
        "name": "Whyalla Arpt",
        "country": "Australia"
    },
    {
        "key": "WYB",
        "city": "Yes Bay",
        "name": "Sea Base",
        "country": "United States"
    },
    {
        "key": "WYN",
        "city": "Wyndham",
        "name": "Wyndham Arpt",
        "country": "Australia"
    },
    {
        "key": "WYS",
        "city": "West Yellowstone",
        "name": "West Yellowstone Arpt",
        "country": "United States"
    },
    {
        "key": "WZY",
        "city": "Nassau",
        "name": "Seaplane Base Arpt",
        "country": "Bahamas"
    },
    {
        "key": "XAD",
        "city": "Churchill",
        "name": "Churchill Rail Station",
        "country": "Canada"
    },
    {
        "key": "XAL",
        "city": "Alamos",
        "name": "Alamos Arpt",
        "country": "Mexico"
    },
    {
        "key": "XAP",
        "city": "Chapeco",
        "name": "Chapeco Arpt",
        "country": "Brazil"
    },
    {
        "key": "XAR",
        "city": "Aribinda",
        "name": "Aribinda Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "XAU",
        "city": "SaÃ¼l",
        "name": "SaÃ¼l Airport",
        "country": "French Guiana"
    },
    {
        "key": "XAW",
        "city": "Capreol",
        "name": "Capreol Rail Station",
        "country": "Canada"
    },
    {
        "key": "XAX",
        "city": "Montreal",
        "name": "Dorval Rail Station",
        "country": "Canada"
    },
    {
        "key": "XAZ",
        "city": "Campbellton",
        "name": "Campbellton Rail Station",
        "country": "Canada"
    },
    {
        "key": "XBG",
        "city": "BogandÃ©",
        "name": "Bogande Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "XBJ",
        "city": "Birjand",
        "name": "Birjand International Airport",
        "country": "Iran"
    },
    {
        "key": "XBL",
        "city": "Bedele",
        "name": "Bedele Airport (Buno Bedele Airport)",
        "country": "Ethiopia"
    },
    {
        "key": "XBR",
        "city": "Brockville",
        "name": "Brockville Arpt",
        "country": "Canada"
    },
    {
        "key": "XBW",
        "city": "Killineq",
        "name": "Killineq Arpt",
        "country": "Canada"
    },
    {
        "key": "XCH",
        "city": "Christmas Island",
        "name": "Christmas Island Arpt",
        "country": "Christmas Island"
    },
    {
        "key": "XCI",
        "city": "Chambord",
        "name": "Chambord Rail Station",
        "country": "Canada"
    },
    {
        "key": "XCM",
        "city": "Chatham",
        "name": "Chatham Airport",
        "country": "Canada"
    },
    {
        "key": "XCN",
        "city": "Coron Island",
        "name": "Coron Airport",
        "country": "Philippines"
    },
    {
        "key": "XCO",
        "city": "Colac",
        "name": "Colac Arpt",
        "country": "Australia"
    },
    {
        "key": "XCR",
        "city": "Paris",
        "name": "Vatry Arpt",
        "country": "France"
    },
    {
        "key": "XDB",
        "city": "Lille",
        "name": "Europe Railway Service",
        "country": "France"
    },
    {
        "key": "XDD",
        "city": "Gaspe",
        "name": "Gaspe Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDG",
        "city": "Halifax",
        "name": "Halifax Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDH",
        "city": "Jasper",
        "name": "Jasper Rail Station",
        "country": "Canada"
    },
    {
        "key": "TYT",
        "city": "Treinta y Tres",
        "name": "Treinta y Tres Airport",
        "country": "Uruguay"
    },
    {
        "key": "TYZ",
        "city": "Taylor",
        "name": "Taylor Airport",
        "country": "United States"
    },
    {
        "key": "TZA",
        "city": "Belize City",
        "name": "Belize City Municipal",
        "country": "Belize"
    },
    {
        "key": "TZL",
        "city": "Tuzla",
        "name": "Tuzla Intl Arpt",
        "country": "Bosnia and Herzegovina"
    },
    {
        "key": "TZM",
        "city": "TIZIMIN",
        "name": "TIZIMIN ARPT",
        "country": "Mexico"
    },
    {
        "key": "TZN",
        "city": "South Andros",
        "name": "South Andros Arpt",
        "country": "Bahamas"
    },
    {
        "key": "TZX",
        "city": "Trabzon",
        "name": "Trabzon Arpt",
        "country": "Turkey"
    },
    {
        "key": "UAB",
        "city": "Adana",
        "name": "Incirlik Air Base",
        "country": "Turkey"
    },
    {
        "key": "UAC",
        "city": "San Luis Rio Colorado",
        "name": "San Luis Rio Colorado Municipal",
        "country": "Mexico"
    },
    {
        "key": "UAE",
        "city": "Mount Aue",
        "name": "Mount Aue Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "UAH",
        "city": "Ua Huka",
        "name": "Ua Huka Airport",
        "country": "French Polynesia"
    },
    {
        "key": "UAI",
        "city": "DÃ­li",
        "name": "Suai Airport",
        "country": "TimorLeste"
    },
    {
        "key": "UAK",
        "city": "Narsarsuaq",
        "name": "Narsarsuaq Arpt",
        "country": "Greenland"
    },
    {
        "key": "UAM",
        "city": "Guam",
        "name": "Anderson Air Force Base",
        "country": "Guam"
    },
    {
        "key": "UAQ",
        "city": "San Juan",
        "name": "San Juan Arpt",
        "country": "Argentina"
    },
    {
        "key": "UAS",
        "city": "Samburu",
        "name": "Samburu Airstrip",
        "country": "Kenya"
    },
    {
        "key": "UBA",
        "city": "Uberaba",
        "name": "Uberaba Airport",
        "country": "Brazil"
    },
    {
        "key": "UBI",
        "city": "Buin, Papua New Guinea",
        "name": "Buin Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "UBJ",
        "city": "Ube Jp",
        "name": "Ube Airport",
        "country": "Japan"
    },
    {
        "key": "UBP",
        "city": "Ubon Ratchathani",
        "name": "Muang Ubon Arpt",
        "country": "Thailand"
    },
    {
        "key": "UBS",
        "city": "Columbus",
        "name": "Lowndes Cty Arpt",
        "country": "United States"
    },
    {
        "key": "UCC",
        "city": "Mercury, Nevada",
        "name": "Yucca Airstrip (FAA: NV11)",
        "country": "United States"
    },
    {
        "key": "UCK",
        "city": "Lutsk",
        "name": "Lutsk Arpt",
        "country": "Ukraine"
    },
    {
        "key": "UCT",
        "city": "Ukhta",
        "name": "Ukhta Airport",
        "country": "Russian Federation"
    },
    {
        "key": "UDA",
        "city": "Mount Surprise",
        "name": "Undara Airport",
        "country": "Australia"
    },
    {
        "key": "UDD",
        "city": "Palm Desert",
        "name": "Bermuda Dunes Arpt",
        "country": "United States"
    },
    {
        "key": "UDE",
        "city": "Uden",
        "name": "Volkel Arpt",
        "country": "Netherlands"
    },
    {
        "key": "UDI",
        "city": "Uberlandia",
        "name": "Eduardo Gomes Airprt",
        "country": "Brazil"
    },
    {
        "key": "UDJ",
        "city": "Uzhgorod",
        "name": "Uzhgorod Arpt",
        "country": "Ukraine"
    },
    {
        "key": "UDN",
        "city": "Udine",
        "name": "Campoformido Arpt",
        "country": "Italy"
    },
    {
        "key": "UDR",
        "city": "Udaipur",
        "name": "Maharana Pratap Arpt",
        "country": "India"
    },
    {
        "key": "UEE",
        "city": "Queenstown",
        "name": "Queenstown Arpt",
        "country": "Australia"
    },
    {
        "key": "UEL",
        "city": "Quelimane",
        "name": "Quelimane Arpt",
        "country": "Mozambique"
    },
    {
        "key": "UEO",
        "city": "Kume Jima",
        "name": "Kumejima Arpt",
        "country": "Japan"
    },
    {
        "key": "UES",
        "city": "Waukesha",
        "name": "Waukesha County Airport (Crites Field)",
        "country": "United States"
    },
    {
        "key": "UET",
        "city": "Quetta",
        "name": "Quetta International Airport",
        "country": "Pakistan"
    },
    {
        "key": "UFA",
        "city": "Ufa RU",
        "name": "Ufa Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "UGA",
        "city": "Bulgan",
        "name": "Bulgan Airport",
        "country": "Mongolia"
    },
    {
        "key": "UGB",
        "city": "Pilot Point",
        "name": "Ugashik Bay",
        "country": "United States"
    },
    {
        "key": "UGC",
        "city": "Urgench",
        "name": "Urgench Arpt",
        "country": "Uzbekistan"
    },
    {
        "key": "UGN",
        "city": "Waukegan",
        "name": "Memorial Arpt",
        "country": "United States"
    },
    {
        "key": "UGO",
        "city": "UÃ­ge, Angola",
        "name": "UÃ­ge Airport",
        "country": "Angola"
    },
    {
        "key": "UGU",
        "city": "Bilogai, Indonesia",
        "name": "Bilogai Airport",
        "country": "Indonesia"
    },
    {
        "key": "UHE",
        "city": "Uherske Hradiste",
        "name": "Uherske Hradiste Kunovice Arpt",
        "country": "Czech Republic"
    },
    {
        "key": "UIB",
        "city": "Quibdo",
        "name": "Quibdo Arpt",
        "country": "Colombia"
    },
    {
        "key": "UIH",
        "city": "Qui Nhon",
        "name": "Qui Nhon Arpt",
        "country": "Viet Nam"
    },
    {
        "key": "UII",
        "city": "Utila Honduras",
        "name": "Utila Honduras",
        "country": "Honduras"
    },
    {
        "key": "UIN",
        "city": "Quincy",
        "name": "Baldwin Field",
        "country": "United States"
    },
    {
        "key": "UIO",
        "city": "Quito",
        "name": "Mariscal Sucr Arpt",
        "country": "Ecuador"
    },
    {
        "key": "UIP",
        "city": "Quimper",
        "name": "Pluguffan Arpt",
        "country": "France"
    },
    {
        "key": "UIR",
        "city": "Quirindi",
        "name": "Quirindi Arpt",
        "country": "Australia"
    },
    {
        "key": "UKA",
        "city": "Ukunda",
        "name": "Diani Airport",
        "country": "Kenya"
    },
    {
        "key": "UKB",
        "city": "Kobe",
        "name": "Kobe Arpt",
        "country": "Japan"
    },
    {
        "key": "UKH",
        "city": "Mukhaizna, Oman",
        "name": "Mukhaizna Airport",
        "country": "Oman"
    },
    {
        "key": "UKI",
        "city": "Ukiah",
        "name": "Ukiah Arpt",
        "country": "United States"
    },
    {
        "key": "UKK",
        "city": "Ust Kamenogorsk",
        "name": "Ust Kamenogorsk Arpt",
        "country": "Kazakhstan"
    },
    {
        "key": "UKR",
        "city": "Mukayras, Yemen",
        "name": "Mukeiras Airport",
        "country": "Yemen"
    },
    {
        "key": "UKS",
        "city": "Aeroflotskyi",
        "name": "Sevastopol International Airport",
        "country": "Ukraine"
    },
    {
        "key": "UKT",
        "city": "Quakertown",
        "name": "Upper Bucks Arpt",
        "country": "United States"
    },
    {
        "key": "UKU",
        "city": "Nuku",
        "name": "Nuku Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "UKX",
        "city": "Ust-Kut",
        "name": "Ust-Kut Airport",
        "country": "Russia"
    },
    {
        "key": "UKY",
        "city": "Kyoto",
        "name": "Kyoto Arpt",
        "country": "Japan"
    },
    {
        "key": "ULD",
        "city": "Ulundi",
        "name": "Ulundi Airport",
        "country": "South Africa"
    },
    {
        "key": "ULE",
        "city": "Sule",
        "name": "Sule Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "ULH",
        "city": "Al Ula",
        "name": "Majeed Bin Abdulaziz",
        "country": "Saudi Arabia"
    },
    {
        "key": "ULI",
        "city": "Ulithi",
        "name": "Ulithi Airport",
        "country": "Federated States of Micronesia"
    },
    {
        "key": "ULM",
        "city": "New Ulm",
        "name": "New Ulm Arpt",
        "country": "United States"
    },
    {
        "key": "ULN",
        "city": "Ulaanbaatar",
        "name": "Buyant Uhaa Airport",
        "country": "Mongolia"
    },
    {
        "key": "ULP",
        "city": "Quilpie",
        "name": "Quilpie Arpt",
        "country": "Australia"
    },
    {
        "key": "ULU",
        "city": "Gulu",
        "name": "Gulu Airport",
        "country": "Uganda"
    },
    {
        "key": "ULV",
        "city": "Ulyanovsk",
        "name": "Ulyanovsk Tsentralny Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "ULX",
        "city": "Ulusaba",
        "name": "Ulusaba",
        "country": "South Africa"
    },
    {
        "key": "ULY",
        "city": "Ulyanovsk",
        "name": "Ulyanovsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "XDL",
        "city": "Chandler",
        "name": "Chandler Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDM",
        "city": "Drummondville",
        "name": "Drummondville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDO",
        "city": "Grande Riviere",
        "name": "Grande-Riviere Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDP",
        "city": "Moncton",
        "name": "Moncton Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDQ",
        "city": "London",
        "name": "London Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDS",
        "city": "Ottawa",
        "name": "Ottawa Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDU",
        "city": "Hervey",
        "name": "Hervey Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDV",
        "city": "Prince George",
        "name": "Prince George Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDW",
        "city": "Prince Rupert",
        "name": "Prince Rupert Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDX",
        "city": "Sarnia",
        "name": "Sarina Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDY",
        "city": "Sudbury",
        "name": "Sudbury Junction Rail Station",
        "country": "Canada"
    },
    {
        "key": "XDZ",
        "city": "The Pas",
        "name": "The Pas Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEA",
        "city": "Vancouver",
        "name": "Vancouver Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEC",
        "city": "Windsor",
        "name": "Windsor Rail Station",
        "country": "Canada"
    },
    {
        "key": "XED",
        "city": "Disneyland Paris Rail",
        "name": "Railway Service",
        "country": "France"
    },
    {
        "key": "XEE",
        "city": "Lac Edouard",
        "name": "Lac Edouard Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEF",
        "city": "Winnipeg",
        "name": "Winnipeg Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEG",
        "city": "Kingston",
        "name": "Kingston Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEH",
        "city": "Ladysmith",
        "name": "Ladysmith Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEJ",
        "city": "Langford",
        "name": "Langford Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEK",
        "city": "Melville",
        "name": "Melville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEL",
        "city": "New Carlisle",
        "name": "New Carlisle Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEM",
        "city": "New Richmond",
        "name": "New Richmond Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEN",
        "city": "Jinzhou Shi",
        "name": "Xingcheng Airport",
        "country": "China"
    },
    {
        "key": "XER",
        "city": "Strasbourg",
        "name": "Strasbourg Bus Service",
        "country": "France"
    },
    {
        "key": "XES",
        "city": "Lake Geneva",
        "name": "Grand Geneva Resort Airport (FAA: C02)",
        "country": "United States"
    },
    {
        "key": "XEV",
        "city": "Stockholm",
        "name": "Stockholm Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XEW",
        "city": "Stockholm",
        "name": "Flemingsberg Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XEX",
        "city": "Paris",
        "name": "Aerogare Des Invalides",
        "country": "France"
    },
    {
        "key": "XEY",
        "city": "Miramichi",
        "name": "Newcastle Rail Station",
        "country": "Canada"
    },
    {
        "key": "XEZ",
        "city": "Sodertalje",
        "name": "Sodertalje S Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XFA",
        "city": "Lille",
        "name": "Lille Flanders Rail Service",
        "country": "France"
    },
    {
        "key": "XFD",
        "city": "Stratford",
        "name": "Stratford Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFE",
        "city": "Parent",
        "name": "Parent Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFF",
        "city": "Calais City",
        "name": "Frethun Railway Station",
        "country": "France"
    },
    {
        "key": "XFG",
        "city": "Perce",
        "name": "Perce Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFI",
        "city": "Port Daniel",
        "name": "Port-Daniel Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFJ",
        "city": "Eskilstuna",
        "name": "Eskilstuna Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XFK",
        "city": "Senneterre",
        "name": "Senneterre Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFL",
        "city": "Shawinigan",
        "name": "Shawinigan Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFM",
        "city": "Shawnigan",
        "name": "Shawnigan Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFN",
        "city": "Xiangfan",
        "name": "Xiangfan Arpt",
        "country": "China"
    },
    {
        "key": "XFO",
        "city": "Taschereau",
        "name": "Taschereau Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFP",
        "city": "Malmo",
        "name": "Malmo Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XFQ",
        "city": "Weymont",
        "name": "Weymont Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFR",
        "city": "Malmo",
        "name": "Malmo South Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XFS",
        "city": "Alexandria",
        "name": "Alexandria Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFU",
        "city": "Gavle",
        "name": "Tierp Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XFV",
        "city": "Brantford",
        "name": "Brantford Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFW",
        "city": "Hamburg",
        "name": "Finkenwerder Arpt",
        "country": "Germany"
    },
    {
        "key": "XFY",
        "city": "Quebec",
        "name": "Sainte-Foy Rail Station",
        "country": "Canada"
    },
    {
        "key": "XFZ",
        "city": "Quebec",
        "name": "Charny Rail Station",
        "country": "Canada"
    },
    {
        "key": "XGA",
        "city": "Espargos",
        "name": "Gaoua Airport (Amilcar Cabral Airport)",
        "country": "Cape Verde"
    },
    {
        "key": "XGB",
        "city": "Paris",
        "name": "Gare Montparnasse Arpt",
        "country": "France"
    },
    {
        "key": "XGC",
        "city": "Lund C",
        "name": "Lund C Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XGD",
        "city": "Kristiansand",
        "name": "Arendal Rail Station",
        "country": "Norway"
    },
    {
        "key": "XGI",
        "city": "Kristiansund",
        "name": "Andalsnes Rail Station",
        "country": "Norway"
    },
    {
        "key": "XGJ",
        "city": "Cobourg",
        "name": "Cobourg Rail Station",
        "country": "Canada"
    },
    {
        "key": "XGK",
        "city": "Coteau",
        "name": "Coteau Rail Station",
        "country": "Canada"
    },
    {
        "key": "XGM",
        "city": "Leicester",
        "name": "Grantham Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XGP",
        "city": "Gol City",
        "name": "Dombas Rail Station",
        "country": "Norway"
    },
    {
        "key": "XGR",
        "city": "Kangiqsualujjuaq",
        "name": "Kangiqsualujjuaq Arpt",
        "country": "Canada"
    },
    {
        "key": "XGU",
        "city": "Oslo",
        "name": "Asker Rail Station",
        "country": "Norway"
    },
    {
        "key": "XGW",
        "city": "Gananoque",
        "name": "Gananoque Rail Station",
        "country": "Canada"
    },
    {
        "key": "XGY",
        "city": "Grimsby",
        "name": "Grimsby Rail Station",
        "country": "Canada"
    },
    {
        "key": "XHK",
        "city": "Valence",
        "name": "Valence Railway Station",
        "country": "France"
    },
    {
        "key": "XHM",
        "city": "Georgetown",
        "name": "Georgetown Rail Station",
        "country": "Canada"
    },
    {
        "key": "XHN",
        "city": "Liege",
        "name": "Guillemins Railway Station",
        "country": "Belgium"
    },
    {
        "key": "XHP",
        "city": "Paris",
        "name": "Garda de I Est",
        "country": "France"
    },
    {
        "key": "XHS",
        "city": "Chemainus",
        "name": "Chemainus Rail Station",
        "country": "Canada"
    },
    {
        "key": "XHW",
        "city": "Alice Springs",
        "name": "Alice Springs Railway Station",
        "country": "Australia"
    },
    {
        "key": "XHX",
        "city": "Adelaide",
        "name": "Adelaide Keswick Rail Station",
        "country": "Australia"
    },
    {
        "key": "UMB",
        "city": "Umnak Island",
        "name": "Umnak Arpt",
        "country": "United States"
    },
    {
        "key": "UMC",
        "city": "Umba",
        "name": "Umba Airport",
        "country": "Papua New Guinea"
    },
    {
        "key": "UMD",
        "city": "Uummannaq",
        "name": "Umanak Airport",
        "country": "Greenland"
    },
    {
        "key": "UME",
        "city": "Umea",
        "name": "Umea Airport",
        "country": "Sweden"
    },
    {
        "key": "UMI",
        "city": "Quince Mil",
        "name": "Quince Mil Airport",
        "country": "Peru"
    },
    {
        "key": "UMM",
        "city": "Summit",
        "name": "Summit Arpt",
        "country": "United States"
    },
    {
        "key": "UMR",
        "city": "Woomera",
        "name": "RAAF Woomera Airfield",
        "country": "Australia"
    },
    {
        "key": "UMT",
        "city": "Umiat",
        "name": "Umiat Arpt",
        "country": "United States"
    },
    {
        "key": "UMU",
        "city": "Umuarama",
        "name": "Ernesto Geisel Arpt",
        "country": "Brazil"
    },
    {
        "key": "UMY",
        "city": "Sumy",
        "name": "Sumy Arpt",
        "country": "Ukraine"
    },
    {
        "key": "UNA",
        "city": "Una BR",
        "name": "Una Airport",
        "country": "Brazil"
    },
    {
        "key": "UND",
        "city": "Kunduz",
        "name": "Kunduz Airport",
        "country": "Afghanistan"
    },
    {
        "key": "UNE",
        "city": "Qachas Nek",
        "name": "Qachas Nek Airport",
        "country": "Lesotho"
    },
    {
        "key": "UNI",
        "city": "Union Island",
        "name": "Union Island Arpt",
        "country": "Saint Vincent and the Grenadines"
    },
    {
        "key": "UNK",
        "city": "Unalakleet",
        "name": "Unalakleet Arpt",
        "country": "United States"
    },
    {
        "key": "YAG",
        "city": "Fort Frances",
        "name": "Fort Frances Municipal",
        "country": "Canada"
    },
    {
        "key": "YAI",
        "city": "Chillan, Chile",
        "name": "General Bernardo OHiggins Airport",
        "country": "Chile"
    },
    {
        "key": "YAK",
        "city": "Yakutat",
        "name": "Yakutat Arpt",
        "country": "United States"
    },
    {
        "key": "YAM",
        "city": "Sault Ste Marie",
        "name": "Sault Ste Marie Arpt",
        "country": "Canada"
    },
    {
        "key": "YAO",
        "city": "Yaounde",
        "name": "Yaounde Airport",
        "country": "Cameroon"
    },
    {
        "key": "YAP",
        "city": "Yap Fm",
        "name": "Yap Arpt",
        "country": "Micronesia"
    },
    {
        "key": "YAR",
        "city": "La Grande-3, Quebec, Canada",
        "name": "La Grande-3 Airport",
        "country": "Canada"
    },
    {
        "key": "YAS",
        "city": "Nadi",
        "name": "Yasawa Island Airport",
        "country": "Fiji"
    },
    {
        "key": "YAT",
        "city": "Attawapiskat",
        "name": "Attawapiskat Arpt",
        "country": "Canada"
    },
    {
        "key": "YAU",
        "city": "Kattiniq/Donaldson Lake",
        "name": "Kattiniq/Donaldson Lake Airport",
        "country": "Canada"
    },
    {
        "key": "YAV",
        "city": "Miners Bay",
        "name": "Miners Bay Airport",
        "country": "Canada"
    },
    {
        "key": "YAW",
        "city": "Halifax",
        "name": "Canadian Force Base Shearwater",
        "country": "Canada"
    },
    {
        "key": "YAX",
        "city": "Wapekeka, Ontario, Canada",
        "name": "Angling Lake/Wapekeka Airport (TC: CKB6)",
        "country": "Canada"
    },
    {
        "key": "YAY",
        "city": "St Anthony",
        "name": "St Anthony Arpt",
        "country": "Canada"
    },
    {
        "key": "YAZ",
        "city": "Tofino",
        "name": "Tofino Arpt",
        "country": "Canada"
    },
    {
        "key": "YBA",
        "city": "Banff",
        "name": "Banff Arpt",
        "country": "Canada"
    },
    {
        "key": "YBB",
        "city": "Pelly Bay",
        "name": "Kugaaruk Arpt",
        "country": "Canada"
    },
    {
        "key": "YBC",
        "city": "Baie Comeau",
        "name": "Baie Comeau Arpt",
        "country": "Canada"
    },
    {
        "key": "YBD",
        "city": "New Westminster",
        "name": "New Westminster Rail Station",
        "country": "Canada"
    },
    {
        "key": "YBG",
        "city": "Bagotville",
        "name": "Bagotville Arpt",
        "country": "Canada"
    },
    {
        "key": "YBK",
        "city": "Baker Lake",
        "name": "Baker Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YBL",
        "city": "Campbell River",
        "name": "Campbell River Municipal",
        "country": "Canada"
    },
    {
        "key": "YBP",
        "city": "Yibin",
        "name": "Yibin Airport",
        "country": "China"
    },
    {
        "key": "YBR",
        "city": "Brandon",
        "name": "Brandon Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YBT",
        "city": "Brochet",
        "name": "Brochet Airport",
        "country": "Canada"
    },
    {
        "key": "YBW",
        "city": "Bedwell Harbor",
        "name": "Bedwell Harbor Arpt",
        "country": "Canada"
    },
    {
        "key": "YBX",
        "city": "Blanc Sablon",
        "name": "Blanc Sablon Arpt",
        "country": "Canada"
    },
    {
        "key": "YBZ",
        "city": "Toronto",
        "name": "Toronto Downtown Rail Station",
        "country": "Canada"
    },
    {
        "key": "YCA",
        "city": "Courtenay",
        "name": "Courtenay Rail Station",
        "country": "Canada"
    },
    {
        "key": "YCB",
        "city": "Cambridge Bay",
        "name": "Cambridge Bay Arpt",
        "country": "Canada"
    },
    {
        "key": "YCC",
        "city": "Cornwall",
        "name": "Cornwall Regional Arpt",
        "country": "Canada"
    },
    {
        "key": "YCD",
        "city": "Nanaimo",
        "name": "Nanaimo Arpt",
        "country": "Canada"
    },
    {
        "key": "YCE",
        "city": "Centralia",
        "name": "Centralia",
        "country": "Canada"
    },
    {
        "key": "YCG",
        "city": "Castlegar",
        "name": "Ralph West Arpt",
        "country": "Canada"
    },
    {
        "key": "YCH",
        "city": "Miramichi",
        "name": "Miramichi Arpt",
        "country": "Canada"
    },
    {
        "key": "YCL",
        "city": "Charlo",
        "name": "Charlo Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YCN",
        "city": "Cochrane",
        "name": "Cochrane Rail Station",
        "country": "Canada"
    },
    {
        "key": "YCO",
        "city": "Kugluktuk Coppermine",
        "name": "Kugluktuk Arpt",
        "country": "Canada"
    },
    {
        "key": "YCS",
        "city": "Chesterfield Inlet",
        "name": "Chesterfield Inlet Arpt",
        "country": "Canada"
    },
    {
        "key": "YCU",
        "city": "Yuncheng",
        "name": "Guangong",
        "country": "China"
    },
    {
        "key": "YCW",
        "city": "Chilliwack",
        "name": "Chilliwack Arpt",
        "country": "Canada"
    },
    {
        "key": "YCY",
        "city": "Clyde River",
        "name": "Clyde River",
        "country": "Canada"
    },
    {
        "key": "YCZ",
        "city": "Fairmont Springs",
        "name": "Fairmont Springs Arpt",
        "country": "Canada"
    },
    {
        "key": "YDA",
        "city": "Dawson City",
        "name": "Dawson City Arpt",
        "country": "Canada"
    },
    {
        "key": "YDF",
        "city": "Deer Lake",
        "name": "Deer Lake Municipal",
        "country": "Canada"
    },
    {
        "key": "YDL",
        "city": "Dease Lake",
        "name": "Dease Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YDN",
        "city": "Dauphin",
        "name": "Dauphin Airport",
        "country": "Canada"
    },
    {
        "key": "YDP",
        "city": "Nain",
        "name": "Nain Arpt",
        "country": "Canada"
    },
    {
        "key": "YDQ",
        "city": "Dawson Creek",
        "name": "Dawson Creek Arpt",
        "country": "Canada"
    },
    {
        "key": "YDT",
        "city": "Vancouver",
        "name": "Boundary Bay Arpt",
        "country": "Canada"
    },
    {
        "key": "YDV",
        "city": "Bloodvein",
        "name": "Bloodvein River Airport",
        "country": "Canada"
    },
    {
        "key": "YEB",
        "city": "Bar River",
        "name": "Bar River Arpt",
        "country": "Canada"
    },
    {
        "key": "YEC",
        "city": "Yecheon gun",
        "name": "Yecheon Air Base",
        "country": "South Korea"
    },
    {
        "key": "YED",
        "city": "Edmonton",
        "name": "Namao Field",
        "country": "Canada"
    },
    {
        "key": "YEG",
        "city": "Edmonton",
        "name": "Edmonton Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YEI",
        "city": "Bursa",
        "name": "Yenisehir Arpt",
        "country": "Turkey"
    },
    {
        "key": "YEK",
        "city": "Arviat",
        "name": "Arviat Arpt",
        "country": "Canada"
    },
    {
        "key": "YEL",
        "city": "Elliot Lake",
        "name": "Elliot Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YEN",
        "city": "Estevan",
        "name": "Estevan Arpt",
        "country": "Canada"
    },
    {
        "key": "YEO",
        "city": "Yeovilton",
        "name": "Yeovilton Arpt",
        "country": "United Kingdom"
    },
    {
        "key": "YER",
        "city": "Fort Severn",
        "name": "Fort Severn Arpt",
        "country": "Canada"
    },
    {
        "key": "YET",
        "city": "Edson",
        "name": "Edson Arpt",
        "country": "Canada"
    },
    {
        "key": "YEV",
        "city": "Inuvik",
        "name": "Inuvik Mike Zubko Arpt",
        "country": "Canada"
    },
    {
        "key": "YEY",
        "city": "Amos",
        "name": "Amos Rail Station",
        "country": "Canada"
    },
    {
        "key": "YFB",
        "city": "Iqaluit",
        "name": "Iqaluit Arpt",
        "country": "Canada"
    },
    {
        "key": "YFC",
        "city": "Fredericton",
        "name": "Fredericton Municipal",
        "country": "Canada"
    },
    {
        "key": "YFE",
        "city": "Forestville",
        "name": "Forestville Airport",
        "country": "Canada"
    },
    {
        "key": "YFH",
        "city": "Eabametoong (Fort Hope), Ontario, Canada",
        "name": "Fort Hope Airport",
        "country": "Canada"
    },
    {
        "key": "YFL",
        "city": "Reliance",
        "name": "Fort Reliance Water Aerodrome",
        "country": "Canada"
    },
    {
        "key": "YFO",
        "city": "Flin Flon",
        "name": "Flin Flon Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YFR",
        "city": "Fort Resolution",
        "name": "Fort Resolution Airport",
        "country": "Canada"
    },
    {
        "key": "YFX",
        "city": "Fox Harbour",
        "name": "Fox Harbour Arpt",
        "country": "Canada"
    },
    {
        "key": "XIA",
        "city": "Guelph",
        "name": "Guelph Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIB",
        "city": "Ingersoll",
        "name": "Ingersoll Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIC",
        "city": "Liangshan",
        "name": "Xichang Qingshan Airport",
        "country": "China"
    },
    {
        "key": "XID",
        "city": "Maxville",
        "name": "Maxville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIE",
        "city": "Xianglom",
        "name": "Xienglom Airport",
        "country": "Laos"
    },
    {
        "key": "XIF",
        "city": "Napanee",
        "name": "Napanee Rail Station",
        "country": "Canada"
    },
    {
        "key": "XII",
        "city": "Prescott",
        "name": "Prescott Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIJ",
        "city": "Al Ahmadi, Kuwait",
        "name": "Ahmad al-Jaber Air Base",
        "country": "Kuwait"
    },
    {
        "key": "XIK",
        "city": "Milan",
        "name": "Milan Central Station Railway",
        "country": "Italy"
    },
    {
        "key": "XIL",
        "city": "Xilinhot",
        "name": "Xilinhot Airport",
        "country": "China"
    },
    {
        "key": "XIM",
        "city": "Saint Hyacinthe",
        "name": "Saint Hyacinthe Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIO",
        "city": "St Marys",
        "name": "St Marys Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIP",
        "city": "Woodstock",
        "name": "Woodstock Rail Station",
        "country": "Canada"
    },
    {
        "key": "XIX",
        "city": "Verona",
        "name": "Porta Nuova Railway Station",
        "country": "Italy"
    },
    {
        "key": "XIY",
        "city": "Xi An",
        "name": "Xianyang Arpt",
        "country": "China"
    },
    {
        "key": "XIZ",
        "city": "Reims",
        "name": "Champagne Railway Station",
        "country": "France"
    },
    {
        "key": "XJD",
        "city": "Doha",
        "name": "Al Udeid Air Base",
        "country": "Qatar"
    },
    {
        "key": "XJE",
        "city": "Skrydstrup",
        "name": "Vojens Railway Station",
        "country": "Denmark"
    },
    {
        "key": "XJF",
        "city": "Falun",
        "name": "Falun Bus Service",
        "country": "Sweden"
    },
    {
        "key": "XJG",
        "city": "Darwin",
        "name": "Darwin Railway Station",
        "country": "Australia"
    },
    {
        "key": "XJL",
        "city": "Joliette",
        "name": "Joliette Rail Station",
        "country": "Canada"
    },
    {
        "key": "XJQ",
        "city": "Jonquiere",
        "name": "Jonquiere Rail Station",
        "country": "Canada"
    },
    {
        "key": "XJT",
        "city": "Tours",
        "name": "Tours France Railway Station",
        "country": "France"
    },
    {
        "key": "XJV",
        "city": "Ostrava",
        "name": "Ostrava Main Rail Station",
        "country": "Czech Republic"
    },
    {
        "key": "XJY",
        "city": "Paris",
        "name": "PARIS MASSY TGV",
        "country": "France"
    },
    {
        "key": "XKA",
        "city": "Kantchari",
        "name": "Kantchari Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "XKB",
        "city": "Oslo",
        "name": "Kongsberg Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKC",
        "city": "Stavanger",
        "name": "Sandnes Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKD",
        "city": "Oslo",
        "name": "Halden Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKE",
        "city": "Oslo",
        "name": "Rena Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKF",
        "city": "Oslo",
        "name": "Fredrikstad Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKG",
        "city": "Steinkjer",
        "name": "Grong Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKH",
        "city": "Xieng Khouang",
        "name": "Xieng Khouang Arpt",
        "country": "Lao Peoples Democratic Republic"
    },
    {
        "key": "XKI",
        "city": "Oslo",
        "name": "Lillestrom Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKJ",
        "city": "Steinkjer",
        "name": "Steinkjer Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKK",
        "city": "Skien",
        "name": "Larvik Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKL",
        "city": "Kuala Lumpur",
        "name": "Sentral Railway Station",
        "country": "Malaysia"
    },
    {
        "key": "XKM",
        "city": "Oslo",
        "name": "Moss Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKN",
        "city": "Bergen",
        "name": "Finse Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKP",
        "city": "Skien",
        "name": "Porsgrunn Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKQ",
        "city": "Oslo",
        "name": "Sarpsborg Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKR",
        "city": "Kristiansand",
        "name": "Kristiansand Rail Station",
        "country": "Norway"
    },
    {
        "key": "XKV",
        "city": "Sackville",
        "name": "Sackville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XKY",
        "city": "Kaya",
        "name": "Kaya Airport",
        "country": "Burkina Faso"
    },
    {
        "key": "XKZ",
        "city": "Gol City",
        "name": "Vinstra Rail Station",
        "country": "Norway"
    },
    {
        "key": "XLB",
        "city": "Lac Brochet",
        "name": "Lac Brochet Airport",
        "country": "Canada"
    },
    {
        "key": "XLJ",
        "city": "Quebec",
        "name": "Quebec City Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLK",
        "city": "Quebec",
        "name": "Levis Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLM",
        "city": "Montreal",
        "name": "Saint Lambert Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLO",
        "city": "Long XuyÃªn, Vietnam",
        "name": "Long Xuyen Airport",
        "country": "Vietnam"
    },
    {
        "key": "XLP",
        "city": "Matapedia",
        "name": "Matapedia Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLQ",
        "city": "Toronto",
        "name": "Guildwood Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLS",
        "city": "St Louis",
        "name": "St Louis Airport",
        "country": "Senegal"
    },
    {
        "key": "XLV",
        "city": "Niagara Falls",
        "name": "Niagara Falls Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLY",
        "city": "Aldershot",
        "name": "Aldershot Rail Station",
        "country": "Canada"
    },
    {
        "key": "XLZ",
        "city": "Truro",
        "name": "Truro Rail Station",
        "country": "Canada"
    },
    {
        "key": "XMB",
        "city": "Dubai",
        "name": "Dubai Marina Mall Bus Station",
        "country": "United Arab Emirates"
    },
    {
        "key": "XMD",
        "city": "MADISON",
        "name": "Madison Arpt",
        "country": "United States"
    },
    {
        "key": "XMG",
        "city": "Mahendranagar",
        "name": "Mahendranagar",
        "country": "Nepal"
    },
    {
        "key": "XMI",
        "city": "Masasi, Tanzania",
        "name": "Masasi Airport",
        "country": "Tanzania"
    },
    {
        "key": "XMN",
        "city": "Xiamen",
        "name": "Xiamen Intl Airport",
        "country": "China"
    },
    {
        "key": "XMY",
        "city": "Yam Island",
        "name": "Yam Island Arpt",
        "country": "Australia"
    },
    {
        "key": "XNA",
        "city": "Fayetteville",
        "name": "Northwest Arkansas Regional Arpt",
        "country": "United States"
    },
    {
        "key": "XNB",
        "city": "Dubai",
        "name": "Dubai Chelsea Tower Bus Station",
        "country": "United Arab Emirates"
    },
    {
        "key": "XNC",
        "city": "Milan",
        "name": "Cadorna Train Station Milan",
        "country": "Italy"
    },
    {
        "key": "XND",
        "city": "Oslo",
        "name": "Drammen Rail Station",
        "country": "Norway"
    },
    {
        "key": "XNM",
        "city": "Nottingham",
        "name": "Nottingham Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XNN",
        "city": "Xining",
        "name": "Xining Arpt",
        "country": "China"
    },
    {
        "key": "XNO",
        "city": "Durham",
        "name": "Northallerton Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XNT",
        "city": "Xingtai",
        "name": "Xingtai Airport",
        "country": "China"
    },
    {
        "key": "YGG",
        "city": "Ganges Harbor",
        "name": "Ganges Water Aerodrome (TC: CAX6)",
        "country": "Canada"
    },
    {
        "key": "YGJ",
        "city": "Yonago",
        "name": "Miho Arpt",
        "country": "Japan"
    },
    {
        "key": "YGK",
        "city": "Kingston",
        "name": "Norman Rodgers Arpt",
        "country": "Canada"
    },
    {
        "key": "YGL",
        "city": "La Grande",
        "name": "La Grande Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YGP",
        "city": "Gaspe",
        "name": "Gaspe Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YGQ",
        "city": "Geraldton",
        "name": "Geraldton Airport",
        "country": "Canada"
    },
    {
        "key": "YGR",
        "city": "Iles De Madeleine",
        "name": "House Harbour Arpt",
        "country": "Canada"
    },
    {
        "key": "YGT",
        "city": "Igloolik",
        "name": "Igloolik Arpt",
        "country": "Canada"
    },
    {
        "key": "YGV",
        "city": "Havre St Pierre",
        "name": "Havre St Pierre Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YGW",
        "city": "Poste De La Baleine",
        "name": "Kuujjuaraapik Arpt",
        "country": "Canada"
    },
    {
        "key": "YGX",
        "city": "Gillam",
        "name": "Gillam Rail Station",
        "country": "Canada"
    },
    {
        "key": "YHA",
        "city": "Port Hope Simpson",
        "name": "Port Hope Simpson Arpt",
        "country": "Canada"
    },
    {
        "key": "YHB",
        "city": "Hudson Bay",
        "name": "Hudson Bay Rail Station",
        "country": "Canada"
    },
    {
        "key": "YHD",
        "city": "Dryden",
        "name": "Dryden Municipal",
        "country": "Canada"
    },
    {
        "key": "YHE",
        "city": "Hope",
        "name": "Hope Arpt",
        "country": "Canada"
    },
    {
        "key": "YHF",
        "city": "Hearst",
        "name": "Hearst Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YHG",
        "city": "Charlottetown",
        "name": "Charlottetown Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YHH",
        "city": "Campbell River",
        "name": "Harbor Airport",
        "country": "Canada"
    },
    {
        "key": "YHI",
        "city": "Ulukhaktok",
        "name": "Ulukhaktok/Holman Airport",
        "country": "Canada"
    },
    {
        "key": "YHK",
        "city": "Gjoa Haven",
        "name": "Gjoa Haven Arpt",
        "country": "Canada"
    },
    {
        "key": "YHM",
        "city": "Hamilton",
        "name": "Civic Airport",
        "country": "Canada"
    },
    {
        "key": "YHN",
        "city": "Hornepayne",
        "name": "Hornepayne Rail Station",
        "country": "Canada"
    },
    {
        "key": "YHO",
        "city": "Hopedale",
        "name": "Hopedale Arpt",
        "country": "Canada"
    },
    {
        "key": "YHR",
        "city": "Chevery",
        "name": "Chevery Arpt",
        "country": "Canada"
    },
    {
        "key": "YHS",
        "city": "Sechelt",
        "name": "Sechelt Arpt",
        "country": "Canada"
    },
    {
        "key": "YHT",
        "city": "Haines Junction",
        "name": "Haines Junction",
        "country": "Canada"
    },
    {
        "key": "YHU",
        "city": "Montreal",
        "name": "St Hubert Arpt",
        "country": "Canada"
    },
    {
        "key": "YHY",
        "city": "Hay River",
        "name": "Hay River Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YHZ",
        "city": "Halifax",
        "name": "Halifax Intl",
        "country": "Canada"
    },
    {
        "key": "YIB",
        "city": "Atikokan",
        "name": "Atikokan Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YIF",
        "city": "Pakuashipi",
        "name": "Pakuashipi Arpt",
        "country": "Canada"
    },
    {
        "key": "YIH",
        "city": "Yichang",
        "name": "Yichang Arpt",
        "country": "China"
    },
    {
        "key": "YIK",
        "city": "Ivujivik",
        "name": "Ivujivik Arpt",
        "country": "Canada"
    },
    {
        "key": "YIN",
        "city": "Yining",
        "name": "Yining Arpt",
        "country": "China"
    },
    {
        "key": "YIO",
        "city": "Pond Inlet",
        "name": "Pond Inlet Arpt",
        "country": "Canada"
    },
    {
        "key": "YIP",
        "city": "Detroit",
        "name": "Willow Run Arpt",
        "country": "United States"
    },
    {
        "key": "YIV",
        "city": "Island Lake",
        "name": "Island Lake Airport (Garden Hill Airport)",
        "country": "Canada"
    },
    {
        "key": "YIW",
        "city": "Yiwu",
        "name": "Yiwu Arpt",
        "country": "China"
    },
    {
        "key": "YJB",
        "city": "Sants",
        "name": "Sants Railway Station",
        "country": "Spain"
    },
    {
        "key": "YJP",
        "city": "Hinton, Alberta, Canada",
        "name": "Hinton/Jasper-Hinton Airport (TC: CEC4)",
        "country": "Canada"
    },
    {
        "key": "YJT",
        "city": "Stephenville",
        "name": "Stephenville Municipal",
        "country": "Canada"
    },
    {
        "key": "YJV",
        "city": "Valencia",
        "name": "Valencia Railway Station",
        "country": "Spain"
    },
    {
        "key": "YKA",
        "city": "Kamloops",
        "name": "Davie Fulton Arpt",
        "country": "Canada"
    },
    {
        "key": "YKD",
        "city": "Kincardine",
        "name": "Kincardine Municipal Airport",
        "country": "Canada"
    },
    {
        "key": "YKE",
        "city": "Knee Lake, Manitoba, Canada",
        "name": "Knee Lake Airport (TC: CJT3)",
        "country": "Canada"
    },
    {
        "key": "YKF",
        "city": "Kitchener",
        "name": "Kitchener Waterloo Regional",
        "country": "Canada"
    },
    {
        "key": "YKG",
        "city": "Kangirsuk",
        "name": "Kangirsuk Arpt",
        "country": "Canada"
    },
    {
        "key": "YKL",
        "city": "Schefferville",
        "name": "Schefferville Arpt",
        "country": "Canada"
    },
    {
        "key": "YKM",
        "city": "Yakima",
        "name": "Yakima Terminal Arpt",
        "country": "United States"
    },
    {
        "key": "YKN",
        "city": "Yankton",
        "name": "Chan Gurney Municipal",
        "country": "United States"
    },
    {
        "key": "YKQ",
        "city": "Waskaganish",
        "name": "Waskaganish Arpt",
        "country": "Canada"
    },
    {
        "key": "YKS",
        "city": "Yakutsk",
        "name": "Yakutsk Arpt",
        "country": "Russian Federation"
    },
    {
        "key": "YKT",
        "city": "Klemtu",
        "name": "Klemtu",
        "country": "Canada"
    },
    {
        "key": "YKU",
        "city": "Chisasibi",
        "name": "Chisasibi Arpt",
        "country": "Canada"
    },
    {
        "key": "YKX",
        "city": "Kirkland",
        "name": "Kirkland Lake Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YKY",
        "city": "Saskatoon",
        "name": "Kindersley Arpt",
        "country": "Canada"
    },
    {
        "key": "YKZ",
        "city": "Toronto",
        "name": "Buttonville Arpt",
        "country": "Canada"
    },
    {
        "key": "YLB",
        "city": "Lac La Biche, Alberta, Canada",
        "name": "Lac La Biche Airport",
        "country": "Canada"
    },
    {
        "key": "YLC",
        "city": "Kimmirut Lake Harbour",
        "name": "Kimmirut Lake Harbour Arpt",
        "country": "Canada"
    },
    {
        "key": "YLD",
        "city": "Chapleau",
        "name": "Chapleau Rail Station",
        "country": "Canada"
    },
    {
        "key": "YLI",
        "city": "Ylivieska",
        "name": "Ylivieska Arpt",
        "country": "Finland"
    },
    {
        "key": "YLJ",
        "city": "Meadow Lake",
        "name": "Meadow Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YLL",
        "city": "Lloydminster",
        "name": "Lloydminster Arpt",
        "country": "Canada"
    },
    {
        "key": "YLQ",
        "city": "La Tuque",
        "name": "La Tuque Rail Station",
        "country": "Canada"
    },
    {
        "key": "YLW",
        "city": "Kelowna",
        "name": "Kelowna International Airport",
        "country": "Canada"
    },
    {
        "key": "YLY",
        "city": "Langley",
        "name": "Langley Regional Arpt",
        "country": "Canada"
    },
    {
        "key": "YMB",
        "city": "Merritt",
        "name": "Merritt Arpt",
        "country": "Canada"
    },
    {
        "key": "YME",
        "city": "Matane",
        "name": "Matane Airport",
        "country": "Canada"
    },
    {
        "key": "YMG",
        "city": "Manitouwadge",
        "name": "Manitouwadge Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YMH",
        "city": "Marys Harbour",
        "name": "Marys Harbour Arpt",
        "country": "Canada"
    },
    {
        "key": "YMI",
        "city": "Minaki",
        "name": "Minaki Rail Station",
        "country": "Canada"
    },
    {
        "key": "YMJ",
        "city": "Regina",
        "name": "Moose Jaw Arpt",
        "country": "Canada"
    },
    {
        "key": "YMM",
        "city": "Ft McMurray",
        "name": "Ft McMurray Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YMN",
        "city": "Makkovik",
        "name": "Makkovik Arpt",
        "country": "Canada"
    },
    {
        "key": "YMO",
        "city": "Moosonee",
        "name": "Moosonee Arpt",
        "country": "Canada"
    },
    {
        "key": "YMT",
        "city": "Chibougamau",
        "name": "Chibougamau Arpt",
        "country": "Canada"
    },
    {
        "key": "YMX",
        "city": "Montreal",
        "name": "Mirabel Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YMY",
        "city": "Montreal",
        "name": "Montreal Downtown Rail Station",
        "country": "Canada"
    },
    {
        "key": "YNA",
        "city": "Natashquan",
        "name": "Natashquan Arpt",
        "country": "Canada"
    },
    {
        "key": "YNB",
        "city": "Yanbo",
        "name": "Yanbo Arpt",
        "country": "Saudi Arabia"
    },
    {
        "key": "YND",
        "city": "Gatineau Hull",
        "name": "Gatineau Hull Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YNE",
        "city": "Norway House",
        "name": "Norway House Airport",
        "country": "Canada"
    },
    {
        "key": "YNG",
        "city": "Youngstown",
        "name": "Youngstown Municipal",
        "country": "United States"
    },
    {
        "key": "YNH",
        "city": "Hudsons Hope",
        "name": "Hudsons Hope Airport",
        "country": "Canada"
    },
    {
        "key": "YNJ",
        "city": "Yanji",
        "name": "Yanji Arpt",
        "country": "China"
    },
    {
        "key": "YNL",
        "city": "Points North Landing, Saskatchewan, Canada",
        "name": "Points North Landing Airport",
        "country": "Canada"
    },
    {
        "key": "YNN",
        "city": "Yandicoogina",
        "name": "Yandi Arpt",
        "country": "Australia"
    },
    {
        "key": "YNO",
        "city": "North Spirit Lake",
        "name": "North Spirit Lake Airport (TC: CKQ3)",
        "country": "Canada"
    },
    {
        "key": "YNP",
        "city": "Natuashish",
        "name": "Natuashish Arpt",
        "country": "Canada"
    },
    {
        "key": "YNS",
        "city": "Nemiscau, Quebec, Canada",
        "name": "Nemiscau Airport",
        "country": "Canada"
    },
    {
        "key": "YNT",
        "city": "Yantai",
        "name": "Laishan Arpt",
        "country": "China"
    },
    {
        "key": "YNY",
        "city": "Yangyang",
        "name": "Yangyang International Airport",
        "country": "South Korea"
    },
    {
        "key": "YNZ",
        "city": "Yancheng",
        "name": "Nanyang",
        "country": "China"
    },
    {
        "key": "YOC",
        "city": "Old Crow",
        "name": "Old Crow Airport",
        "country": "Canada"
    },
    {
        "key": "YOD",
        "city": "Cold Lake",
        "name": "Cold Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YOH",
        "city": "Oxford House, Manitoba, Canada",
        "name": "Oxford House Airport",
        "country": "Canada"
    },
    {
        "key": "YOJ",
        "city": "High Level",
        "name": "Footner Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YOK",
        "city": "Yokohama",
        "name": "Yokohama Airport",
        "country": "Japan"
    },
    {
        "key": "YOL",
        "city": "Jimeta",
        "name": "Yola Airport",
        "country": "Nigeria"
    },
    {
        "key": "YOO",
        "city": "Oshawa",
        "name": "Oshawa Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YOP",
        "city": "Rainbow Lake",
        "name": "Rainbow Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YOS",
        "city": "Owen Sound",
        "name": "Billy Bishop Regional Arpt",
        "country": "Canada"
    },
    {
        "key": "YOT",
        "city": "Yotvata",
        "name": "Yotvata Arpt",
        "country": "Israel"
    },
    {
        "key": "YOW",
        "city": "Ottawa",
        "name": "Ottawa Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YPA",
        "city": "Prince Albert",
        "name": "Prince Albert Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YPB",
        "city": "Port Alberni",
        "name": "Port Alberni Arpt",
        "country": "Canada"
    },
    {
        "key": "YPD",
        "city": "Parry Sound",
        "name": "Parry Sound Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YPE",
        "city": "Peace River",
        "name": "Municipal Peace River",
        "country": "Canada"
    },
    {
        "key": "YPF",
        "city": "Esquimalt",
        "name": "Esquimalt Rail Station",
        "country": "Canada"
    },
    {
        "key": "YPG",
        "city": "Portage La Prairie",
        "name": "Portage La Prairie Rail Station",
        "country": "Canada"
    },
    {
        "key": "YPH",
        "city": "Inukjuak",
        "name": "Inukjuak Arpt",
        "country": "Canada"
    },
    {
        "key": "YPJ",
        "city": "Aupaluk",
        "name": "Aupaluk Arpt",
        "country": "Canada"
    },
    {
        "key": "YPL",
        "city": "Pickle Lake",
        "name": "Pickle Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YPM",
        "city": "St Pierre",
        "name": "Pikangikum Arpt",
        "country": "Canada"
    },
    {
        "key": "YPN",
        "city": "Port Menier",
        "name": "Port Menier Arpt",
        "country": "Canada"
    },
    {
        "key": "YPQ",
        "city": "Peterborough",
        "name": "Peterborough Arpt",
        "country": "Canada"
    },
    {
        "key": "YPR",
        "city": "Prince Rupert",
        "name": "Digby Island Arpt",
        "country": "Canada"
    },
    {
        "key": "YPS",
        "city": "Port Hawkesbury",
        "name": "Port Hawkesbury Arpt",
        "country": "Canada"
    },
    {
        "key": "YPW",
        "city": "Powell River",
        "name": "Westview Arpt",
        "country": "Canada"
    },
    {
        "key": "YPX",
        "city": "Puvirnituq",
        "name": "Povungnituk Arpt",
        "country": "Canada"
    },
    {
        "key": "YPZ",
        "city": "Burns Lake",
        "name": "Burns Lake Rail Station",
        "country": "Canada"
    },
    {
        "key": "YQA",
        "city": "Muskoka",
        "name": "Muskoka Arpt",
        "country": "Canada"
    },
    {
        "key": "YQB",
        "city": "Quebec",
        "name": "Quebec Intl",
        "country": "Canada"
    },
    {
        "key": "YQC",
        "city": "Quaqtaq",
        "name": "Quaqtaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YQD",
        "city": "The Pas",
        "name": "The Pas Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YQF",
        "city": "Calgary",
        "name": "Red Deer Arpt",
        "country": "Canada"
    },
    {
        "key": "YQG",
        "city": "Windsor",
        "name": "Windsor Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YQH",
        "city": "Watson Lake",
        "name": "Watson Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YQI",
        "city": "Yarmouth",
        "name": "Municipal Yarmouth",
        "country": "Canada"
    },
    {
        "key": "YQJ",
        "city": "Quadra Island, British Columbia",
        "name": "April Point Water Aerodrome",
        "country": "Canada"
    },
    {
        "key": "YQK",
        "city": "Kenora",
        "name": "Kenora Arpt",
        "country": "Canada"
    },
    {
        "key": "YQL",
        "city": "Lethbridge",
        "name": "Lethbridge Arpt",
        "country": "Canada"
    },
    {
        "key": "YQM",
        "city": "Moncton",
        "name": "Moncton Municipal",
        "country": "Canada"
    },
    {
        "key": "YQN",
        "city": "Nakina",
        "name": "Nakina Rail Station",
        "country": "Canada"
    },
    {
        "key": "YQQ",
        "city": "Comox",
        "name": "Royal Canadian Air Force Station",
        "country": "Canada"
    },
    {
        "key": "YQR",
        "city": "Regina",
        "name": "Regina Municipal",
        "country": "Canada"
    },
    {
        "key": "YQS",
        "city": "St Thomas",
        "name": "Pembroke Area Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YQT",
        "city": "Thunder Bay",
        "name": "Thunder Bay Arpt",
        "country": "Canada"
    },
    {
        "key": "YQU",
        "city": "Grande Prairie",
        "name": "Grande Prairie Arpt",
        "country": "Canada"
    },
    {
        "key": "YQV",
        "city": "Yorkton",
        "name": "Yorkton Airport",
        "country": "Canada"
    },
    {
        "key": "YQW",
        "city": "North Battleford",
        "name": "North Battleford Arpt",
        "country": "Canada"
    },
    {
        "key": "YQX",
        "city": "Gander",
        "name": "Gander International",
        "country": "Canada"
    },
    {
        "key": "YQY",
        "city": "Sydney",
        "name": "Sydney Airport",
        "country": "Canada"
    },
    {
        "key": "YQZ",
        "city": "Quesnel",
        "name": "Quesnel Arpt",
        "country": "Canada"
    },
    {
        "key": "YRB",
        "city": "Resolute",
        "name": "Resolute Arpt",
        "country": "Canada"
    },
    {
        "key": "YRF",
        "city": "Cartwright",
        "name": "Cartwright Arpt",
        "country": "Canada"
    },
    {
        "key": "YRG",
        "city": "Rigolet",
        "name": "Rigolet Arpt",
        "country": "Canada"
    },
    {
        "key": "YRI",
        "city": "Riviere Du Loup",
        "name": "Riviere Du Loup Arpt",
        "country": "Canada"
    },
    {
        "key": "YRJ",
        "city": "Roberval",
        "name": "Roberval Airport",
        "country": "Canada"
    },
    {
        "key": "YRL",
        "city": "Red Lake",
        "name": "Federal Red Lake",
        "country": "Canada"
    },
    {
        "key": "YRM",
        "city": "Rocky Mountain House, Alberta, Canada",
        "name": "Rocky Mountain House Airport",
        "country": "Canada"
    },
    {
        "key": "YRO",
        "city": "Ottawa",
        "name": "Rockcliffe St Arpt",
        "country": "Canada"
    },
    {
        "key": "YRQ",
        "city": "Trois Rivieres",
        "name": "Three Rivers Arpt",
        "country": "Canada"
    },
    {
        "key": "YRR",
        "city": "Campbell River",
        "name": "Stuart Island Airport",
        "country": "Canada"
    },
    {
        "key": "YRT",
        "city": "Rankin Inlet",
        "name": "Rankin Inlet Arpt",
        "country": "Canada"
    },
    {
        "key": "YRV",
        "city": "Revelstoke",
        "name": "Revelstoke Airport",
        "country": "Canada"
    },
    {
        "key": "YSA",
        "city": "Sable Island, Nova Scotia, Canada",
        "name": "Sable Island Aerodrome",
        "country": "Canada"
    },
    {
        "key": "YSB",
        "city": "Sudbury",
        "name": "Sudbury Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YSC",
        "city": "Sherbrooke",
        "name": "Sherbrooke Airport",
        "country": "Canada"
    },
    {
        "key": "YSH",
        "city": "Smith Falls",
        "name": "Smith Falls Rail Station",
        "country": "Canada"
    },
    {
        "key": "YSJ",
        "city": "St John",
        "name": "St John Municipal",
        "country": "Canada"
    },
    {
        "key": "YSK",
        "city": "Sanikiluaq",
        "name": "Sanikiluaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YSL",
        "city": "St Leonard",
        "name": "Edmunston Arpt",
        "country": "Canada"
    },
    {
        "key": "YSM",
        "city": "Ft Smith",
        "name": "Ft Smith Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YSN",
        "city": "Salmon Arm",
        "name": "Salmon Arm Municipal",
        "country": "Canada"
    },
    {
        "key": "YSO",
        "city": "Postville",
        "name": "Postville Arpt",
        "country": "Canada"
    },
    {
        "key": "YSP",
        "city": "Marathon",
        "name": "Marathon Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YST",
        "city": "St Theris Point",
        "name": "St Therese Pt Municipal",
        "country": "Canada"
    },
    {
        "key": "YSU",
        "city": "Summerside, Prince Edward Island, Canada",
        "name": "Summerside Airport",
        "country": "Canada"
    },
    {
        "key": "YTA",
        "city": "Pembroke",
        "name": "Pembroke And Area",
        "country": "Canada"
    },
    {
        "key": "YTD",
        "city": "Thicket Portage",
        "name": "Thicket Portage Rail Station",
        "country": "Canada"
    },
    {
        "key": "YTE",
        "city": "Cape Dorset",
        "name": "Cape Dorset Arpt",
        "country": "Canada"
    },
    {
        "key": "YTF",
        "city": "Alma",
        "name": "Alma Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YTG",
        "city": "Sullivan Bay",
        "name": "Sullivan Bay Water Aerodrome",
        "country": "Canada"
    },
    {
        "key": "YTH",
        "city": "Thompson",
        "name": "Thompson Arpt",
        "country": "Canada"
    },
    {
        "key": "YTL",
        "city": "Big Trout",
        "name": "Big Trout Arpt",
        "country": "Canada"
    },
    {
        "key": "YTM",
        "city": "Mont Tremblant",
        "name": "International Airport",
        "country": "Canada"
    },
    {
        "key": "YTP",
        "city": "Tofino",
        "name": "Tofino Sea Plane Base",
        "country": "Canada"
    },
    {
        "key": "YTQ",
        "city": "Tasiujaq",
        "name": "Tasiujaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YTR",
        "city": "Trenton",
        "name": "Trenton Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YTS",
        "city": "Timmins",
        "name": "Timmins Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YTY",
        "city": "Yangzhou",
        "name": "Yangzhou Taizhou Arpt",
        "country": "China"
    },
    {
        "key": "YTZ",
        "city": "Toronto",
        "name": "Toronto City Centre Airport",
        "country": "Canada"
    },
    {
        "key": "YUB",
        "city": "Tuktoyaktuk",
        "name": "Tuktoyaktuk Airport",
        "country": "Canada"
    },
    {
        "key": "YUD",
        "city": "Umiujaq",
        "name": "Umiujaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YUL",
        "city": "Montreal",
        "name": "Pierre Elliott Trudeau Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YUM",
        "city": "Yuma",
        "name": "Yuma Intl",
        "country": "United States"
    },
    {
        "key": "YUS",
        "city": "Yushu",
        "name": "Yushu Batang Airport",
        "country": "China"
    },
    {
        "key": "YUX",
        "city": "Hall Beach",
        "name": "Hall Beach Arpt",
        "country": "Canada"
    },
    {
        "key": "YUY",
        "city": "Rouyn Noranda",
        "name": "Rouyn Noranda Arpt",
        "country": "Canada"
    },
    {
        "key": "YVA",
        "city": "Moroni",
        "name": "Iconi Arpt",
        "country": "Comoros"
    },
    {
        "key": "YVB",
        "city": "Bonaventure",
        "name": "Municipal Bonaventure",
        "country": "Canada"
    },
    {
        "key": "YVE",
        "city": "Vernon",
        "name": "Vernon Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YVG",
        "city": "Vermilion",
        "name": "Vermilion Arpt",
        "country": "Canada"
    },
    {
        "key": "YVM",
        "city": "Qikiqtarjuaq",
        "name": "Qikiqtarjuaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YVO",
        "city": "Val D Or",
        "name": "Val d Or Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YVP",
        "city": "Kuujjuaq",
        "name": "Kuujjuaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YVQ",
        "city": "Norman Wells",
        "name": "Norman Wells Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YVR",
        "city": "Vancouver",
        "name": "Vancouver Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YVZ",
        "city": "Deer Lake",
        "name": "Deer Lake Arpt",
        "country": "Canada"
    },
    {
        "key": "YWB",
        "city": "Kangiqsujuaq",
        "name": "Kangiqsujuaq Arpt",
        "country": "Canada"
    },
    {
        "key": "YWF",
        "city": "Halifax",
        "name": "Dwtown Waterfront Heliport",
        "country": "Canada"
    },
    {
        "key": "YWG",
        "city": "Winnipeg",
        "name": "Winnipeg Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YWH",
        "city": "Victoria",
        "name": "Inner Harbor Sea Plane Arpt",
        "country": "Canada"
    },
    {
        "key": "YWJ",
        "city": "DÃ©line",
        "name": "DÃ©line Airport",
        "country": "Canada"
    },
    {
        "key": "YWK",
        "city": "Wabush",
        "name": "Wabush Arpt",
        "country": "Canada"
    },
    {
        "key": "YWL",
        "city": "Williams Lake",
        "name": "Williams Lake Municipal",
        "country": "Canada"
    },
    {
        "key": "YWR",
        "city": "White River",
        "name": "White River Rail Station",
        "country": "Canada"
    },
    {
        "key": "YWS",
        "city": "Whistler",
        "name": "Whistler Arpt",
        "country": "Canada"
    },
    {
        "key": "YXC",
        "city": "Cranbrook",
        "name": "Cranbrook Municipal",
        "country": "Canada"
    },
    {
        "key": "YXE",
        "city": "Saskatoon",
        "name": "Saskatoon Municipal",
        "country": "Canada"
    },
    {
        "key": "YXH",
        "city": "Medicine Hat",
        "name": "Medicine Hat Airport",
        "country": "Canada"
    },
    {
        "key": "YXJ",
        "city": "Ft St John",
        "name": "Ft St John Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YXK",
        "city": "Rimouski",
        "name": "Rimouski Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YXL",
        "city": "Sioux Lookout",
        "name": "Sioux Lookout Arpt",
        "country": "Canada"
    },
    {
        "key": "YXN",
        "city": "Whale Cove",
        "name": "Whale Cove Arpt",
        "country": "Canada"
    },
    {
        "key": "YXP",
        "city": "Pangnirtung",
        "name": "Pangnirtung Arpt",
        "country": "Canada"
    },
    {
        "key": "YXS",
        "city": "Prince George",
        "name": "Prince George Municipal",
        "country": "Canada"
    },
    {
        "key": "YXT",
        "city": "Terrace",
        "name": "Terrace Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YXU",
        "city": "London",
        "name": "London Municipal",
        "country": "Canada"
    },
    {
        "key": "YXX",
        "city": "Abbotsford",
        "name": "Abbotsford Arpt",
        "country": "Canada"
    },
    {
        "key": "YXY",
        "city": "Whitehorse",
        "name": "Whitehorse Arpt",
        "country": "Canada"
    },
    {
        "key": "YXZ",
        "city": "Wawa",
        "name": "Municipal Wawa",
        "country": "Canada"
    },
    {
        "key": "YYA",
        "city": "Yueyang",
        "name": "Sanhe",
        "country": "China"
    },
    {
        "key": "YYB",
        "city": "North Bay",
        "name": "North Bay Municipal",
        "country": "Canada"
    },
    {
        "key": "YYC",
        "city": "Calgary",
        "name": "Calgary Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YYD",
        "city": "Smithers",
        "name": "Smithers Municipal",
        "country": "Canada"
    },
    {
        "key": "YYE",
        "city": "Fort Nelson",
        "name": "Ft Nelson Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YYF",
        "city": "Penticton",
        "name": "Penticton Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YYG",
        "city": "Charlottetown",
        "name": "Charlottetown Municipal",
        "country": "Canada"
    },
    {
        "key": "YYH",
        "city": "Taloyoak",
        "name": "Taloyoak Arpt",
        "country": "Canada"
    },
    {
        "key": "YYJ",
        "city": "Victoria",
        "name": "Victoria Intl Arpt",
        "country": "Canada"
    },
    {
        "key": "YYL",
        "city": "Lynn Lake",
        "name": "Lynn Lake Rail Station",
        "country": "Canada"
    },
    {
        "key": "YYN",
        "city": "Swift Current",
        "name": "Swift Current Arpt",
        "country": "Canada"
    },
    {
        "key": "YYQ",
        "city": "Churchill",
        "name": "Churchill Arpt",
        "country": "Canada"
    },
    {
        "key": "YYR",
        "city": "Goose Bay",
        "name": "Municipal Goose Bay",
        "country": "Canada"
    },
    {
        "key": "YYT",
        "city": "St Johns",
        "name": "St Johns Arpt",
        "country": "Canada"
    },
    {
        "key": "YYU",
        "city": "Kapuskasing",
        "name": "Kapuskasing Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YYW",
        "city": "Armstromg",
        "name": "Armstrong Rail Station",
        "country": "Canada"
    },
    {
        "key": "YYY",
        "city": "Mont Joli",
        "name": "Mont Joli Arpt",
        "country": "Canada"
    },
    {
        "key": "YYZ",
        "city": "Toronto",
        "name": "Lester B Pearson Intl",
        "country": "Canada"
    },
    {
        "key": "YZA",
        "city": "Ashcroft",
        "name": "Ashcroft Rail Station",
        "country": "Canada"
    },
    {
        "key": "YZF",
        "city": "Yellowknife",
        "name": "Yellowknife Arpt",
        "country": "Canada"
    },
    {
        "key": "YZG",
        "city": "Salluit",
        "name": "Salluit Arpt",
        "country": "Canada"
    },
    {
        "key": "YZP",
        "city": "Sandspit",
        "name": "Federal Airport",
        "country": "Canada"
    },
    {
        "key": "YZR",
        "city": "Sarnia",
        "name": "Sarnia Airport",
        "country": "Canada"
    },
    {
        "key": "YZS",
        "city": "Coral Harbour",
        "name": "Coral Harbour Arpt",
        "country": "Canada"
    },
    {
        "key": "YZT",
        "city": "Port Hardy",
        "name": "Port Hardy Municipal",
        "country": "Canada"
    },
    {
        "key": "YZV",
        "city": "Sept Iles",
        "name": "Sept Iles Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "YZX",
        "city": "Greenwood",
        "name": "Greenwood Arpt",
        "country": "Canada"
    },
    {
        "key": "YZZ",
        "city": "Trail",
        "name": "Trail Airport (TC: CAD4)",
        "country": "Canada"
    },
    {
        "key": "ZAC",
        "city": "York Landing, Manitoba, Canada",
        "name": "York Landing Airport",
        "country": "Canada"
    },
    {
        "key": "ZAD",
        "city": "Zadar",
        "name": "Zadar Arpt",
        "country": "Croatia"
    },
    {
        "key": "ZAG",
        "city": "Zagreb",
        "name": "Zagreb Arpt",
        "country": "Croatia"
    },
    {
        "key": "ZAL",
        "city": "Valdivia",
        "name": "Pichoy",
        "country": "Chile"
    },
    {
        "key": "ZAM",
        "city": "Zamboanga",
        "name": "Zamboanga Airport",
        "country": "Philippines"
    },
    {
        "key": "ZAO",
        "city": "Cahors",
        "name": "Laberandie Arpt",
        "country": "France"
    },
    {
        "key": "ZAQ",
        "city": "Nuremberg",
        "name": "Nuremberg Rail Station",
        "country": "Germany"
    },
    {
        "key": "ZAR",
        "city": "Zaria",
        "name": "Zaria Airport",
        "country": "Nigeria"
    },
    {
        "key": "ZAT",
        "city": "Zhaotong",
        "name": "Zhaotong",
        "country": "China"
    },
    {
        "key": "ZAZ",
        "city": "Zaragoza",
        "name": "Zaragoza Airport",
        "country": "Spain"
    },
    {
        "key": "ZBA",
        "city": "Mulhouse Basel",
        "name": "Basel/Mullhouse Rail Service",
        "country": "France"
    },
    {
        "key": "ZBB",
        "city": "Esbjerg",
        "name": "Esbjerg Railway Station",
        "country": "Denmark"
    },
    {
        "key": "ZBD",
        "city": "Jiang Men",
        "name": "Jiang Men Ferry",
        "country": "China"
    },
    {
        "key": "ZBF",
        "city": "Bathurst",
        "name": "Bathurst Arpt",
        "country": "Canada"
    },
    {
        "key": "ZBL",
        "city": "Biloela",
        "name": "Biloela Arpt",
        "country": "Australia"
    },
    {
        "key": "ZBM",
        "city": "Bromont",
        "name": "Bromont Regional Arpt",
        "country": "Canada"
    },
    {
        "key": "ZBP",
        "city": "Washington",
        "name": "Baltimore Railway Station",
        "country": "United States"
    },
    {
        "key": "ZBQ",
        "city": "Odense",
        "name": "Odense Railroad Station",
        "country": "Denmark"
    },
    {
        "key": "ZBR",
        "city": "Konarak",
        "name": "Konarak Airport",
        "country": "Iran"
    },
    {
        "key": "ZBV",
        "city": "Eagle",
        "name": "Beaver Creek Van Service",
        "country": "United States"
    },
    {
        "key": "ZBY",
        "city": "Xayaboury",
        "name": "Sayaboury Airport",
        "country": "Laos"
    },
    {
        "key": "ZCC",
        "city": "Karlsruhe Baden Baden",
        "name": "Baden Rail Station",
        "country": "Germany"
    },
    {
        "key": "ZCL",
        "city": "Zacatecas",
        "name": "Zacatecas Airport",
        "country": "Mexico"
    },
    {
        "key": "ZDH",
        "city": "Mulhouse Basel",
        "name": "Basel/Mullhouse SBB Rail Service",
        "country": "France"
    },
    {
        "key": "ZDI",
        "city": "Bellinzona",
        "name": "Bellinzona Rail Station",
        "country": "Switzerland"
    },
    {
        "key": "ZDJ",
        "city": "Berne",
        "name": "Berne Railroad Station",
        "country": "Switzerland"
    },
    {
        "key": "ZDO",
        "city": "Buch Sg",
        "name": "Buchs SG Rail Station",
        "country": "Switzerland"
    },
    {
        "key": "ZDU",
        "city": "Dundee",
        "name": "Dundee ScotRail",
        "country": "United Kingdom"
    },
    {
        "key": "ZDX",
        "city": "Dietikon",
        "name": "Dietikon Rail Station",
        "country": "Switzerland"
    },
    {
        "key": "ZEC",
        "city": "Secunda",
        "name": "Secunda Arpt",
        "country": "South Africa"
    },
    {
        "key": "ZEL",
        "city": "Bella Bella, British Columbia, Canada",
        "name": "Bella Bella (Campbell Island) Airport",
        "country": "Canada"
    },
    {
        "key": "ZEP",
        "city": "London",
        "name": "London - Victoria Railway Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZER",
        "city": "Zero",
        "name": "Zero Airport",
        "country": "India"
    },
    {
        "key": "ZFA",
        "city": "Faro",
        "name": "Faro Airport",
        "country": "Portugal"
    },
    {
        "key": "ZFI",
        "city": "Chesterfield",
        "name": "Chesterfield Bus Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZFJ",
        "city": "Rennes",
        "name": "Gare de Rennes",
        "country": "France"
    },
    {
        "key": "ZFN",
        "city": "Tulita",
        "name": "Tulita Airport",
        "country": "Canada"
    },
    {
        "key": "ZFQ",
        "city": "Bordeaux",
        "name": "Gare de Bordeaux",
        "country": "France"
    },
    {
        "key": "ZFT",
        "city": "Miami",
        "name": "Ft Lauderdale Rail Station",
        "country": "United States"
    },
    {
        "key": "ZFV",
        "city": "Philadelphia",
        "name": "Philadelphia Rail Station",
        "country": "United States"
    },
    {
        "key": "ZGH",
        "city": "Copenhagen",
        "name": "Copenhagen Rail Station",
        "country": "Denmark"
    },
    {
        "key": "ZGN",
        "city": "Zhongshan",
        "name": "Zhongshan airport ferry",
        "country": "China"
    },
    {
        "key": "ZGR",
        "city": "Little Grand Rapids",
        "name": "Little Grand Rapids Airport",
        "country": "Canada"
    },
    {
        "key": "ZGS",
        "city": "Gethsemanie",
        "name": "Gethsemanie Arpt",
        "country": "Canada"
    },
    {
        "key": "ZGU",
        "city": "Gaua",
        "name": "Gaua Airport",
        "country": "Vanuatu"
    },
    {
        "key": "ZHA",
        "city": "Zhangjiang",
        "name": "Zhanjiang Airport",
        "country": "China"
    },
    {
        "key": "ZHC",
        "city": "Philadelphia",
        "name": "PHL PA NORTH RAILWAY STATION",
        "country": "United States"
    },
    {
        "key": "ZHE",
        "city": "Frauenfeld",
        "name": "Frauenfeld Rail Station",
        "country": "Switzerland"
    },
    {
        "key": "ZHM",
        "city": "Sylhet",
        "name": "Shamshernagar Airport",
        "country": "Bangladesh"
    },
    {
        "key": "ZHO",
        "city": "Houston",
        "name": "Houston Bus Station",
        "country": "Canada"
    },
    {
        "key": "ZHT",
        "city": "Geneva",
        "name": "Geneva Cornavin Railway Stn",
        "country": "Switzerland"
    },
    {
        "key": "ZHY",
        "city": "Zhongwei",
        "name": "Zhongwei Airport",
        "country": "China"
    },
    {
        "key": "ZIC",
        "city": "Sidney",
        "name": "Victoria Airport",
        "country": "Canada"
    },
    {
        "key": "ZID",
        "city": "Aarhus",
        "name": "Aarhus Bus Service",
        "country": "Denmark"
    },
    {
        "key": "ZIF",
        "city": "Ottawa",
        "name": "Fallowfield Railway Station",
        "country": "Canada"
    },
    {
        "key": "ZIG",
        "city": "Ziguinchor",
        "name": "Ziguinchor Arpt",
        "country": "Senegal"
    },
    {
        "key": "ZIH",
        "city": "Zihuatanejo",
        "name": "Zihuatanejo Intl",
        "country": "Mexico"
    },
    {
        "key": "ZIM",
        "city": "Odense",
        "name": "Odense Bus Service",
        "country": "Denmark"
    },
    {
        "key": "ZIV",
        "city": "Inverness",
        "name": "Inverness ScotRail Station",
        "country": "United Kingdom"
    },
    {
        "key": "ZIZ",
        "city": "Dadu",
        "name": "Zamzama Heliport",
        "country": "Pakistan"
    },
    {
        "key": "ZJH",
        "city": "Aarhus",
        "name": "Aarhus Rail Station",
        "country": "Denmark"
    },
    {
        "key": "ZJN",
        "city": "Swan River",
        "name": "Swan River Municipal Arpt",
        "country": "Canada"
    },
    {
        "key": "ZJO",
        "city": "San Jose",
        "name": "San Jose Bus Service",
        "country": "United States"
    },
    {
        "key": "ZKD",
        "city": "Moscow",
        "name": "Leningradskiy Rail Station",
        "country": "Russian Federation"
    },
    {
        "key": "XTG",
        "city": "Thargomindah",
        "name": "Thargomindah Arpt",
        "country": "Australia"
    },
    {
        "key": "XTK",
        "city": "Harrogate",
        "name": "Thirsk Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XTR",
        "city": "Tara",
        "name": "Tara Airport",
        "country": "Australia"
    },
    {
        "key": "XTY",
        "city": "Strathroy",
        "name": "Strathroy Rail Station",
        "country": "Canada"
    },
    {
        "key": "XUZ",
        "city": "Xuzhou",
        "name": "Xuzhou Arpt",
        "country": "China"
    },
    {
        "key": "XVA",
        "city": "Stockport",
        "name": "Stockport Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVB",
        "city": "Birmingham",
        "name": "Stafford Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVC",
        "city": "Manchester",
        "name": "Crewe Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVG",
        "city": "Durham",
        "name": "Darlington Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVH",
        "city": "Peterborough",
        "name": "Peterborough Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVJ",
        "city": "Stevenage",
        "name": "Stevenage Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVK",
        "city": "Bergen",
        "name": "Voss Rail Station",
        "country": "Norway"
    },
    {
        "key": "XVL",
        "city": "Vinh Long (VÄ©nh Long), Vietnam",
        "name": "Vinh Long Airport",
        "country": "Vietnam"
    },
    {
        "key": "XVQ",
        "city": "Venice",
        "name": "Santa Lucia Railway Station",
        "country": "Italy"
    },
    {
        "key": "XVU",
        "city": "Newcastle",
        "name": "Durham Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVV",
        "city": "Belleville",
        "name": "Belleville Rail Station",
        "country": "Canada"
    },
    {
        "key": "XVW",
        "city": "Wolverhampton",
        "name": "Belleville Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XVY",
        "city": "Venice",
        "name": "Mestre Railway Station",
        "country": "Italy"
    },
    {
        "key": "XWA",
        "city": "Watford",
        "name": "Watford Rail Station",
        "country": "Canada"
    },
    {
        "key": "XWC",
        "city": "Vienna",
        "name": "Suedbahnhof Railway Station",
        "country": "Austria"
    },
    {
        "key": "XWD",
        "city": "Wakefield Westgate",
        "name": "Wakefield Westgate Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XWF",
        "city": "Falun",
        "name": "Falun Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XWG",
        "city": "Strasbourg City",
        "name": "Strasbourg Rail Station",
        "country": "France"
    },
    {
        "key": "XWH",
        "city": "Stoke On Trent",
        "name": "Stroke on Trent Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XWK",
        "city": "Ronneby",
        "name": "Karlskrona Railway Station",
        "country": "Sweden"
    },
    {
        "key": "XWL",
        "city": "Gothenburg",
        "name": "Gothenburg Rail",
        "country": "Sweden"
    },
    {
        "key": "XWM",
        "city": "Orebro Bofors",
        "name": "Hallsberg Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XWN",
        "city": "Liverpool",
        "name": "Warrington B Q Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XWP",
        "city": "Hassleholm",
        "name": "Hassleholm Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XWR",
        "city": "Orebro Bofors",
        "name": "Orebro Bofors Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XWS",
        "city": "Swindon",
        "name": "Swindon Rail Station",
        "country": "United Kingdom"
    },
    {
        "key": "XWW",
        "city": "Vienna",
        "name": "Westbahnhof Railway Station",
        "country": "Austria"
    },
    {
        "key": "XWY",
        "city": "Wyoming",
        "name": "Wyoming Rail Station",
        "country": "Canada"
    },
    {
        "key": "XXA",
        "city": "Alvesta",
        "name": "Alvesta Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XXD",
        "city": "Degerfors",
        "name": "Degerfors Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XXJ",
        "city": "Budapest",
        "name": "Deli Area Railway Stations",
        "country": "Hungary"
    },
    {
        "key": "XXK",
        "city": "Katrineholm",
        "name": "Katrineholm C Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XXL",
        "city": "Lille Hammer",
        "name": "Lillehammer Rail Station",
        "country": "Norway"
    },
    {
        "key": "XXM",
        "city": "Mjolby",
        "name": "Mjolby Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XXO",
        "city": "Borlange",
        "name": "Leksand Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XXQ",
        "city": "Budapest",
        "name": "Deli Area Railway Stattions",
        "country": "Hungary"
    },
    {
        "key": "XXU",
        "city": "Borlange",
        "name": "Hedemora Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XXY",
        "city": "Ronneby",
        "name": "Ronneby Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XXZ",
        "city": "Sundsvall",
        "name": "Sundsvall Rail Service",
        "country": "Sweden"
    },
    {
        "key": "XYB",
        "city": "Borlange",
        "name": "Borlange Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XYC",
        "city": "Jonkoping",
        "name": "Herrljunga Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYD",
        "city": "Lyon",
        "name": "Port Dieu Rail Station",
        "country": "France"
    },
    {
        "key": "XYF",
        "city": "Jonkoping",
        "name": "Falkoping Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYG",
        "city": "Prague",
        "name": "Prague Main Railway Station",
        "country": "Czech Republic"
    },
    {
        "key": "XYH",
        "city": "Helsingborg",
        "name": "Helsingborg Railway service",
        "country": "Sweden"
    },
    {
        "key": "XYK",
        "city": "Norrkoping",
        "name": "Norrkoping Railway Service",
        "country": "Sweden"
    },
    {
        "key": "XYL",
        "city": "Lyon",
        "name": "Lyon Perrache",
        "country": "France"
    },
    {
        "key": "XYM",
        "city": "Halmstad",
        "name": "Falkenberg Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYN",
        "city": "Kristinehamn",
        "name": "Kristinehamn Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYO",
        "city": "Ronneby",
        "name": "Karlshamn Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYQ",
        "city": "Angelholm",
        "name": "Angelholm Railway Station",
        "country": "Sweden"
    },
    {
        "key": "XYU",
        "city": "Kristianstad",
        "name": "Solvesborg Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYX",
        "city": "Vasteras",
        "name": "Sala Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XYY",
        "city": "Arvika",
        "name": "Arvika Rail Station",
        "country": "Sweden"
    },
    {
        "key": "XZB",
        "city": "Casselman",
        "name": "Casselman Rail Station",
        "country": "Canada"
    },
    {
        "key": "XZC",
        "city": "Glencoe",
        "name": "Glencoe Rail Station",
        "country": "Canada"
    },
    {
        "key": "XZD",
        "city": "Kongsvinger",
        "name": "Kongsvinger Rail Station",
        "country": "Norway"
    },
    {
        "key": "XZI",
        "city": "Metz Nancy",
        "name": "Railway Station Metz",
        "country": "France"
    },
    {
        "key": "XZK",
        "city": "Amherst",
        "name": "Amherst Rail Station",
        "country": "Canada"
    },
    {
        "key": "XZL",
        "city": "Edmonton",
        "name": "Edmonton Rail Station",
        "country": "Canada"
    },
    {
        "key": "XZM",
        "city": "Macau",
        "name": "Macau Ferry",
        "country": "Macao"
    },
    {
        "key": "XZN",
        "city": "Avignon",
        "name": "Avignon Railway Station",
        "country": "France"
    },
    {
        "key": "XZO",
        "city": "Oslo",
        "name": "Oslo Central Station",
        "country": "Norway"
    },
    {
        "key": "XZT",
        "city": "Trondheim",
        "name": "Trondheim Rail Station",
        "country": "Norway"
    },
    {
        "key": "XZV",
        "city": "Toulon",
        "name": "TGV Station Toulon",
        "country": "France"
    },
    {
        "key": "YAB",
        "city": "Arctic Bay",
        "name": "Arctic Bay Airport (TC: CJX7)",
        "country": "Canada"
    }
]

module.exports = airlineLocations;