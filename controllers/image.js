const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'd3f0982743bb4ca6ba3d322aab428aa2' 
});


const handleApiCall = (req, res) => {
  app.models.predict('face-detection', req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("err!!!", err);
      res.status(400).json('unable to work with API')})
    
}



const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}


module.exports = {
  handleImage,
  handleApiCall
}
