import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
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
		
		File manifestFile = new File(studioDir, "META-INF/MANIFEST.MF");
		
		if (!manifestFile.exists()) {
			print("/!\\ Manifest file doesn't exist: " + manifestFile.getAbsolutePath());
			System.exit(1);			
		}
		print("Manifest file exists: " + manifestFile.getAbsolutePath());
		
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
		
		BufferedReader manifestReader = new BufferedReader(new FileReader(manifestFile));
		String line;
		
		while ((line = manifestReader.readLine()) != null && !line.startsWith("Bundle-ClassPath:"));
		
		if (line == null) {
			print("/!\\ Manifest file doesn't contain Bundle-ClassPath");
			System.exit(1);			
		}
		print("Manifest file contains Bundle-ClassPath");
		
		while ((line = manifestReader.readLine()) != null && !line.startsWith("Bundle-Activator:")) {
			line = line.trim().replace(",", "");
			File library = new File(studioDir, line);
			
			if (line.endsWith(".jar") && !line.startsWith("tomcat/") && library.exists()) {
				Element dependentModule = componentXml.createElement("dependent-module");
				dependentModule.setAttribute("archiveName", library.getName());
				dependentModule.setAttribute("deploy-path", "/WEB-INF/lib");
				dependentModule.setAttribute("handle", "module:/classpath/lib/" + studioDir.getName() + "/" + line);
				
				Element dependencyType = componentXml.createElement("dependent-type");
				dependencyType.setTextContent("uses");
				
				dependentModule.appendChild(dependencyType);
				wbModule.appendChild(dependentModule);
			}
		}
		
		manifestReader.close();
		
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
