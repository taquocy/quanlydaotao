const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
app.use(cors());
// Parse JSON request bodies
app.use(bodyParser.json());

const port = 4000; // Chọn một cổng tùy ý

// Kết nối đến cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: 'db4free.net',
  port: 3306,
  user: 'taquocydonga',
  password: 'Y649394$y',
  database: 'quanlydaotao'
});

db.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối cơ sở dữ liệu: ' + err.message);
  } else {
    console.log('Đã kết nối đến cơ sở dữ liệu');
  }
});

app.get('/api/ctdt', (req, res) => {
  const sql = 'SELECT * FROM `ChuongTrinhDaoTao`'; // Thay thế 'HocPhan' bằng tên bảng thực tế của bạn

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    } else {
      res.json(results);
    }
  });
});


// Định nghĩa tuyến đường API để lấy danh sách học phần
app.get('/api/hocphan/:id', (req, res) => {
  const idModule = parseInt(req.params.id, 10);
  const sql = `SELECT * FROM HocPhan WHERE  ModuleID = ${idModule}`; // Thay thế 'HocPhan' bằng tên bảng thực tế của bạn

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/hocphan', (req, res) => {
  const idModule = parseInt(req.params.id, 10);
  const sql = `SELECT * FROM HocPhan WHERE ModuleID IS NULL`; // Thay thế 'HocPhan' bằng tên bảng thực tế của bạn

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/modules', async (req, res) => {
  const idSection = parseInt(req.params.id, 10);

  const sql = `SELECT * FROM \`Module\` WHERE  idPhanDaotao IS NULL`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/modules/:id', async (req, res) => {
  const idSection = parseInt(req.params.id, 10);

  const sql = `SELECT * FROM \`Module\` WHERE  idPhanDaotao = ${idSection}`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/phanDaoTao/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sql = `SELECT * FROM \`PhanDaoTao\` WHERE PhanDaoTao.ChuongTrinhDaoTaoID = ${id} `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.message);
      res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    } else {
      res.json(results);
    }
  });
});


// API endpoint để cập nhật thông tin Học phần khi kéo và thả vào Module
app.put('/api/updateHocPhan/:id', async (req, res) => {
  console.log('YYYYYYYYY ')
  const hocPhanID = parseInt(req.params.id, 10);
  console.log(`hocPhanID: ${hocPhanID}`)
  console.log(req.body)
  const { moduleID } = req.body; // Thay đổi theo cấu trúc dữ liệu của yêu cầu
  
  // Cập nhật thông tin Học phần với ModuleID mới
  let sql = `UPDATE HocPhan SET ModuleID = ${moduleID} WHERE ID = ${hocPhanID}`;
  if(moduleID == -1){
      sql = `UPDATE HocPhan SET ModuleID = NULL WHERE ID = ${hocPhanID}`;
  }
  

  db.query(sql, [moduleID, hocPhanID], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin Học phần:', err);
      res.status(500).json({ error: 'Lỗi khi cập nhật thông tin Học phần' });
    } else {
      console.log('Thông tin Học phần đã được cập nhật');
      res.json({ message: 'Thông tin Học phần đã được cập nhật' });
    }
  });
});


// API endpoint để cập nhật thông tin Học phần khi kéo và thả vào Module
app.put('/api/updateModule/:id', async (req, res) => {
  
  const moduleID = parseInt(req.params.id, 10);  
  const { idSection } = req.body; // Thay đổi theo cấu trúc dữ liệu của yêu cầu
  
  // Cập nhật thông tin Học phần với ModuleID mới
  let sql = `UPDATE Module SET idPhanDaotao = ${idSection} WHERE ID = ${moduleID}`;
  if(idSection == -1){
      sql = `UPDATE Module SET idPhanDaotao = NULL WHERE ID = ${moduleID}`;
  }
  

  db.query(sql, [moduleID, idSection], (err, result) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin Học phần:', err);
      res.status(500).json({ error: 'Lỗi khi cập nhật thông tin Học phần' });
    } else {
      console.log('Thông tin Học phần đã được cập nhật');
      res.json({ message: 'Thông tin Học phần đã được cập nhật' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${port}`);
});


