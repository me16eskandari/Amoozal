export const ApiUrls = {

    Users: {
        List: (pageNo, per_page) =>
            `users?page=${pageNo}&per_page=${per_page}`,

        Get: (userId) =>
            `users/${userId}`,

        Add: () =>
            `users`,
    },

};