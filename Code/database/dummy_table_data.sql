TRUNCATE users_posts, users_comments, users_subgroups, users, comments, posts, subgroups;


-- Create dummy users
INSERT INTO users VALUES ('afe686fa-4221-4a97-81a4-6bf174f962f6', 'Kylo Forbes', 'vaWl5lnFi5');
INSERT INTO users VALUES ('07115216-b43f-4727-9feb-8e0021d3429b', 'Frank Norris', 'T1K5GnMG3u');
INSERT INTO users VALUES ('c8df57e8-8d1a-4181-9c42-17507c96b7cb', 'Alexis Dorsey', 'hIIZntY8NZ');
INSERT INTO users VALUES ('150bc5dd-2bac-49cb-ab66-70a32b2405b7', 'Christopher Milner', '8GwPR2gold');
INSERT INTO users VALUES ('0fa83040-b67e-420b-b99a-c377a27a0a4f', 'Riaan Dupont', 'BMnoB3BQ7p');
INSERT INTO users VALUES ('91d39015-1c59-42d1-b542-b3591e511244', 'Elizabeth Farley', '66qgIP5HwF');
INSERT INTO users VALUES ('51bf355d-d377-4f66-a956-fb428da2fbaa', 'Corinne Edwards', 'FIyJ48P26M');
INSERT INTO users VALUES ('bcd8d954-af57-4cc6-98a9-3b3733ea7a29', 'Dawson Rossi', 'SOol32OdQx');
INSERT INTO users VALUES ('a5e5cead-71dc-4cca-9589-89c9d7dc10c2', 'Gladys Jacobs', 'i2X8VZIOtP');
INSERT INTO users VALUES ('6d893dc5-42db-47da-bb95-27a97daf1569', 'Clarice Bates', 'aHZbQqyrrW');
INSERT INTO users VALUES ('8b9b19aa-80bf-4625-a56c-5ba3546127d4', 'Peyton Gardner', 'PEXjOjpgqE');
INSERT INTO users VALUES ('6876fd3b-344b-4d30-ae1c-499f68a3e93a', 'Carter Berg', 'AEhYX69JoX');
INSERT INTO users VALUES ('bd114cec-802e-4881-bbe7-8c71a4646a16', 'Morgan Aldred', 'sQ64HXxtYP');
INSERT INTO users VALUES ('e2b7f5b6-36b9-4496-851c-3a3ae930d85d', 'Shola Dillon', 'AFAwN4Nblk');
INSERT INTO users VALUES ('28dcdd7f-08e0-4f73-95a6-b6b1bdbc55bc', 'Freddie Martin', 'vvyPW2yiME');
INSERT INTO users VALUES ('e32a641c-b980-49e2-9e72-67a1c8a22c79', 'Sheldon Duffy', '806TbCEq0P');
INSERT INTO users VALUES ('8fe33dc6-6cd5-43f1-b952-509928018750', 'Joss Gregory', '3jbOAjtVbq');
INSERT INTO users VALUES ('aeafbaf3-5e50-4f85-9e27-94994234b3b9', 'Gurpreet Carr', 'UTNDrmZsHx');



-- Create dummy subgroups
INSERT INTO subgroups VALUES ('49a7f9ff-ec8a-4877-86ef-025ed7e995f9', 'Computer Science (W&M)', 'Computer Science at William & Mary');
INSERT INTO subgroups VALUES ('87c93979-bf9e-44df-b4b4-92aa2708dc18', 'Computer Science (General)', 'Computer Science General Discussion');
INSERT INTO subgroups VALUES ('6eee2059-13bc-459a-a5ec-37c9b8b1750d', 'Clubs (W&M)', 'Clubs at William & Mary');
INSERT INTO subgroups VALUES ('2d594a7e-2163-4fd7-aa23-22538b711dc1', 'Campus Events (W&M)', 'Campus Events at William & Mary');
INSERT INTO subgroups VALUES ('694cdbf1-5455-4f90-a2e4-498e6da493ed', 'Sports (W&M)', 'Sports at William & Mary');
INSERT INTO subgroups VALUES ('b0e92c0f-18d7-4872-826d-56b10c49a2a2', 'Job Opportunities (Tech)', 'Job Postings and Recruiting in the Tech Industry');

-- Create dummy posts
INSERT INTO posts VALUES ('b6661200-2586-484c-8031-0a63d3d82879', '2022-04-25 22:14:33 +0000', 'afe686fa-4221-4a97-81a4-6bf174f962f6', 'Has anyone taken CSCI 301 Software Development with Professor Kemper over the summer?', 'I am a freshman and prospective CS major (I plan to declare at the end of the semester) and I am looking for some advice. I know that software development is one of the more intensive classes offered, but taking it over the summer would help my schedule and hopefully set me up for job and internship opportunities next summer. However, I worry that it might go too fast to keep up or learn from the class. Does anyone have any thoughts?', 2, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('a8d81334-56f1-4b48-b913-4ed3927b8d54', '2022-03-25 22:28:22 +0000', '07115216-b43f-4727-9feb-8e0021d3429b', 'How’s CSCI 303 and what language is it taught in', 'title ^', 6, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('e3a3b0a0-74d8-4a5d-9c59-811bdee8f611', '2022-04-25 22:31:29 +0000', 'c8df57e8-8d1a-4181-9c42-17507c96b7cb', 'Why is CSCI 241 so freaking hard?', 'So I’ve been hearing that one of the hardest courses at William and Mary is Data Structures. This is low key freaking me out since I’m an upcoming freshman looking to be a C.S. major. Why is this class so hard and what do you think I should do to succeed in the class?', 8, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('1b76ed39-9e27-42e2-baf3-a187f19021e4', '2021-01-23 22:31:59 +0000', '07115216-b43f-4727-9feb-8e0021d3429b', 'CSCI 301: how much Java are you required to know for this class before it begins?', 'I mainly only know python since I’ve taken no Java based classes. Should I already be fully knowledgeable in Java and how much?', 0, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('e920f19e-fb86-4603-96f8-4a54b032a54a', '2022-04-21 22:35:31 +0000', '150bc5dd-2bac-49cb-ab66-70a32b2405b7', 'Experiences w/ CSCI 241?', 'I heard it’s kind of a weed out class for CSCI majors', 6, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('2f6a6838-b78f-4126-8b26-3ced15010c5e', '2022-04-22 23:17:31 +0000', '0fa83040-b67e-420b-b99a-c377a27a0a4f', 'Best professor for CSCI 241?', 'Hi, I''m preparing to take CSCI 241 this semester. I hear that the class can be really difficult, so I was wondering if part of it has to do with teaching style. Does anyone have a CSCI 241 professor that they recommend in particular? I am also curious: where does much of the course''s difficulty arise from?', 0, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('a4884c06-9e70-4de6-bf52-929f719c5c90', '2022-04-27 23:18:12 +0000', '91d39015-1c59-42d1-b542-b3591e511244', 'CSCI 140 workload', 'Hi all, I’m considering adding programming for data science this semester, but I don’t want to over encumber myself. Could anyone who has taken this class attest to its workload? Additionally, reviews for professor Zhang and professor Khargonkar are hard to come by online, so if anybody has had them in the past, please share your experiences with them.', 12, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');
INSERT INTO posts VALUES ('e9abddaa-8ce1-4afb-b5c7-7ee6ae8cae18', '2022-04-25 23:20:27 +0000', '51bf355d-d377-4f66-a956-fb428da2fbaa', 'Arohi Khargonkar for CSCI 140/141?', 'Did anyone have her for this semester? She doesn''t have a rate my professor, so I''m curious as to how she is.', 0, FALSE, '49a7f9ff-ec8a-4877-86ef-025ed7e995f9');

INSERT INTO posts VALUES ('6bcfdedf-563c-424f-aff7-765a8eb7ac3b', '2022-04-24 21:14:33 +0000', 'bcd8d954-af57-4cc6-98a9-3b3733ea7a29', 'What should I do with my internship money (freshman)', 'Hi guys, I’m a freshman at a t15 and recently accepted an offer at a pretty big company doing data analytics stuff. Making around 30/hr and I think I’m getting an additional 8k because they’re not paying for housing (I’m from the bay). All in all I’m going to have like 15-23k in the bank after this summer, more money than I’ve ever had. My family is well off so I have no pressing financial concerns, but I don’t want to blow this money on drugs alc and food like I would otherwise. What useful things do you guys suggest purchasing/investing in?', 273, FALSE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');
INSERT INTO posts VALUES ('197cad67-0c94-4f75-bb8a-497d18ebefb5', '2022-04-23 22:14:33 +0000', 'a5e5cead-71dc-4cca-9589-89c9d7dc10c2', 'Does something only count as a personal project if it''s done completely from scratch?', 'I would assume following a tutorial doesn''t count. What if you follow a tutorial and put it away, then try to do it on your own? What specifically counts as a personal project?', 140, FALSE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');
INSERT INTO posts VALUES ('f10d2394-1e82-4c22-86d3-8844e03d3ac1', '2022-04-22 23:14:33 +0000', '6d893dc5-42db-47da-bb95-27a97daf1569', 'How do you guys do it?', 'Between school work, doing side projects, leetcode, and all that in between having a social life where do you guys find the time or are you guys are in the same boat as me? I feel like there’s is not enough time for me in the day to do all this. I do feel like I spend a lot of time going out having a social life on the weekends in which I should probably stop and spend that time programming to be come a better programmer', 120, FALSE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');
INSERT INTO posts VALUES ('ad7fcfc2-91be-45da-b2b2-71219937b297', '2022-04-28 12:14:33 +0000', '8b9b19aa-80bf-4625-a56c-5ba3546127d4', 'Why do so many CS majors grind leetcode when DSA is required in many CS curricula?', 'I''m currently taking data structures and algorithms, and every concept we are learning seems to be taken off of leetcode. In our discussion sections, we do interview problems, and our homework is just leetcode on steroids. I feel like leetcode won''t be able to teach me more than I will learn from this class. Do you guys feel the same way? Why do so many people grind leetcode when we learn the concepts in class?', 189, FALSE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');
INSERT INTO posts VALUES ('a0450e67-66fd-4321-b15d-ba0762cad14f', '2022-04-21 19:14:33 +0000', '6876fd3b-344b-4d30-ae1c-499f68a3e93a', 'what were the most important CS classes you guys took in your opinion', 'whether it was its relevance to a day-to-day job, or how much of a better engineer it made you, or whatever else', 12, FALSE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');
INSERT INTO posts VALUES ('edeefaa2-f690-42bb-9d21-31bfda6633bd', '2021-08-12 20:14:33 +0000', '07115216-b43f-4727-9feb-8e0021d3429b', 'What laptops do you guys use?', 'CS Major here, im looking to dump my current laptop and maybe move to mac, what do you guys use?', 89, TRUE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');
INSERT INTO posts VALUES ('8785ec92-d4b0-4350-a31b-c43b3c25410a', '2022-02-02 21:14:33 +0000', 'bd114cec-802e-4881-bbe7-8c71a4646a16', 'Should I take intro to unix, or basic linear algebra?', 'For my degree I have to make the decision to take either Intro to Unix, or Basic Linear Algebra, and I was wondering what people thought I should take? The hard part about choosing for me is that I have no clue about what I want to do after I graduate, so I guess my question is more what class would be the most beneficial for the most career types I could go into if that makes sense. Personally I want to take Intro to Unix instead of taking my millionth math class, but I would rather choose the class that would be the most beneficial to me.', 16, FALSE, '87c93979-bf9e-44df-b4b4-92aa2708dc18');

INSERT INTO posts VALUES ('8377edb9-4bc4-4b21-b6a3-b154d8edfa50', '2022-04-25 22:14:33 +0000', 'e2b7f5b6-36b9-4496-851c-3a3ae930d85d', 'Book clubs on campus?', 'Are there any book clubs that meet regularly on campus? If not, would anyone want to start one? I’ll read literally anything lol but none of my friends are into books like I am :/', 0, TRUE, '6eee2059-13bc-459a-a5ec-37c9b8b1750d');
INSERT INTO posts VALUES ('468e0730-5f34-49b9-99cd-532f368c7215', '2021-04-25 21:14:31 +0000', '28dcdd7f-08e0-4f73-95a6-b6b1bdbc55bc', 'Bird club info?', 'I''ve heard that there''s a bird club on campus with a groupme, but I haven''t been able to get in contact. Does anyone here have a link to the groupme or a way to contact them? I''ve tried the club page on the website but didn''t get a response.', 12, FALSE, '6eee2059-13bc-459a-a5ec-37c9b8b1750d');
INSERT INTO posts VALUES ('6c58d4fa-f2e8-4921-84ec-034754adcf8e', '2022-04-15 23:14:33 +0000', 'e32a641c-b980-49e2-9e72-67a1c8a22c79', 'Hot Take: Nathan Knight Deserves More NBA Playing Time', 'Probably a not-so-hot take on these boards -- below we make the argument with data (& bonus video highlights!), describing why W&M alum Nathan Knight deserves more playing time with the Minnesota Timberwolves. Do you agree? LET''S GO TRIBE. Article: https://wmsportsblog.com/2022/04/27/hot-...ying-time/', 10, FALSE, '694cdbf1-5455-4f90-a2e4-498e6da493ed');
INSERT INTO posts VALUES ('eda5cfe9-7eea-4801-b8ed-5c70c597bc03', '2022-01-12 12:14:33 +0000', '8fe33dc6-6cd5-43f1-b952-509928018750', 'Hiring for Remote Pega Developers in U.S.', 'Hello! I am hiring Pega developers for my company Accenture (direct hire, permanent salary + bonus, benefits, etc.). These roles are open to U.S. Citizens anywhere in the country, and can be 100% remote. We are the #1 Pega systems partner in the world and continue to grow rapidly! Questions welcome! https://accenture.wd3.myworkdayjobs.com/AccentureCareers/job/Arlington-VA/Pega-Developer_R00019413', 1, TRUE, 'b0e92c0f-18d7-4872-826d-56b10c49a2a2');
INSERT INTO posts VALUES ('4296d096-c9cf-46f3-a5ac-8a4a8e11a8ee', '2021-11-25 15:14:33 +0000', 'aeafbaf3-5e50-4f85-9e27-94994234b3b9', 'Apple is hiring!', 'We''re looking for passionate students to join the Campus Leader team! This is a paid part-time employment opportunity and a wonderful way for students to enhance their résumé and gain experience that will last a lifetime. We welcome applications from undergraduate and graduate students across all majors. Interested students should use the link below to apply by February 21 - come join our team!', 106, FALSE, 'b0e92c0f-18d7-4872-826d-56b10c49a2a2');
