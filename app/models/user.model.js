/**
 * Created by fblos_000 on 19.06.2017.
 */
module.exports = function (mongoose) {
    var modelName = 'User';
    var Types = mongoose.Schema.Types;

    var Schema = new mongoose.Schema({

        EmailAddress: {
            type: Types.String,
            required: true,
            unique: true
        },

        Password: {
            type: Types.String,
            required: true
        }

    });

    Schema.statics = {
        collectionName: modelName,
        routeOptions: {}
    };

    return Schema;
};