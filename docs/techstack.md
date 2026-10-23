# Frontend Tech Stack

ဤစာတမ်းသည် frontend တွင် အသုံးပြုထားသော နည်းပညာများနှင့် ၎င်းတို့၏ တာဝန်ကို မှတ်တမ်းတင်ထားသည်။ Dependency များ ပြောင်းလဲသည့်အခါ `package.json` ကို အဓိကအမှန်တရားအဖြစ် သတ်မှတ်ပြီး ဤစာတမ်းကိုပါ အပ်ဒိတ်လုပ်ပါ။

## လက်ရှိအသုံးပြုသော နည်းပညာများ

| အပိုင်း              | နည်းပညာ                 | တာဝန်                                                           |
| -------------------- | ----------------------- | --------------------------------------------------------------- |
| Framework            | Next.js 16 — App Router | Routing၊ layout၊ server/client rendering                        |
| UI                   | React 19                | Component အခြေပြု UI တည်ဆောက်ခြင်း                              |
| Language             | TypeScript              | Static type checking                                            |
| Styling              | Tailwind CSS 4          | Utility-first styling                                           |
| UI components        | shadcn/ui, Base UI      | Accessible ဖြစ်ပြီး ပြန်သုံးနိုင်သော UI building blocks         |
| Internationalization | next-intl 4             | Myanmar/English messages၊ locale-aware routing နှင့် formatting |
| API client           | Axios                   | Backend API request များ ပို့ခြင်း                              |
| Server state         | TanStack React Query 5  | Fetch၊ cache၊ refetch နှင့် mutation state စီမံခြင်း            |
| Client state         | Zustand 5               | Auth နှင့် app-wide client state စီမံခြင်း                      |
| Form state           | React Hook Form         | Form state၊ submit နှင့် field error များ စီမံခြင်း             |
| Validation           | Zod 4                   | Form input နှင့် လိုအပ်သော data များ စစ်ဆေးခြင်း                |

အထက်ပါစာရင်းကို လက်ရှိ `package.json` အပေါ် အခြေခံထားသည်။ React Hook Form ကို Zod နှင့် ချိတ်ဆက်ရန် လိုအပ်သည့်အခါ `@hookform/resolvers` dependency ကို ထည့်သွင်းအသုံးပြုပါ။ မထည့်ရသေးသော package များကို လက်ရှိအသုံးပြုနေသကဲ့သို့ မယူဆပါနှင့်။

## နည်းပညာရွေးချယ်မှုဆိုင်ရာ စည်းမျဉ်း

- Backend မှရသော data ကို server state အဖြစ် သတ်မှတ်ပြီး TanStack React Query ဖြင့် စီမံပါ။
- User-facing text နှင့် locale routing အတွက် လက်ရှိ dependency ဖြစ်သော `next-intl` ကို အသုံးပြုပါ။ မြန်မာ (`my`) နှင့် အင်္ဂလိပ် (`en`) ကို support လုပ်ပါ။
- UI state နှင့် auth ကဲ့သို့ app-wide client state ကိုသာ Zustand ထဲတွင် ထားပါ။ API response များကို Query Cache နှင့် Zustand နှစ်နေရာလုံးတွင် မိတ္တူမသိမ်းပါနှင့်။
- API request များကို တစ်သမတ်တည်းဖြစ်စေရန် Axios instance တစ်ခုတည်းကို `lib/apiClient.ts` တွင် စုစည်းထားပါ။
- UI building block အသစ်လိုအပ်ပါက project တွင်ရှိပြီးသား shadcn/ui component ကို ဦးစားပေးပြန်သုံးပါ။ မလိုအပ်ဘဲ UI kit အသစ် မတည်ဆောက်ပါနှင့်။
- Dependency အသစ်ထည့်ရန် လိုအပ်မှုနှင့် ထပ်တိုးလာမည့် maintenance cost ကို စစ်ဆေးပြီးမှ ထည့်ပါ။

အသုံးပြုပုံနှင့် တာဝန်ခွဲဝေမှုအသေးစိတ်ကို [folderStructure.md](./folderStructure.md) နှင့် [developmentGuidelines.md](./developmentGuidelines.md) တွင် ဖတ်ရှုနိုင်သည်။
