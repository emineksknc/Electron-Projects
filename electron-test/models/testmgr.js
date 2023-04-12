var dbmgr = require('./dbmgr');
var db = dbmgr.db;

exports.getNames = () => {
    const sql = "SELECT * FROM test";
    let stmt = db.prepare(sql);
    let res = stmt.all();
    return res;
}



exports.addName = (newName) => {
    const sql =  db.prepare("INSERT INTO test (name) VALUES (?)");
    sql.run(newName);
 
}


exports.deleteName = (deleteId) => {
    const sql =  db.prepare("DELETE FROM test WHERE id = (?)");
    sql.run(deleteId);
 
}
