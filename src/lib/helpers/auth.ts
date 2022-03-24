const Auth = () => { };

Auth.validateRequest = function validateRequest(request: any): boolean {
    if (request.headers.get("internal_token") === import.meta.env.VITE_AUTH_TOKEN) {
        return true;
    }

    return false;
};

export { Auth };