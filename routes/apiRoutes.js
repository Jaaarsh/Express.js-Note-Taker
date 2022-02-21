const fs = require('fs');

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbNotes = JSON.parse(data);
      res.send(dbNotes);
    });
  });

  app.post('/api/notes', (req, res) => {
    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      dbNotes = JSON.parse(data);
      dbNotes.push(userNotes);
      let number = 1;
      dbNotes.forEach((note, index) => {
        note.id = number;
        number++;
        return dbNotes;
      });
      console.log(dbNotes);

      stringData = JSON.stringify(dbNotes);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send('Note Saved');
  });

  // API DELETE Requests
  app.delete('/api/notes/:id', (req, res) => {

    const deleteNote = req.params.id;
    console.log(deleteNote);

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;

      dbNotes = JSON.parse(data);

      for (let i = 0; i < dbNotes.length; i++) {
        if (dbNotes[i].id === Number(deleteNote)) {
          dbNotes.splice([i], 1);
        }
      }
      console.log(dbNotes);
      stringData = JSON.stringify(dbNotes);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
  
    res.status(204).send('Note Deleted');
  });
};