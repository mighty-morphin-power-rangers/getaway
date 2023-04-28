
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const therapistFakeData =[
  {
    name:"Richard O'Neil",
    skills:"Stress, Anxiety, Addictions, Parenting Issues, Self Esteem, Depression",
    licenseType:'LCSW',
    photoURL:'https://i.imgur.com/SlvJ7wO.png',
    aboutMe:'I am licensed in Rhode Island with 3 years of professional work experience. I have experience in helping clients with stress and anxiety, coping with addictions, parenting issues, & motivation, self esteem, and confidence. I believe in treating everyone with respect, sensitivity, and compassion. I will tailor our dialog and treatment plan to meet your unique and specific needs. Taking the first step to seeking a more fulfilling and happier life takes courage. I am here to support you in that process.',
    profExp:"Additional areas of focus: Family conflicts, Trauma and abuse, Grief, Eating disorders, Anger management, Career difficulties, Bipolar disorder, Coping with life changes, Compassion fatigue, ADHD, Aging and Geriatric Issues, Antisocial Personality, Autism and Asperger Syndrome, Avoidant Personality, Body Image, Cancer, Caregiver Issues and Stress, Chronic Pain Illness and Disability, Co-morbidity, Control Issues, Dependent Personality, Disruptive Mood Dysregulation Disorder (DMDD), Divorce and Separation, Domestic Violence, Drug and Alcohol Addiction, Eating and Food-Related Issues, Emptiness, Forgiveness, Guilt and Shame, Hearing Impaired, HIV / AIDS, Hoarding, Hospice and End of Life Counseling, Impulsivity, Intellectual Disability, Isolation/Loneliness, Midlife Crisis, Military and Veterans Issues, Mood Disorders, Obsessions, Compulsions, and OCD, Panic Disorder and Panic Attacks, Paranoia, Personality Disorders, Phobias, Polyamory / Nonmonogamous Relationships, Post-traumatic Stress, Pregnancy and Childbirth, Process addiction (porn, exercise, gambling), Seasonal Affective Disorder (SAD), Self-Love, Sexual Assault and Abuse, Social Anxiety and Phobia, Visually Impaired, Women's Issues, Workplace Issues",
    yearsExp: 3,
    licInfo:'RI LCSW csw03009',
    reviews:[{
      date:'Oct 28, 2022',
      text:'Honest and Understanding. Very willing to help.',
      rating: 5,
    },{
      date:'Oct 26, 2022',
      text:'I think it was helpful that she is close to my age. Very professional and helpful',
      rating: 5,
    },
  ]
  },
  {name:'Jennifer Miller',
  skills:"Stress, Anxiety, Addictions, Self Esteem, Depression",
  licenseType:'LCSW',
  photoURL:'https://i.imgur.com/2Suea2t.png',
  aboutMe:'I am Licensed Clinical Social Worker in Illinois. I have experience in helping clients with stress and anxiety, coping with addictions, motivation, self esteem, and confidence. I work with my clients to create an open and safe environment where thoughts and feelings can be shared without fear of judgment. It takes courage to seek out a more fulfilling and happier life and to take the first steps towards a change. I am here to support & empower you in that journey.',
  profExp:"Additional areas of focus: Relationship issues, Trauma and abuse, Career difficulties, Coping with life changes, Drug and Alcohol Addiction, Isolation/Loneliness, Life Purpose, Women's Issues",
  yearsExp: 5,
  licInfo:'IL LCSW 149020646',
  reviews:[{
    date:'Sep 21, 2022 ',
    text:'I am so grateful to Jennifer Miller for her time and understanding. She really takes the time to listen and offers a perspective that I would never have considered before. She has excellent therapeutic techniques that work and walks you through them, answering your questions in stride. I cannot recommend her enough!',
    rating: 5,
  },{
    date:'Nov 16, 2022',
    text:'Very helpful and will continue',
    rating: 4,
  },
]},
  {name:'Jessie Knight',
  skills:"Stress, Anxiety, Trauma and Abuse, Depression",
  licenseType:'LICSW',
  photoURL:'https://i.imgur.com/u1n5xRB.png',
  aboutMe:'I am licensed in Minnesota with over 12 years of professional work experience in the mental health field. I have experience in helping clients with depression, anxiety, trauma and abuse, difficult life changes, grief and loss. I work with my clients to create an open and safe environment where thoughts and feelings can be shared without fear of judgment. I have experience in using therapy modalities including Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), and Eye Movement Desensitization & Reprocessing Therapy (EMDR) techniques and resources. Taking the first step to seeking a more fulfilling and happier life takes courage. I am here to support you in that process. In my free time I enjoy hiking, vegetable gardening, concerts, and cheering on the Vikings, Twins, and Wild.',
  profExp:"Additional areas of focus: Addictions, Relationship issues, Grief, Self esteem, Coping with life changes, Compassion fatigue Clinical approaches: Acceptance and Commitment Therapy (ACT), Client-Centered Therapy, Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), Motivational Interviewing, Narrative Therapy, Solution-Focused Therapy",
  yearsExp: 4,
  licInfo:'MN LICSW 20767',
  reviews:[{
    date:'Oct 02, 2022',
    text:"You've been great, I've enjoyed breaking down my wall as well.",
    rating: 5,
  },{
    date:'Nov 10, 2022',
    text:'They are really nice, never had a bad feeling talking to them.',
    rating: 5,
  },
]},
  {name:'Anthony Smith',
  skills:"Relationship Issues, Trauma and Abuse, Eating Disorders, Parenting Issues, Depression",
  licenseType:'BACP',
  photoURL:'https://i.imgur.com/v7ddMJA.png',
  aboutMe:'I am licensed in the UK with 21 years of professional work experience. I have experience in helping clients with relationship issues, trauma and abuse, eating disorders, & parenting issues. I believe in treating everyone with respect, sensitivity, and compassion. I will tailor our dialog and treatment plan to meet your unique and specific needs. It takes courage to seek out a more fulfilling and happier life and to take the first steps towards a change. I am here to support & empower you in that journey.',
  profExp:'Additional areas of focus: LGBT, Anger management, Self esteem, Career difficulties, Coping with life changes, Adoption and Foster Care, Aging and Geriatric Issues, Antisocial Personality, First Responder Issues, Gender Dysphoria, Hoarding, Hospice and End of Life Counseling, Infidelity, Intellectual Disability, Jealousy, Obsessions, Compulsions, and OCD, Paranoia, Personality Disorders, Phobias, Postpartum Depression, Prejudice and Discrimination, Seasonal Affective Disorder (SAD), Self-Harm, Sex Addiction, Sexual Assault and Abuse, Sexual Dysfunction, Visually Impaired, Young Adult Issues',
  yearsExp: 10,
  licInfo:'BACP 392924',
  reviews:[{
    date:'Apr 18, 2023',
    text:'Anthony is a kind and compassionate listener tuning into my needs and preferences and providing resources and action items which help me heal.',
    rating: 5,
  },{
    date:' Apr 18, 2023',
    text:'Anthony is truly professional and great listener. Speaking to him has helped me a great deal and I would recommend him and better.help to others',
    rating: 5,
  },
]},
  {name:'Lloyd Aurthor Wright',
  skills:"Stress, Anxiety, Family Conflicts, Paretning Issues, Self Esteem, Coping With Life Changes",
  licenseType:'BACP',
  photoURL:'https://i.imgur.com/MrlxWFF.png',
  aboutMe:"I am an integrative therapist licensed in the uk and Ireland with 3 years experience working as a counsellor and children's therapist. I have worked with clients with a wide range of concerns including depression, anxiety, maternal mental health, self confidence, relationship issues, parenting problems, career challenges, eating disorders, new mums and women’s issues . I also helped many people who have experienced physical trauma or emotional abuse.My therapy style is warm and interactive. I believe in treating anyone with respect, sensitivity and compassion and I don't believe in making judgments on anyone . My approach combines cognitive-behavioral, humanistic, psychodynamic and solution focused therapy. I will tailor our dialog and treatment plan to meet your unique and specific needs.It takes courage to seek a more fulfilling and happier life and to take the first steps towards change. If you are ready to take that step, I am here to support and empower you.I look forward to working with you!",
  profExp:"Additional areas of focus: Addictions, Relationship issues, Trauma and abuse, Grief, Intimacy-related issues, Anger management, Depression, Body Image, Commitment Issues, Divorce and Separation, Domestic Violence, Eating and Food-Related Issues, Emptiness, Family Problems, Fatherhood Issues, Guilt and Shame, Isolation/Loneliness, Money and Financial Issues, Mood Disorders, Panic Disorder and Panic Attacks, Phobias, Postpartum Depression, Pregnancy and Childbirth, Prejudice and Discrimination, Seasonal Affective Disorder (SAD), Self-Harm, Self-Love, Sexuality, Social Anxiety and Phobia, Women's Issues, Young Adult Issues",
  yearsExp: 5,
  licInfo:'BACP 387523',
  reviews:[{
    date:'Nov 23, 2022',
    text:'Lloyd is kind, patient and a professional, I would reccomend her to anyone, thank you',
    rating: 5,
  },{
    date:'Mar 15, 2022',
    text:'Helped me out of a dark place, always look forward to a constructive session with Mr. Wright!',
    rating: 5,
  },
]},
  {name:'Kara Davis',
  skills:"Stress, Anxiety, Addictions, Grief, Self Esteem, Depression",
  licenseType:'LCSW',
  photoURL:'https://i.imgur.com/RIAN2qS.png',
  aboutMe:"Marsha received her Master's Degree in Social Work from Stony Brook University, School of Social Welfare and has been working in the field since 2004. Marsha is currently licensed by the state of Florida as a Licensed Clinical Social Worker and has practiced in a variety of inpatient and outpatient settings. She has a broad range of clinical experience working with individuals and groups across the lifespan. Marsha specializes in providing counseling to individuals with dual diagnoses of mental health and addictions. She uses a variety of treatment modalities which incorporate best practice from an eclectic and strengths-based approach that is deeply rooted in humanistic psychology and is guided by the needs of the client.",
  profExp:"Additional areas of focus: Relationship issues, Family conflicts, Trauma and abuse, Intimacy-related issues, Sleeping disorders, Parenting issues, Anger management, Bipolar disorder, Coping with life changes, Compassion fatigue, ADHD, Abandonment, Adoption and Foster Care, Aging and Geriatric Issues, Antisocial Personality, Attachment Issues, Avoidant Personality, Body Image, Caregiver Issues and Stress, Co-morbidity, Codependency, Communication Problems, Control Issues, Dependent Personality, Disruptive Mood Dysregulation Disorder (DMDD), Dissociation, Drug and Alcohol Addiction, Emptiness, Family Problems, Forgiveness, Guilt and Shame, Impulsivity, Isolation/Loneliness, Life Purpose, Mood Disorders, Panic Disorder and Panic Attacks, Paranoia, Post-traumatic Stress, Self-Harm, Self-Love, Women's Issues, Young Adult Issues",
  yearsExp: 6,
  licInfo:'FL LCSW SW14568',
  reviews:[{
    date:'Feb 14, 2023',
    text:"Kara has been incredible, not only have we created a wonderful bond (I feel so at ease talking to her about my concerns) but she has allowed me to grow and flourish in a way that I never thought possible! I've thoroughly enjoyed my time with her, so much so that I'm not looking forward to the day it has to come to an end!",
    rating: 5,
  },{
    date:'Jul 29, 2021',
    text:"I didn't know what to expect when I first signed up for BetterHelp. I had never done any form of therapy/counseling and got matched to Marsha after completing the registration. She has been patient and attentive to my needs and concerns. I'm so grateful to have been matched with her and not have the need to start over with someone else. Thank you, Marsha!",
    rating: 5,
  },
]},
  {
  name:'Diane Leavens',
  skills:"Stress, Anxiety, LGBT, Self Esteem, Depression, Coping With Life Changes",
  licenseType:'LPC',
  photoURL:'https://i.imgur.com/mrlLKg6.png',
  aboutMe:"Psychotherapy offers an opportunity to build strength and endurance to face the inevitable challenges and influences in order to move forward with autonomy, confidence, and personal liberation.I will nurture an environment and container of trust and support as you build the relationship and deepen your understanding and sense of self. I believe all people have the innate capacity for understanding the direction their own lives should take; I will join you as you explore and examine the potential blocks standing in the way of living a fuller and more meaningful, authentic life.I have a passion for working with people who may be struggling with their identity, who do not fit the beliefs and expectations held by their family of origin, mainstream culture, and/or the many systems within our society that are inherently designed to oppress and marginalize people who do not conform to these historical and societal restrictions. Many times, the experience of being seen and understood fully by another human being is the core of healing. I offer psychotherapy that fosters curiosity and wonder for each person’s individuality. Other times, it is helpful to sensitively work through past trauma and attachment patterns. Because my counseling approach is existential and humanistic, therapeutic care is tailored to the specific needs of each person. I am well-versed in a variety of psychological tools from diverse therapies, and I use what is best for each client to meet their goals for therapy.",
  profExp:"Additional areas of focus: Relationship issues, Family conflicts, Trauma and abuse, Grief, Intimacy-related issues, Parenting issues, Anger management, Career difficulties, Compassion fatigue, ADHD, Body Image, Communication Problems, Eating and Food-Related Issues, Emptiness, Expats, Family of Origin Issues, Family Problems, Forgiveness, Guilt and Shame, Isolation/Loneliness, Life Purpose, Multicultural Concerns, Prejudice and Discrimination, Self-Love, Sexuality, Women's Issues, Young Adult Issues",
  yearsExp: 5,
  licInfo:'LA LPC 7531',
  reviews:[{
    date:'Jul 27, 2021',
    text:'Diane has been wonderful. She listens and is very encouraging. I always feel a bit better after a session with her, even if we talk about difficult stuff.',
    rating: 5,
  },{
    date:'Jul 16, 2021',
    text:'Diane is wonderful! I highly recommend her! I connected with her approach and am so glad to have met her!',
    rating: 5,
  },
]}
]





async function seedTherapists() {
  for (const therapist of therapistFakeData) {
    const { reviews, ...therapistData } = therapist;
    const createdTherapist = await prisma.staffTherapist.create({
      data: {
        ...therapistData,
        TherapistReviews: {
          create: reviews.map((review) => ({
            ...review
          }))
        }
      }
    });
    console.log(`Created therapist ${createdTherapist.name} with ID ${createdTherapist.id}`);
  }
}

seedTherapists().catch((e) => console.error(e));

module.exports = seedTherapists;