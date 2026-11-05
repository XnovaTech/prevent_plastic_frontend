export type RepairShop = {
  id: string
  category: string
  name: string
  phone: string
  social: string | null
  address: string
  city: string
  mapUrl: string
  description: string
  priceRange: string
  size: "Small" | "Medium" | "Large"
  contact: string
  image: string
}

export const repairShops: RepairShop[] = [
  {
    id: "1",
    category: "Thrift Fashion",
    name: "Korea Outlets & Vintage Clothing (Hledan Branch 2)",
    phone: "09 4269 15878",
    social: "Korea_outlets&vintage_clothing (TikTok/Facebook)",
    address:
      "D-mate Stationery တစ်ဆိုင်ကျော်၊ ရန်ကုန်-အင်းစိန်လမ်းမ၊ လှည်းတန်းမီးပွိုင့်အနီး၊ ကမာရွတ်မြို့နယ်",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/gRrZLAja1epg54FZ9",
    description:
      "အမျိုးအစားစုံသော ကုတ်အင်္ကျီ၊ အပေါ်ဝတ်၊ စကတ်၊ ဂျင်းဘောင်းဘီ၊ စတိုင်ပန့်များ အခြားသော accessories များပါ တစ်နေရာတည်း စုံစုံလင်လင်ဝယ်ယူရရှိနိုင်ပါသည်။ Live Sale လည်း ရောင်းပါသည်။",
    priceRange: "4,800 – 21,800 kyats",
    size: "Large",
    contact: "May Myat Thu",
    image: "/products/wovenMarketBag.jpg",
  },
  {
    id: "2",
    category: "Thrift Fashion",
    name: "Timeless",
    phone: "09 755 259 447",
    social: "Timeless Premium Vintage Store (TikTok/Facebook)",
    address: "အမှတ် ၁၉၊ ဦးထွန်းလင်းခြံလမ်း",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/VHnVkdYAfkjZkKR26",
    description:
      "အမျိုးအစားစုံသော ကုတ်အင်္ကျီ၊ အပေါ်ဝတ်၊ စကတ်၊ ဘောင်းဘီများ စုံစုံလင်လင်ဝယ်ယူရရှိနိုင်ပါသည်။ ဈေးနှုန်းသက်သာပြီး service လည်းကောင်းပါသည်။",
    priceRange: "6,000 – 28,000 kyats",
    size: "Large",
    contact: "May Myat Thu",
    image: "/products/ceramicPlates.jpg",
  },
  {
    id: "3",
    category: "Thrift Fashion",
    name: "DNU Thrift & Vintage Store (South Okkalapa)",
    phone: "09 4269 15878",
    social: "DNU Thrift & Vintage Store (Facebook/TikTok)",
    address:
      "အမှတ် (၂၃)၊ (၅/၇) ဗြဟ္မစိုရ်လမ်း၊ (၇) ရပ်ကွက်၊ တောင်ဥက္ကလာပမြို့နယ် (Wah Wah Thin gym အောက်ထပ်)",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/1qpovGco3A4U3P2p9",
    description:
      "Design စုံလင်ပြီး အရည်အသွေးကောင်းသော thrift clothing များကို ဝယ်ယူရရှိနိုင်ပါသည်။",
    priceRange: "ပစ္စည်းအမျိုးအစားပေါ် မူတည်၍ စျေးအပြောင်းအလဲ ရှိနိုင်ပါသည်။",
    size: "Large",
    contact: "May Myat Thu",
    image: "/products/woodenWallShelf.jpg",
  },
  {
    id: "4",
    category: "Repair Clothing",
    name: "ရတနာမိုး",
    phone: "09 971 587 944",
    social: null,
    address: "ABCတန်း နန္ဒဝန်စျေး၊ သုမင်္ဂလာလမ်းမကြီးပေါ်၊ တောင်ဥက္ကလာပ",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/VzUKFRyhAGgbURVd9",
    description:
      "ဆိုင်သက်တမ်း 28 နှစ်ရှိ။ ဘောင်းဘီ၊ ဂျာကင်နှင့် အကျီများကို စိတ်တိုင်းကျသည်အထိ ပြုပြင်ပေးပါသည်။",
    priceRange: "တန်ဖိုးငွေ 7,000 ကျပ်မှ စရှိပါသည်။",
    size: "Small",
    contact: "May Myat Thu",
    image: "/products/deskLamp.jpg",
  },
  {
    id: "5",
    category: "Repair Bag",
    name: "မိတ်သစ်",
    phone: "09 687 687 549 / 09 254 068 639",
    social: null,
    address: "ခ ၅၄/၇၇၊ နန္ဒဝန်စျေးရုံသစ်၊ သုမင်္ဂလာလမ်းမကြီးပေါ်၊ တောင်ဥက္ကလာပ",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/7hi9Zvd4Km3UUooQ7",
    description:
      "ဆိုင်ဖွင့်တာ နှစ်(၃၀)နီးပါးရှိပါပြီ။ ဇစ်ခေါင်းလဲခြင်း၊ luggage အပြင် အိတ်အမျိုးအစားအစုံပြင်ပါသည်။",
    priceRange: "အနည်းဆုံး 1,000 ကျပ်ကစရှိပြီး အိတ်အလိုက် စျေးကွာခြားနိုင်ပါသည်။",
    size: "Small",
    contact: "May Myat Thu",
    image: "/products/wovenMarketBag.jpg",
  },
  {
    id: "6",
    category: "Repair Bag",
    name: "စိတ်တိုင်းကြ",
    phone: "09 755 495 881",
    social: null,
    address: "ခ ၅၈/ ၅၉၊ နန္ဒဝန်စျေးရုံသစ်၊ သုမင်္ဂလာလမ်းမကြီးပေါ်၊ တောင်ဥက္ကလာပ",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/Y8ZJJUAExssNvWa5A",
    description:
      "၁၉၈၈ မတိုင်ခင်တည်းကနေစဖွင့်ခဲ့ပြီး အဖေ့ဆီကနေ သားသမီးတွေကို လက်ဆင့်ကမ်းထားတဲ့ လုပ်ငန်းဖြစ်ပါသည်။ ဇစ်ခေါင်းလဲ/အိတ်ပြင်/ဘောင်းဘီဇစ်လဲခြင်းများ ပြုလုပ်ပေးပါသည်။",
    priceRange:
      "ဇစ်ခေါင်းလဲ- 800 ဝန်းကျင်။ luggage ဇစ်ခေါင်းလဲ- 2,000 ဝန်းကျင်။ အိတ်အသစ်ချုပ်- 600 ကျပ်မှ 3 သောင်းကျော်တန်အထိ။",
    size: "Small",
    contact: "May Myat Thu",
    image: "/products/succulentPot.jpg",
  },
  {
    id: "7",
    category: "Repair Umbrella",
    name: "ဦးထွန်းထွန်းဇော်",
    phone: "09 965 305 811",
    social: null,
    address:
      "နန္ဒဝန်စျေးမှတ်တိုင်၊ Medicare ရှေ့၊ သုမင်္ဂလာလမ်းမကြီးပေါ်၊ တောင်ဥက္ကလာပ",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/Pc2D12NVUJaonUQq7",
    description:
      "ထီးနှင့် ဖိနပ်ပြုပြင်ခြင်း၊ ၁၉၉၆ တည်းက စတင်လုပ်ကိုင်ခဲ့ပါသည်။",
    priceRange:
      "ရှူးဖိနပ် ကော်ကပ်+ ပတ်ကြိုးချုပ်- 8,000 ခန့်။ ဒေါက်ဖိနပ်ပြင်- 4,000 ခန့်။ ထီးအရွက်လဲခြင်း- 12,000 ခန့်။ ထီးကိုင်းလဲခြင်း- 2,000 ခန့်။",
    size: "Small",
    contact: "May Myat Thu",
    image: "/products/deskLamp.jpg",
  },
  {
    id: "8",
    category: "Repair Bike",
    name: "MP Bike Shop",
    phone: "09 262 622 662",
    social: "MP Bike Shop (TikTok/Facebook)",
    address:
      "ပင်းယမှတ်တိုင်အနီး၊ မီတာရုံးနား၊ သုမင်္ဂလာလမ်းမကြီးပေါ်၊ တောင်ဥက္ကလာပ",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/XwB6S4vFEehu7VzU8",
    description:
      "ဖွင့်ထားတာ နှစ် ၂၀ လောက်ရှိပါပြီ။ စက်ဘီးအမျိုးမျိုးပြုပြင်ခြင်း၊ ဂျပန်ကွန်တိန်နာကျ စက်ဘီးများ ရောင်းခြင်း။",
    priceRange: "စက်ဘီးပြင်ခ- Depends, ဂျပန်ကွန်တိန်နာကျ စက်ဘီး- 150,000+",
    size: "Medium",
    contact: "May Myat Thu",
    image: "/products/woodenStool.jpg",
  },
  {
    id: "9",
    category: "Repair Phone",
    name: "အောင်",
    phone: "09 755 605 665 / 09 983 799 661",
    social: null,
    address:
      "အမှတ်(၁)၊ အခန်းအမှတ်(၃/၄)၊ ရန်ကုန်-အင်းစိန်လမ်းမ၊ လှည်းတန်းမီးပွိုင့်အနီး၊ ကမာရွတ်မြို့နယ်",
    city: "Yangon",
    mapUrl: "https://maps.app.goo.gl/Cwb1tsKW716zfjGY7",
    description:
      "နာရီ၊ ဖုန်း၊ တပ်ပလက် အထူးအာမခံ ပြုပြင်ခြင်း",
    priceRange:
      "ပစ္စည်းအမျိုးအစားပေါ် မူတည်၍ စျေးအပြောင်းအလဲ ရှိနိုင်ပါသည်။",
    size: "Small",
    contact: "May Myat Thu",
    image: "/products/filmCamera.jpg",
  },
]
