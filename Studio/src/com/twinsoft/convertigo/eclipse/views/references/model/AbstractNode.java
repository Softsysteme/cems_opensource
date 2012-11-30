/*
 * Copyright (c) 2001-2011 Convertigo SA.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 *
 * $URL: http://sourceus/svn/convertigo/CEMS_opensource/trunk/Studio/src/com/twinsoft/convertigo/eclipse/views/projectexplorer/TreeObject.java $
 * $Author: fabienb $
 * $Revision: 28379 $
 * $Date: 2011-09-27 11:38:59 +0200 (Tue, 27 Sep 2011) $
 */

package com.twinsoft.convertigo.eclipse.views.references.model;


public abstract class AbstractNode {
	
	protected AbstractParentNode parent;
	protected String name;
	
	public String getName() {
		return name;
	}

	protected AbstractNode(AbstractParentNode parent, String name) {
		this.parent = parent;
		this.name = name;
	}
	
	public void setParent(AbstractParentNode parent) {
		this.parent = parent;
	}

	public AbstractParentNode getParent() {
		return parent;
	}
}
