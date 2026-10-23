# UI/UX Design Guidelines

ဤလမ်းညွှန်ချက်၏ ရည်ရွယ်ချက်မှာ page နှင့် feature အားလုံးတွင် UI ကို တစ်သမတ်တည်း၊ အသုံးပြုရလွယ်ကူပြီး ပျော်ရွှင်လန်းဆန်းသော လူငယ်ဆန်သည့်ပုံစံဖြစ်စေရန် ဖြစ်သည်။ Visual design သည် ပတ်ဝန်းကျင်ကို ဂရုစိုက်သော marketplace ၏ ယုံကြည်စိတ်ချရမှုနှင့် သဘာဝပတ်ဝန်းကျင်ဆိုင်ရာအမြင်ကိုလည်း ထင်ဟပ်စေရမည်။

## မဖြစ်မနေလိုက်နာရမည့် UI စည်းမျဉ်း

1. UI building block အသစ်တည်ဆောက်မီ `components/ui/` ထဲရှိ shadcn/ui component ကို အရင်စစ်ပြီး ပြန်သုံးပါ။
2. Component အသစ်လိုအပ်ပါက shadcn/ui CLI မှရနိုင်သော component ကို ဦးစားပေးထည့်သွင်းပါ။ ရှိပြီးသား component များကို compose လုပ်နိုင်/မနိုင် စစ်ဆေးပြီးမှ custom primitive ရေးပါ။
3. shadcn/ui primitive များကို `components/ui/` ထဲတွင်သာထားပြီး feature-specific composition များကို `components/forms/`, `components/list/` သို့မဟုတ် `components/shared/` ထဲတွင်ထားပါ။
4. shadcn/ui component ကို project ၏ design token နှင့်လိုက်ဖက်အောင် ပြင်နိုင်သော်လည်း component တစ်ခုချင်းစီတွင် အရောင်၊ border၊ radius ကို သီးခြား hard-code မလုပ်ပါနှင့်။
5. `components.json` တွင် သတ်မှတ်ထားသော `aria-luma` style နှင့် Phosphor icon library ကို အခြေခံပါ။ UI kit သို့မဟုတ် icon library အသစ် ထပ်မထည့်မီ လိုအပ်ချက်ကို စိစစ်ပါ။

## Visual Direction

### Brand ခံစားချက်

- **ပျော်ရွှင်လန်းဆန်းပြီး လူငယ်ဆန်ပါစေ။** သန့်ရှင်းသော layout၊ သဘာဝဆန်သည့်အရောင်၊ ရှင်းလင်းသောစာသားနှင့် ချစ်စရာအသေးစိတ်တို့ကို မျှတစွာသုံးပါ။
- **ယုံကြည်စိတ်ချရမှုကို ထိန်းပါ။** ပျော်စရာအမြင်ကို ဖန်တီးရာတွင် စျေးနှုန်း၊ product အချက်အလက်၊ merchant အခြေအနေ၊ cart နှင့် checkout လုပ်ဆောင်ချက်တို့ကို ရှင်းလင်းလွယ်ကူစွာ ဖတ်ရှုနိုင်ရမည်။
- **ပတ်ဝန်းကျင်နှင့် သဟဇာတဖြစ်မှုကို ထင်ဟပ်ပါ။** လက်ရှိ `app/globals.css` ၏ green/teal primary color ကို အဓိကထားပြီး သဘာဝမြေသားရောင် သို့မဟုတ် နူးညံ့သော accent အရောင်များကို အကန့်အသတ်ဖြင့် ဖြည့်စွက်နိုင်သည်။
- **အသက်အရွယ်အလိုက် ခွဲခြားထားသည့် ပုံရိပ်မဖြစ်စေပါနှင့်။** Youthful ဆိုသည်မှာ ဖတ်ရလွယ်ကူမှု၊ ဖော်ရွေမှုနှင့် အားအင်ရှိသောအမြင်ကို ဆိုလိုပြီး ကလေးဆန်သည့်အလှဆင်မှုကို မဆိုလိုပါ။

### Doodle Art နှင့် Illustration

- Doodle art ကို UI နေရာတိုင်းတွင် မဖြန့်ဘဲ hero/cover ၏ လွတ်နေသောနေရာ၊ section ကြားနှင့် empty state ကဲ့သို့ အလှဆင်ရန်လိုအပ်သည့်နေရာအနည်းငယ်တွင်သာ ထည့်ပါ။ Product ဓာတ်ပုံနေရာတွင် doodle ကို မသုံးပါနှင့်။
- Hand-drawn line၊ organic shape နှင့် သဘာဝ/ပြန်လည်အသုံးပြုမှုကို ရည်ညွှန်းသော ပုံစံကို သုံးပါ။ လက်ရှိ green/teal theme နှင့် ကိုက်ညီသည့် အရောင်အနည်းငယ်ကိုသာ သုံးပြီး စာသား၊ product နှင့် အဓိက action များထက် မထင်ရှားစေပါနှင့်။
- Doodle သည် product ဓာတ်ပုံ၊ merchant အချက်အလက်၊ ဈေးနှုန်း သို့မဟုတ် status badge ကို အစားမထိုးရ။ Product များကို သက်ဆိုင်ရာ တကယ့်/ဓာတ်ပုံဆန်သောပုံနှင့် ရှင်းလင်းသောစာသားဖြင့် ပြသပါ။
- မျက်နှာပြင်ကို ရှုပ်ထွေးစေခြင်း၊ ဖတ်ရှုရခက်စေခြင်း၊ control အဖြစ်မှားယွင်းထင်မြင်စေခြင်း သို့မဟုတ် အရေးကြီးသည့်အချက်အလက်ကို ဖုံးကွယ်ခြင်း မဖြစ်စေရ။ Doodle ကို decoration အဖြစ်သာသုံးသည့်အခါ assistive technology မှ လျစ်လျူရှုနိုင်အောင် သတ်မှတ်ပါ။ အဓိပ္ပာယ်ပါသောပုံဖြစ်ပါက ဘာသာပြန်နိုင်သော သင့်လျော်သည့် text alternative ပေးပါ။
- SVG သို့မဟုတ် အရွယ်အစားသင့်တော်သော static image ကို ဦးစားပေးပါ။ Animation ထည့်ရန် မဖြစ်မနေမဟုတ်ပါ; ထည့်ပါက subtle ဖြစ်စေပြီး `prefers-reduced-motion` ကို လိုက်နာပါ။

### အရောင်၊ စာလုံးနှင့် အကွာအဝေး

- `app/globals.css` ရှိ CSS variable/token များ (`--primary`, `--background`, `--foreground`, `--muted`, `--accent`, `--destructive`, `--border`, `--ring`) ကို အရောင်သတ်မှတ်ရာတွင် အဓိကအသုံးပြုပါ။
- မြန်မာစာနှင့် အင်္ဂလိပ်စာနှစ်မျိုးလုံးတွင် ဖတ်ရှုရလွယ်ကူသော font stack ကို အသုံးပြုပြီး မြန်မာစာလုံးပုံစံ၊ line-height နှင့် စာလုံးအရွယ်အစားကို device အမျိုးမျိုးတွင် စမ်းသပ်ပါ။
- မြန်မာနှင့် အင်္ဂလိပ်စာကြောင်းအရှည် မတူနိုင်သဖြင့် button၊ navigation၊ card နှင့် form layout များကို စာသားချဲ့ထွင်မှုအတွက် လိုက်လျောညီထွေဖြစ်အောင် ပြုလုပ်ပါ။ Fixed width ဖြင့် ဘာသာပြန်စာသားကို မဖြတ်တောက်ပါနှင့်။
- User-facing string များကို component ထဲတွင် hard-code မလုပ်ဘဲ `next-intl` message များမှ ရယူပါ။ Translation key များကို English/Myanmar နှစ်ဖိုင်လုံးတွင် တူညီစွာ ထိန်းသိမ်းပါ။
- အရောင်အသစ်လိုအပ်ပါက token အဖြစ် သတ်မှတ်ပြီး light/dark mode နှစ်မျိုးလုံးအတွက် စစ်ဆေးပါ။ အလှအပအတွက်သာ saturation မြင့်သောအရောင်များစွာကို တစ်ပြိုင်နက် မသုံးပါနှင့်။
- စာသားကို အရွယ်အစား၊ weight နှင့် spacing ဖြင့် အဆင့်လိုက်ခွဲပါ။ အရေးကြီးသောအချက်အလက်ကို အရောင်တစ်မျိုးတည်းဖြင့်သာ မဖော်ပြပါနှင့်။
- Layout spacing နှင့် component dimension များကို တစ်သမတ်တည်းထားပါ။ ထိတွေ့အသုံးပြုမည့် control များကို mobile ပေါ်တွင် နှိပ်ရလွယ်သည့် အရွယ်အစားဖြင့် ပြုလုပ်ပါ။
- Card၊ button နှင့် input များတွင် rounded corner ကို တစ်သမတ်တည်းသုံးပါ။ Decoration အလွန်များခြင်းထက် သင့်တင့်သော radius၊ border နှင့် subtle shadow ကို ဦးစားပေးပါ။

## Page နှင့် Component အသုံးပြုမှု

- Homepage ကို သတ်မှတ်ထားသောအစီအစဉ်အတိုင်း တည်ဆောက်ပါ: Logo/navigation header၊ hero/cover၊ major categories၊ popular products၊ ကန့်သတ်ထားသော featured merchants၊ batch ဖြင့် scroll-load လုပ်သော product feed၊ discounted products။
- Hero ကို မလိုအပ်ဘဲ အမြင့်မထားဘဲ desktop တွင် စာသားနှင့် product/lifestyle ဓာတ်ပုံကို side-by-side ပြပြီး mobile တွင်လည်း အဓိက action၊ စာသားနှင့် ပုံကို ကျစ်လစ်စွာ စီပါ။ Slider တွင် အမြဲမြင်ရသော previous/next၊ slide indicator နှင့် autoplay pause/play control များ၊ keyboard အသုံးပြုနိုင်မှုနှင့် screen-reader label များပါစေ။ Auto-rotate ပါပါက hover/focus အချိန်တွင် ရပ်ပြီး `prefers-reduced-motion` ကို သတ်မှတ်ထားသူများအတွက် မလှည့်ပါစေနှင့်။ လက်ရှိ slide မဟုတ်သည့် slide များကို tab သွား၍မရစေဘဲ assistive technology မှလည်း မဖတ်စေရ။
- AOS ကို section မိတ်ဆက်စာသား သို့မဟုတ် အဓိကအုပ်စုအနည်းငယ်တွင်သာ သုံးပါ။ အရာတိုင်းကို တစ်ပြိုင်နက် animate မလုပ်ဘဲ `prefers-reduced-motion` ကို လေးစားပြီး animation မရရှိသော်လည်း အကြောင်းအရာကို ဖတ်ရှုနိုင်စေရမည်။
- Major category ကို text-only သို့မဟုတ် icon/logo နှင့် label တွဲဖက်၍ ပြနိုင်သည်။ Icon သည် category အဓိပ္ပာယ်ကို မရှင်းလင်းစေပါက text label ကို မဖြုတ်ပါနှင့်။
- Featured merchants အရေအတွက်ကို ကန့်သတ်ပြီး card များတွင် အတည်ပြုထားသော public information ကိုသာ ပြပါ။ Product owner က directory route အတည်ပြုမှသာ “View all” ကို ထည့်ပါ။
- Scroll loading တွင် loading indicator၊ နောက်ထပ် load လုပ်ရန် သို့မဟုတ် ပြန်လည်ကြိုးစားရန် button၊ error/retry state များကို နားလည်လွယ်စွာ ပြပါ။ အဆုံးမရှိ auto-load ကြောင့် Discounted products အောက်သို့ ရွေ့ပျောက်မသွားစေရန် feed ကို batch ဖြင့် ကန့်သတ်ပါ သို့မဟုတ် လွယ်ကူသော shortcut ပေးပါ။
- Discounted product card တွင် အတည်ပြုထားသော active promotion ရှိမှသာ မူရင်းဈေးနှုန်း၊ discounted price နှင့် badge ပြပါ။ Discount ပမာဏနှင့် currency format ကို locale အလိုက် ဖတ်ရလွယ်စွာ ပြသပါ။
- Navigation label နှင့် homepage section heading များကို Myanmar/English message dictionary နှစ်ခုလုံးတွင် ထည့်ပြီး ဘာသာပြန်စာသားရှည်လာသည့်အခါ header ကို overflow မဖြစ်စေပါနှင့်။
- Page တစ်ခုစီတွင် ရည်ရွယ်ချက်ကို ချက်ချင်းနားလည်စေမည့် title၊ ရှင်းလင်းသော main action နှင့် လိုအပ်သည့် supporting information ပါဝင်ရမည်။
- Product catalog တွင် product ပုံ၊ အမည်၊ ဈေးနှုန်း၊ category/eco indicator နှင့် merchant အချက်အလက်များကို ရှင်းလင်းစွာ ပြသပါ။ Product list အတွက် `components/list/` ထဲရှိ feature UI ကို အသုံးပြုပြီး အခြေခံ UI primitive များကို `components/ui/` မှ ယူပါ။
- Cart နှင့် wishlist တွင် item အခြေအနေ၊ ဖယ်ရှားခြင်းနှင့် ဆက်လုပ်ရန် action များကို ရှင်းလင်းဖော်ပြပါ။ Guest အတွက် login မဖြစ်မနေလိုသည့်အချိန်ကို လုပ်ဆောင်ချက်နှင့်နီးကပ်စွာ အသိပေးပါ။
- Checkout တွင် payment/delivery pending ဖြစ်နေပါက အလုပ်လုပ်နေသကဲ့သို့ button, success state သို့မဟုတ် status မပြသပါနှင့်။ လုပ်ဆောင်ချက်မရနိုင်သည့်အကြောင်းကို ရှင်းလင်းသော pending message ဖြင့်ဖော်ပြပါ။
- Admin merchant review တွင် application status, အရေးကြီးသော merchant အချက်အလက်နှင့် approve/reject action များကို အမှားနှိပ်မိနိုင်ခြေနည်းအောင် ခွဲခြားပြပါ။ Destructive action များအတွက် confirmation UI ကို အသုံးပြုပါ။
- Form တွင် label၊ hint၊ required/optional အချက်အလက်နှင့် field-level error ကို input နှင့် ချိတ်ဆက်ပြပါ။ Error ရှိကြောင်းကို အရောင်တစ်မျိုးတည်းဖြင့် မပြပါနှင့်။
- Loading၊ empty၊ error နှင့် success အခြေအနေတစ်ခုချင်းစီအတွက် သီးခြား UI ရှိစေပါ။ Error ကို အောင်မြင်မှုအဖြစ် မဖုံးကွယ်ပါနှင့်။

## Interaction နှင့် Motion

- Button နှင့် interactive element တို့တွင် default၊ hover၊ focus၊ active၊ disabled နှင့် loading state များကို သတ်မှတ်ပါ။
- Click သို့မဟုတ် submit ပြီးနောက် user ဘာဖြစ်သွားသည်ကို toast၊ inline message သို့မဟုတ် page state ဖြင့် ချက်ချင်းပြန်လည်တုံ့ပြန်ပါ။
- Motion ကို state transition ကို နားလည်စေရန်သာ သုံးပါ။ Animation ကြောင့် စာဖတ်ရန် အနှောင့်အယှက်ဖြစ်ခြင်း သို့မဟုတ် interaction နှောင့်နှေးခြင်း မဖြစ်စေပါနှင့်။
- System ၏ `prefers-reduced-motion` preference ကို လေးစားပါ။

## Accessibility နှင့် Responsive Design

- Semantic HTML နှင့် native control များကို ဦးစားပေးပြီး keyboard ဖြင့် အဓိက flow အားလုံးကို အသုံးပြုနိုင်စေရန် စစ်ဆေးပါ။
- Focus indicator ကို မဖျောက်ပါနှင့်။ Dialog၊ drawer နှင့် menu တို့တွင် focus order နှင့် keyboard dismissal ကို ထိန်းသိမ်းပါ။
- Text၊ icon နှင့် background တို့၏ contrast ကို သေချာစစ်ဆေးပါ။ Icon သီးသန့် button များတွင် accessible name ပေးပါ။
- Layout ကို mobile-first စဉ်းစားပါ။ Product grid၊ navigation၊ forms၊ cart နှင့် admin table တို့ကို သေးငယ်သည့် screen တွင် overflow မဖြစ်အောင် ပြုလုပ်ပါ။
- Image များတွင် အဓိပ္ပာယ်ဖော်ပြသော `alt` text ပေးပါ။ အလှဆင်ရန်သာဖြစ်သော image များကို screen reader မှ လျစ်လျူရှုနိုင်အောင် သတ်မှတ်ပါ။
- `aria-*` attribute များကို လိုအပ်သည့်အခါသာသုံးပြီး semantic HTML နှင့် shadcn/ui ၏ accessibility behavior ကို အစားမထိုးပါနှင့်။

## UI ပြောင်းလဲမှုတစ်ခုစီအတွက် စစ်ဆေးရန်

1. သက်ဆိုင်သော shadcn/ui primitive ကို ပြန်သုံးထားသလား။
2. Design token သုံးထားပြီး light/dark theme နှစ်မျိုးလုံး သေချာသလား။
3. Mobile/desktop layout၊ keyboard focus နှင့် screen reader label များ မှန်ကန်သလား။
4. Loading၊ empty၊ error၊ disabled နှင့် success state များ ရှိသလား။
5. Payment/delivery ကဲ့သို့ pending business rule ကို အသုံးပြုသူအား ready ဖြစ်သကဲ့သို့ မပြထားဘူးလား။

ထိုက်သင့်သော implementation pattern နှင့် client/server boundary များကို [developmentGuidelines.md](./developmentGuidelines.md) တွင် ဆက်လက်လိုက်နာပါ။
