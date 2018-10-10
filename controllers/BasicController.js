const fs = require('fs');

module.exports = class BasicController {

    constructor(root) {
        this.root = root;
    }

    getDirectory() {
        throw "Implement getDirectory method";
    }

    getList(pagination, filter, response) {
        if (!pagination || (!pagination.skip && pagination.skip !== 0) || !pagination.pageSize) {
            response.status(400).send("Pagination malformed or not defined. Expected object {skip: int, pageSize: int}");
            return;
        }
        const all = this.getAll();
        let data = all.data;
        data = this.applyFilter(data, filter);
        const out = [];
        for (let i = pagination.skip; i < pagination.skip + pagination.pageSize; i++) {
            if (data[i]) {
                out.push(data[i]);
            }
        }
        this.sendResponse(out, response);
    }


    getOne(id, response) {
        const data = this.getAll();
        const out = this.applyFilter(data.data, {id: id});
        this.sendResponseGetOne(out.length ? out[0] : {}, response);
    }

    save(data, res) {
        const all = this.getAll();
        const allData = all.data;
        let id = parseInt(data.id);
        if(isNaN(id)) {
            id = 0;
        }
        let dataModified = false;
        if(id) {
            for (let i = 0; i < allData.length; i++) {
                const comparable = allData[i];
                if(parseInt(comparable.id) === id) {
                    allData[i] = data;
                    dataModified = true;
                } else if(comparable.id > id) {
                    if(i === 0) {
                        allData.unshift(data);
                    } else {
                        allData.splice(i - 1, 0, data);
                    }
                    dataModified = true;
                }
                if(dataModified) {
                    break;
                }
            }
        }
        if(!dataModified) {
            const lastId = (all.lastId + 1) || 1;
            all.lastId = lastId;
            data.id = lastId;
            allData.push(data)
        }
        fs.writeFileSync(this.prepareDbPath(), JSON.stringify(all));
        this.sendResponseSaveOne(data, res)
    }

    sendResponseSaveOne(data, res) {
        this.sendResponse(data, res);
    }
    sendResponseGetOne(data, res) {
        this.sendResponse(data, res);
    }

    delete(id, response) {
        const all = this.getAll();
        const data = all.data;
        let status = 'not_found';
        for(let i = 0; i < data.length; i++) {
            if(data[i].id == id) {
                all.splice(i, 1);
                fs.writeFileSync(this.prepareDbPath(), JSON.stringify(all));
                status = 'ok';
            }
        }
        this.sendResponse({status: status}, response)
    }

    applyFilter(data, filter) {
        if(filter) {
            let count = 0;
            let iterable = data;
            let nextIterable = [];
            for(let key in filter) {
                count++;
                for(let i = 0; i < iterable.length; i++) {
                    if(iterable[i][key] === filter[key]) {
                        nextIterable.push(iterable[i]);
                    }
                }
                iterable = nextIterable;
                nextIterable = [];
            }
            return count > 0 ? iterable : data;
        } else {
            return data;
        }
    }
    prepareDbPath() {
        return this.root + "/database/" + this.getDirectory() + ".json"
    }

    sendResponse(data, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    }

    getAll() {
        try {
            if (fs.existsSync(this.prepareDbPath())) {
                return JSON.parse(fs.readFileSync(this.prepareDbPath(), "utf8"));
            }
        } catch (e) {
            console.log("error with db file read" + e)
        }
        return {lastId: 0, data: []};
    }
};