/*********************************************/
/*			sampleMobilePdf			 */
/*********************************************/
The sample allowed to download the first article from convertigo technical articles page on convertigo server and it can be read locally.



Design:
------
The project is based on an HTTP request statement that simply request the URL of pdf article 
getting from the href attribute of the first article that can be downloaded. 


The downloadForm.js file display two buttons that perform the actions:
	* 'Download PDF' allows downloading the first article, in this case, it refers to 'C-EMS Performance' article.
	* 'Read article' allows reading from convertigo server the pdf article downloaded. 
	   this action is triggered once the download action is succeed. A popup message is displayed informing that the download is succeed or not.
	

