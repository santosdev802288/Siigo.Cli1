USE [Siigo<%= config.nameCapitalize %>]
GO
ALTER TABLE [dbo].[ProductDetail] DROP CONSTRAINT [FK_ProductDetail_ProductDetailDefinition]
GO
ALTER TABLE [dbo].[Product_ProductDetail] DROP CONSTRAINT [FK_Product_ProductDetail_ProductDetail]
GO
ALTER TABLE [dbo].[Product_ProductDetail] DROP CONSTRAINT [FK_Product_ProductDetail_Product]
GO
ALTER TABLE [dbo].[Product] DROP CONSTRAINT [FK_Product_ProductCategory]
GO
ALTER TABLE [dbo].[Inventory] DROP CONSTRAINT [FK_Inventory_ProductCategory]
GO
/****** Object:  Table [dbo].[ProductDetailDefinition]    Script Date: 11/1/2019 2:54:53 PM ******/
DROP TABLE [dbo].[ProductDetailDefinition]
GO
/****** Object:  Table [dbo].[ProductDetail]    Script Date: 11/1/2019 2:54:53 PM ******/
DROP TABLE [dbo].[ProductDetail]
GO
/****** Object:  Table [dbo].[ProductCategory]    Script Date: 11/1/2019 2:54:53 PM ******/
DROP TABLE [dbo].[ProductCategory]
GO
/****** Object:  Table [dbo].[Product_ProductDetail]    Script Date: 11/1/2019 2:54:54 PM ******/
DROP TABLE [dbo].[Product_ProductDetail]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 11/1/2019 2:54:54 PM ******/
DROP TABLE [dbo].[Product]
GO
/****** Object:  Table [dbo].[Inventory]    Script Date: 11/1/2019 2:54:54 PM ******/
DROP TABLE [dbo].[Inventory]
GO
