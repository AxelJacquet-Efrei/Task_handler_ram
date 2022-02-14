const schema = require('./schemas');

module.exports.insertUser = (infos) => {
    return new Promise(function (resolve, reject) {
        schema.users.create(infos, function (err) {
            if (err) return reject(err);

            return resolve(true);
        });
    });
}

module.exports.updateUser = (id, update) => {
    return new Promise(function (resolve, reject) {
        schema.users.findOneAndUpdate({id: id}, update, function (err) {
            if (err) return reject(err);

            return resolve(true);
        });
    });
}

module.exports.getUser = (id) => {
    return new Promise(function (resolve, reject) {
        schema.users.findOne({id: id}, function (err, user) {
            if (err) return reject(err);

            if (user) {
                return resolve(user);
            } else {
                return resolve(false);
            }
        }).lean();
    });
}