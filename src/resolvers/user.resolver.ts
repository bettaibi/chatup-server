
export default {
    
    Query: {
        user : async (_: any, {id}: {id: string}) => {
            const user = {
                id: "1",
                name: "dkdkdk",
                email: "user@example.com"
            }
            return user;
        }
    },

    Mutation: {

    },

    Subscription: {

    }
}