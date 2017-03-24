const uuid = require("uuid");
const db = require("../server").bucket;
const config = require("../config");
const N1qlQuery = require("couchbase").N1qlQuery;

function RecipeModel() {};

RecipeModel.save = function(data, callback) {
    const jsonObject = {
        title = data.title,
        ingredients = data.ingredients,
        favorite = data.favorite
    }
    const documentId = data.document_id ? data.document_id : uuid.v4();
    db.upsert(documentId, jsonObject, function(error, result) {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, {message: "success", data: result});
    });
};

RecipeModel.getDocumentById = function(documentId, callback) {
    const statement = `SELECT title, ingredients, favorite FROM \`${config.couchbase.bucket}\` AS recipes WHERE META(recipes).id = $1`;
    const query = N1qlQuery.fromString(statement);
    db.query(query, [documentId], function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

RecipeModel.delete = function(documentId, callback) {
    db.remove(documentId, function(error, result) {
        if(error) {
            callback(error, null);
            return;
        }
        callback(null, { message: "success", data: result });
    });
};

RecipeModel.getAll = function(callback) {
    const statement = `SELECT META(recipes).id, title, ingredients, favorite FROM \`${config.couchbase.bucket}\` AS recipes`;
    const query = N1qlQuery.fromString(statement).consistency(N1qlQuery.Consistency.REQUEST_PLUS);
    db.query(query, function(error, result) {
        if(error) {
            return callback(error, null);
        }
        callback(null, result);
    });
};

module.exports = RecipeModel;