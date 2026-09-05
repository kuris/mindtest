#!/usr/bin/env node
/**
 * add-i18n-data.js
 * translations/en.js, ja.js, zh.js, es.js, pt.js 에
 * 신규 3종(맞춤법 spelling, 신조어 slang, 소비성향 money) 및 뷰 전환 버튼 번역 데이터 추가
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TRANS_DIR = path.join(ROOT, 'translations');

const I18N_EXTENSIONS = {
  en: {
    ui: {
      'btn.view.grid': '3×3 Grid',
      'btn.view.list': 'Card List',
      'kicker.spelling': 'Korean Spelling Test Result',
      'kicker.slang': 'MZ Slang & Trend Test Result',
      'kicker.money': 'Money & Spending Style Result',
      'badge.money': 'Spending index: {v}%',
      'card.spelling.title': 'Spelling Test',
      'card.spelling.desc': 'Test your Korean spelling with 10 commonly confused word pairs.',
      'card.spelling.meta': '10 questions · Grade evaluation',
      'card.slang.title': 'MZ Slang & Trend Test',
      'card.slang.desc': 'Test your internet culture and trend knowledge with 10 viral slang terms.',
      'card.slang.meta': '10 questions · 5 levels',
      'card.money.title': 'Spending Style Test',
      'card.money.desc': 'From shopping impulse to payday habits: evaluate your money style across 10 questions.',
      'card.money.meta': '10 questions · 5 levels'
    },
    tests: {
      spelling: {
        title: 'Korean Spelling Test',
        subtitle: '10 questions · Grade evaluation',
        shareText: 'My Korean spelling test result',
        questions: [
          { q: 'Which is the correct Korean spelling?', a: ['며칠 동안 (for several days)', '몇일 동안'] },
          { q: 'When feeling dumbfounded or shocked:', a: ['어이없다', '어의없다'] },
          { q: 'Saying "See you tomorrow!":', a: ['내일 봬요!', '내일 뵈요!'] },
          { q: 'Expressing "It is not allowed right now":', a: ['지금은 안 돼요', '지금은 안 되요'] },
          { q: 'Meaning "extraordinary, strange, fascinating":', a: ['희한하다', '희안하다'] },
          { q: 'Meaning "in the blink of an eye, very quickly":', a: ['금세 다 먹었네', '금새 다 먹었네'] },
          { q: 'Meaning "somehow / for some reason":', a: ['왠지 좋은 일이 생길 것 같아', '웬지 좋은 일이 생길 것 같아'] },
          { q: 'When hidden truth is revealed to the world:', a: ['진실이 세상에 드러났다', '진실이 세상에 들어났다'] },
          { q: 'Submitting a business report to your manager for approval:', a: ['서류 결재를 올렸다', '서류 결제를 올렸다'] },
          { q: 'Select the most ( ) answer:', a: ['알맞은', '알맞는'] }
        ],
        levels: [
          { name: 'National Language Institute Fellow', emoji: '👑', summary: 'Perfect 10/10! Absolute guardian of language rules.', desc: 'You did not miss a single trick question. You have an eagle eye for typos and text accuracy.', traits: ['Zero confusion on tricky spelling pairs','Spotted typos trigger internal sirens','Appreciates elegance in written text','Walking dictionary for friends'], tip: 'Flawless spelling! Just remember you can relax a bit when casual texting with friends.' },
          { name: 'Human Spell Checker', emoji: '🔍', summary: 'Top 10%! Highly proficient grammar expert.', desc: 'You breezed through words that trip up most native speakers. Your messages always inspire confidence.', traits: ['Zero worries when writing professional emails','Solves tricky spelling questions with ease','Quietly notices typos in messages','Gains trust through accurate diction'], tip: 'You missed one or two only due to rushing. Your language sense is top tier.' },
          { name: 'Fluent Everyday Communicator', emoji: '💬', summary: 'Solid average! Completely fluent in daily life.', desc: 'You follow standard rules with ease, only hesitating at notoriously confusing word pairs. Your communication is clear and effortless.', traits: ['Smooth communication with no misunderstandings','Occasionally does a quick search when unsure','Values flow over pedantic grammar policing','Quick to grasp context and intent'], tip: 'Reviewing a couple of common trap words is all it takes to reach the top tier.' },
          { name: 'Intuitive Fast-Texter', emoji: '⚡', summary: 'As long as the meaning gets across, it is fine!', desc: 'You write by sound and instinct. Meaning comes first, formal rules come second. Fast, lively, and spontaneous.', traits: ['Fingers fly faster than grammar filters','Auto-correct shows squiggly lines often','Spaces words whenever you pause for breath','Loves fast-paced instant messaging'], tip: 'Consider a quick proofread before sending official work emails or resumes.' },
          { name: 'King Sejong in Shock', emoji: '🛸', summary: 'King Sejong might come back to re-explain Hangeul!', desc: 'A total free spirit in spelling! Your friends might need a cipher key to read your texts, but the vibe is always there.', traits: ['Picks spelling by coin toss','Expects readers to read your mind','Creative and unique text interpretations','Inventive communication style'], tip: 'No worries at all! Just remembering today\'s 10 questions will double your spelling skills.' }
        ]
      },
      slang: {
        title: 'MZ Slang & Trend Test',
        subtitle: '10 questions · 5 levels',
        shareText: 'My Korean MZ slang trend level:',
        questions: [
          { q: 'What does "중꺾마 (Jung-Kkeok-Ma)" mean?', a: ['An unyielding, unbreakable heart', 'A heart that broke halfway', 'Breakdance master', 'Resetting a broken mindset'] },
          { q: 'What does "분좋카 (Bun-Joh-Ka)" stand for?', a: ['Cafe with great atmosphere (Bungi Joeun Cafe)', 'Snack bar discount card', 'Anger management card', 'Best cafe in Bundang'] },
          { q: 'What is a "핑프 (Ping-Peu)"?', a: ['Finger Princess/Prince (asks before searching)', 'Someone obsessed with pink outfits', 'Table tennis pro', 'Someone in sweet pink love'] },
          { q: 'What does "캘박 (Kael-Bak)" mean?', a: ['Pinning/saving an event on the calendar', 'A friend named Park in California', 'Calligraphy hung on wall', 'Nailing a calendar to the wall'] },
          { q: 'What does living a "갓생 (God-Saeng)" mean?', a: ['Living a productive and exemplary life', 'Living a deeply religious life', 'Living like an ancient noble scholar', 'Living innocently like a newborn'] },
          { q: 'What does "추구미 (Chu-Gu-Mi)" mean?', a: ['The aesthetic / vibe one aspires to', 'Autumn beauty', 'Excitement for Chuseok holiday', 'The charm of a soccer midfielder'] },
          { q: 'What slang is used when someone is unfairly targeted or nitpicked?', a: ['억까 (Eok-Kka / unfair bashing)', '억텐 (Eok-Ten / forced tension)', '억바 (Eok-Ba)', '억플 (Eok-Peul)'] },
          { q: 'What does "알잘딱깔센 (Al-Jal-Ttak-Kkal-Sen)" mean?', a: ['Doing things smartly, cleanly, and with good sense', 'Someone cold and strict', 'Sharp alarm clock discipline', 'Frugal and stylish person'] },
          { q: 'What is the cute term for the "talking stage" before dating (4-gwi-da)?', a: ['삼귀다 (Sam-gwi-da / 3-gwi-da)', '이귀다 (2-gwi-da)', '일귀다 (1-gwi-da)', '썸귀다'] },
          { q: 'What expression is used to say "I feel exactly the same way!"?', a: ['디토 (Ditto)', '리또 (Ritto)', '카토 (Katto)', '미토 (Mitto)'] }
        ],
        levels: [
          { name: 'The Algorithm Incarnate', emoji: '🦄', summary: '10/10! The creator of trends and memes.', desc: 'You live and breathe viral culture. You pick up new slang before it even hits mainstream social media.', traits: ['Adopts brand-new slang effortlessly','Knows meme origin stories and audio samples','The trend-bringer among your friends','Brisk and witty texting banter'], tip: 'Super high trend sense! Just pace yourself so your slower friends can keep up.' },
          { name: 'Trendsetter', emoji: '✨', summary: 'Top 10%! Incredibly sensitive to pop culture trends.', desc: 'You stay up to date with internet memes and viral videos. Whenever a new term drops, you know how to use it with style.', traits: ['Conquered short-form video algorithms','Fast to adopt fun new expressions','Brings laughter to group chats','Praised for youthful sensibility'], tip: 'Great cultural radar! You are always fun to talk to.' },
          { name: 'Modern Regular', emoji: '☕', summary: 'Balanced average! Understands everything you hear.', desc: 'You might not say all the slang out loud, but you get the reference immediately. Great bridge between generations.', traits: ['Knows famous memes and popular slang','Slightly shy to say slang out loud','Quietly follows trends on social media','Effortlessly catches conversation context'], tip: 'A very healthy balance! Your natural intuition carries you through any talk.' },
          { name: 'Trend Latecomer', emoji: '🐢', summary: 'Finds out what a meme meant right after it expires.', desc: 'You often ask "Wait, what does that mean?" after everyone laughs. You appreciate classic humor more than lightning-fast new slang.', traits: ['Secretly searches new acronyms on Google','Starts using slang right when it fades out','Prefers full words over clipped syllables','Loves nostalgic vintage comedy lines'], tip: 'No rush at all! Warm, authentic conversation is always timeless.' },
          { name: 'Pure Analog Classic', emoji: '🗿', summary: 'Pristine slang-free sanctuary of proper speech.', desc: 'You stand tall with standard vocabulary in a world overflowing with internet jargon. Traditional, grounded, and dignified.', traits: ['Internet slang sounds like a foreign language','Prefers clear, complete sentences','Unyielding respect for classic words','Exudes vintage classic charm'], tip: 'You do not need internet slang to thrive. Your polished speech is a rare superpower!' }
        ]
      },
      money: {
        title: 'Spending Style Test',
        subtitle: '10 questions · 5 levels',
        shareText: 'My spending style money tier:',
        questions: [
          { q: 'When you spot an item you like online:', a: ['Think for days whether I truly need it', 'Search for lowest price & coupons first', '"Buying it sooner saves time!" Order right away'] },
          { q: 'When food delivery has a $4 delivery fee:', a: ['Walk to pick it up or cook at home', 'Compare other restaurants or reach free delivery min', 'Order anyway — craving comes first'] },
          { q: 'On payday when money arrives:', a: ['Auto-transfer into savings and fixed expenses first', 'Check monthly budget and upcoming card bills', 'Reward myself with great food or shopping!'] },
          { q: 'When seeing "Buy 1 Get 1 Free" sales:', a: ['Ignore unless already on my shopping list', 'Check expiration date & buy if it\'s a staple', '"It\'s a loss not to buy!" Put it in the cart'] },
          { q: 'When paying at a dinner with friends:', a: ['Split bill precisely down to the penny', 'Pay with cash-back card and collect transfers', '"I\'ve got this!" Pay for everyone on impulse'] },
          { q: 'Your daily coffee/beverage habit:', a: ['Tumbler or free office/home coffee', 'Affordable discount coffee or coupon apps', 'Aesthetic cafes or $7 specialty drinks'] },
          { q: 'After an extremely stressful workday:', a: ['Warm shower, YouTube, and sleep early', 'A small $10 treat or comfort snack', '"Retail therapy!" Splurge on wish-list items'] },
          { q: 'Managing streaming services and phone plan:', a: ['Budget phone carrier & cancel unused streaming immediately', 'Share accounts with family/friends to save', 'Multiple active subscriptions even if rarely watched'] },
          { q: 'When seeing "Limited Edition / Last Chance!":', a: ['Know it\'s marketing and lose interest', 'Check secondhand resale value carefully', 'Heart races — buy before it sells out!'] },
          { q: 'The most important role of money in your life:', a: ['A shield providing safety and peaceful future', 'A tool to maintain daily balance and stability', 'A means to enjoy present happiness and unique memories'] }
        ],
        grades: [
          { name: 'Iron-Shield Saver', emoji: '🛡️', summary: 'Impenetrable defense! Master of frugal living.', desc: 'Your spending discipline is legendary. Impulsive purchases do not exist in your vocabulary. You turn pennies into solid financial castles.', traits: ['Picks up takeout to save on delivery fees','Immune to sales unless pre-planned','Savings first on payday','Master of rewards and budget phone plans'], tip: 'Your wealth management is top notch! But do not forget to treat yourself once in a while.' },
          { name: 'Smart Consumer', emoji: '📊', summary: 'Strategic spender who masters value and perks.', desc: 'You spend thoughtfully and save decisively. By comparing prices and utilizing perks, you extract maximum happiness from every dollar.', traits: ['Price comparison and cashback expert','Bold on essentials, strict on waste','Keeps impulse purchases within return window','Shares subscriptions smartly'], tip: 'The ideal balanced spender. Keep up this healthy and rewarding financial rhythm!' },
          { name: 'Mood-Wave Balancer', emoji: '⚖️', summary: 'Frugal on weekdays, generous when inspired.', desc: 'You live sensibly day to day, but open your wallet happily for special occasions and loved ones. A pragmatic and relatable spender.', traits: ['Economy lunches on weekdays, cafe tours on weekends','Small comfort treats after rough days','Recovers quickly from budget slip-ups','Never stingy with good friends'], tip: 'Small splurges bring joy, but setting a designated monthly "fun fund" keeps you safe.' },
          { name: 'Empty-Wallet Express', emoji: '💸', summary: 'Little splurges are life\'s spice! Paychecks pass right through.', desc: 'You fall easily for cute items, delicious food, and limited editions. You know how to make life vibrant and fun.', traits: ['"Buy now, regret never" philosophy','Multiple subscriptions quietly charging every month','Endorphin rush when unboxing parcels','Mystified by credit card statements at month end'], tip: 'Enjoying life is great, but try setting an automatic 15% transfer into a locked savings account right on payday!' },
          { name: 'YOLO High-Roller', emoji: '👑', summary: 'Betting tomorrow\'s bank account on today\'s happiness!', desc: 'You only live once! You believe in investing in the joy of the present. Generous with friends, you are the life of the party.', traits: ['"It\'s on me today!" comes naturally','Checkout opens the moment limited editions appear','Lives life to the absolute fullest','Takes a deep breath before opening card bills'], tip: 'A wonderfully passionate way to live! Just keep a secret emergency fortress fund locked away for peace of mind.' }
        ]
      }
    }
  },

  ja: {
    ui: {
      'btn.view.grid': '3×3グリッド',
      'btn.view.list': 'カード一覧',
      'kicker.spelling': '韓国語正しい表記テスト結果',
      'kicker.slang': 'MZ流行語テスト結果',
      'kicker.money': '消費スタイルテスト結果',
      'badge.money': '消費指数 {v}%',
      'card.spelling.title': '正しい表記テスト',
      'card.spelling.desc': '韓国人が一番迷う正しい表記10問で語学レベルを判定。',
      'card.spelling.meta': '10問・級数判定',
      'card.slang.title': 'MZ流行語テスト',
      'card.slang.desc': '最新の新造語やトレンドミームで測るトレンド感度テスト。',
      'card.slang.meta': '10問・5段階',
      'card.money.title': '消費スタイルテスト',
      'card.money.desc': '衝動買いから給料日の使い方まで。10問で分かるマネースタイル。',
      'card.money.meta': '10問・5段階'
    },
    tests: {
      spelling: {
        title: '正しい表記テスト',
        subtitle: '10問・級数判定',
        shareText: '韓国語正しい表記テストやってみた！',
        questions: [
          { q: '「何日間」の正しい韓国語表記は？', a: ['며칠 동안', '몇일 동안'] },
          { q: '「呆れてものも言えない」ときの正しい表記は？', a: ['어이없다', '어의없다'] },
          { q: '「明日お会いしましょう」の正しい表記は？', a: ['내일 봬요!', '내일 뵈요!'] },
          { q: '「今はダメです」の正しい表記は？', a: ['지금은 안 돼요', '지금은 안 되요'] },
          { q: '「珍奇で奇妙だ」の正しい表記は？', a: ['희한하다', '희안하다'] },
          { q: '「あっという間に」を意味する表記は？', a: ['금세 다 먹었네', '금새 다 먹었네'] },
          { q: '「なんとなく」を意味する表記は？', a: ['왠지 좋은 일이 생길 것 같아', '웬지 좋은 일이 생길 것 같아'] },
          { q: '「真実が世に明るみに出た」の正しい表記は？', a: ['진실이 세상에 드러났다', '진실이 세상에 들어났다'] },
          { q: '上司に書類の承認を仰ぐときの表記は？', a: ['서류 결재를 올렸다 (決済/決裁)', '서류 결제를 올렸다'] },
          { q: '括弧に入る最も「適切な」の正しい表記は？', a: ['알맞은', '알맞는'] }
        ],
        levels: [
          { name: '国立国語院名誉研究員', emoji: '👑', summary: '満点！表記規則の絶対的守護者。', desc: '罠問題を一つ残らず見抜きました。誤字脱字を絶対に許さない正確無比な実力者です。', traits: ['헷갈리는 짝을 완벽 구분','誤字を見ると頭のアラームが鳴る','正確なテキストの品格を重視','歩く辞書レベル'], tip: '完璧な実力！カジュアルな会話では少し肩の力を抜いても大丈夫です。' },
          { name: '人間校正チェッカー', emoji: '🔍', summary: '上位10%！ハイレベルな語学マスター。', desc: '多くのネイティブが間違える難関問題も難なくクリア。信頼感抜群のテキストを書く人です。', traits: ['仕事のメールも安心','大抵の問題は即答','相手の誤字に静かに気づく','正確な表現で信頼を得る'], tip: '間違えた1問は単なるケアレスミス。実力はすでにトップクラスです。' },
          { name: '日常会話スムーズ派', emoji: '💬', summary: '平均的！日常のコミュニケーションに全く困らない実力。', desc: '基本ルールはしっかり理解していて、意味の伝達も完璧です。', traits: ['普段の連絡に支障なし','たまに検索で確認する','過度な文法指摘は疲れると感じる','文脈把握が得意'], tip: '代表的な引っ掛けペアを整理すれば、いつでも最上位ランクへ上がれます。' },
          { name: '感覚派スピードチャット型', emoji: '⚡', summary: '意味さえ通じればOK！耳の感覚で書く自由人。', desc: 'ルールより発音やノリを重視。フットワーク軽くテンポの良いやり取りを好みます。', traits: ['指が頭より先に動く','校正にかけると赤線多め','スペースは呼吸の区切り','スピーディな会話を好む'], tip: '大事なビジネスメールの時だけは、送信前に一度見直す習慣をつけましょう。' },
          { name: '世宗大王もびっくり', emoji: '🛸', summary: '世宗大王がもう一度ハングルを教えに来る勢い！', desc: '独自の創作表記が飛び出す自由すぎる魂！意味を推理してもらうのもご愛嬌。', traits: ['コイン投げで決める表記','察してほしいタイプ','ユニークな創作ハングル','自由奔放なスタイル'], tip: '恥ずかしがる必要はありません！今日の10問を覚えるだけで実力倍増です。' }
        ]
      },
      slang: {
        title: 'MZ流行語テスト',
        subtitle: '10問・5段階',
        shareText: '韓国MZ流行語テストやってみた！',
        questions: [
          { q: '「중꺾마（チュンコッマ）」の正しい意味は？', a: ['重要なのは折れない心', '途中で折れてしまった残念な心', 'ブレイクダンスマスター', '折れた心を立て直すこと'] },
          { q: '「분좋카（ブンジョッカ）」の意味は？', a: ['雰囲気の良いカフェ', '粉食店の割引カード', '怒りコントロール相談', '盆唐にある良いカフェ'] },
          { q: '「핑프（ピンプ）」とはどんな人？', a: ['フィンガープリンス/セス（自分で調べず何でも聞く人）', 'ピンクの服ばかり着る人', '卓球が上手い人', 'ラブラブな恋愛中の人'] },
          { q: '「캘박（ケルバク）」の意味は？', a: ['カレンダーに予定を登録・固定しておく', 'カリフォルニアのパクさん', 'カリグラフィーを壁に飾る', 'カレンダーを壁に釘で固定する'] },
          { q: '「갓생（ゴッドセン）」を生きる意味は？', a: ['勤勉で生産的な模範的生活を送る', '神を敬いながら生きる', '昔の学者風に生きる', '赤ん坊のように無邪気に生きる'] },
          { q: '自分が目指すスタイルやムードを指す言葉は？', a: ['추구미（チュグミ / 追求美）', '추석미', '가을미', '축구미'] },
          { q: '理不尽に言いがかりをつけられたり非難されることを指す言葉は？', a: ['억까（オッカ / 억지 까기）', '억텐（オックテン）', '억바', '억플'] },
          { q: '「알잘딱깔센（アルジャルタクカルセン）」の意味は？', a: ['空気を読んでスマートにセンス良く', '知れば知るほど頑固な人', '目覚ましをきっちり合わせるセンス', '几帳面で清潔感のあるセンス'] },
          { q: '付き合う前段階の「いい感じ」を可愛く呼ぶ造語は？', a: ['삼귀다（サムグィダ）', '이귀다', '일귀다', '썸귀다'] },
          { q: '「私も全く同じ意見！」と強く共感するときの最近の表現は？', a: ['디토（Ditto）', '리또', '카토', '미토'] }
        ],
        levels: [
          { name: 'アルゴリズムそのもの', emoji: '🦄', summary: '満点！流行とミームの創造主。', desc: 'ショート動画やSNSのトレンドを完璧に把握。新語が広まる前に肌感覚でキャッチしています。', traits: ['新語を自然に使いこなす','ミームの元ネタまで網羅','グループの流行発信源','機転の効いたテキスト会話'], tip: '抜群のセンス！周囲が追いつけないこともあるので、相手に合わせる優しさも。' },
          { name: 'トレンド先導者', emoji: '✨', summary: '上位10%！流行に敏感な感覚派。', desc: 'ネットコミュニティやSNSに詳しく、会話に流行語をさりげなく取り入れて場を盛り上げます。', traits: ['ショート動画アルゴリズム制覇','新しい表現を素早く吸収','グループチャットの盛り上げ役','若々しい感覚が好評'], tip: '素晴らしいトレンド感度！どこでも会話を楽しく弾ませるムードメーカーです。' },
          { name: '普通の現代人', emoji: '☕', summary: '平均的！聞けば全部わかる実用派。', desc: '自分からは乱発しなくても、耳にすれば「あ、あれね！」と理解できるバランス型です。', traits: ['有名なミームは把握','口に出すのは少し照れる','SNSでトレンドをさりげなくチェック','文脈のキャッチが早い'], tip: 'ちょうど良いバランス！自然な会話のやり取りがとても心地よいです。' },
          { name: 'ミーム遅刻生', emoji: '🐢', summary: '流行が一周してから意味を知るスロー派。', desc: 'みんなが笑っている時に「それどういう意味？」と聞くタイプ。少し遅れても楽しめればOK。', traits: ['知らない略語をこっそり検索','流行が終わりかけで使い始める','フルセンテンスを好む','昔の懐かしいお笑いに反応'], tip: '遅くても大丈夫！大事なのは言葉の飾りより心の通い合いです。' },
          { name: '純粋アナログ化石', emoji: '🗿', summary: '流行語ゼロの清浄エリア！', desc: '新語や略語の波に流されず、正しい本来の語彙で堂々と話すクラシック派です。', traits: ['流行語が外国語に聞こえる','美しい標準語を守る','文章を略さず丁寧に書く','重厚な大人の魅力'], tip: '流行語を知らなくても全く困りません！落ち着いた言葉遣いがむしろ魅力的です。' }
        ]
      },
      money: {
        title: '消費スタイルテスト',
        subtitle: '10問・5段階',
        shareText: '私の消費スタイル診断結果：',
        questions: [
          { q: 'ネット通販でお気に入りの服を見つけた時：', a: ['「本当に必要？」数日考えてカートに入れたまま', '最安値とクーポンを探してから決める', '「どうせ買うなら今！」即ポチ'] },
          { q: 'デリバリーで配達料400円が付く時：', a: ['配達料がもったいないので買いに行くか自炊', '他の店と比較するか送料無料ラインに合わせる', '今すぐ食べたいのが一番なので気にせず注文'] },
          { q: '給料が口座に振り込まれた当日：', a: ['まず貯金と固定費を自動振替で別口座へ', '今月の予算とカード引き落とし額を確認', '「自分へのご褒美！」美味しいものを食べるか買い物'] },
          { q: '1+1セールを見かけた時：', a: ['買う予定がなかったものは見向きもしない', '普段使う必需品か賞味期限を確認して買う', '「今買わないと損！」とりあえずカゴへ'] },
          { q: '友達との食事の会計：', a: ['きっちり1円単位で割り勘', 'ポイントや割引のあるカードで払って回収', '気分が良ければ「今日はおごるよ！」と全額払う'] },
          { q: '普段のコーヒー・飲み物代：', a: ['水筒持参かオフィスの無料コーヒー', 'コスパの良いチェーン店や割引アプリ活用', 'おしゃれカフェや700円超の特製ドリンク'] },
          { q: '仕事で激しいストレスを感じた夜：', a: ['お風呂に入ってYouTube見て早く寝る', 'ちょっとした夜食やスイーツで気分転換', '「爆買い！」欲しかったものをポチって買い物セラピー'] },
          { q: 'サブスクや携帯料金の管理：', a: ['見ない動画サブスクは解約＆格安SIM', '家族や友達とシェアしたりクレカ割引を活用', '見ていないサブスクが毎月引き落とされている'] },
          { q: '「限定品」「残りわずか」の文字を見た時：', a: ['マーケティングの罠だと冷める', '中古相場や本当の価値を調べる', '心拍数が上がって「今買わなきゃ！」とレジへ'] },
          { q: 'あなたにとって「お金」の最も重要な役割：', a: ['将来の不安をなくす安全な盾', '日々のバランスと安定した生活を支える道具', '今この瞬間の幸せや体験を楽しむための手段'] }
        ],
        grades: [
          { name: '鉄壁の節約王', emoji: '🛡️', summary: '鉄壁ガード！財布を守り抜く蓄財の達人。', desc: '支出コントロールが神レベル。無駄遣いという概念がなく、堅実に未来を築いています。', traits: ['配達料を惜しんでテイクアウト','セールでも不要なら買わない','給料日はまず先取り貯金','格安SIMや割引を徹底活用'], tip: '資産管理は百点満点！たまには頑張る自分に小さなプレゼントをあげてみてね。' },
          { name: 'スマートコンシューマー', emoji: '📊', summary: 'コスパと還元を見抜く戦略的スペンダー。', desc: '使う時は合理的に使い、締める時はきっちり締める理想的なバランス感覚の持ち主です。', traits: ['最安値比較とポイントの達人','必要なものには惜しまない','衝動買いも冷静に返品判断','サブスクも賢くシェア'], tip: '理想的なバランス型！これからも賢く楽しい消費を続けてください。' },
          { name: '気分派バランサー', emoji: '⚖️', summary: '平日は質素、気分が上がれば豪快！', desc: '普段はコツコツ節約しつつ、特別な日や親しい人のためなら気持ちよくお財布を開く現実派です。', traits: ['平日は節約ランチ、休日はカフェ巡り','ストレス時はプチ贅沢で回復','残高を見て反省するが立ち直りも早い','友達との時間は惜しまない'], tip: '息抜きも大切ですが、毎月の「ご褒美予算」の上限を決めておくと安心です。' },
          { name: '口座スルー直行便', emoji: '💸', summary: '小さな散財こそ人生の潤い！給料日は通過点。', desc: '可愛いもの、美味しいもの、限定品には抗えないロマン派。人生を多彩に楽しむ人です。', traits: ['「いつか買うなら今買おう」精神','使っていないサブスクが引き落とされる','届いた荷物を開ける瞬間が最高','月末になると残高に驚く'], tip: '給料日に強制的に15%を別口座に自動振替するルールを作ってみましょう！' },
          { name: 'YOLOマンスール', emoji: '👑', summary: '今の幸せに明日の通帳を賭ける！豪快なプレクサー。', desc: '人生は一度きり！今日の幸せのために惜しみなく投資する太っ腹なムードメーカーです。', traits: ['「今日はおごり！」が口癖','限定品を見ると即決','人生を全力で味わう達人','明細書を開ける時は深呼吸'], tip: '豪快で素敵な生き方！ただし緊急時用の秘密の予備費だけは確保しておきましょう。' }
        ]
      }
    }
  },

  zh: {
    ui: {
      'btn.view.grid': '3×3网格',
      'btn.view.list': '卡片列表',
      'kicker.spelling': '韩语拼写测试结果',
      'kicker.slang': 'MZ网络流行语测试结果',
      'kicker.money': '消费倾向测试结果',
      'badge.money': '消费指数 {v}%',
      'card.spelling.title': '韩语正字拼写测试',
      'card.spelling.desc': '韩国人最容易混淆的10道拼写题，测测你的韩语文字功底。',
      'card.spelling.meta': '10题 · 等级判定',
      'card.slang.title': 'MZ网络流行语测试',
      'card.slang.desc': '最新潮流梗和网络新词，测测你的冲浪与潮流指数。',
      'card.slang.meta': '10题 · 5阶段',
      'card.money.title': '消费倾向测试',
      'card.money.desc': '从冲动购物到发薪日习惯，10道题看透你的金钱与消费风格。',
      'card.money.meta': '10题 · 5阶段'
    },
    tests: {
      spelling: {
        title: '韩语正字拼写测试',
        subtitle: '10题 · 等级判定',
        shareText: '我的韩语正字拼写测试结果：',
        questions: [
          { q: '“几天期间”的正确拼写是？', a: ['며칠 동안', '몇일 동안'] },
          { q: '表示“莫名其妙、荒谬”时的正确表达是？', a: ['어이없다', '어의없다'] },
          { q: '“明天见！”的正确敬语拼写是？', a: ['내일 봬요!', '내일 뵈요!'] },
          { q: '表示“现在不行”的正确拼写是？', a: ['지금은 안 돼요', '지금은 안 되요'] },
          { q: '意为“稀奇古怪、非常特别”的词是？', a: ['희한하다', '희안하다'] },
          { q: '意为“转眼间、很快”的正确拼写是？', a: ['금세 다 먹었네', '금새 다 먹었네'] },
          { q: '意为“总觉得、不知为何”的拼写是？', a: ['왠지 좋은 일이 생길 것 같아', '웬지 좋은 일이 생길 것 같아'] },
          { q: '“真相大白/浮出水面”的正确拼写是？', a: ['진실이 세상에 드러났다', '진실이 세상에 들어났다'] },
          { q: '向领导呈报公文审批的“批示”是？', a: ['서류 결재를 올렸다 (决裁)', '서류 결제를 올렸다 (结算/支付)'] },
          { q: '填入括号中最“合适”的词汇正确形态是？', a: ['알맞은', '알맞는'] }
        ],
        levels: [
          { name: '国立国语院名誉研究员', emoji: '👑', summary: '满分！语言规范的绝对守护者。', desc: '避开了所有陷阱词汇，对错别字有着鹰一样的敏锐嗅觉。', traits: ['易混淆词完全不晕','看到错别字头脑警报立响','追求严谨准确的文字品味','身边的活字典'], tip: '满分水准！日常闲聊时可以稍微放松一点标准。' },
          { name: '人肉错字校对机', emoji: '🔍', summary: '前10%！极高水准的正字法达人。', desc: '能够轻松应对连大部分母语者都会失误的高难词汇，文字令人信赖。', traits: ['撰写商务邮件毫无压力','常见问题秒答','悄悄发现聊天中的错字','措辞严谨深得信任'], tip: '错的一两题纯属手滑，实力已是实打实的前列。' },
          { name: '日常沟通顺畅达人', emoji: '💬', summary: '平均水平！日常交流完全没有阻碍。', desc: '熟悉常用规范，意思传达清晰准确，遇到极度混淆的公文词偶尔会犹豫。', traits: ['日常发信息交流顺畅','偶尔拿不准会去搜索确认','反感吹毛求疵的纠错','善于结合语境理解'], tip: '稍微整理几组代表性的陷阱词就能迅速晋级最高档。' },
          { name: '直觉派快速打字手', emoji: '⚡', summary: '意思通顺就行！随性自然的键盘飞人。', desc: '比起教条的规则，更看重打字速度和表达的生动感。', traits: ['手指比大脑思维更快','聊天时错字红线常客','根据呼吸随性分词','喜欢快节奏的信息互动'], tip: '在正式商务和求职场合，建议发送前多通读一遍。' },
          { name: '世宗大王震惊客', emoji: '🛸', summary: '世宗大王都要赶回来重新教训民正音！', desc: '拼写界的法外狂徒！自成一派的创意输入法，朋友们常常需要破译你的信息。', traits: ['用抛硬币决定拼写','相信别人能心领神会','自创拼写法爱好者','风格极度自由'], tip: '不用难为情！今天记住这10道题，拼写功力立刻翻倍。' }
        ]
      },
      slang: {
        title: 'MZ网络流行语测试',
        subtitle: '10题 · 5阶段',
        shareText: '我的韩国MZ潮流梗测试等级：',
        questions: [
          { q: '“중꺾마 (Jung-Kkeok-Ma)”是什么意思？', a: ['重要的是百折不屈的心', '半途而废的遗憾心情', '折腰舞大师', '重要的是重新收拾破碎的心'] },
          { q: '“분좋카”是什么缩写？', a: ['氛围很好的咖啡馆', '小吃店优惠卡', '愤怒调节卡', '盆唐好喝的咖啡'] },
          { q: '“핑프”指什么样的人？', a: ['动动手指都不愿意自己搜索全靠问的人', '只穿粉色衣服的人', '乒乓球高手', '恋爱中的粉红泡泡人'] },
          { q: '“캘박”的意思是？', a: ['把日程早早在日历里定好/锁死', '在加州的朴姓朋友', '挂在墙上的书法', '把日历用钉子钉在墙上'] },
          { q: '过“갓생 (God-Saeng)”的生活是指？', a: ['勤奋充实、自律模范的生活', '虔诚信神的生活', '像古代书生一样死板的生活', '像新生儿一样纯洁生活'] },
          { q: '指代自己向往追寻的风格或氛围的词是？', a: ['추구미 (追求美)', '추석미', '가을미', '축구미'] },
          { q: '无缘无故被挑刺、无脑被黑时使用的词是？', a: ['억까 (无理挑刺)', '억텐 (假装嗨)', '억바', '억플'] },
          { q: '“알잘딱깔센”的完整意思是什么？', a: ['有眼力见儿、利落又有分寸感地做好', '越了解越强硬的人', '闹钟按时响起的习惯', '勤俭又体面的品味'] },
          { q: '正式谈恋爱(사귀다/4)之前的暧昧阶段被称为？', a: ['삼귀다 (三/还没到四)', '이귀다 (二)', '일귀다 (一)', '썸귀다'] },
          { q: '表示“我也完全赞同！心有戚戚焉”的流行表达是？', a: ['디토 (Ditto)', '리또 (Ritto)', '카토 (Katto)', '미토 (Mitto)'] }
        ],
        levels: [
          { name: '算法本身化身', emoji: '🦄', summary: '满分！造梗与潮流的先知。', desc: '洞悉短视频和社媒的所有热梗，新词还没泛滥之前你就已经熟练运用。', traits: ['新词出现立刻无缝上手','热梗出处和背景音如数家珍','朋友之间的流行传播源','接梗造梗能力满分'], tip: '网感极强！适时照顾一下跟不上节奏的朋友哦。' },
          { name: '潮流先行者', emoji: '✨', summary: '前10%！流行嗅觉极度灵敏。', desc: '活跃在各大网络社区，聊天中穿插最新热词活跃气氛的高手。', traits: ['熟练掌握各种爆款梗','对新词接纳度极高','群聊里的气氛烘托大师','常被夸思维年轻有活力'], tip: '超棒的潮流敏感度，在任何场合都能开启欢快话题。' },
          { name: '普通现代网民', emoji: '☕', summary: '平均水准！听到都能心领神会。', desc: '虽然自己不一定高频挂在嘴边，但听到别人说能瞬间get到点。', traits: ['知名网络热词全知道','自己说出来稍微有些害羞','在社媒默默潜水跟进热度','语境理解能力出众'], tip: '非常健康的平衡感！不浮夸但绝不脱节。' },
          { name: '流行慢半拍', emoji: '🐢', summary: '等热潮都快过去了才搞懂是什么意思。', desc: '大家哈哈大笑时常问“这到底啥意思啊？”。比起速朽的流行语更喜欢经典的笑料。', traits: ['私下偷偷搜索新词释义','流行快退潮时才开始用','喜欢完整语法表达','对怀旧老梗更有共鸣'], tip: '慢一点完全没关系，真诚沟通永远胜过词汇包装。' },
          { name: '纯净模拟态化石', emoji: '🗿', summary: '零污染纯净区！传统表达的坚定守护者。', desc: '完全不被眼花缭乱的新词缩写带偏，用温厚纯正的语言沟通。', traits: ['觉得网络新词像外国语','坚持完整标准表述','拒绝无意义缩写','自带典雅复古气质'], tip: '完全不影响生活！优雅端庄的谈吐本身就是独特的个人魅力。' }
        ]
      },
      money: {
        title: '消费倾向测试',
        subtitle: '10题 · 5阶段',
        shareText: '我的消费倾向金钱测试等级：',
        questions: [
          { q: '在网上看到心仪的衣服或物品时：', a: ['“真的需要吗？”纠结几天留在购物车', '先全网比价、找优惠券再决定', ['“早买早享受！”立刻下单付款']] },
          { q: '点外卖发现配送费要20元时：', a: ['觉得外卖费太亏，宁愿自己出门打包或做饭', '对比其他店铺或凑到起送/免配送线', '现在想吃最重要，不在乎配送费直接点'] },
          { q: '发工资（或零花钱）当天你的习惯动作：', a: ['先把储蓄和固定开支自动划转锁住', '仔细盘点当月预算和信用卡账单', '“犒劳辛苦的自己！”大吃一顿或购物'] },
          { q: '看到大减价或“买一送一”活动：', a: ['如果不在原本购买清单上完全不看', '核算是否是常用必需品及保质期再买', '“现在不买就亏了！”先丢进购物车'] },
          { q: '朋友聚餐结账时你的风格：', a: ['精确平摊到角分，立刻转账', '用有返现或优惠的卡刷卡再收转账', '心情好就大手一挥：“今天我请客！”'] },
          { q: '日常咖啡或饮品消费习惯：', a: ['带保温杯或喝公司/家里的免费茶水', '喝高性价比平价咖啡或用团购券', '打卡网红店或点三四十元的特色特调'] },
          { q: '工作压力极大、极度疲惫的傍晚：', a: ['洗个热水澡、看会视频早早入睡', '花三五十元吃点宵夜甜品安慰心情', '“暴风购物！”买心愿单里贵重物品犒赏自己'] },
          { q: '手机套餐及影视会员（VIP）管理：', a: ['不用的会员立刻取消，用最便宜套餐', '和家人朋友拼车共享或利用信用卡权益', '有好几个会员即使不常看也在每月自动续费'] },
          { q: '看到“限量发售”、“即将断货”标语：', a: ['深知是营销手段，反而瞬间失去兴趣', '冷静查询二手市场保值情况', '心跳加速，“现在不买就买不到了！”冲向付款'] },
          { q: '金钱在你人生中扮演的最重要角色：', a: ['消除未来不安全感的坚固盾牌', '维持日常平衡与安定生活的实用工具', '享受当下快乐与独特体验的手段'] }
        ],
        grades: [
          { name: '铁壁守财王', emoji: '🛡️', summary: '固若金汤！荷包的顶级守护神。', desc: '支出自律度达到登峰造极之境，冲动消费在你的字典里根本不存在。', traits: ['省下外卖费宁可自提','非清单折扣一概无视','发薪首要动作是先存钱','把各种优惠省钱技巧玩转'], tip: '理财满分！不过偶尔也别忘了给辛苦奋斗的自己一份小小奖励。' },
          { name: '明智消费者', emoji: '📊', summary: '洞悉性价比与权益的策略性花钱达人。', desc: '该省则省，该花则花。用出色的比价和权益规划，用同样的金钱获取超越常人的满足感。', traits: ['比价与返利高手','对必要品质不吝啬，对浪费零容忍','即便冲动消费也会在退货期内理性复盘','合理拼车管理各项订阅'], tip: '最理想的平衡型消费者，继续保持理智又舒心的金钱节奏！' },
          { name: '心情调和派', emoji: '⚖️', summary: '平时勤俭，兴致来了爽快大方！', desc: '日常精打细算，但遇到重要时刻或珍贵的人从不手软。既接地气又懂生活情趣。', traits: ['工作日吃平价便当，周末打卡精致咖啡','压力大时用美食进行微型疗愈','看到账单会反思但很快恢复心情','对待朋友真诚不小气'], tip: '给生活留些犒赏很有必要，不过每月设定“情绪消费”上限会更稳妥。' },
          { name: '钱包过客族', emoji: '💸', summary: '买买买是人生乐趣！工资只是短暂停留。', desc: '面对可爱、美味、限定的好物毫无抵抗力。懂得把生活过得丰富多彩。', traits: ['信奉“早买早享受”','好几个不用的自动扣费会员在静静扣款','拆快递时多巴胺爆棚','到月底总好奇“钱都去哪儿了”'], tip: '快乐很重要！试着在发薪日把15%的金额强制自动划入锁死账户吧。' },
          { name: '及时行乐大亨', emoji: '👑', summary: '拿明天的钱包，押注今天的快乐！', desc: '人生苦短，及时行乐！坚信投资当下的幸福才是真理。待人极其大方，派对上的灵魂人物。', traits: ['“今天我请！”脱口而出','一看到新品限量就自动开启付款码','把生活体验拉满的赢家','看账单前需要深吸一口气'], tip: '洒脱豪迈的人生态度！不过留一个小金库当作秘密防波堤会更踏实。' }
        ]
      }
    }
  },

  es: {
    ui: {
      'btn.view.grid': 'Cuadrícula 3×3',
      'btn.view.list': 'Ver tarjetas',
      'kicker.spelling': 'Resultado del Test de Ortografía Coreana',
      'kicker.slang': 'Resultado del Test de Jerga Coreana MZ',
      'kicker.money': 'Resultado de Hábitos de Gasto y Dinero',
      'badge.money': 'Índice de gasto: {v}%',
      'card.spelling.title': 'Test de Ortografía Coreana',
      'card.spelling.desc': 'Pon a prueba tu ortografía con las 10 palabras más confusas del coreano.',
      'card.spelling.meta': '10 preguntas · Evaluación de nivel',
      'card.slang.title': 'Test de Jerga y Tendencias MZ',
      'card.slang.desc': 'Descubre tu nivel de cultura pop y memes coreanos con 10 palabras virales.',
      'card.slang.meta': '10 preguntas · 5 niveles',
      'card.money.title': 'Test de Estilo de Gasto',
      'card.money.desc': 'De compras por impulso a hábitos de ahorro: descubre tu personalidad financiera.',
      'card.money.meta': '10 preguntas · 5 niveles'
    },
    tests: {
      spelling: {
        title: 'Test de Ortografía Coreana',
        subtitle: '10 preguntas · Evaluación de nivel',
        shareText: 'Mi resultado en el test de ortografía coreana:',
        questions: [
          { q: '¿Cuál es la ortografía correcta para "durante varios días"?', a: ['며칠 동안', '몇일 동안'] },
          { q: 'Expresión correcta para "quedarse sin palabras / absurdo":', a: ['어이없다', '어의없다'] },
          { q: 'Cómo escribir correctamente "¡Nos vemos mañana!":', a: ['내일 봬요!', '내일 뵈요!'] },
          { q: 'Expresión correcta para "ahora no se puede":', a: ['지금은 안 돼요', '지금은 안 되요'] },
          { q: 'Palabra que significa "extraordinario, curioso, fascinante":', a: ['희한하다', '희안하다'] },
          { q: 'Expresión para "en un abrir y cerrar de ojos, enseguida":', a: ['금세 다 먹었네', '금새 다 먹었네'] },
          { q: 'Palabra que significa "de alguna manera / por alguna razón":', a: ['왠지 좋은 일이 생길 것 같아', '웬지 좋은 일이 생길 것 같아'] },
          { q: 'Para "la verdad salió a la luz del mundo":', a: ['진실이 세상에 드러났다', '진실이 세상에 들어났다'] },
          { q: 'Presentar un documento al jefe para su aprobación oficial:', a: ['서류 결재를 올렸다 (Aprobación)', '서류 결제를 올렸다 (Pago)'] },
          { q: 'Elige la forma correcta para "el más adecuado":', a: ['알맞은', '알맞는'] }
        ],
        levels: [
          { name: 'Miembro de Honor del Instituto de la Lengua', emoji: '👑', summary: '¡10/10 perfecto! Guardián absoluto de la norma lingüística.', desc: 'No caíste en ninguna trampa. Tienes vista de lince para detectar faltas de ortografía.', traits: ['Cero confusión en pares difíciles','Detectar una errata te activa una alarma interna','Aprecia la elegancia en la escritura','Diccionario andante para tus amigos'], tip: '¡Impecable nivel! Solo recuerda relajarte un poco en conversaciones informales.' },
          { name: 'Corrector Humano de Textos', emoji: '🔍', summary: '¡Top 10%! Gran dominio y precisión gramatical.', desc: 'Superaste con éxito preguntas que confunden incluso a nativos. Tus textos inspiran total confianza.', traits: ['Cero dudas al redactar correos formales','Responde al instante preguntas complejas','Nota discretamente las erratas ajenas','Gana respeto por su precisión'], tip: 'El fallo puntual fue pura prisa. Tu nivel está en la élite.' },
          { name: 'Comunicador Cotidiano Fluido', emoji: '💬', summary: 'Nivel medio sólido. Comunicación perfecta en el día a día.', desc: 'Sigues las reglas con naturalidad y solo dudas ante trampas muy rebuscadas.', traits: ['Comunicación clara y sin malentendidos','Busca de vez en cuando para verificar','Prefiere fluidez a correcciones pedantes','Comprende rápidamente el contexto'], tip: 'Repasar un par de palabras clave te catapultará al nivel superior.' },
          { name: 'Chateador Intuitivo Rápido', emoji: '⚡', summary: '¡Mientras se entienda el mensaje, todo vale!', desc: 'Escribes por instinto y sonido. La velocidad y la expresividad van primero que las normas.', traits: ['Los dedos van más rápido que el autocorrector','Muchas líneas rojas en el chat','Separa palabras cuando toma aire','Amante de la mensajería dinámica'], tip: 'Echa una mirada rápida antes de enviar documentos oficiales o solicitudes de empleo.' },
          { name: 'El Rey Sejong Sorprendido', emoji: '🛸', summary: '¡El mismísimo Rey Sejong querría venir a repasar el alfabeto!', desc: '¡Un espíritu libre de la ortografía! Tus amigos necesitan descifrar tus textos, pero la diversión nunca falta.', traits: ['Decide la ortografía a cara o cruz','Espera que los demás le lean la mente','Crea fórmulas de escritura únicas','Estilo completamente desinhibido'], tip: '¡Sin vergüenza alguna! Recordar las 10 preguntas de hoy duplicará tu nivel.' }
        ]
      },
      slang: {
        title: 'Test de Jerga y Tendencias MZ',
        subtitle: '10 preguntas · 5 niveles',
        shareText: 'Mi nivel de jerga y memes coreanos MZ:',
        questions: [
          { q: '¿Qué significa "중꺾마 (Jung-Kkeok-Ma)"?', a: ['Lo importante es un corazón que no se rinde', 'Un corazón que se rompió a medias', 'Experto en breakdance', 'Reconstruir una mente rota'] },
          { q: '¿Qué significa "분좋카"?', a: ['Cafetería con buen ambiente (Bun-wi-gi joeun cafe)', 'Tarjeta de descuento en snacks', 'Tarjeta de manejo de ira', 'Buena cafetería en Bundang'] },
          { q: '¿Qué es una persona "핑프"?', a: ['Alguien que pregunta todo sin molestarse en buscar', 'Alguien obsesionado con el color rosa', 'Experto en tenis de mesa', 'Alguien enamorado'] },
          { q: '¿Qué significa "캘박"?', a: ['Agendar y fijar una cita en el calendario', 'Un amigo apellidado Park en California', 'Caligrafía colgada en la pared', 'Clavar el calendario en la pared'] },
          { q: '¿Qué es vivir una "갓생 (God-Saeng)"?', a: ['Llevar una vida productiva y ejemplar', 'Llevar una vida religiosa devota', 'Vivir como un sabio antiguo', 'Vivir inocentemente como un bebé'] },
          { q: '¿Cómo se llama la estética o vibra que uno aspira a tener?', a: ['추구미 (Chu-Gu-Mi)', '추석미', '가을미', '축구미'] },
          { q: '¿Qué palabra se usa cuando alguien es atacado o criticado injustamente?', a: ['억까 (Crítica injusta forzada)', '억텐 (Ánimo forzado)', '억바', '억플'] },
          { q: '¿Qué significa "알잘딱깔센"?', a: ['Hacer las cosas con iniciativa, pulcritud y buen gusto', 'Alguien frío y exigente', 'Despertarse con disciplina', 'Persona ahorradora y formal'] },
          { q: '¿Cómo se llama cariñosamente a la etapa de coqueteo antes de ser pareja (4)?', a: ['삼귀다 (Etapa 3 previa al 4)', '이귀다', '일귀다', '썸귀다'] },
          { q: '¿Qué expresión de moda se usa para decir "¡Pienso exactamente igual!"?', a: ['디토 (Ditto)', '리또', '카토', '미토'] }
        ],
        levels: [
          { name: 'El Algoritmo en Persona', emoji: '🦄', summary: '¡10/10! Creador nato de tendencias y memes.', desc: 'Vives y respiras la cultura viral. Adoptas los nuevos modismos antes de que se vuelvan virales.', traits: ['Adopta nuevas jergas al instante','Conoce el origen de todos los memes','Referente de tendencias en su grupo','Humor ágil e ingenioso'], tip: 'Sentido del humor brillante. Solo ten paciencia con tus amigos más desconectados.' },
          { name: 'Marcador de Tendencias', emoji: '✨', summary: '¡Top 10%! Muy atento a la cultura pop y redes.', desc: 'Estás al día con las redes sociales y sabes incorporar expresiones de moda en el momento justo.', traits: ['Domina el algoritmo de videos cortos','Rápido para asimilar novedades','El alma animada de los grupos','Elogiado por su espíritu juvenil'], tip: 'Excelente radar cultural. Es un placer conversar contigo.' },
          { name: 'Navegante Cotidiano', emoji: '☕', summary: 'Promedio equilibrado. Entiende todo lo que escucha.', desc: 'Quizá no uses todas las palabras en voz alta, pero captas las referencias al instante.', traits: ['Conoce los memes más populares','Le da algo de pudor usarlos al hablar','Sigue las tendencias en silencio','Capta el contexto sin esfuerzo'], tip: 'Un equilibrio estupendo. Tu intuición te permite seguir cualquier charla.' },
          { name: 'Rezagado de Memes', emoji: '🐢', summary: 'Se entera del significado cuando el meme ya pasó de moda.', desc: 'A menudo preguntas "¿qué significa eso?" tras las risas. Valoras el humor clásico más que las modas pasajeras.', traits: ['Busca en Google las siglas desconocidas','Empieza a usar jergas cuando ya expiran','Prefiere frases completas','Disfruta chistes y humor nostálgico'], tip: 'No hay prisa alguna. La calidez humana vale mucho más que las jergas del momento.' },
          { name: 'Clásico Analógico Puro', emoji: '🗿', summary: 'Santuario libre de modismos de internet.', desc: 'No te dejas arrastrar por abreviaturas extrañas. Hablas con vocabulario pulcro, firme y tradicional.', traits: ['La jerga de internet le suena a otro idioma','Prefiere oraciones completas y correctas','Rechaza las abreviaturas innecesarias','Transmite elegancia clásica'], tip: 'No necesitas jerga moderna para brillar. Tu forma de expresarte es una cualidad única.' }
        ]
      },
      money: {
        title: 'Test de Estilo de Gasto',
        subtitle: '10 preguntas · 5 niveles',
        shareText: 'Mi resultado en el test de hábitos de dinero:',
        questions: [
          { q: 'Al ver online una prenda o artículo que te encanta:', a: ['Pienso varios días si realmente lo necesito', 'Busco el mejor precio y cupones antes de decidir', '¡Comprarlo ya ahorra tiempo! Pago de inmediato'] },
          { q: 'Al pedir comida a domicilio con tarifa de envío cara:', a: ['Me parece un desperdicio, voy a buscarla o cocino', 'Comparo otros sitios o busco envío gratis', 'El antojo manda, pido sin importar el envío'] },
          { q: 'El día que ingresan tu sueldo o dinero:', a: ['Transfiero de inmediato a ahorros y gastos fijos', 'Reviso el presupuesto del mes y tarjetas', '¡Recompensa por mi esfuerzo! Comida rica o compras'] },
          { q: 'Al ver ofertas de 2x1 o grandes liquidaciones:', a: ['Las ignoro si no estaban en mi lista previa', 'Compruebo si es producto básico y su caducidad', '¡No comprarlo es perder dinero! Directo a la cesta'] },
          { q: 'A la hora de pagar una cena con amigos:', a: ['Dividir la cuenta al céntimo exacto', 'Pagar con tarjeta con devolución y cobrar al resto', 'Si estoy de buen humor: "¡Hoy invito yo!"'] },
          { q: 'Tu hábito diario con café o bebidas:', a: ['Termo propio o café gratis de casa/oficina', 'Cafeterías económicas o cupones de descuento', 'Cafés de autor o bebidas especiales de diseño'] },
          { q: 'Tras un día de trabajo con mucho estrés:', a: ['Ducha caliente, YouTube y dormir temprano', 'Un capricho dulce o comida reconfortante barata', '¡Terapia de compras! Adquiero algo de mi lista de deseos'] },
          { q: 'Gestión de suscripciones (streaming, telefonía):', a: ['Cancelo lo que no use y uso tarifas baratas', 'Comparto cuentas con familia/amigos para ahorrar', 'Pago varias suscripciones activas aunque casi ni las vea'] },
          { q: 'Al ver reclamos como "Edición limitada / Últimas unidades":', a: ['Sé que es estrategia de marketing y pierdo interés', 'Investigo su valor real de reventa', 'El corazón se me acelera: ¡hay que comprarlo ya!'] },
          { q: 'El papel más importante del dinero en tu vida:', a: ['Un escudo de seguridad para un futuro tranquilo', 'Una herramienta para sostener una vida equilibrada', 'Un medio para disfrutar de la felicidad del presente'] }
        ],
        grades: [
          { name: 'Rey del Ahorro Acorazado', emoji: '🛡️', summary: '¡Defensa impenetrable! Maestro del ahorro.', desc: 'Tu disciplina de gasto es legendaria. Las compras impulsivas no existen en tu vocabulario.', traits: ['Recoge pedidos en mano para ahorrar gastos','Inmune a rebajas fuera de su lista','Ahorro primero el día de cobro','Domina ofertas y tarifas de bajo coste'], tip: '¡Finanzas impecables! Pero no olvides darte un pequeño capricho de vez en cuando.' },
          { name: 'Consumidor Inteligente', emoji: '📊', summary: 'Estratega que exprime la relación calidad-precio.', desc: 'Gastas con sensatez y ahorras con determinación. Aprovechas al máximo cada recurso sin privarte de calidad.', traits: ['Experto en comparativas y ventajas de tarjetas','Firme ante lo innecesario, generoso con lo esencial','Analiza con calma las compras impulsivas','Comparte suscripciones de forma práctica'], tip: '¡El equilibrio perfecto! Sigue cultivando este hábito financiero tan saludable.' },
          { name: 'Equilibrista por Impulso', emoji: '⚖️', summary: 'Frugal a diario, generoso cuando se anima.', desc: 'En el día a día eres muy comedido, pero en ocasiones especiales abres la cartera con gusto.', traits: ['Comidas económicas entre semana, cafés gourmet el fin de semana','Pequeños caprichos tras días duros','Se recupera rápido de pequeños deslices','Generoso con sus seres queridos'], tip: 'Darse gustos es necesario, pero fijar un tope mensual de "fondo capricho" te dará más tranquilidad.' },
          { name: 'Expreso Cartera Vacía', emoji: '💸', summary: '¡Los pequeños caprichos dan sabor a la vida!', desc: 'Es difícil resistirse a lo delicioso, bonito o exclusivo. Sabes disfrutar la vida con intensidad.', traits: ['Filosofía de "mejor comprarlo ahora"','Suscripciones olvidadas cobrándose cada mes','Subidón de energía al abrir paquetes','Sorpresa al ver el extracto a fin de mes'], tip: 'Disfrutar está genial, pero aparta automáticamente un 15% nada más cobrar en una cuenta cerrada.' },
          { name: 'Magnate del Carpe Diem', emoji: '👑', summary: '¡Apostando la cuenta de mañana a la felicidad de hoy!', desc: '¡Solo se vive una vez! Crees en invertir en la alegría del presente. Eres generoso y el alma de la fiesta.', traits: ['"¡Invito yo!" le sale de forma natural','Abre la tarjeta ante cualquier edición limitada','Disfruta cada experiencia al máximo','Respira hondo antes de abrir la app del banco'], tip: 'Una actitud vital fascinante, pero guarda un fondo de emergencia secreto bajo llave para dormir tranquilo.' }
        ]
      }
    }
  },

  pt: {
    ui: {
      'btn.view.grid': 'Grade 3×3',
      'btn.view.list': 'Ver em cartões',
      'kicker.spelling': 'Resultado do Teste de Ortografia Coreana',
      'kicker.slang': 'Resultado do Teste de Gírias e Tendências MZ',
      'kicker.money': 'Resultado de Hábitos de Gastos e Dinheiro',
      'badge.money': 'Índice de consumo: {v}%',
      'card.spelling.title': 'Teste de Ortografia Coreana',
      'card.spelling.desc': 'Teste sua ortografia com as 10 palavras mais confusas da língua coreana.',
      'card.spelling.meta': '10 perguntas · Avaliação de nível',
      'card.slang.title': 'Teste de Gírias e Memes MZ',
      'card.slang.desc': 'Descubra seu nível de cultura pop e memes coreanos com 10 gírias virais.',
      'card.slang.meta': '10 perguntas · 5 níveis',
      'card.money.title': 'Teste de Estilo de Gastos',
      'card.money.desc': 'De compras por impulso ao salário: descubra seu perfil de relacionamento com o dinheiro.',
      'card.money.meta': '10 perguntas · 5 níveis'
    },
    tests: {
      spelling: {
        title: 'Teste de Ortografia Coreana',
        subtitle: '10 perguntas · Avaliação de nível',
        shareText: 'Meu resultado no teste de ortografia coreana:',
        questions: [
          { q: 'Qual é a ortografia correta para "durante vários dias"?', a: ['며칠 동안', '몇일 동안'] },
          { q: 'Expressão correta para "ficar sem palavras / absurdo":', a: ['어이없다', '어의없다'] },
          { q: 'Como escrever corretamente "Até amanhã!":', a: ['내일 봬요!', '내일 뵈요!'] },
          { q: 'Forma correta para "agora não é possível":', a: ['지금은 안 돼요', '지금은 안 되요'] },
          { q: 'Palavra que significa "muito curioso, singular, incomum":', a: ['희한하다', '희안하다'] },
          { q: 'Expressão para "num piscar de olhos, rapidamente":', a: ['금세 다 먹었네', '금새 다 먹었네'] },
          { q: 'Palavra que significa "por alguma razão / de certa forma":', a: ['왠지 좋은 일이 생길 것 같아', '웬지 좋은 일이 생길 것 같아'] },
          { q: 'Para "a verdade veio à tona no mundo":', a: ['진실이 세상에 드러났다', '진실이 세상에 들어났다'] },
          { q: 'Submeter documento ao superior para aprovação formal:', a: ['서류 결재를 올렸다 (Aprovação)', '서류 결제를 올렸다 (Pagamento)'] },
          { q: 'Escolha a forma gramaticalmente correta para "o mais adequado":', a: ['알맞은', '알맞는'] }
        ],
        levels: [
          { name: 'Membro de Honra do Instituto da Língua', emoji: '👑', summary: '10/10 perfeito! Guardião absoluto das normas gramaticais.', desc: 'Não caiu em nenhuma pegadinha. Você tem olhar clínico para identificar erros de ortografia.', traits: ['Zero confusão em pares difíceis','Ver erros de escrita soa alarmes internos','Valoriza a elegância e precisão do texto','Dicionário ambulante para os amigos'], tip: 'Nível impecável! Apenas lembre-se de relaxar nas mensagens casuais com amigos.' },
          { name: 'Corretor Humano de Textos', emoji: '🔍', summary: 'Top 10%! Alto domínio e segurança gramatical.', desc: 'Acertou com facilidade palavras que confundem a maioria das pessoas. Seus textos inspiram confiança.', traits: ['Sem receios ao redigir e-mails formais','Resolve com facilidade questões complexas','Percebe discretamente os erros alheios','Ganha respeito pela clareza'], tip: 'O eventual deslize foi pura pressa. Sua proficiência é excelente.' },
          { name: 'Comunicador Fluente do Dia a Dia', emoji: '💬', summary: 'Ótima média. Comunicação diária sem tropeços.', desc: 'Segue as normas com naturalidade, hesitando apenas diante de termos muito traiçoeiros.', traits: ['Comunicação fluida e sem ruídos','Pesquisa rapidamente quando tem dúvidas','Prefere espontaneidade a regras excessivas','Excelente compreensão do contexto'], tip: 'Rever algumas palavras traiçoeiras já coloca você no patamar mais alto.' },
          { name: 'Digitador Intuitivo e Veloz', emoji: '⚡', summary: 'O importante é a mensagem ser compreendida!', desc: 'Escreve pelo som e pelo fluxo. Velocidade e energia vêm antes de qualquer preciosismo.', traits: ['Dedos mais rápidos que o corretor','Muitas linhas vermelhas no chat','Espaça palavras conforme respira','Fã de conversas dinâmicas'], tip: 'Faça uma leitura rápida antes de enviar comunicados formais ou currículos.' },
          { name: 'O Rei Sejong Espantado', emoji: '🛸', summary: 'O Rei Sejong iria querer voltar para ensinar o alfabeto!', desc: 'Um espírito livre da escrita! Os amigos precisam decifrar suas mensagens, mas simpatia não falta.', traits: ['Decide a grafia no cara ou coroa','Espera que os outros adivinhem o sentido','Criação própria de termos','Estilo 100% desapegado de regras'], tip: 'Sem problema algum! Lembrar das 10 questões de hoje já dobra sua precisão.' }
        ]
      },
      slang: {
        title: 'Teste de Gírias e Memes MZ',
        subtitle: '10 perguntas · 5 níveis',
        shareText: 'Meu nível de gírias e memes coreanos MZ:',
        questions: [
          { q: 'O que significa "중꺾마 (Jung-Kkeok-Ma)"?', a: ['O importante é um coração inabalável', 'Um coração que quebrou no caminho', 'Mestre de dança de rua', 'Juntar os cacos de uma mente abalada'] },
          { q: 'O que significa "분좋카"?', a: ['Cafeteria com ambiente agradável (Bun-wi-gi joeun cafe)', 'Cartão de desconto de lanchonete', 'Cartão de controle de raiva', 'Cafeteria famosa em Bundang'] },
          { q: 'O que é alguém chamado de "핑프"?', a: ['Pessoa preguiçosa que pergunta tudo sem pesquisar', 'Alguém vidrado em roupas cor-de-rosa', 'Profissional de tênis de mesa', 'Alguém muito apaixonado'] },
          { q: 'O que significa "캘박"?', a: ['Marcar e travar um compromisso na agenda', 'Um amigo chamado Park na Califórnia', 'Caligrafia pendurada na parede', 'Pregar o calendário na parede'] },
          { q: 'O que é viver uma "갓생 (God-Saeng)"?', a: ['Levar uma vida produtiva e exemplar', 'Viver uma vida religiosa fervorosa', 'Viver de modo conservador como um sábio', 'Viver com inocência como um bebê'] },
          { q: 'Como se chama o estilo visual ou atmosfera que alguém busca ter?', a: ['추구미 (Chu-Gu-Mi)', '추석미', '가을미', '축구미'] },
          { q: 'Qual gíria é usada quando alguém é criticado ou atacado sem motivo justo?', a: ['억까 (Crítica injusta e forçada)', '억텐 (Animação forçada)', '억바', '억플'] },
          { q: 'Qual é o significado de "알잘딱깔센"?', a: ['Fazer as coisas com iniciativa, elegância e bom senso', 'Pessoa fria e difícil', 'Acordar sempre no horário certo', 'Pessoa comedida e estilosa'] },
          { q: 'Como se chama fofamente a fase do "flerte/conhecendo" antes do namoro (4)?', a: ['삼귀다 (Fase 3 antes do 4)', '이귀다', '일귀다', '썸귀다'] },
          { q: 'Qual expressão da moda é usada para dizer "Penso exatamente o mesmo!"?', a: ['디토 (Ditto)', '리또', '카토', '미토'] }
        ],
        levels: [
          { name: 'O Próprio Algoritmo', emoji: '🦄', summary: '10/10! Criador nato de tendências e memes.', desc: 'Conhece de ponta a ponta a cultura dos vídeos curtos e memes. Adota novas gírias antes de virarem febre.', traits: ['Usa novos termos com naturalidade','Conhece o contexto de cada meme','A fonte de novidades entre amigos','Raciocínio rápido e espirituoso'], tip: 'Sensibilidade incrível! Apenas tenha paciência com quem é menos conectado.' },
          { name: 'Lançador de Tendências', emoji: '✨', summary: 'Top 10%! Muito sintonizado com a cultura pop.', desc: 'Acompanha as novidades das redes e sabe encaixar memes na conversa com muito charme.', traits: ['Domina o algoritmo dos vídeos curtos','Absorve novidades rapidamente','O animador dos grupos de conversa','Elogiado pela vibração jovem'], tip: 'Excelente percepção cultural. Conversar com você é sempre animado.' },
          { name: 'Internauta do Dia a Dia', emoji: '☕', summary: 'Média bem dosada. Entende tudo o que ouve.', desc: 'Pode não usar todas as gírias no dia a dia, mas pega qualquer referência no ar.', traits: ['Reconhece os memes mais famosos','Um pouco tímido para falar gírias em voz alta','Acompanha as tendências pelas redes','Ótima percepção de contexto'], tip: 'Equilíbrio ideal. Sua intuição permite conversar bem com qualquer pessoa.' },
          { name: 'Atrasado nos Memes', emoji: '🐢', summary: 'Descobre o sentido quando a moda já passou.', desc: 'Geralmente pergunta "o que é isso?" depois que todo mundo riu. Valoriza humor com substância.', traits: ['Pesquisa siglas desconhecidas em segredo','Começa a usar gírias quando já estão esfriando','Prefere frases bem estruturadas','Aprecia piadas nostálgicas'], tip: 'Sem pressa nenhuma! Conexão humana sincera vale mais que qualquer modismo passageiro.' },
          { name: 'Clássico Analógico Autêntico', emoji: '🗿', summary: 'Área protegida e livre de gírias virtuais.', desc: 'Não se rende a modismos de internet e mantém um vocabulário polido, claro e tradicional.', traits: ['Gírias da internet parecem outro idioma','Prefere frases completas e formais','Evita abreviações desnecessárias','Transmite sobriedade e elegância'], tip: 'Você não precisa de gírias para se destacar. Sua postura clássica é um charme raro.' }
        ]
      },
      money: {
        title: 'Teste de Estilo de Gastos',
        subtitle: '10 perguntas · 5 níveis',
        shareText: 'Meu resultado no teste de estilo de gastos:',
        questions: [
          { q: 'Ao ver online um produto ou roupa que adorou:', a: ['Penso por dias se realmente preciso daquilo', 'Pesquiso o melhor preço e cupons antes de comprar', 'Comprar logo poupa tempo! Finalizo o pedido na hora'] },
          { q: 'Ao pedir comida pelo app e a taxa de entrega for alta:', a: ['Acho um desperdício, prefiro buscar ou cozinhar', 'Comparo com outros restaurantes ou atinjo frete grátis', 'A vontade fala mais alto, peço sem pensar na taxa'] },
          { q: 'No dia em que o pagamento ou mesada cai na conta:', a: ['Transfiro logo para investimentos e contas fixas', 'Confiro o orçamento do mês e faturas', 'Um agrado a mim mesmo! Comida gostosa ou compras'] },
          { q: 'Ao ver promoções do tipo "Leve 2 Pague 1":', a: ['Ignoro se o item não estava na minha lista prévia', 'Checo se é item de uso diário e a validade', 'Não levar é perder dinheiro! Coloco no carrinho'] },
          { q: 'Na hora de pagar a conta do jantar com amigos:', a: ['Dividir exatamente no centavo', 'Pagar com cartão de benefícios e receber Pix de volta', 'No bom humor: "Deixa comigo, hoje eu pago tudo!"'] },
          { q: 'Seu hábito com café ou bebidas no dia a dia:', a: ['Garrafa própria ou café gratuito do trabalho/casa', 'Cafeterias econômicas ou aplicativos de desconto', 'Cafés especiais ou bebidas artesanais sofisticadas'] },
          { q: 'Após um dia de trabalho exaustivo e estressante:', a: ['Banho quente, vídeos e dormir cedo', 'Um doce gostoso ou lanche reconfortante acessível', 'Terapia de compras! Compro itens caros da lista de desejos'] },
          { q: 'Como gerencia assinaturas de streaming e celular:', a: ['Cancelo o que não uso e uso planos econômicos', 'Divido contas com amigos e família para economizar', 'Tenho várias assinaturas ativas mesmo sem tempo de assistir'] },
          { q: 'Ao ver anúncios como "Edição Limitada / Últimas Peças":', a: ['Sei que é puro marketing e perco o interesse', 'Pesquiso com calma o valor de revenda', 'O coração acelera: preciso garantir antes que acabe!'] },
          { q: 'O papel mais importante do dinheiro na sua vida:', a: ['Um escudo protetor para um futuro tranquilo e seguro', 'Uma ferramenta para manter o equilíbrio do dia a dia', 'Um meio para viver momentos felizes e experiências únicas agora'] }
        ],
        grades: [
          { name: 'Guardião Blindado do Dinheiro', emoji: '🛡️', summary: 'Defesa impenetrável! Mestre da economia.', desc: 'Sua autodisciplina financeira é exemplar. Compras por impulso simplesmente não entram no seu vocabulário.', traits: ['Busca a refeição para economizar o frete','Imune a promoções fora da lista','Poupança em primeiro lugar no dia do salário','Mestre em cupons e planos acessíveis'], tip: 'Gestão nota dez! Mas lembre-se de se presentear com pequenos mimos de vez em quando.' },
          { name: 'Consumidor Estratégico', emoji: '📊', summary: 'Analista de custo-benefício que aproveita vantagens.', desc: 'Gasta com consciência e poupa com convicção. Pesquisa e aproveita benefícios para extrair o máximo de cada centavo.', traits: ['Mestre em comparação e cashback','Firme contra desperdícios, generoso com o essencial','Pensa com clareza mesmo após impulsos','Compartilha assinaturas com esperteza'], tip: 'O equilíbrio perfeito! Mantenha essa rotina financeira leve e recompensadora.' },
          { name: 'Equilibrista Espontâneo', emoji: '⚖️', summary: 'Contido no dia a dia, generoso quando a ocasião pede.', desc: 'Na rotina normal é prudente, mas em dias festivos ou com pessoas queridas abre o bolso com prazer.', traits: ['Almoços econômicos nos dias úteis, passeios no fim de semana','Pequenas recompensas gastronômicas em dias difíceis','Recupera-se rápido de pequenos excessos','Generoso na companhia dos amigos'], tip: 'Pequenos prazeres são ótimos, mas estipular um limite mensal para extravagâncias dá mais paz.' },
          { name: 'Passaporte Carteira Livre', emoji: '💸', summary: 'Pequenas compras são o tempero da vida!', desc: 'Difícil resistir a coisas fofas, gostosas ou novidades. Você sabe colorir a vida com momentos alegres.', traits: ['Mente focada no "comprar agora para aproveitar logo"','Assinaturas esquecidas debitando todo mês','Pico de alegria ao abrir encomendas','Surpresa com a fatura no fim do mês'], tip: 'Aproveitar é maravilhoso, mas programe uma transferência automática de 15% logo no dia do pagamento!' },
          { name: 'Magnata do Carpe Diem', emoji: '👑', summary: 'Apostando a conta de amanhã na felicidade de hoje!', desc: 'A vida é uma só! Você acredita em investir na alegria do momento presente. Generoso e a alma do encontro.', traits: ['O famoso "Hoje é por minha conta!"','Abre o cartão na hora ao ver edições limitadas','Vive a vida com intensidade máxima','Respira fundo antes de abrir o extrato'], tip: 'Um entusiasmo contagiante! Apenas mantenha uma reserva de emergência guardada para noites tranquilas.' }
        ]
      }
    }
  }
};

for (const [lang, data] of Object.entries(I18N_EXTENSIONS)) {
  const filePath = path.join(TRANS_DIR, `${lang}.js`);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let code = fs.readFileSync(filePath, 'utf8');

  // 1. UI 객체에 키 병합
  for (const [k, v] of Object.entries(data.ui)) {
    if (!code.includes(`'${k}'`)) {
      // 'ui: {' 바로 뒤에 추가
      const uiRegex = /(ui:\s*\{)/;
      code = code.replace(uiRegex, `$1\n    '${k}': ${JSON.stringify(v)},`);
    }
  }

  // 2. tests 객체에 테스트들 병합
  for (const [testId, testObj] of Object.entries(data.tests)) {
    if (!code.includes(`${testId}:`) && !code.includes(`'${testId}':`)) {
      // 'tests: {' 바로 뒤에 추가
      const testsRegex = /(tests:\s*\{)/;
      const testJson = JSON.stringify(testObj, null, 2).replace(/^/gm, '    ');
      code = code.replace(testsRegex, `$1\n    ${testId}: ${testJson.trim()},`);
    }
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log(`Updated translations for: ${lang}`);
}

console.log('All 5 translation files updated with spelling, slang, money, and view switcher!');
