# Business Logic

## 1. ရည်ရွယ်ချက်နှင့် Scope

Prevent Plastics သည် တစ်ပတ်ရစ်ပစ္စည်းများကို ပြန်လည်ရောင်းချနိုင်သည့် multi-merchant e-commerce marketplace ဖြစ်သည်။ အသုံးပြုပြီးသား ပစ္စည်းများကို ပြန်လည်အသုံးချစေခြင်းဖြင့် စွန့်ပစ်ပစ္စည်းလျှော့ချရေးနှင့် ရေရှည်တည်တံ့သော စားသုံးမှုကို အားပေးသည်။ Marketplace သည် ဒေသခံလုပ်ငန်းငယ်များ၊ လူမှုအကျိုးပြုလုပ်ငန်းများနှင့် merchant များကို ပံ့ပိုးရန် ရည်ရွယ်သည်။

Project ၏ role၊ route၊ type နှင့် API naming များတွင် `Merchant` ကို စံအသုံးအနှုန်းအဖြစ် သုံးပါ။ မြန်မာ UI စာသားတွင် လိုအပ်သလို “ရောင်းချသူ” ဟု သဘာဝကျစွာ ဘာသာပြန်နိုင်သော်လည်း `Vendor` သို့မဟုတ် `Seller` ကို သီးခြား role အမည်အဖြစ် မသုံးပါနှင့်။

Marketplace တွင် အဓိကထားမည့် တစ်ပတ်ရစ်ထုတ်ကုန်အမျိုးအစားများမှာ:

- ပလတ်စတစ်ကင်းစင်သော ထုတ်ကုန်များ
- လက်လုပ်ထုတ်ကုန်များ
- လူမှုအသိုင်းအဝိုင်းမှ ထုတ်လုပ်သော ပစ္စည်းများ
- ပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ကုန်ပစ္စည်းများ
- ရေရှည်တည်တံ့သော လူနေမှုပုံစံဆိုင်ရာ ထုတ်ကုန်များ

အဓိကရည်မှန်းချက်များမှာ ဒေသခံလက်မှုပညာလုပ်ငန်းများကို ပံ့ပိုးရန်၊ ပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်သော ထုတ်ကုန်များကို မြှင့်တင်ရန်၊ ဒေသခံအသိုင်းအဝိုင်းများအတွက် ဝင်ငွေအခွင့်အလမ်း ဖန်တီးရန်နှင့် ယုံကြည်စိတ်ချရသော merchant များဖြင့် marketplace တည်ဆောက်ရန် ဖြစ်သည်။

ဤစာတမ်းသည် လက်ရှိရရှိထားသော requirement ပုံတွင် ဖတ်ရှုနိုင်သည့် အချက်များကိုသာ သတ်မှတ်ထားသည်။ မဖော်ပြထားသော အပြုအမူများကို အတည်ပြုပြီးသား business rule အဖြစ် မယူဆရ။

## ဘာသာစကား ပံ့ပိုးမှု

1. Frontend ကို မြန်မာဘာသာ (`my`) နှင့် အင်္ဂလိပ်ဘာသာ (`en`) နှစ်မျိုးဖြင့် အသုံးပြုနိုင်ရမည်။
2. User သည် language selector မှတစ်ဆင့် ဘာသာစကားပြောင်းနိုင်ရမည်။ ဘာသာပြောင်းသည့်အခါ လက်ရှိ page နှင့် query အခြေအနေကို ဖြစ်နိုင်သမျှ ထိန်းသိမ်းပြီး `en` သို့မဟုတ် `my` locale ပါသော URL ကို အသုံးပြုပါ။
3. ရွေးချယ်ထားသောဘာသာစကားကို refresh နှင့် route navigation ပြီးနောက်လည်း ထိန်းသိမ်းရန်လိုသည်။ Guest အတွက် persistence ကို browser preference/cookie ဖြင့် ဆောင်ရွက်နိုင်ပြီး authenticated user အတွက် account setting နှင့် sync လုပ်မလားကို ဆုံးဖြတ်ရန်လိုသည်။
4. Navigation၊ button၊ form label၊ validation message၊ empty/loading/error state နှင့် email/notification ကဲ့သို့ frontend က ထုတ်ပေးသည့်စာသားများကို မြန်မာနှင့် အင်္ဂလိပ် နှစ်ဘာသာလုံးဖြင့် ပံ့ပိုးပါ။
5. Product title၊ description နှင့် merchant profile ကဲ့သို့ user-generated content များကို ဘာသာစကားနှစ်မျိုးလုံးဖြင့် မဖြစ်မနေထည့်ရမလား၊ မူရင်းဘာသာဖြင့်သာပြမလား၊ ဘာသာပြန်ဝန်ဆောင်မှုရှိမလားကို pending requirement အဖြစ်ထားပါ။ အလိုအလျောက်ဘာသာပြန်ထားသကဲ့သို့ မမှန်ကန်သောစာသားကို မပြပါနှင့်။
6. နေ့စွဲ၊ အရေအတွက်နှင့် ငွေကြေးပမာဏတို့၏ format ကို ဘာသာစကား/ဒေသဆိုင်ရာ သတ်မှတ်ချက်နှင့်အညီ ပြသရမလားကို ဆက်လက်ဆုံးဖြတ်ပါ။

## Homepage နှင့် Navigation

1. Public site header တွင် Logo နှင့် အောက်ပါ navigation ကို အစဉ်လိုက်ပြပါ: Home, SME, Individual, Repair, About us, Contact။ လက်ရှိရွေးချယ်ထားသော language ကိုလည်း header မှ ပြောင်းနိုင်ရမည်။
2. Navigation route များမှာ `/{locale}`, `/{locale}/sme`, `/{locale}/individual`, `/{locale}/repair`, `/{locale}/about`, `/{locale}/contact` ဖြစ်သည်။
3. Homepage section များကို အောက်ပါအစီအစဉ်အတိုင်း စီပါ:
   1. Logo နှင့် navigation ပါသော site header
   2. Hero/cover — စာသားနှင့် ပုံကို side-by-side သို့မဟုတ် overlay ပုံစံဖြင့် တင်ပြရန်
   3. အဓိက category များ — text-only သို့မဟုတ် icon/logo နှင့် text တွဲဖက်ပုံစံ
   4. Popular products
   5. Featured merchants — homepage တွင် အရေအတွက်ကန့်သတ်ပြီး directory အပြည့်အစုံ ရှိလာပါက “View all” သို့ ချိတ်ရန်
   6. Product feed — scroll လုပ်သည့်အခါ နောက်ထပ် product များကို အပိုင်းလိုက် load လုပ်ရန်
   7. Discounted products
4. Discount badge၊ မူရင်းဈေးနှုန်းနှင့် လျှော့ဈေးဈေးနှုန်းတို့ကို API က အတည်ပြုထားသော active promotion ရှိမှသာ ပြပါ။ အတည်မပြုထားသော discount ကို မဖန်တီးပါနှင့်။
5. Homepage တွင်ပြသသော merchant များသည် public အဖြစ်ပြသခွင့်ရှိပြီး approved ဖြစ်ရမည်။ Merchant အရေအတွက်၊ ရွေးချယ်စီစဉ်ပုံနှင့် “View all” page လိုအပ်မှုကို product owner ထံ အတည်ပြုပါ။
6. Product feed ကို အဆုံးမရှိ auto-load လုပ်ခြင်းကြောင့် Discounted products ကို မရောက်နိုင်သည့်အခြေအနေ မဖြစ်စေရ။ Batch/pagination ဖြင့်ကန့်သတ်ပါ သို့မဟုတ် section 7 ကို အလွယ်တကူရောက်နိုင်သည့်နည်းလမ်းကို ထည့်ပါ။
7. SME နှင့် Individual သည် ဘယ်လို product/merchant အမျိုးအစားကို ကိုယ်စားပြုသလဲ၊ Repair သည် service directory၊ repair booking သို့မဟုတ် အချက်အလက်ပေးသည့် page သာလားကို အတည်ပြုရန်လိုသည်။ Repair booking/transaction ကို business နှင့် API စည်းမျဉ်းမရမချင်း မယူဆပါနှင့်။

## 2. Actor များ

| Actor           | လုပ်ဆောင်နိုင်သည့်အရာ                                                                     |
| --------------- | ----------------------------------------------------------------------------------------- |
| ဧည့်သည် (Guest) | Account မဖွင့်ဘဲ marketplace နှင့် ထုတ်ကုန်များကို ကြည့်ရှုနိုင်သည်။                      |
| Customer        | ထုတ်ကုန်များကို ကြည့်ရှုပြီး အော်ဒါတင်လိုသည့်အခါ account ဖွင့်ကာ ဝင်ရောက်နိုင်သည်။        |
| Merchant        | Merchant ဖြစ်ရန် လျှောက်ထားနိုင်သည်။ ခွင့်ပြုချက်ရပြီးမှသာ ထုတ်ကုန်ရောင်းချနိုင်သည်။      |
| Admin           | Merchant လျှောက်လွှာကို စိစစ်၍ အတည်ပြုခြင်း သို့မဟုတ် ငြင်းပယ်ခြင်းကို ဆောင်ရွက်နိုင်သည်။ |

Merchant approval ကို Admin role တစ်ခုတည်းကသာ ဆောင်ရွက်သည်။ သီးခြား approver role မရှိပါ။ Admin ၏ အခြားတာဝန်များ၊ merchant verification အထောက်အထားနှင့် approval အဆင့်များကို လက်ရှိ requirement တွင် မဖော်ပြထားသေးပါ။

## 3. အဓိက Business Rules

### 3.1 ထုတ်ကုန်ကြည့်ရှုခြင်း

1. Account မရှိသူသည် တစ်ပတ်ရစ်ထုတ်ကုန်များကို လွတ်လပ်စွာ browse လုပ်နိုင်ရမည်။
2. Marketplace သည် multi-merchant ပုံစံဖြစ်ပြီး ထုတ်ကုန်တစ်ခုချင်းစီတွင် မည်သည့် merchant က ရောင်းချသည်ကို ခွဲခြားနိုင်ရမည်။
3. တစ်ပတ်ရစ်ပစ္စည်းရောင်းချရာတွင် item condition၊ အသုံးပြုထားမှုနှင့် သိရှိထားသော ချို့ယွင်းချက်များကို listing တွင် ရှင်းလင်းဖော်ပြနိုင်ရမည်။ Condition grade များနှင့် မဖြစ်မနေဖော်ပြရမည့်အချက်များကို product policy တွင် သတ်မှတ်ရန်လိုသည်။
4. ထုတ်ကုန်တစ်ခုချင်းစီတွင် လက်ရှိအခြေအနေကို နားလည်စေမည့် ပုံနှင့် ဖော်ပြချက်များ ပါဝင်ရမည်။ ပုံအရေအတွက်၊ အရည်အသွေးစံနှုန်းနှင့် တားမြစ်ထားသောပစ္စည်းများကို ဆက်လက်သတ်မှတ်ရန်လိုသည်။
5. Product category စာရင်းသည် တစ်ပတ်ရစ်ထုတ်ကုန်များကို ရှာဖွေရလွယ်ကူစေရန် စီစဉ်ရမည်။ Category၊ condition grade နှင့် listing တင်ခွင့်ရှိသည့် item အမျိုးအစားများကို product requirement/API contract တွင် အတည်ပြုရန်လိုသည်။
6. တစ်ပတ်ရစ်မဟုတ်သော အသစ်ထုတ်ကုန်များ ရောင်းချခွင့်ရှိ/မရှိကို မူရင်း requirement က မသတ်မှတ်ထားသဖြင့် အတည်ပြုသည်အထိ second-hand listing ကိုသာ အခြေခံ scope အဖြစ်ယူပါ။

### 3.2 Customer Account နှင့် အော်ဒါ

1. ထုတ်ကုန်ကြည့်ရှုရန် account မလိုအပ်ပါ။
2. ဧည့်သည်သည် cart သို့ ထုတ်ကုန်ထည့်ခြင်း၊ cart ကိုကြည့်ရှုခြင်းနှင့် wishlist အသုံးပြုခြင်းတို့ကို account မဖွင့်ဘဲ လုပ်ဆောင်နိုင်ရမည်။
3. အော်ဒါအတည်ပြုတင်ရန် customer registration/login လိုအပ်သည်။ Guest သည် checkout ကို စတင်နိုင်သော်လည်း အော်ဒါမတင်မီ account ဖြင့် ဝင်ရောက်ရမည်။
4. Guest cart နှင့် wishlist ကို login ပြီးနောက် customer account ထဲသို့ ပေါင်းစည်းမလား၊ browser တစ်ခုတည်းတွင်သာ သိမ်းမလား၊ အခြားစက်သို့ sync လုပ်မလားကို ဆုံးဖြတ်ရန်လိုသည်။
5. Customer account management ကို optional ဟု ဖော်ပြထားသော်လည်း profile fields၊ password recovery၊ account update နှင့် account deletion စသည့် လုပ်ဆောင်ချက်များ မသတ်မှတ်ရသေးပါ။
6. Order placement အတွက် registration လိုအပ်သော်လည်း order history၊ cancellation၊ return နှင့် refund policy ကို သီးခြားသတ်မှတ်ရန်လိုသည်။

### 3.3 Merchant Registration နှင့် Approval

1. User သည် merchant ဖြစ်ရန် လျှောက်ထားနိုင်သည်။
2. Merchant ဖြစ်လိုသူသည် registration ပြုလုပ်ရန်လိုအပ်သည်။
3. လျှောက်ထားသူသည် အတည်ပြုချက်မရမီ merchant အဖြစ် ရောင်းချခွင့်မရှိပါ။
4. Merchant approval မပြီးမချင်း product ရောင်းချသည့် workflow များကို ပိတ်ထားရမည်။
5. Merchant application ကို Admin role ကသာ စိစစ်ပြီး approve သို့မဟုတ် reject လုပ်ရမည်။ သီးခြား approver role မရှိပါ။
6. အနည်းဆုံး status များကို `pending`, `approved`, `rejected` ဟု စဉ်းစားနိုင်သော်လည်း ၎င်းတို့သည် အကောင်အထည်ဖော်မှုအတွက် အဆိုပြုထားသော status များသာဖြစ်ပြီး product owner/API contract မှ အတည်ပြုရန်လိုသည်။
7. လျှောက်လွှာတွင်လိုအပ်သည့် အချက်အလက်၊ စာရွက်စာတမ်း၊ review SLA၊ ပြန်လည်လျှောက်ထားခွင့်နှင့် rejection အကြောင်းရင်းကို ဆက်လက်သတ်မှတ်ရန်လိုသည်။

## 4. အဓိက Flow များ

### 4.1 Guest မှ Customer အဖြစ် ဆက်လက်အသုံးပြုခြင်း

```text
Guest
  -> ထုတ်ကုန်များကို ကြည့်ရှု
  -> Cart သို့ ထည့် / Wishlist ထဲသို့ သိမ်း
  -> Checkout ကို စတင်
  -> Login သို့မဟုတ် Register လုပ်ရန် တောင်းဆို
  -> Guest cart ကို customer cart နှင့် ဘယ်လိုပေါင်းမည်ကို သတ်မှတ်ထားသည့်နည်းအတိုင်း ဆောင်ရွက်
  -> Payment/delivery စည်းမျဉ်းအတည်ပြုသည်အထိ order final submission ကို pending ထား
```

Guest cart နှင့် wishlist ကို product scope ထဲတွင် ထည့်သွင်းထားသည်။ သို့သော် သိမ်းဆည်းမှုကြာချိန်၊ login ပြီးနောက် ပေါင်းစည်းနည်းနှင့် account sync ကို ဆက်လက်သတ်မှတ်ရန်လိုသည်။

### 4.2 Checkout၊ Payment နှင့် Delivery (Pending)

Payment နှင့် delivery သည် လိုအပ်မည့်အပိုင်းများဖြစ်သော်လည်း provider၊ လုပ်ငန်းစည်းမျဉ်းနှင့် backend/API contract မရသေးသဖြင့် pending အဖြစ်ထားရမည်။ ယခုအဆင့်တွင် payment သို့မဟုတ် delivery ကို အောင်မြင်သည်ဟု ပြသသော mock checkout ကို မတည်ဆောက်ရ။

အတည်ပြုပြီးနောက် အောက်ပါအချက်များကို သတ်မှတ်ရန်လိုသည်။

- Payment method/provider, transaction status, failure/retry, refund.
- Delivery address, delivery method/fee, tracking, delivery status.
- Order total calculation, stock check, order confirmation, cancellation.
- Payment နှင့် delivery step များ၏ sequence၊ timeout နှင့် error recovery.

### 4.3 Merchant လျှောက်ထားခြင်းနှင့် အတည်ပြုခြင်း

```text
User
  -> Merchant ဖြစ်ရန် လျှောက်ထား
  -> Pending review
  -> Admin က စိစစ်
  -> Approved: ရောင်းချခွင့်ရ
  -> Rejected: ရောင်းချခွင့်မရ
```

ဤ flow တွင် merchant dashboard၊ product CRUD နှင့် product approval ပါ/မပါကို လက်ရှိ requirement က မရှင်းလင်းပါ။ Merchant approval ရပြီးသည်နှင့် ထုတ်ကုန်တင်နိုင်မည်ဟု မယူဆမီ product-level moderation ရှိ/မရှိ အတည်ပြုပါ။

## 5. Permission စည်းမျဉ်း

| လုပ်ဆောင်ချက်                       | Guest               | Customer                       | Pending merchant                                             | Approved merchant                                            | Admin         |
| ----------------------------------- | ------------------- | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------- |
| ထုတ်ကုန် browse လုပ်ခြင်း           | ခွင့်ပြု            | ခွင့်ပြု                       | ခွင့်ပြု                                                     | ခွင့်ပြု                                                     | ခွင့်ပြု      |
| Cart အသုံးပြုခြင်း                  | ခွင့်ပြု            | ခွင့်ပြု                       | Customer အဖြစ်ခွင့်ပြု                                       | Customer အဖြစ်ခွင့်ပြု                                       | သတ်မှတ်ရန်လို |
| Wishlist အသုံးပြုခြင်း              | ခွင့်ပြု            | ခွင့်ပြု                       | Customer အဖြစ်ခွင့်ပြု                                       | Customer အဖြစ်ခွင့်ပြု                                       | သတ်မှတ်ရန်လို |
| Checkout စတင်ခြင်း                  | ခွင့်ပြု            | ခွင့်ပြု                       | Customer အဖြစ်ခွင့်ပြု                                       | Customer အဖြစ်ခွင့်ပြု                                       | သတ်မှတ်ရန်လို |
| အော်ဒါတင်ခြင်း                      | Login လိုအပ်        | Payment/delivery အတည်ပြုပြီးမှ | Customer အဖြစ် login ဝင်ပြီး၊ payment/delivery အတည်ပြုပြီးမှ | Customer အဖြစ် login ဝင်ပြီး၊ payment/delivery အတည်ပြုပြီးမှ | သတ်မှတ်ရန်လို |
| Payment နှင့် delivery              | Pending             | Pending                        | Pending                                                      | Pending                                                      | Pending       |
| Merchant လျှောက်ထားခြင်း            | Register လုပ်ရန်လို | လျှောက်ထားနိုင်                | ရှိပြီးသားလျှောက်လွှာကို စစ်ဆေးနိုင်ရန်လို                   | ထပ်လျှောက်နိုင်/မနိုင် အတည်ပြုရန်လို                         | သတ်မှတ်ရန်လို |
| Merchant အဖြစ် ရောင်းချခြင်း        | မခွင့်ပြု           | မခွင့်ပြု                      | မခွင့်ပြု                                                    | ခွင့်ပြု                                                     | သတ်မှတ်ရန်လို |
| Merchant လျှောက်လွှာ approve/reject | မခွင့်ပြု           | မခွင့်ပြု                      | မခွင့်ပြု                                                    | မခွင့်ပြု                                                    | ခွင့်ပြု      |

Permission အချက်အလက် မပြည့်စုံသေးသော လုပ်ဆောင်ချက်များကို backend contract သို့မဟုတ် product owner နှင့် အတည်ပြုပြီးမှ သတ်မှတ်ပါ။

## 6. မသတ်မှတ်ရသေး၍ အတည်ပြုရန်လိုသောအချက်များ

- Guest cart နှင့် wishlist ၏ local/server persistence, retention period နှင့် login ပြီးနောက် customer data နှင့် merge လုပ်မည့်နည်း။
- Payment provider/method, payment status, retry, refund နှင့် cancellation rule.
- Delivery address, method/fee, tracking နှင့် fulfillment status.
- Checkout, payment, delivery နှင့် order confirmation အဆင့်များ၏ အစီအစဉ်နှင့် API contract။
- Stock၊ product variant၊ product availability နှင့် စျေးနှုန်းပြောင်းလဲမှုကို စစ်ဆေးပုံ။
- Merchant application fields၊ supporting documents၊ approval criteria နှင့် rejection/re-application flow။
- Product အသစ်တင်ရန် merchant approval သာလိုသလား၊ product တစ်ခုချင်းစီ ထပ်မံစိစစ်ရမလား။
- Customer တစ်ဦးသည် merchant လျှောက်ထားနိုင်/မနိုင်နှင့် role တစ်ခုထက်ပို၍ ရနိုင်/မနိုင်။
- Product taxonomy၊ search/filter/sort နှင့် listing visibility စည်းမျဉ်းများ။
- တစ်ပတ်ရစ်ပစ္စည်း၏ condition grade၊ ချို့ယွင်းချက်ဖော်ပြပုံ၊ listing ဓာတ်ပုံလိုအပ်ချက်နှင့် prohibited item စာရင်း။
- အသစ်ထုတ်ကုန်များကိုလည်း ရောင်းချခွင့်ရှိ/မရှိနှင့် second-hand အဖြစ်သတ်မှတ်ရန် လိုအပ်သောအထောက်အထား။
- Product title/description နှင့် merchant-generated content များအတွက် ဘာသာစကားတစ်မျိုးတည်း လက်ခံမလား၊ မြန်မာ/အင်္ဂလိပ် နှစ်မျိုးလုံးလိုအပ်မလား၊ ဘာသာပြန်ပေးမလား။
- Default language၊ language ရွေးချယ်မှုကို account နှင့် sync လုပ်မလုပ်၊ date/number/currency formatting တို့၏ locale policy။
- User account၊ merchant status နှင့် order data အတွက် backend API contract။

## 7. Implementation မှတ်ချက်

ဤစာတမ်းသည် requirement မှ business behavior ကိုသာ မှတ်တမ်းတင်ထားခြင်းဖြစ်ပြီး backend/API ရှိပြီးသားဟု မဆိုလိုပါ။ Payment နှင့် delivery ကို pending အဖြစ်ထားပြီး backend contract မရမချင်း production-ready feature ဟု မဖော်ပြရ။ အကောင်အထည်ဖော်မည့် အဆင့်များနှင့် page အမည်များကို [implementationPlan.md](./implementationPlan.md) နှင့် [folderStructure.md](./folderStructure.md) တွင် ဖော်ပြထားသည်။
