import express from "express";
import listTasks from "../database/models/ListTasks.js";

const router =  express.Router();

const currentYear = new Date().getFullYear();

  router.get('/home', async (req, res) => {
    if (req.isAuthenticated()) {
      try {
        // This retrieves the last document from the 'listTasks' collection.
        const lastSavedDoc = await listTasks.findOne().sort({ _id: -1 }).exec();
  
        // Check if lastSavedDoc is not null before accessing its properties
        if (lastSavedDoc && lastSavedDoc.listOfTasks) {
          res.render('homePage', {
            title: lastSavedDoc.listTitle,
            arr: lastSavedDoc.listOfTasks,
            curYear: currentYear,
          });
        } else {
          res.render('homePage', {
            curYear: currentYear,
          });
        }
      } catch (error) {
        res.status(500).send({ message: 'Error retrieving data' });
        console.log(error);
      }
    } else {
      res.redirect('/');
    }
  });
  export default router;