module.exports = function(mongoose) {

    var NewsSchema = mongoose.Schema({
        title: String,
        date: Date,
        author: String,
        userId: String,
        content: String

    }, { collection: 'project.news' });

    return NewsSchema;
};