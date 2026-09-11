export const policies = [
  ['coverage','Basic health coverage','Coverage','Makes routine and urgent care more affordable.',4,2],
  ['cost_cap','Out-of-pocket limits','Coverage','Limits bills that can destabilize a household.',3,2],
  ['prescriptions','Prescription assistance','Coverage','Reduces cost-related medication delays.',2,2],
  ['hospital','Hospital & specialty care','Facilities','Supports complex and emergency treatment.',5,3],
  ['clinics','Community clinics','Facilities','Places routine care closer to residents.',3,2],
  ['mobile','Rural & mobile clinics','Facilities','Extends services across geographic barriers.',3,2],
  ['pcp','Primary care capacity','Prevention','Improves continuity, screening, and early treatment.',3,2],
  ['prevention','Prevention & screening','Prevention','Supports vaccination and early detection.',2,1],
  ['maternal','Maternal & reproductive care','Clinical access','Supports timely prenatal and reproductive services.',3,2],
  ['dental','Dental & vision access','Clinical access','Addresses common needs often left uncovered.',2,1],
  ['food','Healthy food access','Daily conditions','Improves affordable access to nutritious food.',3,1],
  ['housing','Healthy housing','Daily conditions','Reduces hazards and housing instability.',4,2],
  ['parks','Parks & recreation','Daily conditions','Creates safe opportunities for activity.',2,1],
  ['environment','Air & water protections','Environment','Reduces preventable environmental exposure.',4,2],
  ['workplace','Workplace safety','Environment','Reduces injury and exposure at work.',2,1],
  ['transport','Transportation access','Practical access','Connects residents to care and food.',3,2],
  ['language','Language services','Practical access','Supports clear, respectful communication.',2,1],
  ['disability','Disability access','Practical access','Makes facilities and communication accessible.',2,1],
  ['leave','Paid medical leave','Economic security','Allows care without losing all wages.',3,2],
  ['childcare','Childcare support','Economic security','Reduces a common barrier to attending care.',2,1],
  ['debt_help','Medical-debt assistance','Economic security','Prevents bills from cascading into instability.',3,2]
].map(([id,name,category,benefit,cost,operating])=>({id,name,category,benefit,levels:[{name:'No investment',cost:0,operating:0},{name:'Limited',cost,operating},{name:'Strong',cost:cost+2,operating:operating+1}]}));

export const residents = [
  ['maya','Maya','16','A student with asthma who helps care for a younger sibling.','urban,asthma,caregiver,black'],
  ['theo','Theo','72','A retired mechanic managing diabetes and limited mobility.','rural,diabetes,disability,fixed_income'],
  ['lena','Lena','31','A restaurant worker expecting a baby and paid hourly.','pregnant,hourly,uninsured,latina'],
  ['samir','Samir','44','A warehouse worker who primarily speaks Arabic at home.','language,hourly,immigrant'],
  ['jo','Jo','19','A college student who uses a wheelchair.','disability,young_adult,lgbtq'],
  ['caleb','Caleb','9','A child living near a high-traffic industrial corridor.','child,pollution,asthma'],
  ['rosa','Rosa','58','A home health aide balancing hypertension and family care.','hypertension,caregiver,latina,hourly'],
  ['darnell','Darnell','39','A self-employed rural resident with recurring dental pain.','rural,uninsured,black,dental'],
  ['mei','Mei','67','A recent lawful immigrant managing arthritis on a fixed income.','immigrant,language,fixed_income,arthritis'],
  ['avery','Avery','27','A retail worker with a chronic digestive condition.','lgbtq,hourly,chronic'],
  ['nora','Nora','45','A parent working night shifts without paid leave.','caregiver,hourly,food_insecure'],
  ['eli','Eli','14','A student with low vision living far from specialty care.','child,disability,rural'],
  ['marcus','Marcus','52','A transit driver managing high blood pressure.','black,hypertension,shift_work'],
  ['sofia','Sofia','24','A farmworker navigating insurance eligibility and language barriers.','rural,language,eligibility,latina'],
  ['grace','Grace','81','An older adult living alone without reliable transportation.','older,fixed_income,transport'],
  ['jamal','Jamal','22','An apprentice exposed to dust at work and living with asthma.','black,asthma,workplace'],
  ['kim','Kim','36','A small-business owner supporting two children.','caregiver,uninsured,asian'],
  ['willow','Willow','11','A child whose family recently moved after a rent increase.','child,housing_insecure,indigenous'],
  ['ben','Ben','63','A veteran with diabetes living in a well-resourced suburb.','insured,diabetes,suburban'],
  ['imani','Imani','29','A software technician seeking respectful reproductive care.','black,woman,insured,urban']
].map(([id,name,age,story,tags])=>({id,name,age,story,tags:tags.split(',')}));

export const trials = [
 {id:'environment',title:'Round 1: Where health begins',prompt:'Housing conditions, food access, parks, and environmental exposure shape the starting conditions for health.',defaultChoice:'cope',options:[{id:'cope',label:'Use the options currently available',effects:{stability:-2}},{id:'seek',label:'Seek community support',effects:{financial:-2,stability:1}}],tagEffects:{pollution:{physical:-7,stability:-5,note:'Air pollution aggravated a respiratory condition.'},housing_insecure:{stability:-7,financial:-4,note:'Housing instability made consistent care harder.'},food_insecure:{physical:-4,financial:-3,note:'Food access constrained a healthy choice.'}},protections:[{policy:'environment',label:'Environmental protection',effects:{physical:3,stability:2}},{policy:'housing',label:'Healthy housing',effects:{stability:3,financial:1}},{policy:'food',label:'Healthy food access',effects:{physical:2,financial:1}},{policy:'parks',label:'Parks and recreation',effects:{physical:1,stability:1}}],chanceRisk:.12},
 {id:'preventive',title:'Round 2: Preventive care',prompt:'Residents try to obtain a checkup, screening, vaccination, or ongoing primary care.',defaultChoice:'schedule',options:[{id:'schedule',label:'Schedule the recommended visit',effects:{access:1,financial:-2}},{id:'delay',label:'Delay because of competing demands',effects:{physical:-3,stability:-3,financial:1}}],tagEffects:{rural:{access:-6,note:'Distance and provider shortages limited appointments.'},language:{access:-4,dignity:-4,note:'Language access affected communication.'},disability:{access:-4,dignity:-3,note:'Accessibility barriers narrowed available care.'}},protections:[{policy:'pcp',label:'Primary care capacity',effects:{access:4,physical:2}},{policy:'prevention',label:'Prevention investment',effects:{physical:3,access:2}},{policy:'mobile',label:'Mobile clinics',effects:{access:3}},{policy:'transport',label:'Transportation',effects:{access:2}},{policy:'language',label:'Language services',effects:{access:2,dignity:3}},{policy:'disability',label:'Disability access',effects:{access:2,dignity:3}}],chanceRisk:.08},
 {id:'acute',title:'Round 3: An urgent need',prompt:'An injury or sudden illness requires timely evaluation.',defaultChoice:'urgent',options:[{id:'urgent',label:'Seek care promptly',effects:{physical:1,access:1,financial:-5}},{id:'wait',label:'Wait and monitor symptoms',effects:{physical:-7,stability:-5}}],tagEffects:{uninsured:{financial:-8,access:-4,note:'Lack of coverage raised costs and delayed options.'},hourly:{financial:-4,note:'Missing an hourly shift meant lost income.'},rural:{access:-4,note:'Travel time delayed urgent evaluation.'}},protections:[{policy:'coverage',label:'Basic coverage',effects:{financial:4,access:2}},{policy:'cost_cap',label:'Out-of-pocket limits',effects:{financial:3}},{policy:'hospital',label:'Hospital capacity',effects:{physical:3,access:2}},{policy:'leave',label:'Paid medical leave',effects:{financial:3,stability:2}},{policy:'transport',label:'Transportation',effects:{access:2}}],chanceRisk:.18},
 {id:'chronic',title:'Round 4: Living with a condition',prompt:'Residents need medication, monitoring, dental care, or specialist follow-up.',defaultChoice:'follow',options:[{id:'follow',label:'Follow the care plan',effects:{physical:2,financial:-4}},{id:'stretch',label:'Stretch medicine or postpone follow-up',effects:{physical:-6,stability:-5,financial:1}}],tagEffects:{diabetes:{physical:-4,note:'Diabetes required reliable monitoring and medication.'},hypertension:{physical:-3,note:'Hypertension required consistent follow-up.'},dental:{physical:-5,dignity:-2,note:'Untreated dental pain affected daily life.'},fixed_income:{financial:-4,note:'A fixed income magnified recurring costs.'}},protections:[{policy:'prescriptions',label:'Prescription assistance',effects:{financial:4,physical:2}},{policy:'coverage',label:'Basic coverage',effects:{financial:3,access:2}},{policy:'dental',label:'Dental and vision access',effects:{physical:2,dignity:2}},{policy:'pcp',label:'Primary care',effects:{physical:2,stability:2}}],chanceRisk:.1},
 {id:'disruption',title:'Round 5: Work and coverage change',prompt:'A work schedule, income change, caregiving duty, or eligibility problem disrupts access.',defaultChoice:'prioritize',options:[{id:'prioritize',label:'Prioritize care despite the disruption',effects:{financial:-6,physical:1}},{id:'postpone',label:'Postpone care to protect immediate needs',effects:{physical:-5,stability:-5,financial:2}}],tagEffects:{caregiver:{access:-3,financial:-3,note:'Caregiving responsibilities limited time and money.'},hourly:{financial:-5,access:-2,note:'Unpredictable hours made care harder to arrange.'},eligibility:{access:-7,dignity:-3,note:'Eligibility rules interrupted access.'},immigrant:{dignity:-2,note:'Complex enrollment rules reduced trust.'}},protections:[{policy:'leave',label:'Paid leave',effects:{financial:4,access:2}},{policy:'childcare',label:'Childcare support',effects:{access:3,financial:2}},{policy:'coverage',label:'Basic coverage',effects:{access:3,financial:2}},{policy:'debt_help',label:'Debt assistance',effects:{financial:3,stability:2}},{policy:'language',label:'Language services',effects:{dignity:2,access:2}}],chanceRisk:.1},
 {id:'community',title:'Round 6: Community-wide strain',prompt:'A heat and air-quality emergency increases demand while transportation and clinics are strained.',defaultChoice:'respond',options:[{id:'respond',label:'Follow public guidance and seek help when needed',effects:{stability:-2}},{id:'work',label:'Continue normal obligations despite the warning',effects:{physical:-4,financial:1}}],tagEffects:{asthma:{physical:-8,stability:-5,note:'Poor air quality placed residents with asthma at greater risk.'},older:{physical:-6,note:'Extreme heat created additional physical risk.'},workplace:{physical:-5,note:'Workplace exposure continued during the emergency.'},transport:{access:-4,note:'Limited transportation narrowed safe options.'}},protections:[{policy:'environment',label:'Environmental protection',effects:{physical:4,stability:2}},{policy:'clinics',label:'Community clinics',effects:{access:3,physical:2}},{policy:'mobile',label:'Mobile clinics',effects:{access:2}},{policy:'workplace',label:'Workplace safety',effects:{physical:3,dignity:1}},{policy:'transport',label:'Transportation',effects:{access:2}}],chanceRisk:.16}
];

export const sources = [
 {org:'CDC',title:'Social Determinants of Health',year:'2026',scope:'United States',url:'https://www.cdc.gov/infrastructure-public-health/php/about/social-determinants-of-health.html',reviewed:'2026-09-11'},
 {org:'ODPHP',title:'Social Determinants of Health — Healthy People 2030',year:'2025',scope:'United States',url:'https://odphp.health.gov/healthypeople/priority-areas/social-determinants-health',reviewed:'2026-09-11'},
 {org:'WHO',title:'World report on social determinants of health equity',year:'2025',scope:'Global',url:'https://www.who.int/teams/social-determinants-of-health/equity-and-health/world-report-on-social-determinants-of-health-equity',reviewed:'2026-09-11'}
];
