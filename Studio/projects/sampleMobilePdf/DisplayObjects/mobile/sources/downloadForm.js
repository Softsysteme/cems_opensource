/**
 * Define a login panel
 */
app.init
		.push( {
			name : 'pdf',
			init : function() {

				var urlPdf = '';
				/**
				 * Defines a download button
				*/
				var downlaodButton = new Ext.Button({
					text : 'Get convertigo PDF article',
					handler : function() {
						app.server.execute( {
									connector : 'pdfArticleConnector',
									transaction : 'getArticle',
									mask : app.defaultMask,
									form : downLoadForm,
									callback : function(data) {
										if (data.document.attachment.attr.name !== "") {
											readButton.setVisible(true);
											urlPdf = data.document.attachment.attr['relative-url'];
											urlPdf =app.server.endpoint.substring(0,app.server.endpoint.indexOf(data.document.attr['project']))+data.document.attr['project']+'/'+ urlPdf;
											console.info("Get article from url: "+ data.document.attr['project']+" url: " + urlPdf);
											Ext.Msg.alert("Download succeed");
										} else {
											Ext.Msg.alert("Download failed");
										}
									}
								});
					}	
				 });
				/**
				 * Defines button to read pdf from convertigo
				*/
				var readButton = new Ext.Button({
					//id : 'readButton',
					text : 'Read article',
					hidden : true,
					handler : function() {
						var link = Ext
								.getDom('hidden_link'), clickevent = document
								.createEvent('Event');

						link.href = urlPdf;
						clickevent.initEvent('click',true, false);
						link.dispatchEvent(clickevent);

					}	
				 });

				/**
				 * Define a download panel
				 */
				var downLoadForm = new Ext.form.FormPanel(
						{
							title : 'Download',
							iconCls : 'user',
							dockedItems: [
							     {
							          dock : 'top',
							          xtype: 'toolbar',
							          title: 'Download CEMS Performance article'
							     }
							  ],
							
							items : [
								{
										layout : 'vbox',
										items : [ 
											downlaodButton,
											readButton
											 ]
								}
							]
						});
				return downLoadForm;
			}
		});