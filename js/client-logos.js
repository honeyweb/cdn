$(function() {

    var model = {
        lastID: 0,
        pizzas: [],
        client_logos: [
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
        ],
        client_logo_template:'<li class="client-logo"><img src="%data%"></li>',
    };

    var controller = {

        getClientLogos: function() {
            return model.client_logos;
        },

        init: function() {
            view.init();
        }
    };

    var view = {
        init: function() {
            this.$client_logos = $('.client-logos');
            this.client_logo_template = model.client_logo_template;
            this.render();
            this.animate();
        },

        render: function() {
            var $client_logos = this.$client_logos,
            client_logo_template = this.client_logo_template;

            $client_logos.html('');
            controller.getClientLogos().forEach(function(client_logo) {
                var thisTemplate = client_logo_template.replace("%data%", client_logo);
                $client_logos.append(thisTemplate);
            });
        }

        animate: function(){
            var $client_logos = this.$client_logos,
            var x = 143;
            c=c+1;
            $client_logos.css({transform: "translate3d(-"+String(x* (c % 3))+"px, 0px, 0px)"});
            setTimeout(this.animate(), 2000); // Change image every 2 seconds
        }
    };

    controller.init();
}());
