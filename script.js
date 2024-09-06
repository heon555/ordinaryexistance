document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);
});

document.getElementById('add-post-btn').addEventListener('click', () => {
    document.getElementById('upload-section').classList.toggle('hidden');
});

document.getElementById('submit-btn').addEventListener('click', () => {
    const password = document.getElementById('password').value;
    const musicTitle = document.getElementById('music-title').value;
    const musicContent = document.getElementById('music-content').value;

    // 비밀번호 확인
    if (password !== "0122") {
        alert("Incorrect password!");
        return;
    }

    const now = new Date();
    const postDateString = `${now.getFullYear()}-${('0' + (now.getMonth() + 1)).slice(-2)}-${('0' + now.getDate()).slice(-2)} ${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`;

    const post = {
        title: musicTitle,
        content: musicContent,
        uploadDate: postDateString
    };

    addPost(post);
    savePost(post);
    clearForm();
});

// localStorage에 게시글 저장
function savePost(post) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter(p => p.uploadDate !== post.uploadDate);
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

// 페이지 로드 시 저장된 게시글 불러오기
function loadPosts() {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)); // 최신 순서로 정렬
    const postsList = document.getElementById('posts');
    postsList.innerHTML = ''; // 게시물 목록을 비우고 새로 추가
    posts.forEach(post => addPost(post));
}

function addPost(post) {
    const postsList = document.getElementById('posts');
    const postItem = document.createElement('li');
    postItem.className = 'post';

    postItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <p>Upload Date: ${post.uploadDate}</p>
    `;
    
    postsList.appendChild(postItem);
}

function clearForm() {
    document.getElementById('password').value = "";
    document.getElementById('music-title').value = "";
    document.getElementById('music-content').value = "";
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => post.classList.toggle('dark-mode'));
}
