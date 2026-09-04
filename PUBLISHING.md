# Publishing the Hedgehogs app to the App Store & Google Play

Complete step-by-step guide for getting the app live on iOS and Android.
Start the two accounts **first** — they are the long poles (Apple approval
can take 24–48h, Google's closed-test requirement takes 14 days).

---

## 0. What you need before anything else

| Item | Cost | Where |
|---|---|---|
| Apple ID (two-factor auth ON) | Free | https://appleid.apple.com |
| Google account | Free | https://accounts.google.com |
| Apple Developer Program | **$99/year** | https://developer.apple.com |
| Google Play Developer account | **$25 one-time** | https://play.google.com/console |
| Expo account | Free | https://expo.dev |

You can create the Apple ID and Google account ahead of time; they only take
a few minutes.

---

## 1. Apple Developer Program (for the iOS App Store)

### Before you start
- Apple ID with **two-factor authentication turned on**, with valid, up-to-date
  legal name, address, and phone number (same info as your Apple ID profile).
- A government-issued photo ID (passport or driver's license) — you may be
  asked to photograph it for identity verification.
- A credit card **in your own name** that can be charged in USD.

### Enroll (two options — pick one)

**Option A — Apple Developer app (easiest, recommended):**
1. Install the **Apple Developer** app on your iPhone/iPad (or use your Mac
   with Apple Silicon / T2 chip).
2. Open it → **Account** tab → sign in with your Apple ID.
3. Accept the Apple Developer Agreement if prompted → tap **Enroll Now**.
4. Enter your legal **first name, last name, phone number**.
   ⚠️ Use your real legal name — your name is shown as the seller on the App
   Store. An alias or nickname will delay approval.
5. If asked, verify your identity with your driver's license or passport.
6. Choose entity type: **Individual** (simplest — your personal name appears
   as the seller).
7. Agree to the license agreement → pay the **$99** with your own credit card.

**Option B — Web:**
1. Go to https://developer.apple.com → **Account** → sign in with your Apple ID.
2. Click **Enroll Now**, review benefits, click **Continue**.
3. Same steps as above: legal name → identity verification (if requested) →
   Individual → license agreement → $99 payment.

### After enrolling
- You'll get an order acknowledgement email, then a confirmation email with
  your enrollment status (Apple states ~24h; allow up to 48h).
- Once active, go to https://appstoreconnect.apple.com — this is where you'll
  create the app record, upload builds, and submit for review.
- If you don't receive a confirmation within 24h of purchase, contact Apple
  Developer Support with your enrollment ID.

---

## 2. Google Play Developer account (for Android)

### Before you start
- A Google account you'll keep (this is your developer identity).
- A phone number for verification.
- $25 payment (card/PayPal/Google Play balance).

### Steps
1. Go to https://play.google.com/console → sign in with your Google account.
2. Click **Create account** → choose **Developer** (not organization).
3. Accept the Developer Distribution Agreement.
4. Pay the **one-time $25** registration fee.
5. Fill in your developer profile:
   - Developer name (shown on your Play listing — can be "Hedgehogs" or your name)
   - Contact email
   - Website (optional but recommended; can be a simple page later)
6. Complete identity verification — Google will verify your email and phone.
   It may take a few days to a week to fully activate.
7. When done, you're in the Play Console: https://play.google.com/console

### ⚠️ The 14-day closed test requirement (important!)
If you created your personal developer account **after November 13, 2023**,
you **cannot publish to production** until your app has completed a
**closed test** with **at least 12 testers opted in continuously for at
least 14 days**. Google also checks that testers actually *used* the app
(not just installed it).

Practical implications:
- You can't go straight to production — you must use the closed-testing
  track first. This is normal for new indie accounts.
- Recruit 12+ people (friends, fellow parents on the team!) with Android
  phones, have them join the test link, install the app, and actually open
  it during the 14-day window.
- After the window, Play Console will let you **apply for production access**
  by answering a few questions about your testing.
- This is the longest single step in the whole process — start it as soon as
  you have a test build ready (step 6 below).

---

## 3. One-time naming decision: bundle identifiers

Pick these **before** the first production build — they're permanent.

- **iOS** `ios.bundleIdentifier` — e.g. `com.hedgehogs.training`
- **Android** `android.package` — e.g. `com.hedgehogs.training`

They're a reverse-DNS style unique address for the app (like a VIN number).
No two apps can share one; changing it after release makes Apple/Google treat
it as a *different* app. Use `com.<yourdomain>.<app>` if you own a domain,
otherwise any unique reverse-domain style string works.

---

## 4. App store paperwork (do once, before submitting)

Both stores require:

- **Privacy policy URL** — your app collects no personal data, so a simple
  one-page policy ("we don't collect anything; videos open YouTube") is
  enough. **This repo's policy is live at
  https://appdevstores.github.io/kinetic/** (source: `docs/index.html`).
- **Screenshots** — iPhone 6.7" (1290×2796) and Android phone sizes showing
  the This Week screen, Season, and a diagram. I can help generate these.
- **App description** — a few sentences about the app.
- **Age rating questionnaire** — Apple and Play both ask; the app is for
  coaches/families of U7 players. It is not directed at children (no
  child-directed marketing, no accounts for kids), so it does not need the
  Kids category, but answer the questionnaire truthfully.

---

## 5. Repo prep (I can do this when you're ready)

- Add `eas.json` with build profiles (development / preview / production).
- Add bundle identifiers to `app.json`.
- Configure `expo-splash-screen` so the launch screen shows the hedgehog logo.
- Add `.easignore` so builds skip junk.
- The logo is already wired as the app icon (iOS + Android adaptive).

---

## 6. Build & test

Install the EAS CLI once:

```sh
npm install -g eas-cli
eas login   # your Expo account
```

**Test build (run on a real phone):**
```sh
eas build --profile development --platform ios
eas build --profile development --platform android
```
Install on a real iPhone and Android phone. Test: the session timer (does it
keep the screen awake? vibrate on block changes?), water break highlights,
diagram expand/collapse, video links, and the 14-kid watermark.

**Production build:**
```sh
eas build --profile production --platform ios
eas build --profile production --platform android
```
This produces the `.ipa` (iOS) and `.aab` (Android) files.

---

## 7. Submit to the stores

### iOS — App Store Connect
1. Go to https://appstoreconnect.apple.com → **My Apps** → **+** → New App
   (name, bundle ID you chose, primary language, etc.).
2. Upload the `.ipa` — `eas submit --platform ios` does this for you
   (it handles signing with your Apple Developer account).
3. Fill in the App Store listing: description, screenshots, privacy policy
   URL, category, age rating, review contact.
4. **App Review**: your first submission is reviewed by Apple, typically
   24–48h (up to a few days). Respond to any questions promptly.

### Android — Play Console
1. Play Console → **Create app** → name, default language, app type, etc.
2. Upload the `.aab` — `eas submit --platform android` or upload manually.
3. Fill the Store listing (description, screenshots, etc.).
4. Because your account is new: first publish the app to the **closed
   testing track**, recruit 12 testers, run the 14-day window, then apply
   for **production access** and promote the release.
5. Google's review (for production) usually takes a few hours to a couple
   of days.

---

## 8. After launch

- Set `DEFAULT_WEEK_ID` in `data/trainingPlan.ts` as the season progresses.
- Update the plan content each season — everything is in `trainingPlan.ts`.
- Both stores require yearly renewals: Apple $99/yr; Google Play $25 is
  one-time (but the listing must stay active — apps removed for inactivity
  must be reinstated within a year).

---

## Quick checklist

- [ ] Apple ID with 2FA
- [ ] Google account
- [ ] Apple Developer Program enrolled ($99) + confirmation received
- [ ] Google Play developer account created ($25) + verified
- [ ] Bundle identifiers chosen (`com.hedgehogs.training` or similar)
- [x] Privacy policy published at a URL (https://appdevstores.github.io/kinetic/)
- [ ] Repo prep done (eas.json, identifiers, splash screen)
- [ ] Test build installed on a real iPhone + Android phone, all features tested
- [ ] iOS: App Store Connect app record created, build uploaded, review submitted
- [ ] Android: closed test with 12 testers for 14 days → production access
      applied → release promoted
- [ ] Screenshots + descriptions + age rating complete for both stores
