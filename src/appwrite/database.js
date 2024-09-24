import config from "../conf/config";
import { Client, Databases, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);

    this.databases = new Databases(this.client);
  }

  // method to create document
  async createDocument({
    title,
    slug,
    content,
    featuredImage,
    userId,
    userName,
  }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        "unique()",
        {
          title,
          content,
          featuredImage,
          userId,
          userName,
        }
      );
    } catch (error) {
      console.log("databaseService :: createPost :: ", error);
    }
  }

  //method to update the document
  async updateDocument(slug, { title, content, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Update Post :: ", error);
    }
  }

  // method  to delete the document
  async deleteDocument(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost ::", error);
      return false;
    }
  }

  //Getting Only 1 dcoument
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error ", error);
    }
  }

  // Getting specified document with the queries
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("AppWrite Service :: getPosts :: error", error);
      return false;
    }
  }
}

const databasesService = new DatabaseService();

export default databasesService;
