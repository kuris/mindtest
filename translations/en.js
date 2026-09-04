/* translations/en.js — English */
window.MINDTEST_TRANS = {
  ui: {
    /* site */
    'site.brand':        'MindTest',
    'site.brand.mid':    'Mind',
    'site.brand.dot':    'Test',
    'site.tagline':      '3-minute psychology tests',
    'site.lede':         'No signup. No install. Share results instantly.',
    'site.footer':       'Fun psychology tests',
    'site.sister':       'Sister site',
    /* nav */
    'btn.copy':          '🔗 Copy Link',
    'btn.tweet':         '𝕏 Share',
    'btn.other':         '🎲 Try Other Tests',
    'btn.retry':         '↻ Retake',
    'toast.copied':      'Link copied!',
    'share.hint':        'Paste the copied link into KakaoTalk or Instagram to show the result card.',
    /* home */
    'home.h1':           'Pick a test',
    /* result labels */
    'result.traits':     'Your traits',
    'result.tip':        'One piece of advice',
    'result.match':      'Best match type',
    'result.desc':       'What type are you?',
    /* kicker labels */
    'kicker.love':       'Love Style Test Result',
    'kicker.kkondae':    'Old-School Score Test Result',
    'kicker.vocab':      'Korean Vocab Test Result',
    'kicker.burnout':    'Burnout Check Result',
    'kicker.digital':    'Digital Dependency Result',
    'kicker.tmi':        'TMI Type Test Result',
    /* score badge */
    'badge.burnout':     'Burnout score: {v}%',
    'badge.digital':     'Digital dependency: {v}%',
    'badge.kkondae':     'Old-school score: {v}%',
    /* home cards */
    'card.love.title':   'Love Style Test',
    'card.love.desc':    'Which of 16 love types are you? Find out from 12 quick questions.',
    'card.love.meta':    '12 questions · 16 types',
    'card.kkondae.title':'Old-School Score Test',
    'card.kkondae.desc': 'Are you a free-thinker or secretly old-fashioned? 10 questions to find out.',
    'card.kkondae.meta': '10 questions · 5 levels',
    'card.vocab.title':  'Korean Vocab Test',
    'card.vocab.desc':   'Can you tell "심심한 사과" from a boring apology? Test your Korean Sino-vocab.',
    'card.vocab.meta':   '10 questions · 6 levels',
    'card.burnout.title':'Burnout Check',
    'card.burnout.desc': 'Morning alarm, post-work emptiness, 3am thoughts. Check your burnout level now.',
    'card.burnout.meta': '10 questions · 5 levels',
    'card.digital.title':'Digital Dependency Test',
    'card.digital.desc': 'Phone first thing, phone at meals, phone before sleep. Find your dependency level.',
    'card.digital.meta': '10 questions · 5 levels',
    'card.tmi.title':    'TMI Type Test',
    'card.tmi.desc':     'Fast or slow? Deep or brief? Find your conversation style across 3 axes.',
    'card.tmi.meta':     '9 questions · 8 types'
  },

  tests: {

    /* ══════════════════════════════════════════════
       LOVE STYLE TEST
    ══════════════════════════════════════════════ */
    love: {
      title:    'Love Style Test',
      subtitle: '12 questions · 16 types',
      shareText:'I just took the Love Style Test — check your type too!',
      questions: [
        { q: 'Your crush has been silent for 6 hours. You:',
          a: ['Text first. Can\'t help it.', 'Check they\'re online and wait. Don\'t want to seem desperate.'] },
        { q: 'They keep sending signals they like you.',
          a: ['Call it out. "So do you like me?"', 'Stay cool until you\'re totally certain.'] },
        { q: 'Just got home from an amazing date.',
          a: ['"Tonight was incredible" — sent immediately.', 'Making the first move feels like losing. Just send "Good night."'] },
        { q: 'Great first date chemistry.',
          a: ['Set the next date right there.', 'Need a few more meetups to be sure.'] },
        { q: 'Two weeks into the relationship.',
          a: ['Already mentally planning the 100-day celebration.', 'Still getting to know each other. No rush.'] },
        { q: 'If your relationship had a heat graph:',
          a: ['Hottest at the start. Full intensity from day one.', 'Takes about 3 months to really warm up.'] },
        { q: 'A free weekend with your partner.',
          a: ['Both days together, obviously.', 'One day apart, one day together. That\'s the sweet spot.'] },
        { q: 'Your partner goes on a trip with friends.',
          a: ['"Can I come too?" is my first reaction.', '"Have fun!" and I plan my own weekend.'] },
        { q: 'How often do you text each day?',
          a: ['Live updates. What I ate, everything.', 'Morning and evening is enough.'] },
        { q: 'Anniversary gift:',
          a: ['Handwritten letter + surprise. It\'s all about the emotion.', 'Exactly what they said they wanted. Practical = loving.'] },
        { q: 'If asked "Why are we together?":',
          a: ['I want to say "because it\'s fate."', '"Because we\'re comfortable together" — that\'s the honest answer.'] },
        { q: 'What matters most in love?',
          a: ['Butterflies. No excitement = no love.', 'Stability. Not fighting and going the distance.'] }
      ],
      results: {
        'romance-express':    { name:'Runaway Romance Train',     emoji:'🚂', summary:'No brakes. Full speed the moment feelings hit.',         desc:'When feelings strike, there\'s no hiding or slowing down. You text first, confess first, and already have anniversary plans. Being with you makes anyone feel loved all day. Just make sure they can keep up with your pace.',                                                                     traits:['From crush to confession in record time','You memorize anniversaries before they do','A long quiet spell ruins your whole day','"Aren\'t we meant to be?" — and you mean it'],                    tip:'Try matching their pace sometimes. Waiting is also part of love.',        match:'24/7 Convenience Store' },
        'always-open':        { name:'24/7 Convenience Store',    emoji:'🏪', summary:'Always open, always there for you.',                       desc:'Fast to express, loves being close, but stays grounded in reality. When someone\'s sick, you bring medicine instead of sweet words. Being with you means never feeling alone.',                                                                                                                             traits:['Replies even at 3 am','Gift = exactly what they asked for','Actions come before words','Fights resolved the same day'],                                                                            tip:'Doing everything wears you out. Practice letting people take care of you too.',match:'Runaway Romance Train' },
        'firework-confessor': { name:'Firework Confessor',        emoji:'🎆', summary:'Big bang, then back to your own space.',                    desc:'Big and bold when expressing feelings, but doesn\'t need 24/7 togetherness. Love hot, live separately. Partners are surprised at first, then relieved.',                                                                                                                                                 traits:['Confessions are event-level dramatic','Low contact but 100% present in person','Needs alone time to keep loving well','Zero clinginess'],                                                           tip:'Temperature gaps confuse people. Send a signal during the quiet spells.',   match:'Anxious Checker' },
        'instant-deal':       { name:'Fast-Close Closer',         emoji:'📄', summary:'Can\'t stand ambiguity. Locks it in fast.',                  desc:'Clear feelings = clear words, and clear endings too. Emotional waste is waste. You set expectations early so relationships start clean.',                                                                                                                                                                   traits:['First to ask "So what are we?"','Itinerary includes travel time','Wants solutions, not emotional spirals','Love is a planned activity'],                                                            tip:'Efficiency is great, but some feelings need to be heard without a solution.',match:'Wedding Daydreamer' },
        'slow-clinger':       { name:'Slow & Sticky',             emoji:'🍡', summary:'Slow to start, hard to shake.',                             desc:'Expresses freely but doesn\'t rush. Once you let someone in, you stay close. No flashy gestures — steady texts at the same time each day are your love language.',                                                                                                                                      traits:['Long to confess, but goes the distance once you do','Time spent together is the whole point','Never misses a small anniversary','Loves routines over novelty'],                                      tip:'Too familiar = partner feels taken for granted. Try a new date spot sometimes.',match:'The Tactician' },
        'caring-butler':      { name:'The Devoted Butler',        emoji:'🧺', summary:'Love language: quietly taking care of everything.',          desc:'You remember allergies, exam dates, preferences. Life just gets more organised around you.',                                                                                                                                                                                                    traits:['Knows their allergy list and exam schedule','Syncs routines from day one','Doesn\'t let things escalate','"You okay?" is always on your lips'],                                                      tip:'Caring as a habit = missing your own emotional window. Say what hurts, when it hurts.',match:'Silent Flame' },
        'letter-romantic':    { name:'The Letter Writer',         emoji:'💌', summary:'Records every moment of love.',                             desc:'Heart wide open but paces the relationship. Rare dates, but each one is designed. Photos, letters, playlists — you archive love.',                                                                                                                                                                 traits:['Handwritten letters for anniversaries','Pre-designs the vibe of every date','Respects space but doesn\'t hide the longing','Remembers love as a story'],                                            tip:'Obsessing over perfect moments makes ordinary ones feel like failures. Love the boring days too.',match:'Straight-Shooter Realist' },
        'honest-realist':     { name:'Straight-Shooter Realist',  emoji:'🥗', summary:'Clean, direct, no games.',                                  desc:'Says it when it\'s good, no fake push-pull. Doesn\'t rush or cling. Respects each other\'s lives and builds something long-lasting.',                                                                                                                                                                   traits:['Never twists feelings to say something else','Life doesn\'t fall apart because of love','Sets expectations early','Practically no grudges'],                                                         tip:'Too low-key and they think you don\'t care. One cheesy line goes a long way.', match:'The Letter Writer' },
        'quiet-flame':        { name:'Silent Flame',              emoji:'🔥', summary:'Cool outside, burning inside.',                             desc:'Feelings fire up fast but expression lags. Want to be close and imagine everything, but stay poker-faced. You get the "Wait, you liked me?!" reaction.',                                                                                                                                            traits:['Already played out multiple scenarios in your head','Quietly watched all their posts','30-minute debate before texting first','Nonchalant first, flustered when caught'],                          tip:'Unspoken feelings don\'t arrive. One sentence is enough.',                 match:'The Devoted Butler' },
        'secret-santa':       { name:'Secret Santa',              emoji:'🎁', summary:'Never announces it, but it\'s already done.',               desc:'Feelings come fast and you want to be close, but show it through actions not words. You brought an extra umbrella because you knew they didn\'t have one.',                                                                                                                                      traits:['Expresses through action, not words','Never takes credit','Detects what\'s needed before it\'s said','Already acting like a partner before the confession'],                                       tip:'Waiting to be noticed takes too long. Expressing yourself isn\'t showing off.',match:'Push-Pull Master' },
        'push-pull-master':   { name:'Push-Pull Master',          emoji:'🎣', summary:'Heart\'s racing, hands are slow.',                          desc:'Falls fast but never shows it first. Keeps comfortable distance, serves up only the romantic moments. They\'re endlessly curious. Magnetic, but exhausting long-term.',                                                                                                                            traits:['Reads it, replies 10 mins later — on purpose','Strikes at the decisive moment','Almost never said "I like you" first','Pretending not to care is your skill'],                                      tip:'Push-pull works at the start. Honesty hits harder once you\'re settled.',   match:'Secret Santa' },
        'tactician':          { name:'The Tactician',             emoji:'🎯', summary:'Reads the room before the heart.',                          desc:'Feelings come fast but expression is rationed. Protects your space, checks real-world compatibility. Fewer reckless moves = fewer failures. But you take a long time to start.',                                                                                                                    traits:['Calculates the confession timing','Clear line between love and daily life','Reads situation before feelings','Cuts cleanly when it\'s not right'],                                                  tip:'Over-calculating lets good people slip by. Take a chance sometimes.',      match:'Slow & Sticky' },
        'anxious-fairy':      { name:'Anxious Checker',           emoji:'📱', summary:'Can\'t say it, but needs to be close.',                     desc:'Imagines everything when replies stop but can\'t ask "Why no response?" Swallows hurt and brings it up much later. Deep love, but long hours of suffering alone.',                                                                                                                         traits:['Checks the chat multiple times when unread','Can\'t say hurt feelings right away','Detects tone changes instantly','Endlessly warm once reassured'],                                               tip:'Anxiety resolves in 5 seconds of asking. Checking isn\'t possessive.',     match:'Firework Confessor' },
        'tsundere-master':    { name:'The Tsundere',              emoji:'😾', summary:'Mouth says no, actions say yes.',                           desc:'Showing affection is the most awkward thing in the world. Says "whatever" but takes care of everything anyway. Once a partner learns to decode you, the bond becomes unbreakable.',                                                                                                                    traits:['Deflects compliments','Translates worry into nagging','The seat next to you is always empty — for them','No expression, but remembers everything'],                                                tip:'Don\'t leave all the decoding to them. Go direct a few times a year.',     match:'Wedding Daydreamer' },
        'daydream-wedding':   { name:'Wedding Daydreamer',        emoji:'💒', summary:'Zero real progress, infinite mental progress.',             desc:'Expression slow, pace slow, keeps distance — but already planned a future together in detail. Ocean of romance inside, barely a drop gets out. That gap is your charm and your challenge.',                                                                                                      traits:['Planning the future before officially dating','Hoping they confess first','Feelings grow stronger when alone','Keeps one person in mind for a long time'],                                         tip:'Imagination doesn\'t move relationships forward. Take one real step today.',match:'Fast-Close Closer' },
        'careful-fossil':     { name:'The Careful Fossil',        emoji:'🗿', summary:'Only trusts what\'s been verified.',                        desc:'Everything is cautious: expression, pace, distance, reality. Starts very slowly. But once committed, almost nothing shakes it. Certainty costs time — and that\'s the only way you buy it.',                                                                                               traits:['Won\'t start without certainty','Life routine doesn\'t change for love','Trusts consistency over events','Goes the distance once the heart is given'],                                             tip:'Waiting for everything to be confirmed means the moment\'s gone. Take a step.',match:'Runaway Romance Train' }
      }
    },

    /* ══════════════════════════════════════════════
       KKONDAE (OLD-SCHOOL SCORE) TEST
    ══════════════════════════════════════════════ */
    kkondae: {
      title:    'Old-School Score Test',
      subtitle: '10 questions · 5 levels',
      shareText:'I just found out my Old-School Score — take the test!',
      questions: [
        { q: 'A junior colleague disagrees with your opinion at work.',
          a: ['They\'re right to speak up — fresh perspectives matter.', 'They should learn the ropes before challenging seniors.', 'Disagree is fine, but tone matters.'] },
        { q: 'You\'re teaching someone how to do a task.',
          a: ['I explain once and let them figure out the rest.', 'They should just watch how I do it and copy.', 'I explain step by step and check their understanding.'] },
        { q: 'A young employee books a restaurant without asking you.',
          a: ['Good initiative — I appreciate proactivity.', 'They should have asked first. Seniors choose the place.', 'Depends on the context; initiative is sometimes good.'] },
        { q: 'You see a young person looking bored during your advice.',
          a: ['Maybe my advice isn\'t landing — I\'ll adjust.', 'They\'re ungrateful. Life experience is priceless.', 'I\'ll pause and check if they need something different.'] },
        { q: 'Someone younger than you earns more.',
          a: ['Fair — skills and results matter more than age.', 'Something is off with the system.', 'Mixed feelings, but I respect their achievement.'] },
        { q: 'You hear a slang word you don\'t understand.',
          a: ['Ask what it means — curious about new language.', 'Young people these days... incomprehensible.', 'Google it later.'] },
        { q: 'Your childhood was tougher than today\'s youth.',
          a: ['Every era has its own hardships.', 'Kids today have it too easy.', 'Different challenges, not necessarily easier.'] },
        { q: 'You were wrong in an argument with a junior.',
          a: ['Admit it clearly — being wrong isn\'t shameful.', 'Staying quiet is as good as admitting it.', 'I acknowledge it indirectly to save face.'] },
        { q: 'A young person teaches you something new.',
          a: ['Love it — everyone can learn from everyone.', 'Uncomfortable — it feels like they\'re showing off.', 'Grateful, but slightly awkward.'] },
        { q: 'What does "respecting elders" mean to you?',
          a: ['Respect is earned by character, not age.', 'Seniority automatically deserves deference.', 'Age earns baseline respect, character earns more.'] }
      ],
      grades: [
        { name:'Pure Spring Water', emoji:'💧', summary:'Zero old-school energy. Genuinely open-minded.',          desc:'No trace of old-school thinking. You see all people as equals regardless of age, listen with curiosity, and update your views freely. Rare and refreshing.',      traits:['Age means nothing in your evaluation','You love learning from younger people','Admit mistakes without hesitation','Judge ideas, not seniority'],                      tip:'Your openness is a superpower. Keep it.' },
        { name:'Seedling',          emoji:'🌱', summary:'Mostly open — with a few old-school moments.',           desc:'Mostly flexible, but occasionally a flicker of "back in my day" thinking sneaks in. Largely still driven by merit and openness.',                              traits:['Usually merit-based','Occasional frustration with young people\'s attitude','Mostly willing to learn','Rare hierarchy moments'],                                       tip:'Notice when age-based thinking creeps in and question it.' },
        { name:'Fifty-Fifty',       emoji:'⚖️', summary:'Half open, half traditional.',                           desc:'Genuinely torn between old and new. Sometimes flexible, sometimes hierarchical. Usually adapts to context — but the mix can confuse people around you.',           traits:['Open in some situations, traditional in others','Mixed feelings about age-based income gaps','Adjusts with context','Inconsistent rules'],                            tip:'Consistency builds trust. Pick a lane and stay there.' },
        { name:'Pro Old-Schooler',  emoji:'💼', summary:'Strong hierarchy instincts.',                             desc:'Age and seniority play a big role in how you see relationships. You value experience and expect deference. Others may see you as difficult to approach.',         traits:['Seniority shapes most decisions','Uncomfortable when juniors disagree','Advice is meant to be followed','Struggle giving credit to younger people'],                  tip:'Try listening without advising next time. You might be surprised.' },
        { name:'Living Fossil',     emoji:'🗿', summary:'100% old-school. Fully fossilised.',                     desc:'Age and hierarchy define your worldview. You struggle to see merit independent of seniority, and find it hard to understand why younger people think differently. A genuine generation gap.',traits:['Age = rank, always','Younger opinions are dismissed by default','Being challenged feels disrespectful','Change is inherently suspicious'],                 tip:'Ask one young person their opinion today — and just listen.' }
      ]
    },

    /* ══════════════════════════════════════════════
       KOREAN VOCAB TEST
    ══════════════════════════════════════════════ */
    vocab: {
      title:    'Korean Vocabulary Test',
      subtitle: '10 questions · 6 levels',
      shareText:'I just tested my Korean Sino-vocab — what\'s your level?',
      questions: [
        { q: '"심심한 사과" (sim-sim-han sa-gwa) — what does "심심한" mean here?',
          a: ['Boring / bland', 'Sincere / heartfelt', 'Sweet', 'Delicious'] },
        { q: '"무운을 빈다" (mu-un-eul bin-da) — "무운" means?',
          a: ['Good luck in battle / military fortune', 'Cloud formation', 'Dance move', 'No luck at all'] },
        { q: '"사필귀정" (sa-pil-gwi-jeong) — meaning?',
          a: ['Justice is served in the end', 'Everything changes', 'Actions have consequences', 'History repeats'] },
        { q: '"금상첨화" (geum-sang-cheom-hwa) — meaning?',
          a: ['Icing on the cake / even better', 'Fire and ice', 'Hidden beauty', 'Two birds, one stone'] },
        { q: '"조삼모사" (jo-sam-mo-sa) — meaning?',
          a: ['Fooled by surface differences (same thing, different packaging)', 'Morning routine', 'Clever scheme', 'Three plus four'] },
        { q: '"혼용무도" (hon-yong-mu-do) — meaning?',
          a: ['Total chaos / disorder', 'Mixed martial arts', 'Ancient ritual', 'Mixing cultures'] },
        { q: '"괄목상대" (gwal-mok-sang-dae) — meaning?',
          a: ['Remarkable improvement', 'Staring contest', 'Old rivals meet', 'Face-to-face dialogue'] },
        { q: '"아전인수" (a-jeon-in-su) — meaning?',
          a: ['Interpreting everything in your own favour', 'Pulling water to your field', 'Self-sufficient', 'Going with the flow'] },
        { q: '"오리무중" (o-ri-mu-jung) — meaning?',
          a: ['Completely in the dark / lost in fog', 'Five-mile journey', 'Duck in the fog', 'No clues'] },
        { q: '"명경지수" (myeong-gyeong-ji-su) — meaning?',
          a: ['Crystal-clear mind / still water mirror', 'Bright future', 'Mirror stage', 'Still lake'] }
      ],
      levels: [
        { name:'Level 4 Seedling',   emoji:'🌱', summary:'Just starting your Korean vocab journey.',         desc:'The road ahead is long, but curiosity gets you everywhere. Try picking up one new Sino-Korean word a day.',             traits:['Most Sino-Korean words are a mystery','Korean dramas help you pick up context','Great at phonetics, weaker on meaning','Every word is a new discovery'],           tip:'Apps like Naver dictionary make learning fun. Start with the most common 100.' },
        { name:'Level 4b Sprout',    emoji:'✏️', summary:'Building a foundation.',                           desc:'You know the basics and are starting to feel patterns. Keep it up and you\'ll surprise yourself.',                    traits:['Know the most common expressions','Context clues help a lot','Sometimes confuse similar-sounding words','Growing fast'],                                          tip:'Read Korean webtoons or news headlines for natural exposure.' },
        { name:'Level 5 Intermediate',emoji:'📖',summary:'Solid mid-range vocabulary.',                      desc:'You handle everyday Sino-Korean well. The trickier literary or classical terms still trip you up occasionally.',       traits:['Comfortable with office and academic vocab','Literary expressions need work','Good at guessing from context','Consistent learner'],                               tip:'Try reading Korean editorials or history articles to level up.' },
        { name:'Level 6 Advanced',   emoji:'📚', summary:'Strong vocabulary — most words are readable.',    desc:'You handle complex texts with ease. Classical idioms and rare compounds are your next frontier.',                     traits:['Reads Korean news fluently','Occasionally stumped by classical idioms','Vocabulary is a strength','Active learner'],                                               tip:'Read classical Korean literature or 사자성어 collections for the final polish.' },
        { name:'Level 7 Expert',     emoji:'🌟', summary:'Near-native vocabulary range.',                    desc:'Your Sino-Korean is outstanding. You understand nuance, historical context, and stylistic usage.',                    traits:['Catches subtle connotations','Explains word origins easily','Comfortable with literary and formal registers','Others ask you for definitions'],                    tip:'You\'re almost there. Study 한문 (classical Chinese) to unlock the last layer.' },
        { name:'Level 8 Master',     emoji:'🏆', summary:'Vocabulary master — perfect score!',              desc:'Exceptional command of Sino-Korean vocabulary across all registers. You could teach this material.',                  traits:['Handles all levels of formality','Understands classical Chinese roots','Uses words precisely and elegantly','Rare vocabulary is familiar territory'],              tip:'Share the knowledge — write or teach. That\'s the best way to keep it sharp.' }
      ]
    },

    /* ══════════════════════════════════════════════
       BURNOUT CHECK
    ══════════════════════════════════════════════ */
    burnout: {
      title:    'Burnout Check',
      subtitle: '10 questions · 5 levels',
      shareText:'I just checked my burnout level — find out yours!',
      questions: [
        { q: 'When your alarm goes off on a workday:',
          a: ['I get up fine. No big deal.', 'It feels physically painful every single morning.', 'Tough, but I manage.'] },
        { q: 'After work, what do you usually do?',
          a: ['My own things — hobbies, seeing people.', 'Crash on the sofa and can\'t move.', 'Mostly recharge alone.'] },
        { q: 'When something exciting used to happen, now:',
          a: ['Still get excited. That hasn\'t changed.', 'Can\'t really feel excitement anymore.', 'Less than before.'] },
        { q: 'How well do you sleep?',
          a: ['Pretty well.', 'Sleep but wake up exhausted.', 'Inconsistent — some nights fine, some not.'] },
        { q: 'When someone asks a favour:',
          a: ['Help if I can.', 'Drained even thinking about it.', 'Depends on my energy that day.'] },
        { q: 'On weekends:',
          a: ['Rest and properly recover.', 'Still feel tired all weekend.', 'Somewhat recovered, but not fully.'] },
        { q: 'How often do you say "I\'m tired":',
          a: ['Only when actually tired.', 'It\'s basically my catchphrase.', 'Fairly often lately.'] },
        { q: 'Thinking about next week at work:',
          a: ['Normal. Just another week.', 'Already dreading it.', 'Slight resistance, but manageable.'] },
        { q: 'Your motivation to do things:',
          a: ['No change. Still motivated.', 'Motivation? What\'s that?', 'Lower than before.'] },
        { q: 'Right now, what\'s missing most?',
          a: ['Nothing major. I\'m okay.', 'Time to be alone and just breathe.', 'Something small — hard to name it.'] }
      ],
      grades: [
        { name:'Fully Charged',    emoji:'🟢', summary:'Energy topped up. You\'re doing great.',      desc:'You\'re managing your energy well. Stress is present but not overwhelming. Keep going — and keep protecting what makes you feel good.',                                                            traits:['Mornings aren\'t dreadful','Can recover on weekends','Motivation stays steady','Still enjoy things you used to enjoy'],      tip:'You\'re in good shape. Protect that — rest before you need it.' },
        { name:'Warming Up',       emoji:'🟡', summary:'Fatigue is building. Proceed with care.',    desc:'Still functioning well, but energy runs a beat slower. The difference between resting and ignoring it now determines how you feel three months from now.',                                              traits:['Mornings feel heavy','Focus isn\'t what it used to be','Weekends don\'t fully restore','\"I\'m tired\" is becoming habitual'], tip:'Start with 30 minutes of unscheduled, obligation-free time daily.' },
        { name:'Warning Light On', emoji:'🟠', summary:'Your mind and body are sending SOS.',       desc:'Mood swings, tasks feeling heavier than they should. Willpower has been carrying you — but that method is running out. Recovery must come before pushing harder.',                                     traits:['Easily irritated','Lost motivation for many things','People feel more draining than usual','Things you enjoyed feel flat'],   tip:'Talk to someone. You don\'t have to solve this alone.' },
        { name:'Almost Empty',     emoji:'🔴', summary:'You need to stop and rest — now.',          desc:'Energy is near zero. Nothing feels exciting, the future feels flat, and some days the thought of disappearing sounds like relief. This isn\'t a willpower problem.',                                   traits:['Basic tasks feel enormous','Emotions feel muted','The future isn\'t something you look forward to','Sleep doesn\'t restore'], tip:'It\'s okay to pause. The world won\'t fall apart. Please reach out to someone.' },
        { name:'Fully Depleted',   emoji:'⚫', summary:'Recovery is the only priority right now.', desc:'Burnout has gone deep. Your mind and body are likely past their limit. Trying to push through alone is not an option — it\'s time to tell someone and ask for real help.',                          traits:['Daily life feels impossible','A sense of worthlessness creeps in','No expectations for the future','Emotions have gone quiet'], tip:'Show this result to someone close to you. You don\'t have to carry this alone.' }
      ]
    },

    /* ══════════════════════════════════════════════
       DIGITAL DEPENDENCY TEST
    ══════════════════════════════════════════════ */
    digital: {
      title:    'Digital Dependency Test',
      subtitle: '10 questions · 5 levels',
      shareText:'I just found out my digital dependency level — check yours!',
      questions: [
        { q: 'First thing after waking up:',
          a: ['Stretch or wash face.', 'Grab my phone before I\'m even awake.', 'Phone after a few minutes.'] },
        { q: 'During meals, your phone:',
          a: ['Face-down or away.', 'On the table, screen visible.', 'I try to keep it away but sometimes fail.'] },
        { q: 'When you receive a notification:',
          a: ['Check when convenient.', 'Check immediately — can\'t leave it.', 'Usually fast but sometimes delay.'] },
        { q: 'No wifi, low battery. You feel:',
          a: ['Fine — not a big deal.', 'Anxious and unsettled.', 'Slightly uncomfortable.'] },
        { q: 'Just before bed:',
          a: ['Phone away at least 30 mins before sleep.', 'Scrolling until I pass out.', 'Phone in bed but try not to use it much.'] },
        { q: 'Bathroom trips:',
          a: ['Phone stays outside.', 'Always bring my phone.', 'Sometimes.'] },
        { q: 'During a conversation, someone\'s talking and you:',
          a: ['Full attention, phone away.', 'Glance at notifications without thinking.', 'Try to focus but occasionally check.'] },
        { q: 'Time without your phone — you could:',
          a: ['Enjoy it.', 'Barely manage an hour.', 'An hour is fine; more gets uncomfortable.'] },
        { q: 'Screen time notifications:',
          a: ['Check and try to reduce.', 'Dismiss immediately.', 'Look but don\'t really change behaviour.'] },
        { q: 'After a long day:',
          a: ['Read, walk, or rest without screens.', 'Scroll social media until I fall asleep.', 'Mix of screens and other things.'] }
      ],
      grades: [
        { name:'Digital Minimalist',  emoji:'🌿', summary:'Phone is a tool — not your master.',              desc:'You use smart devices intentionally, not habitually. You\'re present in conversations and comfortable in silence. A rare and healthy relationship with technology.',                                                                           traits:['Comfortable without phone for hours','Notifications don\'t rule your attention','Screen time is genuinely low','Offline life feels natural'],             tip:'Your balance is enviable. Keep modelling it for others.' },
        { name:'Balanced User',       emoji:'📲', summary:'Healthy usage, with occasional overruns.',         desc:'You use digital tools well without being consumed by them. Awareness is your biggest asset — you notice when you\'re overdoing it.',                                                                                                       traits:['"Just a sec" sometimes becomes an hour','Not all notifications get answered','Phone-free time is manageable','Eat with phone sometimes'],              tip:'Flipping your phone face-down 30 mins before bed is a game-changer.' },
        { name:'Early-Stage Addicted',emoji:'🔔', summary:'Reaching for your phone without a reason.',       desc:'Habitual phone-checking is taking hold. You open apps with no purpose, feel itchy without the screen. The "I should cut back" thought comes often.',                                                                                      traits:['Uneasy without phone','Screen needed at meals','Scrolling until sleep','Screen time alerts get dismissed'],                                           tip:'Start by turning off non-essential notifications. Silence is healing.' },
        { name:'Phone-Dependent',     emoji:'📡', summary:'Digital world is more comfortable than real life.',desc:'Online feels easier than offline. Being without the phone is stressful. Real-world situations feel foreign.',                                                                                                                             traits:['Phone in the bathroom, always','Middle-of-night notifications get checked','No wifi = anxiety','\"Just a minute\" is always an hour'],                 tip:'Try one hour with your phone in another room. It gets easier each time.' },
        { name:'One With the Phone',  emoji:'🤖', summary:'Your right hand is already a smartphone.',        desc:'Screen-on from wake-up to sleep. The real world is the unfamiliar place. Phone is essential infrastructure, not a tool.',                                                                                                                  traits:['Screen time app is disabled or ignored','You can\'t tell the time without your phone','No charger = broken day','You check it mid-conversation'],    tip:'Put the phone down for 1 minute and look out the window. That\'s the beginning.' }
      ]
    },

    /* ══════════════════════════════════════════════
       TMI TYPE TEST
    ══════════════════════════════════════════════ */
    tmi: {
      title:    'TMI Type Test',
      subtitle: '9 questions · 8 types',
      shareText:'I just found out my conversation style type — take the test!',
      questions: [
        { q: 'Something interesting just happened. When do you tell people?',
          a: ['Right away — can\'t wait.', 'When the timing feels right.'] },
        { q: 'When you share a story, how much detail do you include?',
          a: ['Full detail — setting, context, emotions, everything.', 'Just the key points.'] },
        { q: 'When someone shares news with you, you:',
          a: ['Respond emotionally — empathy first.', 'Give your honest analysis.'] },
        { q: 'A friend is venting about a problem. You:',
          a: ['Listen and empathise.', 'Listen and suggest solutions.'] },
        { q: 'Preferred conversation environment:',
          a: ['Lively — active, lots of exchange.', 'Calm — meaningful and focused.'] },
        { q: 'After a long conversation, you usually feel:',
          a: ['Energised — conversation is fuel.', 'A little drained — need to decompress.'] },
        { q: 'In group chats, you tend to:',
          a: ['Drive the conversation.', 'React and support others\' messages.'] },
        { q: 'When you have something important to say, you:',
          a: ['Say it immediately, then refine.', 'Think it through, then speak once.'] },
        { q: 'When you hear something new, you instinctively:',
          a: ['Connect it to your own experience and share.', 'File it away and reflect quietly.'] }
      ],
      results: {
        'live-reporter':   { name:'Live Reporter',         emoji:'📡', summary:'As it happens, in detail, with full empathy.',          desc:'When something happens, it needs to be shared immediately and in detail — with emotional colour. You\'re never boring company. Just watch that you leave room for the other person to speak.',                                                                                traits:['KakaoTalk replies are always multi-paragraph','Long messages that are actually fun to read','Group chat energy-bringer','Reactions are generous and real'],          tip:'Sometimes, let them talk first. Listening is also a conversation skill.',     match:'Headline Editor' },
        'rapid-analyst':   { name:'Quick Analyst',         emoji:'🧮', summary:'Fast, detailed, logical.',                              desc:'Fast to share and thorough in detail, but information-first over emotion. Clear, efficient communication — especially useful in decision-making groups.',                                                                                                         traits:['Explanations are fast and precise','Long but always has a point','Leads with data in debates','Emotions expressed a bit stiffly'],                              tip:'Accurate isn\'t always enough. Sometimes "that sounds hard" is what\'s needed.',match:'Slow Empath' },
        'warm-narrator':   { name:'Warm Storyteller',      emoji:'📖', summary:'Slowly, deeply, with feeling.',                         desc:'Picks the right moment before speaking, then tells the story with warmth and depth. Conversations deepen with you around.',                                                                                                                                       traits:['"You know what? Actually..." starts conversations','Great storytelling instincts','Strong empathy for others\' emotions','Long messages that get read to the end'],  tip:'Good stories don\'t have to be perfectly timed. A little early is fine too.',  match:'Quick Analyst' },
        'headline-editor': { name:'Headline Editor',       emoji:'📰', summary:'Timed, detailed, conclusion-first.',                    desc:'Waits for the right moment, explains fully, but always lands on a clear point. Great at summarising group situations.',                                                                                                                                        traits:['Thinks before speaking','Long explanations, clear conclusions','Prefers meaningful talk over small talk','Favours in-person over texting'],                       tip:'Conclusions don\'t always have to come first. Sharing the process is also conversation.',match:'Live Reporter' },
        'slow-empath':     { name:'Slow Empath',           emoji:'🫂', summary:'Well-timed, brief, emotionally warm.',                  desc:'Quiet, but when you do speak it\'s to take care of the other person\'s feelings. One well-placed sentence can shift the whole atmosphere.',                                                                                                                     traits:['Few words but they carry weight','Reads feelings before responding','Quietly pivotal in conversations','"Just sitting with you is enough" energy'],               tip:'Think out loud more often. Your one sentence means more than you know.',       match:'Quick Analyst' },
        'cool-summarizer': { name:'Cool Summariser',       emoji:'✂️', summary:'Well-timed, brief, logical.',                           desc:'Only speaks when necessary, in fewest words possible. Ruthlessly efficient. Shines in work settings where clarity is valued.',                                                                                                                                    traits:['One-line messages are the norm','Minimal small talk','Direct feedback with no softening','Doesn\'t burn energy on unnecessary words'],                          tip:'Efficiency is great, but pointless chatting sometimes builds real connection.',match:'Warm Storyteller' },
        'late-bloomer':    { name:'Slow Blossomer',        emoji:'🌱', summary:'Later, briefly, warmly.',                               desc:'Unhurried, not many words, but when they come they\'re warm. The type who\'s quietly reliable when someone needs support.',                                                                                                                                     traits:['"Let\'s talk about it later" is your move','Almost never reacts in the moment','Sincere words come after careful thought','Quiet but dependable presence'],      tip:'The right moment sometimes passes. Even unfinished thoughts are worth sharing.',match:'Live Reporter' },
        'quiet-realist':   { name:'Quiet Realist',         emoji:'🧱', summary:'Later, briefly, logically.',                            desc:'Fewest words, most careful timing, facts over feelings. Quiet — but what you say is trusted most.',                                                                                                                                                            traits:['Three-second pause before every sentence','Almost no emotional expression','\"So what\'s the point?\" is your internal filter','Alone time is recharge time'],   tip:'Your silence can read as indifference. A small acknowledgement helps a lot.',  match:'Live Reporter' }
      }
    }
  }
};
