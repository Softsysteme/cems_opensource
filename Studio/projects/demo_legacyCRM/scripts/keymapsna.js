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
 * $Workfile: keymapsna.js $
 * $Author: Davidm $
 * $Revision: 1 $
 * $Date: 20/06/06 16:05 $
 */


//keycode,doAction?,!shift,shift
var keymap_func=[
	[13		,true		,'KEY_ENTER'			,'KEY_ENTER'			],
	[112	,true		,'KEY_PF1'				,'KEY_PF13'				],
	[113	,true		,'KEY_PF2'				,'KEY_PF14'				],
	[114	,true		,'KEY_PF3'				,'KEY_PF15'				],
	[115	,true		,'KEY_PF4'				,'KEY_PF16'				],
	[116	,true		,'KEY_PF5'				,'KEY_PF17'				],
	[117	,true		,'KEY_PF6'				,'KEY_PF18'				],
	[118	,true		,'KEY_PF7'				,'KEY_PF19'				],
	[119	,true		,'KEY_PF8'				,'KEY_PF20'				],
	[120	,true		,'KEY_PF9'				,'KEY_PF21'				],
	[121	,true		,'KEY_PF10'				,'KEY_PF22'				],
	[122	,true		,'KEY_PF11'				,'KEY_PF23'				],
	[123	,true		,'KEY_PF12'				,'KEY_PF24'				],
	[107	,true		,'KEY_FIELDPLUS'	,'KEY_FIELDPLUS'	],
	[34		,true		,'KEY_ROLLDOWN'		,'KEY_ROLLDOWN'		],
	[33		,true		,'KEY_ROLLUP'			,'KEY_ROLLUP'			],
	[27		,true		,'KEY_ATTN'				,'KEY_ATTN'				],
	[38		,false	,focusPrevField		,focusPrevField		],
	[40		,false	,focusNextField		,focusNextField		],
	[9		,false	,focusNextField		,focusPrevField		]
];
