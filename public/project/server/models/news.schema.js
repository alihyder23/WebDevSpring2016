module.exports = function(mongoose) {

    var NewsSchema = mongoose.Schema({
        title: String,
        date: Date,
        author: String,
        userId: String,
        content: String,
        comments: [{
            user: String,
            comment: String,
            date: String
        }]

    }, { collection: 'project.news' });

    return NewsSchema;
};