function showMessage(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ
    alert("送信しました"); // メッセージを表示
    return false; // フォーム送信をキャンセル
}