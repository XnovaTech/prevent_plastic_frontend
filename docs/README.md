# Frontend Documentation

Frontend အတွက် နည်းပညာ၊ ဖိုင်ဖွဲ့စည်းပုံနှင့် development လမ်းညွှန်များ။

- [Tech stack](./techstack.md) — အသုံးပြုထားသော နည်းပညာများနှင့် Myanmar/English localization အပါအဝင် ၎င်းတို့၏ တာဝန်များ။
- [Folder structure](./folderStructure.md) — Folder တစ်ခုချင်းစီ၏ တာဝန်၊ `mock/` data နှင့် illustration asset နေရာ၊ camelCase filename convention။
- [Development guidelines](./developmentGuidelines.md) — UI၊ hook၊ service၊ state၊ form၊ mock data နှင့် ဘာသာစကားပြောင်းလဲနိုင်သော စာသားများရေးသားပုံ။
- [UI/UX guidelines](./uiUx.md) — shadcn/ui ကို အမြဲဦးစားပေးအသုံးပြုခြင်း၊ homepage section များ၊ doodle art visual direction၊ accessibility နှင့် responsive design။
- [Business logic](./businessLogic.md) — Customer၊ guest cart/wishlist နှင့် merchant approval စည်းမျဉ်းများ၊ payment/delivery အတွက် pending ဆုံးဖြတ်ချက်များ။
- [Implementation plan](./implementationPlan.md) — Feature အဆင့်များ၊ homepage/navigation၊ Myanmar/English localization၊ payment/delivery pending gate နှင့် route/page အမည်များ။

လက်ရှိ product catalog integration သည် public catalog API မှ active products များကို အသုံးပြုသည်။ Customer list/detail flow ပြောင်းလဲပါက `implementationPlan.md` ထဲရှိ current status ကို code နှင့်အတူ update လုပ်ပါ။

Shared implementation references:

- Single image upload: [`components/shared/imageUploader.tsx`](../components/shared/imageUploader.tsx)
- Rich text content: [`components/shared/richTextEditor.tsx`](../components/shared/richTextEditor.tsx)
- Success notifications: [`components/ui/toast.tsx`](../components/ui/toast.tsx)
- Backend file lifecycle: [`backend/app/Services/FileService.php`](../../backend/app/Services/FileService.php)

Dependency၊ project structure သို့မဟုတ် team convention ပြောင်းလဲပါက သက်ဆိုင်ရာစာတမ်းကို code ပြောင်းလဲမှုနှင့်အတူ အပ်ဒိတ်လုပ်ပါ။ `package.json` နှင့် source code သည် implementation အတွက် အဓိကအမှန်တရားဖြစ်သည်။
