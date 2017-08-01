const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get( '/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor( Math.random() * numberOfCards );
  res.redirect( `/cards/${flashcardId}?side=question` )
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    if ( !side ) {
      res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];
    const { prompt } = cards[id];
    const { points } = cards[id];
    /*
      Create an object to store the data to be passed to the page
      We pass the id so the the link on the card page will be able
      to find the proper json object
    */
    const templateData = { id, text, name };
  /* 
  1. You can add properties to an object as needed  - we'll add the score,
  points, side, hint and prompt proerties to the templateData object as we go through this process
  
  2. Notice that the data passed to the receiving template does not
        have to have the same name as the data object from the json file
        (score-points)
        
  */
    templateData.score = points;

    if (side === 'question') {
        templateData.hint = hint;
        templateData.side = 'question';
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
        
      
    /* You don't have to pass all the params - just the ones you want
        to use in this request to render
    */
    } else if ( side === 'answer' ) {
        //templateData.side = 'a';
        templateData.prompt = prompt;
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    
  res.render('card', templateData);
});

module.exports = router;