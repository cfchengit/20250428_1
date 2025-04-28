let capture;
let graphics;
const density = 'Ñ@#W$9876543210?!abc;:+=-,._ '; // 定義字串密度

function setup() {
    // 產生全視窗的畫布，背景顏色為 #dde5b6
    createCanvas(windowWidth, windowHeight);
    background('#dde5b6');

    // 擷取攝影機影像
    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定寬高為視窗大小的 80%
    capture.hide(); // 隱藏原始的 HTML 視訊元素

    // 建立與攝影機影像相同大小的 graphics
    graphics = createGraphics(capture.width, capture.height);
    graphics.textFont('monospace'); // 設定字型
    graphics.textSize(10); // 設定文字大小
    graphics.textAlign(CENTER, CENTER); // 文字置中
}

function draw() {
    // 將畫布背景設為 #dde5b6
    background('#dde5b6');

    // 將攝影機影像左右顛倒後顯示在視窗中間
    push();
    translate(width / 2, height / 2); // 將原點移到畫布中心
    scale(-1, 1); // 左右翻轉影像
    image(capture, -capture.width / 2, -capture.height / 2, capture.width, capture.height);
    pop();

    // 更新 graphics
    graphics.background(0); // 設定背景為黑色
    for (let x = 0; x < graphics.width; x += 10) {
        for (let y = 0; y < graphics.height; y += 10) {
            // 從攝影機影像中取得顏色
            let col = capture.get(x, y);
            let gray = (red(col) + green(col) + blue(col)) / 3; // 計算灰階值
            let charIndex = floor(map(gray, 0, 255, density.length - 1, 0)); // 將灰階值對應到字串索引
            let char = density.charAt(charIndex); // 取得對應的字符
            graphics.fill(255); // 設定文字顏色為白色
            graphics.noStroke();
            graphics.text(char, x + 5, y + 5); // 在單位格中心繪製字符
        }
    }

    // 將 graphics 顯示在攝影機影像上方
    image(graphics, (width - capture.width) / 2, (height - capture.height) / 2);
}

function windowResized() {
    // 當視窗大小改變時，重新調整畫布大小
    resizeCanvas(windowWidth, windowHeight);
    background('#dde5b6');
}
