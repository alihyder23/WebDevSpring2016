module.exports = function(mongoose) {

    var TeamSchema = mongoose.Schema({
        name: String,
        position: String,
        jerseyNumber: Number,
        dateOfBirth: String,
        nationality: String,
        contractUntil: String,
        marketValue: String

    }, { collection: 'project.team' });

    return TeamSchema;
};