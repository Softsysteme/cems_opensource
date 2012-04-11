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
 * $URL: http://sourceus/svn/convertigo/CEMS_opensource/trunk/Studio/src/com/twinsoft/convertigo/eclipse/views/projectexplorer/TreeParent.java $
 * $Author: fabienb $
 * $Revision: 28379 $
 * $Date: 2011-09-27 11:38:59 +0200 (Tue, 27 Sep 2011) $
 */

package com.twinsoft.convertigo.eclipse.views.references.model;

import java.util.ArrayList;
import java.util.List;

import com.twinsoft.convertigo.beans.core.DatabaseObject;

public abstract class AbstractParentNode extends AbstractNode {
	
	protected AbstractParentNode(AbstractParentNode parent, String name, DatabaseObject refDatabaseObject) {
		super(parent, name, refDatabaseObject);
		children = new ArrayList<AbstractNode>();
	}

	private List<AbstractNode> children;
	
	public void addChild(AbstractNode child) {
		children.add(child);
		child.setParent(this);
	}

	public List<AbstractNode> getChildren() {
		return children;
	}
	
	public boolean hasChildren() {
		return children.size()>0;
	}

}
