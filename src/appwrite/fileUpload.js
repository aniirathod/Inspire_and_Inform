import config from "../conf/config";
import { Client, ID, Storage } from "appwrite";

export class FileUpload {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);

    this.storage = new Storage(this.client);
  }

  // Method to upload file
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: UploadFile :: Error", error);
    }
  }

  //method to delete file

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("AppWrite Service :: DeleteFile :: error", error);
      return false;
    }
  }

  // Method for previwing
  preview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const FileUploadservice = new FileUpload();

export default FileUploadservice;
