const express = require('express');
const server = express();

const app = express();
const port = 3306;

var mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool({
connectionLimit:10,
host: 'localhost',
user: 'mysql.infoschema',
password: '123456789',
database: 'history_table'
});



// 处理获取历史记录请求的路由
server.get('/history', (req, res) => {
// 查询历史记录数据
var query = 'SELECT * FROM history_table';
 pool.query('SELECT * FROM history_table ORDER BY id DESC LIMIT 10', (error, results) => {
  if (error) {
    console.error('Error fetching history:', error);
    res.sendStatus(500);
  } else {
    res.json(results);
  }
});
});

app.get('/history', (req, res) => {
  const query = 'SELECT * FROM history_table ORDER BY id DESC LIMIT 10';
  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching history:', error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
