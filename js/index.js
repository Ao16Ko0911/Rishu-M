// ハンバーガーメニューの表示・非表示
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const isVisible = menu.style.display === 'block';
    menu.style.display = isVisible ? 'none' : 'block';
  
    // メニューを表示するときだけクリックイベントを追加
    if (!isVisible) {
      document.addEventListener('click', closeMenuOnOutsideClick);
    }
    
  }
  
  // メニュー以外をクリックしたら閉じる処理
  function closeMenuOnOutsideClick(event) {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
      menu.style.display = 'none';
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  }
  
  // 検索条件の処理 検索ボタンを押したときにする処理
  function search() {
    const grade = document.getElementById('grade').value;
    const term = document.getElementById('term').value;
    const subjectDropdown = document.getElementById('subject');
    const subject = subjectDropdown.value; // 選択された科目名（value）を取得
    const subjectText = subjectDropdown.options[subjectDropdown.selectedIndex].text; // 選択された科目のテキストを取得
  
    let index = global_index + document.getElementById('subject').selectedIndex - 1;
    // index と 科目名 をアラートで表示
    alert(`検索結果\nindex: ${index}\n科目名: ${subjectText}`);


    // subject.html に遷移
    const url = `./subject.html?selectedCourseIndex=${index}&selectedCourseName=${encodeURIComponent(subjectText)}`;
    window.location.href = url;

  }

  let global_index = 0;  // グローバル変数として定義
  
  // 学年と講義期間に応じて講義一覧を動的に変更
  function updateCourseList() {
    const grade = document.getElementById('grade').value;
    const term = document.getElementById('term').value;
    const courseDropdown = document.getElementById('subject');
    const MAX_LENGTH = 25; //一つのシーズンの最大の科目数
  
    // 講義データを定義
    const courseData = {
      "1年生": {
        前期: ["英語コミュニケーション1", "ドイツ語1","フランス語1","中国語1","体育科学1","人文科学基礎1","社会科学基礎1","基礎ゼミナール1","微分積分1","線形代数1","物理学1","物理学実験1","化学1","化学実験1","理工学概論","コンピュータリテラシー","情報工学の世界","情報工学基礎演習","マルチメディア基礎","離散数学","プログラミング演習1"],
        後期: ["英語コミュニケーション2", "ドイツ語2","フランス語2","中国語2","体育科学2","人文科学基礎2","社会科学基礎2","基礎ゼミナール2","微分積分2","線形代数2","物理学2","物理学演習","物理学実験2","化学2","化学実験2","テクニカルリテラシー","プラクティカルICT","情報通信ネットワーク","コンピュータアーキテクチャ1","プログラミング演習2","創造的思考法","確率統計"],
      },
      "2年生": {
        前期: ["英語コミュニケーション3", "ドイツ語3","フランス語3","中国語3","体育科学3","アジア文化論1","欧米文化論1","ディジタル回路1","電気電子回路1","ディジタル信号処理1","アルゴリズム・データ構造","オペレーティングシステム","データベース","電磁気学","データサイエンス基礎","プログラミング演習3","情報工学実験1","研究開発リテラシー"],
        後期: ["英語コミュニケーション4", "ドイツ語4","フランス語4","中国語4","体育科学4","アジア文化論2","欧米文化論2","技術者倫理","情報理論","ディジタル回路2","ディジタル信号処理2","ソフトウェア工学","言語・オートマトン","画像処理","応用解析","プログラミング演習4","情報工学実験2","アプリケーション開発","PBL概論"],
      },
      "3年生": {
        前期: ["プラクティカル・イングリッシュ1","国際経済論","心理学","情報セキュリティ","コンピュータアーキテクチャ2","電気電子回路2","システム制御","人工知能","数値解析","コンパイラ","コンピュータグラフィックス","キャリアゼミナール","情報工学総合ゼミナール","先進プロジェクト実験1"],
        後期: ["プラクティカル・イングリッシュ2","国際関係論","文学","情報通信システム","信号伝送論","フィジカルコンピューティング","ハードウェア言語記述論","プログラミング言語論","パターン認識","コンピュータビジョン","慣性情報処理","音声・音響信号処理","キャリアゼミナール","研究ゼミナール","情報技術の応用と職業"],
      },
      "4年生": {
        前期: ["符号理論","ワイヤレス通信","センサ工学","集積回路設計","応用アルゴリズム","数理計画法","バーチャルリアリティ","言語情報処理"],
        後期: ["卒業研究"],
      },
    };
  
    // 学年の数値を「1年生」などの文字列に変換
    const gradeLabel = `${grade}年生`;
  
    // 現在の選択肢をクリア
    courseDropdown.innerHTML = '<option value="">--未選択--</option>';
  
    // 選択された学年と講義期間に応じた講義を追加
    if (gradeLabel in courseData && term in courseData[gradeLabel]) {
      courseData[gradeLabel][term].forEach(course => {
        const option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseDropdown.appendChild(option);
      });
    }
    //配列の最大値を取得
    const index = MAX_LENGTH * (grade -1);
    if(term == "後期"){
      index += MAX_LENGTH;
    }
    global_index = index;

  }

  
  