/**
 * Define the search form Panel
 */
app.init.push({
	name: 'download',
	init: function () {
		/**
		 * Defines a search form panel
		 */
		var form = new Ext.form.FormPanel({
			iconCls: 'search',
			items: [
				{
					xtype: 'fieldset',
					title: 'Download a web page HTML as a PDF file',
					instructions: 'Fill the full web page target url. Convertigo will go to<br /><b>www.html-to-pdf.net</b><br />fill the url input, generate and download the PDF.<br />Convertigo will transmit the downloaded file to your phone.',
					items: [
						{
							xtype: 'textfield',
							name : 'url',
							labelWidth: '50px',
							value: 'http://www.google.com',
							label: 'URL'
						}, {
							layout: 'hbox',
							direction: 'reverse',
							items: [
								{
									xtype: 'button',
									text: 'Download PDF',
									handler: function() {
										app.server.execute({
											transaction: 'PrepareDownload',
											form: form,
											mask: app.prepareMask,
											callback: function (data) {
												if (data.document.ready) {
													var target = app.server.endpoint.replace(new RegExp("\\.jsonp$"), ".bin?__transaction=Download");
													
													// fake wait of 3 secondes to let the browser really load the pdf from Convertigo
													app.downloadMask.show();
													window.setTimeout(function () {
														app.downloadMask.hide();
													}, 3000);
													
													window.location.href = target;
												} else {
													Ext.Msg.alert("Error","Something is wrong with Convertigo !");
												}
											}
										});
									}
								}
							]
						}
					]
				}
			],
			fullscreen: true,
			title : 'Download PDF'
		});
		
		return form;
	}
});