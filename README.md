# DASC Hedgehogs — U7 Training App

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
  (tabs)/index.tsx    This Week — week selector + full session plan
  (tabs)/season.tsx   Season overview — all 8 weeks, league format
  (tabs)/info.tsx     For Parents — what to bring, what to expect
  week/[id].tsx       Full plan for a single week
components/
  WeekPlan.tsx        Renders one week (blocks, coaching points, equipment)
data/
  trainingPlan.ts     All session content
theme.ts              Colors and spacing
```
