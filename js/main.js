window.onload = function (){
  imgLocation("container","box");
  let imgData = {"data":[{"src":"cat1.jpeg"},{"src":"cat2.png"},{"src":"cat3.jpeg"},{"src":"cat4.jpg"},{"src":"cat5.jpg"},{"src":"dog1.jpeg"},{"src":"dog2.jpeg"},{"src":"cat6.jpeg"}]};
  window.onscroll = function (){
    if(checkFlag()){
      let cparent = document.getElementById("container");
      for (let i = 0; i < imgData.data.length; i++){
        let ccontent = document.createElement("div");
        ccontent.className = "box";
        cparent.appendChild(ccontent);
        let boximg = document.createElement("div");
        boximg.className = "box_img";
        ccontent.appendChild(boximg);
        let img = document.createElement("img");
        img.src = "./img/" + imgData.data[i].src;
        boximg.appendChild(img);
        console.log(i);
        imgLocation("container","box");
      }
    }
  }
};

function checkFlag(){
  let cparent = document.getElementById("container");
  let ccontent = getChildElement(cparent,"box");
  let lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
  let scrollTop = document.documentElement.scrollTop;
  if(scrollTop + document.documentElement.clientHeight > lastContentHeight){
    return true;
  };
};

function imgLocation(parent,content){
  let cparent = document.getElementById(parent);
  let ccontent = getChildElement(cparent,content);
  let imgWidth = ccontent[0].offsetWidth;
  let cols = Math.floor(document.documentElement.clientWidth/imgWidth)
  cparent.style.cssText = "width:" + imgWidth * cols + "px;";
  let boxHeightArr = [];
  for (let i = 0; i < ccontent.length; i++){
    if(i < cols){
      boxHeightArr.push(ccontent[i].offsetHeight);
    }else{
      let minImgHeight = Math.min.apply(null,boxHeightArr);
      let minImgLocation = getMinImgLocation(boxHeightArr,minImgHeight);
      let minImgWidth = ccontent[minImgLocation].offsetLeft;
      ccontent[i].style.position = "absolute";
      ccontent[i].style.top = minImgHeight + "px";
      ccontent[i].style.left = minImgWidth + "px";
      boxHeightArr[minImgLocation] = boxHeightArr[minImgLocation] + ccontent[i].offsetHeight;
    }
  }
};

function getMinImgLocation(boxHeightArr,minImgHeight){
  for(let i in boxHeightArr){
    if(boxHeightArr[i] == minImgHeight){
      return i;
    }
  }
};

function getChildElement(parent,content){
  let contentArr = [];
  let allcontent = parent.getElementsByTagName("*");
  for (let i = 0; i < allcontent.length; i++){
    if(allcontent[i].className == content){
      contentArr.push(allcontent[i]);
    }
  };
  return contentArr;
};
