const BasicController = require("./BasicController");
const AuthorisationFilter = require("./AuthorisationFilter")

module.exports = class UserController extends BasicController {
    getDirectory() {
        return "users";
    }

    logIn(user, response) {
        const list = this.getAll();
        const filtered = this.applyFilter(list.data, {email: user.email, password: user.password});
        const authFilter = new AuthorisationFilter();
        if(filtered.length > 0) {
            this.sendResponse(authFilter.writeToken(filtered[0]), response);
        } else {
            authFilter.notAuthorised(response);
        }
    }

    save(data, response) {
        let id = parseInt(data.id);
        if(isNaN(id)) {
            id = 0;
        }
        if(id) {
            data.id = id;
            const list = this.getAll();
            const old = this.applyFilter(list.data, {id: data.id});
            if(old.length === 1) {
                const updated = old[0];
                if(data.email) {
                    updated.email = data.email;
                }
                if(data.password) {
                    updated.password = data.password;
                }
                data = updated;
            }
        }
        if(!data.email || !data.password) {
            response.status(400).send("Bad request, can't save user without email or password")
        } else {
            super.save(data, response);
        }
    }

    getList(pagination, filter, response){
        if(filter && filter.password) {
            delete(filter.password);
        }
        super.getList(pagination, filter, response)
    }

    sendResponseSaveOne(data, res) {
        this.sendResponse(this.userDto(data), res);
    }
    sendResponseGetOne(data, res) {
        this.sendResponse(this.userDto(data), res);
    }

    userDto(data, res) {
        if(data.password) {
            data.password = '*********';
        }
        return data;
    }
};