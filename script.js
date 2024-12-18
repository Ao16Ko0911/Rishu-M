// ページが読み込まれたときに実行したい処理
window.addEventListener('DOMContentLoaded', (event) => {
        // URLからクエリパラメータを取得
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCourseName = urlParams.get('selectedCourseName');

          // course_name_display に選択された科目名を表示
        const courseNameDisplay = document.getElementById('course_name_display');
        courseNameDisplay.textContent = `科目名: ${selectedCourseName}`;  // 科目名を表示

        fetchReviews();
});

// 投稿ボタンを押したときの処理
function submitReview() {
    // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCourseIndex = urlParams.get('selectedCourseIndex');
    courseId = parseInt(selectedCourseIndex, 10) + 1;
    
    const userId = document.getElementById("user_id").value;//こいつはいったんそのまま
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    // POSTリクエストを送信 POSTはサーバにデータを送信するメソッド
    fetch('https://192.168.92.47:5000/submit_review', {
        method: 'POST',
        headers: {                               
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({                       //このbodyがサーバーに送信するデータ 
            course_id: courseId,                    //JSON.stringifyでJSON形式に変換している
            user_id: userId,                          //教科id,ユーザid,評価,コメント
            rating: rating,
            comment: comment
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {                                //data.messageがnullかどうかで判断する
            alert(data.message);                             // サーバーのレスポンスをアラートで表示
            document.getElementById("reviewForm").reset();          // フォームをリセット
            fetchReviews();                                    // 口コミ一覧を再表示
        } else {
            alert('エラーが発生しました: ' + data.error);      // エラーメッセージ
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("エラーが発生しました");
    });
}

// 特定の教科の口コミを取得して表示する関数
function fetchReviews() {
        // URLからクエリパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCourseIndex = urlParams.get('selectedCourseIndex');
    courseId = parseInt(selectedCourseIndex, 10) + 1;

    if (!courseId) {//教科IDが入力されてない場合
        alert("教科IDを入力してください。");
        return;
    }
    
    //GETはデータを取得するメソッド
    fetch(`https://192.168.92.47:5000/reviews/${courseId}`, {
        method: 'GET',
    })
    .then(response => response.json())                           //ここでjson形式のデータをjavascriptのオブジェクトに変換
    .then(data => {                                                //ここでdataの中身は口コミの配列になっている
        const reviewsDiv = document.getElementById("reviews");             //HTMLページ内のid="reviews"が設定されている用をを取得
        reviewsDiv.innerHTML = "";                      // 既存の口コミをクリア　これは新しい口コミを表示するため

        if (data.length === 0) {                                   //ここは口コミがなかった場合
            reviewsDiv.innerHTML = "<p>口コミがありません。</p>";
            return;
        }

        data.forEach(review => {                                  //forEachは配列の各要素に指定された処理を実行する
            const reviewElement = document.createElement("div");     //divタグを新しく作成し、これは一つの口コミを表示するためのコンテナ
            reviewElement.style.border = "1px solid #ccc";           //これらの行は、reviewElementに対してCSSスタイルを設定している
            reviewElement.style.margin = "10px";
            reviewElement.style.padding = "10px";


            reviewElement.innerHTML = `
                <p><strong>評価:</strong> ${review.rating} / 5</p>
                <p><strong>コメント:</strong> ${review.comment}</p>
                <p><strong>投稿日:</strong> ${review.created_at}</p>
            `;//この行でdivに追加していく

            reviewsDiv.appendChild(reviewElement);                      //ここでreviewsDivにreviewElementを追加
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert("口コミの取得中にエラーが発生しました" + error.message);
    });
}
