const db = require('./db').default;

db.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'input_kegiatan' ORDER BY ordinal_position;")
  .then(res => console.log(JSON.stringify(res.rows, null, 2)))
  .catch(err => console.error(err));