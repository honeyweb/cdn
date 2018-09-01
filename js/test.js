! function(e) {
    "use strict";
    e.Bark = e.Bark || {}, e.Bark.consts = {
        ERR_COMBINED_UPDATES: "BSNE1",
        ERR_APPLY_NOTIFICATIONS: "BSNE2",
        MOBILE_WIDTH_THRESHOLD: 1024,
        MOBILE_MODAL_THRESHOLD: 640,
        ONE_EM_IN_PX: 14,
        PROJECT_STATUS_CLOSED: 2,
        SELLER_PLAN_TYPE_FREE: 3,
        KEY_CODE_ENTER: 13,
        EX_PROJECT_TOO_MANY_RESPONSES: 90101,
        EX_USER_CUSTOMER_EXISTS: 90301,
        EX_EMAIL_EXISTS_IN_USERS: 90302,
        EX_EMAIL_EXISTS_IN_BUYERS: 90303,
        EX_EMAIL_EXISTS_IN_SELLERS: 90304,
        EX_PAYMENT_DECLINED: 90201,
        EX_CREDITS_PURCHASE_LOW: 90202,
        WS_URL: "https://ws.bark.com"
    }
}(this), window.addEventListener("load", function() {
    new FastClick(document.body)
}, !1);
var sellerProfileChanged = !1;

function setupDynamicPostCodeAutocomplete() {
    if (void 0 !== Bark.ENV && "IE" == Bark.ENV.locale) {
        var t;

        function e() {
            var e = t.getPlace();
            $("#postcode_id").val(e.place_id), $("#postcode_type").val("goog")
        }
        a = document.getElementById("postcode-auto"), (t = new google.maps.places.Autocomplete(a, {
            componentRestrictions: {
                country: "ie"
            }
        })).addListener("place_changed", e)
    } else setupAutocomplete($("#postcode-auto"), "/address/", [{
        jqobj: $("#postcode_id"),
        attr: "id"
    }, {
        jqobj: $("#postcode_type"),
        attr: "type"
    }], function(e) {
        return {
            label: e.name,
            match: e.match,
            id: e.id,
            type: e.type
        }
    });
    var a
}

function setupAutocomplete(r, a, i, s, l, t) {
    var d = [],
        o = function(e, a) {
            try {
                t = void 0 === l ? $.map(e.values, s) : $.map(e.values[l], s)
            } catch (e) {
                var t = []
            }
            var r = 0,
                n = null,
                o = a.replace(new RegExp(" ", "g"), "");
            return $.each(t, function(e, t) {
                t.label.toLowerCase() === a.toLowerCase() || t.label.toLowerCase() === o.toLowerCase() ? (n = t, r++) : t.match.toLowerCase() !== a.toLowerCase() && t.match.toLowerCase() !== o.toLowerCase() || (n = t, r++)
            }), 1 == r && (d = n, jQuery.each(i, function(e, t) {
                t.jqobj.val(n[t.attr]), "function" == typeof t.jqobj.trigger && t.jqobj.trigger("change")
            })), 1 == t.length && Object.keys(d).length ? [] : t
        },
        e = function(e, r) {
            var n = e.term.toLowerCase();
            if (n in c) {
                var t = c[n];
                r(o(t, n))
            } else $.getJSON(a, {
                q: n
            }, function(e, t, a) {
                c[n] = e, r(o(e, n))
            })
        };
    r.on("keyup keypress", function(e) {
        var t = e.keyCode || e.which;
        return 37 != t && 38 != t && 39 != t && 40 != t && (13 == t ? (r.trigger("blur"), !1) : (jQuery.each(i, function(e, t) {
            t.jqobj.val("")
        }), void(d = [])))
    }), r.on("focus click", function() {
        $(this).autocomplete("search", $(this).val())
    });
    var c = {},
        n = r.autocomplete({
            delay: 50,
            minLength: 2,
            focus: function(e, t) {
                return !1
            },
            source: e,
            select: function(e, a) {
                jQuery.each(i, function(e, t) {
                    t.jqobj.val(a.item[t.attr]).change()
                }), "postcode" == r.attr("id") ? ($("#postcode_error").hide(), $("#uk-section").removeClass("new-error")) : "postcode_top" == r.attr("id") && ($("#postcode_error_top").hide(), $("#postcode_top_container").removeClass("new-error"))
            }
        }).data("ui-autocomplete");
    return n._renderMenu = function(a, e) {
        var r = this;
        a[0] && r.bindings[0] && (a[0].style.maxWidth = $(r.bindings[0]).outerWidth(!0) + "px"), $.each(e, function(e, t) {
            r._renderItemData(a, t)
        }), !0 === t && $(a).addClass("suggestion-alternative")
    }, r.blur(function() {
        if (!0 !== (a = !0, jQuery.each(i, function(e, t) {
                t.jqobj.val().length <= 0 && (a = !1)
            }), a)) {
            var a;
            r.val();
            e({
                term: r.val()
            }, function(e) {})
        }
    }), n
}

function setProjectInsightsToolTips() {
    if (!$(".project-insight").length) return !1;
    var e = {
        engaged: "[buyer_name] is very engaged on the Bark platform and is actively viewing Sellers.",
        requested_quotes: "[buyer_name] is actively requesting personalised quotes from Sellers.",
        viewed_profile: "[buyer_name] is actively viewing Seller profiles.",
        viewed_website: "[buyer_name] is actively viewing Seller websites.",
        requested_call: "[buyer_name] is actively requesting calls from Sellers.",
        requested_contact_details: "[buyer_name] is actively requesting the contact details of Sellers.",
        awaiting_contact: "[buyer_name] is waiting for Sellers to contact them.",
        used_bark_before: "[buyer_name] uses Bark regularly to hire professionals.",
        phone: "[buyer_name] has provided their [type] number to call them on.",
        domain_email: "[buyer_name] has provided their [type] email address to contact them on.",
        hired_on_bark_before: "[buyer_name] has hired a Seller on Bark before from one of their previous Barks.",
        limited_competition: "A limited amount of Sellers can respond to [buyer_name].",
        be_first_to_respond: "No-one has responded to [buyer_name] yet.",
        big_job: "[buyer_name]'s request is a high value job.",
        specific_location_given: "[buyer_name] has provided us with their full address.",
        re_submitted_request: "[buyer_name] has re-submitted their request as they are still looking for a professional to help.",
        urgent_request: "[buyer_name] is looking for a professional to help as soon as possible.",
        file_attached: "[buyer_name] has attached a file to their request.",
        image_attached: "[buyer_name] has attached an image to their request.",
        detailed_description_provided: "[buyer_name] has provided additional details about their requirement."
    };
    $(window).width() < 1025 ? ($(".project-insight").click(function() {
        showInsightTooltip(this, e)
    }), $(".project-insight").hover(function() {}, function() {
        $(".insight-tooltip").remove()
    })) : $(".project-insight").hover(function() {
        showInsightTooltip(this, e)
    }, function() {
        $(".insight-tooltip").remove()
    }), $(document).on("click", ".insight-tooltip", function() {
        $(".insight-tooltip").remove()
    }), $(".project-insight").blur(function() {
        $(".insight-tooltip").remove()
    })
}

function showInsightTooltip(e, t) {
    $(".insight-tooltip").remove();
    var a = $(e).attr("class").replace("project-insight ", "");
    if (void 0 === t[a]) return !1;
    var r = t[a],
        n = void 0 !== $(e).parent().parent().parent().attr("data-buyer-name") ? $(e).parent().parent().parent().attr("data-buyer-name") : "Buyer";
    "phone" == a && (-1 !== $(e).text().indexOf("Landline") && (r = r.replace("[type]", "landline")), -1 !== $(e).text().indexOf("Mobile") && (r = r.replace("[type]", "mobile")), -1 !== $(e).text().indexOf("Phone") && (r = r.replace("[type]", "phone"))), "domain_email" == a && (-1 !== $(e).text().indexOf("Personal") && (r = r.replace("[type]", "personal")), -1 !== $(e).text().indexOf("Business") && (r = r.replace("[type]", "business"))), r = r.replace("[buyer_name]", n);
    var o = '<div class="insight-tooltip" style="background-color: ' + $(e).css("border-top-color") + "; left: " + $(e).offset().left + "px; top: " + ($(e).offset().top + 32) + 'px;"><div class="triangle"></div>' + r + "</div>";
    $("body").append(o), $(".insight-tooltip .triangle").css({
        "border-bottom-color": $(e).css("border-top-color")
    }), $(".insight-tooltip").animate({
        opacity: .95
    }, {
        duration: 300
    })
}

function validateCompany(e) {
    return 0 < e.length && /[a-zA-Z0-9]/g.test(e)
}

function validateEmail(e) {
    return /\S+@\S+\.\S+/.test(e)
}

function fixedHeaderCheck() {
    var e, t, a, r, n = $("body");
    if (!n.hasClass("not-home") || n.hasClass("directory") && !n.hasClass("pros")) {
        e = $(window).width(), t = $(window).scrollTop(), a = e > Bark.consts.MOBILE_WIDTH_THRESHOLD ? 400 : 200, r = 720;
        try {
            0 <= navigator.userAgent.search("Safari") && navigator.userAgent.search("Chrome") < 0 ? r += 170 : 0 <= navigator.userAgent.search("Firefox") && (r += 150)
        } catch (e) {
            console.error(e)
        }
        r < e && a < t ? ($(".distance1").hide(), $(".distance2").fadeIn()) : ($(".distance1").fadeIn(), $(".distance2").hide()), e > Bark.consts.MOBILE_WIDTH_THRESHOLD ? 400 < t ? n.hasClass("home") && ($(".contain-to-grid").removeClass("transparent"), $(".contain-to-grid").addClass("not-transparent"), $(".header-background").fadeIn()) : ($(".bark-login-container").fadeIn(150), n.hasClass("home") && ($(".contain-to-grid").addClass("transparent"), $(".contain-to-grid").removeClass("not-transparent"), $(".header-background").fadeOut())) : 200 < t ? n.hasClass("home") && ($(".contain-to-grid").removeClass("transparent"), $(".contain-to-grid").addClass("not-transparent"), $(".header-background").fadeIn()) : n.hasClass("home") && ($(".contain-to-grid").addClass("transparent"), $(".contain-to-grid").removeClass("not-transparent"), $(".header-background").fadeOut())
    } else $(".top-bar").show()
}

function changeSlide() {
    var e = -100,
        t = 0;
    $(".slide").each(function() {
        parseInt($(this).css("z-index")) > e && (e = parseInt($(this).css("z-index"))), parseInt($(this).css("z-index")) < t && (t = parseInt($(this).css("z-index")))
    }), $(".slide").each(function() {
        $(this).find("h5, img, p").fadeOut(), parseInt($(this).css("z-index")) == e && $(this).fadeOut(1500, function() {
            $(".slide").each(function() {
                $(this).find("h5, img, p").fadeIn(), parseInt($(this).css("z-index")) == e ? ($(this).css("z-index", t), $(this).show()) : $(this).css("z-index", parseInt($(this).css("z-index")) + 1)
            })
        })
    })
}

function get_gallery_dim() {
    var r = 0,
        e = $(".photo-nav img").map(function(e, t) {
            var a = $(t).width();
            return r += a, a
        });
    return {
        width: r,
        length: e.length
    }
}

function cleanse(e, t) {
    return t = t || 0, e && e.length > t && 0 != t ? $("<div/>").text(e.substring(0, t)).html() + "&hellip;" : $("<div/>").text(e).html()
}

function nl2br(e, t) {
    return (e + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + (t || void 0 === t ? "<br />" : "<br>") + "$2")
}

function getCookie(e) {
    for (var t = e + "=", a = document.cookie.split(";"), r = 0; r < a.length; r++) {
        for (var n = a[r];
            " " == n.charAt(0);) n = n.substring(1);
        if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
    }
    return ""
}

function Validation() {
    this.validation_errors = 0
}

function val_not_empty(e) {
    return 0 < e.val().trim().length
}
$(document).on("DOMMouseScroll mousewheel", ".ui-menu", function(e) {
    var t = $(this),
        a = this.scrollTop,
        r = this.scrollHeight,
        n = t.height(),
        o = "DOMMouseScroll" == e.type ? -40 * e.originalEvent.detail : e.originalEvent.wheelDelta,
        i = 0 < o,
        s = function() {
            return e.stopPropagation(), e.preventDefault(), e.returnValue = !1
        };
    return !i && r - n - a < -o ? (t.scrollTop(r), s()) : i && a < o ? (t.scrollTop(0), s()) : void 0
}), $(document).ready(function() {
    if (window.hashedSellerId && window.io) {
        var e = $('meta[name="phsd"]').attr("content"),
            i = window.io(window.Bark.consts.WS_URL + "/msg", {
                query: "phsd=" + e,
                reconnectionAttempts: 3,
                reconnectionDelay: 6e3,
                transports: ["websocket"]
            });
        i.on("reconnect_attempt", function() {
            i.io.opts.transports = ["polling", "websocket"]
        }), i.on("connect", function() {
            i.emit("subscribe", "r_0_b_0_" + window.hashedSellerId)
        })
    }
    setProjectInsightsToolTips();
    var t, a, r = jstz.determine();
    if (Bark.set_cookie("time_zone", r.name(), 60, "/"), $("#city_name").length) {
        var n = "/address/";
        "sc" === $("#city_name").data("lmode") && (n += "?m=sc");
        var o = [{
            jqobj: $("#city_id"),
            attr: "id"
        }, {
            jqobj: $("#city_full"),
            attr: "label"
        }, {
            jqobj: $("#city_type"),
            attr: "type"
        }];
        0 < $("#city_lat").length && (o.push({
            jqobj: $("#city_lat"),
            attr: "lat"
        }), o.push({
            jqobj: $("#city_lng"),
            attr: "lng"
        })), setupAutocomplete($("#city_name"), n, o, function(e) {
            return {
                label: e.name,
                match: e.match,
                id: e.id,
                type: e.type,
                lat: e.lat,
                lng: e.lng
            }
        })
    }
    if ($("#category_name").length && setupAutocomplete($("#category_name"), "/category/", [{
            jqobj: $("#category_id"),
            attr: "id"
        }], function(e) {
            return {
                label: e.name,
                match: e.name,
                id: e.id
            }
        }, "category_list"), $("#category_name").autocomplete({
            focus: function(e, t) {
                return !1
            }
        }), $("#category_name_top").length && setupAutocomplete($("#category_name_top"), "/category/", [{
            jqobj: $("#category_id_top"),
            attr: "id"
        }], function(e) {
            return {
                label: e.name,
                match: e.name,
                id: e.id
            }
        }, "category_list", !0), void 0 !== Bark.ENV && "IE" != Bark.ENV.locale && $("#postcode").length) setupAutocomplete($("#postcode"), "/address/", [{
        jqobj: $("#postcode_id"),
        attr: "id"
    }, {
        jqobj: $("#postcode_type"),
        attr: "type"
    }], function(e) {
        return {
            label: e.name,
            match: e.match,
            id: e.id,
            type: e.type
        }
    });
    else if (void 0 !== Bark.ENV && "IE" == Bark.ENV.locale && $("#postcode").length) {
        var s;

        function l() {
            var e = s.getPlace();
            $("#postcode_id").val(e.place_id), $("#postcode_type").val("goog")
        }
        t = document.getElementById("postcode"), (s = new google.maps.places.Autocomplete(t, {
            componentRestrictions: {
                country: "ie"
            }
        })).addListener("place_changed", l)
    }
    if ($("#postcode_autocomplete").length && setupAutocomplete($("#postcode_autocomplete"), "/address/", [{
            jqobj: $("#postcode_id"),
            attr: "id"
        }, {
            jqobj: $("#postcode_type"),
            attr: "type"
        }], function(e) {
            return {
                label: e.name,
                match: e.match,
                id: e.id,
                type: e.type
            }
        }), void 0 !== Bark.ENV && "IE" != Bark.ENV.locale && $("#postcode_top").length) setupAutocomplete($("#postcode_top"), "/address/", [{
        jqobj: $("#postcode_id_top"),
        attr: "id"
    }, {
        jqobj: $("#postcode_type_top"),
        attr: "type"
    }], function(e) {
        return {
            label: e.name,
            match: e.match,
            id: e.id,
            type: e.type
        }
    }, void 0, !0);
    else if (void 0 !== Bark.ENV && "IE" == Bark.ENV.locale && $("#postcode_top").length) {
        var d;

        function c() {
            var e = d.getPlace();
            $("#postcode_id_top").val(e.place_id), $("#postcode_type_top").val("goog"), $("#postcode_id").val(e.place_id), $("#postcode").val(e.formatted_address), $("#postcode_type").val("goog")
        }
        a = document.getElementById("postcode_top"), (d = new google.maps.places.Autocomplete(a, {
            componentRestrictions: {
                country: "ie"
            }
        })).addListener("place_changed", c)
    }
    $("#seller-profile-form").length && $("body").on("change", $("#seller-profile-form").find("input:not([type='file']), textarea"), function(e) {
        sellerProfileChanged = !0
    }), $(".obfuscated-contact").click(function(e) {
        var a = $(this);
        if (a.hasClass("init")) return !0;
        a.addClass("init"), e.preventDefault();
        var t = $("<div>");
        t.append("Loading..."), a.html(t.html()), a.removeAttr("href"), a.css("text-decoration", "none");
        var r = $(this).attr("data-location"),
            n = $(this).attr("data-contact-type");
        void 0 !== r && !1 !== r || (r = "unspecified"), $.get("/fetch-contact/", {
            project_id: $(this).attr("data-project"),
            location: r,
            contact_type: n
        }, function(e) {
            var t = $("<div>");
            e.hasOwnProperty("values") ? "telephone" === n ? (e.values.hasOwnProperty("contact_value") ? (t.append($("<div>").text(e.values.contact_value).html()), a.css("text-decoration", "underline"), a.attr("href", "tel:" + e.values.contact_value), a.click(function() {
                ga("send", "event", "seller-response-actions", "button-call-telephone", "Seller calls Buyer from dashboard")
            })) : t.append("No " + n + " available"), ga("send", "event", "seller-response-actions", "button-show-telephone", "Seller views Buyer's phone number from dashboard")) : "email" === n && (e.values.hasOwnProperty("contact_value") ? (t.append($("<div>").text(e.values.contact_value).html()), a.css("text-decoration", "underline"), a.attr("href", "mailto:" + e.values.contact_value), a.click(function() {
                ga("send", "event", "seller-response-actions", "button-email-buyer", "Seller clicks Buyer email from dashboard")
            })) : t.append("No " + n + " available"), ga("send", "event", "seller-response-actions", "button-show-email", "Seller views Buyer's email from dashboard")) : t.append("Could not fetch telephone"), a.html(t.html())
        }, "json").fail(function() {
            var e = $("<div>");
            e.append(icon), e.append("Could not fetch " + n), a.html(e.html())
        })
    }), $(".call-buyer-button").click(function() {
        ga("send", "event", "seller-response-actions", "button-call-telephone", "Seller calls Buyer from email")
    }), $(".email-buyer-button").click(function() {
        ga("send", "event", "seller-response-actions", "button-email-buyer", "Seller clicks Buyer email from dashboard")
    }), window.onbeforeunload = function(e) {
        if (sellerProfileChanged) return "You currently have unsaved changes. If you leave the page, these changes will be lost. To save your changes, click the 'save' button at the bottom of the page."
    }, $("#mobile_notifications").click(function(e) {
        if ($(this).hasClass("sms-disabled")) return sellerProfileChanged = !1, $("#smsUpgradeModal").foundation("reveal", "open"), !1
    }), $(".sms_checkbox").click(function(e) {
        if ($(this).hasClass("sms-disabled")) return sellerProfileChanged = !1, $("#smsUpgradeModal").foundation("reveal", "open"), !1;
        0 == $("#mobile_notifications").val().length && (e.preventDefault(), alert("You must enter a mobile number to receive SMS message notifications."))
    }), $(".email_checkbox, .sms_checkbox").click(function() {
        sellerProfileChanged = !$(this).hasClass("sms-disabled")
    }), $(".js-trigger-user-notification-save").click(function() {
        var e = $(this).data("target");
        $("#" + e).prop("checked", !0), $("#saveUserNotificationSettings").trigger("click")
    }), $("#saveUserNotificationSettings").click(function() {
        $("#mobile_notifications_error").hide(), $("#email_notifications_error").hide();
        var e = {
                email_notifications: $("#email_notifications").val(),
                buyer_is_notify_emails: 0,
                buyer_is_promo_emails: 0,
                buyer_is_reminder_emails: 0,
                seller_is_promo_emails: $("#seller_is_promo_emails").val()
            },
            t = $("#notificationCSRF").attr("name");
        e[t] = $("#notificationCSRF").val(), $("#buyer_is_notify_emails").is(":checked") && (e.buyer_is_notify_emails = 1), $("#buyer_is_promo_emails").is(":checked") && (e.buyer_is_promo_emails = 1), $("#buyer_is_reminder_emails").is(":checked") && (e.buyer_is_reminder_emails = 1), $("#seller_is_promo_emails").is(":checked") ? e.seller_is_promo_emails = 1 : e.seller_is_promo_emails = 0, $(".webpush_checkbox").each(function() {
            $(this).is(":checked") ? e[$(this).attr("name")] = 1 : e[$(this).attr("name")] = 0
        }), $(".email_checkbox").each(function() {
            $(this).is(":checked") ? e[$(this).attr("name")] = 1 : e[$(this).attr("name")] = 0
        }), $.post("/user/save-notifications/", e, function(e) {
            e.success ? (sellerProfileChanged = !1, location.reload()) : null != e.errors.email && ($("#email_notifications_error").text("*" + e.errors.email).show(), $("#email_notifications_error").parent().addClass("new-error"))
        }, "json")
    }), $("form[data-remote]").on("submit", function(e) {
        var t = $(this),
            a = $('meta[name="csrf_name"]').attr("content"),
            r = $('meta[name="csrf_value"]').attr("content");
        e.preventDefault(), Bark.showLoading(), $.ajax({
            type: t.prop("method"),
            url: t.prop("action"),
            data: t.serialize() + "&" + a + "=" + r,
            dataType: "json",
            success: function(e, t) {
                if (e.status) return window.location.reload(!0), !0;
                Bark.hideLoading(1e3)
            },
            error: function(e) {
                Bark.hideLoading(1e3)
            }
        })
    }), $("#action-update-notification-settings").click(function() {
        if ($("#mobile_notifications_error").hide(), $("#email_notifications_error").hide(), $("#email_notifications").val().trim().length <= 0) return $("#email_notifications_error").text("* Email cannot be empty").show(), void $("#email_notifications_error").parent().addClass("new-error");
        var e = {
                email_notifications: $("#email_notifications").val(),
                mobile_notifications: $("#mobile_notifications").val()
            },
            t = $("#notificationCSRF").attr("name");
        e[t] = $("#notificationCSRF").val(), $("#is_promo_email").is(":checked") ? e.is_promo_emails = 1 : e.is_promo_emails = 0, $(".email_checkbox, .sms_checkbox").each(function() {
            $(this).is(":checked") ? e[$(this).attr("name")] = 1 : e[$(this).attr("name")] = 0
        }), $.post("/sellers/set-notifications/", e, function(e) {
            e.success ? (sellerProfileChanged = !1, location.reload()) : (null != e.errors.mobile && ($("#mobile_notifications_error").text("*" + e.errors.mobile).show(), $("#mobile_notifications_error").parent().addClass("new-error")), null != e.errors.email && ($("#email_notifications_error").text("*" + e.errors.email).show(), $("#email_notifications_error").parent().addClass("new-error")))
        }, "json")
    }), $("#quote_error").hide(), $("#profile_upload_action").click(function(e) {
        e.preventDefault(), $("#project_image").trigger("click")
    }), $("#project_attachment_action").click(function(e) {
        e.preventDefault(), $("#project_attachment").trigger("click")
    }), $("#quote-modal-close").click(function() {
        $("#provideQuoteModal").foundation("reveal", "close"), window.setTimeout(function() {
            $("#quote-form").show(), $("#quote-modal-success").hide()
        }, 1e3)
    }), $("#quote").keyup(function() {
        $("#quote_error").hide()
    }), $(".remove_image").click(function() {
        1 !== $(this).find(".removed-overlay").length && ($("#removeImageModal").foundation("reveal", "open"), $("#removeImageModal").attr("data-gallery-id", $(this).attr("data-gallery-id")))
    }), $(".remove_video").click(function() {
        $("#removeVideoModal").foundation("reveal", "open"), $("#removeVideoModal").attr("data-gallery-id", $(this).attr("data-gallery-id"))
    }), $(".confirm_video_remove").click(function() {
        var t;
        t = $(".remove_video[data-gallery-id='" + $("#removeVideoModal").attr("data-gallery-id") + "']"), data = {
            id: t.attr("data-gallery-id")
        }, $.post("/seller_gallery_remove/", data, function(e) {
            e.success && (t.remove(), thisclass = "left-inputs", $(".video-uploader .remove_video").each(function() {
                $(this).removeClass("left-inputs"), $(this).removeClass("right-inputs"), $(this).addClass(thisclass), "left-inputs" == thisclass ? thisclass = "right-inputs" : thisclass = "left-inputs"
            }), 0 == $(".video-uploader .remove_video").length && $(".video_percent").show(), $(".video-end").removeClass("left-inputs").removeClass("right-inputs").addClass(thisclass), $("#removeVideoModal").foundation("reveal", "close"))
        }, "json")
    }), $(".confirm_image_remove").click(function() {
        var n, o;
        n = $(".remove_image[data-gallery-id='" + $("#removeImageModal").attr("data-gallery-id") + "']"), o = {
            id: n.attr("data-gallery-id"),
            source: n.attr("data-source")
        }, $.post("/api/event-log/", {
            event_category: "seller_profiles",
            event_name: "confirm_image_remove",
            event_id: n.attr("data-source") + "_image"
        }), $.post("/seller_gallery_remove/", o, function(e) {
            var t = $("#removeImageModal");
            if (e.success) {
                if ("external" != o.source) n.remove();
                else {
                    var a = t.attr("data-gallery-id"),
                        r = $("[data-gallery-id=" + a + "]");
                    r.find(".photo-overlay").css({
                        display: "none"
                    }), r.find(".removed-overlay").css({
                        display: "block"
                    }), r.data("status", "removed")
                }
                0 == $(".photo-uploader .remove_image").length && $(".image_percent").show(), t.foundation("reveal", "close")
            }
        }, "json")
    }), $("#youtube-modal-close").click(function() {
        $("#youtubeModal").foundation("reveal", "close"), window.setTimeout(function() {
            $("#youtube-form").show(), $("#youtube-modal-success").hide(), $("input[name='youtube_url']").val("")
        }, 1e3)
    }), $("#action_add_youtube").click(function() {
        var e = {
            url: $("input[name='youtube_url']").val()
        };
        $.post("/seller_profile_add_youtube/", e, function(e) {
            if (e.success) {
                $("#youtube-form").fadeOut(function() {
                    $("#youtube-modal-success").fadeIn()
                });
                var t = "right-inputs";
                $(".video-uploader .remove_video").each(function() {
                    t = $(this).hasClass("left-inputs") ? "left-inputs" : "right-inputs"
                });
                var a = "left-inputs" === t ? "right-inputs" : "left-inputs";
                html = '<div data-gallery-id="' + e.values.media_id + '" class="profile-field remove_video clearfix">', html += '<div class="video-upload" style="background-image:url(//img.youtube.com/vi/' + e.values.youtube_id + '/hqdefault.jpg)">', html += '<div class="video-upload-overlay">', html += '<i class="fa fa-times"></i>', html += "<span>Delete</span>", html += "</div>", html += "</div>", html += "</div>", $(".video-end").before(html), $(".video-end").removeClass(a), $(".video-end").addClass(t), $(".video_percent").hide(), $("#video-uploader-no-videos").slideUp(), $(".remove_video").click(function() {
                    $("#removeVideoModal").foundation("reveal", "open"), $("#removeVideoModal").attr("data-gallery-id", $(this).attr("data-gallery-id"))
                })
            } else null != e.errors.youtube && (error = !0, $("#modal_youtube_error").text(e.errors.youtube).show().css("display", "block"))
        }, "json")
    }), $(".share-public-profile .facebook").click(function() {
        $(".fb-share-button").trigger("click")
    }), $(".photo-nav img").click(function() {
        obj = $(this), $("#download-link").attr("href", obj.attr("data-src")), $(".photo-gallery img:visible").fadeOut(500, function() {
            $(".photo-gallery img[data-large-id='" + obj.attr("data-thumbnail-id") + "']").fadeIn(500)
        }), $(".photo-gallery .download-overlay:visible").fadeOut(500, function() {
            $(".photo-gallery .download-overlay[data-large-id='" + obj.attr("data-thumbnail-id") + "']").fadeIn(500)
        }), $(".photo-gallery p:visible").fadeOut(500, function() {
            $(".photo-gallery p[data-large-id='" + obj.attr("data-thumbnail-id") + "']").fadeIn(500)
        })
    });
    var u = 0;
    $(".photo-nav .fa-chevron-right").click(function() {
        var e = $(this).parent(),
            t = e.find("img").length - 1;
        if (u = e.attr("slide-position") ? e.attr("slide-position") : 0, !$(this).hasClass("inactive")) {
            var a, r, n, o = 0;
            for (u++, a = 0; a < u; a++) n = +(r = e.find(".thumbnail").eq(a)).css("margin-right").replace("px", ""), o += r[0].getBoundingClientRect().width + n;
            1 <= t && e.find(".fa-chevron-left").removeClass("inactive"), e.find(".photo-nav-slider").css({
                marginLeft: -o
            }), u === t - 1 && $(this).addClass("inactive"), e.attr("slide-position", u)
        }
    }), $(".photo-nav .fa-chevron-left").click(function() {
        var e = $(this).parent(),
            t = e.find("img").length - 1;
        if (u = e.attr("slide-position") ? e.attr("slide-position") : 0, !$(this).hasClass("inactive")) {
            var a, r, n, o = 0;
            for (u--, a = 0; a < u; a++) n = +(r = e.find(".thumbnail").eq(a)).css("margin-right").replace("px", ""), o += r[0].getBoundingClientRect().width + n;
            e.find(".photo-nav-slider").css({
                marginLeft: -o
            }), 1 <= t && e.find(".fa-chevron-right").removeClass("inactive"), 0 === u && $(this).addClass("inactive"), e.attr("slide-position", u)
        }
    }), $(".star5, .star4, .star3, .star2, .star1").hover(function() {
        $(".star5, .star4, .star3, .star2, .star1").removeClass("no-star"), $(this).hasClass("star1") && $(".star5, .star4, .star3, .star2").addClass("no-star"), $(this).hasClass("star2") && $(".star5, .star4, .star3").addClass("no-star"), $(this).hasClass("star3") && $(".star5, .star4").addClass("no-star"), $(this).hasClass("star4") && $(".star5").addClass("no-star")
    }, function() {
        $(".star5, .star4, .star3, .star2, .star1").removeClass("no-star"), 0 == $("input[name='selected-rating']").val() && $(".star5, .star4, .star3, .star2, .star1").addClass("no-star"), 1 == $("input[name='selected-rating']").val() && $(".star5, .star4, .star3, .star2").addClass("no-star"), 2 == $("input[name='selected-rating']").val() && $(".star5, .star4, .star3").addClass("no-star"), 3 == $("input[name='selected-rating']").val() && $(".star5, .star4").addClass("no-star"), 4 == $("input[name='selected-rating']").val() && $(".star5").addClass("no-star")
    }), $(".star5, .star4, .star3, .star2, .star1").click(function() {
        $("#modal_rating_error").hide(), $(this).hasClass("star1") && $("input[name='selected-rating']").val(1), $(this).hasClass("star2") && $("input[name='selected-rating']").val(2), $(this).hasClass("star3") && $("input[name='selected-rating']").val(3), $(this).hasClass("star4") && $("input[name='selected-rating']").val(4), $(this).hasClass("star5") && $("input[name='selected-rating']").val(5), $(".star5, .star4, .star3, .star2, .star1").removeClass("no-star"), 0 == $("input[name='selected-rating']").val() && $(".star5, .star4, .star3, .star2, .star1").addClass("no-star"), 1 == $("input[name='selected-rating']").val() && $(".star5, .star4, .star3, .star2").addClass("no-star"), 2 == $("input[name='selected-rating']").val() && $(".star5, .star4, .star3").addClass("no-star"), 3 == $("input[name='selected-rating']").val() && $(".star5, .star4").addClass("no-star"), 4 == $("input[name='selected-rating']").val() && $(".star5").addClass("no-star")
    }), $("textarea[name='modal_textarea']").keyup(function() {
        30 <= $(this).val().length && ($("#modal_text_error").hide(), $("#modal_text_error").parent().removeClass("new-error"))
    }), $("input[name='modal_name']").keyup(function() {
        $("#modal_name_error").hide(), $("#modal_name_error").parent().removeClass("new-error")
    }), $("input[name='modal_email']").keyup(function() {
        $("#modal_email_error").hide(), $("#modal_email_error").parent().removeClass("new-error")
    }), $("input[name='modal_used']").click(function() {
        $("#modal_used_error").hide(), $("#modal_used_error").parent().removeClass("new-error")
    }), $("#review-modal-close").click(function() {
        $("#writeReviewModal").foundation("reveal", "close"), window.setTimeout(function() {
            $("#review-form").show(), $("#review-modal-success").hide(), $("input[name='modal_name']").val(""), $("input[name='modal_email']").val(""), $("input[name='modal_text']").val(""), $("input[name='modal_rating']").val(0), $("input[name='modal_used']:checked").attr("checked", "")
        }, 1e3)
    }), $("body").hasClass("mobile") && 640 < $(window).width() && ($(".mobile #buyer-options-dropdown").hide(), $(".mobile #seller-options-dropdown").hide(), $(".mobile #buyer-messenger-options-dropdown").hide()), $("body").hasClass("mobile") && 640 < $(window).width() && ($(".mobile #buyer-options").on("touchstart", function(e) {
        $(".mobile #buyer-options-dropdown").toggle(), e.preventDefault()
    }), $(".mobile #seller-options").on("touchstart", function(e) {
        $(".mobile #seller-options-dropdown").toggle(), e.preventDefault()
    }), $(".mobile #buyer-messenger-options").on("touchstart", function(e) {
        $(".mobile #buyer-messenger-options-dropdown").toggle(), e.preventDefault()
    }));
    var p = !1;
    $(".post-review").click(function() {
        if (!p) {
            p = !0, null == $("input:radio[name='modal_used']:checked") ? used = "" : used = $("input:radio[name='modal_used']:checked").val();
            var t = {
                sid: $("input[name='modal_sid']").val(),
                bid: $("input[name='modal_bid']").val(),
                rating: $("input[name='selected-rating']").val(),
                text: $("textarea[name='modal_textarea']").val(),
                modal_name: $("input[name='modal_name']").val(),
                modal_email: $("input[name='modal_email']").val(),
                modal_used: used
            };
            $.post("/post_review_ajax/", t, function(e) {
                e.success ? ($("#review-form").fadeOut(function() {
                    $("#review-modal-success").fadeIn()
                }), i.emit("newReview", {
                    note: t.text,
                    room: "r_0_b_0_" + window.hashedSellerId,
                    is_buyer: 0,
                    id: e.reviewId,
                    project_url: "/sellers/reviews/"
                })) : (p = !1, void 0 !== e.errors.email && (error = !0, $("#modal_email_error").text(e.errors.email).show().css("display", "block"), $("#modal_email_error").parent().addClass("new-error")), void 0 !== e.errors.name && (error = !0, $("#modal_name_error").text(e.errors.name).show().css("display", "block"), $("#modal_name_error").parent().addClass("new-error")), void 0 !== e.errors.text && (error = !0, $("#modal_text_error").text(e.errors.text).show().css("display", "block"), $("#modal_text_error").parent().addClass("new-error")), void 0 !== e.errors.rating && (error = !0, $("#modal_rating_error").text(e.errors.rating).show().css("display", "block"), $("#modal_rating_error").parent().addClass("new-error")), void 0 !== e.errors.used && (error = !0, $("#modal_used_error").text(e.errors.used).show().css("display", "block"), $("#modal_used_error").parent().addClass("new-error")))
            }, "json").fail(function() {
                p = !1
            })
        }
    }), $("#password-modal-close").click(function() {
        $("#passwordModal").foundation("reveal", "close"), window.setTimeout(function() {
            $("#password-form").show(), $("#password-modal-success").hide(), $("#current").val(""), $("#password").val(""), $("#confirm").val(""), $("#passwordButtons").removeClass("hide")
        }, 1e3)
    }), $("#current, #password, #confirm").keyup(function() {
        $("#password-modal-error").hide()
    }), $("#user-change-password-action").click(function() {
        var e = {
            current: $("#current").val(),
            password: $("#password").val(),
            confirm: $("#confirm").val()
        };
        e[$("#passwordCSRF").attr("name")] = $("#passwordCSRF").val(), $.post("/user/change_password_ajax/", e, function(e, t) {
            0 < e.errors.password.length ? (!0, $("#password-modal-error").text("*" + e.errors.password).show(), $("#password-modal-error").parent().addClass("new-error")) : 1 == e.success && $("#password-form").fadeOut(function() {
                $("#password-modal-success").fadeIn(), $("#passwordButtons").addClass("hide")
            })
        }, "json")
    }), $("#buyer-change-password-action").click(function() {
        var e = {
            current: $("#current").val(),
            password: $("#password").val(),
            confirm: $("#confirm").val()
        };
        e[$("#passwordCSRF").attr("name")] = $("#passwordCSRF").val(), $.post("/buyers/change_password_ajax/", e, function(e, t) {
            0 < e.errors.password.length ? (!0, $("#password-modal-error").text("*" + e.errors.password).show(), $("#password-modal-error").parent().addClass("new-error")) : 1 == e.success && $("#password-form").fadeOut(function() {
                $("#password-modal-success").fadeIn(), $("#passwordButtons").addClass("hide")
            })
        }, "json")
    }), $("#seller-change-password-action").click(function() {
        var e = $("#passwordCSRF").attr("name"),
            t = {
                current: $("#current").val(),
                password: $("#password").val(),
                confirm: $("#confirm").val()
            };
        t[e] = $("#passwordCSRF").val(), $.post("/sellers/change_password_ajax/", t, function(e) {
            0 < e.errors.password.length ? ($("#password-modal-error").text("*" + e.errors.password).show(), $("#password-modal-error").parent().parent().addClass("new-error")) : e.success && $("#password-form").fadeOut(function() {
                $("#password-modal-success").fadeIn(), $("#passwordButtons").addClass("hide")
            })
        }, "json")
    }), $(".review-respond-popup").click(function(e) {
        e.preventDefault(), $("#review-respond-modal-error").text(""), $("#review-respond-modal-error").parent().parent().removeClass("new-error");
        var t = $(e.target).attr("data-review-id");
        $("#review-respond-id").val(t), 0 < $("#review-response-" + t).length ? $("#review-respond-content").val($("#review-response-" + t).text()) : $("#review-respond-content").val(""), $("#review-respond-form").show(), $("#review-respond-success").hide(), $("#review-respond").foundation("reveal", "open")
    }), $("#review-respond-action").click(function() {
        var e = $("#review-respond-content").val().trim();
        if (0 === e.length) return $("#review-respond-modal-error").text("* Please enter a response").show(), void $("#review-respond-modal-error").parent().parent().addClass("new-error");
        var t = {
            review_id: $("#review-respond-id").val(),
            response: e
        };
        $.post("/sellers/review_respond_ajax/", t, function(e, t) {
            0 < Object.keys(e.errors).length ? (!0, $("#review-respond-modal-error").text("*" + e.errors[Object.keys(e.errors)[0]]).show(), $("#review-respond-modal-error").parent().parent().addClass("new-error")) : !0 === e.success && $("#review-respond-form").fadeOut(function() {
                $("#review-respond-success").fadeIn()
            })
        }, "json").fail(function() {
            $("#review-respond-modal-error").text("* An error occurred posting the response").show(), $("#review-respond-modal-error").parent().parent().addClass("new-error")
        })
    }), $(".review-report-popup").click(function(e) {
        e.preventDefault(), $("#review-report-modal-error").text(""), $("#review-report-modal-error").parent().parent().removeClass("new-error"), $("input[type='radio'][name='review-report-options']").removeAttr("checked"), $("#review-report-content").val(""), $("#review-report-form").show(), $("#review-report-success").hide();
        var t = $(e.target).attr("data-review-id");
        $("#review-report-id").val(t), $("#review-report").foundation("reveal", "open")
    }), $("#review-report-action").click(function() {
        var e = $("#review-source");
        $.post("/api/event-log/", {
            event_category: "review_reports",
            event_name: "confirm_report",
            event_id: e.val()
        });
        var t = $("#review-report-content").val().trim(),
            a = $("input[type='radio'][name='review-report-options']:checked");
        if (0 === a.length) return $("#review-report-modal-error").text("* Please select an option").show(), void $("#review-report-modal-error").parent().parent().addClass("new-error");
        var r = a.val(),
            n = {
                review_id: $("#review-report-id").val(),
                report_type: r,
                notes: t,
                review_source: e.val()
            };
        $.post("/sellers/review_report_ajax/", n, function(e, t) {
            0 < Object.keys(e.errors).length ? (!0, $("#review-report-modal-error").text("*" + e.errors[Object.keys(e.errors)[0]]).show(), $("#review-report-modal-error").parent().parent().addClass("new-error")) : !0 === e.success && $("#review-report-form").fadeOut(function() {
                $("#review-report-success").fadeIn()
            })
        }, "json").fail(function() {
            $("#review-report-modal-error").text("* An error occurred posting the report").show(), $("#review-report-modal-error").parent().parent().addClass("new-error")
        })
    }), $(window).resize(function() {
        fixedHeaderCheck()
    }), $(window).scroll(function() {
        fixedHeaderCheck()
    }), fixedHeaderCheck();
    var m = setInterval("changeSlide()", 6e3);

    function h(e, t) {
        var a = $("#stripe-credit-payment-form");
        if (!t.error) {
            var r = t.id;
            return a.append($('<input type="hidden" name="stripeToken" />').val(r)), v(t.id)
        }
        $("#stripe_error").text(t.error.message).show(), a.find("button").prop("disabled", !1), a.find("button span").show(), a.find("button p").hide(), a.find("input").prop("disabled", !1), a.find("select").prop("disabled", !1), $("#credit-processing-modal .controls").show(), "number" == t.error.param ? $("#credit-stripe-number").addClass("new-error") : "exp_month" == t.error.param ? $("#credit-stripe-exp-month").addClass("new-error") : "exp_year" == t.error.param ? $("#credit-stripe-exp-year").addClass("new-error") : "cvc" == t.error.param && $("#credit-stripe-cvc").addClass("new-error")
    }
    $(window).on("blur focus", function(e) {
        if ($(this).data("prevType") != e.type) switch (e.type) {
            case "blur":
                clearInterval(m), m = null;
                break;
            case "focus":
                m || (m = setInterval("changeSlide()", 6e3))
        }
        $(this).data("prevType", e.type)
    }), $(".country-dropdown li:not(.dropdown-hidden)").click(function() {
        $(this).parent().find(".dropdown-hidden").is(":hidden") ? $(this).parent().find(".dropdown-hidden").show() : $(this).parent().find(".dropdown-hidden").hide()
    }), $(function() {
        var e = $(".progress-pie-chart"),
            t = parseInt(e.data("percent")),
            a = 360 * t / 100;
        50 < t && e.addClass("gt-50"), t < 25 ? e.addClass("lt-25") : t < 50 ? e.addClass("lt-50") : t < 75 ? e.addClass("lt-75") : e.addClass("lt-100"), $(".ppc-progress-fill").css("transform", "rotate(" + a + "deg)"), $(".ppc-percents span").html(t + "%")
    }), $("#seller_name").keyup(function() {
        $("#seller_name-error").hide(), $(this).parent().find("span.new-error").hide(), $("#seller_name-error-c").removeClass("new-error")
    }), $("#company").keyup(function() {
        $(this).parent().find("span.new-error").hide(), $("#company-error-c").removeClass("new-error")
    }), $("#telephone").keyup(function() {
        $(this).parent().find("span.new-error").hide(), $("#telephone-error-c").removeClass("new-error")
    }), $("#email2").keyup(function() {
        $(this).parent().find("span.new-error").hide(), $("#email-error-c").removeClass("new-error")
    }), $("#message-fresh").keyup(function() {
        30 <= $("#message-fresh").val().length && ($(this).parent().find("span.new-error").hide(), $("#message-error-c").removeClass("new-error"))
    }), $("#profile_text-fresh").keyup(function() {
        30 <= $("#profile_text-fresh").val().length && ($(this).parent().find("span.new-error").hide(), $("#profile-text-error-c").removeClass("new-error"))
    }), $("#url-fresh").keyup(function() {
        $(this).parent().find("span.new-error").hide(), $("#url-error-c").removeClass("new-error")
    }), $("#quote").keyup(function() {
        $("#quote-error").parent().find("span.new-error").hide(), $("#quote-error-c").removeClass("new-error")
    }), $("#quote_type").change(function() {
        $("#quote-error").parent().find("span.new-error").hide(), $("#quote-error-c").removeClass("new-error"), $(this).removeClass("new-error")
    }), $(".purchase-pack").click(function(e) {
        var t = $(this).attr("data-pack-id");
        $("#payment_type").val("pack_" + t), $("#credit-processing-modal-errors").html(""), $("#credit-processing-modal-change-card").hide(), $("#credit-processing-modal .controls").hide(), v(void 0, void 0, "buyUpsellCreditPack")
    }), $("#quote_later").click(function() {
        $("#quote_type").removeClass("new-error"), $(this).is(":checked") ? ($("#quote").prop("disabled", !0), $("#quote_type").prop("disabled", !0), $("#quote_details").prop("disabled", !0)) : ($("#quote").prop("disabled", !1), $("#quote_type").prop("disabled", !1), $("#quote_details").prop("disabled", !1)), $("#quote-error").parent().find("span.new-error").hide()
    }), $("#seller_response_existing_card").click(function(e) {
        e.preventDefault(), $(".stripe-spinnerAfter").show(), $(".stripe-spinnerBefore").hide(), v()
    }), $("#seller_response_change_card").click(function(e) {
        null !== e && e.preventDefault(), $("#response-existing-card-form").hide(), $("#response-new-card-form").show()
    }), $("#seller_fresh_response").click(function(e) {
        null !== e && e.preventDefault(), v()
    }), $("#one_click_estimate").click(function(e) {
        var r = $("#one_click_estimate");
        if ($("#seller-response-error").hide(), !r.hasClass("perma-disabled")) {
            r.addClass("perma-disabled");
            var n = r.attr("data-response-id"),
                o = {
                    response_id: n,
                    quote: $("#quote").val(),
                    quote_type: $("#quote_type").val(),
                    quote_detail: $("#quote_details").val(),
                    one_click: 1
                };
            $.post("/seller_add_quote/", o, function(e, t) {
                if (0 === e.errors.length) {
                    var a = "r_" + n + "_b_" + r.data("buyer-id") + "_s_" + r.data("seller-profile-id");
                    i.emit("quoteEvent", {
                        quote: parseFloat(o.quote).toFixed(2),
                        quote_type: o.quote_type,
                        currency_symbol: $(".js-currency-symbol").html(),
                        quote_detail: o.quote_detail,
                        response_id: n,
                        room: a
                    }), window.location.replace("/sellers/dashboard/")
                } else void 0 !== e.errors.quote ? $("#quote-error").text("*" + e.errors.quote).show() : $("#quote-error").text("* An error occurred sending your quote").show(), $("#quote-error-c").addClass("new-error"), r.removeClass("perma-disabled")
            }, "json")
        }
    }), $("#buyVerifiedSubPlanCard").on("submit", function(e) {
        e.preventDefault();
        var t = $(this);
        t.find("button").prop("disabled", !0), ! function(e) {
            var t = !1;
            e.find("input.cc-exp").removeClass("new-error"), e.find('input[data-stripe="number"]').removeClass("new-error"), e.find('input[data-stripe="cvc"]').removeClass("new-error"), Stripe.validateCardNumber(e.find('input[data-stripe="number"]').val()) || (e.find('input[data-stripe="number"]').addClass("new-error"), t = !0);
            Stripe.validateCVC(e.find('input[data-stripe="cvc"]').val()) || (e.find('input[data-stripe="cvc"]').addClass("new-error"), t = !0);
            var a = e.find("input.cc-exp").payment("cardExpiryVal");
            e.find('input[id="cc-exp-month"]').val(a.month), e.find('input[id="cc-exp-year"]').val(a.year), Stripe.validateExpiry(a.month, a.year) || (e.find("input.cc-exp").addClass("new-error"), t = !0);
            t && ($("#stripe_error").html("We have been unable to process your payment. Please check the form and try again."), $("#stripe_error").show());
            return $(".ppr-payment-modal-spinner").hide(), t
        }(t) ? ($(".ppr-payment-modal-spinner").show(), $("#purchasingVerifiedPlan").foundation("reveal", "open"), Stripe.setPublishableKey(stripePublishableKey), Stripe.card.createToken(t, f)) : t.find("button").prop("disabled", !1)
    });
    var f = function(e, t) {
        var a = $("#buyVerifiedSubPlanCard");
        if (t.error) a.find("button").prop("disabled", !1), $("#stripe_error").html(t.error.message), $("#purchasingVerifiedPlan").foundation("reveal", "close");
        else {
            var r = {
                stripeToken: t.id,
                pid: a.find("input[name=pid]").val()
            };
            $.ajax({
                type: "POST",
                url: "/sellers/pro/purchase/",
                data: r,
                dataType: "json",
                success: function(e, t) {
                    1 == e.success && (window.location = "/sellers/dashboard/?vpro=1")
                },
                error: function(e) {
                    a.find("button").prop("disabled", !1), $(".ppr-payment-modal-spinner").hide(), $("#purchaseCreditPackUseExistingCardError").fadeIn()
                }
            })
        }
        return !1
    };

    function v(e, r, n) {
        var t;
        if (Bark.showLoading(), $("#seller-response-error").hide(), $("#quote_type").removeClass("new-error"), e = e || "", !$("#seller_fresh_response").hasClass("perma-disabled")) {
            if ($("#seller_fresh_response").addClass("perma-disabled"), a = !0, $(".file-upload-progress").length) var a = confirm("Files are still uploading. If you leave the page now, the files may be lost. Are you sure that you want to leave the page?");
            if (a) {
                t = $("#quote_later").is(":checked") ? 1 : "";
                var o = $("#payment_type").val(),
                    i = !1;
                null != $("#seller_name").html() && (i = $("#seller_name").val());
                var s = {
                    company: $("#company").val(),
                    category_id: $("#fresh_response_form").attr("data-category-id"),
                    email: $("#email2").val(),
                    telephone: $("#telephone").val(),
                    url: $("#url-fresh").val(),
                    project_id: $("#fresh_response_form").attr("data-project-id"),
                    message: $("#message-fresh").val(),
                    prospect_id: $("#prospect_id").val(),
                    quote: $("#quote").val(),
                    quote_type: $("#quote_type").val(),
                    quote_later: t,
                    quote_detail: $("#quote_details").val(),
                    file_ids: $("#file_ids").val(),
                    stripe_token: e,
                    payment_type: o,
                    seller_name: i,
                    expected_credits_required: $("#expected-credits-required").val(),
                    experiment_id: $("#experiment_id").val() || null,
                    seller_marketing: $("#seller_marketing").val()
                };
                $.post("/sellers/fresh-response/", s, function(e) {
                    if (1 == e.forcelogin) return window.location.replace("/login/?dest_url=" + e.redirect_url), !1;
                    if (0 === e.errors.length) void 0 !== n && "buyUpsellCreditPack" === n && ga("send", "event", "button", "buyUpsellCreditPack", "packId:" + parseInt(o.substr(o.length - 1))), e.values.seller_marketing ? window.location.replace(e.values.url + "?fl=true&category=" + $("#fresh_response_form").data("hashed")) : window.location.replace(e.values.url + "?category=" + $("#fresh_response_form").data("hashed"));
                    else {
                        if (e.errors && !isNaN(e.errors.code) && e.errors.code === Bark.consts.EX_PROJECT_TOO_MANY_RESPONSES) return void(window.location = Bark.sprintf("/find-work/%s%s/?ptmr=1", e.values.slug, e.values.prospect_id ? Bark.sprintf("/p%d", e.values.prospect_id) : ""));
                        if (Bark.hideLoading(), r) {
                            var t = $("#credit-processing-stripe-change-card-form");
                            t.find("button").prop("disabled", !1), t.show()
                        } else {
                            if (e.errors.seller_name && ($("#seller_name-error").text("*" + e.errors.seller_name).show(), $("#seller_name-error-c").addClass("new-error")), e.errors.message && ($("#message-error").text("*" + e.errors.message).show(), $("#message-error-c").addClass("new-error")), e.errors.profile_text && ($("#profile-text-error").text("*" + e.errors.profile_text).show(), $("#profile-text-error-c").addClass("new-error")), e.errors.telephone && ($("#telephone-error").text("*" + e.errors.telephone).show(), $("#telephone-error-c").addClass("new-error")), e.errors.company && ($("#company-error").text("*" + e.errors.company).show(), $("#company-error-c").addClass("new-error")), e.errors.email && ($("#email-error").text("*" + e.errors.email).show(), $("#email-error-c").addClass("new-error")), e.errors.password && ($("#pass-error").text("*" + e.errors.password).show(), $("#pass-error-c").addClass("new-error")), e.errors.url && ($("#url-error").text("*" + e.errors.url).show(), $("#url-error-c").addClass("new-error")), e.errors.quote && ($("#quote-error").text("*" + e.errors.quote).show(), $("#quote-error-c").addClass("new-error")), e.errors.quote_type && ($("#quote-error").text("*" + e.errors.quote_type).show(), $("#quote-error").css("color", "#ce4826"), $("#quote-error").css("margin", "0.5em 0 0"), $("#quote_type").addClass("new-error")), e.errors.general) {
                                $("#seller-response-error").text(e.errors.general).show(), $("#stripe_error").html(e.errors.general).show(), $("#stripe-credit-payment-button").attr("disabled", !1);
                                var a = $("#stripe-credit-payment-form");
                                a.length && (a.find("button").prop("disabled", !1), a.find("button span").show(), a.find("button p").hide(), a.find("input").prop("disabled", !1), a.find("select").prop("disabled", !1), $(".ppr-payment-modal-spinner").hide(), $("#credit-processing-modal-errors").html(e.errors.general), $("#credit-processing-modal-change-card").show(), $("#credit-processing-modal .controls").show())
                            }
                            $("#seller_fresh_response").removeClass("perma-disabled")
                        }
                    }
                }, "json").fail(function(e) {
                    console.error(e), window.location.replace(s.values.url + "?category=" + $("#fresh_response_form").data("hashed"))
                })
            } else Bark.hideLoading()
        }
    }
    $("#stripe-credit-payment-button").click(function() {
        var e = $("#stripe-credit-payment-form");
        return e.find("button").prop("disabled", !0), e.find("button span").hide(), e.find("button p").show(), e.find("input").prop("disabled", !0), e.find("select").prop("disabled", !0), $("#stripe-error").html(""), $("#stripe-error").hide(), $("input, select").removeClass("new-error"), $("#stripe_error").hide().html(""), b(e) ? (e.find("button").prop("disabled", !1), e.find("button span").show(), e.find("button p").hide(), e.find("input").prop("disabled", !1), e.find("select").prop("disabled", !1)) : (Stripe.setPublishableKey(stripePublishableKey), Stripe.card.createToken(e, h)), !1
    });
    var g = function(e, t) {
        var a = $("#credit-processing-stripe-change-card-form");
        if (t.error) $(".ppr-payment-modal-spinner").hide(), a.find("button").prop("disabled", !1), a.show();
        else {
            var r = {
                stripeToken: t.id
            };
            $.post("/sellers/change-card/", r, function(e) {
                e.success ? (a.hide(), v(void 0, !0)) : ($("#credit-processing-modal-errors").text(e.error).show().css("display", "inline-block"), a.find("button").prop("disabled", !1), a.show())
            }, "json")
        }
        return !1
    };

    function b(e) {
        var t = !1;
        return e.find('input[data-stripe="number"]').removeClass("new-error"), e.find('input[data-stripe="cvc"]').removeClass("new-error"), e.find('select[data-stripe="exp-month"]').removeClass("new-error"), e.find('select[data-stripe="exp-year"]').removeClass("new-error"), Stripe.validateCardNumber(e.find('input[data-stripe="number"]').val()) || (e.find('input[data-stripe="number"]').addClass("new-error"), t = !0), Stripe.validateCVC(e.find('input[data-stripe="cvc"]').val()) || (e.find('input[data-stripe="cvc"]').addClass("new-error"), t = !0), Stripe.validateExpiry(e.find('select[data-stripe="exp-month"]').val(), e.find('select[data-stripe="exp-year"]').val()) || (e.find('select[data-stripe="exp-month"]').addClass("new-error"), e.find('select[data-stripe="exp-year"]').addClass("new-error"), t = !0), t && ($("#stripe_error").html("We have been unable to process your payment. Please check the form and try again."), $("#stripe_error").show()), $(".ppr-payment-modal-spinner").hide(), t
    }
    $("#credit-processing-change-card-button").click(function(e) {
        $(".ppr-payment-modal-spinner").hide(), e.preventDefault();
        var t = $("#credit-processing-stripe-change-card-form"),
            a = b(t);
        if (Object.keys(a).length) return $(".ppr-payment-modal-spinner").hide(), t.show(), !1;
        $(".ppr-payment-modal-spinner").show(), t.find("button").prop("disabled", !0), t.hide(), Stripe.setPublishableKey(stripePublishableKey), Stripe.card.createToken(t, g)
    }), $(".section-hidden").hide(), $("#projectNotInterested").click(function() {
        $("#projectReplyOptions").hide(), $(".project-view-bottom").hide(), $("#mobileProjectReplyOptions").fadeOut(), $("#notInterestedReason").fadeIn(), $(".project-view-bottom").fadeIn()
    }), $(".project-reply-primary").not(".xp").click(function() {
        $("#projectReplyOptions").hide(), $(".project-view-bottom").hide(), $("#mobileProjectReplyOptions").fadeOut(), $(".project-view-response").show(), $("html, body").animate({
            scrollTop: $(".project-view-response").offset().top - 41
        }, 2e3)
    }), $(".project-reply-primary.xp").click(function() {
        $("#projectReplyOptions button").hide(), $(".project-view-bottom").hide(), $("#mobileProjectReplyOptions").fadeOut(), $(".project-view-response").show(), $("html, body").animate({
            scrollTop: $(".project-view-header").offset().top - 83
        }, 2e3)
    }), $("a.we-re-hiring").on("click", function() {
        ga("send", "event", "link", "click", "We are hiring - header")
    }), $("a.we-re-hiring-footer").on("click", function() {
        ga("send", "event", "link", "click", "We are hiring - footer")
    }), $(".project-reply-primary.xp").length && $(window).off("scroll.respondproximity").on("scroll.respondproximity", function() {
        var e = $(this).scrollTop();
        $(".project-view-large-right .project-view-new").offset().top - 150 < e && ($(".project-view-bottom").hide(), $("#mobileProjectReplyOptions").fadeOut(), $(".project-view-response").show(), $(window).off("scroll.respondproximity"))
    }), $(".project-reply-secondary").click(function() {
        $("#projectReplyOptions").hide(), $(".project-view-bottom").hide(), $("#mobileProjectReplyOptions").fadeOut(), $("#notInterestedReason").show(), $(".project-view-bottom").show(), $("html, body").animate({
            scrollTop: $("#notInterestedReason").offset().top - 41
        }, 2e3)
    }), $("#postBarkWelcome1Next").click(function() {
        $("#postBarkWelcome1").hide(), $("#postBarkWelcomeEstimate").hide(), $("#postBarkWelcome2").fadeIn()
    }), $("#postBarkWelcomeBnbBack").click(function() {
        $("#postBarkBnbEstimate").hide(), $("#modalContentEstimate").fadeIn()
    }), $("#postBarkBnbFromEstimate").click(function() {
        $("#modalContentEstimate").hide(), $("#postBarkBnbEstimate").fadeIn()
    }), $("#postBarkBnbWelcomeBack").click(function() {
        $("#postBarkBnb").hide(), $("#postBarkWelcome1").hide(), $("#postBarkWelcome2").fadeIn()
    }), $("#postBarkBnbNext").click(function() {
        $("#postBarkWelcome1").hide(), $("#postBarkWelcome2").hide(), $("#postBarkBnb").fadeIn()
    }), $("#postBarkWelcomeEstimateNext").click(function() {
        $("#postBarkWelcome1").hide(), $("#postBarkWelcomeEstimate").hide(), $("#postBarkWelcome2").fadeIn()
    }), $("#postBarkWelcome2Next").click(function() {
        $("#postBarkWelcome2").hide(), $("#postBarkWelcome3").fadeIn()
    }), $("#postBarkWelcome2Back").click(function() {
        $("#postBarkWelcome2").hide(), $("#postBarkWelcome1").fadeIn()
    }), $("#postBarkWelcome3Back").click(function() {
        $("#postBarkBnb").hide(), $("#postBarkWelcome1").fadeIn()
    }), $("#company, #profile_text").keyup(function() {
        $(this).parent().find("small").hide()
    }), $("#category_id").change(function() {
        $("#category_id").parent().find("small").hide()
    }), $("#city_id").change(function() {
        $("#city_id").parent().find("small").hide()
    }), $("#seller_continue").click(function(e) {
        var t = !1;
        0 == $("#company").val().length && (t = !0, $("#company").parent().find("small").show()), 0 != $("#category_id").val().length && 0 != $("#category_name").val().length || (t = !0, $("#category_id").parent().find("small").show()), 0 != $("#city_id").val().length && 0 != $("#city_name").val().length || (t = !0, $("#city_id").parent().find("small").show()), $("#profile_text").val().length < 50 && (t = !0, $("#profile_text").parent().find("small").show()), t || $("#signup-modal-2").foundation("reveal", "open")
    }), $("#email2").keyup(function() {
        $("#email2").parent().find("small").hide()
    }), $("#telephone").keyup(function() {
        $("#telephone").parent().find("small").hide()
    }), $("#password2, #confirm").keyup(function() {
        $("#password2").parent().find("small").hide(), $("#confirm").parent().find("small").hide()
    }), $("#seller_signup").click(function() {
        var e = !1;
        validateEmail($("#email2").val()) || (e = !0, $("#email2").parent().find("small").show()), $("#password2").val() != $("#confirm").val() && (e = !0, $("#confirm").parent().find("small").show()), validateCompany($("#company").val()) || (e = !0, $("#company").parent().find("small").show()), 0 == $("#telephone").val().length && (e = !0, $("#telephone").parent().find("small").show()), e || (data = {
            company: $("#company").val(),
            category_id: $("#category_id").val(),
            profile_text: $("#profile_text").val(),
            email: $("#email2").val(),
            telephone: $("#telephone").val(),
            city_id: $("#city_id").val(),
            city_full: $("#city_full").val(),
            category_name: $("#category_name").val(),
            avatar_id: $("#avatar_id").val(),
            password: $("#password2").val(),
            confirm: $("#confirm").val(),
            project_id: $("#project_id").val()
        }, $.post("/sellers/create-ajax/", data, function(e, t) {
            0 == e.errors.length ? window.location.replace(e.url) : (null != e.errors.email && $("#email-error").text(e.errors.email).show(), null != e.errors.password && $("#pass-error").text(e.errors.password).show())
        }, "json"))
    })
}), $(function() {
    $(".new-project-checkbox>input[type='checkbox']").change(function() {
        $(this).is(":checked") ? $(this).parent().addClass("selected") : $(this).parent().removeClass("selected")
    }), $.fn.imagesLoaded && $(".photo-nav").imagesLoaded(function() {
        get_gallery_dim().width > $("div.photo-nav-inner").width() && $(".photo-nav .fa-chevron-right").removeClass("inactive")
    }), $("#buyerChangePasswordButton").click(function() {
        $("#buyerChangePassword").show("slow"), $(this).addClass("disabled-button")
    }), $("#sellerChangePasswordButton").click(function() {
        $("#sellerChangePassword").show("slow"), $(this).addClass("disabled-button")
    }), $("#view-bark-details").on("mouseover", function() {
        get_gallery_dim().width > $("div.photo-nav-inner").width() && $(".photo-nav .fa-chevron-right").removeClass("inactive"), $("#view-bark-details").unbind()
    })
}), Validation.prototype.step = function(e, t, a, r) {
    null == r && (r = e), a(e) ? (r.removeClass("new-error"), r.next("span.new-error").detach()) : (r.addClass("new-error"), r.next("span.new-error").detach(), r.after('<span class="new-error"> ' + t + " </span>"), this.validation_errors++)
}, Validation.prototype.failed = function() {
    return 0 < this.validation_errors
}, $(document).ready(function() {
    $(".certificate-email-button").click(function(e) {
        $("#snippetEmailAddress").val("")
    }), $("body").on("click", ".showMoreAlternatives", function(e) {
        currentAlternativePage += 1, $(".suggestionPage" + currentAlternativePage).removeClass("hiddenSuggestion").addClass("visibleSuggestion"), currentAlternativePage == alternativePages && $(".showMoreAlternatives").hide()
    }), $("#suggestCategoryButton").on("click", function(e) {
        return $("#suggestCategoryError").parent().removeClass("new-error"), $("#suggestCategoryError").hide(), 0 === $("input[name='suggest_category_name']").val().trim().length ? ($("#suggestCategoryError").html("Please enter a category suggestion"), $("#suggestCategoryError").parent().addClass("new-error"), $("#suggestCategoryError").show(), !1) : !($("input[name='suggest_category_name']").val().trim().length < 3) || ($("#suggestCategoryError").html("Please enter a longer category suggestion"), $("#suggestCategoryError").parent().addClass("new-error"), $("#suggestCategoryError").show(), !1)
    }), $("body").on("click", ".not-interested-button", function(e) {
        e.preventDefault();
        var t = !1;
        if ("prospect" == $(this).attr("data-type")) t = "prospect";
        else {
            if ("seller" != $(this).attr("data-type")) return !1;
            t = "seller"
        }
        var a = $(this).attr("data-id"),
            r = $(this).attr("data-project-id"),
            n = 99;
        null !== document.querySelector('input[name="not-interested"]:checked') && (n = document.querySelector('input[name="not-interested"]:checked').value);
        var o = {
            recordType: t,
            recordId: a,
            projectId: r,
            declineType: n
        };
        $.ajax({
            type: "POST",
            url: "/response_declined/",
            data: o,
            success: function(e) {
                $("#notInterestedReason").hide(), $(".project-view-bottom").hide(), $("#notInterestedConfirmation").fadeIn()
            }
        })
    }), $("body").on("click", ".undo-not-interested-button", function(e) {
        e.preventDefault();
        var t = !1;
        if ("prospect" == $(this).attr("data-type")) t = "prospect";
        else {
            if ("seller" != $(this).attr("data-type")) return !1;
            t = "seller"
        }
        var a = $(this).attr("data-id"),
            r = $(this).attr("data-project-id"),
            n = 99;
        null !== document.querySelector('input[name="not-interested"]:checked') && (n = document.querySelector('input[name="not-interested"]:checked').value);
        var o = {
            recordType: t,
            recordId: a,
            projectId: r,
            declineType: n
        };
        $.ajax({
            type: "POST",
            url: "/response_declined_delete/",
            data: o,
            success: function(e) {
                $("#notInterestedConfirmation").hide(), $("#projectReplyOptions").fadeIn(), $(".project-view-bottom").fadeIn()
            }
        })
    }), window.triggerUpload = function(e) {
        var t = document.getElementById(e);
        try {
            var a = new MouseEvent("click");
            t.dispatchEvent(a)
        } catch (e) {
            t.click()
        }
    }
});
var myDropzone, getUrlParameter = function(e) {
    var t, a, r = decodeURIComponent(window.location.search.substring(1)).split("&");
    for (a = 0; a < r.length; a++)
        if ((t = r[a].split("="))[0] === e) return void 0 === t[1] || t[1]
};

function show_bark_estimate(e, t, a, r, n, o) {
    if (e) {
        null == o && (o = "Â£");
        var i = format_currency(t),
            s = format_currency(a),
            l = format_currency(r),
            d = format_currency(n);
        $("#postBarkEstimateLeft").text(o + i), $("#postBarkEstimateCenter").text(s === l ? o + l : o + s + " - " + o + l), $("#postBarkEstimateRight").text(o + d), "hour" == e ? $(".postBarkEstimateUnit").text("per hour") : "session" == e ? $(".postBarkEstimateUnit").text("per session") : "month" == e ? $(".postBarkEstimateUnit").text("per month") : "visit" == e ? $(".postBarkEstimateUnit").text("per visit") : "day" == e ? $(".postBarkEstimateUnit").text("per day") : "week" == e ? $(".postBarkEstimateUnit").text("per week") : "head" == e && $(".postBarkEstimateUnit").text("per head"), $("#postBarkWelcomeLoading").fadeOut(), $("#postBarkWelcomeEstimate").foundation("reveal", "open")
    } else setTimeout(function() {
        $("#postBarkWelcomeLoading").fadeOut(), $("#postBarkWelcomeContainer").foundation("reveal", "open")
    }, 1500)
}

function format_currency(e) {
    return Number(e).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function isEmpty(e) {
    return void 0 === e || null == e || e.length <= 0
}

function run_validator(e, r, a) {
    var n = !1;
    if (a.mailgunRequest && (a.mailgunRequest.abort(), a.mailgunRequest = null), e)
        if (r && r.in_progress && r.in_progress(r.e), a.mailgunLastSuccessReturn && e == a.mailgunLastSuccessReturn.address) r && r.success && r.success(a.mailgunLastSuccessReturn, r.e);
        else {
            var o = !1;
            if (512 < e.length ? o = "Email address exceeds maxiumum allowable length of 512." : 1 != e.split("@").length - 1 && (o = "Email address must contain only one @."), o) r && r.error ? r.error(o, r.e) : console && console.log(o);
            else {
                r && null == r.api_key && console && console.log("Please pass in api_key to mailgun_validator.");
                var i = setTimeout(function() {
                    o = "Error occurred, unable to validate address.", n || (a.mailgunRequest && (a.mailgunRequest.abort(), a.mailgunRequest = null), r && r.error ? r.error(o, r.e) : console && console.log(o))
                }, 1e4);
                a.mailgunRequest = $.ajax({
                    type: "GET",
                    url: "https://api.mailgun.net/v2/address/validate?callback=?",
                    data: {
                        address: e,
                        api_key: r.api_key
                    },
                    dataType: "jsonp",
                    crossDomain: !0,
                    success: function(e, t) {
                        n = !0, clearTimeout(i), a.mailgunLastSuccessReturn = e, r && r.success && r.success(e, r.e)
                    },
                    error: function(e, t, a) {
                        n = !0, clearTimeout(i), o = "Error occurred, unable to validate address.", r && r.error ? r.error(o, r.e) : console && console.log(o)
                    }
                })
            }
        }
}
$(function() {
        $("input[name=switch-profile-toggle]:radio").change(function() {
            var e = $(this).val();
            e = "buyers" === e ? "sellers" : "buyers", $("body").append('<div id="switchUserProfileOverlay" class="full-screen-load" style="display:none;"><div class="full-screen-load-container"><div class="full-screen-load-content"><i class="fa fa-spinner fa-spin"></i><span>Switching profile</span></div></div></div>'), $("#switchUserProfileOverlay").fadeIn(), setTimeout(function() {
                window.location.replace("/" + e + "/switch/")
            }, 1400)
        })
    }),
    function(f, d) {
        "use strict";
        var e, i = null;
        f.Bark = f.Bark || {}, f.Bark.isMobileDimensions, f.Bark.isMobileModalDimensions, f.Bark.array_unshift = function(e) {
            return Array.prototype.slice.call(arguments, 1).concat(e)
        }, f.Bark.array_unique = function(e) {
            var t, a, r = [];
            if (!Bark.is_array(e)) throw new Bark.ex("Parameter one of Bark.array_unique() must be an array");
            for (a = 0; a < e.length; a++) t = e[a], Bark.in_array(t, r) || r.push(t);
            return r
        }, f.Bark.clear_cookie = function(e, t) {
            Bark.set_cookie(e, null, -2, t)
        }, f.Bark.date = function(e, t) {
            t || (t = new Date);
            var a, r, n, o = new Date(t),
                i = o.getUTCDate(),
                s = o.getUTCDay(),
                l = o.getUTCMonth(),
                d = o.getUTCHours(),
                c = o.getUTCMinutes(),
                u = o.getUTCSeconds(),
                p = f.Bark.getOrdinal(i),
                m = o.getUTCFullYear(),
                h = e.split("");
            for (a = {
                    d: (i < 10 ? "0" : "") + String(i),
                    D: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"][s],
                    j: i,
                    l: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][s],
                    N: i + 1,
                    S: p,
                    w: i,
                    F: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][l],
                    m: (l + 1 < 10 ? "0" : "") + String(l + 1),
                    M: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][l],
                    n: l + 1,
                    L: m % 4 == 0,
                    Y: m,
                    y: String(m).replace(/.*(\d\d)/, "$1"),
                    a: d < 12 ? "am" : "pm",
                    A: d < 12 ? "AM" : "PM",
                    g: d % 12,
                    G: d,
                    h: (d % 12 < 10 ? "0" : "") + String(d % 12),
                    H: (d < 10 ? "0" : "") + String(d),
                    i: (c < 10 ? "0" : "") + String(c),
                    s: (u < 10 ? "0" : "") + String(u)
                }, r = 0; r < h.length; r++) n = h[r], h[r] = n in a ? a[n] : n;
            return h.join("")
        }, f.Bark.end = function(e) {
            return e.slice(-1)[0]
        }, f.Bark.ex = function(e, t) {
            return t || (t = "Exception"), {
                name: "Bark::" + t,
                level: "Cannot continue",
                message: e,
                htmlMessage: e,
                toString: function() {
                    return ["Bark::", t, " - ", e].join("")
                }
            }
        }, f.Bark.GET = function(e) {
            var t, a, r = location.search.replace(/\?/, "").split("&");
            for (t = 0; t < r.length; t++)
                if ((a = r[t].split("="))[0].toLowerCase() === e.toLowerCase()) return a.shift(), !a.length || a.join("=")
        }, f.Bark.get_cookie = function(e) {
            var t, a, r = e + "=",
                n = document.cookie.split(";");
            for (t = 0; t < n.length; t++)
                if (0 === (a = n[t].trim()).indexOf(r)) return a.substring(r.length, a.length)
        }, f.Bark.getDate = function(e) {
            var t, a;
            return Bark.is_a(e, "string") && e.trim().match(/^\d{4}.\d{1,2}.\d{1,2}.\d{2}.\d{2}(:?\d{2})?$/) ? (a = e.split(/\D/), t = new Date(Date.UTC(a[0], a[1] - 1, a[2], a[3], a[4], a[5] || 0))) : t = new Date(Date.UTC(e)), t
        }, f.Bark.getDevicePixelRatio = function() {
            var e = 1;
            return void 0 !== f.screen.systemXDPI && void 0 !== f.screen.logicalXDPI && f.screen.systemXDPI > f.screen.logicalXDPI ? e = f.screen.systemXDPI / f.screen.logicalXDPI : void 0 !== f.devicePixelRatio && (e = f.devicePixelRatio), e
        }, f.Bark.getHtml = function(e, t, a, r, n) {
            var o = document.createElement(e);
            return t && (o.innerHTML = t), a && (o.id = a), r && (o.className = r),
                function(e, t) {
                    if (Bark.is_a(t, "object"))
                        for (var a in t)
                            if (t.hasOwnProperty(a)) {
                                var r = t[a];
                                "boolean" == typeof r && (r = r ? 1 : 0), e.setAttribute(a, r)
                            }
                }(o, n), o.outerHTML
        }, f.Bark.getNetworkSpeed = function() {
            return navigator.connection ? (navigator.connection || {}).downlink : null
        }, f.Bark.getNetworkType = function() {
            return navigator.connection ? (navigator.connection || {}).type : null
        }, f.Bark.getOrdinal = function(e) {
            var t, a = String(e);
            switch (+a.replace(/.*(\d)$/, "$1")) {
                case 1:
                    t = "st";
                    break;
                case 2:
                    t = "nd";
                    break;
                case 3:
                    t = "rd";
                    break;
                default:
                    t = "th"
            }
            return a.match(/.*1(1|2|3)$/) && (t = "th"), t
        }, f.Bark.getTimeElapsedAsString = function(e) {
            var t = Bark.getDate(e),
                a = Math.floor((new Date - t) / 1e3),
                r = (a / 31536e3).toPrecision(2);
            return 1 <= r ? Bark.sprintf("%d year%s ago", r, 2 < r ? "s" : "") : 1 <= (r = (a / 2592e3).toPrecision(2)) ? Bark.sprintf("%d month%s ago", r, 2 < r ? "s" : "") : 1 <= (r = (a / 86400).toPrecision(2)) ? Bark.sprintf("%d day%s ago", r, 2 < r ? "s" : "") : 1 <= (r = (a / 3600).toPrecision(2)) ? Bark.sprintf("%d hour%s ago", r, 2 < r ? "s" : "") : (r = (a / 60).toPrecision(2)) < 1 ? "Less than a minute ago" : Bark.sprintf("%d minute%s ago", r, 1 < r ? "s" : "")
        }, f.Bark.getTimezone = function() {
            var e = (new Date).getTimezoneOffset() / -60,
                t = (e - parseInt(e)) % 60;
            return Bark.sprintf("%s%s:%s", e < 0 ? "-" : "+", (e < 10 && -1 < e ? "0" : "") + String(e), (t < 10 && -1 < t ? "0" : "") + String(t))
        }, f.Bark.getUrlParam = function(e) {
            var t, a, r = decodeURIComponent(f.location.search.substring(1)).split("&");
            for (a = 0; a < r.length; a++)
                if ((t = r[a].split("="))[0] === e) return void 0 === t[1] || t[1];
            return null
        }, f.Bark.decodeEntities = function(e) {
            var t = document.createElement("textarea");
            return t.innerHTML = e, t.value
        }, f.Bark.getVendor = function() {
            var e = f.getComputedStyle(document.documentElement, ""),
                t = (Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/) || "" === e.OLink && ["", "o"])[1];
            return {
                css: "-" + t + "-",
                dom: "WebKit|Moz|MS|O".match(new RegExp("(" + t + ")", "i"))[1],
                js: t[0].toUpperCase() + t.substr(1),
                lowercase: t
            }
        }, f.Bark.hideLoading = function(e, t) {
            null !== i && (f.clearTimeout(i), i = null), d(".full-screen-load").finish().animate({
                opacity: 0
            }, e || 400, t || "swing", function() {
                d(".full-screen-load").hide(), d(".full-screen-load-content p").hide()
            })
        }, f.Bark.initModalUpload = function(e, t, i) {
            var a = {},
                o = d('meta[name="csrf_name"]').attr("content"),
                s = d('meta[name="csrf_value"]').attr("content"),
                l = e || "#modalUploadFiles";
            Dropzone.autoDiscover = !1, Dropzone.prototype.defaultOptions.dictRemoveFile = "Remove", Dropzone.prototype.defaultOptions.dictCancelUpload = "Cancel", Dropzone.prototype.defaultOptions.dictFileTooBig = "File is too big ({{filesize}}MB). Max filesize is {{maxFilesize}}MB.", Bark.is_a(t, "object") || (t = {}), a[o] = s, new Dropzone(l, d.extend({
                url: "/modal-upload/",
                thumbnailWidth: 70,
                parallelUploads: 6,
                params: a,
                thumbnailHeight: 70,
                previewsContainer: "#previews-modal",
                clickable: ".fileinput-button",
                addRemoveLinks: !0,
                maxFiles: 20,
                maxFilesize: 10,
                accept: function(e, t) {
                    var a = d(".dropzoneContainer .dz-preview .dz-image:last"),
                        r = "";
                    switch (e.type) {
                        case "application/zip":
                            r = "fa-file-archive-o";
                            break;
                        case "application/vnd.ms-powerpoint":
                            r = "fa-file-powerpoint-o";
                            break;
                        case "application/vnd.ms-excel":
                            r = "fa-file-excel-o";
                            break;
                        case "application/msword":
                            r = "fa-file-word-o";
                            break;
                        case "application/pdf":
                            r = "fa-file-pdf-o";
                            break;
                        case "audio/mpeg3":
                            r = "fa-file-audio-o";
                            break;
                        case "video/avi":
                            r = "fa-file-video-o";
                            break;
                        case "image/jpeg":
                        case "image/png":
                        case "image/gif":
                            break;
                        default:
                            r = "fa-file-o"
                    }
                    r.length && a.html('<i class="fa ' + r + '" style="padding-top:0.3em;font-size: 3em; color: rgb(255, 255, 255);"></i>'), t()
                },
                init: function() {
                    this.on("removedfile", function(e) {
                        var t = new d.Event("modalUploadRemovedFile");
                        if (t.originalArguments = arguments, d(l).trigger(t), "error" === e.status || isEmpty(e.serverId) || t.isDefaultPrevented()) return !1;
                        var a = {
                                id: e.serverId,
                                filetype: e.filetype
                            },
                            r = "image" === e.filetype ? "image_id_" : "file_id_";
                        r += e.serverId, d("#" + r).remove();
                        var n = {
                            file: JSON.stringify(a)
                        };
                        n[o] = s, d.ajax({
                            url: "/modal-upload/delete/",
                            type: "POST",
                            data: n
                        })
                    }), this.on("error", function(e, t) {
                        var a = new d.Event("modalUploadError");
                        if (a.originalArguments = arguments, d(l).trigger(a), a.isDefaultPrevented()) return !1;
                        if (d(e.previewElement).find(".dz-progress").hide(), "string" == typeof t && "" === t) return !1;
                        var r = jQuery.parseJSON(t);
                        e.previewElement.querySelector("[data-dz-errormessage]").textContent = r.errors[0]
                    }), this.on("reset", function() {
                        var e = new d.Event("modalUploadReset");
                        if (e.originalArguments = arguments, d(l).trigger(e), e.isDefaultPrevented()) return !1;
                        Bark.createBark.enableContinue()
                    }), this.on("queuecomplete", function() {
                        var e = new d.Event("modalUploadQueueComplete");
                        if (e.originalArguments = arguments, d(l).trigger(e), e.isDefaultPrevented()) return !1;
                        Bark.createBark.enableContinue()
                    }), this.on("canceledmultiple", function() {
                        var e = new d.Event("modalUploadCancelledMultiple");
                        if (e.originalArguments = arguments, d(l).trigger(e), e.isDefaultPrevented()) return !1;
                        Bark.createBark.enableContinue()
                    }), this.on("sending", function() {
                        var e = new d.Event("modalUploadSending");
                        if (e.originalArguments = arguments, d(l).trigger(e), e.isDefaultPrevented()) return !1;
                        Bark.createBark.disableContinueForUploading()
                    }), this.on("addedfile", function(e) {
                        var t = new d.Event("modalUploadAddedFile");
                        if (t.originalArguments = arguments, d(l).trigger(t), t.isDefaultPrevented()) return !1;
                        var a = d(e.previewElement).find(".dz-image");
                        Bark.in_array(e.type, ["image/png", "image/jpeg", "image/gif"]) && d(e.previewElement).find(".dz-details").hide(), d(e.previewElement).find(".dz-size").html(""), d('<div class="dz-overlayload"></div>').insertAfter(a).fadeIn()
                    }), this.on("complete", function(e) {
                        var t = new d.Event("modalUploadComplete");
                        if (t.originalArguments = arguments, d(l).trigger(t), t.isDefaultPrevented()) return !1;
                        d(e.previewElement).find(".dz-overlayload").delay(1800).fadeOut()
                    }), this.on("success", function(e, t) {
                        var a = new d.Event("modalUploadSuccess");
                        if (a.originalArguments = arguments, d(l).trigger(a), a.isDefaultPrevented()) return !1;
                        var r = jQuery.parseJSON(t);
                        e.serverId = r.values.id, e.filetype = r.values.filetype;
                        var n = "image" === e.filetype ? "image_ids[]" : "file_ids[]",
                            o = "image" === e.filetype ? "image_id_" : "file_id_";
                        o += e.serverId, d("<input>", {
                            type: "hidden",
                            name: n,
                            class: "modal-uploader-hidden-input",
                            "data-type": "image" === e.filetype ? "image" : "file",
                            id: o
                        }).appendTo(i || ".modal-upload-output").val(e.serverId)
                    })
                }
            }, t))
        }, f.Bark.in_array = function(e, t) {
            var a;
            for (t = t || [], a = 0; a < t.length; a++)
                if (t[a] === e) return !0;
            return !1
        }, f.Bark.is_a = function(e, t) {
            if (void 0 === e) return !1;
            var a = t.substr(0, 1).toUpperCase() + t.substr(1).toLowerCase();
            return Object.prototype.toString.call(e) === "[object " + a + "]"
        }, f.Bark.is_array = function(e) {
            return Bark.is_a(e, "array")
        }, f.Bark.is_function = function(e) {
            return Bark.is_a(e, "function")
        }, f.Bark.isBroadband = function() {
            return navigator.connection ? Bark.in_array((navigator.connection || {}).type, ["wifi", "ethernet", "wimax"]) : null
        }, f.Bark.json = function(e) {
            return Bark.is_a(e, "string") && (e = {
                url: e
            }), e.dataType = e.dataType || "JSON", e.type = e.type || "post", "post" === d.trim(e.type).toLowerCase() && (e.data = e.data || {}, e.data[d("meta[name=csrf_name]").attr("content")] = d("meta[name=csrf_value]").attr("content")), d.ajax(e).fail(function(e) {
                "You must be logged in" !== e.responseText ? (console.error(e), Bark.hideLoading()) : document.location.reload()
            })
        }, f.Bark.logExperimentsSessionData = function(e, t, a, r, n, o) {
            Bark.json({
                url: "/json/esd/log/",
                data: {
                    payload: JSON.stringify({
                        name: e,
                        isincontrolgroup: t,
                        more: n || null,
                        category_id: a,
                        variant: r
                    })
                }
            }).done(o)
        }, f.Bark.objectSize = function(e) {
            var t = 0;
            for (var a in e) e.hasOwnProperty(a) && t++;
            return t
        }, f.Bark.reset = function(e, t) {
            var a;
            if (e[0]) return t ? 0 : e[0];
            for (a in e)
                if (e.hasOwnProperty(a)) return t ? a : e[a]
        }, f.Bark.set_cookie = function(e, t, a, r) {
            var n, o = new Date;
            o.setTime(o.getTime() + 24 * a * 60 * 60 * 1e3), n = "expires=" + o.toGMTString(), document.cookie = e + "=" + t + "; " + n + (r ? "; path=" + r : "")
        }, f.Bark.showLoading = function(e, t, a) {
            var r, n, o;
            d(".full-screen-load").length || (n = Bark.getHtml("i", null, null, "fa fa-spin fa-spinner"), o = Bark.getHtml("span") + Bark.getHtml("p", "Sorry, it's taking longer than usual"), r = Bark.getHtml("div", n + o, null, "full-screen-load-content"), d("body").append(Bark.getHtml("div", Bark.getHtml("div", r, null, "full-screen-load-container"), null, "full-screen-load")), d(".full-screen-load").css({
                opacity: 0
            })), d(".full-screen-load .full-screen-load-container .full-screen-load-content span").text(a || "Please wait"), d(".full-screen-load-content p").hide(), i && f.clearTimeout(i), i = f.setTimeout(function() {
                d(".full-screen-load-content p").show()
            }, 1e4), d(".full-screen-load").show().finish().animate({
                opacity: 1
            }, e || 400, t || "swing")
        }, f.Bark.alertModal = function(e, t, a) {
            var r = d("#barkModalAlert");
            0 === r.length || Bark.isMobile() ? (alert(Bark.stripHTML(e)), a && a()) : (r.find(".js-title").html(e), t || (t = "OK"), r.find(".js-confirm").html(t).unbind("click.callbackAction").on("click.callbackAction", function() {
                a && d(document).unbind("closed.fndtn.reveal").on("closed.fndtn.reveal", "[data-reveal]", function() {
                    d(document).unbind("closed.fndtn.reveal"), a()
                }), r.foundation("reveal", "close")
            }), r.foundation("reveal", "open"))
        }, f.Bark.confirmModal = function(e, t, a, r, n, o) {
            o = void 0 !== o && o;
            var i = d("#barkModalConfirm");
            o || 0 !== i.length && !Bark.isMobile() ? (i.find(".js-title").html(e), r || (r = "OK"), n || (n = "Cancel"), i.find(".js-confirm").html(r).unbind("click.callbackAction").on("click.callbackAction", function() {
                t && d(document).unbind("closed.fndtn.reveal").on("closed.fndtn.reveal", "[data-reveal]", function() {
                    d(document).unbind("closed.fndtn.reveal"), t()
                }), i.foundation("reveal", "close")
            }), i.find(".js-cancel").html(n).unbind("click.callbackAction").on("click.callbackAction", function() {
                a && d(document).unbind("closed.fndtn.reveal").on("closed.fndtn.reveal", "[data-reveal]", function() {
                    d(document).unbind("closed.fndtn.reveal"), a()
                }), i.foundation("reveal", "close")
            }), i.foundation("reveal", "open")) : confirm(Bark.stripHTML(e)) ? t && t() : a && a()
        }, f.Bark.isMobile = function() {
            var e = !1;
            return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (e = !0), e
        }, f.Bark.sprintf = function() {
            var e = arguments[0],
                a = Array.prototype.slice.call(arguments, 1),
                r = 0,
                t = /%[^%\s]/g;
            if (!e) throw Bark.ex("No string to replce", "sprintf");
            if ((e.match(t) || []).length !== a.length) throw Bark.ex("The number of arguments does not match the number of replacements", "sprintf");
            return e.replace(t, function(e) {
                var t = a[r++];
                switch (e) {
                    case "%b":
                        return f.parseInt(t).toString(2);
                    case "%c":
                        return String.fromCharCode(parseInt(t, 10));
                    case "%d":
                    case "%i":
                        return f.parseInt(t);
                    case "%f":
                        return parseFloat(t);
                    case "%o":
                        return t.toString(8);
                    case "%s":
                        return t;
                    case "%u":
                        return f.parseInt(t) >>> 0;
                    case "%x":
                        return f.parseInt(t).toString(16);
                    case "%X":
                        return f.parseInt(t).toString(16).toUpperCase()
                }
            }).replace(/%%/g, "%")
        }, f.Bark.stripHTML = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.textContent || t.innerText
        }, f.Bark.time = function(e) {
            return e ? Math.round(new Date(e).getTime() / 1e3) : Math.round((new Date).getTime() / 1e3)
        }, f.Bark.unset = function(e, t) {
            Bark.is_a(e, "object") ? delete e[t] : t in e && e.splice(t, 1)
        }, f.Bark.ucfirst = function(e) {
            return (e || "").trim().charAt(0).toUpperCase() + e.slice(1)
        }, f.Bark.ucwords = function(e) {
            var t, a = "",
                r = (e || "").trim().split(" ");
            for (t = 0; t < r.length; t++) a += Bark.ucfirst(r[t]);
            return a.join(" ")
        }, f.Bark.validate = {
            email: function(e, t) {
                d.ajax({
                    url: "/tools/validate-email/",
                    type: "post",
                    dataType: "json",
                    data: {
                        email: e
                    }
                }).done(function(e) {
                    t.result && t.result(e.result)
                }).error(function(e) {
                    t.error && t.error(e)
                })
            },
            ukTel: function(e, t) {
                if (d.trim(e)) {
                    var a = {},
                        r = d('meta[name="csrf_name"]').attr("content"),
                        n = d('meta[name="csrf_value"]').attr("content");
                    a[r] = n, a.telephone = e, d.ajax({
                        url: "/validate-phone/",
                        type: "POST",
                        dataType: "JSON",
                        data: a,
                        in_progress: function() {
                            d("#inlineBarkModalSpinner").show(), d("#inlineBarkModalContent").hide()
                        },
                        success: function(e) {
                            t(Boolean(e.status), Boolean(e.moderate), e.phonenumber, e.error)
                        },
                        error: function(e) {
                            t(!1, !1, null, null)
                        }
                    })
                } else t(!1)
            },
            barkEmail: function(e, t) {
                var a = {},
                    r = d('meta[name="csrf_name"]').attr("content"),
                    n = d('meta[name="csrf_value"]').attr("content");
                a[r] = n, a.email = e, d.ajax({
                    url: "/check-bark-email/",
                    type: "POST",
                    dataType: "JSON",
                    data: a,
                    in_progress: function() {
                        d("#inlineBarkModalSpinner").show(), d("#inlineBarkModalContent").hide()
                    },
                    success: function(e) {
                        t(Boolean(e.status), e.error)
                    },
                    error: function(e) {
                        t(!1, null)
                    }
                })
            }
        }, f.Bark.ymd = function(e) {
            var t = void 0 === e ? new Date : new Date(e),
                a = String(t.getUTCMonth() + 1);
            e = String(t.getUTCDate());
            return [t.getUTCFullYear(), (a < 10 ? "0" : "") + a, (e < 10 ? "0" : "") + e].join("-")
        }, d(f).on("resize", function() {
            clearTimeout(e), e = setTimeout(function() {
                d(f).trigger("resizeEnd")
            }, 250)
        }), d(f).unbind("resize.orientationListen").on("resize.orientationListen", function() {
            var e = d(f).width();
            e > f.Bark.consts.MOBILE_WIDTH_THRESHOLD ? (f.Bark.isMobileDimensions && d(f).trigger("exitMobileDimensions"), f.Bark.isMobileDimensions = !1) : (f.Bark.isMobileDimensions || d(f).trigger("enterMobileDimensions"), f.Bark.isMobileDimensions = !0), f.Bark.isMobileModalDimensions = e <= f.Bark.consts.MOBILE_MODAL_THRESHOLD
        }).resize(), d.fn.insertAt = function(e, t) {
            var a = this.children();
            if (t >= a.size()) return this.append(e), this;
            var r = a.eq(t);
            return d(e).insertBefore(r), this
        }
    }(this, jQuery),
    function(n) {
        "use strict";
        var t = 1024,
            o = 50,
            i = 400;
        $(function() {
            var r;
            $(".bark-menu-main-toggle-mob").unbind("click.openmenu").on("click.openmenu", function(e) {
                (e.stopPropagation(), $(this).closest(".bark-mob-open").length) || ($(this).addClass("bark-mob-open"), $("nav.top-bar.dont-hide").addClass("barkmenuopen"), $("#header .default-top-head").addClass("barkmenuopen"), $(".bark-mob-menu-items").scrollTop(0), $("ul.bark-mob-menu-items .main li").each(function(e) {
                    $(this).finish().delay(o * e).animate({
                        opacity: 1,
                        top: 0,
                        left: 0
                    }, i, "swing")
                }), n.setTimeout(function() {
                    $(".bark-menu-avatar").addClass("menu-open")
                }, 10), r = $("body").scrollTop() || $("html").scrollTop(), $("body,html").css({
                    overflow: "hidden"
                }), $(n).unbind("resize.closeMenu").on("resize.closeMenu", function() {
                    $(this).width() >= t && $(".bark-menu-hamburger").click()
                }))
            }), $(".bark-menu-hamburger").unbind("click.closemenu").on("click.closemenu", function(e) {
                var t = $(this),
                    a = t.closest(".bark-mob-open");
                a.length && (e.stopPropagation(), a.removeClass("bark-mob-open"), $("ul.bark-mob-menu-items .main li").each(function(e) {
                    $(this).finish().delay(o * e).animate({
                        opacity: 0,
                        top: "20px",
                        left: "20px"
                    }, i, "swing")
                }), $(".bark-mob-menu-items").removeClass("show-notifications"), $(".bark-mob-menu-items ul").scrollTop(0), t.closest(".barkmenuopen").removeClass("barkmenuopen"), $("#header .default-top-head").removeClass("barkmenuopen"), $(".bark-menu-avatar.menu-open").removeClass("menu-open"), $("body,html").css({
                    overflow: "initial"
                }).scrollTop(r), $(n).unbind("resize.closeMenu"))
            }), $(".notification-count-container").unbind("click.opennots").on("click.opennots", function() {
                $(".bark-mob-menu-items").addClass("show-notifications").scrollTop(0)
            }), $(".bark-mob-menu-items .back").unbind("click.showmenu").on("click.showmenu", function() {
                $(".bark-mob-menu-items").removeClass("show-notifications").scrollTop(0)
            })
        })
    }(this), $.fn.mailgun_validator = function(a) {
        return this.each(function() {
            var e = $(this),
                t = e.val();
            t = $.trim(t), e.val(t), run_validator(t, a, e)
        })
    },
    function(e) {
        var t = e.basicPhoneCheck = e.basicPhoneCheck || {},
            s = ["07777777777", "07000000000", "01234567890", "07777777770", "01234467890", "07111111111", "07111223344", "07111223344", "07111555666", "07123456789", "07900000000", "07700000000", "07712345678", "07999999999", "01202000000", "01202000001", "01202111111", "01210000000", "01211111111", "01212121212", "01212122112", "01212202201", "01212212212", "01310000000", "01313131331", "01410000000", "01410000001", "01510000000", "01511001000", "01515000000", "01515150105", "01606000000", "01610000000", "01610000001", "01611111111", "01616000000", "01777777777", "01910000000", "01910909090", "01911111111", "01919999999", "02000000000", "02011111111", "02030000000", "02070000000", "02072002000", "02077227227", "02080000000"];
        t.test = function(e) {
            for (var t = !1, a = {
                    invalid: !1,
                    badChars: e.match(/[^0-9\.\-\s\+]/)
                }, r = 0; r < s.length; r++) {
                var n = s[r],
                    o = n.replace(/^0/, "44"),
                    i = n.replace(/^0/, "0044");
                if (Bark.in_array(e, [n, o, i])) {
                    t = !0;
                    break
                }
            }
            return Bark.array_unique(e.replace(/^(\44|0044|0)/, "").split("")).length < 3 && (t = !0), t && (a.invalid = !0), a
        }
    }(this),
    function(g) {
        "use strict";
        var v = g.Bark = g.Bark || {},
            b = v.createBark = {
                categoryData: null,
                pos: 0,
                lastCategory: 0,
                validatedTel: !1,
                categPhotoAvail: !1,
                introAvail: !1,
                modalCategPhoto: ""
            },
            p = b.presets = {},
            k = {},
            t = !1,
            r = !1,
            n = !1,
            y = 0,
            s = v.getDevicePixelRatio(),
            o = 8,
            i = 13,
            m = 10,
            l = 30,
            c = "next",
            d = !0;

        function u(e) {
            return "us" == e || "ca" == e
        }

        function h() {
            var e = "account",
                t = "Get your quotes now!",
                a = "Get quotes within the hour.";
            try {
                void 0 !== (r = b.categoryData.categories[b.lastCategory].modal_text) && null != r || (r = {})
            } catch (e) {
                var r = {}
            }
            return void 0 !== r.final_heading && (t = r.final_heading.value, a = r.final_subheading.value, r.final_subheading.show || (a = null)), {
                gaPath: e,
                fbqPath: e,
                hideProgress: !0,
                label: t,
                labelExtra: a,
                omitFromCount: !0,
                telephone: b.buyerTelephone,
                type: "buyerInfo"
            }
        }

        function _() {
            for (var e = b.questionsLength = 0; e < b.questions.length; e++) b.questions[e].omitFromCount || (b.questionsLength++, b.questions[e].index = e + 1)
        }

        function f() {
            var e, t, a = [];
            for (e = 0; e < b.categoryData.order.length; e++) t = b.categoryData.order[e], a.push({
                id: t,
                label: b.categoryData.categories[t].name,
                thumbnail: b.categoryData.categories[t].thumbnail
            });
            return {
                hideNavigation: !0,
                hideProgress: !0,
                hideRuler: b.categoryData.thumbnailsAll,
                label: b.categoryData.parentCategoryName,
                labelExtra: "Select one of the categories below",
                options: a,
                required: !0,
                thumbnailsAll: b.categoryData.thumbnailsAll,
                type: "CategorySelection"
            }
        }

        function w(e) {
            if (r) return !1;
            r = !0;
            var t = $('meta[name="csrf_name"]').attr("content"),
                a = $('meta[name="csrf_value"]').attr("content");
            e[t] = a, $.ajax({
                url: "/api/brkflow/",
                type: "POST",
                dataType: "JSON",
                data: e,
                success: function(e) {
                    r = !1
                },
                error: function() {
                    r = !1
                }
            })
        }

        function C(e) {
            if (n) return !1;
            n = !0;
            var t = $('meta[name="csrf_name"]').attr("content"),
                a = $('meta[name="csrf_value"]').attr("content");
            e[t] = a, $.ajax({
                url: "/api/brkflow-e/",
                type: "POST",
                dataType: "JSON",
                data: e,
                success: function(e) {
                    n = !1
                },
                error: function() {
                    n = !1
                }
            })
        }

        function x() {
            var t = b.questions[b.pos],
                e = $("#bark-question-" + b.pos),
                a = {
                    name: t.name,
                    type: t.type,
                    res: {}
                };
            switch ("accountEmail" === t.type && (d = !0), t.type) {
                case "checkbox":
                    var r = {};
                    $("input[type=checkbox]", e).each(function() {
                        if (this.checked) {
                            var e = this.id.replace(/custom_question_checkbox_\d+_/, "");
                            r[e] = "true", "other" === e && (a.res[t.name + "_other"] = k[t.name + "_other"] = $("#" + this.id + "_value").val())
                        }
                    }), a.res[t.name] = k[t.name] = r;
                    break;
                case "select":
                case "photoselect":
                    $("input[type=radio]", e).each(function() {
                        if (this.checked) return a.res[this.name] = k[this.name] = this.value, "other" === this.value && (a.res[this.name + "_other"] = k[this.name + "_other"] = $(".inline-bark-q-radio-other", e).val()), !1
                    });
                    break;
                case "date":
                    var n, o, i = ($(".bark-date", e).data("datepicker").textval || "").trim();
                    $(".bark-date-unsure", e).is(":checked") ? a.res[t.name] = k[t.name] = "Not Sure" : $(".bark-date-na", e).is(":checked") ? a.res[t.name] = k[t.name] = "Not Applicable" : $(".bark-date-other", e).is(":checked") ? a.res[t.name] = k[t.name] = $.trim($(".bark-date-other-text input").val()) : ($(".bark-date-time-container", e).length && (n = $(".bark-date-time-from input", e).val(), o = $(".bark-date-time-to input", e).val(), n && o ? i += v.sprintf(", %s - %s", n, o) : n ? i += " from " + n : o && (i += " until " + o)), a.res[t.name] = k[t.name] = i);
                    break;
                case "number":
                    a.res[t.name] = k[t.name] = parseFloat($(".inline-bark-q-number input", e).val().trim());
                    break;
                case "photocheck":
                    r = {};
                    $("input[type=checkbox]", e).each(function() {
                        if (this.checked) {
                            var e = this.id.replace(/custom_question_checkbox_\d+_/, "");
                            r[e] = "true"
                        }
                    }), a.res[t.name] = k[t.name] = r;
                    break;
                default:
                    $(":input", e).each(function() {
                        var e = "checkbox" === this.type ? this.checked : this.value.trim();
                        "" === e || v.in_array(this.id, ["inline-bark-teldesc"]) || (a.res[this.name] = k[this.name] = e)
                    })
            }!b.userLoggedIn && k.email && function() {
                var e = $.extend(!0, {}, k);
                if (!d) return;
                e.project_detail = e.project_detail || "", e.category_id = $("#category_id").val(), e.postcode_id = $("#postcode_id").val(), e.postcode_type = $("#postcode_type").val(), e.ENV = {
                    lang: (g.Bark.ENV.lang || "").toLowerCase(),
                    locale: (g.Bark.ENV.locale || "").toLowerCase(),
                    campaign: g.Bark.ENV.campaign,
                    tz: g.Bark.ENV.tz || "",
                    ptcode: g.Bark.ENV.ptcode
                }, $("input[id^=file_id]").each(function() {
                    e.file_ids = e.file_ids || [], e.file_ids.push(+this.value)
                }), $("input[id^=image_id]").each(function() {
                    e.image_ids = e.image_ids || [], e.image_ids.push(+this.value)
                }), v.json({
                    url: "/json/project/abandoned-bark/",
                    data: {
                        payload: JSON.stringify(e)
                    }
                }).done(function(e) {
                    "OK" === e.result && k ? k.abandonedbarkid = e.id : v.in_array(e.result, ["LOGGEDIN", "EXISTS"]) && (d = !1)
                })
            }()
        }

        function q() {
            if (t) return !1;
            $(g).trigger("beforeCreateBarkModalSubmit"), t = !0, k.process = !0, k.project_detail = k.project_detail || "", k.isoptout = $("#inline-bark-teldesc").length ? +!$("#inline-bark-teldesc").is(":checked") : 0, $("#project-create-form").append(b.getSubmitFormHtml(k)).submit()
        }

        function B(e) {
            var t = {},
                a = $('meta[name="csrf_name"]').attr("content"),
                r = $('meta[name="csrf_value"]').attr("content");
            t[a] = r, t.email = e, $.ajax({
                url: "/check-bark-email/",
                type: "POST",
                dataType: "JSON",
                data: t,
                success: function(e) {},
                error: function() {}
            })
        }

        function e(e, t, a, r) {
            e ? q() : !e && t ? (j(a), q()) : E(r)
        }

        function j(e) {
            $("#project-create-form").append('<input type="hidden" name="_automoderate" value="1">')
        }

        function E(e) {
            $("#inline-bark-new-user-telephone").closest(".inline-bark-q-cont").addClass("new-error");
            var t = "The telephone number you entered is not a valid number";
            e && (t = e), $(".inline-bark-modal-errors").text(t).removeClass("hide"), $("#inlineBarkModalSpinner").hide(), $("#inlineBarkModalContent").show()
        }

        function P() {
            var e = !1;
            try {
                e = v.createBark.categoryData.categories[v.createBark.lastCategory].modal_text
            } catch (e) {
                console.log(e)
            }
            return e
        }

        function S() {
            var e = void 0 === k ? {} : k;
            if (Object.keys(e).length && !t) return "We have professionals ready to help you. Are you sure that you swant to leave?"
        }

        function T(e, t) {
            return v.date(e, 1e3 * strtotime(t) + 60 * -new Date(t).getTimezoneOffset() * 1e3)
        }

        function H(e, o, t, i) {
            var s = !1;
            $("#inline-bark-new-user-email").mailgun_validator({
                api_key: "pubkey-ce0d5b49cbdee8929df9474e22be7537",
                success: function(a) {
                    var r = a.is_valid;
                    if (a.did_you_mean && !e) {
                        $.each(["@gmail", "@btinternet", "@live", "@yahoo", "@outlook", "@aol", "@hotmail", "@sky", "@me", "@ntlworld", "@talktalk", "@msn", "@blueyonder", "@virginmedia", "@tiscali"], function(e, t) {
                            if (-1 !== a.did_you_mean.indexOf(t)) return r = !1
                        })
                    }
                    $(".email-suggest-cancel")[(a.is_valid ? "remove" : "add") + "Class"]("hide"), r ? o && o() : t && t(a)
                },
                error: function(e) {
                    if ("Error occurred, unable to validate address." === e) {
                        if (s) return;
                        s = !0, o && o(), t = $("#inline-bark-new-user-email").val(), a = {}, r = $('meta[name="csrf_name"]').attr("content"), n = $('meta[name="csrf_value"]').attr("content"), a[r] = n, a.email = t, $.ajax({
                            url: "/api/failed-mgun/",
                            type: "POST",
                            dataType: "JSON",
                            data: a,
                            success: function(e) {}
                        })
                    } else i && i(e);
                    var t, a, r, n
                }
            })
        }

        function D(e, t) {
            t || (t = g.location.href), e = e.replace(/[\[\]]/g, "\\$&");
            var a = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
            return a ? a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "" : null
        }
        b.dispatchEvent = function(e) {
            var t = b.questions[b.pos];
            if (e in t) return t[e].call(e)
        }, b.next = function(e) {
            if ($(".inline-bark-modal-email-errors, .inline-bark-modal-errors").addClass("hide"), !e) {
                var t = new $.Event("BarkProgressToNextQuestion");
                if ($(g).trigger(t), t.isDefaultPrevented()) return
            }
            if (b.validateCurrent() && b.pos < b.questions.length) {
                var a = {};
                b.questions[b.pos].name ? a.exqid = b.questions[b.pos].name : a.exqid = b.questions[b.pos].type, a.ext = "fw", b.dispatchEvent("onChangingQuestion"), x(), b.checkIfBranching(), c = "next", b.pos++, b.renderCurrent(), a.cid = $("#category_id").val(), b.questions[b.pos].name ? a.qid = b.questions[b.pos].name : (a.qid = b.questions[b.pos].type, a.s = b.questions[b.pos].type), "postcode" == b.questions[b.pos].type && (a.s = "location"), a.et = "fw", w(a)
            }
        }, b.checkIfBranching = function() {
            var e = b.questions[b.pos],
                t = !1;
            try {
                if (0 == e.rules.length) return !1;
                for (var a = b.pos + 1, r = b.pos + 1, n = [], o = 0; o < e.rules.length; o++)
                    if (!0, e.rules[o].value == k[e.name]) {
                        var i = e.rules[o].action_value;
                        if ("append.question" == (p = e.rules[o].action)) {
                            for (var s = !1, l = 0; l < b.questions.length; l++) b.questions[l].name == i && (s = !0);
                            if (!s) {
                                for (var d = 0, c = 0; c < b.branching.length; c++) b.branching[c].name == i && (d = c);
                                b.questions.splice(a, 0, b.branching[d]), n.push(i), a++, _(), e = b.questions[b.pos], $(".inline-bark-percentage-thumb").width(e.index / b.questionsLength * 100 + "%")
                            }
                            t = !0
                        } else if ("hide.question" == p) {
                            for (var u = 0; u < b.questions.length; u++) b.questions[u].name == i && (b.questions.splice(u, 1), t = !0);
                            _(), $(".inline-bark-percentage-thumb").width(e.index / b.questionsLength * 100 + "%")
                        }
                    } else {
                        var p;
                        i = e.rules[o].action_value;
                        if ("append.question" == (p = e.rules[o].action)) {
                            for (u = 0; u < b.questions.length; u++)
                                if (b.questions[u].name == i && -1 == g.jQuery.inArray(i, n)) {
                                    b.questions.splice(u, 1);
                                    break
                                }
                        } else if ("hide.question" == p)
                            for (var m = 0; m < b.orgquestions.length; m++)
                                if (b.orgquestions[m].name == i) {
                                    for (var h = !1, f = 0; f < b.questions.length; f++) b.questions[f].name == i && (h = !0);
                                    h || (b.questions.splice(r, 0, b.orgquestions[m]), r++, _())
                                }
                    }
                if (t)
                    for (c = a; c < b.questions.length; c++) {
                        for (var v = 0; v < e.rules.length; v++)
                            if (b.questions[c].name === e.rules[v].action_value) return;
                        b.questions[c].is_conditional && b.questions.splice(c, 1)
                    }
            } catch (e) {}
        }, b.enableContinue = function() {
            $(".inline-bark-btn-continue").html("CONTINUE").prop("disabled", !1).removeClass("disabled")
        }, b.disableContinueForUploading = function() {
            $(".inline-bark-btn-continue").html("Uploading...").prop("disabled", !0).addClass("disabled")
        }, b.prev = function() {
            if (0 < b.pos) {
                $(".inline-bark-modal-email-errors, .inline-bark-modal-errors").addClass("hide"), $(".inline-bark-buttons-container .inline-bark-btn-continue").text("CONTINUE");
                var e = {};
                b.questions[b.pos].name ? e.exqid = b.questions[b.pos].name : e.exqid = b.questions[b.pos].type, e.ext = "bk", $(".inline-bark-modal-errors").addClass("hide"), $("#bark-question-" + b.pos).remove();
                for (var t = jQuery.extend(!0, {}, k), a = [], r = 0; r < b.pos; r++) a.push(b.questions[r].name), a.push(b.questions[r].name + "_other");
                for (var n in t) - 1 < n.indexOf("-") && (-1 < a.indexOf(n) || b.questions[b.pos - 1].name != n && delete k[n]);
                c = "prev", b.dispatchEvent("onChangingQuestion"), b.pos--, 0 == b.pos && (b.questions = b.orgquestions.slice(0)), b.renderCurrent(), e.cid = $("#category_id").val(), e.et = "bk", b.questions[b.pos].name ? e.qid = b.questions[b.pos].name : (e.qid = b.questions[b.pos].type, e.s = b.questions[b.pos].type), "postcode" == b.questions[b.pos].type && (e.s = "location"), w(e)
            }
        }, b.renderCheckbox = function(e) {
            for (var t, a, r, n, o = "", i = m, s = {}, l = 0; l < e.options.length; l++) {
                if (t = e.options[l], n = "custom_question_checkbox_" + b.pos + "_" + t.id, "other" === t.id) {
                    var d = "";
                    if (v.is_array(p[e.name]))
                        for (var c = 0; c < (p[e.name][0] || []).length; c++) "other" == p[e.name][0][c] && (d = p[e.name + "_other"][0]);
                    r = v.getHtml("label", v.getHtml("input", null, n + "_value", "inline-bark-q-label-input", {
                        placeholder: "Other",
                        value: d,
                        name: e.name + "_other",
                        "tab-index": ++y
                    }), null, "inline-bark-q-label other", {
                        for: n
                    })
                } else r = v.getHtml("label", t.label, null, "inline-bark-q-label", {
                    for: n
                });
                if (s = {
                        type: "checkbox",
                        class: "inline-bark-checkbox",
                        name: e.name,
                        "tab-index": ++y
                    }, v.objectSize(p) && v.in_array(t.id, p[e.name] || []) && (s.checked = "checked"), v.is_array(p[e.name]))
                    for (c = 0; c < (p[e.name][0] || []).length; c++) p[e.name][0][c] == t.id && (s.checked = "checked");
                a = v.getHtml("input", null, n, null, s), o += v.getHtml("div", a + r, null, "inline-bark-q-checkbox can-highlight inline-bark-q new-project-field", {
                    style: l < i ? "" : "display:none;"
                })
            }
            if (e.options.length > i && (o += v.getHtml("div", v.getHtml("span", "Show more", null, null, {
                    "data-collapse": i
                }), null, "check-showmore")), void 0 !== e.info && 6 < e.info.length) {
                var u = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                o += v.getHtml("div", u, null, "q-info")
            }
            return o
        }, b.renderSelect = function(e, t) {
            var a, r, n, o, i = "",
                s = {};
            void 0 === t && (t = m);
            for (var l = 0; l < e.options.length; l++) {
                if (a = e.options[l], o = "custom_question_radio_" + b.pos + "_" + a.id, "other" === a.id) {
                    var d = "";
                    v.objectSize(p) && v.in_array(a.id, p[e.name] || []) && (d = p[e.name + "_other"]), n = v.getHtml("label", v.getHtml("input", null, o + "_value", "inline-bark-q-label-input inline-bark-q-radio-other", {
                        placeholder: "Other",
                        name: e.name + "_other",
                        value: d,
                        "tab-index": ++y
                    }), null, "inline-bark-q-label other", {
                        for: o
                    })
                } else n = v.getHtml("label", a.label, null, "inline-bark-q-label", {
                    for: o
                });
                s = {
                    type: "radio",
                    class: "inline-bark-radio",
                    name: e.name,
                    value: a.id,
                    "tab-index": ++y
                }, v.objectSize(p) && v.in_array(a.id, p[e.name] || []) && (s.checked = "check"), r = v.getHtml("input", null, o, null, s), i += v.getHtml("div", r + n, null, "inline-bark-q-radio can-highlight inline-bark-q new-project-field", {
                    style: l < t ? "" : "display:none;"
                })
            }
            if (e.options.length > t && (i += v.getHtml("div", v.getHtml("span", "Show more", null, null, {
                    "data-collapse": t
                }), null, "radio-showmore")), void 0 !== e.info && 6 < e.info.length) {
                var c = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                i += v.getHtml("div", c, null, "q-info")
            }
            return i
        }, b.renderText = function(e) {
            var t = "",
                a = v.getHtml("input", null, null, null, {
                    name: e.name,
                    type: "text",
                    "tab-index": ++y
                });
            if (t += v.getHtml("div", a, null, "inline-bark-q-text inline-bark-q new-project-field"), void 0 !== e.info && 6 < e.info.length) {
                var r = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                t += v.getHtml("div", r, null, "q-info")
            }
            return t
        }, b.renderTextarea = function(e) {
            var t = "",
                a = v.getHtml("textarea", null, null, null, {
                    name: e.name,
                    rows: 5
                });
            if (t = v.getHtml("div", a, null, "inline-bark-q-textarea inline-bark-q new-project-field"), void 0 !== e.info && 6 < e.info.length) {
                var r = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                t += v.getHtml("div", r, null, "q-info")
            }
            return t
        }, b.renderNumber = function(e) {
            var t, a = {
                    name: e.name,
                    type: "text",
                    "tab-index": ++y
                },
                r = "",
                n = [];
            if ((e.min || "" !== e.min && 0 == +e.min) && (a.min = +e.min, n.push("More than or equal to " + a.min)), (e.max || "" !== e.max && 0 == +e.max) && +e.min != +e.max && (a.max = +e.max, n.push("less than or equal to " + a.max)), n.length || n.push("Please enter a number"), a.placeholder = v.ucfirst(n.join(" but ").toLowerCase()), t = v.getHtml("input", null, null, null, a), r = v.getHtml("div", t, null, "inline-bark-q-number inline-bark-q new-project-field"), void 0 !== e.info && 6 < e.info.length) {
                var o = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                r += v.getHtml("div", o, null, "q-info")
            }
            return r
        }, b.renderDate = function(e) {
            var t, a, r, n, o, i = {
                    placeholder: "Select a date",
                    "tab-index": ++y,
                    "data-mindate": e.date_min || null,
                    "data-maxdate": e.date_max || null,
                    class: "bark-date"
                },
                s = "",
                l = "",
                d = "",
                c = "",
                u = "",
                p = "bark-na-" + e.name,
                m = "bark-other-" + e.name,
                h = "bark-unsure-" + e.name;
            if ($("body").hasClass("mobile") ? (i.type = "date", i.class = "bark-date no-pikaday") : i.readonly = "readonly", t = v.getHtml("input", null, null, null, i), e.has_time && (o = v.getHtml("p", v.sprintf("Enter a value for at least one value (e.g %s)", v.date("H:i"))), a = v.getHtml("input", null, null, "bark-date-time", {
                    type: "time",
                    placeholder: "From",
                    "tab-index": ++y
                }), r = v.getHtml("input", null, null, "bark-date-time", {
                    type: "time",
                    placeholder: "To",
                    "tab-index": ++y
                }), n = v.getHtml("div", "From" + a, null, "bark-date-time-from"), n += v.getHtml("div", "To" + r, null, "bark-date-time-to"), t += v.getHtml("div", o + n, null, "bark-date-time-container")), e.allow_unsure && (s = v.getHtml("div", v.getHtml("input", null, h, "bark-date-unsure", {
                    type: "checkbox",
                    "tab-index": ++y
                }) + v.getHtml("label", "I'm not sure yet", null, null, {
                    for: h
                }))), e.allow_na && (l = v.getHtml("div", v.getHtml("input", null, p, "bark-date-na", {
                    type: "checkbox",
                    "tab-index": ++y
                }) + v.getHtml("label", "Not applicable", null, null, {
                    for: p
                }))), e.allow_other && (u = v.getHtml("input", null, m, "bark-date-other", {
                    type: "checkbox",
                    "tab-index": ++y
                }), u += v.getHtml("label", "Other", null, null, {
                    for: m
                }), u += v.getHtml("div", v.getHtml("input", null, null, null, {
                    placeholder: "Other",
                    type: "text",
                    "tab-index": ++y
                }), null, "bark-date-other-text"), c = v.getHtml("div", u)), t = v.getHtml("div", t, null, "bark-date-main-cont"), t += "<br>", d = v.getHtml("div", t + s + l + c, null, "inline-bark-q-date inline-bark-q new-project-field"), void 0 !== e.info && 6 < e.info.length) {
                var f = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                d += v.getHtml("div", f, null, "q-info")
            }
            return d
        }, b.renderUpload = function(e) {
            var t = "",
                a = "";
            if (e.has_textarea && (t = v.sprintf("<h5>%s%s</h5>", e.textarea_label, e.textarea_required ? "" : " <span>(Optional)</span>"), t += v.getHtml("textarea", null, null, null, {
                    name: e.name,
                    rows: 5,
                    "tab-index": ++y
                }), a = v.getHtml("div", t, null, "inline-bark-q-textarea inline-bark-q new-project-field")), "<style>.project-image .photo-inner {float:inherit!important;}.new-project-intro {margin-bottom: 14px;}</style>", '  <div class="dropzoneContainer"><div id="modalUploadFiles"><div class="fileinput-button needsclick"><span class="fa fa-plus"></span></div></div><div id="previews-modal"></div></div>', a += v.getHtml("div", '<style>.project-image .photo-inner {float:inherit!important;}.new-project-intro {margin-bottom: 14px;}</style>  <div class="dropzoneContainer"><div id="modalUploadFiles"><div class="fileinput-button needsclick"><span class="fa fa-plus"></span></div></div><div id="previews-modal"></div></div>', null, "inline-bark-q inline-bark-additional"), void 0 !== e.info && 6 < e.info.length) {
                var r = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                a += v.getHtml("div", r, null, "q-info")
            }
            return a
        }, b.renderAdditional = function(e) {
            var t, a = v.sprintf("<h5>Write any extra details%s</h5>", 1 === b.questionsLength ? "" : " <span>(Optional)</span>");
            if (a += v.getHtml("textarea", null, "project_detail", null, {
                    name: "project_detail",
                    rows: 5,
                    "tab-index": ++y
                }), e.show_local_checkbox) {
                var r = "Do you want someone local?";
                try {
                    var n = b.categoryData.categories[b.lastCategory].modal_text;
                    void 0 !== n && null != n || (n = {}), r = n.additional_details_someone_local.value
                } catch (e) {}
                var o = v.getHtml("h5", r),
                    i = v.getHtml("input", null, "is_local", null, {
                        type: "checkbox",
                        name: "is_local",
                        "tab-index": ++y
                    });
                i += v.getHtml("label", "Yes, local only", null, null, {
                    for: "is_local"
                }), a += v.getHtml("div", o + i, "", "someone-local")
            }
            t = v.getHtml("div", a, null, "inline-bark-q-textarea inline-bark-q inline-bark-additional");
            var s = !1;
            return b.questions.map(function(e) {
                "upload" == e.type && (s = !0)
            }), s ? t : ("<style>.project-image .photo-inner {float:inherit!important;}.new-project-intro {margin-bottom: 14px;}</style>", "<h5>Attach any images or files <span>(Optional)</span></h5>", '  <div class="dropzoneContainer"><div id="modalUploadFiles"><div class="fileinput-button needsclick"><span class="fa fa-plus"></span></div></div><div id="previews-modal"></div></div>', t += v.getHtml("div", '<style>.project-image .photo-inner {float:inherit!important;}.new-project-intro {margin-bottom: 14px;}</style><h5>Attach any images or files <span>(Optional)</span></h5>  <div class="dropzoneContainer"><div id="modalUploadFiles"><div class="fileinput-button needsclick"><span class="fa fa-plus"></span></div></div><div id="previews-modal"></div></div>', null, "inline-bark-q inline-bark-additional"))
        }, b.renderUpsellLoading = function() {
            return setTimeout(b.next, 3e3), '<div class="new-project-container" id="inline-bark-question"><div class="center">' + "<div class='uil-ripple-css' style='transform:scale(0.5);'><div></div><div></div></div>" + function() {
                var e = "Searching for professionals near you",
                    t = P();
                void 0 !== t && t && (e = t.searching_for_prof.value);
                return "<h4>" + e + "</h4>"
            }() + "</div></div>"
        }, b.renderUpsell = function() {
            return '<div class="new-project-container" id="inline-bark-question"><div class="center"><p class="bark-pseudo-title">' + function() {
                var e = "Great - we've got pros ready and available.",
                    t = P();
                void 0 !== t && t && (e = t.search_response_heading.value);
                return e
            }() + '</p><i class="fa fa-check-circle" aria-hidden="true"></i></div><p class="inline-bark-modal-hide-p inline-bark-modal-hide-p-alt center">' + function(e) {
                var t = "Click 'continue' to get your quotes.",
                    a = P();
                void 0 !== a && a && (t = "", a.search_response_subheading.show && (t = a.search_response_subheading.value));
                return t
            }() + "</p></div>"
        }, b.renderBuyerInfo = function() {
            var e, t, a, r, n, o = "";
            (b.sellerLoggedIn && null === b.userName || !b.userLoggedIn) && (r = v.getHtml("label", "Please enter your name", null, "inline-bark-new-user-label", {
                for: "inline-bark-new-user-name"
            }) + v.getHtml("input", null, "inline-bark-new-user-name", "inline-bark-q-new-user", {
                placeholder: "Full Name",
                name: "name",
                type: "text",
                "tab-index": ++y
            }), o += v.getHtml("div", r, null, "new-project-field inline-bark-q-cont")), b.userLoggedIn || (n = v.getHtml("label", "Email address youâ€™d like quotes sent to", null, "inline-bark-new-user-label", {
                for: "inline-bark-new-user-email"
            }) + v.getHtml("input", null, "inline-bark-new-user-email", "inline-bark-q-new-user", {
                placeholder: "Email Address",
                name: "email",
                type: "email",
                "tab-index": ++y
            }), o += v.getHtml("div", n, null, "new-project-field inline-bark-q-cont")), a = v.getHtml("label", "Please enter your phone number", null, "inline-bark-new-user-label", {
                for: "inline-bark-new-user-email"
            }) + v.getHtml("input", null, "inline-bark-new-user-telephone", "inline-bark-q-new-user", {
                placeholder: "Phone number",
                name: "telephone",
                value: b.buyerTelephone || "",
                type: "tel",
                "tab-index": ++y
            });
            var i = b.categoryData.categories[b.lastCategory];
            (void 0 !== i && null != i || (i = {}), void 0 !== i.final_phone_text) && i.final_phone_text.show;
            return void 0 !== i.final_button_text && $(".inline-bark-buttons-container .inline-bark-btn-submit").text(i.final_button_text.value), t = v.getHtml("input", null, "inline-bark-teldesc", null, {
                type: "checkbox",
                checked: "checked"
            }), t += v.getHtml("label", "I am happy to receive occasional marketing emails from Bark", null, null, {
                for: "inline-bark-teldesc"
            }), a += v.getHtml("div", t, null, "optout"), o += v.getHtml("div", a, null, "new-project-field inline-bark-q-cont"), e = v.getHtml("div", o), v.getHtml("div", e, "inline-bark-new-user", "inline-bark-q")
        }, b.renderAccountName = function() {
            var e, t = "",
                a = "";
            return a = v.getHtml("label", "Please tell us your name for the quotes:", null, "inline-bark-new-user-label", {
                for: "inline-bark-new-user-name"
            }), a += v.getHtml("input", null, "inline-bark-new-user-name", "inline-bark-q-new-user", {
                placeholder: "Full Name",
                name: "name",
                type: "text",
                "tab-index": ++y
            }), t += v.getHtml("div", a, null, "new-project-field account-information-row inline-bark-q-cont"), e = v.getHtml("div", t), v.getHtml("div", e, "inline-bark-acc-user", "inline-bark-q")
        }, b.renderAccountEmail = function() {
            var e, t, a, r = "";
            return t = v.getHtml("input", null, "inline-bark-new-user-email", "inline-bark-q-new-user", {
                placeholder: "Email Address",
                name: "email",
                type: "email",
                "tab-index": ++y
            }), "", a = v.getHtml("input", null, "inline-bark-teldesc", null, {
                type: "checkbox",
                checked: "checked"
            }), a += v.getHtml("label", "I am happy to receive occasional marketing emails from Bark", null, null, {
                for: "inline-bark-teldesc"
            }), t += "", t += v.getHtml("div", a, null, "optout"), r += v.getHtml("div", t, null, "new-project-field account-information-row inline-bark-q-cont"), e = v.getHtml("div", r), v.getHtml("div", e, "inline-bark-new-user", "inline-bark-q")
        }, b.renderAccountTel = function() {
            var e, t, a = "",
                r = "";
            t = v.getHtml("input", null, "inline-bark-new-user-telephone", "inline-bark-q-new-user", {
                placeholder: "Phone number",
                name: "telephone",
                value: b.buyerTelephone || "",
                type: "tel",
                "tab-index": ++y
            });
            var n = b.categoryData.categories[b.lastCategory];
            if (v.is_a(n, "object") || (n = {}), void 0 !== n.final_phone_text) n.final_phone_text.show && (r = "Professionals will only be given your details once they've sent you a quote.", t += v.getHtml("div", r, null, "detail-desc"));
            else {
                r = "Professionals will only be given your details once they've sent you a quote.", t += v.getHtml("div", r, null, "phone-desc spacing")
            }
            return void 0 !== n.final_button_text && $(".inline-bark-buttons-container .inline-bark-btn-submit").text(n.final_button_text.value), a += v.getHtml("div", t, null, "new-project-field account-information-row inline-bark-q-cont"), e = v.getHtml("div", a), v.getHtml("div", e, "inline-bark-new-user", "inline-bark-q")
        }, b.renderPostcode = function(e) {
            var t = "",
                a = "postcode",
                r = (g.Bark.ENV.locale || "").toLowerCase();
            u(r) ? a = "zip code" : "ie" == r && (a = "location");
            var n = v.getHtml("input", null, "postcode-auto", "postcode-auto", {
                name: e.name,
                placeholder: "Enter your " + a,
                "tab-index": ++y
            });
            if (t = v.getHtml("div", n, null, "inline-bark-q-text inline-bark-q new-project-field"), void 0 !== e.info && 6 < e.info.length) {
                var o = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                t += v.getHtml("div", o, null, "q-info")
            }
            return t
        }, b.renderPhotocheck = function(e) {
            var t, a, r, n, o = "",
                i = m;
            for (n = 0; n < e.options.length; n++)
                if (!(void 0 === (t = e.options[n]).photo || t.photo.length < 4)) {
                    var s = "custom_question_checkbox_" + b.pos + "_" + t.id;
                    r = v.getHtml("input", null, s, "photoselect-option", {
                        type: "checkbox",
                        value: t.label,
                        name: e.name,
                        "tab-index": ++y
                    });
                    var l = v.getHtml("i", null, null, "fa fa-check");
                    a = v.getHtml("div", l, null, "picoverlay"), a += v.getHtml("div", null, null, null, {
                        style: v.sprintf("background-image:url(%s)", t.photo)
                    }), a += v.getHtml("p", t.label), o += v.getHtml("div", r + v.getHtml("label", a, null, null, {
                        inpid: s
                    }), null, "opts", {
                        style: n < m ? "" : "display:none;"
                    })
                }
            if (o = v.getHtml("div", o, null, "photoselect photoselect-check pickbyimage"), e.options.length > i && (o += v.getHtml("div", v.getHtml("span", "Show more", null, null, {
                    "data-collapse": i
                }), null, null, {
                    class: "showmorebtn phc-showmore"
                })), void 0 !== e.info && 6 < e.info.length) {
                var d = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                o += v.getHtml("div", d, null, "q-info")
            }
            return o
        }, b.renderPhotoselect = function(e) {
            var t, a, r, n, o = "",
                i = m,
                s = {},
                l = "";
            for (n = 0; n < e.options.length; n++)
                if (l = "", !(void 0 === (t = e.options[n]).photo || t.photo.length < 4)) {
                    s = {
                        type: "radio",
                        name: e.name,
                        id: e.name + "-option-" + t.id,
                        value: t.id,
                        "tab-index": ++y
                    }, v.objectSize(p) && v.in_array(t.id, p[e.name] || []) && (s.checked = "check", l = "selectedpic"), r = v.getHtml("input", null, null, "photoselect-option", s);
                    var d = v.getHtml("i", null, null, "fa fa-check");
                    a = v.getHtml("div", d, null, "picoverlay"), a += v.getHtml("div", null, null, null, {
                        style: v.sprintf("background-image:url(%s)", t.photo)
                    }), a += v.getHtml("p", t.label), o += v.getHtml("div", r + v.getHtml("label", a, null, null, {
                        inpid: e.name + "-option-" + t.id
                    }), null, "opts " + l, {
                        style: n < m ? "" : "display:none;"
                    })
                }
            if (o = v.getHtml("div", o, null, "photoselect photoselect-radio pickbyimage"), e.options.length > i && (o += v.getHtml("div", v.getHtml("span", "Show more", null, null, {
                    "data-collapse": i
                }), null, null, {
                    class: "showmorebtn phc-showmore"
                })), void 0 !== e.info && 6 < e.info.length) {
                var c = '<i class="fa fa-info-circle" aria-hidden="true"></i> ' + e.info;
                o += v.getHtml("div", c, null, "q-info")
            }
            return o
        }, b.renderCategorySelection = function(e) {
            var t, a, r, n, o = "",
                i = "";
            if (i += v.getHtml("button", "Continue", null, "next-category-chosen"), e.thumbnailsAll) {
                for (t = 0; t < e.options.length; t++) a = e.options[t], n = v.getHtml("input", null, null, "choose-category-option", {
                    type: "radio",
                    name: "choose-category-option",
                    id: "category-option-" + a.id,
                    value: a.id,
                    "tab-index": ++y
                }), r = v.getHtml("div", null, null, null, {
                    style: v.sprintf("background-image:url(%s)", a.thumbnail[1 === s ? "1x" : "2x"])
                }), r += v.getHtml("p", a.label), o += v.getHtml("div", n + v.getHtml("label", r, null, null, {
                    for: "category-option-" + a.id
                }), null, "opts", {
                    style: t < m ? "" : "display:none;"
                });
                e.options.length > m && (o += v.getHtml("div", v.getHtml("span", "Show more"), null, "choose-category-showmore"))
            } else o = b.renderSelect(e, m);
            return o += v.getHtml("div", i, null, "btns"), v.getHtml("div", o, null, "choose-category" + (e.thumbnailsAll ? " pickbyimage" : ""))
        }, b.renderIntro = function() {
            var e = b.categoryData.categories[b.lastCategory].modal_text;
            void 0 !== e && null != e || (e = {});
            var t, a = "We'll ask you a few questions so we can bring you the right pros.";
            return void 0 !== e.intro_heading && (a = e.intro_heading.value), t = v.getHtml("span", null, null, "bark-icon-logo"), t += v.getHtml("h2", a), t += v.getHtml("div", v.getHtml("button", v.getHtml("i", null, null, "fa fa-chevron-left") + "Back", null, "inline-bark-btn-back"), null, "intro-btn"), t += v.getHtml("div", v.getHtml("button", "Next" + v.getHtml("i", null, null, "fa fa-chevron-right"), null, "inline-bark-btn-continue"), null, "intro-btn"), v.getHtml("div", t, null, "inline-bark-modal-variant2")
        }, b.renderModalExperiment = function(e) {
            b.categPhotoAvail || ($(".modal-category-experiment-photo, .modal-category-experiment-title").html(""), $("#inlineBarkModal .inline-bark-modal-hide-h1").css({
                "padding-top": "1em"
            })), b.categPhotoAvail && "" != b.modalCategPhoto && (!b.introAvail && 0 == e || b.introAvail && 1 == e ? ($(".modal-category-experiment-photo").slideDown({
                duration: 600,
                easing: "easeOutCirc"
            }), $("#inlineBarkModal .inline-bark-modal-hide-h1").css({
                "padding-top": "0.3em"
            }), b.questions[e].hideProgress = !0) : ($(".modal-category-experiment-photo").slideUp({
                duration: 600,
                easing: "easeOutCirc"
            }), $("#inlineBarkModal .inline-bark-modal-hide-h1").css({
                "padding-top": "1em"
            })))
        }, b.renderCurrent = function() {
            var e = b.questions[b.pos],
                t = "render" + v.ucfirst(e.type),
                a = "bark-question-" + b.pos,
                r = $("#" + a),
                n = e.gaPath || "q" + (b.pos + 1),
                o = e.fbqPath || "Step " + b.pos + 1,
                i = $("#category_id").val(),
                s = (g.Bark.ENV.locale || "").toLowerCase();
            b.renderModalExperiment(b.pos), "buyerInfo" === e.type && (r.remove(), r = $("#" + a));
            try {
                b.pos === b.userQuestionsCount() && v.json({
                    url: "/api/tsug/",
                    data: {
                        payload: JSON.stringify(k),
                        cid: $("#category_id").val(),
                        pid: $("#postcode_id").val(),
                        ptype: $("#postcode_type").val()
                    }
                })
            } catch (e) {
                console.error(e)
            }
            if ($(".inline-bark-buttons-container .inline-bark-btn-continue").text("CONTINUE"), "upsell" === e.type) try {
                var l = b.categoryData.categories[b.lastCategory].modal_text;
                void 0 !== l && null != l || (l = {}), void 0 !== l.final_button_continue && $(".inline-bark-buttons-container .inline-bark-btn-continue").text(l.final_button_continue.value)
            } catch (e) {
                console.log(e)
            }
            if (e.showOnce && e.shown) b[c]();
            else {
                var d;
                if (ga("send", "pageview", v.sprintf("en/%s/buyer-modal/%s/%s/%s/", s, i, b.categoryUrl, n)), d = o, v.is_function(g.fbq) && fbq("track", "ViewContent", {
                        content_name: "Buyer Modal " + d,
                        content_category: $("#category_id").val(),
                        content_ids: [$("#category_id").val()],
                        content_type: "product"
                    }), $("body,html").animate({
                        scrollTop: 0
                    }, 800), e.shown = !0, !b[t]) throw new v.ex(v.sprintf("Unknown render function %s", t));
                $(".inline-bark-main-content .bark-modal-question").hide(), r.length || ($(".inline-bark-main-content").append(v.getHtml("div", b[t](e), a, "bark-modal-question")), r = $("#" + a)), r.find(":input:first").focus(), r.show(), $("#inlineBarkModal .inline-bark-modal-hide-h1").html((e.label ? e.label : "") + (e.labelExtra ? v.getHtml("span", e.labelExtra) : "")), e.index && $(".inline-bark-percentage-thumb").width(e.index / b.questionsLength * 100 + "%"), $("#inlineBarkModal .inline-bark-header")[e.hideTop ? "hide" : "show"](), $(".inline-bark-percentage-track")[e.hideProgress ? "hide" : "show"](), $("#inlineBarkModal .inline-bark-modal-hide-hr")[e.hideRuler ? "hide" : "show"](), $("#inlineBarkModal .inline-bark-border")[e.hideBorder ? "hide" : "show"](), e.hideNavigation ? $(".inline-bark-buttons-container").not(".inline-bark-buttons-container.close-modal").hide() : ($(".inline-bark-buttons-container").show(), $(".inline-bark-btn-back")[b.pos ? "removeClass" : "addClass"]("hide"), b.pos + 1 === b.questions.length ? ($(".inline-bark-btn-continue").addClass("hide"), $(".inline-bark-btn-submit").removeClass("hide")) : ($(".inline-bark-btn-continue").removeClass("hide"), $(".inline-bark-btn-submit").addClass("hide"))), "intro" === e.type && e.hideBack ? $("div.intro-btn .inline-bark-btn-back").hide() : "intro" === e.type && $("div.intro-btn .inline-bark-btn-back").show(), b.bindEvents(), b.dispatchEvent("onEnterQuestion")
            }
        }, b.validatePhotocheck = function() {
            var e = b.questions[b.pos],
                t = !1,
                a = $("#bark-question-" + b.pos);
            return $(".photoselect-option", a).each(function() {
                this.checked && (t = !0)
            }), !(e.required && !t) || ($(".inline-bark-modal-errors").text("Please select at least one option.").removeClass("hide"), a.addClass("new-error"), !1)
        }, b.validateCheckbox = function() {
            var e, t = b.questions[b.pos],
                a = !1,
                r = !1,
                n = $("#bark-question-" + b.pos);
            return $(".inline-bark-checkbox", n).each(function() {
                this.checked && (a = !0, this.id.match(/_other$/) && (e = $(v.sprintf("#%s_value", this.id), n), r = !e.val().trim().length))
            }), t.required && !a ? ($(".inline-bark-modal-errors").text("Please select an option.").removeClass("hide"), n.addClass("new-error"), !1) : !r || ($(".inline-bark-modal-errors").text("Please enter a value for 'Other'").removeClass("hide"), e.closest(".inline-bark-q").addClass("new-error"), !1)
        }, b.validatePhotoselect = function() {
            var e = b.questions[b.pos],
                t = $("#bark-question-" + b.pos),
                a = ($(".photoselect-option:checked", t).val() || "").trim();
            return !(e.required && !a.length) || ($(".inline-bark-modal-errors").text("Please select an option.").removeClass("hide"), t.addClass("new-error"), !1)
        }, b.validateSelect = function() {
            var e = b.questions[b.pos],
                t = $("#bark-question-" + b.pos),
                a = ($(".inline-bark-radio:checked", t).val() || "").trim(),
                r = $(".inline-bark-q-radio-other", t);
            return e.required && !a.length ? ($(".inline-bark-modal-errors").text("Please select an option.").removeClass("hide"), t.addClass("new-error"), !1) : !("other" === a && !r.val().trim().length) || ($(".inline-bark-modal-errors").text("Please enter a value for 'Other'").removeClass("hide"), r.addClass("new-error"), !1)
        }, b.validatePostcode = function() {
            var e = "Please enter a valid ",
                t = (g.Bark.ENV.locale || "").toLowerCase();
            u(t) ? e += "zip code" : e += "ie" == t ? "location" : "postcode";
            var a = 0,
                r = b.questions[b.pos],
                n = $("#bark-question-" + b.pos);
            if ("ie" == t)(o = $("#postcode_id").val()) && 2 < o.length && (o = 10);
            else var o = parseInt($("#postcode_id").val());
            if (r.required && !$(".inline-bark-q-text input", n).val().trim().length) return setTimeout(function() {
                var e = {};
                e.cid = $("#category_id").val(), b.questions[b.pos].name ? e.qid = b.questions[b.pos].name : e.qid = b.questions[b.pos].type, e.type = "loc-err", e.errtype = "required", e.errvalue = $(".inline-bark-q-text input", n).val().trim(), C(e)
            }, 300), $(".inline-bark-modal-errors").text(e).removeClass("hide"), n.addClass("new-error"), !1;
            if (o < 1 || isNaN(o)) return setTimeout(function() {
                var e = {};
                e.cid = $("#category_id").val(), b.questions[b.pos].name ? e.qid = b.questions[b.pos].name : e.qid = b.questions[b.pos].type, e.type = "loc-err", e.errtype = "not-valid", e.errvalue = $(".inline-bark-q-text input", n).val().trim(), C(e)
            }, 300), $(".inline-bark-modal-errors").text(e).removeClass("hide"), n.addClass("new-error"), !1;
            for (a = 0; a < b.questions.length; a++)
                if ("buyerInfo" === b.questions[a].type) {
                    b.questions[a] = h();
                    break
                }
            return !0
        }, b.validateUpload = function() {
            var e = b.questions[b.pos],
                t = $("#bark-question-" + b.pos);
            return !(e.has_textarea && e.textarea_required && !$(".inline-bark-q-textarea textarea", t).val().trim().length) || ($(".inline-bark-modal-errors").text("Please enter a value").removeClass("hide"), t.addClass("new-error"), !1)
        }, b.validateText = function() {
            var e = b.questions[b.pos],
                t = $("#bark-question-" + b.pos);
            return !(e.required && !$(".inline-bark-q-text input", t).val().trim().length) || ($(".inline-bark-modal-errors").text("Please enter a value").removeClass("hide"), t.addClass("new-error"), !1)
        }, b.validateTextarea = function() {
            var e = b.questions[b.pos],
                t = $("#bark-question-" + b.pos);
            return !(e.required && !$(".inline-bark-q-textarea textarea", t).val().trim().length) || ($(".inline-bark-modal-errors").text("Please enter a value").removeClass("hide"), t.addClass("new-error"), !1)
        }, b.validateNumber = function() {
            var e = b.questions[b.pos],
                t = $("#bark-question-" + b.pos),
                a = $(".inline-bark-q-number input", t).val().trim();
            if (!a.length && e.required) return $(".inline-bark-modal-errors").text("Please enter a value").removeClass("hide"), t.addClass("new-error"), !1;
            if (a = a.match(/[^0-9e\-]+/) ? NaN : parseFloat(a), isNaN(a)) {
                var r = v.date("j");
                return e.min && r < e.min && (r = e.min), e.max && r > e.max && (r = e.max), $(".inline-bark-modal-errors").text("Please enter a valid number, e.g. " + r).removeClass("hide"), t.addClass("new-error"), !1
            }
            return (e.min || 0 === e.min) && a < e.min ? ($(".inline-bark-modal-errors").text("Please set a value more than or equal to " + e.min).removeClass("hide"), t.addClass("new-error"), !1) : !e.max && 0 !== e.max || !(a > e.max) || ($(".inline-bark-modal-errors").text("Please set a value less than or equal to " + e.max).removeClass("hide"), t.addClass("new-error"), !1)
        }, b.validateDate = function() {
            var e, t, a, r, n, o, i, s, l = b.questions[b.pos],
                d = $("#bark-question-" + b.pos),
                c = "Please set a valid date, e.g. " + v.date("l jS F Y"),
                u = ($(".bark-date", d).data("datepicker") || "").toString().trim(),
                p = 60 * -(new Date).getTimezoneOffset();
            if ($(".bark-date-unsure", d).is(":checked") || $(".bark-date-na", d).is(":checked")) return !0;
            if ($(".bark-date-other", d).is(":checked")) return !!$.trim($(".bark-date-other-text input", d).val()).length || ($(".inline-bark-modal-errors").text("Please give a valid reason for 'other'").removeClass("hide"), !1);
            if (l.required && !$(".bark-date", d).val().trim()) return $(".inline-bark-modal-errors").text("Please select a date").removeClass("hide"), !1;
            try {
                if (!(o = new Date(u).getTime() / 1e3 + p)) return $(".inline-bark-modal-errors").text(c).removeClass("hide"), !1;
                if (n = g.strtotime(v.date("Y/m/d 00:00:00")), l.date_min) {
                    if ("today" === l.date_min) i = n;
                    else {
                        i = strtotime(l.date_min);
                        var m = new Date(1e3 * i);
                        m.setMinutes(0), m.setHours(0), m.setSeconds(0), m.setMilliseconds(0), i = m.getTime() / 1e3 + p
                    }
                    if (!1 === i && (i = strtotime("now", l.date_min)), !1 !== i && o < i) return $(".inline-bark-modal-errors").text("Please select a date on or after " + v.date("jS M Y", 1e3 * (i + p))).removeClass("hide"), !1
                }
                if (l.date_max && (!1 === (s = "today" === l.date_max ? n : strtotime(l.date_max)) && (s = strtotime("now", l.date_max)), !1 !== s && s < o)) return $(".inline-bark-modal-errors").text("Please select a date on or before " + v.date("jS M Y", 1e3 * (s + p))).removeClass("hide"), !1
            } catch (e) {
                return console.error(e.toString()), $(".inline-bark-modal-errors").text(c).removeClass("hide"), !1
            }
            return !$(".bark-date-time-container", d).length || (e = $(".bark-date-time-from input", d).val().trim(), t = $(".bark-date-time-to input", d).val().trim(), e || t ? e && (a = e.split(":"), !e.match(/^\d\d:\d\d$/) || +a[0] < 0 || 23 < +a[0] || +a[1] < 0 || 59 < a[1]) ? ($(".inline-bark-modal-errors").text("The start time should be in the 24hr clock format HH:MM").removeClass("hide"), !1) : t && (r = t.split(":"), !t.match(/^\d\d:\d\d$/) || +r[0] < 0 || 23 < +r[0] || +r[1] < 0 || 59 < r[1]) ? ($(".inline-bark-modal-errors").text("The end time should be in the 24hr clock format HH:MM").removeClass("hide"), !1) : !(e && t && strtotime(v.date(v.sprintf("Y/m/d %s", t))) < strtotime(v.date(v.sprintf("Y/m/d %s", e)))) || ($(".inline-bark-modal-errors").text("The end time cannot be before the start time").removeClass("hide"), !1) : ($(".inline-bark-modal-errors").text("Please select a start or end time").removeClass("hide"), !1))
        }, b.validateBuyerInfo = function() {
            var e, t = $("#inline-bark-new-user-telephone").length,
                a = t ? $("#inline-bark-new-user-telephone").val().trim().replace(/[^0-9]/g, "") : "",
                r = !!$("#inline-bark-new-user-name").length,
                n = ($("#inline-bark-new-user-name").val() || "").trim();
            if (r && (!n.length || "no" === n.toLowerCase())) return $(".inline-bark-modal-errors").text("Please enter your name").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1;
            if (r && n.replace(/[^a-zA-Z]/g, "").length < 2) return $(".inline-bark-modal-errors").text("Please enter a longer name").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1;
            if (r && n.match(/@|\.co.?/i)) return $(".inline-bark-modal-errors").text("Please enter your email in the email field only").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1;
            if (r && n.match(/[0-9]$/)) return $(".inline-bark-modal-errors").text("Numbers are not allowed in the buyer name field").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1;
            if ($("#inline-bark-new-user-email").length && !$("#inline-bark-new-user-email").val().trim().length) return $(".inline-bark-modal-errors").text("Please enter your email address").removeClass("hide"), $("#inline-bark-new-user-email").closest(".new-project-field").addClass("new-error"), !1;
            if (t && !a.length) return $(".inline-bark-modal-errors").text("Please enter your telephone number").removeClass("hide"), $("#inline-bark-new-user-telephone").closest(".new-project-field").addClass("new-error"), !1;
            if (t) {
                if ((e = g.basicPhoneCheck.test(a)).invalid) return $(".inline-bark-modal-errors").text("Please enter a valid telephone number").removeClass("hide"), $("#inline-bark-new-user-telephone").closest(".new-project-field").addClass("new-error"), !1;
                if (e.badChars) return $(".inline-bark-modal-errors").text("Please enter a number in the form '0xxxxxxxxxx'").removeClass("hide"), $("#inline-bark-new-user-telephone").closest(".new-project-field").addClass("new-error"), !1
            }
            return !0
        }, b.validateAccountName = function() {
            var e = ($("#inline-bark-new-user-name").val() || "").trim(),
                t = b.findAccountNameErrors(e);
            return t.empty ? ($(".inline-bark-modal-errors").text("Please enter your name").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1) : t.tooshort ? ($(".inline-bark-modal-errors").text("Please enter a longer name").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1) : t.isemail ? ($(".inline-bark-modal-errors").text("Please enter your email in the email field only").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1) : !t.hasnumbers || ($(".inline-bark-modal-errors").text("Numbers are not allowed in the buyer name field").removeClass("hide"), $("#inline-bark-new-user-name").closest(".new-project-field").addClass("new-error"), !1)
        }, b.findAccountNameErrors = function(e) {
            var t = {
                empty: !1,
                hasnumbers: !1,
                isemail: !1,
                tooshort: !1
            };
            return (e = e.trim()).length && "no" !== e.toLowerCase() || (t.empty = !0), e.length < 2 && (t.tooshort = !0), e.match(/@|\.co.?/i) && (t.isemail = !0), e.match(/[0-9]/) && (t.hasnumbers = !0), t
        }, b.validateAccountEmail = function() {
            return !($("#inline-bark-new-user-email").length && !$("#inline-bark-new-user-email").val().trim().length) || ($(".inline-bark-modal-errors").text("Please enter your email address").removeClass("hide"), $("#inline-bark-new-user-email").closest(".new-project-field").addClass("new-error"), !1)
        }, b.validateAccountTel = function() {
            var e = b.findAccountTelErrors($("#inline-bark-new-user-telephone").val());
            return e.empty ? ($(".inline-bark-modal-errors").text("Please enter your telephone number").removeClass("hide"), $("#inline-bark-new-user-telephone").closest(".new-project-field").addClass("new-error"), !1) : e.invalid ? ($(".inline-bark-modal-errors").text("Please enter a valid telephone number").removeClass("hide"), $("#inline-bark-new-user-telephone").closest(".new-project-field").addClass("new-error"), !1) : !e.badchars || ($(".inline-bark-modal-errors").text("Please enter a number in the form '0xxxxxxxxxx'").removeClass("hide"), $("#inline-bark-new-user-telephone").closest(".new-project-field").addClass("new-error"), !1)
        }, b.findAccountTelErrors = function(e) {
            var t, a = {
                badchars: !1,
                empty: !1,
                invalid: !1
            };
            return (e = e.trim().replace(/[^0-9]/g, "")).length || (a.empty = !0), (t = g.basicPhoneCheck.test(e)).invalid && (a.invalid = !0), t.badChars && (a.badchars = !0), a
        }, b.validateAdditional = function() {
            var e, t = b.questions[b.pos],
                a = $("#project_detail"),
                r = a.val() || "",
                n = r.replace(/\d{1,2}[\s\.\-\/]+\d{1,2}[\s\.\-\/]+\d{2,4}/gi, "").replace(/[^A-Za-z0-9]/gi, "").match(/[0-9]{6,14}/);
            return t.required && (r.length || (e = "Please enter a value"), !e && r.length < l && (e = v.sprintf("Please enter a value of more than %d characters", l))), !e && n && (e = v.sprintf("Please do not enter a phone number (%s) in the details", n[0])), !e || ($(".inline-bark-modal-errors").text(e).removeClass("hide"), a.closest(".inline-bark-q").addClass("new-error"), !1)
        }, b.validateCurrent = function() {
            var e = b.questions[b.pos],
                t = "validate" + v.ucfirst(e.type),
                a = !(t in b) || b[t]();
            if (a && $(".inline-bark-main-content .new-error").removeClass("new-error"), $(".inline-bark-modal-errors")[a ? "addClass" : "removeClass"]("hide"), !a) {
                var r = {};
                r.cid = $("#category_id").val(), b.questions[b.pos].name ? r.qid = b.questions[b.pos].name : r.qid = b.questions[b.pos].type, "postcode" != b.questions[b.pos].type && C(r)
            }
            return a
        }, b.userQuestionsCount = function(e) {
            for (var t = 0, a = 0; a < b.questions.length; a++) b.questions[a].hasOwnProperty("omitFromCount") && b.questions[a].omitFromCount || "additional" !== b.questions[a].type && t++;
            return t
        }, b.processCategory = function(e) {
            var t, a = 0,
                r = !1;
            if (b.questions = e.custom_fields || [], b.branching = e.branching || [], b.questionsRequired = parseInt(e.custom_questions_required), b.userLoggedIn = b.categoryData.user.userLoggedIn, b.userName = "userName" in b.categoryData.user && (b.categoryData.user.userName || null), b.sellerLoggedIn = b.categoryData.user.sellerLoggedIn, b.categoryUrl = e.name_url, b.questionsLength = 0, b.buyerTelephone = "telephone" in b.categoryData.user && (b.categoryData.user.telephone || null), b.showAdditionals = e.additional_details, b.showLocalCheck = e.show_local_checkbox, t = 0 === b.questions.length, $("#category_id_top").val() && $("#postcode_id_top").val() && ($("#category_id").val($("#category_id_top").val()), $("#postcode_id").val($("#postcode_id_top").val()), $("#postcode_type").val($("#postcode_type_top").val()), $("#category_name").val($("#category_name_top").val())), ga("set", "dimension1", b.categoryUrl), b.userLoggedIn || (r = !0), e.intro) {
                var n = {
                    has_custom_questions: !(b.introAvail = !0),
                    is_local: !0,
                    type: "intro",
                    hideNavigation: !0,
                    hideTop: !0,
                    hideBorder: !0,
                    omitFromCount: !0
                };
                b.categoryData.parentCategoryName ? b.questions.splice(1, 0, n) : b.questions.unshift(Object.assign({
                    hideBack: !0
                }, n))
            }
            try {
                void 0 !== (o = b.categoryData.categories[b.lastCategory].modal_text) && null != o || (o = {})
            } catch (e) {
                var o = {}
            }
            try {
                b.categPhotoAvail = void 0 === b.categoryData.categoryHeader.is_included_in_modal_experiment ? 0 : b.categoryData.categoryHeader.is_included_in_modal_experiment, b.modalCategPhoto = void 0 === b.categoryData.categoryHeader.category_photo ? "" : b.categoryData.categoryHeader.category_photo, $(".modal-category-experiment-photo").html('<img src="' + b.modalCategPhoto + '" />')
            } catch (e) {}
            if (0 < b.questions.length) {
                var i = "Do you have any additional details?",
                    s = "Optional - but the more details you provide, the better";
                void 0 !== o.additional_details_heading && (i = o.additional_details_heading.value, s = o.additional_details_subheading.show ? o.additional_details_subheading.value : null)
            } else {
                i = "What are the details of your project?", s = null;
                void 0 !== o.additional_details_heading && (i = o.additional_details_heading_single.value, s = o.additional_details_subheading_single.show ? o.additional_details_subheading_single.value : null)
            }
            b.showAdditionals && b.questions.push({
                has_custom_questions: 0 < b.questions.length,
                is_local: !0,
                label: i,
                labelExtra: s,
                name: "project_detail",
                required: 0 === b.questions.length,
                show_local_checkbox: e.show_local_checkbox,
                type: "additional",
                gaPath: "additional",
                value: ""
            }), b.userLoggedIn || (b.questions.push({
                gaPath: "loading-indicator",
                fbqPath: "Loading",
                hideNavigation: !0,
                hideTop: !0,
                omitFromCount: !0,
                show: !1,
                showOnce: !0,
                type: "upsellLoading"
            }), b.questions.push({
                gaPath: "upsell",
                fbPath: "Upsell",
                hideTop: !0,
                omitFromCount: !0,
                type: "upsell"
            }));
            for (var l = 0; l < b.questions.length; l++) b.questions[l].omitFromCount || (b.questions[l].index = ++a), t && (b.questions[l].hideProgress = !0), v.in_array(b.questions[l].type, ["additional"]) || (b.questions[l].required = !!+e.custom_questions_required || b.questions[l].required);
            _(), r ? (b.questions.push({
                gaPath: "account__email",
                fbqPath: "account__email",
                hideProgress: !0,
                label: "What email address would you like quotes sent to?",
                labelExtra: null,
                omitFromCount: !0,
                type: "accountEmail"
            }), b.questions.push({
                gaPath: "account__tel",
                fbqPath: "account__tel",
                hideProgress: !0,
                label: "What is your phone number?",
                labelExtra: null,
                omitFromCount: !0,
                telephone: b.buyerTelephone,
                type: "accountTel"
            }), b.questions.push({
                gaPath: "account__name",
                fbqPath: "account__name",
                hideProgress: !0,
                label: "One last thing...",
                labelExtra: null,
                omitFromCount: !0,
                type: "accountName"
            }), $(g).off("BarkProgressToNextQuestion.init").on("BarkProgressToNextQuestion.init", function(e) {
                var t, a, r = b.questions[b.pos] || {};
                if ("accountEmail" === r.type) {
                    if (e.preventDefault(), t = v.getHtml("span", null, null, "fa fa-spin fa-spinner"), a = $(".inline-bark-btn-continue").hasClass("ignore-suggest"), !($("#inline-bark-new-user-email").val() || "").trim()) return $(".inline-bark-modal-errors").text("Please enter an email address").removeClass("hide"), void $("#inline-bark-new-user-email").closest(".inline-bark-q-cont").addClass("new-error");
                    $(".inline-bark-btn-continue").html(t).prop("disabled", !0).addClass("disabled"), $(".inline-bark-modal-email-errors").addClass("hide"), $(".inline-bark-main-content .new-error").removeClass("new-error"), $(".inline-bark-modal-errors").addClass("hide"), H(a, function() {
                        $(".inline-bark-btn-continue").html("CONTINUE").prop("disabled", !1).removeClass("disabled"), b.next(!0)
                    }, function(e) {
                        var t = "Please enter a valid email address";
                        e.did_you_mean ? (t = "Did you mean " + e.did_you_mean + "?", $(".inline-bark-modal-email-errors").removeClass("hide").find(".error-text").text(t), $(".inline-bark-modal-email-errors .email-suggest-confirm").data({
                            "suggested-email": e.did_you_mean
                        }), $(".email-suggest-confirm, .email-suggest-cancel").addClass("inline-email")) : $(".inline-bark-modal-errors").html(t).removeClass("hide"), $(".inline-bark-btn-continue").html("CONTINUE").prop("disabled", !1).removeClass("disabled"), B($("#inline-bark-new-user-email").val())
                    }, function(e) {
                        $(".inline-bark-modal-errors").text(e || "Please enter a valid email address").removeClass("hide"), $("#inline-bark-new-user-email").closest(".inline-bark-q-cont").addClass("new-error"), $(".inline-bark-btn-continue").html("CONTINUE").prop("disabled", !1).removeClass("disabled"), B($("#inline-bark-new-user-email").val())
                    })
                } else "accountTel" === r.type && (e.preventDefault(), b.validatedTel = !1, b.validateAccountTel() && (t = v.getHtml("span", null, null, "fa fa-spin fa-spinner"), $(".inline-bark-btn-continue").html(t).prop("disabled", !0).addClass("disabled"), $(".inline-bark-modal-email-errors").addClass("hide"), $(".inline-bark-main-content .new-error").removeClass("new-error"), $(".inline-bark-modal-errors").addClass("hide"), v.validate.ukTel($("#inline-bark-new-user-telephone").val(), function(e, t, a, r) {
                    e ? ($(".inline-bark-btn-continue").html("CONTINUE").prop("disabled", !1).removeClass("disabled"), b.validatedTel = !0, $(".inline-bark-btn-submit:visible").length ? q() : b.next(!0)) : !e && t ? (j(a), b.validatedTel = !0, $(".inline-bark-btn-submit:visible").length ? q() : b.next(!0)) : ($(".inline-bark-btn-continue").html("CONTINUE").prop("disabled", !1).removeClass("disabled"), E(r))
                })))
            })) : b.questions.push(h()), b.orgquestions = b.questions.slice(0), b.renderCurrent()
        }, b.showModal = function(e) {
            $("#bark_mode").val(""), b.lastCategory = 0, $(".inline-bark-buttons-container .inline-bark-btn-continue").text("CONTINUE"), $(".inline-bark-buttons-container .inline-bark-btn-submit").text("GET QUOTES"), k.analytics_variation = 0, v.hideLoading();
            var t = !1,
                a = 0;
            if (0 < e.errors.category_id.length ? (t = !0, $("#category_error").text("*" + e.errors.category_id).show(), $("#category_error").parent().addClass("new-error"), $.post("/api/common/search_log/", {
                    type: "category",
                    text: $("#category_name").val() || $("#category_name_hidden").val(),
                    id: 0
                })) : ($("#category_error").hide(), $("#category_error").parent().removeClass("new-error")), 0 < e.errors.postcode.length ? (t = !0, $("#postcode_error").text("*" + e.errors.postcode).show(), $("#postcode_error").parent().addClass("new-error"), $.post("/api/common/search_log/", {
                    type: "postcode",
                    text: $("#postcode").val(),
                    id: 0
                })) : ($("#postcode_error").hide(), $("#postcode_error").parent().removeClass("new-error")), !t) {
                if (b.categoryData = e.values, $("#inlineBarkModal").foundation("reveal", "open"), $(".reveal-modal-bg").addClass("bark-modal-open"), $(g).unbind("keydown.navigate").on("keydown.navigate", function(e) {
                        if (e.which === i) {
                            var t = "TEXTAREA" !== e.target.tagName || "TEXTAREA" === e.target.tagName && (e.ctrlKey || e.metaKey);
                            void 0 !== b.questions[b.pos].name && "location" == b.questions[b.pos].name ? setTimeout(function() {
                                t && $(".inline-bark-btn-continue").is(":visible") && $(".inline-bark-btn-continue").eq(0).click() && e.preventDefault()
                            }, 250) : t && $(".inline-bark-btn-continue").is(":visible") && $(".inline-bark-btn-continue").eq(0).click() && e.preventDefault()
                        }
                        e.which !== o || $(e.target).is(":input") || e.preventDefault()
                    }), !(a = v.objectSize(e.values.categories))) return;
                if (1 === a)
                    for (var r in e.values.categories) {
                        b.lastCategory = parseInt(r), b.processCategory(e.values.categories[r]);
                        var n = {};
                        return n.cid = $("#category_id").val(), b.questions[b.pos].name ? n.qid = b.questions[b.pos].name : n.qid = b.questions[b.pos].type, n.et = "start", void w(n)
                    }
                b.pos = 0, b.questions = [f()], b.renderCurrent()
            }
        }, b.startBarkJourney = function() {
            $(".bark-form").find("span.new-error").hide(), v.showLoading(), setTimeout(function() {
                var e = {
                    category_id: $("#category_id").val(),
                    postcode_id: $("#postcode_id").val(),
                    postcode_type: $("#postcode_type").val(),
                    bark_mode: $("#bark_mode").val(),
                    exp_ph: 0,
                    category_name: $("#category_name").val() || $("#category_name_hidden").val()
                };
                $.post("/validate-project/", e, b.showModal, "json").fail(function() {
                    v.hideLoading(), alert("An error occurred")
                })
            }, 340)
        }, b.hide = function() {
            var e = $("#category_id").val(),
                t = (g.Bark.ENV.locale || "").toLowerCase(),
                a = {};
            b.questions[b.pos].name ? a.exqid = b.questions[b.pos].name : a.exqid = b.questions[b.pos].type;
            var r = "";
            "buyerInfo" === b.questions[b.pos].type ? (r = "close-popup-info", ga("send", "pageview", v.sprintf("en/%s/buyer-modal/%s/%s/%s/", t, e, b.categoryUrl, "close-popup-info")), $("#inlineBarkModalCloseMessage").text("We have professionals ready to help you - enter your contact details to get quotes fast and free!")) : (r = "close-popup", ga("send", "pageview", v.sprintf("en/%s/buyer-modal/%s/%s/%s/", t, e, b.categoryUrl, "close-popup")), $("#inlineBarkModalCloseMessage").text("We're asking a few questions so we can find you the right pros, and send you quotes fast and free!")), a.ext = r, a.cid = $("#category_id").val(), a.et = r, a.s = "close-modal", w(a), $("#inlineBarkModalClose").foundation("reveal", "open")
        }, b.cancelHide = function(e) {
            var t = $("#category_id").val(),
                a = (g.Bark.ENV.locale || "").toLowerCase(),
                r = {};
            b.questions[b.pos].name ? (r.exqid = b.questions[b.pos].name, r.exs = "questions") : (r.exqid = b.questions[b.pos].type, r.exs = b.questions[b.pos].type), void 0 !== e && e.preventDefault(), $("#inlineBarkModal").foundation("reveal", "open"), ga("send", "pageview", v.sprintf("en/%s/buyer-modal/%s/%s/%s/", a, t, b.categoryUrl, "close-cancel")), r.cid = $("#category_id").val(), isNaN(parseInt(r.cid)) && (r.cid = b.lastCategory), r.et = "close-cancel", r.s = "close-modal", w(r)
        }, b.confirmHideModal = function(e) {
            var t = $("#category_id").val(),
                a = (g.Bark.ENV.locale || "").toLowerCase();
            void 0 !== e && e.preventDefault(), ga("send", "pageview", v.sprintf("en/%s/buyer-modal/%s/%s/%s/", a, t, b.categoryUrl, "close-done")), b.confirmHide();
            var r = {};
            r.cid = $("#category_id").val(), isNaN(parseInt(r.cid)) && (r.cid = b.lastCategory), r.et = "close-done", r.s = "close-modal", w(r)
        }, b.confirmHide = function(e) {
            void 0 !== e && e.preventDefault(), k = {}, ga("send", "pageview", g.location.pathname), $("#inlineBarkModal").foundation("reveal", "close"), $(".reveal-modal-bg").removeClass("bark-modal-open"), $(".inline-bark-main-content").contents().remove(), $(".inline-bark-percentage-thumb").width(0), $(".inline-bark-modal-errors").addClass("hide"), b.dispatchEvent("onChangingQuestion"), b.pos = 0, $(g).unbind("keydown.navigate"), $(g).trigger("createBarkModalClose"), $(".inline-bark-modal-email-errors, .inline-bark-modal-errors").addClass("hide"), $("#modalUploadFiles").length && Dropzone.forElement("#modalUploadFiles").destroy()
        }, b.saveMKpageInlined = function(e, t) {
            for (var a in p)
                if ("checkbox" == e)
                    if (v.is_array(p[a][0])) {
                        for (var r = {}, n = 0; n < p[a][0].length; n++) r[p[a][0][n]] = "true";
                        k[a] = r
                    } else k[a] = p[a][0];
            else "select" == e && v.is_array(p[a]) && (k[a] = p[a][0])
        }, b.getSubmitFormHtml = function(e) {
            var t, a, r, n, o, i = "";
            for (t in e)
                if (r = e[t], v.is_a(r, "object"))
                    for (a in r) n = r[a], i += v.getHtml("input", null, null, null, {
                        name: t + "[" + a + "]",
                        value: n,
                        type: "hidden"
                    });
                else if (v.is_a(r, "array"))
                for (o = 0; o < r.length; o++) i += v.getHtml("input", null, null, null, {
                    name: t + "[]",
                    value: r[o],
                    type: "hidden"
                });
            else i += v.getHtml("input", null, null, null, {
                name: t,
                value: r,
                type: "hidden"
            });
            return i
        }, b.bindEvents = function() {
            $("#postcode-auto").length && setupDynamicPostCodeAutocomplete(), $("#modalUploadFiles").length && !$("#modalUploadFiles").data("dropzoned") && (v.initModalUpload(null, null, "#project-create-form"), $("#modalUploadFiles").data({
                dropzoned: !0
            })), $(".inline-bark-q-label-input").unbind("focusin.select").on("focusin.select", function(e) {
                e.stopPropagation(), e.preventDefault();
                var t = $(this).closest(".inline-bark-q");
                return !($(".inline-bark-checkbox,.inline-bark-radio", t)[0].checked = !0)
            }), $(".inline-bark-q.can-highlight").unbind("click.select").on("click.select", function(e) {
                if (e.stopPropagation(), "DIV" === e.target.tagName || "LABEL" === e.target.tagName) {
                    var t = $(this).closest(".new-error"),
                        a = $(this).closest(".inline-bark-q-radio");
                    (t.length || a.length) && $(".inline-bark-modal-errors").addClass("hide"), a.length && a.closest(".bark-modal-question").find(".new-error").removeClass("new-error"), t.removeClass("new-error");
                    var r = $("input[type=checkbox],input[type=radio]", this);
                    "LABEL" !== e.target.tagName && (r[0].checked && "checkbox" !== r[0].type || (r[0].checked = !r[0].checked), r.focus())
                }
            }), $(".inline-bark-close-btn-quit").unbind("click.submit").on("click.submit", function(e) {
                b.confirmHideModal(e)
            }), $(".inline-bark-close-btn-continue").unbind("click.submit").on("click.submit", function(e) {
                b.cancelHide(e)
            }), $(".inline-bark-modal-email-errors .email-suggest-confirm").unbind("click.submit").on("click.submit", function() {
                var e = $(this);
                $("#inline-bark-new-user-email").val(e.data("suggested-email")), $(".inline-bark-modal-email-errors").addClass("hide"), e.hasClass("inline-email") ? $(".inline-bark-btn-continue").click() : $(".inline-bark-btn-submit").trigger("click.submit")
            }), $(".inline-bark-modal-email-errors .email-suggest-cancel").unbind("click.ignore").on("click.ignore", function() {
                $(".inline-bark-modal-email-errors").addClass("hide"), $(this).hasClass("inline-email") ? $(".inline-bark-btn-continue").addClass("ignore-suggest").click() : $(".inline-bark-btn-submit").addClass("ignore-suggest").click()
            }), $("#inline-bark-new-user-email").off("change.remignore").on("change.remignore", function() {
                $(".inline-bark-btn-submit, .inline-bark-btn-continue").removeClass("ignore-suggest")
            }), $(".inline-bark-btn-submit").unbind("click.submit").on("click.submit", function() {
                b.validateCurrent() && ($("body,html").animate({
                    scrollTop: 0
                }, 800), $(this).closest(".new-error").removeClass("new-error"), x(), $("#inlineBarkModalContent").hide(), $("#inlineBarkModalSpinner").show(), $("#inline-bark-new-user-email").length, b.validatedTel ? q() : v.validate.ukTel($("#inline-bark-new-user-telephone").val(), e))
            }), $(".inline-bark-main-content :input").unbind("focus.removeerr").on("focus.removeerr", function() {
                $(".inline-bark-modal-email-errors").addClass("hide"), $(".inline-bark-main-content .new-error").removeClass("new-error"), $(".inline-bark-modal-errors").addClass("hide")
            }), $(".reveal-modal span.bark-icon-cross-o").unbind("click.close").on("click.close", function() {
                b.hide()
            }), $(".choose-category .next-category-chosen").unbind("click.choosecategory").on("click.choosecategory", function() {
                var e, t, a, r = +$(".choose-category input[type=radio]:checked").val();
                if (!r) return $(".inline-bark-modal-errors").removeClass("hide").text("Please select one of the categories below"), !1;
                (e = b.categoryData.categories[r]).processed ? (b.questions = e.custom_fields, _()) : (e.processed = !0, a = f(), t = e.custom_fields ? v.array_unshift(e.custom_fields, a) : [a], e.custom_fields = t, b.processCategory(e)), b.lastCategory && b.lastCategory !== r && $(".bark-modal-question").not("#bark-question-0").remove(), b.lastCategory = r, $("#category_name,#category_name_top").val(e.name), $("#category_id,#category_id_top").val(r), b.next()
            }), $(".photoselect-check label").unbind("click.phcheck").on("click.phcheck", function() {
                $(".inline-bark-modal-errors").addClass("hide");
                var e = $(this),
                    t = e.attr("inpid"),
                    a = $("input#" + t).prop("checked");
                $("input#" + t).prop("checked", !a), a ? e.parent(".opts").removeClass("selectedpic") : e.parent(".opts").addClass("selectedpic")
            }), $(".photoselect-radio label").unbind("click.phselect").on("click.phselect", function() {
                $(".inline-bark-modal-errors").addClass("hide");
                var e = $(this),
                    t = e.attr("inpid"),
                    a = $("input#" + t).prop("checked");
                a || $("input#" + t).prop("checked", !a), $(".photoselect .opts").each(function(e) {
                    $(this).removeClass("selectedpic")
                }), e.parent(".opts").addClass("selectedpic")
            }), $(".inline-bark-main-content textarea").unbind("keyup.resize").on("keyup.resize", function() {
                this.style.height = "110px", this.style.height = this.scrollHeight + "px"
            }), $(".inline-bark-q-date .bark-date.no-pikaday").off("change.update").on("change.update", function() {
                var e = $(this).data("datepicker");
                e.date = this.value, e.textval = T(e.format, this.value)
            }), $(".inline-bark-q-date .bark-date").each(function() {
                var t, a = "l jS F Y";
                !b.categoryData.bark_country_id || 237 != b.categoryData.bark_country_id && 40 != b.categoryData.bark_country_id || (a = "l F jS, Y");
                var e, r, n, o, i = $(this),
                    s = {};
                i.data("datepicker") || (e = i.data("mindate"), r = i.data("maxdate"), n = g.strtotime(v.date("Y/m/d 00:00:00")), o = 60 * -(new Date).getTimezoneOffset(), i.hasClass("no-pikaday") || (s = {
                    field: this,
                    from: "D MMM YYYY",
                    onSelect: function() {
                        var e = t.toString();
                        i[0].value = T(a, e), t.textval = T(a, e)
                    }
                }), e && (!1 === (e = "today" === e ? n : strtotime(e)) && (e = strtotime("now", e)), e && (s.rawMinDate = v.date("Y-m-d", 1e3 * (e + o)), s.minDate = new Date(s.rawMinDate))), r && (!1 === (r = "today" === r ? n : strtotime(r)) && (r = strtotime("now", r)), r && (s.rawMaxDate = v.date("Y-m-d", 1e3 * (r + o)), s.maxDate = new Date(s.rawMaxDate))), i.hasClass("no-pikaday") ? (s.rawMinDate && i.attr({
                    min: s.rawMinDate
                }), s.rawMaxDate && i.attr({
                    max: s.rawMaxDate
                }), i.data({
                    datepicker: {
                        date: "",
                        format: a,
                        toString: function() {
                            return this.date
                        }
                    }
                })) : (t = new Pikaday(s), i.data({
                    datepicker: t
                })))
            }), $(".bark-date-unsure, .bark-date-na").unbind("change.unsure").on("change.unsure", function() {
                var e = $(this).closest(".bark-modal-question");
                this.checked ? ($("input", e).not(this).attr({
                    disabled: "disabled"
                }), $(".bark-date-time-container", e).css({
                    opacity: .5
                })) : ($("input", e).not(this).removeAttr("disabled"), $(".bark-date-time-container", e).css({
                    opacity: 1
                }))
            }), $(".bark-date-other").unbind("change.other").on("change.other", function() {
                var e = $(this).closest(".bark-modal-question");
                this.checked ? ($("input", e).not(this).not(".bark-date-other-text input").attr({
                    disabled: "disabled"
                }), $(".bark-date-main-cont", e).css({
                    opacity: .5
                }), $(".bark-date-other-text", e).show()) : ($("input", e).not(this).removeAttr("disabled"), $(".bark-date-main-cont", e).css({
                    opacity: 1
                }), $(".bark-date-other-text", e).hide())
            }), $(".check-showmore span").unbind("click.showhidecheck").on("click.showhidecheck", function() {
                var e = $(this),
                    t = e.data("collapse") + m,
                    a = e.closest(".bark-modal-question");
                $(".inline-bark-q-checkbox", a).each(function(e) {
                    e < t && $(this).show()
                }), e.data({
                    collapse: t
                }), t >= $(".inline-bark-q-checkbox", a).length && e.hide()
            }), $(".phc-showmore span").unbind("click.showhide").on("click.showhide", function() {
                var e = $(this),
                    t = e.data("collapse") + m,
                    a = e.closest(".bark-modal-question");
                $(".opts", a).each(function(e) {
                    e < t && $(this).show()
                }), e.data({
                    collapse: t
                }), t >= $(".opts", a).length && e.hide()
            }), $(".radio-showmore span").unbind("click.showhide").on("click.showhide", function() {
                var e = $(this),
                    t = e.data("collapse") + m,
                    a = e.closest(".bark-modal-question");
                $(".inline-bark-q-radio", a).each(function(e) {
                    e < t && $(this).show()
                }), e.data({
                    collapse: t
                }), t >= $(".inline-bark-q-radio", a).length && e.hide()
            }), $(".choose-category-showmore span").unbind("click.showhide").on("click.showhide", function() {
                var e = $(this);
                e.hasClass("showing") ? ($(".choose-category.pickbyimage > .opts").each(function(e) {
                    m <= e && $(this).css({
                        display: "none"
                    })
                }), e.text("Show more").removeClass("showing"), $("body,html").animate({
                    scrollTop: 0
                }, 800)) : ($(".choose-category.pickbyimage > .opts").css({
                    display: "inline-block"
                }), e.text("Show less").addClass("showing"))
            }), $(".inline-bark-btn-continue").off("click.cont").on("click.cont", function() {
                b.next()
            }), $(".inline-bark-btn-back").unbind("click.prev").on("click.prev", b.prev), $("#inline-bark-close").off("click.closemodal").on("click.closemodal", function() {
                ga("send", "pageview", g.location.pathname)
            })
        }, $(function() {
            var e = parseInt(g.location.href.indexOf("popup=true")),
                t = $("#project-create-form");
            if (g.app_locale = $('meta[name="app_locale"]').attr("content"), g.onbeforeunload = S, -1 !== e && void 0 !== t.attr("can-popup")) {
                var a = parseInt(D("locid")),
                    r = D("pt");
                isNaN(a) && (a = -1), null == r && (r = -1);
                var n = {
                    category_id: $("#category_id").val(),
                    postcode_id: a,
                    postcode_type: r,
                    exp_ph: 0,
                    bark_mode: $("#bark_mode").val(),
                    category_name: $("#category_name").val()
                };
                $.post("/validate-project/", n, v.createBark.showModal, "json")
            }
            $("#bark_submit_top").click(function(e) {
                var t = {
                    category_id: $("#category_id_top").val(),
                    postcode_id: $("#postcode_id_top").val(),
                    postcode_type: $("#postcode_type_top").val(),
                    exp_ph: 0,
                    bark_mode: $("#bark_mode").val(),
                    category_name: $("#category_name_top").val()
                };
                $(".bark-form-top").find("small").hide(), e.preventDefault(), v.showLoading(), $.post("/validate-project/", t, b.showModal, "json").fail(function() {
                    v.hideLoading(), alert("An error occurred")
                })
            }), $("#bark_submit,.init-bark-create").click(function(e) {
                e.preventDefault(), b.startBarkJourney()
            }), $(".alternativeSuggestion").on("click", function() {
                $("#category_name").val($(this).attr("data-category-name")), $("#category_id").val($(this).attr("data-category-id"));
                var e = {
                    category_id: $("#category_id").val(),
                    postcode_id: $("#postcode_id").val(),
                    postcode_type: $("#postcode_type").val(),
                    exp_ph: 0,
                    category_name: $("#category_name").val()
                };
                $.post("/validate-project/", e, b.showModal, "json")
            }), $("#postcode_top, #category_name_top").keydown(function(e) {
                e.keyCode === i && $("#bark_submit_top").trigger("click")
            }), $("#postcode, #category_name").keydown(function(e) {
                "undefined" !== $("#bark_source").val() && "dashboard" == $("#bark_source").val() && $("#bark_mode").val("typed-dash"), e.keyCode === i && $("#bark_submit").trigger("click")
            })
        })
    }(this);