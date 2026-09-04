# Hedgehogs — U7 Training App

iOS + Android app (React Native via Expo) that displays the U7 training plan
so coaches, assistant coaches, and families can follow along at practice.

## Run it

```sh
npm install
npx expo start
```

- Scan the QR code with the **Expo Go** app (iOS App Store / Google Play)
  to run on your phone.
- Press `i` for the iOS simulator or `a` for the Android emulator.
- `npx expo start --web` runs it in the browser.

## Update the training plan

All content lives in `data/trainingPlan.ts`, transcribed from
`U7_Soccer_8Week_Training_Plan.pdf`. Edit that file when the plan changes.
Field diagrams are in `assets/diagrams/` (wired up in `data/diagrams.ts`)
and appear in each activity card via the "Show diagram" button.

- Set `DEFAULT_WEEK_ID` to the current week — that is what families see
  first when they open the "This Week" tab.

## Structure

```
app/
  (tabs)/index.tsx    This Week — week selector + session timer + full plan
                      on one page; the active block lights up as the timer runs
  (tabs)/season.tsx   Season overview — all 8 weeks, league format
  (tabs)/info.tsx     For Families — what to bring, what to expect
  week/[id].tsx       Full plan for a single week
components/
  SessionTimer.tsx    Runs the 55-min plan block by block, with skippable
                      water breaks between drills
  WeekPlan.tsx        Renders one week (blocks, coaching points, equipment)
  WeekSelector.tsx    Horizontal week chip row
data/
  trainingPlan.ts     All session content + buildSessionTimeline()
theme.ts              Colors and spacing
```

Water break length is `WATER_BREAK_MIN` in `data/trainingPlan.ts` (2 minutes by
default; the session totals 55 minutes). Block time slots live in each block's
`time` field and feed both the cards and the timer. The timer vibrates when a
block ends and keeps the screen awake.

## Build & publish

See `PUBLISHING.md` for the full App Store / Google Play guide (accounts,
closed-test requirement, store paperwork). Once the accounts are ready:

```sh
npm install -g eas-cli
eas login            # your Expo account
```

Test build on your phone:

```sh
eas build --profile development --platform ios
eas build --profile development --platform android
```

Production build + submit:

```sh
eas build --profile production --platform ios
eas build --profile production --platform android
eas submit --platform ios
eas submit --platform android
```

Bundle identifiers: `com.hedgehogs.training` (iOS `bundleIdentifier`, Android
`package` in `app.json`). Do not change them after release — stores treat a
changed ID as a new app.

