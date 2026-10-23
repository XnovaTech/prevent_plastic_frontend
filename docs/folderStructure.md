# Folder Structure နှင့် Naming Convention

ဤ project သည် လက်ရှိ Next.js App Router ပုံစံအတိုင်း source folder များကို repository root တွင်ထားသည်။ အောက်ပါဖွဲ့စည်းပုံသည် လက်ရှိဖွဲ့စည်းပုံနှင့် ကိုက်ညီသော စံပြပုံစံဖြစ်ပြီး feature တစ်ခုလိုအပ်လာသည့်အခါမှ သက်ဆိုင်ရာ folder/file များကို ထည့်ပါ။ Empty folder များကို ကြိုတင်ဖန်တီးထားရန် မလိုပါ။

```text
app/
  page.tsx
  [locale]/
    (auth)/
      login/
        page.tsx
      register/
        page.tsx
    (public)/
      page.tsx
      sme/
        page.tsx
      individual/
        page.tsx
      repair/
        page.tsx
      about/
        page.tsx
      contact/
        page.tsx
      products/
        page.tsx
        [productId]/
          page.tsx
      cart/
        page.tsx
      wishlist/
        page.tsx
      checkout/
        page.tsx
    (customer)/
      customer/
        orders/
          page.tsx
    (merchant)/
      merchant/
        application/
          page.tsx
    (admin)/
      admin/
        merchants/
          page.tsx
    layout.tsx
  layout.tsx
  globals.css

public/
  illustrations/
    marketDoodle.svg
    emptyWishlistDoodle.svg
  products/
    ceramicPlates.jpg
    wovenMarketBag.jpg
    deskLamp.jpg
    denimJacket.jpg
    filmCamera.jpg
    woodenStool.jpg
    woodenWallShelf.jpg
    succulentPot.jpg

i18n/
  routing.ts
  request.ts
  navigation.ts

messages/
  en.json
  my.json

components/
  ui/
    button.tsx
  shared/
    aosInitializer.tsx
    pageHeader.tsx
    languageSwitcher.tsx
    siteHeader.tsx
  forms/
    loginForm.tsx
  list/
    productList.tsx
  home/
    homeHeroSlider.tsx
    homePage.tsx
    productCard.tsx
    productSection.tsx
    productFeedSection.tsx

mock/
  homePageMock.ts

hooks/
  auth/
    useLogin.ts
    useRegister.ts
  useHeroSlider.ts
  useAos.ts
  useCart.ts
  useWishlist.ts
  useCheckout.ts
  useProducts.ts
  useInfiniteProducts.ts
  useFeaturedMerchants.ts
  useDiscountedProducts.ts
  useMockProductFeed.ts
  useMerchantApplication.ts

services/
  authService.ts
  cartService.ts
  wishlistService.ts
  productService.ts
  orderService.ts
  merchantService.ts

stores/
  authStore.ts

validations/
  authSchema.ts
  checkoutSchema.ts
  merchantApplicationSchema.ts

types/
  auth.ts
  cart.ts
  product.ts
  order.ts
  merchant.ts

lib/
  apiClient.ts
  utils.ts

docs/
  README.md
  techstack.md
  folderStructure.md
  developmentGuidelines.md
  uiUx.md
  businessLogic.md
  implementationPlan.md
```

`next-intl` message file များတွင် user-facing UI စာသားအားလုံးကို သိမ်းပါ။ `messages/en.json` နှင့် `messages/my.json` တွင် message key structure တူညီရမည်။ `i18n/` ထဲရှိ routing/request/navigation configuration များကို locale အတွက် တစ်နေရာတည်းမှ စီမံပါ။

`app/[locale]/` ထဲက route/page အမည်များသည် [implementationPlan.md](./implementationPlan.md) ရှိ Planned Route/Page Names နှင့် တူညီရမည်။ `[locale]` အတွက် ခွင့်ပြုသော value များမှာ `en` နှင့် `my` ဖြစ်သည်။ Checkout route ကို ကြိုတင်ဖွဲ့စည်းထားခြင်းသည် payment/delivery feature များ ready ဖြစ်သည်ဟု မဆိုလိုပါ။ Payment နှင့် delivery ကို business/API rule အတည်ပြုသည်အထိ pending ထားပါ။

## Folder တာဝန်များ

| Folder                  | တာဝန်                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `app/`                  | Route entry point၊ page နှင့် layout များ။ Page များကို အဓိကအားဖြင့် UI composition အတွက်သာထားပါ။                        |
| `components/ui/`        | shadcn/ui primitive များ။ Business logic နှင့် API request မထည့်ပါနှင့်။                                                 |
| `components/shared/`    | နေရာအများအပြားတွင် ပြန်သုံးနိုင်သော presentational component များ။                                                       |
| `components/forms/`     | Form အလိုက် UI component များ။ Form logic ကို hook နှင့် validation ကို schema မှ ချိတ်ဆက်ပါ။                            |
| `components/list/`      | Table၊ card list နှင့် အခြား list UI များ။ Data fetch မလုပ်ပါနှင့်။                                                      |
| `components/home/`      | Homepage အတွက်သာသုံးသော section composition များ။ UI ကိုသာထားပြီး data နှင့် loading logic ကို hooks မှယူပါ။             |
| `mock/`                 | Static design၊ prototype နှင့် development အတွက် typed mock records များ။ UI component ထဲတွင် demo data မရေးပါနှင့်။     |
| `hooks/`                | Feature logic၊ query/mutation နှင့် UI ကို service၊ store တို့နှင့် ချိတ်ဆက်ခြင်း။ Auth hooks ကို `hooks/auth/` ထဲထားပါ။ |
| `services/`             | Backend API ကိုခေါ်သည့် thin service function များ။ React hook သို့မဟုတ် UI logic မထည့်ပါနှင့်။                          |
| `stores/`               | Zustand ဖြင့် စီမံသော app-wide client state။                                                                             |
| `validations/`          | ပြန်သုံးနိုင်သော Zod schema များ။                                                                                        |
| `types/`                | API နှင့် domain အကြား မျှဝေသုံးစွဲသော TypeScript type များ။                                                             |
| `lib/`                  | API client နှင့် feature မသတ်မှတ်ထားသော shared utility များ။                                                             |
| `public/illustrations/` | Hero၊ empty state နှင့် section decoration အတွက် ပြန်သုံးနိုင်သော static illustration များ။                              |
| `i18n/`                 | `next-intl` locale routing နှင့် request configuration။                                                                  |
| `messages/`             | English (`en.json`) နှင့် Myanmar (`my.json`) UI translation များ။                                                       |
| `docs/`                 | နည်းပညာ၊ ဖွဲ့စည်းပုံနှင့် development လမ်းညွှန်များ။                                                                     |

## Routing စည်းမျဉ်း

- `(auth)`, `(public)`, `(merchant)`, `(customer)`, `(admin)` သည် `app/[locale]/` အောက်ရှိ Next.js route group များဖြစ်သည်။ Parentheses ပါသော group အမည်သည် URL ထဲတွင် မပါဝင်ပါ။
- URL path segment ကိုဖြစ်စေသော folder များကို lowercase ဖြင့် အမည်ပေးပါ။ စကားလုံးများစွာပါဝင်ပါက `course-history` ကဲ့သို့ kebab-case ကို သုံးပါ။
- ဥပမာ `app/[locale]/(merchant)/merchant/application/page.tsx` ၏ URL သည် `/en/merchant/application` သို့မဟုတ် `/my/merchant/application` ဖြစ်သည်။ Auth route သည် `/en/login` သို့မဟုတ် `/my/login` ဖြစ်သည်။
- Locale route ပြောင်းသည့်အခါ လက်ရှိ route နှင့် dynamic parameter များကို ထိန်းသိမ်းပါ။
- Next.js special file များကို framework က သတ်မှတ်ထားသည့်အတိုင်း `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` ဟု အမည်ပေးပါ။

## Folder နှင့် Filename Convention

1. Folder အမည်ကို lowercase `kebab-case` ဖြင့်ရေးပါ။ ဥပမာ `components/shared/`, `course-history/`.
2. Filename များကို `camelCase` ဖြင့်ရေးပါ။ ဥပမာ `pageHeader.tsx`, `useCourses.ts`, `courseService.ts`.
3. Next.js special filename များ၊ project configuration က သတ်မှတ်ထားသော filename များ၊ locale code ဖြင့်အမည်ပေးသော message file များနှင့် shadcn CLI မှထုတ်ပေးသော UI filename များသည် camelCase စည်းမျဉ်းမှ ခြွင်းချက်ဖြစ်သည်။ ဥပမာ `page.tsx`, `next.config.ts`, `en.json`, `my.json`, `button-group.tsx`.
4. Component filename ကို `camelCase.tsx` ဖြင့်ရေးပြီး export အမည်ကို `PascalCase` သုံးပါ။ ဥပမာ `pageHeader.tsx` မှ `PageHeader`.
5. Hook filename နှင့် function ကို `use` ဖြင့်စပါ။ ဥပမာ `useCourses.ts` မှ `useCourses`.
6. Service filename ကို `Service.ts`, validation schema ကို `Schema.ts`, store ကို `Store.ts` ဖြင့်ဆုံးပါ။ ဥပမာ `courseService.ts`, `courseSchema.ts`, `authStore.ts`.
7. Type filename ကို သက်ဆိုင်ရာ domain အမည်ပေးပါ။ Multiword domain ဖြစ်ပါက `examAttempt.ts` ကဲ့သို့ camelCase သုံးပါ။
8. `helpers`, `misc`, `common` ကဲ့သို့ အဓိပ္ပာယ်မရှင်းသောအမည်များကို ရှောင်ပြီး တာဝန် သို့မဟုတ် domain ကိုဖော်ပြသော အမည်ရွေးပါ။

`src/` folder သို့ ပြောင်းလိုပါက source folder အားလုံးကို တစ်ပြိုင်နက် စနစ်တကျရွှေ့ပြီး `tsconfig.json` ရှိ `@/*` path alias နှင့် `components.json` ရှိ shadcn alias များကိုပါ ညှိပါ။ ဤစာတမ်းကို ပြင်ဆင်ခြင်းတစ်ခုတည်းကြောင့် source ဖိုင်များကို အလိုအလျောက် ရွှေ့မည်မဟုတ်ပါ။
