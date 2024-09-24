import config from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  account;

  constructor() {
    this.Client.setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectid); // Your project ID

    this.account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // calling a metthod which will directly login
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  // //method to create user by sending otp at email
  // async createUserByemail({ email }) {
  //   try {
  //     const session = await this.account.createEmailToken(
  //       ID.unique(),
  //       email,
  //       true
  //     );

  //     if (session) {
  //       return this.loginByemailOtp(session.userId);
  //     }
  //   } catch (error) {
  //     console.log("appwrite :: createByemail::", error);
  //   }
  // }

  // // method to login by email otp
  // async loginByemailOtp({ userId }) {
  //   try {
  //     return await this.account.createSession(userId, "[SECRET]");
  //   } catch (error) {
  //     console.log("Appwrite error auth :: loginbyEmail ::", error);
  //   }
  // }

  // method for login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // method for geting the user
  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite service :: getuser :: error", error);
    }
    return null;
  }

  // method for logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authservice = new AuthService();

export default authservice;
