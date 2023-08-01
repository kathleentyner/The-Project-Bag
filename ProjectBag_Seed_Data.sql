
set identity_insert [User] on
insert into [User] ([ID], [Name], [Email]) 
values (1, 'Kathleen', 'kint@yarn.com'); (2, 'Birdie', 'bird@dog.com'); (3, 'Hoagie', 'hoagie@dog.com')
set identity_insert [User] off

set identity_insert [Resources] on
insert into [Resources] ([Id], [Type], [Description], [ResourceUrl])
values (1, 'Video', 'M1L - Make 1 Left Tutorial',  'https://youtu.be/zmUSinUjZbE'); (2, 'Video', 'M1R - Make 1 Right Tutorial',  'https://youtu.be/qCV0VC0Yim4'); (3, 'Wish List', 'Hatteras Splash Yarn',  'https://www.yarn.com/products/tahki-yarns-hatteras-splash'); 
set identity_insert [Resources] off

set identity_insert [FiberTag] on
insert into [FiberTag] ([Id], [Name])
values (1, 'Wool'), (2, 'Cotton'), (3, 'Wool Blend'), (4, 'Cotton Blend'), (4, 'Alpaca');
set identity_insert [FiberTag] off


set identity_insert [WeightTag] on
insert into [WeightTag] ([Id], [Name])
values (1, 'Fingerling'), (2, 'DK'), (3, 'Worsted'), (4, 'Aran'), (4, 'Bulky');
set identity_insert [WeightTag] off


set identity_insert [Project] on
insert into Project(Id, PatternName, Designer, patternUrl, notes, PhotoUrl, StartDate, EndDate, Queued, FiberId, WeightId, UserId) values (1, 'Perla', 'Joji Locatelli', 'https://www.ravelry.com/patterns/library/perla-2', 'chewed by hoagie, need to repair sleeve and bottom 4 inches', 'www.ravelry.com', 05-01-2023, 06-01-2023, 0, 1, 4, 1 );
 (2, 'Emerald Ankers Sweater', 'PetiteKnit', 'https://www.ravelry.com/patterns/library/ankers-sweater---my-size', 'Made xs, fits ok, but prefer the Callopie design by Espace Tricote', 'www.ravelry.com', 04-11-2023, 07-16-2023, 0, 4, 3, 1 );

 (3, 'Bright Side', 'Espace Tricot', 'https://www.ravelry.com/patterns/library/bright-side-3', 'Made size 2, PERFECT FIT! Will make again', 'www.ravelry.com', 06-02-2022, 07-04-2022, 0, 4, 3, 1 );
( 4 'Sunshine Coast', 'Heidi Kirrmaier', 'https://www.ravelry.com/patterns/library/sunshine-coast', 'use a cotton/linen/bamboo blend for this one', 'https://www.flickr.com/photos/34727835@N07/27879373603' 01-01-2001, 01-02-2001, 1, 4, 2, 2 )
set identity_insert [Project] off

set identity_insert [Yarn] on
insert into [Yarn] ([Id], [Brand], [Color], [Quanity], [FiberId], [WeightId])
values (1, 'Pima Rino', 'Jade Green', '2 unused balls (each is 190 yards)', 4, 3); (2, 'Pima Colada', 'Iris', '6 balls' 2, 3); (3, 'Mojito Merino', 'Light Grey', '1/2 ball' 2, 3); (4, 'Pima Rino', 'Light Grey', '2 unused balls (each is 190 yards)', 4, 3); 
set identity_insert [Yarn] off

set identity_insert [ProjectYarn] on
insert into [ProjectYarn] ([Id], [ProjectId], [YarnId])
values (1, 1, 3); (2, 2, 1); (3, 3, 4)
set identity_insert [ProjectYarn] off
