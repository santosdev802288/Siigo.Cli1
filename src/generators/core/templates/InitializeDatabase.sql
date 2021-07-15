USE [Siigo<%= config.nameCapitalize %>]
GO
/****** Object:  Table [dbo].[Inventory]    Script Date: 11/1/2019 2:53:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductCategoryId] [int] NULL,
	[Stock] [int] NULL,
	[Date] [datetime] NULL,
 CONSTRAINT [PK_Inventory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 11/1/2019 2:53:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[Price] [int] NOT NULL,
	[ProductCategoryId] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_ProductDetail]    Script Date: 11/1/2019 2:53:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_ProductDetail](
	[ProductId] [int] NOT NULL,
	[ProductDetailId] [int] NOT NULL,
 CONSTRAINT [PK_Product_ProductDetail] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC,
	[ProductDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductCategory]    Script Date: 11/1/2019 2:53:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCategory](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](100) NOT NULL,
 CONSTRAINT [PK_ProductCategory] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductDetail]    Script Date: 11/1/2019 2:53:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetail](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[ProductDetailDefinitionId] [int] NULL,
 CONSTRAINT [PK_ProductDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductDetailDefinition]    Script Date: 11/1/2019 2:53:43 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetailDefinition](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Description] [varchar](100) NOT NULL,
 CONSTRAINT [PK_ProductDetailDefinition] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Product] ON 
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (1, N'Shirt', N'A medium sized grey shirt', 600, 1)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (2, N'Shoe', N'A small black shoe', 2000, 1)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (3, N'Hat', N'A big green hat', 1500, 1)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (4, N'Mario Kart', N'Race against Mario and friends', 4000, 3)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (5, N'Mortal Kombat', N'Fight for your life', 3600, 3)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (6, N'Blender', N'Oster silver blender', 5000, 2)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (7, N'Fridge', N'Electrolux white fridge', 30000, 2)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (8, N'Oven', N'Electrolux silver oven', 10000, 2)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (9, N'Rice Cooker', N'Oster red rice cooker', 3000, 2)
GO
INSERT [dbo].[Product] ([Id], [Name], [Description], [Price], [ProductCategoryId]) VALUES (10, N'Microwave', N'Samsung black microwave', 10000, 2)
GO
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (1, 1)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (1, 3)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (2, 4)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (2, 5)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (3, 6)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (3, 7)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (4, 9)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (5, 8)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (6, 10)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (7, 11)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (8, 11)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (9, 10)
GO
INSERT [dbo].[Product_ProductDetail] ([ProductId], [ProductDetailId]) VALUES (10, 14)
GO
SET IDENTITY_INSERT [dbo].[ProductCategory] ON 
GO
INSERT [dbo].[ProductCategory] ([Id], [Name], [Description]) VALUES (1, N'Clothing', N'Clothing category')
GO
INSERT [dbo].[ProductCategory] ([Id], [Name], [Description]) VALUES (2, N'Appliances', N'Appliacens category')
GO
INSERT [dbo].[ProductCategory] ([Id], [Name], [Description]) VALUES (3, N'Video Games', N'Video Games category')
GO
SET IDENTITY_INSERT [dbo].[ProductCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductDetail] ON 
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (1, N'Gray', N'Grey color', 1)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (3, N'Medium', N'Medium size', 2)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (4, N'Black', N'Black color', 1)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (5, N'Small', N'Small size', 2)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (6, N'Green', N'Green color', 1)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (7, N'Large', N'Large size', 2)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (8, N'Xbox', N'Microsoft console', 4)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (9, N'Nintendo Switch', N'Nintendo latest console', 4)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (10, N'Oster', N'Oster appliances', 3)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (11, N'Electrolux', N'Electrolux appliances', 3)
GO
INSERT [dbo].[ProductDetail] ([Id], [Name], [Description], [ProductDetailDefinitionId]) VALUES (14, N'Samsung', N'Samsung appliances', 3)
GO
SET IDENTITY_INSERT [dbo].[ProductDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductDetailDefinition] ON 
GO
INSERT [dbo].[ProductDetailDefinition] ([Id], [Name], [Description]) VALUES (1, N'Color', N'The color of the product')
GO
INSERT [dbo].[ProductDetailDefinition] ([Id], [Name], [Description]) VALUES (2, N'Size', N'The size of the product')
GO
INSERT [dbo].[ProductDetailDefinition] ([Id], [Name], [Description]) VALUES (3, N'Model', N'The model of the product')
GO
INSERT [dbo].[ProductDetailDefinition] ([Id], [Name], [Description]) VALUES (4, N'Platform', N'The platform of the video game')
GO
SET IDENTITY_INSERT [dbo].[ProductDetailDefinition] OFF
GO
ALTER TABLE [dbo].[Inventory]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_ProductCategory] FOREIGN KEY([ProductCategoryId])
REFERENCES [dbo].[ProductCategory] ([Id])
GO
ALTER TABLE [dbo].[Inventory] CHECK CONSTRAINT [FK_Inventory_ProductCategory]
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductCategory] FOREIGN KEY([ProductCategoryId])
REFERENCES [dbo].[ProductCategory] ([Id])
GO
ALTER TABLE [dbo].[Product] CHECK CONSTRAINT [FK_Product_ProductCategory]
GO
ALTER TABLE [dbo].[Product_ProductDetail]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductDetail_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Product] ([Id])
GO
ALTER TABLE [dbo].[Product_ProductDetail] CHECK CONSTRAINT [FK_Product_ProductDetail_Product]
GO
ALTER TABLE [dbo].[Product_ProductDetail]  WITH CHECK ADD  CONSTRAINT [FK_Product_ProductDetail_ProductDetail] FOREIGN KEY([ProductDetailId])
REFERENCES [dbo].[ProductDetail] ([Id])
GO
ALTER TABLE [dbo].[Product_ProductDetail] CHECK CONSTRAINT [FK_Product_ProductDetail_ProductDetail]
GO
ALTER TABLE [dbo].[ProductDetail]  WITH CHECK ADD  CONSTRAINT [FK_ProductDetail_ProductDetailDefinition] FOREIGN KEY([ProductDetailDefinitionId])
REFERENCES [dbo].[ProductDetailDefinition] ([Id])
GO
ALTER TABLE [dbo].[ProductDetail] CHECK CONSTRAINT [FK_ProductDetail_ProductDetailDefinition]
GO
