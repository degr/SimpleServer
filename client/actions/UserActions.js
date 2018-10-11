import $ from "jquery"

class UserActions {

    createUser(user) {
        $.ajax({
            url: "/users/save",
            type: "POST",
            data: JSON.stringify(user),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus) => {
                console.log(data);
                console.log(textStatus);
            }
        });
    }

    loadList(pagination, callback) {
        $.ajax({
            url: "/users/list",
            type: "POST",
            data: JSON.stringify({pagination}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus) => {
                callback(data)
            }
        });
    }

}

export default new UserActions();