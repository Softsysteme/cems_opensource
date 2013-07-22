/*
 * Copyright (c) 1999-2004 TWinSoft sarl. All Rights Reserved.
 *
 * The copyright to the computer  program(s) herein  is the property
 * of TWinSoft sarl.
 * The program(s) may  be used  and/or copied  only with the written
 * permission  of TWinSoft  sarl or in accordance with the terms and
 * conditions  stipulated  in the agreement/contract under which the
 * program(s) have been supplied.
 *
 * TWinSoft  makes  no  representations  or  warranties  about   the
 * suitability of the software, either express or implied, including
 * but  not  limited  to  the implied warranties of merchantability,
 * fitness  for  a particular purpose, or non-infringement. TWinSoft
 * shall  not  be  liable for  any damage  suffered by licensee as a
 * result of using,  modifying or  distributing this software or its
 * derivatives.
 */

/*
 * $Workfile: csc.js $
 * $Author: Davidm $
 * $Revision: 1 $
 * $Date: 2007/08/31 14:30 $
 */

 function expandLeftMenu(name) {
	var menuDiv = getId(name);
	if (eval(menuDiv)) {
		if (menuDiv.style.display == "none") {
			menuDiv.style.display = "block";
		}
		else {
			menuDiv.style.display = "none";
		}
	}
}

function makecsv() {
	getId("__transaction").value = "makecsv";
	getId("javelin_form").action = "datas.csv";
	getId("javelin_form").target = "_blank";
	getId("javelin_form").submit();
	getd("__transaction").value = "";
	getId("javelin_form").action = ".xml";
	getId("javelin_form").target = "_self";

	return false;
}