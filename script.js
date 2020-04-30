function tampilkanSemuaMenu(){
    $.getJSON('data.json', function (data) {
        let makanan = data.makanan;
        $.each(makanan, function (i, data) {
            $("#daftar-menu").append('<div class="col-md-4"><div class="card mb-3"><img src="img/'+ data.gambar +'"class= "card-img-top" ><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">'+data.harga+'</h5><a href="#" class="btn btn-primary">pesan sekarang</a></div></div ></div>');
        });
    });
}

function SortMenu(command="asc"){
    return function MenuSort(a,b){
        var nameA = a.nama.toLowerCase();
        var nameB = b.nama.toLowerCase();
        var compare = 0;
        if (nameA > nameB){
            compare = 1;
        } else if (nameA < nameB){
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}

function SortPrice(command="asc"){
    return function PriceSort(a,b){
        var priceA = a.harga;
        var priceB = b.harga;
        var compare = 0;
        if (priceA > priceB){
            compare = 1;
        }else if(priceA < priceB){
            compare = -1;
        }
        return (command == "desc" ? compare * -1 : compare);
    }
}

tampilkanSemuaMenu();


$('.nav-link').on('click', function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let Kategori = $(this).html();
    $('h1').html(Kategori);

    if( Kategori == 'All Menu'){
        $('#daftar-menu').html('');
        tampilkanSemuaMenu();
        return;
    }


    $.getJSON('data.json',function(data){
        let makanan = data.makanan;
        let content = '';

        $.each(makanan, function(i,data){
            if(data.kategori == Kategori.toLowerCase()){
                content += '<div class="col-md-4"><div class="card mb-3"><img src="img/'+ data.gambar +'"class= "card-img-top" ><div class="card-body"><h5 class="card-title">'+ data.nama +'</h5><p class="card-text">'+ data.deskripsi +'</p><h5 class="card-title">'+data.harga+'</h5><a href="#" class="btn btn-primary">pesan sekarang</a></div></div ></div>';
                
            }
        });

        $('#daftar-menu').html(content);
        
    });

});

$('.dropdown-menu a').on('click',function(){
    var tempmenu = [];
    var Content = "";
    $('button').text($(this).text());
    $('.dropdown-item').removeClass('active');
    $(this).addClass('active');
    var Category = $("h1").text();
    for (var i = 0; i < menus.length; i ++){
        if (menus[i].Category == Category){
            tempmenu.push(menus[i]);
        }else if (Category == "All Menu"){
            tempmenu.push(menus[i]);
        }
    }
    var sort = $(this).text().toLowerCase();
    if (sort == "nama a-z"){
        tempmenu = tempmenu.sort(SortMenu("asc"));
        $.each(tempmenu, function(z, tempmenus){
            Content += '<div class="col-md-4"><div class="card mb-3"><img src="img/'+ tempmenus.gambar +'"class= "card-img-top" ><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">'+tempmenus.harga+'</h5><a href="#" class="btn btn-primary">pesan sekarang</a></div></div ></div>';
        })
    }else if (sort == "nama z-a"){
        tempmenu = tempmenu.sort(SortMenu("desc"));
        $.each(tempmenu, function(z, tempmenus){
            Content += '<div class="col-md-4"><div class="card mb-3"><img src="img/'+ tempmenus.gambar +'"class= "card-img-top" ><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">'+tempmenus.harga+'</h5><a href="#" class="btn btn-primary">pesan sekarang</a></div></div ></div>';
        })
    }else if (sort == "harga termurah"){
        tempmenu = tempmenu.sort(SortPrice('asc'));
        $.each(tempmenu, function(z, tempmenus){
            Content += '<div class="col-md-4"><div class="card mb-3"><img src="img/'+ tempmenus.gambar +'"class= "card-img-top" ><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">'+tempmenus.harga+'</h5><a href="#" class="btn btn-primary">pesan sekarang</a></div></div ></div>';
        })
    }else if (sort == "harga termahal"){
        tempmenu = tempmenu.sort(SortPrice("desc"));
        $.each(tempmenu, function(z, tempmenus){
            Content += '<div class="col-md-4"><div class="card mb-3"><img src="img/'+ tempmenus.gambar +'"class= "card-img-top" ><div class="card-body"><h5 class="card-title">'+ tempmenus.nama +'</h5><p class="card-text">'+ tempmenus.deskripsi +'</p><h5 class="card-title">'+tempmenus.harga+'</h5><a href="#" class="btn btn-primary">pesan sekarang</a></div></div ></div>';
        })
    }
    $('#daftar-menu').html(Content);
});