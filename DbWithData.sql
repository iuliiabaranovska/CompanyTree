USE [CompaniesStorage]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Companies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ParentId] [int] NULL,
	[Name] [nvarchar](128) NOT NULL,
	[EstimatedEarnings] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Companies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Companies] ON 

INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (35, NULL, N'Microsoft', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (38, NULL, N'Nestle', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (40, NULL, N'Cartoon', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (42, 35, N'HP', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (45, 42, N'Apple', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (47, 42, N'Lenovo', CAST(100.00 AS Decimal(18, 2)))
INSERT [dbo].[Companies] ([Id], [ParentId], [Name], [EstimatedEarnings]) VALUES (48, 47, N'Dell', CAST(100.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Companies] OFF
ALTER TABLE [dbo].[Companies]  WITH CHECK ADD  CONSTRAINT [FK_Companies_Companies] FOREIGN KEY([ParentId])
REFERENCES [dbo].[Companies] ([Id])
GO
ALTER TABLE [dbo].[Companies] CHECK CONSTRAINT [FK_Companies_Companies]
GO
