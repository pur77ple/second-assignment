let expression = '';
let pool;
function append(value) {
  expression += value;
  document.getElementById('display').value = expression;
}

function clearDisplay() {
  expression = '';
  document.getElementById('display').value = '';
}



var mysql = require('mysql');

// 创建数据库连接池
  pool = mysql.createPool({
  connectionLimit:10,
  host: 'localhost',
  user: 'mysql.infoschema',
  password: '123456789',
  database: 'history_table'
});



// 处理获取历史记录请求的路由
app.get('/history', (req, res) => {
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

  
function insertHistory(expression, result) {
    // 执行数据库插入操作
    const query = `INSERT INTO history_table (expression, result) VALUES ('${expression}', '${result}')`;
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error inserting history:', error);
      }
    });
  }
  function calculate() {
    const result = eval(expression);
    document.getElementById('display').value = result;
  
    // 插入历史记录到数据库
    insertHistory(expression, result);
  
    expression = '';
  }
  
function append(value) {
  if (value === 'ans') {
    expression += ans; // 如果是'ans'，将上一次计算的结果追加到表达式中
  } else {
    expression += value;
  }
  document.getElementById('display').value = expression;
}

  
  function calculate() {
    const result = eval(expression);
    document.getElementById('display').value = result;
  
    ans = result; // 将本次计算的结果存储为上一次计算的结果
  
    // 其他操作...
  
    // 刷新显示器的值
    document.getElementById('display').value = result;
  }
  

function calculateSquareRoot() {
    const operand = parseFloat(expression);
    const result = Math.sqrt(operand);
    document.getElementById('display').value = result;
    expression = '';
  }
  
  function calculateSine() {
    const operand = parseFloat(expression);
    const angleInRadians = operand * Math.PI / 180; // 将角度转换为弧度
    const result = Math.sin(angleInRadians);
    document.getElementById('display').value = result.toFixed(4);
    expression = '';
  }
  
  function calculateCosine() {
    const operand = parseFloat(expression);
    const angleInRadians = operand * Math.PI / 180; // 将角度转换为弧度
    const result = Math.cos(angleInRadians);
    document.getElementById('display').value = result.toFixed(4);
    expression = '';
  }
  
  
  function calculateLogarithm() {
    const operand = parseFloat(expression);
    const result = Math.log10(operand);
    document.getElementById('display').value = result;
    expression = '';
  }


  