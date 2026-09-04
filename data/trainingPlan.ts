/**
 * DASC Hedgehogs U7 training plan.
 * Content transcribed from U7_Soccer_8Week_Training_Plan.pdf.
 *
 * To update the plan for a new season, edit the weeks below. Each week
 * follows the same four-block structure used at every session.
 */

export type BlockType = 'warmup' | 'drillA' | 'drillB' | 'game';

export interface SessionBlock {
  type: BlockType;
  /** Short label shown on the card, e.g. "WARM-UP" */
  label: string;
  /** Time window within the 60-minute session, e.g. "0–10" */
  time: string;
  /** Activity name, e.g. "Red Light, Green Light" */
  activity: string;
  /** How to run it — copied from the PDF's "How to run it" column */
  howToRun: string;
  /** YouTube URL for the demo video, if one exists */
  videoUrl?: string;
  /** True when the PDF marks this activity "Diagram only" (no video) */
  diagramOnly?: boolean;
}

export interface Week {
  id: number;
  focus: string;
  /** One-line description shown under the week title */
  summary: string;
  blocks: SessionBlock[];
  coachingPoints: string[];
  equipment: string;
}

export const TEAM_NAME = 'DASC Hedgehogs';
export const PLAN_TITLE = 'U7 Training Plan';
export const SESSION_LENGTH = '60 minutes';
export const NUM_PLAYERS = 13;

/** The fixed structure every session follows. */
export const SESSION_STRUCTURE =
  'Every session follows the same four blocks: 0–10 warm-up game · 10–25 Drill A (learning the technique) · 25–40 Drill B (applying it under pressure) · 40–60 4v4 game.';

/** League format facts shown on the season overview. */
export const LEAGUE_FORMAT = [
  '4v4, no goalkeeper',
  '25 × 35 yard field',
  'Size 3 ball',
  '20-minute halves',
  'Every player features at least half of each game',
];

/** Standard equipment for the season. */
export const STANDARD_EQUIPMENT =
  '13 size-3 balls (one per player) · 26 cones · 2 small goals · pinnies in two colors · a filled water cooler · a first aid kit · a whistle';

/** What to bring to every session (shown to families). */
export const WHAT_TO_BRING = [
  'A size 3 ball marked with your child\u2019s name',
  'Shin guards worn under socks',
  'Cleats or sneakers',
  'A filled water bottle',
  'Clothing suitable for the weather',
];

export const PARENT_INFO = {
  title: 'Information for parents',
  intro:
    'This plan sets out the eight training sessions for the season. It is shared with parents so that you can see what the players are working on each week and how sessions are organized.',
  whatYourChildWillWorkOn: [
    {
      when: 'Weeks 1–2',
      focus: 'Comfort on the ball',
      develops:
        'Dribbling with control and receiving a pass cleanly. The foundation for everything that follows.',
    },
    {
      when: 'Weeks 3–4',
      focus: 'Passing and running with the ball',
      develops:
        'Accurate short passing, moving after the pass, and the confidence to take an opponent on.',
    },
    {
      when: 'Weeks 5–6',
      focus: 'Shooting and defending',
      develops:
        'Sound striking technique, and defending through body position rather than rushing in.',
    },
    {
      when: 'Weeks 7–8',
      focus: 'Playing as a team',
      develops:
        'Spacing, supporting a teammate, and applying the season\u2019s skills in game conditions.',
    },
  ],
  everyPlayerNeedsABall:
    'Every player needs their own ball. Much of the session is designed so that no one stands in line, and that only works if each player has one at their feet.',
  playingTime:
    'League rules require every player to play at least half of each game, and the same principle applies in training. Sessions are built around small groups specifically so that no child spends the hour waiting for a turn.',
  progress:
    'At six and seven, development is measured in touches on the ball and willingness to try, not in results. It is entirely normal at this stage for players to cluster around the ball, to lose possession often, and to forget an instruction from one week to the next. Sessions are built from short activities because concentration at this age typically lasts eight to twelve minutes.',
  aim:
    'The aim across these eight weeks is that every player becomes comfortable with a ball at their feet, understands the basics of passing, shooting and defending, and finishes the season wanting to play again. Game results are not a measure of whether that has been achieved.',
  sideline: [
    'Encouragement for both teams is always welcome. Instructions during play are not — players at this age cannot process sideline coaching and watch the ball at the same time.',
    'Referees at this level are often young or volunteers. Decisions are not disputed by coaches or parents.',
    'The most useful question after a game is whether they enjoyed it, rather than whether they won or how many goals they scored.',
  ],
};

export const weeks: Week[] = [
  {
    id: 1,
    focus: 'Ball Familiarization',
    summary:
      'Establishing comfort with the ball. The priority is confidence and volume of touches.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Red Light, Green Light',
        howToRun:
          'Players dribble on \u201cgreen\u201d and stop the ball under one foot on \u201cred\u201d. Every player has a ball.',
        videoUrl: 'https://youtu.be/KxFcVsveS8M',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: 'Cone Weaving',
        howToRun:
          'Three lanes so no one waits. Weave through, jog back, repeat. Finish with a timed race.',
        diagramOnly: true,
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: 'Sharks and Minnows',
        howToRun:
          'Minnows dribble across while sharks attempt to knock the ball away. Players caught become sharks.',
        videoUrl: 'https://youtu.be/OkAUW5MxjuM',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4 Free Play',
        howToRun:
          'Three teams of four, winner stays on. No positions, no goalkeeper, no offside.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cSmall touches\u201d — the ball should never travel more than a step ahead.',
      '\u201cHead up\u201d — one glance up between touches.',
      'Encourage the weaker foot, even though it will look awkward at first.',
      'Begin with cones four feet apart. Widen to six feet and ask for more speed once players settle.',
      'Keep technical correction to a minimum this week. Confidence and enjoyment come first.',
    ],
    equipment: '13 size-3 balls · 20 cones · pinnies',
  },
  {
    id: 2,
    focus: 'First Touch and Control',
    summary:
      'Cushioning the ball on receiving, rather than allowing it to rebound away.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Cops and Robbers',
        howToRun:
          'Robbers dribble out, collect a cone and return home. Cops attempt to tag them.',
        videoUrl: 'https://youtu.be/gWgMqrw0TfU',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: 'First Touch Circle',
        howToRun:
          'Two circles of six or seven with a coach serving. Receive, settle, then pass to a new player.',
        videoUrl: 'https://youtu.be/UdXDD5E8bb0',
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: 'Shadow Dribble',
        howToRun:
          'In pairs. The leader dribbles freely and the partner mirrors two steps behind. Swap each minute.',
        videoUrl: 'https://youtu.be/sSI0mjkkKb0',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4 Scrimmage',
        howToRun:
          'A goal counts double when the scorer controls the ball before shooting.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cSoft foot\u201d — cushion the ball rather than letting it rebound.',
      '\u201cTake it out of your feet\u201d — the first touch should move the ball into space.',
      'Use the inside of the foot only. Thigh and chest control are not appropriate at this age.',
      'Keep passing distances between five and ten feet. Longer passes create chasing.',
      'Two circles rather than one halves the waiting and doubles the touches.',
    ],
    equipment: '13 size-3 balls · 18 cones · pinnies',
  },
  {
    id: 3,
    focus: 'Passing and Receiving',
    summary:
      'Accurate short passing, and moving after the pass rather than watching it.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Passing Lines',
        howToRun:
          'Pairs eight feet apart. Firm pass, settle, return. Count consecutive successful passes.',
        videoUrl: 'https://youtu.be/iXOF18rS2D0',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: 'Passing Through Gates',
        howToRun:
          'Scattered cone gates. Pairs earn a point for each pass completed through any gate.',
        videoUrl: 'https://youtu.be/VbeasV7u_UQ',
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: 'Monkey in the Middle (2v1)',
        howToRun:
          'Two attackers keep possession from one defender. The defender swaps in on winning the ball.',
        videoUrl: 'https://youtu.be/sUKlMV4LZvA',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4 with Two-Pass Rule',
        howToRun:
          'A bonus point for any team completing two consecutive passes.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cInside of the foot, follow through towards your target.\u201d',
      '\u201cPass and move\u201d — the most valuable habit to establish at this age.',
      'Accuracy matters more than power. Acknowledge a well-weighted pass clearly.',
      'Encourage receivers to open their body so they can see more of the field.',
      'Adjust the grid: smaller if the defender never wins the ball, larger if they win it too easily.',
    ],
    equipment: '13 size-3 balls · 24 cones · pinnies',
  },
  {
    id: 4,
    focus: 'Dribbling to Beat an Opponent',
    summary:
      'Changes of speed and direction, and the confidence to attempt them.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Lane Dribbling',
        howToRun:
          'Controlled dribbling on the way out, quicker on the return. Four lanes with three players each.',
        videoUrl: 'https://youtu.be/2MdBVOjYsf8',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: 'Collecting Gates',
        howToRun:
          'Unopposed. Sixty seconds to dribble through as many gates as possible, then repeat and improve.',
        videoUrl: 'https://youtu.be/zQOJ6EQsAag',
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: '1v1 to the Gates',
        howToRun:
          'The attacker attempts to beat the defender through any gate. Roles swap each repetition.',
        videoUrl: 'https://youtu.be/HIgzb7HvMYQ',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4 Scrimmage',
        howToRun:
          'An additional point for beating an opponent one-on-one.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cSlow, then go\u201d — approach at a controlled pace, then accelerate past.',
      '\u201cTouch it past and run\u201d — the simplest reliable way to beat an opponent at this age.',
      'Teach one move only — either the step-over or the drag-back, not both.',
      'Unsuccessful attempts are expected. Acknowledge the attempt rather than the outcome.',
      'Three gates gives three routes to success, which keeps less confident players involved.',
    ],
    equipment: '13 size-3 balls · 26 cones · pinnies',
  },
  {
    id: 5,
    focus: 'Shooting',
    summary: 'Sound striking technique, and the willingness to attempt a shot.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Shooting Box',
        howToRun:
          'Pairs twelve feet apart with a cone box between them. Drive the ball through the box, low and firm.',
        videoUrl: 'https://youtu.be/zikFAfFP5TQ',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: 'Three-Angle Shooting',
        howToRun:
          'No goalkeeper. Players aim at the corner cones from three positions, three shots each.',
        videoUrl: 'https://youtu.be/1-7IUC6GHx4',
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: '2v2 to Goal',
        howToRun:
          'Two attackers against two defenders, attacking either goal. The first goal ends the round.',
        videoUrl: 'https://youtu.be/tt_FvVqB3yY',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4, Shoot on Sight',
        howToRun:
          'Small goals, no goalkeeper. Encourage every attempt.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cPlant foot points where the ball goes\u201d — the single most useful shooting cue.',
      '\u201cLock your ankle\u201d — a loose ankle produces a weak, inaccurate strike.',
      'Inside of the foot for accuracy. Laces only for players already comfortable.',
      'The league plays without goalkeepers at this age, so use corner cones as targets.',
      'Acknowledge every attempt on goal. Fear of missing is the main barrier to shooting at U7.',
    ],
    equipment: '13 size-3 balls · 20 cones · 2 small goals · pinnies',
  },
  {
    id: 6,
    focus: 'Defending',
    summary:
      'Body position and patience, in place of committing to the tackle too early.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Shuffle and Mirror',
        howToRun:
          'No balls. One player leads side to side while the partner mirrors. Knees bent, feet never crossing.',
        videoUrl: 'https://youtu.be/fBmKmCPcWuk',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: '1v1 Defending',
        howToRun:
          'The defender stays goal-side, forces the attacker wide and delays rather than committing.',
        videoUrl: 'https://youtu.be/uVkpeXS6Byw',
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: '2v2 Defend the Goal',
        howToRun:
          'One defender presses the ball while the second covers behind. Never both at once.',
        diagramOnly: true,
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4 Scrimmage',
        howToRun:
          'Award a point for winning the ball back cleanly, in addition to goals.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cGoal-side\u201d — always position between the attacker and the goal.',
      '\u201cDelay, do not dive in\u201d — the most difficult and most valuable lesson of this session.',
      '\u201cShow them sideways\u201d — angle the body so the attacker is forced wide.',
      'Knees bent, weight on the toes, arms out for balance. A sideways stance, never square.',
      'Tackle only when the ball is clearly away from the attacker\u2019s foot.',
      'Recognize good positioning even when the ball is not won. That is the objective.',
    ],
    equipment: '13 size-3 balls · 18 cones · 2 small goals · pinnies',
  },
  {
    id: 7,
    focus: 'Putting It Together',
    summary:
      'Spacing and support, and moving away from clustering around the ball.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Island Game',
        howToRun:
          'Players dribble between cone islands and move to an empty island on the whistle.',
        videoUrl: 'https://youtu.be/5b7QXi9Osas',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: '3v3 Possession Triangle',
        howToRun:
          'Four consecutive passes scores a point. Rotate teams every four minutes.',
        diagramOnly: true,
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: '4v4 with Spacing',
        howToRun:
          'Game format. Pause play twice to highlight good spacing, then allow the game to flow.',
        videoUrl: 'https://youtu.be/K1zjg_JN4zo',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: '4v4 Scrimmage',
        howToRun:
          'No pauses. Players apply the spacing themselves, which is the test of the session.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      '\u201cSpread out\u201d — expect to repeat this throughout the session.',
      '\u201cMake a triangle\u201d — the player in possession should always have two options.',
      '\u201cCheck your shoulder\u201d — look before the ball arrives.',
      'In a 4v4 game, spacing is the entire tactical objective. Nothing further is required at U7.',
      'Pause play sparingly. Two well-chosen stoppages achieve more than ten interruptions.',
    ],
    equipment: '13 size-3 balls · 24 cones · pinnies (two colors)',
  },
  {
    id: 8,
    focus: 'Review and Presentation',
    summary:
      'Revisiting the season\u2019s skills and closing with a positive final session.',
    blocks: [
      {
        type: 'warmup',
        label: 'WARM-UP',
        time: '0–10',
        activity: 'Team Knockout',
        howToRun:
          'Players dribble within the grid, protecting their own ball while attempting to knock out others.',
        videoUrl: 'https://youtu.be/63QlSCJO21U',
      },
      {
        type: 'drillA',
        label: 'DRILL A',
        time: '10–25',
        activity: 'Three-Station Rotation',
        howToRun:
          'Dribbling, passing and shooting, five minutes each, with one assistant coach per station.',
        diagramOnly: true,
      },
      {
        type: 'drillB',
        label: 'DRILL B',
        time: '25–40',
        activity: 'World Cup Mini-Tournament',
        howToRun:
          'Three teams of four plus a rotating player. Five-minute games, winner stays on.',
        videoUrl: 'https://youtu.be/KOi1SskxUEk',
      },
      {
        type: 'game',
        label: 'GAME',
        time: '40–60',
        activity: 'Final Games and Presentation',
        howToRun:
          'Closing games, followed by individual recognition for every player.',
        diagramOnly: true,
      },
    ],
    coachingPoints: [
      'Assign each assistant coach a single station and share this page in advance.',
      'Identify one specific improvement for each player. It is remembered long after the season.',
      'Keep games short so that energy remains high and no one waits long.',
      'Every player plays in every game on the final day.',
      'Close with a team presentation or high-five tunnel to mark the end of the season.',
    ],
    equipment: '13 size-3 balls · 26 cones · 2 small goals · pinnies',
  },
];

/** Suggested default week shown on launch. Update this as the season progresses. */
export const DEFAULT_WEEK_ID = 1;
