// Fengshui Calendar App
window.FengshuiCalendarApp = function () {
    const container = document.getElementById('fengshui-calendar-app');
    if (!container) return;
    container.innerHTML = `<div class="fengshui-calendar-wrap">
    <div class="row gx-5 gy-3 align-items-start">
      <div class="col-lg-6 col-12">
        <div id="fs-calendar"></div>
      </div>
      <div class="col-lg-6 col-12">
        <div id="fs-calendar-info"></div>
      </div>
    </div>
  </div>`;
    renderCalendar();
};

function renderCalendar(date) {
    const today = date ? new Date(date) : new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const selectedDay = today.getDate();
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Build calendar grid
    let html = `<div class='fs-calendar-box'><div class='fs-calendar-header'><button class='fs-prev'>&lt;</button><span>${year} - ${month + 1}</span><button class='fs-next'>&gt;</button></div><table class='fs-calendar-table'><thead><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr></thead><tbody>`;
    let day = 1;
    for (let i = 0; i < 6; i++) {
        html += '<tr>';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < startDay) || day > daysInMonth) {
                html += '<td></td>';
            } else {
                const isToday = (day === selectedDay && month === new Date().getMonth() && year === new Date().getFullYear());
                html += `<td class='${isToday ? 'fs-today' : ''}' data-date='${year}-${month + 1}-${day}'>${day}</td>`;
                day++;
            }
        }
        html += '</tr>';
        if (day > daysInMonth) break;
    }
    html += '</tbody></table></div>';
    document.getElementById('fs-calendar').innerHTML = html;
    // Event listeners
    document.querySelectorAll('#fs-calendar td[data-date]').forEach(td => {
        td.onclick = function () {
            renderCalendarInfo(this.getAttribute('data-date'));
            document.querySelectorAll('#fs-calendar td').forEach(cell => cell.classList.remove('fs-selected'));
            this.classList.add('fs-selected');
        };
    });
    document.querySelector('.fs-prev').onclick = function () {
        const prev = new Date(year, month - 1, 1);
        renderCalendar(prev);
    };
    document.querySelector('.fs-next').onclick = function () {
        const next = new Date(year, month + 1, 1);
        renderCalendar(next);
    };
    // Default info
    renderCalendarInfo(`${year}-${month + 1}-${selectedDay}`);
}

function renderCalendarInfo(dateStr) {
    // Dữ liệu mẫu, bạn có thể thay bằng API hoặc dữ liệu động
    const info = getFengshuiInfo(dateStr);
    document.getElementById('fs-calendar-info').innerHTML = `
    <div class='fs-info-box'>
      <div class='fs-info-date'>
        <div class='fs-info-date-big'>${info.day}</div>
        <div>
          <div><b>Tháng ${info.month} năm ${info.year}</b></div>
          <div>${info.weekday}, ${info.dateStr}</div>
          <div>${info.lunar}</div>
          <div>${info.sao}</div>
          <div>${info.hoangdao}</div>
        </div>
      </div>
      <div class='fs-info-section'><b>Giờ hoàng đạo:</b> ${info.giohoangdao}</div>
      <div class='fs-info-section'><b>Việc nên làm:</b><br>${info.viecklenam}</div>
      <div class='fs-info-section'><b>Việc nên tránh:</b><br>${info.vieckhongnen}</div>
    </div>
  `;
}

function getFengshuiInfo(dateStr) {
    // Dữ liệu mẫu, có thể mở rộng hoặc lấy từ API
    const d = new Date(dateStr);
    const weekdays = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    return {
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear(),
        weekday: weekdays[d.getDay()],
        dateStr: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
        lunar: 'Đinh Dậu/Nhâm Ngọ/Ất Tỵ',
        sao: 'Sao chuẩn: Trực Định',
        hoangdao: 'Ngày Hoàng đạo: Minh Đường',
        giohoangdao: 'Tý: 23-1, Dần: 3-5, Mão: 5-7, Ngọ: 11-13, Mùi: 13-15',
        viecklenam: 'Nghỉ thương quan, an sàng, an táo, tu trạch, tạo trạch, nhập trạch cát; đi dời, xuất hành, khai thị, khai thương, cầu tài, tạo tặng; cưới hỏi, nhập trạch, thăng chức, xuất hành (hóa giải các sao xấu: Giác, Khuê, Ngưu, Đẩu, Tinh, Cang);',
        vieckhongnen: 'Tạo tác, an môn, táng mai tốn nhân đinh;'
    };
}

// CSS sẽ được thêm vào service.html 