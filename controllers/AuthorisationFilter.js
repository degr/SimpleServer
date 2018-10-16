module.exports = class AuthorisationFilter {
    writeToken(user) {
        return {
            token: Buffer.from(JSON.stringify({id: user.id, email: user.email})).toString('base64')
        };
    }

    readToken(token) {
        try {
            const data = JSON.parse(Buffer.from(token, 'base64').toString());
            if (data.id && data.email) {
                return {
                    id: data.id,
                    email: data.email
                }
            }
        } catch (e) {
            if(console) {
                console.log(e);
            }
        }
        return null;
    }

    notAuthorised(response) {
        response.setHeader('Content-Type', 'application/json');
        response.status(401);
        response.send(JSON.stringify({message: "You are not authorised"}));
    }

    isAuthorisedOrExit(request, response) {
        const header = request.header('auth-token');
        if(header) {
            const token = this.readToken(header);
            if(token) {
                return token
            }
        }
        this.notAuthorised(response);
    }
};