$(document).ready(function() {
    var error = new URLSearchParams(window.location.search).get('error');
    if (error) {
        // 認証失敗時にアラートを表示
        alert('Invalid username or password');
    }
});