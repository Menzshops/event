<script src="https://apis.google.com/js/api.js"></script>

let sheets; // ประกาศตัวแปร

function initClient() {
  gapi.client.init({
    apiKey: 'AIzaSyBmlGsIpynjUrE3PKnoT-RrCKgyb_844Sg',
    clientId: '
907098027715-rl44p6k03n46pmvu5cdpdo6pun1et1ua.apps.googleusercontent.com',
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  }).then(function () {
    // สร้าง instance ของ Google Sheets API
    sheets = gapi.client.sheets;
  }).catch(function (error) {
    console.log('Error during API client initialization:', error);
  });
}

const fs = require('fs');
const { google } = require('googleapis');


const credentials = JSON.parse(fs.readFileSync('credentials.json'));


const { client_id, client_secret, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id, 
  client_secret, 
  redirect_uris[0]
);

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

async function appendData(data) {
  const spreadsheetId = '11LOxgdjstPUbppWivA_NBEQ_N7G73a_l4aEn-oP5lt0'; 
  const range = 'register!A2:ZZ';
  const valueInputOption = 'RAW'; 
  const resource = {
    values: [
      data,
    ],
  };

  try {
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    console.log(`${result.data.updates.updatedCells} cells appended.`);
  } catch (error) {
    console.error('Error appending data:', error);
  }
}

function submitData() {
  // ดึงค่าจากฟอร์ม HTML
  const numb = document.getElementById('numb').textContent;
  const registernumber = document.getElementById('registernumber').textContent;
  const name = document.getElementById('name').textContent;
  const idcard = document.getElementById('idcard').textContent;
  const age = document.getElementById('age').textContent;
  const birthday = document.getElementById('birthday').textContent;
  const program = document.getElementById('program').textContent;
  const registerdate = formatDateTime();
  // สร้าง array ของข้อมูลที่ดึงจากฟอร์ม
  const formData = [numb, registernumber, name, idcard, age, birthday, program, registerdate];

  // เรียกฟังก์ชัน appendData เพื่อบันทึกข้อมูลลงใน Google Sheets
  appendData(formData);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "ลงทะเบียนสำเร็จ"
  });




}
