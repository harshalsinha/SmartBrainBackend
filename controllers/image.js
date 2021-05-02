const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey : 'c0853c6e9951482bbb0fffb021cbbd6f'
  })

const handleApiCall = (req, res) => {
    const {input} = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    .then(response => {
        res.json(response)
    })
    .catch(err => res.json(err))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').
    where({
    id: id
    }).
    increment('entries', 1).
    returning('*').
    then(user => {
    res.json(`Updated entries value for user: ${user[0].name} with value ${user[0].entries}`)
    }).
    catch(err => res.status(400).json(`Unable to get entries for user ${userId}. Error ${err}`))
}

module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
}