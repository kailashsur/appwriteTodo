import conf from "./conf/conf";
import { Client, Account, ID, Databases } from "appwrite";

export class authService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async createTodo(data){
        try {
            const databaseRes = await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, ID.unique(), data)       //here the todoID is "string" and todo is "an object"
            if(databaseRes){
                return databaseRes
            }
        } catch (error) {
            console.log("apppwriteService :: createTodo :: error :: ", error);
        }
    }


    // This method is returned a promise so that it has to be used as a promise handeler
    async createAccount({ email, password, name }) 
    {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.loginAccount({ email, password });    // this method is defined below and used in herre
            }
            else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite auth.js :: createAccount() :: error ", error);
            
        }
    }


    async loginAccount({email, password})
    {
        try {
            return await this.account.createEmailSession(email, password)            
        } catch (error) {
            console.log("Appwrite auth.js :: loginAccount() :: error ", error);
            
        }
    }

    async getCurrentAccount()
    {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite auth.js :: getCurrentAccount() :: error ", error);

        }
    }

    async logoutAccount()
    {
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            console.log("Appwrite auth.js :: logoutAccount() :: error ", error);
            
        }
    }


}



const appwriteService = new authService();
export default appwriteService;