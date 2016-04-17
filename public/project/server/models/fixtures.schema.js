module.exports = function(mongoose) {

    var FixturesSchema = mongoose.Schema({
        date: String,
        status: String,
        matchday: Number,
        homeTeamName: String,
        awayTeamName: String,
        result: {
            goalsHomeTeam: Number,
            goalsAwayTeam: Number
        }

    }, { collection: 'project.fixtures' });

    return FixturesSchema;
};