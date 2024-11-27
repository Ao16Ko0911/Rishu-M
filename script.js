// 口コミを投稿する関数
function submitReview() {
    const courseId = document.getElementById("course_id").value;
    const userId = document.getElementById("user_id").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    // 入力チェック
    if (!courseId || !userId || !rating || !comment) {
        alert("すべてのフィールドを入力してください。");
        return;
    }

    // POSTリクエストを送信
    fetch('http://127.0.0.1:5000/submit_review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            course_id: courseId,
            user_id: userId,
            rating: rating,
            comment: comment
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // 成功メッセージ
            document.getElementById("reviewForm").reset(); // フォームをリセット
            fetchReviews(); // 口コミ一覧を再表示
        } else {
            alert('エラーが発生しました: ' + data.error); // エラーメッセージ
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("エラーが発生しました");
    });
}

// 特定の教科の口コミを取得して表示する関数
function fetchReviews() {
    const courseId = document.getElementById("view_course_id").value;

    if (!courseId) {//教科IDが入力されてない場合
        alert("教科IDを入力してください。");
        return;
    }

    fetch(`http://localhost:5000/reviews/${courseId}`, {
        method: 'GET',
    })
    .then(response => response.json()) //ここでjson形式のデータをjavascriptのオブジェクトに変換
    .then(data => { //ここでdataの中身は口コミの配列になっている
        const reviewsDiv = document.getElementById("reviews");//HTMLページ内のid="reviews"が設定されている用をを取得
        reviewsDiv.innerHTML = ""; // 既存の口コミをクリア　これは新しい口コミを表示するため

        if (data.length === 0) { //ここは口コミがなかった場合
            reviewsDiv.innerHTML = "<p>口コミがありません。</p>";
            return;
        }

        data.forEach(review => { //forEachは配列の各要素に指定された処理を実行する
            const reviewElement = document.createElement("div"); //divタグを新しく作成し、これは一つの口コミを表示するためのコンテナ
            reviewElement.style.border = "1px solid #ccc";//これらの行は、reviewElementに対してCSSスタイルを設定している
            reviewElement.style.margin = "10px";
            reviewElement.style.padding = "10px";


            reviewElement.innerHTML = `
                <p><strong>評価:</strong> ${review.rating} / 5</p>
                <p><strong>コメント:</strong> ${review.comment}</p>
                <p><strong>投稿日:</strong> ${review.created_at}</p>
            `;//この行でdivに追加していく

            reviewsDiv.appendChild(reviewElement);//ここでreviewsDivにreviewElementを追加
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert("口コミの取得中にエラーが発生しました");
    });
}
