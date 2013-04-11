package com.twinsoft.convertigo.engine.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.net.URL;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.xml.namespace.QName;
import javax.xml.transform.Source;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.apache.ws.commons.schema.XmlSchema;
import org.apache.ws.commons.schema.XmlSchemaAttribute;
import org.apache.ws.commons.schema.XmlSchemaAttributeGroup;
import org.apache.ws.commons.schema.XmlSchemaCollection;
import org.apache.ws.commons.schema.XmlSchemaComplexType;
import org.apache.ws.commons.schema.XmlSchemaElement;
import org.apache.ws.commons.schema.XmlSchemaGroup;
import org.apache.ws.commons.schema.XmlSchemaImport;
import org.apache.ws.commons.schema.XmlSchemaInclude;
import org.apache.ws.commons.schema.XmlSchemaObject;
import org.apache.ws.commons.schema.XmlSchemaObjectCollection;
import org.apache.ws.commons.schema.XmlSchemaSerializer.XmlSchemaSerializerException;
import org.apache.ws.commons.schema.XmlSchemaSimpleType;
import org.apache.ws.commons.schema.XmlSchemaType;
import org.apache.ws.commons.schema.XmlSchemaUse;
import org.apache.ws.commons.schema.constants.Constants;
import org.apache.ws.commons.schema.resolver.DefaultURIResolver;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.ls.LSInput;
import org.w3c.dom.ls.LSResourceResolver;
import org.xml.sax.SAXException;

import com.twinsoft.convertigo.beans.core.DatabaseObject;
import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.engine.EngineException;
import com.twinsoft.convertigo.engine.enums.SchemaMeta;
import com.twinsoft.convertigo.engine.util.XmlSchemaWalker.XmlSchemaWalkerWatcher;

public class XmlSchemaUtils {
	public static class XmlSchemaObjectCollectionList<E extends XmlSchemaObject> implements List<E> {
		private XmlSchemaObjectCollection collection;
		
		public XmlSchemaObjectCollectionList(XmlSchemaObjectCollection collection) {
			this.collection = collection;
		}

		public int size() {
			return collection.getCount();
		}

		public boolean isEmpty() {
			return collection.getCount() == 0;
		}

		public boolean contains(Object o) {
			if (o instanceof XmlSchemaObject) {
				return collection.indexOf((XmlSchemaObject) o) != -1;
			} else {
				return false;
			}
		}

		public Iterator<E> iterator() {
			return GenericUtils.cast(collection.getIterator());
		}

		public Object[] toArray() {
			return null;
		}

		public <T> T[] toArray(T[] a) {
			return null;
		}

		public boolean add(XmlSchemaObject o) {
			collection.add(o);
			return true;
		}

		public boolean remove(Object o) {
			if (contains(o)) {
				collection.remove((XmlSchemaObject) o);
				return true;
			} else {
				return false;
			}
		}

		public boolean containsAll(Collection<?> c) {
			return false;
		}

		public boolean addAll(Collection<? extends E> c) {
			return false;
		}

		public boolean addAll(int index, Collection<? extends E> c) {
			return false;
		}

		public boolean removeAll(Collection<?> c) {
			return false;
		}

		public boolean retainAll(Collection<?> c) {
			return false;
		}

		public void clear() {
			XmlSchemaUtils.clear(collection);
		}

		public E get(int index) {
			return GenericUtils.cast(collection.getItem(index));
		}

		public E set(int index, XmlSchemaObject element) {
			E o = get(index);
			collection.setItem(index, element);
			return o;
		}

		public void add(int index, XmlSchemaObject element) {
			
		}

		public E remove(int index) {
			E o = get(index);
			collection.removeAt(index);
			return o;
		}

		public int indexOf(Object o) {
			if (o instanceof XmlSchemaObject) {
				return collection.indexOf((XmlSchemaObject) o);
			} else {
				return -1;
			}
		}

		public int lastIndexOf(Object o) {
			return -1;
		}

		public ListIterator<E> listIterator() {
			return null;
		}

		public ListIterator<E> listIterator(int index) {
			return null;
		}

		public List<E> subList(int fromIndex, int toIndex) {
			return null;
		}
		
	}
	
	final private static SchemaFactory factory = SchemaFactory.newInstance(Constants.URI_2001_SCHEMA_XSD);
	final private static Source emptySource = new DOMSource(XMLUtils.getDefaultDocumentBuilder().newDocument());
	
	final public static XmlSchemaUse attributeUseRequired = new XmlSchemaUse(Constants.BlockConstants.REQUIRED);
	final public static XmlSchemaUse attributeUseOptional = new XmlSchemaUse(Constants.BlockConstants.OPTIONAL);
	
	
	final public static Comparator<XmlSchemaAttribute> attributeNameComparator = new Comparator<XmlSchemaAttribute>() {
		public int compare(XmlSchemaAttribute o1, XmlSchemaAttribute o2) {
			return o1.getName().compareTo(o2.getName());
		}
	};
	
	public static SortedSet<XmlSchemaAttribute> attributesToSortedSet(XmlSchemaObjectCollection attrs) {
		SortedSet<XmlSchemaAttribute> result = new TreeSet<XmlSchemaAttribute>(XmlSchemaUtils.attributeNameComparator);
		for (Iterator<XmlSchemaAttribute> i = GenericUtils.cast(attrs.getIterator()); i.hasNext();) {
			result.add(i.next());
		}
		return result;
	}
	
	public static void clear(XmlSchemaObjectCollection collection) {
		int count = collection.getCount();
		while (count > 0) {
			collection.removeAt(--count);
		}
	}
	
	public static <E extends XmlSchemaObject> E makeDynamic(DatabaseObject databaseObject, E xso) {
		SchemaMeta.getReferencedDatabaseObjects(xso).add(databaseObject);
		SchemaMeta.setDynamic(xso);
		return xso;
	}
	
	public static <E extends XmlSchemaObject> E makeDynamic(Collection<DatabaseObject> databaseObjects, E xso) {
		SchemaMeta.getReferencedDatabaseObjects(xso).addAll(databaseObjects);
		SchemaMeta.setDynamic(xso);
		return xso;
	}
	
	public static <E extends XmlSchemaObject> E makeDynamicReadOnly(DatabaseObject databaseObject, E xso) {
		SchemaMeta.setReadOnly(xso);
		return makeDynamic(databaseObject, xso);
	}
	
	public static Document getDomInstance(XmlSchemaObject object) {
		return getDomInstance(object, null);
	}
	
	public static Document getDomInstance(XmlSchemaObject object, final Map<Node, XmlSchemaObject> references) {
		final Document doc = XMLUtils.getDefaultDocumentBuilder().newDocument();
		final Element root = doc.createElement("document");
		doc.appendChild(root);
		
		new XmlSchemaWalker() {
			Node parent = root;
			int maxDepth = 50;
			
			@Override
			protected void walkElement(XmlSchema xmlSchema, XmlSchemaElement obj) {
				Node myParent = parent;
				XmlSchemaElement element = (XmlSchemaElement) obj;
				if (element.getRefName() == null) {
					Element xElement = doc.createElement(element.getName());
					if (references != null) {
						references.put(xElement, element);
					}
					myParent.appendChild(xElement);
					parent = xElement;
				}
				if (--maxDepth > 0) {
					super.walkElement(xmlSchema, obj);
				}
				parent = myParent;
			}

			@Override
			protected void walkAttribute(XmlSchema xmlSchema, XmlSchemaAttribute obj) {
				if (parent instanceof Element) {
					Element xParent = (Element) parent;
					String name = obj.getName();
					xParent.setAttribute(name, "");
					if (references != null) {
						references.put(xParent.getAttributeNode(name), obj);
					}
				}
			}
			
		}.walk(SchemaMeta.getSchema(object), object);
		
		return doc;
	}

	public static void validate(XmlSchemaCollection collection) throws SAXException {
		validate(collection, emptySource);
	}
	
	public static void validate(XmlSchemaCollection collection, Document document) throws SAXException {
		validate(collection, new DOMSource(document));
	}
	
	private static LSInput createLSInputImpl() {
		return new LSInput() {
			
			protected String fPublicId;
			
		    protected String fSystemId;
		
		    protected String fBaseSystemId;
		
		    protected InputStream fByteStream;
		
		    protected Reader fCharStream;
		
		    protected String fData;
		
		    protected String fEncoding;
		
		    protected boolean fCertifiedText;
		
		    public InputStream getByteStream() {
		        return fByteStream;
		    }
		
		    public void setByteStream(InputStream byteStream) {
		        fByteStream = byteStream;
		    }
		
		    public Reader getCharacterStream() {
		        return fCharStream;
		    }
		
		    public void setCharacterStream(Reader characterStream) {
		        fCharStream = characterStream;
		    }
		
		    public String getStringData() {
		        return fData;
		    }
		
		    public void setStringData(String stringData) {
		        fData = stringData;
		    }
		
		    public String getEncoding() {
		        return fEncoding;
		    }
		
		    public void setEncoding(String encoding) {
		        fEncoding = encoding;
		    }
		
		    public String getPublicId() {
		        return fPublicId;
		    }
		
		    public void setPublicId(String publicId) {
		        fPublicId = publicId;
		    }
		
		    public String getSystemId() {
		        return fSystemId;
		    }
		
		    public void setSystemId(String systemId) {
		        fSystemId = systemId;
		    }
		
		    public String getBaseURI() {
		        return fBaseSystemId;
		    }
		
		    public void setBaseURI(String baseURI) {
		        fBaseSystemId = baseURI;
		    }
		
		    public boolean getCertifiedText() {
		        return fCertifiedText;
		    }
		
		    public void setCertifiedText(boolean certifiedText) {
		        fCertifiedText = certifiedText;
		    }
		};
	}
	
	
	private static void validate(XmlSchemaCollection collection, Source source) throws SAXException {
		try {
			final XmlSchema[] schemas = collection.getXmlSchemas();
			
			Arrays.sort(schemas, new Comparator<XmlSchema>() {

				public int compare(XmlSchema o1, XmlSchema o2) {
					return SchemaMeta.isDynamic(o1) ?
						-1 : SchemaMeta.isDynamic(o2) ?
						1 : 0;
				}
				
			});
			
			final String collectionBaseURI = ((DefaultURIResolver)collection.getSchemaResolver()).getCollectionBaseURI();
			
			Source[] sources = new Source[schemas.length];
			for (int i = 0; i < schemas.length; i++) {
				Document doc = schemas[i].getSchemaDocument();
				doc.getDocumentElement().setAttribute("elementFormDefault", Project.XSD_FORM_UNQUALIFIED);
				doc.getDocumentElement().setAttribute("attributeFormDefault", Project.XSD_FORM_UNQUALIFIED);
				sources[i] = new DOMSource(doc, collectionBaseURI);
			}
			
			factory.setResourceResolver(new LSResourceResolver() {
				public LSInput resolveResource(String type, String namespaceURI, String publicId, String systemId, String baseURI) {
					System.out.println("==== Resolving '" + type + "' '" + namespaceURI + "' '" + publicId + "' '" + systemId + "' '" +baseURI + "'");
					LSInput impl = createLSInputImpl();
					InputStream ins = null;
					
					String resURL = null;
					String sourceURI = null;
					String schemaLocation = "";
					
					try {
						if (baseURI != null) {
							schemaLocation = baseURI.substring(0, baseURI.lastIndexOf("/") + 1);
						}
						else {
							schemaLocation = collectionBaseURI.substring(0, collectionBaseURI.lastIndexOf("/") + 1);
						}
					}
					catch (Exception e) {}
					
					if (systemId != null) {
						if (systemId.indexOf(schemaLocation) < 0) {
							resURL = schemaLocation + systemId;
						} else {
							resURL = systemId;
						}
						
						sourceURI = resURL;
						
					} else if (namespaceURI != null) {
						resURL = namespaceURI;
					}
					
					try {
						URL url = new URL(sourceURI);
						ins = url.openStream();
					} catch (Exception e) {
						//ignore
					}
					
					if ((ins == null) && (namespaceURI != null)) {
						for (XmlSchema xs : schemas/*collection.getXmlSchemas()*/) {
							sourceURI = xs.getSourceURI();
							if ((systemId == null) || ((systemId != null) && (sourceURI != null) && (sourceURI.endsWith(systemId)))) {
								if (namespaceURI.equals(xs.getTargetNamespace())) {
									XmlSchemaObjectCollection xoc = xs.getItems();
									for (int i=0; i<xoc.getCount(); i++) {
										XmlSchemaObject xo = xoc.getItem(i);
										if (xo instanceof XmlSchemaInclude) {
											XmlSchemaInclude sci = (XmlSchemaInclude)xo;
											XmlSchema included = sci.getSchema();
											XmlSchemaObjectCollection c = included.getItems();
											for (int j=0; j<c.getCount(); j++) {
												XmlSchemaObject ob = c.getItem(j);
												xs.getItems().add(ob);
											}
										}
									}

									ByteArrayOutputStream out = new ByteArrayOutputStream();
									xs.write(out);
									ins = new ByteArrayInputStream(out.toByteArray());
									//System.out.println(out.toString());
								}
							}
						}
					}
					if (ins != null) {
						impl.setByteStream(ins);
						return impl;
					}
					return null;
				}
			});
			
			Schema vSchema = factory.newSchema(sources);
			Validator validator = vSchema.newValidator();
			validator.validate(source);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (XmlSchemaSerializerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static XmlSchemaElement extractXmlSchemaElement(Document doc, final XmlSchema schemaAdopter, final DatabaseObject dboAdopter) throws Exception {
		final String tns = schemaAdopter.getTargetNamespace();
		XmlSchemaCollection collection = new XmlSchemaCollection();
		Document xsdDom = XSDExtractor.extractXSD("", doc);
		Element xsdDomRoot = xsdDom.getDocumentElement();
		xsdDomRoot.setAttribute("xmlns:xsd", Constants.URI_2001_SCHEMA_XSD);
		xsdDomRoot.setAttribute("xmlns:p_ns", tns);
		xsdDomRoot.setAttribute("targetNamespace", tns);
		XmlSchema schema = collection.read(new StreamSource(new StringReader(XMLUtils.prettyPrintDOM(xsdDom))), null);
		SchemaMeta.setCollection(schema, collection);
		XmlSchemaElement elt = (XmlSchemaElement) schema.getElements().getValues().next();
		SchemaMeta.setSchema(elt, schema);
		
		new XmlSchemaWalkerWatcher() {
			@Override
			protected boolean on(XmlSchemaObject obj) {
				makeDynamic(dboAdopter, obj);
				return super.on(obj);
			}

			@Override
			protected void walkElement(XmlSchema xmlSchema, XmlSchemaElement obj) {
				super.walkElement(xmlSchema, obj);
				obj.setQName(null);
				if (tns.equals(obj.getSchemaTypeName().getNamespaceURI())) {
					obj.setSchemaTypeName(null);
				}
			}

			@Override
			protected void walkSimpleType(XmlSchema xmlSchema, XmlSchemaSimpleType obj) {
				super.walkSimpleType(xmlSchema, obj);
				obj.setName(null);
			}

			@Override
			protected void walkComplexType(XmlSchema xmlSchema, XmlSchemaComplexType obj) {
				super.walkComplexType(xmlSchema, obj);
				obj.setName(null);
			}

			@Override
			protected void walkAttribute(XmlSchema xmlSchema, XmlSchemaAttribute obj) {
				super.walkAttribute(xmlSchema, obj);
				obj.setQName(null);
				if (tns.equals(obj.getSchemaTypeName().getNamespaceURI())) {
					obj.setSchemaTypeName(null);
				}
			}
			
		}.init(elt, true, false);
		
		return elt;
	}
	
	public static QName getSchemaDataTypeName(String schemaDataTypeName) {
		QName qname = Constants.XSD_STRING;
		if (schemaDataTypeName != null && schemaDataTypeName.startsWith("xsd:")) {
			try {
				qname = new QName(Constants.URI_2001_SCHEMA_XSD, schemaDataTypeName.split(":")[1]);
			}
			catch (Exception e) {}
		}
		return qname;
	}
	
	public static boolean hasSameNamespace(XmlSchema schema1, XmlSchema schema2) throws EngineException {
		String tns1 = schema1.getTargetNamespace();
		String tns2 = schema2.getTargetNamespace();
		return (tns1 != null && tns2 != null && tns1.equals(tns2));
	}

	public static void add(XmlSchema schema, XmlSchemaObject object) {
		if (object instanceof XmlSchemaImport) {
			schema.getIncludes().add(object);
			schema.getItems().add(object);
		} else if (object instanceof XmlSchemaInclude) {
			schema.getIncludes().add(object);
			schema.getItems().add(object);
		} else if (object instanceof XmlSchemaElement) {
			add(schema, (XmlSchemaElement) object);
		} else if (object instanceof XmlSchemaType) {
			add(schema, (XmlSchemaType) object);
		} else if (object instanceof XmlSchemaGroup) {
			add(schema, (XmlSchemaGroup) object);
		} else if (object instanceof XmlSchemaAttributeGroup) {
			add(schema, (XmlSchemaAttributeGroup) object);
		} else if (object instanceof XmlSchemaAttribute) {
			add(schema, (XmlSchemaAttribute) object);
		} else {
			schema.getItems().add(object);
		}
	}
	
	public static void add(XmlSchema schema, XmlSchemaElement element) {
		QName qName = element.getQName();
		if (qName == null) {
			qName = new QName(schema.getTargetNamespace(), element.getName());
		}
		if (schema.getElementByName(qName) == null) {
			schema.getItems().add(element);
			schema.getElements().add(qName, element);
		}
	}
	
	public static void add(XmlSchema schema, XmlSchemaType type) {
		if (schema.getTypeByName(type.getQName()) == null) {
			schema.getItems().add(type);
			schema.addType(type);
		}
	}
	
	public static void add(XmlSchema schema, XmlSchemaGroup group) {
		if (schema.getGroups().getItem(group.getName()) == null) {
			schema.getItems().add(group);
			schema.getGroups().add(group.getName(), group);
		}
	}
	
	public static void add(XmlSchema schema, XmlSchemaAttributeGroup attributeGroup) {
		if (schema.getAttributeGroups().getItem(attributeGroup.getName()) == null) {
			schema.getAttributeGroups().add(attributeGroup.getName(), attributeGroup);
			schema.getItems().add(attributeGroup);
		}
	}
	
	public static void add(XmlSchema schema, XmlSchemaAttribute attribute) {
		if (schema.getAttributes().getItem(attribute.getQName()) == null) {
			schema.getAttributes().add(attribute.getQName(), attribute);
			schema.getItems().add(attribute);
		}
	}
}