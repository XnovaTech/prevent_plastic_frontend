# Implementation Plan

## ရည်ရွယ်ချက်

ဤအစီအစဉ်သည် [businessLogic.md](./businessLogic.md) တွင် ဖတ်ရှုနိုင်သော requirement များကို အတည်ပြုနိုင်သော၊ ထိန်းသိမ်းရလွယ်ကူသော frontend implementation အဖြစ် ပြောင်းလဲရန်ဖြစ်သည်။ Homepage အတွက် static design ကို `app/page.tsx` နှင့် `components/home/` တွင် တည်ဆောက်ထားပြီး demo content ကို `mock/homePageMock.ts` မှ ယူသည်။ ၎င်းသည် backend/API ချိတ်ဆက်မှုမဟုတ်ပါ။ ကျန် feature များကို API contract ရလာသည့်အခါ service boundary မှတစ်ဆင့် ချိတ်ဆက်ပါ။

## Implementation မစတင်မီ

1. `businessLogic.md` ရှိ “အတည်ပြုရန်လိုသောအချက်များ” ထဲမှ default locale၊ content translation နှင့် API-related ဆုံးဖြတ်ချက်များကို product owner နှင့် ဆွေးနွေးပါ။
2. Authentication၊ customer order နှင့် merchant approval အတွက် backend API contract ကို ရယူပါ။
3. Frontend dependency နှင့် folder naming ကို [techstack.md](./techstack.md), [folderStructure.md](./folderStructure.md), [developmentGuidelines.md](./developmentGuidelines.md) နှင့် တိုက်ဆိုင်ညှိနှိုင်းပါ။
4. API မရသေးပါက service function interface ကို အရင်သတ်မှတ်ပြီး mock implementation နှင့် real API implementation ကို အလွယ်တကူပြောင်းနိုင်အောင် ခွဲထားပါ။

## အဆင့်လိုက်အစီအစဉ်

### Phase 0 — Myanmar/English internationalization foundation

- Project တွင် ထည့်သွင်းထားပြီးသား `next-intl` ကို အသုံးပြုပြီး Myanmar (`my`) နှင့် English (`en`) locale များကို configure လုပ်ပါ။
- Route များကို `/{locale}/...` ပုံစံဖြင့် စီစဉ်ပြီး locale မမှန်ကန်သည့်အခါ သို့မဟုတ် locale မပါသည့်အခါ မည်သို့ ကိုင်တွယ်မည်ကို သတ်မှတ်ပါ။
- Root `/` ဝင်လာသည့်အခါ default locale သို့ redirect လုပ်မလား၊ locale ရွေးချယ်ခွင့်ပြမလားကို product owner နှင့် အတည်ပြုပါ။
- `messages/en.json` နှင့် `messages/my.json` တို့တွင် တူညီသော message key များထားပြီး hard-coded user-facing string များကို translation message များဖြင့် အစားထိုးပါ။
- Language selector ကို တည်ဆောက်ပြီး ပြောင်းလဲသည့်အခါ လက်ရှိ page နှင့် dynamic route parameter များကို ထိန်းသိမ်းပါ။
- နေ့စွဲ၊ အရေအတွက်၊ ငွေကြေး format နှင့် Myanmar စာသား font/rendering ကို language အလိုက် စမ်းသပ်ပါ။
- `en.json` နှင့် `my.json` ရှိ message key များကို parity စစ်ဆေးပြီး key မရှိသည့်အခါ translation ကို fallback လုပ်ပုံ သတ်မှတ်ပါ။
- Default locale နှင့် product/merchant ရေးသားသည့် content ၏ ဘာသာစကားစည်းမျဉ်းကို product owner ထံ အတည်ပြုပါ။

**ပြီးမြောက်မှုစံနှုန်း:** App UI နှင့် validation message များကို `my` နှင့် `en` နှစ်မျိုးဖြင့်ပြသနိုင်ခြင်း၊ locale ပြောင်းသည့်အခါ သက်ဆိုင်ရာ route ကို ထိန်းသိမ်းထားနိုင်ခြင်း၊ locale မမှန်ကန်သည့်အခြေအနေကို သတ်မှတ်ထားသည့်ပုံစံအတိုင်း ကိုင်တွယ်နိုင်ခြင်း။

### Phase 1 — Domain, types နှင့် validation

- Customer၊ merchant application၊ second-hand product၊ product condition၊ category နှင့် order တို့အတွက် လိုအပ်သော domain type များကို backend contract အတည်ပြုပြီးမှ သတ်မှတ်ပါ။
- အတည်ပြုထားသော form များအတွက်သာ Zod schema များရေးပါ။ Merchant application requirements မသတ်မှတ်ရသေးပါက fields ကို မခန့်မှန်းပါနှင့်။
- Guest၊ customer၊ pending merchant၊ approved merchant နှင့် admin တို့၏ permission များကို role/status အလိုက် တိတိကျကျ သတ်မှတ်ပါ။ Merchant approval ကို admin တစ်ခုတည်းက ဆောင်ရွက်ပြီး သီးခြား approver role မထားပါနှင့်။
- Business rule ကို UI ထဲတွင်သာ မထားဘဲ backend ကလည်း အတည်ပြုပြီး enforce လုပ်ရမည်။

**ပြီးမြောက်မှုစံနှုန်း:** Domain status/permission များ၊ validation fields နှင့် unresolved requirement များကို အတည်ပြုပြီး မှတ်တမ်းတင်ထားခြင်း။

### Phase 2 — API service boundary နှင့် mock data

- Axios API client နှင့် domain service interface များကို project convention အတိုင်း သတ်မှတ်ပါ။
- Mock implementation တွင် API service နှင့် တူညီသော request/response type များကို အသုံးပြုပါ။
- Mock response ကို service boundary အပြင်သို့ မဖော်ထုတ်ဘဲ hooks နှင့် UI က mock data သို့မဟုတ် real API ဟူ၍ မခွဲသိစေရ။
- Loading၊ empty၊ error နှင့် success အခြေအနေများကို စမ်းသပ်နိုင်သော mock response များ ပြင်ဆင်ပါ။

**ပြီးမြောက်မှုစံနှုန်း:** API contract ရလာသောအခါ UI/hook ကို ပြန်ရေးစရာမလိုဘဲ service implementation ကို အစားထိုးနိုင်ခြင်း။

### Phase 3 — Auth နှင့် shared state

- Authentication flow/API contract ကို သတ်မှတ်ပြီး login/register hook များ တည်ဆောက်ပါ။
- Auth state ကို Zustand ထဲတွင်သာထားပြီး session persistence၊ token storage နှင့် logout behavior ကို backend/security contract အတိုင်း ဆုံးဖြတ်ပါ။
- Auth state ပြောင်းလဲသည့်အခါ ပြန်သုံးနိုင်သော route/permission handling ကို စီမံပါ။
- Token၊ credential သို့မဟုတ် private user data ကို log မလုပ်ပါနှင့်။

**ပြီးမြောက်မှုစံနှုန်း:** Customer က authenticated state ရှိ/မရှိကို route နှင့် action များတွင် တစ်သမတ်တည်းစစ်ဆေးနိုင်ခြင်း။

### Phase 4 — Public product browsing

- Public header တွင် Logo၊ Home၊ SME၊ Individual၊ Repair၊ About us၊ Contact navigation နှင့် Myanmar/English language selector ကို responsive ပုံစံဖြင့် တည်ဆောက်ပါ။
- Homepage တွင် hero/cover, major categories, popular products, ကန့်သတ်ထားသော featured merchants, scroll ဖြင့် batch လိုက် load လုပ်သော product feed နှင့် discounted products ကို သတ်မှတ်ထားသည့်အစီအစဉ်အတိုင်း ထည့်ပါ။
- Homepage section များကို UI-only `components/home/` ထဲတွင်ထားပြီး product/merchant data နှင့် infinite-query behavior ကို hooks မှတစ်ဆင့်ယူပါ။
- Product data တွင် active discount အတည်ပြုချက်မရှိပါက discount section ကို မပြသပါနှင့်။ Featured merchant များကို approved/public ဖြစ်သူများမှသာယူပါ။
- SME, Individual နှင့် Repair page များကို route/UI အဖြစ်စီစဉ်ပါ။ ၎င်းတို့၏ domain အဓိပ္ပာယ်နှင့် Repair booking လိုအပ်ချက်ကို အတည်မပြုမချင်း မသတ်မှတ်ထားသော workflow ကို မတည်ဆောက်ပါနှင့်။
- Public route မှ guest နှင့် customer နှစ်ဦးလုံး ထုတ်ကုန် browse လုပ်နိုင်အောင် တည်ဆောက်ပါ။
- Product list/detail data ကို React Query ဖြင့်ယူပြီး `components/list/` နှင့် shared UI များတွင်သာ ပြသပါ။
- တစ်ပတ်ရစ် product ၏ condition၊ သိရှိထားသော ချို့ယွင်းချက်နှင့် ပစ္စည်းအခြေအနေကို နားလည်စေမည့်ပုံ/ဖော်ပြချက်ကို အတည်ပြုထားသော policy အတိုင်း ပြပါ။
- Search၊ filter၊ sort၊ pagination နှင့် category behavior ကို business/API requirement အတည်ပြုပြီးမှ ထည့်ပါ။
- Product merchant identity/approval status ၏ public visibility ကို privacy နှင့် product requirement အတိုင်း သတ်မှတ်ပါ။

**ပြီးမြောက်မှုစံနှုန်း:** Public navigation နှင့် homepage section အစီအစဉ်သည် သတ်မှတ်ချက်နှင့်ကိုက်ညီပြီး guest သည် product listing ကို ဝင်ကြည့်နိုင်ခြင်း၊ homepage feed နှင့် section တစ်ခုချင်းစီတွင် loading/empty/error state မှန်ကန်ခြင်း။

### Phase 5 — Guest cart နှင့် wishlist

- Guest သည် product ကို cart ထဲထည့်/ဖယ်ရှားနိုင်ပြီး cart ကိုကြည့်ရှုနိုင်အောင် တည်ဆောက်ပါ။
- Guest သည် product များကို wishlist ထဲသို့ ထည့်/ဖယ်ရှားနိုင်ပြီး wishlist ကိုကြည့်ရှုနိုင်အောင် တည်ဆောက်ပါ။
- Cart နှင့် wishlist UI ကို authenticated customer အတွက်လည်း အသုံးပြုနိုင်အောင် ပြုလုပ်ပါ။
- Storage ပုံစံ (browser သီးသန့်၊ server-side၊ သို့မဟုတ် နှစ်မျိုးပေါင်းစပ်)၊ retention နှင့် login ပြီးနောက် merge behavior ကို product/backend owner ထံ အတည်ပြုပါ။ အတည်မပြုမချင်း အကောင်အထည်ဖော်မှုကို အလွယ်တကူပြောင်းနိုင်သည့် adapter boundary နောက်တွင်ထားပါ။
- Product availability ပြောင်းလဲခြင်း၊ duplicate item၊ quantity limit နှင့် stale product များကို ကိုင်တွယ်ပုံ သတ်မှတ်ပါ။

**ပြီးမြောက်မှုစံနှုန်း:** Guest နှင့် customer နှစ်မျိုးလုံး cart/wishlist ကို သုံးနိုင်ပြီး သိမ်းဆည်းမှုနှင့် merge policy ကို အတည်ပြုထားခြင်း။

### Phase 6 — Checkout entry နှင့် authentication gate

- Guest သည် cart မှ checkout ကို စတင်နိုင်သော်လည်း order တင်မီ login/register လုပ်ရမည်။
- Login ပြီးနောက် guest cart ကို customer cart နှင့် ပေါင်းစည်းပုံအတည်ပြုချက်အတိုင်း ဆောင်ရွက်ပါ။
- Product၊ quantity နှင့် availability များကို checkout အချိန်တွင် server response ဖြင့် ပြန်လည်စစ်ဆေးပါ။
- Payment နှင့် delivery ကို ချိတ်ဆက်ခြင်းမရှိသေးဘဲ pending အဖြစ်ထားပါ။ အတည်မပြုရသေးသော payment ကို အောင်မြင်သည်ဟု မပြပါနှင့်၊ အော်ဒါပြီးဆုံးသည်ဟုလည်း မယူဆပါနှင့်။

**ပြီးမြောက်မှုစံနှုန်း:** Guest သည် checkout ကို စတင်နိုင်သော်လည်း order တင်မီ login/register လုပ်ရမည်။ Payment/delivery ကို အလုပ်လုပ်နေသကဲ့သို့ မပြသရ။

### Phase 7 — Payment နှင့် delivery (Pending)

- Payment provider/method၊ transaction status၊ failure/retry၊ refund နှင့် cancellation policy အတည်ပြုရန်လိုသည်။
- Delivery address၊ delivery method/fee၊ fulfillment status နှင့် tracking အတည်ပြုရန်လိုသည်။
- Backend API contract နှင့် payment confirmation flow မရမချင်း payment/delivery service၊ form သို့မဟုတ် success UI မတည်ဆောက်ပါနှင့်။
- ဤ phase သည် pending ဖြစ်နေသရွေ့ checkout ကို order-confirmation အဖြစ်မပြဘဲ မပြီးဆုံးသေးကြောင်းရှင်းလင်းစွာပြပါ။

**ပြီးမြောက်မှုစံနှုန်း:** Product owner နှင့် backend က payment/delivery rules နှင့် API contract ကို အတည်ပြုပြီးနောက်မှ phase ကို စတင်ရန်။

### Phase 8 — Merchant application နှင့် approval

- Merchant application form နှင့် Zod schema ကို အတည်ပြုထားသော fields/documents အပေါ်မူတည်၍ တည်ဆောက်ပါ။
- Application တင်ခြင်း၊ status ပြန်ဖတ်ခြင်းနှင့် approval/rejection များကို သီးခြား service/hook များဖြင့် ကိုင်တွယ်ပါ။
- `pending` အခြေအနေတွင် merchant selling actions ကို ပိတ်ပါ။ `approved` အခြေအနေမှသာ သတ်မှတ်ထားသော selling capability ကို ဖွင့်ပါ။
- Rejection reason၊ appeal/re-apply flow နှင့် notification channel တို့ကို အတည်မပြုရသေးပါက အကောင်အထည်မဖော်ပါနှင့်.
- Admin merchant review UI ကို admin role authorization/API အတည်ပြုပြီးနောက်မှသာ တည်ဆောက်ပါ။

**ပြီးမြောက်မှုစံနှုန်း:** အတည်ပြုချက်မရသေးသော merchant သည် အရောင်းမလုပ်နိုင်ကြောင်း UI နှင့် backend policy နှစ်ဖက်စလုံးက အာမခံခြင်း။

### Phase 9 — Quality, integration နှင့် release

- Unit/integration စမ်းသပ်မှုများတွင် guest browse၊ cart၊ wishlist၊ login မလုပ်ဘဲ order မတင်နိုင်ခြင်းနှင့် merchant approval permission များကို စစ်ဆေးပါ။
- Payment/delivery သည် pending အတွင်း ဖြစ်ကြောင်းနှင့် မရှိသေးသော payment success ကို UI မပြကြောင်း စစ်ဆေးပါ။
- Mock service အစား real API service ကို ချိတ်ပြီး API error/timeout အခြေအနေများကို စစ်ပါ။
- `npm run lint`, `npm run typecheck` နှင့် သက်ဆိုင်ရာ test/build command များကို လုပ်ဆောင်ပါ.
- Business rule ပြောင်းလဲပါက `businessLogic.md` နှင့် ဤအစီအစဉ်ကို implementation နှင့်အတူ အပ်ဒိတ်လုပ်ပါ.

## အကြံပြု Code Boundary

```text
app/              Route နှင့် page composition
i18n/             next-intl locale routing နှင့် request configuration
messages/         English/Myanmar UI translation dictionaries
components/       UI-only components
hooks/            Feature နှင့် React Query logic
services/         API/mock adapters
stores/           Zustand client state
validations/      Shared Zod schemas
types/            Domain/API types
lib/              Axios client နှင့် shared utilities
```

Folder အမည်၊ camelCase filename နှင့် layer တစ်ခုချင်းစီ၏ တာဝန်ကို [folderStructure.md](./folderStructure.md) တွင် သတ်မှတ်ထားသည့်အတိုင်း လိုက်နာပါ။

## Planned Route/Page Names

အောက်ပါ route name များသည် [folderStructure.md](./folderStructure.md) ထဲရှိ tree နှင့် တူညီသည်။ Payment နှင့် delivery လုပ်ဆောင်ချက်များ pending ဖြစ်နေသော်လည်း checkout page ကို cart မှ checkout စတင်ရန်အတွက်သာ ကြိုတင်စီစဉ်ထားပြီး payment/delivery အတည်ပြုပြီးသကဲ့သို့ မလုပ်ဆောင်ရ။

| Page                 | Route                            | အသုံးပြုသူ/အခြေအနေ                                                                |
| -------------------- | -------------------------------- | --------------------------------------------------------------------------------- |
| Home page            | `/{locale}`                      | Guest နှင့် customer; locale သည် `en` သို့မဟုတ် `my`                              |
| SME                  | `/{locale}/sme`                  | Guest နှင့် customer; SME အတွက် landing/catalog အဓိပ္ပာယ်ကို အတည်ပြုရန်လို        |
| Individual           | `/{locale}/individual`           | Guest နှင့် customer; Individual အတွက် landing/catalog အဓိပ္ပာယ်ကို အတည်ပြုရန်လို |
| Repair               | `/{locale}/repair`               | Guest နှင့် customer; booking/service scope ကို အတည်ပြုရန်လို                     |
| About us             | `/{locale}/about`                | Guest နှင့် customer; informational page                                          |
| Contact              | `/{locale}/contact`              | Guest နှင့် customer; contact method/form ကို အတည်ပြုရန်လို                       |
| Product catalog      | `/{locale}/products`             | Guest နှင့် customer                                                              |
| Product detail       | `/{locale}/products/[productId]` | Guest နှင့် customer                                                              |
| Cart                 | `/{locale}/cart`                 | Guest နှင့် customer                                                              |
| Wishlist             | `/{locale}/wishlist`             | Guest နှင့် customer                                                              |
| Checkout             | `/{locale}/checkout`             | Guest/customer; order submit လုပ်ရန် login လိုအပ်၊ payment/delivery pending       |
| Customer orders      | `/{locale}/customer/orders`      | Authenticated customer; order API အတည်ပြုပြီးနောက်                                |
| Merchant application | `/{locale}/merchant/application` | Register လုပ်ထားသော user/customer                                                 |
| Merchant review      | `/{locale}/admin/merchants`      | Admin role သာ; admin authorization/API အတည်ပြုပြီးနောက်                           |
