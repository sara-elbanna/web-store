$(function(){


// product objects
	var products = {
		books :[
			// {
			// 	type:"book"
			// },
			{
				name:"Algebra" ,
				category:"Math" ,
				picture_url:"images/books/2.jpg",
				price : 50,
				selling_points:["point1","point2", "point3"]
			},
			{
				name:"Calculus" ,
				category:"math" ,
				picture_url:"images/books/1.jpg",
				price : 7,
				selling_points:["point1","point2", "point3"]
			},
			{
				name:"Biology" ,
				category:"science" ,
				picture_url:"images/books/3.jpg",
				price : 7,
				selling_points:["point1","point2", "point3"]
			},
			{
				name:"Python" ,
				category:"programming" ,
				picture_url:"images/books/3.jpg",
				price : 7,
				selling_points:["point1","point2", "point3"]
			}
		],
		musics : [	
			// {
			// // 	type:"music"
			// // },	
			{
				name:"musicname1" ,
				category:"rap" ,
				picture_url:"images/musics/1.png",
				price : 5,
				selling_points:["m","point2", "point3"]
			},
			{
				name:"musicname2" ,
				category:"relax" ,
				picture_url:"images/musics/2.png",
				price : 7,
				selling_points:["point2","point2", "point3"]
			},
			{
				name:"musicname3" ,
				category:"relax" ,
				picture_url:"images/musics/2.png",
				price : 7,
				selling_points:["point2","point2", "point3"]
			}
		]		
	}

// Search Field
	$(".navLinks input.search").keyup(function(){
		var keyword = $(this).val();
		if(keyword != ""){
			filter(keyword)
		}		
	})

	function filter(word){
		var newArray=[];
		var filteredProducts={};
		var re = new RegExp(word,"i","g")
		for(product in products){
			newArray= products[product].filter(function (el) {
				if(el.category && el.name && el.selling_points){
					function checkPoints(array) {
						var flag = false;
						for(var i = 0 ; i < array.length ; i++){
							if(array[i].search(re) > -1){return true;}
						}
					}
					return el.category.search(re) > -1 | el.name.search(re)>-1 | checkPoints(el.selling_points);
				}
				
			});
			filteredProducts[product]=newArray
		}
		$(".content .container").empty()
		appendAll(filteredProducts)
		//console.log(filteredProducts)
		// for(filtered in filteredProducts){
		// 	appendToPage(filtered , filteredProducts[filtered] )
		// }
		//$(".box").parent().removeClass("row")
	}


// Fill menue 
	function fill_menu_list(){
		$(".navbar  ul.dropdown-menu .products ul").empty();
		for(product in products){
			$(".navbar  ul.dropdown-menu .products ul").append("<li class="+"'"+product+"'"+"><a href='#'>"+product+"</a></li>")
		}
	}
	fill_menu_list()
	
	
// append products to content
	function appendToPage(product_category,product_object){
		var type = product_category.slice(0,product_category.length-1)
		$(".content .container").append($("<div class="+"'"+product_category+" row current'>"));
		for (var i = 0; i < product_object.length; i++) {
			var id = product_object[i].name; 
			if(i % 3 == 0 && i != 0){
				$(".content .container .row").removeClass("current");
				$(".content .container").append($("<div class="+"'"+product_category+" row current'>"));
			}
			$(".content .container .current."+product_category+"").append($("<div id="+"'"+id+"'"+"class="+"'"+type+" col-md-4 box' >")
						.html($("<div class='name'>")
							.html("<h4>Name :</h4><p>"+product_object[i].name+"</p>"))
						.append($("<div class='category'>")
							.html("<h4>Category :</h4><p>"+product_object[i].category+"</p>"))
						.append($("<div class='price'>")
							.html("<h4>Price :</h4><p>"+"$ "+product_object[i].price+"</p>"))
						.append($("<div class='selling-points'>")
							.html("<h4>Selling Points :</h4><span>"+product_object[i].selling_points[0]+"</span><span>"+product_object[i].selling_points[1]+"</span><span>"+product_object[i].selling_points[2]+"</span>"))
						.append($("<div class='picture'>")
							.html("<img src ="+product_object[i].picture_url+" style='width: 140px;height: 120px'>"))
					);

			
		} //for
	}

	
// Menu links click
	$(".navbar  ul.dropdown-menu ").on("click","li",function(e){
		e.preventDefault();
		$(".content .container").empty();
		for(product in products){
			if($(this).hasClass(product)){
				appendToPage(product , products[product] )
			}
		}
		if($(this).hasClass("all")){
			appendAll(products)
			//$(".box").parent().removeClass("row")
		}		
	})

// Add New Products
	var newtitle, newtype, newname, newcategory, newphoto, newprice;

	function assign_new_values(){
		newtype = $('#ptype').val();
		// newtype = $('#ptype').val();
		newname = $('#pname').val();
		newcategory = $('#pcategory').val();
		newphoto = $('#pphoto').val();
		newprice = $('#pprice').val();
		newpoint1= $('#pselling1').val();
		newpoint2= $('#pselling2').val();
		newpoint3= $('#pselling3').val();
	}
	$(".dropdownForm button.add").click(function(e){
		e.preventDefault()
		assign_new_values();
		if(products[newtype]){
				products[newtype].push({name:newname ,
				category:newcategory ,
				picture_url: newphoto ||"images/not-found.png",
				price : newprice,
				selling_points:[newpoint1,newpoint1,newpoint3]})

		}
		else{
			products[newtype] =[
					{
						name:newname ,
						category:newcategory,
						picture_url: newphoto || "images/not-found.png",
						price : newprice,
						selling_points:[newpoint1,newpoint1,newpoint3]
					}
				]
				
			}
			
		$(".content .container").empty();
		appendToPage(newtype , products[newtype]);
		//$(".box").parent().removeClass("row")
		//$(".navbar  ul.dropdown-menu .products ul").append("<li class="+"'"+newtitle+"'"+"><a href='#'>"+newtitle+"</a></li>")
		fill_menu_list();
		//$(".navbar  ul.dropdown-menu .products ul li."+newtitle+" ")
	})

// show all products
	function getSize(products){
		var size=0;
		for(p in products){
			size+=products[p].length
		}
		return size
	}
	function appendAll(products){
		$(".content .container").append($("<div class='row current'>"));
		var i = 0;
		var q;
		var size = getSize(products);
		for(p in products){
			q=0;
			while(i<size){
				if(i % 3 == 0 && i != 0){
					$(".content .container .row").removeClass("current");
					$(".content .container").append($("<div class= 'row current'>"));
				}
				if(q==products[p].length){break;}
				$(".content .container .row.current").append($("<div class= 'col-md-4 box' >")
							.html($("<div class='name'>")
								.html("<h4>Name :</h4><p>"+products[p][q].name+"</p>"))
							.append($("<div class='category'>")
								.html("<h4>Category :</h4><p>"+products[p][q].category+"</p>"))
							.append($("<div class='price'>")
								.html("<h4>Price :</h4><p>"+"$ "+products[p][q].price+"</p>"))
							.append($("<div class='selling-points'>")
								.html("<h4>Selling Points :</h4><span>"+products[p][q].selling_points[0]+"</span><span>"+products[p][q].selling_points[1]+"</span><span>"+products[p][q].selling_points[2]+"</span>"))
							.append($("<div class='picture'>")
								.html("<img src ="+products[p][q].picture_url+" style='width: 140px;height: 120px'>"))
						);
				i++;
				q++;
			}
		}
	}
	//appendAll(products)



});