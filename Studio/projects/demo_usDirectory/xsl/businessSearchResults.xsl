<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

    <xsl:template name="styles">
        <style>
            <![CDATA[
                body { background-color: #FFF; margin:0px; padding: 0px; color:#818181; font-size: 11px; background: #FFF none repeat scroll 0 0; }
                body,a  { font-family: "Tahoma", sans-serif; text-decoration: none; font-weight: normal;}
                table{font-size: 11px;}
                img { border:0 }
                .cleaner { clear: both; font-size: 0px; line-height: 0px; height: 0px; }
                .link { font-size: 100%; color: #0162CB; text-decoration: underline; }
                .link:hover { font-size: 100%; color: #0162CB; text-decoration: none; }
                
                #holder_main { margin: 0px auto; width: 760px; text-align:left}
                #holder_top {text-align:left; width: 760px; background: url(../images/picture.jpg) top right no-repeat; height: 142px; }
                #logo { padding-top: 40px; margin-left: 15px;  }
                
                #holder_menu { height: 24px; z-index: 10; width: 752px; margin: 0px auto; position: relative; }
                .menu_active { cursor: hand; color: black; font-weight: bold; white-space: nowrap; }
                .menu_active .menu_back { float: left; height: 24px; background: url(../images/button_active_back.gif) top left repeat-x; }
                .menu_active .menu_back span { white-space: nowrap; font-family: sans-serif; font-size: 11px; display: block; padding:5px; padding-left: 12px; padding-right: 0px; }
                .menu_active .menu_end { float: left; font-size: 0px; display: block; width: 6px; height: 24px; background: url(../images/button_active_end.gif) top right no-repeat; }
                .menu_active .menu_end2x { float: left; font-size: 0px; display: block; width: 12px; height: 24px; background: url(../images/button_active_end2x.gif) top right no-repeat; }
                
                .menu_active_next { cursor: hand; color: black; font-weight: normal; white-space: nowrap; }
                .menu_active_next .menu_back { float: left; height: 24px; background: url(../images/button_active_back2x.gif) top left repeat-x; }
                .menu_active_next .menu_back span { white-space: nowrap; font-family: sans-serif; font-size: 11px; display: block; padding:5px; padding-left: 12px; padding-right: 0px; }
                .menu_active_next .menu_end { float: left; font-size: 0px; display: block; width: 6px; height: 24px; background: url(../images/button_inactive_end.gif) top right no-repeat; }
                .menu_active_next .menu_end2x { float: left; font-size: 0px; display: block; width: 12px; height: 24px; background: url(../images/button_inactive_end2x.gif) top right no-repeat; }
                
                .menu_active_last { cursor: hand; color: black; font-weight: bold; white-space: nowrap; }
                .menu_active_last .menu_back { float: left; height: 24px; background: url(../images/button_active_back.gif) top left repeat-x; }
                .menu_active_last .menu_back span { white-space: nowrap; font-family: sans-serif; font-size: 11px; display: block; padding:5px; padding-left: 12px; padding-right: 0px; }
                .menu_active_last .menu_end { float: left; font-size: 0px; display: block; width: 6px; height: 24px; background: url(../images/button_active_end.gif) top right no-repeat; }
                .menu_active_last .menu_end2x { float: left; font-size: 0px; display: block; width: 12px; height: 24px; background: url(../images/button_active_end3x.gif) top right no-repeat; }
                
                .menu_inactive { cursor: hand; color: #505050; white-space: nowrap; }
                .menu_inactive .menu_back { float: left; height: 24px; background: url(../images/button_inactive_back.gif) top left repeat-x; }
                .menu_inactive .menu_back span { white-space: nowrap; font-family: sans-serif; font-size: 11px; display: block; padding:5px; padding-left: 12px; padding-right: 0px; }
                .menu_inactive .menu_end { float: left; font-size: 0px; display: block; width: 6px; height: 24px; background: url(../images/button_inactive_end.gif) top right no-repeat; }
                .menu_inactive .menu_end2x { float: left; font-size: 0px; display: block; width: 12px; height: 24px; background: url(../images/button_inactive_end2x.gif) top right no-repeat; }
                
                .menu_inactive_first { cursor: hand; color: #505050; }
                .menu_inactive_first .menu_back { float: left; height: 24px; background: url(../images/button_inactive_first.gif) top left repeat-x; }
                .menu_inactive_first .menu_back span { white-space: nowrap; font-family: sans-serif; font-size: 11px; display: block; padding:5px; padding-left: 12px; padding-right: 0px; }
                .menu_inactive_first .menu_end { float: left; font-size: 0px; display: block; width: 6px; height: 24px; background: url(../images/button_inactive_end.gif) top right no-repeat; }
                .menu_inactive_first .menu_end2x { float: left; font-size: 0px; display: block; width: 12px; height: 24px; background: url(../images/button_inactive_end2x.gif) top right no-repeat; }
                
                .holder_text { text-align:left;display: none; margin: 0px auto; margin-top: -1px; padding: 10px; z-index: -1; width:750px;widt\h: 730px; background-color: #FFFF93; border: 1px solid #BCBC6C; }
                .holder_left { float: left; width: 420px }
                .holder_right { float: right; width: 296px }
                
                .formular { font-family: sans-serif, arial, tahoma; color: #000000; font-size: 90%; padding: 0px; margin: 0px; }
                .formular .form_submit { margin: 0 -3px 0 0; padding: 0; border: none; }
                .formular .form_submit { >margin: 0 13px 0 0; }
                .formular .form_text1 { width: 403px; background-color: #FFFFFF; border: 1px solid #7F9DB9; padding: 2px; font-size: 90%; }
                .formular .form_text2 { width: 202px; background-color: #FFFFFF; border: 1px solid #7F9DB9; padding: 2px; font-size: 90%; }
                .formular .form_select { width: 198px; background-color: #FFFFFF; padding: 2px; font-size: 90%; }
                .formular .form_select_range { width: 78px; background-color: #FFFFFF; padding: 2px; font-size: 90%; }
                .formular .form_select_state { width: 118px; background-color: #FFFFFF; padding: 2px; font-size: 90%; }
                
                .formular .form_select { >width: 200px; }
                .formular label { cursor: hand; font-size: 12px; }
                .required { font-size: 110%; color: #FF0000; font-weight: bold; width: 20px; }
                .search_submit { font-size: 100%; width: 100px; background-color: #9D9D9D; border: 1px solid #9D9D9D; height: 22px; font-weight: bold; color: #FFFFFF; }
                
                .holder_result_form { float: left; }
                .formular_result { font-family: sans-serif, arial, tahoma; color: #000000; font-size: 90%; padding: 0px; margin: 0px; }
                .formular_result .form_text1 { width: 240px; background-color: #FFFFFF; border: 1px solid #7F9DB9; padding: 2px; font-size: 90%; }
                .formular_result .form_text2 { width: 140px; background-color: #FFFFFF; border: 1px solid #7F9DB9; padding: 2px; font-size: 90%; }
                .formular_result .form_select { width: 190px; background-color: #FFFFFF; padding: 2px; font-size: 90%; }
                .formular_result .form_select_range { width: 77px; background-color: #FFFFFF; padding: 2px; font-size: 90%; }
                .formular_result .form_select_state { width: 110px; background-color: #FFFFFF; padding: 2px; font-size: 90%; }
                .formular_result .form_submit { padding-left: 10px; padding-right: 10px; border: none; }
                
                .holder_result { background-color: #FFFFFF; margin: 0px auto; border: 1px solid #BCBCBC; width: 730px}
                .holder_result .header_text { font-size: 90%; padding-left: 3px; }
                #holder_result_footer { background-color: #DEDEDE; margin: 0px auto; width: 730px; }
                #holder_result_footer3 { background-color: #FFFFFF; margin: 0px auto; width: 730px; }
                #holder_result2 { margin: 0px auto;width: 724px}
                #holder_result2 .header_text { font-size: 90%; padding-left: 7px; }
                #holder_detail { margin: 0px auto; width: 724px; }
                #holder_detail .logo { float: right; padding-right: 10px; }
                .search_now_text { font-size: 90%; padding-left: 7px; padding-top: 3px; padding-bottom: 3px; }
                
                .sponsored_result_item { display: block; cursor: hand; width: 724px; color: #000000; }
                .sponsored_result_item .header { display: block; float: left; width: 724px;background-color: #ffffcc;  }
                .sponsored_result_item .header .header_text1 { display: block; float: left; padding-top: 5px; padding-bottom: 4px; padding-left: 10px; font-family: arial, tahoma; font-size: 120%; font-weight: bold; color: #000000; text-decoration: underline;}
                .sponsored_result_item .header .header_phone { display: block; float: right; padding-top: 7px; padding-bottom: 2px; padding-left: 23px; padding-right: 20px; font-size: 100%; font-weight: bold; color: #000000; background: url(../images/phone1.gif) 0px 6px no-repeat; }
                .sponsored_result_item .header .header_phone_button { display: inline; float: right; font-size: 100%; font-weight: bold; color: #000000; background: url(../img/phone-button.gif) 0 50% no-repeat; text-align:center;width:120px;min-height:21px;_height:21px;line-height:21px;margin:7px 36px 0 0;padding:0 0 0 23px;font-family:arial,sans-serif;cursor:pointer;_cursor:hand}
                
                .sponsored_result_item2 { display: block; float: left; cursor: hand; background-color: #ffffcc; color: #000000; width: 724px; padding-top: 10px; padding-bottom: 15px; }
                .sponsored_result_item2 .image { display: block; float: left; width: 80px; text-align: center; }
                .sponsored_result_item2 .text2 { display: block; float: left; font-size: 100%; width:450px }
                .sponsored_result_item2 .text2 a { float: left; font-size: 100% }
                .sponsored_result_item2 .text2_1 { display:block; float:left; width: 150px; margin-left: 37px }
                .sponsored_result_item2 .text2_1:hover { color: #807400 }
                .sponsored_result_item2 .text2_1 img {margin: 2px 6px -2px -22px; position: relative}
                .sponsored_result_item2 .text2_1 span.underline {text-decoration: underline}
                .sponsored_result_item2 .text2_1 span.hint {font-size: 0.85em; color: #8D8D8D; }
                .sponsored_result_item2 .text2_1 br {line-height: 1.5em}
                
                .sponsored_result_item2 .url{font-size:0.9em}
                
                .result_item { display: block; float: left; padding-top: 5px; padding-bottom: 5px; }
                .result_item .header_text3 { display: block; float: left; font-size: 12px; font-variant:small-caps; font-weight:bold; color: #006699;}
                .text3 .header_text3 { display: block; font-size: 12px; font-variant:small-caps; font-weight:bold; color: #006699;}
                .result_item .text3 a { color: #8f8f8f ; text-decoration: none; }
                .result_item .text3 a:hover { color: #8f8f8f ;}
                .result_item .text3 { display: block; padding-left: 15px; float: left; max-width: 450px;_width:450px; }
                .result_item .phone { text-align: right; display: block; float: right; padding-top: 7px; padding-bottom: 2px; padding-left: 10px; padding-right: 20px; font-size: 100%; font-weight: bold; color: #006699 ; }
                .result_item .url { text-align: right; color: #0162CB; text-decoration: underline; font-size: 100%; }
                .result_item .url:hover { text-decoration: none; }
                .result_item span.phone { margin-top: 2px; }
                .result_item span.phone img { margin: -3px 8px; }
                .result_item .phone_button{ text-align: right; text-align:left;display: inline; float: right; font-size: 0.95em; font-weight: bold; color: #8f8f8f ;font-family:arial,sans-serif; background: url(../images/phone2.gif) 0 50% no-repeat;margin:13px 36px 0 0;padding:0 0 0 23px;text-decoration:none;cursor:pointer;_cursor:hand;line-height:16px;min-height:16px;_height:16px;}
                .result_item span.url{text-align: right; text-align:left;display: inline; float: right; clear:right; font-size: 1em;margin:0 36px 2px 0;text-decoration:none}
                .result_item span.url a{color:#0162cb;text-decoration: none;font-size: 1em}
                .result_item span.url a:hover{text-decoration:none}
                
                .counter { float: right; margin-top: 3px; padding-right: 20px; }
                .counter .counter_pic { float: right; padding-top: 2px; }
                .counter .counter_link { display: block; float: right; color: #0162CB; padding-top: 1px; text-decoration: underline; }
                .counter .counter_link:hover { text-decoration: underline; color: #FF0000; }
                .counter .counter_link:active { color: #000000; font-weight: bold; }
                .counter .counter_link_active { display: block; float: right; color: #0162CB; padding-top: 1px; color: #000000; font-weight: bold }
                .counter .counter_text { display: block; float: right; }
                
                .category_left { float: left; width: 358px; }
                .category_right { float: right; width: 358px; }
                .category_header { width: 100%; float: left; background-color: #FFFFCC; border-top: 1px solid #E8E862; border-bottom: 1px solid #E8E862; }
                .category_header h1,.category_header span { float: left; padding-left: 7px; font-size: 90%; font-weight: bold; padding-top: 2px; padding-bottom: 2px; margin:0}
                
                .category_header h1 a{float:none;padding:0;font-size:1em}
                
                .category_header3{background-color: #ffff69}
                .category_header3 .small_notice{padding-right:5px;margin-bottom:0;line-height:0.5em}
                
                
                .category_header2 { width: 100%; float: left; border-bottom: 1px solid #E8E862; padding-bottom: 0px; margin-bottom: 7px; }
                .category_header2 span { float: left; padding-left: 7px; font-size: 90%; font-weight: bold; padding-top: 2px; padding-bottom: 2px; }
                .category_header a { float: left; color: #0162CB; text-decoration: underline; float: left; padding-left: 7px; font-size: 90%; font-weight: bold; padding-top: 2px; padding-bottom: 2px; }
                .category_header a:hover { text-decoration: none; }
                
                .category_items ul { padding-left: 15px; margin-left: 15px;  margin-top: 2px; margin-bottom: 2px; list-style: square; }
                .category_items a { color: #0162CB; text-decoration: underline; }
                .category_items a:hover { text-decoration: none; }
                
                .category_items2 { float: left; width: 225px; margin-right: 10px; }
                .category_items2 ul { padding-left: 15px; margin-left: 15px;  margin-top: 2px; margin-bottom: 2px; list-style: square; }
                .category_items2 a { color: #0162CB; text-decoration: underline; }
                .category_items2 a:hover { text-decoration: none; }
                
                .detail .detail_header { background-color: #FFFF93;  border-bottom: 1px solid #E8E862; }
                .detail .detail_header span { display: block; padding-left: 7px; font-size: 90%; font-weight: bold; padding-top: 2px; padding-bottom: 2px;}
                .detail .detail_item { background-color: #FFFFCC; }
                .detail .detail_item .map img { border: 1px solid #C4C4C4; padding: 3px; margin-left: 7px; }
                .detail .detail_textb { display: block; padding-left: 7px; font-size: 85%; font-weight: bold; }
                .detail .detail_text { display: block; padding-left: 7px; font-size: 85%; font-weight: normal; }
                .detail .detail_text_gray { display: block; color: #9D9D9D; padding-left: 7px; font-size: 90%; font-weight: normal; }
                .detail .detail_text a { color: #0162CB; font-size: 100%; text-decoration: underline; }
                .detail .detail_text a:hover { text-decoration: none; }
                .detail .detail_table { margin: 0px; padding: 0px; }
                .detail .detail_table td { vertical-align: top; }
                
                .personal {  }
                .personal .personal_header { background-color: #FFFF93;  border-bottom: 1px solid #E8E862; }
                .personal .personal_header span { display: block; padding-left: 7px; font-size: 90%; font-weight: bold; padding-top: 2px; padding-bottom: 2px; }
                .personal .personal_items { padding: 10px; }
                .personal .personal_items span { display: block; padding-left: 7px; font-size: 90%; font-weight: normal; padding-top: 2px; padding-bottom: 2px; }
                .personal .personal_items span a { color: #0162CB; font-size: 100%; text-decoration: underline; }
                .personal .personal_items span a:hover { text-decoration: none; }
                
                
                .option_text { margin: 0 0 0 -9px; color: #0162CB; font-size: 90%; font-weight: bold; font-family: sans-serif, arial, tahoma; padding-left: 20px; text-decoration: underline; background: url(../images/options_arrow.gif) 10px no-repeat;  }
                .option_text:hover { text-decoration: none; }
                
                .option_icon { font-size: 90%; font-weight: bold; color: #676767; font-family: sans-serif, arial, tahoma; padding-left: 30px; background: transparent url(../images/options_icon.gif) 10px no-repeat; }  /* deleted text-decoration: underline; by VS on KH request */
                .option ul { list-style: square; color: #0162CB; margin-top: 0px; margin-bottom: 0px; padding-bottom: 5px; margin-left: 25px; padding-left: 20px; }
                .option a { color: #0162CB; font-weight: normal; font-family: sans-serif, arial, tahoma; text-decoration: underline; }
                .option a:hover { text-decoration: none; }
                
                label { cursor: hand; font-size: 12px; }
                
                .most_recent { font-size: 90%; background-color: #FFFFFF; overflow: auto; width:280px; widt\h: 276px; height: 102px; padding: 2px; border-top: 1px solid #999984; border-left: 1px solid #999984; border-right: 1px solid #999984; }
                .most_recent { >height: 100px; }
                .most_recent .item { display: block; cursor: hand; background: url(../images/buffer.gif) bottom repeat-x;}
                .most_recent .item:hover { background-color: #D1D1D1; }
                .most_recent .header { display: block; color: #0162CB; font-weight: bold; text-decoration: underline; }
                .most_recent .text { display: block; color: #000000; font-weight: normal; text-decoration: none; }
                .most_recent .most_list { display: block; background: url(../images/list.gif) 5px 5px no-repeat; width: 240px;  color: #0162CB; margin-top: 2px; margin-bottom: 0px; padding-bottom: 5px; padding-left: 15px; }
                .most_footer { width: 280px; background-color: #F1F1F1; border-bottom: 1px solid #999984; border-right: 1px solid #999984; border-left: 1px solid #999984; }
                .most_footer a { display: block; padding: 3px; padding-left: 230px; background: url(../images/clear.gif) 215px 5px no-repeat; color: #0162CB; text-decoration: underline; font-size: 12px; }
                .most_footer a:hover { text-decoration: none;  }
                
                #advertisment { margin: 0px auto; width: 660px; }
                
                #footer_holder { margin-left: auto; margin-right: auto; width: 760px; text-align: center; }
                .link_bottom {font-family: arial; color: #000000; text-decoration: underline; font-weight: normal; font-size: 80%;}
                .link_bottom:hover {text-decoration: none; }
                .text_bottom {font-family:arial; color: #000000; font-weight:normal; font-size:72%;}
                
                .corner_lt { position: relative; left: -11px; top: -11px; float: left; background: url(../images/corner_lt.gif) no-repeat top left; width: 6px; height: 6px; font-size: 0px; }
                .corner_rt { position: relative; right: -11px; top: -11px; float: right; background: url(../images/corner_rt.gif) no-repeat top right; width: 6px; height: 6px; font-size: 0px; }
                .corner_lb { position: relative; left: -11px; bottom: -11px; float: left; background: url(../images/corner_lb.gif) no-repeat bottom left; width: 6px; height: 6px; font-size: 0px; }
                .corner_rb { position: relative; right: -11px; bottom: -11px; float: right; background: url(../images/corner_rb.gif) no-repeat bottom right; width: 6px; height: 6px; font-size: 0px; }
                
                .corner_lt2 { _position: relative; margin-left: -1px; margin-top: -1px; float: left; background: url(../images/corner_lt2.gif) no-repeat top left; height: 6px;width:100%;font-size: 0px; }
                .corner_rt2 { position: relative; margin-right: -2px; margin-top: 0px; float: right; background: url(../images/corner_rt2.gif) no-repeat top right; width: 6px; height: 6px; font-size: 0px; }
                .corner_lb2 { _position: relative; margin-left: -1px; margin-bottom: -1px; float: left; background: url(../images/corner_lb2.gif) no-repeat bottom left; height: 6px;width:100%; font-size: 0px; }
                .corner_rb2 { position: relative; margin-right: -2px; margin-bottom: 0px; float: right; background: url(../images/corner_rb2.gif) no-repeat bottom right; width: 6px; height: 6px; font-size: 0px; }
                
                .corner_lb3 { _position: relative; margin-left: -1px; margin-bottom: -1px; float: left; background: url(../images/corner_lb3.gif) no-repeat bottom left; height: 6px;width:100%; font-size: 0px; }
                .corner_rb3 { position: relative; margin-right: -2px; margin-bottom: 0px; float: right; background: url(../images/corner_rb3.gif) no-repeat bottom right; width: 6px; height: 6px; font-size: 0px; }
                
                #Container { float: left; font-size: 90%; font-family: tahoma, arial, verdana; width: 700px; }
                #Container a { font-size: 100%; text-decoration: underline; color: #0162CB;  }
                
                .tree_items { width: 722px; float: left; border: 1px solid #EBEB97; background-color: #FFFFCC; }
                .tree_items_holder { margin-left: 15px; margin-right: 15px; }
                .tree_items ul { display: block; list-style-image: url(../images/folder.gif); margin: 0px; margin-left: 15px; padding-left: 0px;  }
                .tree_items ul li { margin: 0px; margin-left: 0px; padding-left: 0px;  }
                .tree_items a { color: #0162CB; text-decoration: underline; }
                .tree_items a:hover { text-decoration: none; }
                
                #footer_holder a.button { display: block; width: 131px; height: 21px; background: url("../images/business_profile.gif") no-repeat; margin: -18px 35px 10px auto; }
                #footer_holder a.button span { background: url("../images/business_profile_hover.gif") no-repeat; display: none; }
                #footer_holder a.button:hover { background: url("../images/business_profile_hover.gif") no-repeat; }
                .options_border { border: solid 1px #A29761; width: 403px; margin-left: 3px; padding: 8px 2px; }
                .yellow_buttons { width: 416px; margin: 9px 0px 0px 0px; }
                .yellow_buttons a.yellow_button1 { margin: 0px 0px 0px 2px; }
                .yellow_buttons a.yellow_button2 { margin: 0px 23px; }
                .yellow_buttons a.yellow_button3 { margin: 0px 0px 0px 0px; }
                .option table ul { margin: 0px 0px 0px 4px; _margin: 0px 0px 0px 5px; }
                .general_categories { background: #FFFFCC; border: solid 1px #E8E862; }
                .third_part_of_tree .category_items2 { width: 310px; }
                .third_part_of_tree .category_items2 ul { list-style-image: none; }
                .third_part_of_tree { margin: 0px 0px 0px -24px; _margin: 0px 0px 0px -15px; }
                
                .div_left { float: left; width: 274px; _width: 272px; margin-right: 12px }
                a.a_left { float: left }
                
                .google_banner{width:160px;height:600px;float:right;margin:0 10px 0 0}
                .google_banner{>margin:0 5px 0 0!important}
                
                .toll_free { display: block; text-align: right; color: #008900 }
                
                .zip_search{margin: 1px 0 -1px;text-decoration:underline;color:#0162CB;font:bold 0.85em "Arial","Tahoma",sans-serif;float:right}
                .city_or_zip{float:left}
                
                .zip_search{margin: 1px 0 -1px;text-decoration:underline;color:#0162CB;font:bold 0.85em "Arial","Tahoma",sans-serif;float:right}
                .city_or_zip{float:left}
                .category_header .search_by{float:right;display:inline;font-weight:normal}
                .category_header .search_by a,.category_header .search_by strong{float:none;padding:0 0.5em}
                .category_header .search_by a {font-weight:normal}
                
                .support_submit_ticket{width:705px}
                .support_submit_ticket .right{width:200px!important}
                
                #header_custom_search { width: 710px; margin: 0 auto }
                .result_item { width: 724px }
                .sponsored_result_custom .image img { margin-top:-5px;position:relative}
                .url { line-height: 2em; color: #00a4c8 }
                .sponsored_result_item2 { padding: 0.2em 0 0 }
                .featured_sponsor { border: solid 1px #E8E862; background: #ffc }
                .featured_sponsor td { padding: 0.5em }
                .featured_sponsor a { color: #000; line-height: 1.3em }
                .featured_sponsor span { font-weight: bold; color: #0162CB; text-decoration: underline }
                p.small_notice { margin: 8px 0; color: #CCC; text-align: right; font-size: 0.65em; line-height: 0.2em }
                #header_custom_search { margin-top: 12px }
                .header_custom_search_left { float:left }
                .header_custom_search_right { float:right; width: 378px }
                .header_custom_search_right table { margin-top: 0 }
                .header_custom_search_right table, .header_custom_search_right .name, .header_custom_search_right .city, .header_custom_search_right .range, .header_custom_search_right .state { text-align: left; font-size: 0.8em; -font-size: 0.8em }
                .header_custom_search_right .name, .header_custom_search_right .city, .header_custom_search_right .range, .header_custom_search_right .state { -font-size: 1em }
                .header_custom_search_right .name { height: 12px; -height: 14px; width: 114px }
                .header_custom_search_right .city { height: 12px; -height: 14px; width: 74px }
                .header_custom_search_right .range { height: 16px; width: 50px }
                .header_custom_search_right .state { height: 16px; width: 43px }
                .header_custom_search_right .search { height: 20px; -height: 22px; width: 66px }
                .flag { font-size: 0.8em; text-align: left; padding-left: 3px; line-height: 1em; margin-bottom: 6px }
                .flag a { font-size: 1em; color: #0162CB; text-decoration: underline }
                #by_category, #the_web { display: none }
                #the_web { margin-bottom: 7px }
                .custom_google form { margin: 0 }
                
                .related_links{width:724px;margin:0;padding:0.2em 0 0.5em;background:#F8F8F8;border:solid 1px #E8E8E8}
                .related_links p{margin:0.3em 10px;padding-left: 14px;background:url(http://www.usdirectory.com/images/list.gif) no-repeat left 0.6em}
                .related_links a{text-decoration:underline;color:#000}
                .related_links .related_links_column{float:left;width:180px;margin:0 0 0 40px;_margin:0 0 0 30px}
                
                .popularlinks{font-family:arial,sans-serif;font-size:1em;width:752px;widt\h:750px;min-height:1px;_height:1px;background:white;text-align:left;border:1px solid #bcbc6c;margin: 5px auto;padding:1px 0}
                .popularlinks h3{background:#f1f1f1;color:#676767;font-size:0.85em;border-style:solid;border-color:#d5d6c0;border-width:1px 0;margin:3px 0;padding:1px 8px;min-height:1px;_height:1px;}
                .popularlinks h1{background:#f1f1f1;color:#676767;font-size:0.85em;border-style:solid;border-color:#d5d6c0;border-width:1px 0;margin:3px 0;padding:1px 8px;min-height:1px;_height:1px;}
                .popularlinks-left{width:376px;widt\h:367px;padding:0 4px;float:left;min-height:1px;_height:1px;}
                .popularlinks-right{width:374px;widt\h:366px;padding:0 4px;float:right;min-height:1px;_height:1px;border-left:1px solid #d5d6c0}
                .popularlinks-wide{padding:0 4px;min-height:1px;_height:1px;}
                .popularlinks a {color:#0162CB; text-decoration: underline; }
                .popularlinks a:hover {color:#0162CB; text-decoration: none; }
                .popularlinks ul{width:125px;widt\h:112px;float:left;margin:0 0 0 8px;_margin-left:-4px;_margin-lef\t:4px;min-height:1px;_height:1px;padding:0 0 8px 0;list-style:none}
                .popularlinks-wide ul{margin-right:3px;_margin-righ\t:6px;}
                .popularlinks ul li{padding:1px 0;margin:0}
                .popularlinks .end{background:url(../img/popularlinks-end.gif);height:7px;overflow:hidden;width:752px;position:relative;top:-5px;margin:0 -1px -7px -1px}
                
                .city-guides-link{display:block;margin-top:10px;}
                .city-guides-link img{border:#999984 1px solid}
                
                .header_city_search{text-align:center}
                .header_city_search .center{float:none;font-weight:bold}
                .header_city_search .center a{float:none;text-align:center;font-weight:bold;padding:0;font-size:1em}
                
                h2{font-size:1.4em;font-weight:normal;margin:4px 0 0 0}
                h2.featured_header{background-color: #FFFFCC;text-align:center;padding:7px 0 6px 0;margin-top:20px}
                
                .more{text-align:right;clear:both;margin:0;padding-top:4px;}
                
                .top_categories{padding: 0 0 0 30px}
                .top_categories h2{margin-left:-23px}
                .top_categories a {color: #0162CB; text-decoration: underline;}
                .top_categories a:hover { text-decoration: none; }
                .top_categories .more{margin:0 7px 0 0}
                .top_categories ul{width:236px;widt\h:224px;float:left;margin:7px 0 0 7px;_margin-left:-4px;_margin-lef\t:4px;min-height:1px;_height:1px;padding:0;list-style:none}
                .top_categories ul li{padding:3px 0;margin:0}
                
                .top_cities{margin:14px 7px 0px 28px;min-height:1em;_height:1px}
                .top_cities a{color: #0162CB; text-decoration: underline;}
                .top_cities ul{width:135px;widt\h:122px;float:left;margin:0 0 0 8px;_margin-left:-4px;_margin-lef\t:4px;min-height:1px;_height:1px;padding:0 0 8px 0;list-style:none}
                .top_cities ul li{padding:3px 0;margin:0}
                
                .dym{margin:0 0 1em 0}
                .dym a{font-size:1em;font-weight:bold;text-decoration:underline;color:#0162cb}
                
                .related{font-family:arial,sans-serif;font-size:0.9em;margin: 5px auto;padding:1px 0}
                .related ul{float:left;width:175px;margin:0 0 0 48px;padding:0;list-style:none}
                .related li{padding:2px 0}
                .related a{font-size:1em;color: #0162CB; text-decoration: underline;}
                
                
                .phone_win{position:absolute;width:444px;top:0px;left:0px;z-index:1001;text-align:left;font-size:0.9em;font-family:arial,sans-serif}
                .phone_win .phone_win_ts{padding:7px 7px 0 7px;background:url(../img/win_shadow.png) no-repeat -444px 0;_background:none;}
                .phone_win .phone_win_is{padding:0 7px;background:url(../img/win_shadow.png) repeat-y 0 0;min-height:1px;_height:1px;_background:none;}
                .phone_win .phone_win_bs{padding:0 7px 7px 7px;background:url(../img/win_shadow.png) no-repeat -888px 0;_background:none;}
                .phone_win .phone_win_t{height:9px;overflow:hidden;background:url(../img/win_tb.png) no-repeat 0 0}
                .phone_win .phone_win_i{border-left:1px solid #6f6f3f;border-right:1px solid #6f6f3f;background:#ffff92;padding:0 2px;min-height:1px}
                .phone_win .phone_win_i2{background:url(../img/win_bg.gif) repeat-x 0 0;padding:5px 8px;min-height:1px;_height:1px}
                .phone_win .phone_win_b{height:9px;overflow:hidden;background:url(../img/win_tb.png) no-repeat 0 -9px}
                .phone_win .head{padding:0 5px}
                .phone_win .head strong{display:block;font-size:1.2em;margin:8px 0}
                .phone_win .cont{border:1px solid #bcbc6c;background:white;padding:5px 5px}
                .phone_win .cont p{margin:0}
                .phone_win .cont a{color:#0162cb;text-decoration:underline;font-size:1em}
                .phone_win .cont a:hover{text-decoration:none;}
                .phone_win .skype{float:left;width:225px;background:url(../img/win_div.gif) no-repeat 100% 50%;padding:7px 0}
                .phone_win .skype .skype_button{display:block;margin:15px 0 20px 10px;width:179px;height:42px;background:url(../img/win_skype.gif) no-repeat 0 0}
                .phone_win .skype .note{color:676767;font-size:0.9em}
                .phone_win .phone{float:right;width:164px;padding:7px 0;text-align:center}
                .phone_win .phone_no{padding-top:32px;>padding-top:28px;}
                .phone_win .phone strong{display:inline;background:url(../img/win_phone.gif) no-repeat 0 0;padding:5px 0 12px 30px;>display:inline-block;}
                .phone_win .phone_win_close{width:38px;height:18px;background:url(../img/win_close.gif) no-repeat 0 0;position:absolute;top:8px;right:17px;cursor:pointer;_cursor:hand}
                .phone_win .phone_win_close_hover{background-position:0 -18px}
                .clr{clear:both;font-size:0.06em;line-height:0px;height:0.05em;overflow:hidden}
                .phone_win_preload{position:absolute;width:1px;height:1px;overflow:hidden;left:-2000px;}
                .phone_win_preload .img1{background:url(../img/win_shadow.png)}
                .phone_win_preload .img2{background:url(../img/win_tb.png)}
                .phone_win_preload .img3{background:url(../img/win_phone.gif)}
                .phone_win_preload .img4{background:url(../img/win_skype.gif)}
                .phone_win_preload .img5{background:url(../img/win_close.gif)}
                .phone_win_preload .img6{background:url(../img/win_div.gif)}
                .phone_win_preload .img7{background:url(../img/win_bg.gif)}
                
                .adv .top,.adv .btm{background-image:url(../img/gypr.png);background-repeat:no-repeat}
                .adv p{margin:0}
                .adv{background:white;margin:0 auto 12px auto;width:732px;font-size:1em}
                .adv .top{padding:5px 12px;text-transform:uppercase;font:bold 0.8em verdana,sans-serif;letter-spacing:-1px;background-position:0 -58px;background-color:#dcdcdc}
                .adv .mdl{border-width:0 1px;border-color:#bcbcbc;border-style:solid;padding:5px 0 1px 12px;min-height:1px;_height:1px;}
                .adv .btm{height:8px;overflow:hidden;font-size:0;line-height:0;background-position:0 -108px}
                .adv a{display:block;color:black;text-decoration:none;line-height:1.2em}
                .adv a strong{font-size:1.2em;display:block;text-decoration:underline;padding-bottom:5px;color:#0162cb}
                .adv a em{font-style:normal;font-size:0.9em;color:#008000;display:block}
                .adv a{float:left;width:330px;margin:3px 9px}
                * html .adv a{display:inline}
            ]]>
        </style>
    </xsl:template>


	<xsl:template match="document">
		<xsl:call-template name="styles"/>
		<!-- <xsl:apply-templates select="HEAD/following-sibling::*" /> -->
		<xsl:apply-templates select="results/item"/>
		
		<!-- applying templates on errors if existing -->
		<xsl:apply-templates select="errorMessage" />
		<xsl:apply-templates select="error" />
		
		<!-- Adding refresh menu -->
		<div id="menuDiv" style="position:absolute;
								 top:0;
								 right:0;
								 width:50px;
								 height:25px;
								 z-index:99998" >
		 	<table>
		 		<tr>
		 			<td><img src="img/e_refresh.png" alt="Refresh" title="Refresh" onclick="goRefresh('{/document/@context}')" style="cursor: pointer;" /></td>
		 			<td><img src="img/e_back.png" alt="Restart" title="Restart"  onclick="goReconnect()" style="cursor: pointer;" /></td>
		 		</tr>
		 	</table>
		</div>
		
		<!-- Adding Powered by Convertigo logo -->
		<table border="0" width="100%" cellpadding="0" cellspacing="0">
			<tr>
				<td align="right" valign="bottom"><a href="http://www.convertigo.com" target="_blank"><img src="img/poweredbyc8o.jpg" alt="Powered by Convertigo" border="0"/></a></td>
			</tr>   
		</table>
	</xsl:template>

	
	<xsl:template match="results/item">
        <xsl:variable name="res_pos" select="count(preceding-sibling::item)+1"/>
        <xsl:variable name="res_name" select="./name"/>
        <xsl:variable name="tmp_addr" select="./address"/> 
        <xsl:variable name="res_address" select="normalize-space(substring-before($tmp_addr, ','))"/>
        <xsl:variable name="tmp_addr2" select="normalize-space(substring-after($tmp_addr, ','))"/>
        <xsl:variable name="res_city" select="normalize-space(substring-before($tmp_addr2, ','))"/>
        <xsl:variable name="tmp_addr3" select="normalize-space(substring-after($tmp_addr2, ','))"/>
        <xsl:variable name="res_state" select="normalize-space(substring-before($tmp_addr3, ' '))"/>
        <xsl:variable name="res_zip" select="normalize-space(substring-after($tmp_addr3, ' '))"/>
                
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <td style="border-top: 1px solid #00a4c8; border-left: 1px solid #00a4c8; padding: 10px 0px 0px 10px; width:60px">
                    <img src="img/salesforce_logo.gif" 
                        title="please click here to send information on corresponding SalesForce lead" 
                        alt="please click here to send information on corresponding SalesForce lead"
                        style="cursor: pointer;" 
                        onclick="C8O.doMashupEvent('usd2salesforce', this);"
                        rowindex="{/document/rowindex}"
                        res_country="USA"
                        res_name="{$res_name}" 
                        res_address="{$res_address}" 
                        res_city="{$res_city}"  
                        res_zip="{$res_zip}">
                        
                        <xsl:choose>
                            <xsl:when test="$res_state = 'AL'">
                                <xsl:attribute name="res_state">Alabama</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'AK'">
                                <xsl:attribute name="res_state">Alaska</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'AZ'">
                                <xsl:attribute name="res_state">Arizona</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'AR'">
                                <xsl:attribute name="res_state">Arkansas</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'CA'">
                                <xsl:attribute name="res_state">California</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'CO'">
                                <xsl:attribute name="res_state">Colorado</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'Ct'">
                                <xsl:attribute name="res_state">Connecticut</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'DC'">
                                <xsl:attribute name="res_state">D.C.</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'DE'">
                                <xsl:attribute name="res_state">Delaware</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'FL'">
                                <xsl:attribute name="res_state">Florida</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'GA'">
                                <xsl:attribute name="res_state">Georgia</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'HI'">
                                <xsl:attribute name="res_state">Hawaii</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'ID'">
                                <xsl:attribute name="res_state">Idaho</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'IL'">
                                <xsl:attribute name="res_state">Illinois</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'IN'">
                                <xsl:attribute name="res_state">Indiana</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'IA'">
                                <xsl:attribute name="res_state">Iowa</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'KS'">
                                <xsl:attribute name="res_state">Kansas</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'KY'">
                                <xsl:attribute name="res_state">Kentucky</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'LA'">
                                <xsl:attribute name="res_state">Louisiana</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'ME'">
                                <xsl:attribute name="res_state">Maine</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'MD'">
                                <xsl:attribute name="res_state">Maryland</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'MA'">
                                <xsl:attribute name="res_state">Massachusetts</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'MN'">
                                <xsl:attribute name="res_state">Minnesota</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'MS'">
                                <xsl:attribute name="res_state">Mississippi</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'MO'">
                                <xsl:attribute name="res_state">Missouri</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'MT'">
                                <xsl:attribute name="res_state">Montana</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NE'">
                                <xsl:attribute name="res_state">Nebraska</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NV'">
                                <xsl:attribute name="res_state">Nevada</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NH'">
                                <xsl:attribute name="res_state">New Hampshire</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NJ'">
                                <xsl:attribute name="res_state">New Jersey</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NM'">
                                <xsl:attribute name="res_state">New Mexico</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NY'">
                                <xsl:attribute name="res_state">New York</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'NC'">
                                <xsl:attribute name="res_state">North Carolina</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'ND'">
                                <xsl:attribute name="res_state">North Dakota</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'OH'">
                                <xsl:attribute name="res_state">Ohio</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'OK'">
                                <xsl:attribute name="res_state">Oklahoma</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'OR'">
                                <xsl:attribute name="res_state">Oregon</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'PA'">
                                <xsl:attribute name="res_state">Pennsylvania</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'RI'">
                                <xsl:attribute name="res_state">Rhode Island</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'SC'">
                                <xsl:attribute name="res_state">South Carolina</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'SD'">
                                <xsl:attribute name="res_state">South Dakota</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'TN'">
                                <xsl:attribute name="res_state">Tennessee</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'TX'">
                                <xsl:attribute name="res_state">Texas</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'UT'">
                                <xsl:attribute name="res_state">Utah</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'VT'">
                                <xsl:attribute name="res_state">Vermont</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'VA'">
                                <xsl:attribute name="res_state">Virginia</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'WA'">
                                <xsl:attribute name="res_state">Washington</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'WV'">
                                <xsl:attribute name="res_state">West Virginia</xsl:attribute>
                            </xsl:when>
                            <xsl:when test="$res_state = 'WY'">
                                <xsl:attribute name="res_state">Wyoming</xsl:attribute>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:attribute name="res_state"><xsl:value-of select="$res_state"/></xsl:attribute>
                            </xsl:otherwise>
                        </xsl:choose>
                    </img> 
                </td>
                <td rowspan="2" style="padding: 10px 10px 0px 10px; border-top: 1px solid #00a4c8; border-bottom: 1px solid #00a4c8; border-right: 1px solid #00a4c8; ">
                    <SPAN class="text3" >
						<SPAN class="header_text3"><xsl:value-of select="$res_name"/></SPAN>
						<BR/>
						<SPAN class="text3" ><xsl:value-of select="$tmp_addr"/></SPAN>
					</SPAN>
					<SPAN class="phone_button_out">
    					<!--<SPAN class="phone_button" style="margin-top: 0pt;" twsid="5">Call Now!<BR twsid="6"/></SPAN>-->
    				</SPAN>
    			</td>
            </tr>
            <tr>
                <td style="border-bottom: 1px solid #00a4c8; border-left: 1px solid #00a4c8; padding: 5px 0px 10px 10px; width:60px">
                    <img src="img/googlemaps_logo_small.png"
                        title="please click here to show location in googlemap" 
                        alt="please click here to show location in googlemap"
                        style="cursor: pointer;"
                        onclick="C8O.doMashupEvent('usdAddressClicked', this);"
                        name="{$res_name}" 
                        address="{$tmp_addr}"/>
                </td>
            </tr>
        </table>
        <br/>
    </xsl:template>
	
	<xsl:template match="errorMessage">
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td style="border-top: 1px solid #00a4c8; border-left: 1px solid #00a4c8 ; padding: 10px 0px 0px 10px;">
				</td>
				<td rowspan="2" style="border-top: 1px solid #00a4c8 ;border-bottom: 1px solid #00a4c8 ;border-right: 1px solid #00a4c8 ; padding: 10px 10px 0px 10px;">
					No results found for <xsl:value-of select="substring-after(., 'Search Results for')"/>
				</td>
			</tr>
			<tr>
				<td style="border-bottom: 1px solid #00a4c8; border-left: 1px solid #00a4c8 ; padding: 5px 0px 10px 10px;">
				</td>
			</tr>
		</table>
		<br/>
	</xsl:template>
	
	<xsl:template match="error">
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td style="border-top: 1px solid #00a4c8; border-left: 1px solid #00a4c8 ; padding: 10px 0px 0px 10px;">
				</td>
				<td rowspan="2" style="border-top: 1px solid #00a4c8 ;border-bottom: 1px solid #00a4c8 ;border-right: 1px solid #00a4c8 ; padding: 10px 10px 0px 10px;">
					<xsl:value-of select="."/>
				</td>
			</tr>
			<tr>
				<td style="border-bottom: 1px solid #00a4c8; border-left: 1px solid #00a4c8 ; padding: 5px 0px 10px 10px;">
				</td>
			</tr>
		</table>
		<br/>
	</xsl:template>
		
	<xsl:template match="rowindex"/>	<!-- don't display the row index added by convertigo -->
</xsl:stylesheet>
