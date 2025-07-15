let arrangeChatTurn = 0;
const arrangeChatBody = () => document.getElementById('arrange-chat-body');
const arrangeChatForm = () => document.getElementById('arrange-chat-form');
const arrangeChatInput = () => document.getElementById('arrange-chat-input');
const arrangeChatImageBtn = () => document.getElementById('arrange-chat-image-btn');
const arrangeChatUpload = () => document.getElementById('arrange-chat-upload');

function appendArrangeMsg(msg, type = 'user') {
    const div = document.createElement('div');
    div.className = type === 'ai' ? 'ai-msg' : 'user-msg';
    div.innerText = msg;
    arrangeChatBody().appendChild(div);
    arrangeChatBody().scrollTop = arrangeChatBody().scrollHeight;
}

function appendArrangeImg(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.className = 'chat-img-preview';
        arrangeChatBody().appendChild(img);
        arrangeChatBody().scrollTop = arrangeChatBody().scrollHeight;
    };
    reader.readAsDataURL(file);
}

function arrangeReplyDemo(userMsg) {
    // Demo trả lời, bạn thay bằng gọi API thực tế
    const replies = [
        'Bạn muốn sắp xếp phòng nào? Hãy gửi hình ảnh hoặc mô tả chi tiết.',
        'Tôi có thể tư vấn bố trí phòng khách, phòng ngủ, bàn làm việc... Bạn cần hỗ trợ gì?',
        'Đây là gợi ý mẫu. Nếu muốn tạo hình ảnh sắp xếp, hãy nhấn nút bên dưới.'
    ];
    let reply = replies[arrangeChatTurn % replies.length];
    setTimeout(() => {
        appendArrangeMsg(reply, 'ai');
        if (arrangeChatTurn >= 3) arrangeChatImageBtn().style.display = 'block';
    }, 700);
}

function sendArrangeToAPI(userMsg, cb) {
    // Hàm này để bạn kết nối API thực tế
    // cb(responseText)
    arrangeReplyDemo(userMsg);
}

if (arrangeChatForm()) {
    arrangeChatForm().onsubmit = function (e) {
        e.preventDefault();
        const msg = arrangeChatInput().value.trim();
        if (!msg) return;
        appendArrangeMsg(msg, 'user');
        arrangeChatInput().value = '';
        arrangeChatTurn++;
        arrangeChatImageBtn().style.display = 'none';
        sendArrangeToAPI(msg);
        return false;
    };
}
if (arrangeChatUpload()) {
    arrangeChatUpload().onchange = function (e) {
        if (e.target.files && e.target.files[0]) {
            appendArrangeImg(e.target.files[0]);
            arrangeChatTurn++;
            arrangeChatImageBtn().style.display = arrangeChatTurn >= 6 ? 'block' : 'none';
        }
    };
}
// Reset chat turn khi mở lại popup
window.openArrangeChat = function () {
    document.getElementById('arrange-chat-overlay').style.display = 'flex';
    setTimeout(() => { document.getElementById('arrange-chat-input').focus(); }, 200);
    arrangeChatBody().innerHTML = '';
    arrangeChatTurn = 0;
    arrangeChatImageBtn().style.display = 'none';
};
window.closeArrangeChat = function () {
    document.getElementById('arrange-chat-overlay').style.display = 'none';
}; 