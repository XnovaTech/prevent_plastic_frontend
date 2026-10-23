# Frontend Development Guidelines

ဤလမ်းညွှန်ချက်များသည် UI၊ feature logic၊ API နှင့် state တို့ကို ရှင်းလင်းစွာ ခွဲထားပြီး feature များကို တစ်သမတ်တည်းတည်ဆောက်နိုင်ရန် ဖြစ်သည်။

## အခြေခံမူ

- **UI သီးခြားထားပါ။** Page နှင့် presentational component များသည် props၊ state နှင့် event handler များကို လက်ခံပြသသည့်အပိုင်းကိုသာ တာဝန်ယူပါ။
- **Logic ကို hook ထဲထားပါ။** Form submission၊ data transformation၊ loading/error handling နှင့် feature workflow များကို custom hook များတွင် စုစည်းပါ။
- **API ကို service မှတစ်ဆင့်ခေါ်ပါ။** Service သည် request/response mapping ကိုသာ ကိုင်တွယ်ပြီး hook သည် service ကိုခေါ်ကာ query၊ mutation နှင့် feature logic ကို စီမံပါ။
- **Validation ကို ပြန်သုံးပါ။** Zod schema များကို `validations/` ထဲတွင်ထားပြီး form များမှ တူညီသော schema ကို အသုံးပြုပါ။
- **UI အတွက် shadcn/ui ကို အမြဲဦးစားပေးပါ။** ရှိပြီးသား component ကို ပြန်သုံး သို့မဟုတ် လိုအပ်သလို compose လုပ်ပါ။ shadcn/ui ဖြင့် မဖြည့်ဆည်းနိုင်သည့်လိုအပ်ချက်ရှိမှ custom primitive တည်ဆောက်ပါ။ Design direction၊ theme နှင့် accessibility အသေးစိတ်ကို [uiUx.md](./uiUx.md) တွင် လိုက်နာပါ။
- **UI စာသားများကို ဘာသာပြန်အသုံးပြုနိုင်အောင် ရေးပါ။** User-facing text များကို component ထဲတွင် hard-code မလုပ်ဘဲ `next-intl` နှင့် `messages/en.json`, `messages/my.json` မှ ရယူပါ။

## Data နှင့် State စီးဆင်းပုံ

```text
Page
  -> UI component
  -> feature hook
  -> service
  -> API client
  -> backend
```

- API မှရသော data သည် **server state** ဖြစ်သည်။ Fetch၊ cache၊ invalidation နှင့် mutation များကို TanStack React Query ဖြင့်စီမံပါ။
- Browser ပေါ်တွင် ထိန်းသိမ်းရသော app-wide **client state** (ဥပမာ auth state) ကို Zustand ဖြင့်စီမံပါ။
- Modal တစ်ခုဖွင့်/ပိတ်ခြင်းလို local UI state ကို component ထဲတွင် ထားနိုင်သည်။ အမှန်တကယ်လိုအပ်ခြင်းမရှိဘဲ Zustand store ထဲမထည့်ပါနှင့်။
- API data ကို React Query cache နှင့် Zustand store နှစ်ခုလုံးတွင် ထပ်မသိမ်းပါနှင့်။
- Loading၊ empty၊ error နှင့် success state များကို UI မှာ ရှင်းလင်းစွာ ကိုင်တွယ်ပါ။ Error ကို အောင်မြင်သကဲ့သို့ ဖုံးကွယ်မထားပါနှင့်။

## Form တည်ဆောက်ပုံ

1. Zod schema ကို `validations/` ထဲတွင် သတ်မှတ်ပါ။
2. `React Hook Form` ဖြင့် field state၊ submit နှင့် field error များကို စီမံပါ။
3. Zod ကို form resolver နှင့် ချိတ်ပါ။ လက်ရှိ dependency မရှိပါက `@hookform/resolvers` ကို ထည့်သွင်းပါ။
4. Submit handler ကို feature hook မှတစ်ဆင့် API service သို့ ပို့ပါ။ Form component ထဲတွင် API request တိုက်ရိုက်မလုပ်ပါနှင့်။
5. Schema မှ type ရယူနိုင်ပါက `z.infer` ကို အသုံးပြုပြီး တူညီသော type ကို လက်ဖြင့် ထပ်မရေးပါနှင့်။

## Component နှင့် Client Boundary

- `components/ui/` ထဲတွင် generic UI primitive များသာထားပါ။ `components/forms/` နှင့် `components/list/` ထဲတွင် အသုံးပြုမှုအလိုက် UI များထားပါ။
- Component ကို တစ်နေရာထက်ပို၍ သုံးလာမှ `components/shared/` ထဲသို့ မျှဝေ component အဖြစ် ထုတ်ယူပါ။
- `use client` ကို React state/hook၊ browser API သို့မဟုတ် event handler လိုအပ်သည့် component တွင်သာ ထည့်ပါ။ အပေါ်ပိုင်း tree တစ်ခုလုံးကို မလိုအပ်ဘဲ Client Component မလုပ်ပါနှင့်။
- Component တစ်ခုကို props ဖြင့်ဖတ်ရလွယ်ပြီး တာဝန်တစ်ခုတည်းရှိအောင် ထိန်းသိမ်းပါ။

## Upload နှင့် Configuration

- Image/document upload လိုအပ်လာပါက upload request နှင့် shared behavior ကို service/helper တစ်နေရာတည်းတွင် စုစည်းပြီး feature တိုင်းတွင် ထပ်မရေးပါနှင့်။
- Environment variable များကို source code ထဲ hard-code မလုပ်ပါနှင့်။ Browser ထဲသို့ မပေါက်ကြားသင့်သော secret များကို `NEXT_PUBLIC_` prefix မပေးပါနှင့်။
- Backend response ပုံစံကို မခန့်မှန်းပါနှင့်။ API contract သို့မဟုတ် အတည်ပြုထားသော response type ကို အခြေခံ၍ service နှင့် UI ကို ချိတ်ဆက်ပါ။

## Feature တစ်ခုတည်ဆောက်ရာတွင်

1. လိုအပ်သော route ကို `app/` ထဲတွင် သတ်မှတ်ပါ။
2. Presentational UI ကို `components/` ထဲတွင် တည်ဆောက်ပါ။
3. API request လိုအပ်ပါက typed service function ထည့်ပါ။
4. Query၊ mutation၊ form submit နှင့် feature logic ကို hook ထဲတွင် စုစည်းပါ။
5. Form validation အတွက် shared Zod schema ထည့်ပါ။
6. Shared domain/API type များကို `types/` ထဲတွင်ထားပါ။
7. Loading၊ empty၊ error၊ success state နှင့် responsive UI ကို စစ်ဆေးပါ။
8. ပြောင်းလဲမှုပြီးပါက ဖြစ်နိုင်သည့်အတိုင်း `npm run lint`, `npm run typecheck` နှင့် သက်ဆိုင်ရာ test/build ကို လုပ်ဆောင်ပါ။
