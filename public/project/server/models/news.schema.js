module.exports = function(mongoose) {

    var NewsSchema = mongoose.Schema({
        title: String,
        date: Date,
        author: String,
        userId: Integer,
        content: String

    }, { collection: 'project.news' });

    return NewsSchema;
};