/*
		now:当前的页数
		all:总页数
		len:一页生成多少个
	*/
//	pageFn({
//		now:5,
//		all:20,
//		len:5,
//		parent:page,
//		callback:function(data){
//			alert(data);
//		}
//	});

var pageFn = (json) => {

		const now = json.now;
		const len = json.len;
		const all = json.all;
		const callback = json.callback;
		//为偶数的时候，如果不加1，那么会乱序（多加一个）
		const mid = len%2?Math.ceil(len/2):(Math.ceil(len/2)+1);
		const parent = json.parent;
		parent.innerHTML = '';
		//console.log(mid)
		
		/*
			一页有5个
			总页数为7
			当前页数为4
			结果应该为 : 23456
			
			5个的中间值为3，如果当前的页数小于等于中间值 如:{
				now:1 <= mid:3 -> 12345
				now:2 <= mid:3 -> 12345
				now:3 <= mid:3 -> 12345
			}else{
				now:4 > mid:3 -> 23456
				now:5 > mid:3 -> 34567
				
			}
			
			
		*/
		
		if(all < now || all < len){
			for(var i=1;i<=all;i++){
				var oA = document.createElement('a');
				oA.href = 'javascript:;';
				oA.innerHTML = i;
				if(i == now){
					oA.className = 'active';
				}
				parent.appendChild(oA);
			}
		}else{
			if(now <= mid){
			for(var i=1;i<=len;i++){
				var oA = document.createElement('a');
				oA.href = 'javascript:;';
				oA.innerHTML = i;
				if(i == now){
					oA.className = 'active';
				}
				parent.appendChild(oA);
			}
		}else{
			
			/*
				now:4 > mid:3 -> 23456
				
				now - mid + i
				
				4 - 3 + 1 = 2
				4 - 3 + 2 = 3
				4 - 3 + 3 = 4
			*/
			
			for(var i=1;i<=len;i++){
				var oA = document.createElement('a');
				oA.href = 'javascript:;';
				
				// 7     3 4 5 6 7
				//6+3
				/*
					now > (all - mid + 1)   7-3+1  6
					
					6  -> 3 4 5 6 7  ->  7-5+i (all - len + i) 
					
					2+1  3 4
					
					now = all-mid+1
					
				*/
				if(now > (all - mid + 1)){
					oA.innerHTML = (all - len + i);
					if(now == (all - len + i)){
						oA.className = 'active';
					}
				}else{
					oA.innerHTML = (now - mid + i);
					if(now == (now - mid + i)){
						oA.className = 'active';
					}
				}
				parent.appendChild(oA);
			}
		}
		}
		
		
		
		//点击;
		parent.onclick = function(ev){
			if(ev.target.tagName == 'A'){
				callback((ev.target.innerHTML)*1);
				pageFn({
					now:(ev.target.innerHTML)*1,
					all:all,
					len:len,
					parent:page,
					callback:callback
				});
				
				//console.log(ev.target.innerHTML)
			}
		}
		
	}