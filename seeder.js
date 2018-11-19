db.articles.insertMany([{
    "title": "Crazed Man Bowls into Pedestrians",
    "author": "dov",
    "body": `James Gargasoulas, 28, deliberately drove a stolen car into pedestrians along Bourke St in the city centre in January last year. He pleaded not guilty to the attack, but later admitted that he had carried it out.\n
    A jury convicted Gargasoulas after deliberating for less than an hour. The attack claimed the lives of Bhavita Patel, 33, Matthew Si, 33, Yosuke Kanno, 25, Jess Mudie, 22, Thalia Hakin, 10, and three-month-old Zachary Bryant.\n
    Relatives of the victims wiped away tears as the word "guilty" was read out 33 times in the Supreme Court of Victoria on Tuesday, local media reported.`,
    "date":"Dec 10, 2018",
    "tags":["fiction" ,"action"]
  },
  
  {
    "title": "The World is Flat",
    "author": "jave",
    "body": "In the north, the Camp Fire, which has destroyed almost 7,200 homes, surpassed the 1933 Griffith Park disaster to become the deadliest in California's history after 13 more bodies were found,\n bringing the total killed to 42. The earlier tragedy left 31 dead.\n Many more people are said to be unaccounted for, with coroner-led search teams preparing to comb the largely incinerated town of Paradise on Tuesday.\nnThree portable morgue, as well as specialist dog units, forensic anthropologists and a \"disaster mortuary\" have been requested to help with the operation",
    "date":'Mar 19 2017',
    "tags":["news"]
  },
  {
    "title": "The World is Flat",
    "author": "jave",
    "body": "In the north, the Camp Fire, which has destroyed almost 7,200 homes, surpassed the 1933 Griffith Park disaster to become the deadliest in California's history after 13 more bodies were found,\n bringing the total killed to 42. The earlier tragedy left 31 dead.\n Many more people are said to be unaccounted for, with coroner-led search teams preparing to comb the largely incinerated town of Paradise on Tuesday.\nnThree portable morgue, as well as specialist dog units, forensic anthropologists and a \"disaster mortuary\" have been requested to help with the operation",
    "date":'Mar 19 2017',
    "tags":["news"]
  },
  {
    "title": "What Your “Liking Gap” Can Teach You About First Impressions",
    "author": "tasha",
    "body":"A recent study illustrates just how common these reactions really are. Over a series of five experiments pairing up strangers in conversation, a team of psychologists uncovered a phenomenon they dubbed “the liking gap”: Even before meeting the person they were paired with, participants predicted that their partner would find them less interesting than they would find their partner. Following the conversation, participants believed their partner liked them even less than they had initially predicted, even though their partners generally felt far more positively toward them afterward. In other words, we tend to wrongly assume that new people won’t like us before we’ve even met them, and these mistaken beliefs only intensify afterward.",
    "date":'Mar 19 2017',
    "tags":["psychology non-fiction"]
  },
  {
    "title": "What Your “Liking Gap” Can Teach You About First Impressions",
    "author": "jenny",
    "body":"his time last year, after a tweet I wrote about missing my dead father caught fire, I was approached by a very nice editor at a very nice publishing company to put together a proposal for a book. The idea was to amass a collection of short essays on objects and grief and raise some money for The Samaritans in the process. Now, I’m not a writer, but at that time, our family had just been hit with the desperate news that my brother-in-law’s brain cancer was terminal. Christmas was an agony we all wanted an escape from. I decided this writerly exercise would be mine.",
    "date":'Mar 19 2017',
    "tags":["psychology biography "]
  }
])


db.users.insertMany([{
  email: 'user1@mail.com',
  name: 'theo',
  role: 'admin',
  password: '12345',
},
{
  email:'user2@mail.com',
  name: 'dan',
  role:'admin',
  password: '12345',
},
{
  email:'user3@mail.com',
  name: 'test',
  role:'user',
  password: '12345',
}])
//m-lab URI
mongo ds261253.mlab.com:61253/blog-theo -u 7h30x -p atumefaciens1620
