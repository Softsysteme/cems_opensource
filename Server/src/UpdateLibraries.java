import java.io.File;
import java.io.FileWriter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class UpdateLibraries {
	
	private static Pattern absoluteModule = Pattern.compile("module:/classpath/lib/((?:\\w+:)?/.*)");
	
	private static void print(String line) {
		System.out.println(line);
	}
	
	public static void main(String[] args) throws Exception {
		print("Try to update server library");
		
		File componentFile = new File(".settings/org.eclipse.wst.common.component");
		
		if (!componentFile.exists()) {
			print("/!\\ Component file doesn't exist: " + componentFile.getAbsolutePath());
			System.exit(1);
		}
		print("Component file exists: " + componentFile.getAbsolutePath());
		
		File currentDir = new File("").getAbsoluteFile();
		
		print("Current dir: " + currentDir.getAbsolutePath());
		
		File studioDir = new File(currentDir.getParentFile(), currentDir.getName().replace("Server", "Studio"));
		
		if (!studioDir.exists()) {
			print("/!\\ Studio dir doesn't exist: " + studioDir.getAbsolutePath());
			System.exit(1);			
		}
		print("Studio dir exists: " + studioDir.getAbsolutePath());
		
		File pluginFile = new File(studioDir, "plugin.xml");
		
		if (!pluginFile.exists()) {
			print("/!\\ The plugin.xml file doesn't exist: " + pluginFile.getAbsolutePath());
			System.exit(1);			
		}
		print("The plugin.xml file exists: " + pluginFile.getAbsolutePath());
		
		Document componentXml = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(componentFile);
		
		print("Component file, xml loaded");
		
		XPath xPath = XPathFactory.newInstance().newXPath();
		Element wbModule = (Element) xPath.compile("/project-modules/wb-module").evaluate(componentXml, XPathConstants.NODE);
		NodeList modules = wbModule.getElementsByTagName("dependent-module");
				
		print("Find " + modules.getLength() + " modules");
		
		int min = 0;
		while (modules.getLength() > min) {
			Element module = (Element) modules.item(min);
			Matcher handle = absoluteModule.matcher(module.getAttribute("handle"));
			if (handle.matches()) {
				File file = new File(handle.group(1));
				if (!file.exists()) {
					print("/!\\ Warning, the following file doesn't exist: " + file.getAbsolutePath());
				}
				min++;
			} else {
				wbModule.removeChild(module);
			}
		}
		
		print("Modules removed");
		
		NodeList children = wbModule.getChildNodes();
		min = 0;
		while (children.getLength() > min) {
			Node child = children.item(min);
			if (child.getNodeType() != Node.TEXT_NODE) {
				min++;
			} else {
				wbModule.removeChild(child);
			}
		}
		
		print("Empty text nodes removed");
		
		Document pluginXml = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(pluginFile);
		
		print("The plugin.xml file, xml loaded");
		
		Element runtime = (Element) xPath.compile("/plugin/runtime").evaluate(pluginXml, XPathConstants.NODE);
		NodeList libraries = runtime.getElementsByTagName("library");
		
		
		
		while (libraries.getLength() > 0) {
			Element libraryElement = (Element) libraries.item(0);
			String name = libraryElement.getAttribute("name");
			File library = new File(studioDir, name);
			
			if (name.endsWith(".jar") && !name.startsWith("tomcat/") && library.exists()) {
				Element dependentModule = componentXml.createElement("dependent-module");
				dependentModule.setAttribute("archiveName", library.getName());
				dependentModule.setAttribute("deploy-path", "/WEB-INF/lib");
				dependentModule.setAttribute("handle", "module:/classpath/lib/" + studioDir.getName() + "/" + name);
				
				Element dependencyType = componentXml.createElement("dependent-type");
				dependencyType.setTextContent("uses");
				
				dependentModule.appendChild(dependencyType);
				wbModule.appendChild(dependentModule);
			}
			
			runtime.removeChild(libraryElement);
		}
		
		print("Added " + modules.getLength() + " modules");
		
		FileWriter writer = new FileWriter(componentFile);
		Transformer transformer = TransformerFactory.newInstance().newTransformer();
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
		transformer.transform(new DOMSource(componentXml), new StreamResult(writer));
		
		writer.close();
		
		print("Component file updated successfully, please refresh (F5) your .settings folder");
		print("You must also add a local SWT library in the Deployment Assembly of the project property");
		print("Bye");
	}

}
