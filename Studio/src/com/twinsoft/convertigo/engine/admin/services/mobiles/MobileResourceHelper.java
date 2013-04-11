package com.twinsoft.convertigo.engine.admin.services.mobiles;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.io.StringReader;
import java.net.URLDecoder;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.IOFileFilter;
import org.apache.commons.io.filefilter.TrueFileFilter;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.twinsoft.convertigo.beans.core.MobileApplication;
import com.twinsoft.convertigo.beans.core.MobileDevice;
import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.beans.mobiledevices.BlackBerry6;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.EngineException;
import com.twinsoft.convertigo.engine.admin.services.ServiceException;

public class MobileResourceHelper {
	private static final Pattern alphaNumPattern = Pattern.compile("[\\.\\w]*");
	
	public static final IOFileFilter defaultFilter = new IOFileFilter() {
		
		public boolean accept(File file) {
			String filename = file.getName();
			return !filename.equals(".DS_Store") && !filename.equalsIgnoreCase("thumbs.db")
					&& !filename.equals(".svn");
		}

		public boolean accept(File file, String path) {
			return accept(new File(file, path));
		}
		
	};
	
	final Project project;
	final MobileApplication mobileApplication;
	final File projectDir;
	final File mobileDir;
	final File destDir;
	
	MobileResourceHelper(String application, String destSubDir) throws EngineException, ServiceException {
		if (!Engine.theApp.databaseObjectsManager.existsProject(application)) {
			throw new ServiceException("Unable to get resources of the application '" + application
					+ "'; reason: the project does not exist");
		}
		
		project = Engine.theApp.databaseObjectsManager.getOriginalProjectByName(application);
		
		mobileApplication = project.getMobileApplication();
		
		if (mobileApplication == null) {
			throw new ServiceException("The application " + project.getName() + " doesn't contain a mobileApplication object.");
		}
		
		projectDir = new File(Engine.PROJECTS_PATH + "/" + application);
		mobileDir = new File(projectDir, MobileDevice.RESOURCES_PATH);
		destDir = new File(projectDir, destSubDir);
	}
	
	public void prepareFiles(HttpServletRequest request) throws ServiceException {
		prepareFiles(request, defaultFilter);
	}
	
	public void prepareFiles(HttpServletRequest request, FileFilter fileFilterForCopy) throws ServiceException {
		try {
			String endPoint = mobileApplication.getComputedEndpoint(request) + "/projects/" + project.getName();
			String applicationID = mobileApplication.getComputedApplicationId();
			
			// Check forbidden characters in application ID (a-zA-Z0-9.-)
			if (!Pattern.matches("[\\.\\w]*", applicationID)) {
				throw new ServiceException("The application ID is not valid: '" + applicationID
						+ "'.\nThe only valid characters are upper and lower letters (A-Z, a-z), "
						+ "digits (0-9), a period (.) and a hyphen (-).");
			}
			
			// Delete no existing files
			FileUtils.deleteQuietly(destDir);
			FileUtils.copyDirectory(mobileDir, destDir, fileFilterForCopy, true);

			for (MobileDevice mobileDevice : mobileApplication.getMobileDeviceList()) {
				if (mobileDevice instanceof BlackBerry6) {
					for (File file : FileUtils.listFilesAndDirs(destDir, TrueFileFilter.INSTANCE, TrueFileFilter.INSTANCE)) {
						if (!alphaNumPattern.matcher(file.getName()).matches()) {
							throw new ServiceException("The file or directory '" + file.getAbsolutePath()
									+ "' contains non alpha-numeric characters. "
									+ "BlackBerry build does not allow non alpha-numeric characters in file/directory names. "
									+ "You must rename it with alpha-numeric characters only.");
						}
					}
					break;
				}
			}
			
			File serverJsFile = new File(destDir, "sources/server.js");
			
			if (serverJsFile.exists()) {
				// Sencha 1 case
				
				File indexHtmlFile = new File(destDir, "index.html");
				String sIndexHtml = FileUtils.readFileToString(indexHtmlFile);
				
				String sServerJsHtml = FileUtils.readFileToString(serverJsFile);
				sServerJsHtml = sServerJsHtml.replaceAll("/\\* DO NOT REMOVE THIS LINE endpoint \\: '' \\*/", "endpoint : '" + endPoint + "'");
				writeStringToFile(serverJsFile, sServerJsHtml);
				
				// Update sencha script reference (to non debug version)
				
				sIndexHtml = sIndexHtml.replaceAll("js/senchatouchdebugwcomments\\.js", "js/senchatouch.js");
				// "js/mobilelib.js" "../../../../scripts/mobilelib.js"
				File debugSenchaJsLibFile = new File(mobileDir, "js/senchatouchdebugwcomments.js");
				debugSenchaJsLibFile.delete();
				
				// Update mobilelib script reference and copy from commom scripts if needed
				
				File destFile = new File(mobileDir, "js/mobilelib.js");
				if (!destFile.exists()) {
					String origin = "/scripts/mobilelib.js";
					FileUtils.copyFile(new File(Engine.WEBAPP_PATH + origin), destFile, true);
					sIndexHtml = sIndexHtml.replaceAll(Pattern.quote("../../../.." + origin), "js/mobilelib.js");
				}
				
				writeStringToFile(indexHtmlFile, sIndexHtml);
			} else {
				// jQuery Mobile case
				
				for (File htmlFile :FileUtils.listFiles(destDir, new String[] {"html"}, true)) {
					String htmlContent = FileUtils.readFileToString(htmlFile);
					StringBuffer sbIndexHtml = new StringBuffer();
					BufferedReader br = new BufferedReader(new StringReader(htmlContent));
					String line = br.readLine();
					while (line != null) {
						if (!line.contains("<!--") && line.contains("\"../../../../")) {
							String file = line.replaceFirst(".*\"\\.\\./\\.\\./\\.\\./\\.\\./(.*?)\".*", "$1");
							File inFile = new File(Engine.WEBAPP_PATH + "/" + file);
							
							if (inFile.exists()) {
								boolean needImages = file.matches(".*jquery\\.mobile\\..*?min\\.css");
								
								file = file.replace("scripts/", "js/");
								File outFile = new File(destDir, file);
								outFile.getParentFile().mkdirs();
								FileUtils.copyFile(inFile, outFile);
								line = line.replaceFirst("\"\\.\\./\\.\\./\\.\\./\\.\\./.*?\"", "\"" + file + "\"");
								
								if (needImages) {
									File inImages = new File(inFile.getParentFile(), "images");
									File outImages = new File(outFile.getParentFile(), "images");
									FileUtils.copyDirectory(inImages, outImages, defaultFilter, true);
								}
								
								if (file.matches(".*/jquery\\.mobilelib\\..*?js")) {
									String sJs = FileUtils.readFileToString(outFile);
									sJs = sJs.replaceAll(Pattern.quote("url : \"../../\""), "url : \"" + endPoint + "/\"");
									writeStringToFile(outFile, sJs);
								}
								
								if (file.matches(".*/flashupdate_.*?\\.css")) {
									FileUtils.copyDirectory(new File(inFile.getParentFile(), "flashupdate_fonts"), new File(outFile.getParentFile(), "flashupdate_fonts"), defaultFilter, true);
									FileUtils.copyDirectory(new File(inFile.getParentFile(), "flashupdate_images"), new File(outFile.getParentFile(), "flashupdate_images"), defaultFilter, true);
								}
							}
						}
						sbIndexHtml.append(line + "\n");
						line = br.readLine();
					}
					
					htmlContent = sbIndexHtml.toString();

					writeStringToFile(htmlFile, htmlContent);
				}
			}
			
			long latestFile = 0;
			for (File file : FileUtils.listFiles(destDir, TrueFileFilter.INSTANCE, TrueFileFilter.INSTANCE)) {
				long curFile = file.lastModified();
				if (latestFile < curFile) {
					latestFile = curFile;
				}
			}
			destDir.setLastModified(latestFile);
		} catch (ServiceException e) {
			throw e;
		} catch (Exception e) {
			throw new ServiceException(e.getClass().getName(), e);
		}
	}
	
	public void listFiles(JSONObject response) throws JSONException, IOException {
		File canonicalDir = destDir.getCanonicalFile();
		int uriDirectoryLength = canonicalDir.toURI().toString().length() - 1;
		JSONArray jArray = new JSONArray();
		
		for (File f : FileUtils.listFiles(canonicalDir, TrueFileFilter.INSTANCE, TrueFileFilter.INSTANCE)) {
			File canonnicalF = f.getCanonicalFile();
			JSONObject jObj = new JSONObject();
			jObj.put("uri", URLDecoder.decode(canonnicalF.toURI().toString().substring(uriDirectoryLength), "UTF-8"));
			jObj.put("date", canonnicalF.lastModified());
			jObj.put("size", canonnicalF.length());
			jArray.put(jObj);
		}
		response.put("files", jArray);
		response.put("date", destDir.lastModified());
	}
	
	private void writeStringToFile(File file, String content) throws IOException {
		long lastModified = file.exists() ? file.lastModified() : System.currentTimeMillis();
		FileUtils.writeStringToFile(file, content);
		file.setLastModified(lastModified);
	}
}