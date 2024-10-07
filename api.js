<script src="https://apis.google.com/js/api.js"></script>


  let sheets;

  // ฟังก์ชันเริ่มต้นเมื่อลงชื่อเข้าใช้เสร็จสิ้น
  function initClient() {
    gapi.client.init({
      apiKey: 'AIzaSyBmlGsIpynjUrE3PKnoT-RrCKgyb_844Sg',
      clientId: '907098027715-rl44p6k03n46pmvu5cdpdo6pun1et1ua.apps.googleusercontent.com',
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    }).then(function () {
      sheets = gapi.client.sheets; // เรียก Google Sheets API
    }).catch(function (error) {
      console.log('Error during API client initialization:', error);
    });
  }

  // ฟังก์ชันที่ใช้ในการส่งข้อมูลไปยัง Google Sheets
  async function appendData(data) {
    const spreadsheetId = '11LOxgdjstPUbppWivA_NBEQ_N7G73a_l4aEn-oP5lt0'; 
    const range = 'register!A2:ZZ'; // กำหนดช่วงที่จะใส่ข้อมูลในชีต
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

  // ฟังก์ชันที่ดึงข้อมูลจากฟอร์มและเรียกใช้งานฟังก์ชัน appendData
  function submitData() {
    // ดึงค่าจาก span HTML
    const numb = document.getElementById('numb').textContent;
    const registernumber = document.getElementById('registernumber').textContent;
    const name = document.getElementById('name').textContent;
    const idcard = document.getElementById('idcard').textContent;
    const age = document.getElementById('age').textContent;
    const birthday = document.getElementById('birthday').textContent;
    const program = document.getElementById('program').textContent;
    const registerdate = new Date().toISOString(); // กำหนดวันที่ปัจจุบัน

    // สร้าง array ของข้อมูลที่ดึงจาก span
    const formData = [numb, registernumber, name, idcard, age, birthday, program, registerdate];

    // เรียกฟังก์ชัน appendData เพื่อบันทึกข้อมูลลงใน Google Sheets
    appendData(formData);

    // แสดงข้อความแจ้งเตือนเมื่อบันทึกเสร็จสิ้น
    Swal.fire({
      icon: 'success',
      title: 'ลงทะเบียนสำเร็จ',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  // โหลด Google API และเริ่มต้น client
  gapi.load('client:auth2', initClient);
