const path = require('path');
const express = require('express');
const Professor = require('../model/professors');
const Answer=require('../model/answer')

const Router = express.Router();

  Router.post(
    '/api/postQuestion',
    async (req, res) => {
      try {
        const prof = await Professor.findOne({email:req.body.profId}).exec();
        console.log(req.body.profId);   
        console.log(prof.question)
        prof.question.push({ 
                      name:req.body.name,
                      email:req.body.email,
                      branch:req.body.branch,
                      question:req.body.question
                  });
           
        prof.save().then(prof=>res.json(prof))
                  .catch(err => console.log(err));

        res.send('Question added successfully.');
      } catch (error) {
        res.status(400).send('Error while posting question. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
  );
  Router.get(`/api/getAllQuestions/:id`, async (req, res) => {
    try {
         
         const prof = await Professor.findOne({email:req.params.id}).exec();
         var questionMap = [];

         prof.question.forEach(function(q){
            questionMap.push(q);
          })
         res.send(questionMap);  
     
      } catch (error) {
        res.status(400).send('Error while getting list of professors. Try again later.');
      }
  });
 
  Router.post(
    '/api/postAnswer',
    async (req, res) => {
      try {
        const { questionId,answer } = req.body;
      
        const ans = new Answer({
           questionId,
           answer
        });
        await ans.save();
        res.send('Answer Posted successfully.');
      } catch (error) {
        res.status(400).send('Error while posting answer. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
  );

  Router.get(`/api/getAnswer/:id`, async (req, res) => {
    try {
         
         const answer = await Answer.findOne({questionId:req.params.id}).exec();
         
         res.send(answer);  
     
      } catch (error) {
        res.status(400).send('Error while getting answer. Try again later.');
      }
  });
module.exports = Router;
