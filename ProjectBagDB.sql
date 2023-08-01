USE [master]

IF db_id('ProjectBag') IS NULL
  CREATE DATABASE [ProjectBag]
GO

USE [ProjectBag]
GO

DROP TABLE IF EXISTS [Yarn];
DROP TABLE IF EXISTS [WeightTag];
DROP TABLE IF EXISTS [ProjectYarn];
DROP TABLE IF EXISTS [FiberTag];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [Resources];
DROP TABLE IF EXISTS [User];
GO

CREATE TABLE [FiberTag] (
  [Id] integer PRIMARY KEY IDENTITY not null,
  [Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [WeightTag] (
  [Id] integer PRIMARY KEY IDENTITY not null,
  [Name] nvarchar(20) NOT NULL
)
GO

CREATE TABLE [Yarn] (
  [Id] integer PRIMARY KEY IDENTITY not null,
  [Brand] nvarchar(50) NOT NULL,
  [Color] nvarchar(50) NOT NULL,
  [Quantity] nvarchar(50) NOT NULL,
  [FiberId] integer NOT NULL,
  [WeightId] integer NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY IDENTITY not null,
  [Name] nvarchar(50) NOT NULL,
  [Email] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [Project] (
  [Id] integer PRIMARY KEY IDENTITY not null,
  [PatternName] nvarchar(50) NOT NULL,
  [Designer] nvarchar(50) NOT NULL,
  [PatternUrl] nvarchar(100) NOT NULL,
  [Notes] nvarchar(MAX) NOT NULL,
  [PhotoUrl] nvarchar(100) NOT NULL,
  [StartDate] datetime NOT NULL,
  [EndDate] datetime NOT NULL,
  [Queued] bit NOT NULL,
  [FiberId] integer NOT NULL,
  [WeightId] integer NOT NULL,
  [UserId] integer NOT NULL
)
GO

CREATE TABLE [Resource] (
  [Id] integer PRIMARY KEY IDENTITY not null,
  [Type] nvarchar(50) NOT NULL,
  [Description] nvarchar(MAX) NOT NULL,
  [ResourceUrl] nvarchar(100) NOT NULL
)
GO

CREATE TABLE [ProjectYarn] (
  [id] integer PRIMARY KEY IDENTITY not null,
  [ProjectId] integer NOT NULL,
  [YarnId] integer NOT NULL
)
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([FiberId]) REFERENCES [FiberTag] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([WeightId]) REFERENCES [WeightTag] ([Id])
GO

ALTER TABLE [Yarn] ADD FOREIGN KEY ([FiberId]) REFERENCES [FiberTag] ([Id])
GO

ALTER TABLE [Yarn] ADD FOREIGN KEY ([WeightId]) REFERENCES [WeightTag] ([Id])
GO

ALTER TABLE [ProjectYarn] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [ProjectYarn] ADD FOREIGN KEY ([YarnId]) REFERENCES [Yarn] ([Id])
GO

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] ([ID], [Name], [Email]) 
VALUES (1, 'Kathleen', 'kint@yarn.com'), (2, 'Birdie', 'bird@dog.com'), (3, 'Hoagie', 'hoagie@dog.com')
SET IDENTITY_INSERT [User] OFF

SET IDENTITY_INSERT [Resources] ON
INSERT INTO [Resources] ([Id], [Type], [Description], [ResourceUrl])
VALUES (1, 'Video', 'M1L - Make 1 Left Tutorial', 'https://youtu.be/zmUSinUjZbE'),
       (2, 'Video', 'M1R - Make 1 Right Tutorial', 'https://youtu.be/qCV0VC0Yim4'),
       (3, 'Wish List', 'Hatteras Splash Yarn', 'https://www.yarn.com/products/tahki-yarns-hatteras-splash')
SET IDENTITY_INSERT [Resources] OFF

SET IDENTITY_INSERT [FiberTag] ON
INSERT INTO [FiberTag] ([Id], [Name])
VALUES (1, 'Wool'), (2, 'Cotton'), (3, 'Wool Blend'), (4, 'Cotton Blend'), (5, 'Alpaca')
SET IDENTITY_INSERT [FiberTag] OFF

SET IDENTITY_INSERT [WeightTag] ON
INSERT INTO [WeightTag] ([Id], [Name])
VALUES (1, 'Fingering'), (2, 'DK'), (3, 'Worsted'), (4, 'Aran'), (5, 'Bulky')
SET IDENTITY_INSERT [WeightTag] OFF

SET IDENTITY_INSERT [Project] ON
INSERT INTO [Project] (Id, PatternName, Designer, PatternUrl, Notes, PhotoUrl, StartDate, EndDate, Queued, FiberId, WeightId, UserId)
VALUES (1, 'Perla', 'Joji Locatelli', 'https://www.ravelry.com/patterns/library/perla-2', 'chewed by hoagie, need to repair sleeve and bottom 4 inches', 'www.ravelry.com', '2023-05-01', '2023-06-01', 0, 1, 4, 1),
       (2, 'Emerald Ankers Sweater', 'PetiteKnit', 'https://www.ravelry.com/patterns/library/ankers-sweater---my-size', 'Made xs, fits ok, but prefer the Callopie design by Espace Tricote', 'www.ravelry.com', '2023-04-11', '2023-07-16', 0, 4, 3, 1),
       (3, 'Bright Side', 'Espace Tricot', 'https://www.ravelry.com/patterns/library/bright-side-3', 'Made size 2, PERFECT FIT! Will make again', 'www.ravelry.com', '2022-06-02', '2022-07-04', 0, 4, 3, 1),
       (4, 'Sunshine Coast', 'Heidi Kirrmaier', 'https://www.ravelry.com/patterns/library/sunshine-coast', 'use a cotton/linen/bamboo blend for this one', 'https://www.flickr.com/photos/34727835@N07/27879373603', '2001-01-01', '2001-01-02', 1, 4, 2, 2)
SET IDENTITY_INSERT [Project] OFF

SET IDENTITY_INSERT [Yarn] ON
INSERT INTO [Yarn] ([Id], [Brand], [Color], [Quantity], [FiberId], [WeightId])
values (1, 'Pima Rino', 'Jade Green', '2 unused balls (each is 190 yards)', 4, 3), (2, 'Pima Colada', 'Iris', '6 balls', 2, 3), (3, 'Mojito Merino', 'Light Grey', '1/2 ball', 2, 3), (4, 'Pima Rino', 'Light Grey', '2 unused balls (each is 190 yards)', 4, 3); 
set identity_insert [Yarn] off
