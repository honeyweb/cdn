var client_logo_template = '<li class="client-logo" style="width:{{width}}px; height:{{height}}px;"><img src="{{path}}"></li>';

var client_logos = [
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/1.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/2.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/3.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/4.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/5.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/6.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/7.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/8.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/9.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/10.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/11.png",
    "https://honeyweb.github.io/cdn/images/msmarcom/clients/12.png",
];

var width = 143;
var height = 100;
var adjusted_width;
var total_width;
var hidden_logos_count;

function width_adjustment(){
    var sh = screen.height;
    var sw = screen.width;
    adjusted_width = (sw-100) / Math.floor((sw-100)/width);
    total_width = client_logos.length * adjusted_width;
    hidden_logos_count = client_logos.length - Math.floor((sw-100)/width) + 1;
}
width_adjustment();

function client_logos_view(){
    var str= '<ul class="client-logos" style="width:{{width}}px; height:{{height}}px;">';
    str = str.replace("{{width}}", total_width);
    str = str.replace("{{height}}", height);
    var client_logo="";
    for (var i = 0; i < client_logos.length; i++) {
        client_logo = client_logo_template.replace("{{width}}", adjusted_width);
        client_logo = client_logo.replace("{{height}}", height);
        client_logo = client_logo.replace("{{path}}", client_logos[i]);
        str = str + client_logo;
    }
    $("#client-logos-outer").html(str + '</ul>');
}
client_logos_view();

var c = 0;
function carousel() {
    c=c+1;
    $(".client-logos").css({transform: "translate3d(-"+String(adjusted_width* (c % hidden_logos_count))+"px, 0px, 0px)"});
    setTimeout(carousel, 2000); // Change image every 2 seconds
}
carousel();