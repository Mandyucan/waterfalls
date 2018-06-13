//单独的一个功能，立即执行函数
(function() {
	var oLi = document.getElementsByTagName('li'),
		itemWidth = 200,
		page = 1,
		flag = false;
	function getData() {
		if(!flag) {
			flag = true;
			ajax('GET','./getPics.php', 'cpage=' + page,addDom,true)
		    page ++;
		}
		
	}
	getData();
	function addDom(data){
		var dataList = JSON.parse(data);
		// console.log(dataList);
		dataList.forEach(function (ele,index) {
			var oItem = document.createElement('div'),
				oImg = new Image(), //img可通过create创建，也可以直接new生成
				oP = document.createElement('p'),
				minIndex = getMinList(oLi),
				oBox = document.createElement('div');

			oItem.className = 'item';
			oBox.className = 'box';	

			//由于加载快慢，先将没加载出来的图片位置空出来，
			// itemHeight/itemWidth = height/width;
			// oImg.itemHeight = height/width * itemWidth
			oImg.width = itemWidth;
			oImg.height = ele.height/ele.width * itemWidth;
			oImg.src = ele.preview;
			oP.innerText = ele.title;


			//图片加载失败时  兼容chrome(可以换张图或处理bug)
			//把片宽度和高度变大一点，再将溢出部分隐藏
			oImg.onerror = function () {
				this.style.margin = '-1px';
				this.style.width = '202px';
				this.style.height = ele.height/ele.width * itemWidth + 2 + 'px';
			}

			oItem.appendChild(oBox);
			oBox.appendChild(oImg);
			oItem.appendChild(oP);
			oLi[minIndex].appendChild(oItem); //插到最短的li里
		})
		flag = false;
	}
	//查找最短的li,假设第一个最短
	function getMinList(dom) {
		var minHeight = dom[0].offsetHeight, //存最短的值
		    index = 0; //存最短的值的索引值;
		for(var i = 1; i < dom.length; i++) {
			var h = dom[i].offsetHeight;
			// console.log(minHeight + '-' + h);
			if(h < minHeight) {
				minHeight = h;
				index = i;
			}
		}
		return index;
	}
	// console.log(getMinList());

	//监听鼠标滚轮事件
	window.onscroll = function() {
		var minValue = oLi[getMinList(oLi)].offsetHeight, //获取最小的高度
		    scrollHeight = document.documentElement.scrollTop || document.body.scrollTop ,//滚轮高度
		    pageHeight = document.documentElement.clientHeight || document.body.clientHeight;//渲染区域高度
		if(minValue < scrollHeight + pageHeight) {
			getData();
			
		}
	}
})()