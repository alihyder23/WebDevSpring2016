module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        roles: [String],
        email: String,
        roles: [String]

    }, { collection: 'project.user' });

    return UserSchema;
};