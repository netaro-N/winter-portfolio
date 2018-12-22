'use strict';
import $ from 'jquery';
const block = $('#block');
const scalingButton = $('#scaling-button');
const movingButton = $('#moving-button');
const tumblingButton = $('#tumbling-button');

scalingButton.click(() => {
  block.animate({ width: '200pt', height: '200pt' }, 2000);
  block.animate({ width: '100pt', height: '100pt' }, 2000);
});

movingButton.click(() => {
  block.animate({ 'marginLeft': '500px'},1000);
  block.animate({ 'marginLeft': '20px'},500);
});

// 2018/12/18 これを↑にはめ込んで、手裏剣アニメーション作ろう
tumblingButton.click(() => {
  block.animate(
    {zIndex:1},{
      //1秒かけてアニメーション
      duration:1000,
      //stepは、アニメーションが進むたびに呼ばれる
      step:function(now){
        //nowに現在のz-indexの値（0から1に変化しているところ）が渡してもらえる
        //0から1に向かって変化していくnowを利用して3回転（1080度）させてみる
        $(this).css({transform:'rotate(' + (now * 1080) + 'deg)'});
      },
      //終わったら
      complete:function(){
        //次のために、元に戻しておく
        block.css('zIndex', 0);
      }
    }
  );
});