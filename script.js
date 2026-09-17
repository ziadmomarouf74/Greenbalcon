const filterItems = document.querySelectorAll('.item');
const searchInput = document.querySelector('.search input');
const allCards = document.querySelectorAll('.card');

function showCard(card) {
    card.style.display = 'block';
}

function hideCard(card) {
    card.style.display = 'none';
}

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('filter');

        allCards.forEach(card => {
            const match = category === 'all' || card.getAttribute('datacategory') === category;
            match ? showCard(card) : hideCard(card);
        });
    });
});

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const value = searchInput.value.trim();

        allCards.forEach(card => {
            const name = card.querySelector('.cardinfo h3').textContent;
            name.includes(value) ? showCard(card) : hideCard(card);
        });
    });
}

const boxbtn = document.getElementById('boxbtn');
const fileinput = document.getElementById('fileinput');

boxbtn.addEventListener('click', () => fileinput.click());

fileinput.addEventListener('change', () => {
    if (fileinput.files.length > 0) {
        boxbtn.innerHTML = '<span>تم إرفاق الصورة</span>';
        boxbtn.classList.add('filled');
    }
});

const submitbtn = document.getElementById('submitquestionbtn');
const titleinput = document.getElementById('titleinput');
const detailsinput = document.getElementById('detailsinput');
const questionscontainer = document.getElementById('questionscontainer');

submitbtn.addEventListener('click', () => {
    const title = titleinput.value.trim();
    const details = detailsinput.value.trim();

    if (!title || !details) {
        alert('رجاءً اكتب عنوان وتفاصيل السؤال أولاً قبل النشر!');
        return;
    }

    alert('تم ارسال سؤالك بنجاح!');

    const html = `
        <div class="questioncard" style="border: 2px solid #a8b872;">
            <div class="questionheader">
                <h4 class="qtitle">${title}</h4>
                <div class="userinfo"><strong>User</strong></div>
            </div>
            <div class="expertanswer" style="background-color: #f5f5f5; color: #666;">
                <strong>في انتظار إجابة الخبراء...</strong><br>
                ${details}
            </div>
        </div>
    `;

    questionscontainer.insertAdjacentHTML('beforeend', html);

    titleinput.value = '';
    detailsinput.value = '';
    fileinput.value = '';
    boxbtn.innerHTML = '<span>إرفاق صورة للنبتة (اختياري)</span>';
    boxbtn.classList.remove('filled');
});